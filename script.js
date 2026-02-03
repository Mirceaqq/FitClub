console.log("Hello from console");

const content = {
  title: "Bine ai venit la FitClub",
  info: "Descoperă un loc unde energia, disciplina și motivația se transformă în rezultate reale. Fă primul pas spre o versiune mai puternică a ta!",
  buttonText: "Înscrie-te acum"
};

const body = document.getElementsByTagName("body")[0];
const header = document.getElementsByTagName("header")[0];

const heroSection = document.createElement("section");
heroSection.className = "hero";
heroSection.setAttribute("id", "acasa");

const heroText = document.createElement("div");
heroText.className = "hero-text";

const heading1 = document.createElement("h1");
heading1.innerHTML = `Bine ai venit la <span>FitClub</span>`;

const paragraph = document.createElement("p");
paragraph.innerText = content.info;

const button = document.createElement("a");
button.setAttribute("href", "#abonamente");
button.className = "btn";
button.innerText = content.buttonText;

heroText.appendChild(heading1);
heroText.appendChild(paragraph);
heroText.appendChild(button);

heroSection.appendChild(heroText);
header.after(heroSection);

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mesajul tău a fost trimis!");
    contactForm.reset();
  });
}

const lightBg = "rgb(238, 238, 204)";
const bodyEl = document.getElementsByTagName("body")[0];
const themeCheckbox = document.getElementById("chk");

if (themeCheckbox) {
  themeCheckbox.addEventListener("change", function () {
    const currentBg = window.getComputedStyle(bodyEl).backgroundColor;

    if (currentBg.includes("238")) {
      bodyEl.style.background = "#120";
      bodyEl.style.color = "#fff";
    } else {
      bodyEl.style.background = lightBg;
      bodyEl.style.color = "#000";
    }
  });
}
