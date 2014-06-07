
// ==UserScript==
// @name			redditopenrere
// @description		xd
// @include			http://www.reddit.com/*
// @include			www.reddit.com/*
// @include			http://www.pl.reddit.com/*
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

//~ alert(div.innerHTML);

function checkEventObj (_event_){
	// --- IE explorer
	if ( window.event )
		return window.event;
	// --- Netscape and other explorers
	else
		return _event_;
}


function touche(_event_){
	
	//On récupère les touches appuyées : 
	var winObj = checkEventObj(_event_);
	var intKeyCode = winObj.keyCode;
	var intAltKey = winObj.altKey;
	var intCtrlKey = winObj.ctrlKey;
	//FIN
	if (intAltKey && intCtrlKey){
		if (intKeyCode == 88) {
			ouvrir();
		} else if (intKeyCode == 87){
			enlarge();
		}
	}
}	

function ouvrir(){
	
	var allImgs, thisImg;
	var tab = new Array();
	allImgs = document.getElementsByClassName('title loggedin ');
	for (var i = 0; i < allImgs.length; i++) {
		thisImg = allImgs[i];
		thisImg = thisImg.href.toLowerCase();
			tab.push(thisImg);
			window.open(thisImg);
			
		
	}
	return false;

}

