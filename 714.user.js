// ==UserScript==
// @name          Weather Underground Reorganizer
// @namespace     http://gotmarko.com/userscripts/
// @description   Reorganizes Weather Underground pages
// @include       http://*wunderground.com/*
// @include       http://*weatherunderground.com/*
// ==/UserScript==

// This script was inspired by Matthew Gray's Weather Underground script
// (http://mkgray.com:8000/userscripts/wunderground.com.user.js) that moved
// the forecast/conditions information above the header and sidebar.
//
// This script includes the forecast/conditions reorganization from
// Matthew's script and also adds the ability for it to work on global
// pages and radar pages.  Also added are direct links to the animated
// local and regional radar pages on the forecast and local radar
// pages.

// v1 - 050430
//    original version
// v2 - 050907
//    updated for new table layout, added tropical pages
// v3 - 051011
//    updated for new layout on local radar pages, added satellite pages

(function() {

    href = window._content.location.href;

    // main forecast pages
    if (href.match(/underground\.com\/(cgi-bin\/findweather\/getForecast|US|global|tropical\/)/)) {

	// reorganize page - original layout
	//var t1=document.getElementById("Table1");
	//var t3=document.getElementById("Table3");
	//var t4=document.getElementById("Table4");
	//document.body.insertBefore(t4, document.body.firstChild);
	//document.body.insertBefore(t3, document.body.firstChild);
	//document.body.insertBefore(t1, document.body.firstChild);

	// new page layout as of 050907
	var t1=document.getElementById("content");
	if (t1) {
	    document.body.insertBefore(t1, document.body.firstChild);
	}

	// add radar loop links
	addRadarLoopLinks();
    }


    // local radar pages
    if (href.match(/underground.com\/(radar\/radblast|satellite\/vis|cgi-bin\/satblast)/)) {
	//var xpath = '//div[@class="wunderlink"]/.';
	var xpath = '//td[@id="content"]/.';
	var theRadar = document.evaluate(xpath, document, null,
			              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				      null).snapshotItem(0);
	document.body.insertBefore(theRadar, document.body.firstChild);
	addRadarLoopLinks();
    }


    // regional radar pages
    if (href.match(/underground.com\/radar\/mixedcomposite/)) {
	var xpath = '//center[descendant::font/text()[contains(., "Nexrad Mixed Composite")]]/.';
	var theRadar = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	document.body.insertBefore(theRadar, document.body.firstChild);
    }



    function addRadarLoopLinks() {

	var loop, radar, i, item;

	radar = document.evaluate(
	    '//a/text()[contains(., "Local Radar")]',
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i=0; i < radar.snapshotLength; i+=1) {
	    item = radar.snapshotItem(i).parentNode;
	    loop = item.cloneNode(true);
	    loop.innerHTML = '';
	    loop.appendChild(document.createTextNode('(loop)'));
	    loop.href += '&num=20&frame=0&delay=15';
	    item.parentNode.insertBefore(loop, item.nextSibling);
	    item.parentNode.insertBefore(document.createTextNode(' '),
				         item.nextSibling);
	}

	radar = document.evaluate(
	    '//a[descendant::text()[contains(., "Regional Radar")]]/.',
	    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i=0; i < radar.snapshotLength; i+=1) {
	    item = radar.snapshotItem(i);
	    if (item.href.match(/\/mixedcomposite/)) {
		loop = item.cloneNode(true);
		loop.href += '&type=loop';
		loop.innerHTML = loop.innerHTML.replace(/Regional Radar/,
							"(loop)");
		item.parentNode.insertBefore(loop, item.nextSibling);
		item.parentNode.insertBefore(document.createTextNode(' '),
				             item.nextSibling);
	    }
	}

    }

})();
