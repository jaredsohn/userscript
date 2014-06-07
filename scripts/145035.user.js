// ==UserScript==
// @name            Better Amazon.de
// @namespace       http://userscripts.org/users/isamux
// @description     Amazon with integrated Amapsys price-charts and payback reminder.
// @grant       	none
// @version         0.8.4
// @date            2010-04-03
// @creator         Patrick Menne
// @include         http://www.amazon.*
// ==/UserScript==

// Amapsys-Integration based on userscript "Amazon-Amapsys Integration" by A. Schmacks (http://userscripts.org/scripts/show/31457)

// ==Changelog==
// 2012-09-06  v0.84:
// * added Payback reminder link to site after an article is added to the cart.
// 2011-01-16  v0.83:
// * added image to Payback link
// * added blinking Reminder-heading above Payment link
// * width of price-history graph is adjusted to parent element's width
// 2010-12-31
// * added link to Payback
// 2010-11-19 
// * added link to display price history chart
// ==/Changelog==


// ===============
//  SCRIPT-MAIN
// ===============
    tryInsertPaybackReminder()
    
    tryInsertAmapsysBlock()

// ===============
//  FUNCTION LIB
// ===============
// ----------------------
// Payback-Reminder
// ----------------------
    function tryInsertPaybackReminder()
    {
		// on checkout link site
        var el = document.getElementById("gutterCartViewForm");
		
		// on site after article is added to shopping cart
		if(el == null)
		{
			isAfterAddToCartPage = document.getElementById("hl-cart");
			if(isAfterAddToCartPage)
				el = isAfterAddToCartPage.firstChild;
		}
		
        if(el && !document.getElementById("payback_block")) 
        {
            // build Payback reminder
            var bPaybackBlock = document.createElement('div');
            bPaybackBlock.id ="payback_block";
            bPaybackBlock.setAttribute("style", "text-align:center;color:#FFF;background-color:#F5AE54;padding: 0 0 0.5em 0;margin:4px;border:3px solid #990000;-moz-border-radius: 15px;");
            bPaybackBlock.innerHTML = '<div style="background-color: #990000; -moz-border-radius: 10px 10px 0 0;text-decoration: blink;margin-bottom: 0.5em;">Remember!</div>' +
                                        '<span><a title="zu Payback" style="color:#FFF" href="http://www.payback.de/pb/amazon_shop/id/10766/" target="_blank">' +
                                        '<img src="http://www.payback.de/pb/res/default/id/1048/ver/7/Payback-Logo.png" border="0" align="absmiddle" alt="Payback" />' + 
                                        '</a></span>';
            
            // insert payback reminder
            el.parentNode.insertBefore(bPaybackBlock, el);
        
        }    
    }
    
// ----------------------
// Amapsys-Integration 
// ----------------------
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

    function tryInsertAmapsysBlock()
    {
        // Check for ASIN element
        var asinElement = document.getElementById('ASIN');
        if (asinElement) 
        {
            var asinCode = asinElement.value;
            
            // Now search for the price tag on the page
            var bPriceBlock = document.getElementById("priceBlock");
            
            if ( bPriceBlock && !document.getElementById("amapsys_block"))
            {
                // Create block with Amapsys links and for later chart addition
                var bAmapsysBlock = document.createElement('div');
                bAmapsysBlock.id ="amapsys_block";
                bAmapsysBlock.setAttribute("style", "color:#0078B3;");
                 bAmapsysBlock.innerHTML =     '<hr size="1"/><img src="http://www.amapsys.de/favicon.ico" border="0" align="absmiddle" /> <strong>Amapsys:</strong> '
                            // +'<a id="amapsys_toggle_chart" name="'+ asinCode +'" title="Popup">&uarr; Chart</a> | '
                            // +'<a id="amapsys_toggle_list" name="'+ asinCode +'" title="Integrated">&darr; List</a> | '
                            +'<a target="_blank" href="http://www.amapsys.de/zeige-produkt-'+ asinCode +'.htm" style="color: #0078B3; text-decoration: none;">&rarr; Produktseite</a>'
                            +' | ';
                
                bAmapsysBlock.appendChild(buildTooglePriceHistoryGraphLink());    
                bAmapsysBlock.appendChild(document.createElement("hr"));
                bAmapsysBlock.appendChild(buildPriceHistoryGraph(asinCode, bPriceBlock));
                    
                bPriceBlock.parentNode.insertBefore(bAmapsysBlock, bPriceBlock.nextSibling);
            }
        }
    }

    function buildPriceHistoryGraph(psASIN, poPriceBlock)
    {
        oDiv = document.createElement("div");
        oDiv.setAttribute("style", "color:#000;margin: 5px 0;");
        
        
        oTmp = document.createElement("img");
        oTmp.id = "amapsys_block_chart";
        oTmp.setAttribute("style", "display:none;");
        oTmp.alt = 'Kein Preisverlauf verfügbar.'
        
        // adjust width of chart-image to parents width if smaller than parent.
        if(poPriceBlock.clientWidth <= 430)
        {
            oTmp.style.width = (poPriceBlock.clientWidth - 10) + 'px';
        }
        
        oTmp.src = 'http://www.amapsys.de/chart_test.php?asin='+ psASIN;
        oDiv.appendChild(oTmp);
        return oDiv;
    }
    
    function buildTooglePriceHistoryGraphLink()
    {
        aToggle = document.createElement('a');
    
        aToggle.innerHTML = "Chart ein/ausblenden";
        aToggle.style.cssText = "color: #0078B3;text-decoration: none;"    
        aToggle.href="#";        
        aToggle.addEventListener(
            'click',
            togglePriceHistoryGraph,
            true);    
            
        return aToggle;
    }
    
    function togglePriceHistoryGraph()
    {
        oImage = document.getElementById('amapsys_block_chart');
        if(oImage.style.display=="none")
        {
            oImage.style.display = "block";
        }
        else
        {
            oImage.style.display ="none";
        }
    }
