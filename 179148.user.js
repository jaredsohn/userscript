// ==UserScript==
// @name        Invert MySQL Page Titles
// @namespace   http://.userscripts.org/
// @include     *phpmyadmin*
// @include     *dev.mysql.com*
// @version     0.1
// @grant       none
// ==/UserScript==

window.addEventListener("load", invertTitle, false);

function invertTitle () {
    var title = document.title;
    var token;
    if (window.location.href.contains("dev.mysql.com"))
    {
        // remove the page number first
        title = title.replace(/ :: (?:\d+\.?)+/g, " :: ");
        token = " :: ";
    }
    else if (window.location.href.contains("phpmyadmin"))
    {
        title = title.replace(/ \|.+/g, ""); // ?
        token = " / ";
    }
    else { return; }
    var words = title.split(token);
    words = words.reverse();
    title = words.join(token);
    document.title = title;
}