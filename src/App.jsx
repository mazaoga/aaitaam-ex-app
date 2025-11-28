import { useEffect } from 'react';
import { Routes, Route, Link, useParams, Navigate, useLocation } from 'react-router-dom'; // เพิ่ม useLocation
import langCodes from '../data/lang_code.json';
import contentData from '../data/content.json';
import bgImage from '../images/bg700.jpg';
import bannerImage from '../images/banner_with_title24b.png';
import buttonBg from '../images/bg_button.png';
import backButton from '../images/back_button.png';

// Import analytics ที่เราสร้างไว้
import { analytics, logEvent } from './firebase'; 

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

const languages = langCodes;
const contentKeys = ['introduce', 'room1', 'room2', 'room3', 'room4', 'room5', 'summary'];

// Layout component for consistent background
function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen w-full items-stretch justify-center" style={backgroundStyle}>
      <div className="absolute inset-0" />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 py-10 text-white">
        {children}
      </div>
    </div>
  );
}

// Page for selecting a language for a specific content key
function LanguageSelectorPage() {
    const { contentKey } = useParams();

    // If the content key from the URL is invalid, redirect to the default
    if (!contentKeys.includes(contentKey)) {
        return <Navigate to="/introduce" replace />;
    }

    return (
        <Layout>
            <img
                src={bannerImage}
                alt="Maison du Temple banner"
                className="h-auto w-full max-w-3xl"
            />
            <div className="mt-10 flex w-full max-w-xl flex-col gap-4">
                {languages.map((lang) => (
                    <Link
                        key={lang.code}
                        to={`/${contentKey}/${lang.code}`}
                        className="relative w-full cursor-pointer select-none shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40"
                    >
                        <img
                            src={buttonBg}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none block w-full"
                        />
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 pt-6 text-center text-lg font-semibold uppercase text-black">
                            {lang.language}
                        </span>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}

// Page for displaying the content
function ContentDisplayPage() {
    const { contentKey, lang } = useParams();
    const content = contentData[contentKey]?.[lang];

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [contentKey, lang]);

    // If content is not found for the given key/lang, go back to language selection for that content
    if (!content) {
        return <Navigate to={`/${contentKey}`} replace />;
    }

    return (
        <Layout>
            <Link to={`/${contentKey}`}>
                 <img
                    src={bannerImage}
                    alt="Maison du Temple banner"
                    className="h-auto w-full max-w-3xl"
                />
            </Link>
            <div className="flex w-full flex-col">
                <div className="mt-8 flex w-full items-center">
                    <Link
                        to={`/${contentKey}`}
                        className="w-fit border-none bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                    >
                        <img
                            src={backButton}
                            alt="Go back to language selection"
                            className="h-auto w-24 max-w-full cursor-pointer transition hover:-translate-y-0.5 hover:drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
                        />
                    </Link>
                </div>
                <section className="mt-6 w-full rounded-3xl bg-aaitaam-dark p-6 text-white shadow-xl backdrop-blur-md">
                    <p className="whitespace-pre-line text-lg leading-relaxed">
                        {content}
                    </p>
                </section>
            </div>
        </Layout>
    );
}

export default function App() {
  const location = useLocation(); // Hook เพื่อดึง URL ปัจจุบัน

  useEffect(() => {
    // ตรวจสอบว่า analytics ถูก initialize แล้วหรือยัง
    if (analytics) {
      // ส่ง event 'page_view' ไปยัง Google Analytics ทุกครั้งที่ URL เปลี่ยน
      logEvent(analytics, 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title
      });
      
      // (Optional) Log ลง Console เพื่อเช็คตอน Dev (ลบออกได้ตอน Deploy จริง)
      console.log(`GA Event: page_view sent for ${location.pathname}`);
    }
  }, [location]); // ทำงานทุกครั้งที่ location เปลี่ยน

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/introduce" replace />} />
      <Route path="/:contentKey" element={<LanguageSelectorPage />} />
      <Route path="/:contentKey/:lang" element={<ContentDisplayPage />} />
    </Routes>
  );
}