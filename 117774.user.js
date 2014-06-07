// ==UserScript==
// @name          YAGMT - Yet Another GMail Tweaker
// @namespace     http://userstyles.org
// @description	  Just combined some nice tweaks with my own, enjoy...
// @homepage      http://userscripts.org/scripts/show/117774
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// @run-at        document-start
// ==/UserScript==
 
var attempts=0;

(function() {
	KillAds();
	KillMoreAds();
	coloredButtons();
	contrastIncrease();
	messageColor();
	previewPane();
})();

function getNode() {
	var selectors=['.GcwpPb-MEmzyf', '.w-asK.w-atd'],
		i=null;

	for (i=selectors.length-1; i>=0; --i) {
		try {
			return document.querySelector(selectors[i]);
		} catch (e) {}

		try {
			return document
				.getElementById('canvas_frame')
				.contentWindow
				.document
				.querySelector(selectors[i]);
		} catch (e) {}
	}

	return false;
}

// userscripts.org/scripts/review/117468
function KillAds() {
	var node=null;

	if (attempts>=40) return;

	node=getNode();
	if (node) {
		node.style.display='none';
		return;
	}

	++attempts;

	setTimeout(KillAds, 1000);
}

// userscripts.org/scripts/show/108314
function KillMoreAds() {
	GM_addStyle(".mq { display:none; }");
	GM_addStyle(".z0DeRc { display:none; }");
	GM_addStyle(".oM { display:none; }");
	GM_addStyle(".u7 { display:none; }");
}

// userstyles.org/styles/56063/gmail-easy-access-colored-buttons
function coloredButtons() {
	var css = "div[aria-label=\"Delete\"], \ndiv[aria-label=\"Löschen\"],\ndiv[aria-label=\"Smazat\"],\ndiv[aria-label=\"Odstrániť\"] {\n    background-image: -moz-linear-gradient(center top , rgba(255, 128, 128, 0.6), rgba(220, 128, 128, 0.6)) !important;\n}\n\n\n.ar6,              \n.ar8,              \n.asl,              \n.ar9,              \n.ase,              \n.asb,              \n.asf,              \n.adj,              \n.adk,              \n.aos,              \n.hB,               \n           \n.gx,               \n.gq,               \n.g1,               \n.gZ, .eI,          \n.o3.T-I-J3,        \n.ank, .aoc,        \n.anp, .anl,        \n.ana,              \n.yE, .gW,          \n.anh .ane,         \n.end-of-list {\n    background-image: url(\"data:image/png;base64,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\") !important;\n    background-attachment: scroll !important;\n    background-repeat: no-repeat !important;\n    background-color: transparent !important;\n}\n\n\n.ar6 {   background-position: 0 -42px !important; }       \n.ar8 {   background-position: -84px -21px !important; }   \n.asl {   background-position: -42px -42px !important; }   \n.ar9 {   background-position: -63px -42px !important; }   \n.ase {   background-position: -84px -42px !important; }   \n.asb {   background-position: -21px -42px !important; }   \n.asf {   background-position: -63px -21px !important; }   \n.adj {   background-position: -21px -21px !important; }   \n.adk {   background-position: -42px -21px !important; }   \n.aos {   background-position: 0 -21px !important; }       \n.hB {    background-position: 0 -63px !important; }       \n\n\n.gx {        background-position: 0 -84px !important; }      \n.gq {        background-position: -21px -84px !important; }  \n.g1 {        background-position: -84px -63px !important; }  \n.gZ, .eI {   background-position: -63px -63px !important; }  \n.o3.T-I-J3 { background-position: -21px 0px !important; }    \n.ank, .aoc { background-position: -63px -84px !important; }  \n.anp, .anl { background-position: -42px 0px !important; }    \n.ana {       background-position: -63px 0 !important; }      \n.yE, .gW {   background-position: -2px 0 !important; }       \n.anh .ane {  background-position: -84px 0px !important; }";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

// userstyles.org/styles/55793/new-gmail-read-unread-contrast-increase
function contrastIncrease() {
	var css = "";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

// userstyles.org/styles/55603/new-gmail-alternating-message-colors
function messageColor() {
	var css = "div.h7:nth-of-type() div.HprMsc, div.kv:nth-of-type(){ background-color: rgba(0,0,255,0.05) }\n    div.kv div.G2 { background-color: transparent !important; }";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
}

// userscripts.org/scripts/show/109238
function previewPane() {
	GM_addStyle('.Bs .Bu:nth-child(2) { display:none; }');
	GM_addStyle('.Bs .Bu:nth-child(3) { display:none; }');
}