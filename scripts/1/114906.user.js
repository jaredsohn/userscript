// ==UserScript==
// @name Delayed Gratification
// @namespace
// @description Based on http://xkcd.com/862/
// @copyright Justin A. Tisi; justintisi@hotmail.com
// @include http*://slashdot.org/*
// @include http*://*.slashdot.org/*
// @include http*://*.facebook.com/*
// @include http://*.collegehumor.com/*
// @include http://*.hulu.com/*
// @include http://*.youtube.com/*
// ==/UserScript==

var effectStart = 22.5; // This is the hour of the day when we start to show a mask
var effectEnd = 7;
var delayInSeconds = 30;

// Check if we are in the time when we should be showing the mask
var nowDate = new Date();
// Add 24 to the effectEnd hour until it is after effectStart
while (effectEnd < effectStart) {
	effectEnd += 24;
}
// Similarly for the current time
var nowHours = nowDate.getHours() + (nowDate.getMinutes() / 60) + (nowDate.getSeconds() / (60*60));
while (nowHours < effectStart) {
	nowHours += 24;
}

if (nowHours >= effectEnd) {
	return;
}

// Construct the mask
var mask = document.createElement('div');
mask.id = 'xkcd862-mask';
mask.innerHTML = '<span style="color:white; opacity: 1">Masking for ' + delayInSeconds + ' seconds.</span>';
mask.style.textAlign = 'center';

mask.style.position = 'fixed';
mask.style.top = '0px';
mask.style.left = '0px';
mask.style.height = '100%';
mask.style.width = '100%';
mask.style.backgroundColor = '#000000';
mask.style.zIndex = 1000000;

document.body.appendChild(mask);

// window.setTimeout only works on pages where javascript is allowed to run
// on the principal domain of the page being accessed.  But I run NoScript and
// disallow javascript to be run on some of those pages, so we need a busy-wait
// implementation of timeout.
// The naive busy-wait that loops until some time has passed actually freezes the
// browser, so instead we add a request to a collection here, and check the collection
// for completion on keypress and mousemove events, as well as trying to use setTimeout.
var nextTimeoutId = 0;
var timeoutRequests = {};
var checkTimeouts = function() {
	for (var id in timeoutRequests) {
		var request = timeoutRequests[id];
		var now = new Date().getTime();
		if (request.end < now) {
			delete timeoutRequests[id];
			request.fn();
		}
	}
};
window.addEventListener('keypress', checkTimeouts, false);
window.addEventListener('mousemove', checkTimeouts, false);

var fakeTimeout = function(callback, delay) {
	var start = new Date().getTime();
	timeoutRequests[++nextTimeoutId] = {
		fn: callback,
		end: start + delay
	};
	window.setTimeout(checkTimeouts, delay + 10);
};

fakeTimeout(function() {
	document.body.removeChild(mask);
}, delayInSeconds * 1000);
