// ==UserScript==
// @name          Dandy, Baby!
// @version       0.1
// @description   Dandifies /r/spacedandy post titles
// @include       *.reddit.com/r/spacedandy*
// @include       *.reddit.com/r/SpaceDandy*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright     2012+, sievernich
// ==/UserScript==
$(function () {
    function dandify (post) {
        // dandify: HTMLElement -> void
        // Consumes an html element representing a Reddit Post and dandifies it, baby
        var suffix = "",
            ending = "",
            $post = $(post),
            text = $post.text().trim();

        // Check if the sentence already ends with baby
        for (var i = text.length - 1; i >= 0; --i) {
            if (text[i] == ' ') break;
            suffix = text[i] + suffix;
        }

        if (suffix.toLowerCase().indexOf("baby") == -1) { // Must add baby to the end of the sentence
            // Iterate over possible use-cases of baby
            suffix = text[text.length - 1];
           	ending = suffix;

            // Case of multiple repititions of punctuations ending the sentence.            
            for (var i = text.length - 1; i >= 0 && "!.?".indexOf(text[i]) > -1; --i) {
                ending = text[i] + ending;
            	text = text.substring(0, i);
            }

            switch(suffix) { // switch on the suffix
                case '!':
                    text += ", baby" + ending;
                    break;
                case ',':
                    text += " baby!";
                    break;
                case '.':
                case '?':
                    text = text.substring(0, text.length - 1) + ", baby" + ending;
                    break;
                default: // default adds a comma
                    text += ", baby!";
            }
        }
        $post.text(text);
    }

    /* Dandify on load */
    $('p.title a.title').each(function () {
        dandify(this);
    });
    /* Dandify any new tags added to the DOM.  Use-class is dominantly
       for RES (Reddit-Enhancement-Suite).  Supports all browsers and IE8+ */
    waitForKeyElements('p.title a.title', dandify);
});


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
