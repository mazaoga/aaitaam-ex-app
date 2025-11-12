import { useEffect, useMemo, useState } from 'react';
import langCodes from '../data/lang_code.json';
import contentData from '../data/content.json';
import bgImage from '../images/bg700.jpg';
import bannerImage from '../images/banner_with_title24b.png';
import buttonBg from '../images/bg_button.png';
import backButton from '../images/back_button.png';

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
};

const languages = langCodes;
const contentByLang = contentData.content ?? {};

function Landing({ onSelect }) {
  return (
    <div className="relative flex min-h-screen w-full items-stretch justify-center" style={backgroundStyle}>
      <div className="absolute inset-0" />
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 py-10 text-white">
        <img
          src={bannerImage}
          alt="Maison du Temple banner"
          className="h-auto w-full max-w-3xl"
        />
        <div className="mt-10 flex w-full max-w-xl flex-col gap-4">
          {languages.map((lang) => (
            <div
              key={lang.code}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(lang.code)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect(lang.code);
                }
              }}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentScreen({ lang, onBack }) {
  const content = contentByLang[lang] ?? 'Content unavailable for the selected language.';
  const langLabel = useMemo(
    () => languages.find((entry) => entry.code === lang)?.language ?? lang,
    [lang],
  );
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [lang]);

  return (
    <div className="relative flex min-h-screen w-full items-stretch justify-center" style={backgroundStyle}>
      <div className="absolute inset-0" />
      <div className="relative z-10 flex w-full max-w-5xl flex-col px-4 py-8 text-white">
        <img
          src={bannerImage}
          alt="Maison du Temple banner"
          className="h-auto w-full max-w-3xl self-center"
        />

        <button
          onClick={onBack}
          className="mt-8 w-fit border-none bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
        >
          <img
            src={backButton}
            alt="Go back"
            className="h-auto w-24 max-w-full cursor-pointer transition hover:-translate-y-0.5 hover:drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
          />
        </button>

        <section className="mt-6 w-full rounded-3xl bg-aaitaam-dark p-6 text-white shadow-xl backdrop-blur-md">
          {/* <h2 className="text-2xl font-semibold tracking-wide text-aaitaam-gold">
            {langLabel}
          </h2> */}
          <p className="mt-4 whitespace-pre-line text-lg leading-relaxed">
            {content}
          </p>
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedLang, setSelectedLang] = useState(null);

  if (!selectedLang) {
    return <Landing onSelect={setSelectedLang} />;
  }

  return <ContentScreen lang={selectedLang} onBack={() => setSelectedLang(null)} />;
}
