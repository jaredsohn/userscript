// ==UserScript==
// @name        Vkontach
// @namespace   none.of
// @include     http://vk.com/*
// @include     https://vk.com/*
// ==/UserScript==
(function () {
    var elems = document.getElementsByClassName("left_label inl_bl");
    
    elems[0].textContent = "Мой Фейк";
    elems[2].textContent = "Мои Аноны";
    elems[3].textContent = "Мои Анимедевочки";
    elems[4].textContent = "Мой Хентай";
    elems[5].textContent = "Мои ОСТы";
    elems[6].textContent = "Мой Троллеркоастер";
    //elems[7].textContent = ""; //Мои Заметки
    elems[8].textContent = "Мои Картинкопаблики";
    //elems[9].textContent = ""; //Мои Встречи
    elems[10].textContent = "Мой Засранный Фид";
    elems[11].textContent = "Мои Лойсы";
    elems[12].textContent = "Мой Конфиг";
    elems[13].textContent = "Флеш-игоры";
    elems[14].textContent = "Гифки"; // Ну да, "Джифки" правильней
})(); 