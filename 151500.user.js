// ==UserScript==
// @name MyscriptMessages
// @description Мой самый первый юзерскрипт 
// @author Andretry
// @version 1.0
// @include     http://*.ogame*/game/index.php?page=galaxy*
// @include     http://*.ogame.*/game/index.php?page=messages*
// @include     http://*.ogame.*/game/index.php?page=*raidefacil=scriptOptions*
// @include     http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)

(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }


    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }
    //alert("111");

})(window);
