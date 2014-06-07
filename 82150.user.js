// ==UserScript==
// @name           Hide camwhore spam
// @namespace      Anon1166
// @description    Hides the blackbreeastst,  flash1nnguseex, etc spam on /b/
// @include        http://boards.4chan.org/*
// ==/UserScript==


window.setTimeout(function() {


var allPostDetails = document.getElementsByTagName('span');
var allPostText = document.getElementsByTagName('blockquote');
var innertext, thebiz, thebizzle;
//var regex = /(48[0-9]x2(7|8)[0-9])|(3(4|5)[0-9]x4(2|3)[0-9])|(18[0-9]x18[0-9])/
var regex = /(4(7|8)[0-9]x4(5|6)[0-9])/
var regexx = /(Help an anon unlock the secret vid)|triforce|▲|alpha|beta|(tri force)|(The Broadband Link is Currently Not AvailableError)|(\.co\.cc)|(touch my LOLI and CP)|(Wow this thread is just horrible, call me at)/i

	for (var i = 0;i < allPostDetails.length; i++) {
		
		if(allPostDetails[i].className == 'filesize') {
		
			innertext = allPostDetails[i].innerHTML;
			
			if (innertext.match(regex)) {
				allPostDetails[i].parentNode.style.display = 'none';
			}
		
		}
		
	}

	for (var i = 0;i < allPostText.length; i++) {
		
innertext = allPostText[i].innerHTML;
			
			if (innertext.match(regexx)) {
				allPostText[i].parentNode.style.display = 'none';
			}
		
	}

}
,100)