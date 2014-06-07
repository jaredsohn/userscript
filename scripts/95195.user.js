// ==UserScript==
// @name           Wykop.pl bez ramki
// @namespace      http://userscripts.org/scripts/show/95195
// @version        20110922
// @description    Usuwa ramkę serwisu wykop.pl dla niezalogowanych użytkowników
// @include        http://wykop.pl/ramka/*
// @include        http://*.wykop.pl/ramka/*
// ==/UserScript==

(function() {
    var pageFrame = document.getElementById('view-frame');

    if (!pageFrame || !pageFrame.src)
      return;

    // can't remove frame from pages hosted on wykop.pl
    if (pageFrame.src.match(/^(https?:\/\/)?(www\.)?wykop.pl\//i))
      return;

    try
    {
        window.location.replace(pageFrame.src);
    }
    catch (e)
    { 
        window.location.href = pageFrame.src;
    }
})()

