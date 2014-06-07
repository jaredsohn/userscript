// ==UserScript==
// @name Add Reader to google Navigator
// @description Add Google Reader link back to where it was in the top-navigation bar on google application pages. Based shamelessly on userscripts.org/scripts/show/114191 and userscripts.org/scripts/show/95077.
// @match http://*.google.com/*
// @match https://*.google.com/*
// @version 1.2
// ==/UserScript==

function addReaderLink() {
    var sites=null, reader=null;

    // Replace the [Sites] Elemens
    sites=document.getElementById('gb_38');
    
    sites.setAttribute('href', 'http://www.google.com/reader/');
    sites.setAttribute('onclick', '');
    sites.innerHTML='<span class="gbtb2"></span><span class="gbts">Reader</span>';
    
    // Replace the [Reader] Elemens
    reader=document.getElementById('gb_32');

    reader.setAttribute('href', 'https://sites.google.com/');
    reader.setAttribute('onclick', '');
    reader.innerHTML='<span class="gbtb2"></span><span class="gbts">Sites</span>';
};

try {
        addReaderLink();
} catch (e) {
        setTimeout(addReaderLink, 2000);
}