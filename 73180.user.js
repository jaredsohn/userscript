// ==UserScript==

// @name           Newgrounds: Bacon Day!

// @namespace      http://userscripts.org/users/117199

// @include        *.newgrounds.com/*

// @description    We all loved Bacon Day at Newgrounds. Too bad it had to end. But I created this script just to bring it right back.

// @version        1

// @author         iAmGrimReaper

// @date           2010-4-2 17:03

// ==/UserScript==

function searchAndReplace(whattoreplace,replacer){
while(document.body.innerHTML.indexOf(whattoreplace) > 0){
document.body.innerHTML = document.body.innerHTML.replace(whattoreplace, replacer);
}
}

searchAndReplace("http://licon.ngfiles.com/level", "http://img98.imageshack.us/img98/7914/levelbacon.gif?");
searchAndReplace(" me ", " Kevin Bacon ");
searchAndReplace("i'm", "Kevin Bacon is");
searchAndReplace("i'll", "Kevin Bacon'll");
searchAndReplace("you ", "Kevin Bacon ");
searchAndReplace("we'", "Kevin Bacon");
searchAndReplace("we ", "Kevin Bacon ");
searchAndReplace("they", "Kevin Bacon");
searchAndReplace("i've", "Kevin Bacon has");
searchAndReplace(" I ", " Kevin Bacon ");
searchAndReplace(" i ", " Kevin Bacon ");
searchAndReplace("I ", " Kevin Bacon ");
searchAndReplace("i ", " Kevin Bacon ");
document.body.innerHTML = document.body.innerHTML + "<style>#center {background: #000 url(http://img517.imageshack.us/img517/2800/logobg.gif) top center no-repeat;}</style>";