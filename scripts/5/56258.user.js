// ==UserScript==
// @name		Google Analytics Conversion University Expand All Button
// @author		Erik Vergobbi Vold
// @datecreated	2009-08-23
// @lastupdated	2009-08-23
// @namespace	gaConversionUniversityExpandAllButton
// @include		http://www.google.com/support/conversionuniversity/*
// @include		http://www.google.com/support/conversionuniversity/?*
// @include		http://www.google.com/support/conversionuniversity/#*
// @version		0.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript adds a 'Expand All' button to the main Google Analytics Conversion University page.
// ==/UserScript==

var gaConversionUniversityExpandAllButton = {};
gaConversionUniversityExpandAllButton.displayAllBtn = "";
gaConversionUniversityExpandAllButton.displayAllFunc = function() {
	var learnContent = document.evaluate("//div[@class='cu_learncontent']", document, null, 7, null);
	for( var i = 0; i < learnContent.snapshotLength; i++ ) {
		learnContent.snapshotItem( i ).setAttribute( "style", "display: block;" );
	}
};
gaConversionUniversityExpandAllButton.setup = function(){
	var introP = document.evaluate("//p[@class='cu_learnintro']", document, null, 9, null).singleNodeValue;
	if( !introP ) {
		return false;
	}
	var newButton = document.createElement( "input" );
	newButton.id = "expandAllBtn";
	newButton.type = "button";
	newButton.value = "Expand All";
	newButton.addEventListener( "click", gaConversionUniversityExpandAllButton.displayAllFunc, false );

	introP.parentNode.insertBefore( newButton, introP.nextSibling );
	gaConversionUniversityExpandAllButton.displayAllBtn = newButton;
	return true;
};
gaConversionUniversityExpandAllButton.setup();