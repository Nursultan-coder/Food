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