import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import birthdaySong from './birthday-song.mp3'; // Убедитесь что файл существует
import './styles.scss';

const BirthdayCard = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [play] = useSound(birthdaySong);
  const [visibleLetters, setVisibleLetters] = useState([]);

  const phrase = "С Днем Рождения!".split('');

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    play();

    const animateLetters = () => {
      phrase.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLetters(prev => [...prev, index]);
        }, index * 150);
      });
      
      setTimeout(() => {
        setVisibleLetters([]);
      }, phrase.length * 150 + 3000);
    };

    const interval = setInterval(animateLetters, 8000);
    animateLetters();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [play]);

  return (
    <div className="container">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={true}
        numberOfPieces={150}
        gravity={0.08}
      />
      
      <div className="content">
        <h1 className="title animate-pop">С Днем Рождения, Мама! 🎉</h1>
        <p className="message animate-float">Спасибо за твою любовь, заботу и терпение!</p>
        <p className="message animate-float">Ты - самая лучшая мама на свете! 💐</p>
        <p className="signature">С любовью, твой сын</p>
      </div>

      <div className="brush-phrase">
        {phrase.map((char, index) => (
          <div 
            key={index}
            className={`brush-letter ${visibleLetters.includes(index) ? 'visible' : ''}`}
            style={{ '--delay': `${index * 0.1}s` }}
          >
            {char}
            <div className="brush-stroke" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCard;