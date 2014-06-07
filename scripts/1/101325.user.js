// ==UserScript==

// @name           Newgrounds:  Auto SpongeBob Icon

// @namespace      

// @include        *.newgrounds.com/*

// @description    

// @version        1

// @author         EggoBleeder

// @date           

// ==/UserScript==

function searchAndReplace(whattoreplace,replacer){
while(document.body.innerHTML.indexOf(whattoreplace) > 0){
document.body.innerHTML = document.body.innerHTML.replace(whattoreplace, replacer);
}
}

searchAndReplace("http://licon.ngfiles.com/", "http://bbsimg.ngfiles.com/1/22664000/ngbbs4da0b97d49538.jpg?");