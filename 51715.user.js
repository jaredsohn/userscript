// ==UserScript==
// @name           Green Fark
// @namespace      Fark.com
// @include        *fark.com*
// ==/UserScript==

(function ()
{

document.body.style.background = '#6f953b';
document.getElementById("mainLogo").src = "http://i584.photobucket.com/albums/ss284/GreenFark/farkLogo2.gif";
document.getElementById("headerTop").style.backgroundImage = "url(http://i584.photobucket.com/albums/ss284/GreenFark/bgHeaderMainGradient.gif)";
document.getElementById("topMenu").style.background = '#406113';
document.getElementById("footer").style.background = '#406113';
document.getElementById("commentsHeader").style.background = '#406113';
document.getElementById("commentsPostingArea").style.background = '#406113';

var e = document.getElementsByClassName("rightLMItems");
for(var i=0;i<e.length;i++){e[i].style.background = '#406113';}

var e = document.getElementsByClassName("ctable");
for(var i=0;i<e.length;i++){e[i].style.background = '#A3CA6E';}

var e = document.getElementsByClassName("ctableTF");
for(var i=0;i<e.length;i++){e[i].style.background = '#A3CA6E';}

var e = document.getElementsByClassName("tbcj");
for(var i=0;i<e.length;i++){e[i].style.background = '#406113';}

var e = document.getElementsByClassName("commentsHeaderTable");
for(var i=0;i<e.length;i++){e[i].style.background = '#AECA87';}

var e = document.getElementsByClassName("commentPostingTable");
for(var i=0;i<e.length;i++){e[i].style.background = '#AECA87';}

var e = document.getElementsByClassName("cpbox");
for(var i=0;i<e.length;i++){e[i].style.background = '#AECA87';}

})();