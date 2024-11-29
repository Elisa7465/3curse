function showLoader() { 
    const loader = document.getElementById('spinner-container'); 
    loader.classList.add('show');  
    setTimeout(() => { 
      loader.classList.remove('show');  
    }, 1000); 
  } 

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const languageSwitch = document.querySelector(".switch input");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownLabel = document.querySelector(".dropdown-label");

    let currentLanguage = "ru"; // Текущий язык, по умолчанию русский
    let cardData = []; // Данные карточек для текущего языка

    // Тексты для dropdown в зависимости от языка
    const dropdownTexts = {
        ru: ["Услуга 1", "Услуга 2", "Услуга 3", "Услуга 4", "Услуга 5", "Услуга 6", "Услуга 7"],
        en: ["Service 1", "Service 2", "Service 3", "Service 4", "Service 5", "Service 6", "Service 7"]
    };

    // Тексты для кнопок в зависимости от языка
    const buttonTexts = {
        ru: "Выбрать этот тариф",
        en: "Choose this plan"
    };
    const monthTexts = {
        ru: "/в месяц",
        en: "/month"
    };

    // Функция загрузки данных из JSON
    async function loadCardData(language) {
        const response = await fetch(`cardData_${language}.json`);
        const data = await response.json();
        return data;
    }

    // Функция рендеринга карточек
    function renderCards(data) {
        container.innerHTML = ""; 
        data.forEach((card) => {
            const cardElement = document.createElement("div");

            if (card.title.includes("Про") || card.title.includes("Pro")) {
                cardElement.classList.add("card-pro");
            } else {
                cardElement.classList.add("card-standart");
            }

            cardElement.innerHTML = `
                <div class="not-button">
                    <p class="tarif">${card.title}</p>
                    <p class="info">${card.description}</p>
                    <div class="price">
                        <p class="price-price">${card.price}</p>
                        <p class="price-month">${monthTexts[currentLanguage]}</p>
                    </div>
                    <div class="line"></div>
                    <ul class="list">
                        ${card.services.map((service) => `<li>${renderServiceIcon()}<p class="name-li">${service}</p></li>`).join("")}
                    </ul>
                </div>
                <button>${buttonTexts[currentLanguage]}</button>
            `;
            container.appendChild(cardElement);
        });
    }

    // Функция рендеринга иконки для списка услуг
    function renderServiceIcon() {
        return `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#354153" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }

    // Функция обновления dropdown-menu в зависимости от языка
    function updateDropdownMenu() {
        dropdownMenu.innerHTML = ""; // Очищаем меню
        dropdownTexts[currentLanguage].forEach((text) => {
            const item = document.createElement("div");
            item.className = "dropdown-item";
            item.innerHTML = `<input type="checkbox"> <span class="menu-text">${text}</span>`;
            dropdownMenu.appendChild(item);
        });

        // Назначаем слушатели чекбоксам
        const checkboxes = dropdownMenu.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", filterCards);
        });
    }

    // Функция фильтрации карточек по выбранным услугам
    function filterCards() {
        const checkboxes = dropdownMenu.querySelectorAll("input[type='checkbox']");
        const selectedServices = Array.from(checkboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.nextElementSibling.textContent.trim());

        if (selectedServices.length === 0) {
            // Если нет выбранных услуг, показываем все карточки
            renderCards(cardData);
        } else {
            // Фильтруем карточки, чтобы услуги соответствовали выбранным
            const filteredCards = cardData.filter((card) =>
                selectedServices.every((service) => card.services.includes(service))
            );
            renderCards(filteredCards); // Рендерим отфильтрованные карточки
        }
    }

    // Функция загрузки данных, обновления языка и перерисовки
    async function updateLanguage() {
        
        cardData = await loadCardData(currentLanguage); // Загружаем данные карточек
        renderCards(cardData); // Отображаем карточки
        updateDropdownMenu(); // Обновляем dropdown-menu
    }



    // Слушатель переключения языка
    languageSwitch.addEventListener("change", () => {
        currentLanguage = languageSwitch.checked ? "en" : "ru"; // Изменение языка
        dropdownLabel.textContent = currentLanguage === "en" ? "Choose a plan" : "Подобрать тариф";
        updateLanguage();
    });

    // Начальная загрузка
    updateLanguage();
});
