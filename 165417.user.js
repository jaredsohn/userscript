// ==UserScript==
// @name Auto hide tweets
// @namespace		http://www.madharasan.com/autohide
// @description		Script to hide tweets that have certain keywords.
// @include         /https?://twitter\.com/.*$/
// @exclude         */status/*
// @grant           GM_addStyle
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/**
This script will hide and remove individual tweets that contain certain keywords you specify 
in the keywords variable. Keywords are case insensitive. It will work on twitter single person's profile page and main page.  It will hide tweets when loaded dynamically thru Ajax too. It It will not work on individual tweet pages.
*/

var keywords = new Array();
// Add your case sensitive keywords below
keywords[0] = "your word here";
// add more here
// keywords[1] = "your word here";
// keywords[2] = "your word here";

function addCustomSearchResult (jNode) {
    for(j=0; j<keywords.length;j++)
	{
	   if(keywords== "") continue;
		reg= new RegExp(keywords[j],"i");
		if(jNode.html().search(reg) != -1 )
		{
			jNode.parent().parent().parent().hide();
		}
	}
}

waitForKeyElements (".js-tweet-text", addCustomSearchResult);

function waitForKeyElements (selectorTxt, actionFunction, bWaitOnce, iframeSelector)
{
    var targetNodes, btargetsFound;
    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                actionFunction (jThis);
                jThis.data ('alreadyFound', true);
            }
        } );
        btargetsFound   = true;
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
                500
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}