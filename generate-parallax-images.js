const fs = require('fs');
const path = require('path');

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Create twinkling.png (a simple white noise pattern)
const createTwinklingImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create a starry pattern
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.random() * 0.5 + ')';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    return canvas.toDataURL();
};

// Create clouds.png (a simple cloud pattern)
const createCloudsImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create a cloud pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 50 + 20;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    return canvas.toDataURL();
};

// Save the images
const saveImage = (dataUrl, filename) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(imagesDir, filename), base64Data, 'base64');
};

// Generate and save the images
saveImage(createTwinklingImage(), 'stars.jpg');
saveImage(createCloudsImage(), 'clouds.jpg'); 