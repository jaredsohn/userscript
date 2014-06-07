// ==UserScript==
// @name           Jappy-Haustier im Menü
// @namespace      All
// @description    Fügt ein Haustier hinzu
// @include        http://www.jappy.*/*
// ==/UserScript==
GM_registerMenuCommand("Haustier hinzufügen",addpet);
setmenu()

function setmenu() {
var div=document.getElementById("mx")
var username=document.evaluate("/html/body/div/div/div/div[3]/div/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
var html="<a href='/user/"+username+"/pet/"+GM_getValue("pet")+"'><span>Mein Haustier</span></a>"
div.innerHTML+=html}


function addpet() {
petnummer=prompt("Gebe hier die Nummer des Haustieres ein", "");
if(petnummer!="" && petnummer!=null) {
GM_setValue("pet",petnummer)
alert("Das Tier wurde hinzugefügt")
} else {
alert("Du hast keine Nummer eingegeben")}
}