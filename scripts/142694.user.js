// ==UserScript==
// @name        Hotmail SavePass
// @namespace   http://bo33b.dyndns.org
// @description Edit this script to put your Hotmail username & password in for you
// @version     1.2
// @grant       none
// @include     https://login.live.com/*
// ==/UserScript==

var q = 'your.live@email.here';
var p = 'your password here';

function hotmail() {
 document.getElementById('idDiv_PWD_UsernameExample').parentNode.style.display='none';
 document.getElementById('idDiv_PWD_PasswordExample').parentNode.style.display='none';
 document.getElementById('idDiv_PWD_UsernameExample').parentNode.parentNode.firstChild.value=q;
 document.getElementById('idDiv_PWD_PasswordExample').parentNode.parentNode.firstChild.value=p;
 document.getElementById('idDiv_PWD_PasswordExample').parentNode.parentNode.firstChild.setAttribute('autocomplete', 'on');
}

setTimeout(function(){hotmail()},500);
