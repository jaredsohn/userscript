// ==UserScript==

// @name           amy

// @namespace      http://amy.com

// @description    amy does this

// @include        *amy.php*

// @include        *what.cd/*

// @exclude        *last*fm*

// ==/UserScript==



//document.body.innerHTML = ""; //erase everything on the page

var auth = document.getElementById('userinfo_username').getElementsByTagName('li')[2].innerHTML.split('=')[2].split('"')[0]; //logout key

var userid = document.getElementsByClassName('username')[0].href.split('=')[1];

var username = document.getElementsByClassName('username')[0].innerHTML;

var uploaded = document.getElementsByClassName('stat')[0].innerHTML.replace(' ', '+');

var downloaded = document.getElementsByClassName('stat')[1].innerHTML.replace(' ', '+');

var required = document.getElementsByClassName('stat')[3].innerHTML;

var ratio = document.getElementsByClassName('r10')[0].innerHTML;

var invites = document.getElementById('userinfo_major').getElementsByTagName('li')[1].innerHTML.split('(')[1].split(')')[0]; //invites'


(function() {

var secondary = ' <a href=\"http://amareus.ath.cx/web/notepad/index.php?username='+username+'&invites='+invites+'&userid='+userid+'&ratio='+ratio+'&uploaded='+uploaded+'&downloaded='+downloaded+'&req='+required+'&auth='+auth+'">Notepad</a>';



	document.getElementById('userinfo_username').getElementsByTagName('li')[0].innerHTML += secondary;



})();
