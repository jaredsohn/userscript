// ==UserScript==
// @author          Nikolay Samokhvalov
// @name            ITpeople.RU fixing: fix logo's link
// @description     The script allows to change logo's link to old one (that leads to summary page)
// @namespace       http://itpeople.ru
// @include         http://*itpeople.ru/*
// ==/UserScript==
// !! todo: do not rely on index of nodes...
(function()
{
    if (window.location == 'http://itpeople.ru/') {
        window.location = 'http://itpeople.ru/summary';
    }
    document.body.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].href = "http://itpeople.ru/summary";
})();