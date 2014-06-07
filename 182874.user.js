// ==UserScript==
// @name           Hacker News Mark Seen
// @namespace      negaton
// @description    Adds colors for seen or visited links and discussion posts
// @include        https://news.ycombinator.com/*
// @match          https://news.ycombinator.com/*
// @grant          none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @version        1.2
// @license        Public Domain
// @downloadURL    https://userscripts.org/scripts/source/182874.user.js
// @updateURL      http://userscripts.org/scripts/source/182874.meta.js
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAADGElEQVR42u2ZTUhUURiGn3NnxgmDwk0JYZLZ70akkMJoUUT2Q5YQtGhTkWURoUgghGRGvxRR0qoWllqmUBFRIf1YtrFCDHRRQqhUoERqOKbjeFtcpztXM2SauTM637e7Z+bcc87zvud855yr9Fz6gXhiMzxaDA8eIF4jxkMACAABIAAEgAAQAAJAAAgAARCb4QzZm3Rg+QbwDVnLW+uDb0UH5qRCwjyzzBEHrXWgog3AMLC1GFLXWMsvrIW218G/s6TFGLQ/2hrgQx24om0KuIAbu8coqMOuqzAYpPobj1gHz2gbrmhdA7ra4W21+awUJKXB8szg1M85b0D0x7tqo42oXQSdQOXB/3eBDmQdBdcMA6I/KvNCOWnDlAX6e+BFmdUF89Nh2arJv8MH5Jyzqv/yGvz8MQXSoAbU5AfvAh3IKgCn26r+3XxwTJV9wPAwPCyxuiB5JSzJmKT6Z6zqPyoF79AU2ggp4MEJ8HnNgUzGBTqwqdBY+ZUy6oz44H5x2LZs4dsJakBNgWljpWBBBixeMXGdEWBHgPpKQW1hyDY99gJQwNMy8PSMd8HQBOpvPgYOp6n+rz54cnmKAvBvjirzrC5IWQ0L0/+u/vbToyRG/3v7cMjTnr0AFPDmDnxv/7cLdGBLEWgOo5KuQ88XqK8Iq/r2nAbdwM19VhekZkJKmhVA9ilr1ri136g7LY7Dzc+go8nqgp2XwOuf+0WgaeZvX1vg/eNpdB/gBsr3WF2wdB0kJht5f9tJq/rle21R394Lkc/Nxjk+0AXZpbA+z1j5/WWfXsHHRtu6pfRcdNtaS0iCsx0Bc38E+rpg1lzTHccXQXfbNL0S6+6ExqoA/BrMTjTzftM9+NZma5fsBeAEqg5N4EUFFQfCnvcjCwCgvxeeXxlf3nAdertt744WkRbrLo4vry0My3E3+gD82fmMiYHeiPREPowIAAEgAASAABAAAkAACIAYDWdEWvUOQmczeAeMZ/fMiAGw90Yo8Czkxbzy1jG+IahYcYAC4mQNEAACQAAIAAEgAASAABAAAiDCADwxPH7Pb6+y4BrRT6j7AAAAAElFTkSuQmCC
// ==/UserScript==


// What's new in version 1.2
//  - Colored links on main page



// Set to "" to not change a particular color
const COLOR_UNSEEN_LINK = "000";
const COLOR_SEEN_LINK = "#D73";
const COLOR_VISITED_LINK = "#828282";

const COLOR_UNSEEN_DISCUSSION = "#000";
const COLOR_SEEN_DISCUSSION = "#D73";
const COLOR_VISITED_DISCUSSION = "#828282";


const FORUM_POST_KEY_PREFIX = "markseen_";
const FORUM_THREAD_KEY_PREFIX = "forumthread_";
const LINK_KEY_PREFIX = "link_";

const KEY_PREFIXES = [FORUM_POST_KEY_PREFIX,
    FORUM_THREAD_KEY_PREFIX,
    LINK_KEY_PREFIX];

const KEY_SUFFIX = "_timestamp";

const LINK_SEEN = "seen";


function endsWith(str, suffix) {
	var index = str.lastIndexOf(suffix);
	return index >= 0 && index === str.length - suffix.length;
}

function startsWith(str, prefix) {
	return str.indexOf(prefix) === 0;
}

