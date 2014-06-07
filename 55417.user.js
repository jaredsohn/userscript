// ==UserScript==
// @name		Mozilla Addons Tagging Greasemonkey Menu Command
// @author		Erik Vold
// @datecreated	2009-08-07
// @lastupdated	2009-08-07
// @namespace	amoTagsMenuCmd
// @include		http*://addons.mozilla.org*
// @version		0.1
// @description	Allows you to tag a mozilla addon via Greasemonkey menu command.
// ==/UserScript==

tagInputFld = document.getElementById("newTag");

if ( tagInputFld ) {
	amoTagsMenuCmd = function ( str ) {
		if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
			var str = unsafeWindow.ubiquityGMInput;

			// reset for next execution
			unsafeWindow.ubiquityGMInput = "";
		}
		else if ( !str ) {
			var str = prompt( "Tags (Seperate tags with commas):" );
		}

		tagInputFld.value = str;
		tagInputFld.form.submit();

		return true;
	}

	GM_registerMenuCommand( "Tags", amoTagsMenuCmd, "", "", "t" );
}