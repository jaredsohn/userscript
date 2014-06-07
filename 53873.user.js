// ==UserScript==
// @name           pennergame Logout und Premiumwerbung ueberspringen 
// @author         basti1012
// @namespace      by basti1012 (http://pennerhack.foren-city.de)
// @description    Wenn man sich einlogt dannn kommt ab und an das rote bild mit den hinweis das man sich nicht ausgelogt ghat ,oder und die neue werbung fuer premium ,mit diesn script wird das einfach uebersprungen
// @include        *pennergame*
// @include        *berlin.pennergame*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://berlin.pennergame.de/overview/';
}
else if(document.location.href.indexOf('pennergame.de/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://www.pennergame.de/overview/';
}
else if(document.location.href.indexOf('menelgame.pl/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://menelgame.pl/overview/';
}
else if(document.location.href.indexOf('dossergame.co.uk/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://dossergame.co.uk/overview/';
};
if (document.location.href.indexOf('www.berlin.pennergame.de/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://berlin.pennergame.de/overview/';
}
else if(document.location.href.indexOf('www.pennergame.de/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://www.pennergame.de/overview/';
}
else if(document.location.href.indexOf('www.menelgame.pl/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://menelgame.pl/overview/';
}
else if(document.location.href.indexOf('www.dossergame.co.uk/overview/?nologout&show_premium=true')>=0) {
var vonr = '100';
window.location.href = 'http://dossergame.co.uk/overview/';
};

if (document.location.href.indexOf('berlin.pennergame.de/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://berlin.pennergame.de/overview/';
}
else if(document.location.href.indexOf('pennergame.de/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://www.pennergame.de/overview/';
}
else if(document.location.href.indexOf('menelgame.pl/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://menelgame.pl/overview/';
}
else if(document.location.href.indexOf('dossergame.co.uk/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://dossergame.co.uk/overview/';
};
if (document.location.href.indexOf('www.berlin.pennergame.de/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://berlin.pennergame.de/overview/';
}
else if(document.location.href.indexOf('www.pennergame.de/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://www.pennergame.de/overview/';
}
else if(document.location.href.indexOf('www.menelgame.pl/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://menelgame.pl/overview/';
}
else if(document.location.href.indexOf('www.dossergame.co.uk/overview/?nologout')>=0) {
var vonr = '100';
window.location.href = 'http://dossergame.co.uk/overview/';
};















