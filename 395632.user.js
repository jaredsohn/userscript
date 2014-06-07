// ==UserScript==
// @name           Grepolis farmalert
// @namespace      Grepolis farmalert
// @include        *.grepolis.com/game*
// ==/UserScript==

setInterval(function(){ 
if (!$("span").hasClass("res_available not")) {    
var audio = new Audio('http://k007.kiwi6.com/hotlink/h3k26wrd0v/zelda.MP3');
audio.play();
};
}, 15000);