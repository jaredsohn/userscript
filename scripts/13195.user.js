// ==UserScript==
// @name           FixGmailBar
// @namespace      DynamicStep
// @description    Fix the Gmail Toolbar at the top of the screen, so it is always displayed
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// ==/UserScript==

/** User Preferences **/
var barBorderBottomStyle = '1px solid #aaf';
var barBackgroundColor = '#f5f5ff';


/** Code **/
fixGmailBar();
window.setInterval(fixGmailBar, 100);

function fixGmailBar() {
	if(!frames[0]) return;
	for(i = 0; i<3; i++){
		if(!frames[0].frames[i]) continue;
		var subDoc = frames[0].frames[i].document;

		var extraMenuFrame = subDoc.getElementById("gbi");		
		if(extraMenuFrame && extraMenuFrame.style) {
			extraMenuFrame.style.position = "fixed";
		}

                //The Element will only be created in this iframe once
		if(subDoc.getElementById("fixedGmailBar")) continue;

		var newBar = subDoc.createElement("div");
		newBar.id = "fixedGmailBar";
		newBar.style.position = "fixed";
		newBar.style.top = "0px";
		newBar.style.width = "100%";
		newBar.style.borderBottom = barBorderBottomStyle;
		newBar.style.zIndex = "2000";
		newBar.style.backgroundColor = barBackgroundColor;
	
		var lastDiv;
		var divs = new Array("gbar", "gbh", "guser");
		for(var i = 0; i<divs.length; i++){
			var div = subDoc.getElementById(divs[i]);
			if(!div) continue;
			div.style.border = 'none';
			lastDiv = div;
			var newSub = div.cloneNode(true);
			newBar.appendChild(newSub);
			div.style.display = "none";
		}
		var fc = subDoc.getElementById('fc');
		if(fc) lastDiv = fc;
		if(!lastDiv || !lastDiv.style) return;	
		var spacer = subDoc.createElement("div");
		spacer.style.height="1.5em";
		spacer.id = "fixedGmailBarSpacer";

		var body = subDoc.getElementsByTagName("body")[0];
		if(!body) return;
		body.appendChild(newBar);
		body.insertBefore(spacer, lastDiv);
	}
}
	

