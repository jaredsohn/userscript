// ==UserScript==
// @name           MyNEU retry on server failure
// @namespace      tag:brainonfire.net,2010-11-04:myneu-server-failure
// @description    When you try to go to MyNEU and see the server failure screen, add a big ol' focused link to try again. (Just hit enter.)
// @include        http://myneu.neu.edu/jsp/misc/serverFailure.jsp
// @license        GPL
// @version        1.0
// ==/UserScript==

var header = document.getElementById('section_head_txt');
header.innerHTML += ' - <a href="http://myneu.neu.edu/" id="retry">Retry home page</a>';
document.getElementById('retry').focus();
