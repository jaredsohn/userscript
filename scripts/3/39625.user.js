// AmazonAssociatesTinyURL
// version 0.0.2
// 2009-01-01
// Copyright (c) 2009, Jamie Grove
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Notes: The framework for this script comes from Mark Wilkie's
//        fabulous GmailTinyURL script http://bitterpill.org/gmail_tinyurl/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Amazon Associates TinyUrl
// @namespace     http://www.fieldguidetoprogrammers.com/amazon-associates-tinyurl-greasemonkey-script/
// @description   Takes the current page on Amazon.com and returns a TinyURL with your associates ID appended with the key command (macos - CTL/Shift/T) (win/linux - Alt/Shift/U). Set/Change your Amazon Associates ID by using (macos - CTL/Shift/I) (win/linux - Alt/Shift/I).
// @include       http://www.amazon.com/*
// @include       https://www.amazon.com/*
// ==/UserScript==

//GM_log('Loaded Amazon Associates TinyUrl...');

var is_ctrlkey = false;
var is_shiftkey = false;

window.addEventListener('keydown', keyHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

function keyUpHandler(event) {	
	if (event.ctrlKey) {
		is_ctrlkey = false;
	} else if (event.shiftKey) {
		is_shiftkey = false;		
	}
	//return false;
}

function keyHandler(event) {
	//GM_log(event.ctrlKey + ' ' + event.shiftKey + ' ' + event.keyCode);
	if (navigator.appVersion.indexOf("Mac") < 0) {
		if (event.altKey == true && event.shiftKey == true && event.keyCode == 85) {
			GM_log('get tiny url');	
			ginyUrl();	
		}
		if (event.altKey == true && event.shiftKey == true && event.keyCode == 73) {
			GM_log('set amazon associates ID');	
			setAssociatesID();
		}
	} else {
		if (event.ctrlKey == true && event.shiftKey == true && event.keyCode == 84) {
			GM_log('get tiny url');	
			ginyUrl();	
		}
		if (event.ctrlKey == true && event.shiftKey == true && event.keyCode == 73) {
			GM_log('set amazon associates ID');	
			setAssociatesID();
		}
	}}


function ginyUrl() {
	var href = window.location;
	var associatesID = getAssociatesID();
	href = href + '/' + associatesID;
	getTinyUrl(href);
}

function getAssociatesID(){
	var associatesID = GM_getValue('associatesID');
	if (!associatesID){
		associatesID = prompt("The script needs your Amazon Associates ID to continue. This is saved locally on your machine.", "Enter your Amazon Associates ID here...");
		GM_setValue('associatesID', associatesID);
	}
	return associatesID;
}

function setAssociatesID(){
	var associatesID = GM_getValue('associatesID');
	associatesID = prompt("You are changing your Amazon Associates ID. This is saved locally on your machine.", associatesID);
	GM_setValue('associatesID', associatesID);
}

function getTinyUrl(url) {
	GM_xmlhttpRequest({
	  method:"GET",
	  url: "http://tinyurl.com/api-create.php?url=" + url,
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml,text/plain",
	  },
	  onload:function(details) {
		if(details.status != 200) {			
			alert('Sorry, we were unable to fetch your tinyurl at this time: ' + details.statusText);
		} else {
			prompt('TinyURL ' + details.responseText + ' was created from this URL ' + url + '. You can select the TinyURL and copy it right here: ',details.responseText);
		}
	  }
	});		
}