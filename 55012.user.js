// ==UserScript==
// @name	GaiaMarketManager
// @namespace	http://themashew.com
// @description	Looks at an items price, calculates the 2% and tells if it is worth it.
// @include	http://www.gaiaonline.com/marketplace/*
// @exclude http://www.gaiaonline.com/marketplace/
// ==/UserScript==
//vend_rows_ex_buybid
var buyNow,x,buttonNum = 0;

for (x = 0; x < 10; ++x, ++buttonNum) {
	if((x%2) == 1)
	{
			buyNow = document.getElementsByClassName("vend_rows_ex_buybid").item(x).innerHTML;
			if(buyNow.indexOf("transaction_button alt") != -1)
			{
				++x;
				++buttonNum;
				buyNow = document.getElementsByClassName("vend_rows_ex_buybid").item(x).innerHTML;
			}
			else
			{
				++x;
				buyNow = document.getElementsByClassName("vend_rows_ex_buybid").item(x).innerHTML;
			}
		
	}
	else
	{
		buyNow = document.getElementsByClassName("vend_rows_ex_buybid").item(x).innerHTML;
		if(buyNow.indexOf("transaction_button alt") != -1)
		{
			++buttonNum;
			++x;
			buyNow = document.getElementsByClassName("vend_rows_ex_buybid").item(x).innerHTML;
		}
	}
	buyNow = buyNow.substr(buyNow.indexOf("</a>") + 4, buyNow.indexOf("g"));
	buyNow = buyNow.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
	if (buyNow.indexOf(",") != -1) {
		buyNow = buyNow.replace(",", "");
		buyNow = buyNow.replace("g", "");
	}
	else {
		buyNow = buyNow.replace("g", "");
	}
	buyNow = Math.ceil((buyNow * 0.02)).toString();
	var insertHere = document.getElementsByClassName("transaction_button").item(buttonNum);
	var twoPercent = "<b>&nbsp;&nbsp;&nbsp;" + buyNow + "</b>";
	insertHere.innerHTML += twoPercent;
}

