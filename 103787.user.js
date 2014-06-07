// ==UserScript==
// @name           Google Chat Improvements
// @author         Kite Mikami
// @namespace      http://userscripts.org/users/339684
// @description    Allows the user to embed images and soundbytes into Google Chat
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var el = document.createElement("div");
var nos = false; var noi = false;
el.setAttribute("style","display:none;"); el.setAttribute("id","sound");
var p = document.getElementById("mainElement");
document.documentElement.appendChild(el);
document.documentElement.addEventListener("DOMNodeInserted",rageFace,false);

function rageFace()
{
var x = 0; var y = 0; var z = ""; var a = "";
var e = document.getElementsByClassName('kl');
for(var i = 0; i < e.length; i++)
{
if(e[i].innerHTML.indexOf("{togglesound}") != -1) {
e[i].innerHTML = e[i].innerHTML.replace("{togglesound}",""); nos = !nos;}
if(e[i].innerHTML.indexOf("{toggleimage}") != -1) {
e[i].innerHTML = e[i].innerHTML.replace("{toggleimage}",""); noi = !noi; console.log("d");}
x = e[i].innerHTML.indexOf("&lt;");
y = e[i].innerHTML.indexOf("&gt;");
b = e[i].innerHTML.indexOf("[");
c = e[i].innerHTML.indexOf("]");
if(x != -1 && y != -1 && noi == false) {
z = e[i].innerHTML.substring(x+4,y);
a = "http://twoson.org/i/" + z + ".png";
e[i].innerHTML = e[i].innerHTML.replace("&lt;" + z + "&gt;","<img src=\"" + a + "\"></img>");
}
if(b != -1 && c != -1 && nos == false) {
z = e[i].innerHTML.substring(b+1,c);
a = "http://twoson.org/f/" + z + ".mp3";
e[i].innerHTML = e[i].innerHTML.replace("[" + z + "]","");
ez = document.createElement("embed");
ez.setAttribute("src",a); ez.setAttribute("hidden","true");
ez.setAttribute("autostart","true"); ez.setAttribute("loop","false");
ez.setAttribute("style","visibility:hidden; display:inline;");
document.documentElement.appendChild(ez);
}
}
}