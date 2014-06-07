// ==UserScript==
// @name          Something Will Happen v0.4
// @namespace     flatluigi.googlepages.com/scripts
// @description	'@include' a page on Neopets and this will refresh the page every 3 seconds until something happens. Great for avatars and battle challengers.
// @include 	http://REPLACE.THIS.COM
// ==/UserScript==
//
// Versions:
// 0.4: Cleaned up the code.
// 0.3: Forgot a ). Should work now.
// 0.2: Added tyrannian and winter random events.
// 0.1: Created script.
//

//constants

var SECOND = 1000 ;
var MINUTE = 60 * SECOND ;
var PERIOD = 3 * SECOND ;	// 3 seconds. Change this if you want it to refresh faster or slower.

// refresh

if (document.body.innerHTML.indexOf("NEW BATTLEDOME CHALLENGER")>-1) {alert("You have a new challenger!");}		//battledome
else if (document.body.innerHTML.indexOf("as an avatar on the NeoBoards")>-1) {alert("You have a new avatar!");}	//avatar
else if (document.body.innerHTML.indexOf("You have a new quest")>-1) {alert("You have a new quest!");}			//quest
else if (document.body.innerHTML.indexOf("Random Event!!!")>-1) {alert("Something has happened!");}				//tyrannian/winter RE
else if (document.body.innerHTML.indexOf("Something has happened!")>-1) {alert("Something has happened!");}		//other
else {
	window.setTimeout( function() {window.location.reload() ;}, PERIOD);
	}