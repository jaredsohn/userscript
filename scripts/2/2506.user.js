/*
    Clean up article pages on www.sueddeutsche.de
    (c) 2005 Carsten Clasohm
    http://www.clasohm.com/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Sueddeutsche Cleanup
// @namespace       http://www.clasohm.com
// @description     Removes banners and navigation elements from Sueddeutsche article pages. (2005-06-17)
// @include         http://www.sueddeutsche.de/*/artikel/*
// ==/UserScript==

(function() {

    // Top Banner
    deleteObj(getObj(document, "//table[@width='773']"));

    // Left-side navigation
    deleteObj(getObj(document, "//table[@width='159']"));

    function deleteObj(obj) {
	try { 
	    obj.parentNode.removeChild(obj); 
	} catch(e) {}
    }

    function getObj(obj, xpath) {
	try { 
	    return document.evaluate( xpath, obj, null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	} catch(e) { 
	    return null; 
	}
    }
 })();
