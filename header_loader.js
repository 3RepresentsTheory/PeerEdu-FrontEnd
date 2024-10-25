// ∂ØÃ¨º”‘ÿ header.html
fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;
        // ‘ÿ»Î header.js
        const script = document.createElement('script');
        script.src = 'header.js';
        document.body.appendChild(script);
    });