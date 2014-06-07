// ==UserScript==
// @name           Pimped TBG
// @namespace      http://www.tbg.nu
// @description    TBG done right
// @include        http://www.tbg.nu/*
// @include        https://www.tbg.nu/*
// @match          http://www.tbg.nu/*
// @match          https://www.tbg.nu/*
// @icon           data:image/png;base64,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
// @version        1.5.0
// @downloadURL    https://userscripts.org/scripts/source/98467.user.js
// @updateURL      http://userscripts.org/scripts/source/98467.meta.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// ==/UserScript==


// Instructions:
// -------------
// This script makes it possible to hide threads on www.tbg.nu and to read them
// in a "linear" fashion on a page that shows all posts simultaneously.
// It also keeps track on the posts you have read and written, marking the 
// threads you have written in by an orange * and the posts with an orange
// border in "threader mode" and with an orange "ball" in the old mode.
// You can also mark threads with a star shown in main window.
// 
// The script has been tested and works with Chrome 32.0.1700.107,
// Firefox 26.0 with GreaseMonkey 1.15, Opera 12.16 (build 1860), and
// Opera 15.0.1147.153. I'm almost certain it will not work with older browsers
// such as Firefox 10.0. Note that going back to an older version of this
// script can a hassle. After uninstalling the current version, you might need
// to bring up a JavaScript console in your browser when visiting
// http://www.tbg.nu and run "localStorage.clear()", which will erase all
// your history and hidden threads etc. Then install the old version.
//
// Hotkeys:
//   a/s - (old style message view) move to prev/next message
//   d/f - (old style message view) move to prev/next unread message
//   q   - (old style and threader message view) close tab/window.
//   w   - (old style message view) write reply
//   z   - (old style and threader message view) toggle star
//   x   - (old style and threader message view) hide or unhide thread
//   r   - (main window) refresh
//   1-9 - (all views) open then nth thread from the top in thread list
// Right clicking or shift clicking on the prev/next buttons in old style
// message view goes to the prev/next unread message.
//
// To change the name shown for an anonymous user, click on it, then type
// the new name in the box and optionally a CSS color ("blue", "#00f",
// "rgb(0, 0, 255)", see http://www.w3.org/TR/css3-color/#colorunits )
//
// To install in Chrome, download this file to your computer, go to
// "Menu" -> Tools -> Extensions, then drag the file into there.
//
// To install in Firefox, make sure you have the GreaseMonkey extension,
// then click Install at the www.userscripts.org site, or download this file
// to your computer and drag it into the Firefox window.
//
// To install in Opera 12, follow the steps at
// http://my.opera.com/Contrid/blog/2007/02/11/how-to-greasemonkey-in-opera
//
// To install in Opera 15, follow the steps at
// http://my.opera.com/marunkmr/blog/using-user-scripts-with-opera-15
// 
// Note about the "PTBG ID" field added to TBG:
// When it's empty, everything is stored locally only. When it contains text,
// this script syncs your read/write/hide/star status for
// all threads/messages with the server pimpedtbg.appspot.com. If you enter
// the same ID in several browsers, they will be kept in sync.
// You are strongly recommended to choose an ID that is difficult to guess,
// e.g. 12 random alphanumeric characters or similar.
//
// This script is released as public domain. I have written essentially
// everything in it with the exception of a few short snippets clearly marked
// with information about where I copied them from. The icon is however stolen
// from http://www.wikihow.com/Make-a-Transparent-Image-Using-Gimp. I don't
// think the author of that page is the original creator however, and I have
// failed to locate that person or find a license for the image.


// Buglist:
//  - 13-05-11a (search for this below) - Threader mode posting stuck.
//  - When clicking on a star, it sometimes shows a white rectangle
//     for a very brief moment before the new star is shown. This might help:
//     http://stackoverflow.com/questions/14664337/please-help-me-with-javascript-to-copy-image-url-onclick-from-imagecontainer01-t
//  - Main window sometimes stops updating in Chrome and shows a
//     "TBG communication error" in the lower left corer. Reloading the page
//     might fix it temporarily but it often appears again very quickly. Only
//     after closing the tab and opening a new one everything starts working
//     properly again. I think it's a bug in Chrome but don't know for sure.
//  - When writing in a thread where you haven't read all the messages,
//     the thread is colored visited/blue in main window, but should be
//     colored unvisited/white if you have the option "read first unread" on.
//  - hog and PM reported that Youtube thumbnails are usually/often/sometimes
//     not shown. http://www.tbg.nu/news_show/182443/251


// Feature ideas:
//  - Faster creation of innerHTML in threader mode, all in one sweep at first open.
//  - Hiding subthreads
//  - Start threader from main window with unread message id instead of id 1 when id 1 is in cache.
//  - Reuse event handler in main window to avoid memory problems.
//  - Show small animation when hiding and unhiding rows to see what is changing and avoid
//       clicking on the wrong thing when updating from server.
//  - Hovering over a message should highlight messages from the same author
//     * Tried it out but couldn't make it look good.


// Version history:
//  - 1.0 (released 2011-04-11)
//     * Changed name
//     * Threader
//     * Keep track of read and written posts
//  - 1.1 (released 2011-04-30)
//     * Search for posts by a user by clicking on the name.
//  - 1.2 (released 2012-06-29)
//     * Remove extra < in user name in threader mode for registered users.
//  - 1.2.1 (released 2012-07-04)
//     * Fixed a bug in the last bug fix.
//  - 1.2.2 (released 2012-10-14)
//     * Fixed character encoding (commenting out all xhr.overrideMimeType lines)
//     * Added @grant headers
//  - 1.3 (released 2013-08-23)
//     * Show topic at the top of threader view
//     * Show topic changes in threader view
//     * Caching of messages (speeds up when opening threader)
//     * Star threads
//     * Proper syncing of star/hide/read/write between several clients
//     * Main window dynamic refresh with notifications
//     * Image uploads and thumbnails
//     * Show proper indentation in messages
//     * MathJax integration
//     * Bugfixes
//        # More accurate smart quote (hiding quoted text in threader mode)
//        # Proper encoding on message submit
//  - 1.3.1 (released 2013-08-24)
//     * Checkbox changing written thread indication between old and new style
//  - 1.3.2 (released 2013-08-30)
//     * Icon
//     * Star in thread view
//     * Frames link at the top of main page
//     * Nicer options layout and a show/hide button (thanks PM!)
//     * Show thumbnails for 3rd party sites, with option to turn off.
//     * Bugfixes
//        # Workaround, can't remove TBG's inline event handlers in Chrome 29
//  - 1.3.3 (released 2013-09-29)
//     * Show number of unread messages in thread list
//     * Go prev/next unread message when shift-clicking prev/next buttons
//     * Prefetch messages and switch without reloading if available
//     * Hotkeys
//     * Option for opening first unread message
//     * Youtube thumbnails
//     * Bugfixes
//        # Selecting a different write indication style resets other settings
//        # All images work with non-integer devicePixelRatio
//        # Old TBG settings are handled properly
//        # Clicking ok in server setup confirmation dialog works again
//  - 1.4.0 (released 2014-02-18)
//     * Random or user assigned names and colors for anonymous users
//     * Non-posted replies are saved locally to prevent loss
//     * Greasemonkey headers enabling auto update (only works in Firefox)
//     * Bugfixes
//        # Reply in threader mode on a message with thumbnail didn't work
//        # Popup hotkeys stops working after context clicking on prev/next
//        # Fixed broken old hotkeys for prev/next msg
//  - 1.5.0 (released 2014-04-19)
//     * Link to mobile site
//     * Low quality thumbnails option


// Release procedure:
//  - Check buglist if any small bugs need to be fixed before shipping.
//  - Search for ???, !!!, ###, TODO, FIXME, and MARK and correct.
//  - Search for alerts inserted during debugging.
//  - Change isDebugging to return false.
//  - Make sure the pimpedtbg server is up to date
//  - Remove localhost from @include and @match at the top of the script,
//      and make sure the pimpedtbg server is being used.
//  - Test throughly (see test procedures)
//  - Update the instructions at the top of this script.
//  - bump version number in Greasemonkey header, manifest, version history,
//      and kScriptVersion, and app.yaml
//  - Add release date in the comments above
//  - Update screen shots. Make sure my PTBGID or email is not in any of them.
//  - After release, tag the release version and backup.


// Test procedures:
//  - Copy script to Chrome.
//  - Test all options
//  - Test in Firefox, Chrome, Opera and Opera Turbo
//  - Test logged in and logged out
//  - Check that threader links exist and work both in main and search page.
//  - ReadWriteStatus coloring in main, search and popup page.
//  - Check for correct coloring in threader view.
//  - Check that stuff get "garbage collected" (hidden thread cookie etc).
//  - Test with frames and frames2, http://www.tbg.nu/frames/ , http://www.tbg.nu/frames2/


// Some documentation from Apachez of how TBG works:
//   news.cgi query parameters, http://www.tbg.nu/news_show/171509/1?threader=1
//     h = view last XX hours
//     r = reload every XX min
//     s = snow on/off
//     t = theme no X
//     a = autosize on/off
//     l = load page number
//     f = frames on/off



// Threads with tricky quoting:
// http://www.tbg.nu/news_show/130240/1?threader=1 ([scrubs] is quite an atypical registered user name)
// http://www.tbg.nu/news_show/182014/1?threader=1 (lots of strange unicode characters)
// http://www.tbg.nu/news_show/149831/1?threader=1 (post with only a fake quote)
// http://www.tbg.nu/news_show/179041/1?threader=1 (url in subject - BUG)


// List of user names with unusual characteristics:
// [scrubs]
// den lilla ludna
// Trott_fet_&_39 (with the o replaced by the similar looking Swedish character)
// Asha'man
// specitek.se | Rickard Uddenberg
// -77
// J



const kScriptVersion = "1.5.0";

const kPTBGServerProtocolAndHost = "http://pimpedtbg.appspot.com";
//const kPTBGServerProtocolAndHost = "http://1-5-0-3.pimpedtbg.appspot.com";
//const kPTBGServerProtocolAndHost = "http://localhost:8080";



// Python function for creating data uri from binary image file:
// import base64
// def uri(filename, chars_per_line=70):
//     with open(filename, "rb") as f:
//         t = base64.b64encode(f.read())
//         print "    'data:image/%s;base64,' +" % filename.split(".")[-1].lower()
//         for i in range(0, len(t), chars_per_line):
//             print "    '%s' +" % t[i:i+chars_per_line]

// This icon is stolen, see above.
var kIcon = 'data:image/png;base64,' +
    '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';





// This keeps track of which function a function calls. When pressing the "hide" button in popups,
// the script needs to inject code which can access the "document.opener" and hide the thread in
// main window. The injected code function calls other functions which in turn calls other functions.
// This makes it possible to change one function together with it's dependencies, instead of having
// to change the injection code which would be a lot harder since one functions can be called by
// two other functions and so on.
var dependencies = {};


function isDebugging() {
	return false;
}


function isOpera() {
	return /opera/.test(navigator.userAgent.toLowerCase())
}

function isFirefox() {
	return /firefox/.test(navigator.userAgent.toLowerCase())
}

function isChrome() {
	return /chrome/.test(navigator.userAgent.toLowerCase())
}



function SHA256(initData) {
	
	const k = [
		0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
		0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
		0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
		0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
		0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
		0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
		0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
		0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
	
	var state = {
		h : new Uint32Array([
				0x6a09e667,
				0xbb67ae85,
				0x3c6ef372,
				0xa54ff53a,
				0x510e527f,
				0x9b05688c,
				0x1f83d9ab,
				0x5be0cd19]),
		
		partialInput : new Uint8Array(64),
		totalBytes : 0
	};
	
	function ch(x, y, z) {
		return z ^ (x & (y ^ z));
	}
	
	function maj(x, y, z) {
		return ((x | y) & z) | (x & y);
	}
	
	function ror(x, bits) {
		return (x >>> bits) | (x << (32-bits)) & 0xFFFFFFFF; 
	}
	
	function bigSigma0(x) {
		return ror(x, 2) ^ ror(x, 13) ^ ror(x, 22);
	}
	
	function bigSigma1(x) {
		return ror(x, 6) ^ ror(x, 11) ^ ror(x, 25);
	}
	
	function smallSigma0(x) {
		return ror(x, 7) ^ ror(x, 18) ^ (x >>> 3);
	}
	
	function smallSigma1(x) {
		return ror(x, 17) ^ ror(x, 19) ^ (x >>> 10);
	}
	
	function update(state, input) {
		var w = new Uint32Array(64);
		var inputIndex = 0;
		var i;
		var a,b,c,d,e,f,g,h;
		var leftOverBytes = state.totalBytes % state.partialInput.length;
		while (inputIndex < input.length) {
			var bytesToCopy = Math.min(input.length-inputIndex,
								state.partialInput.length-leftOverBytes);
			for (i = 0; i < bytesToCopy; i++) {
				state.partialInput[leftOverBytes+i] = input[inputIndex+i];
			}
			state.totalBytes += bytesToCopy;
			inputIndex += bytesToCopy;
			leftOverBytes = 0;
			if (state.totalBytes % w.length === 0) {
				for (i = 0; i < 16; i++) {
					w[i] = (state.partialInput[i*4+0] << 24) |
							(state.partialInput[i*4+1] << 16) |
							(state.partialInput[i*4+2] << 8) |
							(state.partialInput[i*4+3]);
				}
				for (i = 16; i < 64; i++) {
					var s0 = ror(w[i-15], 7) ^ ror(w[i-15], 18) ^
							(w[i-15] >>> 3);
					var s1 = ror(w[i-2], 17) ^ ror(w[i-2], 19) ^
							(w[i-2] >>> 10);
					w[i] = (w[i-16] + s0 + w[i-7] + s1) & 0xFFFFFFFF;
				}
				
				a = state.h[0];
				b = state.h[1];
				c = state.h[2];
				d = state.h[3];
				e = state.h[4];
				f = state.h[5];
				g = state.h[6];
				h = state.h[7];
				
				for (i = 0; i < 64; i++) {
					var S1 = ror(e, 6) ^ ror(e, 11) ^ ror(e, 25);
					var ch = (e & f) ^ ((~e) & g);
					var temp1 = (h + S1 + ch + k[i] + w[i]) & 0xFFFFFFFF;
					var S0 = ror(a, 2) ^ ror(a, 13) ^ ror(a, 22);
					var maj = (a & b) ^ (a & c) ^ (b & c);
					var temp2 = (S0 + maj) & 0xFFFFFFFF;
					
					h = g;
					g = f;
					f = e;
					e = (d + temp1) & 0xFFFFFFFF;
					d = c;
					c = b;
					b = a;
					a = (temp1 + temp2) & 0xFFFFFFFF;
				}
				
				state.h[0] = (state.h[0] + a) & 0xFFFFFFFF;
				state.h[1] = (state.h[1] + b) & 0xFFFFFFFF;
				state.h[2] = (state.h[2] + c) & 0xFFFFFFFF;
				state.h[3] = (state.h[3] + d) & 0xFFFFFFFF;
				state.h[4] = (state.h[4] + e) & 0xFFFFFFFF;
				state.h[5] = (state.h[5] + f) & 0xFFFFFFFF;
				state.h[6] = (state.h[6] + g) & 0xFFFFFFFF;
				state.h[7] = (state.h[7] + h) & 0xFFFFFFFF;
			}
			else {
				console.assert(inputIndex === input.length);
			}
		}
	}
	
	var that = {};
	that.update = function(data) {
		if (typeof(data) === "string") {
			var utf8 = unescape(encodeURIComponent(data));
			var dataArray = new Uint8Array(data.length);
			for (var i = 0; i < utf8.length; i++) {
				dataArray[i] = utf8.charCodeAt(i);
			}
			update(state, dataArray);
		}
		else {
			update(state, data);
		}
		return that;
	}
	that.digest = function() {
		var tempState = {
			h : new Uint32Array(state.h),
			partialInput : new Uint8Array(state.partialInput),
			totalBytes : state.totalBytes
		};
		
		var leftOverBytes = tempState.totalBytes % tempState.partialInput.length;
		var finalInput = [0x80];
		while ((leftOverBytes + finalInput.length) %
					tempState.partialInput.length !== 448/8)
		{
			finalInput.push(0);
		}
		
		var totalBits = tempState.totalBytes * 8;
		var high32TotalBits = Math.floor(totalBits / 0x100000000);
		var low32TotalBits = totalBits & 0xFFFFFFFF;
		
		finalInput.push((high32TotalBits >>> 24) & 0xFF);
		finalInput.push((high32TotalBits >>> 16) & 0xFF);
		finalInput.push((high32TotalBits >>> 8) & 0xFF);
		finalInput.push(high32TotalBits & 0xFF);
		finalInput.push((low32TotalBits >>> 24) & 0xFF);
		finalInput.push((low32TotalBits >>> 16) & 0xFF);
		finalInput.push((low32TotalBits >>> 8) & 0xFF);
		finalInput.push(low32TotalBits & 0xFF);
		
		update(tempState, finalInput);
		
		var digest = new Uint8Array(32);
		for (var i = 0; i < 8; i++) {
			digest[i*4] = tempState.h[i] >> 24;
			digest[i*4+1] = (tempState.h[i] >>> 16) & 0xFF;
			digest[i*4+2] = (tempState.h[i] >>> 8) & 0xFF;
			digest[i*4+3] = tempState.h[i] & 0xFF;
		}
		return digest;
	}
	
	if (initData) {
		that.update(initData);
	}
	
	return that;
}

function toHexString(a) {
	var s = "";
	for (var i = 0; i < a.length; i++) {
		if (a[i] <= 0xF) {
			s += "0";
		}
		s += a[i].toString(16);
	}
	return s;
}

/*
var testCases = [
	["abc",
		"BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD"], 
	["",
		"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"],
	["The quick brown fox jumps over the lazy dog",
		"d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"],
	["The quick brown fox jumps over the lazy dog.",
		"ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c"]];

(function() {
	var testResults = "";
	for (var i = 0; i < testCases.length; i++) {
		testResults += "'" + testCases[i][0] + "'\n";
		testResults += toHexString(SHA256(testCases[i][0]).digest()) + "\n";
		testResults += testCases[i][1] + "\n\n";
	}
	
	alert("SHA256 test\n\n" + testResults);
})();
*/


function alertIfNotUnloading(message) {
	if (!isUnloading()) {
		alert(message);
	}
}


function writeToLocalStorage(key, value) {
	try {
		localStorage[key] = value;
	}
	catch (err) {
        console.log("localStorage is full! Moving all message caches to sessionStorage");
		moveMessageCachesToSessionStorage(function() { return true; });
		localStorage[key] = value;
	}
}



function setupConsole() {
    if (!window.console) {
        window.console = {};
    }
    
    console.log    = console.log    || GM_log       || function() {};
    console.debug  = console.debug  || console.log;
    console.warn   = console.warn   || console.log;
    console.error  = console.error  || console.log;
    console.assert = console.assert || function() {
        if (isDebugging()) {
            var condition = arguments[0];
            if (!condition) {
                var e = new Error('dummy');
                var stack = e.stack; /*.replace(/^[^\(]+?[\n$]/gm, '')
                                        .replace(/^\s+at\s+/gm, '')
                                        .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@'); */
                alert("Assert\n\n" + arguments[1] + "\n\n" + stack);
            }
        }
    }
}

setupConsole();



// Firefox has the original GM_* API.
// Chrome has at least one function, GM_openInTab
// Opera has none of the GM_* functions.
function isRunningGreaseMonkey() {
	var isGreaseMonkey = typeof GM_getValue != 'undefined' &&
		typeof GM_getValue('a', 'b') != 'undefined';
	return isGreaseMonkey;
}


function createErrorDivs() {
	setupUnloadTracking();
	
	var outerDivP = document.createElement('span');
	outerDivP.id = "outerPtbgErrorDiv";
	outerDivP.style.cssFloat = "right";
	outerDivP.style.color = "white";
	outerDivP.style.right = "0em";
	outerDivP.style.border = "2px outset red";
	outerDivP.style.backgroundColor = "red";
	outerDivP.style.lineHeight = "1.5em";
	outerDivP.style.display = "none";
	
	var innerDivP = document.createElement('div');
	innerDivP.id = "innerPtbgErrorDiv";
	innerDivP.style.marginLeft = "0.5em";
	innerDivP.style.marginRight = "0.5em";
	innerDivP.style.fontWeight = "bolder";
	innerDivP.style.fontFamily = "serif";
	outerDivP.appendChild(innerDivP);
	
	var outerDivT = document.createElement('span');
	outerDivT.id = "outerTbgErrorDiv";
	outerDivT.style.cssFloat = "left";
	outerDivT.style.color = "white";
	outerDivT.style.left = "0em";
	outerDivT.style.border = "2px outset red";
	outerDivT.style.backgroundColor = "red";
	outerDivT.style.lineHeight = "1.5em";
	outerDivT.style.display = "none";
	
	var innerDivT = document.createElement('div');
	innerDivT.id = "innerTbgErrorDiv";
	innerDivT.style.marginLeft = "0.5em";
	innerDivT.style.marginRight = "0.5em";
	innerDivT.style.fontWeight = "bolder";
	innerDivT.style.fontFamily = "serif";
	outerDivT.appendChild(innerDivT);
	
	var veryOuterDiv = document.createElement('div');
	
	veryOuterDiv.appendChild(outerDivP);
	veryOuterDiv.appendChild(outerDivT);
	veryOuterDiv.style.position = "fixed";
	veryOuterDiv.style.bottom = "0px";
	veryOuterDiv.style.left = "0em";
	veryOuterDiv.style.width = "100%";
	
	document.body.appendChild(veryOuterDiv);
}

function clearErrorMsg(divId) {
	var div = document.getElementById(divId);
	div.style.display = "none";
}

function setErrorMsg(outerDivId, innerDivId, msg) {
	if (!isUnloading()) {
		var outerDiv = document.getElementById(outerDivId);
		outerDiv.style.display = "";
		var innerDiv = document.getElementById(innerDivId);
		innerDiv.textContent = msg;
	}
}

function clearTBGErrorMsg() {
	clearErrorMsg("outerTbgErrorDiv");
}

function setTBGErrorMsg(msg) {
	setErrorMsg("outerTbgErrorDiv", "innerTbgErrorDiv", msg);
}

function clearPTBGErrorMsg() {
	clearErrorMsg("outerPtbgErrorDiv");
}

function setPTBGErrorMsg(msg) {
	setErrorMsg("outerPtbgErrorDiv", "innerPtbgErrorDiv", msg);
}


function getLocalValue(name, defaultValue) {
	if (isRunningGreaseMonkey()) {
		return GM_getValue(name, defaultValue);
	}
	else {
        var result = localStorage["ptbg_lv_" + name];
        if (typeof(result) !== "undefined") {
            return result;
        }
        else {
            return defaultValue;
        }
	}
}

dependencies["getThreadTableRows"] = [];
function getThreadTableRows(doc) {
	var rows = doc.evaluate(
		"//table[@class='thr']/tbody/tr",
		doc,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	return rows;
}

dependencies["getThreadLinkFromRow"] = [];
function getThreadLinkFromRow(row) {
	var threadLinkCell = row.cells.length == 4 ? row.cells[1] : row.cells[0];
	var threadLink = threadLinkCell.firstChild;
	while (threadLink.nodeName != 'A') {
		threadLink = threadLink.nextSibling;
	}
    return threadLink;
}

dependencies["getThreadIdFromRow"] = ["getThreadLinkFromRow"];
function getThreadIdFromRow(row) {
    var threadLink = getThreadLinkFromRow(row);
	var threadHref = threadLink.href;
	var threadId = parseInt(threadHref.split('/')[4]);
	return threadId;
}

function getMessageIdFromRow(row) {
	var threadLink = getThreadLinkFromRow(row);
	var threadHref = threadLink.href;
	var messageId = parseInt(threadHref.split('/')[5]);
	return messageId;
}

function updateRowHiddenStatus(row, hidden) {
    var threadId = getThreadIdFromRow(row);
    var style;
    if (hidden) {
        style = 'none';
    }
    else {
        style = '';
    }
    if (row.style.display != style) {
        row.style.display = style;		
    }
}

function updateRowStarStatus(row, star) {
    var threadId = getThreadIdFromRow(row);
    var starSpan = document.getElementById("star" + threadId);
    var previousType = starSpan.childNodes[0].getAttribute("data-type");
    if (star && previousType != "yellow") {
        starSpan.innerHTML = yellowStarImg(kMainWindowStarSize);
    }
    else if (!star && previousType != "hollow") {
        starSpan.innerHTML = hollowStarImg(kMainWindowStarSize);
    }
}

function updateRowWrittenStatus(row, written, oldStyle, asteriskStyle, even) {
	var threadId = getThreadIdFromRow(row);
	var writtenDiv = document.getElementById("written" + threadId);
	writtenDiv.textContent = (written && asteriskStyle) ? "*" : "";
	var newCssStyle = row.className;
	if (oldStyle && written) {
		newCssStyle = "w" + newCssStyle.substr(1);
	}
	else {
		newCssStyle = (even ? "e" : "o") + newCssStyle.substr(1);
	}
	if (newCssStyle != row.cssStyle) {
		row.className = newCssStyle;
	}
}

function hideThreads() {
    var hideUnhide = HideUnhide();
	var rows = getThreadTableRows(document);
    var length = rows.snapshotLength;
	for (var i = 1; i < length; i++) {
		var row = rows.snapshotItem(i);
        var threadId = getThreadIdFromRow(row);
        var hidden = hideUnhide.isHidden(threadId);
        updateRowHiddenStatus(row, hidden);
	}
}

const kVisitedLinkColor = "rgb(119, 119, 255)";


function createBackgroundColorer(color) {
	return function(event) {
		event.currentTarget.style.backgroundColor = color;
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}

function colorVisitedThreadLinksSearchWindow() {
	var as = document.evaluate(
		"//table/tbody/tr/td/a[1][contains(@href,'/news_show/')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	var globalSettings = GlobalSettings();
	var oldStyle = globalSettings.isOldStyleOn();
	var asteriskStyle = globalSettings.isAsteriskStyleOn();
	
	var onMouseOutWritten = createBackgroundColorer("#404040");
	
    var length = as.snapshotLength;
	for (var i = 0; i < length; i += 1) {
		var a = as.snapshotItem(i);
		var split = a.href.split('/');
		var threadId = parseInt(split[4]);
		var messageId = parseInt(split[5]);
		var threadInfo = ThreadInfo(threadId);
        if (threadInfo.hasRead(messageId)) {
			a.style.color = kVisitedLinkColor;
		}
		
		if (oldStyle) {
			var tr = a.parentNode.parentNode;
			if (threadInfo.hasWrittenInThread()) {
				tr.style.backgroundColor = "#404040";
				tr.onmouseout = null;
				tr.addEventListener("mouseout",
					onMouseOutWritten,
					false);
			}
		}
		if (asteriskStyle) {
			var td = a.parentNode;
			var text = threadInfo.hasWrittenInThread() ? "*" : "";
			if (td.firstChild.nodeName.toLowerCase() == "span") {
				var span = td.firstChild;
				span.textContent = text;
			}
			else {
				var span = document.createElement("span");
				span.style.display = "inline-block";
				span.style.height = "1em";
				span.style.minWidth = "0.7em";
				span.style.verticalAlign = "bottom";
				span.style.color = "orange";
				span.style.marginLeft = "2px";
				span.style.marginRight = "2px";
				span.textContent = text;
				td.insertBefore(span, td.firstChild);	
			}
		}
	}
}

dependencies["getThreadRow"] = [];
function getThreadRow(doc, id) {
	var a = doc.evaluate(
		"//table[@class='thr']/tbody/tr/td[2]/a[" + 
			"starts-with(@href,'/news_show/"+id+"/')]",
		doc,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
    if (!a) {
        return null;
    }
    else {
        var tr = a.parentNode.parentNode;
        return tr;
    }
}

dependencies["hideThread"] = ["getThreadRow"];
function hideThread(doc, id) {
	var tr = getThreadRow(doc, id);
	tr.style.display = 'none';
}

dependencies["unhideThread"] = ["getThreadRow"];
function unhideThread(doc, id) {
	var tr = getThreadRow(doc, id);
	tr.style.display = '';
}

dependencies["countHiddenThreads"] = [];
function countHiddenThreads(doc) {
	var numHiddenThreads = doc.evaluate(
		"count(//table[@class='thr']/tbody/tr[contains(@style, 'none')])",
		doc,
		null,
		XPathResult.NUMBER_TYPE,
		null).numberValue;
	return numHiddenThreads;
}

function isInArray(element, array) {
	for (var i = 0; i < array.length; i++) {
		if (element === array[i]) {
			return true;
		}	
	}
	return false;
}

dependencies["formatStatsString"] = [];
function formatStatsString(numHiddenThreads, numTotalThreads) {
	return "&nbsp;&nbsp;-&nbsp;&nbsp;" + 
		"Hidden threads: " + numHiddenThreads + "/" + numTotalThreads;    
}

dependencies["getStats"] = ["countHiddenThreads", "formatStatsString"];
function getStats(doc) {
	var numTotalThreads = doc.evaluate(
		"count(//table[@class='thr']/tbody/tr) - 1",
		doc,
		null,
		XPathResult.NUMBER_TYPE,
		null).numberValue;

	var numHiddenThreads = countHiddenThreads(doc);
    
    return formatStatsString(numHiddenThreads, numTotalThreads);
}

dependencies["getStatsTableColumn"] = [];
function getStatsTableColumn(doc) {
	var td = doc.evaluate(
		"//table[@class='thr']/tbody/tr[1]/td[2]",
		doc,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	return td;
}

function addStats(numHiddenThreads, numTotalThreads) {
	var td = getStatsTableColumn(document);

	var span = td.childNodes[1];
	// Remove the date in header to make more room for stats.
	span.textContent = span.textContent.replace(
		/, \w{3} \d{1,2} \w{3}/, "");
	var newSpan = span.cloneNode(true);
	
	newSpan.innerHTML = formatStatsString(numHiddenThreads, numTotalThreads);
	td.insertBefore(newSpan, span.nextSibling);
}

dependencies["updateStats"] = ["getStatsTableColumn", "getStats"];
function updateStats(doc) {
	var td = getStatsTableColumn(doc);
	var span = td.childNodes[2];
	
	span.innerHTML = getStats(doc);
}

function getAllThreadIds() {
	var rows = getThreadTableRows(document);
	var allThreadIds = [];
	for (var i = 1; i < rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);
		var threadId = getThreadIdFromRow(row);
		allThreadIds.push(threadId);
	}
	return allThreadIds;
}

function makeMainWindowUsersSearchable() {
	var tds = document.evaluate(
		"//table[@class='thr']/tbody/tr[position()>1]/td[@class='f']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
    var length = tds.snapshotLength;
	for (var i = 0; i < length; i++) {
		var td = tds.snapshotItem(i);
		var author = td.innerHTML.replace("&nbsp;", "");
		td.innerHTML = "&nbsp;" + makeSearchLinkHTML(author, null);
	}
}



function makeSearchWindowUsersSearchable() {
	var tds = document.evaluate(
		"//center[1]/table[1]/tbody/tr[4]/td[1]/table[1]/tbody/" + 
			"tr[position()>1]/td[3][not(font)]",		
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	var mi = getUrlParameter("mi");
	var mg = getUrlParameter("mg");
	var mu = getUrlParameter("mu");
	var ms = getUrlParameter("ms");
	var q = getUrlParameter("q");
	var f = getUrlParameter("f");
		
    var length = tds.snapshotLength;
	for (var i = 0; i < length; i++) {
		var td = tds.snapshotItem(i);
		var author = td.innerHTML.replace("&nbsp;", "");
		td.innerHTML = '&nbsp;<a href="news_search.cgi' +
			'?mi=' + mi +
			'&mg=' + mg +
			'&mu=' + mu +
			'&ms=' + + ms +
			'&q=' + q +
			'&u=' + encodeURIComponentIsoLatin(author) +
			'&f=' + f +
			'" style="color: white">' + author + '</a>';
	}
    
    changeKnytLinkToMobile();
}

function makeThreadWindowUsersSearchable() {
	var tds = document.evaluate(
		"//form/table[2]/tbody/tr/td[2][not(font)]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
    var length = tds.snapshotLength;
	for (var i = 0; i < length; i++) {
		var td = tds.snapshotItem(i);
		var author = td.innerHTML.replace("&nbsp;", "");
		td.innerHTML = "&nbsp;" + makeSearchLinkHTML(author,
									isFramesVersion() ? "main" : "_blank");
	}
}




// Returns an array, with each element being an array with
// [threadId, hidden (true/false), action time (in seconds since epoch)]
function oldGetHiddenThreads() {
    var kStateName = "hiddenthreads";

    serializedState = getLocalValue(kStateName, "[0,[]]");
    
    var a = JSON.parse(serializedState);
    lastUnhideAllTime = parseInt(a[0]);
    threads = [];
    for (var t in a[1]) {
        var threadId = parseInt(a[1][t][0]);
        var hidden = a[1][t][1];
        if (hidden[0] && hidden[1] > lastUnhideAllTime) {
            threads.push([threadId, hidden[0], hidden[1]]);
        }
    }
    return threads;    
}


// Returns array with [hidden (true/false), action time (in seconds since epoch)]
function oldGetHiddenStatus(threadId) {
    console.assert(threadId >= 1);

    var statuses = oldGetHiddenThreads();
    for (var i = 0; i < statuses.length; i++) {
        if (statuses[i][0] == threadId) {
            return [statuses[i][1], statuses[i][2]];
        }
    }
    return [false, 0];
}


function getTime() {
	var globalSettings = GlobalSettings();
	var largestTimestamp = globalSettings.getLargestTimestamp();
	var clockNow = Math.round((new Date()).getTime() / 1000);
	var logicNow = Math.max(clockNow, largestTimestamp+1);
	globalSettings.setLargestTimestamp(logicNow);
	console.assert(typeof(logicNow) === "number");
	return logicNow;
}


function HideUnhide() {
    
    var kHistoryName = "undo_history";
    
    var kActionHide = 0;
    var kActionUnhide = 1;
    var kActionUnhideAll = 2;
    
    var kMaxHistoryLength = 10;
    
    var kMajorVersion = 3;
    var kMinorVersion = 0;

    var lastUnhideAllTime = 0;
	var unhideAllChangeTime = 0;
    var history = [];
    
    if (localStorage[kHistoryName]) {
        var saved = JSON.parse(localStorage[kHistoryName]);
        if (saved[0] === kMajorVersion) {
            var minorVersion = saved[1];
            lastUnhideAllTime = saved[2];
			unhideAllChangeTime = saved[3];
            history = saved[4];
        }
        else if (saved[0] === 2) {
			// Internal development version
            var minorVersion = saved[1];
            lastUnhideAllTime = saved[2];
            history = saved[3];
        }
        else if (saved[0] === 1) {
            lastUnhideAllTime = saved[1];
            history = saved[2];
        }
        else {
            alert("Saved with newer incompatible version");
        }
    }

    
    function addToHistory(action) {
        history.unshift(action);
        if (history.length > kMaxHistoryLength) {
            history.pop();
        }
    }
    
    function save() {
        var s = JSON.stringify([kMajorVersion, kMinorVersion,
								lastUnhideAllTime, unhideAllChangeTime,
								history]);
        console.log("HideUnhide - save - " + s);
        writeToLocalStorage(kHistoryName, s);
    }
    
    return {
        hide : function(threadId) {
            console.assert(threadId >= 1);
            var threadInfo = ThreadInfo(threadId);
            var now = threadInfo.hide()
            var action = [now, kActionHide, threadId];
            addToHistory(action);
            save();
        },
        unhide : function(threadId) {
            console.assert(threadId >= 1);
            var threadInfo = ThreadInfo(threadId);
            var now = threadInfo.unhide();
            var action = [now, kActionUnhide, threadId];
            addToHistory(action);
            save();
        },
        isHidden : function(threadId) {
            var threadInfo = ThreadInfo(threadId);
            return threadInfo.isHidden(lastUnhideAllTime);
        },
        unhideAll : function() {
            var now = getTime();
            var action = [now, kActionUnhideAll, lastUnhideAllTime];
            addToHistory(action);
            lastUnhideAllTime = now;
			unhideAllChangeTime = now;
            save();
        },
        undo : function() {
            if (history.length > 0) {
                var lastAction = history.shift();
                if (lastAction[1] === kActionUnhideAll) {
					if (lastAction.length === 3) {
						// All publicly released versions should have .length=3
						lastUnhideAllTime = lastAction[2];
					}
					else {
						// Never publicly released.
						lastUnhideAllTime = 0;
					}
					unhideAllChangeTime = getTime();
                }
                else {
                    var threadInfo = ThreadInfo(lastAction[2]);
                    if (lastAction[1] === kActionHide) {
                        threadInfo.unhide();
                    }
                    else if (lastAction[1] === kActionUnhide) {
                        threadInfo.hide();
                    }
                    else {
                        console.assert(false);
                    }
                }
                save();
            }
        },
        getLastUnhideAllTime : function() {
            return lastUnhideAllTime;
        },
		getUnhideAllChangeTime : function() {
			return unhideAllChangeTime;
		},
		mergeServerResponse : function(serverLastUnhideAllTime,
									   serverLastUnhideAllChangeTime)
		{
			if ((serverLastUnhideAllChangeTime === unhideAllChangeTime &&
					serverLastUnhideAllTime !== lastUnhideAllTime) ||
					serverLastUnhideAllChangeTime > unhideAllChangeTime)
			{
				lastUnhideAllTime = serverLastUnhideAllTime;
				unhideAllChangeTime = serverLastUnhideAllChangeTime;
				save();
				return true;
			}
			else {
				return false;
			}
		}
		
    };
}


function createHideEventListener(threadId, syncManager) {
    return function(event) {
        console.log("Hide thread " + threadId);
        var hideUnhide = HideUnhide();
        hideUnhide.hide(threadId);
        hideThread(document, threadId);
        updateStats(document);
		syncManager.syncPtbgAsap();
        event.preventDefault();
	}
}

function createStarEventListener(threadId, syncManager) {
    return function(event) {
        console.log("Star thread " + threadId);
        var ti = ThreadInfo(threadId);
        if (ti.isStar()) {
            ti.unstar();
            event.currentTarget.innerHTML = hollowStarImg(kMainWindowStarSize);
        }
        else {
            ti.star();
            event.currentTarget.innerHTML = yellowStarImg(kMainWindowStarSize);
        }
		syncManager.syncPtbgAsap();
        event.stopPropagation();
        return false;
    }
}

const kMainWindowStarSize = 13;
const kThreadWindowStarSize = 20;


// To generate the base64 coding, use ("a" is not included in base64 coding):
// uuencode -m star_filled.png a
function yellowStarImg(size) {
    return '<img data-type="yellow" style="vertical-align: middle" ' +
		'width="' + size + '" height="' + size + '" src="' +
		'data:image/png;base64,' +
		'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' +
		'AQEPQiiEKOQAAAAASUVORK5CYII=' +
		'"/>';
}

function hollowStarImg(size) {
    return '<img data-type="hollow" style="vertical-align: middle" ' +
		'width="' + size + '" height="' + size + '" src="' +
		'data:image/png;base64,' +
		'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' +
		'/gXPkmKwVDNL1gAAAABJRU5ErkJggg==' +
		'"/>';
}


function preventDefaultEventHandler(event) {
    event.preventDefault();
}


function setHoveringRowClassName(row) {
	var threadId = getThreadIdFromRow(row);
	var threadInfo = ThreadInfo(threadId);
	var messageId = getMessageIdFromRow(row);
	var linkMessageId = getMessageIdToOpen(threadId, messageId);
	var v = (row.className.indexOf("v") != -1 || threadInfo.hasRead(linkMessageId)) ?
		"v" : "";
	row.className = row.className.replace(/^(o|e|w).*$/, "$1" + v + "h")	
}


function threadRowMouseOverEventListener(event) {
	var row = event.currentTarget;
	setHoveringRowClassName(row);
    return false;
}


function setNonhoveringRowClassName(row, odd) {
	var globalSettings = GlobalSettings();
	
	var threadId = getThreadIdFromRow(row);
	var messageId = getMessageIdFromRow(row);
	var threadInfo = ThreadInfo(threadId);
	var linkMessageId = getMessageIdToOpen(threadId, messageId, globalSettings);
	var visited = (row.className.search("v") !== -1 ||
				   threadInfo.hasRead(linkMessageId)) ? "v" : "";
	var className;	
	if (threadInfo.hasWrittenInThread() && globalSettings.isOldStyleOn()) {
		className = "w" + visited;
	}
	else {
		className = (odd ? "o" : "e") + visited;
	}
	row.className = className;
}


function threadRowMouseOutEventListenerFactory(odd) {
	return function(event) {
		var row = event.currentTarget;
		setNonhoveringRowClassName(row, odd);
		return false;
	}
}

var threadRowMouseOutEventListenerOdd = threadRowMouseOutEventListenerFactory(true);
var threadRowMouseOutEventListenerEven = threadRowMouseOutEventListenerFactory(false);

function changeClassToVisitedForRow(row) {
    var c = row.className;
    if (c.search("v") === -1) {
        row.className = c.replace("o", "ov").replace("e", "ev").replace("w", "wv");
    }
}

function changeClassToUnvisitedForRow(row, even) {
	var c = row.className;
	var nc = "";
	if (c.search("w") === -1) {
		nc = even ? "e" : "o";
	}
	else {
		nc = "w";
	}
	if (c.search("h") !== -1) {
		nc += "h";
	}
	row.className = nc;
}


var openThreads = (function() {
	var reference = null;
	
	return function(doc, threadAndMessageIds) {
			function isReferenceAtTbgLocation() {
				// Needed to move this into separate function since boolean
				// expression evaluation short-circuit didn't work for me.
				// Don't understand what's going on here at all.
				if (reference) {
					if (!reference.closed) {
						if (reference.location) {
							return kTbgUrlRe.test(reference.location.href);
						}
					}
				}
				return false;
			}
		
			console.assert(!(isFramesVersion() && threadAndMessageIds.length > 1));
			for (var i = 0 ; i < threadAndMessageIds.length; i++) {
				var threadId = threadAndMessageIds[i].threadId;
				var messageId = threadAndMessageIds[i].messageId;		
				var row = getThreadRow(doc, threadId);
				if (row) {
					changeClassToVisitedForRow(row);
				}
		
				var windowName = "News_TBGv2";
				var screenXY = "";
				if (i > 0) {
					windowName += threadId;
					screenXY = ", screenX=" + (reference.screenX + 20) +
								", screenY=" + (reference.screenY + 20);
				}
				
				if (i === 0 && isReferenceAtTbgLocation()) {
					var m = JSON.stringify({threadId : threadId,
											messageId : messageId});
					console.log("Sending msg " + m);
					reference.postMessage(m, "http://www.tbg.nu");
					reference.focus();
				}
				else {
					var windowReference = window.open("/news_show/" + threadId + "/" + messageId,
						windowName,
						"width=520, height=555, resizable=1, scrollbars=1" + screenXY);
					windowReference.focus();
					if (i === 0) {
						reference = windowReference;
					}
				}
			}
		};
})();


function openPopups(doc, msgs) {
	var msgs2 = [];
	var globalSettings = GlobalSettings();
	for (var i = 0; i < msgs.length; i++) {
		var threadId = msgs[i].threadId;
		var messageId = msgs[i].messageId;
		var m = getMessageIdToOpen(threadId, messageId, globalSettings);
		msgs2.push({threadId : threadId, messageId : m});

		if (isInArray(threadId, notificationThreadIds)) {
			if (notification !== null) {
				notification.close();
				notification = null;
			}
			notificationThreadIds = [];
		}

	}
	openThreads(doc, msgs2);	
}




function popupLinkClickEventListenerFactory(odd) {
	return function(event) {
		var url = event.currentTarget.href;
		var threadId = getThreadIdFromURL(url);
		var messageId = getMessageIdFromURL(url);
		console.log("clicked popup link with url '" + url +
					"', tid " + threadId + ", mid " + messageId);
		openPopups(document, [{threadId : threadId, messageId : messageId}]);
		
		var row = event.currentTarget.parentNode.parentNode;
		console.assert(row.tagName == "TR");
		if (isFramesVersion()) {
			setHoveringRowClassName(row);
		}
		else {
			setNonhoveringRowClassName(row, odd);
		}
		
		// Do this to make our mouseout listener last in chain, thus having
		// final say about the class name. The original event handler which
		// always tries to give it the white background apparently can't be
		// removed in Chrome 29.
		row.removeEventListener("mouseout",
			odd ? threadRowMouseOutEventListenerOdd : threadRowMouseOutEventListenerEven);
		row.addEventListener("mouseout",
			odd ? threadRowMouseOutEventListenerOdd : threadRowMouseOutEventListenerEven);

		event.preventDefault();
	}
}

var popupLinkClickEventListenerOdd = popupLinkClickEventListenerFactory(true);
var popupLinkClickEventListenerEven = popupLinkClickEventListenerFactory(false);



function insertPTBGColumnElements(tableCell, threadId, threadInfo, syncManager,
								  asteriskWriteStyle)
{
    var hideLink = document.createElement('a');
    hideLink.href = "#";
    hideLink.innerHTML = '<span style="color: grey; vertical-align: middle">Hide </span>';
    
    // Create the handler function in another function for two reasons:
    // - Need to capture current value of threadId
    // - Prevent memory leak (func refering to DOM node which refers back to func)
    hideLink.addEventListener('click',
        createHideEventListener(threadId, syncManager),
        false);
    
    var starSpan = document.createElement('span');
    starSpan.id = "star" + threadId;
    if (threadInfo.isStar()) {
        starSpan.innerHTML = yellowStarImg(kMainWindowStarSize);
    }
    else {
        starSpan.innerHTML = hollowStarImg(kMainWindowStarSize);
    }
    starSpan.addEventListener('click',
        createStarEventListener(threadId, syncManager),
        false);
    // Prevent "Hide" from being selected when double clicking on a star.
    starSpan.addEventListener('mousedown',
        preventDefaultEventHandler,
        false);
    
    var writtenDiv = document.createElement('div');
    writtenDiv.id = "written" + threadId;
    writtenDiv.style.display = "inline-block";
    writtenDiv.style.height = "1em";
    writtenDiv.style.minWidth = "0.7em";
    writtenDiv.style.verticalAlign = "bottom";
    writtenDiv.style.color = "orange";
    writtenDiv.style.marginLeft = "2px";
    writtenDiv.style.marginRight = "2px";
    if (asteriskWriteStyle && threadInfo.hasWrittenInThread()) {
        writtenDiv.textContent = "*";
    }
    
    var frag = document.createDocumentFragment();
    frag.appendChild(hideLink);
    frag.appendChild(starSpan);
    frag.appendChild(writtenDiv);
    tableCell.appendChild(frag);
}

function updateUnreadMessagesSpan(span, threadInfo, messageId) {
	console.assert(span);
	var numUnread = threadInfo.getNumUnread(messageId);
	span.textContent = "(" + numUnread + "/" + messageId + " unread)";
}

function modifyThreadRow(row, threadInfo, lastUnhideAllTime, odd,
						 frameTarget, syncManager,
						 oldWrittenStyle, asteriskWrittenStyle,
						 showUnread, changeLinkToFirstUnread)
{
    // Normal row
    row.onmouseover = "";
    row.addEventListener("mouseover",
        threadRowMouseOverEventListener,
        false);
    
    row.onmouseout = "";
    row.addEventListener("mouseout",
        odd ? threadRowMouseOutEventListenerOdd : threadRowMouseOutEventListenerEven,
        false);
    
    var popupLink = xpathGetSingle(".//td/a[1][contains(@href,'/news_show/')]", row);
    popupLink.onclick = "";
    popupLink.addEventListener("click",
        odd ? popupLinkClickEventListenerOdd : popupLinkClickEventListenerEven,
        false);
	        
    var url = popupLink.href;
    var threadId = getThreadIdFromURL(url);
    var latestMessageId = getMessageIdFromURL(url);
    
	var numMsgSpan = getChildNodeWithNodeName(popupLink, "SPAN");
	numMsgSpan.id = greenThreadRowStatusId(threadId);
	if (showUnread) {
		updateUnreadMessagesSpan(numMsgSpan, threadInfo, latestMessageId);
	}
	
    if (row.className.search("v") != -1) {
        threadInfo.markAsRead(latestMessageId);
    }
    if (row.className.search("w") != -1) {
        threadInfo.setHasWrittenInThread();
    }
	
	var linkMessageId;
	if (changeLinkToFirstUnread) {
		linkMessageId = Math.min(threadInfo.getFirstUnreadMessageId(),
								 latestMessageId);
	}
	else {
		linkMessageId = latestMessageId;
	}
    
	var cell = row.insertCell(0);
    insertPTBGColumnElements(cell, threadId, threadInfo, syncManager,
							 asteriskWrittenStyle);
    
	var hover = row.className.indexOf("h") === -1 ? "" : "h";
    if (threadInfo.isHidden(lastUnhideAllTime)) {
        row.style.display = "none";
        row.className = "w" + (threadInfo.hasRead(linkMessageId) ? "v" : "") +
			hover;
    }
    else {
		var hasWrittenInThread = threadInfo.hasWrittenInThread();
        row.className = ((oldWrittenStyle && hasWrittenInThread) ? "w" : 
			(odd ? "o" : "e")) + (threadInfo.hasRead(linkMessageId) ? "v" : "") +
			hover; 
    }
	
    var fragment = createThreaderLinkFragment(frameTarget, threadId);
    popupLink.parentNode.appendChild(fragment);
}



function getThreaderHref(threadId) {
	return "/news_show/" + threadId + "/1?threader=1";
}


function onThreaderLinkClicked(event) {
	var link = event.target;
	console.log("threader link clicked! " + link.href);
	// GM_openInTab exists in FireFox and Chrome, but not in Opera.
	if (!isFramesVersion() && typeof GM_openInTab != 'undefined') {
		// Workaround for bug in Grasemonkey 0.9.1 in Firefox 4. 
		// GM_openInTab() opens in a new tab, but then throws an exception.
		try {
			GM_openInTab(link.href);
		}
		catch (e) {
		}
		event.preventDefault();
	}
	
	var threadId = getThreadIdFromURL(link.href);
    var popupLinks = document.evaluate(
		"//table/tbody/tr/td/a[1][contains(@href,'/news_show/" + threadId + "/')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
    var length = popupLinks.snapshotLength;
	for (var i = 0; i < length; i++) {
        var l = popupLinks.snapshotItem(i);
        l.style.color = kVisitedLinkColor;
    }
    
    if (isInArray(threadId, notificationThreadIds)) {
        if (notification !== null) {
            notification.close();
            notification = null;
        }
        notificationThreadIds = [];
    }
}

function isFramesVersion() {
    return window.top !== window.self;
	//var search = window.location.search.substr(1);
	//return search.indexOf("f=1") != -1;
}

// Returns a fragment to be inserted in the main or search window, after the popup link
// target can be initialized to (isFramesVersion() : "News_TBGv2" : "")
function createThreaderLinkFragment(target, threadId) {
    var frag = document.createDocumentFragment();
    
    var space = document.createTextNode(" ");
    frag.appendChild(space);

    var link = document.createElement('a');
    link.href = getThreaderHref(threadId);
    link.target = target;
    link.textContent = 'Threader';
    link.style.color = "grey";
    link.addEventListener('click',
        onThreaderLinkClicked,
        false);
    frag.appendChild(link);
    
    return frag;
}

function insertThreaderLink() {
	var links = document.evaluate(
		"//table/tbody/tr/td/a[starts-with(@href,'/news_show/')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
    var target = isFramesVersion() ? "News_TBGv2" : "";
	
    var length = links.snapshotLength;
	for (var i = 0; i < length; i++) {
		var threadLink = links.snapshotItem(i);
		var cell = threadLink.parentNode;
		
		var threadHref = threadLink.href;
		var split = threadHref.split('/');
		var threadId = parseInt(split[4]);
        
        var fragment = createThreaderLinkFragment(target, threadId);
		cell.appendChild(fragment);
	}
}

dependencies["injectedHideUnhideAndClose"] = [
    "hideThread", "unhideThread", "updateStats", "getMainWindowReference"];
function injectedHideUnhideAndClose(threadId, hide) {

}

function hideUnhideThreadInMainWindow(hide) {
	var threadId = getThreadIdFromLocation();
	var mainWindow = getMainWindowReference();
	if (false && mainWindow) {
		if (hide) {
			hideThread(mainWindow.document, threadId);
		}
		else {
			unhideThread(mainWindow.document, threadId);
		}
		updateStats(mainWindow.document);
		if (hide) {
			window.close();
		}
	}	
}

function insertHideButton(syncManager) {
	var insertBeforeButton = document.evaluate(
		"//tr/td[3]/input[contains(@value,'Prev')]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	if (insertBeforeButton == null) {
		// Can happen if the page doesn't load correctly.
		return;
	}
	var parent = insertBeforeButton.parentNode;
	var textNode = document.createTextNode(' ');		

	var button = document.createElement('input');
	button.id = kHideButtonId;
	button.type = 'button';
	button.addEventListener("click",
		function(event) {
			onHideUnhideClicked(event, syncManager);
		},
		false);
	parent.insertBefore(button, insertBeforeButton);
	parent.insertBefore(textNode, insertBeforeButton);
    
    var threadId = getThreadIdFromLocation();
	setupHideUnhideButtonName(threadId);
}


function onPopupPopState(event,
        deanonymizer, imageDownloader, messageDownloader, syncManager)
{
	// Can apparently be triggered without me having called pushState, at
	// least not in this session.
	var state = event.state;
	if (state) {
		var message = state.message;
		var messageTableInnerHTML = state.messageTable;
		var url = "http://www.tbg.nu/news_show/" +
			message.threadId + "/" + message.messageId;
		changePopupToMessageSoft(url, message, messageTableInnerHTML,
                deanonymizer, imageDownloader, messageDownloader, syncManager);
    }
}


function markCurrentMessageInPopupMessageList(messageId) {
	var even = true;
	var rows = xpathGet("//form/table[2]/tbody/tr/td[1]/a");
	var length = rows.snapshotLength;
	for (var i = 0; i < length; i++) {
		var a = rows.snapshotItem(i);
		var match = kThreadMessageUrlRe.exec(a.href);
		if (match) {
			var tr = getFirstParentNodeWithNodeName(a, "TR");
			if (parseInt(match[2]) === messageId) {
				tr.bgColor = "006600";
			}
			else if (even) {
				tr.bgColor = "000040";
			}
			else {
				tr.bgColor = "";
			}
		}
		even = !even;
	}
}


function repeatString(str, times) {
	var result = [];
	for (var i = 0; i < times; i++) {
		result.push(str);
	}
	return result.join("");
}


function lastIndexOfXbeforeFirstY(str, x, y) {
	var yindex = str.indexOf(y);
	var xindex = str.lastIndexOf(x, yindex);
	return xindex;
}

function extractMessageTableHtml(html) {
	var tableStartIndex = lastIndexOfXbeforeFirstY(html,
		"<table", "CURRENT&nbsp;THREAD");
	var innerTableStartIndex = html.indexOf(">", tableStartIndex) + 1;
	var messageTableStr = html.substr(innerTableStartIndex);
	const kEndTableString = "</table>";
	var tableEndIndex = messageTableStr.indexOf(kEndTableString);
	messageTableStr = messageTableStr.substr(0, tableEndIndex);
	return messageTableStr;
}

const kMessageTableId = "messagetable";

function resizeWindowWidthToFitMessageTable() {

    function doit() {
        var messageTable = document.getElementById(kMessageTableId);
        var messageListTd = getFirstDescendantNodeWithNodeName(messageTable, "TD");
        var authorListTd = getNextSiblingWithNodeName(messageListTd, "TD");
        
        var authorListTdWidth = authorListTd.offsetWidth;
        var globalSettings = GlobalSettings();
        globalSettings.reportAuthorWidth(authorListTdWidth);
        var extraWidth = globalSettings.getMaxAuthorWidth() - authorListTdWidth;
        console.assert(extraWidth >= 0);
        extraWidth += 10;
        
        var minWidth = messageTable.offsetWidth + extraWidth;
        
        console.log("messageTable.offsetWidth: " + messageTable.offsetWidth +
            ", authorListTdWidth: " + authorListTdWidth +
            ", extraWidth: " + extraWidth +
            ", minWidth: " + minWidth +
            ", window.innerWidth: " + window.innerWidth,
            ", messageListTdWidth: " + messageListTd.offsetWidth);
        
        if (window.innerWidth && window.innerWidth < minWidth) {
            window.resizeTo(minWidth, window.outerHeight);
        }
    }
    
    // Doesn't work if I do it right here, probably a bug in Chrome.
    setTimeout(doit, 10);
}

function getHeaderField(trIndex, tdIndex) {
    return xpathGetSingle('//table[@bgcolor="000055"]/tbody/tr[' +
            trIndex + ']/td[' + tdIndex + ']');
}

function getHeaderFieldGetter(trIndex, tdIndex) {
    return function() {
        return getHeaderField(trIndex, tdIndex);
    }
}

var getSubjectTd = getHeaderFieldGetter(1, 2);
var getFromTd = getHeaderFieldGetter(2, 2);
var getInfoTd = getHeaderFieldGetter(3, 2);
var getDateTd = getHeaderFieldGetter(4, 2);
var getLinkA = function() {
        return getFirstDescendantNodeWithNodeName(getHeaderField(5, 2), "A")
    };
var getMessageTd = getHeaderFieldGetter(6, 1);

function changePopupToMessageSoft(url, message, messageTableInnerHTML,
        deanonymizer, imageDownloader, messageDownloader, syncManager)
{
    // messageTableInnerHTML is only non-null on history popstate where
    // it was available when the state was saved.


    // Reset text selection, taken from
    // http://stackoverflow.com/questions/3169786/clear-text-selection-with-javascript
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        }
        else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    }

	var oldThreadId = getThreadIdFromURL(getLinkA().href);
	var threadId = getThreadIdFromURL(url);
	var messageId = getMessageIdFromURL(url);
	
	var messageTable = document.getElementById(kMessageTableId);
	const kErrorDivId = "errordiv";
	var errorDiv = document.getElementById(kErrorDivId);
	if (!errorDiv) {
		errorDiv = document.createElement("div");
		errorDiv.id = kErrorDivId;
		errorDiv.style.fontSize = "11px";
		errorDiv.style.fontWeight = "bold";
		errorDiv.style.fontFamily = "verdana";
		errorDiv.style.display = "none";
		messageTable.parentNode.appendChild(errorDiv);
	}
	
	function setDivMessage(html) {
		if (html) {
			messageTable.innerHTML = "";
			errorDiv.style.display = "block";
			errorDiv.innerHTML = html;
		}
		else {
			errorDiv.style.display = "none";
		}
	}
	
	function onMessageListRetrievalError() {
		console.log("onMessageListRetrievalError, threadId = " + threadId +
			", getThreadIdFromLocation() = " + getThreadIdFromLocation());
		if (threadId == getThreadIdFromLocation()) {
			const id = "reloadreload";
			setDivMessage('LOAD FAILED. <a id="' + id + '" href="' +
				buildMessageUrl(threadId, getMessageIdFromLocation()) +
				'">RELOAD</a>');
			document.getElementById(id).addEventListener("click",
				function(event) {
					location.reload();
					event.preventDefault();
				},
				false);
		}		
	}

	var subjectTd = getSubjectTd();
	var fromTd = getFromTd();
	var infoTd = getInfoTd();
	var dateTd = getDateTd();
	var link = getLinkA();
	var messageTd = getMessageTd();
	
	subjectTd.innerHTML = message.subject;
    var typeNameColor = deanonymizer.getName(
        message.author.replace(/\s*(&nbsp;?)?&lt;\s*$/, ""));
    if (typeNameColor[0] != kAuthorTypeRegistered) {
        setupAuthor(deanonymizer, syncManager, fromTd,
            typeNameColor[0], typeNameColor[1], typeNameColor[2],
            message.messageId, "Header");
    }
    else {
        fromTd.innerHTML = makeSearchLinkHTML(typeNameColor[1],
									isFramesVersion() ? "main" : "_blank");
    }
    infoTd.innerHTML = message.info;
	dateTd.innerHTML = message.date;
	link.textContent = link.href = url;
	
	transformAndReplacePopupMessageBody("<br>" + message.message,
		imageDownloader, messageDownloader, syncManager);
	setupFastNavigationForLinks(xpathGetSingle(kPopupMessageTdXpath),
		deanonymizer, imageDownloader, messageDownloader, syncManager);
	
	document.title = "TBG v2 - News - " + message.subject;
    
    updateHideUnhideStar(threadId);
	
	window.scrollTo(0, 0);
    
    messageTd.id = "messageTd";
    
    updateMathJax(messageTd.id);

	if (messageTableInnerHTML) {
		var re = new RegExp("/news_show/" + threadId + "/" + messageId + "[^\\d]");
		if (!re.test(messageTableInnerHTML)) {
            // I think this only happens when we go back to a message where
            // the message table wasn't loaded.
            console.log("got messateTableInnerHTML, but re didn't match => reset");
			messageTable.innerHTML = "";
		}
		else {
            console.log("got messageTableInnerHTML, keeping it");
			setDivMessage(null);
            
            deanonymizer.resetMessageIdMappings();
            messageDownloader.stop();

			messageTable.innerHTML = messageTableInnerHTML;
            
            setupFastNavigationForLinks(messageTable,
                deanonymizer, imageDownloader, messageDownloader, syncManager);
            addAnonymousAuthorSpanClickListenerForMessagesInMessageList(
                    deanonymizer, syncManager);
            downloadAnonymousMessagesInMessageList(messageDownloader);
		}
	}
	else {
        console.log("Didn't get messageTableInnerHTML");
		var xpath = ".//a[substring-after(@href, '/news_show/') = " +
			"'" + threadId + "/" + messageId + "']";
		var a = xpathGetSingle(xpath, messageTable);
		if (!a) {
            console.log("Xpath didn't match => reset");
			messageTable.innerHTML = "";
		}
	}

	if (messageTable.children.length > 0) {
		if (errorDiv.style.display === "none") {
			markCurrentMessageInPopupMessageList(messageId);
            deanonymizer.addMessage(message.messageId, message.author);
			colorLinksFromReadWriteStatus();
			return true;
		}
		else {
            messageDownloader.softStop();
			return false;
		}
	}
	else {
		setDivMessage("LOADING...");
        
        messageDownloader.stop();
        deanonymizer.resetMessageIdMappings();
        
		asyncXmlHttpRequest(buildMessageUrl(threadId, messageId),
			"GET",
			"",
			function(responseText) {
				console.log("threadId: " + threadId);
				console.log("location threadId: " + getThreadIdFromLocation());
				if (threadId == getThreadIdFromLocation()) {
					var messageTableString = extractMessageTableHtml(responseText);
					setDivMessage(null);
					messageTable.innerHTML = messageTableString;					
					copyReadWriteStatusFromPopupWindow(false);
					colorLinksFromReadWriteStatus();
					makeThreadWindowUsersSearchable();
					markCurrentMessageInPopupMessageList(getMessageIdFromLocation());
					setupFastNavigationForLinks(messageTable,
						deanonymizer, imageDownloader,
                        messageDownloader, syncManager);
					
					var historyState = history.state;
					historyState.messageTable = messageTable.innerHTML;
					history.replaceState(historyState,
						historyState.message.subject, location.href);
					
                    deanonymizer.addMessage(message.messageId, message.author);
                    
					prefetchSurroundingMessages(messageDownloader);
                    downloadAnonymousMessagesInMessageList(messageDownloader);
					if (!isFramesVersion()) {
						resizeWindowWidthToFitMessageTable();
					}
				}
			},
			onMessageListRetrievalError,
			onMessageListRetrievalError,
			30*1000);
		return false;
	}
}


function changePopupToMessage(threadId, messageId,
        deanonymizer, imageDownloader, messageDownloader, syncManager)
{
	var url = "http://www.tbg.nu/news_show/" + threadId + "/" + messageId;
	var message = getFromMessageCache(threadId, messageId);
	if (message) {
        console.log("Message " + threadId + "/" + messageId + " is in cache, using fast nav");
		syncManager.setThreadId(threadId);
	
		var threadInfo = ThreadInfo(threadId);
		if (!threadInfo.hasRead(messageId)) {
			threadInfo.markAsRead(messageId);
			syncManager.syncAsap();
		}		
		
		var messageTable = document.getElementById(kMessageTableId);
		var messageTableInnerHTML = threadId === getThreadIdFromLocation() ?
			messageTable.innerHTML : "";
		var hasMessageTable = changePopupToMessageSoft(url, message, null,
            deanonymizer, imageDownloader, messageDownloader, syncManager);
		window.history.pushState(
			{message: message, messageTable: messageTableInnerHTML},
			message.subject, url);
		if (hasMessageTable) {
			prefetchSurroundingMessages(messageDownloader);
		}
	}
	else {
        console.log("Message " + threadId + "/" + messageId + " is not in cache, changing location");
		location.href = url;
	}
}

function getSiblingMessageId(startMessageId, threadInfo, directionalSiblingNavigator, onlyUnread) {
	var link = document.getElementById("i" + startMessageId);
	var tr = getFirstParentNodeWithNodeName(link, "TR");
	var sibling = tr;
	while (true) {
		sibling = directionalSiblingNavigator(sibling, "TR");
		if (!sibling) {
			return null;
		}
		var a = getFirstDescendantNodeWithNodeName(sibling, "A");
		if (!a) {
			return null;
		}
		var messageId = getMessageIdFromURL(a.href);
		if (!messageId) {
			return null;
		}
		if (!(onlyUnread && threadInfo.hasRead(messageId))) {
			return messageId;
		}
	}
	console.assert(false);
	return null;
}

function getMessageIdsFromPopupMessageTable() {
	var messageUrls = xpathGet(
		"//form/table[2]/tbody/tr/td[1]//a/@href[contains(., '/news_show/')]");
	var messageIds = [];
	var length = messageUrls.snapshotLength;
	for (var i = 0; i < length; i++) {
		messageIds.push(getMessageIdFromURL(messageUrls.snapshotItem(i).value));
	}
	console.assert(messageIds.length === 0 || messageIds[0] === 1);
	return messageIds;
}

function getNextUnreadMessageId(threadInfo, messageIds, currentIndex) {
	for (var i = (currentIndex+1) % messageIds.length;
			i != currentIndex;
			i = (i+1) % messageIds.length)
	{
		var m = messageIds[i];
		if (!threadInfo.hasRead(m)) {
			return m;
		}
	}
	return null;
}

function getPrevUnreadMessageId(threadInfo, messageIds, currentIndex) {
	for (var i = (currentIndex+messageIds.length-1) % messageIds.length;
			i != currentIndex;
			i = (i+messageIds.length-1) % messageIds.length)
	{
		var m = messageIds[i];
		if (!threadInfo.hasRead(m)) {
			return m;
		}
	}
	return null;
}

function getPrevMessageId(threadInfo, messageIds, currentIndex) {
	if (currentIndex != 0) {
		return messageIds[currentIndex-1];
	}
	else {
		return null;
	}
}

function getNextMessageId(threadInfo, messageIds, currentIndex) {
	if (currentIndex+1 < messageIds.length) {
		return messageIds[currentIndex+1];
	}
	else {
		return null;
	}
}

function MessageListNavigator() {
	var threadId = getThreadIdFromLocation();
	var messageId = getMessageIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
	var messageIds = getMessageIdsFromPopupMessageTable();
	var currentIndex = messageIds ? messageIds.indexOf(getMessageIdFromLocation()) : -1;
	return {
		prev : function() {
			return messageIds ? getPrevMessageId(threadInfo, messageIds, currentIndex) : null;
		},
		next : function() {
			return messageIds ? getNextMessageId(threadInfo, messageIds, currentIndex) : null;
		},
		prevUnread : function() {
			return messageIds ? getPrevUnreadMessageId(threadInfo, messageIds, currentIndex) : null;
		},
		nextUnread : function() {
			return messageIds ? getNextUnreadMessageId(threadInfo, messageIds, currentIndex) : null;
		},
		firstUnread : function() {
			if (!threadInfo.hasRead(1)) {
				return 1; 
			}
			else {
				return messageIds ? getNextUnreadMessageId(threadInfo, messageIds, 0) : null;
			}
		}
	}
}

const kNavigate_Prev = 10;
const kNavigate_Next = 11;
const kNavigate_PrevUnread = 12;
const kNavigate_NextUnread = 13;

function navigate(where, deanonymizer, imageDownloader, messageDownloader, syncManager) {
	var messageListNavigator = MessageListNavigator();
	var threadId = getThreadIdFromLocation();
	var messageId;
	switch (where) {
		case kNavigate_Prev:
			messageId = messageListNavigator.prev();
			break;
		case kNavigate_Next:
			messageId = messageListNavigator.next();
			break;
		case kNavigate_PrevUnread:
			messageId = messageListNavigator.prevUnread();
			break;
		case kNavigate_NextUnread:
			messageId = messageListNavigator.nextUnread();
			break;
		default:
			console.assert(false);
	}
	if (messageId) {
		changePopupToMessage(threadId, messageId,
            deanonymizer, imageDownloader, messageDownloader, syncManager);
	}
}

function goWriteReply(doc) {
	doc.location.href = "/cgi-bin/news_send.cgi?db=" +
		getThreadIdFromLocation(doc) + "&id=" + getMessageIdFromLocation(doc);	
}

function replaceWriteReplyButton() {
	var button = xpathGetSingle('//tr/td[1]/input[contains(@value,"Write")]');
	var newButton = document.createElement("input");
	newButton.type = "button";
	newButton.value = button.value
	newButton.accessKey = button.accessKey;
	newButton.title = button.title;
	newButton.addEventListener("click",
		function(event) {
			goWriteReply(document);
		},
		false);
	
	button.parentNode.replaceChild(newButton, button);
}

function replacePrevNextButtons(deanonymizer, imageDownloader,
        messageDownloader, syncManager)
{
	function replacePrevNextButton(prevNext, goClick, goClickUnread)
	{
		var button = xpathGetSingle("//tr/td[3]/input[contains(@value,'" +
									prevNext + "')]");
		
		var newButton = document.createElement("input");
		newButton.type = "button";
		newButton.value = button.value;
		newButton.accessKey = button.accessKey;
		newButton.title = button.title;
		newButton.addEventListener("click", 
			function(event) {
				var m = MessageListNavigator();
				if (event.shiftKey) {
					goClickUnread();
				}
				else {
					goClick();
				}
                newButton.blur();
				return false;
			},
			false);
		newButton.addEventListener("contextmenu",
			function(event) {
				goClickUnread();
				event.preventDefault();
                newButton.style.webkitUserSelect = "none";
                newButton.blur();
				return false;
			},
			false);
		
		button.parentNode.replaceChild(newButton, button);
	}
	
	replacePrevNextButton("Prev",
		function() {
			navigate(kNavigate_Prev, deanonymizer, imageDownloader,
                    messageDownloader, syncManager);
		},
		function() {
			navigate(kNavigate_PrevUnread, deanonymizer, imageDownloader,
                    messageDownloader, syncManager);
		});
	replacePrevNextButton("Next",
		function() {
			navigate(kNavigate_Next, deanonymizer, imageDownloader,
                    messageDownloader, syncManager);
		},
		function() {
			navigate(kNavigate_NextUnread, deanonymizer, imageDownloader,
                    messageDownloader, syncManager);
		});
}

function isKey(event, c) {
	console.assert(c.length === 1);
	return event.char && event.char === c ||
		event.charCode && event.charCode === c.charCodeAt(0);
}

function getMessageIdToOpen(threadId, latestMessageId, globalSettings) {
	globalSettings = globalSettings || GlobalSettings();

	var messageId = latestMessageId;
	if (globalSettings.getOpenPopupsWithFirstUnreadMessage()) {
		var threadInfo = ThreadInfo(threadId);
		messageId = Math.min(threadInfo.getFirstUnreadMessageId(),
							 messageId);
	}
	return messageId;
}

function hotKey19(doc, event) {
	for (var i = 1; i <= 9; i++) {
		if (isKey(event, ""+i)) {
			var row = getNthUnhiddenThreadRow(doc, i-1);
			var threadId = getThreadIdFromRow(row);
			var messageId = getMessageIdFromRow(row);
			var m = getMessageIdToOpen(threadId, messageId);
			return {threadId : threadId, messageId : m};
		}
	}
	return null;
}


dependencies["getMainWindowReference"] = ["getMainWindowPathNameConst"];
function getMainWindowReference() {
	function isMainWindow(w) {
		return w.location.pathname === getMainWindowPathNameConst();
	}
			
	if (isMainWindow(window)) {
		return window;
	}
	
	if (isOpera()) {
		return null;
	}		
	
	if (window.top.frames.length > 1) {
		return window.top.frames[0];
	}	

	if (isMainWindow(window.parent)) {
		return window.parent;
	}

	var op = window.opener;
	for (var i = 0; i < 10 && op; i++) {
		if (isMainWindow(op)) {
			return op;
		}
		op = op.opener;
	}

	return null;
}

function buildMessageUrl(threadId, messageId) {
	console.assert(parseInt(threadId) >= 1);
	console.assert(parseInt(messageId) >= 1);
	return "http://www.tbg.nu/news_show/" + threadId + "/" + messageId;
}

function toggleStar() {
    var threadId = getThreadIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
	if (threadInfo.isStar()) {
		threadInfo.unstar();
	}
	else {
		threadInfo.star();
	}
	updateHideUnhideStar(threadId);
}

function toggleHide() {
	var threadId = getThreadIdFromLocation();
	var hideUnhide = HideUnhide();
	var hide;
	if (hideUnhide.isHidden(threadId)) {
		hideUnhide.unhide(threadId);
		hide = false;
	}
	else {
		hideUnhide.hide(threadId);
		hide = true;
	}
	updateHideUnhideStar(threadId);
	if (hide) {
		window.close();
	}
}

const kToggleStarKey = "z";
const kToggleHideKey = "x";
const kPrevUnreadKey = "d";
const kNextUnreadKey = "f";
const kPrevKey = "a";
const kNextKey = "s";
const kWriteReplyKey = "w";
const kCloseKey = "q";
const kReloadKey = "r";

function isAnyModifierKeyDown(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}

function setupPopupKeyAccelerators(deanonymizer, imageDownloader,
        messageDownloader, syncManager)
{
	window.addEventListener("keypress",
		function(event) {
            if (document.activeElement.nodeName == "INPUT") {
                return;
            }
            if (isAnyModifierKeyDown(event)) {
                return;
            }
        
			if (isKey(event, kPrevUnreadKey)) {
				navigate(kNavigate_PrevUnread, deanonymizer, imageDownloader,
                        messageDownloader, syncManager);
			}
			else if (isKey(event, kNextUnreadKey)) {
				navigate(kNavigate_NextUnread, deanonymizer, imageDownloader,
                        messageDownloader, syncManager);
			}
			else if (isKey(event, kPrevKey)) {
				navigate(kNavigate_Prev, deanonymizer, imageDownloader,
                        messageDownloader, syncManager);
			}
			else if (isKey(event, kNextKey)) {
				navigate(kNavigate_Next, deanonymizer, imageDownloader,
                        messageDownloader, syncManager);
			}
			else if (isKey(event, kWriteReplyKey)) {
				goWriteReply(document);
			}
			else if (isKey(event, kCloseKey)) {
				if (isFramesVersion()) {
					location.href = kEmptyFramePathName;
				}
				else {
					window.close();
				}
			}
			else if (isKey(event, kToggleStarKey)) {
				toggleStar();
			}
			else if (isKey(event, kToggleHideKey)) {
				toggleHide();
			}
			else {
				var mainWindow = getMainWindowReference();
				if (mainWindow) {
					var msgToOpen = hotKey19(mainWindow.document, event);
					if (msgToOpen) {
						changePopupToMessage(msgToOpen.threadId,
							msgToOpen.messageId, deanonymizer, imageDownloader,
                            messageDownloader, syncManager);
					}
				}
			}
		},
		false);
}

function setupThreaderKeyAccelerators() {
	window.addEventListener("keypress",
		function(event) {
            var active = document.activeElement.nodeName;
            if (active === "TEXTAREA" || active === "INPUT") {
                return false;
            }
            if (isAnyModifierKeyDown(event)) {
                return;
            }
            
            if (isKey(event, kCloseKey)) {
                if (isFramesVersion()) {
                    location.href = kEmptyFramePathName;
                }
                else {
                    window.close();
                }
            }
            else if (isKey(event, kToggleStarKey)) {
                toggleStar();
            }
            else if (isKey(event, kToggleHideKey)) {
                toggleHide();	
            }				
            else {
                var mainWindow = getMainWindowReference();
                if (mainWindow) {
                    var msgToOpen = hotKey19(mainWindow.document, event);
                    if (msgToOpen) {
                        location.href = buildMessageUrl(msgToOpen.threadId,
                                                        msgToOpen.messageId);
                    }
                }
            }
			return false;
		},
		false);
}

function setupMainWindowKeyAccelerators(messageDownloader, syncManager) {
	window.addEventListener("keypress",
		function (event) {
			if (document.activeElement.nodeName != "INPUT") {
                if (isAnyModifierKeyDown(event)) {
                    return;
                }
                
				if (isKey(event, kReloadKey)) {
					syncManager.syncAsapIfNotAlreadySyncing();
				}
				else {
					var msgToOpen = hotKey19(document, event);
					if (msgToOpen) {
						openPopups(document, [msgToOpen]);
					}
				}
			}
		},
		false);
}

// This only works in Chrome unfortunately.
function prefetchUrl(url) {
	var prefetchLink = document.createElement("link");
	prefetchLink.rel = "subresource";
    prefetchLink.href = url;
    document.head.appendChild(prefetchLink);
    console.log("Attempting prefetch of " + url);
}

function prefetchPtbgImages(messageBody) {
    var imageUrlMatches = getRegexpMatches(messageBody, kPtbgImageRe);
    for (var i = 0; i < imageUrlMatches.length; i++) {
        var match = imageUrlMatches[i];
        var protocolAndHostname = match[3];
        var imageName = match[4];
        var width = match[5];
        var height = match[6];
        
        var thumbnailInfo = createPtbgThumbnailUrl(protocolAndHostname,
                imageName, width, height);
        var thumbnailUrl = thumbnailInfo[2];
        prefetchUrl(thumbnailUrl);
    }
}

function MessageDownloader(imageDownloader, callback) {
    // callback is function(messageStruct) or null

    const kMaxConcurrentNormalDownloads = 1;
    const kMaxConcurrentBoostDownloads = 4;
    
    var boostPriorityQueue = [];    // {threadId, messageId, normalPriority, boostPriority, fetchImages, callback, stop} sorted by boostPriority
    var normalPriorityQueue = [];   // same as above, but sorted by normalPriority
    var currentlyDownloading = [];  // same as above, but with added member xhr
    
    function shouldStartDownload() {
        if (boostPriorityQueue.length > 0) {
            return currentlyDownloading.length < kMaxConcurrentBoostDownloads;
        }
        else if (normalPriorityQueue.length > 0) {
            return currentlyDownloading.length < kMaxConcurrentNormalDownloads;
        }
        else {
            return false;
        }
    }
    
    function fetchImages(message) {
        replaceImageUrlsOrAddToDownloader(message.message, "", imageDownloader);
        if (GlobalSettings().getShowPtbgThumbnails()) {
            prefetchPtbgImages(message.message);
        }
    }
    
    function startDownloads() {
        while (shouldStartDownload()) {
            var queueItem;
            if (boostPriorityQueue.length > 0) {
                queueItem = boostPriorityQueue.shift();
            }
            else if (normalPriorityQueue.length > 0) {
                queueItem = normalPriorityQueue.shift();
            }
            else {
                console.assert(false);
            }
            
            var message = getFromMessageCache(queueItem.threadId, queueItem.messageId);
            if (message) {
                if (queueItem.fetchImages) {
                    fetchImages(message);
                }
                if (queueItem.callback) {
                    queueItem.callback(message);
                }
            }
            else {
                download(queueItem);
            }
        }
    }
    
    function download(queueItem) {
        currentlyDownloading.push(queueItem);

        function removeFromCurrentlyDownloading() {
            var index = currentlyDownloading.indexOf(queueItem);
            console.assert(index >= 0);
            currentlyDownloading.splice(index, 1);
        }
        
        function onFailure() {
            console.log("Downloading of " + queueItem.threadId + ":" +
                        queueItem.messageId + " failed");
            removeFromCurrentlyDownloading();
            if (!queueItem.stop) {
                queueItem.boostPriority = 1;
                boostPriorityQueue.unshift(queueItem);
            }
            setTimeout(startDownloads, 1000);
        }
    
        queueItem.xhr = asyncXmlHttpRequest(
            "http://www.tbg.nu/cgi-bin/news_threader.cgi?db=" +
                queueItem.threadId + "&id=" + queueItem.messageId,
            "GET",
            "",
            function(responseText) {
                console.log("Downloading of " + queueItem.threadId + ":" +
                            queueItem.messageId + " succeeded");
                var message = extractMessage(responseText);
                if (message) {
                    message.threadId = queueItem.threadId;
                    message.messageId = queueItem.messageId;
                    addToMessageCache(queueItem.threadId, queueItem.messageId,
                            message);
                    if (queueItem.fetchImages) {
                        fetchImages(message);
                    }
                    if (queueItem.callback && !queueItem.stop) {
                        queueItem.callback(message);
                    }
                }
                removeFromCurrentlyDownloading();
                startDownloads();
            },
            onFailure,
            onFailure,
            30*1000);
    }
    
    function iterateQueueItems(callback) {
        for (var i = 0; i < boostPriorityQueue.length; i++) {
            callback(boostPriorityQueue[i]);
        }
        for (var i = 0; i < normalPriorityQueue.length; i++) {
            callback(normalPriorityQueue[i]);
        }
        for (var i = 0; i < currentlyDownloading.length; i++) {
            callback(currentlyDownloading[i]);
        }
    }
    
    function boostPrioritySortPredicate(a, b) {
        return a.boostPriority - b.boostPriority;
    }
    
    function normalPrioritySortPredicate(a, b) {
        return a.normalPriority - b.normalPriority;
    }
   

    var that = {}
    that.add = function(threadId, messageId, normalPriority, boostPriority, fetchImagesAfterDownload) {
            // Priorities are positive numbers where smaller means higher priority.
            // If boostPriority is a positive number, the message will be downloaded
            // in that order. More boostPriority messages are also downloaded concurrently.
            // When resetBoostPriority() is called, all boosted messages goes back to normal.
            // You can add them again using this function to boost priority.
            // You may add messages several times without problem,
            // although it will result in many callbacks.

            var message = getFromMessageCache(threadId, messageId);
            if (message) {
                if (fetchImagesAfterDownload) {
                    fetchImages(message);
                }
                if (callback) {
                    callback(message);
                }
            }
            else {
                var item = {
                    threadId : threadId,
                    messageId : messageId,
                    normalPriority : normalPriority,
                    boostPriority : boostPriority,
                    fetchImages : fetchImagesAfterDownload,
                    callback : callback,
                    stop : false
                };
                if (boostPriority) {
                    boostPriorityQueue.push(item);
                    boostPriorityQueue.sort(boostPrioritySortPredicate);
                }
                else {
                    normalPriorityQueue.push(item);
                    normalPriorityQueue.sort(normalPrioritySortPredicate);
                }
                
                startDownloads();
            }
        };
    that.resetBoostPriority = function() {
            normalPriorityQueue = normalPriorityQueue.concat(boostPriorityQueue)
            normalPriorityQueue.sort(normalPrioritySortPredicate);
            boostPriorityQueue = [];
        };
    that.resetFetchImages = function() {
            iterateQueueItems(function(item) { item.fetchImages = false; });
        };
    that.softStop = function() {
            normalPriorityQueue = [];
            boostPriorityQueue = [];
            that.resetFetchImages();
            iterateQueueItems(function(item) {
                    item.stop = true;
                });
    };
    that.stop = function() {
            while (currentlyDownloading.length > 0) {
                var queueItem = currentlyDownloading.pop();
                queueItem.stop = true;
                queueItem.xhr.cancel();
            }
            that.softStop();
        };
        
    return that;
}


function prefetchSurroundingMessages(messageDownloader) {
    messageDownloader.resetFetchImages();
    messageDownloader.resetBoostPriority();

	var threadId = getThreadIdFromLocation();
	var currentMessageId = getMessageIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
	var messageListNavigator = MessageListNavigator();
	function p(messageId, priority) {
		if (messageId) {
			messageDownloader.add(threadId, messageId, messageId, priority, true);
		}
	}
	p(messageListNavigator.nextUnread(), 1);
	p(messageListNavigator.next(), 2);
	p(messageListNavigator.prev(), 3);
	p(messageListNavigator.firstUnread(), 4);
	p(messageListNavigator.prevUnread(), 5);
}

const kThreadWindowStarDivId = "threadwindowstardiv";

function updateStarInThreadWindow(threadId) {
	var threadInfo = ThreadInfo(threadId);
	var starDiv = document.getElementById(kThreadWindowStarDivId);
	starDiv.innerHTML = threadInfo.isStar() ?
		yellowStarImg(kThreadWindowStarSize) : hollowStarImg(kThreadWindowStarSize);	
}

function onThreadWindowStarClicked(event, syncManager) {
	var img = event.currentTarget.childNodes[0];
	var starType = img.getAttribute("data-type");
	var newStarSetting;
	if (starType === "yellow") {
		newStarSetting = false;
	}
	else {
		console.assert(starType === "hollow");
		newStarSetting = true;
	}
	
	var threadId = getThreadIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
	
	if (newStarSetting) {
		threadInfo.star();
	}
	else {
		threadInfo.unstar();
	}
	updateStarInThreadWindow(threadId);
	syncManager.syncAsap();
}

function insertStarInThreadWindow(threadId, syncManager, insertAfterButton) {	
	var threadInfo = ThreadInfo(threadId);
	
	var div = document.createElement('div');
	div.id = kThreadWindowStarDivId;
	div.style.display = "inline-block";
	div.style.position = "relative";
	div.style.bottom = "2px";

	var star = threadInfo.isStar() ?
		yellowStarImg(kThreadWindowStarSize) : hollowStarImg(kThreadWindowStarSize);
	div.innerHTML = star;
	
	var fragment = document.createDocumentFragment();
	fragment.appendChild(document.createTextNode(' '));
	fragment.appendChild(div);
	insertAfterButton.parentNode.insertBefore(fragment,
		insertAfterButton.nextSibling);
	
	div.addEventListener("click",
		function(event) {
			onThreadWindowStarClicked(event, syncManager);
		},
		false);

}

function insertStarInPopup(threadId, syncManager) {
	var insertAfterButton = document.evaluate(
		"//tr/td[1]/input[contains(@value, 'Write') and contains(@value, 'Reply')]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	if (insertAfterButton == null) {
		// Can happen if the page doesn't load correctly.
		return;
	}
	
	insertStarInThreadWindow(threadId, syncManager, insertAfterButton);
}

function insertStarButtonInThreader(threadId, syncManager) {
	var insertAfterButton = document.getElementById(kHideButtonId);
	insertStarInThreadWindow(insertAfterButton);
}

function onUndoClicked(event, syncManager) {
    var hideUnhide = HideUnhide();
    hideUnhide.undo();
    hideThreads();
    updateStats(document);
	syncManager.syncPtbgAsap();
    event.preventDefault();	
}

function onUnhideAllClicked(event, syncManager) {
    var hideUnhide = HideUnhide();
    hideUnhide.unhideAll();
    hideThreads();
    updateStats(document);
	syncManager.syncPtbgAsap();
    event.preventDefault();	
}

const kDisallowedPtbgIdRegExp = /[^a-zA-Z0-9_]/g;

function onPtbgIdChanged(event, syncManager) {
    var globalSettings = GlobalSettings();
    var ptbgIdRaw = trim(event.target.value);
    var ptbgId = ptbgIdRaw.replace(kDisallowedPtbgIdRegExp, "");
    if (ptbgId !== ptbgIdRaw) {
        alertIfNotUnloading("Pimped TBG id can only contain alphanumeric characters.");
    }
    event.target.value = ptbgId;
    if (ptbgId != globalSettings.getPtbgId()) {
        globalSettings.setPtbgId(ptbgId);
    }
	clearPTBGErrorMsg();
	syncManager.syncPtbgAsap();
    
    changeKnytLinkToMobile();
}

function onPtbgIdKeyPress(event) {
    var kc = event.keyCode;
    var c = String.fromCharCode(kc);
    console.log("kc: " + kc + " c: " + c);
    if (!(  kc === 8 ||
            kc === 9 ||
            kc === 13 ||
            kc === 27 ||
            kc >= 37 && kc <= 40 ||
            c.replace(kDisallowedPtbgIdRegExp, "") !== ""))
    {
        event.preventDefault();
    }
}

function onNotificationChanged(event) {
    var anyNew = false;
    var globalSettings = GlobalSettings();

    var bumpNotifyBox = document.getElementById("bumpnotify");
    var starNotifyBox = document.getElementById("starnotify");
	var writtenNotifyBox = document.getElementById("writtennotify");
	var newNotifyBox = document.getElementById("newnotify");
	var onbump = globalSettings.getBumpNotify()

	if (event.target == bumpNotifyBox) {
	    anyNew |= bumpNotifyBox.checked && !globalSettings.getBumpNotify();
	    globalSettings.setBumpNotify(bumpNotifyBox.checked);
		if (bumpNotifyBox.checked) {
			starNotifyBox.checked = true;
			starNotifyBox.disabled = true;
			writtenNotifyBox.checked = true;
			writtenNotifyBox.disabled = true;
		}
		else {
			starNotifyBox.checked = globalSettings.getStarNotify();
			starNotifyBox.disabled = false;
			writtenNotifyBox.checked = globalSettings.getWrittenNotify();
			writtenNotifyBox.disabled = false			
		}
	}
	else if (event.target === starNotifyBox) { 
		var starNotify = starNotifyBox.checked;
		anyNew |= starNotify && !globalSettings.getStarNotify();
		globalSettings.setStarNotify(starNotify);
	}
	else if (event.target === writtenNotifyBox) {
		var writtenNotify = writtenNotifyBox.checked;
		anyNew |= writtenNotify && !globalSettings.getWrittenNotify();
		globalSettings.setWrittenNotify(writtenNotify);
	}
	else if (event.target === newNotifyBox) {
		var newNotify = newNotifyBox.checked;
		anyNew |= newNotify && !globalSettings.getNewNotify();
		globalSettings.setNewNotify(newNotify);
	}
    
    if (typeof(Notification) === "undefined") {
        disableAllNotifications();
        alertIfNotUnloading("Your browser does not support notifications.");
    }
    else if (anyNew) {
        Notification.requestPermission(onNotificationPermission);
    }
}

function disableAllNotifications() {
    var globalSettings = GlobalSettings();
    globalSettings.setStarNotify(false);
    globalSettings.setWrittenNotify(false);
    globalSettings.setNewNotify(false);
    globalSettings.setBumpNotify(false);
    document.getElementById("starnotify").checked = false;
    document.getElementById("writtennotify").checked = false;
    document.getElementById("newnotify").checked = false;
    document.getElementById("bumpnotify").checked = false;
}

function onNotificationPermission(permission) {
    console.log("onNotificationPermission: " + permission);
    if (permission === "denied" || permission === "default") {
        disableAllNotifications();
    }
    else if (permission === "granted") {
        // Do nothing
    }
    else {
        console.assert(false, permission);
    }
}

function onWriteStyleIndicationChanged(event) {
	var writeIndicationStyleSelector =
		document.getElementById(kWriteIndicationStyleId);
	var globalSettings = GlobalSettings();
	globalSettings.setWriteIndicationStyle(
		writeIndicationStyleSelector.selectedIndex);
	var changedThreadIds = [];
	var refreshAll = true;
	updateMainWindowFromChangedLocalStorage([changedThreadIds], [refreshAll]);
}

function onUnreadStatusChanged(event) {
	var unreadStatusCheckbox = document.getElementById(kUnreadStatusId);
	var globalSettings = GlobalSettings();
	globalSettings.setShowUnreadStatus(unreadStatusCheckbox.checked);
	var changedThreadIds = [];
	var refreshAll = true;
	updateMainWindowFromChangedLocalStorage([changedThreadIds], [refreshAll]);	
}

function onShowLatestChanged(event) {
	var showLatest = document.getElementById(kOpenMessageLatestId);
	var showFirstUnread = document.getElementById(kOpenMessageFirstUnreadId);
	console.assert(showLatest.checked != showFirstUnread.checked);
	
	var globalSettings = GlobalSettings();
	globalSettings.setOpenPopupsWithFirstUnreadMessage(showFirstUnread.checked);

	var changedThreadIds = [];
	var refreshAll = true;
	updateMainWindowFromChangedLocalStorage([changedThreadIds], [refreshAll]);	
}

function onThumbnailQualityChanged(event) {
    var thumbnailQualityHigh = document.getElementById(kThumbnailQualityHighId);
    var thumbnailQualityLow = document.getElementById(kThumbnailQualityLowId);
    
    var quality;
    if (thumbnailQualityLow.checked) {
        quality = 0;
    }
    else {
        console.assert(thumbnailQualityHigh.checked);
        quality = 1;
    }
    
    var globalSettings = GlobalSettings();
    globalSettings.setThumbnailQuality(quality);
}

function setupThumbnailQualityControls(globalSettings) {
	var ptbgShow = document.getElementById(kShowPtbgThumbnailsId);
	var extShow = document.getElementById(kShowExternalThumbnailsId);
	var ytShow = document.getElementById(kShowYoutubeThumbnailsId);
    
    var qualityEnabled = ptbgShow.checked || extShow.checked || ytShow.checked;

    var thumbnailQualityHigh = document.getElementById(kThumbnailQualityHighId);
    thumbnailQualityHigh.checked = globalSettings.getThumbnailQuality() == 1;
    thumbnailQualityHigh.disabled = !qualityEnabled;
    var thumbnailQualityLow = document.getElementById(kThumbnailQualityLowId);
    thumbnailQualityLow.checked = globalSettings.getThumbnailQuality() == 0;
    thumbnailQualityLow.disabled = !qualityEnabled;
}

const kPtbgIdId = "ptbgid";
const kWriteIndicationStyleId = "writeindicationstyle";
const kUnreadStatusId = "unreadstatus";
const kUnreadOldStyleStatysId = "unreadstatusoldstyle"

function setupPTBGControls(globalSettings, syncManager) {
    document.getElementById("undoLink").addEventListener("click",
		function(event) {
			onUndoClicked(event, syncManager);	
		},
		false);
    document.getElementById("unhideAllLink").addEventListener("click",
		function(event) {
			onUnhideAllClicked(event, syncManager);
		},
		false);
	
	var writeIndicationStyleSelector =
		document.getElementById(kWriteIndicationStyleId);
	writeIndicationStyleSelector.selectedIndex =
		globalSettings.getWriteIndicationStyle();
	writeIndicationStyleSelector.addEventListener("change",
		onWriteStyleIndicationChanged,
		false);
    
    var ptbgid = document.getElementById(kPtbgIdId);
    ptbgid.value = globalSettings.getPtbgId();
    ptbgid.addEventListener("change",
		function(event) {
			return onPtbgIdChanged(event, syncManager);
		},
		false);
    if (!isFirefox()) {
        // Can't get this to work properly in Firefox. Prevents arrow keys,
        // paste (Ctrl+V or Command+V), backspace etc. Too tricky to get right.
        ptbgid.addEventListener("keypress", onPtbgIdKeyPress, false);
    }
    
	var isbump = globalSettings.getBumpNotify();
	
    var starnotify = document.getElementById("starnotify");
    starnotify.checked = globalSettings.getStarNotify() || isbump;
	starnotify.disabled = isbump;
    var writtennotify = document.getElementById("writtennotify");
    writtennotify.checked = globalSettings.getWrittenNotify() || isbump
	writtennotify.disabled = isbump;
    var newnotify = document.getElementById("newnotify");
    newnotify.checked = globalSettings.getNewNotify();
    var bumpnotify = document.getElementById("bumpnotify");
    bumpnotify.checked = isbump;
    var checkboxes = [starnotify, writtennotify, newnotify, bumpnotify];
    var anyChecked = false;
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        checkbox.addEventListener("change", onNotificationChanged, false);
        anyChecked |= checkbox.checked;
    }
    if (typeof(Notification) === "undefined") {
        disableAllNotifications();
    }
    else if (anyChecked) {
        Notification.requestPermission(onNotificationPermission);
    }
	
	var ptbgShow = document.getElementById(kShowPtbgThumbnailsId);
	ptbgShow.addEventListener("change", onShowPtbgThumbnailsClicked, false);
	ptbgShow.checked = globalSettings.getShowPtbgThumbnails();
	var extShow = document.getElementById(kShowExternalThumbnailsId);
	extShow.addEventListener("change", onShowExternalThumbnailsClicked, false);
	extShow.checked = globalSettings.getShowExternalThumbnails();
	var ytShow = document.getElementById(kShowYoutubeThumbnailsId);
	ytShow.addEventListener("change", onShowYoutubeThumbnailsClicked, false);
	ytShow.checked = globalSettings.getShowYoutubeThumbnails();
    
    var qualityEnabled = ptbgShow.checked || extShow.checked || ytShow.checked;

    var thumbnailQualityHigh = document.getElementById(kThumbnailQualityHighId);
    thumbnailQualityHigh.addEventListener("change",
        onThumbnailQualityChanged,
        false);
    var thumbnailQualityLow = document.getElementById(kThumbnailQualityLowId);
    thumbnailQualityLow.addEventListener("change",
        onThumbnailQualityChanged,
        false);
    setupThumbnailQualityControls(globalSettings);
	
	var unreadShow = document.getElementById(kUnreadStatusId);
	unreadShow.checked = globalSettings.getShowUnreadStatus();
	unreadShow.addEventListener("change",
		onUnreadStatusChanged,
		false);
	var unreadShow2 = document.getElementById(kUnreadOldStyleStatysId);
	unreadShow2.checked = !globalSettings.getShowUnreadStatus();
	unreadShow2.addEventListener("change",
		onUnreadStatusChanged,
		false);
	
	var showLatest = document.getElementById(kOpenMessageLatestId);
	showLatest.checked = !globalSettings.getOpenPopupsWithFirstUnreadMessage();
	showLatest.addEventListener("change",
		onShowLatestChanged,
		false);
	var showFirstUnread = document.getElementById(kOpenMessageFirstUnreadId);
	showFirstUnread.checked = globalSettings.getOpenPopupsWithFirstUnreadMessage();
	showFirstUnread.addEventListener("change",
		onShowLatestChanged,
		false);
}



function parseTBGMainPage(text) {

    //                            threadClass                      tid    mid        subject            authorclass    author             time
    var tableRowRe = /<tr class="([woev]{1,4})"[^\/]+\/news_show\/(\d+)\/(\d+)[^>]+>([^<]+)<[^&]+class="([fa])">&nbsp;([^<]+)<[^&]+&nbsp;([^<]+)<\/td><\/tr>/g;

    var threadsOnPage = [];
    var match;
    while ( (match = tableRowRe.exec(text)) ) {
        threadsOnPage.push({
            threadCssClass : match[1],
            threadId : parseInt(match[2]),
            messageId : parseInt(match[3]),
            subject : trim(match[4]),
            authorClass : match[5],
            author : trim(match[6]),
            time : trim(match[7])
        });
    }
    
    console.log("Found " + threadsOnPage.length + " threads on TBG main page");
    
    return threadsOnPage;
}


notification = null;
notificationThreadIds = [];

function onNotificationClose() {
    notification = null;
    notificationThreadIds = [];
}

function createOnNotificationClickEventListener(threadAndMessageIds) {
    return function() {
		openPopups(document, threadAndMessageIds);
        if (notification != null) {
            notification.close();
            notification = null;
            notificationThreadIds = [];
        }
    }
}


function getChromeVersion() {
	var ver = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
	return ver;
}


function updateMainWindowWithTBGData(mainPageParseResult,
									 syncManager, notificationState)
{
    var lastUnhideAllTime = HideUnhide().getLastUnhideAllTime();
    var frameTarget = isFramesVersion() ? "News_TBGv2" : "";
    
    var tbody = document.createElement("tbody");
    var oldHeaderRow = document.evaluate(
		"//table[@class='thr']/tbody/tr[1]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
    var newHeaderRow = oldHeaderRow.cloneNode(true);
    tbody.appendChild(newHeaderRow);
    
    var globalSettings = GlobalSettings();
    var previousHighestKnownThreadId = globalSettings.getHighestKnownThreadId();
	var newHighestKnownThreadId = previousHighestKnownThreadId;
	var oldWrittenStyle = globalSettings.isOldStyleOn();
	var asteriskWrittenStyle = globalSettings.isAsteriskStyleOn();
	var showUnread = globalSettings.getShowUnreadStatus();
	var linkFirstUnread = globalSettings.getOpenPopupsWithFirstUnreadMessage();
    
    // These contain entries from mainPageParseResult
    var bumpedThreadsToNotify = [];
    var newThreadsToNotify = [];
	var allThreadsToNotify = [];
    
    var odd = true;
    var numHiddenThreads = 0;
    var numThreads = 0;
	
    for (var i = 0; i < mainPageParseResult.length; i++) {
        var parsedRow = mainPageParseResult[i];
        var threadInfo = ThreadInfo(parsedRow.threadId);
		if (parsedRow.threadId > previousHighestKnownThreadId) {
			newHighestKnownThreadId = Math.max(newHighestKnownThreadId, parsedRow.threadId);
		}				
		
        var row = document.createElement("tr");
        var author = parsedRow.author.indexOf("Anonymous") !== 0 ?
            makeSearchLinkHTML(parsedRow.author, null) : parsedRow.author;
        row.innerHTML = '<td class="s"><a href="/news_show/'+parsedRow.threadId+'/'+parsedRow.messageId+'">' +
            parsedRow.subject + ' <span class="g">('+parsedRow.messageId+' msg)</span></a></td><td class="' +
            parsedRow.authorClass + '">&nbsp;' + author + '</td><td class="d">&nbsp;' +
            parsedRow.time + '</td>';
        tbody.appendChild(row);
        modifyThreadRow(row, threadInfo, lastUnhideAllTime, odd,
						frameTarget, syncManager,
						oldWrittenStyle, asteriskWrittenStyle,
						showUnread, linkFirstUnread);
        if (threadInfo.isHidden(lastUnhideAllTime)) {
            numHiddenThreads += 1;
        }
        else {
            odd = !odd;
			
			var highestKnownMessageId =
				notificationState.getHighestMessageId(parsedRow.threadId);
            if (!threadInfo.hasRead(parsedRow.messageId)
					&& highestKnownMessageId < parsedRow.messageId)
            {
				if (parsedRow.threadId > previousHighestKnownThreadId && !threadInfo.hasWrittenInThread()) {
					if (globalSettings.getNewNotify()) {
						newThreadsToNotify.push(parsedRow);
						allThreadsToNotify.push(parsedRow);
					}
				}
				else if (globalSettings.getBumpNotify()
                            || threadInfo.isStar() && globalSettings.getStarNotify()
                            || threadInfo.hasWrittenInThread() && globalSettings.getWrittenNotify())
                {
                    bumpedThreadsToNotify.push(parsedRow);
					allThreadsToNotify.push(parsedRow);
                }
				notificationState.setHighestMessageId(parsedRow.threadId,
													  parsedRow.messageId);
            }
        }
        numThreads += 1;
    }
    
    globalSettings.setHighestKnownThreadId(newHighestKnownThreadId);
    
    newHeaderRow.innerHTML = newHeaderRow.innerHTML.replace(
        /Hidden threads: \d+\/\d+/i,
        "Hidden threads: " + numHiddenThreads + "/" + mainPageParseResult.length);
    
    var oldTbody = oldHeaderRow.parentNode;
    oldTbody.parentNode.replaceChild(tbody, oldTbody);

    var hasNotifications = typeof(Notification) !== "undefined";
    var hasFocus = typeof(document.hasFocus) === "undefined" ? false : document.hasFocus();
    var isHidden = typeof(document.hidden) !== "undefined" ?
            document.hidden :
            (typeof(document.webkitHidden) !== "undefined" ? document.webkitHidden : true);
    
    if (allThreadsToNotify.length > 0 && hasNotifications && (isHidden || !hasFocus)) {
        // Chrome 27.0.1453.116 doesn't have Notification.permission apparently.
        if (Notification.permission && Notification.permission === "default") {
            Notification.requestPermission(onNotificationPermission);
        }
        else if (!Notification.permission || Notification.permission === "granted") {
            var body = "";
            var title;
            
            if (newThreadsToNotify.length > 0 && bumpedThreadsToNotify.length > 0) {
                title = "" + newThreadsToNotify.length + " new and " +
					bumpedThreadsToNotify.length + " bumped threads";
            }
            else if (newThreadsToNotify.length === 1) {
                title = "New thread";
                body = newThreadsToNotify[0].subject;
            }
            else if (bumpedThreadsToNotify.length === 1) {
                var threadId = bumpedThreadsToNotify[0].threadId;
                var threadInfo = ThreadInfo(threadId);
                if (threadInfo.isStar()) {
                    title = "Bumped star thread";
                }
                else if (threadInfo.hasWrittenInThread()) {
                    title = "Bumped thread you have written in";
                }
                else {
                    title = "Bumped thread";
                }
                body = bumpedThreadsToNotify[0].subject;
            }
            else if (newThreadsToNotify.length > 1) {
                title = "" + newThreadsToNotify.length + " new threads";
            }
            else if (bumpedThreadsToNotify.length > 1) {
                title = "" + bumpedThreadsToNotify.length + " bumped threads";
            }
            else {
                console.assert(false);
            }
            
            if (notification !== null) {
                notification.close();
				notification = null;
            }
            
            for (var i = 0; i < newThreadsToNotify.length; i++) {
                var threadId = newThreadsToNotify[i].threadId
                if (!isInArray(threadId, notificationThreadIds)) {
                    notificationThreadIds.push(threadId);
                }
            }
            for (var i = 0; i < bumpedThreadsToNotify.length; i++) {
                var threadId = bumpedThreadsToNotify[i].threadId;
                if (!isInArray(threadId, notificationThreadIds)) {
                    notificationThreadIds.push(threadId);
                }
            }
			if (isFramesVersion()) {
				allThreadsToNotify = [allThreadsToNotify[0]];
			}
            
			var notificationParams = {
					tag : "tbg",
					body : unescapeHtml(body)
				};
			if (isChrome() && getChromeVersion() >= 29) {
				notificationParams.icon = kIcon;
			}
			notification = new Notification(title, notificationParams);
			notification.onclick = allThreadsToNotify.length <= 4 ?
				createOnNotificationClickEventListener(allThreadsToNotify) :
				function() {
					window.focus();
				}
			notification.onclose = onNotificationClose;
			console.log("Notification: " + notification);
			
			setTimeout(function() {
					if (notification &&
							typeof(notification.close) == "function")
					{
						notification.close();
						notification = null;
					}
				},
				7000);
        }
    }
}

var greenThreadRowStatusId = createSingleIdFunction("unwrittenMessages");

function updateRowUnreadStatus(row, threadInfo, messageId) {
	var spanId = greenThreadRowStatusId(threadInfo.getThreadId());
	var span = document.getElementById(spanId);
	updateUnreadMessagesSpan(span, threadInfo, messageId);
}

function oldStyleNumMessagesStatus(row, threadId, messageId) {
	var spanId = greenThreadRowStatusId(threadId);
	var span = document.getElementById(spanId);
	span.textContent = "(" + messageId + " msg)";
}


var updateMainWindowFromChangedLocalStorageDebounced =
		Debouncer(updateMainWindowFromChangedLocalStorage, 500);


function updateMainWindowFromChangedLocalStorage(
		listOfListsOfChangedThreadIds, refreshAlls) {
    console.log("updateMainWindowFromChangedLocalStorage() - " +
				JSON.stringify(listOfListsOfChangedThreadIds));

	var refreshAll = refreshAlls.indexOf(true) != -1;

    var changedThreadIdsLookup = [];
	for (var i = 0; i < listOfListsOfChangedThreadIds.length; i++) {
		var listOfChangedThreadIds = listOfListsOfChangedThreadIds[i];
		for (var j = 0; j < listOfChangedThreadIds.length; j++) {
			var threadId = listOfChangedThreadIds[j];
			changedThreadIdsLookup[threadId] = true;
		}
    }
    
    var lastUnhideAllTime = HideUnhide().getLastUnhideAllTime();
	
	var globalSettings = GlobalSettings();
	var oldStyle = globalSettings.isOldStyleOn();
	var asteriskStyle = globalSettings.isAsteriskStyleOn();
	var showNumUnread = globalSettings.getShowUnreadStatus();
    
	var even = false;
    var allRows = getThreadTableRows(document);
    var length = allRows.snapshotLength;
    // Start from index 1 to skip the top (header) row.
    for (var i = 1; i < length; i++) {
        var row = allRows.snapshotItem(i);
        var threadId = getThreadIdFromRow(row);
        if (refreshAll || changedThreadIdsLookup[threadId]) {
            var threadInfo = ThreadInfo(threadId);
			var hidden = threadInfo.isHidden(lastUnhideAllTime);
            updateRowHiddenStatus(row, hidden);
            updateRowStarStatus(row, threadInfo.isStar());
            updateRowWrittenStatus(row, threadInfo.hasWrittenInThread(),
								   oldStyle, asteriskStyle, even);
            var messageId = getMessageIdFromRow(row);
			if (showNumUnread) {
				updateRowUnreadStatus(row, threadInfo, messageId);
			}
			else {
				oldStyleNumMessagesStatus(row, threadId, messageId);
			}
			var linkMessageId = getMessageIdToOpen(threadId, messageId,
													 globalSettings);
            if (threadInfo.hasRead(linkMessageId)) {
                changeClassToVisitedForRow(row);
            }
			else {
				changeClassToUnvisitedForRow(row, even);
			}
			if (!hidden) {
				even = !even;
			}
        }
    }
    
    updateStats(document);
}

function updateMainWindow(changedThreadIds, unhideAllTimeChanged, mainPageParseResult,
						  syncManager, notificationState) {
    if (mainPageParseResult != null) {
        updateMainWindowWithTBGData(mainPageParseResult,
									syncManager, notificationState);
    }
    else if (changedThreadIds != null) {
        updateMainWindowFromChangedLocalStorage([changedThreadIds], [unhideAllTimeChanged]);
    }
}



function changeKnytLinkToMobile() {
    // A simpler xpath would have been "//td[@class='menu']/span[2]/a", but
    // it only works in main window, not in search window etc.
    var a = document.evaluate(
        "//a[contains(@href, 'pimpedtbg.appspot.com') or " +
            "contains(@href, 'www.knyt.se')]",
        document,
        null,
        XPathResult.ANY_UNORDERED_NODE_TYPE,
        null).singleNodeValue;
    if (a) {
        var ptbgId = GlobalSettings().getPtbgId();
        
        a.textContent = "MOBILE";
        if (ptbgId == "") {
            a.href = "http://pimpedtbg.appspot.com";
        }
        else {
            a.href = "http://pimpedtbg.appspot.com/userscript?ptbgid=" +
                        encodeURIComponent(ptbgId);
        }
    }
}



function getFirstParentNodeWithNodeName(node, nodeName) {
	console.assert(typeof(nodeName) === "string");
	for (var e = node.parentNode; e != null; e = e.parentNode) {
		if (e.nodeName === nodeName) {
			return e;
		}
	}
	return null;
}

function getChildNodeWithNodeName(node, nodeName) {
	console.assert(typeof(nodeName) === "string");
	for (var e = node.firstChild; e != null; e = e.nextSibling) {
		if (e.nodeName === nodeName) {
			return e;
		}
	}
	return null;
}

function getFirstDescendantNodeWithNodeName(node, nodeName) {
	console.assert(typeof(nodeName) === "string");
	for (var e = node.firstChild; e != null; e = e.nextSibling) {
		if (e.nodeName === nodeName) {
			return e;
		}
		var r = getFirstDescendantNodeWithNodeName(e, nodeName);
		if (r) {
			return r;
		}
	}
	return null;
}

function getNextSiblingWithNodeName(node, nodeName) {
	console.assert(typeof(nodeName) === "string");
	for (var e = node.nextSibling; e != null; e = e.nextSibling) {
		if (e.nodeName === nodeName) {
			return e;
		}
	}
	return null;	
}

function getPreviousSiblingWithNodeName(node, nodeName) {
	console.assert(typeof(nodeName) === "string");
	for (var e = node.previousSibling; e != null; e = e.previousSibling) {
		if (e.nodeName === nodeName) {
			return e;
		}
	}
	return null;	
}


function insertFramesLink() {
	
	var globalSettings = GlobalSettings();
	var isFrames2 = window.top.location.pathname.indexOf("/frames2") === 0; 
	if (isFrames2) {
		console.assert(isFramesVersion());
		globalSettings.setFrames2(true);
	}
	else if (window.top.location.pathname.indexOf("/frames") === 0) {
		console.assert(isFramesVersion());
		globalSettings.setFrames2(false);
	}
	else {
		console.assert(!isFramesVersion());
	}
	
	var preferredFramesLink = globalSettings.getFrames2() ?
		"/frames2/" : "/frames/";
	
	var newsSpan = document.evaluate(
			"//td[@class='menu']/span[descendant::a[contains(@href, 'news.cgi')]]",
			document,
			null,
			XPathResult.ANY_UNORDERED_NODE_TYPE,
			null).singleNodeValue;
	var newsLink;
	if (newsSpan) {
		newsLink = getFirstDescendantNodeWithNodeName(newsSpan, "A");
		
		var framesSpan = newsSpan.cloneNode(true);
		var framesLink = getChildNodeWithNodeName(framesSpan, "A");
		framesLink.textContent = "FRAMES";
		
		// Decide where to put the arrow. menuitem2 is an external link so
		// we can be sure it never has an arrow underneath.
		if (isFramesVersion()) {
			newsSpan.className = "menuitem2";
			if (isFrames2) {
				framesLink.href = "/frames/";
			}
			else {
				framesLink.href = "/frames2/";
			}
			framesLink.target = "_top";
		}
		else {
			framesSpan.className = "menuitem2";
			framesLink.href = preferredFramesLink;
		}
		
		var fragment = document.createDocumentFragment();
		fragment.appendChild(document.createTextNode(" "));
		fragment.appendChild(framesSpan);
		
		newsSpan.parentNode.insertBefore(fragment, newsSpan.nextSibling);
	}
	else {
		var newsXpath = "/center/table[1]/tbody/tr[1]/td/" +
				"table/tbody/tr/td[descendant::a[contains(@href, 'news.cgi')]]";
		var newsTd = document.evaluate(
			"./div" + newsXpath + "|." + newsXpath,
			document.body,
			null,
			XPathResult.ANY_UNORDERED_NODE_TYPE,
			null).singleNodeValue;
		if (!newsTd) {
			console.error("Couldn't find top menu");
			return;
		}
		newsLink = getFirstDescendantNodeWithNodeName(newsTd, "A");
		
		var framesTd = newsTd.cloneNode(true);
		var framesLink = getFirstDescendantNodeWithNodeName(framesTd, "A");
		framesLink.textContent = "FRAMES";
		if (isFramesVersion()) {
			framesLink.href = "/cgi-bin/news.cgi";
		}
		else {
			framesLink.href = preferredFramesLink;
		}
		
		var tdSpace = getNextSiblingWithNodeName(newsTd, "TD").cloneNode(true);
		
		var fragment = document.createDocumentFragment();
		fragment.appendChild(tdSpace);
		fragment.appendChild(framesTd);
		
		newsTd.parentNode.insertBefore(fragment, newsTd.nextSibling);
		
		var arrowXpath = "/center/table[1]/tbody/tr[1]/td/" +
				"table/tbody/tr[2]/td[descendant::img]";
		var arrowTd = document.evaluate(
			"./div" + arrowXpath + "|." + arrowXpath,
			document.body,
			null,
			XPathResult.ANY_UNORDERED_NODE_TYPE,
			null).singleNodeValue;
		var increaseColSpanTd;
		var isLoginPage = location.pathname.indexOf("login.cgi") !== -1;
		if (isLoginPage) {
			increaseColSpanTd = getNextSiblingWithNodeName(arrowTd, "TD");
		}
		else {
			increaseColSpanTd = getPreviousSiblingWithNodeName(arrowTd, "TD");
		}
		increaseColSpanTd.colSpan = "" + (parseInt(increaseColSpanTd.colSpan) + 2);
	}
	
	newsLink.target = "_top";
}


function onRefreshIntervalChanged(event, syncManager) {
	var globalSettings = GlobalSettings();
	var oldRefreshInterval = globalSettings.getRefreshInterval();
	var value = parseInt(event.target.value);
	if (/^\s*[0-9]+\s*$/.test(event.target.value) && value <= 9999) {
		if (value < 15) {
			value = 15;
			event.target.value = value;
		}
		globalSettings.setRefreshInterval(value);
		syncManager.syncAsap();
	}
	else {
		event.target.value = oldRefreshInterval;
	}
	return true;
}


function xpathGetSingle(xpath, node) {
	node = node || document;
	var result = document.evaluate(
		xpath,
		node,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	return result;
}

function xpathGet(xpath, node) {
	node = node || document;
	var result = document.evaluate(
		xpath,
		node,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	return result;
}


const kSpoilerName = "spoiler";
const kShowHideButtonName = "showhidebutton";
const kShowButtonText = "Show";
const kHideButtonText = "Hide";
const kShowPtbgThumbnailsId = "showptbgthumbnails";
const kShowExternalThumbnailsId = "showexternalthumbnails";
const kShowYoutubeThumbnailsId = "showyoutubethumbnails";

function onShowHideOptionsClicked(event) {
	var show;
	var button = event.currentTarget;
	if (button.value == kShowButtonText) {
		show = true;
	}
	else {
		console.assert(button.value == kHideButtonText);
		show = false;
	}
	GlobalSettings().setShowOptions(show);
	
    var spoilers = document.getElementsByClassName(kSpoilerName);
    for (var i = 0; i < spoilers.length; i++) {
        var e = spoilers[i];
        if (e.style.display == 'none') {
            e.style.display = '';
        } else {
            e.style.display = 'none';
        }
    }
}


function onShowPtbgThumbnailsClicked(event) {
	var globalSettings = GlobalSettings();
	globalSettings.setShowPtbgThumbnails(event.target.checked);
    setupThumbnailQualityControls(globalSettings);
}

function onShowExternalThumbnailsClicked(event) {
	var globalSettings = GlobalSettings();
	globalSettings.setShowExternalThumbnails(event.target.checked);
    setupThumbnailQualityControls(globalSettings);
}

function onShowYoutubeThumbnailsClicked(event) {
    var globalSettings = GlobalSettings();
	globalSettings.setShowYoutubeThumbnails(event.target.checked);
    setupThumbnailQualityControls(globalSettings);
}


const kOpenMessageLatestId = "openlatest";
const kOpenMessageFirstUnreadId = "openfirstunread";


const kThumbnailQualityHighId = "thumbnailqualityhigh";
const kThumbnailQualityLowId = "thumbnailqualitylow";


function moveChildNodes(from, to) {
    while (from.hasChildNodes()) {
        to.appendChild(from.firstChild);
    }
}


function modifyMainWindowOptions(globalSettings, syncManager) {
	var showOptions = globalSettings.getShowOptions();
	
	var reloadInputBox = document.getElementById("r");
	var refreshLabel = reloadInputBox.parentNode;
	refreshLabel.innerHTML = '&nbsp;Refresh&nbsp;every&nbsp;' +
		'<input type="text" id="r" name="r" size="2" maxlength="4" pattern="[0-9]*" class="input">' +
		'&nbsp;sec';
	var reloadInputBoxValue = reloadInputBox.value;
	
    var form1 = document.forms[1];
    form1.id = "form1";
    
	var showhideButtonDiv = document.createElement("div");
	showhideButtonDiv.innerHTML =
		'<input type="button" class="' + kShowHideButtonName + '" ' +
		'  title="Click to show options" type="button" ' +
		'  value="' + kShowButtonText + '" form="form1"/>';
	showhideButtonDiv.className = kSpoilerName;
	showhideButtonDiv.style.display = showOptions ? "none" : "block";

	var optionssetTd = xpathGetSingle("//td[@class='optionsset']");
	var optionssetDiv = document.createElement("div");
	optionssetDiv.className = kSpoilerName;
	optionssetDiv.style.display = showOptions ? "block" : "none";
    moveChildNodes(optionssetTd, optionssetDiv);
	optionssetTd.innerHTML = "";
	
	optionssetTd.appendChild(showhideButtonDiv);
	optionssetTd.appendChild(optionssetDiv);
	
	var refreshInputBox = document.getElementById("r");
	var refreshInterval = globalSettings.getRefreshInterval();
	if (refreshInterval === null) {
		refreshInterval = reloadInputBoxValue == "10" ? 15 : (parseInt(reloadInputBoxValue)*60/4);
		refreshInputBox.value = refreshInterval;
		globalSettings.setRefreshInterval(refreshInterval);
	}
	else {
		refreshInputBox.value = refreshInterval;
	}
	
	var newOptionsTr = document.createElement('tr');
    newOptionsTr.innerHTML = [
		'<td class="optionstext"></td>',
		'<td class="optionsset">',
		'	<div class="' + kSpoilerName + '" style="display: ' +
						(showOptions ? 'block' : 'none') + '">',
		'		<table style="font-size: 1.0em; display: inline; float: left;" cellspacing="8" cellpadding="5">',
		'			<tbody>',
		'			<br/>',
		'			',
		'			<tr>',
		'				<td style="font-size: 1.0em" align="left"> ',
		'					<label for="' + kWriteIndicationStyleId + '">Indication style:</label>',
		'				</td>',
		'				 <td style="font-size: 1.0em" align="left" colspan="4">                                                   ',
		'						<select id="' + kWriteIndicationStyleId + '" class="select">',
		'							<option value="0">none</option>',
		'							<option value="1">orange asterisk</option>',
		'							<option value="2">white background</option>',
		'							<option value="3">asterisk and background</option>',
		'						</select>',
		'				 </td>',
		'			</tr>',
		'				',
		'			<tr>',
		'				<td style="font-size: 1.0em" align="left">',
		'					 <label for="' + kPtbgIdId + '">PTBG ID:</label>',
		'				</td>',
		'				<td style="font-size: 1.0em" align="left" colspan="4">',
		'					 <input id="' + kPtbgIdId + '" type="text" ' +
                                'pattern="[a-zA-Z0-9_]*" spellcheck="false" ' +
                                'maxlength="24" style="width: 8em" class="input" />',
		'				</td>',
		'			</tr>',
        '',
		'			<tr>',
		'					<td align="left" style="font-size: 1.0em">Notifications:</td>',
		'					<td align="left" style="font-size: 1.0em" span="4">',
		'							<label for="newnotify">New</label>',
		'							<input type="checkbox" id="newnotify" class="checkbox" />',
		'					</td>',
		'					<td align="left" style="font-size: 1.0em">',
		'							<label for="bumpnotify">&nbsp;Bumped</label>',
		'							<input type="checkbox" id="bumpnotify" class="checkbox" />',
		'					</td>',
		'					<td align="left" style="font-size: 1.0em">',
		'							<label for="starnotify">Star</label>',
		'							<input type="checkbox" id="starnotify" class="checkbox" disabled="" />',
		'					</td>',
		'					<td align="left" style="font-size: 1.0em">',
		'							&nbsp;&nbsp;<label for="writtennotify">Written</label>',
		'							<input type="checkbox" id="writtennotify" class="checkbox" disabled="" />',
		'					</td>',
		'			</tr>',
		'',
		'           <tr>',
		'                   <td style="font-size: 1.0em" align="left">Show Thumbnails: </td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kShowPtbgThumbnailsId + '">PTBG</label>',
		'                           <input type="checkbox" id="' + kShowPtbgThumbnailsId + '" class="checkbox" /></td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kShowExternalThumbnailsId + '">&nbsp;External</label>',
		'                           <input type="checkbox" id="' + kShowExternalThumbnailsId + '" class="checkbox" /></td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kShowYoutubeThumbnailsId + '">Youtube</label>',
		'                           <input type="checkbox" id="' + kShowYoutubeThumbnailsId + '" class="checkbox" /></td>',
		'           </tr>',
		'           <tr>',
		'                   <td style="font-size: 1.0em" align="left">Thumbnail Quality: </td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kThumbnailQualityLowId + '">Low</label>',
		'                           <input type="radio" id="' + kThumbnailQualityLowId + '" name="tnqualgroup" class="checkbox" /></td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kThumbnailQualityHighId + '">&nbsp;High</label>',
		'                           <input type="radio" id="' + kThumbnailQualityHighId + '" name="tnqualgroup" class="checkbox" /></td>',
		'           </tr>',
		'           <tr>',
		'                   <td style="font-size: 1.0em" align="left">Thread Info: </td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kUnreadStatusId + '">Unread</label>',
		'                           <input type="radio" id="' + kUnreadStatusId + '" name="unreadgroup" class="checkbox" /></td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kUnreadOldStyleStatysId + '">&nbsp;Old style</label>',
		'                           <input type="radio" id="' + kUnreadOldStyleStatysId + '" name="unreadgroup" class="checkbox" /></td>',
		'           </tr>',
		'           <tr>',
		'                   <td style="font-size: 1.0em" align="left">Open Message: </td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kOpenMessageLatestId + '">Latest</label>',
		'                           <input type="radio" id="' + kOpenMessageLatestId + '" name="openmsggroup" class="checkbox" /></td>',
		'                   <td style="font-size: 1.0em" align="left">',
		'                           <label for="' + kOpenMessageFirstUnreadId + '">&nbsp;First Unread</label>',
		'                           <input type="radio" id="' + kOpenMessageFirstUnreadId + '" name="openmsggroup" class="checkbox" /></td>',
		'           </tr>',
        '			<tr>',
		'					<td style="font-size: 1.0em" align="left">Hide Actions: </td>',
		'					<td style="font-size: 1.0em" align="left"><a id="undoLink" href="#" style="color: white; ">Undo</a></td>',
		'					<td style="font-size: 1.0em" align="left">&nbsp;<a id="unhideAllLink" href="#" style="color: white;">Unhide All</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>  ',
		'			</tr>',
		'			',
		'			</tbody>',
		'		</table>',
		'	</div>',
		'</td>'].join("\n");
	var newOptionsButtonTr = document.createElement('tr');
	newOptionsButtonTr.innerHTML = '<td/>' +
		'<td align="right">' +
		'    <div class="' + kSpoilerName + '" style="display: ' +
					(showOptions ? 'block' : 'none') + '">' +
		'        <input type="button" ' +
		'                class="' + kShowHideButtonName + '" ' +
		'                title="Click to hide options" ' +
		'                type="button"' +
		'                value="' + kHideButtonText + '" />' + 
		'    </div>' + 
		'</td>';

    var tbody = xpathGetSingle("//table[@class='opt']/tbody");
    tbody.appendChild(newOptionsTr);
	tbody.appendChild(newOptionsButtonTr);
    
	var buttons = document.getElementsByClassName(kShowHideButtonName);
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", onShowHideOptionsClicked, false);
	}

	refreshInputBox.addEventListener("change",
		function(event) {
			return onRefreshIntervalChanged(event, syncManager);
		},
		false);
	
	setupPTBGControls(globalSettings, syncManager);
}

	
// Dummy replacements for Apachez functions				
dependencies["showNews"] = [];
function showNews() {
}
dependencies["reloadNews"] = [];
function reloadNews() {
}
dependencies["framesNews"] = [];
function framesNews() {
}
dependencies["sc"] = [];
function sc() {
}



function mainSetup() {
    (typeof(unsafeWindow) !== "undefined" && unsafeWindow || window).ptbgCache = {};

	createErrorDivs();
    
    var globalSettings = GlobalSettings();
	
    var imageDownloader = ImageDownloader(
        function(url, token, unpacked) {
            // Can't replace message since it's not being displayed!
        }
    )
	var messageDownloader = MessageDownloader(imageDownloader);
	var deanonymizer = Deanonymizer(null);
    var syncManager = PTBGSyncManagerForMainWindow(messageDownloader,
            deanonymizer);

	// Needs to be done before syncing might start since we set the refresh
	// interval here.
	modifyMainWindowOptions(globalSettings, syncManager);

	var notificationState = NotificationState();
	var threadIdsOnPage = modifyThreadRows(globalSettings,
										   syncManager, notificationState);
	syncManager.startSyncing(threadIdsOnPage, notificationState);

    changeKnytLinkToMobile();
	
	makeMainWindowUsersSearchable();
	
	insertFramesLink();
	
	setupMainWindowKeyAccelerators(messageDownloader, syncManager);
	prefetchMessagesOnMainPage(messageDownloader, globalSettings);

	injectCode(["showNews", "framesNews", "sc"], "");
}

const kThreadMessageUrlRe = /\/news_show\/(\d+)\/(\d+)/;

function getThreadIdFromURL(url) {
	var match = kThreadMessageUrlRe.exec(url);
	if (match) {
		return parseInt(match[1]);
	}
	else {
		return null;
	}
}

function getMessageIdFromURL(url) {
	var match = kThreadMessageUrlRe.exec(url);
	if (match) {
		return parseInt(match[2]);
	}
	else {
		return null;
	}
}

function extractMessage(html) {
	
	function extractHeaderField(h) {
		// If changing this regexp, test the following combinations:
		//  * clicking on threader
		//  * background loading in threader
		// with
		//  * Firefox
		//  * Opera
		//  * Opera turbo
		//  * Chrome
		var re = new RegExp(h + 
			':<\\/b><\\/td><td\\s+' +
			'(?:width="?80%"?\\s*|nowrap(?:="nowrap"|="")?\\s*)+' +
			'>((?:[^<]|<a|<\/a)*)<');
		var m = re.exec(html);
		if (m) {
			return m[1];
		}
		else {
			return null;
		}
	}
	var subject = extractHeaderField("SUBJECT");
	var author = extractHeaderField("FROM");
	var info = extractHeaderField("INFO");
	var date = extractHeaderField("DATE");
	var link = extractHeaderField("LINK");
	
	var threadId = null;
	var messageId = null;
	if (link) {
		threadId = getThreadIdFromURL(link);
		messageId = getMessageIdFromURL(link);
	}
	
	if (subject === null || author === null || 
			info === null || date === null) 
	{
		return null;
	}
	
	var dateIndex = /DATE:/.exec(html).index;
	var beforeMessageRe = /<tr><td colspan="?3"?><br>/im;
	var m = beforeMessageRe.exec(html.substr(dateIndex));
	if (m === null) {
		return null;
	}
	var messageBeginIndex = m.index + 
		dateIndex + m[0].length;
	var afterMessageRe = /<\/td><\/tr>/im;
	m = afterMessageRe.exec(html.substr(messageBeginIndex));
	if (m === null) {
		return null;
	}
	var messageEndIndex = m.index + messageBeginIndex;
	var body = html.substring(messageBeginIndex, 
		messageEndIndex);
	
	var htmlDecodedBody = htmlDecode(body);

	return {messageId: messageId, threadId: threadId,
		subject: subject, author: author, info: info, date: date,
		link: link, message: htmlDecodedBody};
}

function extractMessagesMetaData(html) {
	var tableStartRe = /CURRENT&nbsp;THREAD/mi;
	var tableStartIndex = html.search(tableStartRe);
	if (tableStartIndex == -1) {
		return null;
	}
	var tableHtml = html.substr(tableStartIndex);
	var tableEndRe = /<\/table>/mi;
	tableHtml = tableHtml.substr(0, tableHtml.search(tableEndRe));
	var rows = [];
	var tableRowStartRe = new RegExp(/<tr[^>]*>/mig);
	while (tableRowStartRe.exec(tableHtml) != null) {
		var rowHtml = tableHtml.substr(tableRowStartRe.lastIndex);
		var tableRowEndRe = /<\/tr>/mi;
		rowHtml = rowHtml.substr(0, rowHtml.search(tableRowEndRe));
		rows.push(rowHtml);
	}
	rows.pop();		// footer, "webmaster apachez"
	var messages = [];
	for (var i in rows) {
		var whiteSpaceRe = /<td[^>]*>((?:[^<]|<[^a])+)<a/i;
		var ws = whiteSpaceRe.exec(rows[i])[1];
		ws = ws.replace(/<img[^>]+>/mig, "&nbsp;&nbsp;&nbsp;");
		var indentation = ws.length / (3*6) - 1;
		
		var ahrefRe = /<a href="?[^"]*\/news_show\/(\d+)\/(\d+)"?/i;
		var ahrefMatch = ahrefRe.exec(rows[i]);
		var threadId = parseInt(ahrefMatch[1]);
		var messageId = parseInt(ahrefMatch[2]);
		
		var authorRe = /<\/a><\/td><td[^>]+>\&nbsp;(?:<font[^>]*>)?([^<]+)</im
		var author = authorRe.exec(rows[i])[1];
		
		var ageRe = /align="?right"?[^>]*>\&nbsp;([^<]+)<\/td>/im
		var age = ageRe.exec(rows[i])[1];
		
		messages.push({threadId: threadId, messageId: messageId,
			indentation: indentation, author: author, age: age});
	}
	return messages;
}

const kText = 0;
const kQuoteHeader = 1;
const kQuote = 2;
const kEmpty = 3;

function splitMessage(body, trace) {
	var split = body.split(/<br>/);
	
	var quoteHeaderRe = /^<font color="?aaaaaa"?>[^&\s][^<]+\swrote[^<]+at \d{4}-\d{2}-\d{2} \d{2}:\d{2}<\/font>$/i;
	var quoteRe = /^<font color="?aaaaaa"?>\s*&gt;\s*((?:[^<]|<[^\/]|<\/[^f])*)<\/font>$/i;
	var oldQuoteRe = /^<font color="?aaaaaa"?>\s*&gt;\s*&gt;\s*((?:[^<]|<[^\/]|<\/[^f])*)<\/font>$/i;
	var whiteSpaceRe = /^\s*(?:<font color="?aaaaaa"?>\s*&gt;\s*<\/font>)?$/i;
    var quotedQuoteHeaderLineSpanRe = /^<font color="?aaaaaa"?>\s*&gt;\s*\w[^<]{0,20}\swrote\s[^<]+at\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}<\/font>$/i;
    var quotedQuoteHeaderRe = /^<font color="?aaaaaa"?>\s*&gt;\s*\w[^<]{0,20} wrote [^<]+ at \d{4}-\d{2}-\d{2} \d{2}:\d{2}<\/font>$/i;
    
	var quotedText = "";
	var originalText = "";
	
	var lines = [];	
	for (var i = 0; i < split.length; i++) {
		if (trace) {
			console.log("i=" + i + ", split.length=" + split.length +
						", split[i]=" + split[i]);
		}
		var line = split[i];
		
		var match;
		if (quoteHeaderRe.test(line)) {
			if(trace) console.log("quoteHeaderRe");
			lines.push({type: kQuoteHeader, content: line});
		}
		else if (whiteSpaceRe.test(line)) {
			if(trace) console.log("whiteSpaceRe");
			lines.push({type: kEmpty, content: ""});
		}        
		else if (oldQuoteRe.test(line)) {
			if(trace) console.log("oldQuoteRe");
			// Ignore line
		}
        else if (quotedQuoteHeaderRe.test(line)) {
			if(trace) console.log("quotedQuoteHeaderRe");
            // Ignore line
        }
        else if (i < split.length-1 &&
            quotedQuoteHeaderLineSpanRe.test(
                    line.replace(/\s*<\/font>$/i, " ") +
                    split[i+1].replace(/^<font color="?aaaaaa"?>\s*&gt;\s*/i, " ")))
        {
			if(trace) console.log("quotedQuoteHeaderLineSpanRe");
			// The "xxx wrote ... at 2013-.." can be split into two lines.
            // Ignore line and next line
            i += 1;
        }
		else if ((match = quoteRe.exec(line)) != null) {
			if(trace) console.log("quotedtext, match[1]=" + match[1]);
			lines.push({type: kQuote, content: line});
			quotedText += match[1];
		}
		else {
			if(trace) console.log("originaltext");
			lines.push({type: kText, content: line});
			originalText += line;
		}
	}
	
	if (trace) {
		console.log("quotedText = " + quotedText);
		console.log("orig  text = " + originalText);
	}

	var stripRe = /\s/g;
	var linkRe = /<a href="?([^\s"]+)"? [^>]+>[^<]+<\/a>/g;
	var linkReplacement = '$1';
	var replaceRes = [[linkRe, linkReplacement], [stripRe, ""], [/&amp;/g, "&"]];
	for (var i in replaceRes) {
		var r = replaceRes[i];
		quotedText = quotedText.replace(r[0], r[1]);	
		originalText = originalText.replace(r[0], r[1]);
	}
	
	return {lines: lines, quotedText: quotedText, originalText: originalText};
}


function stripEmptyLinesFromBothEnds(lines) {
    while (lines.length > 0 && lines[0].type == kEmpty) {
        lines.shift();
    }
    while (lines.length > 0 && lines[lines.length-1].type == kEmpty) {
        lines.pop();
    }
}


function trimMessage(body, parentBody, trace) {
	// When true, log some information to console.log() about how the messages
	// are interpreted. I'have had many bugs in this code before and this
	// significantly speeds up finding them.
	
	// Some messages that has failed to quote properly before:
	// http://www.tbg.nu/news_show/154096/187
	// http://www.tbg.nu/news_show/154096/230
	// http://www.tbg.nu/news_show/180113/10
	// http://www.tbg.nu/news_show/180113/2
	
	var b = splitMessage(body, trace);
	var p = splitMessage(parentBody, trace);
	
	function f(a) {
		var s = "";
		for (var i in a) {
			s += "" + a[i].type + " " + a[i].content + "\n";	
		}
		return s;
	}
	
	var quotedWholeText = b.quotedText == p.originalText;
	if (trace) {
		console.log("Difference lengths, " + b.quotedText.length + " and " +
					p.originalText.length);
		var len = Math.min(b.quotedText.length, p.originalText.length);
		var i;
		for (i = 0; i < len; i++) {
			if (b.quotedText.charAt(i) !== p.originalText.charAt(i)) {
				console.log("Difference at index " + i);
				console.log(b.quotedText.substring(Math.max(0, i-10), i) +
							"___" + b.quotedText.substr(i, 10));
				console.log(p.originalText.substring(Math.max(0, i-10), i) +
							"___" + p.originalText.substr(i, 10));
				break;
			}
		}
	}
	if (quotedWholeText) {
		if (trace) console.log("quotedWholeText!");
		
		var lines = b.lines;

        // Remove all empty lines from both ends, then remove all quotes+quoteHeaders+emptyLines from one end.
        // If all that remains are empty lines and text, return it (after once again stripping empty lines from
        // both ends).
        stripEmptyLinesFromBothEnds(lines);
        if (lines.length === 0) {
            // A message with only white space.
            return body;
        }
		if (lines[0].type != kText) {
			while (lines.length > 0 && lines[0].type != kText) {
				lines.shift();
			}
		}
		else {
			while (lines.length > 0 && lines[lines.length-1].type != kText) {
				lines.pop();			
			}		
		}
        var newBody = [];
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].type != kText && lines[i].type != kEmpty) {
                return body;
            }
            else {
                newBody.push(lines[i].content);
            }
        }
		return newBody.join("<br>");
	}
	else {	
		return body;
	}
}


function resetBorderColor(messageId) {
	var div = document.getElementById(threaderMessageBodyId(messageId)).parentNode;
	if (div.style.borderColor != "orange") {
		div.style.borderColor = "#aaaaaa";
	}
}


function createMessageStubElement(threadId,
	messageId, indentation, header, bordercolor) 
{
	var outerDiv = document.createElement('div');
	outerDiv.id = "msg" + messageId + "outerDiv";
	var indentationPixels = indentation*25;
	var outerDivStyle = [
			'flow: vertical',
			'margin-top: 4px',
			'margin-bottom: 4px',
			'margin-left: ' + indentationPixels + 'px',
			'width: 485px',
			'font-family: verdana, arial, helvetica',
			'font-size: 0.7em'
		].join(";");
	outerDiv.setAttribute('style', outerDivStyle);
		
	var blueDivStyle = [
			'border-style: solid',
			'border-width: 1px',
			'border-color: ' + bordercolor,
			'background-color: #000055',
			'padding: 5px',
			'margin-top: 2px'
		].join(";");
	
	var s = [
			'<a name="m', messageId, '"/>',
			'<div style="flow: horizontal; width: 485px">',
				'<a style="float: right; color: #aaaaaa"',
						'href="/news_show/', threadId, '/', messageId, '">',
					'#', messageId,
				'</a>',
				'<span id="msg', messageId, 'head" style="color: #aaaaaa">',
					header,
				'</span>',
			'</div>',
			'<div id="msg', messageId, 'border" name="ptbg_newlycreated" ',
					'style="', blueDivStyle, '">',
				'<div id="', threaderMessageBodyId(messageId), '" ',
						'name="ptbg_newlycreated">',
					'<font color="#40aa40">Loading...</font>',
				'</div>',
			'</div>',
			'<span style="width: 100%" id="' +
                pimpedReplySpanId(messageId) + '"/>',
		].join("");
	
	outerDiv.innerHTML = s;
	
	return outerDiv;
}

function makeSearchLinkHTML(author, target) {
    var frames = isFramesVersion() ? 1 : 0;
	var t;
	if (target) {
		t = 'target="' + target + '" ';
	}
	else {
		t = '';
	}
	return '<a href="/cgi-bin/news_search.cgi?mi=1&mg=1&mu=0&ms=1&q=&u=' +
		encodeURIComponentIsoLatin(author.replace("&amp;", "&")) +
		'&f=' + frames + '" ' + t + 'style="color: white">' + author + '</a>';
}

const kFirstNames = [
    "Enrique", "Titus", "Lavern", "Courtney", "Vaughn", "Ludvig",
    "Garfield", "Sergio", "Herman", "Maxwell", "Edward", "Modesto",
    "Tyler", "William", "Olle", "Theo", "Everett", "Dominique",
    "Eldridge", "Eduardo", "Ambrose", "Brad", "Mark", "Timothy", "Isiah",
    "Tobias", "Ellsworth", "Wesley", "Wayne", "Freddie", "Vince",
    "Maynard", "Vito", "Morris", "Lindsey", "Porfirio", "Cristobal",
    "Kirk", "Nicolas", "Craig", "Cruz", "Charles", "Eugene", "Clifton",
    "Svante", "Jacob", "Fidel", "Kareem", "Joshua", "Adam", "Simon",
    "Carlos", "Ashley", "Ira", "Hayden", "Raymond", "Derek", "Roosevelt",
    "Ruben", "Fausto", "Vincent", "Jason", "Hector", "Granville",
    "Ferdinand", "Kermit", "Samuel", "Rafael", "Dirk", "Felix", "Duane",
    "Armando", "Cecil", "Gary", "Hipolito", "Kevin", "Corey", "Hilario",
    "Otto", "Alfred", "Tage", "Edgar", "Florencio", "Malte", "Jacques",
    "Valentin", "Jacinto", "Melvin", "Haywood", "Desmond", "Houston",
    "Thaddeus", "Cornelius", "John", "Dwayne", "Billy", "Tyrone",
    "Conrad", "Bruce", "Axel", "Benedict", "Elton", "Manuel", "Ryan",
    "Alejandro", "Eric", "Gustav", "Lionel", "Stanley", "Benjamin",
    "Osvaldo", "Glenn", "Sam", "Louis", "Brandon", "Luther", "Aubrey",
    "Raleigh", "Clayton", "Hampus", "Edmund", "Ramiro", "Sidney",
    "Matthew", "Brian", "Roland", "Anibal", "Adrian", "Julio", "Tommy",
    "Shirley", "Trinidad", "Vilgot", "Andy", "Bradford", "Alex",
    "Emerson", "Victor", "Arnulfo", "Mitchell", "Leroy", "Benito",
    "Herbert", "Matteo", "Deangelo", "Tanner", "Gabriel", "Patrick",
    "Columbus", "Wilhelm", "Clarence", "Nathaniel", "Michael", "Elliot",
    "Refugio", "Freeman", "Ted", "Nelson", "Chadwick", "Landon", "Arthur",
    "Ezekiel", "Stuart", "Oliver", "Cameron", "Emil", "Demetrius",
    "Linus", "Reggie", "Bob", "Henry", "Nils", "Dewitt", "Leslie",
    "Jermaine", "Greg", "Viggo", "Silas", "Bernard", "Kristoffer",
    "Miguel", "Delmar", "Gordon", "Theodor", "Willard", "Howard", "Seth",
    "Ramon", "Ny", "Giovanni", "Bennett", "Clyde", "Woodrow", "Rashad",
    "Clifford", "Odell", "Ahmed", "Jordan", "Leland", "Fred", "Solomon",
    "Elmer", "Emmitt", "Bertram", "Graham", "Chad", "Alonso", "Milton",
    "Cesar", "Wade", "Reginald", "Aurelio", "Lucas", "Gerald", "Fletcher",
    "Orville", "Seymour", "Julian", "Esteban", "Margarito", "Max",
    "Dudley", "Millard", "Booker", "Claude", "Brent", "Jared", "Cordell",
    "Guadalupe", "Kurt", "Philip", "Mohamed", "Anderson", "Murray",
    "Frank", "Todd", "Russell", "Grover", "Ralph", "Anton", "August",
    "Dallas", "Anthony", "Rasmus", "Ernest", "Chris", "Shane",
    "Sylvester", "Dwight", "Octavio", "Johnny", "Rick", "Vernon",
    "Marcus", "Albert", "Santiago", "Mike", "Jeremiah", "Tyrell",
    "Lawrence", "Jack", "Shelby", "Arnold", "Francis", "Sherwood",
    "Major", "Coleman", "Steve", "Demarcus", "Guy", "Rosario", "Gregory",
    "Orlando", "Hershel", "Duncan", "Leandro", "Aron", "Kelly", "Isak",
    "Joaquin", "Alexander", "Liam", "Douglas", "Cedric", "Guillermo",
    "Horace", "Eusebio", "Neil", "Charlie", "Norman", "Salvador",
    "Lincoln", "Dusty", "Tony", "Clement", "Teodoro", "Isreal",
    "Pasquale", "Donald", "Rodrick", "Gustavo", "Rodney", "Noah",
    "Marshall", "Antonio", "Bobby", "Danny", "Jessie", "Ville", "Deshawn",
    "James", "Wallace", "Cleveland", "Arvid", "Erasmo", "Giuseppe",
    "Mckinley", "Gonzalo", "Christian", "Arturo", "Buford", "Hugh",
    "Quinn", "Napoleon", "Virgil", "Ebbe", "Cody", "Orval", "Byron",
    "Ignacio", "Harvey", "Randy", "Levi", "Spencer", "Chester", "Vidar",
    "Sterling", "Travis", "Kyle", "Elbert", "Trevor", "Roger", "Javier",
    "Hjalmar", "Juan", "Harold", "Lester", "Tristan", "David", "Colin",
    "Ali", "Forest", "Sigge", "Jamie", "Dominic", "Daniel", "Allan",
    "Ulysses", "Ricardo", "Jerome", "Keenan", "Elisha", "Nathan",
    "Donovan", "Curtis", "Leopoldo", "Jeremy", "Casper", "Calvin",
    "Frederick", "Numbers", "Zachary", "Sebastian", "Richard", "Troy",
    "Eddie", "Lance", "Marcellus", "Edison", "Fernando", "Kenneth",
    "George", "Jonathan", "Isidro", "Tracy", "Elwood", "Jeff", "Wilmer",
    "Whitney", "Maurice", "Peter", "Fritz", "Hiram", "Linwood", "Jimmy",
    "Cletus", "Scott", "Adolfo", "Fabian", "Randall", "Melker", "Justin",
    "Cliff", "Terence", "Oscar", "Dennis", "Thomas", "Rogelio", "Gilbert",
    "Sixten", "Andrew", "Zachariah", "Keith", "Daryl"];
    
const kLastNames = [
    "Abbott", "Acevedo", "Acosta", "Adams", "Aguilar", "Aguirre",
    "Alexander", "Ali", "Allen", "Alvarado", "Alvarez", "Anderson",
    "Andrade", "Andrews", "Anthony", "Archer", "Arellano", "Arias",
    "Armstrong", "Arnold", "Arroyo", "Ashley", "Atkinson", "Austin",
    "Avery", "Avila", "Ayala", "Bailey", "Baldwin", "Ballard", "Banks",
    "Barajas", "Barnes", "Barrera", "Bartlett", "Bass", "Bautista",
    "Baxter", "Beard", "Beasley", "Beltran", "Bender", "Benitez",
    "Benjamin", "Bennett", "Bentley", "Berg", "Berger", "Bernard",
    "Bishop", "Blackburn", "Blackwell", "Blair", "Blake", "Blanchard",
    "Blankenship", "Blevins", "Bolton", "Bonilla", "Booker", "Boone",
    "Booth", "Bowen", "Bowman", "Bradford", "Bradley", "Bradshaw",
    "Branch", "Brandt", "Braun", "Brennan", "Brewer", "Bridges", "Briggs",
    "Brock", "Brooks", "Brown", "Browning", "Bruce", "Buchanan",
    "Buckley", "Bullock", "Burch", "Burgess", "Burke", "Burns", "Butler",
    "Cabrera", "Cain", "Calderon", "Caldwell", "Calhoun", "Callahan",
    "Camacho", "Cameron", "Campbell", "Campos", "Cannon", "Cantrell",
    "Cantu", "Cardenas", "Carpenter", "Carrillo", "Carroll", "Carter",
    "Castaneda", "Castillo", "Castro", "Cervantes", "Chambers",
    "Chandler", "Chaney", "Chapman", "Charles", "Chavez", "Cherry",
    "Choi", "Christensen", "Christian", "Church", "Cisneros", "Clay",
    "Clayton", "Clements", "Cobb", "Cochran", "Coffey", "Cole", "Coleman",
    "Collier", "Colon", "Combs", "Compton", "Conner", "Conrad",
    "Contreras", "Conway", "Copeland", "Cordova", "Cortez", "Costa",
    "Cowan", "Craig", "Crane", "Crawford", "Crosby", "Cruz", "Cuevas",
    "Cummings", "Cunningham", "Curry", "Curtis", "Davenport", "Davidson",
    "Davila", "Delacruz", "Deleon", "Delgado", "Dennis", "Diaz",
    "Dickerson", "Dickson", "Dillon", "Dodson", "Dominguez", "Donaldson",
    "Donovan", "Dorsey", "Douglas", "Downs", "Drake", "Duarte", "Dudley",
    "Duffy", "Duke", "Duncan", "Dunlap", "Dunn", "Duran", "Durham",
    "Dyer", "Eaton", "Edwards", "Elliott", "Ellis", "English", "Erickson",
    "Escobar", "Esparza", "Espinoza", "Estes", "Estrada", "Evans",
    "Everett", "Ewing", "Farley", "Farmer", "Faulkner", "Ferguson",
    "Fields", "Figueroa", "Finley", "Fitzgerald", "Fitzpatrick",
    "Fleming", "Fletcher", "Flores", "Flowers", "Flynn", "Foley",
    "Forbes", "Ford", "Foster", "Fowler", "Francis", "Franco", "Frank",
    "Franklin", "Frazier", "Frederick", "Freeman", "French", "Friedman",
    "Fritz", "Frost", "Fuentes", "Fuller", "Gaines", "Gallagher",
    "Gallegos", "Galloway", "Galvan", "Gamble", "Garcia", "Garza",
    "Gentry", "George", "Gibbs", "Gibson", "Gilbert", "Gill", "Gillespie",
    "Gilmore", "Glass", "Glenn", "Glover", "Gomez", "Goodman", "Goodwin",
    "Gordon", "Gould", "Graham", "Grant", "Graves", "Gregory", "Griffin",
    "Griffith", "Grimes", "Guerra", "Guerrero", "Gutierrez", "Guzman",
    "Hahn", "Hamilton", "Hammond", "Hampton", "Hancock", "Hardy",
    "Harmon", "Harper", "Harrington", "Hart", "Hartman", "Harvey",
    "Hatfield", "Hawkins", "Hayden", "Heath", "Hebert", "Henderson",
    "Hendricks", "Hendrix", "Henry", "Hensley", "Herman", "Herrera",
    "Herring", "Hess", "Hickman", "Hicks", "Hines", "Hinton", "Ho",
    "Hobbs", "Holland", "Holloway", "Holmes", "Holt", "Hopkins", "House",
    "Houston", "Howard", "Huang", "Hubbard", "Huber", "Hudson", "Huerta",
    "Huff", "Hughes", "Humphrey", "Hunt", "Hurley", "Hurst", "Hutchinson",
    "Huynh", "Ibarra", "Ingram", "Irwin", "Jackson", "Jacobs", "Jacobson",
    "James", "Jarvis", "Jefferson", "Jenkins", "Jennings", "Jensen",
    "Jimenez", "Johns", "Jones", "Jordan", "Joseph", "Joyce", "Kaiser",
    "Kaufman", "Keith", "Kemp", "Kennedy", "Kent", "Kerr", "Key", "Kidd",
    "Kim", "Kirby", "Kirk", "Klein", "Knapp", "Knight", "Knox", "Koch",
    "Kramer", "Krause", "Krueger", "Lambert", "Landry", "Lara",
    "Lawrence", "Leach", "Leblanc", "Leon", "Leonard", "Levine", "Levy",
    "Lewis", "Lindsey", "Little", "Livingston", "Lopez", "Lowery",
    "Lozano", "Lucas", "Lucero", "Luna", "Lutz", "Lynch", "Lynn", "Lyons",
    "Macias", "Mack", "Madden", "Maddox", "Mahoney", "Maldonado",
    "Malone", "Mann", "Manning", "Marquez", "Marsh", "Marshall", "Martin",
    "Martinez", "Mason", "Massey", "Mata", "Mathis", "Maxwell", "Maynard",
    "Mcbride", "Mccall", "Mccann", "Mcclain", "Mcclure", "Mcconnell",
    "Mccormick", "Mccoy", "Mccullough", "Mcdaniel", "Mcdowell",
    "Mcfarland", "Mcgrath", "Mcguire", "Mcintosh", "Mcintyre", "Mckay",
    "Mckenzie", "Mckinney", "Mcknight", "Mclaughlin", "Mclean", "Mcmahon",
    "Mcmillan", "Mcneil", "Mcpherson", "Meadows", "Medina", "Mejia",
    "Melendez", "Melton", "Mendez", "Mendoza", "Mercado", "Mercer",
    "Merritt", "Meza", "Michael", "Middleton", "Miller", "Miranda",
    "Mitchell", "Molina", "Monroe", "Montes", "Montgomery", "Montoya",
    "Moody", "Moon", "Mooney", "Moore", "Morales", "Moreno", "Morrison",
    "Morrow", "Morse", "Mosley", "Mueller", "Mullen", "Mullins", "Munoz",
    "Murillo", "Murphy", "Murray", "Nash", "Navarro", "Neal", "Nelson",
    "Newman", "Newton", "Nguyen", "Nichols", "Nicholson", "Nielsen",
    "Noble", "Nolan", "Norman", "Novak", "Nunez", "Obrien", "Ochoa",
    "Oconnor", "Odom", "Oliver", "Oneal", "Oneill", "Orozco", "Orr",
    "Ortega", "Ortiz", "Pacheco", "Padilla", "Palmer", "Parrish",
    "Parsons", "Patel", "Patrick", "Patterson", "Patton", "Paul", "Payne",
    "Pearson", "Pena", "Pennington", "Perez", "Perkins", "Peters",
    "Petty", "Pham", "Phelps", "Phillips", "Pierce", "Pineda", "Pittman",
    "Pollard", "Ponce", "Poole", "Pope", "Pratt", "Preston", "Proctor",
    "Pruitt", "Pugh", "Quinn", "Ramirez", "Ramos", "Ramsey", "Randall",
    "Randolph", "Rangel", "Rasmussen", "Raymond", "Reese", "Reeves",
    "Reilly", "Reyes", "Reynolds", "Rhodes", "Richardson", "Richmond",
    "Riddle", "Riggs", "Rios", "Ritter", "Rivas", "Roach", "Robbins",
    "Roberts", "Robinson", "Robles", "Rocha", "Rodriguez", "Rojas",
    "Roman", "Romero", "Rosales", "Rosario", "Roth", "Rowland", "Rubio",
    "Ruiz", "Russell", "Russo", "Ryan", "Salas", "Salazar", "Salinas",
    "Sanchez", "Sandoval", "Sanford", "Santana", "Santiago", "Santos",
    "Savage", "Sawyer", "Schaefer", "Schneider", "Schroeder", "Schultz",
    "Schwartz", "Scott", "Sellers", "Serrano", "Sexton", "Shaffer",
    "Shannon", "Sharp", "Shea", "Shelton", "Shepherd", "Sherman",
    "Shields", "Short", "Silva", "Simmons", "Simon", "Sims", "Singh",
    "Singleton", "Skinner", "Sloan", "Small", "Smith", "Snow", "Snyder",
    "Solis", "Solomon", "Sosa", "Soto", "Sparks", "Spears", "Stafford",
    "Stanley", "Stanton", "Stark", "Steele", "Stein", "Stephens",
    "Stephenson", "Stevens", "Stevenson", "Stewart", "Stokes", "Stone",
    "Stout", "Strickland", "Strong", "Stuart", "Sullivan", "Summers",
    "Sutton", "Swanson", "Sweeney", "Tanner", "Tapia", "Tate", "Taylor",
    "Thomas", "Thompson", "Thornton", "Todd", "Torres", "Townsend",
    "Tran", "Travis", "Trevino", "Trujillo", "Tucker", "Turner", "Tyler",
    "Underwood", "Valdez", "Valencia", "Valentine", "Valenzuela", "Vance",
    "Vargas", "Vega", "Velez", "Villa", "Villanueva", "Villarreal",
    "Villegas", "Vincent", "Wallace", "Walsh", "Warren", "Washington",
    "Watkins", "Watson", "Watts", "Weaver", "Weber", "Webster", "Weeks",
    "Weiss", "Wheeler", "Whitaker", "White",
    "Whitney", "Wilcox", "Wilkerson", "Wilkins", "Wilkinson", "Williams",
    "Williamson", "Willis", "Wilson", "Winters", "Wise", "Wyatt", "Yoder",
    "York", "Young", "Zamora", "Zavala", "Zimmerman", "Zuniga"];
    
const kSbox = [234, 65, 148, 251, 23, 86, 32, 39, 183, 124, 156, 57,
    175, 77, 188, 66, 29, 12, 83, 17, 59, 98, 253, 53, 81, 216, 213,
    26, 179, 82, 46, 111, 31, 142, 254, 200, 246, 143, 177, 118, 52,
    212, 222, 226, 106, 198, 241, 173, 201, 176, 115, 187, 235, 154,
    215, 43, 121, 68, 7, 242, 78, 228, 90, 117, 129, 195, 72, 146, 19,
    192, 58, 27, 1, 51, 14, 178, 136, 210, 5, 116, 229, 109, 44, 105,
    112, 223, 214, 189, 64, 218, 80, 219, 10, 163, 8, 144, 9, 252,
    160, 191, 131, 204, 164, 238, 100, 248, 181, 232, 233, 85, 211,
    24, 110, 104, 114, 94, 34, 196, 108, 207, 138, 166, 123, 126, 205,
    249, 127, 231, 250, 45, 193, 6, 134, 36, 21, 169, 113, 0, 55, 75,
    224, 237, 225, 153, 185, 245, 48, 49, 37, 170, 151, 168, 240, 255,
    141, 206, 96, 155, 28, 30, 130, 91, 147, 150, 202, 157, 42, 120,
    47, 89, 171, 174, 74, 132, 71, 149, 97, 161, 69, 62, 167, 165,
    244, 73, 11, 209, 140, 13, 172, 35, 145, 197, 102, 239, 3, 159,
    67, 217, 180, 99, 56, 16, 133, 184, 128, 4, 162, 227, 103, 203,
    182, 20, 22, 54, 220, 33, 41, 79, 186, 93, 101, 230, 194, 208, 84,
    25, 236, 40, 95, 158, 76, 119, 2, 18, 61, 247, 139, 63, 70, 87,
    60, 125, 199, 135, 15, 152, 243, 137, 92, 221, 50, 190, 122, 88,
    107, 38];
    
function randomPermutation(seed, a, b) {
    console.assert(seed > 0);
    console.assert(a >= 0);
    console.assert(a < 256);
    console.assert(b >= 0);
    console.assert(b < 256);

    a = kSbox[(a + b) % 256];
    b = kSbox[(a ^ b) % 256];
    a = kSbox[(a + 256 - b) % 256];
    return [a, b];
}

function getPseudoRandomName(a, b) {
    var totalNumNames = kFirstNames.length * kLastNames.length;
    var xy = randomPermutation(42, a, b);
    var index = xy[0] * 256 + xy[1];
    var index2 = Math.floor(totalNumNames / (256*256) * index);
    var firstName = kFirstNames[index2 % kFirstNames.length];
    var lastName = kLastNames[Math.floor(index2 / kFirstNames.length)];
    return firstName + " " + lastName;
}

const kAnonymousIpRe = /^((?:\s|nbsp;?)*)Anonymous((?:&nbsp;?|\s)*(?:&lt;|<)(\d+)\.(\d+)\.\*\.\*(?:&gt;|>)\s*)$/;

var anonymousEditsId = createSingleIdFunction("anonymousEdits");
var anonymousNameEditId = createSingleIdFunction("anonymousNameEdit");
var anonymousColorEditId = createSingleIdFunction("anonymousColorEdit");



// Stolen from
// http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegexp(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

const kValidSpecialChars = "!()*+,-./:?@[]_{}|~$ ";
const kValidNonAsciiCharCodes = [163, 169, 174, 178, 179, 181, 188, 189, 190,
    191, 196, 197, 198, 201, 203, 209, 214, 216, 220, 223, 227, 228, 229, 230,
    235, 241, 245, 246, 248, 252];
const kMaxUserSpecifiedNameChars = 20;
function createRegexpForValidChars() {
    var regExpString = "^[a-zA-Z0-9" + escapeRegexp(kValidSpecialChars);
    for (var i = 0; i < kValidNonAsciiCharCodes.length; i++) {
        regExpString += String.fromCharCode(kValidNonAsciiCharCodes[i]);
    }
    regExpString += "]{0," + kMaxUserSpecifiedNameChars + "}$";
    return new RegExp(regExpString);
}
const kValidNameRegExp = createRegexpForValidChars();

const kColorNames = [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige",
    "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown",
    "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral",
    "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue",
    "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki",
    "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed",
    "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray",
    "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray",
    "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia",
    "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green",
    "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory",
    "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon",
    "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow",
    "LightGray", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen",
    "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime",
    "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue",
    "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue",
    "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue",
    "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", 
    "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod",
    "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff",
    "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown",
    "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell",
    "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow",
    "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato",
    "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow",
    "YellowGreen"];


function createRegexpForValidColors() {
    const re0to255 = "(?:\\s*0*(?:\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\s*)";

    var regExpStringList = kColorNames.concat([
        "#?[0-9a-fA-F]{3}",
        "#?[0-9a-fA-F]{6}",
        "rgb\\(" + re0to255 + "," + re0to255 + "," + re0to255 + "\\)",
        "rgba\\(" + re0to255 + "," + re0to255 + "," + re0to255 + "," +
            "(?:\\s*(?:0+|0*1|0*1\\.0+|0*\\.\\d+)\\s*)" + "\\)"]);
    var regExpString = "^(?:" + regExpStringList.join("|") + ")?$";
    return new RegExp(regExpString, "i");
}

const kValidColorRegExp = createRegexpForValidColors();

const kIncompleteHexColorRegExp = /^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;


function findSmallestPrefixMatchingRegexp(str, regexp) {
    var substr = str;
    while (!regexp.test(substr)) {
        substr = substr.substr(0, substr.length-1);
    }
    return substr;
}


function createAnonymousAuthorSpan(authorType, authorString, color,
            messageIdMaybeWithPrefix)
{
    var id = anonymousAuthorSpanId(messageIdMaybeWithPrefix);
    if (color == "") {
        color = getAnonymousColor(authorType);
    }
    var colorTag = color=="" ? '' : (' style="color: ' + color + '"');
    var edit = '<span id="' + anonymousEditsId(messageIdMaybeWithPrefix) + '"' +
                ' style="position: relative; display: none">' +
                '<span style="position: absolute; top: 1.3em; width: 250px"> ' +
                  '<input placeholder="Name" id="' +
                    anonymousNameEditId(messageIdMaybeWithPrefix) + '" ' +
                    'size="' + (kMaxUserSpecifiedNameChars-2) + '" ' +
                    'maxlength="' + kMaxUserSpecifiedNameChars + '" ' +
                    'spellcheck="false"/>' +
                  '<input placeholder="Color" size="13" id="' +
                    anonymousColorEditId(messageIdMaybeWithPrefix) + '" ' + 
                    'spellcheck="false"/>' +
                '</span>' +
                '</span>';
    var span = '<span>' + edit + '<span id="' + id + '"' + colorTag + '>' +
            authorString + '</span></span>';
    return span;
}

const kIpRe = /(?:&lt;?|<)(\d+)\.(\d+)\.\*\.\*(?:&gt;?|>)$/;

function addAnonymousAuthorSpanClickListener(deanonymizer, syncManager,
        messageId, prefix)
{
    prefix = prefix || "";
    
    var nameSpan = document.getElementById(
            anonymousAuthorSpanId(prefix + messageId));
    var editSpan = document.getElementById(
            anonymousEditsId(prefix + messageId));
    var nameInput =
            document.getElementById(anonymousNameEditId(prefix + messageId));
    var colorInput =
            document.getElementById(anonymousColorEditId(prefix + messageId));
    
    var hideTimeout = null;
    
    // Firefox sends "input" and "blur" events when escape is pressed
    // and the input hidden. This causes the temp name to get treated
    // just as if enter was pressed if it wasn't for this flag.
    var userPressedEscape = false;

    var match = kIpRe.exec(
            nameSpan.innerHTML);
    var ip1 = parseInt(match[1]);
    var ip2 = parseInt(match[2]);
    
    function editFinished() {
        if (!userPressedEscape && hideTimeout === null) {
            hideTimeout = setTimeout(function() {
                    var name = trim(nameInput.value);
                    if (!kValidNameRegExp.test(name)) {
                        nameInput.value =
                            deanonymizer.getUserAssignedName(ip1, ip2);
                        colorInput.value =
                            deanonymizer.getUserAssignedColor(ip1, ip2);
                        deanonymizer.resetTempUserAssignedName();
                    }
                    else {
                        var color = trim(colorInput.value);
                        if (!kValidColorRegExp.test(color)) {
                            color = "";
                            colorInput.value = color;
                        }
                        deanonymizer.setUserAssignedName(ip1, ip2, name, color);
                    }
                    editSpan.style.display = "none";
                    syncManager.syncAsap();
                },
                20);
        }
    }
    
    function openEdit() {
        userPressedEscape = false;
    
        nameInput.value = deanonymizer.getUserAssignedName(ip1, ip2);
        colorInput.value = deanonymizer.getUserAssignedColor(ip1, ip2);
        
        nameInput.style.borderColor = "";
        nameInput.style.outlineColor = "";
        colorInput.style.borderColor = "";
        colorInput.style.outlineColor = "";
    
        editSpan.style.display = "inline";
        nameInput.focus();
        
        if (nameInput.createTextRange) {
            var range = nameInput.createTextRange();
            range.move('character', nameInput.value.length);
            range.select();
        }
        else if (nameInput.setSelectionRange) {
            nameInput.setSelectionRange(0, nameInput.value.length);
        }
    }
    
    function onFocus() {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
    }
    
    function onInput() {
        if (!userPressedEscape) {
            var name = trim(nameInput.value);
            var color = trim(colorInput.value);
            
            var nameOk = kValidNameRegExp.test(name);
            nameInput.style.borderColor = nameOk ? "" : "red";
            nameInput.style.outlineColor = nameOk ? "" : "red";

            var colorOk = kValidColorRegExp.test(color);
            colorInput.style.borderColor = colorOk ? "" : "red";
            colorInput.style.outlineColor = colorOk ? "" : "red";
            color = (colorOk && nameOk) ? color : "";
            
            deanonymizer.setTempUserAssignedName(ip1, ip2, name, color);
        }
    }
    
    function onKeyDown(event) {
        var kc = event.keyCode;
        var c = String.fromCharCode(kc);
        console.log("kc: " + kc + " c: " + c);
        if (kc == 27) { // Escape
            userPressedEscape = true;
            nameInput.value = deanonymizer.getUserAssignedName(ip1, ip2);
            colorInput.value = deanonymizer.getUserAssignedColor(ip1, ip2);
            deanonymizer.resetTempUserAssignedName();
            editSpan.style.display = "none";
        }
        else if (kc == 13) { // Enter
            // "change" is not triggered on enter if nothing changed.
            editFinished();
        }
    }
    
    function wrap(eventHandlerFunc) {
        return function(event) {
            console.log("Event " + event.type + " on " + event.target.id);
            eventHandlerFunc(event);
        }
    }
    
    var eventListeners = [
        [nameSpan, "click", wrap(openEdit)],
        [nameInput, "focus", wrap(onFocus)],
        [colorInput, "focus", wrap(onFocus)],
        [nameInput, "blur", wrap(editFinished)],
        [colorInput, "blur", wrap(editFinished)],
        [nameInput, "change", wrap(editFinished)],
        [colorInput, "change", wrap(editFinished)],
        [nameInput, "input", wrap(onInput)],
        [colorInput, "input", wrap(onInput)],
        [nameInput, "keydown", wrap(onKeyDown)],
        [colorInput, "keydown", wrap(onKeyDown)]
    ];
    
    for (var i = 0; i < eventListeners.length; i++) {
        var a = eventListeners[i];
        var element = a[0];
        var eventName = a[1];
        var func = a[2];
        element.addEventListener(eventName, func, false);
    }    
}

function addAnonymousAuthorSpanClickListenerForMessagesInMessageList(
        deanonymizer, syncManager)
{
    var numMessageTableRows = document.evaluate(
		"count(//table[@id='" + kMessageTableId + "']/tbody/tr)",
        document,
		null,
		XPathResult.NUMBER_TYPE,
		null).numberValue;
    var numMessages = numMessageTableRows-2;  // Subtract header and footer
    var highestMessageId = numMessages;

    for (var messageId = 1; messageId <= highestMessageId; messageId++) {
        var span = document.getElementById(anonymousAuthorSpanId(messageId));
        if (span) {
            addAnonymousAuthorSpanClickListener(deanonymizer,
                syncManager, messageId);
            var ipMatch = kIpRe.exec(span.innerHTML);
            console.assert(ipMatch);
            deanonymizer.addMessage(messageId, "Anonymous " + ipMatch[0]);
        }
    }
}



function createHeaderHtml(message, deanonymizer) {
	var author;
	if (message.author.indexOf("Anonymous") == 0) {
        // Anonymous, with or without IP (deanonymizer is non-null when
        // there is an IP present)
        if (deanonymizer) {
            var typeNameColor = deanonymizer.getName(message.author);
            author = createAnonymousAuthorSpan(
                        typeNameColor[0], typeNameColor[1], typeNameColor[2],
                        message.messageId);
        }
        else {
            author = message.author;
        }
	}
	else {
        // Registered user
		var plaintext_author = message.author.replace(/&nbsp(;?)/g, '');
		if (message.author.search(/&lt;[0-9.*]{7,11}&gt;/) == -1) {
			plaintext_author = plaintext_author.replace(/&lt;.*/g, '');
		}
		author = makeSearchLinkHTML(plaintext_author,
									isFramesVersion() ? "main" : "_blank");
	}
	
	var header;
	if (message.age.indexOf("today") == 0 || 
			message.age.indexOf("yesterday") == 0)
	{
		header = message.age.substr(0,1).toUpperCase() + 
			message.age.substr(1) +
			' ' + author + ' wrote';
	}
	else if (message.date) {
		header = message.age + " (" + message.date + ") " +
            '<span id="' + threaderAuthorId(message.messageId) + '">' +
            author + '</span> wrote';		
	}
	else {
		header = message.age + " " + author + " wrote";
	}
	
	return header;
}

function getThreaderMessageBorderDiv(messageId) {
	var div = document.getElementById(
		'msg' + messageId + 'border');
    return div;
}

function onMessageDivClicked(event) {
	var target = event.target;
	if (target.nodeName == 'A') {
		// Don't pick up the "Reply" link clicks.
		return;
	}
	var digitsRe = /(\d+)/;
	var messageId = digitsRe.exec(event.currentTarget.id)[1];
	var div = getThreaderMessageBorderDiv(messageId);
	if (div.style.borderColor != "orange") {
		div.style.borderColor = "#aaaaaa";
	}
}

function createBorderResetEventListeners() {
	var divs = document.getElementsByName("ptbg_newlycreated");
    var length = divs.length;
	for (var i = 0; i < length; i += 1) {
		var div = divs[i];
		div.name = "";
		div.addEventListener('click',
			onMessageDivClicked,
			true);	
	}
}

function insertNewMessageStubsInDocument(threadId, messages, newIds) {
	var threadInfo = ThreadInfo(threadId);
	for (var i in newIds) {
		var id = newIds[i];
		if (!document.getElementById("msg" + id + "outerDiv")) {
			var m = messages.getMessage(id);
			
			var previousId = m.previousId;
			var previousDomId = "msg" + previousId + "outerDiv";
			var previousElement = document.getElementById(previousDomId);

			var header = createHeaderHtml(m, null);
			var borderColor = getBorderColor(threadInfo, id);
			var newStub = createMessageStubElement(threadId,
				id, m.indentation, header, borderColor);
			previousElement.parentNode.insertBefore(
				newStub, previousElement.nextSibling);
		}
	}
	createBorderResetEventListeners();
}

function trim(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

function trimRight(s) {
	while (s.length > 0 && s[s.length-1].trim() == "") {
		s = s.substr(0, s.length-1);
	}
	return s;
}



const kLT_Original = 700;
const kLT_Quote = 701;
const kLT_QuoteQuote = 702;

function getLineType(line) {
	var re = /^<font color="?aaaaaa"?>\s*&gt;\s*(&gt;)?/
	var match = re.exec(line);
	if (match) {
		if (match[1]) {
			return kLT_QuoteQuote;
		}
		else {
			return kLT_Quote;
		}
	}
	else {
		return kLT_Original;
	}
}



function replaceWithCharCode(match, number) {
	return String.fromCharCode(parseInt(number));
}


function htmlDecode(str) {
	var re = /&#(\d{2,});/g;	
	var result = str.replace(re, replaceWithCharCode);
	return result;
}


function getDevicePixelRatio() {
	return (typeof(window.devicePixelRatio) !== "undefined" && 	
		window.devicePixelRatio) || 1;
}

const kHtmlMaxThumbnailWidth = 400;
const kHtmlMaxThumbnailHeight = 200;

// Good test posts with interesting images:
// http://www.tbg.nu/news_show/182464/22 - inline image in quote
// http://www.tbg.nu/news_show/182380/1 - inline image in quote
// http://www.tbg.nu/news_show/89963/113 - JPG with CAPITAL letters
// http://www.tbg.nu/news_show/180313/37 - postimage links
// http://www.tbg.nu/news_show/174380/45 - imgur links
// http://www.tbg.nu/news_show/182917/26 - TBG html escapes & in the url


function getThumbnailDimensions(imageWidth, imageHeight) {
	var htmlWidth = imageWidth;
	var htmlHeight = imageHeight;
	if (htmlWidth > kHtmlMaxThumbnailWidth ||
			htmlHeight > kHtmlMaxThumbnailHeight)
	{
		var scaleX = htmlWidth / kHtmlMaxThumbnailWidth;
		var scaleY = htmlHeight / kHtmlMaxThumbnailHeight;
		var scale = Math.max(scaleX, scaleY);
		htmlWidth = Math.round(htmlWidth / scale);
		htmlHeight = Math.round(htmlHeight / scale);
	}
    
	var qualityRatio = getDevicePixelRatio();
    var quality = GlobalSettings().getThumbnailQuality();
    if (quality == 0) {
        qualityRatio = Math.pow(qualityRatio, 0.63092975);
    }
    
	var pixelWidth = Math.round(Math.min(htmlWidth * qualityRatio,
										 imageWidth));
	var pixelHeight = Math.round(Math.min(htmlHeight * qualityRatio,
										  imageHeight));
	return [htmlWidth, htmlHeight, pixelWidth, pixelHeight];
}


function createThumbnailLink(url, imageSrc, isQuoted, width, height, tooltip) {
	// Firefox can not use the simple form but requires a color matrix.
	// Chrome can only use the simple form, no matrix support.
	// Opera supports neither.
	// Firefox supports 'filter' and '-moz-filter'.
	// Chrome only supports '-webkit-filter'
	// Chrome blurs the image when applying a filter for some reason, I think
	// it's a bug on retina displays. translateZ(0) fixes it.
	
	// A matrix is multiplied by each pixel [R G B A 1]' to give new colors.
	// The matrix below was produced by
	// ( [ 0.33 0.33 0.33 0 0 ]         [ 1 0 0 0 0 ]       )   [0.6 0.6 0.6 0 0]
	// ( [ 0.33 0.33 0.33 0 0 ]         [ 0 1 0 0 0 ]       )   [0.6 0.6 0.6 0 0]
	// ( [ 0.33 0.33 0.33 0 0 ] * 0.6 + [ 0 0 1 0 0 ] * 0.4 ) * [0.6 0.6 0.6 0 0]
	// ( [ 0    0    0    1 0 ]         [ 0 0 0 1 0 ]       )   [0   0   0   1 0]
	const kFilterSvg =
	      'url(\'data:image/svg+xml;utf8,' +
		  '  <svg xmlns=&quot;http://www.w3.org/2000/svg&quot;>' +
		  '   <filter id=&quot;greyscaleanddarken&quot;>' +
		  '    <feColorMatrix type=&quot;matrix&quot; values=&quot;' +
		  '      0.35880   0.11880   0.11880   0.00000   0.00000' +
		  '      0.11880   0.35880   0.11880   0.00000   0.00000' +
		  '      0.11880   0.11880   0.35880   0.00000   0.00000' +
		  '	     0.00000   0.00000   0.00000   1.00000   0.00000' +
		  '    &quot;/></filter></svg>#greyscaleanddarken\'); ';
	const kQuoteStyle = '' +
		'vertical-align: middle; ' +
		'filter:  ' + kFilterSvg +
		'-webkit-transform: translateZ(0); ' +
		'-webkit-filter: grayscale(60%) brightness(70%); ' +
		''
	
	var styles = [];
	if (isQuoted) {
		styles.push(kQuoteStyle);
	}
	if (!width || !height) {
		styles.push("max-width: " + kHtmlMaxThumbnailWidth);
		styles.push("max-height: " + kHtmlMaxThumbnailHeight);
	}
	var styleAttribute = 'style="' + styles.join('; ') + '"';
	var widthAttribute = width ? ('width="' + width + '"') : '';
	var heightAttribute = height ? ('height="' + height + '"') : '';
	
	return '<a ' +
	    ' href="' + url + '" target="_blank" class="tag">' +
		'  <img src="' + imageSrc + '" ' +
				styleAttribute + ' ' +
				widthAttribute + ' ' +
				heightAttribute + ' ' +
				(tooltip ? ('title="' + escapeHtml(tooltip) + '"') : '') +
				'>' +
		'</a>';
}


function getLastLine(text) {
	const br = "<br>";
	var lastIndex = text.lastIndexOf(br);
	var lineStart;
	if (lastIndex === -1) {
		lineStart = 0;
	}
	else {
		lineStart = lastIndex + br.length;
	}
	var lastLine = text.substring(lineStart);
	return lastLine;
}

function getFirstLine(text) {
	var firstIndex = text.indexOf("<br>");
	if (firstIndex === -1) {
		return text;
	}
	else {
		return text.substring(0, firstIndex);
	}
}


function replaceLinkWithThumbnail(url, imageSrc, width, height, tooltip,
	match, lineStart, lineEnd, offset, totalString)
{
	var lineStartLength = lineStart ? lineStart.length : 0;
	var lineUpToLink = getLastLine(totalString.substring(0, offset+lineStartLength));
	var lineType = getLineType(lineUpToLink);
	var isQuote = lineType !== kLT_Original;
	
	var replacement = "";
	
	var prevItemOnLineIsText = !lineStart && !/<\/a>\s*$/.test(lineUpToLink);
	if (prevItemOnLineIsText && isQuote) {
		replacement += "</font>";
	}
		
	replacement += '<div>';
	if (isQuote) {
		replacement += '<font color="aaaaaa">&gt; ';
		if (lineType === kLT_QuoteQuote) {
			replacement += '&gt; ';
		}
		replacement += '</font> ';
	}
	replacement += createThumbnailLink(url, imageSrc, isQuote, width, height, tooltip);
	replacement += '</div>';
	
	var lineEndLength = lineEnd ? lineEnd.length : 0;
	var lineAfterLink = getFirstLine(totalString.substring(
								offset+match.length-lineEndLength));
	
	var nextItemOnLineIsText = !lineEnd && !/\s*<a$/.test(lineAfterLink);
	if (nextItemOnLineIsText && isQuote) {
		replacement += '<font color="aaaaaa">&gt; ';
		if (lineType === kLT_QuoteQuote) {
			replacement += '&gt; ';
		}
	}
	
	return replacement;
}

function createPtbgThumbnailUrl(protocolAndHostname, imageName,
    fullSizeWidth, fullSizeHeight)
{
    var d = getThumbnailDimensions(parseInt(fullSizeWidth),
                parseInt(fullSizeHeight));
	var htmlWidth = d[0];
	var htmlHeight = d[1];
	var thumbnailWidth = d[2];
	var thumbnailHeight = d[3];
	
	var thumbnailUrl = protocolAndHostname + '/image/thumbnail/' +
			imageName + '_' + thumbnailWidth + 'x' + thumbnailHeight;

    return [htmlWidth, htmlHeight, thumbnailUrl];
        
}

function ptbgThumbnailReplacer(match, lineStart, url, protocolAndHostname,
		imageName, width, height, lineEnd, offset, totalString)
{
    var thumbnailInfo = createPtbgThumbnailUrl(protocolAndHostname,
            imageName, width, height);
    var htmlWidth = thumbnailInfo[0];
    var htmlHeight = thumbnailInfo[1];
    var thumbnailUrl = thumbnailInfo[2];
			
	var tooltip = null;
	var replacement = replaceLinkWithThumbnail(url, thumbnailUrl,
		htmlWidth, htmlHeight, tooltip,
		match, lineStart, lineEnd, offset, totalString);
	return replacement;
}

const kImageLinkStartRe =
	'((?:<br>\\s*)?<font color="?aaaaaa"?>\\s*&gt;\\s*(?:&gt;)?\\s*)?<a href="?';
const kImageLinkEndRe =
	'"? [^>]*>[^<]+<\\/a>\s*(<\\/font>\\s*<br>|<\\/font>|<br>)?';
function createImageRegExp(urlRegExpString) {
	return new RegExp(kImageLinkStartRe + urlRegExpString + kImageLinkEndRe, "gi");
}

const kPtbgImageRe = createImageRegExp('((https?:\\/\\/(?:www\\.)?' +
		'(?:localhost|pimpedtbg.nu|ptbg.nu|pimpedtbg.appspot.com))' +
		'\\/image\\/get\\/([a-zA-Z0-9]+)_(\\d+)x(\\d+))');


function changePtbgImageLinksToThumbnails(body) {
	if (GlobalSettings().getShowPtbgThumbnails()) {
		body = body.replace(kPtbgImageRe, ptbgThumbnailReplacer);
	}
	return body;
}


function spaceReplacer(match, offset, totalString) {
	replacement = " ";
	for (var i = 1; i < match.length; i++) {
		replacement += "&ensp;";
	}
	return replacement;
}

function changeSpaces(body) {
	var consecutiveSpacesRe = /\s\s+/g;
	var newBody = body.replace(consecutiveSpacesRe, spaceReplacer);
	return newBody;
}

function removeTbgLinksTargetsReplacer(match, url, threadId, messageId,
									   offset, totalString)
{
	var replacement =  '<a href="' + buildMessageUrl(threadId, messageId) +
		'" class="tag">' + url + '</a>';
	return replacement;
}

const kTbgLinkRe = /<a href="?((?:(?:http:\/\/)?www.tbg.nu)?\/news_show\/(\d+)\/(\d+))"?\s+[^>]+>[^<]+<\/a>/g;

function removeTbgLinksTargets(body) {
	var newBody = body.replace(kTbgLinkRe, removeTbgLinksTargetsReplacer);
	return newBody;
}

function makeTbgLinksUseAnchorReplacer(match, url, threadId, messageId,
									   offset, totalString)
{
	var replacement;
	if (parseInt(threadId) == getThreadIdFromLocation()) {
		replacement = '<a href="#m' + messageId + '" class="tag">' +
			url + '</a>';
	}
	else {
		replacement = match;
	}
	return replacement;
}

function makeTbgLinksUseAnchor(body) {
	var newBody = body.replace(kTbgLinkRe, makeTbgLinksUseAnchorReplacer);
	return newBody;
}

function transformMessageBody(body) {
	return changePtbgImageLinksToThumbnails(
		changeSpaces(body));
}


function replaceImageUrlsOrAddToDownloader(body, token, imageDownloader) {

    var globalSettings = GlobalSettings();

    var re = null;
    var yr = globalSettings.getShowYoutubeThumbnails();
    var img = globalSettings.getShowExternalThumbnails();
    if (yr && img) {
        re = kImageAndYoutubeUrlRe;
    }
    else if (yr) {
        re = kOnlyYoutubeUrlRe;
    }
    else if (img) {
        re = kOnlyImageUrlRe;
    }

	if (re) {
		var imageUrlMatches = getRegexpMatches(body, re);
		for (var i = 0; i < imageUrlMatches.length; i++) {
			var url = imageUrlMatches[i][2];
			if (imageDownloader.isAlreadyDownloaded(url)) {
				body = replaceNonPtbgImageLinks(url, body, imageDownloader.get(url));
			}
			else if (!imageDownloader.isAlreadyQueued(url, token)) {
				imageDownloader.add(url, token);
			}
		}
	}
	return body;
}

const kPopupMessageTdXpath = "/html/body/form/table[1]/tbody/tr[2]/td/table/tbody" +
			"/tr/td/table/tbody/tr[6]/td";

const kTbgUrlRe = /^http:\/\/www.tbg.nu\/news_show\/(\d+)\/(\d+)$/i;

function setupFastNavigationForLinks(insideElement,
        deanonymizer, imageDownloader, messageDownloader, syncManager)
{
	var tbgLinks = document.evaluate(
		".//a[contains(@href, '/news_show/')]",
		insideElement,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var length = tbgLinks.snapshotLength;
	for (var i = 0; i < length; i++) {
		var a = tbgLinks.snapshotItem(i);
		if (kTbgUrlRe.test(a.href)) {
			a.addEventListener("click",
				function(event) {
					var t = event.target;
					var aa = t.nodeName === "A" ?
						t : getFirstParentNodeWithNodeName(t, "A");
					var match = kTbgUrlRe.exec(aa.href);
					changePopupToMessage(parseInt(match[1]), parseInt(match[2]),
                            deanonymizer, imageDownloader,
                            messageDownloader, syncManager);
					event.preventDefault();
             
                    // Remove the hovering indication in order to let the
                    // green background of the currently displaying msg to show.
                    var parentTable = getFirstParentNodeWithNodeName(t, "TABLE");
                    if (parentTable && parentTable.id == kMessageTableId) {
                        var tr = getFirstParentNodeWithNodeName(t, "TR");
                        tr.style.backgroundColor = "";
                    }
				},
				false);
		}
	}
}

function prefetchMessagesLinkedTo(fromElement, messageDownloader) {
	var links = xpathGet(".//a[contains(@href, '/news_show/')]", fromElement);
	var length = links.snapshotLength;
    var numLinksFound = 0
	for (var i = 0; i < length; i++) {
		var a = links.snapshotItem(i);
		var match = kTbgUrlRe.exec(a.href);
		if (match) {
			var threadId = parseInt(match[1]);
			var messageId = parseInt(match[2]);
            numLinksFound += 1;
            var normalPriority = numLinksFound * 100;
            var boostPriority = numLinksFound <= 3 ? numLinksFound*2 : null;
			messageDownloader.add(threadId, messageId,
                    normalPriority, boostPriority, true);
		}
	}
}

function prerenderSingleLink(node) {
	var links = xpathGet(".//a[not(contains(@href, '/news_show/'))]", node);
	if (links.snapshotLength == 1) {
		var prerenderLink = document.createElement("link");
		prerenderLink.rel = "prerender";
		var href = links.snapshotItem(0).href;
		prerenderLink.href = href;
		document.body.appendChild(prerenderLink);
		console.log("Attempting prerender of " + href);
	}
}

function transformAndReplacePopupMessageBody(body,
        imageDownloader, messageDownloader, syncManager) {
	var newBody = removeTbgLinksTargets(transformMessageBody(body));	
	var td = xpathGetSingle(kPopupMessageTdXpath);	

	newBody = replaceImageUrlsOrAddToDownloader(newBody, "", imageDownloader);

	td.innerHTML = newBody;
	
	prefetchMessagesLinkedTo(td, messageDownloader);
	prerenderSingleLink(td);
}

// Examples of youtube links:
// http://www.youtube.com/watch?feature=player_embedded&v=x13YlYoAQQE#t=245

// Examples of image links:
// http://piclair.com/dnmf4
//    http://www.tbg.nu/news_show/183180/36



const kHttpPrefixRe = 'https?:\\/\\/';
const kImageUrlPartRe = '[^"\\s]+\\.(?:jpg|jpeg|gif|png)(?:\\?[^"\\s]*)?' +
    '|' + '(?:www\\.)?piclair.com/[a-z0-9]+';
const kYoutubeUrlPartRe = '(?:[a-z]{1,4}\\.|)?' +
    '(?:youtube\\.com\\/watch\\?(?:[^"\\s&]+&(?:amp;)?)*v=|youtu.be\\/)[a-zA-Z0-9_\\-]+' + '(?:(?:\\?|&|#)[^"\\s]*)?';

const kImageAndYoutubeUrlRe = createImageRegExp('(' + kHttpPrefixRe + '(?:' + kImageUrlPartRe + '|' + kYoutubeUrlPartRe + '))');
const kOnlyImageUrlRe = createImageRegExp('(' + kHttpPrefixRe + kImageUrlPartRe + ')');
const kOnlyYoutubeUrlRe = createImageRegExp('(' + kHttpPrefixRe + kYoutubeUrlPartRe + ')');


function getRegexpMatches(text, regexp) {
	var matches = [];
	var match;
	while ((match = regexp.exec(text)) !== null) {
		matches.push(match);
	}
	return matches;
}

function replaceNonPtbgImageLinks(urlToReplace, messageBody, jsonData) {
	return messageBody.replace(kImageAndYoutubeUrlRe,
		function(match, lineStart, url, lineEnd, offset, totalString) {
			if (unescapeHtml(url) === unescapeHtml(urlToReplace)) {
				var pixelWidth = jsonData[0];
				var pixelHeight = jsonData[1];
				var dataUri = jsonData[2];
				var tooltip = jsonData[3];
				var d = getThumbnailDimensions(pixelWidth, pixelHeight);
				var htmlWidth = d[0];
				var htmlHeight = d[1];
				
				return replaceLinkWithThumbnail(url,
					dataUri, htmlWidth, htmlHeight, tooltip,
					match, lineStart, lineEnd, offset, totalString);
			}
			else {
				return match;
			}
		});
}


// Only used for third party URLs. pimpedtbg URLs are replaced by an
// <img> tag right away and the browser takes over the downloading from
// there.
function ImageDownloader(downloadCompleteCallback) {
	
	var queue = [];			// urls that haven't started downloading yet
	var numActive = 0;		// number of images currently downloading
	
	// url : [list of tokens]
	// contains all waiting to start downloading, currently downloading, and
	// failed downloads.
	var notFinished = {};
	
	// url: image_data for images downloaded successfully
	var completed = {};
	
	function downloadComplete() {
		numActive -= 1;
		download();
	}
	
	function download() {
		if (queue.length > 0 && numActive < 3) {
			var url = queue.shift();
            console.log("Starting download of " + url);
			numActive += 1;
			asyncXmlHttpRequest(
				kPTBGServerProtocolAndHost + "/extimage" +
					"?url=" + encodeURIComponent(url) +
					"&devicePixelRatio=" + getDevicePixelRatio() +
					"&version=3" +
                    "&quality=" + GlobalSettings().getThumbnailQuality(),
				"GET",
				"",
				function(data) {
					var unpacked = JSON.parse(data);
					var w = notFinished[url];
					delete notFinished[url];
					completed[url] = unpacked;
					downloadComplete();
					for (var i = 0; i < w.length; i++) {
                        console.log("Replacing image url " + url);
                        var token = w[i];
						downloadCompleteCallback(url, token, unpacked);
					}
				},
				downloadComplete,
				downloadComplete,
				60000);
		}
	}
	
	var that = {};
	that.isAlreadyDownloaded = function(url) {
			return typeof(completed[url]) !== "undefined";
		};
	that.add = function(url, token) {
			console.assert(!that.isAlreadyDownloaded());
			if (typeof(notFinished[url]) === "undefined") {
				notFinished[url] = [token];
				queue.push(url);
			}
			else {
				notFinished[url].push(token);
			}
			download();
		};
	that.isAlreadyQueued = function(url, token) {
			console.assert(!that.isAlreadyDownloaded(url));
			return notFinished[url] && notFinished[url].indexOf(token) !== -1;
		};
	that.get = function(url) {
			console.assert(that.isAlreadyDownloaded(url));
			return completed[url];
		};
	return that;
}

function createSingleIdFunction(prefix, suffix) {
	suffix = suffix || "";
	return function(messageId) {
		return prefix + messageId + suffix;
	}
}

// Warning, there are probably places using the ids in here without using
// these functions!
var threaderMessageBodyId = createSingleIdFunction("msg");

// These are only present here.
var threaderAuthorId = createSingleIdFunction("authorSpan");

var anonymousAuthorSpanId = createSingleIdFunction("anonAuthorSpan");


function replaceDocumentStubWithFullMessage(messages, message,
        deanonymizer, syncManager, imageDownloader)
{
	var messageBody;
	if (message.messageId != 1) {
		var p = messages.getMessage(message.parentId);

        // Decode &quot; etc in subject. Some test cases:
        // http://www.tbg.nu/news_show/136086/1?threader=1 - Quotation marks
        // http://www.tbg.nu/news_show/178086/1?threader=1 - Long subject
        // http://www.tbg.nu/news_show/160013/1?threader=1 - Changing subject
        // http://www.tbg.nu/news_show/158886/1?threader=1 - Weird chars
        // http://www.tbg.nu/news_show/159768/1?threader=1 - Cut right before space
		// http://www.tbg.nu/news_show/179062/1?threader=1 - Subject starts with space
		// http://www.tbg.nu/news_show/62277/1?threader=1 - Subject ends with tab?
        // http://www.tbg.nu/news_show/184565/1?threader=1 - Change subject to "Re:..." without space
		
        var div = document.createElement("div");
        div.innerHTML = message.subject;
        var mSubject = div.firstChild ? div.firstChild.nodeValue : "";
        div.innerHTML = p.subject;
        var pSubject = div.firstChild ? div.firstChild.nodeValue : "";

        var didUserChangeSubject = p.subject.substr(0, 3) == "Re:" ?
                mSubject.trim() != pSubject.trim() :
                mSubject.trim() != trimRight("Re: " + pSubject.substr(0, 60));
        if (didUserChangeSubject) {
            messageBody = '<div>' +
                '<b>SUBJECT:</b>&nbsp;&nbsp;' + message.subject + '</div><br/>';
        }
        else {
            messageBody = "";
        }
        
		messageBody += makeTbgLinksUseAnchor(transformMessageBody(
							trimMessage(message.message,
										p.message,
										message.messageId == -42)));
    }
	else {
		messageBody = makeTbgLinksUseAnchor(transformMessageBody(
										message.message));
	}
	
	messageBody = replaceImageUrlsOrAddToDownloader(messageBody,
		message.messageId, imageDownloader);

	var body = document.getElementById(threaderMessageBodyId(message.messageId));
	body.innerHTML = messageBody;
	
	var head = document.getElementById("msg" + message.messageId + "head");
	head.innerHTML = createHeaderHtml(message, deanonymizer);
    if (deanonymizer.getName(message.author)[0] != kAuthorTypeRegistered) {
        deanonymizer.addMessage(message.messageId, message.author);
        addAnonymousAuthorSpanClickListener(deanonymizer,
                syncManager, message.messageId);
    }
	
	var replySpan = document.createElement('span');
	replySpan.innerHTML = [
		'<a id="pimpedreplylink', message.messageId, '" ',
			'href="http://www.tbg.nu/cgi-bin/news_send.cgi?db=',
				, message.threadId, '&id=', message.messageId, '" ',
			'style="display: none; float: right; color:#7777ff">',
			'Reply',
		'</a>',
		'&nbsp;'
		].join("");
	body.parentNode.appendChild(replySpan);
    
    updateMathJax(threaderMessageBodyId(message.messageId));
}


dependencies["updateMathJaxInjected"] = [];
function updateMathJaxInjected(domId) {
	if (typeof(MathJax) !== "undefined") {
		MathJax.Hub.Queue(["Typeset", MathJax.Hub, domId]);
	}
}

function updateMathJax(domId) {
	injectCode(["updateMathJaxInjected"],
        "updateMathJaxInjected(" + domId + ")");
}


function addReplyHandler(threadId, messages, messageId, communicator) {
	var a = document.getElementById("pimpedreplylink" + messageId);
	a.addEventListener('click',
		function(event) {
			event.preventDefault();
			pimpedReply(threadId, messages, messageId, communicator);
		},
		false);
	a.style.display = 'inline';
	
	// Avoid potential memory leak
	a = null;
}


function displayNewReadyMessages(threadId, threadInfo, messages, ready,
        communicator, deanonymizer, syncManager, imageDownloader)
{
    var highestKnownId = messages.getHighestKnownId();
	for (var i in ready) {
		var id = ready[i];

        // Don't do this unless absolutely necessary, since it makes Chrome tab icon
        // flicker.
        if (highestKnownId == id && !threadInfo.hasRead(id)) {
            addToBrowserHistory(threadId, id);
            console.log("Added id " + id + " to browser history");
        }

		var m = messages.getMessage(id);
		replaceDocumentStubWithFullMessage(messages, m,
                deanonymizer, syncManager, imageDownloader);
		addReplyHandler(threadId, messages, id, communicator);
		threadInfo.markAsRead(id);
	}
}


function onHideUnhideClicked(event, syncManager) {    
	var button = event.target;
	var hide = button.value.indexOf("Hide") === 0;
	console.assert(hide || button.value.indexOf('Unhide') === 0);
	
	hideUnhideThreadInMainWindow(hide);

	var threadId = getThreadIdFromLocation();
    var hideUnhide = HideUnhide();
	if (hide) {
		hideUnhide.hide(threadId);
	}
	else {
		hideUnhide.unhide(threadId);
	}
	setupHideUnhideButtonName(threadId);
    syncManager.syncAsap();

	if (hide) {
		window.close();
	}
}


const kHideButtonId = "threaderhidebutton";

function setupHideUnhideButtonName(threadId) {
	var button = document.getElementById(kHideButtonId);
	
    var hideUnhide = HideUnhide();
    
	if (hideUnhide.isHidden(threadId)) {
		button.value = "Unhide" + (isThreaderMode() ? " Thread" : "");
	}
	else {
		button.value = "Hide" + (isThreaderMode() ? " Thread" : "");
	}
}


function imageDownloaderThreaderReplacer(urlToReplace, token, image) {
	var bodyDiv = document.getElementById(threaderMessageBodyId(token));
	bodyDiv.innerHTML = replaceNonPtbgImageLinks(urlToReplace,
												 bodyDiv.innerHTML, image);
}


function saveOpenThreaderReplies() {
    var threadId = getThreadIdFromLocation();
    var textareas = xpathGet('//span/div/div/table/tbody/tr/td/textarea');
    for (var i = 0; i < textareas.snapshotLength; i++) {
        var textarea = textareas.snapshotItem(i);
        var span = getFirstParentNodeWithNodeName(textarea, "SPAN");
        var originalMessage = span.getAttribute(kOriginalMessageTag);
        var newMessage = textarea.value;
        if (anythingAddedToText(originalMessage, newMessage)) {
            var messageId = parseInt(/\d+/.exec(span.id)[0]);
            var subject = span.getAttribute(kSubjectTag);
            addOrUpdateUnsentReply(threadId, messageId,
                originalMessage, newMessage, subject, subject);
        }
    }
}


function threader(syncManager) {
	var threadId = getThreadIdFromLocation();
	var messageId = getMessageIdFromLocation();
	
	var newMessages = extractMessagesMetaData(document.body.innerHTML);
	
	var message = extractMessage(document.body.innerHTML);
	if (!newMessages || !message) {
		// The greasemonkey script is executed even if Firefox couldn't load
		// the page, let's only show error message if we can find "TBG".
		if (document.body.innerHTML.indexOf("TBG") > -1) {
            alertWithExtraTextIfDebugging("Malformed page, could not find message table.",
                "document.body.innerHTML:\n\n" + document.body.innerHTML);
		}
		return;	
	}
    
    addToMessageCache(threadId, messageId, message);

	var messages = Messages(threadId);
	var newIds = messages.updateThreadStructure(newMessages);
	
	var threadInfo = ThreadInfo(threadId);
	var ready = messages.addMessage(message);

	var form = document.evaluate(
		"//form",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	form.innerHTML = "";
	
	var frag = document.createDocumentFragment();
    
    var topicText = document.createElement('div');
    var style = 'font-family: verdana, arial, helvetica;font-size: 0.7em; ' +
				'margin-left: 10px; position: relative; bottom: 1px';
    topicText.innerHTML = '<span style="' + style + '">' + message.subject + '</span>';
    frag.appendChild(topicText);
	
	var m = messages.getMessage(1);
	while (m != undefined) {
		var header = createHeaderHtml(m, null);
			
		var borderColor = getBorderColor(threadInfo, m.messageId);
		var e = createMessageStubElement(threadId,
			m.messageId, m.indentation, header, borderColor);
		frag.appendChild(e);
		
		m = messages.getMessage(m.nextId);
	}
	form.appendChild(frag);
	frag = null;
	createBorderResetEventListeners();
	
	var bottomSpace = document.createElement('div');
	bottomSpace.innerHTML = '<br/>';
	form.appendChild(bottomSpace);
    
    var replaceAuthor = function(messageId, authorType, author, color) {
        var authorSpan = document.getElementById(
            anonymousAuthorSpanId(messageId));
        authorSpan.innerHTML = author;
        authorSpan.style.color = color || getAnonymousColor(authorType);
    }
    
    var guiDeanonymizer = GuiDeanonymizer(replaceAuthor);
    var innerDeanonymizer = guiDeanonymizer.getInnerDeanonymizer();
    syncManager.startSyncing(innerDeanonymizer);
    
	var imageDownloader = ImageDownloader(imageDownloaderThreaderReplacer);
	var communicator = Communicator(threadId, messages,
                            syncManager, guiDeanonymizer, imageDownloader);
	
	displayNewReadyMessages(threadId, threadInfo, messages, ready,
							communicator, guiDeanonymizer, syncManager,
                            imageDownloader);
    
    // Needed to prevent reload when pressing enter in anonymous name
    // change text box in threader mode.
    var forms = document.getElementsByTagName("FORM");
    for (var i = 0; i < forms.length; i++) {
        forms[i].setAttribute("onsubmit", "return false;");
    }
    
    window.addEventListener("beforeunload", saveOpenThreaderReplies, false);
    window.addEventListener("blur", saveOpenThreaderReplies, false);
}


// The chars with iso latin 8859-1 char code >= 128 gets encoded into
// UTF-8 by encodeURIComponent(). This function uses one byte percent encoding.
function encodeURIComponentIsoLatin(s) {
	const translation = {
		0x20AC : 128,
		0x201A : 130,
		0x0192 : 131,
		0x201E : 132,
		0x2026 : 133,
		0x2020 : 134,
		0x2021 : 135,
		0x02C6 : 136,
		0x2030 : 137,
		0x0160 : 138,
		0x2039 : 139,
		0x0152 : 140,
		0x017D : 142,
		0x2018 : 145,
		0x2019 : 146,
		0x201C : 147,
		0x201D : 148,
		0x2022 : 149,
		0x2013 : 150,
		0x2014 : 151,
		0x02DC : 152,
		0x2122 : 153,
		0x0161 : 154,
		0x203A : 155,
		0x0153 : 156,
		0x017E : 158,
		0x0178 : 159};
	var result = [];
	for (var i = 0; i < s.length; i++) {
		var charCode = s.charCodeAt(i);
		if (charCode < 128) {
			result.push(encodeURIComponent(s.charAt(i)));
		}
		else if (charCode >= 160 && charCode < 256) {
			result.push("%" + charCode.toString(16).toUpperCase());
		}
		else {
			var cp = translation[charCode];
			if (typeof(cp) !== "undefined") {
				result.push("%" + cp.toString(16).toUpperCase());
			}
			else {
				console.log("Found char code " + charCode + " in encodeURIComponentIsoLatin(), don't know what to do...");
				result.push(encodeURIComponent("&#" + charCode + ";"));
			}
		}
	}
	return result.join("");
}


function padWithZeros(n, numberOfDigits) {
    var s = "" + n;
    while (s.length < numberOfDigits) {
        s = "0" + s;
    }
    return s;
}

function dateToISOString(date) {
    // Takes a Date object and returns a string similar to 2011-04-30 09:28.
    var year = "" + date.getFullYear();
    var month = padWithZeros(date.getMonth()+1, 2);
    var dayOfMonth = padWithZeros(date.getDate(), 2);
    var hours = padWithZeros(date.getHours(), 2);
    var minutes = padWithZeros(date.getMinutes(), 2);
    
    return [year, month, dayOfMonth].join("-") + " " + 
        [hours, minutes].join(":");
}


const kThreadInfoKeyPrefix = "ti_";
const kThreadInfoKeyRegexp = new RegExp("^" + kThreadInfoKeyPrefix + "([1-9]\\d*)$");
const kThreadInfoTimeKeySuffix = "_time";
const kThreadInfoTimeKeyRegexp = new RegExp("^" + kThreadInfoKeyPrefix + "([1-9]\\d*)" +
                                            kThreadInfoTimeKeySuffix + "$");
const kThreadInfoTimeVersionMajor = 1;
const kThreadInfoTimeVersionMinor = 0;



function updateThreadLastAccessTime(threadId) {
    var s = JSON.stringify([
            kThreadInfoTimeVersionMajor, kThreadInfoTimeVersionMinor,
            dateToISOString(new Date())
        ]);
    localStorage[kThreadInfoKeyPrefix + threadId + kThreadInfoTimeKeySuffix] = s;
}

const kThreadInfoExpirationDays = 15;

function garbageCollectThreadInfos() {
    var now = (new Date()).getTime();
    var kExpirationTime = kThreadInfoExpirationDays*86400*1000;
    var expiration = dateToISOString(new Date(now - kExpirationTime));
            
    var timeInfosToUpdate = [];
    var threadInfosToDelete = [];
	
	var threadIdsOnPage = getAllThreadIds();
    var threadIdOnPageLookup = {};
	for (var i = 0; i < threadIdsOnPage.length; i++) {
		threadIdOnPageLookup[threadIdsOnPage[i]] = true;	
	}
	
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === null) {
            continue;
        }
        var threadInfoMatch, threadInfoTimeMatch;
        if ((threadInfoMatch = kThreadInfoKeyRegexp.exec(key))) {
            var threadId = parseInt(threadInfoMatch[1]);
            var timeKey = kThreadInfoKeyPrefix + threadId + kThreadInfoTimeKeySuffix;
            var timeInfoString = localStorage[timeKey];
            if (!timeInfoString) {
                console.log("Missing time for " + key);
                timeInfosToUpdate.push(threadId);
            }
            else {
                var info = JSON.parse(timeInfoString);
                if (info[0] > kThreadInfoTimeVersionMajor) {
                    console.log("Newer version was used to write it: " + timeInfoString);
                    threadInfosToDelete.push(threadId);
                }
				else if (threadIdOnPageLookup[threadId]) {
					timeInfosToUpdate.push(threadId);
				}
                else if (info[2] < expiration) {
                    console.log("ThreadInfo " + threadId + " has expired: " + timeInfoString);
                    threadInfosToDelete.push(threadId);
                }
            }
        }
        else if ((threadInfoTimeMatch = kThreadInfoTimeKeyRegexp.exec(key))) {
            var threadId = parseInt(threadInfoTimeMatch[1]);
            var threadInfoKey = kThreadInfoKeyPrefix + threadId;
            if (!localStorage[threadInfoKey]) {
                threadInfosToDelete.push(threadId);
                console.log("Missing threadInfo for " + key);
            }
        }
    }
    
    for (var i = 0; i < timeInfosToUpdate.length; i++) {
        var threadId = timeInfosToUpdate[i];
        updateThreadLastAccessTime(threadId);
    }
    for (var i = 0; i < threadInfosToDelete.length; i++) {
        var threadId = threadInfosToDelete[i];
        var threadInfoKey = kThreadInfoKeyPrefix + threadId;
        delete localStorage[threadInfoKey];
        var timeKey = kThreadInfoKeyPrefix + threadId + kThreadInfoTimeKeySuffix;
        delete localStorage[timeKey];
    }
    
    var elapsedTime = +new Date() - now;
    console.log("Garbage collected " + threadInfosToDelete.length + " thread infos in " +
        elapsedTime + " milliseconds");
    
    setTimeout(garbageCollectThreadInfos, (86400+100)*1000);
}



function addToBrowserHistory(threadId, messageId) {
    // Taken from
    // http://stackoverflow.com/questions/795654/using-javascript-to-mark-a-link-as-visited?rq=1
    // store the current URL
    var current_url = window.location.href;
    // use replaceState to push a new entry into the browser's history
    history.replaceState({}, "", "http://www.tbg.nu/news_show/"+threadId+"/"+messageId);
    // use replaceState again to reset the URL
    history.replaceState({}, "", current_url)
}






const kMinTime = 100*1000*1000;
const kMaxTime = 16*1000*1000*1000;

function InfoRequest(deanonymizerMinimumChangeIndex) {
    console.assert(typeof(deanonymizerMinimumChangeIndex) == "number");

    const kVersion = 2;

    var minimumChangeIndex = null;
    
    var threadIds = [];

    return {
        setAllChangesMinimumChangeIndex : function(changeIndex) {
            console.assert(typeof(changeIndex) === "number");
            console.assert(changeIndex >= 0);
            minimumChangeIndex = changeIndex;
        },
        addThreadId : function(threadId, minimumChangeIndex) {
            console.assert(typeof(threadId) === "number");
            console.assert(threadId >= 1);
            console.assert(typeof(minimumChangeIndex) === "number");
            console.assert(minimumChangeIndex >= 0);
            threadIds.push([threadId, minimumChangeIndex]);
        },
        getThreadIds : function() {
            var t = [];
            for (var i = 0; i < threadIds.length; i++) {
                t.push(threadIds[i][0]);
            }
            return t;
        },
        buildRequest : function() {
            console.assert(deanonymizerMinimumChangeIndex != null);
            console.log("InfoRequest, minci: " + minimumChangeIndex + ", tids: <" + threadIds.join("> <") + ">")
            return [kVersion, minimumChangeIndex, threadIds,
                deanonymizerMinimumChangeIndex];
        }
    };
}


function UpdateRequest() {
    
    const kVersion = 2;
    
    var updates = [];
    var deanonymizerUpdates = [];
    
    return {
        add : function(threadId, readWriteStatusRle, hidden, hiddenTime, star, starTime) {
            updates.push([threadId, readWriteStatusRle, hidden, hiddenTime, star, starTime]);
        },
        getNumUpdates : function() {
            return updates.length;
        },
        buildRequest : function() {
			var hideUnhide = HideUnhide();
            var lastUnhideAllTime = hideUnhide.getLastUnhideAllTime();
			var unhideAllTimeModified = hideUnhide.getUnhideAllChangeTime();
            var s = "UpdateRequest - lastUnhideAll: " + lastUnhideAllTime +
				", mod: " + unhideAllTimeModified + ", ids: ";
            for (var i = 0; i < updates.length; i++) {
                s += updates[i][0] + ", ";
            }
            console.log(s);
            return [kVersion, lastUnhideAllTime, unhideAllTimeModified, updates,
                deanonymizerUpdates];
        },
        resetUploadingStatusForThreads : function() {
            for (var i = 0; i < updates.length; i++) {
                var threadId = updates[i][0];
                var threadInfo = ThreadInfo(threadId);
                threadInfo.uploadFailed();
            }
        },
        addDeanonymizerUpdateRequest : function(d) {
            deanonymizerUpdates = d;
        }
    }
}






// Returns a string to post to the server.
function buildPTBGData(ptbgId, infoRequest, updateRequest) {
    //var info = "[1,0,[]]";
    //var update = "[1,0,[]]";
    var info = JSON.stringify(infoRequest.buildRequest());
    var update = JSON.stringify(updateRequest.buildRequest());
    
    var data = "id=" + encodeURIComponent(ptbgId) +
            "&version=" + encodeURIComponent(kScriptVersion) +
            "&update=" + encodeURIComponent(update) +
            "&info=" + encodeURIComponent(info);
    return data;
}


// Build update request for all thread IDs marked as needing update. All thread ids
// in the argument list are included too. Mark all the threads as being updated
// right now.
function buildUpdateRequest(priorityThreadIds, deanonymizer,
                            ptbgEdition, noWait, onCompletion)
{
	var startTime = +new Date();
    
    
	// The server stores this many thread infos together in one database
	// entity to save on reads/writes.
	const kServerLumpSize = 100;

    var prio = {};
    for (var i = 0; i < priorityThreadIds.length; i++) {
        prio[priorityThreadIds[i]] = 1;
    }
    
    var updateRequest = UpdateRequest();
	const kMaxUpdates = 300;
    const kMinLumps = 5;
    const keyRe = kThreadInfoKeyRegexp;
    
	var includedLumpIds = {};
	var numLumpIds = 0
    var dirtyNonPrioThreads = [];
	var totalNumDirtyThreads = 0;
	
	const kBatchSize = 250;
	var numBatches = Math.ceil(localStorage.length / kBatchSize) + 1;
	
	for (var i = 0; i < priorityThreadIds.length; i++) {
		var threadId = priorityThreadIds[i];
		var threadInfo = ThreadInfo(threadId);
		if (threadInfo.hadInfo() && threadInfo.isDirty(ptbgEdition)) {
			totalNumDirtyThreads += 1;
			var lumpId = Math.floor(threadId / kServerLumpSize);
			if (!includedLumpIds[lumpId]) {
				numLumpIds += 1;
				includedLumpIds[lumpId] = 1;
			}
			threadInfo.addToUpdateRequest(updateRequest);
		}
	}
    
    var d = deanonymizer.buildUpdateRequest(ptbgEdition);
    updateRequest.addDeanonymizerUpdateRequest(d);
	
	function buildComplete() {
		var elapsedTime = +new Date() - startTime;
		console.log("buildUpdateRequest took " + elapsedTime + " ms, sending " +
					updateRequest.getNumUpdates() + " of " + 
					totalNumDirtyThreads + " dirty threads");
		onCompletion(updateRequest);
	}
	
	if (noWait) {
		buildComplete();
	}
	else {
		var task = createBackgroundBatch(
			function(batchIndex, callback) {
				var start = batchIndex * kBatchSize;
				var end = Math.min(start + kBatchSize, localStorage.length);
				for (var i = start; i < end; i++) {
					var key = localStorage.key(i);
					var match;
					if (key && (match = keyRe.exec(key))) {
						var threadId = parseInt(match[1]);
						if (!prio[threadId]) {
							var threadInfo = ThreadInfo(threadId);
							if (threadInfo.isDirty(ptbgEdition)) {
								totalNumDirtyThreads += 1;
								if (threadInfo.isReadyForUpload(ptbgEdition)) {
									dirtyNonPrioThreads.push(threadId);
								}
							}
						}
					}
				}
				
				if (batchIndex == numBatches-1) {
					// Prefer threads within the lumps already included and
					// with high thread ID.
					dirtyNonPrioThreads.sort(function(a,b) {
						var aInPrioLump = includedLumpIds[
								Math.floor(a / kServerLumpSize)] || 0;
						var bInPrioLump = includedLumpIds[
								Math.floor(b / kServerLumpSize)] || 0;
						return aInPrioLump-bInPrioLump || a-b
					});
					
					while (updateRequest.getNumUpdates() < kMaxUpdates &&
						   dirtyNonPrioThreads.length > 0)
					{
						var threadId = dirtyNonPrioThreads.pop();
						var lumpId = Math.floor(threadId / kServerLumpSize);
						if (!includedLumpIds[lumpId]) {
							if (numLumpIds >= kMinLumps) {
								break;
							}
							numLumpIds += 1;
							includedLumpIds[lumpId] = 1;
						}
						
						var threadInfo = ThreadInfo(threadId);
						threadInfo.addToUpdateRequest(updateRequest);
					}
                }
				
				callback();
			},
			0,
			numBatches,
			null,
			buildComplete
		);
		
		setTimeout(task, 15);
	}
}


// Request info for the thread id in the argument list
function buildInfoRequest(threadIds, globalSettings, deanonymizer) {
    var ptbgEdition = globalSettings.getPtbgServerEdition();

    var deanonymizerMinimumChangeIndex =
        deanonymizer.getLastReceivedChangeIndex(ptbgEdition);

    var infoRequest = InfoRequest(deanonymizerMinimumChangeIndex);
    
    var allChangesMinimumChangeIndex = globalSettings.getLatestServerChangeIndex() + 1;
    infoRequest.setAllChangesMinimumChangeIndex(allChangesMinimumChangeIndex);

    for (var i = 0; i < threadIds.length; i++) {
        var threadId = threadIds[i];
        var ti = ThreadInfo(threadId);
        var minimumChangeIndex = ti.getLastMergedChangeIndex(ptbgEdition) + 1;
        infoRequest.addThreadId(threadId, minimumChangeIndex);
    }
    
    
    
    return infoRequest;
}

function mergeServerResponseWithLocalStorage(ptbgEdition, threadIdsAskedFor,
        deanonymizer, serverResponse)
{
    var globalSettings = GlobalSettings();
    var changeIndex = serverResponse.getLastChangeIndex();
    globalSettings.setLatestServerChangeIndex(ptbgEdition, changeIndex);
	globalSettings.setLargestTimestamp(Math.max(
		serverResponse.getLargestTimestamp() + 1,
		globalSettings.getLargestTimestamp()));
	
	var hideUnhide = HideUnhide();
    var unhideAllTimeChanged = hideUnhide.mergeServerResponse(
		serverResponse.getLastUnhideAllTime(),
		serverResponse.getUnhideAllModificationTime());
	
    var threadIds = serverResponse.getThreadIds();
    var modifiedThreadIds = [];
    var inSyncThreadIds = [];
    var notInSyncThreadIds = [];
    for (var i = 0; i < threadIds.length; i++) {
        var threadId = threadIds[i];
        var ti = ThreadInfo(threadId);
        var modified = serverResponse.merge(ti, ptbgEdition);
        if (modified) {
            modifiedThreadIds.push(threadId);
        }
        if (ti.isDirty(ptbgEdition)) {
            notInSyncThreadIds.push(threadId);
        }
        else {
            inSyncThreadIds.push(threadId);
        }
    }
    for (var i = 0; i < threadIdsAskedFor.length; i++) {
        var threadId = threadIdsAskedFor[i];
        var ti = ThreadInfo(threadId);
        if (ti.hadInfo()) {
            ti.setInSync(ptbgEdition, changeIndex);
        }
    }
    
    deanonymizer.mergeServerResponse(ptbgEdition, changeIndex,
        serverResponse.getDeanonymizerNames());
    
    console.log("mergeServerResponseWithLocalStorage() - modified ids: " + modifiedThreadIds);
    return [unhideAllTimeChanged, modifiedThreadIds];
}


function updateReadWriteColors(threadInfo, isThreaderMode, serverReadWriteStatus, minimumStatusToChange) {
    if (isThreaderMode) {
        console.assert(minimumStatusToChange === kRead || minimumStatusToChange === kWritten);
        for (var messageId = 1; messageId < serverReadWriteStatus.length; messageId++) {
            var status = serverReadWriteStatus[messageId];
            if (status >= minimumStatusToChange) {
                var div = document.getElementById('msg' + messageId + 'border');
                div.style.borderColor = getBorderColor(threadInfo, messageId);
            }
        }
    }
    else {
        console.assert(minimumStatusToChange == kRead);
        colorLinksFromReadWriteStatus();
    }
}

function updateHideUnhideStar(threadId) {
    console.log("updateHideUnhideStar(" + threadId + ")");
	updateStarInThreadWindow(threadId);
	setupHideUnhideButtonName(threadId);
}


function ServerResponse(json) {
    var response = JSON.parse(json);
    var lastChangeIndex = response[0];
    var lastUnhideAllTime = response[1];
	var unhideAllModificationTime = response[2];
	var largestTimestamp = response[3];
    var threadInfos = response[4];
    var deanonymizerNames = response[5];
    
    return {
        getLastChangeIndex : function() {
            return lastChangeIndex;
        },
        getNumInfos : function() {
            return threadInfos.length;
        },
        getThreadIds : function() {
            var threadIds = [];
            for (var id in threadInfos) {
                threadIds.push(parseInt(id));
            }
            return threadIds;
        },
        getLastUnhideAllTime : function() {
            return lastUnhideAllTime;
        },
		getUnhideAllModificationTime : function() {
			return unhideAllModificationTime;	
		},
		getLargestTimestamp : function() {
			return largestTimestamp;	
		},
        getDeanonymizerNames : function() {
            return deanonymizerNames;
        },
        merge : function(threadInfo, ptbgEdition) {
            var threadId = threadInfo.getThreadId();
            var update = threadInfos[threadId];
            var readWriteStatusRle = update[0];
            var hidden = parseInt(update[1]);
            var hiddenTime = parseInt(update[2]);
            var star = parseInt(update[3]);
            var starTime = parseInt(update[4]);
            return threadInfo.merge(ptbgEdition, lastChangeIndex,
                readWriteStatusRle,
                hidden, hiddenTime,
                star, starTime);
        },
        getReadWriteStatus : function(threadId) {
            var update = threadInfos[threadId];
            if (!update) {
                return false;
            }
            var readWriteStatusRle = update[0];
            var readWriteStatus = rleDecode(readWriteStatusRle, 1);
            return readWriteStatus;
        }
    };
}



function onStorageModifiedMainWindow(event) {
	const keyRe = kThreadInfoKeyRegexp;
	var match = kThreadInfoKeyRegexp.exec(event.key);
	if (match) {
		var threadId = parseInt(match[1]);
		updateMainWindowFromChangedLocalStorageDebounced([threadId], false);
	}
}


function numberSort(a, b) {
	return a-b;
}






function genericSyncWithPtbg(priorityThreadIds, deanonymizer, noWait,
							 onSuccess, onFailure,
							 onTimeout, onNoPtbgId)
{
	var globalSettings = GlobalSettings();
	var ptbgEdition = globalSettings.getPtbgServerEdition();
	var ptbgId = globalSettings.getPtbgId();
    
	function handleChangedPtbgEdition(onNonchangedPtbgEdition) {
		var ptbgEdition2 = GlobalSettings().getPtbgServerEdition();
		if (ptbgEdition2 === ptbgEdition) {
			onNonchangedPtbgEdition();
		}
		else {
			genericSyncWithPtbg(priorityThreadIds, deanonymizer, noWait,
								onSuccess, onFailure, onTimeout, onNoPtbgId);
		}
	}
	
	if (ptbgId != "") {
		var infoRequest = buildInfoRequest(priorityThreadIds,
                            globalSettings, deanonymizer);
		buildUpdateRequest(priorityThreadIds, deanonymizer, ptbgEdition, noWait,
			function(updateRequest) {
				var data = buildPTBGData(ptbgId, infoRequest, updateRequest);
				globalSettings = null;
		 
				asyncXmlHttpRequest(kPTBGServerProtocolAndHost + "/b",
					"POST",
					data,
					function(responseText) {
						console.log("PimpedTBG sync succeeded, text length " + responseText.length +
							", text: " + responseText.substr(0, 100));
						handleChangedPtbgEdition(function() {
							clearPTBGErrorMsg();
							var serverResponse = ServerResponse(responseText);
							var mergeResult = mergeServerResponseWithLocalStorage(ptbgEdition,
                                    infoRequest.getThreadIds(), deanonymizer, serverResponse);
							var unhideAllTimeChanged = mergeResult[0];
							var changedThreadIds = mergeResult[1];
							onSuccess(changedThreadIds, unhideAllTimeChanged, serverResponse);					
						});
					},
					function(statusCode, text) {
						console.log("PimpedTBG sync failed, statusCode " + statusCode + ", text: " +
							(text ? text.substr(0, 100) : "[no text]"));
						handleChangedPtbgEdition(function() {
							setPTBGErrorMsg("PimpedTBG sync failed, code " + statusCode);
							updateRequest.resetUploadingStatusForThreads();
							onFailure(statusCode, text);
						});
					},
					function() {
						console.log("PimpedTBG sync timeout");
						handleChangedPtbgEdition(function() {
							setPTBGErrorMsg("PimpedTBG sync timeout");
							updateRequest.resetUploadingStatusForThreads();
							onTimeout();
						})
					},
					30*1000);
			});
	}
	else {
		clearPTBGErrorMsg();
		onNoPtbgId();
	}
}


// Returns an array without duplicates given a sorted array of numbers.
function withoutDuplicates(a) {
	if (a.length === 0) {
		return [];
	}
	var result = [a[0]];
	for (var i = 1; i < a.length; i++) {
		if (result[result.length-1] !== a[i]) {
			result.push(a[i]);
		}
	}
	return result;
}


function syncSearchWindow() {
	var as = document.evaluate(
		"//table//tr/td/a[starts-with(@href,'/news_show/')]",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var length = as.snapshotLength;
	var threadIds = [];
	for (var i = 0; i < length; i++) {
		var a = as.snapshotItem(i);
		var href = a.href;
		var threadId = getThreadIdFromURL(href);
		threadIds.push(threadId);
	}
	threadIds.sort(numberSort);
	threadIds = withoutDuplicates(threadIds);
    
    var deanonymizer = Deanonymizer(null);
	
	const kNoWait = true;
	genericSyncWithPtbg(threadIds,
        deanonymizer,
		kNoWait,
		function(changedThreadIds, unhideAllTimeChanged, serverResponse) {
			colorVisitedThreadLinksSearchWindow();
		},
		function(statusCode, statusText) {
			var changedThreadIds = [];
			setTimeout(syncSearchWindow, 15000);
		},
		function() {
			var changedThreadIds = [];
			setTimeout(syncSearchWindow, 15000);
		},
		function() {
		});
}


function NotificationState() {
	
	var highestMessageId = {};  // threadId : messageId
	
	return {
		getHighestMessageId : function(threadId) {
			return highestMessageId[threadId] || 0;
		},
		setHighestMessageId : function(threadId, messageId) {
			highestMessageId[threadId] = Math.max(messageId,
				highestMessageId[threadId] || 0);
		},
	};	
}


function PTBGSyncManagerForMainWindow(messageDownloader, deanonymizer) {
	
	var started = false;	// Only for debugging (asserts). Tells if the startSyncing method has been called.
	var syncTime = 0;  // Timestamp of the last time we started to sync.
	var needSyncAsap = false;
	var needPtbgSyncAsap = false;
	var timeout = null;
	var notificationState = null;
	var that = {};
	
	window.addEventListener("storage",
		onStorageModifiedMainWindow,
		false);
    
	function getMillisecondsToNextSync() {
		var globalSettings = GlobalSettings();
		var refreshInterval = globalSettings.getRefreshInterval();
		console.assert(refreshInterval >= 15);
		console.assert(refreshInterval <= 9999);
		var now = +new Date();
		var millisecondsToNextSync = Math.max(0, syncTime+refreshInterval*1000 - now);
		return millisecondsToNextSync;
	}
	
	function updateWindowAndRescheduleTimeout(changedThreadIds, unhideAllTimeChanged, mainPageParseResult) {
		updateMainWindow(changedThreadIds, unhideAllTimeChanged, mainPageParseResult,
						 that, notificationState);
		console.assert(timeout === null);
		var timeToNextSync = getMillisecondsToNextSync();
		if (needSyncAsap || needPtbgSyncAsap && timeToNextSync <= 1000) {
			timeout = setTimeout(startUpdate, 50);
		}
		else if (needPtbgSyncAsap) {
			var noWait = false;
			syncWithPtbg(null, null, noWait);
		}
		else {
			var ms = Math.max(2000, timeToNextSync);
			timeout = setTimeout(startUpdate, ms);
		}
	}

	function syncWithPtbg(mainPageParseResult, threadIdsOnPage, noWait) {
		needPtbgSyncAsap = false;

		if (!threadIdsOnPage) {
			threadIdsOnPage = getAllThreadIds();
		}
		
		genericSyncWithPtbg(threadIdsOnPage,
            deanonymizer,
			noWait,
			function(changedThreadIds, unhideAllTimeChanged, serverResponse) {
				updateWindowAndRescheduleTimeout(changedThreadIds, unhideAllTimeChanged, mainPageParseResult);
			},
			function(statusCode, statusText) {
				var changedThreadIds = [];
				var unhideAllTimeChanged = false;
				updateWindowAndRescheduleTimeout(changedThreadIds, unhideAllTimeChanged, mainPageParseResult);
			},
			function() {
				var changedThreadIds = [];
				var unhideAllTimeChanged = false;
				updateWindowAndRescheduleTimeout(changedThreadIds, unhideAllTimeChanged, mainPageParseResult);
			},
			function() {
				var changedThreadIds = [];
				var unhideAllTimeChanged = false;
				updateWindowAndRescheduleTimeout(changedThreadIds, unhideAllTimeChanged, mainPageParseResult);
			});
	}
	
	function onTBGDownloadSuccess(responseText) {
		console.log("TBG GET succeeded, text length " + responseText.length +
					", text: " + responseText.substr(0, 100));
		clearTBGErrorMsg();
        messageDownloader.softStop();
		var mainPageParseResult = parseTBGMainPage(responseText);
		var threadIdsOnPage = [];
		if (mainPageParseResult) { // Maybe this is always true?
			var globalSettings = GlobalSettings();
			for (var i = 0; i < mainPageParseResult.length; i++) {
				var p = mainPageParseResult[i];
	            threadIdsOnPage.push(p.threadId);
				if (i < 9) {
					var m = getMessageIdToOpen(p.threadId, p.messageId,
											   globalSettings);
					messageDownloader.add(p.threadId, m, i+1, i+1, true);
				}
	        }
		}
		var noWait = false;
		syncWithPtbg(mainPageParseResult, threadIdsOnPage, noWait);
	}

	function onTBGDownloadFailure(statusCode, text) {
		console.log("TBG failed, statusCode " + statusCode + ", text: " +
					(text ? text.substr(0, 100) : "[no text]"));
		setTBGErrorMsg("TBG retrieval failed, code " + statusCode);
		var noWait = false;
		syncWithPtbg(null, null, noWait);
	}
	
	function onTBGDownloadTimeout() {
		console.log("TBG timeout");
		setTBGErrorMsg("TBG server timeout");
		var noWait = false;
		syncWithPtbg(null, null, noWait);
	}
	
	function startUpdate() {
		timeout = null;
		syncTime = +new Date();
		needSyncAsap = false;

		var url = "http://www.tbg.nu/cgi-bin/news.cgi?" +
			"h=" + (getUrlParameter("h") ||
					parseInt(document.getElementById("h").value) ||
					48) +
			"&r=" + (getUrlParameter("r") || 10) +
			"&s=" + (getUrlParameter("s") || 0) +
			"&t=" + (getUrlParameter("t") || 0) +
			"&a=" + (getUrlParameter("a") || 1) +
			"&l=" + (getUrlParameter("l") || 1)+
			"&f=" + (getUrlParameter("f") || 0);
	
		asyncXmlHttpRequest(url,
			"GET",
			"",
			onTBGDownloadSuccess,
			onTBGDownloadFailure,
			onTBGDownloadTimeout,
			30*1000);
	}
	
	
	that.startSyncing = function(threadIdsOnPage, notificationState_) {
			console.assert(!started);
			console.assert(timeout === null);
			notificationState = notificationState_;
			started = true;
			syncTime = +new Date();
			var noWait = true;
			syncWithPtbg(null, threadIdsOnPage, noWait);
		};
	that.syncAsap = function() {
			console.assert(started);
			if (timeout === null) {
				needSyncAsap = true;				
			}
			else {
				clearTimeout(timeout);
				timeout = null;
				startUpdate();
			}
		};
	that.syncAsapIfNotAlreadySyncing = function() {
			console.assert(started);
			if (timeout !== null) {
				clearTimeout(timeout);
				timeout = null;
				startUpdate();
			}
	};
	that.syncPtbgAsap = function() {
			console.assert(started);
			if (timeout === null) {
				needPtbgSyncAsap = true;
			}
			else {
				clearTimeout(timeout);
				timeout = null;
				var ms = getMillisecondsToNextSync();
				if (ms < 2500) {
					startUpdate();
				}
				else {
					var noWait = false;
					syncWithPtbg(null, null, noWait);
				}
			}
		};
	return that;
}


// Intended to be used with events. Queues up events and gives them to
// the modified event handler func, which instead of an event takes a list
// of events as input. 
function Debouncer(func, minimumIntervalMilliseconds) {
	var timer = null;
	var lastCallTime = 0;
	
	var queuedArguments = [];
	
	function fire() {
		timer = null;
		func.apply(undefined, queuedArguments);
		queuedArguments = [];
		lastCallTime = +new Date();
	}
	
	return function() {
		for (var i = 0; i < arguments.length; i++) {
			if (queuedArguments.length <= i) {
				queuedArguments.push([]);
				if (i !== 0) {
					for (var j = 0; j < queuedArguments[i-1].length; j++) {
						queuedArguments[i].push(undefined);
					}
				}
			}
			queuedArguments[i].push(arguments[i]);
		}
		var now = +new Date();
		if (timer) {
			// Do nothing, a fire is already scheduled.
		}
		else if (now - lastCallTime >= minimumIntervalMilliseconds) {
			fire();
		}
		else {
			var delay = minimumIntervalMilliseconds - (now - lastCallTime);
			timer = setTimeout(fire, delay);
		}		
	}
}



function PTBGSyncManagerForThreadWindow(threadId, isThreaderMode)
{
    console.assert(threadId >= 1);
    console.assert(isThreaderMode === false || isThreaderMode === true);
    
    // Determine if we should call a function to update the read/written colors
    // of the messages in the thread when the server replies. We can't do that
    // in threader mode except on first reply, since we will be getting our
    // own updates in subsequent replies.
    var updateReadColors = true;
    
    var deanonymizer = null;
    var isSyncing = false;
    var numFailuresInSequence = 0;
    
    var timer = null;
    
    
    var threadInfoKey = kThreadInfoKeyPrefix + threadId;
    
	// Set when we move to a new message with fastNavigation (although only
	// changed when we move to a new thread of course).
	var requestChangeToThreadId = threadId;
	var allThreadIds = [threadId];
	
	var debouncedOnThreadInfoModified = Debouncer(function() {
			if (!isThreaderMode) {
				colorLinksFromReadWriteStatus();
			}
			updateHideUnhideStar(threadId);
		},
		500);
    
    function onStorageModified(event) {
		if (event.key === threadInfoKey) {
			debouncedOnThreadInfoModified();
		}
    }
    
    window.addEventListener("storage", onStorageModified, false);

    
    function onSyncFailed() {
		isSyncing = false;
        numFailuresInSequence++;
        updateReadColors = !isThreaderMode;
        var timeoutMillisecs;
		if (threadId == requestChangeToThreadId) {
			timeoutMillisecs = Math.min(10*60*1000,
				15*1000 * numFailuresInSequence * numFailuresInSequence);
		}
		else {
			timeoutMillisecs = 100;
		}
        console.assert(timer === null);
        timer = setTimeout(sync, timeoutMillisecs);
    }
    
    function onSyncSuccess(changedThreadIds, unhideAllTimeChanged, serverResponse) {
        isSyncing = false;
        numFailuresInSequence = 0;
		
        var threadInfo = ThreadInfo(threadId);
        var readWriteStatus = serverResponse.getReadWriteStatus(threadId);
        if (updateReadColors) {
            updateReadWriteColors(threadInfo, isThreaderMode, readWriteStatus, kRead);
        }
        else {
            updateReadWriteColors(threadInfo, isThreaderMode, readWriteStatus, kWritten);
        }
        if (changedThreadIds.indexOf(threadId) !== -1 || unhideAllTimeChanged) {
            updateHideUnhideStar(threadId);
        }
        if (isThreaderMode) {
            updateReadColors = false;
        }
        // PTBG id might have changed during the xmlhttp call
        var newPtbgEdition = GlobalSettings().getPtbgServerEdition();
		if (threadId != requestChangeToThreadId) {
			console.log("Need to sync new thread id: " + requestChangeToThreadId);
            console.assert(timer === null);
			timer = setTimeout(sync, 50);
		}
        else if (threadInfo.isReadyForUpload(newPtbgEdition)) {
            console.log("Thread ready for upload ptbgEdition: " + newPtbgEdition);
            console.assert(timer === null);
            timer = setTimeout(sync, 1000);
        }
        else if (threadInfo.isDirty(newPtbgEdition)) {
            console.assert(timer === null);
            timer = setTimeout(sync, 30*1000);
        }
    }
    
    function sync() {
        isSyncing = true;
        clearTimeout(timer);
        timer = null;
		const kNoWait = true;
		
		threadId = requestChangeToThreadId;
		threadInfoKey = kThreadInfoKeyPrefix + threadId;
		if (allThreadIds.indexOf(threadId) === -1) {
			allThreadIds.push(threadId);
		}
		
		genericSyncWithPtbg(allThreadIds,
            deanonymizer,
			kNoWait,
			onSyncSuccess,
			function(statusCode, text) {
				onSyncFailed();
			},
			function() {
				onSyncFailed();
			},
			function() {
				isSyncing = false;
				numFailuresInSequence = 0;
			});
	}
    
    return {
        onGotAllMessagesInThread : function() {
            var threadInfo = ThreadInfo(threadId);
            var ptbgEdition = GlobalSettings().getPtbgServerEdition();
            if (threadInfo.isDirty(ptbgEdition)) {
                console.log("onGotAllMessagesInThread() and isDirty")
                if (!isSyncing) {
                    clearTimeout(timer);
                    timer = null;
                    sync();
                }
                else {
                    threadInfo.delayUpload(0);
                }
            }
        },
        syncAsap : function() {
            var threadInfo = ThreadInfo(threadId);
            if (!isSyncing) {
                clearTimeout(timer);
                timer = null;
                sync();
            }
            else {
                threadInfo.delayUpload(0);
            }
        },
		setThreadId : function(newThreadId) {
			console.assert(newThreadId > 0);
			console.assert(!isThreaderMode);
			if (requestChangeToThreadId != newThreadId) {
				requestChangeToThreadId = newThreadId;
				if (!isSyncing) {
					clearTimeout(timer);
					timer = null;
					sync();
				}
			}
		},
        startSyncing : function(deanon) {
            deanonymizer = deanon;
            sync();
        }
    };

}



function isWithin(value, min, max) {
    return value >= min && value <= max;
}




///////// RLE Encoding/Decoding /////////////////////////////


// Returns number of values in a row
// starting at startIndex.
function numInSequence(array, startIndex) {
    console.assert(startIndex >= 0)
    console.assert(startIndex < array.length);
    var value = array[startIndex];
    var length = array.length;
    for (var i = startIndex+1; i < length; i++) {
        if (array[i] !== value) {
            return i - startIndex;
        }
    }
    var result = array.length - startIndex;
    console.assert(result >= 1);
    return result;
}

function rleEncode(array, startIndex) {
    console.assert(startIndex >= 0);
    var rle = [];
    var length = array.length;
    var i = startIndex;
    while (i < length) {
        var value = array[i];
        rle.push(value);
        var runLength = numInSequence(array, i);
        rle.push(runLength);
        i += runLength;
    }
    return rle;
}

function rleDecode(rleEncoding, startIndex) {
    var array = [];
    var arrayIndex = startIndex;
    var length = rleEncoding.length;
    for (var i = 0; i < length; i += 2) {
        var value = rleEncoding[i];
        var runLength = rleEncoding[i+1];
        var repeatUntil = arrayIndex + runLength;
        while (arrayIndex < repeatUntil) {
            array[arrayIndex] = value;
            arrayIndex++;
        }
    }
    return array;
}


///////////////////////////////////////////////////


const kUnread = 0;
const kRead = 1;
const kWritten = 2;
                        

// Only keep alive for short periods of time, since the data is read from
// localStorage and that can be updated by other windows/tabs etc.
function ThreadInfo(threadId, forceLoadOldHiddenStatus /* = false */) {
    console.assert(typeof(threadId) === "number");
    console.assert(threadId >= 1);

    forceLoadOldHiddenStatus = (typeof(forceLoadOldHiddenStatus) === "undefined") ? false : true;
    
	// Private constants:
    const kUploadAsapIfDirty = 0;
    const kUploadAfter = 1;
    const kUploading = 2;
    
    const kUploadTimeoutMillisecs = 60*1000;
    const kMaxDelayUploadMillisecs = 120*1000;

    // Version 4 was in script version 1.2.2.
    // Version 5 and 6 were never released publicly.
    // Version 9 was never released publicly.
	const kMajorVersion = 12;
    const kMinorVersion = 0;
	var kOldFullKeyName = "history_" + threadId;
	var kKeyName = kThreadInfoKeyPrefix + threadId;


	// Private variables

	var hadInfo = false;
    
    // If readWriteStatus is null and readWriteStatusRle is null, we can initialize
    // readWriteStatus to [].
    // If readWriteStatus is null and readWriteStatusRle is not null, we can initialize
    // readWriteStatus from readWriteStatusRle.
    // If readWriteStatus is not null and readWriteStatusRle is null, we can calculate
    // readWriteStatusRle from readWriteStatus.
    // If readWriteStatus is not null and readWriteStatusRle is not null, they are in sync.
    // Make sure to always null readWriteStatusRle when writing to readWriteStatus.
	var readWriteStatus = null; // [ messageId: status ] - status = kRead | kWritten | kUnread
    var readWriteStatusRle = null;
	
	// These are kept to avoid doing O(n) operations where O(1) is enough.
	// They could be calculated from readWriteStatus instead.
	var hasWrittenInThread = 0;
	var highestReadMessageId = -1;
	//var ptbgUploaded = -1;  // the "highest" ptbg user_id this threadInfo has been uploaded to.
	//var ptbgUpdateTime = 0; // The server timestamp of the last update we have locally.
    var hidden = 0; // 1 if hidden, otherwise 0.
    var hiddenTime = 0; // Seconds since 1970 when it was last hidden or unhidden.
    var star = 0; // 1 if star, otherwise 0.
    var starTime = 0; // Seconds since 1970 when it was last starred or unstarred.
	
    var inSyncWithPtbgEdition = -1;
    var lastReceivedChangeIndexPtbgEdition = -1;
    var lastReceivedChangeIndex = -1;
    var uploadStatus = kUploadAsapIfDirty;
    var uploadTimestamp = 0;
    
	// Private functions
	
	function fillInReadWriteStatusRle() {
        if (readWriteStatusRle === null) {
            if (readWriteStatus === null) {
                readWriteStatus = [];
            }
            console.assert(readWriteStatus.indexOf(null) === -1);
            console.assert(readWriteStatus.indexOf(undefined) === -1);
            readWriteStatusRle = rleEncode(readWriteStatus, 1);
        }
        console.assert(readWriteStatusRle.indexOf(null) === -1);
        console.assert(readWriteStatusRle.indexOf(undefined) === -1);		
	}

    function save() {
		fillInReadWriteStatusRle();
        console.assert(hidden === 0 || hidden === 1);
        updateThreadLastAccessTime(threadId);
		var status = JSON.stringify(
			[kMajorVersion, kMinorVersion,
                hasWrittenInThread, highestReadMessageId,
                hidden, hiddenTime, star, starTime,
                readWriteStatusRle, inSyncWithPtbgEdition,
                lastReceivedChangeIndexPtbgEdition,
                lastReceivedChangeIndex,
                uploadStatus, uploadTimestamp]);
		console.log("save() - " + threadId + " - " + status);
		writeToLocalStorage(kKeyName, status);
	}
    
    function unpack() {
        if (readWriteStatus === null) {
            if (readWriteStatusRle !== null) {
                readWriteStatus = rleDecode(readWriteStatusRle, 1);
                readWriteStatusRle = null;
            }
            else  {
                readWriteStatus = [];
            }
        }
    }
    
    function extendArray(messageId) {
		var needSave = messageId >= readWriteStatus.length;
		var startValue = readWriteStatus.length >= 1 ? readWriteStatus.length : 1;
		for (var i = startValue; i <= messageId; i++) {
			readWriteStatus[i] = kUnread;
		}
		return needSave;
	}
	
	
	function fullLoadOld() {
        if (localStorage[kOldFullKeyName]) {
            var h = JSON.parse(localStorage[kOldFullKeyName]);
            var version = parseInt(h[0]);
            if (version == 6 || version == 5) {
                console.log("fullLoad() - " + h[1]);
                readWriteStatusRle = h[1];
            }
            else if (version == 4 || version == 3 || version == 2) {
                readWriteStatus = [];
                for (var messageId in h[1]) {
                    extendArray(parseInt(messageId));
                    readWriteStatus[parseInt(messageId)] = h[1][messageId];
                }
            }
            else if (version == 1) {
                readWriteStatus = [];
                for (var messageId in h[2]) {
                    rextendArray(parseInt(messageId));
                    readWriteStatus[parseInt(messageId)] = h[2][messageId];
                }
                hasWrittenInThread = h[1];
            }
            else {
                alert("Full readWriteStatus load failed, it was written using " +
                    "version " + version + " of this script.");
            }
        }
        console.log("fullLoadOld() - " + JSON.stringify(readWriteStatus));
	}
    
    function privateMarkAs(messageId, status) {
        unpack();
		var needSave = false;
        if (!privateHasRead(messageId) ||
            status === kWritten && readWriteStatus[messageId] !== kWritten)
		{
			extendArray(messageId);
			readWriteStatus[messageId] = status;
            readWriteStatusRle = null;
			if (messageId > highestReadMessageId) {
				highestReadMessageId = messageId;
			}
            if (status === kWritten) {
                hasWrittenInThread = 1;
            }
            inSyncWithPtbgEdition = -1;
			needSave = true;
		}
		return needSave;
    }
	
	function privateHasRead(messageId) {
        unpack();
        var status = (messageId in readWriteStatus) ? readWriteStatus[messageId] : 0;
		return status === kRead || status === kWritten;
	}

    

		
	// Initialization
    
    var loadOld = false;
    
    if (localStorage[kKeyName]) {
		hadInfo = true;
		var f = JSON.parse(localStorage[kKeyName]);
		var majorVersion = f[0];
        var minorVersion = 0;
        
        if (majorVersion === kMajorVersion) {
            minorVersion = f[1];
            hasWrittenInThread = f[2];
			highestReadMessageId = f[3];
            hidden = f[4];
            hiddenTime = f[5];
            star = f[6];
            starTime = f[7];
            readWriteStatusRle = f[8];
            console.assert(readWriteStatusRle.indexOf(null) === -1);
            inSyncWithPtbgEdition = f[9];
            lastReceivedChangeIndexPtbgEdition = f[10];
            lastReceivedChangeIndex = f[11];
            uploadStatus = f[12];
            uploadTimestamp = f[13];
        }
		else if (majorVersion == 11) {
			// Internal development version
            minorVersion = f[1];
            hasWrittenInThread = f[2];
			highestReadMessageId = f[3];
            hidden = f[4];
            hiddenTime = f[5];
            star = f[6];
            starTime = f[7];
            readWriteStatusRle = f[8];
            console.assert(readWriteStatusRle.indexOf(null) === -1);
            inSyncWithPtbgEdition = f[9];
            lastReceivedChangeIndexPtbgEdition = f[10];
            lastReceivedChangeIndex = f[11];
            uploadStatus = f[12];
            uploadTimestamp = f[13];
            //highestNotifiedMessageId = f[14];			
		}
        else if (majorVersion === 10) {
            // Internal development version
            minorVersion = f[1];
            hasWrittenInThread = f[2];
			highestReadMessageId = f[3];
			//latestAccess = f[4];
            hidden = f[5];
            hiddenTime = f[6];
            star = f[7];
            starTime = f[8];
            readWriteStatusRle = f[9];
            console.assert(readWriteStatusRle.indexOf(null) === -1);
            inSyncWithPtbgEdition = f[10];
            lastReceivedChangeIndexPtbgEdition = f[11];
            lastReceivedChangeIndex = f[12];
            uploadStatus = f[13];
            uploadTimestamp = f[14];
            //highestNotifiedMessageId = f[15];
        }
        else if (majorVersion === 9) {
            // Internal development version
            hasWrittenInThread = f[1];
			highestReadMessageId = f[2];
			//latestAccess = f[3];
            hidden = f[4];
            hiddenTime = f[5];
            star = f[6];
            starTime = f[7];
            readWriteStatusRle = f[8];
            console.assert(readWriteStatusRle.indexOf(null) === -1);
            inSyncWithPtbgEdition = f[9];
            lastReceivedChangeIndexPtbgEdition = f[10];
            lastReceivedChangeIndex = f[11];
            uploadStatus = f[12];
            uploadTimestamp = f[13];
        }
        else if (majorVersion === 8) {
            // Internal development version
            hasWrittenInThread = f[1];
			highestReadMessageId = f[2];
			//latestAccess = f[3];
            hidden = f[4];
            hiddenTime = f[5];
            star = f[6];
            starTime = f[7];
            readWriteStatusRle = f[8];
            // Hack to get rid of some nulls that has sneaked into this array. Using this technique
            // I will also detect if any nulls get into the array in the future.
            switch (threadId) {
                case 173614:
                case 177324:
                case 177336:
                case 177748:
                case 178516:
                case 178864:
                for (var i = 0; i < readWriteStatusRle.length; i++) {
                    if (readWriteStatusRle[i] === null) {
                        readWriteStatusRle[i] = 0;
                    }
                }
                break;
                default:
            }
            console.assert(readWriteStatusRle.indexOf(null) === -1);
            inSyncWithPtbgEdition = f[9];
            lastReceivedChangeIndexPtbgEdition = f[10];
            lastReceivedChangeIndex = f[11];
        }
        else if (majorVersion == 7) {
            // Internal development version
            hasWrittenInThread = f[1] ? 1 : 0;
			highestReadMessageId = f[2];
			//latestAccess = f[3];
            //if (latestAccess > 3*1000*1000*1000) {
                // Temporary fix, was never released to public with milliseconds
                // instead of seconds.
            //    latestAccess = Math.round(latestAccess/1000);
            //}
            hidden = f[4];
            hiddenTime = f[5];
            star = f[6];
            starTime = f[7];
            readWriteStatusRle = f[8];
        }
		else if (majorVersion == 6) {
			hasWrittenInThread = f[1];
			//numUnreadMessages = f[2];
			highestReadMessageId = f[3];
			//latestAccess = Math.round(f[4] / 1000);
			//ptbgUploaded = f[5];
			//ptbgUpdateTime = f[6];
            loadOld = true;
		}
		else if (majorVersion == 5 || majorVersion == 4) {
			hasWrittenInThread = f[1];
			//numUnreadMessages = f[2];
			highestReadMessageId = f[3];
			//latestAccess = Math.round(f[4] / 1000);
            loadOld = true;
		}
		else if (majorVersion == 3) {
			hasWrittenInThread = f[1];
			//numUnreadMessages = f[2];
			highestReadMessageId = f[3];
            loadOld = true;
		}
		else if (majorVersion == 2) {
			hasWrittenInThread = f[1];
			//numUnreadMessages = f[2];
            loadOld = true;
		}
		else {
            var e = "Fast readWriteStatus load failed, it was written using " +
				"format version " + majorVersion + "." + minorVersion +
                ", while current version is " + kMajorVersion + "." + kMinorVersion;
            console.log(e);
			alert(e);
		}
	}
    
    if (loadOld || forceLoadOldHiddenStatus) {
		fullLoadOld();
        
        var h = oldGetHiddenStatus(threadId);
        hidden = h[0] ? 1 : 0;
        hiddenTime = h[1];
        console.log("Old hidden status: " + hidden + " " + hiddenTime + " for " + threadId);
        
		save();
        delete localStorage[kOldFullKeyName];
    }
	
    
	// Public functions
	return {
        getThreadId : function() {
            return threadId;
        },
		hadInfo : function() {
			// Did the thread have a ThreadInfo before ThreadInfo() was called?
			return hadInfo;
		},
		getHighestReadId : function() {
			return highestReadMessageId;
		},
		hasRead : function(messageId) {
            console.assert(messageId >= 1);
            if (messageId > highestReadMessageId) {
                return false;
            }
            else if (messageId == highestReadMessageId) {
                return true;
            }
            else {
                return privateHasRead(messageId);
            }
		},
		hasWritten : function(messageId) {
            console.assert(messageId >= 1);
			unpack();
			return readWriteStatus[messageId] === kWritten;
		},
		markAsRead : function(messageId) {
            console.assert(messageId >= 1);
			var needSave = privateMarkAs(messageId, kRead);
			if (needSave) {
				save();
			}
		},
		markAsWritten : function(messageId) {
            console.assert(messageId >= 1);
            var needSave = privateMarkAs(messageId, kWritten);
            if (needSave) {
                save();
            }
		},
		markAllAsRead : function(messageIds) {
			var needSave = false;
			for (var i in messageIds) {
				var id = messageIds[i];
				console.assert(id >= 1);
				needSave = privateMarkAs(id, kRead) || needSave;
			}
			if (needSave) {
				save();
			}
		},
        markAllAsWritten : function(messageIds) {
            var needSave = false;
            for (var i in messageIds) {
                var id = messageIds[i];
                console.assert(id >= 1);
                needSave = privateMarkAs(id, kWritten) || needSave;
            }
            if (needSave) {
                save();
            }
        },
		hasWrittenInThread : function() {
			return hasWrittenInThread == 1;
		},
        setHasWrittenInThread : function() {
            if (!hasWrittenInThread) {
                hasWrittenInThread = 1;
                inSyncWithPtbgEdition = -1;
                save();
            }
        },
		getNumUnread : function(upToAndIncludingMessageId) {
			if (!readWriteStatusRle) {
				fillInReadWriteStatusRle();
			}
			var numUnread = 0;
			var numMessagesLeft = upToAndIncludingMessageId;
			for (var i = 0;
					i < readWriteStatusRle.length && numMessagesLeft > 0;
					i += 2)
			{
				var value = readWriteStatusRle[i];
				var count = readWriteStatusRle[i+1];
				count = Math.min(count, numMessagesLeft);
				numMessagesLeft -= count;
				if (value === kUnread) {
					numUnread += count;
				}
			}
			numUnread += Math.max(numMessagesLeft, 0);
			return numUnread;
		},
		getFirstUnreadMessageId : function() {
			if (!readWriteStatusRle) {
				fillInReadWriteStatusRle();
			}
			var numRead = 0;
			for (var i = 0; i < readWriteStatusRle.length; i += 2) {
				var value = readWriteStatusRle[i];
				var count = readWriteStatusRle[i+1];
				if (value === kUnread) {
					return numRead + 1;
				}
				numRead += count;
			}
			return numRead + 1;			
		},
		remove : function() {
			delete localStorage[kKeyName];
		},
        isHidden : function(lastUnhideAllTime) {
            console.assert(lastUnhideAllTime === 0 || lastUnhideAllTime > 0);
            return (hidden && hiddenTime > lastUnhideAllTime);
        },
        hide : function() {
            var now = getTime();
            hidden = 1;
            hiddenTime = Math.max(hiddenTime+1, now);
            inSyncWithPtbgEdition = -1;
            save();
            return now;
        },
        unhide : function() {
            var now = getTime();
            hidden = 0;
            hiddenTime = Math.max(hiddenTime+1, now);
            inSyncWithPtbgEdition = -1;
            save();
            return now;
        },
        isStar : function() {
            return star;
        },
        star : function() {
            var now = getTime();
            star = 1;
            starTime = Math.max(starTime+1, now);
            inSyncWithPtbgEdition = -1;
            save();
        },
        unstar : function() {
            var now = getTime();
            star = 0;
            starTime = Math.max(starTime+1, now);
            inSyncWithPtbgEdition = -1;
            save();
        },
        isDirty : function(ptbgEdition) {
            console.assert(ptbgEdition >= 0);
            return (inSyncWithPtbgEdition !== ptbgEdition);
        },
        addToUpdateRequest : function(updateRequest) {
            if (readWriteStatusRle === null) {
                if (readWriteStatus === null) {
                    readWriteStatus = [];
                }
                readWriteStatusRle = rleEncode(readWriteStatus, 1);
            }
            updateRequest.add(threadId, readWriteStatusRle, hidden, hiddenTime, star, starTime);
            uploadStatus = kUploading;
            uploadTimestamp = (new Date()).getTime();
            save();
        },
        isUploading : function() {
            var now = (new Date()).getTime();
            return (uploadStatus === kUploading &&
                isWithin(uploadTimestamp, now-kUploadTimeoutMillisecs, now));
        },
        uploadFailed : function() {
            uploadStatus = kUploadAsapIfDirty;
            uploatTimestamp = 0;
            save();
        },
        delayUpload : function(seconds) {
            console.assert(seconds >= 0);
            console.assert(seconds <= kMaxDelayUploadMillisecs);
            uploadStatus = kUploadAfter;
            var now = (new Date()).getTime();
            uploadTimestamp = now + Math.round(seconds*1000);
            save();
        },
        isReadyForUpload : function(ptbgEdition) {
            var now = (new Date()).getTime();
            return (inSyncWithPtbgEdition !== ptbgEdition &&
                    (uploadStatus === kUploadAsapIfDirty ||
                        uploadStatus === kUploadAfter &&
                                !isWithin(uploadTimestamp, now, now + kMaxDelayUploadMillisecs) ||
                        uploadStatus === kUploading &&
                                !isWithin(uploadTimestamp, now + kUploadTimeoutMillisecs)));
        },
        setInSync : function(ptbgEdition, changeIndex) {
            if (ptbgEdition > lastReceivedChangeIndexPtbgEdition ||
                ptbgEdition == lastReceivedChangeIndexPtbgEdition && changeIndex > lastReceivedChangeIndex)
            {
                lastReceivedChangeIndexPtbgEdition = ptbgEdition;
                lastReceivedChangeIndex = changeIndex;
                save();
            }
        },
        getLastMergedChangeIndex : function(ptbgEdition) {
            console.assert(ptbgEdition >= 0);
            if (lastReceivedChangeIndexPtbgEdition === ptbgEdition) {
                return lastReceivedChangeIndex;
            }
            else {
                return -1;
            }
        },
        merge : function(ptbgEdition, asOfChangeIndex,
                    readWriteStatusRle2, hidden2, hiddenTime2, star2, starTime2) {
            console.assert(asOfChangeIndex >= 0);
            console.assert(hidden2 === 0 || hidden2 === 1);
            console.assert(hiddenTime2 >= 0);
            console.assert(star2 === 0 || star2 === 1);
            console.assert(starTime2 >= 0);
            
            if (ptbgEdition >= lastReceivedChangeIndexPtbgEdition ||
                    ptbgEdition == lastReceivedChangeIndexPtbgEdition &&
                    asOfChangeIndex > lastReceivedChangeIndex)
            {
                unpack();
                var needVisualUpdate = false;
                inSyncWithPtbgEdition = ptbgEdition;
                
                var readWriteStatus2 = rleDecode(readWriteStatusRle2, 1);
                var length = Math.min(readWriteStatus2.length, readWriteStatus.length);
                var i = 1;
                for ( ; i < length; i++) {
                    if (readWriteStatus[i] < readWriteStatus2[i]) {
                        readWriteStatus[i] = readWriteStatus2[i];
                        highestReadMessageId = Math.max(highestReadMessageId, i);
                        if (readWriteStatus2[i] == kWritten) {
                            hasWrittenInThread = true;
                        }
                        needVisualUpdate = true;
                        readWriteStatusRle = null;
                    }
                    else if (readWriteStatus[i] > readWriteStatus2[i]) {
                        inSyncWithPtbgEdition = -1;
                        console.log("Merge of " + threadId + " still need update due to readWriteStatus");
                    }
                }
                if (readWriteStatus.length > readWriteStatus2.length) {
                    inSyncWithPtbgEdition = -1;
                }
                for ( ; i < readWriteStatus2.length; i++) {
                    readWriteStatus[i] = readWriteStatus2[i];
                    readWriteStatusRle = null;
                    if (readWriteStatus2[i] != kUnread) {
                        highestReadMessageId = Math.max(highestReadMessageId, i);
                        if (readWriteStatus2[i] == kWritten) {
                            hasWrittenInThread = true;
                        }
                        needVisualUpdate = true;
                    }
                }
                
                if (hiddenTime <= hiddenTime2) {
                    needVisualUpdate = needVisualUpdate || (hidden != hidden2);
                    hidden = hidden2;
                    hiddenTime = hiddenTime2;
                }
                else if (hiddenTime > hiddenTime2) {
                    inSyncWithPtbgEdition = -1;
                    console.log("Merge of " + threadId + " still need update due to hiddenTime");
                }
                
                if (starTime <= starTime2) {
                    needVisualUpdate = needVisualUpdate || (star != star2);
                    star = star2;
                    starTime = starTime2;
                }
                else if (starTime > starTime2) {
                    inSyncWithPtbgEdition = -1;
                    console.log("Merge of " + threadId + " still need update due to starTime");
                }
                
                lastReceivedChangeIndexPtbgEdition = ptbgEdition;
                lastReceivedChangeIndex = asOfChangeIndex;
            }
            uploadStatus = kUploadAsapIfDirty;
            uploadTimestamp = 0;
            save();
            return needVisualUpdate;
        }
	};
}

function getBorderColor(threadInfo, messageId) {
	if (threadInfo.hasWritten(messageId)) {
		return "orange";
	}
	else if (threadInfo.hasRead(messageId)) {
		return "#aaaaaa";
	}
	else {
		return "#40C040";
	}
}

function emptyFunction() {
}


function startsWith(longString, prefix) {
	return longString.substr(0, prefix.length) == prefix;
}

// Returns null if not found
function getMessageCacheDict() {
    var windowWithCache = (typeof(unsafeWindow) !== "undefined" && unsafeWindow
            || window)
    if (typeof(windowWithCache.ptbgCache) === "undefined") {
        windowWithCache = windowWithCache.opener;
    }
    
    // Put in a try/catch to prevent SecurityError in Chrome when following
    // the link in http://www.tbg.nu/news_show/184895/16
    try {
        if (windowWithCache &&
                typeof(windowWithCache.ptbgCache) !== "undefined")
        {
            return windowWithCache.ptbgCache;
        }
    }
    catch (e) {
        if (e.name !== "SecurityError") {
            throw e;
        }
    }
    
    return null;
}

const kMessageCacheMajorVersion = 2;        // Version 1 was never released.
const kMessageCacheMinorVersion = 0;
const kMessageCachePrefix = "cache_";       // + threadId + "_" + messageId

function getFromMessageCache(threadId, messageId) {
    var key = kMessageCachePrefix + threadId + "_" + messageId;
    
    var cacheDict = getMessageCacheDict();
    if (cacheDict && (cacheValue = cacheDict[key])) {
        return cacheValue;
    }
    
	var cacheString = localStorage[key] || sessionStorage[key];
	if (cacheString) {
		var info = JSON.parse(cacheString);
        if (typeof(info.majorVersion) !== "undefined" &&
                info.majorVersion <= kMessageCacheMajorVersion)
        {
            return info.message;
        }
        else {
            clearMessageCache();
        }
	}
    return null;
}



function addToMessageCache(threadId, messageId, message) {
    var key = kMessageCachePrefix + threadId + "_" + messageId;
    var cacheDict = getMessageCacheDict();
    if (cacheDict) {
        cacheDict[key] = message;
    }
    
    var data = JSON.stringify(
        {   majorVersion : kMessageCacheMajorVersion,
            minorVersion : kMessageCacheMinorVersion,
            message : message,
            timestamp : dateToISOString(new Date()) });
    delete sessionStorage[key];
    writeToLocalStorage(key, data);
}


function moveCacheEntryToSessionStorage(key) {
    var data = localStorage[key];
    if (data === null) {
        return;
    }
    var moved = false;
    var i = 0;
    while (!moved && i < 20) {
        try {
            sessionStorage[key] = data;
            moved = true;
        }
        catch (err) {
            var randomKey = sessionStorage.key( Math.floor(Math.random() * sessionStorage.length) );
            if (randomKey && startsWith(randomKey, kMessageCachePrefix)) {
                sessionStorage.removeItem(randomKey);
            }
        }
        i++;
    }
    if (moved) {
        localStorage.removeItem(key);
    }
    else {
        clearMessageCache();
    }
}


function moveMessageCachesToSessionStorage(movePredicate) {
	var keysToMove = [];
	for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === null) {
            // localStorage was modified while iterating through it.
            clearMessageCache();
            break;
        }
        else if (startsWith(key, kMessageCachePrefix)) {
            var cacheString = localStorage[key];
            var info = JSON.parse(cacheString);
            if (typeof(info.majorVersion) !== "undefined" && info.majorVersion <= kMessageCacheMajorVersion) {
                if (movePredicate(info)) {
                    keysToMove.push(key);
                }
            }
            else {
                clearMessageCache();
                break;
            }
		}
	}
	for (var i = 0; i < keysToMove.length; i++) {
        var key = keysToMove[i];
        console.log("Moving " + key + " to sessionStorage");
        moveCacheEntryToSessionStorage(key);
	}
}



function garbageCollectMessageCache() {
    var startTime = +new Date();
    var moveBeforeDate = dateToISOString(new Date(startTime - 25*3600*1000));
    moveMessageCachesToSessionStorage(function(cacheInfo) {
        return cacheInfo.timestamp < moveBeforeDate;    
    });
    var elapsedTime = +new Date() - startTime;
    console.log("garbageCollectMessageCache() completed in " + elapsedTime +
        " milliseconds");
    setTimeout(garbageCollectMessageCache, (86400+700)*1000);
}

function clearMessageCacheAt(storage) {
	var keysToRemove = [];
	for (var i = 0; i < storage.length; i++) {
        var key = storage.key(i);
		if (key !== null && startsWith(key, kMessageCachePrefix)) {
			keysToRemove.push(key);
		}
	}
	console.log("About to remove " + keysToRemove.length + " entries");
	for (var i = 0; i < keysToRemove.length; i++) {
		storage.removeItem(keysToRemove[i]);
	}
}

function clearMessageCache() {
	console.log("clearMessageCache");
    clearMessageCacheAt(localStorage);
    clearMessageCacheAt(sessionStorage);
}


// major version 1 was never released publicly
const kUnsentReplyMajorVersion = 2;
const kUnsentReplyMinorVersion = 0;
const kUnsentReplyKeyPrefix = "ptbgreply_";

function unsentReplyKey(threadId, messageId) {
    return kUnsentReplyKeyPrefix + threadId + "_" + messageId;
}

function addOrUpdateUnsentReply(threadId, messageId,
        originalMessage, modifiedMessage, originalSubject, modifiedSubject)
{
    console.log("addOrUpdateUnsentReply tid " + threadId + ", mid " + messageId);
    var data = {majorVersion : kUnsentReplyMajorVersion,
                minorVersion : kUnsentReplyMinorVersion,
                timestamp : dateToISOString(new Date(+new Date() - 2*86400*1000)),
                originalMessage : originalMessage,
                modifiedMessage : modifiedMessage,
                originalSubject : originalSubject,
                modifiedSubject : modifiedSubject};
    writeToLocalStorage(unsentReplyKey(threadId, messageId),
        JSON.stringify(data));
}

function getUnsentReply(threadId, messageId) {
    var dataStr = localStorage[unsentReplyKey(threadId, messageId)];
    var data = null;
    if (dataStr) {
        var unpacked = JSON.parse(dataStr);
        if (typeof(unpacked.majorVersion) !== "undefined" &&
                    unpacked.majorVersion <= kUnsentReplyMajorVersion)
        {
            data = [unpacked.originalMessage,
                    unpacked.modifiedMessage,
                    unpacked.originalSubject,
                    unpacked.modifiedSubject];
        }
    }
    return data;
}

function garbageCollectUnsentReplies() {
    var startTime = +new Date();
    var deleteBeforeDate = dateToISOString(new Date(startTime - 25*3600*1000));
    var keysToDelete = [];
	for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key === null) {
            // localStorage was modified while iterating through it.
            break;
        }
        else if (startsWith(key, kUnsentReplyKeyPrefix)) {
            var dataStr = localStorage[key];
            var unpacked = JSON.parse(dataStr);
            if (typeof(unpacked.majorVersion) !== "undefined" &&
                    unpacked.majorVersion <= kUnsentReplyMajorVersion &&
                    unpacked.timestamp < deleteBeforeDate)
            {
                keysToDelete.push(key);
            }
		}
	}
	for (var i = 0; i < keysToDelete.length; i++) {
        var key = keysToDelete[i];
        console.log("Deleting " + key);
        delete localStorage[key];
	}
    console.log("Garbage collected unsent replies in " +
        (+new Date() - startTime) + " milliseconds");
}



function Messages(threadId) {
	
	// Private variables
	
	var messages = [];
	var downloadQueue = [];
	var nextUnpostedId = 1;
	
	var downloadQueueIterator = {
		getLength : function() {
			return downloadQueue.length;		
		},
		get : function(index) {
			return downloadQueue[index];
		}	
	}
	
	
	// Private functions
	function isDownloaded(id) {
		return messages[id].message != undefined;
	}
	function privateIsReadyForDisplay(id) {	
		var parentId = messages[id].parentId;
		var parentOk = id == 1 || messages[parentId].message != undefined;
		var haveMessageBody = messages[id].message != undefined;
		return parentOk && haveMessageBody;
	}
	function rightMostDecendant(id) {
		var m = messages[id];
		while (m.children.length > 0) {
			m = messages[m.children[m.children.length-1]];
		}
		return m.messageId;
	}
		
	
	// Public functions
	return {
		// Takes a list of messages. (Some of) the objects in the list
		// are saved in this object, so don't modify from outside!
		updateThreadStructure : function(structure) {
			
			var newIds = [];
			var ancestors = [];
			for (var i in structure) {
				var m = structure[i];
				var id = m.messageId;
				ancestors = ancestors.slice(0, m.indentation);
				if (messages[id] == undefined) {
					newIds.push(id);
					messages[id] = m;
					m.children = [];
					m.parentId = ancestors[ancestors.length-1];
					if (m.parentId != undefined) {
						m.previousId = rightMostDecendant(m.parentId);
						var prevMessage = messages[m.previousId];
						m.nextId = prevMessage.nextId;
						var nextMessage = messages[m.nextId];
						prevMessage.nextId = id;
						if (nextMessage != undefined) {
							nextMessage.previousId = id;
						}
						messages[m.parentId].children.push(id);
					}
					var cachedMessage = getFromMessageCache(threadId, id);
					if (cachedMessage) {
						for (var prop in cachedMessage) {
							m[prop] = cachedMessage[prop];
						}
					}
					else {
						downloadQueue.push(id);
					}
				}			
				ancestors.push(id);
				if (id >= nextUnpostedId) {
					nextUnpostedId = id+1;
				}
			}
			return newIds;
		},
		// Returns ids of all messages ready for display because
		// of this add.
		addMessage : function(message) {
            addToMessageCache(threadId, message.messageId, message);
			
			for (var i = 0; i < downloadQueue.length; i += 1) {
				if (downloadQueue[i] == message.messageId) {
					var a = downloadQueue.slice(0, i);
					var b = downloadQueue.slice(i+1);		
					downloadQueue = a.concat(b);
					break;
				}
			}
			var m = messages[message.messageId];

			for (var prop in message) {
				// !!! 13-05-11a Got a bug here once. m was undefined. Was just when I 
				// posted a message myself while sombody else got the message. I saw his 
				// IP but his message was left "Loading" and this line triggered an error:
				// Uncaught TypeError: Cannot set property 'messageId' of undefined 
				m[prop] = message[prop];			
			}
			
			var ready = [];
			var potentiallyReady = [];
			for (var i = 0; i < m.children.length; i++) {
				potentiallyReady.push(m.children[i]);
			}
			while (potentiallyReady.length > 0) {
				var id = potentiallyReady.pop();
				if (privateIsReadyForDisplay(id)) {
					ready.push(id);
					var children = messages[id].children;
					for (var i = 0; i < children.length; i++) {
						potentiallyReady.push(children[i]);
					}
				}
			}
			if (privateIsReadyForDisplay(message.messageId)) {
				ready.push(message.messageId);
			}
			return ready;
		},
		isReadyForDisplay : function(messageId) {
			return privateIsReadyForDisplay(messageId);		
		},
		getDownloadQueueIterator : function() {
			return downloadQueueIterator;
		},
		getMessage : function(messageId) {
			// Don't modify the message object from outside pls!
			return messages[messageId];
		},
		getAllMessageIds : function() {
			var ids = [];
			for (var i in messages) {
				ids.push(messages[i].messageId);
			}
			return ids;
		},
        getHighestKnownId : function() {
            return messages.length - 1;
        },
		getNextUnpostedId : function() {
			return nextUnpostedId;
		}
	};

}


// This loads and posts the messages in threader mode.
function Communicator(threadId, messages, syncManager,
        deanonymizer, imageDownloader)
{

	
	// Constants
	
	var kXhrDutyPost = 0;
	var kXhrDutyMessage = 1;
	var kXhrDutyThreadAndMessage = 2;
	var kXhrDutyIdle = 3;
	
	var kCheckNewMessagesInterval = 15000;
	var kTimeout = 30000;
	
	
	// Private variables
	var postQueue = [];
	var xhrs = []; // [[duty, xhr, timeout]];
	var fetchIds = []; // currently beeing fetched.
	
	// Don't update thread list while there are posts in progress, since that 
	// might color new messages green when they should be orange. 
	// And only allow one post at a time for the same reason.
	var isPostInProgress = false;
	
	
	var lastThreadFetch = (new Date()).getTime();
	var idleTimeout = null;
	
	// "this"
	var self;
	
	// Private functions
	var startNewJobs;
	var post;
	var fetchMessage;
	

	function xhrStart(xhrIndex, duty, onTimeout) {
		if (duty == kXhrDutyPost) {
			isPostInProgress = true;	
		}
		var x = xhrs[xhrIndex];
		x[0] = duty;
		var timeout;
		timeout = setTimeout(function() {
				if (duty == kXhrDutyPost) {
					isPostInProgress = false;
				}
				x[1].onreadystatechange = emptyFunction;
				x[1].abort();
				x[0] = kXhrDutyIdle;
				x[2] = null;
				onTimeout();
			},
			kTimeout);
		x[2] = timeout;
	}
	
	function xhrFinished(xhrIndex) {
		var x = xhrs[xhrIndex];
		clearTimeout(x[2]);
		x[2] = null;
		
		if (x[0] == kXhrDutyPost) {
			isPostInProgress = false		
		}
		x[0] = kXhrDutyIdle;
		
		// Avoid potential memory leak problem
		x[1].onreadystatechange = emptyFunction;
	}
	
	function getAvailableXhrIndex() {
		for (var i = 0; i < xhrs.length; i++) {
			if (xhrs[i][0] == kXhrDutyIdle) {
				return i;
			}
		}
		return -1;
	}
	
	function isAnyXhrFetchingThread() {
		for (var i = 0; i < xhrs.length; i++) {
			var duty = xhrs[i][0];
			if (duty == kXhrDutyPost || 
					duty == kXhrDutyThreadAndMessage)
			{
				return true;
			}		
		}
		return false;
	}
	
	function getNextIdToFetch() {
		var idSum = 0;
		var downloadQueueIterator = messages.getDownloadQueueIterator();
		var queueLength = downloadQueueIterator.getLength();
		for (var i = 0; i < queueLength; i += 1) {
			var id = downloadQueueIterator.get(i);
			var isCurrentlyFetching = isInArray(id, fetchIds);
			if (!isCurrentlyFetching) {
				return id;
			}
		}
		return messages.getNextUnpostedId();
	}
	
	function areAllXhrsIdle() {
		var allIdle = true;
		for (var i = 0; i < xhrs.length; i += 1) {
			allIdle &= xhrs[i][0] == kXhrDutyIdle;
		}
		return allIdle;
	}
	
	function onIdleTimeout() {
		idleTimeout = null;
		startNewJobs();	
	}
	
	startNewJobs = function(fetchThreadImmediately) {
		if (idleTimeout != null) {
			clearTimeout(idleTimeout);
			idleTimeout = null;
		}
		while (true) {
			var xhrIndex = getAvailableXhrIndex();
			if (xhrIndex == -1) {
				break;			
			}
			if (postQueue.length != 0 && !isPostInProgress) {
				post(xhrIndex);
			}
			else {
				var id = getNextIdToFetch();
				var now = (new Date()).getTime();
				var elapsedTime = now - lastThreadFetch;
				var fetchThread = !isAnyXhrFetchingThread() &&
					!isPostInProgress &&
					(fetchThreadImmediately || 
						elapsedTime >= kCheckNewMessagesInterval);
				var messageExists = id < messages.getNextUnpostedId();
                if (!messageExists && areAllXhrsIdle()) {
                    syncManager.onGotAllMessagesInThread();
                }
				if (messageExists || fetchThread) {
					fetchMessage(xhrIndex, id, messageExists, fetchThread);
				}
				else if (areAllXhrsIdle()) {
					var sleepTime = kCheckNewMessagesInterval - elapsedTime;
					idleTimeout = setTimeout(onIdleTimeout, sleepTime);
					break;
				}
				else {
					break;
				}
			}
		}
	}
	
	function dealWithDownloadedPage(message, newMessages, written) {
		var threadInfo = ThreadInfo(threadId);
        //threadInfo.delayUpload(15);
		if (written) {
            addToBrowserHistory(threadId, message.messageId);
			threadInfo.markAsWritten(message.messageId);
            console.log("Added written message " + message.messageId + " to browser history");
		}

		if (isPostInProgress) {
			newMessages = null;
		}
		
		if (newMessages) {
			var newIds = messages.updateThreadStructure(newMessages);
			insertNewMessageStubsInDocument(threadId, messages, newIds);
			lastThreadFetch = (new Date()).getTime();
		}
		
		var ready = messages.addMessage(message);
		displayNewReadyMessages(threadId, threadInfo, messages, ready, self,
								deanonymizer, syncManager, imageDownloader);

		clearTBGErrorMsg();
	}
	
	function removeFromFetchIds(id) {
		for (var i = 0; i < fetchIds.length; i += 1) {
			if (fetchIds[i] == id) {
				fetchIds[i] = fetchIds[0];
				fetchIds.shift();
				return;
			}		
		}
	}
	
	fetchMessage = function(xhrIndex, messageId, messageExists, fetchThread) {
		var xhr = xhrs[xhrIndex][1];
		fetchIds.push(messageId);
		
		function onError(msg) {
			var td = document.getElementById(threaderMessageBodyId(messageId));
			if (td) {
				td.innerHTML = '<font color="#cc3030">&nbsp;' + msg +
					'. Retrying...</font>';
			}
			setTBGErrorMsg(msg);
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhrFinished(xhrIndex);
				
				if (fetchThread) {
					lastThreadFetch = (new Date()).getTime();
				}
				
				var status = 0;
				var responseText = 0;
				try {
					status = xhr.status;
					responseText = xhr.responseText;
				}
				catch (e) {
				}
				
				if (status == 200) {
					var message = extractMessage(responseText);
					var newMessages = null;
					if (fetchThread) {
						newMessages = extractMessagesMetaData(responseText);
					}
					if (message && (!fetchThread || newMessages)) {
						message.messageId = messageId;
						message.threadId = threadId;
						var written = false;
						dealWithDownloadedPage(message, newMessages, written);
					}
					else if (!isUnloading()) {
						var notFoundMsg = "Couldn't find requested item: " + 
							messageId;
						var notExistsError = responseText.indexOf(
							notFoundMsg) != -1;
						if (!messageExists && notExistsError) {
							lastThreadFetch = (new Date()).getTime();
							clearTBGErrorMsg();
						}
						else {
							onError("Couldn't retrieve message, " + 
								"got malformed page");
							if (isDebugging()) {
								alert("xhr.responseText: (this alert is only" +
									" shown in debug)\n\n" + responseText);
							}
						}
					}
				}
				else if (!isUnloading()) {	
					if (status == 0) {
						onError("TBG connection error");
					}
					else if (status == 403) {
						onError("TBG access denied (status code 403)");
					}
					else {
						onError("TBG server error (status code " + status + ")");
					}
				}
				removeFromFetchIds(messageId);
				startNewJobs();
			}
		}
		var url = "http://www.tbg.nu";
		var duty;
		if (fetchThread) {
			url += "/news_show/" + threadId + "/" + messageId;
			duty = kXhrDutyThreadAndMessage;
		}
		else {
			url += "/cgi-bin/news_threader.cgi?db=" + threadId + 
				"&id=" + messageId;
			duty = kXhrDutyMessage;
		}
		xhr.open("GET", url, true);
		// xhr.overrideMimeType("text/html; charset=iso-8859-1");
		if (fetchThread) {
			// Don't cache threads, the "does not exist" message will show,
			// or we might get an old list of messages in the thread.
			xhr.setRequestHeader('Cache-control', 'no-cache');
			xhr.setRequestHeader('If-Modified-Since', 
				'Thu, 1 Jan 1970 00:00:00 GMT');		
		}
		xhrStart(xhrIndex, duty, function() {
				if (fetchThread) {
					lastThreadFetch = (new Date()).getTime();
				}
				onError("TBG server timeout");
				removeFromFetchIds(messageId);
				startNewJobs(false);
			});
		xhr.send(null);
	}
	
	post = function(xhrIndex) {
		var xhr = xhrs[xhrIndex][1];
		xhrs[xhrIndex][0] = kXhrDutyPost;
		var p = postQueue.shift();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				xhrFinished(xhrIndex);
				var status = 0;
				var responseText = 0;
				try {
					status = xhr.status;
					responseText = xhr.responseText;
				}
				catch (e) {
				}
				if (status == 200) {
					var message = extractMessage(responseText);
					var newMessages = extractMessagesMetaData(responseText);
					if (message && newMessages) {
						var written = true;
						dealWithDownloadedPage(message, newMessages, written);
						p.onSuccess();
						startNewJobs(false);
					}
					else if (!isUnloading()) {
						startNewJobs(true);
						p.onError(status, responseText);
					}
				}
				else if (!isUnloading()) {
					setTBGErrorMsg("Couldn't post reply " + 
						"(server status code " + status + ")");
					startNewJobs(true);
					p.onError(status, responseText);
				}
			}
		}
		xhr.open("POST", p.url, true);
		//xhr.overrideMimeType("text/html; charset=iso-8859-1");
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhrStart(xhrIndex, kXhrDutyPost, function() {
				setTBGErrorMsg("TBG server timeout when trying to post reply");
				startNewJobs(true);
				p.onError(-1, null);
			});
		xhr.send(p.data);
	}	
		
	
	// Startup
	
	// Can't have more than one fetch object currently. Need a way of 
	// dealing with out-of-order responses
	for (var i = 0; i < 5; i += 1) {
		xhrs.push([kXhrDutyIdle, new XMLHttpRequest(), null]);
	}
	startNewJobs();
	
	
	// Public methods
	self = {
		post : function(url, data, onSuccess, onError) {
			postQueue.push({url: url, 
				data: data, 
				onSuccess: onSuccess, 
				onError: onError});
			startNewJobs();
		}		
	};
	return self;
}


function removeReplyControls(messageId) {
	var div = document.getElementById(pimpedReplySpanId(messageId));
	var div2 = document.getElementById(pimpedReplyDiv2Id(messageId));
	div.removeChild(div2);
}



function getMessageIds(messages) {
	var ids = [];
	for (var i in messages) {
		ids.push(messages[i].messageId);
	}
	return ids;
}

function alertWithExtraTextIfDebugging(msg, debugMsg) {
    var m = msg;
    if (isDebugging()) {
        m += "\n\nDEBUG MESSAGE:";
        if (debugMsg) {
            m += "\n\n" + debugMsg.substr(0,1000);
        }
        else {
            m += " <<<EMPTY>>>";
        }
    }
    alert(m);
}

function onSendReply(threadId, messageId,
		subject, communicator) 
{
	setSendMessageControlsEnabled(messageId, false, true);
	document.getElementById(pimpedReplyCancelButtonId(messageId)).disabled =
        true;
	
	var messageText = document.getElementById(messageAreaId(messageId)).value;
	
	var url = "http://www.tbg.nu/cgi-bin/news_send.cgi";
	var params = "subject=" + encodeURIComponentIsoLatin(subject) + "&" +
		"message=" + encodeURIComponentIsoLatin(messageText) + "&" +
		"reply=" + encodeURIComponent(1) + "&" +
		"db=" + encodeURIComponent(threadId) + "&" +
		"id=" + encodeURIComponent(messageId);
		
	communicator.post(url, 
		params, 
		function() {
			removeReplyControls(messageId);
		},
		function(status, responseText) {
			setSendMessageControlsEnabled(messageId, true, true);
			document.getElementById(
                pimpedReplyCancelButtonId(messageId)).disabled = false;
			if (status == 200) {
				var ban = "Your IP address belongs to a range which is " + 
					"banned from posting messages on this forum.";
                var foreign = "Your IP address is not permitted to anonymously post " +
                    "messages on this forum. Please login.";
				if (responseText.indexOf(ban) != -1) {
					alert("Server response: " + ban);
				}
                else if (responseText.indexOf(foreign) != -1) {
                    alert("Server response: " + foreign);
                }
				else {
                    alertWithExtraTextIfDebugging("Got malformed server reply.",
                        "responseText:\n\n" + responseText);
				}
			}
			else if (status == -1) {
				alertIfNotUnloading("Reply post timeout.");
			}
			else if (status == 0) {
				alertIfNotUnloading("Reply post failed, could not connect to server.");
			}
			else if (status == 403) {
				alertIfNotUnloading("Access denied, server status code 403.");
			}
			else {
				var msg = "Reply post failed, status code " + status + ".";
				if (isDebugging()) {
					msg += "\n\nresponseText (only showed in debug mode):\n" +
							responseText;
				}
				alertIfNotUnloading(msg);
			}
		});
}

const kOriginalMessageTag = "data-ptbgoriginalmessage";
const kSubjectTag = "data-ptbgsubject";

function initTextAreaMessage(textarea, message) {
    textarea.value = message;
    textarea.focus();
	textarea.setSelectionRange(0,0);
}

// Returns true if anything but white space was added to originalText
function anythingAddedToText(originalText, newText) {
    var originalTextNoWhiteSpace = originalText.replace(/\s/g, "");
    var newTextNoWhiteSpace = newText.replace(/\s/g, "");

    var anythingAdded =
        originalTextNoWhiteSpace.indexOf(newTextNoWhiteSpace) === -1;
 
    return anythingAdded;
}

function onPimpedReplyClearMessage(messageId) {
	var div = document.getElementById(pimpedReplySpanId(messageId));
    var div2 = document.getElementById(pimpedReplyDiv2Id(messageId));
    if (!div2) {
        console.assert(false);
        return;
    }
    
    var textarea = document.getElementById(messageAreaId(messageId));
    
    var originalMessage = div.getAttribute(kOriginalMessageTag);
    
    var anythingAdded = anythingAddedToText(originalMessage,
            textarea.value);
    if (!anythingAdded || confirm("Do you really want to clear the message?")) {
        initTextAreaMessage(textarea, originalMessage);
    }
}

function pimpedReply(threadId, messages, messageId, communicator) {
	var div2 = document.getElementById(pimpedReplyDiv2Id(messageId));
	if (!div2) {
		var span = document.getElementById(pimpedReplySpanId(messageId));
		div2 = document.createElement('div');
		div2.id = pimpedReplyDiv2Id(messageId);
		div2.innerHTML = 
			'<div id="' + pimpedReplyDiv2Id(messageId) + '">' +
			'<table border="0"><tbody>' + 
			'<tr><td colspan="2">' +
			'  <textarea id="' + messageAreaId(messageId) + '" ' +
			'	  rows="19" cols="50" wrap="soft" disabled="true" ' +
			'     style="width:473px; font-family: verdana, arial, helvetica;' + 
			'         font-size: 1.0em;">' +
			'Loading...' + 
			'</textarea>' +
			'</td></tr>' +
			'<tr><td colspan="2" align="center">' +
			'  <div style="float: left">' +
			'    <input id="' + sendButtonId(messageId) + '" type="button"  ' +
			'      value="Send Message" disabled="true"/>' +
			'  </div>' +
			'  <div style="display: inline-block">' +
			getUploadControlsHtml(messageId, false) +
			'  </div>' +
			'  <div style="float: right">' +
            '    <input id="' + clearButtonId(messageId) + '" ' +
            '       type="button" value="Clear" disabled="true" />' +
			'    <input id="' + pimpedReplyCancelButtonId(messageId) + '" ' +
			'       type="button" value="Cancel" />' +
			'  </div>' +
			'</td></tr>' +
			'</tbody></table>' +
			'</div>';
		span.appendChild(div2);
		var messageCancelDispatcher = EventDispatcher();
		bindUploadControlsEventHandlers(messageId, messageCancelDispatcher);
        
        var clearButton = document.getElementById(clearButtonId(messageId));
        clearButton.addEventListener("click",
            function(event) {
                    onPimpedReplyClearMessage(messageId);
                    return false;
                },
            false);
        
        var xhr = null;
        var xhrTimeout = null;
	
        var textarea = document.getElementById(messageAreaId(messageId));
        var originalMessage;
        var originalSubject;

        var unsentReply = getUnsentReply(threadId, messageId);


        document.getElementById(sendButtonId(messageId)).addEventListener(
            'click', 
            function() {
                onSendReply(threadId, messageId, originalSubject, communicator);
            },
            false);
        document.getElementById(
                pimpedReplyCancelButtonId(messageId)).addEventListener(
            'click', 
            function() {
                // Might be pressed during trasfer or after transfer complete
                if (xhr) {
                    xhr.onreadystatechange = emptyFunction;
                    xhr.abort();
                    xhr = null;
                    clearTimeout(xhrTimeout);
                    xhrTimeout = null;
                }
                else if (anythingAddedToText(
                        span.getAttribute(kOriginalMessageTag), textarea.value))
                {
                    addOrUpdateUnsentReply(threadId, messageId,
                        originalMessage,
                        textarea.value,
                        originalSubject,
                        originalSubject);
                }
                messageCancelDispatcher.triggerAndReset();
                removeReplyControls(messageId);
            }, 
            false);
        textarea.addEventListener(
            'blur',
            function() {
                if (anythingAddedToText(
                        span.getAttribute(kOriginalMessageTag), textarea.value))
                {
                    addOrUpdateUnsentReply(threadId, messageId,
                        originalMessage,
                        textarea.value,
                        originalSubject,
                        originalSubject);
                }
            },
            false);
        
        
        if (unsentReply) {
            originalMessage = unsentReply[0];
            originalSubject = unsentReply[2];
        
            span.setAttribute(kOriginalMessageTag, originalMessage);
            span.setAttribute(kSubjectTag, originalSubject);

            setSendMessageControlsEnabled(messageId, true, true);
            initTextAreaMessage(textarea, unsentReply[1]);
        }
        else {
            xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    clearTimeout(xhrTimeout);
                    xhrTimeout = null;
                    
                    var status = 0;
                    var responseText = 0;
                    try {
                        status = xhr.status;
                        responseText = xhr.responseText;
                    }
                    catch (e) {
                    }				
                    
                    if (status == 200) {
                        var subjectRe = /<input[^>]*name=subject[^>]*value="([^"]*)"[^>]*>/mi;
                        var subjectMatch = subjectRe.exec(responseText);
                        
                        var textAreaRe = /<textarea[^>]*>\s([^<]*)<\/textarea>/mi;
                        var textAreaMatch = textAreaRe.exec(responseText);
                        if (subjectMatch && textAreaMatch) {
                            setSendMessageControlsEnabled(messageId, true, true);
                            
                            originalMessage = unescapeHtml(textAreaMatch[1]);
                            originalSubject = unescapeHtml(subjectMatch[1]);
                            
                            span.setAttribute(kOriginalMessageTag,
                                originalMessage);
                            span.setAttribute(kSubjectTag,
                                originalSubject);
                            
                            initTextAreaMessage(textarea, originalMessage);
                        }
                        else if (!isUnloading()) {
                            // Might be "banned" message, if posting from abroad.
                            removeReplyControls(messageId);
                            
                            var ban = "Your IP address belongs to a range which " +
                                "is banned from posting messages on this forum.";
                            var foreign = "Your IP address is not permitted to anonymously " +
                                "post messages on this forum. Please login.";
                            if (responseText.indexOf(ban) != -1) {
                                alert("Server response: " + ban);
                            }
                            else if (responseText.indexOf(foreign) != -1) {
                                alert("Server response: " + foreign);
                            }
                            else {
                                alertWithExtraTextIfDebugging(
                                    "Malformed message from server",
                                    "responseText:\n\n" + responseText);
                            }
                        }
                    }
                    else if (!isUnloading()) {
                        if (status == 403) {
                            // Might be banned...
                            removeReplyControls(messageId);
                            alert("Access denied, server returned status " + 
                                "code 403.");
                        }
                        else if (status == 0) {
                            removeReplyControls(messageId);
                            alert("Could not connect to server.");
                        }
                        else {
                            removeReplyControls(messageId);
                            alert("Error, server returned status code " + 
                                status + ".");
                        }
                    }
                    
                    // Avoid potential memory leak problems
                    xhr.onreadystatechange = emptyFunction;
                    xhr = null;
                }
            }
            
            var url = "/cgi-bin/news_send.cgi?db=" + threadId + "&id=" + messageId;
            xhr.open("GET", url, true);
            //xhr.overrideMimeType("text/html; charset=iso-8859-1");
            // Turn of cache to avoid cached "you are banned" after changing IPs.
            xhr.setRequestHeader('Cache-control', 'no-cache');
            xhr.setRequestHeader('If-Modified-Since', 
                'Thu, 1 Jan 1970 00:00:00 GMT');			
            // Allow caching.
            xhrTimeout = setTimeout(function() {
                    xhr.onreadystatechange = emptyFunction;
                    xhr.abort();
                    xhr = null;
                    alertIfNotUnloading("Timeout waiting for server.");
                    removeReplyControls(messageId);
                },
                20000);
            xhr.send(null);
        }
	}
}


function getFirstKeyFromAssociativeArray(associativeArray) {
    for (var key in associativeArray) {
        return key;
    }
    return null;
}


// functions is a list of function names (strings).
// This function checks what functions those functions are dependant on by recursively
// evaluating checking in the global associative array "dependencies" for each function.
function getDependencies(functions) {
    var exploredDependencies = {};
    var unexploredDependencies = {};

    for (var i = 0; i < functions.length; i++) {
        unexploredDependencies[functions[i]] = 1;
    }
    
    var functionName;
    while ((functionName = getFirstKeyFromAssociativeArray(unexploredDependencies))) {
        delete unexploredDependencies[functionName];
        exploredDependencies[functionName] = 1;
        
        var newDependencies = dependencies[functionName];
        for (var i = 0; i < newDependencies.length; i++) {
            var f = newDependencies[i];
            if (!(f in exploredDependencies)) {
                unexploredDependencies[f] = 1;
            }
        }
    }
    
    var allDependencies = []
    for (functionName in exploredDependencies) {
        allDependencies.push(functionName);
    }
    return allDependencies;
}


function injectCode(functions, runFunc) {
    var functionNames = getDependencies(functions);
    var functionsEvaled = [];
    for (var i = 0; i < functionNames.length; i++) {
        functionsEvaled.push(eval(functionNames[i]));
    }
	var script = document.createElement('script');
	var code = functionsEvaled.concat([isDebugging, setupConsole]).join(';\n') + ';\n';
	code += "setupConsole();\n";
	if (typeof runFunc == 'string') {
		code += runFunc;
	}
	else {
		code += '(' + runFunc + ')();';
	}
	
	script.appendChild(document.createTextNode(code));
	(document.body || document.head || document.documentElement).appendChild(script);
}

function changeToThreaderWindow() {
	
	setupThreaderKeyAccelerators();
    
    var isThreaderMode = true;
	copyReadWriteStatusFromPopupWindow(isThreaderMode);
    
    var threadId = getThreadIdFromLocation();
    var syncManager = PTBGSyncManagerForThreadWindow(threadId, isThreaderMode);
    
	threader(syncManager);
	
	var topicSpan = document.evaluate(
		"//form//div[1]//span",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	
	var hideUnhideButton = document.createElement('input');
	hideUnhideButton.id = kHideButtonId;
	hideUnhideButton.type = 'button';
	hideUnhideButton.setAttribute('style', 
		'font-family: verdana, arial, helvetica; font-size: 0.7em; ' + 
		'margin-bottom: 10px;');
	hideUnhideButton.addEventListener('click',
		function(event) {
			onHideUnhideClicked(event, syncManager);
		},
		false);
	topicSpan.parentNode.insertBefore(hideUnhideButton, topicSpan);
	setupHideUnhideButtonName(threadId);
	
	insertStarInThreadWindow(threadId, syncManager, hideUnhideButton);
}

function getThreadIdFromLocation(doc) {
	doc = doc || document;
	var split = doc.location.href.split('/');
	var threadId = parseInt(split[4]);
	return threadId;
}

function getMessageIdFromLocation(doc) {
	doc = doc || document;
	var split = location.href.split('/');
	var messageId = parseInt(split[5]);
	return messageId;
}



function copyReadWriteStatusFromPopupWindow(isThreaderMode) {
    var startTime = (new Date()).getTime();

	var threadId = getThreadIdFromLocation();
	var popupMessageId = getMessageIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
			
    var visitedLinkColor = kVisitedLinkColor;
    var readIds = [];
    
    // Detect messages colored with the visited color. Only do this is Opera as
    // the other browsers always give the computed style of unvisited links anyway.
    if (isOpera()) {
        var rows = document.evaluate(
            "//form/table[2]/tbody/tr/td[1]/a",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
        
        for (var i = 0; i < rows.snapshotLength; i++) {
            var a = rows.snapshotItem(i);
            var messageId = parseInt(a.href.split('/')[5]);
            // Skip if it's the popup window message id. We don't want to
            // destroy the "unread" status of this msg when opening threader.
            if (messageId != popupMessageId && isThreaderMode) {
                var computedStyle = window.getComputedStyle(a, null);
                var color = computedStyle.getPropertyValue("color");
                console.log("messageId = " + messageId +
                            ", color = " + color +
                            ", visited = " + (color == visitedLinkColor));
                if (color == visitedLinkColor) {
                    readIds.push(messageId);
                }
            }
        }
    }
    
    // Detect messages marked as read by the server for registered users.
    var readRows = document.evaluate(
        "//form/table[2]/tbody/tr/td[1]/a[font[@color='7777ff']]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var readRowsLength = readRows.snapshotLength;
    for (var i = 0; i < readRowsLength; i++) {
        var a = readRows.snapshotItem(i);
        var messageId = getMessageIdFromURL(a.href);
        // The popup message Id is always marked as read. Skip it so we don't
        // ruin the unread status for threader.
        if (!(isThreaderMode && messageId === popupMessageId)) {
            console.log("messageId " + messageId + " visited");
            readIds.push(messageId);
        }
    }
    threadInfo.markAllAsRead(readIds);
    
    var username = GlobalSettings().getUsername();
    if (username) {
        var writtenIds = [];
        var nbsp = String.fromCharCode(160);
        var writtenRows = document.evaluate(
            "//form/table[2]/tbody/tr/td[position()=2 and descendant::text()='" +
                nbsp + username + "']/preceding-sibling::node()/a",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
        var writtenRowsLength = writtenRows.snapshotLength;
        for (var i = 0; i < writtenRowsLength; i++) {
            var a = writtenRows.snapshotItem(i);
            var messageId = getMessageIdFromURL(a.href);
            writtenIds.push(messageId);
        }
        console.log("Found " + writtenRowsLength + " registered-user written messages: " + writtenIds);
        threadInfo.markAllAsWritten(writtenIds);
    }
    
    var endTime = (new Date()).getTime();
    console.log("copyReadWriteStatusFromPopupWindow() completed in " + (endTime-startTime) + " ms");
}


const kOrangeBallImgData = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAYAAADJViUEAAAAcklEQVR42mNg' +
		'GAVw8L2b9f+TPLb/N+LY/5Os8UM9238QDdJ8xpdIA0Aavk8B4jkQm0F4iw4H' +
		'GBPUDNMAwyBbQXiFDBGaQc4FORWm8YAtRCNRfp/Lwwn3J8y5ID7IG0T5G2QT' +
		'zEYQTbRGZBfAAm004SIAAE9xYTH8b8gcAAAAAElFTkSuQmCC';

function colorLinksFromReadWriteStatus() {
	var threadId = getThreadIdFromLocation();
	var popupMessageId = getMessageIdFromLocation();
	var threadInfo = ThreadInfo(threadId);
	
	var rows = document.evaluate(
		"//form/table[2]/tbody/tr/td[1]/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
    var length = rows.snapshotLength;
	if (length > 0) {
		// Optimize redraws by hiding while changing stuff.
		var tbody = rows.snapshotItem(0).parentNode.parentNode.parentNode;
		var oldDisplay = tbody.style.display;
		tbody.style.display = 'none';
		
		var visistedLinkColor = kVisitedLinkColor;
		for (var i = 0; i < length; i += 1) {
			var a = rows.snapshotItem(i);
			var messageId = parseInt(a.href.split('/')[5]);
			if (threadInfo.hasRead(messageId)) {
				a.style.color = visistedLinkColor;			
			}
			
			if (threadInfo.hasWritten(messageId)) {
				var td = a.parentNode;
				for (var j = td.childNodes.length-1; j >= 0; j -= 1) {
					var node = td.childNodes[j];
					if (node.tagName == 'IMG') {
						node.src = kOrangeBallImgData;				
						break;
					}
				}
			}
		}
		
		tbody.style.display = oldDisplay;
	}
}


function markPopupMessageAsRead() {
	var threadId = getThreadIdFromLocation();
	var messageId = getMessageIdFromLocation();
    var ti = ThreadInfo(threadId);
	ti.markAsRead(messageId);
}

function onThreaderButtonClicked() {
	var threadId = getThreadIdFromLocation();
	location.href = getThreaderHref(threadId);
}

function insertThreaderButton() {
	var header = document.evaluate(
		"//tr[1]/td[2]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	if (header == null) {
		// Can happen if the pages doesn't load correctly.
		return;
	}
	while (header.childNodes.length != 0) {
		header.removeChild(header.childNodes[0]);
	}

	var insertBeforeButton = document.evaluate(
		"//tr/td[3]/input[1]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
	var parent = insertBeforeButton.parentNode;
	var textNode = document.createTextNode(' ');		

	var button = document.createElement('input');
	button.type = 'button';
	button.value = 'Threader';
	
	button.addEventListener('click',
		onThreaderButtonClicked,
		false);
	
	parent.insertBefore(button, insertBeforeButton);
	parent.insertBefore(textNode, insertBeforeButton);
}

function setSendMessageControlsEnabled(messageId, enabled, includeTextAreas) {
	var ids = [uploadImageButtonId(messageId),
			   uploadImageFileInputId(messageId),
			   sendButtonId(messageId)];
	if (messageId === kPopupMessageId) {
		console.assert(isOnNewsSendPage());
				
		if (includeTextAreas) {
			ids.push("message");
			var subject = document.getElementsByName('subject')[0];
			subject.disabled = !enabled;
		}
	}
	else {
		console.assert(messageId >= 1);
		console.assert(!isOnNewsSendPage());
        
        ids.push(clearButtonId(messageId));

		if (includeTextAreas) {
			ids.push(messageAreaId(messageId));
		}
	}
	
	for (var i = 0; i < ids.length; i++) {
		var elem = document.getElementById(ids[i]);
		if (elem) {
			elem.disabled = !enabled;
		}
	}
}

// Stolen from www.tbg.nu
function chknews() {
	if (document.forms[0].subject.value.length<2) {
		alert("Subject is too small.");
		document.forms[0].subject.focus();
		return false;
	}
	else if (document.forms[0].message.value.length<2) {
		alert("Message is too small.");
		document.forms[0].message.focus();
		return false;
	}
	else if (document.forms[0].message.value.length>10240) {
		alert("Message is too large.");
		document.forms[0].message.focus();
		return false;
	}
	
	return true;
}



function onPopupSendMessageClicked(event) {
	
	if (chknews()) {
        console.log("onPopupSendMessageClicked()");
		var threadId;
		var messageId;
		var re = /\/cgi-bin\/news_send.cgi\?db=(\d+)&id=(\d+)/;
		var match = re.exec(document.location);
		if (match) {
			threadId = parseInt(match[1]);
			messageId = parseInt(match[2]);
		}
		
		setSendMessageControlsEnabled(kPopupMessageId, false, true);
		
		var subjectText = document.getElementsByName('subject')[0].value;
		var textareaText = document.getElementById('message').value
		
		var params = "subject=" + encodeURIComponentIsoLatin(subjectText) +
			"&message=" + encodeURIComponentIsoLatin(textareaText);
		if (threadId && messageId) {
			params += "&db=" + threadId + "&id=" + messageId + "&reply=1";
		}
		else {
			params += "&new=1";
		}
		
		var url = "/cgi-bin/news_send.cgi";
        var timeoutMillisecs = 30000;
        asyncXmlHttpRequest(
            url,
            "POST",
            params,
            function(responseText) {
                var message = extractMessage(responseText);
				if (message) {
                    var threadInfo = ThreadInfo(message.threadId);
                    threadInfo.markAsWritten(message.messageId);
                    if (message.messageId == 1) {
                        threadInfo.star();
                    }
                               
					window.removeEventListener("beforeunload", savePopupReply);
					location.href = "/news_show/" + message.threadId +
                                "/" + message.messageId;
                }
                else if (!isUnloading()) {
					setSendMessageControlsEnabled(kPopupMessageId, true, true);
                                
					var ban = "Your IP address belongs to a range which " +
                        "is banned from posting messages on this forum.";
                    if (responseText.indexOf(ban) != -1) {
                        alert("Server response: " + ban);
                    }
                    else {
                        alertWithExtraTextIfDebugging("Got malformed reply from server. " +
								"Can't tell whether the message was posted " +
								"or not...",
                            "responseText:\n\n" + responseText);
                    }
                }
            },
            function(statusCode, text) {
				setSendMessageControlsEnabled(kPopupMessageId, true, true);
				if (statusCode == 403) {
                    alertIfNotUnloading("Access denied, " +
						"server status code 403");
                }
                else if (statusCode == 0) {
                    alertIfNotUnloading("Communication error. Can't tell " +
						"whether the message was posted or not...");
                }
                else {
                    alertIfNotUnloading("Post failed, server status code: " +
						statusCode);
                }
            },
            function() {
				setSendMessageControlsEnabled(kPopupMessageId, true, true);
                alertIfNotUnloading("Post timeout. Can't tell whether the " +
						"message was posted or not...");
            },
            timeoutMillisecs);		
	}
	event.preventDefault();
	return false;
}



// Useful for testing.
function stringToArrayBuffer(s) {
	var a = new ArrayBuffer(s.length);
	var u8 = new Uint8Array(a);
	for (var i = 0; i < s.length; i++) {
		u8[i] = s.charCodeAt(i) & 0xFF;
	}
	return a;
}

function arrayBufferToBase64(arrayBuffer) {
	const kChars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	var u8 = new Uint8Array(arrayBuffer);
	var result = [];
	
	var len = u8.length;
	for (var i = 0; i < len; i += 3) {
		var a = u8[i];
		var b = i+1 < len ? u8[i+1] : 0;
		var c = i+2 < len ? u8[i+2] : 0;
		
		result.push(kChars[a >> 2]);
		result.push(kChars[((a & 0x3) << 4) + (b >> 4)]);
		result.push(kChars[((b & 0xF) << 2) + (c >> 6)]);
		result.push(kChars[c & 0x3F]);
	}
	if (len % 3 == 1) {
		result[result.length-2] = "=";
		result[result.length-1] = "=";
	}
	else if (len % 3 == 2) {
		result[result.length-1] = "=";
	}
	
	return result.join("");
}



const kPrepareProgress = 2;



function uploadImageToUrl(ui8array, messageId, imageIndex, url,
		imageCancelDispatcher, linkAutoInserter)
{
	console.log("Image upload (" + ui8array.length + " bytes) to " + url);
	
	var xhr = new XMLHttpRequest();
	
	function abortXhr() {
		if (xhr !== null) {
			xhr.onreadystatechange = emptyFunction;
			xhr.abort();
			xhr = null;
		}
	}
	imageCancelDispatcher.add(abortXhr);
	
	xhr.upload.addEventListener("progress",
		function(event) {
			if (event.lengthComputable) {
				var fraction = event.loaded / event.total;
				console.log("Uploaded " + Math.floor(fraction*100) + " %");
				var progressId = imageUploadProgressId(messageId, imageIndex);
				var progress = document.getElementById(progressId);
				// 1 set by prepare upload, we start at 2 and continue until
				// 99. Then hopefully this meter is replaced by the link.
				progress.value = kPrepareProgress +
					Math.floor(fraction*(99-kPrepareProgress));
			}
		});	

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			imageCancelDispatcher.remove(abortXhr);
			xhr.onreadystatechange = emptyFunction;
			var responseText = xhr.responseText;
			xhr = null;
			var result = handleImageServerResponse(responseText,
												   imageCancelDispatcher);
			if (result && (result[0] == "Ok" ||
						   result[0] === "AlreadyExists"))
			{
				imageCancelDispatcher.clear();
				onImageServerReady(messageId, imageIndex, result[1],
								   linkAutoInserter);
			}
			xhr = null;
		}
	}
	
	xhr.open("POST", url);
	xhr.send(ui8array);
}



function handleImageServerResponse(responseText, imageCancelDispatcher) {
	if (responseText === "") {
		imageCancelDispatcher.triggerAndReset();
		alertIfNotUnloading("Image server communication error.");
		return false;
	}
	
	var result;
	try {
		result = JSON.parse(responseText);
	}
	catch (e) {
		console.log("Invalid json response: " + responseText);
		imageCancelDispatcher.triggerAndReset();
		alertIfNotUnloading("Invalid response from image server.");
		return false;
	}
	if (typeof(result.length) === "undefined" || result.length == 0) {
		console.log("Unexpected json contents: " + responseText);
		imageCancelDispatcher.triggerAndReset();
		alertIfNotUnloading("Invalid response from image server.");
		return false;
	}
	else if (result[0] === "Ok" && result.length >= 2) {
		var url = result[1];
		console.log("Ok, url: " + url);
		return result;
	}
	else if (result[0] === "AlreadyExists" && result.length >= 2) {
		var url = result[1];
		console.log("AlreadyExists at " + url);
		return result
	}
	else {
		console.log("PrepareUpload error: " + responseText);
		imageCancelDispatcher.triggerAndReset();
		if (result.length >= 2) {
			alertIfNotUnloading("Image upload failed:\n\n" + result[1]);
		}
		else {
			alertIfNotUnloading("Image upload failed, unknown reason.");
		}
		return false;
	}	
}


function removeAllChildren(node) {
	while (node.lastChild) {
		node.removeChild(node.lastChild);
	}
}


function insertIntoTextarea(textarea, text) {
	if (isChrome()) {
		// This makes it possible to undo and works just like it was inserted
		// using paste.
		textarea.focus();
		document.execCommand("insertText", false, text + " ");
	}
	else {
		// This is more crappy but works in FF and Opera.

		var scrollTop = textarea.scrollTop;
		var before = textarea.value.substring(0, textarea.selectionStart);
		var after = textarea.value.substring(textarea.selectionStart);
		if (before.length > 0 && !/\s/.test(before[before.length-1])) {
			before += " ";
		}
		text += " ";
		textarea.value = before + text + after;
		textarea.focus();
		textarea.selectionStart = before.length + text.length;
		textarea.selectionEnd = textarea.selectionStart;
		textarea.scrollTop = scrollTop;
	}
}


function onImageServerReady(messageId, imageIndex, url, linkAutoInserter) {
	linkAutoInserter(url);
	
	var imageA = document.getElementById(
						imageThumbnailAId(messageId, imageIndex));
	imageA.style.cursor = "auto";
	imageA.href = url;
	
	var statusSpan = document.getElementById(
						imageStatusSpanId(messageId, imageIndex));
	var newSpan = statusSpan.cloneNode();
	newSpan.innerHTML = (isDebugging() ? "" : "<br>") + "&nbsp;&nbsp;";
	
	var imageLink = document.createElement("a");
	imageLink.style.color = "#7777ff";
	imageLink.href = url;
	imageLink.target = "_blank";
	imageLink.appendChild(document.createTextNode(url));
	newSpan.appendChild(imageLink);
	newSpan.innerHTML += "<br>&nbsp;&nbsp;";
	
	var insertLink = document.createElement("a");
	insertLink.style.color = "#7777ff";
	insertLink.style.cursor = "pointer";
	insertLink.addEventListener("click",
		function(event) {
			var textarea = document.getElementById(messageAreaId(messageId));
			insertIntoTextarea(textarea, url);
			event.preventDefault();
			return false;
		},
		false);
	insertLink.textContent = "Insert Link";
	newSpan.appendChild(insertLink);
	
	if (isDebugging()) {
		var whiteSpace = document.createElement("span");
		whiteSpace.innerHTML = "<br>&nbsp;&nbsp;DEBUG: ";
		newSpan.appendChild(whiteSpace);
		
		var match = /(.+)\/get\/(.+)_(\d+)x(\d+)$/.exec(url);
		
		var thumbnailLink1 = document.createElement("a");
		thumbnailLink1.style.color = "#7777ff";
		thumbnailLink1.href = match[1] + "/thumbnail/" + match[2] + "_" +
			match[3] + "x" + match[4];
		thumbnailLink1.target = "_blank";
		thumbnailLink1.appendChild(document.createTextNode("Thumbnail1"));
		newSpan.appendChild(thumbnailLink1);
		
		newSpan.appendChild(document.createTextNode(" "));
		
		var thumbnailLink2 = document.createElement("a");
		thumbnailLink2.style.color = "#7777ff";
		thumbnailLink2.href = match[1] + "/thumbnail/" + match[2] + "_" +
			Math.ceil(parseInt(match[3])/2) + "x" + Math.ceil(parseInt(match[4])/2);
		thumbnailLink2.target = "_blank";
		thumbnailLink2.appendChild(document.createTextNode("Thumbnail2"));
		newSpan.appendChild(thumbnailLink2);
		
		var whiteSpace2 = document.createElement("span");
		whiteSpace2.innerHTML = "<br>&nbsp;&nbsp;";
		newSpan.appendChild(whiteSpace2);
	}
	
	statusSpan.textContent = "";
	
	var td = document.getElementById(uploadImageTdId(messageId, imageIndex));
	td.style.lineHeight = "25px";
	
	statusSpan.parentNode.replaceChild(newSpan, statusSpan);
}


function prepareUploadImage(data, messageId, imageIndex,
		imageCancelDispatcher, linkAutoInserter)
{
	// First get the URL we use to upload the image.
	
	var ui8array = new Uint8Array(data);
	var hash = toHexString(SHA256(ui8array).digest());
	
	var cancelable;

	function cancelXmlHttpRequest() {
		cancelable.cancel();
	}
	imageCancelDispatcher.add(cancelXmlHttpRequest);
	
	var url = kPTBGServerProtocolAndHost + "/image/prepare_upload" +
				"?hash=" + hash +
				"&filesize=" + ui8array.length +
				"&client=ptbguserscript" + kScriptVersion;
	cancelable = asyncXmlHttpRequest(
		url,
		"GET",
		"",
		function(responseText) {
			imageCancelDispatcher.remove(cancelXmlHttpRequest);
			var result = handleImageServerResponse(responseText,
												   imageCancelDispatcher);
			if (result && result[0] === "Ok") {
				var progress = document.getElementById(
					imageUploadProgressId(messageId, imageIndex));
				progress.value = kPrepareProgress;
				var url = result[1];
				uploadImageToUrl(ui8array, messageId, imageIndex, result[1],
								 imageCancelDispatcher, linkAutoInserter);	
			}			
			else if (result && result[0] === "AlreadyExists") {
				imageCancelDispatcher.clear();
				onImageServerReady(messageId, imageIndex, result[1],
								   linkAutoInserter);
			}
		},
		function(statusCode, text) {
			handleImageServerResponse(text, imageCancelDispatcher);
		},
		function() {
			imageCancelDispatcher.remove(cancelXmlHttpRequest);
			imageCancelDispatcher.triggerAndReset();
			alertIfNotUnloading("Image server timeout");
		},
		30000);
}


function messageAreaId(messageId) {
	if (messageId === 0) {
		return "message";
	}
	else {
		console.assert(messageId > 0);
		return "messagearea_" + messageId;
	}
}

var sendButtonId = createSingleIdFunction("sendbutton_");
var uploadImageButtonId = createSingleIdFunction("uploadbutton_");
var uploadImageFileInputId = createSingleIdFunction("uploadImageFile_");
var clearButtonId = createSingleIdFunction("clearbutton_");
var pimpedReplySpanId = createSingleIdFunction("msg", "replyDiv");
var pimpedReplyDiv2Id = createSingleIdFunction("msg", "replyDiv2");
var pimpedReplyCancelButtonId = createSingleIdFunction("cancelReply");


const imageControlIdRegExp = /^[A-Za-z]+_(\d+)(?:_\d+)?$/;

function getMessageIdFromImageControlId(id) {
	return parseInt(imageControlIdRegExp.exec(id)[1])
}

function getImageIndexFromImageControlId(id) {
	return parseInt(imageControlIdRegExp.exec(id)[2])
}

function createImageIdFunction(name) {
	return function(messageId, imageId) {
		console.assert(typeof(messageId) === "number")
		console.assert(typeof(imageId) === "number")
		return name + "_" + messageId + "_" + imageId;
	}
}

var uploadImageTdId = createImageIdFunction("uploadImageTd");
var uploadImageTrId = createImageIdFunction("uploadImageTr");
var cancelImageUploadButtonId = createImageIdFunction("cancelImageUploadButton");
var imageThumbnailAId = createImageIdFunction("imageThumbnailA");
var imageThumbnailDivId = createImageIdFunction("imageThumbnailDiv");
var imageUploadProgressId = createImageIdFunction("imageUploadProgress");
var imageStatusSpanId = createImageIdFunction("imageStatusSpan");

const kPopupMessageId = 0;

function onImageLoaded(event, arrayBuffer, messageId, imageIndex,
					   imageCancelDispatcher, linkAutoInserter)
{
	var img = event.target;
	
	if (img.width > kThumbnailWidth || img.height > kThumbnailHeight) {
		var scaleX = img.width / kThumbnailWidth;
		var scaleY = img.height / kThumbnailHeight;
		var scale = Math.max(scaleX, scaleY);
		img.width = Math.round(img.width / scale);
		img.height = Math.round(img.height / scale);
	}
	
	img.style.paddingLeft = Math.floor((kThumbnailWidth - img.width) / 2);
	img.style.paddingTop = Math.floor((kThumbnailHeight - img.height) / 2);
	
	var imageDiv = document.getElementById(
						imageThumbnailDivId(messageId, imageIndex));
	removeAllChildren(imageDiv);
	imageDiv.appendChild(img);

	prepareUploadImage(arrayBuffer,
		messageId, imageIndex, imageCancelDispatcher, linkAutoInserter);	
}



function onFileLoaded(event, fileType, messageId, imageIndex,
					  imageCancelDispatcher, linkAutoInserter)
{
	// using 'var img = new Image()' causes 'NotFoundError: DOM Exception 8'
	// later when adding to a div in Chrome for some reason.
	var img = document.createElement("img");
	
	var result = event.target.result;
	function resetImgEventHandlers() {
		img.onerror = emptyFunction;
		img.onload = emptyFunction;
	}
	imageCancelDispatcher.add(resetImgEventHandlers);
	
	img.onload = function(event) {
		imageCancelDispatcher.remove(resetImgEventHandlers);	
		onImageLoaded(event, result, messageId, imageIndex,
			imageCancelDispatcher, linkAutoInserter);	
	};
	img.onerror = function(event) {
		imageCancelDispatcher.triggerAndReset();
		alertIfNotUnloading("Corrupt image file.");
	};
	img.src = "data:" + fileType + ";base64," + arrayBufferToBase64(result);
}

function removeImageUploadControls(messageId, imageIndex) {
	var tr = document.getElementById(uploadImageTrId(messageId, imageIndex));
	tr.parentNode.removeChild(tr);
}

const kThumbnailWidth = 96;
const kThumbnailHeight = 96;

var createImageUploadControls = (function(){
	var imageIndexCounter = [1000];
	
	return function(messageId, previousTr, onCancel) {
		console.assert(previousTr.nodeName === "TR");
		
		var imageIndex = imageIndexCounter[0];
		imageIndexCounter[0] += 1;
		
		var newTr = document.createElement("tr");
		newTr.id = uploadImageTrId(messageId, imageIndex);
		
		newTr.innerHTML = '<td colspan="2" ' +
			'  id="' + uploadImageTdId(messageId, imageIndex) + '"' +
			'  style="line-height: 100px; padding-top: 5px">' +
			' <a id="' + imageThumbnailAId(messageId, imageIndex) + '"' +
			'   href="javascript:void(0);" style="cursor: default" ' +
			'   target="_blank">' +
			'  <div id="' + imageThumbnailDivId(messageId, imageIndex) + '"' +
			'    style="float: left; border:solid 2px white; ' +
			'      height: ' + kThumbnailHeight + 'px; ' +
			'      width: ' + kThumbnailWidth + 'px; vertical-align: middle">' +
			'   Loading...' +
			'  </div>' +
			' </a>' +
			' <span id="' + imageStatusSpanId(messageId, imageIndex) + '">' +
			'  &nbsp;&nbsp;' +
			'  <progress style="width: 200px; vertical-align: middle" ' +
			'    value="0" max="100"' +
			'    id="' + imageUploadProgressId(messageId, imageIndex) + '">' +
			'  </progress>' +
			'  &nbsp;&nbsp;' +
			'  <input style="vertical-align: middle" type="button" value="Cancel"' +
			'   id="' + cancelImageUploadButtonId(messageId, imageIndex) + '">' +
			' </span>' +
			'</td>';
			
		previousTr.parentNode.insertBefore(newTr, previousTr.nextSibling);
		
		var cancelButton = document.getElementById(
			cancelImageUploadButtonId(messageId, imageIndex));
		cancelButton.addEventListener("click", onCancel);
		
		return imageIndex;
	}
})();


// This makes it possible to route events dynamically and easily. The function
// returned by getTrigger() is called at one place and all the listeners
// are called in the order they were added.
function EventDispatcher() {
	
	var listeners = [];
	
	var that = {};
	that.clear = function(handler) {
			listeners.splice(0, listeners.length);		
		};
	that.trigger = function() {
			while (listeners.length > 0) {
				var l = listeners.shift();
				l();
			}
		};
	that.triggerAndReset = function() {
			that.trigger();
			listeners.splice(0, listeners.length);
		};
	that.add = function(handler) {
			console.assert(typeof(handler) === "function");
			console.assert(listeners.indexOf(handler) == -1);
			listeners.push(handler);
		};
	that.remove = function(handler) {
			var index = listeners.indexOf(handler);
			console.assert(index >= 0);
			listeners.splice(index, 1);
		};
	return that;
}


function getTextareaStateString(messageId) {
	var textArea = document.getElementById(messageAreaId(messageId));
	return "" + textArea.selectionStart + "_" +
				textArea.selectionEnd + "_" +
				textArea.value;
}


function areAllFilesImages(files) {
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		if (!file.type.match(/image.*/)) {
			return false;
		}
	}
	return true;
}


function setupFileUpload(previousTr, messageId, messageCancelDispatcher,
						 linkAutoInserter, batchImageIndex, file)
{
	var reader = new FileReader();
	
	var imageCancelDispatcher = EventDispatcher();
	messageCancelDispatcher.add(imageCancelDispatcher.triggerAndReset);
	
	var imageIndex = createImageUploadControls(messageId,
		previousTr, imageCancelDispatcher.triggerAndReset);
		
	imageCancelDispatcher.add(function() {
		removeImageUploadControls(messageId, imageIndex);		
	});

	function onSuccess(event) {
		imageCancelDispatcher.remove(abortFileRead);
		return onFileLoaded(event, file.type, messageId, imageIndex,
			imageCancelDispatcher,
			function(url) {
				linkAutoInserter.uploadComplete(batchImageIndex, url);
			});
	}
	reader.addEventListener("load", onSuccess);
	function onError(event) {
			imageCancelDispatcher.remove(abortFileRead);
			imageCancelDispatcher.triggerAndReset();
			alertIfNotUnloading("File read failed.");
	}
	reader.addEventListener("error", onError);
	
	function abortFileRead() {
		reader.removeEventListener(onError);
		reader.abort();
	}
	imageCancelDispatcher.add(abortFileRead);

	reader.readAsArrayBuffer(file);
}


function TextAreaAutoLinkInserter(messageId, numImages) {
	
	var urls = [];
	for (var i = 0; i < numImages; i++) {
		urls[i] = false;
	}
	var textAreaState = getTextareaStateString(messageId)
	
	return {
		uploadComplete : function(imageIndex, url) {
			console.assert(!urls[imageIndex]);
			urls[imageIndex] = url;
			if (urls.indexOf(false) == -1) {
				var currentState = getTextareaStateString(messageId);
				var textarea = document.getElementById(messageAreaId(messageId));
				if (currentState === textAreaState) {
					for (var i = 0; i < urls.length; i++) {
						insertIntoTextarea(textarea, urls[i]);
					}
				}
			}
		}
	}
}


// Some of this taken from
// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications
function onUploadImageFileChanged(event, messageCancelDispatcher) {
	var messageId = getMessageIdFromImageControlId(event.target.id);
	
	var files = event.target.files;
	
	var kNumFilesLimit = 5;
	if (files.length > kNumFilesLimit) {
		alertIfNotUnloading("You can upload a maximum of " +
							kNumFilesLimit + " images at once.");
		return;
	}
	if (files.length === 0) {
		return;
	}
	
	if (!areAllFilesImages(files)) {
		alertIfNotUnloading("Only images can be uploaded");
		return;
	}
	
	var linkAutoInserter = TextAreaAutoLinkInserter(messageId, files.length);
	
	var previousTr = event.target.parentNode.parentNode.parentNode;
	console.assert(previousTr.nodeName === "TR");	
	
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		setupFileUpload(previousTr,
						messageId,
						messageCancelDispatcher,
						linkAutoInserter,
						i,
						file);
	}	
		
	event.target.value = "";
}


function onUploadImageButtonClicked(event) {
	var messageId = getMessageIdFromImageControlId(event.target.id)
	var domId = uploadImageFileInputId(messageId);
	var fileInputNode = document.getElementById(domId);
	fileInputNode.click();
}


function getUploadControlsHtml(messageId, enabled) {
	if (isOpera()) {
		return (
			'<input id="' + uploadImageFileInputId(messageId) + '" ' +
			' type="file" accept="image/*" multiple="false" ' +
			(enabled ? '' : 'disabled') + '>');
	}
	else {
		return (
			'<input id="' + uploadImageFileInputId(messageId) + '" ' +
			' type="file" style="display: none" accept="image/*" ' +
			' multiple="false">' +			
			'<input id="' + uploadImageButtonId(messageId) + '"' +
			' type="button" value="Upload Image"' +
			(enabled ? '' : 'disabled') + '>');
	}
}


function bindUploadControlsEventHandlers(messageId, onMessageCancelDispatcher) {
	var uploadButton = document.getElementById(uploadImageButtonId(messageId));
	if (uploadButton) {
		// Not created in opera.
		uploadButton.addEventListener("click", onUploadImageButtonClicked);
	}
	
	var uploadFile = document.getElementById(
							uploadImageFileInputId(messageId));	
	uploadFile.addEventListener("change",
		function(event) {
			return onUploadImageFileChanged(event, onMessageCancelDispatcher);
		});
}


function insertSendPopupUploadButton() {
	var sendButton = document.getElementById(sendButtonId(kPopupMessageId));
	var buttonsTr = sendButton.parentNode.parentNode;
	var threeRightButtonsTd = sendButton.parentNode.nextSibling;
	
	var newTr = document.createElement("tr");
	var newTd = document.createElement("td");
	newTd.colspan = 2;
	newTd.style.textAlign = "center";
	newTr.appendChild(newTd);
	
	sendButton.style.cssFloat = "left";
	newTd.appendChild(sendButton.cloneNode(true));
	
	uploadButtonDiv = document.createElement("div");
	uploadButtonDiv.style.display = "inline-block";
	uploadButtonDiv.innerHTML = getUploadControlsHtml(kPopupMessageId, true);
	newTd.appendChild(uploadButtonDiv);
	
	var threeRightButtonsDiv = document.createElement("div");
	threeRightButtonsDiv.style.cssFloat = "right";
	for (var child = threeRightButtonsTd.firstChild; child; child = child.nextSibling) {
		threeRightButtonsDiv.appendChild(child.cloneNode(true));
	}
	newTd.appendChild(threeRightButtonsDiv);
	
	buttonsTr.parentNode.replaceChild(newTr, buttonsTr);
	
	var messageCancelDispatcher = EventDispatcher();
	bindUploadControlsEventHandlers(kPopupMessageId, messageCancelDispatcher);
}


const kNewsSendLocationRegExp = /news_send.cgi(\?db=(\d+)&id=(\d+))?$/;



function savePopupReply() {
    var textarea = document.getElementById(messageAreaId(kPopupMessageId));
    var originalMessage = textarea.getAttribute(kOriginalMessageTag);
    var anythingAdded = anythingAddedToText(originalMessage, textarea.value);
    console.log("savePopupReply(), anythingAdded: " + anythingAdded);

    if (anythingAdded) {
        var subjectField = document.getElementsByName('subject')[0];

        var match = kNewsSendLocationRegExp.exec(location.href);
        console.assert(match);
        var threadId;
        var messageId;
        if (match[1] !== "") {
            threadId = parseInt(match[2]);
            messageId = parseInt(match[3]);
        }
        else {
            threadId = 0;
            messageId = 0;
        }
        addOrUpdateUnsentReply(threadId, messageId,
            textarea.getAttribute(kOriginalMessageTag),
            textarea.value,
            subjectField.getAttribute(kSubjectTag),
            subjectField.value);
    }
}


function modifySendPopup() {
	setupUnloadTracking();


	var oldSendButton = document.evaluate(
		"//input[contains(@value, 'Send')]",
		document,
		null,
		XPathResult.ANY_UNORDERED_NODE_TYPE,
		null).singleNodeValue;
    
	// Doesn't exist when the message "Your IP address belongs to a range
	// which is banned from posting messages on this forum." appears.
	if (oldSendButton != null) {
		oldSendButton.id = sendButtonId(0);

		insertSendPopupUploadButton();
		
		var innerHTML = '<input ' + 
			'type="button" ' + 
			'id="' + sendButtonId(0) + '" ' + 
			'value="' + oldSendButton.value + '" ' + 
			'title="' + oldSendButton.title + '" ' + 
			'accesskey="' + oldSendButton.accesskey + '" ' +
			'/>';

		var parent = oldSendButton.parentNode;
		parent.removeChild(oldSendButton);
		parent.innerHTML = innerHTML;
        
		
		var textField = document.getElementById(messageAreaId(kPopupMessageId));
        var subjectField = document.getElementsByName('subject')[0];
        
        textField.setAttribute(kOriginalMessageTag, textField.value);
        subjectField.setAttribute(kSubjectTag, subjectField.value);

        window.addEventListener("beforeunload", savePopupReply);
        window.addEventListener("blur", savePopupReply);
			
		var newSendButton = document.getElementById(sendButtonId(0));
		newSendButton.addEventListener("click", onPopupSendMessageClicked);
		console.log("Changed send message button");

        
        var match = kNewsSendLocationRegExp.exec(location.href);
        console.assert(match);
        var threadId;
        var messageId;
        if (match[1] != "") {
            threadId = parseInt(match[2]);
            messageId = parseInt(match[3]);
        }
        else {
            threadId = 0;
            messageId = 0;
        }
        
        var unsentReply = getUnsentReply(threadId, messageId);
        if (unsentReply) {
            if (unsentReply[3].length > 2) {
                subjectField.value = unsentReply[3];
            }
            initTextAreaMessage(textField, unsentReply[1]);
        }
    }
}



// Need to track unloads to prevent showing error messages, and worse, alerts
// when navigating away from the page.
function getStaticUnloadVariable() {
    if (typeof getStaticUnloadVariable.variable == 'undefined') {
        getStaticUnloadVariable.variable = [false];
    }
	return getStaticUnloadVariable.variable;
}

function isUnloading() {
	return getStaticUnloadVariable()[0];
}

function setUnloadVariable() {
	getStaticUnloadVariable()[0] = true;
}

function setupUnloadTracking() {
	window.addEventListener('beforeunload', setUnloadVariable, false);	
}


function asyncXmlHttpRequest(url, reqType, data, onLoad, onError, onTimeout, timeoutMillisecs) {
	console.assert(url);
    console.assert(reqType === "POST" || reqType === "GET");
	console.assert(onLoad);
	console.assert(onError);
	console.assert(timeoutMillisecs >= 1 && onTimeout || !timeoutMillisecs && !onTimeout);
    console.log("asyncXmlHttpRequest() - type: " + reqType + ", size: " + data.length +
        ", url: " + url + " , data: " + data.substr(0,100));
	
	var startTime = +new Date();
	
    var isTimeout = false;
	var xhr = new XMLHttpRequest();
	var timer = null;
	if (timeoutMillisecs > 0) {
		timer = setTimeout(function() {
                console.log("asyncXmlHttpRequest " + reqType + " - timeout");
                isTimeout = true;
                // Don't know if I understood anything wrong, but I think this assignment operation actually
                // triggered the previous onreadystatechange callback! Thus the need for the isTimeout variable.
				xhr.onreadystatechange = emptyFunction;
                xhr.abort();
                xhr = null;
				onTimeout();
			},
			timeoutMillisecs);
	}
	xhr.open(reqType, url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
            if (isTimeout) {
                return;
            }
			xhr.onreadystatechange = emptyFunction;
			if (timer !== null) {
				clearTimeout(timer);
                timer = null;
			}
			var elapsedTime = +new Date() - startTime;
			if (xhr.status == 200) {
				var responseText = xhr.responseText;
				xhr = null;
                console.log("asyncXmlHttpRequest " + reqType + " " +
							elapsedTime + " ms - success, data: " +
							responseText.substr(0, 100));
				onLoad(responseText);
			}
			else {
				var status = xhr.status;
				var statusText = xhr.statusText;
				xhr = null;
                console.log("asyncXmlHttpRequest " + reqType + " " +
							elapsedTime + " ms - error " + status);
				onError(status, statusText);
			}
			xhr = null;
		}
	}
	xhr.send(data);
	
	return {
		cancel : function() {
			if (timer !== null) {
				clearTimeout(timer);
				timer = null;
			}
			if (xhr !== null) {
				xhr.onreadystatechange = emptyFunction;
				xhr.abort();
				xhr = null;
			}
		}
	}
}




function renameLocalStorageKey(oldKeyName, newKeyName) {
    var value = localStorage[oldKeyName];
    console.log("moving " + oldKeyName + " to " + newKeyName + ", value: " + value);
    if (typeof(value) !== "undefined") {
        delete localStorage[oldKeyName];
        writeToLocalStorage(newKeyName, value);
    }
	return value;
}



const kWriteIndicationStyleNone = 0;
const kWriteIndicationStyleAsterisk = 1;
const kWriteIndicationStyleOld = 2;
const kWriteIndicationStyleBoth = 3;


function GlobalSettings() {
    
    const kName = "pimpedtbg";
    const kMajorVersion = 6;
    const kMinorVersion = 16;

    var isUpdating = 0;
    var needUpdating = 0;
    
    var starNotify = 0;
    var writtenNotify = 0;
    var newNotify = 0;
    var bumpNotify = 0;
	
	// This is the largest timestamp ever received from a server. In order for
	// an hide/star/unhideall action to "take', it might have to be larger
	// than this value. If the clocks of all clients are always correct, this
	// value should always be sometime in the past. In seconds since 1970.
	var largestTimestamp = 0;
    
    // ptbgId is the string this user uses for identification.
    var ptbgId = "";
    
    // ptbgEdition is increased by one every time the user changes ptbgId. This way, a ThreadInfo
    // can contain the value of what "edition" of a ptbgId it is in sync with (if any), which in
    // turn makes it possible to change ptbgId without changing all ThreadInfos to "not in sync"
    // at the same time.
    var ptbgEdition = 0;
    
    // The highest change index received from the server.
    var latestServerChangeIndex = -1;

    // The username, as seen on main page when logged in, or null if anonymous.
    var username = null;
    
    var highestKnownThreadId = 0;
	
	// How often the main page is refreshed in seconds.
	var refreshInterval = null;
	
	// One of kWriteIndicationStyle*
	var writeIndicationStyle = kWriteIndicationStyleAsterisk;
	
	// True if the last frames version was vertical, otherwise false.
	var preferVerticalFrames = false;
	
	// Show options on main page
	var showOptions = true;
	
	var showPtbgThumbnails = true;
	var showExternalThumbnails = true;
	var showYoutubeThumbnails = true;
	
	// True to display green "(11/42 unread)" instead of "(42 msg)" next
	// to the message popup in main window
	var showUnreadStatus = true;
	
	var openPopupsWithFirstUnreadMessage = true;
	
    // The maximum width of the FROM column in message tables in popup we have
    // ever seen when using the "deanonymizer" names.
    var maxAuthorWidth = 205;
    
    // 0 = low, 1 = high
    var thumbnailQuality = 1;

    // Private functions
    
    function save() {
        writeToLocalStorage(kName, JSON.stringify(
            [kMajorVersion, kMinorVersion,
            isUpdating,
            starNotify, writtenNotify, newNotify, bumpNotify,
            ptbgId, ptbgEdition, latestServerChangeIndex,
            username,
            highestKnownThreadId,
			refreshInterval,
			largestTimestamp,
			writeIndicationStyle,
			preferVerticalFrames,
			showOptions,
			showPtbgThumbnails, showExternalThumbnails,
			0, // linkTime, used to be used to show Sweclockers easter egg.
			showUnreadStatus,
			0, //lastUseOf19HotKeys,
			openPopupsWithFirstUnreadMessage,
			showYoutubeThumbnails,
            maxAuthorWidth,
            thumbnailQuality]));
    }

    // Initialization
    
    if (typeof(localStorage[kName]) !== "undefined") {
        var s = localStorage[kName];
        var unserialized = JSON.parse(s);
        var majorVersion = unserialized[0];
        if (majorVersion > kMajorVersion) {
            alert("Can't go back to an earlier version without clearing all data");
            throw "Invalid version";
        }
        else if (majorVersion === kMajorVersion) {
            var minorVersion = unserialized[1];
        
            isUpdating = unserialized[2];
            needUpdating = isUpdating;
            
            starNotify = unserialized[3];
            writtenNotify = unserialized[4];
            newNotify = unserialized[5];
            bumpNotify = unserialized[6];
            
            ptbgId = unserialized[7];
            ptbgEdition = unserialized[8];
            latestServerChangeIndex = unserialized[9];
            
            username = unserialized[10];
            highestKnownThreadId = unserialized[11];
			if (minorVersion >= 2) {
				// minorVersion 1 was never publicly released.
				refreshInterval = unserialized[12];
			}
			if (minorVersion >= 3) {
				// minorVersion 2 was never publicly released.
				largestTimestamp = unserialized[13];
			}
			if (minorVersion >= 4 && minorVersion < 8) {
				// minorVersion 3 was released as script version 1.3.
				writeIndicationStyle = unserialized[14] ?
					kWriteIndicationStyleOld :
					kWriteIndicationStyleAsterisk;
			}
			if (minorVersion >= 5) {
				// minorVersion 4 was released as script version 1.3.1
				preferVerticalFrames = unserialized[15];
			}
			if (minorVersion >= 7) {
				// minorVersion 6 was never released publicly
				showOptions = unserialized[16];
			}
			if (minorVersion >= 8) {
				// minorVersion 7 was never released publicly
				writeIndicationStyle = unserialized[14];
			}
			if (minorVersion >= 9) {
				// minorVersion 5-8 were never released publicly
				showPtbgThumbnails = unserialized[17];
				showExternalThumbnails = unserialized[18];
			}
			//if (minorVersion >= 10) {
				// minorVersion 5-9 were never released publicly
				//linkTime = unserialized[19];
			//}
			if (minorVersion >= 11) {
				// minorVersion 10 was released as version 1.3.2
				showUnreadStatus = unserialized[20];
			}
			if (minorVersion >= 12) {
				// minorVersion 11 was never released publicly
				// Not needed any more, we always prefetch since I fixed so
				// it works when clicking on a link with the mouse too.
				//lastUseOf19HotKeys = unserialized[21];
			}
			if (minorVersion >= 13) {
				// minorVersion 11-12 were never released publicly
				openPopupsWithFirstUnreadMessage = unserialized[22];
			}
			if (minorVersion >= 14) {
				// minorVersion 11-13 were never released publicly
                // minorVersion 14 was released as version 1.3.3
				showYoutubeThumbnails = unserialized[23];
			}
            if (minorVersion >= 15) {
                // minorVersion 15 was released as version 1.4
                maxAuthorWidth = unserialized[24];
            }
            if (minorVersion >= 16) {
                thumbnailQuality = unserialized[25];
            }
        }
        else if (majorVersion === 5) {
            // Internal development version, never released.
            isUpdating = unserialized[1];
            needUpdating = isUpdating;
            
            starNotify = unserialized[2];
            writtenNotify = unserialized[3];
            newNotify = unserialized[4];
            bumpNotify = unserialized[5];
            
            ptbgId = unserialized[6];
            ptbgEdition = unserialized[7];
            latestServerChangeIndex = unserialized[8];
            
            username = unserialized[9];
        }
        else if (majorVersion === 4) {
            // Internal development version, never released.
            isUpdating = unserialized[1];
            needUpdating = isUpdating;
            
            starNotify = unserialized[2];
            writtenNotify = unserialized[3];
            newNotify = unserialized[4];
            bumpNotify = unserialized[5];
            
            ptbgId = unserialized[6];
            ptbgEdition = unserialized[7];
            latestServerChangeIndex = unserialized[8];
        }
        else if (majorVersion === 3) {
            // Internal development version, never released.
            isUpdating = unserialized[1];
            needUpdating = isUpdating;
            
            starNotify = unserialized[2];
            writtenNotify = unserialized[3];
            newNotify = unserialized[4];
            bumpNotify = unserialized[5];
            
            ptbgId = unserialized[6];
        }
        else if (majorVersion === 2) {
            // Internal development version, never released.
            isUpdating = unserialized[1];
            needUpdating = isUpdating;
        }
        else if (majorVersion === 1) {
            // Internal development version, never released.
        }
        else {
            console.assert(false, "Invalid version " + s);
        }
    }
    else {
        needUpdating = 1;
    }
    
    return {
        isUpdating : function() {
            return isUpdating;
        },
        startUpdating : function() {
            isUpdating = 1;
            save();
        },
        finishedUpdating : function() {
            isUpdating = 0;
            save();
        },
        needUpdating : function() {
            return needUpdating;
        },
        
        setStarNotify : function(value) {
            starNotify = value ? 1 : 0;
            save();
        },
        getStarNotify : function() {
            return starNotify;
        },
        setWrittenNotify : function(value) {
            writtenNotify = value ? 1 : 0;
            save();
        },
        getWrittenNotify : function() {
            return writtenNotify;
        },
        setNewNotify : function(value) {
            newNotify = value ? 1 : 0;
            save();
        },
        getNewNotify : function() {
            return newNotify;
        },
        setBumpNotify : function(value) {
            bumpNotify = value ? 1 : 0;
            save();
        },
        getBumpNotify : function() {
            return bumpNotify;
        },

        setPtbgId : function(value) {
            console.assert(typeof(value) === "string");
            if (value !== ptbgId) {
                ptbgId = value;
                ptbgEdition += 1;
                latestServerChangeIndex = -1;
                save();
                console.log("Changed to ptbgid " + value + ", ptbgEdition " + ptbgEdition);
            }
        },
        getPtbgId : function() {
            return ptbgId;
        },
        
        getPtbgServerEdition : function() {
            return ptbgEdition;
        },
        getLatestServerChangeIndex : function() {
            return latestServerChangeIndex;
        },
        setLatestServerChangeIndex : function(ptbgEdition2, changeIndex) {
            if (changeIndex > latestServerChangeIndex && ptbgEdition == ptbgEdition2) {
                latestServerChangeIndex = changeIndex;
                save();
            }
        },
        
        setUsername : function(name) {
            console.assert(name === null || name.length > 0);
            if (name != username) {
                username = name;
                save();
            }
        },
        getUsername : function() {
            return username;
        },
        
        getHighestKnownThreadId : function() {
            return highestKnownThreadId;
        },
        setHighestKnownThreadId : function(threadId) {
            console.assert(threadId >= highestKnownThreadId);
            if (threadId > highestKnownThreadId) {
                highestKnownThreadId = threadId;
                save();
            }
        },
		
		getRefreshInterval : function() {
			return refreshInterval;
		},
		setRefreshInterval : function(value) {
			console.assert(value >= 15);
			console.assert(value <= 9999);
			if (value !== refreshInterval) {
				refreshInterval = value;
				save();
			}
		},
		
		getLargestTimestamp : function() {
			return largestTimestamp;
		},
		setLargestTimestamp : function(ts) {
			console.assert(ts >= largestTimestamp);
			if (ts > largestTimestamp) {
				largestTimestamp = ts;
				save();
			}
		},
		
		getWriteIndicationStyle : function () {
			return writeIndicationStyle;
		},
		isOldStyleOn : function() {
			return writeIndicationStyle === kWriteIndicationStyleOld ||
				writeIndicationStyle === kWriteIndicationStyleBoth;
		},
		isAsteriskStyleOn : function() {
			return writeIndicationStyle === kWriteIndicationStyleAsterisk ||
				writeIndicationStyle === kWriteIndicationStyleBoth;
		},
		setWriteIndicationStyle : function(style) {
			switch (style) {
				case kWriteIndicationStyleNone:
				case kWriteIndicationStyleAsterisk:
				case kWriteIndicationStyleOld:
				case kWriteIndicationStyleBoth:
					// Ok, do nothing
					break;
				default:
					console.assert(false);
			}
			writeIndicationStyle = style;
			save();
		},
		
		getFrames2 : function() {
			return preferVerticalFrames;
		},
		setFrames2 : function(f2) {
			preferVerticalFrames = f2;
			save();
		},
		
		getShowOptions : function() {
			return showOptions;
		},
		setShowOptions : function(show) {
			showOptions = show;
			save();
		},
		
		getShowPtbgThumbnails : function() {
			return showPtbgThumbnails;
		},
		setShowPtbgThumbnails : function(show) {
			showPtbgThumbnails = show;
			save();
		},
		getShowExternalThumbnails : function() {
			return showExternalThumbnails;
		},
		setShowExternalThumbnails : function(show) {
			showExternalThumbnails = show;
			save();
		},
		getShowYoutubeThumbnails : function() {
			return showYoutubeThumbnails;
		},
		setShowYoutubeThumbnails : function(show) {
			showYoutubeThumbnails = show;
			save();
		},
		
		getShowUnreadStatus : function() {
			return showUnreadStatus;
		},
		setShowUnreadStatus : function(show) {
			showUnreadStatus = show;
			save();
		},
				
		getOpenPopupsWithFirstUnreadMessage : function() {
			return openPopupsWithFirstUnreadMessage;
		},
		setOpenPopupsWithFirstUnreadMessage : function(value) {
			openPopupsWithFirstUnreadMessage = value;
			save();
		},
        
        reportAuthorWidth : function(width) {
            maxAuthorWidth = maxAuthorWidth*0.997;
            maxAuthorWidth = Math.max(maxAuthorWidth, width);
            save();
        },
        getMaxAuthorWidth : function() {
            return Math.ceil(maxAuthorWidth);
        },
        
        getThumbnailQuality : function() {
            return thumbnailQuality;
        },
        setThumbnailQuality : function(quality) {
            console.assert(quality === 0 || quality === 1);
            thumbnailQuality = quality;
            save();
        }
    }
}


function createBackgroundBatch(func, batchIndex, numBatches, progressCallback, completionCallback) {
    return function() {
        if (batchIndex < numBatches-1) {
            func(batchIndex, function() {
                setTimeout(
                    createBackgroundBatch(func, batchIndex+1, numBatches,
                            progressCallback, completionCallback),
                    20);
                func = null;
                completionCallback = null;
				if (progressCallback) {
					progressCallback(batchIndex);
				}
                progressCallback = null;
            });
        }
        else {
            progressCallback = null;
            func(batchIndex, completionCallback);
            func = null;
            completionCallback = null;
        }
    }
}


function getProgressText(numCompleted, numTotal) {
    var progressBar = "";
    for (var i = 0; i < numTotal; i++) {
        progressBar += i<numCompleted ? "." : " ";
    }

    return (
        '<pre style="color: grey; font-family: monospace">\n' +
            'Updating Pimped TBG data structures (this will only be done once)\n' +
            '[' + progressBar + ']\n\n' +
        '</pre>');
}


function createConversionProgressTableCell() {
    var threadsCell = document.getElementsByClassName("threads")[0];
    var threadsRow = threadsCell.parentNode;
    var mainTable = threadsRow.parentNode;
    
    var progressRow = document.createElement("tr")
    var progressCell = document.createElement("td")
    progressCell.appendChild(progressRow);
    
    console.log("inserting");
    mainTable.insertBefore(progressCell, threadsRow);
    
    return progressCell;
}


function convertOldFormats(globalSettings, finishedCallback) {
	var sha256 = SHA256()
	sha256.update("" + (+new Date()));
	
	function confirmAndSetupSync() {
		if (confirm(
                "Would you like to setup PimpedTBG server synchronization? " +
                "This would sync your read/write/hide/star status between " +
                "different computers/browsers of yours. The syncing also " +
                "works when you're using http://pimpedtbg.appspot.com from " +
                "your phone/tablet.\n\n" +
                "If you wish to enable this later, just enter a string of " +
                "your choice in the PTBG ID textfield under options on " +
                "all your computers/browsers."))
		{
			const kUniverse = "23456789abcdefghjkmpqrstxyzABCDEFGHJKLNPQRSTXYZ";
			var universeIndex = 0;
			sha256.update("a" + (+new Date()));
			var pseudoRandomData = sha256.digest();
			if (window.crypto) {
				console.log("Has window.crypto");
				var buf = new Uint8Array(pseudoRandomData.length);
				window.crypto.getRandomValues(buf);
				for (var i = 0; i < buf.length; i++) {
					pseudoRandomData[i] ^= buf[i];
				}
			}
			var rnd = toHexString(pseudoRandomData);
			var ptbgId = "";
			const kNumChars = 12;
			const kDigestCharsPerPasswordChar = Math.floor(256/4.0 / kNumChars);
			for (var i = 0; i < kNumChars; i++) {
				var d = rnd.substr(kDigestCharsPerPasswordChar * i,
								   kDigestCharsPerPasswordChar);
				var index = (universeIndex + parseInt(d, 16)) % kUniverse.length;
				universeIndex = index;
				ptbgId += kUniverse[index];
			}
			
			var ptbgidElement = document.getElementById(kPtbgIdId);
			// This fires onchange event which sets everything up
			ptbgidElement.value = ptbgId;
			var event = document.createEvent("HTMLEvents");
			event.initEvent("change", true, true);
			ptbgidElement.dispatchEvent(event);
		}
	}
	

    if (!globalSettings.needUpdating()) {
        finishedCallback();
        return;
    }
	
    
    console.log("Starting conversion of old format data structures");
    globalSettings.startUpdating();

    var re = /^historyFast_(\d+)$/

    var startTime = (new Date()).getTime();
    
    var threadIds = [];
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
		var match;
        if (key && (match = re.exec(key))) {
            threadIds.push(parseInt(match[1]));
        }
    }
    
	sha256.update(localStorage["ptbg_history"] || "a");
    delete localStorage["ptbg_history"];

    var hidden = oldGetHiddenThreads();
	sha256.update(JSON.stringify(hidden));
    
    var afterThreadsTime = (new Date()).getTime();
    console.log("Got " + threadIds.length + " threadIds and " + hidden.length + " hidden in " +
        (afterThreadsTime - startTime) + " milliseconds");
  
    var numWorkItems = threadIds.length + hidden.length;
    var batchSize = 100;
    if (numWorkItems > 7000) {
        batchSize = Math.round(numWorkItems / 70);
    }
    var numBatches = Math.ceil(numWorkItems / batchSize);
    
    console.log("numWorkItems: " + numWorkItems + ", numBatches: " + numBatches +
        ", batchSize: " + batchSize);
       
    var progressTableCell = numBatches >= 5 ? createConversionProgressTableCell() : null;
    if (progressTableCell) {
        progressTableCell.innerHTML = getProgressText(0, numBatches);
    }
    
    function updateThreadIdsRange(batchIndex, callback) {
        var batchStartTime = (new Date()).getTime();
        var start = batchIndex*batchSize;
        var end = start + batchSize;
        for (var i = start; i < Math.min(end, threadIds.length); i++) {
            var threadId = threadIds[i];
            var oldKeyName = "historyFast_" + threadId;
            var newKeyName = kThreadInfoKeyPrefix + threadId;
            var value = renameLocalStorageKey(oldKeyName, newKeyName);
			sha256.update(value);
            var ti = ThreadInfo(threadId, false);
        }
        var newStart = Math.max(0, start - threadIds.length);
        var newEnd = end - threadIds.length;
        for (var i = newStart; i < Math.min(newEnd, hidden.length); i++) {
            var threadId = hidden[i][0];
            console.log("Open thread id " + threadId);
            var ti = ThreadInfo(threadId, true);
        }
        var batchEndTime = (new Date()).getTime();
        console.log("Did batch " + start + "-" + end + " in " +
            (batchEndTime-batchStartTime) + " milliseconds");
		sha256.update("a" + batchStartTime + batchEndTime);
        callback();
    }
		
    setTimeout(
        createBackgroundBatch(updateThreadIdsRange,
            0,
            numBatches,
            function(numBatchesCompleted) {
                if (progressTableCell) {
                    progressTableCell.innerHTML = getProgressText(numBatchesCompleted, numBatches);
                }
            },
            function() {
                globalSettings.finishedUpdating();
				var now = +new Date();
                console.log("Background conversion of " + numWorkItems +
                    " work items completed in " +
                    (now - startTime) + " milliseconds");
                if (progressTableCell) {
                    progressTableCell.parentNode.removeChild(progressTableCell);
                    progressTableCell = null;
                }
						
				sha256.update("a" + (+new Date()) + document.head.innerHTML + document.body.innerHTML);
				sha256.update("a" + Math.random());
				
				// Must execute after new preferences controls have been created.
				setTimeout(confirmAndSetupSync, 20);
				
			    finishedCallback();
            }),
        20);

    var endTime = (new Date()).getTime();
    console.log("convertOldFormats() completed in " + (endTime - startTime) + " milliseconds");
}


function disableReloadTimer() {
    var maxId = setTimeout(function(){}, 0);

    for (var i = 0; i < Math.min(maxId, 100); i++) {
        clearTimeout(i);
    }
    clearTimeout(maxId);

}

function isThreaderMode() {
    var search = window.location.search.substr(1);
    return search.search(/(^|&)threader=1/) != -1;
}


function isOnNewsSendPage() {
	return location.pathname.indexOf('/cgi-bin/news_send.cgi') === 0;
}


function getNthUnhiddenThreadRow(doc, n) {
	var threadIndex = 0;
	var hideUnhide = HideUnhide();
	var rows = getThreadTableRows(doc);
	for (var i = 1; i < rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);
		var threadId = getThreadIdFromRow(row);
		if (!hideUnhide.isHidden(threadId)) {
			if (threadIndex == n) {
				return row;
			}
			threadIndex += 1;
		}
	}
	return null;
}

function getFirstNUnhiddenThreadRows(n) {
	var result = []
	var hideUnhide = HideUnhide();
	var rows = getThreadTableRows(document);
	for (var i = 1; i < rows.snapshotLength && result.length < n; i++) {
		var row = rows.snapshotItem(i);
		var threadId = getThreadIdFromRow(row);
		if (!hideUnhide.isHidden(threadId)) {
			result.push(row);
		}
	}
	return result;
}

function prefetchMessagesOnMainPage(messageDownloader, globalSettings) {
    globalSettings = globalSettings || GlobalSettings();
		
    var rows = getFirstNUnhiddenThreadRows(9);
    for (var i = 0; i < rows.length; i++) {
        var threadId = getThreadIdFromRow(rows[i]);
        var messageId = getMessageIdFromRow(rows[i]);
        var m = getMessageIdToOpen(threadId, messageId, globalSettings);
        messageDownloader.add(threadId, m, i, null, true);
    }
}


function setupOnMessageHandler(handler) {
	window.addEventListener("message",
		function(event) {
			if (event.origin !== "http://www.tbg.nu")
				return;
			
			var msg = JSON.parse(event.data);
			handler(msg);
		},
		false);
}


function setupFastNavigation(deanonymizer, imageDownloader,
        messageDownloader, syncManager)
{
	var threadId = getThreadIdFromLocation();
	window.addEventListener("popstate",
		function(event) {
			onPopupPopState(event, deanonymizer, imageDownloader,
                    messageDownloader, syncManager);
		},
		false);
	replacePrevNextButtons(deanonymizer, imageDownloader,
            messageDownloader, syncManager);
	setupPopupKeyAccelerators(deanonymizer, imageDownloader,
            messageDownloader, syncManager);
	replaceWriteReplyButton();
	prefetchSurroundingMessages(messageDownloader);
}


const kAuthorTypeDefault = 20;
const kAuthorTypeUserSet = 21;
const kAuthorTypeRegistered = 22;
const kAuthorTypeInvalid = 23; // Used temporarily when writing invalid name.

function getAnonymousColor(authorType) {
    if (authorType === kAuthorTypeDefault) {
        return "";
    }
    else if (authorType === kAuthorTypeInvalid) {
        return "#EE1111";
    }
    else {
        console.assert(authorType === kAuthorTypeUserSet);
        return "#C08811";
    }
}





function areArraysEqual(a1, a2) {
    if (a1.length !== a2.length) {
        return false;
    }

    for (var i = 0; i < a1.length; i++) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    
    return true;
}


function Deanonymizer(onChangeCallback) {
    // onChangeCallback is function(ip1, ip2)

    const kDeanonymizerKeyName = "ptbgusernames";
    
    const kMajorVersion = 1;
    const kMinorVersion = 0;
    
    var table;  // {"123.45" : [name, // "luser" or ""
                //              color, // "667722" or ""
                //              changeTime, // (seconds since 1970)
                //              inSyncWithPtbgEdition]}

    var lastReceivedChangeIndex = -1;
    var lastReceivedChangeIndexPtbgEdition = -1;
    
    function matchIp(ip) {
        var match = /^(\d+)\.(\d+)$/.exec(ip);
        console.assert(match);
        return [parseInt(match[1]), parseInt(match[2])];
    }
    
    window.addEventListener("storage",
        function(event) {
            if (event.key === kDeanonymizerKeyName) {
                console.log("storage event with key " + kDeanonymizerKeyName);
                var newTable = load();
                var changedIps = [];
                
                if (onChangeCallback) {
                    for (ip in newTable) {
                        if (!newTable.hasOwnProperty(ip)) {
                            continue;
                        }
                        var newEntry = newTable[ip];
                        var oldEntry = table[ip];
                        if (!oldEntry || !areArraysEqual(newEntry, oldEntry)) {
                            changedIps.push(ip);
                        }
                    }
                    for (ip in table) {
                        if (!table.hasOwnProperty(ip)) {
                            continue;
                        }
                        if (!newTable[ip]) {
                            console.log("WARNING: ip " + ip +
                                " removed on storage event");
                            changedIps.push(ip);
                        }
                    }
                }
                table = newTable;
                
                for (var i = 0; i < changedIps.length; i++) {
                    var ips = matchIp(changedIps[i]);
                    onChangeCallback(ips[0], ips[1]);
                }
            }
        },
        false);
    

    function load() {
        var tempTable = {};
        var s = localStorage[kDeanonymizerKeyName];
        if (s) {
            var unpacked = JSON.parse(s);
            var majorVersion = unpacked[0];
            if (majorVersion == kMajorVersion) {
                var minorVersion = unpacked[1];
                tempTable = unpacked[2];
                lastReceivedChangeIndex = unpacked[3];
                lastReceivedChangeIndexPtbgEdition = unpacked[4];
            }
            else {
                console.log("WARNING - Future majorVersion " +
                    majorVersion + " for deanonymizer");
            }
        }
        return tempTable;
    }
    
    function save() {
        var str = [kMajorVersion, kMinorVersion, table,
                lastReceivedChangeIndex, lastReceivedChangeIndexPtbgEdition];
        localStorage[kDeanonymizerKeyName] = JSON.stringify(str);
    }
    
    table = load();

    var that = {};
    that.getName = function(ip1, ip2) {
            // Returns an array:
            // [0] = kAuthorTypeUserDefault if default name,
            //       kAuthorTypeUserSet if user chosen
            // [1] = name
            // [2] = color or ""
        
            var entry = table[ip1 + "." + ip2];
            var result = [];
            if (entry && entry[0] !== "") {
                result[0] = kAuthorTypeUserSet;
                result[1] = entry[0];
            }
            else {
                result[0] = kAuthorTypeDefault;
                result[1] = getPseudoRandomName(ip1, ip2);
            }
            if (entry) {
                result[2] = entry[1];
            }
            else {
                result[2] = "";
            }
            return result;
        };
    that.getUserAssignedName = function(ip1, ip2) {
            // Returns the name the user has assigned to a particular
            // anonymous user, or "" if no name assigned.
            var tableEntry = table[ip1 + "." + ip2];
            if (tableEntry) {
                return tableEntry[0];
            }
            else {
                return "";
            }
        };
    that.getUserAssignedColor = function(ip1, ip2) {
            // Returns the color the user has assigned to a particular
            // anonymous user, or "" if no color assigned.
            var tableEntry = table[ip1 + "." + ip2];
            if (tableEntry) {
                return tableEntry[1];
            }
            else {
                return "";
            }
        };
    that.setUserAssignedName = function(ip1, ip2, name, color) {
            console.assert(1 <= parseInt(ip1));
            console.assert(parseInt(ip1) <= 255);
            console.assert(1 <= parseInt(ip2));
            console.assert(parseInt(ip2) <= 255);
            console.assert(typeof(name) === "string");
            var key = "" + ip1 + "." + ip2;
            var entry = table[key] || ["", "", 0, -1];
            if (entry[0] != name || entry[1] != color) {
                entry[0] = name;
                entry[1] = color;
                entry[2] = Math.max(Math.round(+new Date() / 1000), entry[2]+1);
                entry[3] = -1;
                table[key] = entry;
                save();
                if (onChangeCallback) {
                    onChangeCallback(ip1, ip2);
                }
            }
        };
    that.reset = function() {
            load();
        };
    that.getLastReceivedChangeIndex = function(ptbgEdition) {
            if (lastReceivedChangeIndexPtbgEdition == ptbgEdition) {
                return lastReceivedChangeIndex;
            }
            else {
                return -1;
            }
        };
    that.buildUpdateRequest = function(ptbgEdition) {
            var result = [];
    
            for (ip in table) {
                if (!table.hasOwnProperty(ip)) {
                    continue;
                }
                var entry = table[ip];
                if (entry[3] != ptbgEdition) {
                    result.push([ip, entry[0], entry[1], entry[2]]);
                }
            }
            return result;
        };
    that.mergeServerResponse = function(ptbgEdition, asOfChangeIndex,
                                response)
        {
            for (var i = 0; i < response.length; i++) {
                var entry = response[i];
                var ip = entry[0];
                var name = entry[1];
                var color = entry[2];
                var changeTime = entry[3];

                var match = /^(\d+)\.(\d+)$/.exec(ip);
                console.assert(match);
                var ip1 = parseInt(match[1]);
                var ip2 = parseInt(match[2]);

                if (table.hasOwnProperty(ip)) {
                    var tableEntry = table[ip];
                    if (changeTime >= tableEntry[2]) {
                        table[ip] = [name, color, changeTime, ptbgEdition];
                        if (onChangeCallback) {
                            onChangeCallback(ip1, ip2);
                        }
                    }
                    else {
                        tableEntry[3] = -1;
                    }
                }
                else {
                    table[ip] = [name, color, changeTime, ptbgEdition];
                    if (onChangeCallback) {
                        onChangeCallback(ip1, ip2);
                    }
                }
            }
            if (response.length > 0 ||
                    ptbgEdition !== lastReceivedChangeIndexPtbgEdition)
            {
                lastReceivedChangeIndexPtbgEdition = ptbgEdition;
                lastReceivedChangeIndex = asOfChangeIndex;
                save();
            }
        };
    return that;
}



function GuiDeanonymizer(onChangeCallback) {
    // onChangeCallback is function(messageId, authorType, author)
    console.assert(onChangeCallback);
    
    var tempUserNameIp1 = 0;
    var tempUserNameIp2 = 0;
    var tempUserName = "";
    var tempUserColor = "";
    
    var deanonymizer = Deanonymizer(function(ip1, ip2) {
        if (ip1 !== tempUserNameIp1 && ip2 !== tempUserNameIp2) {
            var typeNameColor = deanonymizer.getName(ip1, ip2);
            sendNameChangeCallback(ip1, ip2,
                typeNameColor[0], typeNameColor[1], typeNameColor[2]);
        }
    });
    
    var ipToMessageIds = {}; // {"ip1.ip2" : [1, 42, 511]}
    
    
    function escapeAuthorName(author) {
        return escapeHtml(author).replace(/ /g, "&nbsp;");
    }
    
    function matchAuthor(author) {
        var match = kAnonymousIpRe.exec(author);
        if (match) {
            var ip1 = parseInt(match[3]);
            var ip2 = parseInt(match[4]);
            return [match[1], match[2], ip1, ip2];
        }
        else {
            return null;
        }
    }
    
    function sendNameChangeCallback(ip1, ip2, authorType, name, color) {
        var messageIds = ipToMessageIds["" + ip1 + "." + ip2] || [];
        var nameWithIp = escapeAuthorName(name) +
            "&nbsp;&lt;" + ip1 + "." + ip2 + ".*.*&gt;";
        if (kIncompleteHexColorRegExp.test(color)) {
            color = "#" + color;
        }
        console.log("sendNameChangeCallback - " + messageIds.length +
            " callbacks, nameWithIp: " + nameWithIp + ", color: " + color);
        for (var i = 0; i < messageIds.length; i++) {
            onChangeCallback(messageIds[i], authorType, nameWithIp, color);
        }
    }
    
    
    var that = {};
    that.getName = function(author) {
            // Name is something like "Anonymous <123.45.*.*>". It can also
            // be a registered user name.

            var match = matchAuthor(author);
            if (match) {
                var typeNameColor = deanonymizer.getName(match[2], match[3]);
                var name;
                var color;
                if (parseInt(match[2]) === tempUserNameIp1 &&
                        parseInt(match[3]) === tempUserNameIp2)
                {
                    name = tempUserName || typeNameColor[1];
                    color = tempUserColor || typeNameColor[2];
                }
                else {
                    name = typeNameColor[1];
                    color = typeNameColor[2];
                }
                
                if (kIncompleteHexColorRegExp.test(color)) {
                    color = "#" + color;
                }
                
                return [typeNameColor[0],
                    match[0] + escapeAuthorName(name) + match[1],
                    color];
            }
            else {
                return [kAuthorTypeRegistered, author, ""];
            }
        };
    that.addMessage = function(messageId, author) {
            var authorType;
            var newAuthor;
            var color = "";
            var match = matchAuthor(author);
            if (match) {
                var ip1 = parseInt(match[2]);
                var ip2 = parseInt(match[3]);
                var messageIds = ipToMessageIds["" + ip1 + "." + ip2];
                if (!messageIds) {
                    messageIds = [];
                    ipToMessageIds["" + ip1 + "." + ip2] = messageIds;
                }
                if (messageIds.indexOf(messageId) === -1) {
                    messageIds.push(messageId)
                }
            
                var typeNameColor = deanonymizer.getName(ip1, ip2);
                if (ip1 == tempUserNameIp1 && ip2 == tempUserNameIp2) {
                    newAuthor = match[0] +
                            escapeAuthorName(tempUserName || typeNameColor[1]) +
                            match[1];
                    color = tempUserColor || typeNameColor[2];
                    if (kValidNameRegExp.test(tempUserName)) {
                        authorType = kAuthorTypeUserSet;
                    }
                    else {
                        authorType = kAuthorTypeInvalid;
                    }
                }
                else {
                    authorType = typeNameColor[0];
                    newAuthor = match[0] + escapeAuthorName(typeNameColor[1]) +
                            match[1];
                    color = typeNameColor[2];
                }
            }
            else {
                authorType = kAuthorTypeRegistered;
                newAuthor = author;
            }
        
            if (kIncompleteHexColorRegExp.test(color)) {
                color = "#" + color;
            }
        
            onChangeCallback(messageId, authorType, newAuthor, color);
        };
    that.getUserAssignedName = function(ip1, ip2) {
            return deanonymizer.getUserAssignedName(ip1, ip2);
        };
    that.getUserAssignedColor = function(ip1, ip2) {
            return deanonymizer.getUserAssignedColor(ip1, ip2);
        };
    that.setUserAssignedName = function(ip1, ip2, name, color) {
            console.log("setUserAssignedName " + ip1 + "." + ip2 +
                " - " + name + " - " + color);
            tempUserNameIp1 = 0;
            tempUserNameIp2 = 0;
            deanonymizer.setUserAssignedName(ip1, ip2, name, color);
        };
    that.setTempUserAssignedName = function(ip1, ip2, name, color) {
            console.log("setTempUserAssignedName " +
                tempUserNameIp1 + "." + tempUserNameIp2 +
                " : " + name + " - " + color);
            tempUserNameIp1 = ip1;
            tempUserNameIp2 = ip2;
            tempUserName = name;
            tempUserColor = color;
            if (name == "") {
                sendNameChangeCallback(ip1, ip2, kAuthorTypeDefault,
                    getPseudoRandomName(ip1, ip2), color);
            }
            else if (kValidNameRegExp.test(name)) {
                sendNameChangeCallback(ip1, ip2,
                    kAuthorTypeUserSet, name, color);
            }
            else {
                sendNameChangeCallback(ip1, ip2,
                    kAuthorTypeInvalid, name, color);
            }
        };
    that.resetTempUserAssignedName = function() {
            console.log("resetTempUserAssignedName " +
                tempUserNameIp1 + "." + tempUserNameIp2);
            if (tempUserNameIp1 !== 0 && tempUserNameIp2 !== 0) {
                var ip1 = tempUserNameIp1;
                var ip2 = tempUserNameIp2;

                tempUserNameIp1 = 0;
                tempUserNameIp2 = 0;
                tempUserName = "";
                tempUserColor = "";

                var typeNameColor = deanonymizer.getName(ip1, ip2);
                sendNameChangeCallback(ip1, ip2,
                        typeNameColor[0], typeNameColor[1], typeNameColor[2]);
            }
        };
    that.resetMessageIdMappings = function() {
            ipToMessageIds = {};
            tempUserNameIp1 = 0;
            tempUserNameIp2 = 0;
            tempUserName = "";
            tempUserColor = "";
        };
    that.getInnerDeanonymizer = function() {
            return deanonymizer;
        };
    return that;
}


function downloadAnonymousMessagesInMessageList(messageDownloader) {
    var threadId = getThreadIdFromLocation();

    var links = xpathGet('//form/table[2]/tbody/tr[not(@bgcolor="006600")]/td[1]/a[../../td[2]//font[@color="999999"]]');
    var len = links.snapshotLength;
    for (var i = 0; i < len; i++) {
        var link = links.snapshotItem(i);
        var messageId = getMessageIdFromURL(link.href);
        messageDownloader.add(threadId, messageId, i+1, 0, false);
    }
}


function setupAuthor(deanonymizer, syncManager, containingNode,
        authorType, author, color, messageId, prefix)
{
    prefix = prefix || "";
    var span = document.getElementById(
                anonymousAuthorSpanId(prefix + messageId));
    if (span) {
        span.innerHTML = author;
        span.style.color = color || getAnonymousColor(authorType);
    }
    else {
        containingNode.innerHTML = createAnonymousAuthorSpan(authorType,
                                        author, color, prefix+messageId);
        addAnonymousAuthorSpanClickListener(deanonymizer, syncManager,
            messageId, prefix);
    }
}



function modifyPopupWindow() {
	var messageTable = xpathGetSingle("//form/table[2]");
	messageTable.id = kMessageTableId;

    var imageDownloader = ImageDownloader(
        function(urlToReplace, token, image) {
            var td = xpathGetSingle(kPopupMessageTdXpath);
            td.innerHTML = replaceNonPtbgImageLinks(urlToReplace, td.innerHTML, image);
        });
	
	var isThreaderModeVar = false;
	copyReadWriteStatusFromPopupWindow(isThreaderModeVar);
	markPopupMessageAsRead();
	var threadId = getThreadIdFromLocation();
    
    var guiDeanonymizer;
    var syncManager;
    
    var numReplacementsMade = 0;
    var replaceAuthor = function(messageId, authorType, author, color) {
        if (authorType === kAuthorTypeRegistered) {
            return;
        }

        var link = document.getElementById("i" + messageId);
        // Might not exist if we are fast-naving and haven't loaded list yet.
        if (link) {
            var tr = getFirstParentNodeWithNodeName(link, "TR");
            var fromTd = getNextSiblingWithNodeName(
                    getChildNodeWithNodeName(tr, "TD"), "TD");
            var fontElem = getChildNodeWithNodeName(fromTd, "FONT");
            console.assert(fontElem);
            setupAuthor(guiDeanonymizer, syncManager, fontElem,
                authorType, author, color, messageId);
        }
        
        if (messageId == getMessageIdFromLocation()) {
            var fromTd = getFromTd();
            setupAuthor(guiDeanonymizer, syncManager, fromTd,
                    authorType, author, color, messageId, "Header");
        }
        
        numReplacementsMade += 1;
        if (numReplacementsMade === 1) {
            resizeWindowWidthToFitMessageTable();
        }
        
    }
    
    guiDeanonymizer = GuiDeanonymizer(replaceAuthor);
    
    syncManager = PTBGSyncManagerForThreadWindow(threadId,
            isThreaderModeVar);
    var innerDeanonymizer = guiDeanonymizer.getInnerDeanonymizer();
    syncManager.startSyncing(innerDeanonymizer);
    
	var messageDownloader = MessageDownloader(imageDownloader,
        function(message) {
            if (message.threadId === getThreadIdFromLocation()) {
                guiDeanonymizer.addMessage(message.messageId, message.author);
            }
        });
    
    setupFastNavigation(guiDeanonymizer, imageDownloader,
            messageDownloader, syncManager);
    
    downloadAnonymousMessagesInMessageList(messageDownloader);
    
	insertHideButton(syncManager);
	insertThreaderButton();
	insertStarInPopup(threadId, syncManager);
	colorLinksFromReadWriteStatus();
	makeThreadWindowUsersSearchable();
	var message = extractMessage(document.body.innerHTML);
	addToMessageCache(threadId, message.messageId, message);
    
    guiDeanonymizer.addMessage(message.messageId, message.author);
	
	var state = {message : message, messageTable : messageTable.innerHTML};
	window.history.replaceState(state, document.title); // Needed for fast navigation
	
    
	// extractMessage removes first <br>. Put it back and transform.
	transformAndReplacePopupMessageBody("<br>" + message.message,
        imageDownloader, messageDownloader, syncManager);
	
	setupFastNavigationForLinks(document.body,
        guiDeanonymizer, imageDownloader, messageDownloader, syncManager);
	setupOnMessageHandler(function(msg) {
		changePopupToMessage(msg.threadId, msg.messageId,
            guiDeanonymizer, imageDownloader, messageDownloader, syncManager);
	});
	
	xpathGetSingle("//input[contains(@value, 'Close')]").addEventListener(
		"click",
		function(event) {
			if (isFramesVersion()) {
				location.href = kEmptyFramePathName;
			}
		},
		false);
    
    resizeWindowWidthToFitMessageTable();
}

dependencies["getMainWindowPathNameConst"] = [];
function getMainWindowPathNameConst() {
	return "/cgi-bin/news.cgi";
}

const kEmptyFramePathName = "/null.htm";

function setup() {
	console.log("TBG script " + location.pathname);
    var globalSettings = GlobalSettings();
	if (location.pathname === getMainWindowPathNameConst()) {
        disableReloadTimer();
		if (isFramesVersion()) {
			// Get focus in order to get the hotkeys working.
			setTimeout(function() { window.focus(); }, 250);
		}
        convertOldFormats(globalSettings,
            function() {
                mainSetup();
                setTimeout(garbageCollectThreadInfos, 10000);
                setTimeout(garbageCollectMessageCache, 20000);
                setTimeout(garbageCollectUnsentReplies, 29000);
            });
	}
	else if (!globalSettings.needUpdating() && location.pathname.indexOf("/news_show/") == 0) {
		createErrorDivs();
		if (isThreaderMode()) {
			changeToThreaderWindow();
		}
		else {
            modifyPopupWindow();
		}
		
		// Taken from http://docs.mathjax.org/en/latest/dynamic.html
		(function () {
			var head = document.getElementsByTagName("head")[0], script;
			script = document.createElement("script");
			script.type = "text/x-mathjax-config";
			script[(window.opera ? "innerHTML" : "text")] =
			  "MathJax.Hub.Config({\n" +
			  "  tex2jax: { inlineMath: [['\\\\(','\\\\)']] },\n" +
			  "  messageStyle: 'none'\n" +
			  "});"
			head.appendChild(script);
			script = document.createElement("script");
			script.type = "text/javascript";
			script.src  = "http://cdn.mathjax.org/mathjax/2.2-latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
			head.appendChild(script);
		})();
	}
	else if (!globalSettings.needUpdating() && location.pathname.indexOf('/cgi-bin/news_search.cgi') == 0)
    {
        var startTime = (new Date()).getTime();
		insertFramesLink();
		createErrorDivs();
		insertThreaderLink();
		colorVisitedThreadLinksSearchWindow();
		makeSearchWindowUsersSearchable();
		syncSearchWindow();
        console.log("search modifications in " + ((new Date()).getTime()-startTime) + " milliseconds")
	}
	else if (/^\/cgi-bin\/(login|news-search|donate|about)\.cgi/.test(location.pathname)) {
		changeKnytLinkToMobile();
		insertFramesLink();
	}
	else if (!globalSettings.needUpdating() && isOnNewsSendPage()) {
		modifySendPopup();
	}
	else if (!globalSettings.needUpdating() && location.pathname === kEmptyFramePathName) {
		window.addEventListener("keypress",
			function (event) {
				if (window.top.frames[0].location.pathname === getMainWindowPathNameConst())
				{
                    if (isAnyModifierKeyDown(event)) {
                        return;
                    }
                
					var msgToOpen = hotKey19(window.top.frames[0].document, event);
					if (msgToOpen) {
						location.href = buildMessageUrl(msgToOpen.threadId,
														msgToOpen.messageId);
					}
				}
			},
			false);
		setupOnMessageHandler(function(msg) {
			location.href = buildMessageUrl(msg.threadId, msg.messageId);
		});
	}
}


// Firefox runs script even when TBG page can't load. Don't do anything
// in that case.
if (document.title.indexOf("TBG v2") == 0) {
	setup();
}
else {
	// For some reason this script is run twice on Firefox Windows. Once
	// with the title above, once without. So don't log this message.
	//console.log("Detected Firefox error page, stop running");
}


///////////////////////////////////////////////////////////////////////
// Move these last in the file since the regexpes apparently screw up
// XCode code navigation.
///////////////////////////////////////////////////////////////////////

// Stolen from http://www.netlobo.com/url_query_string_javascript.html
function getUrlParameter( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null ) {
		return "";
	}
	else {
		return results[1];
	}
}


function modifyThreadRows(globalSettings, syncManager, notificationState) {
    var startTime = (new Date()).getTime();
    
    var threadIdsOnPage = [];

    var lastUnhideAllTime = HideUnhide().getLastUnhideAllTime();
    var frameTarget = isFramesVersion() ? "News_TBGv2" : "";
    var odd = true;
	var rows = getThreadTableRows(document);
    var tbody = document.createElement("tbody");

	var oldWrittenStyle = globalSettings.isOldStyleOn();
	var asteriskWrittenStyle = globalSettings.isAsteriskStyleOn();
	var showUnread = globalSettings.getShowUnreadStatus();
	var linkFirstUnread = globalSettings.getOpenPopupsWithFirstUnreadMessage();
    
    var highestKnownThreadId = globalSettings.getHighestKnownThreadId();
    var numHiddenThreads = 0;
    var length = rows.snapshotLength;
	for (var i = 0; i < length; i++) {
		var row = rows.snapshotItem(i).cloneNode(true);
		if (i == 0) {
			// Header
            var cell = row.insertCell(0);
			cell.className = 'f'; // Makes if left-align.
			cell.textContent = "PTBG";
            
            var headerSpan = row.childNodes[1].childNodes[1];
            var re = /&nbsp;&nbsp;-&nbsp;&nbsp;((?:(?:[\w0-9\[\]\._']+)*(?:&amp;)*)+)&nbsp;&nbsp;-&nbsp;&nbsp;/;
            var match = re.exec(headerSpan.innerHTML);
            if (match && match[1] != "Anonymous") {
                globalSettings.setUsername(match[1]);
            }
            else {
                globalSettings.setUsername(null);
            }
		}
		else {
            // Normal row
            var threadId = getThreadIdFromRow(row);
            var messageId = getMessageIdFromRow(row);
            var threadInfo = ThreadInfo(threadId);
            modifyThreadRow(row, threadInfo, lastUnhideAllTime, odd,
				frameTarget, syncManager, oldWrittenStyle, asteriskWrittenStyle,
				showUnread, linkFirstUnread);
            if (threadInfo.isHidden(lastUnhideAllTime)) {
                numHiddenThreads += 1;
            }
            else {
                odd = !odd;
            }
            threadIdsOnPage.push(threadId);
            highestKnownThreadId = Math.max(highestKnownThreadId, threadId);
			notificationState.setHighestMessageId(threadId, messageId);
		}
        tbody.appendChild(row);
	}
    
    var oldTbody = rows.snapshotItem(0).parentNode;
    oldTbody.parentNode.replaceChild(tbody, oldTbody);
    
    globalSettings.setHighestKnownThreadId(highestKnownThreadId);
    
    var numTotalThreads = length-1;
    addStats(numHiddenThreads, numTotalThreads);
    
    var endTime = (new Date()).getTime();
    console.log("Modified thread rows in " + (endTime-startTime) + " milliseconds");
    
    return threadIdsOnPage;
}

// Taken from http://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
 
function unescapeHtml(html) {
    return html
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
}
