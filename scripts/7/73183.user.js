// ==UserScript==

// @name           Newgrounds: (Not So) Bacon Day!

// @namespace      http://userscripts.org/users/117199

// @include        *.newgrounds.com/*

// @description    Requested by Tateos.

// @version        1

// @author         iAmGrimReaper

// @date           2010-4-2 14:31

// ==/UserScript==

function searchAndReplace(whattoreplace,replacer){
while(document.body.innerHTML.indexOf(whattoreplace) > 0){
document.body.innerHTML = document.body.innerHTML.replace(whattoreplace, replacer);
}
}

searchAndReplace("http://licon.ngfiles.com/level", "http://bbsimg.ngfiles.com/1/20982000/ngbbs4bb4c0ae0d838.gif?");