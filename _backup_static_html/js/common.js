"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const menuLinks = document.querySelectorAll('.main-header .navbar-nav a[href]');

    menuLinks.forEach(function(link) {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });

    menuLinks.forEach(function(link) {
        const href = (link.getAttribute('href') || '').split('#')[0].trim().toLowerCase();
        if (!href || href === '#') return;

        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');

            const dropdownToggle = link.closest('.nav-item.dropdown')?.querySelector('.nav-link.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.classList.add('active');
                dropdownToggle.setAttribute('aria-current', 'page');
            }
        }
    });
});

 // Wait for page to load
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }
        
        const heroLogo = document.getElementById('heroLogo');
        const heroBg = document.getElementById('heroBg');
        const heroContent = document.getElementById('heroContent');
        const heroH2 = heroContent ? heroContent.querySelector('h2') : null;
        const heroH1 = heroContent ? heroContent.querySelector('h1') : null;
        const heroBtn = heroContent ? heroContent.querySelector('.btn') : null;
        const mainHeader = document.getElementById('mainHeader');

        if (!heroLogo || !heroBg || !heroContent || !heroH2 || !heroH1 || !heroBtn || !mainHeader) {
            return;
        }
        
        // Set initial states for text elements with clipPath reveal (bottom to top like section 3 images)
        gsap.set(heroH2, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        gsap.set(heroH1, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        gsap.set(heroBtn, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        
        // Hide hero-bg initially
        heroBg.style.opacity = '0';
        
        // Step 1: Start logo zoom out animation
        setTimeout(function() {
            heroLogo.classList.add('zoom-out');
        }, 10);
        
        // Step 2: After logo zoom out (0.8s), start hero-bg zoom in animation
        setTimeout(function() {
            heroBg.style.opacity = '1';
            heroBg.classList.add('zoom-in');
        }, 1000);
        
        // Step 3: After hero-bg animation (1.2s), reveal text with clipPath like section 3 images
        setTimeout(function() {
            // Animate h2 with bottom to top reveal (like section 3 images)
            gsap.to(heroH2, {
                opacity: 1,
                clipPath: 'inset(0% 0 0 0)',
                duration: 1.5,
                ease: 'power3.out'
            });
            
            // Animate h1 with bottom to top reveal (like section 3 images)
            setTimeout(function() {
                gsap.to(heroH1, {
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }, 200);
            
            // Animate button with bottom to top reveal (like section 3 images)
            setTimeout(function() {
                gsap.to(heroBtn, {
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }, 400);
            
            // Fade in header
            mainHeader.classList.add('fade-in');
        }, 2010);
    });




    // Section 2 animations on scroll with GSAP
    window.addEventListener('load', function() {
        const section2Heading = document.getElementById('section2Heading');
        const section2Para = document.getElementById('section2Para');
        const section2Section = document.querySelector('.section-2');

        if (!section2Heading || !section2Para || !section2Section || typeof gsap === 'undefined') {
            return;
        }
        
        // Set initial state for paragraph - only left to right reveal, no vertical movement
        gsap.set(section2Para, {
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            y: 0
        });
        
        // Use Intersection Observer to trigger animations when section comes into view
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate heading with GSAP (reveal up)
                    gsap.fromTo(section2Heading, 
                        {
                            opacity: 0,
                            y: 50
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out'
                        }
                    );
                    
                    // Animate paragraph - only reading reveal from left to right (no vertical movement)
                    setTimeout(function() {
                        gsap.to(section2Para, {
                            opacity: 1,
                            clipPath: 'inset(0 0% 0 0)',
                            duration: 2.5,
                            ease: 'power2.inOut'
                        });
                    }, 400);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(section2Section);
    });




 // Elevator category sections animations on scroll with GSAP
    window.addEventListener('load', function() {
        // Wait for GSAP to be available
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        // Animation configuration for each section
        const sections = [
            { tagline: 'tagline01', heading: 'heading01', image: 'image01' },
            { tagline: 'tagline02', heading: 'heading02', image: 'image02' },
            { tagline: 'tagline03', heading: 'heading03', image: 'image03' },
            { tagline: 'tagline04', heading: 'heading04', image: 'image04' },
            { tagline: 'tagline05', heading: 'heading05', image: 'image05' }
        ];

        sections.forEach(function(section) {
            const taglineEl = document.getElementById(section.tagline);
            const headingEl = document.getElementById(section.heading);
            const imageEl = document.getElementById(section.image);
            
            // Find the parent section element
            const sectionEl = taglineEl ? taglineEl.closest('.elevator-category-section') : null;

            if (taglineEl && headingEl && imageEl && sectionEl) {
                // Set initial states
                gsap.set(taglineEl, { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
                // Heading: keep position fixed, reveal from bottom using clipPath
                gsap.set(headingEl, { opacity: 1, clipPath: 'inset(100% 0 0 0)' });
                gsap.set(imageEl, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });

                // Use Intersection Observer to trigger animations when section comes into view
                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Animate tagline with reading reveal from left to right
                            gsap.to(taglineEl, {
                                opacity: 1,
                                clipPath: 'inset(0 0% 0 0)',
                                duration: 2.5,
                                ease: 'power2.inOut'
                            });

                            // Animate heading with bottom-to-top reveal mask (no fade/move)
                            setTimeout(function() {
                                gsap.to(headingEl, {
                                    clipPath: 'inset(0% 0 0 0)',
                                    duration: 2.5,
                                    ease: 'power3.out'
                                });
                            }, 400);

                            // Animate image with smooth reveal from bottom to top
                            setTimeout(function() {
                                gsap.to(imageEl, {
                                    opacity: 1,
                                    clipPath: 'inset(0% 0 0 0)',
                                    duration: 0.75,
                                    ease: 'power3.out'
                                });
                            }, 600);

                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

                // Observe the section container
                observer.observe(sectionEl);
            }
        });
    });



      // Interactive Features Section Animation - Reveal like section 3 images
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const featureCards = document.querySelectorAll('.feature-card');
        const featuresSection = document.querySelector('.interactive-features-section');
        const featuresHeading = document.getElementById('featuresSectionHeading');

        if (featuresSection) {
            // Set initial state for heading - reveal from bottom to top
            if (featuresHeading) {
                gsap.set(featuresHeading, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            }

            // Set initial states - reveal from bottom to top using clipPath
            if (featureCards.length > 0) {
                featureCards.forEach(function(card) {
                    gsap.set(card, { 
                        opacity: 0, 
                        clipPath: 'inset(100% 0 0 0)' 
                    });
                });
            }

            // Use Intersection Observer to trigger animations when section comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate heading with bottom to top reveal
                        if (featuresHeading) {
                            gsap.to(featuresHeading, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0 0)',
                                duration: 0.9,
                                ease: 'power3.out'
                            });
                        }

                        // Animate each card with bottom to top reveal (like section 3 images)
                        if (featureCards.length > 0) {
                            featureCards.forEach(function(card, index) {
                                setTimeout(function() {
                                    gsap.to(card, {
                                        opacity: 1,
                                        clipPath: 'inset(0% 0 0 0)',
                                        duration: 0.9,
                                        ease: 'power3.out'
                                    });
                                }, index * 120); // Slightly faster stagger
                            });
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

            observer.observe(featuresSection);
        }
    });

    // Interactive Features Hover Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.feature-card');
        const logoContainer = document.getElementById('logoContainer');
        const logoCircle = document.querySelector('.logo-circle');
        const circleCornerFill = document.querySelector('.circle-corner-fill');

        cards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                const position = this.getAttribute('data-position');
                
                // Add hover class to card
                this.classList.add('hovered');
                
                // Update central logo container and circle
                logoContainer.classList.add('active');
                logoCircle.classList.add('active');
                
                // Update circle corner fill (inside circle)
                circleCornerFill.setAttribute('data-direction', position);
            });

            card.addEventListener('mouseleave', function() {
                // Remove hover class from card
                this.classList.remove('hovered');
                
                // Reset central logo
                logoContainer.classList.remove('active');
                logoCircle.classList.remove('active');
                circleCornerFill.setAttribute('data-direction', 'none');
            });
        });
    });



  // Featured Projects Toggle Functionality
    window.addEventListener('load', function() {
        const toggleButtons = document.querySelectorAll('.project-toggle-btn');
        
        toggleButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const card = this.closest('.project-card');
                const details = card.querySelector('.project-details');
                const isExpanded = card.classList.contains('expanded');
                
                // Get all toggle icons in this card (both collapsed and expanded bars)
                const allPlusIcons = card.querySelectorAll('.toggle-icon.plus');
                const allMinusIcons = card.querySelectorAll('.toggle-icon.minus');
                
                const isDesktopCard = !!card.closest('.featured-projects-desktop');
                const desktopMaxHeight = isDesktopCard
                    ? getComputedStyle(card).getPropertyValue('--project-details-max').trim()
                    : '';

                if (isExpanded) {
                    // Collapse
                    card.classList.remove('expanded');
                    
                    // Update all icons
                    allPlusIcons.forEach(function(icon) {
                        icon.style.display = 'block';
                    });
                    allMinusIcons.forEach(function(icon) {
                        icon.style.display = 'none';
                    });
                    
                    if (typeof gsap !== 'undefined') {
                        gsap.to(details, {
                            maxHeight: 0,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'power2.inOut'
                        });
                    } else {
                        details.style.maxHeight = '0';
                        details.style.opacity = '0';
                    }
                } else {
                    // Expand
                    card.classList.add('expanded');
                    
                    // Update all icons
                    allPlusIcons.forEach(function(icon) {
                        icon.style.display = 'none';
                    });
                    allMinusIcons.forEach(function(icon) {
                        icon.style.display = 'block';
                    });
                    
                    const contentHeight = isDesktopCard && desktopMaxHeight
                        ? desktopMaxHeight
                        : details.scrollHeight + 'px';
                    
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(details, 
                            { opacity: 0, maxHeight: 0 },
                            {
                                opacity: 1,
                                maxHeight: contentHeight,
                                duration: 0.5,
                                ease: 'power2.out',
                                onComplete: function() {
                                    if (!isDesktopCard) {
                                        details.style.maxHeight = 'none';
                                    }
                                }
                            }
                        );
                    } else {
                        details.style.maxHeight = contentHeight;
                        setTimeout(function() {
                            details.style.opacity = '1';
                            if (!isDesktopCard) {
                                details.style.maxHeight = 'none';
                            }
                        }, 10);
                    }
                }
            });
        });
    });

    // Featured Projects Section Animation - Reveal up on section entry
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const featuredProjectsSection = document.querySelector('.featured-projects-section');
    const featuredProjectsTagline = document.getElementById('featuredProjectsTagline');
        const featuredProjectsHeading = document.getElementById('featuredProjectsHeading');
        // Desktop cards
        const projectCards = [
            document.getElementById('projectCard1'),
            document.getElementById('projectCard2'),
            document.getElementById('projectCard3')
        ];
        // Mobile carousel cards
        const projectCardsMobile = [
            document.getElementById('projectCard1Mobile'),
            document.getElementById('projectCard2Mobile'),
            document.getElementById('projectCard3Mobile')
        ];
    // Combine all cards (desktop and mobile)
    const allProjectCards = projectCards.concat(projectCardsMobile).filter(Boolean);

        if (featuredProjectsSection && featuredProjectsHeading) {
            // Set initial states - reveal from bottom to top with clipPath
            if (featuredProjectsTagline) {
                gsap.set(featuredProjectsTagline, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            }
            gsap.set(featuredProjectsHeading, {
                opacity: 0,
                clipPath: 'inset(100% 0 0 0)'
            });
            allProjectCards.forEach(function(card) {
                gsap.set(card, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            });

            // Use Intersection Observer to trigger animations when section comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate tagline with bottom-to-top reveal
                        if (featuredProjectsTagline) {
                            gsap.to(featuredProjectsTagline, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0 0)',
                                duration: 1.5,
                                ease: 'power3.out'
                            });
                        }

                        // Animate heading with bottom-to-top reveal
                        setTimeout(function() {
                            gsap.to(featuredProjectsHeading, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0 0)',
                                duration: 1.5,
                                ease: 'power3.out'
                            });
                        }, 200);

                        // Animate all project cards with bottom-to-top reveal (staggered)
                        if (allProjectCards.length) {
                            setTimeout(function() {
                                gsap.to(allProjectCards, {
                                    opacity: 1,
                                    clipPath: 'inset(0% 0 0 0)',
                                    duration: 1.2,
                                    ease: 'power3.out',
                                    stagger: 0.15
                                });
                            }, 400);
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

            observer.observe(featuredProjectsSection);
        }
        
    });

