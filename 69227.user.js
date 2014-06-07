// ==UserScript==
// @name            Online Link bei Freunden
// @namespace       http://www.brainhacker.de
// @description     Fügt einen "Online"-Link neben "Meine Freunde" im Menü ein.
// @author          Lukas Heblik
// @date            2010-2-17
// @include         http://www.schuelervz.net*
// @include         http://schuelervz.net*
// @include         https://www.schuelervz.net*
// @include         https://schuelervz.net*
// @include         https://secure.schuelervz.net*
// @include         http://www.studivz.net*
// @include         http://studivz.net*
// @include         https://www.studivz.net*
// @include         https://studivz.net*
// @include         https://secure.studivz.net*
// @include         http://www.meinvz.net*
// @include         http://meinvz.net*
// @include         https://www.meinvz.net*
// @include         https://meinvz.net*
// @include         https://secure.meinvz.net*
// ==/UserScript== 
 
// Copyright by Lukas Heblik 
// http://www.brainhacker.de
 
//Finds the VZ-Network
if (location.href.indexOf("studivz.net") > -1) {
  var NETWORK = "studivz";
} else if (location.href.indexOf("meinvz.net") > -1) {
  var NETWORK = "meinvz";
} else if (location.href.indexOf("schuelervz.net") > -1) {
  var NETWORK = "schuelervz";
}
var SERVER = "http://www." + NETWORK + ".net/";
var USERIDS = document.getElementById("Grid-Navigation-Main").getElementsByTagName("li")[1].getElementsByTagName("a")[0].getAttribute("href").match(/Profile\/([-\w]+)/i)[1];

//Aborts if no menu is there
if (document.URL == SERVER + "Login" || document.URL.indexOf("Logout")!=-1 || document.URL == SERVER + "Default" || document.URL == SERVER) {
	return;
}
var ul = document.getElementById("Grid-Navigation-Main");
if(!ul) {
	return;
}

//Function for displaying Online-Link
function addOnlineLink () {
	ul.getElementsByTagName("li")[2].setAttribute("class", "clearFix");
	var a = document.createElement("a");
	a.href = SERVER + "Friends/Friends/" + USERIDS + "/online/1";
	a.appendChild(document.createTextNode(" online "));
	a.setAttribute("class", "right");
	a.setAttribute("title", "online Freunde");
	var a2 = ul.getElementsByTagName("li")[2].getElementsByTagName("a")[0];
	a2.setAttribute("class", "left");
	var li = ul.getElementsByTagName("li")[2];
	li.appendChild(a);
}
addOnlineLink();