// ==UserScript==
// @name          GameBase Auto Check-in
// @description	  遊戲基地自動簽到
// @author        chunhung
// @icon          http://images.gamebase.com.tw/favicon.gif
// @version       1402.00
// @updateURL     http://userscripts.org/scripts/source/345262.user.js
// @include       http://www.gamebase.com.tw/*
// ==/UserScript==

//Hidden Alert
unsafeWindow.alert = function alert(message) {
    console.log('Hidden Alert ' + message);
}

//autoclick button after X sec
setTimeout(function() {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0,
                       false, false, false, false,
                       0, null);
    var link = document.querySelector(".button_checkin");
    link.dispatchEvent(evt);
}, 1000);
