const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const bg = document.getElementById("bg");
let ticking = false;

function updateGradient() {
  const scroll = window.scrollY;
  const height = Math.max(document.body.scrollHeight - window.innerHeight, 1);
  const t = Math.min(scroll / height, 1);

  // Neutral dark start
  const dark = { r: 18, g: 18, b: 18 };

  // Warm target colors (your palette)
  const top    = { r: 19,  g: 15,  b: 13  };  // #130F0D
  const middle = { r: 149, g: 122, b: 105 };  // #957A69
  const bottom = { r: 54,  g: 50,  b: 49  };  // #363231

  const mix = (a, b, t) => Math.round(a + (b - a) * t);

  const c1 = {
    r: mix(dark.r, top.r, t * 0.6),
    g: mix(dark.g, top.g, t * 0.6),
    b: mix(dark.b, top.b, t * 0.6)
  };

  const c2 = {
    r: mix(dark.r, middle.r, t * 0.85),
    g: mix(dark.g, middle.g, t * 0.85),
    b: mix(dark.b, middle.b, t * 0.85)
  };

  const c3 = {
    r: mix(dark.r, bottom.r, t),
    g: mix(dark.g, bottom.g, t),
    b: mix(dark.b, bottom.b, t)
  };

  bg.style.background = `
    linear-gradient(
      to bottom,
      rgb(${c1.r},${c1.g},${c1.b}),
      rgb(${c2.r},${c2.g},${c2.b}),
      rgb(${c3.r},${c3.g},${c3.b})
    )
  `;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateGradient();
      ticking = false;
    });
    ticking = true;
  }
});
