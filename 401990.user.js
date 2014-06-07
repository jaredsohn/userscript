// ==UserScript==
// @name        Alienware Giveaway
// @namespace   alienware_giveaway
// @include     http://na.alienwarearena.com/giveaways/*
// @version     3.7
// @grant       GM_addStyle
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==
function GM_main ($) {
    
    //HAD TO INCLUDE waitForKeyElements.js INLINE, TO SUPPORT CHROME EASILY

 
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

function waitForKeyElements(
    selectorTxt,
    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction,
    /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,
    /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector
    /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes = $(selectorTxt);
    else
        targetNodes = $(iframeSelector).contents()
            .find(selectorTxt);

    if (targetNodes && targetNodes.length > 0) {
        btargetsFound = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each(function() {
            var jThis = $(this);
            var alreadyFound = jThis.data('alreadyFound') || false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound = actionFunction(jThis);
                if (cancelFound)
                    btargetsFound = false;
                else
                    jThis.data('alreadyFound', true);
            }
        });
    } else {
        btargetsFound = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj = waitForKeyElements.controlObj || {};
    var controlKey = selectorTxt.replace(/[^\w]/g, "_");
    var timeControl = controlObj[controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound && bWaitOnce && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval(timeControl);
        delete controlObj[controlKey]
    } else {
        //--- Set a timer, if needed.
        if (!timeControl) {
            timeControl = setInterval(function() {
                    waitForKeyElements(selectorTxt,
                        actionFunction,
                        bWaitOnce,
                        iframeSelector
                    );
                },
                300
            );
            controlObj[controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj = controlObj;
}

   //END OF WAIT FOR KEY ELEMENTS
console.log('Loaded GreaseMonkey Script - ' + Date.now());
waitForKeyElements('#buttonGetKey', clickTargetButton);
function clickTargetButton(elem) {
    var theEvent = document.createEvent('MouseEvent');
    theEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var element = document.getElementById('buttonGetKey') .getElementsByTagName('a') [0];
    element.dispatchEvent(theEvent);
    while (element)
    {
        if (element.tagName == 'A' && element.href != '')
        {
            if (element.target == '_blank') {
                window.open(element.href, element.target);
            } 
            else {
                document.location = element.href;
            }
            element = null;
        } 
        else
        {
            element = element.parentElement;
        }
    }
}
waitForKeyElements('#giveaway-flash-message span.notice-title', flashTitle);
function flashTitle(elem) {
    console.log('flash');
    var oldTitle = document.title;
    var msg = 'You Recieved a Key!';
    var timeoutId;
    var blink = function () {
        document.title = document.title == msg ? ' ' : msg;
    };
    var clear = function () {
        clearInterval(timeoutId);
        document.title = oldTitle;
        window.onmousemove = null;
        timeoutId = null;
    };
    var title = $('div#giveaway-flash-message span.notice-title').text();
    if(title.indexOf("Success") > -1){
        console.log('success');
        timeoutId = setInterval(blink, 1000);
        //window.onmousemove = clear;
    }
}

}

if (typeof jQuery === "function") {
    console.log ("Running with local copy of jQuery!");
    GM_main (jQuery);
}
else {
    console.log ("fetching jQuery from some 3rd-party server.");
    add_jQuery (GM_main, "1.7.2");
}

function add_jQuery (callbackFn, jqVersion) {
    var jqVersion   = jqVersion || "1.7.2";
    var D           = document;
    var targ        = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    var scriptNode  = D.createElement ('script');
    scriptNode.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/'
                    + jqVersion
                    + '/jquery.min.js'
                    ;
    scriptNode.addEventListener ("load", function () {
        var scriptNode          = D.createElement ("script");
        scriptNode.textContent  =
            'var gm_jQuery  = jQuery.noConflict (true);\n'
            + '(' + callbackFn.toString () + ')(gm_jQuery);'
        ;
        targ.appendChild (scriptNode);
    }, false);
    targ.appendChild (scriptNode);
}
