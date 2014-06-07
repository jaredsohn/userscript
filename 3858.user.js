// Amazon TotalUsed
// version 0.3
// 2006-04-30
// Copyright (c) 2006, Robert Litzke
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Thanks to Sheil Naik for help with rounding
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Zoom Textarea", and click Uninstall.
//
//
//
// ------- CONFIGURATION ------- //
//
// You may configure this script based on your Amazon shipping options
// If you use Domestic Standard (cheapest option) most frequently, leave
// the default option for PRICE_CHOICE selected. (Everything is set).
// If you use Domestic Expedited (expensive domestic), change
// PRICE_CHOICE (the uppermost variable below) to 2.
// If you use International Standard, set PRICE_CHOICE to 3.
//
// --------------------------------------------------------------------
//
//Changelog:
// .2 - added support for general searches
// .25 - fixed rounding error, other small problems
// .3 - added support for specific searches
//.31 - replaced  document.getElementsByTagName("title")[0].innerHTML  with  document.title  ... duh!
//.35  (9/18/2008) - Amazon changed div IDs, so fixed that; updated pricing data, fixed lots of errors (DVDs work now)
//
// ==UserScript==
// @name          Amazon TotalUsed
// @namespace     http://www.litzke.com
// @description   Add shipping cost to used Amazon products in order to get accurate pricing. Version .35
// @include       http://www.amazon.com/*
// @include       http://amazon.com/*
// ==/UserScript==
var PRICE_CHOICE=1;

	//used to set shipping price; might change in the future
var priceList=new Array();
	priceList["Book"]=		[3.99,6.99,12.49];
	priceList["Music"]= 	[2.98,5.19,6.89];
	priceList["DVD"]=		[2.98,5.19,12.29];
	priceList["Game"]=		[3.99,6.99,-1];
	
var finalPrice=0; //variable containing the price for the current item modified

PRICE_CHOICE-=1;
//just searches to determine product type, then sets the correct pricing. if the product type is not found, returns false
//otherwise, returns true

function getShippingCost() {
	var shippingCost=-1;
	var temp=xpath('//td[@id="navCategoryInner"]');
	var toSearch=temp.snapshotItem(0).innerHTML;
	if(toSearch.indexOf('Books')>=0)
	{
		shippingCost=priceList["Book"][PRICE_CHOICE];
	}
	else if(toSearch.indexOf('Music')>=0)
	{
		shippingCost=priceList["Music"][PRICE_CHOICE];
	}
	else if(toSearch.indexOf('Movies &amp; TV')>=0)
	{
		shippingCost=priceList["DVD"][PRICE_CHOICE];
	}
	else if(toSearch.indexOf('Video Games')>=0)
	{
		shippingCost=priceList["Game"][PRICE_CHOICE];
	}
	return shippingCost;
}


function xpath(query) {
		return document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

function getTotalCost(shippingCost,initialCost) {
	shippingCost*=1;
	initialCost*=1;
	totalCost=shippingCost+initialCost;
	totalCost=totalCost.toFixed(2);
	return totalCost;
};

//This if statement is for searches (both general and, say, Book or Music specific 
if(document.documentURI.indexOf('gp/search')>=0||document.documentURI.indexOf('url=search')>=0)
{	
	finalPrice=getShippingCost();
	if(finalPrice!=-1) //For product-specific searches
	{
		//Find the main price and then call insertA to change it
		var allDivs = xpath('//span[@class="otherprice"]');
		
		//var pricing=xpath('//span[@class="otherprice"]');
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			var temp=allDivs.snapshotItem(i).innerHTML.substring(1); //grab the price
			var totalCost=getTotalCost(finalPrice,temp);
			temp=temp+" + "+finalPrice+" = <b>$"+totalCost+"</b>";
			allDivs.snapshotItem(i).innerHTML=temp;		
		}
	}
	//For a general search, our strategy is to make a list of result item types and used prices. These correspond (hopefull) on a 1:1 basis.
	//the big problem was that there is no nesting of anything specific to, say, books around used item prices. so we have to hope these match up.
	else
	{
		//get the list of "alias" and "pricing" information
		var pricing=xpath('//span[@class="otherprice"]');
		var alias=xpath('//span[@class="aliasName"]');
		for (var i = 0; i < pricing.snapshotLength; i++) {
			if(Find(alias.snapshotItem(i).innerHTML)) //Find will also set the right shipping price
			{
			var temp=pricing.snapshotItem(i).innerHTML.substring(1); //grab the price
			var totalCost=getTotalCost(finalPrice,temp);
			temp=temp+" + "+finalPrice+" = <b>$"+totalCost+"</b>";
			pricing.snapshotItem(i).innerHTML=temp;		
			}
		}
	}
}


//This is for the product pages themselves
if(document.documentURI.indexOf('gp/product')>=0||document.documentURI.indexOf('exec/obidos')>=0||document.documentURI.indexOf('/dp/')>=0)
{
	finalPrice=getShippingCost();
	//Find the main price and then call insertA to change it
	var allDivs, thisDiv;
	allDivs = xpath('//div[@id="primaryUsedAndNew"]');
	insertA(allDivs,0);

	//Find the right sidebar price and change that
	allDivs = xpath('//div[@id="secondaryUsedAndNew"]');
	insertA(allDivs,1);
}
//Insert the price and calculate total price into page
function insertA(allDivs,choice)
{
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
	    var inDiv=thisDiv.innerHTML;
	    
	    var temp=new Array();
		temp=inDiv.split('$');
		temp[1]=temp[1].split('<');
		var totalCost=getTotalCost(finalPrice,temp[1][0]);
		//This shows the calculation on the page (main window)
		if(choice==0)
		{
			var percentageChange=0;
			var mainPrice = document.evaluate('//b[@class="priceLarge"]',
			document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
			if(mainPrice.snapshotItem(0)!=null && mainPrice.snapshotItem(0).innerHTML.indexOf('$')>=0)
			{
				mainPrice=mainPrice.snapshotItem(0).innerHTML.substring(1)*1;
				percentageChange=(mainPrice-totalCost)/mainPrice;
				percentageChange=Math.round(percentageChange*100);//props to Sheil Naik
				if(percentageChange>0) //if the used price is cheaper than new price
				{
					temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+totalCost+'</b> ('+percentageChange+'% savings)<';
				}
				else //if the used price+shipping is more expensive than the new price
				{
					percentageChange*=-1;
					temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+totalCost+'</b> ('+percentageChange+'% extra)<';
				}
			}
			else
			{
				temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+totalCost+'</b><';
			}
			thisDiv.innerHTML=temp[0] + temp[1][0]+temp[1][1];
		}
		//Small space prevents us from showing the full calculation on the sidebar
		else if(choice==1)
		{
			temp[1][0]=temp[0]+'$'+totalCost+' (inc. shipping)<'+temp[1][1];
			thisDiv.innerHTML=temp[1][0];
		}
	}
}
