// Harvard Business Online Ads Remover user script
// version 1.0!
// 2007-03-31
// Copyright (c) 2007, Sathish N
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Harvard Business Online Ads Remover", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	Harvard Business Online Ads Remover
// @namespace      http://www.sathishn.com/projects/HarvardBusinessOnlineAdsRemover/
// @description   	Harvard Business Online Ads Remover and BIG screen freindly
// @include       	http://www.harvardbusinessonline.hbsp.harvard.edu/hbsp/hbr/*
// @include       	http://harvardbusinessonline.hbsp.harvard.edu/hbsp/hbr/*
// ==/UserScript==

function RemoveAds()
{
	document.getElementById('AdLeaderboard').style.display = "none";
	document.getElementById('AdSkyscraper').style.display = "none";
	document.getElementById('internal-ad').style.display = "none";
}

RemoveAds()