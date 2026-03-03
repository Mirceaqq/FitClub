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

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollToTopBtn) {
    if (scrollY > 300) scrollToTopBtn.classList.add('active');
    else scrollToTopBtn.classList.remove('active');
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }

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

// --------------------- Formular de contact (salvare în localStorage) ---------------------
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const numeInput = document.querySelector('#contact-form input[type="text"]');
const emailInput = document.querySelector('#contact-form input[type="email"]');
const abonamentSelect = document.querySelector('#contact-form select');
const mesajTextarea = document.querySelector('#contact-form textarea');

// Funcție care salvează toate câmpurile în localStorage
function salveazaFormular() {
  let numeVal = '';
  let emailVal = '';
  let abonamentVal = '';
  let mesajVal = '';

  if (numeInput) numeVal = numeInput.value;
  if (emailInput) emailVal = emailInput.value;
  if (abonamentSelect) abonamentVal = abonamentSelect.value;
  if (mesajTextarea) mesajVal = mesajTextarea.value;

  const dateFormular = {
    nume: numeVal,
    email: emailVal,
    abonament: abonamentVal,
    mesaj: mesajVal
  };

  localStorage.setItem('dateFormularContact', JSON.stringify(dateFormular));
}

// Salvăm la fiecare modificare
if (numeInput) numeInput.addEventListener('input', salveazaFormular);
if (emailInput) emailInput.addEventListener('input', salveazaFormular);
if (abonamentSelect) abonamentSelect.addEventListener('change', salveazaFormular);
if (mesajTextarea) mesajTextarea.addEventListener('input', salveazaFormular);

// La încărcare, completăm câmpurile
function incarcaFormular() {
  const dateSalvate = localStorage.getItem('dateFormularContact');
  if (dateSalvate) {
    try {
      const date = JSON.parse(dateSalvate);
      if (numeInput) numeInput.value = date.nume || '';
      if (emailInput) emailInput.value = date.email || '';
      if (abonamentSelect) abonamentSelect.value = date.abonament || '';
      if (mesajTextarea) mesajTextarea.value = date.mesaj || '';
    } catch (e) {
      console.error('Eroare la încărcarea datelor', e);
    }
  }
}

document.addEventListener('DOMContentLoaded', incarcaFormular);

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
const nameInput = document.getElementById('userName');
const motivationalText = document.getElementById('motivationalText');

if (nameInput) {
  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim();
    const lastChar = name.slice(-1);
    console.log('Text introdus în generator:', name);

    // Salvăm în localStorage ca să apară în F12
    localStorage.setItem('lastGeneratorName', name);

    if (name.length > 0) {
      motivationalText.textContent = `${name}, începe transformarea ta la FitClub!`;
    } else {
      motivationalText.textContent = '';
    }
  });
}