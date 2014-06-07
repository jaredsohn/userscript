/*
    Clean up article pages on www.golem.de
    (c) 2005 Carsten Clasohm
    http://www.clasohm.com/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            golem.de Cleanup
// @namespace       http://www.clasohm.com
// @description     Removes banners and navigation elements from golem.de article pages. (2005-06-17)
// @include         http://www.golem.de/*/*.html
// ==/UserScript==

(function() {

    // Left-side navigation
    getObj(document, "//td[@class='headerbg'][7]").style.visibility='hidden';
    getObj(document, "//td[@class='headerbg'][8]").style.visibility='hidden';
    getObj(document, "//td[@class='headerbg'][9]").style.visibility='hidden';

    // Inline banner ad
    deleteObj(getObj(document, "//table[@style='clear: right;']"));

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
