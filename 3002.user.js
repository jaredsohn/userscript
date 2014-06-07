// ==UserScript==
// @name           True Cost Of Walmart
// @namespace      http://mywebsite.com/myscripts
// @description    Walmart prices translated to equivalent hours of work required by Associates and Supplier labor
// @include        http://www.walmart.com/*
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function computeRealCost(classname,tagname){
prices=getElementsByClass(classname,document,tagname);
for(p in prices){
	originalprice=prices[p].innerHTML;
	price=originalprice.substring(originalprice.indexOf("$")+1);
	currentprice=parseFloat(price.replace(/,/gi,""));
	var newHTML="";
	//original price
	newHTML+="<font color=gray>"+originalprice+"</FONT>";
	//Associates
	newHTML+="<BR>"+Math.round((currentprice/8.23)*10)/10+" <A href='http://www.wakeupwalmart.com/facts/#wages' style='text-decoration:none;'>Associate hours</A>";
	//Guangdong
	newHTML+="<BR>"+Math.round((currentprice/.165)*10)/10+" <A href='http://www.wakeupwalmart.com/facts/#china' style='text-decoration:none;'>Guangdong labor hours</A>";
	//Walmart CEO
	newHTML+="<BR>"+Math.round(((3600)*(currentprice/8434.49))*10)/10+" <A href='http://www.wakeupwalmart.com/facts/Wal-mart-pay-gap.pdf' style='text-decoration:none;'>Walmart CEO seconds</A>";
	prices[p].innerHTML=newHTML;
}
}

computeRealCost("PriceSmall","SPAN");
computeRealCost("PriceSmall","TD");
computeRealCost("PriceMedium","SPAN");
computeRealCost("PriceMedium","TD");
computeRealCost("PriceMBold","SPAN");
computeRealCost("PriceMBold","TD");
computeRealCost("PriceBig","SPAN");
computeRealCost("PriceBig","TD");
computeRealCost("PriceGiant","SPAN");
computeRealCost("PriceGiant","TD");
computeRealCost("PriceXLBold","SPAN");
computeRealCost("PriceXLBold","TD");
computeRealCost("PriceXLBold","DIV");
computeRealCost("header1red","TD");
computeRealCost("header1red","SPAN");
computeRealCost("header2red","TD");
computeRealCost("header2red","SPAN");

