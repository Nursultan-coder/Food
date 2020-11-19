"use strict";
document.addEventListener("DOMContentLoaded", () => {
    
    //Tabs
    const tabs = document.querySelectorAll(".tabheader__item");
    const tabContent = document.querySelectorAll(".tabcontent");
    const tabParents = document.querySelector(".tabheader__items");

    function hideTabContent () {
        tabContent.forEach(item => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        })
    }

    function showTabContent (i = 0) {
        tabContent[i].classList.add("show", "fade");
        tabContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabParents.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadline = '2020-12-07';

    function getTimeRename(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero(num) {
        if  (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector);
        const days = document.querySelector("#days");
        const hours = document.querySelector("#hours");
        const minutes = document.querySelector("#minutes");
        const seconds = document.querySelector("#seconds");
        const timeInterval = setInterval(upDateClock, 1000);
        
        upDateClock();

        function upDateClock() {
            const t = getTimeRename(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //Modal
    const modalTrigger = document.querySelectorAll("[data-modal]"),
          modal = document.querySelector(".modal"),
          close = document.querySelector("[data-close]");

    function openModal() {
        modal.classList.toggle("show");
        document.body.style.overflow = "hidden";
        clearInterval(modaiTimerId);
    }

    modalTrigger.forEach(item => {
        item.addEventListener("click", openModal);
    });

    function closeModal() {
        modal.classList.toggle("show");
        document.body.style.overflow = "";
    }

    close.addEventListener("click", (event) => {
        event.preventDefault();

        closeModal();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    const modaiTimerId = setTimeout(openModal, 10000);

    function showModalByscrol() {
        if (window.pageYOffset + window.document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener("scroll", showModalByscrol);
        }
    }

    window.addEventListener("scroll", showModalByscrol);

    //Menu

    class Menu {
        constructor (img, alt, title, text, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chengeToUAH();
        }

        chengeToUAH () {
            this.price = this.transfer * this.price;
        }

        render () {
            const element = document.createElement("div");
            if (this.classes.length == 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach(NameClass => element.classList.add(NameClass));
            }

            element.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    new Menu("img/tabs/vegy.jpg", 
            "vegy", 
            'Меню "Фитнес"', 
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
            9, 
            ".menu .container"
            ).render();

    new Menu("img/tabs/elite.jpg", 
            "elite", 
            'Меню “Премиум”', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
            15, 
            ".menu .container"
            ).render();

    new Menu("img/tabs/post.jpg", 
            "post", 
            'Меню "Постное"', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
            11, 
            ".menu .container"
            ).render();


    //Slider
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

    //Forms

    const forms = document.querySelectorAll("form");

    const massage = {
        loading: "загрузка",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failture: "Что-то пошло не так..."
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const statusMasseg = document.createElement("div");
            statusMasseg.classList.add("status");
            statusMasseg.textContent = message.loading;
            form.append(statusMasseg);

            const formData = new FormData(form);

            fatch("server.php", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: formData
            }).then(data => {
                console.log(data);
                statusMasseg.textContent = message.success;
            }).catch(() => {
                statusMasseg.textContent = message.failture;
            }).finally(() => {
                form.reset;
            })

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMasseg.textContent = message.success;
                } else {
                    statusMasseg.textContent = message.failture;
                }
            });
        });
    }



    //Calc

    const result = document.querySelector(".calculating__result span");
    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = "femail";
        localStorage.setItem("sex", "femail");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }
    
    function initSetingsLocal(selector, active) {
        const element = document.querySelectorAll(`${selector} div`);

        element.forEach(elem => {
            elem.classList.remove(active);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(active);
            }
            if (elem.getAttribute("data-radio") === localStorage.getItem("ratio")) {
                elem.classList.add(active);
            }
        });
    }

    initSetingsLocal("#gender", "calculating__choose-item_active");
    initSetingsLocal(".calculating__choose_big", "calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "______";
            return;
        }

        if (sex === "femail") {
            result.textContent = Math.round((47.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, active) {
        const element = document.querySelectorAll(`${selector} div`);

        element.forEach(elem => {
            elem.addEventListener("click", (event) => {
                if (event.target.getAttribute('data-radio')) {
                    ratio = +event.target.getAttribute('data-radio');
                    localStorage.setItem("ratio", +event.target.getAttribute('data-radio'));
                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
                }
    
                element.forEach(elem => {
                    elem.classList.remove(active);
                });
    
                event.target.classList.add(active);
    
                calcTotal();
            });
        });
    }

    getStaticInformation("#gender", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

    function getInputInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
    }

    getInputInformation("#height");
    getInputInformation("#weight");
    getInputInformation("#age");


    
});