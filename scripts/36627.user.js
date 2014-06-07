// ==UserScript==
// @name           Analytics Vendor Detector
// @namespace      http://www.anon.com
// @description    Detects if a page is using Analytics vendor code
// @include        *
// ==/UserScript==

// v1.0

function highlightElement(el, insertEmptyTag) {
	var setHighlight = 0;
	// stylize the element
	try {
		el.style.border='2px #f00 dotted';
		el.style.background='#FCC';
		setHighlight = 1;
		if (insertEmptyTag && el.innerHTML.search(/^[		\n]*$/) != -1) {
			// insert marker for empty divs
			el.innerHTML = '<center><i><font size=-2 face=arial>(empty)</font></i></center>';
		}
	}
	catch (err)
	{
		;
	}
	return(setHighlight);
}


var scripts = document.getElementsByTagName( "script" );
var vendor = new Array();

for ( var i = 0; i < scripts.length; ++i ) {
	var scriptEl = scripts[ i ];
	// check both inline contents of a script block as well as its source (include file)
	var codeTest = scriptEl.innerHTML + ';' + scriptEl.src;
		if ( codeTest.search( /(ga\.js|urchin\.js|s_code\.js|s\.pageName|statse\.webtrendslive\.com|indextools\.js|counter_test\.js|\/counter\/counter\.js|eluminate\.js|cmdatatagutils\.js|cmglobaltags\.js|techprops\.js|ctasp-server\.cgi|ntpagetag_uwa\.js|hbx\.acct|msAnalytics\.js|js\.sitemeter\.com|sitemeter\.com\/js|hittail\.com\/mlt\.js|clicktale\.net\/WRb2\.js|clicktale\.net\/ct_mbl\.js|js\/woopra\.js)/i) != -1 ) {
			if (codeTest.search(/(ga\.js|urchin\.js)/i) != -1) {
			vendor[0] = 'Google Analytics';
		} else if (codeTest.search(/(s_code\.js|s\.pageName)/i) != -1) {
			vendor[1] = 'Omniture';
		} else if (codeTest.search(/statse\.webtrendslive\.com/i) != -1) {
			vendor[2] = 'WebTrends';
		} else if (codeTest.search(/indextools\.js/i) != -1) {
			vendor[3] = 'IndexTools';
		} else if (codeTest.search(/(counter_test\.js|\/counter\/counter\.js)/i) != -1) {
			vendor[4] = 'StatCounter';
		} else if (codeTest.search(/(eluminate\.js|cmdatatagutils\.js|cmglobaltags\.js|techprops\.js)/i) != -1) {
			vendor[5] = 'CoreMetrics';
		} else if (codeTest.search(/ctasp-server\.cgi/i) != -1) {
			vendor[6] = 'ClickTracks';
		} else if (codeTest.search(/ntpagetag_uwa\.js/i) != -1) {
			vendor[7] = 'Unica NetInsights';
		} else if (codeTest.search(/hbx\.acct/i) != -1) {
			vendor[8] = 'HBX';
		} else if (codeTest.search(/msAnalytics\.js/i) != -1) {
			vendor[9] = 'Microsoft Gatineau';
		} else if (codeTest.search(/(js\.sitemeter\.com|sitemeter\.com\/js)/i) != -1) {
			vendor[10] = 'Site Meter';
		} else if (codeTest.search(/hittail\.com\/mlt\.js/i) != -1) {
			vendor[11] = 'Hit Tail';
		} else if (codeTest.search(/(clicktale\.net\/WRb2\.js|clicktale\.net\/ct_mbl\.js)/i) != -1) {
			vendor[12] = 'Click Tale';
		} else if (codeTest.search(/js\/woopra\.js/i) != -1) {
			vendor[13] = 'Woopra';
		}
	}
}
var topPixel = 0;
for ( var i = 0; i < vendor.length; i++) {
	var messageDiv = document.createElement("div");
	var messageText = vendor[i] + ' code detected';
	if ( vendor[i] == 'Google Analytics')
		topPixel = 30;
	if ( vendor[i] == 'Omniture')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'WebTrends')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'IndexTools')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'StatCounter')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'CoreMetrics')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'ClickTracks')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Unica NetInsights')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'HBX')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Microsoft Gatineau')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Site Meter')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Hit Tail')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Click Tale')
		topPixel = topPixel + 30;
	if ( vendor[i] == 'Woopra')
		topPixel = topPixel + 30;
	messageDiv.id = vendor[i];
	messageDiv.innerHTML = '<div style="position: absolute; left: 0px; top: ' + topPixel + 'px;' +
		'border: 2px dotted #F00; ' +
		'font-size: 14px; font-family: arial; background-color: #FCC; z-index: 1000;' +
		'color: #000; margin:0px; padding:3px; font-weight:bold;">' +
		'&nbsp;' + messageText + '&nbsp;' +
		'</div>';
	window.status=messageText;
	if ( vendor[i] != undefined )
		document.body.insertBefore( messageDiv, document.body.firstChild );
	}
   