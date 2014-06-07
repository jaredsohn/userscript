// ==UserScript==
// @name           Better kere.ws
// @namespace      by deman, 2010
// @description    Edits the myfilez NZB link to skip waiting time and more.
// @include        http://kere.ws/*
// @include        http://*.kere.ws/*
// ==/UserScript==
// v 1.2

/**************************************
* Config: 1 on, 0 off *****************
**************************************/

var skipWaitingTime = 0;
var hideAdvertisements = 1;
var hideShoutbox = 1;
var whiteNFOBackground = 1;

/**************************************
* End of Config ***********************
**************************************/

if(skipWaitingTime) {
	var allLinks = func_linkQuery();
	
	if(skipWaitingTime) {
		func_skipWaitingTime(allLinks);
	}
}
 
if(hideAdvertisements) {
	func_hideAdvertisements();
}

if(hideShoutbox) {
	func_hideShoutbox();
}

if(whiteNFOBackground) {
	func_whiteNFOBackground();
}


//LinkQuery
function func_linkQuery() {
	var allLinks = document.evaluate(
			'//a[@href]', 
			document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null);
	
	return allLinks;
}


//Editiert den myfilezlink um Wartezeit zu ueberspringen
function func_skipWaitingTime(allLinks) {
	var myfilezIDRegex = new RegExp("m\=display\&h\=([a-z0-9]+)");

	//Editiert myfileszlink
	for(var i = 0; i < allLinks.snapshotLength; i++) {
		var curLink    	= allLinks.snapshotItem(i);
		var myfilezID  	= myfilezIDRegex.exec(curLink);
		
		if(myfilezID != null) {
			var	s = curLink.href;
			s = s.replace(curLink, "http://myfilez.info/download.php?h=" + myfilezID[1]);
			curLink.href = s;
		}
	}
}


//Entfernt die Werbe-DIVs anhand der ID
function func_hideAdvertisements() {
	var advert = document.getElementById('advert');
	var bgUpperLeft = document.getElementById('info_01');
	var bgUpperRight = document.getElementById('info_04');
	var bgLeft = document.getElementById('info_05');
	var bgRight = document.getElementById('info_08');
	
	if(advert) {
		advert.parentNode.removeChild(advert);
	}
	
	if(bgUpperLeft && bgUpperRight && bgLeft && bgRight) {
		bgUpperLeft.style.background = 'transparent';
		bgUpperRight.style.background = 'transparent';
		bgLeft.style.background = 'transparent';
		bgRight.style.background = 'transparent';
	}
}


//Entfernt Shoutbox und vergroessert dafuer die Slidebar
function func_hideShoutbox() {
	var shoutboxContent = document.getElementById('info_07');
	var shoutboxHeader = document.getElementById('info_03');
	var slidebarHeader = document.getElementById('info_02');
	var slidebarAll	= document.getElementById('info_06');
	var slidebarMiddle = document.getElementById('info_06_middle');
	
	if(shoutboxContent && shoutboxHeader && slidebarHeader && slidebarAll && slidebarMiddle) {
		shoutboxContent.parentNode.removeChild(shoutboxContent);
		shoutboxHeader.innerHTML = '';
		slidebarHeader.style.textAlign = 'right';
		slidebarAll.style.width = '792px';
		slidebarAll.style.background = 'url("images/info_06.png") repeat-x scroll 0 0 transparent';
		slidebarMiddle.style.width  = '707px';
	}
}


//Aendert die *.nfo Hintergrundfarbe von grau nach weiss
function func_whiteNFOBackground() {
	var nfoBackground = document.getElementById('rls_nfo');
	
	if(nfoBackground) {
		nfoBackground.style.background = '#fff';
	}
}