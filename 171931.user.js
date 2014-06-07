// ==UserScript==
// @name			HKGalden icon extension
// @namespace		galdenson
// @version			1.0.3.1
// @description		add icons
// @match			https://hkgalden.com/view*
// @match			http://hkgalden.com/view*
// @match			https://hkgalden.com/reply*
// @match			http://hkgalden.com/reply*
// @match			https://m.hkgalden.com/reply*
// @match			http://m.hkgalden.com/reply*
// @match			https://hkgalden.com/post*
// @match			http://hkgalden.com/post*
// @match			https://m.hkgalden.com/post*
// @match			http://m.hkgalden.com/post*
// @updateURL		http://userscripts.org/scripts/source/171931.meta.js
// @downloadURL		https://userscripts.org/scripts/source/171931.user.js
// ==/UserScript==

var cloneIDs = ["_PKM", "_LM", "_WP", "_SG", "_XMas", "_GH", "_Pixel"];	// need to match directories, iconSets, resizedWidths and imageSizes
var numOfIconSets = cloneIDs.length;
// directories is only use for shortening corresponding iconSet and better readability
// the number should match but can be left as "" 
var directories = ["https://na.cx/", "https://i.na.cx/ncimg/i1306/", "https://na.cx/", "https://i.na.cx/ncimg/i1306/", "https://na.cx/", "https://na.cx/", "https://na.cx/"];
var iconSets = [];
// each set should have 46 icons
iconSets[0] = ["cMh", "dIV", "cMj", "cMl", "cMn", "dGV", "cMm", "dIU", "cMT", "e5f", "cMi", "cMg", "dGV", "cMp", "cMu", "cMw", "cMq", "cMr", "cMs", "cMv", "cMt", "cMA", "cUX", "cMx", "cME", "cUY", "cNL", "dGV", "dGV", "cMY", "cMH", "cMN", "epH", "cML", "dGV", "cMP", "cN5", "cN1", "cMK", "cMF", "cMO", "cMG", "cMI", "cMM", "dbx", "cMJ"];
iconSets[1] = ["nJzU.gif", "cgPR.gif", "xo54.gif", "vCrv.gif", "S3Nm.gif", "5WAd.gif", "0zM5.gif", "ys4v.gif", "3SCc.gif", "P56J.gif", "et9H.png", "N95c.gif", "et9H.png", "et9H.png", "yx82.gif", "DGSD.gif", "7JSa.gif", "xJye.gif", "SR10.gif", "et9H.png", "22W5.gif", "2g57.gif", "fMAY.gif", "3Xnf.gif", "52q7.gif", "EB6u.gif", "4sdU.gif", "5n92.gif", "25zJ.gif", "B2yC.gif", "9bE5.gif", "et9H.png", "5V1z.gif", "MR2d.gif", "7cbX.gif", "AopR.gif", "unsY.gif", "1Gtn.gif", "2MpK.gif", "Coo7.gif", "Yoqa.gif", "q9vV.gif", "y66Q.gif", "Z87F.gif", "hrv0.gif", "HZpX.gif"];
iconSets[2] = ["dZz", "fW6", "fVm", "dZC", "dZw", "fWU", "dZD", "dZB", "fVh", "fW7", "dZx", "dZN", "dZQ", "dZM", "dZP", "dZS", "dZO", "dZR", "dZY", "dZX", "e0d", "dZW", "e02", "e0j", "e0e", "e03", "e06", "fVk", "fVw", "e04", "fWc", "e05", "e0c", "dZZ", "e0b", "fVi", "e0l", "e0h", "e0i", "e0m", "e0o", "e0g", "e0n", "e0q", "fVn", "e0p"];
iconSets[3] = ["SE69.gif", "R31R.gif", "55hh.gif", "TwE4.gif", "80d7.gif", "sRDY.gif", "301S.gif", "FQhn.gif", "u0gq.gif", "9dPC.gif", "8xe6.gif", "mstJ.gif", "fy6x.gif", "Q63m.gif", "30vb.gif", "spL8.gif", "A44k.gif", "tHm3.gif", "C8nM.gif", "K5fc.gif", "5n4r.gif", "3CBW.gif", "97NF.gif", "1KCS.gif", "FqZ3.gif", "5FTQ.gif", "keKD.gif", "n7mi.gif", "Mh50.gif", "UTo6.gif", "9hF6.gif", "Zoxb.gif", "kjw2.gif", "TOvK.gif", "THvB.gif", "7mhK.gif", "hrtd.gif", "1r1f.gif", "96CA.gif", "hges.gif", "gR3J.gif", "3U9d.gif", "dFaO.gif", "o2o4.gif", "s5Ua.gif", "8458.gif"];
iconSets[4] = ["e3I", "e3U", "e3O", "e3G", "e3Q", "e3H", "e3J", "e3P", "e3N", "e3T", "e3R", "e3K", "e3V", "e3W", "e3L", "e40", "e41", "e4c", "e48", "e4f", "e4i", "e4g", "e43", "e3M", "e44", "e4b", "e49", "e42", "e4d", "e45", "e4h", "e4e", "e4a", "e7a", "e46", "e4p", "e4j", "e79", "e4t", "e4k", "e4r", "e4q", "e4m", "e4s", "e4u", "e4n"];
iconSets[5] = ["e7I", "e7G", "e7C", "e7R", "e7J", "e7F", "e7v", "e7H", "e7L", "e7y", "e7B", "e7u", "e7D", "e7M", "e7A", "e7z", "e7S", "e83", "e80", "e7Z", "e7X", "e7Y", "e82", "e7E", "e88", "e84", "e8b", "e7V", "e89", "e7W", "e7U", "e86", "e7T", "e85", "e8a", "e8e", "e8q", "e8l", "e8h", "e8k", "e8f", "e8i", "e8g", "e8o", "e8j", "e8p"];
iconSets[6] = ["egy", "egx", "egz", "egE", "egA", "egC", "egD", "egM", "egB", "egJ", "egH", "egL", "egK", "egN", "egO", "5LI", "egF", "egG", "egI", "egP", "egQ", "egR", "f6j", "egw", "egU", "egS", "egT", "egW", "egV", "eh8", "egZ", "eh9", "eh2", "egY", "eh3", "eh1", "eh0", "eha", "eh4", "ehc", "ehe", "ehb", "ehg", "ehh", "ehf", "ehi"];
// used for the button switching icon sets
var resizedWidths = ["22px", "16px", "16px", "16px", "16px", "16px", "16px"];
// for better layout
var imageSizes = [1, 0.75, 0.75, 0.75, 1, 1, 1];

