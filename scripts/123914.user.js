// ==UserScript==
// @name           Fixed Riot Redirect Skipper
// @namespace      http://userscripts.org/users/432270
// @include        http://na.leagueoflegends.com/board/redirect.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');

window.location.href = links[2].getAttribute('href');



