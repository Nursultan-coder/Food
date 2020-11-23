const forms = document.querySelectorAll("form");

// const massage = {
//     loading: "загрузка",
//     success: "Спасибо! Скоро мы с вами свяжемся",
//     failture: "Что-то пошло не так..."
// };

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // const statusMasseg = document.createElement("div");
        // statusMasseg.classList.add("status");
        // //statusMasseg.textContent = message.loading;
        // form.append(statusMasseg);
        
        const request = new XMLHttpRequest();
        request.open("POST", "../server.php");

        request.setRequestHeader("content-type", "application/json ");
        const formData = new FormData(form);

        const object = {};
        formData.forEach(function (value, key) {
            
        })

        request.send(formData);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                //statusMasseg.textContent = message[success];
            } else {
                //statusMasseg.textContent = message[failture];
            }
        });




        // const formData = new FormData(form);

        // fatch("server.php", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //     body: formData
        // }).then(data => {
        //     console.log(data);
        //     statusMasseg.textContent = message.success;
        // }).catch(() => {
        //     statusMasseg.textContent = message.failture;
        // }).finally(() => {
        //     form.reset;
        // })
    });
}
