// ==UserScript==
// @name           MVT Tag Detector
// @namespace      http://www.anon.com
// @description    Detects if a page is using MVT vendor code
// @include        *
// ==/UserScript==

// v1.0
// Detects: testandtarget, optimost, vertster, optimizely, maxymizer, monetate, webtrends, Visual Website Optimizer, google website optimizer

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
var vendor = [];
var parseDivs = false;
var testAreas = 0;

for ( var i = 0; i < scripts.length; ++i ) {
	var scriptEl = scripts[ i ];
	// check both inline contents of a script block as well as its source (include file)
	var codeTest = scriptEl.innerHTML + ';' + scriptEl.src;

	if ( codeTest.search( /(^mbox|optimost|vertster|tt\.omtrdc|offermatica|webtrends|monetate|optimizely|utmx_section|_vis_opt_account_id|visualwebsiteoptimizer|maxymiser)/i ) != -1 ) {
		if (codeTest.search(/(^mbox|offermatica|tt\.omtrdc)/i) != -1) {
			vendor.push('Adobe Test and Target');
			parseDivs = true;
		}
		else if (codeTest.search(/optimost/i) != -1) {
			vendor.push('Optimost');
			parseDivs = true;
		}
		else if (codeTest.search(/vertster/i) != -1) {
			vendor.push('Vertster');
			parseDivs = true;
		}
		else if (codeTest.search(/monetate/i) != -1) {
			vendor.push('Monetate');
			parseDivs = true;
		}
		else if (codeTest.search(/optimizely/i) != -1) {
			vendor.push('Optimizely');
			parseDivs = true;
		}
		else if (codeTest.search(/optimize\.webtrends/i) != -1) {
			vendor.push('Web Trends');
			parseDivs = true;
		}		
		else if (codeTest.search(/utmx_section/i) != -1) {
			vendor.push('Google Website Optimizer');
			// the next page element will contain the test box
			testAreas += highlightElement(scriptEl.nextSibling, false);
		}
		else if (codeTest.search(/(_vis_opt_account_id|visualwebsiteoptimizer)/i) != -1) {
			vendor.push('Visual Website Optimizer');
			parseDivs = true;
		}
		else if (codeTest.search(/maxymiser/i) != -1) {
			vendor.push('Maxymiser');
			parseDivs = false;
		}
	}
}


var unique = function(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found,
        x, y;
        
    for ( x = 0; x < origLen; x++ ) {
        found = undefined;
        for ( y = 0; y < newArr.length; y++ ) {
            if ( origArr[x] === newArr[y] ) { 
              found = true;
              break;
            }
        }
        if ( !found) newArr.push( origArr[x] );    
    }
   return newArr;
};

vendor = unique(vendor);

if (vendor.length !== 0) {
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

	var messageText = '';
	for (var i=0;i<vendor.length;i++){ 
		messageText += vendor[i] + ' tag detected<br>';
	}
	messageText += '<span>' + testAreas + ' areas detected</span>';
	messageDiv.innerHTML = '<div style="position: absolute; left: 0px; top: 0px;' +
		'border: 2px dotted #F00; ' +
		'font-size: 14px; font-family: arial; background-color: #FCC; z-index: 99999999999999;' +
		'color: #000; margin:0px; line-height:20px; padding:3px; font-weight:bold;">' +
		messageText + '</div>';
	window.status=messageText;
	document.body.insertBefore( messageDiv, document.body.firstChild );
}