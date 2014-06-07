// ==UserScript==
// @name           FreshOut
// @namespace      FreshOut
// @description    Удаляет все товары FreshOut со страницы
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
// ==/UserScript==

var element = document.getElementsByTagName("div");

for (var a = 0; a < element.length; a++) {

var status = element[a].getAttribute("class");   

if(status == "productFrame pfs freshout"){element[a].style.display = "none";}

}