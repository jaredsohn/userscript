// ==UserScript==
// @name US Privat24
// @description US for PrivatBank 
// @author Denis Zhavoronok
// @license MIT
// @version 1.0
// @include https://privat24.privatbank.ua/p24/*
// @require http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
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
    // [4] дополнительная проверка наряду с @include
 if (/https:\/\/privat24.privatbank.ua/.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
   var noLog = setInterval(function(){
        location.reload();
    }, 300000);

    }
})(window);