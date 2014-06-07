// ==UserScript==
// @name        ESPN Fantasy Football - Javascript Link Fix
// @description	Converts ESPN Fantasy Football player claim links into regular links, instead of Javascript ones, so they can be opened in tabs.
// @namespace   espn-ff-jsfix
// @include     http://greasemonkey.mozdev.org/authoring.html
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     2013.09.24
// @grant 		none
// @include 	*games.espn.go.com/ffl/freeagency*
// ==/UserScript==
// By Andy Trevino (@trevinoandy), a man who loves his tabs
//  - Thanks for WaitForKeyElements - from BrockA on GitHub https://gist.github.com/BrockA/2625891

// previous link format was: javascript: createSubmitForm('/ffl/freeagency?leagueId=341846&incoming=1&trans=2_13966_-1_1002_1_20')

// set up no-conflict JQuery
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
	waitForKeyElements (".claimButton", removeJsLink);
});
	
	//$(".claimButton").each(function() {
	//	removeJsLink(this);
	//});

function removeJsLink(obj) {
	var theHRef = $(obj).attr("href");
		
	theHRef = theHRef.substring(30);
	theHRef = theHRef.substring(0, theHRef.length-2);
		
	$(obj).attr("href", theHRef);
}

// waitForKeyElements() begins unmodified below this line
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