// ==UserScript==
// @name          BB Feed Resizer
// @description   Re-sizes the Live Feeds for Big Brother 13 (US) while hiding the chat window.
// @include        http://superpass.real.com/big-brother-live/feeds*
// ==/UserScript==

var toggleDiv = document.createElement('div');
var playerObject;
var chatDiv;
var toggleStatus = false;
var wrapperDiv;
var siteHeader;
var allHTMLTags = new Array();
toggleDiv.id = 'toggleSize';
toggleDiv.className = 'toggleSize';
toggleDiv.style.position = 'fixed';
toggleDiv.style.top = '0px';
toggleDiv.style.left = '10px';
toggleDiv.style.padding = '10px';
toggleDiv.style.zIndex = '10000';
toggleDiv.style.fontWeight = 'bold';
toggleDiv.style.cursor = "pointer";
toggleDiv.style.color = "#FF007E";
toggleDiv.style.background = "url(http://static.realone.com/superpass2/images/social/content-bg.png)";
toggleDiv.style.borderRadius = "0 0 10px 10px";
document.body.appendChild(toggleDiv);
toggleDiv.innerHTML = "Toggle Size";


function hideClass(theClass) {
	var allHTMLTags=document.getElementsByTagName("*");
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className==theClass) {
			allHTMLTags[i].style.display='none';
		}
	}
}

function showClass(theClass) {
	var allHTMLTags=document.getElementsByTagName("*");
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className==theClass) {
			allHTMLTags[i].style.display='block';
		}
	}
}

// Add event listeners
function on(type, elm, func) {
	if (type instanceof Array) { for (var i=0; i<type.length; i++) { on(type[i], elm, func); } }
	else {
		if (elm instanceof Array) { for (var j=0; j<elm.length; j++) { on(type, elm[j], func); } }
		else { (typeof elm === 'string' ? $(elm) : elm).addEventListener(type, func, false); }
	}
}

// Add 'click' event listener
function onClick(elm, func) {
	elm.addEventListener('click', func, false); 
	}

// Click on an element
function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initEvent('click', true, true);
	elm.dispatchEvent(evt);
}

function changeSize(){
	playerObject = document.getElementById('Player');
	chatDiv = document.getElementById('livefeeds-client-container');
	wrapperDiv = document.getElementById('content-wrapper');
	siteHeader = document.getElementById('site-header');
	if(!toggleStatus){
		enlargePlayer();
	}else{
		shrinkPlayer();
	}
}

function enlargePlayer(){
	playerObject.style.width = '960px';
	wrapperDiv.style.height = playerObject.style.height = '648px';
	siteHeader.style.display = chatDiv.style.display = 'none';
	hideClass('livefeeds-message');
	window.location.hash = "Player"; 
	toggleStatus = true;
}

function shrinkPlayer(){
	playerObject.style.width = '636px';
	wrapperDiv.style.height = playerObject.style.height = '402px';
	siteHeader.style.display = chatDiv.style.display = 'block';
	//showClass('livefeeds-message');
	window.location.hash = "show-header"; 
	toggleStatus = false;
}

onClick(document.getElementById('toggleSize'), changeSize);