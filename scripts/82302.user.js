// ==UserScript==
// @name           ACC Treasure Hunting Bot
// @namespace      MarkMan641
// @description    Searches for treasure on animalcrossingcommunity.com and if found it alerts you.
// @include        http://www.animalcrossingcommunity.com*
// @include        http://www.animalcrossingcommunity.com/*
// @include        http://www.animal*
// @include        http://www.animalcrossingcommunity.com/boards*
// ==/UserScript==



function yourfunction() {
if(document.body.innerHTML.indexOf('http://ads.animalcrossingcommunity.com/treasure')!=-1){
alert('TREASURE FOUND!');
}
}
window.setTimeout(yourfunction, 1500);  // Change the "2500" milliseconds to change wait time.