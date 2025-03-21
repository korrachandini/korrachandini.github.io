// Wabi-Sabi Portfolio JavaScript

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add noise overlay effect to all pages
    addNoiseEffect();
    
    // Initialize all animations
    initScrollAnimations();
    
    // Initialize work filter if on work page
    if (document.querySelector('.portfolio-filter')) {
        initWorkFilter();
    }
    
    // Initialize form validation if on contact page
    if (document.querySelector('.contact-form')) {
        initFormValidation();
    }
    
    // Add brutalist element events
    initBrutalistElements();
    
    // Add a subtle fade-in effect to elements as they enter the viewport
    const fadeInElements = document.querySelectorAll('.work-item, .philosophy, .hero-text');
    
    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Once animation is done, stop observing
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.15, // trigger when 15% visible
        rootMargin: '0px'
    });
    
    // Observe each element
    fadeInElements.forEach(element => {
        // Set initial state (invisible)
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 1.2s ease';
        // Start observing
        observer.observe(element);
    });
    
    // Add fade-in class handler
    document.addEventListener('animationend', function(e) {
        if (e.target.classList.contains('fade-in')) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
        }
    });
    
    // Add subtle movement to the ink-spill element to simulate a natural, organic movement
    const inkSpill = document.querySelector('.ink-spill');
    if (inkSpill) {
        let position = 0;
        let direction = 1;
        let rotation = 15;
        
        // Subtle animation loop
        function animateInkSpill() {
            position += 0.05 * direction;
            
            // Change direction after moving a certain amount
            if (position > 1.5 || position < -1.5) {
                direction *= -1;
            }
            
            // Update rotation slightly
            rotation += 0.01 * direction;
            
            // Apply the transform
            inkSpill.style.transform = `rotate(${rotation}deg) translateY(${position}px)`;
            
            requestAnimationFrame(animateInkSpill);
        }
        
        animateInkSpill();
    }
    
    // Add a slight parallax effect to the hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < 800) { // Only apply parallax in the top section
                heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
    
    // Add a slight hover effect to work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    // Add wabi-sabi imperfection - randomly position some elements slightly off-grid
    function addImperfection() {
        const items = document.querySelectorAll('.work-item:not(.featured)');
        items.forEach(item => {
            // Random rotation between -0.5 and 0.5 degrees
            const rotation = (Math.random() - 0.5) * 1;
            // Random position adjustment between -5px and 5px
            const xOffset = (Math.random() - 0.5) * 10;
            const yOffset = (Math.random() - 0.5) * 10;
            
            item.style.transform = `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`;
            
            // Reset hover effect
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }
    
    addImperfection();
    
    // Custom cursor effect for a more artistic feel (optional)
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    cursorDot.style.width = '5px';
    cursorDot.style.height = '5px';
    cursorDot.style.backgroundColor = 'var(--color-accent)';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.position = 'fixed';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '9999';
    cursorDot.style.transition = 'transform 0.1s ease';
    cursorDot.style.opacity = '0.7';
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Add special behavior on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorDot.style.transform = 'scale(2)';
            cursorDot.style.opacity = '0.5';
        });
        
        element.addEventListener('mouseleave', function() {
            cursorDot.style.transform = 'scale(1)';
            cursorDot.style.opacity = '0.7';
        });
    });
});

// Add dynamic noise effect
function addNoiseEffect() {
    const noiseOverlay = document.querySelector('.noise-overlay');
    if (noiseOverlay) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            noiseOverlay.style.opacity = 0.03 + (x * y) * 0.05;
        });
    }
}

// Initialize scroll-based animations
function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll('.hero-content, .work-item, .about-content, .skills-section, .interests-grid, .portfolio-item, .philosophy-content, .brutalist-container, .brutalist-tile, .interest-card, .contact-content');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // If it's a staggered child element, add specific animation
                if (entry.target.classList.contains('work-item') || 
                    entry.target.classList.contains('portfolio-item') ||
                    entry.target.classList.contains('brutalist-tile') ||
                    entry.target.classList.contains('interest-card')) {
                    
                    // Get all children that should animate
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% visible
        rootMargin: '-20px'
    });
    
    // Observe each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Add scroll indicator if on home page
    if (document.querySelector('.hero')) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<span></span><span></span><span></span>';
        document.querySelector('.hero').appendChild(scrollIndicator);
        
        // Hide indicator on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('hide');
            } else {
                scrollIndicator.classList.remove('hide');
            }
        });
    }
}

// Work page portfolio filter functionality
function initWorkFilter() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 50);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            // Add note about form validation
            const errorMessage = document.createElement('p');
            errorMessage.className = 'form-error handwritten';
            errorMessage.textContent = 'Please fill in all required fields';
            
            // Only add if it doesn't exist already
            if (!document.querySelector('.form-error')) {
                form.appendChild(errorMessage);
            }
        }
    });
    
    // Remove error class when user starts typing
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMessage = document.querySelector('.form-error');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

// Brutalist element interactions
function initBrutalistElements() {
    // Add hover effect to brutalist buttons
    const brutalistButtons = document.querySelectorAll('.brutalist-button');
    
    brutalistButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = `translate(${Math.random() * 3 - 1.5}px, -2px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Add CSS for new animations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Scroll animations */
        @keyframes fadeSlideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-content, .work-item, .about-content, .skills-section, 
        .interests-grid, .portfolio-item, .philosophy-content, 
        .brutalist-container, .brutalist-tile, .interest-card, .contact-content {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .animate-in {
            animation: fadeSlideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        /* Scroll indicator */
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .scroll-indicator span {
            display: block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--color-ink);
            margin: 3px 0;
            animation: scrollBounce 1.5s infinite ease-in-out;
        }
        
        .scroll-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .scroll-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes scrollBounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(10px);
            }
        }
        
        .scroll-indicator.hide {
            opacity: 0;
        }
        
        /* Form validation */
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #9d4e3c;
            box-shadow: 0 0 0 2px rgba(157, 78, 60, 0.2);
        }
        
        .form-error {
            color: var(--color-deep-terracotta);
            margin-top: 10px;
        }
    `;
    
    document.head.appendChild(styleSheet);
} 