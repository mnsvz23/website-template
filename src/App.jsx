import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import phule1 from './assets/phule1.png';
import phule2 from './assets/phule2.png';
import phule3 from './assets/phule3.png';
import phule4 from './assets/phule4.png';
import phule5 from './assets/phule5.png';
import phule6 from './assets/phule6.png';
import logo from './assets/logo.png';
import thumb1 from './assets/thumb1.png';
import thumb2 from './assets/thumb2.png';
import thumb3 from './assets/thumb3.png';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ebooks = [
  {
    title: 'Savitri Bai, the brave',
    cover: thumb1,
  },
  {
    title: 'Savitri Bai, the brave',
    cover: thumb2,
  },
  {
    title: 'Savitri Bai, the brave',
    cover: thumb3,
  },
];

const galleryImages = [
  phule1,
  phule2,
  phule3,
  phule4,
  phule5,
  phule6,
];

const galleryItems = galleryImages.map((img, idx) => ({
  original: img,
  thumbnail: img,
  originalAlt: `Gallery ${idx + 1}`,
  thumbnailAlt: `Thumbnail ${idx + 1}`,
}));

function App() {
  const handleEbookClick = (bookId) => {
    fetch('/api/log-ebook-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookId }),
    });
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <img src={logo} alt="Little Learners Logo" className="site-logo" />
        <h1 className="site-title">Inspire Little Hearts with Big Indian Heroes</h1>
        <h2 className="site-subheadline">
          What if your bedtime stories were about real heroes?<br/>
          Fly with a girl who opened the first school for girls, march with a monk who inspired millions, or dream with a scientist who touched the stars!<br/><br/>
          This color-packed, joy-filled book brings Indian heroes to life in stories full of adventure, values, and big ideas — just right for curious little dreamers.
          Perfect for ages 4 to 8.<br/><br/>
          No capes. Just courage.
        </h2>
      </header>
      <section className="ebook-list">
        <div className="ebooks">
          {ebooks.map((book, idx) => (
            <motion.div
              className="ebook-card"
              key={book.title + idx}
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={book.cover} alt={book.title} className="ebook-cover" />
              <div className="ebook-info">
                <h3>{book.title}</h3>
                <button className="interested-btn" onClick={() => handleEbookClick(idx)}>
                  Interested to buy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="gallery-section">
        <div style={{ textAlign: 'center' }}>
          <span className="site-title">View sample pages from the books</span>
        </div>
        <ImageGallery
          items={galleryItems}
          showPlayButton={false}
          showFullscreenButton={false}
          showBullets={false}
          showIndex={false}
          showThumbnails={true}
          showNav={false}
          slideOnThumbnailHover={true}
          additionalClass="custom-gallery"
        />
      </section>
      <footer>
        <p>Follow us:</p>
        <div className="social-links">
          <a href="#" aria-label="Instagram">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#E1306C"/><path d="M12 7.2A4.8 4.8 0 1 0 12 16.8A4.8 4.8 0 1 0 12 7.2Z" stroke="#fff" strokeWidth="1.5"/><circle cx="17.2" cy="6.8" r="1.2" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#1DA1F2"/><path d="M19.633 7.997c.013.176.013.353.013.53 0 5.39-4.104 11.61-11.61 11.61v-.003A11.52 11.52 0 0 1 3 18.13c.243.028.486.042.73.043a8.16 8.16 0 0 0 5.065-1.745 4.08 4.08 0 0 1-3.81-2.83c.25.048.504.073.76.073.37 0 .73-.05 1.073-.143a4.08 4.08 0 0 1-3.27-4.003v-.052a4.06 4.06 0 0 0 1.844.52A4.08 4.08 0 0 1 4.08 5.29a11.57 11.57 0 0 0 8.39 4.257 4.08 4.08 0 0 1 6.95-3.72 8.13 8.13 0 0 0 2.59-.99 4.08 4.08 0 0 1-1.795 2.25 8.19 8.19 0 0 0 2.34-.64 8.77 8.77 0 0 1-2.04 2.11z" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#FF0000"/><path d="M16.8 12.001c0-.528-.43-.96-.96-.96H8.16c-.53 0-.96.432-.96.96v.002c0 .528.43.96.96.96h7.68c.53 0 .96-.432.96-.96v-.002z" fill="#fff"/><path d="M10.5 14.5v-5l4 2.5-4 2.5z" fill="#fff"/></svg>
          </a>
        </div>
        <p style={{ fontSize: '0.9em', marginTop: '1em' }}>© {new Date().getFullYear()} Kids' Ebook Library</p>
      </footer>
    </div>
  );
}

export default App;
