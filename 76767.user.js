// StackOverflow.com OpenID validation fix
// version 1.0
// 2010-05-14
// Copyright (c) 2010, Team 23
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          StackOverflow.com OpenID validation fix 
// @namespace     http://stackoverflow.com/users/login
// @description   Removes full URL validation of OpenID login field in Google Chrome
// @include       http://stackoverflow.com/users/login*
// @include       http://stackoverflow.com/users/authenticate*
// @include       http://serverfault.com/users/login*
// @include       http://serverfault.com/users/authenticate*
// @include       http://superuser.com/users/login*
// @include       http://superuser.com/users/authenticate*
// @include       http://meta.stackoverflow.com/users/login*
// @include       http://meta.stackoverflow.com/users/authenticate*
// ==/UserScript==

function main ()
{
  $("#openid_identifier").clone(true).attr("type", "text").replaceAll("#openid_identifier");  
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);