function startsWithAnyOf(str, prefixes) {
    for (var i = 0; i < prefixes.length; i++) {
        if (startsWith(str, prefixes[i])) {
            return true;
        }
    }
    return false;
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


function expirationTimeOrder(a, b) {
	var aexpiration = localStorage[a + KEY_SUFFIX];
	var bexpiration = localStorage[b + KEY_SUFFIX];
	if (aexpiration === undefined && bexpiration === undefined) { return 0; }
	else if (aexpiration === undefined) { return 1; }
	else if (bexpiration === undefined) { return -1; }
	else if (aexpiration === bexpiration) { return 0; } 
	else if (aexpiration < bexpiration) { return 1; }
	else { return -1; }
}


function removePartOfLocalStorage(fraction_or_before) {
	console.assert(typeof(fraction_or_before) === "number" &&
			fraction_or_before > 0 && fraction_or_before <= 1 ||
		typeof(fraction_or_before) === "string");

	var delete_candidates = [];
	var orphan_values = [];
	var orphan_expirations = [];
	
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (startsWithAnyOf(key, KEY_PREFIXES)) {
			if (!endsWith(key, KEY_SUFFIX)) {
				var expiration = localStorage[key + KEY_SUFFIX];
				if (expiration !== undefined) {
					delete_candidates.push(key);
				}
				else {
					orphan_values.push(key);
				}
			}
			else {
				var keyWithoutSuffix = key.substr(0, key.length-KEY_SUFFIX.length);
				if (localStorage[keyWithoutSuffix] === undefined) {
					orphan_expirations.push(key);
				}
			}
		}
	}
	
	while (orphan_values.length > 0) {
		delete localStorage[orphan_values.pop()];
		numLeftToDelete -= 1;
	}
	while (orphan_expirations.length > 0) {
		delete localStorage[orphan_expirations.pop()];
		numLeftToDelete -= 1;
	}

	if (typeof(fraction_or_before) === "number") { 
		delete_candidates.sort(expirationTimeOrder);
		var numDeletes = Math.ceil(fraction * delete_candidates.length);
		for (var i = 0; i < numDeletes; i++) {
			var key = delete_candidates.pop();
			delete localStorage[key];
			delete localStorage[key + KEY_SUFFIX];
		}
	}
	else {
		while (delete_candidates.length > 0) {
			var key = delete_candidates.pop();
			var expirationKey = key + KEY_SUFFIX;
			var expiration = localStorage[expirationKey];
			if (expiration === undefined || expiration < fraction_or_before) {
				delete localStorage[key];
				delete localStorage[expirationKey];
			}
		}
	}
}

function setLocalStorage(key, value, maxAttempts) {
	if (maxAttempts === 0) {
		throw "Couldn't write to local storage";
	}
	else if (maxAttempts === undefined) {
		maxAttempts = 3;
	}

	console.assert(!endsWith(key, KEY_SUFFIX));

	var obj = {version: [1, 0], value: value};
	try {
		localStorage[key] = JSON.stringify(obj);
		var now = dateToISOString(new Date());
		localStorage[key + KEY_SUFFIX] = now;
	}
	catch (e) {
		setLocalStorage(key, value, maxAttempts-1);
	}
}

function getFromLocalStorage(key) {
	var s = localStorage[key];
	if (s === undefined) {
		return undefined;
	}
	var obj = JSON.parse(s);
	if (obj.version[0] == 1) {
		return obj.value;
	}
	else {
		return undefined;
	}
}

