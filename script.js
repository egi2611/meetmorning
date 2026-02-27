const gombals = [
    "Selamat pagi perempuan yang sedang datang bulan, tetap semangat menjalankan aktivitas walau sedang datang bulan",
];

const animations = ['bounce', 'jump', 'wave'];
const gombal = document.getElementById('gombal');

gombal.addEventListener('click', function() {
    playAnimation();
});

function playAnimation() {
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    const randomGombal = gombals[Math.floor(Math.random() * gombals.length)];

    // Apply animation
    applyAnimation(randomAnimation);

    // Show speech bubble
    showSpeechBubble(randomGombal);

    // Spawn effects
    spawnHearts();
    spawnStars();
    spawnEmojis();
}

function applyAnimation(animation) {
    gombal.style.animation = 'none';
    
    // Show blush
    showBlush();
    
    setTimeout(() => {
        switch(animation) {
            case 'bounce':
                gombal.style.animation = 'clickBounce 0.6s ease-in-out';
                break;
            case 'jump':
                gombal.style.animation = 'clickJump 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)';
                break;
            case 'wave':
                gombal.style.animation = 'clickWave 0.7s ease-in-out';
                break;
        }
    }, 10);

    // Reset animation after it finishes
    setTimeout(() => {
        gombal.style.animation = '';
    }, 1000);
}

function showBlush() {
    const blushLeft = document.querySelector('.blush-left');
    const blushRight = document.querySelector('.blush-right');
    
    blushLeft?.classList.add('blush-active');
    blushRight?.classList.add('blush-active');
    
    setTimeout(() => {
        blushLeft?.classList.remove('blush-active');
        blushRight?.classList.remove('blush-active');
    }, 400);
}

function showSpeechBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = text;
    gombal.appendChild(bubble);

    setTimeout(() => {
        bubble.style.animation = 'speechPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) reverse forwards';
    }, 10000); // keep for 10 seconds

    setTimeout(() => {
        bubble.remove();
        // spawn additional flowers after bubble disappears
        spawnExtraFlowers();
    }, 10500);
}

function spawnHearts() {
    const hearts = ['🎀', '💫', '✨', '🌸', '🎯'];
    const container = document.getElementById('clickEffects');

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            
            const x = (Math.random() - 0.5) * 500;
            const y = -250 - Math.random() * 200;
            
            heart.style.setProperty('--tx', x + 'px');
            heart.style.setProperty('--ty', y + 'px');
            heart.style.left = 'calc(50% ' + (x > 0 ? '+' : '') + (x * 0.25) + 'px)';
            heart.style.top = '50%';
            
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1500);
        }, i * 80);
    }
}

function spawnStars() {
    const stars = ['✨', '☄️', '💫', '⭐'];
    const container = document.getElementById('clickEffects');

    for (let i = 0; i < 6; i++) {
        const star = document.createElement('div');
        star.className = 'star-burst';
        star.textContent = stars[Math.floor(Math.random() * stars.length)];
        
        const angle = (Math.PI * 2 * i) / 6;
        const distance = 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');
        star.style.left = 'calc(50%)';
        star.style.top = 'calc(50%)';
        
        container.appendChild(star);
        
        setTimeout(() => star.remove(), 1200);
    }
}

function spawnEmojis() {
    const emojis = ['🌙', '☪️', '🕌'];
    const container = document.getElementById('clickEffects');
    
    for (let i = 0; i < 0; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.className = 'dancing-emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = 'calc(50% + ' + ((i - 1) * 100) + 'px)';
            emoji.style.top = 'calc(50% - 100px)';
            
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 600);
        }, i * 150);
    }
}

// Allow keyboard interaction
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        playAnimation();
    }
});
