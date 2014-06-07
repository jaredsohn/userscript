// ==UserScript==
// @name GoogleCode - Expanding 'Update List'
// @version 1.0
// @namespace http://www.madphp.org/
// @description Expands all descriptions found on GoogleCodes update lists.

// @include https://code.google.com/p/*/updates/list

// ==/UserScript==


/**
 * Array of <li> elements for activity streams
 */
 var _CS_asElemList = document.getElementById('activity-streams-list').
 getElementsByTagName('li');
 /**
 * Shows all activity details
 */
 function expandAll() {
	 for (var i=0; i < _CS_asElemList.length; i++) {
	 	_CS_asElemList[i].className = 'click';
	 }
 }
 
 expandAll( );