// ==UserScript==
// @name			Google Reader People Search Command
// @author			Erik Vold
// @namespace		greaderFindPeopleMenuCmd
// @include			http*.google.com/reader/*
// @version			0.1
// @datecreated		2009-07-31
// @lastupdated		2009-07-31
// @description		Allows you to search for people on Google Reader via Greasemonkey menu command.
// ==/UserScript==

var greaderFindPeopleMenuCmd = {};

greaderFindPeopleMenuCmd.executeFunc = function( str ){
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Who are you looking for?" );
	}

	if ( str.length ) {
		window.location = "http://www.google.com/reader/view/#profile-search/" + str;
		return;
	}

	return;
};

GM_registerMenuCommand( "Find People", greaderFindPeopleMenuCmd.executeFunc, "", "", "" );