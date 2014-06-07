// ==UserScript==
// @name           Disable Google Auto-Complete
// @version        0.0.1
// @namespace      http://panoptican.org/
// @description    No more suggestions from Google.
// @include        http://www.google.com/*
// @license        GPL version 3; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

function unAutoComplete(){
    //GM_log("Calling unAutoComplete");
    unsafeDocument = unsafeWindow['document'];
    
    unsafeDocument.myCreateElement = document.createElement;
    unsafeDocument.createElement = function(tagName) {
        try{
        
        //GM_log("Create element  : "+tagName);
        if (tagName != "SCRIPT" && tagName != "script") {
            //GM_log("Creating script element tagName =  "+tagName);
            return unsafeDocument.myCreateElement(tagName);
        }
        //GM_log("FINISHED NOTCreate Script element  : "+tagName);
        
        }catch(exc){}
        return null;
    };

}

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

unAutoComplete();

GM_registerMenuCommand("Disable Autocomplete", unAutoComplete, "d", "shift alt", "d");