// ==UserScript==
// @name        Wanikani Show Level
// @namespace   wk_showlevel
// @description Show the current SRS level of an item during reviews
// @author      Rui Pinheiro
// @include     http://www.wanikani.com/review/session*
// @include     https://www.wanikani.com/review/session*
// @version     1.0.2
// @grant       GM_addStyle
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @downloadURL https://userscripts.org/scripts/source/184460.user.js
// @updateURL   https://userscripts.org/scripts/source/184460.meta.js
// ==/UserScript==

/*
 *  ====  Wanikani  Show Level  ====
 *    ==    by Rui Pinheiro     ==
 *
 *  This script adds information about the current item's SRS level during reviews.
 *
 *  The level shows up as for example "Apprentice (2)", where the number inside the
 *  paranthesis represents the numeric SRS level, where 1 is the first "Apprentice" level
 *  and 9 is "Burned".
 *
 *  A down-arrow might appear before the level name, indicating that the item is going to
 *  be downgraded even if you answer the current question correctly, since you've already
 *  answer either the meaning or the reading incorrectly at least once during its current
 *  SRS cycle.
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
var scriptShortName = "WKSL";

scriptLog = debugLogEnabled ? function(msg) { if(typeof msg === 'string'){ console.log(scriptShortName + ": " + msg); }else{ console.log(msg); } } : function() {};

/*
 * HTML Element
 */
function createHTMLElement()
{
	var elmnt;
	elmnt = document.createElement('span');
	
	elmnt.setAttribute('id', 'WKSL-span');
	elmnt.setAttribute('class', 'WKSL-srs');
	elmnt.innerHTML = '<span id="WKSL-srs-span" class=""></span>';

	return elmnt;
}

function initHTMLElement()
{
	var htmlElement = createHTMLElement();
	
	$('#stats').prepend(htmlElement);
}

function checkIfMistake(curItem)
{
	/* Build item name */
	var itemName;
	
	if(curItem.rad)
		itemName = "r";
	else if(curItem.kan)
		itemName = "k";
	else
		itemName = "v";
	
	itemName += curItem.id;
	
	/* Grab item from jStorage.
	 * 
	 * item.rc and item.mc => Reading/Meaning Completed (if answered the item correctly)
	 * item.ri and item.mi => Reading/Meaning Invalid (number of mistakes before answering correctly)
	 */
	var item = $.jStorage.get(itemName) || {};
	
	scriptLog(item);
	if(("mi" in item && !isEmpty(item.mi) && item.mi > 0) ||
	   ("ri" in item && !isEmpty(item.ri) && item.ri > 0))
		return true;

	return false;
}

function updateHTMLElement()
{
	var elmnt = $('#WKSL-srs-span');
	elmnt.removeClass('WKSL-srs-down WKSL-srs-apprentice WKSL-srs-guru WKSL-srs-master WKSL-srs-enlightened WKSL-srs-burned');
	
	var curItem = $.jStorage.get("currentItem");
	
	// Depending on the SRS level, update the display
	switch(curItem.srs)
	{
		case 1:
		case 2:
		case 3:
		case 4:
			elmnt.addClass('WKSL-srs-apprentice');
			elmnt.text("Apprentice (" + curItem.srs + ")");
			break;
		case 5:
		case 6:
			elmnt.addClass('WKSL-srs-guru');
			elmnt.text("Guru (" + curItem.srs + ")");
			break;
		case 7:
			elmnt.addClass('WKSL-srs-master');
			elmnt.text("Master (" + curItem.srs + ")");
			break;
		case 8:
			elmnt.addClass('WKSL-srs-enlightened');
			elmnt.text("Enlightened (" + curItem.srs + ")");
			break;
		case 9:
			elmnt.addClass('WKSL-srs-burned');
			elmnt.text("Burned (" + curItem.srs + ")");
			break;
		default:
			elmnt.text("");
	}
	
	// Check whether we have already made a mistake (and the item will be downgraded even we answer correctly)
	if(checkIfMistake(curItem))
		elmnt.addClass('WKSL-srs-down');	
}

 /*
 * Init Functions
 * Set up the hooks needed.
 */
/* Detect when the current item changes */
unsafeWindow.jQuery.fn.WKSL_oldJStorageSet = unsafeWindow.jQuery.jStorage.set;
unsafeWindow.jQuery.jStorage.set = function()
{	
	var result = unsafeWindow.jQuery.fn.WKSL_oldJStorageSet.apply(this, arguments);

	//scriptLog(arguments[0]);
	if(arguments[0] == "currentItem")
	{
		scriptLog("Changed item!");
		updateHTMLElement();
	}
	
	return result;
}

/* Detect when the page finishes loading and '#stats' is created so we can inject our HTML element */
function statsLoadedEvent(node)
{
	try
	{
		scriptLog("Stats loaded!");
		
		initHTMLElement();
		updateHTMLElement();
	}
	catch(err) { logError(err); }
}

function scriptInit()
{	
	//Load Global styles
	GM_addStyle('.WKSL-srs { letter-spacing: -0.05em; text-shadow: none; width: 100%; }');
	GM_addStyle('.WKSL-srs .WKSL-srs-up:before { content: "" }');
	GM_addStyle('.WKSL-srs .WKSL-srs-down:before { content: "" }');
	GM_addStyle('.WKSL-srs .WKSL-srs-up:before, .WKSL-srs .WKSL-srs-down:before { font-family: FontAwesome; margin-right: 0.25em; }');
	GM_addStyle('#WKSL-srs-span { box-shadow: 1px 1px 5px #808080; -moz-box-sizing: border-box; border-radius: 3px; display: inline-block; font-weight: bold; padding: 0.15em 0.3em; }');
	GM_addStyle('.WKSL-srs .WKSL-srs-apprentice { background-color: #DD0093 }');
	GM_addStyle('.WKSL-srs .WKSL-srs-guru { background-color: #882D9E }');
	GM_addStyle('.WKSL-srs .WKSL-srs-master { background-color: #294DDB }');
	GM_addStyle('.WKSL-srs .WKSL-srs-enlightened { background-color: #0093DD }');
	GM_addStyle('.WKSL-srs .WKSL-srs-burned { background-color: #434343 }');
	
	scriptLog("Loaded");
	
	// Set up hooks
	try
	{
		waitForKeyElements("#stats", statsLoadedEvent, true);
	}
	catch(err) { logError(err); }
}

/*
 * Helper Functions/Variables
 */
$ = unsafeWindow.$;
 
function isEmpty(value){
    return (typeof value === "undefined" || value === null);
}

/*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
function logError(error)
{
	var stackMessage = "";
	if("stack" in error)
		stackMessage = "\n\tStack: " + error.stack;
		
	console.error(scriptShortName + " Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
}

/*
 * Code by BrockA, thanks!
 * Taken from https://gist.github.com/BrockA/2625891
 */
 
/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    Usage example:

        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );

        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
/* End of Code by BrockA */

/*
 * Start the script
 */
scriptInit();