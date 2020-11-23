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