// ==UserScript==
// @name           Anti-Shkolota on RuBukkit.org
// @namespace      http://userscripts.org/scripts/show/156481
// @description    Schoolboy detector.
// @version        0.5.2
// @icon           http://lurkmore.so/images/thumb/9/9f/Md.jpg/64px-Md.jpg
// @include        /http(s)?://(www.)?rubukkit.org/
// @exclude        /http(s)?://(www.)?rubukkit.org/help/smilies
// ==/UserScript==

var ololo = document.getElementById("messageList").innerHTML;

var Shkolota = "<div style=\"color:darkred;text-decoration:blink;\"> Я ШКОЛОТА </div>";

ololo = ololo.replace(/<img.*src=".*bm.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*trollface.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*cap.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*creeper.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*facepalm.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*fuuuu.*>/, Shkolota);
ololo = ololo.replace(/<img.*src=".*why.*>/, Shkolota);

document.getElementById("messageList").innerHTML = ololo;