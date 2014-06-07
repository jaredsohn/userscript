//    clipperz-helper, helping clipperz login to fussy websites
//    Copyright (C) 2011 othrayte
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU Affero General Public License as
//    published by the Free Software Foundation, either version 3 of the
//    License, or any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Affero General Public License for more details.
//
//    You should have received a copy of the GNU Affero General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Any code not covered by this license have the relevant details, license or otherwise provided with them,
// for reuse see the link provided with each one as the license and associated policies may differ
// All peices of code use herein are either covered by the main notice above, by a specific one
// provided inline or were too short to require specific attribution.

// ==UserScript==
// @name           clipperz-helper
// @namespace      http://othrayte.com
// @description    Helps clipperz direct-logins work on websites that use session ids or complex forms
// @include        https://helper.clipperz.com/*
// @include        *Clipperz-helper.*.login*
// @license        AGPL version 3 or any later version; http://www.gnu.org/licenses/agpl.html//
// @version        0.2.1
// ==/UserScript==

/// Code execution starts here
trace("Start");

// Setup menu items
GM_registerMenuCommand("Set Passphrase", setPassphrase);

if (GM_getValue("debug")) {
	GM_registerMenuCommand("Disable debug mode", disableDebugMode);
} else {
	GM_registerMenuCommand("Enable debug mode", enableDebugMode);
}

// Remove unwanted old encrypted data
trace("Cleaning up");
var keys = GM_listValues();
var ts = ((new Date().getTime()/1000)-45)>>5; // Older than ~45sec
for (var i=0, key=null; key=keys[i]; i++) {
	if (/[0-9a-z]{16}[0-9]{8,9}/i.test(key)) {	
		trace("Delete key:"+key.substring(16)+"? -> "+(key.substring(16)<ts));
		if (key.substring(16)<ts) GM_deleteValue(key);
	}
}

if (/^https:\/\/helper\.clipperz\.com/i.test(location)) { // Check if url is for stage 1
	// Stage 1 - Encrypt & store data for stage 2
	trace("Entering Stage 1");

	document.body.innerHTML = ""; // Remove the anoying, 'not found' notice
	
	// Get the 'GET' data from the url
	var data = location.search.substring(1); // Extract from url
	trace("data: "+data);
	var args = getArgs(); // Parse the arguments

	if (args['site']) { // We need the 'site' that we are going to login to
		// Generate a unique string to parse from stage 1 to stage 2, used as encryption key
		var unique = randomString(16);
		trace("unique: "+unique);
		
		// Go to stage 1.1
		storeData(); // Execution continues through this function asynchronously
	} else {
		trace("No site specified");	
	}



} else if (/^.*Clipperz-helper\.[a-z0-9]{16}\.login.*$/i.test(location)){ // Confirm that the url is valid for stage 2
	// Stage 2 - Decrypt and fill form
	trace("Entering Stage 2");

	var timestamp = (new Date().getTime()/1000)>>5; // Stage two time stamp
	//var l = location+""; // Store 'location' as a string;
	var unique = location.hash.replace(/^.*Clipperz-helper\.([a-z0-9]{16})\.login.*$/i,"$1"); // Parse unique string out of url
	trace("unique: "+unique);

	// Retrive encrypted data
	var enc = GM_getValue(unique+timestamp, null);
	trace("enc: "+enc);

	if (enc==null) { // Check if we got anything
		// Go back to stage 1
		trace("Data not transfered, going back to stage 1");
		history.back();
	} else {		
		// Remove unique data from url
		window.location.hash = "";

		// Decrypt the data
		var dat = decrypt(enc, unique);
		trace("dat: "+dat);

		// Parse the data into arguments
		args = getArgs(dat);
		
		// Go to stage 2.1
		fillForm(args); // Execution continues through this function
	}
}


/// Global functions

function storeData() {
	// Stage 1.1 - Store the data
	trace("Entering Stage 1.1 - Storing data");
	
	trace("UTC: "+new Date().getTime()/1000); // Just noting the timestamp

	// Timestamp 5 sec in the future to an acuracy of 2^5=32 secs, 5 sec accounts for time between stages
	var timestamp = (new Date().getTime()/1000+5)>>5;
	if (GM_getValue(unique+timestamp,null)!=null) { // If there is another login going
		document.body.innerHTML = "Clipperz-helper, waiting for another login to complete or expire";
		setTimeout(storeData, 100); // Try again in another 100ms
		return;
	}

	trace("timestamp: "+timestamp);
	
	// Encryption
	var enc = encrypt(data, unique);
	trace("enc: "+enc);
	
	// Storing encrypted data
	GM_setValue(unique+timestamp, enc);

	// Prepare stage 2 url
	s2URI = args['site']+"#Clipperz-helper."+unique+".login"; // Note to self: add a dot to 'site's that end with a '/'
	trace("Stage 2 URL: "+s2URI);
	
	// Go to stage 2
	trace("Going to Stage 2");
	document.location = s2URI;
}


