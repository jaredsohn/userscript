// ==UserScript==
// @name          Be A Tyoon
// @description	  Automatic Reload & Hide Expensive items for "Be a Tycoon" Facebook app
// @author        	usersXcript
// @version             v1.00
// @include       http://apps.facebook.com/beatycoon/*
// @include       http://apps.new.facebook.com/beatycoon/*
// ==/UserScript==
//
// Thanks to Wolfy, for the "Refresh Any" script and also to Vaevictus.

var debug = false;

function refr(){
	var INTERVAL = 241 * 60000 ; //Reload page every 241 min. (4 hours + 1 min)
	
	window.setTimeout(
	function(){
		window.location.reload() ;
	},
	INTERVAL
	);
}

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function hide_notAv(){
	var bat = xpath('//div[@class="item"]');
	var money = xpath('//ul[@id="app15420082636_user_stats"]/li[2]/div');
	money = money.snapshotItem(0).innerHTML;
	money = money.replace(/h\d/g, '');
	money = money.replace(/\D/g, '');
	
	var bat2 = xpath('//div[@class="price"]');
	for(var i = 0; i < bat2.snapshotLength; i++){
		var price = bat2.snapshotItem(i).innerHTML;
		price = price.replace(/\D/g, '');
		
		if(parseInt(price) > parseInt(money)){//Weird bug.
			if(debug) GM_log('Hiding ' + bat.snapshotItem(i).innerHTML + ' because ' + price + ' is larger than ' + money );
			bat.snapshotItem(i).style.display = 'none';
		}
		else
		{
			if(debug) GM_log('Ignoring ' + price + ': smaller than ' + money);
		}
	}
}

//refr(); //For next version

if(location.href.indexOf('http://apps.facebook.com/beatycoon/empire') == 0){
	hide_notAv();
}