// Integrates Amapsys price charts into Amazon product pages
// version 0.71
//
// ==UserScript==
// @name           Amazon-Amapsys Integration
// @namespace      http://schmacks.de/dev
// @description    Integrates Amapsys price development right into product pages
// @include        http://www.amazon.*
// ==/UserScript==

/* ----- BEGIN LICENSE BLOCK -----
Copyright (C) 2008 A. Schmacks

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
----- END LICENSE BLOCK ----- */




// =============================================================================
// INCLUDE AMAPSYS LINKS
// =============================================================================

// Check for ASIN element
var asinElement = document.getElementById('ASIN');
if ( asinElement ) {
	var asinCode = asinElement.value;
	// Now search for the price tag on the page
	var bPriceBlock = document.getElementById("priceBlock");
	if ( bPriceBlock ) {
		// Create block with Amapsys links and for later chart addition
		var bAmapsysBlock = document.createElement('div');
		bAmapsysBlock.innerHTML = '<div id="amapsys_block" style="color: #0078B3;">'
					+'<img src="http://www.amapsys.de/favicon.ico" border="0" align="absmiddle" /> <b>Amapsys:</b> '
//					+'<a id="amapsys_toggle_chart" name="'+ asinCode +'" title="Popup">&uarr; Chart</a> | '
//					+'<a id="amapsys_toggle_list" name="'+ asinCode +'" title="Integrated">&darr; List</a> | '
					+'<a target="_blank" href="http://www.amapsys.de/zeige-produkt-'+ asinCode +'.htm" style="color: #0078B3; text-decoration: none;">&rarr; Produktseite</a>'
					+'</div>';
		bPriceBlock.parentNode.insertBefore(bAmapsysBlock, bPriceBlock.nextSibling);

		// Event listener for the Amapsys links
//		document.addEventListener('click', function(pEvent) {
//			if ( pEvent.target.id=='amapsys_toggle_chart' ) {
//				var asinCode = pEvent.target.name;
//	   			var popup = window.open("http://www.amapsys.de/gstatistik.php?Asin="+ asinCode, 
//	   						"AmapsysChart", 
//	   						"width=450,height=385,left=50,top=50");
//				
//			} else if ( pEvent.target.id=='amapsys_toggle_list' ) {
//				// Find already activated price list or price chart
//				var bAmapsysList = document.getElementById("amapsys_list");
//				var bAmapsysChart = document.getElementById("amapsys_chart");
//				
//				var bShowAmapsysPrices = true;
//				var bAmapsysURL = null;
//				var bAmapsysBlockID = null;
//
//				// Check if stats should be toggled on -> or if stats type should be switched -> or if stats should be toggled off
//				switch ( pEvent.target.id ) {
//					case 'amapsys_toggle_chart':
//							bAmapsysURL = 'http://www.amapsys.de/gstatistik.php';
//							bAmapsysBlockID = 'amapsys_chart';
//							if ( bAmapsysChart ) {
//								bShowAmapsysPrices = false;
//							}
//							break;
//					case 'amapsys_toggle_list':
//							bAmapsysURL = 'http://www.amapsys.de/statistik.php';
//							bAmapsysBlockID = 'amapsys_list';
//							if ( bAmapsysList ) {
//								bShowAmapsysPrices = false;
//							}
//							break;
//					default:
//							break;
//				}
//
//				// Block visible? Remove it!
//				if ( bAmapsysList ) {
//					bAmapsysList.parentNode.removeChild(bAmapsysList);
//				} else if ( bAmapsysChart ) {
//					bAmapsysChart.parentNode.removeChild(bAmapsysChart);
//				}
//
//				// Show Amapsys stats?
//				if ( bShowAmapsysPrices ) {
//					var asinCode = pEvent.target.name;
//					var bAmapsysBlock = document.getElementById("amapsys_block");
//					bAmapsysPrices = document.createElement('div');
//					bAmapsysPrices.innerHTML = '<div id="'+ bAmapsysBlockID +'" style="width: 500px; height: 400px; border: none;">'
//								+'<iframe src="'+ bAmapsysURL +'?Asin='+ asinCode +'" width="100%" height="100%" name="amapsys_iframe" style="border: none;">The Amapsys frame should be visible here! Does your browser support IFRAMEs?</iframe>'
//								+'</div>';
//					bAmapsysBlock.insertBefore(bAmapsysPrices, bAmapsysBlock.lastChild.nextSibling);
//				}
//			}
//		}, true);
	}
}

// -- ChangeLog ------------------------
// 2008-08-26 | AS | Removed all popup and inner frame links, left only the external Amapsys product page link
// 2008-08-15 | AS | Amapsys doesn't allow its chart to be integrated anymore. :-( So open it as a popup instead.
//            |    | Goodie: integrated list works again, so it is revived. For now...
// 2008-04-04 | AS | Removed integrated list as it doesn't seem to work anymore... But added link to the product page
// 2008-02-29 | AS | Creation
// -------------------------------------