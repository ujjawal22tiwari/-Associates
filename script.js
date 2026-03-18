/**
 * JavaScript for Tiwari Infrastructure Pvt Ltd
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // 1.5 Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // 2. Sticky Navbar Effect on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link switching based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // 3. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // Duration logic
            const speed = 200; 
            const updateCount = () => {
                const current = +counter.innerText;
                const inc = target / speed;

                if (current < target) {
                    counter.innerText = Math.ceil(current + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Intersection Observer to trigger counter animation when in view
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true; 
        }
    }, {
        root: null,
        threshold: 0.5 
    });

    if(statsSection) {
        observer.observe(statsSection);
    }
    
    // 4. Contact Form Submit Prevention (Demo)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.style.borderColor = '#9fb36d'; 
                btn.style.opacity = '1';
                contactForm.reset();
                
                // Revert button back after a few seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.borderColor = '';
                }, 3000);
                
            }, 1500);
        });
    }

    // 5. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 6. View Archive Toggling
    const viewArchiveBtn = document.getElementById('view-archive-btn');
    const archivedProjects = document.querySelectorAll('.archived-project');
    
    if(viewArchiveBtn && archivedProjects.length > 0) {
        let isArchiveVisible = false;
        
        viewArchiveBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top
            isArchiveVisible = !isArchiveVisible;
            
            archivedProjects.forEach(project => {
                if(isArchiveVisible) {
                    project.classList.add('show');
                } else {
                    project.classList.remove('show');
                }
            });
            
            if(isArchiveVisible) {
                viewArchiveBtn.innerHTML = 'HIDE ARCHIVE &nbsp;<i class="fa-solid fa-arrow-up"></i>';
            } else {
                viewArchiveBtn.innerHTML = 'VIEW ARCHIVE &nbsp;<i class="fa-solid fa-arrow-right"></i>';
            }
        });
    }

    // 7. Interactive Services Modal
    const modalData = {
        highway: {
            title: "Highway & Bridge Construction",
            image: "https://images.unsplash.com/photo-1545642412-ea7bc8828fcc?q=80&w=1000&auto=format&fit=crop",
            desc: "Our primary expertise lies in the end-to-end execution of massive highway and bridge projects. We bring decades of engineering prowess to tackle challenging terrains, ensuring that every mile we lay is built for safety, efficiency, and longevity.",
            features: [
                { title: "Expressway Networks", text: "High-speed corridors designed with modern safety barriers and advanced drainage." },
                { title: "Long-Span Bridges", text: "Specialized cable-stayed and suspension bridges over rivers and valleys." },
                { title: "Smart Traffic Systems", text: "Integration of modern tolling and traffic management technology." }
            ]
        },
        aviation: {
            title: "Aviation Infrastructure",
            image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop",
            desc: "Constructing an airport requires precision that leaves no room for error. We specialize in building commercial runways, rapid-exit taxiways, and sprawling terminal facilities that adhere strictly to international aviation standards (ICAO and FAA).",
            features: [
                { title: "Runway Construction", text: "High-grade polymer-modified bitumen layers for extreme load bearing." },
                { title: "Terminal Buildings", text: "Energy-efficient structural steel terminals with modern aesthetics." },
                { title: "Airfield Lighting", text: "Complete installation of precision approach path indicators." }
            ]
        },
        urban: {
            title: "Urban Development",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
            desc: "Cities are the heart of human progress. We play a pivotal role in urban expansion by developing essential civil infrastructure, including massive storm-water systems, utility tunnels, and foundational work for smart cities.",
            features: [
                { title: "Utility Tunnels", text: "Underground corridors for power, telecommunications, and water." },
                { title: "Smart City Grids", text: "Integrated civil works preparing cities for IoT and automated services." },
                { title: "Commercial Foundations", text: "Deep foundation and piling work for skyscrapers and malls." }
            ]
        }, 
        highway: {
            title: "Noida International Airport Flooring Project", 
            image: "noida airport.png",
            desc: "The scope includes Ruby Red granite polish, leather finish stone work, and Kota stone flooring, ensuring durability and premium architectural finishing across key terminal areas.",
            features: [
                { title: "Status", text: "Currently in progress. Flooring installation works are being executed under Tata Projects Limited.." },
                { title: "Scale", text: "Major airport infrastructure project with contract value of ₹1000.50 Lakhs covering large terminal flooring areas." },
                { title: "Key Technologies", text: "Advanced stone polishing techniques, granite leather finish processing, and precision Kota stone flooring for long-lasting durability." }
            ]
        },
        airport: {
            title: "Pune Metro Station Façade & ACP Cladding Project",
            image: "punemetro.png",
            desc: " The project focuses on delivering modern architectural façade systems that enhance structural durability, aesthetic appearance, and long-term performance for metro rail infrastructure.",
            features: [
                { title: "Status", text: "Currently in progress under Pune IT City Metro Rail Limited." },
                { title: "Capacity Increase", text: "Large-scale metro station façade development project with a contract value of ₹279.00 Lakhs." },
                { title: "Sustainability", text: "Curtain wall façade systems, Aluminum Composite Panel (ACP) cladding, precision structural fixing, and modern metro station architectural finishing technologies." }
            ]
        },
        bridge: {
            title: "Long-Span Cable Stayed Bridge",
            image: "https://static.wixstatic.com/media/b2cf1a_f2df4728606d4cc99a76616041ea728a~mv2.png/v1/fill/w_1200,h_600,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b2cf1a_f2df4728606d4cc99a76616041ea728a~mv2.png",
            desc: "A recently completed engineering marvel spanning a major river basin. This cable-stayed bridge drastically reduced commute times and created a vital new trade route for the region.",
            features: [
                { title: "Status", text: "Project Delivered and Fully Operational." },
                { title: "Structural Highlights", text: "Twin concrete pylons reaching 200 meters high, with dynamic LED lighting." },
                { title: "Impact", text: "Reduced travel time between cities by over 1.5 hours." }
            ]
        }
    };

    const modalOverlay = document.getElementById('service-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');
    
    // Select all buttons that trigger the modal (both services and projects)
    const learnMoreBtns = document.querySelectorAll('.learn-more.btn-link, .portfolio-action');

    // Open Modal
    if(modalOverlay && learnMoreBtns.length > 0) {
        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                const data = modalData[id];
                
                if(data) {
                    // Build features HTML
                    let featuresHtml = '';
                    data.features.forEach(feat => {
                        featuresHtml += `
                            <div class="modal-feature-item">
                                <h4>${feat.title}</h4>
                                <p>${feat.text}</p>
                            </div>
                        `;
                    });

                    // Inject HTML
                    modalBody.innerHTML = `
                        <img src="${data.image}" alt="${data.title}" class="modal-image">
                        <h2 class="modal-title">${data.title}</h2>
                        <p class="modal-desc">${data.desc}</p>
                        <h3 style="color: var(--text-highlight); margin-bottom: 15px;">Key Competencies</h3>
                        <div class="modal-features">
                            ${featuresHtml}
                        </div>
                    `;

                    // Show modal
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close Modal functions
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => { modalBody.innerHTML = ''; }, 300); // Clear content after transition
        };

        modalCloseBtn.addEventListener('click', closeModal);

        // Close on clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 8. Custom Dropdown Filter for Projects
    const dropdown = document.getElementById('project-dropdown');
    if (dropdown) {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const triggerText = dropdown.querySelector('#selected-category');
        const menuItems = dropdown.querySelectorAll('.dropdown-menu li');
        const projectCards = document.querySelectorAll('.pcard');
        const noProjectsMsg = document.getElementById('no-projects-msg');

        // Toggle dropdown open/close
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });

        // Filter functionality
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const filter = item.getAttribute('data-filter');
                const filterText = item.innerText;

                // Update UI
                triggerText.innerText = filterText;
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                dropdown.classList.remove('active');

                // Filter logic
                let visibleCount = 0;
                projectCards.forEach(card => {
                    const sector = card.getAttribute('data-sector');
                    const isMatch = filter === 'all' || sector === filter;

                    if (isMatch) {
                        card.style.display = 'flex';
                        // Trigger a small entry animation
                        card.style.animation = 'none';
                        void card.offsetWidth; // force reflow
                        card.style.animation = 'pcardFadeIn 0.5s ease forwards';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Handle no results
                if (noProjectsMsg) {
                    noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            });
        });
    }
    // 9. Project Modal Logic
    const projectModal = document.getElementById("project-modal");
    const closeProjectBtn = document.getElementById("close-project-modal");
    const viewButtons = document.querySelectorAll(".view-details-btn");

    if (projectModal && viewButtons.length > 0) {
        
        viewButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const card = btn.closest(".pcard");
                
                // Extract data from card attributes
                const title = card.getAttribute("data-title");
                const client = card.getAttribute("data-client");
                const amount = card.getAttribute("data-amount");
                const status = card.getAttribute("data-status");
                const location = card.getAttribute("data-location");
                const desc = card.getAttribute("data-desc");
                const imgSrc = card.querySelector("img").src;
                const sector = card.querySelector(".pcard-badge").innerText;

                // Inject into modal
                document.getElementById("modal-project-title").innerText = title;
                document.getElementById("modal-project-client").innerText = client;
                document.getElementById("modal-project-amount").innerText = amount;
                document.getElementById("modal-project-status").innerText = status;
                document.getElementById("modal-project-location").innerText = location;
                document.getElementById("modal-project-desc").innerText = desc;
                document.getElementById("modal-project-img").src = imgSrc;
                document.getElementById("modal-project-sector").innerText = sector;

                // Update status tag class
                const statusTag = document.getElementById("modal-project-status");
                statusTag.className = "status-tag " + (status.toLowerCase().includes("progress") ? "ongoing" : "completed");

                // Open modal
                projectModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scroll
            });
        });

        // Close logic
        const closeModal = () => {
            projectModal.classList.remove("active");
            document.body.style.overflow = "";
        };

        if(closeProjectBtn) closeProjectBtn.addEventListener("click", closeModal);

        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) closeModal();
        });

        // ESC key close
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && projectModal.classList.contains("active")) {
                closeModal();
            }
        });
    }

});
