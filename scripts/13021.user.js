// ==UserScript==
// @name           Autofill Ebay Biding offer
// @description    Autofill offer boxes!
// @include        http://offer.ebay.*
// @include        http://cgi.ebay.*
// ==/UserScript==

// -------------------  THIS IS FOR FIRST TIME BIDDING: ------------------- 
// Price that is in box beside.

try
{
	var priceGet = document.evaluate("//span[@style='white-space: nowrap;']", document, null, XPathResult.ANY_TYPE,null); 
	priceGet = priceGet.iterateNext();

	// Parse the content of string to remove £, €, $...
	for (var i = 0; i < 1 ; i++ )
	{
		nextPrice = priceGet.textContent;
	}
	if (nextPrice != "")
	{
		if (nextPrice[0] == "E")
		{
			nextPrice = nextPrice.substring(4);
		}
		else 
		{
			nextPrice = nextPrice.substring(1);	
		}	
	}
}
catch (err)
{
	// alert("You have been outbidded");
}

//  -------------------  THIS IS IF YOU HAVE BEEN OUTBID: ------------------- 
// Looks for outBid price and find <span id="ActionMaxBid">(Enter £2.40 <b>or more</b>)</span>

try
{
	var outBid = document.getElementById("ActionMaxBid");
	var outBidNextValue = outBid.innerHTML;
	if (outBidNextValue != "")
	{
		nextPrice = ( /[\d.]+/.exec(outBidNextValue));
	}
	// So if you have not bid on anything yet then you should also get the page at bottom filled.
    document.getElementsByName("maxbidTop")[0].value = nextPrice;
}
catch (err)
{
	// alert("Its your first time bidding.");
}

// --- NOW TAKE nextPrice AND put it in box. -----
// Replace Bid again field
//if (document.getElementsByName("maxbidTop")[0].type != "hidden")
//{
//	document.getElementsByName("maxbidTop")[0].value = nextPrice;
//}

