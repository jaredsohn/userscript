// ==UserScript==
// @name        GrooveShark ADS remover
// @namespace   http://grooveshark.com/*
// @description Removes sidebar ADS from GrooveShark. Works with the new HTML interface!
// @include     http://grooveshark.com/*
// @version     1.1
// @author      Massimiliano Torromeo
// ==/UserScript==

(function () {
	var application = document.getElementById('application');
	var sidebar = document.getElementById('capitalSidebar');

	if (application) {
		application.style.marginRight = '0px';
		// sidebar may not exist if using adblock
		if (sidebar) sidebar.parentNode.removeChild(sidebar);

		// Fake a resize event to fix the layout
		var evt = document.createEvent("UIEvents");
		evt.initUIEvent('resize', true, true, window, 0, 0);
		window.dispatchEvent(evt);
		
		GM_addStyle("#application { margin-right: 0px !important }");
	}
})();