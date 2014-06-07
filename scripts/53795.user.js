// ==UserScript==
// @name			IMDB Vote Command
// @author			Erik Vold
// @namespace		imdbVoteCommand
// @include			http*://*.imdb.com/title/*/
// @include			http*://imdb.com/title/*/
// @version			0.3
// @datecreated		2009-07-14
// @lastupdated		2009-07-17
// @description		Allows you to vote on a movie via Greasemonkey menu command.
// ==/UserScript==

var imdbVoteCommand = {};

imdbVoteCommand.executeFunc = function( str ){
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Vote:" );
	}

	unsafeWindow.vote( str );
	return;
};

GM_registerMenuCommand( "vote", imdbVoteCommand.executeFunc, "", "", "v" );