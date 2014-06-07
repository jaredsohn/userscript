// ==UserScript==
// @name           Resize Google Calendar Fonts
// @author         Rodrigo Melo
// @namespace      https://profiles.google.com/rodrigodemelo0
// @description    Resize Google Calendar Fonts
// @include        https://www.google.com/calendar/*
// @include        http://www.google.com/calendar/*

// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.mv-event-container { font-size: 20px ! important; }');