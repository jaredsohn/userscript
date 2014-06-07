// ==UserScript==
// @name Add Reader to google Navigator
// @description Add Google Reader link back to where it was in the top-navigation bar on google application pages. Based shamelessly on userscripts.org/scripts/show/114191 and userscripts.org/scripts/show/95077.From http://userscripts.org/scripts/review/115234 but  Modified by Absoblogginlutely to replace news rather than sites.
// @match http://*.google.com/*
// @match https://*.google.com/*
// @version 1.3
// ==/UserScript==

function addReaderLink() {
    var news=null, reader=null;

    // Replace the [news] Elemens
    news=document.getElementById('gb_5');
    
    news.setAttribute('href', 'http://www.google.com/reader/');
    news.setAttribute('onclick', '');
    news.innerHTML='<span class="gbtb2"></span><span class="gbts">Reader</span>';
    
    // Replace the [Reader] Elemens
    reader=document.getElementById('gb_32');

    reader.setAttribute('href', 'https://news.google.com/');
    reader.setAttribute('onclick', '');
    reader.innerHTML='<span class="gbtb2"></span><span class="gbts">news</span>';
};

try {
        addReaderLink();
} catch (e) {
        setTimeout(addReaderLink, 2000);
}