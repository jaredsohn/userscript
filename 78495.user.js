// ==UserScript==
// @name           Parallelplanet.de Open New Threads
// @namespace      http://userscripts.org/users/129044
// @include        http://www.parallelplanet.de/search.php?search_id=newposts
// ==/UserScript==
//
// Forums 48,52,53,54,55 are blocked!
//

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; i++) if (links[i].href.match(/viewtopic\.php(.*)&view=unread/)) if (!links[i].href.match(/viewtopic\.php(.*)?f=(48|52|53|54|55)/)) window.open(links[i].href);