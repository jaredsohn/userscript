// ==UserScript==
// @name           redpseudo
// @namespace      redpseudo
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function RedInMessages() {

	var divMessages = document.getElementsByTagName('div');

	for (var i = 0; divMessages[i]; i++)
	{
		if (divMessages[i].className == 'msg msg1' || divMessages[i].className == 'msg msg2')
		{
			divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<strong>Fire-roox<\/strong>/, '<strong class="moderateur">Fire-roox<\/strong>');
		}
	}
}

function RedInTopics() {

	var trTopics = document.getElementsByTagName('tr');

	for (var i = 0; trTopics[i]; i++)
	{
		if (trTopics[i].className == 'tr1' || trTopics[i].className == 'tr2')
		{
			trTopics[i].innerHTML = trTopics[i].innerHTML.replace(/<td class="pseudo">Fire-roox<\/td>/, '<td class="pseudo topic_mod">Fire-roox<\/td>');
		}
	}
}

function ini() {

	var url = window.location.href;
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/0-/)) RedInTopics();
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/1-/)) RedInMessages();
	if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/3-/)) RedInMessages();
}

ini();