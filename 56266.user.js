// ==UserScript==
// @name		Google Analytics URL Builder Override Option
// @author		Erik Vergobbi Vold
// @datecreated	2009-08-23
// @lastupdated	2009-09-03
// @namespace	gaURLBuilderOverrideOption
// @include		http*://www.google.com/support/googleanalytics/bin/answer.py?answer=55578*
// @include		http*://www.google.com/support/googleanalytics/bin/answer.py?*&answer=55578*
// @include		http*://www.google.com/support/analytics/bin/answer.py?answer=55578*
// @include		http*://www.google.com/support/analytics/bin/answer.py?*&answer=55578*
// @include		http*://google.com/support/googleanalytics/bin/answer.py?answer=55578*
// @include		http*://google.com/support/googleanalytics/bin/answer.py?*&answer=55578*
// @include		http*://google.com/support/analytics/bin/answer.py?answer=55578*
// @include		http*://google.com/support/analytics/bin/answer.py?*&answer=55578*
// @version		0.1.1
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description	This userscript adds a checkbox to the Google Analytics URL Builder tool for the utm_nooverride url variable.
// ==/UserScript==

var gaURLBuilderOverrideOption = {};
gaURLBuilderOverrideOption.result = document.evaluate("//input[@name='result']", document, null, 9, null).singleNodeValue;
gaURLBuilderOverrideOption.clickFunc = function( e ) {
	if( !unsafeWindow.createURL() ) {
		var override = document.getElementById( "utm_nooverrideID" ).checked;
		if( !override ) {
			gaURLBuilderOverrideOption.result.value += "&utm_nooverride=1";
			return true;
		}
	}
	return false;
};
gaURLBuilderOverrideOption.setup = function() {
	if( !gaURLBuilderOverrideOption.result ) {
		return false;
	}
	gaURLBuilderOverrideOption.result.size = "125";
	var generateBtn = document.evaluate("//input[@value='Generate URL']", document, null, 9, null).singleNodeValue;
	if( !generateBtn ) {
		return false;
	}

	generateBtn.setAttribute( "onclick", "" );
	generateBtn.addEventListener( "click", gaURLBuilderOverrideOption.clickFunc, false );

	var tempTable = document.evaluate("//input[@name='utm_campaign']", document, null, 9, null).singleNodeValue.parentNode.parentNode.parentNode;

	var newTR = document.createElement("tr");
	var newTD1 = document.createElement("td");
	newTD1.innerHTML = "<strong>Campaign Override</strong>:";
	var newTD2 = document.createElement("td");
	newTD2.innerHTML = '<input name="utm_nooverride" id="utm_nooverrideID" type="checkbox" checked="checked" />&nbsp;<a title="Help: What is utm_nooverride?" target="_blank" href="http://www.google.com/support/googleanalytics/bin/answer.py?hl=en&answer=55556">?</a>';
	var newTD3 = document.createElement("td");
	newTD3.innerHTML = "&nbsp;";
	newTR.appendChild( newTD1 );
	newTR.appendChild( newTD2 );
	newTR.appendChild( newTD3 );
	tempTable.appendChild( newTR );

	var helpTable = document.evaluate("//table[@class='outline2']", document, null, 9, null).singleNodeValue;
	newTR = document.createElement("tr");
	newTD1 = document.createElement("td");
	newTD1.innerHTML = "Campaign Override (utm_nooverride)";
	newTD1.width = "225";
	newTD2 = document.createElement("td");
	newTD2.innerHTML = 'If Google Analytics detects this variable, then previously set campaign information will not be overridden. Use <strong>utm_nooverride</strong> to refrain from overridding a previous campaign.<br/><em>Example</em>: <font face="Courier New, Courier, mono">utm_nooverride=1</font>';
	newTR.appendChild( newTD1 );
	newTR.appendChild( newTD2 );
	helpTable.appendChild( newTR );
	return true;
};
gaURLBuilderOverrideOption.setup();