/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.15
    }

  );


revealElements.forEach(function (element) {

  revealObserver.observe(element);

});


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
  new Date(
    "December 12, 2026 10:00:00"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();


  const distance =
    weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days").textContent = "00";

    document.getElementById("hours").textContent = "00";

    document.getElementById("minutes").textContent = "00";

    document.getElementById("seconds").textContent = "00";

    return;

  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (distance %
        (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (distance %
        (1000 * 60 * 60)) /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (distance %
        (1000 * 60)) /
      1000
    );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");


  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   RSVP MODAL
========================================================= */

const modal =
  document.getElementById("rsvpModal");


const openRsvp =
  document.getElementById("openRsvp");


const closeRsvp =
  document.getElementById("closeRsvp");


const modalOverlay =
  document.querySelector(".modal-overlay");


function openModal() {

  modal.classList.add("active");

  document.body.style.overflow =
    "hidden";

}


function closeModal() {

  modal.classList.remove("active");

  document.body.style.overflow =
    "";

}


openRsvp.addEventListener(
  "click",
  openModal
);


closeRsvp.addEventListener(
  "click",
  closeModal
);


modalOverlay.addEventListener(
  "click",
  closeModal
);


/* ESC KEY */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Escape") {

      closeModal();

    }

  }
);


/* =========================================================
   RSVP FORM
========================================================= */

const rsvpForm =
  document.getElementById("rsvpForm");


const successMessage =
  document.getElementById(
    "successMessage"
  );


rsvpForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();


    const name =
      document.getElementById(
        "guestName"
      ).value;


    const attendance =
      document.getElementById(
        "attendance"
      ).value;


    const guests =
      document.getElementById(
        "guests"
      ).value;


    const message =
      document.getElementById(
        "message"
      ).value;


    /*
      For now, the RSVP data is shown
      in the browser console.

      Later we can connect this to
      Google Sheets / Form / Firebase /
      Power Automate / backend.
    */

    console.log({

      name: name,

      attendance: attendance,

      guests: guests,

      message: message

    });


    rsvpForm.style.display =
      "none";


    successMessage.classList.add(
      "active"
    );

  }
);


/* =========================================================
   NAVBAR SMOOTH SCROLL
========================================================= */

const navLinks =
  document.querySelectorAll(
    ".navbar nav a"
  );


navLinks.forEach(function (link) {

  link.addEventListener(
    "click",
    function (event) {

      event.preventDefault();


      const targetId =
        this.getAttribute("href");


      const target =
        document.querySelector(
          targetId
        );


      if (target) {

        target.scrollIntoView({

          behavior: "smooth",

          block: "start"

        });

      }

    }
  );

});


/* =========================================================
   FLOATING DECOR PARALLAX
========================================================= */

const decorElements =
  document.querySelectorAll(
    ".floating-decor"
  );


document.addEventListener(
  "mousemove",
  function (event) {

    const x =
      (event.clientX /
        window.innerWidth -
        0.5) * 20;


    const y =
      (event.clientY /
        window.innerHeight -
        0.5) * 20;


    decorElements.forEach(
      function (element, index) {

        const multiplier =
          (index + 1) * 0.3;


        element.style.transform =
          `translate(
            ${x * multiplier}px,
            ${y * multiplier}px
          )`;

      }
    );

  }
);
