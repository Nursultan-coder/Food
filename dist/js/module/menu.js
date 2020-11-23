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
