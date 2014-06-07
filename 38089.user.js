// ==UserScript==
// @name           iGoogle Gmail compose window UI fix
// @namespace      http://tweaksthelimbs.org/greasemonkey
// @description    This script modifies the UI for the iGoogle Gmail compose window so when you tab from the message body box, you go to the send button rather than the Back To Inbox link, which will lose your email.
// @include        http://www.google.com/ig/gmailmax*
// @include        https://www.google.com/ig/gmailmax*
// ==/UserScript==

var divs = document.getElementsByClassName('buttonsAndLinks');
for(i=0;i<divs.length;i++){
	var buttons = divs[i].getElementsByTagName('button');
	for(j=0;j<buttons.length;j++){
		if(buttons[j].id == 'send2'){
			divs[i].getElementsByTagName('a')[0].style.display = 'none';
		}
	}
}