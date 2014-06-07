// ==UserScript== 
// @name           9for11 Enhancements 
// @namespace      http://TakatoCSS.co.cc 
// @description    Enhancements for 9for11
// @include        http://www.gamefaqs.com/* 
// @include        http://gamefaqs.com/* 
// ==/UserScript== 
 
// Must be used in conjunction with the Nine For Eleven (9for11) CSS. 
// http://www.takatocss.co.cc/9for11.html
 
// Build number 2009-10-09-14-56
 
var tmpWrap = document.getElementById("board_wrap"); 
var tmpA = tmpWrap.getElementsByClassName("head")[0].innerHTML; 
var tmpB = tmpWrap.getElementsByClassName("board_nav")[0].innerHTML; 
tmpWrap.getElementsByClassName("board_nav")[0].innerHTML= tmpA; 
tmpWrap.getElementsByClassName("head")[0].innerHTML= tmpB; 
 
 
var tmp1 = tmpWrap.getElementsByClassName("head")[0].getAttribute('class'); 
var tmp2 = tmpWrap.getElementsByClassName("board_nav")[0].getAttribute('class'); 
var tmp3 = "lolrofl"; 
tmpWrap.getElementsByClassName("head")[0].setAttribute('class', tmp3); 
tmpWrap.getElementsByClassName("board_nav")[0].setAttribute('class', tmp1); 
tmpWrap.getElementsByClassName("lolrofl")[0].setAttribute('class', tmp2);
