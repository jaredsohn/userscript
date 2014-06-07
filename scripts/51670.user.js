// ==UserScript==
// @name           rapidshare:neu
// @namespace      jaja
// @description    wos woas i
// @include        http://rapidshare.com/files/*
// ==/UserScript==

/*
document.getElementsByClassName('hauptmenue')[0].innerHTML = "";
document.getElementsByTagName('form')[0].innerHTML = "";
document.getElementsByTagName('form')[1].innerHTML = "";
document.getElementsByTagName('p')[1].innerHTML = "";
document.getElementsByTagName('h1')[0].innerHTML = "";
document.getElementsByClassName('downloadlink')[0].getElementsByTagName('font')[0].innerHTML = "";
document.getElementsByClassName('untermenue')[0].innerHTML = "";
document.getElementsByClassName('klappbox')[0].getElementsByTagName('center')[0].innerHTML = "";
document.getElementsByClassName('klappbox')[0].getElementsByTagName('center')[1].innerHTML = "";
document.getElementsByClassName('downloadlink')[0].style.fontSize = "30pt";

*/

document.getElementsByClassName('downloadlink')[0].getElementsByTagName('font')[0].innerHTML = "";
var link = document.getElementsByClassName('downloadlink')[0].textContent;

while ( document.childNodes.length >= 1 )
{
document.removeChild(document.firstChild );
} 

window.location.href = "http://stevo.saxn.at/rapidsharelinks/newlink.php?rslink="+link+"&close=yes";
