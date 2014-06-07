// ==UserScript==

// @name           What.CD My threads Link

// @namespace      http://userscripts.org

// @description    Insert link for my threads into main menu

// @include        http*://*what.cd*

// ==/UserScript==


var username = document.getElementsByClassName('username')[0].innerHTML;

var target = document.getElementById('userinfo_minor').getElementsByTagName('li');



target[4].innerHTML += ' / <a href=\"/forums.php?action=search&search=&type=title&user='+username+'\">My threads</a>';