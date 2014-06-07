// ==UserScript==
// @name           Facebook_Nachrichten_Sicherheit
// @namespace      titaniumsenator
// @description    Dieses Script stoppt den unautorisierten Zugang zu den Facebook Nachrichten.
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function(){
	var url = document.location.href;
	//alert(url);
	if(url == "http://www.facebook.com/attachments/messaging_upload.php?id=MessagingInlineComposer"){
		auth();
	}
	if(url.search("&path=%2Fmessages%2F&sk=inbox&key=inbox") >= 0){
		auth();
	}
});

$("body").click(function(){
	//alert($(this).attr("href"));
	//console.log("browser hack);
});


function auth(){
	if(prompt("Zur Bestätigung Ihrer Identität Ihr Nachrichten-Kennwort eingeben:") != "Platz für Ihr Kennwort"){
		window.parent.location = "http://www.google.de"
	}
}
