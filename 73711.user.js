// ==UserScript==
// @name           MtimeCard
// @namespace      http://userscripts.org/scripts/show/73711
// @include        http://my.mtime.com/app/card/*
// ==/UserScript==

var MtimeCard  = {
	initialize: function() {
		switch (this.getPage()) {
		case 'index':
			this.createButtons();
		default:
		}
	},
	createButtons: function() {
		try {
			var mc = this.xpath("//input[@method='mixtureCard']")[0];
			if (mc == null) throw '1';
			var btnSell = document.createElement('input');
			btnSell.type = 'button';
			btnSell.className = 'btn_gray false';
			btnSell.value = '贱卖';
			btnSell.disabled = true;
			btnSell.setAttribute('method', 'sellCard');
			mc.parentNode.appendChild(document.createTextNode('  '));
			mc.parentNode.appendChild(btnSell);
			btnSell.addEventListener('click', function(){
				MtimeCard.sellThese(MtimeCard.getSelectedCards());
			}, false);
			btnSell.addEventListener('mouseover', function(){ this.className='btn_blue'; }, false);
			btnSell.addEventListener('mouseout', function(){ this.className='btn_gray'; }, false);

			var cardImgs = this.xpath("//div[@class='card_frame pb15']/div[@class='clearfix mt15 ml3']/div[@class='card_img']");
			if (cardImgs == null) throw '2';
			for (var i=cardImgs.length-1; i>=0; i--) {
				cardImgs[i].addEventListener('click', function(){
					var box = this.getElementsByTagName('b')[0];
					if (box.getAttribute('suitID') == '') return false;

					var atts = ['btn_gray', false];
					if (box.style.display == 'block' && MtimeCard.getSelectedCards().length <= 1) {
						atts = ['btn_gray false', true];
					}
					btnSell.className = atts[0];
					btnSell.disabled  = atts[1];
				}, false);
			}
		} catch (e) {
			alert(e.description ? e.description : e);
		}
	},
	sellThese: function(cards) {
		var sellTotal = cards.length;
		for (var i=0; i<cards.length; i++) {
			var card = cards[i];
			var cardIndex = parseInt(card.cardID) % 5;
			if (cardIndex == 0) cardIndex = 5;
			MtimeCard.get(
			'http://sandbox.my.mtime.com/Service/callback.mc', {
				'Ajax_CallBack': 'true',
				'Ajax_CallBackType': 'Mtime.MemberCenter.Pages.CallbackService',
				'Ajax_CallBackMethod': 'RemoteCallback',
				'Ajax_CallBackArgument0': 'card',
				'Ajax_CallBackArgument1': '/auction/buy.aspx?cardid='+card.cardID+'&pi=1&istool=&ordertype=&ajax=1&m=GetAuctionBySuitID',
				'Ajax_CallBackArgument2': 'suitID='+card.suitID+'&cardIndex='+cardIndex+'&pageIndex=1&orderType=3'},
				function(data) {
					var match = data.responseText.match(/\\"CardID\\":(\d+),/);
					var cardID = match[1];
					match = data.responseText.match(/\\"FixedPrice\\":(\d+),/);
					if (match == null) {
						var priceStart = 100;
						var priceFixed = 500;
					} else {
						var priceFixed = Math.min(500, Math.max(100, match[1]-1));
						var priceStart = Math.max(80, priceFixed-200);
					}
					MtimeCard.get(
						'http://sandbox.my.mtime.com/Service/callback.mc', {
						'Ajax_CallBack': 'true',
						'Ajax_CallBackType': 'Mtime.MemberCenter.Pages.CallbackService',
						'Ajax_CallBackMethod': 'RemoteCallback',
						'Ajax_CallBackArgument0': 'card',
						'Ajax_CallBackArgument1': '/auction/auction.aspx?pi=1&ajax=1&m=AddAuction',
						'Ajax_CallBackArgument2': 'cardID='+cardID+'&cardToolID=-1&timeLimited=8&startPrice='+priceStart+'&fixedPrice='+priceFixed},
						function (resp) {
							sellTotal = sellTotal-1;
						}
					);
				}
			);
		}

		function checkSelling() {
			if (sellTotal > 0) {
				window.setTimeout(checkSelling, 1000);
			} else {
				window.location.reload();
			}
		}
		checkSelling();
	},
	getSelectedCards: function() {
		var selected = [];
		var nodes = this.xpath("//div[@class='card_frame pb15']/div[@class='clearfix mt15 ml3']/div[@class='card_img']/b");
		for (var i=nodes.length-1; i>=0; i--) {
			if (nodes[i].style.display == 'block') {
				selected.push({
					'suitID': nodes[i].getAttribute('suitID'),
					'cardUserCardID': nodes[i].getAttribute('cardUserCardID'),
					'cardID': nodes[i].getAttribute('cardID')
				});
			}
		}
		return selected;
	},
	getPage: function() {
		var url = window.location.href;
		var matches = url.match(/^http:\/\/my\.mtime\.com\/app\/card\/([a-z0-9_]+)\//);
		return (matches==null) ? 'index' : matches[1];
	},
	xpath: function(query) {
		var nodes = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (nodes.snapshotLength > 0) {
			var ret = [];
			for (var i=nodes.snapshotLength-1; i>=0; i--)
				ret.push(nodes.snapshotItem(i));
			return ret;
		} else {
			return null;
		}
	},
	post: function(url, data, callback) {
		var postData = [];
		for (var key in data) {
			postData.push(key+'='+encodeURIComponent(data[key]));
		}
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data: postData.join('&'),
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			onload: callback
		});
	},
	get: function(url, data, callback) {
		var postData = [];
		for (var key in data) {
			postData.push(key+'='+encodeURIComponent(data[key]));
		}
		GM_xmlhttpRequest({
			method: "GET",
			url: url+'?'+postData.join('&'),
			onload: callback
		});
	}
};

window.addEventListener("load", function(){
	MtimeCard.initialize();
	return true;
}, false);