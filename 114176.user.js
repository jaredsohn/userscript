// ==UserScript==
// @name           FFBS-center
// @namespace      http://userscripts.org/users/409533
// @description    Centre l'affichage du site de la FD de Baseball et Softball
// @include       	http://www.ffbsc.org/*
// ==/UserScript==

(function () {

 // Inject your own CSS in the page.
 // Example: Do not underline link:
 // injectCSS("a{text-decoration: none;}")
    function injectCSS(cssdata)
    {
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
    }


injectCSS('body{margin-left:25%;}')
injectCSS('.nav3{left:1100px;}')

})();