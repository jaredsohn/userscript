// ==UserScript==
// @name           SG Login
// @namespace      sgLogin
// @description    Macht den Login bei Schwarzes-Glück mit der Enter-Taste möglich
// @include        http://www.schwarzes-glueck.de/start/notloggedin.php
// @include        http://www.gruftisingle.de/start/notloggedin.php
// @include        http://www.grufti-single.de/start/notloggedin.php
// @include        http://www.gothicsingle.de/start/notloggedin.php
// @include        http://www.gothic-single.de/start/notloggedin.php
// @include        http://www.schwarzes-glueck.de/start/notloggedin.php
// @include        http://www.schwarzesglueck.de/start/notloggedin.php
// @include        http://www.schwarzesglueck.de/start/notloggedin.php
		  
// @include        http://www.schwarzes-glueck.de/start/loginfailed.php*
// @include        http://www.gruftisingle.de/start/loginfailed.php*
// @include        http://www.grufti-single.de/start/loginfailed.php*
// @include        http://www.gothicsingle.de/start/loginfailed.php*
// @include        http://www.gothic-single.de/start/loginfailed.php*
// @include        http://www.schwarzes-glueck.de/start/loginfailed.php*
// @include        http://www.schwarzesglueck.de/start/loginfailed.php*
// @include        http://www.schwarzesglueck.de/start/loginfailed.php*

// @grant          none
// ==/UserScript==

var input = document.createElement("input");
input.type = 'submit';

input.style.background = 'none';
input.style.border = '0 none';
input.style.outline = '0 none';
input.style.height = '0px';
input.style.width = '0px';
var form = document.getElementById("loginform");
form.appendChild(input);