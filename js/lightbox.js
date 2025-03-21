// Minimal Lightbox Gallery

document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'minimal-lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        background-color: rgba(255, 255, 255, 0.92);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightboxContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        transition: transform 0.3s ease;
        transform: scale(0.9);
    `;

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.style.cssText = `
        display: block;
        max-width: 100%;
        max-height: 90vh;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    `;
    
    const imageTitle = document.createElement('div');
    imageTitle.className = 'lightbox-title';
    imageTitle.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 0;
        width: 100%;
        padding: 10px 0;
        color: var(--color-earth-dark);
        font-size: 1rem;
        text-align: center;
        font-family: var(--font-serif);
    `;

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background: var(--color-clay);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        line-height: 20px;
        cursor: pointer;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background-color 0.2s;
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--color-deep-terracotta)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--color-clay)';
    });

    // Append elements
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(imageTitle);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    // Add click event to drawing items
    const drawingItems = document.querySelectorAll('.drawing-item img, .work-image img, .about-image img');
    
    drawingItems.forEach(function(img) {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('src');
            lightboxImage.setAttribute('src', imgSrc);
            
            // Get title from data attribute or alt text
            const title = this.getAttribute('data-title') || this.getAttribute('alt') || '';
            imageTitle.textContent = title;
            
            // Show lightbox
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxContent.style.transform = 'scale(1)';
            }, 10);
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox on button click
    closeButton.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.opacity = '0';
        lightboxContent.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}); 