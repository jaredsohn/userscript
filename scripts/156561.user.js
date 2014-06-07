// ==UserScript==
// @name springer enteignen
// @author mihau
// @version 1.0
// @include http*://*.welt.de/*
// @include http*://welt.de/*
// ==/UserScript==

function weltde() {

remove("bigp-overlay-wall");
remove("bigp-overlay-iframe");


/*

if((document.getElementById("bigp-overlay-wall")) {
  document.getElementById("bigp-overlay-wall").innerHTML = "";
  }

if((document.getElementById("bigp-overlay-iframe")) {
  document.getElementById("bigp-overlay-iframe").innerHTML = "";
  }

*/

document.getElementsByTagName("html")[0].className = document.getElementsByTagName("html")[0].className.replace ( /(?:^|\s)has-bigp-overlay-wall has-bigp-overlay(?!\S)/g , '' )

}

function remove(id)
{
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

document.addEventListener("DOMContentLoaded", weltde, false);
