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

// Brands:

document.addEventListener("DOMContentLoaded", function () {
  const logoItems = document.querySelectorAll(".logo-item");
  const popups = document.querySelectorAll(".popup");

  logoItems.forEach((logoItem) => {
    logoItem.addEventListener("click", function (e) {
      e.stopPropagation();
      hideAllPopups();
      const popup = logoItem.querySelector(".popup");
      if (popup) {
        popup.style.display = "block";
      }
    });
  });

  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      hideAllPopups();
    });
  });

  document.addEventListener("click", function () {
    hideAllPopups();
  });

  function hideAllPopups() {
    popups.forEach((popup) => {
      popup.style.display = "none";
    });
  }
});

// Slide content and navigation

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav");
  const slides = document.querySelectorAll(".section, .slide");

  function adjustPadding() {
    const navHeight = nav.offsetHeight;
    slides.forEach((slide) => {
      slide.style.paddingTop = `calc(${navHeight} + 25)px`;
    });
  }

  adjustPadding();
  window.addEventListener("resize", adjustPadding);
});

// Map
function getZoomAndPan() {
  var screenWidth = window.innerWidth;

  if (screenWidth > 1300) {
    return { zoom: 9, panX: 520, panY: 70 };
  } else if (screenWidth > 1200) {
    return { zoom: 9, panX: 470, panY: 62 };
  } else if (screenWidth > 1000) {
    return { zoom: 9, panX: 470, panY: 62 };
  } else if (screenWidth > 780) {
    return { zoom: 8, panX: 360, panY: 80 };
  } else if (screenWidth > 680) {
    return { zoom: 8, panX: 305, panY: 100 };
  } else if (screenWidth > 620) {
    return { zoom: 8, panX: 280, panY: 105 };
  } else if (screenWidth > 540) {
    return { zoom: 8, panX: 240, panY: 95 };
  } else if (screenWidth > 490) {
    return { zoom: 8, panX: 215, panY: 80 };
  } else if (screenWidth > 450) {
    return { zoom: 8, panX: 200, panY: 80 };
  } else if (screenWidth > 420) {
    return { zoom: 8, panX: 190, panY: 90 };
  } else if (screenWidth > 400) {
    return { zoom: 10, panX: 170, panY: 95 };
  } else {
    return { zoom: 12, panX: 165, panY: 110 };
  }
}

// Function to initialize or reinitialize the map with dynamic zoom and pan settings
function initializeMap() {
  var zoomAndPan = getZoomAndPan(); // Get responsive zoom and pan values

  // Clear the existing map content (if any)
  document.getElementById("svgMapEuroCurrency").innerHTML = "";

  // Initialize the map with dynamic zoom and pan settings
  var svgMapEuroCurrency = new svgMap({
    targetElementID: "svgMapEuroCurrency",
    data: {
      data: {
        brand: {},
      },
      applyData: "brand",
      values: {
        EE: { brand: "Snigel" },
        LV: { brand: "Teledyne" },
        LT: { brand: "Parrot" },
        SE: { brand: "Brand1" },
        FI: { brand: "Brand2" },
      },
    },
    colorMin: "#E2E2E2",
    colorMax: "#b09c86",
    colorNoData: "#E2E2E2",
    initialZoom: zoomAndPan.zoom,
    initialPan: {
      x: zoomAndPan.panX,
      y: zoomAndPan.panY,
    },
    mouseWheelZoomEnabled: true,
    mouseWheelZoomWithKey: true,
    onGetTooltip: function (tooltipDiv, countryID, countryValues) {
      var countries = svgMapEuroCurrency.countries;
      var tooltipContentElement = document.createElement("div");
      tooltipContentElement.style.padding = "16px 24px";
      tooltipContentElement.style.color = "black";
      tooltipContentElement.style.fontFamily = "Poppins";

      var innerHTML =
        '<div style="margin: 0 0 10px; text-align: center"><img src="https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg" alt="" style="height: 40px; width: auto; border: 2px solid #eee"></div>'.replace(
          "{0}",
          countryID.toLowerCase()
        );

      innerHTML +=
        '<div style="min-width: 180px; font-weight: bold; margin: 0 0 15px; text-align: center">' +
        countries[countryID] +
        "</div>";

      if (countryValues && countryValues.brand) {
        innerHTML +=
          '<div style="margin-bottom: 8px"><span style="color: #6d0; display: inline-block; margin-right: 4px; width: 20px; text-align: center">✔</span>Brand: ' +
          countryValues.brand +
          "</div>";
      }

      tooltipContentElement.innerHTML = innerHTML;
      return tooltipContentElement;
    },
  });
}

// Disable fullPage.js scrolling on map interaction
const mapContainer = document.getElementById("svgMapEuroCurrency");
mapContainer.addEventListener("mouseenter", () => {
  fullpage_api.setAllowScrolling(false);
});
mapContainer.addEventListener("mouseleave", () => {
  fullpage_api.setAllowScrolling(true);
});
mapContainer.addEventListener("touchstart", () => {
  fullpage_api.setAllowScrolling(false);
});
mapContainer.addEventListener("touchend", () => {
  fullpage_api.setAllowScrolling(true);
});

// Reinitialize map on window resize for responsiveness
window.addEventListener("resize", initializeMap);

// Initial map load
document.addEventListener("DOMContentLoaded", initializeMap);

// Slide

function openModal(event) {
  const modal = event.target.closest(".slide").querySelector(".slide-modal");
  modal.style.display = "block";  // Show modal
}

function closeModal() {
  document.querySelectorAll(".slide-modal").forEach((modal) => {
    modal.style.display = "none";  // Hide all modals
  });
}