// ==UserScript==
// @name        Double-click Post Header to Quote
// @namespace   pendevin
// @description Quotes a message by double-clicking the post header
// @include     http://endoftheinter.net/inboxthread.php*
// @include     http://boards.endoftheinter.net/showmessages.php*
// @include     https://endoftheinter.net/inboxthread.php*
// @include     https://boards.endoftheinter.net/showmessages.php*
// @version     1
// ==/UserScript==

//livelinks compatiblity
function livelinks(func){
	document.addEventListener(
		'DOMNodeInserted',
		function(e){if(e.target.firstChild&&e.target.firstChild.className=='message-container')func(e.target.firstChild);},
		false
	);
	func(document);
}

//creates a click event on the target element
function simulateClick(element){
  var evt=document.createEvent("MouseEvents");
  evt.initMouseEvent("click",true,true,window,1,0,0,0,0,false,false,false,false,0,null);
	element.dispatchEvent(evt);
}

//add the listeners to the posts
function processPosts(place){
	var tops=place.getElementsByClassName('message-top');
	for(var i=0;i<tops.length;i++){
		tops[i].addEventListener('dblclick',doubleClick,false);
	}
}

//quote a message
function doubleClick(e){
	var links=e.target.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		if(links[i].textContent=='Quote'){
			simulateClick(links[i]);
			break;
		}
	}
}

livelinks(processPosts);