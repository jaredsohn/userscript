// ==UserScript==
// @name           Amazing Superpowers Bonus Viewer
// @namespace      http://userscripts.org/users/didero
// @description    A userscript that displays the comic's alt text, and the bonus comic.
// @include        http://www.amazingsuperpowers.com/*
// @exclude        http://www.amazingsuperpowers.com/hc/*
// @version        2.2.2
// @downloadURL    http://userscripts.org/scripts/source/128473.user.js
// @updateURL      http://userscripts.org/scripts/source/128473.meta.js
// @grant          none
// ==/UserScript==

//Get the comic, and its parent for future positioning
var comicDiv = document.getElementById('comic-1');
if (comicDiv) {
	//Create a display for the bonus comic
	var easterEggsDisplay = document.createElement('div');
	easterEggsDisplay.style.textAlign = 'center';	
	
	var hideBonusComic = false;
	//If there's a YouTube video (on Fridays they sometimes publish a short video instead of a comic)
	if (comicDiv.getElementsByTagName('iframe').length > 0) hideBonusComic = true;
	else {
		//Create a new place to show the image alt-text
		var altTextDisplay = document.createElement('div');
		altTextDisplay.innerHTML = comicDiv.getElementsByTagName('img')[0].getAttribute('alt');
		altTextDisplay.style.fontWeight = 'bold';
		easterEggsDisplay.appendChild(altTextDisplay);
	}

	//Make the text clickable in case the bonus comic needs to be expanded (hidden under video to avoid spoilers)
	var bonusComicHeaderDiv = document.createElement('div');
	bonusComicHeaderDiv.innerHTML = 'Bonus Comic:';
	bonusComicHeaderDiv.style.cursor = 'pointer';
	bonusComicHeaderDiv.onclick = function() {
		//If the bonus comic is already hidden, unhide it
		if (bonusComicDiv.style.display == 'none') {
			bonusComicDiv.removeAttribute('style');
			this.innerHTML = 'Bonus Comic:';
		}
		//If the bonus comic isn't hidden, hide it
		else {
			bonusComicDiv.style.display = 'none';
			this.innerHTML = 'Click here to show the bonus comic';
		}
	}
	easterEggsDisplay.appendChild(bonusComicHeaderDiv);

	//Create an area for the easter eggs to display
	var bonusComicDiv = document.createElement('div');
	//Make sure any and all text messages ('loading' and any errors) are displayed in italics, to stand out
	bonusComicDiv.style.fontStyle = 'italic';
	bonusComicDiv.innerHTML = 'Loading...';
	easterEggsDisplay.appendChild(bonusComicDiv);
	comicDiv.parentNode.appendChild(easterEggsDisplay);
	if (hideBonusComic) bonusComicHeaderDiv.click();

	//Retrieve the bonus comic URL from the 'question mark' link to the right of the comic
	var questionMarkLink = document.getElementById('question');
	if (questionMarkLink != null) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', questionMarkLink.getElementsByTagName('a')[0].href);
		xhr.onreadystatechange = function() {
			if (this.readyState == 4) { //4 is the code for 'ready'.
				if (this.status != 200) {
					bonusComicDiv.innerHTML = "Couldn't load bonus comic! (HTTP error code "+this.status +")";
				}
				else {
					//Convert the plain text to searchable HTML
					var bonusComicPage = document.createElement('div');
					bonusComicPage.innerHTML = this.responseText;
					var bonusComicContainers = bonusComicPage.getElementsByClassName('comicpane');
					//Sometimes there's multiple images on the hidden comic page. Include them all
					if (bonusComicContainers.length > 0) {
						bonusComicDiv.innerHTML = bonusComicContainers[0].parentNode.innerHTML;
						//If there's a lot of images, hide it automatically (if it hasn't been hidden already)
						if (bonusComicContainers.length > 1 && bonusComicDiv.style.display != 'none') {
							bonusComicHeaderDiv.click();
						}
					}
					else bonusComicDiv.innerHTML = "Unable to find hidden comic";
				}
			}
		}
		xhr.send();
	}
}