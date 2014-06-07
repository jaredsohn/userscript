// ==UserScript==
// @name        Embed Tweak
// @namespace	embedtweak
// @grant       none
// @description	Modifies Youtube embed videos, Forces all videos to a larger size (640x385) or (1024x576), With options for: Video Size, Privacy, Https, Autohide, Theme and Colour Setting, Hide Annotations and Hide Related.
// @version		03 February 2013 (1.25)
// @include		http*
// ==/UserScript== 
//
// Set variables below
//
// Set Video Size, large or medium. Large (1024x576) medium (640x385)
var videosize = "medium";
// Force the url to not be modified, Improves Performance! NOTE: This must be set to 0 in order for the features below this to work. (video size is always modified)
var defaulturl = 0;
// theme, options: light or dark
var ytheme = "dark";
// color, options: red or white
var ycolor = "white";
// Set annotation = 0 or 1, 0 disables annotations
var annotation = 0;
// Show Related videos at end of playback, option: 1 or 0,
var related = 0;
// Force https option, 1 enables https, 
var https = 1;
// Force Privacy domain youtube-nocookie.com. 1 forces, 
var privacy = 0;
// Set autohide = 0 or 1, 1 enables auto hide of player controls. (0 is default behaviour)
var autohide = 1;


////////////////////////////////////////////////
// No need to modify anything past this point // 
////////////////////////////////////////////////

console.log('This script grants no special privileges, so it runs without security limitations.');

// Modify existing iframes size and href
var iFrames = document.getElementsByTagName('IFRAME');
var iFramesLen = iFrames.length;
     
for (var i = 0; i < iFramesLen; i++)
{
    var ifr = iFrames[i];
    if (ifr.src.indexOf('youtube.com/embed/') > -1 || ifr.src.indexOf('youtube-nocookie.com/embed/') > -1) {
		if (videosize == 'large') { 
		ifr.width = '1024';
		ifr.height = '576';
	}
		if (videosize == 'medium') {
		ifr.width = '640';
		ifr.height = '385';
	}
		//alert('0.1 ' + ifr.src);
		if (defaulturl == 1) {
		}
		else {
		if (https == 1) {
		ifr.src = ifr.src.replace(/http\:/, 'https:'); }
		if (privacy == 1) {
		ifr.src = ifr.src.replace(/youtube\.com/, 'youtube-nocookie.com'); }
		ifr.src += '?';
		if (autohide == 1) {
		ifr.src += '&autohide=1'; }
		if (ytheme == "light") {
		ifr.src += '&theme=light'; }
		if (ytheme == "dark") {
		ifr.src += '&theme=dark'; }
		if (ycolor == "red") {2
		ifr.src += '&color=red'; }
		if (ycolor == "white") {
		ifr.src += '&color=white'; }
		if (annotation == 0) {
		ifr.src += '&iv_load_policy=3'; }
		if (related == 0) {
		ifr.src += '&rel=0'; }
		}
		//alert('1 ' + ifr.src);
	}
}


// change other types of object embed tags
var iObjects = document.getElementsByTagName('object');
var iObjectsLen = iObjects.length;
     
for (var i = 0; i < iObjectsLen; i++)
{
    var iOr = iObjects[i];
    if (iOr.data.indexOf('youtube.com/v/') > -1  || iOr.data.indexOf('youtube-nocookie.com/v/') > -1) {
	if (videosize == 'large') { 
	iOr.style.width = '1024px';
	iOr.style.height = '576px';
	}
	if (videosize == 'medium') {
	iOr.style.width = '640px';
	iOr.style.height = '385px';
	}
	//alert('0.2 ' + iOr.data);
			if (defaulturl == 1) {
		}
		else {
	if (https == 1) {
	iOr.data = iOr.data.replace(/http\:/, 'https:'); }
	if (privacy == 1) {
	iOr.data = iOr.data.replace(/youtube\.com/, 'youtube-nocookie.com'); }
	iOr.data = iOr.data.split('&')[0];
	iOr.data = iOr.data.split('?')[0];
	iOr.data += '?version=3';
	if (autohide == 1) {
	iOr.data += '&autohide=1'; }
	if (ytheme == "light") {
	iOr.data += '&theme=light'; }
	if (ytheme == "dark") {
	iOr.data += '&theme=dark'; }
	if (ycolor == "red") {
	iOr.data += '&color=red'; }
	if (ycolor == "white") {
	iOr.data += '&color=white'; }
	if (annotation == 0) {
	iOr.data += '&iv_load_policy=3'; }
	if (related == 0) {
	iOr.data += '&rel=0'; }
	//alert('2 ' + iOr.data);
		}
		}
}

var iEmbeds = document.getElementsByTagName('embed');
var iEmbedsLen = iEmbeds.length;
     
for (var i = 0; i < iEmbedsLen; i++)
{
    var iEr = iEmbeds[i];
    if (iEr.src.indexOf('youtube.com/v/') > -1 || iEr.src.indexOf('youtube-nocookie.com/v/') > -1) {
	if (videosize == 'large') { 
    iEr.width = 1024;
    iEr.height = 576;
	}
	if (videosize == 'medium') {
    iEr.width = 640;
    iEr.height = 385;
	}
	//alert('0.3 ' + iEr.src);
	if (defaulturl == 1) {
		}
		else {
	if (https == 1) {
	iEr.src = iEr.src.replace(/http\:/, 'https:'); }
	if (privacy == 1) {
	iEr.src = iEr.src.replace(/youtube\.com/, 'youtube-nocookie.com'); }
	iEr.src = iEr.src.split('&')[0];
	iEr.src = iEr.src.split('?')[0];
	iEr.src += '?version=3';
	if (autohide == 1) {
	iEr.src += '&autohide=1'; }
	if (ytheme == "light") {
	iEr.src += '&theme=light'; }
	if (ytheme == "dark") {
	iEr.src += '&theme=dark'; }
	if (ycolor == "red") {
	iEr.src += '&color=red'; }
	if (ycolor == "white") {
	iEr.src += '&color=white'; }
	if (annotation == 0) {
	iEr.src += '&iv_load_policy=3'; }
	if (related == 0) {
	iEr.src += '&rel=0'; }
	}
	//alert('3 ' + iEr.src);
	/*
	//Testing adding a download link
	var vid = iEr.src.split("v/")[1].substring(0, 11)	
	var a = document.createElement('a');
	a.textContent = 'Youtube Link';
	a.setAttribute('style', 'font-size: 12px; font-family: arial, verdana, sans-serif;');
	a.target = '_blank';
	a.href = 'https://www.youtube.com/watch?v='+vid;
	a.id = 'a_v_'+vid;
	iEr.parentNode.insertBefore(document.createElement('br'), iEr.nextSibling);
	iEr.parentNode.insertBefore(a, iEr.nextSibling.nextSibling);
	*/
   		}
}