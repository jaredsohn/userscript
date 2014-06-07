// ==UserScript==
	// @name			Bux AdRemover
	// @namespace		Bux AdRemover
	// @description		Removes ads from almost all bux sites and also bypass verification on a few sites.
	// @license			GNU GPL
	// @copyright		Ch120
	// @version			1.0.4
	// @include			http*adclick.php?ID=*
	// @include			http*autosurfpro*run.cgi?userid=*
	// @include			http*bux*/v/?l=*
	// @include			http*bux*/v/?h=*
	// @include			http*bux*/v?h=*
	// @include			http*bux*/v/?a=*
	// @include			http*bux*/vad?k=*
	// @include			http*bux*surf.php*
	// @include			http*bux*surfing*
	// @include			http*cashads.php?ad=*
	// @include			http*cks.php?k=*
	// @include			http*click.php?k=*
	// @include			http*goster.php?*
	// @include			http*gpt.php?v=*
	// @include			http*index.php?p=view*
	// @include			http*links.php?k=*
	// @include			http*linxsense*index.php?v=*
	// @include			http*viewad.php?ad=*
	// @include			http*view.php?ad=*
	// @include			http*view.php?h=*
	// @include			http*viewp.php?ad=*
	// @include			http*mdl?k=*
	// @include			http*shortbux*mem.php*
	// @include			http*scripts/runner.php?*
// ==/UserScript==

///////////////////////////////////////////////////////////////
// Version History
// 0.1 - Script created.
// 0.2 - Added BeeBux.com, Bux.gs, NoMinCashout.com, ShortBux.com.
// 0.3 - Rewrote script. Added NeoBux.com. Removed ValueBux.
// 0.4 - ShortBux working and now bypass verification. BeeBux not working.
// 0.5 - Rewrote script, again. It should work now, please report if it dont.
// 0.6 - Added Bux.to, Bux3.com, CashMyBux.com, UncleBux.com.
// 0.7 - Optimized code.
// 0.8 - Added B-U-X.net, Advertising4You.net, IncreaseBux.com.
// 0.9 - Included more sites.
// 1.0 - More sites working and bypass countdown on ShortBux. Updated to work with NeoBux again.
// 1.0.x - New sites added!
///////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
/////////////* Only change below if you know what you are doing! */////////////
///////////////////////////////////////////////////////////////////////////////
var SiteURL = new Array('cks.php?k=', 'links.php?k='); // Sites that need special treatment
var ByPass = false;

function snapshot(A) {return document.evaluate(A, document, null, 7, null); }
var adLinks = snapshot("//a[contains(@onclick,'clt')]");

// Bux-Service
if(document.URL.indexOf('bux-service.com')!=-1) {
	var adHREF = snapshot("//a[contains(@href,'links.php?k=')]");
	ByPass = true;
}

// Bypass
if(ByPass) {
	for(var i = 0; i < adLinks.snapshotLength; i++) {
		var thisAd = adLinks.snapshotItem(i);
		thisAd.target = "_blank";
		thisAd.removeAttribute("onclick");
		thisAd.href = adHREF.snapshotItem(i).href;
	}
}

// ShortBux
if(document.URL.indexOf('shortbux.com/logmem.php?ad=')!=-1) {
	window.location.href = 'http://www.shortbux.com/visitmem.php?ad=' + document.URL.substring(document.URL.lastIndexOf('?ad=') + 4);
}

if(Iframe = document.evaluate("//iframe[@scrolling='yes']",document,null,9,null).singleNodeValue)
	Iframe.src = '';
else if(Iframe = document.evaluate("//frame[@name='surfmainframe']",document,null,9,null).singleNodeValue) // QualityBux
	Iframe.src = '';
else if(Iframe = document.evaluate("//frame[@name='Main']",document,null,9,null).singleNodeValue) // Fortuda
	Iframe.src = '';
else if(Iframe = document.evaluate("//frame[@name='myFairyWindow']",document,null,9,null).singleNodeValue) // AutoSurfPro
	Iframe.src = '';
else if(Iframe = document.getElementById('pgl'))
	Iframe.src = '';