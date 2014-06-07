// ==UserScript==
// @name           Yoji's Gmail inbox
// @namespace      http://www.yojimbo.fr
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

// Changement de la police globale
	GM_addStyle("body, td, input, textarea, select { font-family: 'Trebuchet MS', arial, sans-serif !important; }");
// bordure sous la barre de l'emetteur dans la vue de message
	GM_addStyle(".gE { border-bottom: 1px solid #BCBCBC !important; }");
// Background gris du bloc message
	GM_addStyle(".Bk .G2 { background-color: #EEE !important; }");
// Background blanc de la zone de texte seulement
	GM_addStyle(".ii { background: white !important;margin:0 !important;padding: 5px 15px 0px !important; }");
	GM_addStyle(".hq { margin: 0 !important; }");
// Cachage du llibellé de multpile inbox + bouton "View all"
	GM_addStyle(".A2,.yj { display:none !important;color:#BBB !important;font-size:11px !important;line-height:11px !important;height:12px !important; }");


