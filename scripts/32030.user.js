// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          Google Reader Page Down
// @description   Scrolls down your list of items until you tell it to stop.
// @include       http://www.google.com/reader/*
// @include				https://www.google.com/reader/*
// ==/UserScript==


// Changelog:
// 5 DEC 08 - Updated to accomodate new CSS selectors in Reader

function pageDown(){
  var evt = document.createEvent("KeyboardEvent");
  evt.initKeyEvent("keypress",true,true,null,false,false,false,false,34,0);
  document.dispatchEvent(evt);
}

var intID;
var toggleState = 0;

function togglePageDown(){
	if(toggleState == 0){
		document.getElementById('pagedown').textContent = 'Stop Pagedown';
		intID = unsafeWindow.setInterval(pageDown,1000);
		toggleState = 1;
	}
	else{
		document.getElementById('pagedown').textContent = 'Start Pagedown';
		if(intID){unsafeWindow.clearInterval(intID);}
		toggleState = 0;
	}
}

var c=document.getElementById('viewer-footer');

var t = document.createElement('div'); 
//t.setAttribute('style','outline-color: -moz-use-text-color; outline-style: none; outline-width: medium;'); 
t.setAttribute('id','bw-pagedown'); 
t.setAttribute('class','goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight'); 
t.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="goog-button-base-pos"><div id="pagedown" class="text">Start Pagedown</div></div></div></div></div></div>';
t.addEventListener('click',togglePageDown,true);
c.insertBefore(t,c.lastChild)
