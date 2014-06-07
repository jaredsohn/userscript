// ==UserScript==
// @name           Neopets - Shop Of Mystery Autobuyer
// @namespace      http://www.gaminggutter.com and http://userscripts.org
// @copyright      Backslash
// @include        http://www.neopets.com/winter/*
// @version        1.2
// @license        GNU GPL
// @note           Bags cost up to 10k
// ==/UserScript==

if(location.href.match('winter/shopofmystery.phtml'))
 {
setTimeout(function(){location.href = document.location}, 750)

var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; ++i)
{
    item = links.snapshotItem(i);
 
        if(item.href.match('process_shopofmystery.phtml'))
    {
	
 document.location=item.href;
    }

    }
}

var Sold = document.getElementById("content").innerHTML.match("sold that Mystery Item already");
var Bought    = document.getElementById("content").innerHTML.match("open the mystery bag to find");
var ShopEmpty    = document.getElementById("content").innerHTML.match("have any items for you");
var LowNP    = document.getElementById("content").innerHTML.match("have enough");

		    if(Sold != null)
		    {
			 setTimeout(function(){location.href = 'http://www.neopets.com/winter/shopofmystery.phtml'}, 750)
		    }
		    else if(Bought != null)
		    {
			  alert('Bought a Mystery Bag!')
		    }
			else if(LowNP != null)
			{
			setTimeout(function(){location.href = 'http://www.neopets.com/winter/shopofmystery.phtml'}, 750)
			}
			else
			{
			return;
			}