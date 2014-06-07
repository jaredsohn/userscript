// ==UserScript==
// @name            getMyVideoRTMPlink
// @author          Artur Lutz
// @version         2013.03.06
// @namespace	    hamsterbacke
// @description	    This script get's the rtmp link from http://myvideo.de and displays a download button in the box beneath the video player. If clicked it will display the rtmpdump command for copy and paste. Should work with other download manager that can handle rtmp. 
// @license 	    CC Zero http://creativecommons.org/publicdomain/zero/1.0/deed.de
// @run-at          document-end
// @require         http://heliotropium.it/md5.js
// @include         /^https?://(www\.)?myvideo\.de/watch/([0-9]+)/.*/
// ==/UserScript==

// Configure the debug mode
var GM_Debug = 1;

var SBOX = new Array(255);
var GEN_KEY = new Array(255);
var documentSource = document.body.innerHTML;

/* get all the infos needed for decrypting the config xml file */
var myvideoVideoID = documentSource.match("ID:'(.*?)'")[1];
var myvideoVideoFlashPlayerType = documentSource.match("flash_playertype:'(.*?)'")[1];
var myvideoVideoAutorun = documentSource.match("autorun:'(.*?)'")[1];
var myvideoVideoDS = documentSource.match("ds:'(.*?)'")[1];
var myvideoVideoCountLimit = documentSource.match("_countlimit:'(.*?)'")[1];
console.log('myvideoVideoID', myvideoVideoID);
console.log('myvideoVideoFlashPlayerType', myvideoVideoFlashPlayerType);
console.log('myvideoVideoAutorun', myvideoVideoAutorun);
console.log('myvideoVideoDS', myvideoVideoDS);
console.log('myvideoVideoCountLimit', myvideoVideoCountLimit);
var myvideoVideoURL = decodeURIComponent(documentSource.match("_encxml:'(.*?)'")[1]);
console.log('myvideoVideoURL', myvideoVideoURL);
var requestURL = myvideoVideoURL + "?ID=" + myvideoVideoID + "&_countlimit=" + myvideoVideoCountLimit + "&flash_playertype=" + myvideoVideoFlashPlayerType + "&autorun=" + myvideoVideoAutorun + "&ds=" + myvideoVideoDS + "&domain=www.myvideo.de";

var xmlHTTP = new XMLHttpRequest();
xmlHTTP.open('GET', requestURL, false);
xmlHTTP.send();
myvideoVideoURL = xmlHTTP.responseText;
myvideoVideoURL = myvideoVideoURL.replace('_encxml=', '');

/* 
** the first md5 hash is the masterkey hidden in the ming.swf file
** it has be be concatinated with the md5 hash of the videoID
** the rest of the procedure is just taken from the swf file
*/
var loc1 = hex_md5("c8407a08b3c71ea418ec9dc662f2a56e40cbd6d5a114aa50fb1e1079e17f2b83"+hex_md5(myvideoVideoID));
var loc2 = hexToChars(myvideoVideoURL);
var loc3 = strToChars(loc1); 
var loc4 = calculate(loc2, loc3);
myvideoVideoURL = charsToStr(loc4);
myvideoVideoURL = decodeURIComponent(myvideoVideoURL);
console.log(myvideoVideoURL);

