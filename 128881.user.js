/**********************************************************************
 * Author: Johan Hanssen Seferidis
 * Date:   22-03-2012
 * Description: Autoplays word pronunciation when hovering above words in lexin.nada.kth.se
 *
 * Contact: manossef@gmail.com
 *          (send me an email for requests on documentation, improvements, bugs etc)
 * 
 ***********************************************************************/

// ==UserScript==

// @run-at        document-start
// @name          Lexin Autopronounce 
// @namespace     http://ifeelrobot.com
// @description   Autoplays word pronunciation when hovering above words.
// @include       http://lexin.nada.kth.se*
// @include       http://lexin2.nada.kth.se*
// @include       https://lexin.nada.kth.se*
// @include       https://lexin2.nada.kth.se*

// ==/UserScript==


// run script once page has loaded
window.addEventListener('load', function(){main()}, false);

var root;                                    // the root of the visible page
var TranslationPanel;                        // the right panel
var mp3playerId="mp3player";                 // the id of the mp3player object
var mp3playersrc="http://ifeelrobot.com/musicplayer/player.swf"; // where the player .swf resides


//runs once 'window' has loaded
function main(){

	// check for browser DOM support
	if (!document.getElementsByTagName) {
		return false;
	}
	
	//bypass the iframe
	if (window.top != window.self){
		return;
	}
    
    // initial
    if (!document.getElementById("whole_page")) return;
	root=document.getElementById("whole_page");
	if (translationPanelIsValid()) {
		TranslationPanel=getElementByClass("lexingwt-TranslationPanel");
		translationPanelRefreshed();
	}
	
	// check if the translation panel got refreshed
	root.addEventListener("DOMNodeInserted", function () {
		if (translationPanelIsValid()){
			TranslationPanel=getElementByClass("lexingwt-TranslationPanel");
			translationPanelRefreshed();
		}
	}, false);

}

// check translation panel validity
function translationPanelIsValid()
{
	if (!getElementByClass("lexingwt-TranslationPanel")) // is there translation panel?
		return false;
		
	if (getSoundElements().length==0)                    // are there sound tags?
		return false;
		
	return true;
}


// things to do on every new word search
function translationPanelRefreshed()
{
	registerEventHandlers(getSoundElements());
}

/* -------------------------------- GENERIC ---------------------------------------- */

// returns the first element with the specific class in the page
function getElementByClass(className){
	var elements = document.getElementsByTagName('*');
	for(var i=0;i<elements.length;i++){
		if(elements[i].className == className){
			return elements[i];
		}
	}
}


// gets all sound elements from the page
function getSoundElements(){
	
	// get all sound links
	var links=document.getElementsByTagName("a");
	var soundElements=new Array();
	
	for(var i = 0; i < links.length; i++) {
	  var url=links[i].href;
	  if (url.search("\.mp3")>0) {
		  soundElements.push(links[i]);
	  }
	}

	return soundElements;
}


// register event handlers for when mouse hovers over sound elements
function registerEventHandlers(soundEls){
	for (var i=0; i<soundEls.length; i++){
		soundEls[i].addEventListener("mouseover", function() { loadAndPlay(this); }, false);
		soundEls[i].addEventListener("mouseout",  function() { stopPlay(this);    }, false);
	}
}

/* ------------------------------ SOUND PLAYBACK ----------------------------------- */

// load and play sound
function loadAndPlay(soundElement){

	var songsrc;
	
	// make sure no other mp3player exists to avoid double playback
	if (document.getElementById(mp3playerId)) return;
	
	// get sound source
	songsrc=soundElement.href;

	// load player with sound file
	var mp3player=document.createElement("object");
	mp3player.setAttribute("id", mp3playerId);
	mp3player.setAttribute("width", "0");
	mp3player.setAttribute("height", "0");
	mp3player.setAttribute("type", "application/x-shockwave-flash");
	mp3player.setAttribute("data", mp3playersrc+"?songsrc="+songsrc);
	root.appendChild(mp3player);
	
	// show the playback visually
	playingVisual(soundElement);
}

// stop sound by removing object
function stopPlay(soundElement){
	
	// make sure no other mp3player exists
	if (!document.getElementById(mp3playerId)) return;
	
	// remove mp3player object
	root.removeChild(document.getElementById(mp3playerId));
}

// visual enhances while playing a sound
function playingVisual(soundElement){
	var smallTags=soundElement.getElementsByTagName("small");

	// change text on each sound element during playback
	var oldText = smallTags[0].textContent;
	var newText = "SPELAR";
	smallTags[0].textContent=newText;
	
	// change background
	var oldBgColor = smallTags[0].style.background;
	var newBgColor = "#DB8CAC";
	smallTags[0].style.background=newBgColor;
	
	// reset changes on mouseout
	soundElement.addEventListener("mouseout",  function() { 
		 smallTags[0].textContent=oldText;
		 smallTags[0].style.background=oldBgColor;
	}, false);
}