// ==UserScript==
// @name          Confreaks flash fix
// @description   Flash player height fix
// @author        trololo
// @include       http://*.confreaks.net/*
// @include       http://confreaks.net/*
// ==/UserScript==

(function () {
    document.getElementById("mpl").height = 480;
})();
