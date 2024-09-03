// import * as bootstrap from "bootstrap";
// import { favourite } from "./index.js";

// export function createCarouselItem(imgSrc, imgAlt, imgId) {
//     const template = document.querySelector("#carouselItemTemplate");
//     const clone = template.content.firstElementChild.cloneNode(true);

//     const imgElement = clone.querySelector("img");
//     imgElement.src = imgSrc;
//     imgElement.alt = imgAlt;

//     const favButton = clone.querySelector(".favourite-button");
//     favButton.dataset.imgId = imgId;

//     favButton.addEventListener("click", () => {
//         favourite(imgId);
//     });

//     return clone;
// }

// export function clear() {
//     const carousel = document.querySelector("#carouselInner");
//     while (carousel.firstChild) {
//         carousel.removeChild(carousel.firstChild);
//     }
// }

// export function appendCarousel(element) {
//     const carousel = document.querySelector("#carouselInner");
//     const activeItem = document.querySelector(".carousel-item.active");
//     if (!activeItem) element.classList.add("active");
//     carousel.appendChild(element);
// }

// export function start() {
//     const multipleCardCarousel = document.querySelector("#carouselExampleControls");
//     if (window.matchMedia("(min-width: 768px)").matches) {
//         const carousel = new bootstrap.Carousel(multipleCardCarousel, { interval: false });
//         const carouselWidth = $(".carousel-inner")[0].scrollWidth;
//         const cardWidth = $(".carousel-item").width();
//         let scrollPosition = 0;

//         $("#carouselExampleControls .carousel-control-next").unbind();
//         $("#carouselExampleControls .carousel-control-next").on("click", function () {
//             if (scrollPosition < carouselWidth - cardWidth * 4) {
//                 scrollPosition += cardWidth;
//                 $("#carouselExampleControls .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
//             }
//         });

//         $("#carouselExampleControls .carousel-control-prev").unbind();
//         $("#carouselExampleControls .carousel-control-prev").on("click", function () {
//             if (scrollPosition > 0) {
//                 scrollPosition -= cardWidth;
//                 $("#carouselExampleControls .carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
//             }
//         });
//     } else {
//         $(multipleCardCarousel).addClass("slide");
//     }
// }
import * as bootstrap from "bootstrap";
import { favourite } from "./index.js";

export function createCarouselItem(imgSrc, imgAlt, imgId) {
    const template = document.querySelector("#carouselItemTemplate");
    if (!template) {
        console.error('Carousel template not found');
        return;
    }

    const clone = template.content.firstElementChild.cloneNode(true);
    const imgElement = clone.querySelector("img");
    const favButton = clone.querySelector(".favourite-button");

    if (imgElement) {
        imgElement.src = imgSrc;
        imgElement.alt = imgAlt;
    }

    if (favButton) {
        favButton.dataset.imgId = imgId;
        favButton.addEventListener("click", () => {
            favourite(imgId);
        });
    }

    return clone;
}

export function clear() {
    const carousel = document.querySelector("#carouselInner");
    if (carousel) {
        while (carousel.firstChild) {
            carousel.removeChild(carousel.firstChild);
        }
    } else {
        console.error('Carousel container not found');
    }
}

export function appendCarousel(element) {
    const carousel = document.querySelector("#carouselInner");
    if (carousel) {
        const activeItem = document.querySelector(".carousel-item.active");
        if (!activeItem) element.classList.add("active");
        carousel.appendChild(element);
    } else {
        console.error('Carousel container not found');
    }
}

export function start() {
    const multipleCardCarousel = document.querySelector("#carouselExampleControls");
    if (multipleCardCarousel && window.matchMedia("(min-width: 768px)").matches) {
        const carousel = new bootstrap.Carousel(multipleCardCarousel, { interval: false });
        const carouselInner = document.querySelector(".carousel-inner");
        const carouselItems = document.querySelectorAll(".carousel-item");
        const cardWidth = carouselItems[0]?.offsetWidth || 0;
        let scrollPosition = 0;

        const nextButton = document.querySelector("#carouselExampleControls .carousel-control-next");
        const prevButton = document.querySelector("#carouselExampleControls .carousel-control-prev");

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                if (scrollPosition < (carouselInner.scrollWidth - cardWidth * 4)) {
                    scrollPosition += cardWidth;
                    carouselInner.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
            });
        }

        if (prevButton) {
            prevButton.addEventListener("click", () => {
                if (scrollPosition > 0) {
                    scrollPosition -= cardWidth;
                    carouselInner.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
            });
        }
    } else {
        if (multipleCardCarousel) {
            multipleCardCarousel.classList.add("slide");
        }
    }
}