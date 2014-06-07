// ==UserScript==
// @name           Google Search link cleaner
// @namespace      tgr
// @description    A simple script to clean urls of the result links on the Google Search page
//                 An onmousedown event handler changes those urls to point to www.google.*/url?... to count clicks
//                 which can be extremely annoying because it messes up right-click "copy link location" functionality
//                 This script installs a second event handler which instantly restores the original url
// @include        http://www.google.com/search?*
// ==/UserScript==

// return a query parameter from an url; null if not found
function getParameter(url, name) {
    var paramsStart = url.indexOf("?");
    if(paramsStart == -1) return null;
    var paramsEnd = url.indexOf("#");
    if(paramsEnd == -1) 
        queryString = url.substr(paramsStart + 1);
    else
        queryString = url.substr(paramsStart + 1, paramsEnd - paramsStart - 1);
    var parameters = queryString.split('&');
    for(var i = 0; i < parameters.length; i++) {
        var values = parameters[i].split('=');
        if(values[0] == name)
            return unescape(values[1]);
    }
    return null;
}

// if the url begins with "/url", get the original url (which is now in the "url" parameter of the query string)
// then remove our event listener (the original event handler runs only once so there's no further need)
function clearUrl(event) {
    var link = this.getAttribute('href');
    if(link.match(/^\/url/)); {
        var originalLink = getParameter(link, 'url');
        if(originalLink) {
            this.setAttribute('href', originalLink);
            this.removeEventListener("mousedown", clearUrl, true);
        }
    }
}

// find links to search results and add an event handler to them, which undoes the effect of the original event handler
// (the original event handler cannot be removed due to GreaseMonkey's Javascript limitations)
var linkList = document.getElementById("res").getElementsByTagName("a");
for(var i = 0; i < linkList.length; i++) {
    var link = linkList[i];
    if(link.className == "l") {
        link.addEventListener("mousedown", clearUrl, true);
    }
}
