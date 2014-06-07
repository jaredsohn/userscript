// ==UserScript==
// @name      Auction Sniper - SIMPLIFIED
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include		http://www.neopets.com/auctions.phtml?type=bids&auction_id*
// @copyright  2012+, You
// ==/UserScript==
var startBidding = GM_getValue("startBid");
var minIncrease = 0;
var counter = 0;

	var tables = document.getElementsByTagName('table');
	var input = document.getElementsByName('amount');
    var inputs = document.getElementsByTagName('input');
	for(var i = 0; i< tables.length; ++i){
		if(tables[i].innerHTML.search('When?') != -1)
   		{
        counter++;
        	if (counter >= 2){  
     		var bidder = tables[i].childNodes[0].childNodes[1].childNodes[0].innerText;
                
            	if (bidder != " ######"){   //LEAVE THE EMPTY SPACE BEFORE YOUR NAME!, Delete this comment!!
    				//input[0].value = amount;
                    for(var o = 0; o < inputs.length; ++o){
                        if(inputs[o].value == "Place a Bid")
                        {
                         	inputs[o].click();   
                        }
                    }
           		}
        }
    }
   
    
}