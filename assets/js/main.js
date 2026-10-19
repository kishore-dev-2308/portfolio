/**
 * Kishore Kumar S - Portfolio Main JavaScript
 * High-performance, clean vanilla JS with EmailJS & SweetAlert2
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }

  // 2. Initialize Typed.js for dynamic hero subtitles
  const typedTarget = document.querySelector('.typed-hero');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('.typed-hero', {
      strings: [
        'Backend-Focused Full Stack Developer',
        'Node.js & Express.js Specialist',
        'Laravel & PHP Architect',
        'MERN Stack & Real-Time Systems Engineer',
        'Cloud & RESTful API Designer'
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // 3. Navbar scroll effect & ScrollSpy
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background blur/border on scroll
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active link highlighting (Scrollspy)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on page load

  // Scroll to top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for all in-page anchor navigation links & trigger AOS refresh
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash.length > 1) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 76;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight + 2;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          if (history.pushState) {
            history.pushState(null, null, hash);
          }
          if (typeof AOS !== 'undefined') {
            setTimeout(() => { AOS.refresh(); }, 350);
          }
        }
      }
    });
  });

  // 4. Mobile Menu Drawer
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navMenuLinks = document.getElementById('navMenuLinks');

  if (mobileToggleBtn && navMenuLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenuLinks.classList.toggle('open');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
      }
    });

    // Close mobile menu when clicking any nav link
    navMenuLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenuLinks.classList.remove('open');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenuLinks.classList.contains('open')) {
        if (!navMenuLinks.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
          navMenuLinks.classList.remove('open');
          const icon = mobileToggleBtn.querySelector('i');
          if (icon) icon.className = 'bi bi-list';
        }
      }
    });
  }

  // 5. Skills Category Filter (Logos, No Percentages)
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn:not(.project-filter-btn)');
  const skillTiles = document.querySelectorAll('.tech-tile');

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillTiles.forEach(tile => {
        const cat = tile.getAttribute('data-category') || '';
        if (filterCategory === 'all' || cat.split(' ').includes(filterCategory)) {
          tile.style.display = 'flex';
          tile.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          tile.style.display = 'none';
        }
      });
    });
  });

  // 6. Projects Category Filter
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-filter-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Dynamic Experience calculation
  const expElem = document.getElementById('exp-years');
  if (expElem) {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const calculatedExp = currentYear - startYear;
    expElem.textContent = `${calculatedExp}+`;
  }

  // 8. EmailJS Contact Form Submission
  const emailForm = document.getElementById('contactForm');
  if (emailForm) {
    // Initialize EmailJS with your active public key
    if (typeof emailjs !== 'undefined') {
      emailjs.init('nKy3xqbVwMeIZjocG');
    }

    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameField = document.getElementById('formName');
      const emailField = document.getElementById('formEmail');
      const subjectField = document.getElementById('formSubject');
      const messageField = document.getElementById('formMessage');
      const submitBtn = document.getElementById('submitBtn');

      if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
        Swal.fire({
          icon: 'warning',
          title: 'Required Fields',
          text: 'Please fill in your name, email, and message before sending.',
          background: '#0f172a',
          color: '#f8fafc',
          confirmButtonColor: '#38bdf8'
        });
        return;
      }

      // Show loading status on button
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      submitBtn.disabled = true;

      emailjs.send('service_fuelwwp', 'template_e69v7yp', {
        name: nameField.value.trim(),
        title: subjectField ? subjectField.value.trim() : 'Portfolio Contact',
        to_email: emailField.value.trim(),
        message: messageField.value.trim()
      })
      .then(function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully!',
          text: "Thank you for reaching out, Kishore will get back to you promptly.",
          background: '#0f172a',
          color: '#f8fafc',
          confirmButtonColor: '#38bdf8'
        });

        // Reset form
        emailForm.reset();
      })
      .catch(function(error) {
        console.error('EmailJS Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Delivery Failed',
          text: 'Could not send the message automatically. Feel free to email directly at kishore787120@gmail.com.',
          background: '#0f172a',
          color: '#f8fafc',
          confirmButtonColor: '#38bdf8'
        });
      })
      .finally(function() {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});