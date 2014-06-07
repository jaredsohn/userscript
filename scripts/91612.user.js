// ==UserScript==
// @name	New Pardus Smiles 
// @namespace	Accessing new Smiles 
// @description This adds new smiles 
// @include	*.chat.pardus.at/chattext.php?channel=ally&amp;uni=Orion
// @include	*.pardus.at/game.php
// @include	*.*.*/*
// @version	1.0test
// ==/UserScript==

	var originalDecodeString = window.decodeString;
	window.decodeString = function(str){
		str = str.replace(/(?!")(\bhttp:\/\/[\w%&=?#.+/;]*\b)(?=\s)/g, '<a href="$1" target="_blank">$1</a>');
		str = str.replace(/:bbt:/g, "<img src='http://unique.hobby-site.com/Facepalm.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:gripe:/g, "<img src='http://unique.hobby-site.com/Gripe.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:rant:/g, "<img src='http://unique.hobby-site.com/Rant.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:wall:/g, "<img src='http://unique.hobby-site.com/Wall.gif' style='vertical-align:middle' alt=''>");
		str = str.replace(/:welt:/g, "<img src='http://unique.hobby-site.com/Welt.jpg' style='vertical-align:middle' alt=''>");
		str = str.replace(/\bFHA\b/g, "<img src='http://unique.hobby-site.com/FHA-Smiley.png' style='vertical-align:middle' alt='FHA'>");
		str = str.replace(/\bIG\b/g, "<img src='http://unique.hobby-site.com/IG-Smiley.png' style='vertical-align:middle' alt='IG'>");
		str = str.replace(/\bTCP\b/g, "<img src='http://unique.hobby-site.com/TCP-Smiley.png' style='vertical-align:middle' alt='TCP'>");
		str = str.replace(/(FSCv\d\.\d\|([\w ]*)(\|\d*)+)/,'<a href="http://pardus.rukh.de/pshipcalc.htm?$1" target="_blank">FSC $2</a>');
		return originalDecodeString(str);
	};





function decodeEmoticons() {
    text = chat.innerHTML;
    text = decodeString(text);
    chat.innerHTML = text;
    window.setTimeout(scrollToBottom, 50);
}


document.body.innerHTML = decodeString(document.body.innerHTML);
window.setTimeout(decodeEmoticons, 50);
