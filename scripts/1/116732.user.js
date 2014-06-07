// ==UserScript==
// @name           Steam Price Converter
// @version        2.1
// @namespace      http://luki.net.pl
// @description    None
// @include        http://store.steampowered.com/app/*
// @include        https://store.steampowered.com/app/*
// @include        http://store.steampowered.com/sub/*
// @include        https://store.steampowered.com/sub/*
// @include        http://store.steampowered.com/sale/*
// @include        https://store.steampowered.com/sale/*
// ==/UserScript==

var currencyFrom = "EUR";
var currencyTo = "PLN";

var urlGamePattern = new RegExp(/^https?:\/\/store.steampowered.com\/app\/\d+.*?$/i);
var urlPackagePattern = new RegExp(/^https?:\/\/store.steampowered.com\/sub\/\d+.*?$/i);
var urlSalePattern = new RegExp(/^https?:\/\/store.steampowered.com\/sale\/.*?$/i);
var pricenodes = new Array();
var originalprices = new Array();
var localscript;
var someNode;

if (urlGamePattern.test(document.documentURI) || urlPackagePattern.test(document.documentURI) || urlSalePattern.test(document.documentURI))
{
	someNode = document.getElementById("global_header");

	addCalcScript();
	
	localscript = document.createElement("script");
	localscript.type = "text/javascript";
	localscript.src = "http://javascriptexchangerate.appspot.com/?from=" + currencyFrom + "&to=" + currencyTo;
	document.body.insertBefore(localscript, someNode);
	
	var calcscript = document.createElement("script");
	calcscript.type = "text/javascript";
	calcscript.innerHTML = "function calcPrice(node, org_price, html) {\n" +
		"	var price = Math.round(" + currencyFrom + "to" + currencyTo + "(org_price * 100)) / 100;\n" +
		"	if (price >= 70)\n" +
		"		node.innerHTML = html + \" (<span style='color: #f00'>\" + price + \"</span> " + currencyTo + ")\";\n" +
		"	else\n" +
		"		node.innerHTML = html + \" (<span style='color: #0f0'>\" + price + \"</span> " + currencyTo + ")\";\n" +
	"}";
	document.body.insertBefore(calcscript, someNode);
	
	document.body.setAttribute("onload", "calcScript()");
}

function addCalcScript()
{
	var mypriceHtml;
	var myprice;
	divnodes = document.getElementsByTagName("div");
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.innerHTML = "function calcScript() {\n";
	for (i = 0; i < divnodes.length; i++)
	{
		if ((divnodes[i].getAttribute("class") == "game_purchase_price price") ||
			(divnodes[i].getAttribute("class") == "discount_final_price") ||
			((divnodes[i].getAttribute("class") == "game_area_dlc_price") && (divnodes[i].innerHTML.indexOf("<") == -1)))
		{
			try
			{
				var myvaluepattern = new RegExp(/([\d,\.-]+)/i);
				mypriceHtml = divnodes[i].innerHTML.trim();
				myprice = myvaluepattern.exec(divnodes[i].innerHTML)[1].replace(",", ".").replace("--", "00");
				mycurrency = mypriceHtml.replace(myprice.replace(".", ","), "");
				if(mycurrency == mypriceHtml)
					mycurrency = mypriceHtml.replace(myprice.replace(",", "."), "");
				switch(mycurrency) {
					case '€':
						mycurrency = 'EUR';
						break;
					case '$':
						mycurrency = 'USD';
						break;
					case '£':
						mycurrency = 'GBP';
						break;
					case '&nbsp;руб.':
						mycurrency = 'RUB';
						break;
					default:
						mycurrency = '---';
				}
				currencyFrom = mycurrency;
				myprice = parseFloat(myprice);
			}
			catch(err)
			{
				if (!mypriceHtml || mypriceHtml.length == 0)
				mypriceHtml = "N/A";
				myprice = null;
			}
			if(myprice != null)
			{
				divnodes[i].setAttribute("id", "pricediv_" + i);
				script.innerHTML += "var node = document.getElementById('pricediv_" + i + "'); if (node) calcPrice(node, " + myprice + ", '" + mypriceHtml.trim() +"');\n";
			}
		}
	}
	script.innerHTML += "};";
	document.body.insertBefore(script, someNode);
}