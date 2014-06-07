// 4chan Image Opener
// Copyright (c) 2012, Redspikers
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			4chan Image Opener
// @namespace		http://userscripts.org/scripts/show/104598
// @description		Open all images of a thread in tabs. (With Ctrl+Alt+X or one single click)
// @version			1.5
// @include			http://boards.4chan.org/*
// @include			https://boards.4chan.org/*
// @match			http://boards.4chan.org/*
// @match			https://boards.4chan.org/*
// ==/UserScript==


if (window.document.addEventListener) {
   window.document.addEventListener("keydown", touche, false);
} 
else {
   window.document.attachEvent("onkeydown", touche);
}

var block = document.createElement('div');
block.style.borderTop='1px dashed #000000';
block.style.borderLeft='1px dashed #000000';
block.style.position='fixed';
block.style.right='0px';
block.style.bottom='0px';
document.body.appendChild(block);

var lien = document.createElement('a');
if (window.document.addEventListener) {
   lien.addEventListener("click", enlarge, false);
} else {
   lien.attachEvent("onclick", enlarge);
}
lien.href='#';
lien.innerHTML="ENLARGE!";
block.appendChild(lien);

var sep = document.createElement('span');
sep.innerHTML = " | ";
block.appendChild(sep);
var lien2 = document.createElement('a');
if (window.document.addEventListener) {
   lien2.addEventListener("click", ouvrir, false);
} else {
   lien2.attachEvent("onclick", ouvrir);
}
lien2.href='#';
lien2.innerHTML="OPEN!";
block.appendChild(lien2);


function checkEventObj (_event_){
	// --- IE explorer
	if ( window.event )
		return window.event;
	// --- Netscape and other explorers
	else
		return _event_;
}


function touche(_event_){
	
	// We get the keys pressed : 
	var winObj = checkEventObj(_event_);
	var intKeyCode = winObj.keyCode;
	var intAltKey = winObj.altKey;
	var intCtrlKey = winObj.ctrlKey;
	// END
	if (intAltKey && intCtrlKey){
		if (intKeyCode == 88) {
			ouvrir();
		} else if (intKeyCode == 87){
			enlarge();
		}
	}
}	

function isValid(url, prefixe){
	var index = url.indexOf(prefixe + ".4cdn.org");
	if ( ((index != -1) && (index <= 11)) &&
		((url.lastIndexOf(".jpg") == url.length-4) ||
		 (url.lastIndexOf(".gif") == url.length-4) ||
		 (url.lastIndexOf(".png") == url.length-4))){
			return true;
		}
	return false;
}

function ouvrir(){
	
	var allImgs, thisImg;
	var tab = new Array();
	allImgs = document.getElementsByTagName('a');

	for (var i = 0; i < allImgs.length; i++) {
		thisImg = allImgs[i];
		thisImgSrc = thisImg.href.toLowerCase();
		if ( isValid(thisImgSrc, "i") && (tab.indexOf(thisImgSrc) == -1)){
			tab.push(thisImgSrc);
			window.open(thisImgSrc);
			//alert(tab.join('\n'));
		}
	}
	return false;

}

function enlarge(){
	
	var thisImg, thisImgSrc;
	var allImgs = document.getElementsByTagName("img");
	for (var i = 0; i < allImgs.length; i++) {
		thisImg = allImgs.item(i);
		thisImgSrc = thisImg.src.toLowerCase();
		if ( isValid(thisImgSrc, "t")){
			
			thisImg.src = thisImg.parentNode.href;
			thisImg.removeAttribute("width");
			thisImg.removeAttribute("height");
			thisImg.removeAttribute("style");
			thisImg.style.maxWidth = "85%";	// Before : 1400px		
			thisImg.style.maxHeight = "600px";		
		
		}
	}
	return false;

}