// ==UserScript==
// @name            Goop!
// @description     Tweaks for Google+
// @license         MIT
// @longdesc        Tweaks and modifications for Google+ to improve user experience.
// Features:
// * Most pages now center aligned
// * Most pages are now wider (and the blank space to the right of all pages is gone)
// * Profile pages are now shuffled around a bit for increased visibility
// * Images and videos now are centered around a black background (as they used to be)
// @include         https://plus.google.com*
// @run-at          document-start
// @unwrap
// @version         2012.6.20
// ==/UserScript==

// todo: Ask google to use this layout :P
// todo: Enhance Profile->About
// todo: Make Profile->Photos resize properly

var goop_added = 0;

function doCss(event) {
	if(goop_added == 0) {
		goop_added = 1;

		// Center-align most stuff
		GM_addStyle(".PK { display: block; height: 59px; position: relative; float: center; }");
		GM_addStyle(".KO { position: relative; width: 100%; }");
		GM_addStyle(".uY { margin-left: 17%; }");

		// Make feeds wider
		GM_addStyle(".orZBjd { width: 90%; }");
		GM_addStyle(".Sea { margin: 0px 117px 0px 253px; }");
		GM_addStyle(".xj { width: 100%; }");
		GM_addStyle(".Gb { width: 100%; }");
		GM_addStyle(".OT { margin: 0px -185px; width: 100%; }");
		GM_addStyle(".qv { width: 100%; }");
		GM_addStyle(".hea { margin-left: 6px; }");
		GM_addStyle(".Pea { width: 100%; }");
		GM_addStyle(".h8 { margin: 0px 185px; width: auto; }");
		GM_addStyle(".zda { width: 100%; }");

		GM_addStyle(".h8 > .Sea { margin: 16px -67px 0px 68px; }");
		//GM_addStyle(".Ue { margin-left: -185px; width: 100%; }");
		GM_addStyle(".i5 { margin-left: -185px; width: 100%; }");
		GM_addStyle(".tpa.a-gb-ya { margin: 0px 185px; width: auto; }");

		// Adjust profile page positioning
		GM_addStyle(".P7 { left: auto; top: -0.1%; right: 10px; }");
		GM_addStyle(".P7 .uY { padding-left: -10px; margin-left: 0%; }");
		GM_addStyle(".Yoa { width: 251.2%; }");
		GM_addStyle(".kw { width: 251.2%; }");
		GM_addStyle(".bM { width: 96%; }");
		//GM_addStyle(".dM { width: 940px; }");
		GM_addStyle(".Xoa { width: 100%; }");
		GM_addStyle(".LP { width: 100%; }");
		GM_addStyle(".Foa { width: auto; }");
		GM_addStyle(".tpa.a-gb-ya { margin: 0px 185px; width: auto; }");
		GM_addStyle("div[id*='-about-page'] { margin: 0px 185px; width: 100%; }");
		GM_addStyle("div[id*='-photos-page'] { margin: 0px 185px; width: 100%; }");
		GM_addStyle("div[id*='-videos-page'] { margin: 0px 185px; width: 100%; }");
		GM_addStyle("div[id*='-plusones-page'] { margin: 0px 185px; width: auto; }");

		// Clean up hangouts
		GM_addStyle(".TNa { float: left; }");
		GM_addStyle(".Wxa { margin: 0px 185px; width: auto; }");

		// Widen Local
		GM_addStyle(".vvb { width: 97.5%; }");
		GM_addStyle(".ywb { width: 75%; }");
		GM_addStyle(".wwb { width: 100%; }");
		GM_addStyle(".RqDjTd { width: 75%; }");
		GM_addStyle(".s5a { width: 25%; }");
		GM_addStyle(".s5a .cTa { width: 70%; }");
		GM_addStyle(".iJa { width: 70%; }");
		GM_addStyle(".ezb { width: 85%; }");
		GM_addStyle(".ZgxBN { width: 71%; }");
		GM_addStyle(".NknQs { width: 80%; }");

		// Games clean up
		GM_addStyle(".Fga { width: 97.5%; }");
		GM_addStyle(".Iga { padding-left: 22%; }");
		GM_addStyle(".Hnb { margin: 0px 185px; width: auto; }");
		GM_addStyle(".Inb { margin: 0px 185px; width: auto; }");

		// Pages clean up
		GM_addStyle(".w0 { width: 100%; }");
		GM_addStyle(".Dka { width: 98.8%; }");
		GM_addStyle(".tka { width: 100%; }");
		GM_addStyle(".rka { width: 86.20%; }");
		GM_addStyle(".iIb { width: 80%; }");
		GM_addStyle(".IBb { width: 100%; }");
		GM_addStyle(".c4a { width: 100%; }");
		GM_addStyle(".vAb { width: 100%; }");
		GM_addStyle(".uAb { width: 85%; }");
	}
}

function doHtml(event) {
	var divs = document.getElementsByTagName("div");
	var patt1 = new RegExp("^bn Ag");
	var patt2 = new RegExp("max-width:.*;h");
	var patt3 = new RegExp("width:.*;h");
	var patt4 = new RegExp("max-width:.*;m");
	var patt5 = new RegExp("width:.*;m");
	var patt6 = new RegExp("^l-Uw zda");
	var patt7 = new RegExp("^n-M-We");
	for(var i = 0; i < divs.length; i++) {
		var classes = divs[i].getAttribute("class");
		if(patt1.test(classes)) {
			var style = divs[i].getAttribute("style");
			style = style.replace(patt2, "h");
			style = style.replace(patt3, "h");
			style = style.replace(patt4, "m");
			style = style.replace(patt5, "m");
			divs[i].setAttribute("style", style);
		}
		if(patt6.test(classes) || patt7.test(classes)) {
			var style = divs[i].getAttribute("style");
			style = "";
			divs[i].setAttribute("style", style);
		}
	}
}

// Obvious
window.onload = doCss;
// For loading feed
window.onscroll = doHtml;

