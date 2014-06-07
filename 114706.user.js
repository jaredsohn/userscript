// ==UserScript==
// @name           Hide FB Right Column
// @namespace      Nerdcules
// @description    Hides the right column on Facebook, and widens the main content pane
// @include        http://*.facebook.com/*
// ==/UserScript==
GM_addStyle( "#rightCol { display: none !important; }" );
GM_addStyle( "#pagelet_sidebar { display: none !important; }" );
GM_addStyle( "#home_stream { width: 800px !important; }" );
GM_addStyle( "#mainContainer { width: 200% !important; }" );