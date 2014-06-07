// ==UserScript==
// @name       Korean ShXt Blocker
// @namespace  http://lazybaha.tk
// @version    1.8
// @description  Auto block korean XX in Bahamut
// @match      http://forum.gamer.com.tw/B.php*
// @copyright  2013+, http://home.gamer.com.tw/document
// @updateURL  http://userscripts.org/scripts/source/157057.meta.js
// @downloadURL http://userscripts.org/scripts/source/157057.user.js
// ==/UserScript==

(function(f,h){var g={blacklist:["beatslg","god717962","Phixor2000","zxcvb5nm","david811201","wearing3828","big100","GalaxyGio","x73796481","QWESDXZVA155","missingyouqq","mark180","tinyui","r773878","X52270204","Z0982068691","boyboyboyboy","fredlin","exp29851"],objs:f.getElementsByClassName("FM-blist5"),max:f.getElementsByClassName("FM-blist5").length};function e(d){for(var c=g.blacklist.length;c--;){if(d.innerHTML.search(g.blacklist[c])!==-1){return true}}return false}function b(c){c.parentNode.style.display="none";return true}for(var a=g.max;a--;){if(e(g.objs[a])){b(g.objs[a])}}})(document,console);