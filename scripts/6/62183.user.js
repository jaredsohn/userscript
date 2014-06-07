// ==UserScript==
// @name           woot!  i want that
// @namespace      vpoet
// @description    automatically begin to purchase certain woot items & alert when doing so
// @include        http://www.woot.com/
// @include        http://www.woot.com/Default.aspx
// @include        http://*.woot.com
// @include        http://woot.com
// ==/UserScript==

// last edited 11/17/2009
// thanks to AndrewNeo for title/price gathering using his Woot Titler script (my old way was broken)
// thanks to Stateful for his Woot.com Sold Out Audio script

// need to add order.aspx support and word1&word2$price*amount
// (i.e. woot&monkey$5*3 for 3 woot screaming monkeys <=5 dollars each)

// array for what you want.
// can use item$price to not attempt if over given price.

var iWant="random crap, woot-off$10";
var iWant=iWant.toLowerCase();


var itemTitle=document.evaluate("/html/body/form/div/div/div/h2", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
var itemTitle=itemTitle.toLowerCase();
var wantoneButton = document.getElementById('ctl00_ctl00_ContentPlaceHolderLeadIn_ContentPlaceHolderLeadIn_SaleControl_HyperLinkWantOne'); 
var wantoneleftButton = document.getElementById('ctl00_ContentPlaceHolder_OrderButton'); 
var itemPrice=document.evaluate("/html/body/form/div/div/div/h3/span/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
var soldOut; 
var currentItemArray = 0; 
var isAbovePrice;
var desiredPrice;
var myWanted=new Array();
var myWanted=iWant.split(", ");


if (wantoneButton.getAttribute("class") == "soldOut") {soldOut = true};


for (currentItemArray in myWanted)
{
	var splitItemAndPrice = myWanted[currentItemArray].split("$",2);
	var desiredPrice = parseFloat(splitItemAndPrice[1]);

	if (desiredPrice)
		{
			if (itemPrice > desiredPrice)
			{
				isAbovePrice = true;
			} else {
				isAbovePrice = false;
			}
		} else {
			isAbovePrice = false;
		}

	if (itemTitle.search(splitItemAndPrice[0]) > -1)
		{
			if (isAbovePrice == false && !soldOut)
			{
				soundAlert = document.createElement("div");
				soundAlert.innerHTML = "<embed src=\"http://vpoet.net/woot/tada.wav\" autostart=true hidden=true>";
				pageContent = document.getElementById("fullSaleStats");
				pageContent.parentNode.insertBefore(soundAlert, pageContent);
				location.href = "http://www.woot.com/" + wantoneButton.getAttribute("href");
				location.href = "http://www.woot.com/" + wantoneleftButton.getAttribute("href");
				var tO=9000;
				window.setTimeout('window.location.href="http://www.woot.com/"',tO);
			}
		}
}

var tO=9000;
window.setTimeout('window.location.href="http://www.woot.com/"',tO);
