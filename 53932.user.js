// ==UserScript==
// @name			Twitter Find People Search Command
// @author			Erik Vold
// @namespace		twitterFindPeople
// @include			http*://*twitter.com*
// @version			0.3
// @datecreated		2009-07-17
// @lastupdated		2009-07-17
// @description		Allows you to search for people on Twitter via Greasemonkey menu command.
// ==/UserScript==

var twitterFindPeople = {};

twitterFindPeople.executeFunc = function( str ){
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Who are you looking for?" );
	}

	if ( str.length ) {
		GM_openInTab( "http://twitter.com/search/users?category=people&source=find_on_twitter&q=" + str );
		return;
	}

	return;
};

GM_registerMenuCommand( "Find People", twitterFindPeople.executeFunc, "", "", "f" );