document.querySelectorAll('.project-toggle-btn').forEach(button => {
    button.addEventListener('click', function () {

        const card = this.closest('.project-card');

        // close other cards (optional)
        document.querySelectorAll('.project-card').forEach(c => {
            if (c !== card) {
                c.classList.remove('active');
            }
        });

        // toggle clicked card
        card.classList.toggle('active');

    });
});


 // Clients Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const clientsSection = document.querySelector('.clients-section');
        const clientsTagline = document.getElementById('clientsTagline');
        const clientsHeading = document.getElementById('clientsHeading');
        const clientsLogoContainer = document.querySelector('.clients-logo-container');

        if (clientsSection && clientsTagline && clientsHeading) {
            // Set initial states
            gsap.set(clientsTagline, { opacity: 0, y: 30 });
            gsap.set(clientsHeading, { opacity: 0, y: 30 });
            gsap.set(clientsLogoContainer, { opacity: 0, y: 50 });

            // Use Intersection Observer to trigger animations when section comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate tagline
                        gsap.to(clientsTagline, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: 'power3.out'
                        });

                        // Animate heading
                        setTimeout(function() {
                            gsap.to(clientsHeading, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: 'power3.out'
                            });
                        }, 200);

                        // Animate logo container
                        setTimeout(function() {
                            gsap.to(clientsLogoContainer, {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: 'power3.out'
                            });
                        }, 400);

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

            observer.observe(clientsSection);
        }
    });


