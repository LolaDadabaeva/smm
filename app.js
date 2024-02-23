'use strict'
document.addEventListener('DOMContentLoaded', function () {
    const mainSliderState = { isOpen: false };
    initSlider('.mySwiper', '#scrollButton', '#slider-wrapper', mainSliderState);
    initSlider('.mySwiper2', '#button2', '#slider-wrapper2', { isOpen: false });
    initSlider('.mySwiper3', '#button3', '#slider-wrapper3', { isOpen: false });
    initSlider('.mySwiper4', '#button4', '#slider-wrapper4', { isOpen: false });
});
function initSlider(swiperSelector, buttonSelector, wrapperSelector, state) {
    const button = document.querySelector(buttonSelector);
    const sliderWrapper = document.querySelector(wrapperSelector);

    const slider = new Swiper(swiperSelector, {
        slidesPerView: 1,
        spaceBetween: 1,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 5 },
        },
        speed: 800,
    });

    button.addEventListener('click', function (event) {
        event.preventDefault();
        state.isOpen = !state.isOpen;
        toggleSlider(state.isOpen, sliderWrapper);
    });
}

function toggleSlider(isOpen, wrapper) {
    const sliderWrappers = document.querySelectorAll('.slider-wrapper');
    sliderWrappers.forEach(w => {
        w.classList.toggle('open', isOpen && w === wrapper);
        const targetHeight = isOpen && w === wrapper ? w.scrollHeight : 0;
        slideToggle(w, w.offsetHeight, targetHeight, 300);
    });
}

function slideToggle(element, start, end, duration) {
    let startTimestamp;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.style.height = `${start + progress * (end - start)}px`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
