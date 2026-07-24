// Open Gift and Reveal Website + Play Music
function openGift() {
    const overlay = document.getElementById('gift-overlay');
    const mainContainer = document.querySelector('.main-container');
    const music = document.getElementById('bg-music');

    if (music) {
        music.play().catch(error => console.log("Audio autoplay restricted by browser:", error));
    }

    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContainer.style.display = 'block';
        startSlideshow();
    }, 800);
}

// Automatic Slideshow Logic
let slideIndex = 0;
function startSlideshow() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }    
    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(startSlideshow, 3500); // Change image every 3.5 seconds
}

// Virtual Cake Cutting Action
function cutCake() {
    const cake = document.getElementById('cake');
    const message = document.getElementById('cake-message');
    
    cake.innerHTML = "🎉 🥳 🍰";
    message.innerHTML = "Happy Birthday to the Best Dad!";
    message.style.color = "#bf953f";
}
