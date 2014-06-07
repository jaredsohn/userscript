// ==UserScript==
// @name           Un-DQN Time
// @description    Turns Endeless September timestamps in 4ch's
//                 DQN board into regular timestamps
// @author         Eksopl
// @include        http://4-ch.net/dqn/*
// @version        1.0
// ==/UserScript==

function pad(a,b){return([1e15]+a).slice(-b)}

var dateRegExp = new RegExp(/([^\d]*)(\d+)-(\d+)-(\d+)(.*)/);
var posts = document.getElementsByClassName("reply");

for(var i = 0; i < posts.length; i++) {
	var post = posts[i];
	var postDateNode = post.getElementsByTagName("h3")[0].childNodes[5];
	var dateMatches = postDateNode.nodeValue.match(dateRegExp);
	if(dateMatches[2] != '1993') continue;
	var newDate = new Date(dateMatches[2], dateMatches[3] - 1, dateMatches[4]);
	var newDateText = dateMatches[1] + newDate.getFullYear() + '-' + 
		pad(newDate.getMonth() + 1, 2) + '-' + 
		pad(newDate.getDate(), 2) + dateMatches[5];
	postDateNode.nodeValue = newDateText;
}