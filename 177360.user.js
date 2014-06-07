// ==UserScript==
// @name myUserJS
// @description Мой самый первый юзерскрипт 
// @author Lex
// @license MIT
// @version 1.0
// @include http://r1.ru.bloodwars.net/?a=ambush
// @include http://r1.ru.bloodwars.net/?a=quest
// ==/UserScript==
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow
    } else {
        w = window;
    }
  
    if (w.self != w.top) {
        return;
    }
   
    if (/http:\/\/r1.ru.bloodwars.net/?a=ambush/.test(w.location.href)) {

        alert("Userscripts приветствует вас навязчивым окном.");
    if (/http:\/\/r1.ru.bloodwars.net/?a=quest/.test(w.location.href)) {

        alert("Userscripts приветствует вас навязчивым окном.");
    }
})(window);