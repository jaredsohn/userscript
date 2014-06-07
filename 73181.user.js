// ==UserScript==

// @name           ASDF

// @namespace      http://userscripts.org/users/117199

// @include        *.newgrounds.com/*

// @description    We all loved Bacon Day at Newgrounds. Too bad it had to end. But I created this script just to bring it right back.

// @version        1

// @author         iAmGrimReaper

// @date           2010-4-2 14:31

// ==/UserScript==

function searchAndReplace(whattoreplace,replacer){
while(document.body.innerHTML.indexOf(whattoreplace) > 0){
document.body.innerHTML = document.body.innerHTML.replace(whattoreplace, replacer);
}
}

searchAndReplace("http://licon.ngfiles.com/level", "http://img98.imageshack.us/img98/7914/levelbacon.gif?");
searchAndReplace(/me/gi, "Kevin Bacon");
searchAndReplace(/i'm/gi, "Kevin Bacon is");
searchAndReplace(/i'll/gi, "Kevin Bacon'll");
searchAndReplace(/i am/gi, "Kevin Bacon is");
searchAndReplace(/you/gi, "Kevin Bacon is");
searchAndReplace(/we/gi, "Kevin Bacon");
searchAndReplace(/they/gi, "Kevin Bacon");
searchAndReplace(/i've/gi, "Kevin Bacon has");
searchAndReplace(" I ", " Kevin Bacon ");
searchAndReplace(" i ", " Kevin Bacon ");
searchAndReplace("I ", " Kevin Bacon ");
searchAndReplace("i ", " Kevin Bacon ");
document.body.innerHTML = document.body.innerHTML + "<style>#center {background: #000 url(http://img517.imageshack.us/img517/2800/logobg.gif) top center no-repeat;}</style>";
