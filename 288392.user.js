// ==UserScript==
// @name	editable
// @namespace   editable
// @description editable
// @version	1
// @author	ttph1oc
// @include	*
// @grant	none
// @run-at document-end
// ==/UserScript==
(document.addEventListener ? document.addEventListener : (document.attachEvent ? document.attachEvent : new Function())).call(document,'load', function() {
	this.body.contentEditable = true;
});