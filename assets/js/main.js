/**
 * Kishore Kumar S - Portfolio Main JavaScript
 * High-performance, clean vanilla JS with EmailJS & SweetAlert2
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
      disable: () => window.innerWidth < 768
    });
  }

  // 2. Initialize Typed.js for dynamic hero subtitles
  const typedTarget = document.querySelector('.typed-hero');
  if (typedTarget && typeof Typed !== 'undefined') {
    new Typed('.typed-hero', {
      strings: [
        'Full Stack Developer',
        'Backend & Node.js Specialist',
        'Laravel & PHP Architect',
        'MERN Stack Engineer',
        'RESTful API & Cloud Designer'
      ],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 2000,
      startDelay: 300,
      smartBackspace: false,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // 3. Navbar scroll effect & ScrollSpy
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.nav-link-item');
  const sections = document.querySelectorAll('section[id]');

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

      if (typeof AOS !== 'undefined') {
        setTimeout(() => { AOS.refresh(); }, 100);
      }
    });
  });

  // 6. Projects Category Filter
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-filter-card');
  const personalHeader = document.getElementById('personalProjectsHeading');
  const enterpriseHeader = document.getElementById('enterpriseProjectsHeading');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cardCat.split(' ').includes(filterVal)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });

      if (enterpriseHeader) {
        enterpriseHeader.style.display = (filterVal === 'personal') ? 'none' : 'flex';
      }

      if (personalHeader) {
        personalHeader.style.display = (filterVal !== 'all' && filterVal !== 'personal') ? 'none' : 'block';
      }

      if (typeof AOS !== 'undefined') {
        setTimeout(() => { AOS.refresh(); }, 100);
      }
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

  // 8. Direct Contact Message Submission
  const emailForm = document.getElementById('contactForm');
  if (emailForm) {
    const nameField = document.getElementById('formName');
    const emailField = document.getElementById('formEmail');
    const subjectField = document.getElementById('formSubject');
    const messageField = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    const whatsappDmBtn = document.getElementById('whatsappDmBtn');

    // Dynamically update WhatsApp DM link as user types their message
    const updateWhatsAppHref = () => {
      if (!whatsappDmBtn) return;
      const nameVal = nameField ? nameField.value.trim() : '';
      const subjectVal = subjectField ? subjectField.value.trim() : '';
      const msgVal = messageField ? messageField.value.trim() : '';

      let text = 'Hi Kishore, I would like to connect regarding an opportunity.';
      if (msgVal || nameVal) {
        text = `Hi Kishore, ${nameVal ? `I'm ${nameVal}. ` : ''}${subjectVal ? `[${subjectVal}] ` : ''}${msgVal}`;
      }
      whatsappDmBtn.href = `https://wa.me/919344291464?text=${encodeURIComponent(text.trim())}`;
    };

    [nameField, subjectField, messageField].forEach(field => {
      if (field) field.addEventListener('input', updateWhatsAppHref);
    });

    // Initialize EmailJS with active public key
    if (typeof emailjs !== 'undefined') {
      emailjs.init('nKy3xqbVwMeIZjocG');
    }

    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameVal = nameField ? nameField.value.trim() : '';
      const emailVal = emailField ? emailField.value.trim() : '';
      const subjectVal = subjectField && subjectField.value.trim() ? subjectField.value.trim() : 'Portfolio Contact Inquiry';
      const msgVal = messageField ? messageField.value.trim() : '';

      if (!nameVal || !emailVal || !msgVal) {
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

      // Send via EmailJS with all common template parameter aliases
      emailjs.send('service_fuelwwp', 'template_e69v7yp', {
        name: nameVal,
        from_name: nameVal,
        title: subjectVal,
        subject: subjectVal,
        to_email: emailVal,
        from_email: emailVal,
        reply_to: emailVal,
        email: emailVal,
        message: msgVal
      })
      .then(function(response) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully!',
          text: 'Thank you for reaching out, Kishore will get back to you promptly.',
          background: '#0f172a',
          color: '#f8fafc',
          confirmButtonColor: '#38bdf8'
        });

        // Reset form and sync WhatsApp button
        emailForm.reset();
        updateWhatsAppHref();
      })
      .catch(function(error) {
        console.error('Email gateway dispatch notice:', error);

        const waUrl = `https://wa.me/919344291464?text=${encodeURIComponent(`Hi Kishore, I'm ${nameVal} (${emailVal}). Regarding: ${subjectVal}.\n\n${msgVal}`)}`;
        const mailtoUrl = `mailto:kishore787120@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent(`Hi Kishore,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${msgVal}`)}`;

        Swal.fire({
          icon: 'info',
          title: 'Direct Message Dispatch',
          html: `
            <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 18px; line-height: 1.5;">
              To ensure your message reaches Kishore immediately without any mail server delay, choose your preferred direct channel:
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary-glow" style="display: inline-flex; justify-content: center; align-items: center; gap: 8px; text-decoration: none; padding: 12px 20px; border-radius: 9999px; font-weight: 600;">
                <i class="bi bi-whatsapp"></i> Send via WhatsApp Directly
              </a>
              <a href="${mailtoUrl}" class="btn-glass" style="display: inline-flex; justify-content: center; align-items: center; gap: 8px; text-decoration: none; padding: 12px 20px; border-radius: 9999px; font-weight: 600;">
                <i class="bi bi-envelope-at-fill text-info"></i> Send via Email Client
              </a>
            </div>
          `,
          showConfirmButton: false,
          showCloseButton: true,
          background: '#0f172a',
          color: '#f8fafc'
        });
      })
      .finally(function() {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});