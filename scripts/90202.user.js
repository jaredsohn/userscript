// ==UserScript==
// @name           Facebook: Bigger fonts for newsfeed status messages
// @namespace      http://userscripts.org/users/115601
// @description    Facebook, your new fonts for the status updates in the news feed are too damn small.
// @include        http://www.facebook.com/*
// ==/UserScript==

function biggerfacebook_execute() {

	var elements = document.getElementsByClassName('messageBody');

	for (var i=0;i<elements.length;i++)
	{
		var element = elements[i];
		element.style.fontSize = "13px";
		element.style.lineHeight = "normal";
		element.style.color = "#333333";
	}
}

biggerfacebook_execute();

document.addEventListener("DOMNodeInserted", biggerfacebook_execute, false);
