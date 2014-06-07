// ==UserScript==
// @name           Edit Journal
// @namespace      http://solitude12.deviantart.com/
// @description    Allows you to go to the edit journal page, from a journal!
// @include        http://*.deviantart.com/journal/*/*
// @exclude        http://my.deviantart.com/journal/*
// @exclude        http://*.deviantart.com/journal/forum/*
// @exclude        http://*.deviantart.com/journal/poll/*
// ==/UserScript==
with(unsafeWindow) {
	var deviantNAME = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();
	var journalID = window.location.toString();
	journalID = journalID.split('/');
	journalID = journalID[4];
	if (deviantART.pageData.user.username.toLowerCase() == deviantNAME){
	document.getElementById('comments').innerHTML = document.getElementById('comments').innerHTML.replace(/<h2 class=\"c\">Devious Comments/, '<div align="right"><a href="http://my.deviantart.com/journal/edit/'+journalID+'?"><u>Edit This Journal</u></a></div><br/><h2 class="c">Devious Comments');
	}
}