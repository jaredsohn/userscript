//	-*- Mode: Javascript; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 2 -*-
/*******************************************************************************
	(C)2011+ TriMoon Inc.
	Authors:	TriMoon <http://claimid.com/trimoon>

	This work is licensed under a Creative Commons License !
	See: http://creativecommons.org/licenses/by-nc-nd/3.0/

	script-icon converted after manual manipulation by TriMoon from:
	""
	(Still needs manual manipulation to convert the surrounding white to transparent.)

	See also:
		http://wiki.greasespot.net/Metadata_Block
		http://www.greywyvern.com/code/php/binary2base64
		http://www.loc.gov/standards/iso639-2/php/code_list.php
*******************************************************************************/
// ==UserScript==
// @name				FB GM run logger
// @description	Logs addresses that GreaseMonkey runs on Facebook to console
// @namespace		claimid.com/trimoon
// @run-at			document-start
// @include			/^https?:\/\/((\w+\.)*)\w+\.(facebook|fbcdn)\.(com|net)\//
// @license			http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version			1.0.0
// ==/UserScript== 
// @icon 
try{
	console.log("GreaseMonkey running on FB: '" + unsafeWindow.location.protocol+"//" + unsafeWindow.location.host + unsafeWindow.location.pathname + "'");
}catch(e){}
