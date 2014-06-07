// ==UserScript==
// @name           Autofokus_confirm_btn
// @namespace      die-staemme.de
// @description    Erlaubt das Abschicken der Truppen mit Enter (der ok button wird fokussiert)
// @include       *
// ==/UserScript==

// @version 1.0

// get doc
getdoc = window.document;
for(var i=0; i<window.frames.length; i++) {
		getdoc = window.frames[i].document;
}
getdoc.getElementsByName("submit")[0].focus();
