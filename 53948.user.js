// ==UserScript==
// @name		Add Tags to Mixx Stories, Photos, and Videos
// @author		Erik Vold
// @datecreated	2009-07-18
// @lastupdated	2009-07-18
// @namespace	mixxAddTags
// @include		http*://*.mixx.com/stories/*
// @include		http*://*.mixx.com/photos/*
// @include		http*://*.mixx.com/videos/*
// @version		0.1
// @description	Allows you to tag a Miix Story, Photo, or Video via Greasemonkey menu command.
// ==/UserScript==

mixxAddTags = function( str ) {
	if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
		var str = unsafeWindow.ubiquityGMInput;

		// reset for next execution
		unsafeWindow.ubiquityGMInput = "";
	}
	else if ( !str ) {
		var str = prompt( "Tags (Seperate tags with commas):" );
	}

	var formHandle = document.getElementById("add_tags_form");

	// make sure that the tag form can be found
	if ( formHandle == undefined ){
		return false;
	}

	var inputFld = document.getElementById("thingy_tags");

	inputFld.value = str;
	formHandle.submit();
	return true;
}

GM_registerMenuCommand( "Tags", mixxAddTags, "", "", "t" );