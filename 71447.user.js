// ==UserScript==
// @name           What.CD Posts history link
// @namespace      http://www.google.com
// @description    Insert link for your posts into the main menu
// @include        http://what.cd*
// @include        https://ssl.what.cd*
// ==/UserScript==

var userID = document.getElementsByClassName('username')[0].href.split('=')[1];
var target = document.getElementById('userinfo_minor').getElementsByTagName('li')[4];

target.innerHTML += ' / <a href="/userhistory.php?action=posts&userid=' + userID + '&showunread=0&group=1\">Posts</a>';