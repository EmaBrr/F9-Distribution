// Navigation 

document.addEventListener("DOMContentLoaded", function () {
  const navHam = document.querySelector(".nav-ham");
  const navItems = document.querySelector(".nav-items");

  function toggleNav() {
      navHam.classList.toggle("active");
      navItems.classList.toggle("active");  
  }

  navHam.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleNav();
  });

  document.addEventListener("click", function () {
      if (navHam.classList.contains("active")) {
          navHam.classList.remove("active");
          navItems.classList.remove("active"); 
      }
  });

  navItems.addEventListener("click", function (e) {
      e.stopPropagation();
      navHam.classList.remove("active");
      navItems.classList.remove("active");
  });
});



// Welcome zoom 

function applyZoomEffect() {
    let startSize, endSize;
  
    if (window.innerWidth > 1200) {
      startSize = "150%"; 
      endSize = "120%"; 
    } else if (window.innerWidth > 1092) {
      startSize = "160%"; 
      endSize = "140%"; 
    } else if (window.innerWidth > 968) {
      startSize = "190%"; 
      endSize = "170%"; 
    } else if (window.innerWidth > 768) {
      startSize = "220%"; 
      endSize = "200%"; 
    } else if (window.innerWidth > 476) {
      startSize = "270%"; 
      endSize = "250%"; 
    } else {
      startSize = "300%"; 
      endSize = "280%"; 
    }
  
    const headline = document.querySelector(".headline");
    headline.style.backgroundSize = startSize;
    headline.style.transition = "background-size 4s ease-out";
  
    setTimeout(() => {
      headline.style.backgroundSize = endSize;
    }, 100);
  }
  
  window.addEventListener("load", applyZoomEffect);
  window.addEventListener("resize", applyZoomEffect);
  

// Values 

document.addEventListener("DOMContentLoaded", function () {
  const valueItems = document.querySelectorAll(".value-item");

  valueItems.forEach(item => {
    item.addEventListener("click", function () {
      // Close all other descriptions
      document.querySelectorAll(".value-description").forEach(desc => {
        desc.classList.remove("active");
      });

      // Toggle the current description
      const desc = this.querySelector(".value-description");
      desc.classList.toggle("active");
    });
  });
});