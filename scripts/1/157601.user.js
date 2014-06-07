// ==UserScript==
// @name			Stickied Google top bar.
// @version			0.0000003
// @namespace		https://www.google.co*
// @author			Joseph
// @description		Makes the top Google bar fixed to the top of the screen.
// @icon	https://www.google.com/images/google_favicon_128.png
// @run-at    		document-end
// @include			*google.co*
// @exclude			*/webhp?hl=en&tab=nw
// ==/UserScript==

GM_addStyle("#gbx3,#gbzc,#gbx1,#gbq{position:fixed !important;}");
GM_addStyle("#hdtbSum{position:fixed !important; background: white !important;width: 100%; margin-top: -13px; padding-top: 13px}");