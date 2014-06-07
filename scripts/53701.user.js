// ==UserScript==
// @name           Koc Cookie
// @namespace      http://*kingsofchaos.com/*
// @description    Displays Cookie
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// ==/UserScript==

//Deleting textad

// Author: Shane Mackenzie


var placed = false;
var str = "error";
var params = '';
var turing = '';

var _ver = 0.011;

var c = document.cookie;
c = c.split("; koc_session=");
var cookie = c[1];

(function(){

var CurrentURL = document.URL
TehURL = CurrentURL.split(".com/");
TehURL = TehURL[1].split(".php");

if (TehURL[0] == "base") {
document.body.innerHTML = document.body.innerHTML + '<br><br>' + document.cookie;
}



})();
