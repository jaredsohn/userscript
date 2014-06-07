// ==UserScript==
// @name Fix the fucking colors on /b/
// @description FIX THEM
// @match http://boards.4chan.org/b*
// @include http*://boards.4chan.org/b*
// @require http://userscripts.org/scripts/source/52251.user.js
// @version 0.4.4
// @run-at document-start
// ==/UserScript==

links = document.getElementsByTagName('head')[0].getElementsByTagName("link");
realCSS = new Array("http://static.4chan.org/image/favicon.ico","http://static.4chan.org/css/yotsuba.9.css","http://static.4chan.org/css/yotsublue.9.css","http://static.4chan.org/css/futaba.9.css","http://static.4chan.org/css/burichan.9.css");
for(var i = 0; i < links.length; i++)
 {links[i].setAttribute("href",realCSS[i]);}

document.getElementsByTagName('span')[4].innerHTML = "/b/ - Random"


fucker = document.getElementsByTagName('embed')[0]
fucker.parentNode.removeChild(fucker)