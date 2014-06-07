// ==UserScript==
// @name			Userscripts.org Sort Groups Drop Down
// @author			Erik Vold
// @namespace		userscriptsOrgSortGroupsDropDown
// @include			http://userscripts.org/scripts/show/*
// @version			0.1.3
// @license			MPL 2.0
// @datecreated		2009-09-28
// @lastupdated		2013-07-13
// @homepageURL http://userscripts.org/scripts/show/59044
// @description		This userscript will sort the 'Groups' drop down menu on userscript about pages.
// ==/UserScript==

var userscriptsOrgSortGroupsDropDown = {};

userscriptsOrgSortGroupsDropDown.setup = function() {
	var groupsDD = document.getElementById('group_id');
	if(!groupsDD) return;
	var optionsAry = groupsDD.options, i, j, optionsValArySorted, optionsValAry = [];
	// skip 0 which is blank
	for( i=1; i<optionsAry.length; i++ ) {
		optionsValAry.push( optionsAry[i].innerHTML );
	}
	// trim function
	var trimFunc = function(input){
		return input.toLowerCase().replace( /^\s*(the|a)\s+/i , '' );
	}
	// copy and sort and save the copied array
	optionsValArySorted = optionsValAry.slice(0).map( trimFunc ).sort();
	for ( i=0; i<optionsValArySorted.length; i++ ) {
		for ( j=i+1; j<optionsAry.length; j++ ) {
			if ( trimFunc(optionsAry[j].innerHTML)==optionsValArySorted[i] ) {
				if ( (i+1) == j ) break;
				optionsAry[j].parentNode.insertBefore( optionsAry[j], optionsAry[i+1] );
				break;
			}
		}
	}
	return;
}

userscriptsOrgSortGroupsDropDown.setup();