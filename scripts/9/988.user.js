// ==UserScript==
// @name          Mailman discard all
// @namespace     http://www.menalto.com/greasemonkey
// @description   Automatically selects the 'discard' radio button for all messages when doing mail moderation using Mailman on SourceForge.net
// @include       https://lists.sourceforge.net/lists/admindb*
// @author        Bharat Mediratta - http://www.menalto.com/
// ==/UserScript==

(function() {
    function discardAll() {
	for (i = 0; i < document.forms[0].elements.length; i++) {
	    element = document.forms[0].elements[i];
	    if (element.type == 'radio' && element.value == '3') {
		element.checked = 'checked';
	    }
	}
	alert('All messages marked Discard');
    }
    discardAll();
})();
