// ==UserScript==
	// @name			Ad Remover
	// @namespace		Ad Remover
	// @description		For removing adds from uniquelancer.com and almost all bux sites. It will verify some of the bux sites also.
	// @license			GNU GPL
	// @copyright		Rejwane
	// @version			0.0.1
	// @include			http*adclick.php?ID=*
	// @include			http*add_view_done.php?add_id=*
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