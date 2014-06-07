// ==UserScript==
// @name           Yoji's Gmail tweaker
// @namespace      http://www.yojimbo.fr
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==


// Font
GM_addStyle("body, td, input, textarea, select { font-family: 'Trebuchet MS', arial, sans-serif !important; }");

// Button bar when chat on left
GM_addStyle(".VP5otc-pzeoBf {margin-right: 0px !important; padding-right:0px !important;}");

// Hiding Multiple inbox titles
GM_addStyle(".BltHke > .nH {display: none !important;}");

// Muzzle status
GM_addStyle(".vG {display: none !important;}");
GM_addStyle(".T0{margin-top: 34px !important;}");
GM_addStyle(".T0 .r, .T0 .dF, .T0 .uk {display: none !important;}");

GM_addStyle(".T0 .vr {font-size: 11px !important;}");
GM_addStyle(".T0 .vI td {position: relative !important;}");
GM_addStyle(".T0 .vI td img {position: absolute!important; top:0 !important; left:0 !important}");

// Sharpning buttons
GM_addStyle(".T-I {margin-right: 5px !important;height: 22px !important;line-height: 22px !important;min-width: 0 !important;outline: 0 !important;padding: 0 5px !important;}");


// Clean mail
GM_addStyle(".hx {border: 1px solid #CCC !important;overflow: hidden !important;border-top: none !important;}");
GM_addStyle(".hx .h7 .G3.G2{background: -webkit-linear-gradient(top, rgba(245, 245, 245, 1) 0%,rgba(245, 245, 245, 1) 100%) no-repeat !important;-webkit-background-size: 100% 55px !important;}");

GM_addStyle(".hx .h7 .gB{padding: 12px !important;}");
GM_addStyle(".hx .h7 .gA {background: whiteSmoke !important;}");


// Remove Adds
GM_addStyle(".FDerDe{display: none !important;}");