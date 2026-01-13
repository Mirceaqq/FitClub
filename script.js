// Toggle tema întunecată simplă
const chk = document.getElementById('chk');
let temaApasata = false; // VARIABILĂ ADĂUGATĂ

chk.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  temaApasata = !temaApasata; // SE MODIFICĂ LA FIECARE APĂSARE
});

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
  });
});

// Formular de contact simplu
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mesajul tău a fost trimis! Te vom contacta în curând.');
    contactForm.reset();
  });
}

// Efect hover pentru carduri
document.querySelectorAll('.card, .trainer, .filiala, .plan').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-5px)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
  });
});

// Navbar la scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(17, 17, 17, 0.95)';
    navbar.style.padding = '12px 30px';
  } else {
    navbar.style.background = 'rgba(17, 17, 17, 0.9)';
    navbar.style.padding = '18px 30px';
  }
});