// Elevator Services Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const elevatorServicesSection = document.querySelector('.elevator-services-section');
        const elevatorServicesTagline = document.getElementById('elevatorServicesTagline');
        const elevatorServicesHeading = document.getElementById('elevatorServicesHeading');
        const elevatorServicesLink = document.getElementById('elevatorServicesLink');
        const serviceItems = [
            document.getElementById('serviceItem1'),
            document.getElementById('serviceItem2'),
            document.getElementById('serviceItem3')
        ];

        if (elevatorServicesSection) {
            const isMobileView = window.matchMedia('(max-width: 768px)').matches;

            if (isMobileView) {
                const mobileElements = [
                    elevatorServicesTagline,
                    elevatorServicesHeading,
                    elevatorServicesLink
                ].filter(Boolean);

                mobileElements.forEach(function(element) {
                    gsap.set(element, { opacity: 0, y: 40 });
                });

                const visibleServiceItems = serviceItems.filter(Boolean);

                visibleServiceItems.forEach(function(item) {
                    gsap.set(item, { opacity: 0, y: 40 });
                    const title = item.querySelector('.service-title');
                    const description = item.querySelector('.service-description');
                    if (title) gsap.set(title, { color: '#000000' });
                    if (description) gsap.set(description, { color: '#000000', opacity: 1 });
                });

                const mobileObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (!entry.isIntersecting) return;

                        const revealTimeline = gsap.timeline({
                            defaults: { duration: 1, ease: 'power2.out' }
                        });

                        mobileElements.forEach(function(element) {
                            revealTimeline.to(element, { opacity: 1, y: 0 }, '-=0.2');
                        });

                        visibleServiceItems.forEach(function(item) {
                            revealTimeline.to(item, { opacity: 1, y: 0 }, '-=0.3');
                        });

                        mobileObserver.unobserve(entry.target);
                    });
                }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

                mobileObserver.observe(elevatorServicesSection);
                return;
            }

            // Set initial states
            gsap.set(elevatorServicesTagline, { opacity: 0, y: 30 });
            gsap.set(elevatorServicesHeading, { opacity: 0, y: 30 });
            gsap.set(elevatorServicesLink, { opacity: 0, y: 30 });
            
            // Set service items to grey color initially
            serviceItems.forEach(function(item) {
                if (item) {
                    const title = item.querySelector('.service-title');
                    const description = item.querySelector('.service-description');
                    gsap.set(title, { color: '#999999' });
                    gsap.set(description, { color: '#999999' });
                }
            });

            // Animate left column when section comes into view (bidirectional)
            const servicesTimeline = gsap.timeline({
                paused: true,
                defaults: { duration: 0.8, ease: 'power3.out' }
            });

            servicesTimeline
                .to(elevatorServicesTagline, { opacity: 1, y: 0 })
                .to(elevatorServicesHeading, { opacity: 1, y: 0 }, '+=0.2')
                .to(elevatorServicesLink, { opacity: 1, y: 0 }, '+=0.2');

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: elevatorServicesSection,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    onEnter: () => servicesTimeline.restart(),
                    onEnterBack: () => servicesTimeline.restart(),
                    onLeave: () => servicesTimeline.pause(0),
                    onLeaveBack: () => servicesTimeline.pause(0)
                });
            }

            // Individual observers for each service item - triggers on scroll (bidirectional)
            serviceItems.forEach(function(item) {
                if (item) {
                    const title = item.querySelector('.service-title');
                    const description = item.querySelector('.service-description');
                    
                    const itemObserver = new IntersectionObserver(function(entries) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Animate grey to black when item comes into view (scrolling down)
                                gsap.to(title, {
                                    color: '#000000',
                                    duration: 0.8,
                                    ease: 'power3.out'
                                });
                                gsap.to(description, {
                                    color: '#000000',
                                    duration: 0.8,
                                    ease: 'power3.out'
                                });
                            } else {
                                // Animate black to grey when item leaves view (scrolling up)
                                gsap.to(title, {
                                    color: '#999999',
                                    duration: 0.8,
                                    ease: 'power2.out'
                                });
                                gsap.to(description, {
                                    color: '#999999',
                                    duration: 0.8,
                                    ease: 'power2.out'
                                });
                            }
                        });
                    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

                    itemObserver.observe(item);
                }
            });

            // Scroll-based active/faded state for service items
            const allServiceItems = serviceItems.filter(function(item) { return !!item; });

            if (allServiceItems.length) {
                // Default: all items are faded
                allServiceItems.forEach(function(item) {
                    gsap.set(item, { opacity: 0.3 });
                });

                function setActiveServiceItem(activeItem) {
                    allServiceItems.forEach(function(item) {
                        gsap.to(item, {
                            opacity: item === activeItem ? 1 : 0.3,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    });
                }

                const activeObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            setActiveServiceItem(entry.target);
                        }
                    });
                }, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

                allServiceItems.forEach(function(item) {
                    activeObserver.observe(item);
                });
            }
        }
    });




  // Testimonials Carousel Functionality
        // Always show the first testimonial on page load
        document.addEventListener('DOMContentLoaded', function() {
            showTestimonial(0, false);
        });
    let currentTestimonial = 0;
    const totalTestimonials = 3;
    const testimonialCards = [
        document.getElementById('testimonialCard1'),
        document.getElementById('testimonialCard2'),
        document.getElementById('testimonialCard3')
    ];
    const testimonialTexts = [
        document.getElementById('testimonialText1'),
        document.getElementById('testimonialText2'),
        document.getElementById('testimonialText3')
    ];
    const testimonialDates = [
        document.getElementById('testimonialDate1'),
        document.getElementById('testimonialDate2'),
        document.getElementById('testimonialDate3')
    ];
    const testimonialsImage = document.getElementById('testimonialsImage');
    const testimonialImages = [
        { src: 'img/image-7.png', alt: 'Testimonial Image 1' },
        { src: 'img/image-8.png', alt: 'Testimonial Image 2' },
        { src: 'img/image-9.jpg', alt: 'Testimonial Image 3' }
    ];
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    // Debug logs for missing elements
    if (!testimonialCards[0] || !testimonialCards[1] || !testimonialCards[2]) {
        console.warn('Some testimonial cards are missing from the DOM.');
    }
    if (!testimonialsImage) {
        console.warn('Testimonial image element is missing from the DOM.');
    }
    if (testimonialDots.length === 0) {
        console.warn('Testimonial dots are missing from the DOM.');
    }
    
    function showTestimonial(index, animateImage = true) {
        // Hide all cards
        testimonialCards.forEach(card => {
            if (card) card.style.display = 'none';
        });
        
        // Show current card
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'block';
        }

        if (testimonialsImage && testimonialImages[index]) {
            testimonialsImage.src = testimonialImages[index].src;
            testimonialsImage.alt = testimonialImages[index].alt;
            if (typeof gsap !== 'undefined') {
                if (animateImage) {
                    requestAnimationFrame(() => {
                        gsap.fromTo(
                            testimonialsImage,
                            { clipPath: 'inset(0% 0 100% 0)', opacity: 0 },
                            {
                                clipPath: 'inset(0% 0 0% 0)',
                                opacity: 1,
                                duration: 1.6,
                                ease: 'power2.inOut',
                                overwrite: 'auto'
                            }
                        );
                    });
                } else {
                    gsap.set(testimonialsImage, { clipPath: 'inset(0% 0 0% 0)', opacity: 1 });
                }
            } else {
                testimonialsImage.style.opacity = 1;
            }
        }

        if (typeof gsap !== 'undefined' && testimonialTexts[index]) {
            gsap.set(testimonialTexts[index], {
                opacity: 0,
                y: 20
            });
            gsap.to(testimonialTexts[index], {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power2.inOut',
                overwrite: 'auto'
            });
        }
        
        // Update dots
        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentTestimonial = index;
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        const nextBtn = document.getElementById('testimonialsNext');
        const prevBtn = document.getElementById('testimonialsPrev');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const next = (currentTestimonial + 1) % totalTestimonials;
                showTestimonial(next, true);
            });
            console.log('Attached click listener to testimonialsNext');
        } else {
            console.warn('testimonialsNext button not found');
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                const prev = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(prev, true);
            });
            console.log('Attached click listener to testimonialsPrev');
        } else {
            console.warn('testimonialsPrev button not found');
        }
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index, true);
            });
            console.log('Attached click listener to testimonial dot', index);
        });
    });
    
    // Testimonials Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const testimonialsSection = document.querySelector('.testimonials-section');
        const testimonialsTagline = document.getElementById('testimonialsTagline');
        const testimonialsHeading = document.getElementById('testimonialsHeading');
        const testimonialsImage = document.getElementById('testimonialsImage');
        if (testimonialsSection) {
            // Set initial states
            gsap.set(testimonialsTagline, { opacity: 0, y: 0 });
            gsap.set(testimonialsHeading, { opacity: 0, y: 0, clipPath: 'inset(100% 0 0 0)' });
            gsap.set(testimonialsImage, { opacity: 0, clipPath: 'inset(0% 0 100% 0)' });
            
            // Set testimonial texts and dates to grey initially
            testimonialTexts.forEach(function(text) {
                if (text) gsap.set(text, { color: '#999999' });
            });
            testimonialDates.forEach(function(date) {
                if (date) gsap.set(date, { color: '#999999' });
            });

            // Animate heading and image when section comes into view
            const sectionObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate tagline
                        gsap.to(testimonialsTagline, {
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power3.out'
                        });

                        // Animate heading from bottom to top
                        setTimeout(function() {
                            gsap.to(testimonialsHeading, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0 0)',
                                duration: 1.5,
                                ease: 'power3.out'
                            });
                        }, 200);

                        // Animate image from top to bottom and testimonial card simultaneously
                        setTimeout(function() {
                            // Animate image
                            gsap.to(testimonialsImage, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0% 0)',
                                duration: 3,
                                ease: 'power2.inOut'
                            });
                            
                            // Start testimonial text color animation at the same time
                            const currentCard = testimonialCards[currentTestimonial];
                            if (currentCard) {
                                const currentText = testimonialTexts[currentTestimonial];
                                const currentDate = testimonialDates[currentTestimonial];
                                
                                if (currentText) {
                                    gsap.to(currentText, {
                                        color: '#000000',
                                        duration: 1.2,
                                        ease: 'power2.out'
                                    });
                                }
                                
                                if (currentDate) {
                                    gsap.to(currentDate, {
                                        color: '#000000',
                                        duration: 1.2,
                                        ease: 'power2.out'
                                    });
                                }
                            }
                        }, 400);

                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

            sectionObserver.observe(testimonialsSection);

            // Individual observers for testimonial texts and dates - bidirectional
            const allTextElements = [...testimonialTexts, ...testimonialDates];
            
            allTextElements.forEach(function(element) {
                if (element) {
                    const textObserver = new IntersectionObserver(function(entries) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Animate grey to black when visible
                                gsap.to(element, {
                                    color: '#000000',
                                    duration: 1.2,
                                    ease: 'power2.out'
                                });
                            } else {
                                // Animate black to grey when not visible
                                gsap.to(element, {
                                    color: '#999999',
                                    duration: 1.2,
                                    ease: 'power2.out'
                                });
                            }
                        });
                    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

                    textObserver.observe(element);
                }
            });
        }
    });




