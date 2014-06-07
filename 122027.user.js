// ==UserScript==
// @name           Tumblr Hide T/ME Overlay
// @namespace      http://sidebr.tumblr.com/
// @description    Hides the Tumblr/Missing E warning
// @include        http://www.tumblr.com/dashboard*
// ==/UserScript==

function setCookieME(cookieName, val)
{
	var today = new Date();
	today.setTime(today.getTime());
	var expires = new Date(today.getTime() + 157680000000 );
	
	document.cookie = cookieName + " = " + val +
		";expires=" + (expires.toGMTString()) +
		";path=/" +
		";domain=tumblr.com";
}

function removeMEOverlay()
{
	if($('overlay').hide())
    {
		$('detection_alert').hide();
		setCookieME('__utmf', '0');
		window.location.reload();
	}
}

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

embedElement("script", setCookieME, false);
embedElement("script", removeMEOverlay, true);