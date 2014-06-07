// ==UserScript==
// @name           QuickRip for TTS Uploaders
// @namespace      http://oldarney.com/
// @description    Ads NFO ripping on the Description textbox.
// @include        http://thetorrentsource.org/upload.php
// @include        https://thetorrentsource.org/upload.php
// ==/UserScript==
String.prototype.trim = function(){ return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '')};
String.prototype.DeCp437 = function(){ return this.replace(/[ÜßÛþÝÞ±ÄÁÂÀÃÅÉÊÈËÏìÍÑÇÙÚ¶¼»×°º¹²³¿´]/g, '')};
function del(term) {
	term.parentNode.removeChild(term);
	return term;
}

var nfoRow = document.getElementsByTagName('input');
del(nfoRow[5].parentNode.parentNode);

	
var descElement = document.getElementsByTagName('textarea')[0];
descElement.parentNode.innerHTML = descElement.parentNode.innerHTML.split('<br>')[0]+'<input id="ripNfoBtn" type="button" value="RipNFO" class="btn" onclick="RipNFO();"/>'+'<br>'+descElement.parentNode.innerHTML.split('<br>')[1];
descElement = document.getElementsByTagName('textarea')[0];
	
function RipNfo(myNfo){
	myNfo = myNfo.DeCp437().trim().replace(/\n(\s*\n)+/g, "\n\n").replace(/(\ \ )+/g, " ");
	return myNfo;
}

function RNfoHndr(){
	descElement.value = RipNfo(descElement.value);
}

var ripNfoBtnElem = document.getElementById("ripNfoBtn");
ripNfoBtnElem.addEventListener('click', RNfoHndr, false);