// ==UserScript==
// @name           Auto focusing and showing the uiComposerMetaContainer
// @include        http://www.facebook.com/*
// @version        1.0
// @author         nori (http://5509.me/)
// @modified       2011-09-22 10:52
// ==/UserScript==

(function(window, document) {
	window.addEventListener("load", function() {
		var d = document,
		uiComposerMetaContainer = d.querySelectorAll("div.uiMetaComposer")[0],
		mentionTextArea = d.querySelectorAll("textarea.mentionsTextarea")[0];

		uiComposerMetaContainer.setAttribute("class", "uiComposer uiComposerHideContent stat_elem uiMetaComposer fbComposerWideSpacing uiComposerOpen  uiComposerWhiteMessageBox uiComposerInteracted");
		mentionTextArea.focus();
	}, false);
}(this, this.document));