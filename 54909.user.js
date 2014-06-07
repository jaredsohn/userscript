// ==UserScript==
// @name			Google Reader Directory Search Command
// @author			Erik Vold
// @namespace		greaderDirectorySearchMenuCmd
// @include			http*.google.com/reader/*
// @version			0.1
// @datecreated		2009-07-31
// @lastupdated		2009-07-31
// @description		Allows you to search the feed directory on Google Reader via Greasemonkey menu command.
// ==/UserScript==

var greaderDirectorySearchMenuCmd = {};

greaderDirectorySearchMenuCmd.executeFunc = function( str ){
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Search for feeds using keywords:" );
	}

	if ( str.length ) {
		window.location = "http://www.google.com/reader/view/#directory-search/" + str;
		return;
	}

	return;
};

GM_registerMenuCommand( "Directory Search", greaderDirectorySearchMenuCmd.executeFunc, "", "", "" );