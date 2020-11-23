const slide = document.querySelectorAll(".offer__slide"),
          slider = document.querySelector(".offer__slider"),
          btnPrev = document.querySelector(".offer__slider-prev"),
          btnNext = document.querySelector(".offer__slider-next"),
          carent = document.querySelector("#current"),
          total = document.querySelector("#total"),
          slidewrapper = document.querySelector(".offer__slider-wrapper"),
          slideInner = document.querySelector(".offer__sider-inner"),
          width = window.getComputedStyle(slidewrapper).width;

    let index = 0;
    let offset = 0;

    slideInner.style.width = 100 * slide.length + "%";
    slideInner.style.display = "flex";
    slideInner.style.transition = "0.5s All";

    slidewrapper.style.overflow = 'hidden';

    slide.forEach(slides => {
        slides.style.width = width;
    });

    carent.innerHTML = "";
    total.innerHTML = "";

    carent.innerHTML = `0${index + 1}`;
    total.innerHTML = `0${index + 2}`;

    function totalIndex() {
        if (index == 3) {
           carent.innerHTML = `0${index + 1}`;
            total.innerHTML = `0${index - 2}`;
        } else {
            carent.innerHTML = `0${index + 1}`;
            total.innerHTML = `0${index + 2}`;
        }
    }

    function dotsActiv() {
        dots.forEach(dot => dot.style.opacity = "0.5");
        dots[index].style.opacity = "1";
    }

    function lastSlide() {
        if (index == 0) {
            index = slide.length - 1;
            totalIndex();
        } else {
            index--;
            totalIndex();
        }
    }

    function deleteStr(str) {
        return +str.replace(/\D/g, "");
    }

    slider.style.position = 'relative';

    const indicators = document.createElement("ol"),
          dots = [];
    indicators.classList.add("carousel-indicators");
    slider.append(indicators);

    for(let i = 0; i < slide.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if (i == 0) {
            dot.style.opacity = "1";
        }
        indicators.append(dot);
        dots.push(dot);
    }

    btnNext.addEventListener("click", () => {
        if (offset == deleteStr(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += deleteStr(width);
        }
        slideInner.style.transform = `translateX(-${offset}px)`;

        if (index == slide.length - 1) {
            index = 0;
            totalIndex();
        } else {
            index++;
            totalIndex();
        }

        dotsActiv();
        clearInterval(slideInterval);
    });

    btnPrev.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteStr(width) * (slide.length - 1);
        } else {
            offset -= deleteStr(width);
        }
        slideInner.style.transform = `translateX(-${offset}px)`;

        lastSlide();
        dotsActiv();
        clearInterval(slideInterval);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");

            index = slideTo;
            offset = deleteStr(width) * (slideTo - 1);

            slideInner.style.transform = `translateX(-${offset}px)`;

            lastSlide();
            dotsActiv();
        });
    });

    function sliderTimer() {
        if (offset == deleteStr(width) * (slide.length - 1)) {
            offset = 0;
        } else {
            offset += deleteStr(width);
        }
        slideInner.style.transform = `translateX(-${offset}px)`;

        if (index == slide.length - 1) {
            index = 0;
            totalIndex();
        } else {
            index++;
            totalIndex();
        }

        dotsActiv();
    }

    const slideInterval = setInterval(sliderTimer, 3000);