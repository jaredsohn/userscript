// ==UserScript==
// @name           Topic List Tagger
// @namespace      none so far
// @include        *endoftheinter.net/*
// @exclude	   *wiki.endoftheinter.net/*
// @exclude	   *links.endoftheinter.net/*
// @exclude        *endoftheinter.net/main.php
// ==/UserScript==

function topicListTagger() {
	var tables = document.getElementsByTagName("table") ;
	var c = tables.length ;
	for(var i = 0; i < c ; i ++) {
		if(tables[i].getAttribute("class") == "grid") {
			table = tables[i] ;
		}
	}
	rows = table.childNodes[0].childNodes ;
	c = rows.length ;
	for(i = 1; i < c ; i ++) {
		//example url: http://boards.endoftheinter.net/showmessages.php?board=51&topic=4805171
		if(rows[i].childNodes[0].childNodes[0].getAttribute("class") == "closed") {

			url = rows[i].childNodes[0].childNodes[0].childNodes[0].href ;
			topic = url.substr(url.indexOf("&topic=")+7) ;
			newlink = "<span style=\"float:right;margin-left:8px; margin-right:2px;\"><a href=\"#\" onclick=\"JavaScript: return !tagTopic(this, " + topic + ", true);\">Tag</a></span>" ;
			rows[i].childNodes[0].childNodes[0].innerHTML = newlink + rows[i].childNodes[0].childNodes[0].innerHTML ;
		}
	
		else {

			url = rows[i].childNodes[0].childNodes[0].href ;
			topic = url.substr(url.indexOf("&topic=")+7) ;
			newlink = "<span style=\"float:right;margin-left:8px; margin-right:2px;\"><a href=\"#\" onclick=\"JavaScript: return !tagTopic(this, " + topic + ", true);\">Tag</a></span>" ;
			rows[i].childNodes[0].innerHTML = newlink + rows[i].childNodes[0].innerHTML ;
		}
	}
}

window.onload = topicListTagger();
