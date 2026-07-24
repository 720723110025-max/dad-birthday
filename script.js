document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progressFill');
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    const introTypewriter = document.getElementById('introTypewriter');
    const giftBoxContainer = document.getElementById('giftBoxContainer');
    const giftBox = document.getElementById('giftBox');
    const openGiftBtn = document.getElementById('openGiftBtn');
    
    const popSound = document.getElementById('popSound');
    const cheerSound = document.getElementById('cheerSound');
    
    const birthdayCandle = document.getElementById('birthdayCandle');
    const candleFlame = document.getElementById('candleFlame');
    const cakeInstruction = document.getElementById('cakeInstruction');
    const cakeWish = document.getElementById('cakeWish');
    
    const replayBtn = document.getElementById('replayBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startIntro();
                }, 600);
            }, 400);
        }
        progressFill.style.width = `${progress}%`;
    }, 150);

    const introText = "ஒரு சிறிய அன்பு பரிசு...\nஎன் அன்பான அப்பாவிற்கு ❤️";
    let charIndex = 0;

    function startIntro() {
        typeWriterEffect(introTypewriter, introText, 70, () => {
            setTimeout(() => {
                giftBoxContainer.style.display = 'block';
            }, 500);
        });
    }

    function typeWriterEffect(element, text, speed, callback) {
        if (charIndex < text.length) {
            if (text.charAt(charIndex) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(charIndex);
            }
            charIndex++;
            setTimeout(() => typeWriterEffect(element, text, speed, callback), speed);
        } else if (callback) {
            callback();
        }
    }

        const triggerSurprise = () => {
        // Play background music when surprise is triggered
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.play().catch(e => {
                console.log("Audio autoplay restricted:", e);
            });
        }

        cheerSound.play().catch(e => {});

        introScreen.classList.remove('active');
        introScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('active');

        launchMassiveCelebration();
        startContinuousElements();
        startSlideshow();
    };


    giftBox.addEventListener('click', triggerSurprise);
    openGiftBtn.addEventListener('click', triggerSurprise);

    let currentSlide = 0;
    function startSlideshow() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length === 0) return;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

    let candleBlown = false;
    birthdayCandle.addEventListener('click', () => {
        if (candleBlown) return;
        candleBlown = true;
        
        candleFlame.style.display = 'none';
        cakeInstruction.style.display = 'none';
        cakeWish.classList.remove('hidden');

        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        cheerSound.play().catch(e => {});
        launchFireworksBurst();
    });

    function startContinuousElements() {
        const container = document.getElementById('floatingElements');
        
        setInterval(() => {
            const balloon = document.createElement('div');
            balloon.className = 'floating-item balloon';
            balloon.innerHTML = '🎈';
            balloon.style.left = `${Math.random() * 90}vw`;
            balloon.style.fontSize = `${Math.random() * 20 + 25}px`;
            balloon.style.animationDuration = `${Math.random() * 6 + 6}s`;
            
            balloon.addEventListener('click', (e) => {
                e.stopPropagation();
                popSound.currentTime = 0;
                popSound.play().catch(e => {});
                createSparkles(e.clientX, e.clientY);
                balloon.remove();
            });

            container.appendChild(balloon);
            setTimeout(() => balloon.remove(), 12000);
        }, 1200);

        setInterval(() => {
            const item = document.createElement('div');
            item.className = 'floating-item';
            item.innerHTML = Math.random() > 0.5 ? '❤️' : '🌹';
            item.style.left = `${Math.random() * 95}vw`;
            item.style.fontSize = `${Math.random() * 15 + 18}px`;
            item.style.animationDuration = `${Math.random() * 5 + 5}s`;
            
            container.appendChild(item);
            setTimeout(() => item.remove(), 10000);
        }, 800);
    }

    function createSparkles(x, y) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;
            sparkle.style.fontSize = '16px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.transition = 'all 0.6s ease-out';
            document.body.appendChild(sparkle);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 20;
            const targetX = x + Math.cos(angle) * distance;
            const targetY = y + Math.sin(angle) * distance;

            setTimeout(() => {
                sparkle.style.transform = `translate(${targetX - x}px, ${targetY - y}px) scale(0.5)`;
                sparkle.style.opacity = '0';
            }, 20);

            setTimeout(() => sparkle.remove(), 600);
        }
    }

    function launchMassiveCelebration() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                launchFireworksBurst();
            }, i * 400);
        }
    }

    function launchFireworksBurst() {
        const container = document.getElementById('floatingElements');
        const x = window.innerWidth * (0.2 + Math.random() * 0.6);
        const y = window.innerHeight * (0.3 + Math.random() * 0.4);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.innerHTML = Math.random() > 0.5 ? '⭐' : '✨';
            particle.style.position = 'fixed';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.fontSize = `${Math.random() * 12 + 12}px`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
            container.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 150 + 50;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            setTimeout(() => {
                particle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.3) rotate(360deg)`;
                particle.style.opacity = '0';
            }, 20);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    replayBtn.addEventListener('click', () => window.location.reload());
    whatsappBtn.addEventListener('click', () => {
        const shareText = encodeURIComponent("🎉 இனிய பிறந்தநாள் வாழ்த்துக்கள் அப்பா ❤️ Check out this special surprise!");
        window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    });
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {});
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    });
});
                                               
