import { useEffect, useState } from 'react';

// Example flavor descriptions for the student concept — not a live inventory feed.
const sampleFlavors = [
  { name: 'Strawberry Dream', note: 'Bright, fruity, and nostalgic', emoji: '🍓', type: 'Dairy', tone: 'strawberry' },
  { name: 'Purple Ube', note: 'Sweet, mellow, and colorful', emoji: '🍠', type: 'Dairy', tone: 'ube' },
  { name: 'Tropical Mango', note: 'Sunny tropical inspiration', emoji: '🥭', type: 'Vegan concept', tone: 'mango' },
  { name: 'Coconut Cloud', note: 'Smooth coconut inspiration', emoji: '🥥', type: 'Vegan concept', tone: 'coconut' },
  { name: 'Black Sesame', note: 'Nutty, toasted inspiration', emoji: '⚫', type: 'Dairy', tone: 'sesame' },
  { name: 'Pistachio Garden', note: 'Rich, creamy, and nutty', emoji: '🌿', type: 'Dairy', tone: 'pistachio' },
];

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'flavors', label: 'Flavors' },
  { id: 'story', label: 'Our Story' },
  { id: 'visit', label: 'Visit' },
];

function useRevealOnScroll(dependency) {
  useEffect(() => {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [dependency]);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Garden Creamery, home">
          <span className="brand-icon" aria-hidden="true">✳</span> GARDEN<span>CREAMERY</span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="sr-only">{menuOpen ? 'Close navigation' : 'Open navigation'}</span>
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
        <nav id="primary-navigation" className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {NAV.map(({ id, label }) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="https://gardencreamery.com/locations/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Shop details ↗</a>
        </nav>
      </div>
    </header>
  );
}

function FlavorCard({ flavor }) {
  return (
    <article className={`flavor-card ${flavor.tone}`} data-reveal>
      <div className="flavor-art" aria-hidden="true"><span>{flavor.emoji}</span></div>
      <div className="flavor-copy">
        <span className="flavor-tag">{flavor.type}</span>
        <h3>{flavor.name}</h3>
        <p>{flavor.note}</p>
      </div>
    </article>
  );
}

export default function App() {
  const [filter, setFilter] = useState('All');
  useRevealOnScroll(filter);
  const shown = filter === 'All' ? sampleFlavors : sampleFlavors.filter((flavor) => flavor.type === filter);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section id="home" className="hero">
          <div className="hero-copy container">
            <div className="hero-text" data-reveal>
              <p className="eyebrow">SMALL BATCH · BIG JOY</p>
              <h1>Life is sweeter <em>with a little</em> adventure.</h1>
              <p className="hero-lede">A fresh way to discover delicious flavors, explore creative ingredients, and plan your next ice cream stop.</p>
              <div className="button-row"><a href="#flavors" className="button button-dark">Explore flavors <span aria-hidden="true">↗</span></a><a href="#visit" className="text-link">Plan your visit →</a></div>
            </div>
            <div className="hero-photo-wrap" data-reveal>
              <img className="hero-photo" src="/ice-cream-hero.png" alt="Illustrative colorful scoops of ice cream on cones against a pink backdrop" />
              <span className="photo-sticker">a scoop of happiness ✳</span>
            </div>
          </div>
          <div className="hero-ticker" aria-hidden="true"><span>MADE WITH LOVE ✳ MADE FOR DISCOVERY ✳ MADE TO SHARE ✳ MADE WITH LOVE ✳ MADE FOR DISCOVERY ✳</span></div>
        </section>

        <section id="flavors" className="section flavors-section container">
          <div className="section-head" data-reveal>
            <div><p className="eyebrow">THE FUN PART</p><h2>Find your <em>flavor.</em></h2></div>
            <p>Start with these illustrative flavor ideas. Check Garden Creamery’s official channels for the actual rotating scoop menu.</p>
          </div>
          <div className="filter-row" role="group" aria-label="Filter example flavors">
            {['All', 'Dairy', 'Vegan concept'].map((option) => <button key={option} type="button" className={`filter-pill ${filter === option ? 'active' : ''}`} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option === 'All' ? 'All flavors' : option === 'Dairy' ? 'Dairy examples' : 'Vegan examples'}</button>)}
          </div>
          <div className="flavor-grid">{shown.map((flavor) => <FlavorCard key={flavor.name} flavor={flavor} />)}</div>
          <p className="note">Student redesign concept · Flavors above are illustrative and do not indicate current availability, final ingredients, or certified dietary suitability.</p>
        </section>

        <section id="story" className="story-section">
          <div className="container story-grid">
            <div className="story-art" data-reveal><span className="story-asterisk" aria-hidden="true">✳</span><span className="story-floating">HANDCRAFTED<br />HAPPINESS</span></div>
            <div className="story-copy" data-reveal><p className="eyebrow">OUR LITTLE CORNER OF JOY</p><h2>Thoughtful scoops. <em>Memorable moments.</em></h2><p>Garden Creamery is known for small-batch ice cream, creative flavor combinations, and dairy and vegan offerings. This student website concept makes those details easier to discover.</p><a className="button button-white" href="https://gardencreamery.com/" target="_blank" rel="noopener noreferrer">Meet the real Garden Creamery ↗</a></div>
          </div>
        </section>

        <section id="visit" className="section visit-section container">
          <div className="visit-copy" data-reveal><p className="eyebrow">COME SAY HELLO</p><h2>See you at <em>the scoop shop.</em></h2><p>Find Garden Creamery in the Mission District of San Francisco. Check their official page for current hours, flavor announcements, and updates before heading over.</p><address>3566 20th Street<br />San Francisco, CA 94110</address><div className="button-row"><a className="button button-dark" href="https://www.google.com/maps/search/?api=1&query=3566+20th+Street+San+Francisco+CA+94110" target="_blank" rel="noopener noreferrer">Get directions ↗</a><a className="text-link" href="https://gardencreamery.com/locations/" target="_blank" rel="noopener noreferrer">Check current hours ↗</a></div></div>
          <div className="visit-card" data-reveal><span className="visit-large" aria-hidden="true">🍦</span><p className="visit-script">good things come to those who scoop</p><div className="visit-card-bottom">SAN FRANCISCO <span>✳</span> CALIFORNIA</div></div>
        </section>
      </main>
      <footer className="footer"><div className="container footer-inner"><span className="footer-brand">GARDEN CREAMERY ✳</span><p>Unofficial student design concept for an interaction-design portfolio. Not affiliated with or operated by Garden Creamery.</p><a href="#home">Back to top ↑</a></div></footer>
    </>
  );
}
