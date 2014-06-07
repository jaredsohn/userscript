// ==UserScript==
// @name           Google Calendar - Weekend coloration - FR
// @namespace      http://www.yojimbo.fr
// @include       https://www.google.com/calendar/*
// @include       http://www.google.com/calendar/*
// ==/UserScript==

// Coloration Fond
	GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(6) { background:#F8F9FF !important }");
	GM_addStyle(".month-row .st-bg-table .st-bg:nth-child(7) { background:#F8F9FF !important }");
// Coloration titre
	GM_addStyle(".month-row .st-grid .st-dtitle { background:#F8F9FF !important }");
	GM_addStyle(".month-row .st-grid .st-dtitle { background:#F8F9FF !important }");
// Coloration titre weekend
	GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(6) { background:#f2f4fa !important }");
	GM_addStyle(".month-row .st-grid .st-dtitle:nth-child(7) { background:#f2f4fa !important }");