// ==UserScript==
// @name		Google Analytics Conversion University Display Times
// @author		Erik Vergobbi Vold
// @datecreated	2009-08-25
// @lastupdated	2009-08-25
// @namespace	gaConversionUniversityShowTime
// @include		http://www.google.com/support/conversionuniversity/*
// @include		http://www.google.com/support/conversionuniversity/?*
// @include		http://www.google.com/support/conversionuniversity/#*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript displays the time beside each lesson of the Google Analytics Conversion University training lessons.
// ==/UserScript==

var gaConversionUniversityShowTime = {};
gaConversionUniversityShowTime.setup = function() {
	var learnContent = document.evaluate("//div[@class='cu_learncontent']", document, null, 7, null);
	var contentDiv = "";
	var timeStr = "";
	var newSpan = "";
	for( var i = 0; i < learnContent.snapshotLength; i++ ) {
		contentDiv = learnContent.snapshotItem( i );
		timeStr = contentDiv.innerHTML.match( /\((\d+(:\d+)?(:\d+)?)\s+(min|hr|hour|sec)[a-z]*\)/i );
		//alert(timeStr);
		if( !timeStr ) {
			continue;
		}
		timeStr = timeStr[0];
		newSpan = document.createElement( "span" );
		newSpan.innerHTML = "&nbsp;" + timeStr;
		contentDiv.previousSibling.previousSibling.appendChild( newSpan );
	}
	return true;
};


gaConversionUniversityShowTime.setup();