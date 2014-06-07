// ==UserScript==
// @name           DisableAutocomplete
// @namespace      *://*.google.*/*
// @include        *://*.google.*/*
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