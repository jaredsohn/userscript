// ==UserScript==
// @name           Cheggit Fix snakeyes127
// @namespace      http://userscripts.org/users/4294
// @description    Gets rid of snakeyes127's link colorization
// @include        http://cheggit.net/torrents.php?*
// ==/UserScript==

var userstyle = document.getElementById("content_frame").getElementsByTagName("style")[0];
userstyle.innerHTML = userstyle.innerHTML.replace(/\ba:link/gm,"a:link-snakeyes127");
userstyle.innerHTML = userstyle.innerHTML.replace(/\ba:visited/gm,"a:visited-snakeyes127");
