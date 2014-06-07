// WoD - market usage price
// version 0.3
// 2009-04-15
// Copyright (c) 2008, Wagner, Michael
// This program is still in beta 
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to 'Install User Script'.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select 'WoD - MarketUsagePrice', and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           WoD - MarketUsagePrice
// @namespace      http://www.wod-enzy.de/sites/tools/gm_scripts/test.user.js
// @include        http*://*.world-of-dungeons.org/wod/spiel/trade/trade.php*
// ==/UserScript==

var sVersion = "0.3";
var sName = "MarketUsagePrice";

var allSelects = document.getElementsByTagName('input');
for (var i = 0; i < allSelects.length; i++)
	{
	var thisSelect = allSelects[i];
	// For Chinese server
	if (thisSelect.type == "submit" && thisSelect.value == "购买")
		{
		var aNodes = thisSelect.parentNode.parentNode.getElementsByTagName('a');
		if (aNodes != null)
			{
			var aNode = aNodes[0];	
			var Ausdruck = /[\w\W]*\(([0-9]*)\/([0-9]*)\)/;
			if (aNode != undefined)
				{
				var ergebnis = Ausdruck.exec(aNode.parentNode.innerHTML);
				if (ergebnis != null)
					{
					//Anwendungen auslesen
					var aws = ergebnis[1];
					//Preis auslesen
					Ausdruck = /\]\[[0-9]*\]/;
					ergebnis = Ausdruck.exec(thisSelect.name);
					if (ergebnis != null)
						{
						var preis = ergebnis[0].substring(2, ergebnis[0].length - 1);
						//Wennn Preis un Anwendungen gefunden, Preis/AW errechnen und ausgeben (hinter gesammtpreis)
						if (isNaN(preis) == false && isNaN(aws) == false && preis > 0 && aws > 0)
							{
							var preisAW = parseFloat(preis / aws);
							//if ( preisAW > parseInt(preisAW)) { preisAW = parseInt(preisAW) + 1; }
							var ntext = document.createElement('span');
							ntext.style.fontSize = "12px";
							ntext.style.verticalAlign = "middle";
							preisAW = parseFloat(parseInt(preisAW*100)/100);
							ntext.innerHTML = preisAW;
							aNodes = thisSelect.parentNode.parentNode.getElementsByTagName('td');
							aNodes = aNodes[3].getElementsByTagName('img');
							aNode = aNodes[0];
							aNode.parentNode.insertBefore(ntext, aNode.nextSibling);
							}
						}
					}
				}
			}
		}
	}

