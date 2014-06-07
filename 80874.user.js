// ==UserScript==
// @name           Prize_Redirect
// @namespace      Prize_Redirect
// @description    Убирает страницу информации о товаре
// @author         http://lockerztalk.ru/member4128.html , добавьте репы, если понравилось!
// @copyright      s12307, 2010
// @version        1.1
// @include        http://www.k0st4s.org/*
// @include        http://www.lockerz.com/redeem*
// @include        http://ptzplace.lockerz.com/*
// @include        http://lockerztalkform.0fees.net/redeem.php
// @include        http://premium.retkinia.net/*
// @include        http://overheat.cn/*
// @include        http://ptzplace.lockerzclub.info/*
// @include        http://www.ptzplace.lockerzclub.info/*
// @include        http://lockerz.miguelmeza.net/*
// @include        http://nocaptcha.odnaklassniks.ru/*
// @include        http://ptzplace.odnaklassniks.ru/*
// @include        http://lockerztalk.lv/ptzplace/*
// @include        http://www.redeemquick.com/*
// @include        http://www.lockerztest.com/*
// @include        http://sev7en.us/ptzplace/*
// @include        http://www.sev7en.us/ptzplace/*
// @include        http://ptzplace.lockierz.com/*
// @include        http://www.lockerz-forum.eu/symulator/*
// @include        http://lockerz.miguelmeza.net/SimuladorLockerz/*
// ==/UserScript==

var elements=document.getElementsByTagName("a");
var inputs=document.getElementsByTagName("input");

for (i=0; i<elements.length; i++){

if (elements[i].className=="btnRedeem" && elements[i].href!=(window.location + "#") && inputs.length<=0){
window.location.href=elements[i].href;
}}