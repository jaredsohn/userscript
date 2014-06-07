// <![CDATA[

// ==UserScript==
// @name    Ikariam Bigger Map
// @author    htmlapps
// @namespace    http://html-apps.com/gm/ikariam
// @description    It's oliezekat's Double Map script, only bigger.  http://userscripts.org/users/oliezekat http://userscripts.org/scripts/show/46823
// @license    http://creativecommons.org/licenses/by-sa/3.0/us/
// @version    5
// @include    http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/*?view=premium
// @exclude    http://*.ikariam.*/*?view=premiumPayment
// @exclude    http://*.ikariam.*/pillory.php
// @exclude    http://ikariam.ogame-world.com/*
// @exclude    http://www.ika-world.com/*
// @exclude    http://ikariamap.com/*
// @exclude    http://support.ikariam.*/*
// ==/UserScript==

if (!DoubleMap) var DoubleMap = {};

DoubleMap =
	{
	View: ''
	};
	
DoubleMap.Init = function()
	{
	// Fetch view name
	try
		{
		DoubleMap.View = document.getElementsByTagName("body")[0].id;
		}
	catch (e)
		{
		var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
		if (url_view != null) DoubleMap.View = RegExp.$1;
		}
	
	if (DoubleMap.View =='worldmap_iso')
		{
		DoubleMap.Set_Styles();
		}
	};
	
DoubleMap.Set_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	#worldmap_iso #scrollcover { height: 740px !important; width: 1200px !important;}
	#worldmap_iso #dragHandlerOverlay { height: 900px !important; width: 1260px !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};

DoubleMap.Init();

// ]]>
