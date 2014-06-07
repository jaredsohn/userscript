// ==UserScript==
// @name         youtu2be
// @description  ...
// @namespace    http://example.com/youtu2be
// @include      *
// @grant        none
// @version      20130416
// ==/UserScript==

// changing iframes
console.log("Changing iframes");
var iframes = document.getElementsByTagName("IFRAME");

for(var i = 0; i < iframes.length; i++) {
	var changed = false;
	var v = iframes.item(i);
	var before = v.src;
	
	// the order of the replaces matters!
	v.src = v.src.replace(/www\.youtube\.com/g, function (txt) {
		changed = true;
		return "youtu.be.";
	});
	
	v.src = v.src.replace(/youtube\.com/g, function (txt) {
		changed = true;
		return "youtu.be.";
	});
	
	if(changed) {
		console.log(before + " -> " + v.src);
	}
}

// changing links
var as = document.getElementsByTagName("A");
for(var i = 0; i < as.length; i++) {
	var changed = false;
	var v = as.item(i);
	var before = v.href;
	
	// the order of the replaces matters!
	v.href = v.href.replace(/www\.youtube\.com/g, function (txt) {
		changed = true;
		return "youtu.be.";
	});
	
	v.href = v.href.replace(/youtube\.com/g, function (txt) {
		changed = true;
		return "youtu.be.";
	});
	
	if(changed) {
		console.log(before + " -> " + v.href);
	}
}