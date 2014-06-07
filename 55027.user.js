// ==UserScript==
// @name			Google Analytics Row Start
// @author			Erik Vold
// @namespace		gaRowStart
// @include			https://www.google.com/analytics/reporting/*
// @include			https://adwords.google.com/analytics/reporting/*
// @version			0.1
// @datecreated		2009-07-30
// @lastupdated		2009-07-30
// @description		Allows you to change the starting row easily in Google Analytics via Greasemonkey menu command.
// ==/UserScript==

if( unsafeWindow.table ) {
	gaRowLimit = function( str ) {
		if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ) {
			var str = unsafeWindow.ubiquityGMInput;

			// reset for next execution
			unsafeWindow.ubiquityGMInput = "";
		}
		else if( !str ) {
			var str = prompt( "Row Limit:" );
		}

		unsafeWindow.table._toggleRowStart( str );
		return true;
	};

	GM_registerMenuCommand( "Row Start", gaRowLimit, "", "", "" );
}