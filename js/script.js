/**
 * RIVERDALE GRAND — LUXURY REAL ESTATE JAVASCRIPT SYSTEM
 * GSAP 3.12+, ScrollTrigger, Lenis Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State & Configuration
  const state = {
    lenis: null,
    isMobile: window.innerWidth <= 991,
    floorPlans: {
      'plan-1': {
        title: '3 BHK Riverfront Residence — Type A',
        carpet: '1,385 SQ. FT.',
        view: 'Direct Riverside Panorama',
        deck: 'Dual Private Balconies',
        img: 'images/floorplans/floorplan_01.jpg'
      },
      'plan-2': {
        title: '3 BHK Riverfront Residence — Type B',
        carpet: '1,450 SQ. FT.',
        view: 'Unobstructed River & Horizon',
        deck: 'Extended Panoramic Deck',
        img: 'images/floorplans/floorplan_02.jpg'
      },
      'plan-3': {
        title: '3 BHK Grand Suite — Type C',
        carpet: '1,520 SQ. FT.',
        view: 'Skyline & Riverside Dual Aspect',
        deck: 'Wrap-around Balcony',
        img: 'images/floorplans/floorplan_03.jpg'
      },
      'plan-4': {
        title: '3 BHK Riverfront Collection — Type D',
        carpet: '1,610 SQ. FT.',
        view: 'Prime Riverfront Promenade View',
        deck: 'Grand Master Suite Deck',
        img: 'images/floorplans/floorplan_04.jpg'
      }
    },
    amenities: {
      'family': {
        title: 'Family & Childhood Sanctuary',
        desc: 'Thoughtfully designed spaces ensuring safety, joyful play, and precious togetherness for young minds and parents.',
        img: 'images/amenities/family.jpg',
        items: ['Kids Experience Zone', "Children's Splash Pool", "Toddler's Safe Pool Area", "Modern Day Creche & Nursery"]
      },
      'active': {
        title: 'Active & Athletic Lifestyle',
        desc: 'State-of-the-art sports facilities designed to keep your physical vitality at its peak every day.',
        img: 'images/amenities/active.jpg',
        items: ['Multipurpose Sports Court', 'Futsal Turf Arena', 'Half-Basketball Court', 'Active Lifestyle Jogging Loop']
      },
      'wellness': {
        title: 'Mindfulness & Physical Wellness',
        desc: 'Dedicated spaces for quiet reflection, yoga, sauna relaxation, and rejuvenating exercise.',
        img: 'images/amenities/wellness.jpg',
        items: ['High-Tech Gymnasium', 'Zen Yoga Studio & Deck', 'Therapeutic Steam & Sauna', 'Acupressure Reflexology Walkway']
      },
      'social': {
        title: 'Social & Hospitality Club',
        desc: 'Grand entertainment venues for memorable celebrations, movies, and community gatherings.',
        img: 'images/amenities/social.jpg',
        items: ['Grand Banquet Hall', 'Private Mini Theatre', 'Party Lawn with Pavilion', 'Sophisticated Library Lounge']
      },
      'seniors': {
        title: 'Senior Citizens Haven',
        desc: 'Peaceful, accessible spaces crafted for quiet conversations, shade, and evening strolls.',
        img: 'images/amenities/seniors.jpg',
        items: ['Dedicated Senior Citizens Plaza', 'Podium Leisure Deck', 'Shaded Reading Gazebo', 'Seated Chess & Cards Garden']
      },
      'pets': {
        title: 'Pet Care & Recreation',
        desc: 'Safe, dedicated outdoor zones where your furry companions can run free and socialise.',
        img: 'images/amenities/pets.jpg',
        items: ['Enclosed Dog Park', 'Pet Gravel Play Zone', 'Watering & Grooming Station', 'Agility Obstacle Course']
      },
      'nature': {
        title: 'Riverside Ecosystem & Greens',
        desc: 'Immerse your senses in lush botanical greenery and shaded riverfront canopy walks.',
        img: 'images/amenities/nature.jpg',
        items: ['Aromatic Herb Garden', 'Riverside Promenade Canopy', 'Native Flora Walkway', 'Seated Sunset Vantage Point']
      }
    },
    sunPositions: {
      'DEC-9AM': { cx: 120, cy: 220, label: 'Low Winter Morning Light — Direct Sunlight in Balconies' },
      'DEC-2PM': { cx: 300, cy: 110, label: 'Midday Soft Winter Sun — Natural Indoor Illumination' },
      'DEC-5PM': { cx: 480, cy: 230, label: 'Warm Sunset Glow Over River' },
      'MAR-9AM': { cx: 100, cy: 190, label: 'Equinox Morning Breeze & Gentle Light' },
      'MAR-2PM': { cx: 300, cy: 80, label: 'High Direct Overhead Light' },
      'MAR-5PM': { cx: 500, cy: 200, label: 'Golden Hour Horizon Sunset' },
      'JUN-9AM': { cx: 80, cy: 160, label: 'Early Summer Dawn Daylight' },
      'JUN-2PM': { cx: 300, cy: 50, label: 'Peak Summer Zenith Light' },
      'JUN-5PM': { cx: 520, cy: 180, label: 'Cool Evening Shade & Riverside Breeze' }
    }
  };

  // Initialize Core Systems
  initLenis();
  initPreloader();
  initCustomCursor();
  initNavbar();
  initHeroAnimations();
  initScrollAnimations();
  initTownshipCounter();
  initFloorPlans();
  initHorizontalScroll();
  initAmenitiesTab();
  initMasterplan();
  initSunPathVisualizer();
  initBeforeAfterSlider();
  initLeadModal();
  initMobileMenu();

  /* ==========================================================================
     1. LENIS SMOOTH SCROLL & GSAP SYNCHRONIZATION
     ========================================================================== */
  function initLenis() {
    if (typeof Lenis === 'undefined') return;

    state.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2
    });

    state.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      state.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  /* ==========================================================================
     2. PRELOADER
     ========================================================================== */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }, 800);
    });
  }

  /* ==========================================================================
     3. CUSTOM CURSOR (DESKTOP ONLY)
     ========================================================================== */
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorText = document.querySelector('.custom-cursor-text');
    if (!cursor || state.isMobile) return;

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    // Hover triggers
    const hoverTriggers = document.querySelectorAll('[data-cursor]');
    hoverTriggers.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const text = el.getAttribute('data-cursor') || 'VIEW';
        cursorText.textContent = text;
        cursor.classList.add('active');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     4. NAVBAR SCROLL & TRANSITIONS
     ========================================================================== */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  /* ==========================================================================
     5. HERO ANIMATIONS
     ========================================================================== */
  function initHeroAnimations() {
    const heroBg = document.querySelector('.hero-bg img');
    const heroContent = document.querySelectorAll('.hero-content > *');

    if (!heroBg || typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ delay: 0.4 });

    tl.to(heroBg, {
      scale: 1,
      duration: 2.2,
      ease: 'power2.out'
    })
    .from(heroContent, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.18,
      ease: 'power3.out'
    }, '-=1.8');
  }

  /* ==========================================================================
     6. SCROLLTRIGGER REVEALS & PARALLAX
     ========================================================================== */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Section title & text reveals
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Parallax Images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: img.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -50,
        ease: 'none'
      });
    });
  }

  /* ==========================================================================
     7. TOWNSHIP COUNTER ANIMATION
     ========================================================================== */
  function initTownshipCounter() {
    const counterEl = document.getElementById('township-counter');
    if (!counterEl || typeof gsap === 'undefined') return;

    const obj = { val: 0 };
    gsap.to(obj, {
      scrollTrigger: {
        trigger: counterEl,
        start: 'top 80%',
        once: true
      },
      val: 31,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        counterEl.textContent = Math.floor(obj.val);
      }
    });
  }

  /* ==========================================================================
     8. INTERACTIVE FLOOR PLANS SWITCHER
     ========================================================================== */
  function initFloorPlans() {
    const planBtns = document.querySelectorAll('.plan-btn');
    const fpImg = document.getElementById('fp-image');
    const fpTitle = document.getElementById('fp-title');
    const fpCarpet = document.getElementById('fp-carpet');
    const fpView = document.getElementById('fp-view');
    const fpDeck = document.getElementById('fp-deck');

    if (!planBtns.length || !fpImg) return;

    planBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const planKey = btn.getAttribute('data-plan');
        const planData = state.floorPlans[planKey];
        if (!planData) return;

        // Active State
        planBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // GSAP Crossfade
        gsap.to(fpImg, {
          opacity: 0,
          scale: 0.96,
          duration: 0.25,
          onComplete: () => {
            fpImg.src = planData.img;
            fpTitle.textContent = planData.title;
            fpCarpet.textContent = planData.carpet;
            fpView.textContent = planData.view;
            fpDeck.textContent = planData.deck;

            gsap.to(fpImg, {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: 'power2.out'
            });
          }
        });
      });
    });
  }

  /* ==========================================================================
     9. HOME EXPERIENCE HORIZONTAL SCROLL (DESKTOP)
     ========================================================================== */
  function initHorizontalScroll() {
    if (state.isMobile || typeof gsap === 'undefined') return;

    const track = document.querySelector('.horizontal-scroll-container');
    const section = document.querySelector('.home-exp-section');

    if (!track || !section) return;

    const totalWidth = track.scrollWidth - window.innerWidth + 100;

    gsap.to(track, {
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`
      },
      x: -totalWidth,
      ease: 'none'
    });
  }

  /* ==========================================================================
     10. INTERACTIVE AMENITIES TAB
     ========================================================================== */
  function initAmenitiesTab() {
    const tabBtns = document.querySelectorAll('.amenity-tab-btn');
    const visualImg = document.getElementById('amenity-img');
    const titleEl = document.getElementById('amenity-title');
    const descEl = document.getElementById('amenity-desc');
    const listEl = document.getElementById('amenity-list');

    if (!tabBtns.length || !visualImg) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const catKey = btn.getAttribute('data-tab');
        const data = state.amenities[catKey];
        if (!data) return;

        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        gsap.to(visualImg, {
          opacity: 0,
          duration: 0.25,
          onComplete: () => {
            visualImg.src = data.img;
            titleEl.textContent = data.title;
            descEl.textContent = data.desc;

            // Rebuild list
            listEl.innerHTML = data.items.map(item => `
              <li class="amenity-list-item">
                <i class="fas fa-check"></i>
                <span>${item}</span>
              </li>
            `).join('');

            gsap.to(visualImg, { opacity: 1, duration: 0.35 });
          }
        });
      });
    });
  }

  /* ==========================================================================
     11. MASTERPLAN HOTSPOTS
     ========================================================================== */
  function initMasterplan() {
    const hotspots = document.querySelectorAll('.mp-hotspot');
    hotspots.forEach((spot) => {
      spot.addEventListener('click', () => {
        const title = spot.getAttribute('data-title');
        const desc = spot.getAttribute('data-desc');
        openModalWithInfo(`Masterplan Hotspot: ${title}`, desc);
      });
    });
  }

  /* ==========================================================================
     12. SUN PATH VISUALIZER
     ========================================================================== */
  function initSunPathVisualizer() {
    const monthBtns = document.querySelectorAll('.sun-tab-btn');
    const timeBtns = document.querySelectorAll('.time-tab-btn');
    const sunDot = document.getElementById('sun-dot');
    const sunInfo = document.getElementById('sun-info');

    if (!sunDot) return;

    let currentMonth = 'DEC';
    let currentTime = '2PM';

    function updateSun() {
      const key = `${currentMonth}-${currentTime}`;
      const config = state.sunPositions[key];
      if (!config) return;

      gsap.to(sunDot, {
        cx: config.cx,
        cy: config.cy,
        duration: 0.8,
        ease: 'power2.out'
      });

      if (sunInfo) {
        sunInfo.textContent = config.label;
      }
    }

    monthBtns.forEach((b) => {
      b.addEventListener('click', () => {
        monthBtns.forEach((m) => m.classList.remove('active'));
        b.classList.add('active');
        currentMonth = b.getAttribute('data-month');
        updateSun();
      });
    });

    timeBtns.forEach((b) => {
      b.addEventListener('click', () => {
        timeBtns.forEach((t) => t.classList.remove('active'));
        b.classList.add('active');
        currentTime = b.getAttribute('data-time');
        updateSun();
      });
    });
  }

  /* ==========================================================================
     13. RENDERED VS ACTUAL SLIDER (PURE JS)
     ========================================================================== */
  function initBeforeAfterSlider() {
    const container = document.querySelector('.ba-container');
    const beforeImg = document.querySelector('.ba-before');
    const handle = document.querySelector('.ba-slider-handle');

    if (!container || !beforeImg || !handle) return;

    let isDragging = false;

    function moveSlider(x) {
      const rect = container.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeImg.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse Events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (isDragging) moveSlider(e.clientX);
    });

    // Touch Events
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) moveSlider(e.touches[0].clientX);
    });
  }

  /* ==========================================================================
     14. LEAD MODAL FORM & WHATSAPP
     ========================================================================== */
  function initLeadModal() {
    const modal = document.getElementById('lead-modal');
    const closeBtn = document.getElementById('modal-close');
    const openBtns = document.querySelectorAll('[data-open-modal]');
    const form = document.getElementById('lead-form');
    const successMsg = document.getElementById('form-success');

    // Configurable endpoint for Hostinger / Formspree / Custom PHP API
    window.LEAD_FORM_ENDPOINT = 'https://formspree.io/f/placeholder';

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (modal) modal.classList.add('open');
      });
    });

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Demonstrate lead processing
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';

        setTimeout(() => {
          if (modal) modal.classList.remove('open');
          // Reset form state after close
          setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            if (successMsg) successMsg.style.display = 'none';
          }, 500);
        }, 3000);
      });
    }
  }

  function openModalWithInfo(title, text) {
    const modal = document.getElementById('lead-modal');
    if (modal) modal.classList.add('open');
  }

  /* ==========================================================================
     15. MOBILE MENU
     ========================================================================== */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }
});