var $ = function (selector) {
	return document.querySelector(selector);
}

var $$ = function (selector) {
	return document.querySelectorAll(selector);
}

function scrollIntoReply() {
	if ($("#fast_reply")) {
		$("#fast_reply").scrollIntoView(false);
	}
}

function cloneNodeWithID(id, idSuffix, parent, insertBefore) {
	var clone = $("#"+id).cloneNode(true);
	if (parent) {
		if (insertBefore) {
			parent.insertBefore(clone, insertBefore);
		} else {
			parent.appendChild(clone);
		}
	}
	clone.id += idSuffix;
	return clone;
}

function chooseActions(btn, idSuffix, iconSet) {
	var btnParent = btn.parentNode;
	if ("cke_18"+btnParent.chosenBtn == btn.id) {
		if (btnParent.allHidden) {
			// EmoTray shown, scroll into reply
			btnParent.allHidden = false;
			scrollIntoReply();
		} else {
			// EmoTray hidden
			btnParent.allHidden = true;
		}
	} else {
		// change icon set, if EmoTray was hidden, scroll into reply
		changeIconSet(idSuffix, iconSet);
		if (btnParent.allHidden) {
			btnParent.allHidden = false;
			scrollIntoReply();
		}
	}
}

function changeIconSet(suffix, iconSet) {
	if (!$("#EmotionTray"+suffix+"_ready")) {
		// initialize
		var icons = $$("#EmotionTray"+suffix+" a");
		var l = icons.length;
		for (var j = 0; j < l; j++) {
			icons[j].setAttribute("data-code", "[img]"+iconSet[j]+"[/img]");
			var img = icons[j].childNodes[0];
			img.src = iconSet[j];
			img.onload = function () {this.setAttribute("width", this.naturalWidth*imageSizes[cloneIDs.indexOf(suffix)]);};
		}
		$("#EmotionTray"+suffix).id += "_ready";
		// clean arrays
		iconSet = [];
	}
	// swap id, hide old EmotionTray and show new one
	var btnParent = $("#cke_18").parentNode;
	$("#EmotionTray").style.display = "none";
	$("#EmotionTray").id += btnParent.chosenBtn+"_ready";
	btnParent.chosenBtn = suffix;
	$("#EmotionTray"+suffix+"_ready").id = "EmotionTray";
	$("#EmotionTray").style.display = "block";
}

function addIcons() {
	var iconBtn = $("#cke_18");
	var toolgroup = iconBtn.parentNode;

	// original icons chosen and shown by default
	iconBtn.parentNode.chosenBtn = "";
	iconBtn.parentNode.allHidden = false;

	// clone button and change icons onclick
	for (var i = 0; i < numOfIconSets; i++) {
		var tempLength = iconSets[i].length;
		var directory = directories[i];
		for (var j = 0; j < tempLength; j++) {
			iconSets[i][j] = directory+iconSets[i][j];
		}
		var cloneID = cloneIDs[i];
		var cloneBtn = cloneNodeWithID("cke_18", cloneID, toolgroup, false);
		cloneBtn.querySelector("#cke_18_label").id += cloneID;
		var preview = cloneBtn.getElementsByClassName("cke_button_icon")[0];
		preview.style.backgroundImage = "url("+iconSets[i][7]+")";
		preview.style.backgroundSize = resizedWidths[i] + " 16px";
		preview.style.width = resizedWidths[i];
		cloneBtn.addEventListener("click", (function(k) {return function(e){chooseActions(this, cloneIDs[k], iconSets[k]);}})(i), false);
	}

	// add click event to original icon btn
	iconBtn.addEventListener("click", function(e) {chooseActions(this, "")}, false);
}

// reply/post content not yet loaded on run
function contentCheck() {
	if ($("#cke_1_contents")) {
		addIcons();
	} else {
		setTimeout(contentCheck, 300);
	}
}
setTimeout(contentCheck, 300);

// add hidden clones
// run in page scope for the sake of jQuery
var head = $("head");
var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = 'var emoTray = $("#EmotionTray"); ';
for (var i = 0; i < numOfIconSets; i++) {
	script.innerHTML += '\nemoTray.before(emoTray.clone(true).attr("id","EmotionTray'+cloneIDs[i]+'").hide());';
}
head.appendChild(script);