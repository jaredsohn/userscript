// ==UserScript==
// @name           Ogame.it Uni Selector
// @namespace      okon3
// @description    A little script to automatically select the Universe on Ogame.it
// @version	0.01
// @include        http://*ogame.it
// ==/UserScript==

function showLogin(){
  var login = document.getElementById('login');
  login.style.display = 'block';
}

function selectUniverse(universe){
  var uni = document.getElementById('serverLogin');
  uni.selectedIndex = universe;
}

showLogin();
selectUniverse(11);