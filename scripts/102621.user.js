// ==UserScript==
// @name           Pardus GNN mute
// @namespace      pardus.at
// @description    Hides GNN news entries for specified user
// @include        http://*.pardus.at/news.php*
// @version        0.2
// @author         John Wu
// ==/UserScript==

var pattr1 = /Biks/;
var i = 6;
var news = document.getElementsByTagName('tr');
var news_count = news.length;
while(i < news_count){
        var line = news[i];
		if (line.innerHTML.match(pattr1)) {
		  news[i].style.display = 'none';
		}
	i++;	
	}