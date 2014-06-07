// Ad Blocker
// version 1.0
// 2005-06-22
// Copyright (c) 2005, Reify
//
// --------------------------------------------------------------------
//
// This user script hides advertisements.
//
// To install for Internet Explorer, you need Turnabout:
// http://www.reifysoft.com/turnabout.php
// See instructions for using Turnabout here:
// http://www.reifysoft.com/turnabout.php?p=u
//
// To install for Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ad Blocker
// @namespace     http://www.reifysoft.com/?scr=adblocker
// @description   Block advertisements
// @include       *
// ==/UserScript==

// ==Setup==
// The script dialog will invoke this function.  It should get ignored by GM
function ScriptSetup(appendTo)
{
	createOptionInput(appendTo, "Block items from known ad servers", "blockAdHosts", true);
	createOptionInput(appendTo, "Block items with common banner sizes", "blockBannerSizes", true);
	createOptionInput(appendTo, "Test mode (highlight ads rather than removing them)", "test", false);
}

function createOptionInput(appendTo, labelText, bindVar, defaultVal)
{
	var wrapper = document.createElement("p");
	wrapper.style.paddingLeft = "22px";
	wrapper.style.textIndent = "-22px";

	var label = document.createElement("label");
	label.htmlFor = "reify-adBlocker-setupOption-" + bindVar;
	label.appendChild(document.createTextNode(labelText));

	var input = document.createElement("input");
	input.id = "reify-adBlocker-setupOption-" + bindVar;
	input.bindVar = bindVar;
	input.type = "checkbox";
	input.onclick = setBoundVar;

	wrapper.appendChild(input);
	wrapper.appendChild(label);
	appendTo.appendChild(wrapper);

	input.checked = GM_getValue(bindVar, defaultVal);
}

function setBoundVar()
{
	GM_setValue(this.bindVar, this.checked);
}

// ==/Setup==


var adRemovalPass = 0;

var Options = {
	DEBUG: false,
	BENCHMARK: false,
	CLOSE_POP_UPS: document.all != undefined,
	BLOCK_AD_HOSTS: GM_getValue("blockAdHosts", true),
	BLOCK_BANNER_SIZES: GM_getValue("blockBannerSizes", true),
	DEBUG_OUTLINE: GM_getValue("test", false)
};

var affectedElements = new Array();

// Ad elements:
//  - Elements commonly used for ads
//  - Blocked ad sources
var AdElements =
{
	adTagNames:
	[
		"a",
		"img",
		"iframe",
		// "script",
		"embed",
		"object"
	],

	blockedSrcs: new RegExp(
	[
		// Paths
		"//ads\.",
		"/ad/",
		"/adclick",	// "/adclick/" and "/adclick.php" both seen in the wild
		"/ads/",
		"/advertisers/",
		// "/banners/",
		"/klipmart/",
		"/sponsors/",

		// Filenames
		"ad_banner",

		// Hosts
		"2mdn\.net",
		"clk\.about\.com",
		"z\.about\.com/0/ip/",
		"adbrite\.com",
		"addynamix\.com",
		"adknowledge\.com",
		"adlegend\.com",
		"adlog\.com\.com",
		"adserver\.com",
		"adsonar\.com",
		"advertising\.com",
		"atdmt\.com",
		"atwola\.com",
		"blogads\.com",
		"casalemedia\.com",
		"centrport\.net",
		"creatives\.as4x\.tmcs\.net",	// CitySearch
		"cl\.cnn\.com/ctxtlink",	// CNN contextual links
		"directorym\.com",
		"doubleclick\.net",
		"emarketmakers\.com",
		"falkag\.net",
		"fastclick\.net",
		"feedstermedia\.com",
		"mads\.gamespot\.com",
		"gms1\.net",
		"googlesyndication\.com",
		"hitbox\.com",
		"industrybrains\.com",
		"insightexpress\.com",
		"intellitxt\.com",
		"kanoodle\.com",
		"klipmart\.com",
		"kliptracker\.com",
		"linkshare\.com",
		"click\.linksynergy\.com",
		"maxserving\.com",
		"msads\.net",
		"rad\.msn\.com",
		"pointroll\.com",
		"primaryads\.com",
		"qksrv\.net",
		"rightmedia\.com",
		"adsremote\.scripps\.com",
		"serving-sys\.com",
		"spylog\.com",
		"trafficmp\.com",
		"tribalfusion\.com",
		"vpptechnologies\.com",	// Intellitxt
		// "public\.wsj\.com/marketing/",
		"yieldmanager\.com",	// Rightmedia
		"ystweb\.com",
		"zedo\.com"
	].join("|")),

	blockedIds:
	[
		"adbrite",
		"adstrip",	// kuro5hin.org's blogads
		"cnnTravelot",	// cnn.com
		"overtureIframe",	// wsj.com
		"spons-links"	// forbes.com
	],

	hideBlockedIds: function()
	{
		for (var i in AdElements.blockedIds)
		{
			var el = document.getElementById(AdElements.blockedIds[i]);
			if (el) removeAd(el);
		}
	},

	isBlocked: function(el)
	{
		var testThis = el.src ? el.src : (el.href ? el.href : el.value);
		if (!testThis) return false;
		return AdElements.blockedSrcs.test(testThis.toLowerCase());
	}
};

function Dimension(w, h)
{
	this.w = w;
	this.h = h;
}

Dimension.prototype.equals = function(w, h)
{
	return this.w == w && this.h == h;
}

