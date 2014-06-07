// ==UserScript==
// @name           Kill YouTube Backgrounds
// @description    Adds a button to get rid of annoying youtube backgrounds.
// @namespace      http://chrisciollaro.com
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @version        1.0
// ==/UserScript==


//relevant nodes
var containerSpan = document.createElement('span'); //just a new span
var parentElement = document.getElementById('watch-actions'); //the container of the buttons
var rightMostButton = document.getElementById('watch-flag') || document.getElementById('watch-transcript'); //element to put my button next to

//make button
var buttonElement = document.createElement('button');
buttonElement.setAttribute('type', 'button');
buttonElement.setAttribute('title', 'Remove Background');
buttonElement.setAttribute('class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
buttonElement.setAttribute('id', 'background-delete');
buttonElement.setAttribute('data-tooltip-text', 'Remove Background');
var buttonSpan = document.createElement('span');
buttonSpan.setAttribute('class', 'yt-uix-button-content');
buttonSpan.innerHTML = 'Kill BG';
buttonElement.appendChild(buttonSpan);
//end make button

//fade out method
function fade(element) {
	var op = 1;  // initial opacity
	var timer = setInterval(function () {
		if (op <= 0.1){
			clearInterval(timer);
			element.style.display = 'none';
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;
	}, 20);
}
	
function itsAGo(){	
	//add button to page
	containerSpan.appendChild(document.createTextNode(' '));
	containerSpan.appendChild(buttonElement);
	parentElement.insertBefore(containerSpan,rightMostButton.nextSibling);
			
	//what happens when the button gets clicked.
	var callback = function(){
		document.getElementById('content').style.backgroundImage = "none";
		fade(buttonElement);
	}

	//setup click listener
	buttonElement.addEventListener('click', callback);
}

function main(){
	if(document.getElementById('content').style.backgroundImage.length > 0){
		itsAGo();
	}
}

setTimeout(main, 80); //wait a little for image to be loaded up