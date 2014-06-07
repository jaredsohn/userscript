// following quick install guide taken from http://userscripts.org/scripts/show/38618
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Couchsurfing: hide slow-replying users from search results", and click on "Uninstall".
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Couchsurfing: hide slow-replying users from search results
// @namespace   http://liro.ca/
// @description When searching for hosts sometimes you want to filter out those users who take days to reply or do not have a high reply rate. This script does exactly that. Will display a count of profiles hidden so far in the top right corner. Will properly update as you scroll down and new results come in.
// @include     http://www.couchsurfing.org/search*
// @include     http://couchsurfing.org/search*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant none
// ==/UserScript==

$.noConflict(); // this is very important, jquery has to play nice with Prototype used on the page

var $counter = jQuery("body").append("<div id='cs_hidden_res_counter' style='border:1px solid black; padding:5px;position: fixed;top:110px;right:20px;'>results hidden so far: <span>0</span></div>").find('#cs_hidden_res_counter span'); // append our counter

function updateCounter() { // function to increment counter
    $counter.text(parseInt($counter.text())+1);
}

function hideCertainSearchResults(jNode) { // process next found DOM node

    // first let's look for people with feedback rates less than x percent
    var node_percentage = jQuery(jNode).find('ul.profile_count li').eq(3).find('.count');

    if(typeof node_percentage !== 'undefined') {
    var val = jQuery(node_percentage).text();
    var num = val.replace(/\%$/, "");
    var x = parseInt(num, 10); // you want to use radix
        if(x < 90) { // currently 90%, change this to your liking
            //console.log('hiding: ' + x + '%');
            jQuery(jNode).hide();
            updateCounter();
        } // if
    } // if

    // now let's play with the 'reply time' value
    var node_days = jQuery(jNode).find('ul.profile_count li').eq(4).find('.count');

    if(typeof node_days !=='undefined') {
        var val2 = jQuery(node_days).text();
        //console.log('value: ' + val2.indexOf("days"));
        if(val2.indexOf("days") !== -1) { // if we have 'days' as part of string
            var char1 = val2.slice(0,1); // get first character
            if(parseInt(char1, 10) > 2) { // if first character is bigger than 1 or 2 (i.e. "3 days" would pass) - hide the user
                //console.log('hiding (1): ' + val2);
                jQuery(jNode).hide();
                updateCounter();
            } else {
                var char2 = val2.slice(1,2);
                if(char2 !== ' ') { // if second character is not space (i.e. "10 days" would pass) - hide the user
                    jQuery(jNode).hide();
                    //console.log('hiding (2): ' + val2);
                    updateCounter();
                }
            } // else
        } // if
    } // if

}

waitForKeyElements("#search_resuts_user .profile_result_item", hideCertainSearchResults, false);

/** waitForKeyElements():  A handy, utility function that does what it says.
 *
 *  Courtesy of stackoverflow user Brock Adams, taken from here:
 *  http://stackoverflow.com/questions/8281441/fire-greasemonkey-script-on-ajax-request
 *
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
        targetNodes     = jQuery(selectorTxt);
    else
        targetNodes     = jQuery(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = jQuery(this);
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
