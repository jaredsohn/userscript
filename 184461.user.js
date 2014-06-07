// ==UserScript==
// @name        Wanikani KunOn
// @namespace   wk_kunon
// @description Shows "Kun'yomi" or "On'yomi" instead of "Reading" during reviews
// @author      Rui Pinheiro
// @include     http://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/review/session*
// @version     1.0.2
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @downloadURL https://userscripts.org/scripts/source/184461.user.js
// @updateURL   https://userscripts.org/scripts/source/184461.meta.js
// ==/UserScript==

/*
 *  ====  Wanikani  KunOn  ====
 *    == by ruipgpinheiro  ==
 *
 *  This script changes "Kanji Reading" to "Kanji On'yomi" or "Kanji Kun'yomi" during reviews.
 *
 */
 
/*
 *	This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
/*
 *	=== Changelog ===
 *
 *  1.0.2 (11 March 2014)
 *  - Relicensed under the GPLv3.
 *
 *  1.0.1 (23 January 2014)
 *  - Now supports the HTTPS protocol.
 *
 *  1.0.0 (24 November 2013)
 *  - First release.
 */

/*
 * Debug Settings
 */
var debugLogEnabled = false;
var scriptShortName = "WKKO";

scriptLog = debugLogEnabled ? function(msg) { if(typeof msg === 'string'){ console.log(scriptShortName + ": " + msg); }else{ console.log(msg); } } : function() {};

/*
 * Main script function
 */
function updateReadingText()
{
	var curItem = $.jStorage.get("currentItem");
	var questionType = $.jStorage.get("questionType");
	
	if(questionType == "reading" && "kan" in curItem)
	{
		scriptLog("Kanji Reading!");
		
		
		var readingType = "Reading";
		
		if(curItem.emph == "onyomi")
			readingType = "On'yomi";
		else
			readingType = "Kun'yomi";
		
		$('#question-type').html('<h1>Kanji <strong>' + readingType + '</strong></h1>');
	}
}

 /*
 * Init Functions
 * Set up the hooks needed.
 */
/* Detect when the current item changes */
unsafeWindow.jQuery.fn.WKKO_oldJStorageSet = unsafeWindow.jQuery.jStorage.set;
unsafeWindow.jQuery.jStorage.set = function()
{	
	var result = unsafeWindow.jQuery.fn.WKKO_oldJStorageSet.apply(this, arguments);

	if(arguments[0] == "currentItem")
	{
		scriptLog("Changed item!");
		updateReadingText();
	}
	
	return result;
}

/*
 * Helper Functions/Variables
 */
$ = unsafeWindow.$;
 
function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}