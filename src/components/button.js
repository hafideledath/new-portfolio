import React, { useState, useEffect, useRef } from 'react';

const Button = ({ onClick, text, playSound }) => {
    let messages = ['nice try', 'haha', 'whoops', 'try again', 'keep it going', 'you can do it!!', 'i believe in you', 'one more time', 'almost!', '◝(ᵔᵕᵔ)◜'];
    const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];
    const [currentMessage, setCurrentMessage] = useState("Try me!");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonRef = useRef(null);
    
    useEffect(() => {
        setPosition(getRandomCoordinates());
    }, []);

    const getRandomCoordinates = () => { 
        const modal = document.querySelector('.windows-modal');
        if (!modal) return { x: 0, y: 0 };
        
        const modalRect = modal.getBoundingClientRect();
        const randomX = Math.random() * (modalRect.width - 120) + 10;
        const randomY = Math.random() * (modalRect.height - 120) + 70;
        return { x: randomX, y: randomY };
    };

    const moveButton = () => {
        if (playSound) {
            playSound('/sounds/beep.mp3');
        }
        if (isAnimating) return;
        
        setIsAnimating(true);
        const newPosition = getRandomCoordinates();
        const startPosition = { ...position };
        const startTime = performance.now();
        
        const distance = Math.sqrt(
            Math.pow(newPosition.x - startPosition.x, 2) + 
            Math.pow(newPosition.y - startPosition.y, 2)
        );
        
        const duration = Math.max(300, distance);
        
        const animateMove = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const easeProgress = progress * (2 - progress);
            
            const currentX = startPosition.x + (newPosition.x - startPosition.x) * easeProgress;
            const currentY = startPosition.y + (newPosition.y - startPosition.y) * easeProgress;
            
            setPosition({ x: currentX, y: currentY });
            
            if (progress < 1) {
                requestAnimationFrame(animateMove);
            } else {
                setPosition(newPosition);
                setIsAnimating(false);
            }
        };
        
        requestAnimationFrame(animateMove);
        setCurrentMessage(getRandomMessage());
    };

    return (
        <button 
            ref={buttonRef}
            className={`button-game`}
            onMouseDown={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
            onMouseEnter={moveButton}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                transition: 'none'
            }}
        >
            {currentMessage}
        </button>
    );
};

export default Button;