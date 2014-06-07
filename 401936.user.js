// ==UserScript==
// @name       Remove Job Listings from Recruiters on LinkedIn Jobs
// @namespace  @escape42
// @version    0.1
// @description  Removes job listings posted by Recruiters on LinkedIn Jobs
// @match      https://www.linkedin.com/vsearch/j?*
// @copyright  2012+, escape42
// ==/UserScript==


function filterListings()
{
	var blacklistAry = ['Sandhill','CyberCoders', 'Skyrocket Ventures', 'Nelson Technology', 'MoTek Technologies', 'Quest Groups'];
	removeListings(blacklistAry);
	
	//var recruiterArray2 = ['Menlo Park','San Bruno','Sunnyvale','Redwood City','Mountain View','Palo Alto','Petaluma'];
	var whitelistAry = ['San Francisco'];
	removeListingsNotContainingString(whitelistAry);
}

function removeListings(blacklistAry)
{
	for(var i=0; i<blacklistAry.length; i++){
		var rec = blacklistAry[i]
		console.log("Removing listings for",rec.toString());
		$( "#results li:contains('" + rec + "')").css( "display", "none" );
	}
}

function removeListingsNotContainingString(whitelistAry)
{
//$('tr:not(:contains("pc"))') // this can be used
	for(var i=0; i<whitelistAry.length; i++){
		var rec = whitelistAry[i]
		console.log("Removing listings not containing",rec.toString());
		$( "#results li:not(:contains('" + rec + "'))").css( "display", "none" );

	}
}


waitForKeyElements ("#results", filterListings);

/*--- waitForKeyElements():  A handy, utility function that
    does what it says.
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
)
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