if (myvideoVideoURL.match(/(.*rtmp.*)/)[1]){
    var myvideoVideoURLrtmp = myvideoVideoURL.match("connectionurl='(.*?)'")[1];
    var myvideoVideoURLswf = documentSource.match("embedSWF\\('(.*?)'")[1];
    var myvideoVideoURLserver = myvideoVideoURL.match("<destserver>(.*?)</destserver>")[1];
    var myvideoVideoURLsource = myvideoVideoURL.match("source='(.*?)'")[1];
    var myvideoVideoURLVideoPage = myvideoVideoURLserver + myvideoVideoURL.match("video_link='(.*?)'")[1];
    var myvideoVideoURLTitle = myvideoVideoURL.match("title='(.*?)'")[1];
    var myvideoVideoURLextension = myvideoVideoURLsource.split('.')[1];
    var allComined = myvideoVideoURLrtmp + " swfVfy=" + myvideoVideoURLswf + "  tcUrl=" + myvideoVideoURLrtmp + " --swfVfy=" + myvideoVideoURLswf + " pageUrl=" + myvideoVideoURLVideoPage + " playpath=" + myvideoVideoURLsource;
    var allCominedrtmpdump = "rtmpdump -r " + myvideoVideoURLrtmp + " --tcUrl=" + myvideoVideoURLrtmp + " --swfVfy=" + myvideoVideoURLswf + " --pageUrl=" + myvideoVideoURLVideoPage + " --playpath=" + myvideoVideoURLsource + " -o \"" + myvideoVideoURLTitle+"."+myvideoVideoURLextension + "\"";
    
    //console.log('complete link: ', allComined);
    //console.log('rtmpdump link: ', allCominedrtmpdump);
    
    /* Display a download button */
    var downloadButton = document.createElement( 'input' );
    with( downloadButton ) {
      setAttribute( 'onclick', 'triggerOnClick();' );
      setAttribute( 'value', 'Download' );
      setAttribute( 'type', 'button' );
    }
    downloadButton.onclick = function() { alert(allCominedrtmpdump) };
    
    window.onload = function () {
      // Wait for the DOM to build and append the button on the page
      downloadButton.className = "vds_video_actions_btn vds_video_actions_btn_no_bg globalBxBorder globalBx";
      document.getElementById('vds_video_actions_box').appendChild(downloadButton);
    }
}

function calculate(arg1, arg2){
	var loc4 = null;
	var loc5 = null;
	var loc6 = null;
	var loc8 = null;
	initialize(arg2);
	var loc1 = 0;
	var loc2 = 0;
	var loc3 = new Array();
	var loc7 = 0;
	while(loc7 < arg1.length){
		loc1 = (loc1 + 1) % 256;
		loc2 = (loc2 + SBOX[loc1]) % 256;
		loc5 = SBOX[loc1];
		SBOX[loc1] = SBOX[loc2];
		SBOX[loc2] = loc5;
		loc8 = (SBOX[loc1] + SBOX[loc2]) % 256;
		loc4 = SBOX[loc8];
		loc6 = arg1[loc7] ^ loc4;
		loc3.push(loc6);
		loc7++;
	}
	return loc3;
}
function initialize(arg1){
	var loc2 = null;
	var loc1 = 0;
	var loc3 = arg1.length;
	var loc4 = 0;
	while(loc4 <= 255){
		GEN_KEY[loc4] = arg1[loc4 % loc3];
		SBOX[loc4] = loc4;
		loc4++;
	}
	loc4 = 0
	while(loc4 <= 255){
		loc1 = (loc1 + SBOX[loc4] + GEN_KEY[loc4]) % 256;
		loc2 = SBOX[loc4];
		SBOX[loc4] = SBOX[loc1];
		SBOX[loc1] = loc2;
		loc4++;
	}
	return;
}
function hexToChars(arg1){
	var loc1 = new Array();
	var loc2 = arg1.substr(0, 2) != "0x" ? 0 : 2;
	while (loc2 < arg1.length){
		loc1.push(parseInt(arg1.substr(loc2, 2), 16));
		loc2 = loc2 + 2;
	}
	return loc1;
}
function charsToStr(arg1){
	var loc1 = new String("");
	var loc2 = 0;
	while (loc2 < arg1.length){
		loc1 = loc1 + String.fromCharCode(arg1[loc2]);
		loc2++;
	}
	return loc1;
}
function strToChars(arg1){
	var loc1 = new Array();
	var loc2 = 0;
	while (loc2 < arg1.length){
		loc1.push(arg1.charCodeAt(loc2));
		loc2++;
	}
	return loc1;
}
