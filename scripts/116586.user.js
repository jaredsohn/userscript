// ==UserScript==
// @name				Facepunch Text Editor Popup Blocker
// @namespace		http://www.facepunch.com/threads/*
// @description		Removes the "Are you sure you want to leave this page?" popup caused by the reply text editor.
// @include			http://www.facepunch.com/threads/*
// ==/UserScript==

// This is safest and cleanest way to call a javascript function in the page, even though it looks kinda hacky.
// It removes the event the vBulletin text editor uses to show the popup.
location.href = "javascript: YAHOO.util.Event.removeListener( window, \"beforeunload\" );";