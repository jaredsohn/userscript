// ==UserScript==
// @name			JavaScript Alert Message Menu Command [TEST]
// @author			Erik Vold
// @namespace		alert
// @include			*
// @version			1.2
// @datecreated		2009-07-06
// @lastupdated		2010-03-23
// @description		This simple test userscript will create a menu command which will produce a javascript alert with the provided string or ask you for one.
// ==/UserScript==

var alertMessage = {};

alertMessage.executeFunc = function( str ){
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Input:" );
	}

	alert( str );
	return true;
};

GM_registerMenuCommand( "alert", alertMessage.executeFunc, "a", "control alt", "t" );