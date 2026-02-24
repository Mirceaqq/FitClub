// --------------------- Tema întunecată persistentă ---------------------
const chk = document.getElementById('chk');
let temaApasata = false;

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  chk.checked = true;
  temaApasata = true;
  console.log('Tema întunecată activă la încărcare:', temaApasata);
}

chk.addEventListener('change', () => {
  temaApasata = chk.checked;
  console.log('Tema întunecată activă după schimbare:', temaApasata);
  if (chk.checked) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});

// --------------------- Scroll to top ---------------------
const scrollToTopBtn = document.querySelector('.scroll-to-top');
let scrollApasat = false;

// Combina scroll listener pentru performanță
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Scroll to top button
  if (scrollToTopBtn) {
    if (scrollY > 300) scrollToTopBtn.classList.add('active');
    else scrollToTopBtn.classList.remove('active');
  }

  // Navbar la scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

  // Active nav link
  updateActiveNavLink();
});

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    scrollApasat = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => { scrollApasat = false; }, 500);
  });
}

// --------------------- Navbar active link ---------------------
function setActiveLink(targetId) {
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) link.classList.add('active');
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = '#' + section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      setActiveLink(sectionId);
    }
  });
}

// --------------------- Smooth scroll cu fade subtil ---------------------
const mainNav = document.getElementById('mainNav');
const menuToggle = document.getElementById('menuToggle');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }

      setActiveLink(targetId);
      document.body.style.transition = 'opacity 0.2s ease';
      document.body.style.opacity = '0.7';

      setTimeout(() => {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
        document.body.style.opacity = '1';
        setTimeout(() => { document.body.style.transition = ''; }, 300);
      }, 100);
    }
  });
});

// --------------------- Formular de contact ---------------------
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Se trimite...';
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1500));

    formStatus.textContent = '✓ Mesajul tău a fost trimis! Te vom contacta în curând.';
    formStatus.classList.add('show');

    contactForm.reset();

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      setTimeout(() => formStatus.classList.remove('show'), 4000);
    }, 2000);
  });
}

// --------------------- Galerie imagini ---------------------
function loadGalleryImages() {
  const imgIds = ['galerie-img-1', 'galerie-img-2', 'galerie-img-3'];
  const randomNum = Math.floor(Math.random() * 1000);

  imgIds.forEach((id, k) => {
    const imgElement = document.getElementById(id);
    if (imgElement) {
      imgElement.src = `https://loremflickr.com/800/1200/gym,interior?lock=${randomNum + k}`;
      imgElement.onerror = function() {
        this.src = 'https://via.placeholder.com/800x1200?text=Gym+Interior';
        this.alt = 'Imagine indisponibilă temporar';
      };
    }
  });
}
document.addEventListener('DOMContentLoaded', loadGalleryImages);

// --------------------- Scroll reveal ---------------------
const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .trainer, .filiala, .plan, .stat-item, .galerie-item').forEach(el => {
  observer.observe(el);
});

// --------------------- Animatie statistici ---------------------
const statisticiSection = document.getElementById('statistici');
const numere = document.querySelectorAll('.stat-numar');

function animateNumbers() {
  numere.forEach(numar => {
    const target = parseInt(numar.getAttribute('data-target'), 10);
    const current = parseInt(numar.innerText, 10);
    if (current < target) {
      const increment = Math.ceil(target / 50);
      let newVal = current + increment;
      if (newVal > target) newVal = target;
      numar.innerText = newVal;
    }
  });
}

let animationStarted = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animationStarted) {
      animationStarted = true;
      const interval = setInterval(() => {
        animateNumbers();
        if ([...numere].every(n => parseInt(n.innerText, 10) >= parseInt(n.getAttribute('data-target'), 10))) {
          clearInterval(interval);
        }
      }, 30);
    }
  });
}, { threshold: 0.5 });

if (statisticiSection) statsObserver.observe(statisticiSection);

// --------------------- Meniu mobil ---------------------
let meniuDeschis = false;

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    meniuDeschis = !meniuDeschis;
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? false : true;
    mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', expanded);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      meniuDeschis = false;
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// --------------------- GENERATOR MOTIVAȚIONAL LIVE ---------------------
const nameInput = document.getElementById('userName');  // sau 'motivationName', depinde ce id ai în HTML
const motivationalText = document.getElementById('motivationalText');

if (nameInput) {
  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    const lastChar = name.slice(-1);
    console.log('Text introdus în generator:', name);
    if (lastChar) {
      console.log('Ultima literă scrisă:', lastChar);
    }
    if (name.length > 0) {
      motivationalText.textContent = `${name}, începe transformarea ta la FitClub!`;
    } else {
      motivationalText.textContent = '';
    }
  });
}