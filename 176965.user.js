// ==UserScript==
// @name           Trade Add Bot
// @version        1.3
// @include        http://steamcommunity.com/trade/*
// @match          http://steamcommunity.com/trade/*
// @require        http://cdn.steamcommunity.com/public/javascript/prototype-1.7.js
// ==/UserScript==

setTimeout(function() {
    $$(".filter_ctn")[0].children[0].replace("<div class='selectableNone'>Looking for a specific item?" +
        "<div style='margin-top:-10px;float:right;height:25px'>" +
        "<input style='margin-top:-2px;width:70px' class='filter_search_box' type='text' id='filteramount' value='' placeholder='Amount' autocomplete='off'>" +
        "<div id='addxfiltered' style='margin-bottom:15px' class='pagebtn'>&gt;&gt;</div>")
    $('addxfiltered').observe('click', function(event) {
        var amount = parseInt($('filteramount').getValue());
        if(isNaN(amount)) amount=16;
	var items=document.evaluate('//div[@id="inventories"]//div[@class="inventory_ctn"][@style!="display: none;"]//div[@class="itemHolder"]/div[starts-with(@id,"item")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	console.log("amt=" + amount + " items=" + items.snapshotLength);
	function MoveRetry(item) { 
		try { MoveItemToTrade(item)  } 
		catch(err) { setTimeout(MoveRetry, 35, item) } 
		function MoveIf(item) { 
			if (document.GetElementById('#inventories').GetElementById(item.id)) { 
				console.log("retry");
				MoveRetry(item)
			}
		}
		setTimeout(MoveIf, 200, item);
	}
	for( i=0; i < items.snapshotLength && i < amount; i++) setTimeout( MoveRetry, 1*i, items.snapshotItem(i) )
    });
}, 10);
