/* ================= PAGE LOADER ================= */

document.body.classList.add("loading");

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    loader.classList.add("hide");

    document.body.classList.remove("loading");

  }, 900);

});


/* ================= HEADER ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){
    header.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
  }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("open");

});


document.querySelectorAll(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    menuBtn.classList.remove("active");
    navLinks.classList.remove("open");

  });

});


/* ================= CURSOR ================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

if(cursorDot && cursorRing && window.innerWidth > 900){

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;


  window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";

  });


  function animateCursor(){

    ringX += (mouseX - ringX) * 0.13;
    ringY += (mouseY - ringY) * 0.13;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  document.querySelectorAll("a,button,.gallery-item,.learning-card").forEach(item => {

    item.addEventListener("mouseenter", () => {
      cursorRing.classList.add("hover");
    });

    item.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("hover");
    });

  });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add("active");

        revealObserver.unobserve(entry.target);

      }

    });

  },

  {
    threshold:0.12
  }

);


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(

  (entries) => {

    entries.forEach(entry => {

      if(!entry.isIntersecting) return;

      const counter = entry.target;

      const target = Number(counter.dataset.count);

      let startTime = null;

      const duration = 1600;


      function animateCounter(timestamp){

        if(!startTime){
          startTime = timestamp;
        }

        const progress = Math.min(
          (timestamp - startTime) / duration,
          1
        );


        const eased =
          1 - Math.pow(1 - progress, 3);


        counter.textContent =
          Math.floor(eased * target);


        if(progress < 1){

          requestAnimationFrame(animateCounter);

        }else{

          counter.textContent = target;

        }

      }


      requestAnimationFrame(animateCounter);

      counterObserver.unobserve(counter);

    });

  },

  {
    threshold:.7
  }

);


counters.forEach(counter => {

  counterObserver.observe(counter);

});


/* ================= PARALLAX HERO ================= */

const heroVisual = document.querySelector(".hero-visual");

if(heroVisual && window.innerWidth > 900){

  window.addEventListener("mousemove", (e) => {

    const x =
      (e.clientX / window.innerWidth - .5) * 10;

    const y =
      (e.clientY / window.innerHeight - .5) * 10;


    heroVisual.style.transform =
      `translate(${x}px, ${y}px)`;

  });

}


/* ================= IMAGE TILT ================= */

document.querySelectorAll(".hero-card-main").forEach(card => {

  if(window.innerWidth < 900) return;


  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x =
      e.clientX - rect.left;

    const y =
      e.clientY - rect.top;


    const rotateY =
      ((x / rect.width) - .5) * 5;

    const rotateX =
      ((y / rect.height) - .5) * -5;


    card.style.transform =
      `translateX(50%) perspective(900px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)`;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "translateX(50%)";

  });

});


/* ================= ACTIVE NAV LINK ================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a[href^='#']");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop =
      section.offsetTop - 180;

    if(window.scrollY >= sectionTop){

      current = section.getAttribute("id");

    }

  });


  navItems.forEach(link => {

    link.classList.remove("active");

    if(
      link.getAttribute("href") === "#" + current
    ){

      link.classList.add("active");

    }

  });

});


/* ================= SMOOTH ANCHOR ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(e){

    const target =
      document.querySelector(this.getAttribute("href"));

    if(!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});