function fillForm(args) {
	// Stage 2.1 - Fill in the form
	trace("Entering Stage 2.1 - Filling in the form");

	if (GM_getValue("passphrase")) { // Need a passphrase stored in the browser
		if (args['passphrase']) { // Need to be passed the passphrase
			if (args['passphrase']==GM_getValue("passphrase")) { // They need to match
				var lastArg = null // Stores the last field that was filled in

				for (arg in args) { // For all
					if (arg[0]=='$') { // fields that need to be filled in
						if (document.getElementById(arg.substring(1))) { // Try to find it by 'id', remebering to cut the '$' off the front
							trace("Found '"+arg.substring(1)+"' field by id");
							
							// Fill in the field
							document.getElementById(arg.substring(1)).value=unescape(args[arg]);

							// Record that the field was filled in
							lastArg = arg.substring(1);
						} else if (document.getElementsByName(arg.substring(1)).length>0) { // Otherwise try to find it by 'name', remebering to cut the '$' off the front
							trace("Found '"+arg.substring(1)+"' fields by name");

							// Fill in all the elements with that name
							var elements = document.getElementsByName(arg.substring(1));
							for(var i = 0; i < elements.length; i++) {
								elements.item(i).value=unescape(args[arg]);
							}

							// Record that the field was filled in
							lastArg = arg.substring(1);
						}
					}
				}
				var place = null; // Initialise 'place' to null, the default action is, do nothing
				if (args['submit']) { // If the element to use to submit was explicitly specified
					if (document.getElementById(args['submit'])) { // Try to find it by 'id'
						trace("Found submit element '"+args['submit']+"' by id");
						
						// 'Choose' it
						place = unsafeWindow.document.getElementById(args['submit']);
					} else if (document.getElementsByName(args['submit']).length>0) { // Try to find it by 'name'
						trace("Found submit element '"+args['submit']+"' by name");
						
						// 'Choose' it
						place = document.getElementsByName(args['submit'])[0]; // Only choose the first one
					} else {
						trace("Submit element not found");
					}
				} else if (lastArg) { // Otherwise if there was at least one successful field filled
					trace("No 'submit' specified, using last field '"+lastArg+"' as a starting point");
					if (document.getElementById(lastArg)) { // Try to find it by 'id'
						trace("Found submit element '"+lastArg+"' by id");
						
						// 'Choose' it
						place = document.getElementById(lastArg);
					} else if (document.getElementsByName(lastArg).length>0) { // Try to find it by 'name'
						trace("Found submit element '"+lastArg+"' by name");
						
						// 'Choose' it
						place = document.getElementsByName(lastArg)[0]; // Only choose the first one
					} else {
						trace("Submit element not found");
					}
				} else {
					trace("No 'submit' specified and nothing else suitable found, no forms will be submitted");
				}
				if (place) { // If there is something to use to submit
					if (place.tagName=='BUTTON'||place.tagName=='A') { // If it is a button or anchor (link)
						trace("Will submit using a button");

						// Wait 500ms then click on the button/link
						setTimeout(function () {
							trace("Pressing button now");
							var evt = place.ownerDocument.createEvent('MouseEvents');
							evt.initMouseEvent('click', true, true, place.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
							place.dispatchEvent(evt);
						}, 500);
					} else {
						// Assume that the element is within a form, work back until you find the containing form
						while (place!=null&&place.tagName!='FORM') place = place.parentNode;
						if (place) {						
							trace("Found a '"+place.tagName+"' to submit");
							place.submit();
						} else {
							trace("The specifed submit element was not within a form");
						}
					}
				} else {
					trace("No form is being submitted");
				}
			} else {
				trace("Invalid passphrase");
			}
		} else {
			trace("No passphrase passed");
		}
	} else {
		trace("No passphrase set");

		// Ask for a passphrase
		setPassphrase(args['passphrase']);
	}
}



function setPassphrase(passphrase) {
	if (passphrase) {
		if (confirm("The is no stored passphrase for clipperz-helper,\ndo you want to use the one that the link provided '"+passphrase+"'")) {
			GM_setValue("passphrase", passphrase);
			return;
		}
	}
	if (responce = prompt("Please choose a new passphrase for clipperz-helper:", "")) GM_setValue("passphrase", responce);
}

function enableDebugMode() {
	if (!GM_getValue("debug")) {
		GM_setValue("debug", true);
	}
}

function disableDebugMode() {
	if (GM_getValue("debug")) {
		GM_setValue("debug", false);
	}
}

function trace(v) {
	if (GM_getValue("debug",false)) GM_log(v);
}


// // This function is derived from example 14-1 from the book 'JavaScript: The Definitive Guide',
// // 5th Edition, by David Flanagan. Copyright 2006 O'Reilly Media, Inc. (ISBN #0596101996)
// // See http://oreilly.com/pub/a/oreilly/ask_tim/2001/codepolicy.html
function getArgs(str) {
	var args = new Object();
	var query;
	if (str!=null) {
		query = str;
	} else {
		query = location.search.substring(1);
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[unescape(argname)] = unescape(value);
	}
	return args;
}

// // This function is derived from the one at
// // http://www.mediacollege.com/internet/javascript/number/random.html
function randomString(l) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = l;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

// // The following functions 'encrypt', 'decrypt', 'code', 'decode', 'Str4ToLong',
// // 'LongToStr4', 'escCtrlCh', 'unescCtrlCh' are © 2000-2005 Chris Veness,
// // http://www.movable-type.co.uk/scripts/tea.html

// use (16 chars of) 'password' to encrypt 'plaintext'

function encrypt(plaintext, password) {
  var v = new Array(2), k = new Array(4), s = "", i;

  plaintext = escape(plaintext);  // use escape() so only have single-byte chars to encode 

  // build key directly from 1st 16 chars of password
  for (var i=0; i<4; i++) k[i] = Str4ToLong(password.slice(i*4,(i+1)*4));

  for (i=0; i<plaintext.length; i+=8) {  // encode plaintext into s in 64-bit (8 char) blocks
    v[0] = Str4ToLong(plaintext.slice(i,i+4));  // ... note this is 'electronic codebook' mode
    v[1] = Str4ToLong(plaintext.slice(i+4,i+8));
    code(v, k);
    s += LongToStr4(v[0]) + LongToStr4(v[1]);
  }

  return escCtrlCh(s);
  // note: if plaintext or password are passed as string objects, rather than strings, this
  // function will throw an 'Object doesn't support this property or method' error
}

// use (16 chars of) 'password' to decrypt 'ciphertext' with xTEA

function decrypt(ciphertext, password) {
  var v = new Array(2), k = new Array(4), s = "", i;

  for (var i=0; i<4; i++) k[i] = Str4ToLong(password.slice(i*4,(i+1)*4));

  ciphertext = unescCtrlCh(ciphertext);
  for (i=0; i<ciphertext.length; i+=8) {  // decode ciphertext into s in 64-bit (8 char) blocks
    v[0] = Str4ToLong(ciphertext.slice(i,i+4));
    v[1] = Str4ToLong(ciphertext.slice(i+4,i+8));
    decode(v, k);
    s += LongToStr4(v[0]) + LongToStr4(v[1]);
  }

  // strip trailing null chars resulting from filling 4-char blocks:
  s = s.replace(/\0+$/, '');

  return unescape(s);
}


function code(v, k) {
  // Extended TEA: this is the 1997 revised version of Needham & Wheeler's algorithm
  // params: v[2] 64-bit value block; k[4] 128-bit key
  var y = v[0], z = v[1];
  var delta = 0x9E3779B9, limit = delta*32, sum = 0;

  while (sum != limit) {
    y += (z<<4 ^ z>>>5)+z ^ sum+k[sum & 3];
    sum += delta;
    z += (y<<4 ^ y>>>5)+y ^ sum+k[sum>>>11 & 3];
    // note: unsigned right-shift '>>>' is used in place of original '>>', due to lack 
    // of 'unsigned' type declaration in JavaScript (thanks to Karsten Kraus for this)
  }
  v[0] = y; v[1] = z;
}

function decode(v, k) {
  var y = v[0], z = v[1];
  var delta = 0x9E3779B9, sum = delta*32;

  while (sum != 0) {
    z -= (y<<4 ^ y>>>5)+y ^ sum+k[sum>>>11 & 3];
    sum -= delta;
    y -= (z<<4 ^ z>>>5)+z ^ sum+k[sum & 3];
  }
  v[0] = y; v[1] = z;
}

function Str4ToLong(s) {  // convert 4 chars of s to a numeric long
  var v = 0;
  for (var i=0; i<4; i++) v |= s.charCodeAt(i) << i*8;
  return isNaN(v) ? 0 : v;
}

function LongToStr4(v) {  // convert a numeric long to 4 char string
  var s = String.fromCharCode(v & 0xFF, v>>8 & 0xFF, v>>16 & 0xFF, v>>24 & 0xFF);
  return s;
}

function escCtrlCh(str) {  // escape control chars which might cause problems with encrypted texts
  return str.replace(/[\0\t\n\v\f\r\xa0'"!]/g, function(c) { return '!' + c.charCodeAt(0) + '!'; });
}

function unescCtrlCh(str) {  // unescape potentially problematic nulls and control characters
  return str.replace(/!\d\d?\d?!/g, function(c) { return String.fromCharCode(c.slice(1,-1)); });
}
