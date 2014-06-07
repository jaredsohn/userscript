// Half TotalUsed
// version 0.1
// 2006-04-16
// Copyright (c) 2006, Robert Litzke
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// the default option for priceChoice selected. (Everything is set).
// If you use Domestic Expedited (expensive domestic), change
// priceChoice (the uppermost variable below) to 2.
// If you use International Standard, set priceChoice to 3.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Half TotalUsed
// @namespace     http://www.litzke.com
// @description   Adds shipping to Half.com prices
// @include       http://*product.half.ebay.*
// ==/UserScript==
alert("test");
var priceChoice=1;

	//used to set shipping price; might change in the future
var priceList=new Array(
    0,//placeholder
	2.69,//Music/DVD
	1.65,
	5.30,//expedite
	3.70,
	3.25,//Games,Paperbacks
	1.65,
	5.30,//expedite
	3.75,
	2.79,//VHS
	1.49,
	5.30,//expedite
	3.70,
	3.70,//Hardcover
	2.15,
	5.79,//expedite
	4.00
	);
	var finalPrice=0; //variable containing the price for the current item modified
	
//just searches to determine product type, then sets the correct pricing. if the product type is not found, returns false
//otherwise, returns true
function Find(searchVal)
{
	if(searchVal.indexOf('Music')>=0||searchVal.indexOf('DVD')>=0)
	{
		finalPrice=priceList[priceChoice];
		return true;
	}
	else if(searchVal.indexOf('Games')>=0)
	{
		finalPrice=priceList[4+priceChoice];
	}
	else if(searchVal.indexOf('Paperbacks')>=0)
	{
		if(document.innerHTML.indexOf("<b>Format:</b> Hardcover")>=0)
		{
			finalPrice=priceList[12+priceChoice];
		}
		else if(document.innerHTML.indexOf("<b>Format:</b> Paperback")>=0)
		{
			finalPrice=priceList[4+priceChoice];
		}
		return true;
	}
	else if(searchVal.indexOf('VHS')>=0)
	{
		finalPrice=priceList[8+priceChoice];
		return true;
	}
	else if(searchVal.indexOf('Hardcover')>=0)
	{
		finalPrice=priceList[12+priceChoice];
		return true;
	}
	return false;
}

//if(document.documentURI.indexOf('gp/search')>=0)
//{
	if(!Find(document.getElementsByTagName('title')[0].innerHTML))
	{
		//Find the main price and then call insertA to change it
		allDivs = document.evaluate(
	    '//td[@class="red"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
		insertA(allDivs,0);
	}
	//For a general search, our strategy is to make a list of result item types and used prices. These correspond (hopefull) on a 1:1 basis.
	//the big problem was that there is no nesting of anything specific to, say, books around used item prices. so we have to hope these match up.
	/*else
	{
		//get the list of "alias" and "pricing" information
		var pricing=document.evaluate('//span[@class="otherprice"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var alias=document.evaluate('//span[@class="aliasName"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < pricing.snapshotLength; i++) {
			if(Find(alias.snapshotItem(i).innerHTML)) //Find will also set the right shipping price
			{
			var temp=pricing.snapshotItem(i).innerHTML.substring(1); //grab the price
			var num=temp*1;
			num=num+finalPrice; //calculations for final price
			num=num.toFixed(2);
			temp=temp+" + "+finalPrice+" = <b>$"+num+"</b>";
			pricing.snapshotItem(i).innerHTML=temp;		
			}
		}
	}
}
}//This is for the product pages themselves
if(document.documentURI.indexOf('gp/product')>=0)
{*/
	Find(document.getElementsByTagName('title')[0].innerHTML);
	//Find the main price and then call insertA to change it
	var allDivs, thisDiv;
	allDivs = document.evaluate(
    '//div[@id="primaryUsedAndNew"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	insertA(allDivs,0);

	//Find the right sidebar price and change that
	allDivs = document.evaluate(
    '//div[@id="secondaryUsedAndNew"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
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
		temp[1]=temp[1].split('</');
		var num=temp[1][0]*1;
		num=num+finalPrice;
		num=num.toFixed(2);
		//This shows the calculation on the page (main window)
		if(document.innerHTML.indexOf("List Price: $")>=0)
		{
			var percentageChange=0;
			var priceTot=document.innerHTML.split("List Price: $");
			alert(priceTot);
			var mainPrice=priceTot[1].indexOf(" ");
			mainPrice=mainPrice(12);
			alert(mainPrice);
	    	percentageChange=(mainPrice-num)/mainPrice;
	    	percentageChange=Math.round(percentageChange*100);//props to Sheil Naik
			if(percentageChange>0) //if the used price is cheaper than new price
			{
				temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+num+'</b> ('+percentageChange+'% savings)<';
			}
			else //if the used price+shipping is more expensive than the new price
			{
				percentageChange*=-1;
				temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+num+'</b> ('+percentageChange+'% extra)<';
			}
		}
		else
    	{
			temp[1][0]=temp[1][0]+' + <i>'+finalPrice+'</i> = <b>$'+num+'</b><';
		}
	    thisDiv.innerHTML=temp[0] + temp[1][0]+temp[1][1];
    	}
    	//Small space prevents us from showing the full calculation on the sidebar
    	//else if(choice==1)
		//{
		//	temp[1][0]=temp[0]+'$'+num+'<'+temp[1][1];
	    //	thisDiv.innerHTML=temp[1][0];
    	//}
}
//}