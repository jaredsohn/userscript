// ==UserScript==
// @name		UserScript.org Tagging Greasemonkey Menu Command
// @author		Erik Vold
// @datecreated	2009-07-30
// @lastupdated	2009-07-30
// @namespace	userscriptsOrgTagMenuCmd
// @include		http://userscripts.org/scripts/show/*
// @version		0.1
// @description	Allows you to tag a userscript on userscripts.org which you have authored via Greasemonkey menu command.
// ==/UserScript==

tagInputFld = document.evaluate("//input[@name='tags']",document,null,9,null).singleNodeValue;

if ( tagInputFld ) {
	userscritpsAddTags = function ( str ) {
		if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
			var str = unsafeWindow.ubiquityGMInput;
	
			// reset for next execution
			unsafeWindow.ubiquityGMInput = "";
		}
		else if ( !str ) {
			var str = prompt( "Tags (Seperate tags with commas):" );
		}

		tagInputFld.value = str;
		tagInputFld.parentNode.submit();

		return true;
	}

	GM_registerMenuCommand( "Tags", userscritpsAddTags, "", "", "t" );
}