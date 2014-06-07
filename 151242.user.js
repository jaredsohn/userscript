// ==UserScript==
// @name           Auto hide undo bar
// @version        1.0.1
// @namespace      workflowy
// @description	   Automatically hides annoying undo message-bar after deleting in Workflowy.
// @include        https://workflowy.*
// ==/UserScript==
// by Yuriy Babak aka Inversion (http://inversion.habrahabr.ru/), mailto: yura.des@gmail.com

/*

	v1.0.1 (29.10.12)
	- public release
	
*/


"use strict";
window.unsafeWindow = ( typeof unsafeWindow == 'undefined' ? window : unsafeWindow )

!function($) {
	setInterval(function() {
		$('#dropdownMessages .undelete').parents('#dropdownMessages').find('#message').fadeOut('fast')
	}, 1000)
}(unsafeWindow.jQuery)
