// ==UserScript==
// @name		UserScript.org Group "Add Script" Greasemonkey Menu Command
// @author		Erik Vold
// @datecreated	2009-08-06
// @lastupdated	2009-08-06
// @namespace	userscriptsOrgGroupAddScriptMenuCmd
// @include		http://userscripts.org/groups/*/scripts?*
// @include		http://userscripts.org/groups/*/scripts#*
// @include		http://userscripts.org/groups/*/scripts
// @version		0.2
// @description	Helps you add scripts to groups on userscripts.org.
// ==/UserScript==

scriptInputFld = document.evaluate("//input[@name='script_id']",document,null,9,null).singleNodeValue;

if ( scriptInputFld ) {
	userscriptsOrgAddScript = function ( str ) {
		if( !str && unsafeWindow.ubiquityGMInput && unsafeWindow.ubiquityGMInput.length ){
			var str = unsafeWindow.ubiquityGMInput;

			// reset for next execution
			unsafeWindow.ubiquityGMInput = "";
		}
		else if ( !str ) {
			var str = prompt( "What is the ID of the script you want to add?" );
		}

		// 1. strip id out of input incase url is provided (for lazy ppl like the aurthor).
		// 2. allow typing of id followed by non numeric character hit by mistake (for fat finger ppl not like the author, and lazt fingered ppl like the author)
		var extractID = /(\d+)[^\d]*$/gi.exec( str )[1];
		if( !extractID ) {
			return false;
		}
		scriptInputFld.value = extractID;
		scriptInputFld.parentNode.submit();

		return true;
	}

	GM_registerMenuCommand( "Add Script", userscriptsOrgAddScript, "", "", "" );
}