// ==UserScript==
// @name        Google+ Birthdays Remover
// @namespace   aelys-info.fr
// @include     https://plus.google.com/*
// @include     http://plus.google.com/*
// @version     3
// ==/UserScript==
(function () {
    function injectCSS(cssdata)
    {
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
    }

    function gmRemoveCommunities()
    {
        injectCSS('.kYd { display: none !important;}');
    }

    try
    {
        setTimeout(gmRemoveCommunities, 500);
    }
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }
 
})();
