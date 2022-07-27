const body = document.querySelector("body");
const header = document.createElement("header");
header.classList.add("menu_header");

const headerDiv = document.createElement("div");
headerDiv.classList.add("menu_div");

const headerDivImg = document.createElement("div");
headerDivImg.classList.add("menu_div_image");
const headerImg = document.createElement("img");
headerImg.classList.add("menu_image");
headerImg.src =
  "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo.png";
headerImg.alt = "logo-santuario";

const headerNav = document.createElement("nav");
headerNav.classList.add("menu_nav", "menu_nav_coming");

const headerNavUl = document.createElement("ul");
headerNavUl.classList.add("menu_ul");

const iconsDiv = document.createElement("div");
iconsDiv.classList.add("menu_icons");

const iconsImg1 = document.createElement("img");
iconsImg1.onclick = () => loja();
iconsImg1.src =
  "https://stg.misericordia.org.br/site/wp-content/uploads/2021/12/shop-sacolinha.png";
iconsImg1.alt = "sacola";

const iconsSeparator = document.createElement("p");

const iconsImg2 = document.createElement("img");
iconsImg2.onclick = () => youtube();
iconsImg2.src =
  "https://stg.misericordia.org.br/site/wp-content/uploads/2021/12/youtube-5.png";
iconsImg2.alt = "youtube";

const menuMobile = document.createElement("div");
menuMobile.classList.add("menu_mobile");

const mobileContainer = document.createElement("div");
mobileContainer.classList.add("menu_container");

const mobileContainerImg = document.createElement("img");
mobileContainerImg.onclick = () => dropMenu();
mobileContainerImg.src =
  "https://misericordia.org.br/site/wp-content/uploads/2022/07/Vector.png";
mobileContainerImg.alt = "menu";

const mobileMenuDrop = document.createElement("div");
mobileMenuDrop.classList.add("menu_drop");

const mobileMenuDropUl = document.createElement("ul");
mobileMenuDropUl.classList.add("menu_drop_ul");

mobileMenuDrop.append(mobileMenuDropUl);
mobileContainer.append(mobileContainerImg, mobileMenuDrop);
menuMobile.append(mobileContainer);
iconsDiv.append(iconsImg1, iconsSeparator, iconsImg2);
headerNav.append(headerNavUl);
headerDivImg.append(headerImg);
headerDiv.append(headerDivImg, headerNav, iconsDiv, menuMobile);
header.append(headerDiv);
body.prepend(header);

const corsAnywhere = "https://fast-dawn-89938.herokuapp.com/";
const target = "https://misericordia.org.br/menu-global-iframe/";
const url = `${corsAnywhere}${target}`;

fetch(url)
  .then((response) => response.text())
  .then((response) => scraping(response, "text/html"))
  .catch((err) => console.log(err));

function scraping(string_html, content_type) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(string_html, content_type);
  const nav = doc.querySelector("#menu-menuglobal").querySelectorAll("a");
  const menu_ul = document.querySelector(".menu_ul");
  const menuDropUl = document.querySelector(".menu_drop_ul");

  [...nav].forEach((element) => {
    const li = document.createElement("li");
    const liMenu = document.createElement("li");
    const aMenu = document.createElement("a");
    const a = document.createElement("a");
    const className = element.innerText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    a.classList.add(className);
    aMenu.classList.add(className);
    a.href = element.href;
    aMenu.href = element.href;
    a.innerText = element.innerText;
    aMenu.innerText = element.innerText;
    if (window.location.href.includes("Formação") && className === "formacao") {
      li.style.color = "#184FA7";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo_1.png";
    } else if (
      window.location.href.includes("Notícias") &&
      className === "noticias"
    ) {
      li.style.color = "#DC3A23";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo_2.png";
    } else if (
      window.location.href.includes("Santuário") &&
      className === "santuario"
    ) {
      li.style.color = "#234E76";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo_5.png";
    } else if (
      window.location.href.includes("Marianos") &&
      className === "marianos"
    ) {
      li.style.color = "#009BDB";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo_4.png";
    } else if (
      window.location.href.includes("Eventos") &&
      className === "eventos"
    ) {
      li.style.color = "#009A82";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo-1.png";
    } else if (
      window.location.href === "https://misericordia.org.br/" &&
      className === "portal"
    ) {
      li.style.color = "#9F3B69";
      const image = document.querySelector(".menu_image");
      image.src =
        "https://misericordia.org.br/site/wp-content/uploads/2021/12/Logotipo.png";
    }

    li.append(a);
    liMenu.append(aMenu);

    menuDropUl.append(liMenu);
    menu_ul.append(li);
  });
}

function dropMenu() {
  const menuDrop = document.querySelector(".menu_drop");
  if (menuDrop.style.display === "block") {
    menuDrop.style.display = "none";
  } else {
    menuDrop.style.display = "block";
  }
}

function loja() {
  window.location.href = "https://www.editoradivinamisericordia.com/";
}

function youtube() {
  window.open("https://www.youtube.com/user/apostolomisericordia", "_blank");
}
