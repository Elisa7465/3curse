document.addEventListener("DOMContentLoaded", () => {
    // Обработчик для header-button
    const headerButton = document.querySelector(".header-button, .button-blue");
    headerButton.addEventListener("click", () => {
        window.location.href = "./new.html";
    });

    // Обработчик для button-blue
    const buttonBlue = document.querySelector(".button-blue");
    buttonBlue.addEventListener("click", () => {
        window.location.href = "./new.html";
    });
});
