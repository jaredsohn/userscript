// ==UserScript==
// @name           MVT Vendor Detector
// @namespace      http://www.anon.com
// @description    Detects if a page is using MVT vendor code
// @include        *
// ==/UserScript==

// v1.0
// Detects: offermatica, optimost, vertster, kefta, touch clarity, widemile, google website optimizer

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
var vendor = null;
var parseDivs = false;
var testAreas = 0;

for ( var i = 0; i < scripts.length; ++i ) {
	var scriptEl = scripts[ i ];
	// check both inline contents of a script block as well as its source (include file)
	var codeTest = scriptEl.innerHTML + ';' + scriptEl.src;

	if ( codeTest.search( /(^mbox|mbox\.js|optimost|vertster|offermatica|kefta|widemile|utmx_section|touchclarity|maxymiser\.js)/i ) != -1 ) {
		if (codeTest.search(/(^mbox|mbox\.js|offermatica)/i) != -1) {
			vendor = 'Omniture (Offermatica)';
			parseDivs = true;
			break;
		} else if (codeTest.search(/optimost/i) != -1) {
			vendor = 'Optimost';
			parseDivs = true;
			break;
		} else if (codeTest.search(/vertster/i) != -1) {
			vendor = 'Vertster';
			parseDivs = true;
			break;
		} else if (codeTest.search(/kefta/i) != -1) {
			vendor = 'Kefta';
			parseDivs = true;
			break;
		} else if (codeTest.search(/widemile/i) != -1) {
			vendor = 'Widemile';
			parseDivs = true;
			break;
		} else if (codeTest.search(/utmx_section/i) != -1) {
			vendor = 'Google Website Optimizer';
			// the next page element will contain the test box
			testAreas += highlightElement(scriptEl.nextSibling, false);
		} else if (codeTest.search(/touchclarity/i) != -1) {
			vendor = 'TouchClarity';
			parseDivs = true;
			break;
		} else if (codeTest.search(/maxymiser/i) != -1) {
			vendor = 'Maxymiser';
			parseDivs = false;
			break;
		}
	}
}

if (vendor != null) {
	if (parseDivs) {
		// walk through the DOM and highlight MVT div's
		var testZones = document.getElementsByTagName( "div" );

		for ( var i = 0; i < testZones.length; ++i ) {
			var testZone = testZones[ i ];

			if (testZone.id.search(/^(mbox|opindexed|vswap|kx_)/i) != -1) {
				// count test areas, but only if they're not hidden
				if (testZone.style.visibility != 'hidden' && testZone.style.display != 'none' && highlightElement(testZone, true)) {
					testAreas++;
				}
			}
		}
	}

	var messageDiv = document.createElement("div");
	var messageText = vendor + ' code detected (' + testAreas + ' areas)';
	messageDiv.id = "logo";
	messageDiv.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
		'border: 2px dotted #F00; ' +
		'font-size: 14px; font-family: arial; background-color: #FCC; z-index: 1000;' +
		'color: #000; margin:0px; padding:3px; font-weight:bold;">' +
		'&nbsp;' + messageText + '&nbsp;' +
		'</div>';
	window.status=messageText;
	document.body.insertBefore( messageDiv, document.body.firstChild );
}

