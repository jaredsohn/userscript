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
// @version			2.0
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

var NOTHING = 0;
var IMAGE = 1;
var WEBM = 2;

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
	if (index != -1) {
		if ( (url.lastIndexOf(".jpg")  == url.length-4) ||
			 (url.lastIndexOf(".gif")  == url.length-4)  ||
			 (url.lastIndexOf(".png")  == url.length-4) ){
			return IMAGE;
		} else if (url.lastIndexOf(".webm")  == url.length-5){
			return WEBM;
		}
	}
	return NOTHING;
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

var nbVideos = 0;


function enlarge(){
	
	var thisImg, thisImgSrc;
	var allImgs = document.getElementsByTagName("img");
	var resultat = 0;
	var parent;

	for (var i = 0; i < allImgs.length; i++) {
		thisImg = allImgs.item(i);
		parent = thisImg.parentNode;
		
		if(parent.className != "fileThumb"){
			continue;
		}
		
		if(parent.href != undefined){
			thisImgSrc = parent.href.toLowerCase();
		} else if(parent.src != undefined){
			thisImgSrc = parent.src.toLowerCase();
		} else {
			continue;
		}
		
		
		resultat = isValid(thisImgSrc, "i");
		
		if (resultat == IMAGE){
			thisImg.src = parent.href;
			thisImg.removeAttribute("width");
			thisImg.removeAttribute("height");
			thisImg.removeAttribute("style");
			thisImg.style.maxWidth = "85%";	// Before : 1400px		
			thisImg.style.maxHeight = "600px";		
		} else if (resultat == WEBM) {
			maVideo = document.createElement('video');
			maVideo.src = parent.href;
			maVideo.autoplay = false;
			maVideo.loop = true;
			maVideo.controls = true;
			maVideo.style.maxWidth = "85%";	// Before : 1400px		
			maVideo.style.maxHeight = "600px";	
			maVideo.id = 'video_' + nbVideos;
			nbVideos++;
			
			parent.removeChild(thisImg);
			parent.parentNode.appendChild(maVideo);
			i--;
			
		}
	}
	return false;

}



function estVisible(id_element){
	var cadreVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0}, elementVisible = {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
	var source = document.getElementById(id_element), sourceParent = source.offsetParent;
	var total = {hauteur: false, largeur: false}, partiel = {hauteur: false, largeur: false};
	cadreVisible.xMin = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
	cadreVisible.xMax = window.pageXOffset + window.innerWidth || document.documentElement.scrollLeft + document.documentElement.clientWidth || document.body.scrollLeft + document.body.clientWidth;
	cadreVisible.yMin = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	cadreVisible.yMax = window.pageYOffset + window.innerHeight || document.documentElement.scrollTop + document.documentElement.clientHeight || document.body.scrollTop + document.body.clientHeight;
	elementVisible.xMin = source.offsetLeft;
	elementVisible.yMin = source.offsetTop;
	while(sourceParent) {
		elementVisible.xMin += sourceParent.offsetLeft;
		elementVisible.yMin += sourceParent.offsetTop;
		sourceParent = sourceParent.offsetParent;
	}
	elementVisible.xMax = elementVisible.xMin + source.offsetWidth;
	elementVisible.yMax = elementVisible.yMin + source.offsetHeight;
	if(!(cadreVisible.xMax < elementVisible.xMin || cadreVisible.xMin > elementVisible.xMax)){
		partiel.largeur = true;
	}
	if(!(cadreVisible.yMax < elementVisible.yMin || cadreVisible.yMin > elementVisible.yMax)){
		partiel.hauteur = true;
	}
	if(partiel.largeur && partiel.hauteur){
		source.play();
	}
	else{
		source.pause();
	}
}

function playpause(){
	for (var i = 0; i < nbVideos; i++) {
		estVisible('video_'+i);
	}
}


window.onscroll = playpause;
