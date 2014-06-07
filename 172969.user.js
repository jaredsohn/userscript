// ==UserScript==
// @name           Fixed Riot Redirect Skipper
// @namespace      http://userscripts.org/users/524081
// @include        http://forums.oce.leagueoflegends.com/board//redirect.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');

window.location.href = links[2].getAttribute('href');

