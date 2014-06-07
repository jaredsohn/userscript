// ==UserScript==
// @name        WaniKani Stroke Order
// @namespace   japanese
// @description Shows a kanji's stroke order on its page and during lessons and reviews.
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include     http*://*wanikani.com/kanji/*
// @include     http*://*wanikani.com/level/*/kanji/*
// @include     http*://*wanikani.com/review/session
// @include     http*://*wanikani.com/lesson/session
// @version     1.0
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

/*
 * Thanks a lot to ...
 * Wanikani Phonetic-Semantic Composition - Userscript
 * by ruipgpinheiro (LordGravewish) 
 * ... for code showing me how to insert sections during kanji reviews.
 * The code heavily borrows from that script!
 */

/*
 * Helper Functions/Variables
 */
$ = unsafeWindow.$;

/*
 * Global Variables/Objects/Classes
 */
var PageEnum = Object.freeze({ unknown:0, kanji:1, reviews:2, lessons:3 });
var curPage = PageEnum.unknown;
var JISHO = "http://jisho.org";

/*
 * Main
 */
window.addEventListener("load", function (e) {

    // Determine page type
    if (/\/kanji\/./.test(document.URL)) {
        curPage = PageEnum.kanji;
    } else if (/\/review/.test(document.URL)) {
        curPage = PageEnum.reviews;
    } else if (/\/lesson/.test(document.URL)) {
        curPage = PageEnum.lessons;
    }

    // Create and store the element that will hold the image
    unsafeWindow.diagram = createDiagramSection();

    // Register callback for when to load stroke order
    switch (curPage) {
        case PageEnum.kanji:
            loadDiagram();
            break;
        case PageEnum.reviews:
            waitForKeyElements("section[id^=item-info-]", function() {
                // Reviews dynamically generate the DOM. We always need to re-insert the element
                if (getKanji() !== null) {
                    var diagram = createDiagramSection();
                    if (diagram !== null && diagram.length > 0) {
                        unsafeWindow.diagram = diagram;
                        loadDiagram();
                    }
                }
            }, false);
            break;
        case PageEnum.lessons:
            waitForKeyElements("li.active", loadDiagram, false);
            break;
    }
});

/*
 * Returns the current kanji 
 */
function getKanji() {
    switch(curPage) {
        case PageEnum.kanji:
            return document.title[document.title.length - 1];

        case PageEnum.reviews:
            var curItem = $.jStorage.get("currentItem");
            if("kan" in curItem)
                return curItem.kan.trim();
            else
                return null;

        case PageEnum.lessons:
            var kanjiNode = $("#character");
            
            if(kanjiNode === undefined || kanjiNode === null)
                return null;
            
            return kanjiNode.text().trim(); 
    }
   
    return null;
}

/* 
 * Creates a section for the diagram and returns a pointer to its content
 */
function createDiagramSection() {

    // Reviews hack: Only do it once
    if ($('#stroke_order').length > 0)
        return null;

    var sectionHTML = '<section><h2>Stroke Order</h2><p id="stroke_order">&nbsp;</p></section>';

    switch(curPage) {
        case PageEnum.kanji:
            $(sectionHTML).insertAfter('#information');
            break;
        case PageEnum.reviews:
            $('#item-info-col2').prepend(sectionHTML);
            break;
        case PageEnum.lessons:
            $('#supplement-kan-breakdown .col1').append(sectionHTML);
            break;
    }

    return $('#stroke_order');
}

/*
 * Adds the diagram section element to the appropriate location
 */
function loadDiagram() {
    if (!unsafeWindow || !unsafeWindow.diagram.length)
        return;

    console.log("OOPS!");

    unsafeWindow.diagram.html("Loading...");

    setTimeout(function() {
        GM_xmlhttpRequest({
            method: "GET",
            url: JISHO + "/kanji/details/" + getKanji(),
            onload: function(xhr) {
                var diagram = unsafeWindow.diagram;
                if (xhr.status == 200) {
                    if (diagramURL = xhr.responseText.match(/\/static\/images\/stroke_diagrams\/[0-9]+_frames\.png/)) {
                        diagram.html('<img src="' + JISHO + diagramURL[0] + '" alt="Stroke order diagram" />');
                        return;
                    }
                }

                unsafeWindow.diagram.html("Error while loading diagram");
            },
            onerror: function(xhr) {
                unsafeWindow.diagram.html("Error while loading diagram");
            }
        });
    }, 0);
}

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
                100
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}