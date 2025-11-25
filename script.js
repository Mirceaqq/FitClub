
const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});


const scrollBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mesajul a fost trimis cu succes! Te vom contacta în curând.");
    this.reset();
});
