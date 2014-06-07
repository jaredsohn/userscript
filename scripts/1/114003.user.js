// ==UserScript==
// @name           GameFAQs Close Topic Confirmation
// @namespace      OTACON120
// @author         OTACON120
// @version        1.0.1
// @description    Adds confirmation to the "Close Topic" button on the GameFAQs Message Boards
// @updateURL      http://userscripts.org/scripts/source/114003.meta.js
// @downloadURL    http://userscripts.org/scripts/source/114003.user.js
// @website        http://otacon120.com/scripts/close-topic-confirmation/
// @include        http://*.gamefaqs.com/boards/*-*/*/*
// @match          http://*.gamefaqs.com/boards/*-*/*/*
// @grant          none
// ==/UserScript==

var forms = document.forms,
	i, closeButton;

for ( i = 0; i < forms.length; i++ ) {
	if ( forms[ i ].action.indexOf( '?action=closetopic' ) !== -1 ) {
		closeButton = forms[ i ].elements['YES'];
		closeButton.onclick = function() {
			if( confirm( 'Are you sure you want to close this topic?' ) )
				return true;

			return false;
		}
	}
}