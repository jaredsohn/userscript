// ==UserScript==
// @name           WoW AH Enhanced
// @namespace      aikar
// @include        http://*.wowarmory.com/auctionhouse/*
// ==/UserScript==
unsafeWindow.Auction.openCancel = function(id)
{
	unsafeWindow.Auction.cancel(id,new Image(0,0));
}
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery().live == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery().live == 'undefined') {
		//alert('waiting');
            window.setTimeout(GM_wait, 10000);
        } else {
            $ = unsafeWindow.jQuery;
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
       
			$('#similarAuctions .auctionTable tr').live('click',function(){
				var node = $(this);
				$('#pricePer').val('perItem'); 
				var name = node.find('td:eq(0)').text();
				var value = (parseInt(node.find('td .goldCoin').text()) * 100) 
					+ parseInt(node.find('td .silverCoin').text());
				var buy = value * .995;
				var buygold = Math.floor(buy / 100);
				var buysilver = Math.floor(buy % 100);
				
				var bid = value * .95;
				var bidgold = Math.floor(bid / 100);
				var bidsilver = Math.floor(bid % 100);
				
				$('#buyGold').val(buygold);
				$('#buySilver').val(buysilver);
				$('#startGold').val(bidgold);
				$('#startSilver').val(bidsilver);
			});
		
    }
			unsafeWindow.Auction.findInAH = function(name, load) 
		{
			name = name.replace("'", "\'");
			unsafeWindow.setcookie('armory.ah.search', name, false);

			if (load)
				unsafeWindow.Auction.openPage('search');
			else
				unsafeWindow.open('/auctionhouse/index.xml#search');
		}

