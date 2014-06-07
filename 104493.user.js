// ==UserScript==
// @name           Netflix Redesigned
// @namespace      http://userscripts.org/users/Fantikerz
// @description    Design modifications for the Netflix watch instantly design implemented on June 8, 2011.
// @include        http://movies.netflix.com/Wi*
// @exclude        http://movies.netflix.com/WiMovie*
// @exclude        http://movies.netflix.com/WiRoleDisplay*
// @exclude        http://movies.netflix.com/WiSearch*
// ==/UserScript==

var head, style;
head = document.getElementsByTagName("head")[0];

style = document.createElement("style");
style.type = "text/css";
//style.innerHTML = "@import 'http://fantikerz.com/netflix/compress.php?l=css&f=netflix.css';";
style.innerHTML = "@import 'http://fantikerz.com/netflix/netflix.css';";
head.appendChild(style);