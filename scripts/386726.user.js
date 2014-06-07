// ==UserScript==
// @name           Avatar XHR inject
// @description    Cross domain XHR for friends, family and alliance members.
// @namespace      Ava
// @include        http://localhost*/*
// @include        http://avatar-alliance.com*/*
// @include        http://*.azurewebsites.net/*
// @run-at	document-start
// @version        1.0.0.1
// ==/UserScript==
//






	( function () {

		unsafeWindow.GM_xmlhttpRequest = function ( obj ) {
			window.setTimeout( GM_xmlhttpRequest, 0, obj );
		};
		// todo:  Keep it in memory?
	})();



 