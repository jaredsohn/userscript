// ==UserScript==
// @name           Yoji's Gmail BG
// @namespace      http://www.yojimbo.fr
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// ==/UserScript==

// Ajout background
	GM_addStyle(".cP { background: #666  no-repeat top left !important;background-size: cover  !important; }");

	GM_addStyle(".Bs .Bu:nth-child(4) .nH { width:5px !important;}");


	GM_addStyle(".Bs .Bu:nth-child(3) .k { background: rgba(255, 255, 255, 0.7) !important;border: 4px solid white !important;-moz-border-radius: 5px !important;-webkit-border-radius: 5px !important; border-radius: 5px !important;  }");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .A1{ background: rgba(255, 255, 255, 0.5) !important;border-bottom: 3px solid white;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .AY{ display:none !important;}");
 	GM_addStyle(".Bs .Bu:nth-child(3) .k .TB, .k .no .TC{ background:none !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .TC { border:none !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .nK { border:none !important; margin:0 !important;background:none !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .nK .A1{ border-top:4px solid white !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .yO { background: rgba(255, 255, 255, 0.5) !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .yO:hover { background: rgba(205, 245, 150, 1) !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .xY { border-bottom: 1px solid white !important;}");
	GM_addStyle(".Bs .Bu:nth-child(3) .k .Cp { margin:0 0 20px !important;}");


	GM_addStyle(".z .pi { display:none !important;}");
	GM_addStyle(".z .m { background:none !important;margin:0 !important;padding:0 !important;}");
	GM_addStyle(".z .n { background:none !important;margin:0 !important;padding:0 !important;}");

	GM_addStyle(".s .vI:hover { background:#FFD !important;}");
	GM_addStyle(".s .vI td { border-top: 1px solid transparent !important;}");
	GM_addStyle(".s .pt { border:none !important;background:none !important;}");
	GM_addStyle(".s .vC { background:none !important;}");
	GM_addStyle(".s .vE { background:#66BF25 !important;}");
	GM_addStyle(".s .uk { background:none !important;}");
	GM_addStyle(".s .l  { background: rgba(255, 255, 255, 0.7) !important;}");
	GM_addStyle(".s .r  { background: white !important;}");
	GM_addStyle(".s .pu .n  { margin:0; !important;}");



	var random_bg = Math.floor(7*Math.random())+1;
	GM_addStyle(".cP { background-image: url(http://www.yojimbo.fr/_images/gmail_"+random_bg+".jpg)  !important; }");

