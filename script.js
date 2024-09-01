const counter = document.getElementById("count");
var crsr = document.querySelector(".crsr");
const loco = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    mobile: {
      smooth: true,
    },
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
const isDesktop = window.matchMedia("(min-width: 768px)");
function load() {
  var tl = gsap.timeline();
  document.body.style.overflow = "hidden";
  window.addEventListener("load", () => {
    tl.from(".loader-line h3", {
      y: 1600,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.2,
      onStart: () => {
        var count = 0;
        var loading = setInterval(() => {
          
          if (count <= 100) {
            counter.innerHTML = count++;
          } else {
            clearInterval(loading);
          }
        }, 20);
      },
    });

    tl.to(".loader-line", {
      opacity: 0,
      delay: 1,
    });
    tl.to("#loader", {
      translateY: "-100%",
    });
    tl.from(
      ".hero-inner h1, .hero-inner span",
      {
        translateY: "100%",
      },
      "a"
    );
    tl.from(
      "nav",
      {
        opacity: 0,

        ease: "power4.out",
        onStart: () => {
          document.body.style.overflow = "visible";
        },
      },
      "a"
    );
  });
}
function lineAnimation() {
  var tl = gsap.timeline();
  var sections = document.querySelectorAll(".line-container");
  sections.forEach((elem) => {
    // Target all .line elements within the current .line-container
    elem.querySelectorAll(".line").forEach((line, index) => {
      // Define a unique delay for each .line to start animating at different times
      gsap.to(line, {
        width: "100%", // Animate the width to 100%
        ease: "none", // Keep the animation linear
        delay: index * 0.5,
        stagger: 2,
        scrollTrigger: {
          scroller: "#main", // Make sure the scroller is correctly specified
          trigger: elem, // Ensure the trigger is each section element
          start: "top 70%",
          end: "bottom bottom", // Adjust this if needed
        },
      });
    });
  });
}
function mouse() {
  Shery.mouseFollower();
}
function videoAnimation() {
  var video = document.querySelector(".video-container");
  var vidcrsr = video.querySelector(".video-crsr");
  const player = document.querySelector("video");
  const playerImg = video.querySelector("img");
  video.addEventListener("mousemove", (e) => {
    if (isDesktop.matches) {
      gsap.to(vidcrsr, {
        top: e.clientY - vidcrsr.getBoundingClientRect().top,
        left: e.clientX - 580,
      });
      gsap.to(".mousefollower", {
        scale: 0,
      });
    }
  });
  video.addEventListener("mouseleave", (e) => {
    if (isDesktop.matches) {
      gsap.to(vidcrsr, {
        left: "initial",
        right: "10%",
        top: "-2%",
      });
      gsap.to(".mousefollower", {
        scale: 1,
      });
    }
  });
  var flag = 0;
  video.addEventListener("click", (e) => {
    if (flag !== 0) {
      flag = 0;
      player.pause();
      playerImg.style.opacity = 1;

      gsap.to(vidcrsr, {
        scale: 1,
      });
      vidcrsr.innerHTML = `<i class="ri-play-line"></i>`;
    } else {
      player.play();
      playerImg.style.opacity = 0;

      gsap.to(vidcrsr, {
        scale: 0.5,
      });
      vidcrsr.innerHTML = `<i class="ri-pause-line"></i>`;
      flag = 1;
    }
  });
}
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  gsap.to("#flag", {
    top: y,
    left: x,
  });
  var text = document.querySelectorAll(".text");
  text.forEach((e) => {
    e.addEventListener("mouseenter", () => {
      if (isDesktop.matches) {
        gsap.to("#flag", {
          opacity: 1,
        });
        gsap.to(crsr, {
          scale: 0,
        });
      }
    });
    e.addEventListener("mouseleave", () => {
      if (isDesktop.matches) {
        gsap.to("#flag", {
          opacity: 0,
        });
        gsap.to(crsr, {
          scale: 1,
        });
      }
    });
  });
});
function sheryAnimation() {
  Shery.makeMagnet(".magnet");
  Shery.imageEffect(".image ", {
    style: 1,
    gooey: true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.47, range: [-1, 1] },
      zindex: { value: 999, range: [-9999999, 9999999] },
      aspect: { value: 3 / 3 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: true },
      growSize: { value: 7.09, range: [1, 15] },
      durationOut: { value: 0.47, range: [0.1, 5] },
      durationIn: { value: 0.55, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 1 },
      noise_speed: { value: 0.76, range: [0, 10] },
      metaball: { value: 0.69, range: [0, 2], _gsap: { id: 25 } },
      discard_threshold: { value: 1, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.47, range: [0, 2] },
      noise_scale: { value: 6.87, range: [0, 100] },
    },
  });
}
function footerAnimation() {
  var clutter = "";
  var clutter2 = "";
  document
    .querySelector(".footer h1")
    .textContent.split("")
    .forEach(function (elem) {
      clutter += `<span>${elem}</span>`;
    });
  document.querySelector(".footer h1").innerHTML = clutter;
  document
    .querySelector(".footer h2")
    .textContent.split("")
    .forEach(function (elem) {
      clutter2 += `<span>${elem}</span>`;
    });
  document.querySelector(".footer h2").innerHTML = clutter2;
  // Initialize the timeline and the flag
  let tl = gsap.timeline({ paused: true }); // start with a paused timeline
  let flag = 1;

  document
    .querySelector("#footer-text")
    .addEventListener("mouseenter", function () {
      if (flag === 1) {
        // Restart the timeline for mouseenter
        tl.clear(); // clear any previous animations
        tl.to(".footer h1 span", {
          opacity: 0,
          stagger: 0.05,
        }).to(".footer h2 span", {
          opacity: 1,
          stagger: 0.1,
          onComplete: () => {
            flag = 0;
          },
        });
        tl.play(); // play the timeline
      }
    });

  document
    .querySelector("#footer-text")
    .addEventListener("mouseleave", function () {
      // Only trigger the mouseleave if mouseenter is complete
      if (flag === 0 && !tl.isActive()) {
        tl.clear(); // clear any previous animations
        tl.to(
          ".footer h1 span",
          {
            opacity: 1,
            stagger: 0.1,
            delay: 0.35,
          },
          "b"
        ).to(
          ".footer h2 span",
          {
            opacity: 0,
            stagger: 0.05,
            onComplete: () => {
              flag = 1;
            },
          },
          "b"
        );
        tl.play(); // play the timeline
      }
    });
}
load();
mouse();
videoAnimation();
sheryAnimation();
loco();
if (isDesktop.matches) {
  footerAnimation();
}
window.addEventListener("load", lineAnimation);
