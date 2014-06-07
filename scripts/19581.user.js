// ==UserScript==
// @name           HW.no
// @namespace      Terw
// @include        http://*hardware.no/*
// ==/UserScript==

var css = ".headline { letter-spacing: -1px !important;}" +
					"#queryHeadline {letter-spacing: -1px !important; margin-top:0px;} "+
					".preamble { font-family:Verdana, Arial, Helvetica, sans-serif !important; font-size:12px !important; font-weight:bold !important; }" +
					".moreLink { font-size:14px !important; ";
GM_addStyle(css);
/**
 * Removes annoying bar that runs across the top of profile pages.
 * Not sure whether I want to remove it yet though :S
 * It's kinda growing on me.
**/
//GM_addStyle("@namespace url(http://www.w3.org/1999/xhtml); .account_info { border-bottom: none !important; background: none !important; }");


// REMOVE SOME EXTRA ADS //

var ad = ['ad180x500-1', 'ad468x100-1', 'ad468x400-1', 'topAd768x150', 'topAd180x150', 'feedProfiledCareers', 'ad768x400-1', 'textAds'];
var ad2 = '';

for (var i=0; i<ad.length; i++) {
	ad2 = document.getElementById(ad[i]);
	ad2.parentNode.removeChild(ad2);
}

// Speedometer
var s = document.getElementById('subjectMenu')
s.innerHTML = ('<li><a title="Data" href="http://www.hardware.no"><span>Data</span></a></li><li> <a title="Foto" href="http://www.akam.no"> <span>Foto</span> </a> </li><li> <a title="Mobil" href="http://www.amobil.no"> <span>Mobil</span> </a> </li><li> <a title="Spill" href="http://www.gamer.no"> <span>Spill</span> </a> </li><li> <a title="" href="h/"> <span></span> </a> </li><li><a title="Speedometer" href="speedometer"><span>Speedometer</span> </a> </li>');