// ==UserScript==
// @name           wakimin
// @description    wakimin
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author         wakimin
// ==/UserScript==

var signature = "[center][font="Century Gothic"]
[color="#FF0000"]Dia Lahir Karena Keberuntungan...
Tapi Aku Beruntung Karena Dilahirkan...[/color][/font]


[img]http://www.joe-ks.com/archives_may2004/WalkingMan.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)





