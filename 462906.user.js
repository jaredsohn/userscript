// ==UserScript==
// @name        Baixaki sem instalador
// @namespace   http://userscripts.org/users/648223
// @include     http://www.baixaki.com.br/download/*
// @include     http://www.baixaki.com.br/site/*?link=*
// @updateURL   http://userscripts.org/scripts/source/462906.meta.js
// @downloadURL http://userscripts.org/scripts/source/462906.user.js
// @version     0.1.2
// @description Remove o instalador do Baixaki.
// @grant       none
// ==/UserScript==

var page = window.location.pathname.split('/')[1];

if (page == "download"){
  var link = document.querySelector(".dwl-bt-container").getElementsByTagName("a")[0];
  var link2 = document.querySelector(".dwl-bt-container").getElementsByTagName("a")[1];
  var link3 = document.querySelectorAll(".dwl-bt-container")[1].getElementsByTagName("a")[0];
  var link4 = document.querySelectorAll(".dwl-bt-container")[1].getElementsByTagName("a")[1];
  if(link2.getAttribute("class") == "seminstalador"){
     link.setAttribute('onclick', link2.getAttribute("onclick"));
     link3.setAttribute('onclick', link2.getAttribute("onclick"));
     link.getElementsByTagName('span')[1].textContent = 'sem instalador Baixaki';
     link3.getElementsByTagName('span')[1].textContent = 'sem instalador Baixaki';
     link2.parentNode.removeChild(link2);
     link4.parentNode.removeChild(link4);
     var dlink = link2.getAttribute('onclick').toString().split("'")[1].toString().split("").reverse().join("");
     var dlink2 = link2.getAttribute("href")+"?link="+dlink;
     link.setAttribute('href', dlink2);
     link3.setAttribute('href', dlink2);
  }
} else if (page == "site"){
    var dlink = window.location.href.split('link=')[1];
    document.querySelector(".dwl-bits").getElementsByTagName("a")[0].setAttribute('href', dlink);
    document.querySelector(".dwl-bits").getElementsByTagName("a")[1].setAttribute('href', dlink);
}