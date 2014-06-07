// ==UserScript==
// @name            Dumpert Ad Blocker
// @namespace       http://reinierkip.nl/read/dumpert-ad-blocker-voor-chrome
// @description     Blokkeert videoadvertenties op http://dumpert.nl.
// @match           *://dumpert.nl/mediabase/*
// @match           *://www.dumpert.nl/mediabase/*
// @version         1.2.2
// ==/UserScript==

/**
 * Blocks advertisements on Dumpert videos.
 *
 * Copyright (c) 2011 Reinier Kip
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

var tryFor   = 5000, // Try for (approx.) five seconds
	tryEvery = 50,   // Try every 50 milliseconds
	triedFor = 0;    // Have already tried for (ms)

function blockVideoAd() {
	var item = document.querySelector('#item1_wrapper');
	if(item) {
		item.innerHTML = item.innerHTML.replace(/&amp;plugins=ova\-h/, '') + '<small style="float:right;font-size:8px;color:gray">AD BLOCKED</small>';
		return true;
	} else {
		return false;
	}
}

function tryLoop() {
	var success;
	
	triedFor += tryEvery;
	success = blockVideoAd();

	if(!success && triedFor < tryFor)
		window.setTimeout(tryLoop, tryEvery);
}

tryLoop();