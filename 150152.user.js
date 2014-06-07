// ==UserScript==
// @name         Disable Facebook Emoticons
// @version      1.9.1
// @author       Damanique Montana
// @e-mail       damanique@gmail.com
// @description  Remove the emoticons from Facebook and restore the text-only ones.
// @include      http*://www.facebook.com/*
// ==/UserScript==

function removeEmoticons()
{
	var emoticonElements = document.querySelectorAll(".emoticon");
	var textElements = document.querySelectorAll(".emoticon_text");
	var customElements = document.querySelectorAll(".emoticon_custom");
	
	for (i = 0; i < emoticonElements.length; i++)
	{
		emoticonElements[i].style.display = "none";	
                emoticonElements[i].setAttribute("class", "emoticon_go_away");
	}
	
	for (j = 0; j < textElements.length; j++)
	{
                 textElements[j].removeAttribute("aria-hidden");
                 textElements[j].setAttribute("class", "emoticon_text_visible");	
                 textElements[j].style.display = "inline";	        
	}
	
	for (k = 0; k < customElements.length; k++)
	{
		customElements[k].style.display = "none";
                customElements[k].setAttribute("class", "emoticon_go_away");
	}
}

window.onload = function() {
	removeEmoticons();	
}

document.addEventListener('DOMNodeInserted', removeEmoticons, true);