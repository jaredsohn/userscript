/*
    Clean up article pages on www.computerwoche.de
    (c) 2006 Carsten Clasohm
    http://www.clasohm.com/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Computerwoche Cleanup
// @namespace       http://www.clasohm.com
// @description     Removes banners and navigation elements from Computerwoche article pages. (2006-04-11)
// @include         http://www.computerwoche.de/job_karriere/*
// @include         http://www.computerwoche.de/knowledge_center/*
// @include         http://www.computerwoche.de/nachrichten/*
// @include         http://www.computerwoche.de/produkte_technik/*
// ==/UserScript==

(function() {

    // Top banner
    deleteObj(getObj("//div[@class='MainContent']"));
    deleteObj(getObj("//div[@id='SubContentHeader']"));
    deleteObj(getObj("//div[@id='SubContent_HeadTools']"));
    deleteObj(getObj("//div[@id='SubContent_InnerData_TopMain']"));
    hideObj(getObj("//div[@id='SubContent_InnerData_LeftCol']"));
    hideObj(getObj("//div[@id='SubContent_InnerData_RightTeaserInner']"));
    deleteObj(getObj("//div[@id='SubContent_InnerData_TopRubric']"));
    deleteAll("//div[@class='SubContent_InnerData_FeatLinks']");

    function deleteObj(obj) {
	try { 
	    obj.parentNode.removeChild(obj); 
	} catch(e) {}
    }

    function hideObj(obj) {
	try { 
	    obj.style.visibility = 'hidden';
	} catch(e) {}
    }

    function getObj(xpath) {
	try { 
	    return document.evaluate(xpath, document, null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
	} catch(e) { 
	    return null; 
	}
    }

    function deleteAll(xpath) {
	var allElements, thisElement;

	try { 
	     allElements = document.evaluate(xpath, document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	     for (var i = 0; i < allElements.snapshotLength; i++) {
		 deleteObj(allElements.snapshotItem(i));
	     }
	} catch(e) { 
	    return null; 
	}
    }
 })();