function garbageCollectLocalStorage() {
	var deleteBefore = new Date(+new Date() - 86400*1000*30);
	var deleteBeforeStr = dateToISOString(deleteBefore)
	removePartOfLocalStorage(deleteBeforeStr);
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



function isElementInViewportVertically(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function colorLinks() {
    var newStyle = [];

    if (COLOR_VISITED_LINK) {
        newStyle.push('td.title a:visited {');
        newStyle.push('    color: ' + COLOR_VISITED_LINK + ';');
        newStyle.push('}');
    }

    $("td.title a").each(function() {
        var $a = $(this);
        var href = $a.attr("href");
        var hash = toHexString(SHA256(href).digest());
        var info = getFromLocalStorage(LINK_KEY_PREFIX + hash);
        var isSeen = info && info === LINK_SEEN;
        if (isSeen && COLOR_SEEN_LINK) {
            newStyle.push('a[href="' + href + '"]:link {');
            newStyle.push('    color: ' + COLOR_SEEN_LINK + ';');
            newStyle.push('}');
        }
        if (!isSeen && COLOR_UNSEEN_LINK) {
            newStyle.push('a[href="' + href + '"]:link {');
            newStyle.push('    color: ' + COLOR_UNSEEN_LINK + ';');
            newStyle.push('}');
        }
        
        if (!isSeen) {
            setLocalStorage(LINK_KEY_PREFIX + hash, LINK_SEEN);
        }
    });
    
    
    $("td.subtext a").each(function() {
        var $a = $(this);
        var href = $a.attr("href");
        if (!startsWith(href, "item?")) {
            return;
        }
        var hash = toHexString(SHA256(href).digest());
        var info = getFromLocalStorage(FORUM_THREAD_KEY_PREFIX + hash);
        var isSeen = info && info === LINK_SEEN;
        if (isSeen && COLOR_SEEN_DISCUSSION) {
            newStyle.push('.subtext a[href="' + href + '"]:link {');
            newStyle.push('    color: ' + COLOR_SEEN_DISCUSSION + ';');
            newStyle.push('}');
        }
        if (!isSeen && COLOR_UNSEEN_DISCUSSION) {
            newStyle.push('.subtext a[href="' + href + '"]:link {');
            newStyle.push('    color: ' + COLOR_UNSEEN_DISCUSSION + ';');
            newStyle.push('}');
        }
        
        if (COLOR_VISITED_DISCUSSION) {
            newStyle.push('td.subtext a[href="' + href + '"]:visited {');
            newStyle.push('    color: ' + COLOR_VISITED_DISCUSSION + ';');
            newStyle.push('}');
        }
        
        if (!isSeen) {
            setLocalStorage(FORUM_THREAD_KEY_PREFIX + hash, LINK_SEEN);
        }
    });

    if (newStyle.length > 0) {
        newStyle.unshift('<style type="text/css">');
        newStyle.push('</style>');
        $(newStyle.join("\n")).appendTo("head");
    }
}

function iterateMessageLinks(callback) {
	$("a").filter(function () {
		return $.trim($(this).text()) === "link";
	}).each(function() {
		var $link = $(this);
		var messageId = $link.attr("href").match(/item\?id=(\d+)$/)[1];
		var $table = $link.closest("table");
		callback($table, messageId);
	});
}

function getCommentHash($containingComment) {
	var text = $containingComment.find(".comment").text();
	var hash = toHexString(SHA256(text).digest());
	return hash;
}

function markMessagesInViewportAsRead() {
	iterateMessageLinks(function($table, messageId) {
		if (isElementInViewportVertically($table[0])) {
			var oldHash = getFromLocalStorage(FORUM_POST_KEY_PREFIX + messageId);
			var newHash = getCommentHash($table);
			setLocalStorage(FORUM_POST_KEY_PREFIX + messageId, newHash);
			if (!oldHash) {
				setColor($table, "#8be", true);
			}
		}
	});
}


function debounce(func, milliseconds) {
	// Returns a debounced version of func. Calling that function repeatedly
	// only results in a call to func every time the returned function has been idle
	// for milliseconds.
	
	var timer = null;
	
	return function() {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(func, milliseconds);
	}
}

function setColor($table, color, animate) {
	var numColumns = $table.find("td").size();
	if (numColumns == 3) {
		var $img = $table.find("img[src='s.gif']");
		var $td;
		if (parseInt($img.attr("width")) === 0) {
			$td = $img.closest("td").next("td")
		}
		else {
			var newImgWidth = parseInt($img.attr("width")) - 22;
			$img.closest("td").replaceWith(
				'<td/><td>' + 
				'<img src="s.gif" height="1" width="14">' +
				'</td>' +
				'<td>' +
				'<img src="s.gif" height="1" width="' + newImgWidth + '">' +
				'</td>');
			$td = $table.find("td:first").next("td");
		}
		if (animate) {
			$td.css("background", "rgba(255, 255, 255, 0)")
			   .css("-webkit-transition", "background 500ms linear");
			setTimeout(function() {
					$td.css("background", color);
				},
				10);
		}
		else {
			$td.css("background", color);
		}
		
	}
	else {
		console.log("WARN: Already has a color!");
	}
}

const kSeenColor = "#e4e4e4";
const kModifiedColor = "#944";

if (location.pathname === "/" ||
        location.pathname === "/news" ||
        location.pathname === "/news2" ||
        location.pathname === "/x")
{
	setTimeout(garbageCollectLocalStorage, 10*1000);
    colorLinks();
}
else if (location.pathname === "/item") {
	var numElements = 0;
	iterateMessageLinks(function($table, messageId) {
		var oldHash = getFromLocalStorage(FORUM_POST_KEY_PREFIX + messageId);
		if (oldHash !== undefined) {
			var newHash = getCommentHash($table);
			var color = kSeenColor;
			if (newHash !== oldHash) {
				color = kModifiedColor;
				setLocalStorage(FORUM_POST_KEY_PREFIX + messageId, newHash);
			} 
			setColor($table, color);
		}
	});

	markMessagesInViewportAsRead();
	
	$(window).on("scroll resize", debounce(markMessagesInViewportAsRead, 250));
}

