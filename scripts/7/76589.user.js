// ==UserScript==
// @name           Yoji's Gmail talk sidebar
// @namespace      http://www.yojimbo.fr
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

// décalage picto
	GM_addStyle(".vt { margin-bottom: -2px !important; }");
// Reduction taille textes sur nom des contacts
	GM_addStyle(".vC { font-size:12px !important;line-height: 10px !important; }");
// cachage du bloc de recherche
	GM_addStyle(".dF { display: none !important; }");