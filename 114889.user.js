// ==UserScript==
// @name           Remove personal box
// @namespace      http://userscripts.org
// @description    Remove personal box
// @include        http://what.cd/user.php?id=*
// @include        https://ssl.what.cd/user.php?id=*
// ==/UserScript==

var stats = document.getElementsByClassName('stats'),
    rank = stats[2].getElementsByTagName('li')[0];
stats[0].appendChild(rank);