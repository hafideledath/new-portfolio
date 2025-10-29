import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import pcIcon from './assets/mypc.png';
import folderIcon from './assets/folder.png';
import fileIcon from './assets/file.png';
import terminalIcon from './assets/terminal.png';
import Donut from './components/donut';
import Button from './components/button';
import Sticky from './components/sticky';

import chatWithCat from './assets/chatwithcat.png';
import katKlub from './assets/katklub.png';
import binBot from './assets/binbot.png';
import diapair from './assets/diapair.png';
import duckDebugger from './assets/duckdebugger.png';

function App() {
  const playSound = (soundFile, volume = 1.0) => {
    try {
      const audio = new Audio(soundFile);
      audio.volume = volume;
      audio.play().catch(error => console.error("Error playing sound:", error));
    } catch (e) {
      console.warn(`Error creating audio for ${soundFile}:`, e);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState('file');
  const [modalHistory, setModalHistory] = useState([]);


  const desktopIcons = [
    {
      icon: pcIcon,
      title: 'Hafid\'s Portfolio',
      filename: 'My PC',
      description: `Welcome to Hafid's compsci portfolio.
Built with ❤︎ using ReactJS.
Icons sourced from Gdainti.
Sound effects sourced from u_edtmwfwu7c and 666HeroHero.`,
    },
    {
      icon: fileIcon,
      title: 'Education',
      filename: 'education.txt',
      description: (
        <>
          <span>- Currently taking the IB Diploma Programme with 4 HLs (including Math AA, Physics, and Chemistry) with a predicted 41/42 with 7776 in the HLs.</span><br />
          <span>- Took Set Theory: The Dazzling Foundation of Abstract Mathematics in person at Summer@Brown (passed, no letter grades)</span><br />
          <span>- Took CS50x (Harvard's introductory programming course via EDx) and CS50P (CS50x's Python extension) (passed, no letter grades)</span>
        </>
      )
    },
    {
      icon: fileIcon,
      title: 'Awards & Honors',
      filename: 'awards.txt',
      description: (
        <>
          <span>- Sheikh Hamdan Award For Distinguished Students, 26th Cycle</span><br />
          <span>- Sharjah Award for Educational Excellence, 30th Cycle</span><br />
          <span>- ALPHA (Advanced Learning Program for High Achievers) Most Distinguished Student of the Year, 2023-24</span><br />
          <span>- Johns Hopkins' Center for Talented Youth Award of High Honors, 2022</span><br />
          <span>- DP Math AA HL Excellence Achievement Award, 2025</span><br />
          <span>- MYP Extended Math Excellence Achievement Award, 2023, 2024</span><br />
          <span>- MYP Digital Design Excellence Achievement Award, 2023, 2024</span>
        </>
      ),
    },
    {
      icon: folderIcon,
      title: 'Experience',
      filename: 'Experience',
      description: 'My professional experience and projects.',
      isFolder: true,
      children: [
        {
          icon: folderIcon,
          title: 'Experience > Projects',
          filename: 'Projects',
          description: 'Collection of my programming projects',
          isFolder: true,
          children: [
            {
              icon: folderIcon,
              title: 'Experience > Projects > LLM Projects',
              filename: 'LLM Projects',
              description: 'Collection of my generative AI projects.',
              isFolder: true,
              children: [
                {
                  icon: fileIcon,
                  title: 'Experience > Projects > LLM Projects > ChatWithCat.txt',
                  filename: 'ChatWithCat.txt',
                  description: (
                  <>
                    Kat, a funny, multilingual anthropomorphic cat makes learning languages fun.
                    <br />
                    <img src={chatWithCat} alt="ChatWithCat Project Icon" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', display: 'block' }} />
                  </>
                )
                },
                {
                  icon: fileIcon,
                  title: 'Experience > Projects > LLM Projects > KatKlub.txt',
                  filename: 'KatKlub.txt',
                  description: (
                    <>
                      KatKlub is a webapp that provides users with daily actionable tasks generated based on their profiles, using gamification to help with wellbeing, built with React.
                      <br />
                      <img src={katKlub} alt="KatKlub Project Icon" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', display: 'block' }} />
                    </>
                  )
                },
                {
                  icon: fileIcon,
                  title: 'Experience > Projects > LLM Projects > poetryBook.txt',
                  filename: 'poetryBook.txt',
                  description: 'Toltecatl and SAPIEN is an upcoming poetry anthology about a man named Toltecatl and an LLM named SAPIEN, consisting of back-and-forth epistolary poems. The verses by SAPIEN are written by an actual LLM finetuned extensively on my poetry and prompted on poetic conventions.'
                }
              ]
            },
            {
              icon: fileIcon,
              title: 'Experience > Projects > BinBot.txt',
              filename: 'BinBot.txt',
              description: (
                <>
                  BinBot is a webapp built for my school that assigns house points to students based on how they recycle, rewarding students that recycle frequently, developed using Flask and SQLite.
                  <br />
                  <img src={binBot} alt="BinBot Project Icon" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', display: 'block' }} />
                </>
              )
            },
            {
              icon: fileIcon,
              title: 'Experience > Projects > DIAPAIR.txt',
              filename: 'DIAPAIR.txt',
              description: (
                <>
                  DIAPAIR Student Connect is a social networking platform made for my school that pairs students and alumni with similar interests together, developed using React, Firebase, and Socket.io.
                  <br />
                  <img src={diapair} alt="DIAPAIR Project Icon" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', display: 'block' }} />
                </>
              )
            },
            {
              icon: fileIcon,
              title: 'Experience > Projects > DuckDebugger.txt',
              filename: 'DuckDebugger.txt',
              description: (
                <>
                  Duck Debugger is a game that teaches players how to debug code, playing as a talking duck. Built with Unity and C#, using IronPython to evaluate the user's Python code.
                  <br />
                  <img src={duckDebugger} alt="Duck Debugger Project Icon" style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', display: 'block' }} />
                </>
              )
            }
          ]
        },
        {
          icon: fileIcon,
          title: 'Experience > roles.txt',
          filename: 'roles.txt',
          description: (
            <>
              <span>- Head of Technology of my school's annual hackathon, DI@TECH; created and currently maintaining an accessible website used by hundreds of participants and visitors.</span><br />
              <span>- Intern for the educational center, Fun Robotics, where I assisted in teaching young children about Python programming and lego robotics while training under their proprietary data science and machine learning courses.</span><br />
              <span>- Head of Teaching for CodeCrafters, my school's coding club; collaborated with peers to create weekly lesson plans about a variety of programming topics, giving additional support to students that showed keen interest.</span><br />
              <span>- 'Gamemaster' for my school's history club, developing web-software to help students prepare for the annual History Bowl competition using thousands of scraped questions. Used nltk to identify common nouns and phrases.</span>
            </>
          )
        },
        {
          icon: fileIcon,
          title: 'Experience > competitions.txt',
          filename: 'competitions.txt',
          description: (
            <>
              <span>- Global finalist of the Uber Global Hackathon, placing in the top 3.8% of 2,500+ competitors.</span><br />
              <span>- 2x winner of my school's annual programming competition, DI@BYTE, in 2023 and 2024.</span><br />
              <span>- Placed in the top 10 out of over 200 students in the Next Gen World Majlis in 2025, a public speaking and research competition with the theme of self-driving cars.</span><br />
              <span>- Won the my school's annual backend programming competition at the DI@TECH hackathon in 2023, winning an internship.</span><br />
              <span>- Solved 9 out of 9 puzzles in the 2025 CS50 Puzzle Day, placing in the top 10% of 12,000+ teams.</span>
            </>
          )
        }
      ]
    },
    {
      icon: folderIcon,
      title: 'Fun Stuff',
      filename: 'Fun Stuff',
      description: 'Here are some cool little doohickies! Some doodads! Some whatsits!',
      isFolder: true,
      children: [
        {
          icon: fileIcon,
          title: 'Fun Stuff > hobbies.txt',
          filename: 'hobbies.txt',
          description: (
            <>
              My life isn't just about programming. I also like to...<br />
              <span>- Play open-world (often indie) games (Red Dead Redemption, Zelda, A Short Hike, Firewatch, Later Alligator)</span><br />
              <span>- Learn Toki Pona to conspire with friends</span><br />
              <span>- Write and publish poetry; host poetry events</span><br />
              <span>- Read and learn about world history; participate in history / academic bowls. Our team's #1 in the country!</span>
            </>
          ),
        },
        {
          icon: terminalIcon,
          title: 'Fun Stuff > DONUT.exe',
          filename: 'DONUT.exe',
          description: 'wow a yummy spinning donut ',
        },
        {
          icon: terminalIcon,
          title: 'Fun Stuff > BUTTON.exe',
          filename: 'BUTTON.exe',
          description: 'click me if you can >:)',
        },
      ]
    }
  ];

  useEffect(() => {
    if (modalHistory.length > 0) {
      const currentItem = modalHistory[modalHistory.length - 1];
      setModalContent(currentItem);
      setModalType(currentItem.isFolder ? 'folder' : 'file');
      setModalOpen(true);
    } else {
      setModalContent(null);
      setModalOpen(false);
    }
  }, [modalHistory, setModalContent, setModalType, setModalOpen]);

  const handleModalGoBackOrClose = () => {
    playSound('/sounds/click.mp3');
    setModalHistory(prev => prev.slice(0, -1));
  };

  return (
    <>
      <div className="App">
      <div className="horizontal-lines"></div>
      <div className="icons-container">
        <div className="icons-grid">
        {desktopIcons.map((item, idx) => (
          <div 
            className="icon-item" 
            key={item.title + idx} 
            onClick={(e) => {
              playSound('/sounds/click.mp3');
              e.stopPropagation();
              setModalHistory([item]);
            }}
          >
            <img src={item.icon} alt={item.title} className="icon" />
            <span>{item.filename}</span>
          </div>
        ))}
        </div>
      </div>
      {modalOpen && modalContent && (
        <div className="modal-overlay" onClick={handleModalGoBackOrClose}>
          <div className={`windows-modal ${modalContent && modalContent.icon === terminalIcon ? 'terminal-style' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="windows-title-bar">
              <div className="windows-title">{modalContent.title}</div>
              <div className="windows-controls" onClick={handleModalGoBackOrClose}>
                <button className="windows-control"><span>×</span></button>
              </div>
            </div>
            <div className="windows-content">
              {modalType === 'file' ? (
                <>
                  <pre className="code-description">{modalContent.description}</pre>
                  {modalContent.filename === 'DONUT.exe' && <Donut />}
                  {modalContent.filename === 'BUTTON.exe' && <Button playSound={playSound} />}
                </>
              ) : (
                <div className="folder-contents">
                  {modalContent.children && modalContent.children.map((item, idx) => (
                    <div 
                      className="modal-icon-item" 
                      key={item.title + idx}
                      onClick={(e) => {
                        playSound('/sounds/click.mp3');
                        e.stopPropagation();
                        setModalHistory(prev => [...prev, item]);
                      }}
                    >
                      <img src={item.icon} alt={item.title} className="icon" />
                      <span>{item.filename}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Sticky />
      </div>
    </>
  );
}

export default App;