window.addEventListener('load', function() {
    const blogsSection = document.querySelector('.blogs-section');
    const blogsSwiper = document.querySelector('.blogs-swiper');

    if (blogsSwiper && typeof Swiper !== 'undefined') {
        window.blogsSwiperInstance = new Swiper('.blogs-swiper', {
            slidesPerView: 3,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    if (!blogsSection || typeof gsap === 'undefined') {
        return;
    }

    gsap.set(['#blogsTagline', '#blogsHeading', '.blog-card'], {
        opacity: 0,
        y: 40
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to('#blogsTagline', { opacity: 1, y: 0, duration: 1 });
                gsap.to('#blogsHeading', { opacity: 1, y: 0, duration: 1, delay: 0.2 });
                gsap.to('.blog-card', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    delay: 0.4
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(blogsSection);
});




 // Consultation Banner Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const consultationBannerHeading = document.getElementById('consultationBannerHeading');
        const consultationBannerDescription = document.getElementById('consultationBannerDescription');
        const consultationBannerCta = document.getElementById('consultationBannerCta');
        const consultationBannerSection = document.querySelector('.consultation-banner-section');

        if (consultationBannerSection) {
            // Set initial states
            if (consultationBannerHeading) {
                gsap.set(consultationBannerHeading, {
                    opacity: 0,
                    y: 30
                });
            }

            if (consultationBannerDescription) {
                gsap.set(consultationBannerDescription, {
                    opacity: 0,
                    y: 30
                });
            }

            if (consultationBannerCta) {
                gsap.set(consultationBannerCta, {
                    opacity: 0,
                    y: 30
                });
            }

            // Use Intersection Observer to trigger animations when section comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate heading
                        if (consultationBannerHeading) {
                            gsap.to(consultationBannerHeading, {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: 'power3.out'
                            });
                        }

                        // Animate description
                        if (consultationBannerDescription) {
                            setTimeout(function() {
                                gsap.to(consultationBannerDescription, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    ease: 'power3.out'
                                });
                            }, 200);
                        }

                        // Animate CTA
                        if (consultationBannerCta) {
                            setTimeout(function() {
                                gsap.to(consultationBannerCta, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    ease: 'power3.out'
                                });
                            }, 400);
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(consultationBannerSection);
        }
    });



    // About us 








      // About Us Hero Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const aboutUsHeroTagline = document.getElementById('aboutUsHeroTagline');
        const aboutUsHeroHeading = document.getElementById('aboutUsHeroHeading');
        const aboutUsHeroText = document.getElementById('aboutUsHeroText');
        const aboutUsHeroSection = document.querySelector('.about-us-hero-section');

        if (!aboutUsHeroSection) return;

        // Set initial states (reveal bottom -> top)
        if (aboutUsHeroTagline) {
            gsap.set(aboutUsHeroTagline, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }
        if (aboutUsHeroHeading) {
            gsap.set(aboutUsHeroHeading, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }
        if (aboutUsHeroText) {
            gsap.set(aboutUsHeroText, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (aboutUsHeroTagline) {
                    gsap.to(aboutUsHeroTagline, {
                        opacity: 1,
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.2,
                        ease: 'power3.out'
                    });
                }

                if (aboutUsHeroHeading) {
                    setTimeout(function() {
                        gsap.to(aboutUsHeroHeading, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 1.2,
                            ease: 'power3.out'
                        });
                    }, 200);
                }

                if (aboutUsHeroText) {
                    setTimeout(function() {
                        gsap.to(aboutUsHeroText, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 1.2,
                            ease: 'power3.out'
                        });
                    }, 350);
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(aboutUsHeroSection);
    });




    // Video zoom on scroll: 70% -> 100% (Desktop Only)
  window.addEventListener('load', function () {
    const section = document.querySelector('.video-scroll-wrapper');
    const video = section ? section.querySelector('.scroll-video') : null;
    const stage = section ? section.querySelector('.video-stage') : null;
    const spacer = section ? section.querySelector('.video-pin-spacer') : null;
    if (!section || !video || !stage || !spacer) return;

    // Check if mobile - disable animation on mobile
    function isMobileDevice() {
      return window.innerWidth <= 768;
    }

    function setMobileStatic() {
      video.style.setProperty('--video-scale', '1');
      stage.style.setProperty('--video-radius', '16px');
      stage.style.setProperty('--video-width', '100%');
      stage.classList.add('mobile-static');
      stage.classList.remove('is-pinned', 'is-ended');
      spacer.style.height = '0';
      section.style.minHeight = 'auto';
    }

    // Check on initial load
    if (isMobileDevice()) {
      setMobileStatic();

      // Re-check on resize
      window.addEventListener(
        'resize',
        function () {
          if (isMobileDevice()) {
            setMobileStatic();
          }
        },
        { passive: true }
      );

      return; // Exit early, no animation
    }

    // UPDATED: Only 70% -> 100%
    const steps = [0.4, 1.0];

    const clamp01 = (n) => Math.max(0, Math.min(1, n));
    let rafId = null;

    // UPDATED: Start at 70%
    let smoothScale = 0.4;
    let smoothRadius = 40;
    let smoothWidthVw = 90;

    function computeScale(progress) {
      const p = clamp01(progress);
      const segments = steps.length - 1; // 1
      const segmentSize = 1 / segments;  // 1

      const idx = Math.min(segments - 1, Math.floor(p / segmentSize));
      const local = (p - idx * segmentSize) / segmentSize;

      return steps[idx] + (steps[idx + 1] - steps[idx]) * local;
    }

    function update() {
      rafId = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const sectionTop = section.getBoundingClientRect().top + scrollY;
      const pinTop = 80; // must match CSS .video-stage.is-pinned top
      const stageHeight = stage.getBoundingClientRect().height || 0;

      // Ensure the section is tall enough to contain the video even at 100vw.
      const fullWidthStageHeight =
        (video.videoWidth && video.videoHeight)
          ? (window.innerWidth * (video.videoHeight / video.videoWidth))
          : stageHeight;

      const neededMinHeight = Math.ceil(vh + fullWidthStageHeight + pinTop);
      section.style.minHeight = neededMinHeight + 'px';

      const sectionHeight = section.offsetHeight;

      const start = sectionTop;
      const end = sectionTop + Math.max(1, sectionHeight - stageHeight - pinTop);

      // JS pin: fixed while inside range, then "end" state at section bottom.
      const shouldPin = scrollY >= start && scrollY < end;
      const isEnded = scrollY >= end;

      if (shouldPin) {
        spacer.style.height = stageHeight + 'px';
        stage.classList.add('is-pinned');
        stage.classList.remove('is-ended');
      } else {
        stage.classList.remove('is-pinned');

        if (isEnded) {
          spacer.style.height = stageHeight + 'px';
          stage.classList.add('is-ended');
        } else {
          spacer.style.height = '';
          stage.classList.remove('is-ended');
        }
      }

      let progress = 0;
      if (scrollY <= start) {
        progress = 0;
      } else if (scrollY >= end) {
        progress = 1;
      } else {
        progress = (scrollY - start) / (end - start);
      }

      // Scale: 0.7 -> 1.0
      const targetScale = computeScale(progress);

      // Width: 90vw -> 100vw
      const targetWidthVw = 90 + (10 * clamp01(progress));

      // Border radius animation
      const radiusStart = 20;
      const radiusEnd = 0;
      const targetRadius = radiusStart + (radiusEnd - radiusStart) * clamp01(progress);

      // Smooth easing
      const ease = 0.3;
      smoothScale += (targetScale - smoothScale) * ease;
      smoothRadius += (targetRadius - smoothRadius) * ease;
      smoothWidthVw += (targetWidthVw - smoothWidthVw) * ease;

      video.style.setProperty('--video-scale', smoothScale.toFixed(3));
      stage.style.setProperty('--video-radius', smoothRadius.toFixed(1) + 'px');
      stage.style.setProperty('--video-width', smoothWidthVw.toFixed(2) + 'vw');
    }

    function onScrollOrResize() {
      // Re-check if mobile on resize - if mobile, disable animation
      if (isMobileDevice()) {
        setMobileStatic();
        return;
      }

      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    }

    // UPDATED: Start scale at 70%
    video.style.setProperty('--video-scale', '0.7');

    update();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
  });




    // Company Overview Section Animation (reveal bottom -> top)
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') return;

        const section = document.querySelector('.about-company-section');
        if (!section) return;

        const tagline = section.querySelector('.about-company-tagline');
        const heading = section.querySelector('.about-company-heading');
        const paragraphs = section.querySelectorAll('.about-company-description p');
        const statLabels = section.querySelectorAll('.about-stat-label');
        const statNumbers = section.querySelectorAll('.about-stat-number');

        // Reveal elements (include counter numbers in clip-path reveal)
        const all = [];
        if (tagline) all.push(tagline);
        if (heading) all.push(heading);
        paragraphs.forEach(p => all.push(p));
        statLabels.forEach(l => all.push(l));
        statNumbers.forEach(n => all.push(n));

        all.forEach(el => {
            gsap.set(el, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        });

        let didCount = false;
        function animateCountUp() {
            if (didCount) return;
            didCount = true;

            const counters = section.querySelectorAll('.about-stat-count[data-target]');
            const duration = 5000; // ms (slower)
            const startValue = 0;

            function easeOutCubic(t) {
                return 1 - Math.pow(1 - t, 3);
            }

            counters.forEach(function(el) {
                const target = parseInt(el.getAttribute('data-target') || '0', 10);
                if (!Number.isFinite(target) || target < 1) return;

                const from = Math.min(startValue, target);
                const startTime = performance.now();

                function tick(now) {
                    const t = Math.min(1, (now - startTime) / duration);
                    const eased = easeOutCubic(t);
                    const value = Math.round(from + (target - from) * eased);
                    el.textContent = String(value);
                    if (t < 1) requestAnimationFrame(tick);
                }

                el.textContent = String(from);
                requestAnimationFrame(tick);
            });
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                gsap.to(all, {
                    opacity: 1,
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 1.1,
                    ease: 'power3.out',
                    stagger: 0.12
                });

                animateCountUp();
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.35, rootMargin: '0px 0px -20% 0px' });

        observer.observe(section);
    });





     // Our Approach Section Animation (grey to black line by line)
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') return;

        const section = document.querySelector('.about-approach-section');
        if (!section) return;

        const tagline = section.querySelector('.about-approach-tagline');
        const heading = section.querySelector('.about-approach-heading');
        const textParagraphs = section.querySelectorAll('.about-approach-text');
        const textLines = section.querySelectorAll('.text-line');

        // Set initial states - tagline and heading start visible (they don't need grey-to-black)
        if (tagline) {
            gsap.set(tagline, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }
        if (heading) {
            gsap.set(heading, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }

        // Set all paragraphs to grey and lines to grey + low opacity initially
        textParagraphs.forEach(para => {
            gsap.set(para, { color: '#999999' });
        });
        textLines.forEach(line => {
            gsap.set(line, { color: '#999999', opacity: 0.3 });
        });

        let rafId = null;
        let lastScrollY = window.scrollY || window.pageYOffset;

        function updateLinesOnScroll() {
            if (rafId) return;
            rafId = window.requestAnimationFrame(function() {
                rafId = null;

                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const sectionTop = rect.top;
                const sectionHeight = rect.height;

                // Only animate when section is in viewport
                if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
                    return;
                }

                // Reveal tagline and heading when section enters viewport
                if (tagline && !tagline.classList.contains('revealed')) {
                    const taglineRect = tagline.getBoundingClientRect();
                    if (taglineRect.top < windowHeight * 0.8) {
                        tagline.classList.add('revealed');
                        gsap.to(tagline, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 2,
                            ease: 'power3.out'
                        });
                    }
                }

                if (heading && !heading.classList.contains('revealed')) {
                    const headingRect = heading.getBoundingClientRect();
                    if (headingRect.top < windowHeight * 0.8) {
                        heading.classList.add('revealed');
                        gsap.to(heading, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 2,
                            ease: 'power3.out'
                        });
                    }
                }

                // Determine scroll direction
                const currentScrollY = window.scrollY || window.pageYOffset;
                const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                lastScrollY = currentScrollY;

                const triggerPoint = windowHeight * 0.7; // Trigger when line reaches 70% of viewport

                // Animate each line based on scroll position and direction
                textLines.forEach(function(line, index) {
                    const lineRect = line.getBoundingClientRect();
                    const lineTop = lineRect.top;
                    const lineBottom = lineRect.bottom;
                    const isPastTrigger = lineTop < triggerPoint && lineTop > 0 && lineBottom > 0;

                    // Turn black when scrolling down and past trigger, grey when scrolling up and above trigger
                    if (isPastTrigger) {
                        // Active line - black and fully opaque
                        gsap.to(line, {
                            color: '#000000',
                            opacity: 1,
                            duration: 1.2,
                            ease: 'power2.out'
                        });
                    } else if (lineTop >= triggerPoint || lineTop < 0) {
                        // Inactive / out-of-focus line - grey and faded
                        gsap.to(line, {
                            color: '#999999',
                            opacity: 0.3,
                            duration: 1.2,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        }

        function handleScroll() {
            const currentScrollY = window.scrollY || window.pageYOffset;
            // Only update if user is actively scrolling
            if (Math.abs(currentScrollY - lastScrollY) > 1) {
                updateLinesOnScroll();
            }
        }

        // Use IntersectionObserver to start/stop scroll tracking
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', handleScroll, { passive: true });
                } else {
                    window.removeEventListener('scroll', handleScroll);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(section);
    });







              // Mission & Vision section: headings/text reveal up, images reveal top -> bottom
    window.addEventListener('load', function() {
        const section = document.querySelector('.mission-vision-section');
        const missionImage = document.getElementById('missionImage');
        const visionImage = document.getElementById('visionImage');

        if (!section) return;

                const hasGSAP = typeof gsap !== 'undefined';

                // Headings and text elements (Mission & Vision), each row reveals when its own block enters view
                if (hasGSAP) {
                    const missionRow = section.querySelector('.mission-vision-top');
                    const visionRow = section.querySelector('.mission-vision-bottom');

                    const missionHeading = section.querySelector('.mission-block .mission-vision-heading');
                    const missionTexts = section.querySelectorAll('.mission-block .mission-vision-text');

                    const visionHeading = section.querySelector('.vision-block .mission-vision-heading');
                    const visionTexts = section.querySelectorAll('.vision-block .mission-vision-text');

                    // Initial state: hidden with bottom-to-top mask
                    const initElements = [];
                    if (missionHeading) initElements.push(missionHeading);
                    missionTexts.forEach(function(el) { initElements.push(el); });
                    if (visionHeading) initElements.push(visionHeading);
                    visionTexts.forEach(function(el) { initElements.push(el); });

                    initElements.forEach(function(el) {
                        gsap.set(el, {
                            opacity: 0,
                            clipPath: 'inset(100% 0 0 0)'
                        });
                    });

                    // Mission row observer
                    if (missionRow && (missionHeading || missionTexts.length)) {
                        const missionEls = [];
                        if (missionHeading) missionEls.push(missionHeading);
                        missionTexts.forEach(function(el) { missionEls.push(el); });

                        const missionObserver = new IntersectionObserver(function(entries) {
                            entries.forEach(function(entry) {
                                if (!entry.isIntersecting) return;

                                gsap.to(missionEls, {
                                    opacity: 1,
                                    clipPath: 'inset(0% 0 0 0)',
                                    duration: 1.3,
                                    ease: 'power3.out',
                                    stagger: 0.1
                                });

                                missionObserver.unobserve(entry.target);
                            });
                        }, { threshold: 0.25, rootMargin: '0px 0px -15% 0px' });

                        missionObserver.observe(missionRow);
                    }

                    // Vision row observer
                    if (visionRow && (visionHeading || visionTexts.length)) {
                        const visionEls = [];
                        if (visionHeading) visionEls.push(visionHeading);
                        visionTexts.forEach(function(el) { visionEls.push(el); });

                        const visionObserver = new IntersectionObserver(function(entries) {
                            entries.forEach(function(entry) {
                                if (!entry.isIntersecting) return;

                                gsap.to(visionEls, {
                                    opacity: 1,
                                    clipPath: 'inset(0% 0 0 0)',
                                    duration: 1.3,
                                    ease: 'power3.out',
                                    stagger: 0.1
                                });

                                visionObserver.unobserve(entry.target);
                            });
                        }, { threshold: 0.25, rootMargin: '0px 0px -15% 0px' });

                        visionObserver.observe(visionRow);
                    }
                }

                let hasAnimated = false;

        function setupRevealAnimation(img) {
            if (!img) return;

            const wrapper = img.closest('.auto-scroll-image-wrapper');
            if (!wrapper) return;

            function startReveal() {
                // Set initial state - image hidden (clipped from bottom)
                img.style.clipPath = 'inset(0 0 100% 0)';
                img.style.willChange = 'clip-path';
                img.style.opacity = '1';
                
                let revealProgress = 0; // 0 = hidden, 1 = fully revealed
                const revealSpeed = 0.04; // Faster speed for quick reveal
                let isAnimating = true;

                function animate() {
                    if (!isAnimating) return;

                    revealProgress += revealSpeed;

                    // Check if fully revealed (reached bottom)
                    if (revealProgress >= 1) {
                        revealProgress = 1;
                        isAnimating = false;
                        img.style.clipPath = 'inset(0% 0 0 0)'; // Fully revealed
                        img.style.willChange = 'auto';
                        return;
                    }

                    // Calculate clip-path: inset(top right bottom left)
                    // Bottom starts at 100% (hidden) and goes to 0% (revealed)
                    const bottomPercent = (1 - revealProgress) * 100;
                    img.style.clipPath = `inset(0 0 ${bottomPercent}% 0)`;
                    
                    requestAnimationFrame(animate);
                }

                // Start animation immediately
                animate();
            }

            // Wait for image to load
            if (img.complete && img.naturalHeight > 0) {
                setTimeout(startReveal, 100);
            } else {
                img.addEventListener('load', function() {
                    setTimeout(startReveal, 100);
                });
            }
        }

        // Use separate IntersectionObserver for each image to trigger when they enter viewport
        if (missionImage) {
            const missionWrapper = missionImage.closest('.mission-vision-image-block');
            if (missionWrapper) {
                const missionObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setupRevealAnimation(missionImage);
                            missionObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                missionObserver.observe(missionWrapper);
            }
        }

        if (visionImage) {
            const visionWrapper = visionImage.closest('.mission-vision-image-block');
            if (visionWrapper) {
                const visionObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setupRevealAnimation(visionImage);
                            visionObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                visionObserver.observe(visionWrapper);
            }
        }
    });



      // Founder's Message Section Animation (reveal bottom -> top)
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') return;

        const section = document.querySelector('.founders-message-section');
        if (!section) return;

        const tagline = document.getElementById('foundersMessageTagline');
        const heading = document.getElementById('foundersMessageHeading');
        const quote = document.getElementById('foundersMessageQuote');
        const text = document.getElementById('foundersMessageText');
        const name = document.getElementById('foundersMessageName');
        const title = document.getElementById('foundersMessageTitle');
        const image = document.getElementById('foundersMessageImage');

        // All text elements to reveal
        const textElements = [];
        if (tagline) textElements.push(tagline);
        if (heading) textElements.push(heading);
        if (quote) textElements.push(quote);
        if (text) textElements.push(text);
        if (name) textElements.push(name);
        if (title) textElements.push(title);

        // Set initial states (bottom -> top, no clip-path for reliability)
        textElements.forEach(el => {
            gsap.set(el, { opacity: 0, y: 28, willChange: 'transform, opacity' });
        });

        // Image reveal (no clip-path for reliability)
        if (image) {
            gsap.set(image, { opacity: 0, y: 28, willChange: 'transform, opacity' });
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Animate text elements with stagger
                gsap.to(textElements, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power3.out',
                    stagger: 0.12,
                    clearProps: 'willChange'
                });

                // Animate image
                if (image) {
                    setTimeout(function() {
                        gsap.to(image, {
                            opacity: 1,
                            y: 0,
                            duration: 1.0,
                            ease: 'power3.out',
                            clearProps: 'willChange'
                        });
                    }, 300);
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(section);
    });





      // Safety Standards & Certifications Section Animation (reveal bottom -> top)
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') return;

        const section = document.querySelector('.about-certifications-section');
        if (!section) return;

        const tagline = section.querySelector('.about-certifications-tagline');
        const heading = section.querySelector('.about-certifications-heading');
        const intro = section.querySelector('.about-certifications-intro');
        const certCards = section.querySelectorAll('.about-cert-card');

        // All elements to reveal
        const elements = [];
        if (tagline) elements.push(tagline);
        if (heading) elements.push(heading);
        if (intro) elements.push(intro);
        certCards.forEach(card => {
            const title = card.querySelector('.about-cert-title');
            const text = card.querySelector('.about-cert-text');
            const img = card.querySelector('.about-cert-img');
            if (title) elements.push(title);
            if (text) elements.push(text);
            if (img) elements.push(img);
        });

        // Set initial states (reveal bottom -> top)
        elements.forEach(el => {
            gsap.set(el, { opacity: 0, y: 28, willChange: 'transform, opacity' });
        });

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Animate elements with stagger
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power3.out',
                    stagger: 0.12,
                    clearProps: 'willChange'
                });

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(section);
    });




      // Consultation Banner Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const consultationBannerHeading = document.getElementById('consultationBannerHeading');
        const consultationBannerDescription = document.getElementById('consultationBannerDescription');
        const consultationBannerCta = document.getElementById('consultationBannerCta');
        const consultationBannerSection = document.querySelector('.consultation-banner-section');

        if (consultationBannerSection) {
            // Set initial states
            if (consultationBannerHeading) {
                gsap.set(consultationBannerHeading, {
                    opacity: 0,
                    y: 30
                });
            }

            if (consultationBannerDescription) {
                gsap.set(consultationBannerDescription, {
                    opacity: 0,
                    y: 30
                });
            }

            if (consultationBannerCta) {
                gsap.set(consultationBannerCta, {
                    opacity: 0,
                    y: 30
                });
            }

            // Use Intersection Observer to trigger animations when section comes into view
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate heading
                        if (consultationBannerHeading) {
                            gsap.to(consultationBannerHeading, {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: 'power3.out'
                            });
                        }

                        // Animate description
                        if (consultationBannerDescription) {
                            setTimeout(function() {
                                gsap.to(consultationBannerDescription, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    ease: 'power3.out'
                                });
                            }, 200);
                        }

                        // Animate CTA
                        if (consultationBannerCta) {
                            setTimeout(function() {
                                gsap.to(consultationBannerCta, {
                                    opacity: 1,
                                    y: 0,
                                    duration: 1,
                                    ease: 'power3.out'
                                });
                            }, 400);
                        }

                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(consultationBannerSection);
        }
    });




     document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".resource-card");
    const btn = document.getElementById("loadMoreBtn");

    const initialCount = 6;
    const increment = 3;
    let visibleCount = initialCount;

    function updateCards() {
      cards.forEach((card, index) => {
        card.style.display = index < visibleCount ? "block" : "none";
      });

      // Toggle button text
      if (visibleCount >= cards.length) {
        btn.textContent = "Load Less";
      } else {
        btn.textContent = "Load More";
      }
    }

    // Initial load
    updateCards();

    btn.addEventListener("click", function () {
      if (visibleCount >= cards.length) {
        // Load Less
        visibleCount = initialCount;
      } else {
        // Load More
        visibleCount += increment;
      }

      updateCards();

      // Optional: scroll back to grid on Load Less
      if (btn.textContent === "Load Less") return;
      document.querySelector(".resources-section")
        .scrollIntoView({ behavior: "smooth" });
    });
  });




        const tabs = document.querySelectorAll(".career-tab");
        const rows = document.querySelectorAll(".career-row");

        /* -----------------------------
           COUNT & UPDATE TAB LABELS
        ----------------------------- */
        function updateTabCounts() {
            const counts = {};
            let total = 0;

            rows.forEach(row => {
                const category = row.dataset.category;
                counts[category] = (counts[category] || 0) + 1;
                total++;
            });

            tabs.forEach(tab => {
                const category = tab.dataset.tab;

                // remove old count if exists
                const baseText = tab.textContent.replace(/\s*\(\d+\)$/, "");

                if (category === "all") {
                    tab.textContent = `${baseText} (${total})`;
                } else {
                    tab.textContent = `${baseText} (${counts[category] || 0})`;
                }
            });
        }

        /* -----------------------------
           FILTER JOBS
        ----------------------------- */
        function filterRows(category) {
            rows.forEach(row => {
                if (category === "all") {
                    row.style.display = "grid";
                } else {
                    row.style.display =
                        row.dataset.category === category ? "grid" : "none";
                }
            });
        }

        /* -----------------------------
           INIT
        ----------------------------- */
        updateTabCounts();
        filterRows("all");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const category = tab.dataset.tab;

                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");

                filterRows(category);
            });
        });



           // Product Hero background zoom-in
    window.addEventListener('load', function() {
        const productHeroBg = document.getElementById('productHeroBg');
        if (productHeroBg) {
            productHeroBg.classList.add('zoom-in');
        }
    });








        // Why Choose RM Series Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        // Header section elements
        const whyChooseRmTagline = document.getElementById('whyChooseRmTagline');
        const whyChooseRmHeading = document.getElementById('whyChooseRmHeading');
        const whyChooseRmDescription = document.getElementById('whyChooseRmDescription');
        const whyChooseRmHeaderSection = document.querySelector('.why-choose-rm-header-section');

        // Center image
        const rmCenterImage = document.getElementById('rmCenterImage');
        const rmImageContainer = document.getElementById('rmImageContainer');

        // Feature blocks
        const rmFeature1 = document.getElementById('rmFeature1');
        const rmFeature2 = document.getElementById('rmFeature2');
        const rmFeature3 = document.getElementById('rmFeature3');
        const rmFeature4 = document.getElementById('rmFeature4');

        // Set initial states for header and image (reveal up: bottom to top)
        if (whyChooseRmHeaderSection) {
            if (whyChooseRmTagline) {
                gsap.set(whyChooseRmTagline, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            }
            if (whyChooseRmHeading) {
                gsap.set(whyChooseRmHeading, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            }
            if (whyChooseRmDescription) {
                gsap.set(whyChooseRmDescription, {
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)'
                });
            }
        }

        if (rmCenterImage && rmImageContainer) {
            gsap.set(rmCenterImage, {
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)'
            });
        }

        // Animate header section independently when it enters viewport
        if (whyChooseRmHeaderSection) {
            const headerObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const headerElements = [];
                        if (whyChooseRmTagline) headerElements.push(whyChooseRmTagline);
                        if (whyChooseRmHeading) headerElements.push(whyChooseRmHeading);
                        if (whyChooseRmDescription) headerElements.push(whyChooseRmDescription);

                        if (headerElements.length > 0) {
                            gsap.to(headerElements, {
                                opacity: 1,
                                clipPath: 'inset(0% 0 0 0)',
                                duration: 2.5,
                                ease: 'power2.inOut',
                                stagger: 0.25
                            });
                        }

                        headerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            headerObserver.observe(whyChooseRmHeaderSection);
        }

        // Animate image reveal when image enters viewport
        let hasImageRevealed = false;
        let hasInitialRevealed = false; // Shared flag for scroll-based reveal
        
        const imageRevealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasImageRevealed) {
                    hasImageRevealed = true;
                    hasInitialRevealed = true; // Enable scroll-based reverse reveal
                    
                    // Animate image reveal immediately when user enters
                    if (rmCenterImage) {
                        gsap.to(rmCenterImage, {
                            opacity: 1,
                            clipPath: 'inset(0 0 0% 0)',
                            duration: 1.8,
                            ease: 'power2.out'
                        });
                    }

                    imageRevealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        // Observe the image container to trigger animations when user scrolls to it
        if (rmImageContainer) {
            imageRevealObserver.observe(rmImageContainer);
        }

        // Animate center image with reverse reveal on scroll up
        if (rmCenterImage && rmImageContainer) {
            let lastScrollY = window.scrollY;
            let revealDirection = 'top-bottom';
            let rafId = null;
            let isAnimating = false;

            function updateImageReveal() {
                rafId = null;
                if (isAnimating || !hasInitialRevealed) return;
                
                const rect = rmImageContainer.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const isInViewport = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
                const currentScrollY = window.scrollY;
                const scrollingDown = currentScrollY > lastScrollY;
                const scrollDiff = Math.abs(currentScrollY - lastScrollY);
                
                if (isInViewport && scrollDiff > 5) {
                    if (scrollingDown && revealDirection !== 'top-bottom') {
                        isAnimating = true;
                        gsap.set(rmCenterImage, {
                            clipPath: 'inset(0 0 100% 0)'
                        });
                        gsap.to(rmCenterImage, {
                            opacity: 1,
                            clipPath: 'inset(0 0 0% 0)',
                            duration: 1.8,
                            ease: 'power2.out',
                            onComplete: () => { isAnimating = false; }
                        });
                        revealDirection = 'top-bottom';
                    }
                    // No animation on scroll up (bottom-to-top)
                }
                
                lastScrollY = currentScrollY;
            }

            function onScroll() {
                if (rafId) return;
                rafId = window.requestAnimationFrame(updateImageReveal);
            }

            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Only enable scroll listening, don't set hasInitialRevealed (initial reveal observer handles that)
                        window.addEventListener('scroll', onScroll, { passive: true });
                    } else {
                        window.removeEventListener('scroll', onScroll);
                        // Keep image visible when scrolling back up - don't reset it
                        isAnimating = false;
                    }
                });
            }, { threshold: 0.1 });

            imageObserver.observe(rmImageContainer);
        }

        // Feature blocks remain static (no animation)
    });

    // Product Specifications Section - Static (no animation)

    // Built for These Spaces - GSAP Horizontal Scroll Carousel
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP or ScrollTrigger is not loaded');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const builtForSpacesSection = document.getElementById('builtForSpacesSection');
        const scrollContainer = document.getElementById('builtForSpacesScrollContainer');
        const scrollWrapper = document.getElementById('builtForSpacesScrollWrapper');

        if (!builtForSpacesSection || !scrollContainer || !scrollWrapper) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 769px)', () => {
            const cards = scrollWrapper.querySelectorAll('.space-card');
            if (cards.length === 0) return;

            const cardWidth = cards[0].offsetWidth;
            const gap = 30;
            const totalWidth = (cardWidth + gap) * (cards.length - 1);
            const containerWidth = scrollContainer.offsetWidth;
            const padding = Math.max(containerWidth / 2 - cardWidth / 2, 0);

            scrollWrapper.style.paddingLeft = `${padding}px`;
            scrollWrapper.style.paddingRight = `${padding}px`;

            gsap.set(scrollWrapper, { x: 0 });

            const updateActiveCard = () => {
                const viewportCenter = window.innerWidth / 2;
                let closestCard = null;
                let closestDistance = Infinity;

                cards.forEach((card) => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(viewportCenter - cardCenter);
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCard = card;
                    }
                });

                cards.forEach((card) => {
                    card.classList.toggle('is-active', card === closestCard);
                });
            };

            gsap.to(scrollWrapper, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: builtForSpacesSection,
                    start: 'top top',
                    end: () => `+=${totalWidth + containerWidth}`,
                    pin: builtForSpacesSection,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    pinSpacing: true,
                    onUpdate: updateActiveCard,
                    onRefresh: updateActiveCard
                }
            });

            updateActiveCard();

            return () => {
                scrollWrapper.style.paddingLeft = '0px';
                scrollWrapper.style.paddingRight = '0px';
            };
        });

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                ScrollTrigger.refresh();
            }, 250);
        }, { passive: true });
    });

    // Personalisation Choices - multi-item carousel (3 desktop, 2 tablet, 1 mobile)
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('personalisationCarousel');
        if (!carousel) return;

        const carouselInner = carousel.querySelector('.carousel-inner');
        const indicators = carousel.querySelector('.carousel-indicators');
        if (!carouselInner) return;

        const baseLinks = Array.from(carouselInner.querySelectorAll('.choice-link'));
        let carouselInstance = null;

        const rebuildCarousel = () => {
            let itemsPerSlide = 1;
            if (window.matchMedia('(min-width: 992px)').matches) {
                itemsPerSlide = 3;
            } else if (window.matchMedia('(min-width: 768px)').matches) {
                itemsPerSlide = 2;
            }
            carouselInner.innerHTML = '';

            for (let i = 0; i < baseLinks.length; i += itemsPerSlide) {
                const slide = document.createElement('div');
                slide.className = 'carousel-item';
                if (i === 0) {
                    slide.classList.add('active');
                }

                baseLinks.slice(i, i + itemsPerSlide).forEach((link) => {
                    slide.appendChild(link.cloneNode(true));
                });

                carouselInner.appendChild(slide);
            }

            if (indicators) {
                indicators.innerHTML = '';
                const totalSlides = Math.ceil(baseLinks.length / itemsPerSlide);
                for (let idx = 0; idx < totalSlides; idx += 1) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.setAttribute('data-bs-target', '#personalisationCarousel');
                    btn.setAttribute('data-bs-slide-to', idx.toString());
                    btn.setAttribute('aria-label', `Slide ${idx + 1}`);
                    if (idx === 0) {
                        btn.classList.add('active');
                        btn.setAttribute('aria-current', 'true');
                    }
                    indicators.appendChild(btn);
                }
            }

            if (carouselInstance) {
                carouselInstance.dispose();
            }

            carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel, {
                interval: false,
                ride: false,
                touch: true
            });
        };

        rebuildCarousel();

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(rebuildCarousel, 200);
        }, { passive: true });
    });





      // Projects Hero Section Animation
    window.addEventListener('load', function() {
        if (typeof gsap === 'undefined') {
            console.error('GSAP is not loaded');
            return;
        }

        const projectsHeroTagline = document.getElementById('projectsHeroTagline');
        const projectsHeroHeading = document.getElementById('projectsHeroHeading');
        const projectsHeroText = document.getElementById('projectsHeroText');
        const projectsHeroSection = document.querySelector('.projects-hero-section');

        if (!projectsHeroSection) return;

        // Set initial states (reveal bottom -> top)
        if (projectsHeroTagline) {
            gsap.set(projectsHeroTagline, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }
        if (projectsHeroHeading) {
            gsap.set(projectsHeroHeading, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }
        if (projectsHeroText) {
            gsap.set(projectsHeroText, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (projectsHeroTagline) {
                    gsap.to(projectsHeroTagline, {
                        opacity: 1,
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.2,
                        ease: 'power3.out'
                    });
                }

                if (projectsHeroHeading) {
                    setTimeout(function() {
                        gsap.to(projectsHeroHeading, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 1.2,
                            ease: 'power3.out'
                        });
                    }, 200);
                }

                if (projectsHeroText) {
                    setTimeout(function() {
                        gsap.to(projectsHeroText, {
                            opacity: 1,
                            clipPath: 'inset(0% 0 0 0)',
                            duration: 1.2,
                            ease: 'power3.out'
                        });
                    }, 350);
                }

                observer.unobserve(entry.target);
            });
        }, { threshold: 0.2 });

        observer.observe(projectsHeroSection);
    });





     // Projects Search, Sort, and Filter Functionality
    (function() {
        const searchInput = document.querySelector('.projects-search-input');
        const sortBtn = document.getElementById('sortBtn');
        const filterBtn = document.getElementById('filterBtn');
        const sortDropdown = document.getElementById('sortDropdown');
        const filterDropdown = document.getElementById('filterDropdown');
        const projectCards = document.querySelectorAll('.project-card-item');
        const projectsRow = document.getElementById('projectsRow');
        
        let currentSort = 'name-asc';
        let currentFilter = 'all';
        let searchTerm = '';

        // Toggle dropdowns
        sortBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            filterDropdown.classList.remove('show');
            sortDropdown.classList.toggle('show');
        });

        filterBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sortDropdown.classList.remove('show');
            filterDropdown.classList.toggle('show');
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
                sortDropdown.classList.remove('show');
            }
            if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
                filterDropdown.classList.remove('show');
            }
        });

        // Sort functionality
        sortDropdown.querySelectorAll('.projects-dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentSort = this.getAttribute('data-sort');
                sortBtn.innerHTML = '<i class="fas fa-sort"></i> ' + this.textContent;
                sortDropdown.classList.remove('show');
                filterAndSort();
            });
        });

        // Filter functionality
        filterDropdown.querySelectorAll('.projects-dropdown-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                currentFilter = this.getAttribute('data-filter');
                if (currentFilter === 'all') {
                    filterBtn.innerHTML = '<i class="fas fa-filter"></i> Filters';
                } else {
                    filterBtn.innerHTML = '<i class="fas fa-filter"></i> ' + this.textContent;
                }
                filterDropdown.classList.remove('show');
                filterAndSort();
            });
        });

        // Search functionality
        searchInput.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase().trim();
            filterAndSort();
        });

        // Filter and sort function
        function filterAndSort() {
            let filteredCards = Array.from(projectCards);

            // Apply search filter
            if (searchTerm) {
                filteredCards = filteredCards.filter(card => {
                    const name = card.getAttribute('data-name').toLowerCase();
                    const location = card.querySelector('.project-listing-location').textContent.toLowerCase();
                    return name.includes(searchTerm) || location.includes(searchTerm);
                });
            }

            // Apply category filter
            if (currentFilter !== 'all') {
                filteredCards = filteredCards.filter(card => {
                    const series = card.getAttribute('data-series');
                    const location = card.getAttribute('data-location');
                    
                    if (currentFilter === 'rm-series' || currentFilter === 'vl-series' || currentFilter === 'sl-series') {
                        return series === currentFilter;
                    } else {
                        return location === currentFilter;
                    }
                });
            }

            // Sort filtered cards
            filteredCards.sort((a, b) => {
                let aValue, bValue;
                
                if (currentSort.includes('name')) {
                    aValue = a.getAttribute('data-name');
                    bValue = b.getAttribute('data-name');
                } else if (currentSort.includes('location')) {
                    aValue = a.getAttribute('data-location');
                    bValue = b.getAttribute('data-location');
                }

                if (currentSort.includes('asc')) {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            });

            // Hide all cards first
            projectCards.forEach(card => {
                card.style.display = 'none';
            });

            // Show filtered and sorted cards
            filteredCards.forEach(card => {
                card.style.display = 'block';
            });

            // Show message if no results
            const visibleCards = filteredCards.filter(card => card.style.display !== 'none');
            if (visibleCards.length === 0) {
                if (!document.querySelector('.no-results-message')) {
                    const noResults = document.createElement('div');
                    noResults.className = 'no-results-message';
                    noResults.textContent = 'No projects found matching your criteria.';
                    noResults.style.textAlign = 'center';
                    noResults.style.padding = '40px';
                    noResults.style.color = '#6c757d';
                    noResults.style.fontSize = '18px';
                    projectsRow.appendChild(noResults);
                }
            } else {
                const noResults = document.querySelector('.no-results-message');
                if (noResults) {
                    noResults.remove();
                }
            }

            if (typeof AOS !== 'undefined') {
                AOS.refreshHard();
            }
        }
    })();