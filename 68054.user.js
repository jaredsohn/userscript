// ==UserScript==
// @name          Facepalm
// @namespace     http://twitter.com/jcansdale
// @description	  Make fb://profile/ID links (created by the Facebook mobile app) clickable in Google Contacts/GMail. 
// @include       http://www.google.com/contacts/ui/*
// @include       https://www.google.com/contacts/ui/*
// @include       http://mail.google.com/mail/contacts/ui/*
// @include       https://mail.google.com/mail/contacts/ui/*
// ==/UserScript==
var cp = document.getElementById("contact-pane");
if(cp)
{
	cp.addEventListener('DOMNodeInserted',
	function(event)
	{
		event.target.innerHTML = event.target.innerHTML.replace(
			/(fb[:][/][/]profile[/]([0-9]+))<\/span>[\s]*<span [^>]*>&nbsp;-&nbsp;<\/span>/,
			"<a class='cmgr-link' target='blank' href='http://facebook.com/profile.php?id=$2&v=info'>$1</a></span clas><span class='dim'>&nbsp;-&nbsp;Facebook</span>")
	},
	false);
}	
