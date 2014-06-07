// ==UserScript==
// Am besten als erstes Script einbinden, damit sofort umgeleitet wird
// bevor die anderen Scripte ausgeführt werden
// @name           StudiVZ-Anti-ooooooooooops
// @include        https://*.studivz.net/*
// @include        http://*.studivz.net/*
// @exclude        http://*.studivz.net/Chat
// @exclude        http://www.studivz.net/Friends/Friends/*
// ==/UserScript==

var parts = document.location.href.split("//");
if(parts[0] != "https:" && parts[1].indexOf("im.studivz") == -1)	
	changeToHttps();

document.getElementById("Chat_Online_Link").href="http://www.studivz.net/Chat";



/*functions*/
function changeToHttps()
{
	var link = document.location.href;
	link = str_replace("http://im.studivz.net","https://im.studivz.net",link);
	link = str_replace("http://studivz.net","https://studivz.net",link);
	link = str_replace("http://www.studivz.net","https://www.studivz.net",link);
	document.location.href=link;
}


function str_replace(search, replace, subject)
{
    return subject.split(search).join(replace);
}