var Banners =
{
	knownSizes:
	[
		new Dimension(728, 90),	// Leaderboard
		new Dimension(468, 60),	// Full banner
		new Dimension(392, 72),	// Full banner w/ nav bar
		new Dimension(234, 60),	// Half banner

		new Dimension(120, 240),	// Vertical banner
		new Dimension(240, 400),	// Vertical rectangle
		new Dimension(180, 150),	// Rectangle
		new Dimension(300, 250),	// Medium rectangle
		new Dimension(336, 280),	// Large rectangle

		new Dimension(300, 600),	// Half-page ad
		new Dimension(160, 600),	// Wide skyscraper
		new Dimension(120, 600),	// Skyscraper

		new Dimension(250, 250),	// Square pop-up
		new Dimension(125, 125),	// Square button
		// new Dimension(120, 90),	// Button 1
		// new Dimension(120, 60),	// Button 2
		new Dimension(88, 31)	// Micro button
	],

	isBanner: function(el)
	{
		if (!(el.width && el.height))
			return false;

		for (var i = 0; i < Banners.knownSizes.length; i++)
		{
			if (Banners.knownSizes[i].equals(el.width, el.height))
			{
				if (Options.DEBUG) GM_log("Banner size: " + el.src + ", " + el.width + "x" + el.height);
				return true;
			}
		}

		if (Options.DEBUG) GM_log("Not a banner size: " + el.src + ", " + el.width + "x" + el.height);

		return false;
	}
};

function closePopUp()
{
	// document.all b/c this crashes Firefox.
	if (opener && AdElements.blockedSrcs.test(location.href.toLowerCase()))
	{
		if (Options.DEBUG) GM_log("*** Closing pop-up");
		self.close();
		return true;
	}

	return false;
}

window.reify_adBlocker_removeAds = function()
{
	if (Options.DEBUG) GM_log("Pass #" + adRemovalPass++);

	if (Options.BENCHMARK)
	{
		var d1 = new Date();
		var d1_ms = Date.parse(d1.toString()) + d1.getMilliseconds();
	}

	if (Options.CLOSE_POP_UPS && closePopUp()) return;

	AdElements.hideBlockedIds();

	if (Options.BLOCK_AD_HOSTS || Options.BLOCK_BANNER_SIZES)
		blockGeneric();

	try
	{
		if (affectedElements.length > 0)
			TB_setStatusText("Removed " + affectedElements.length + " ad" + (affectedElements.length == 1 ? "" : "s"));
	}
	catch (e) { }

	if (Options.BENCHMARK)
	{
		var d2 = new Date();
		var d2_ms = Date.parse(d2.toString()) + d2.getMilliseconds();
		GM_log("Ad blocking took " + (d2_ms - d1_ms) + " ms");
	}
}

function blockGeneric()
{
	for (var i = 0; i < AdElements.adTagNames.length; i++)
	{
		var tagName = AdElements.adTagNames[i].toLowerCase();
		var els = document.getElementsByTagName(tagName);

		for (var j = 0; j < els.length; j++)
		{
			var el = els[j];
			if
			(
				!Options.DEBUG_OUTLINE && getStyle(el, "display") == "none" ||
				Options.DEBUG_OUTLINE && getStyle(el, "borderColor") == "red"
			)
				continue;

			if
			(
				(Options.BLOCK_AD_HOSTS && AdElements.isBlocked(el)) ||	// src, href, or value is blocked
				(Options.BLOCK_BANNER_SIZES && Banners.isBanner(el))	// is a common banner size
			)
			{
				if (Options.DEBUG) GM_log("*** Removing ad: " + tagName + ".src = " + el.src + ", " + tagName + ".href = " + el.href + ", value = " + el.value);

				if (tagName == "script")
					removeAdScript(el);
				else if (tagName == "a")
					removeAdsFromAnchor(el);
				else
					removeMiscAd(el);
			}
			else
			{
				if (Options.DEBUG) GM_log("Not an ad: " + tagName + ".src = " + el.src + ", " + el.offsetWidth + "x" + el.offsetHeight);
			}
		}
	}
}


function removeAdScript(el)
{
	// This approach should leave the DOM alone.
	// OTOH, since this script has probably already run...
	// it doesn't do anything either.
	if (el.innerHTML && el.innerHTML.length > 0) el.innerHTML = "";
	if (el.src && el.src.length > 0) el.src = "";
	// el.parentNode.removeChild(el);

	affectedElements.push(el);
}

function removeAdsFromAnchor(el, n)
{
	var banners = el.getElementsByTagName("img");
	for (var i = 0; i < banners.length; i++)
	{
		removeAd(banners[i]);
		affectedElements.push(banners[i]);
	}
}

function removeMiscAd(el)
{
	removeAd(el);
	affectedElements.push(el);
}

function removeAd(el)
{
	if (Options.DEBUG_OUTLINE) el.style.border = "4px solid red";
	else el.style.display = "none";
}

// Thanks to PPK from Quirksmode.
function getStyle(someElement, styleProp)
{
	if (document.defaultView)	// Netscape way
		return document.defaultView.getComputedStyle(someElement, null).getPropertyValue(styleProp);
	else if (someElement.currentStyle)	// MS way
		return eval('someElement.currentStyle.' + styleProp);
	else
		return null;
}

window.reify_adBlocker_removeAds();
// removeAds();
setTimeout("window.reify_adBlocker_removeAds()", 1000);