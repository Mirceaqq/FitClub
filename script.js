// Toggle tema întunecată simplă
const chk = document.getElementById('chk');
window.temaApasata = false;

// Încarcă conținut din content.json (pentru texte/imagini ușor de schimbat)
async function loadContentFromJson() {
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (!el || typeof value !== 'string') return;
    el.textContent = value;
  };

  const setAttr = (id, attr, value) => {
    const el = document.getElementById(id);
    if (!el || typeof value !== 'string') return;
    el.setAttribute(attr, value);
  };

  try {
    const res = await fetch('content.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Nu pot încărca content.json (status ${res.status})`);

    const data = await res.json();

    // Titlu tab (optional)
    if (typeof data.title === 'string') {
      document.title = data.title;
    }

    // Brand
    setText('brandNameNav', data.brandName);
    setText('brandNameHero', data.brandName);
    setText('footerBrand', data.brandName);

    // Hero
    if (data.hero) {
      setText('heroText', data.hero.text);
      if (data.hero.cta) {
        setText('heroCta', data.hero.cta.text);
        setAttr('heroCta', 'href', data.hero.cta.href);
      }
    }

    // Contact
    if (data.contact) {
      setText('contactIntro', data.contact.intro);
      setText('contactAddress', data.contact.address);
      setText('contactPhone', data.contact.phone);
      setText('contactEmail', data.contact.email);
    }

    // Footer
    if (data.footer) {
      setText('footerDesc', data.footer.desc);
      setText('footerCopyright', data.footer.copyright);
    }

    // Filiale (exemplu: doar prima imagine)
    if (data.filiale && data.filiale.filiala1) {
      setAttr('filiala1Img', 'src', data.filiale.filiala1.imgSrc);
      setAttr('filiala1Img', 'alt', data.filiale.filiala1.imgAlt);
    }
  } catch (err) {
    console.warn('Nu s-a încărcat content.json. Se folosesc valorile din HTML.', err);
  }
}

if (chk) {
  // Setează tema salvată (dacă există)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    chk.checked = true;
    window.temaApasata = true;
  }

  chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    window.temaApasata = chk.checked;
    localStorage.setItem('theme', chk.checked ? 'dark' : 'light');
  });
}

// Meniu mobil (hamburger)
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function setMenuOpen(isOpen) {
  if (!mainNav || !menuToggle) return;
  mainNav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    setMenuOpen(!isOpen);
  });
}

// Buton scroll to top
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('active');
  } else {
    scrollToTopBtn.classList.remove('active');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Navigare smooth pentru link-uri
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }

    // Închide meniul pe mobil după click
    setMenuOpen(false);
  });
});

// Formular de contact simplu
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Mesajul tău a fost trimis! Te vom contacta în curând.';
      formStatus.classList.add('show');
      // ascunde mesajul după puțin timp
      window.setTimeout(() => {
        formStatus.classList.remove('show');
        formStatus.textContent = '';
      }, 3500);
    }

    contactForm.reset();
  });
}

// Navbar la scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Pornește după ce DOM-ul e gata
document.addEventListener('DOMContentLoaded', () => {
  loadContentFromJson();
});