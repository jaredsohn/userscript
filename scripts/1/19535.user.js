// CNN Video Aspect Ratio Fix user script
// version 0.3 BETA!
// 2008-03-19
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "CNN Video Aspect Ratio Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CNN Video Aspect Ratio Fix
// @namespace     http://yyankov.org/projects/greasemonkey/
// @description   Increases the height of cnn.com/video flash player, fixing the aspect ratio to 4:3 or other
// @include       http://*.cnn.com/video/*
// @include       http://*.cnn.com/*#cnnSTCVideo
// ==/UserScript==

function createButton(btnId, btnLabel, action, container)
{
		btn = document.getElementById(btnId);
		if (!btn)
		{
			btn = document.createElement("input");
			btn.type = "button";
			btn.value = btnLabel;
			btn.id = btnId;
			btn.addEventListener("click", action, true);
			container.parentNode.appendChild(btn);
		}
}

function fixIt(baseHeight)
{
	var el1 = document.getElementById("cnnVPFlashLargeContainer");
	var el2 = document.getElementById("CNN_PLAYERDHTMLViewport");
	var el21 = document.getElementById("DHTMLCNN_PLAYER");
	var el3 = document.getElementById("FlashCNN_PLAYER");
	var el4 = document.getElementById("cnnVPHeightDiv");

	if (el1 && el2 && el4)
	{
		el1.style.height = baseHeight + "px";
		el2.style.height = baseHeight + "px";
		if (el21)
			el21.style.height = baseHeight + "px";
		el4.style.height = (baseHeight + 140) + "px";
		
		images = el2.getElementsByTagName("img");
		if (images.length > 0)
			images[0].height = baseHeight;
			
		createButton("asp_rat_btn1", "Default", adjustToWide, el4);
		createButton("asp_rat_btn2", "Normal", adjustToNormal, el4);
		
		dd = document.getElementById("arDDL");
		if (!dd)
		{
			dd = document.createElement("select");
			dd.id = "arDDL";
			createCustomSizes(dd);
			dd.addEventListener("change", adjustToCustomSize, true);
			el4.parentNode.appendChild(dd);
		}
	}
		else return;
	
	if (!el3) return;
	
	el3.height = baseHeight;
	window.clearInterval(window.mytimer);
}

function createOption(p, s)
{
	o = document.createElement("option");
	o.value = s;
	o.innerHTML = s;
	p.appendChild(o);
}

function wideScreen()
{
	fixIt(324);
}

function normalView()
{
	fixIt(420);
}

function customSize()
{
	var helem = document.getElementById("arDDL");
	if (helem)
	{
		h = helem.value * 1;
		fixIt(h);
	}
}

function adjustVideoSize(method)
{
	if (window.mytimer)
		window.clearInterval(window.mytimer);
		
	window.mytimer = window.setInterval(method, 1000);
}

function adjustToNormal()
{
	adjustVideoSize(normalView);
}

function adjustToWide()
{
	adjustVideoSize(wideScreen);
}

function adjustToCustomSize()
{
	adjustVideoSize(customSize);
}

// Modify these values or add your own if you need different heights
function createCustomSizes(sel)
{
	createOption(sel, "324");
	createOption(sel, "380");
	createOption(sel, "400");
	createOption(sel, "420");
	createOption(sel, "460");
}

adjustToNormal();