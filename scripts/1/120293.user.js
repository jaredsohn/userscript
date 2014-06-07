// ==UserScript==
// @name          Linkify for Opera
// @version       1.02
// @include       *
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function() {
	if(!(document.documentElement instanceof HTMLHtmlElement)) return;
	var urlRegex = /\b(?:(?:(h.{2}ps?):\/\/)|(www)|(url\("?))[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!]/i;
	/*var urlRegex = /\b(?:(?:(h.{2}ps?):\/\/)|(www)|(url\("?))(?:\S+?)(?=\W*(?:\s|$))/i; */

	var	foundText, matchedText, matchedHref, newLinkElement = document.createElement('a');
	newLinkElement.setAttribute('class','linkified');

	var excElems = ['head','applet','object','embed','param','script','style','frameset','frame','iframe','textarea','input','option','select','a','img','map'],
			textNodes = document.selectNodes('//*[not(ancestor-or-self::*[local-name()="'+excElems.join('" or local-name()="')+'"])]/text()');
	for( var i = 0, textNode, disp; textNode = textNodes[i]; i++ ) {
		while( foundText = urlRegex.exec(textNode.data) ) {
			matchedText = foundText[0];

			if( foundText[1] ) { matchedHref = matchedText.replace(/^h.{2}p/i,'http'); }
			else if( foundText[2] ) { matchedHref = 'http://'+matchedText; }
			else {
				if( foundText[3] ) {
					var len = foundText[3].length;
					matchedText = matchedText.slice(len);
					foundText.index += len;
				}
				matchedHref = matchedText;
			}

			textNode = textNode.splitText(foundText.index);
			textNode.deleteData(0,((newLinkElement = newLinkElement.cloneNode(false)).text = matchedText).length);
			newLinkElement.setAttribute('href',matchedHref);
			textNode.parentNode.insertBefore(newLinkElement,textNode);
		}
	}
},false);
