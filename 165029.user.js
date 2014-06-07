// ==UserScript==
// @name           Bitcoin.de Auto Reload
// @description    Auto reload of asks/bids on bitcoin.de
// @author         ne0phyte
// @include        https://www.bitcoin.de/de/market*
// @version        1.52
// ==/UserScript==

function main () {
	var btcForSale = $('article.w220.fleft strong.c1.fs16')[0];

	var askPrice = $('article.w170.fleft strong.c1.fs16')[0];
	var bidPrice = $('article.w170.fleft strong.c1.fs16')[1];

	var askList = $('#trade_offer_results_table_body');
	var bidList= $('#trade_order_results_table_body');

	var prevAsk = parseValue(askPrice.innerHTML)
	var prevBid = parseValue(bidPrice.innerHTML)
	
	function reloadLists() {
		if ($('#search_offer_amount').val() == "" && $('#search_offer_critical_price').val() == ""){
			reloadList(askList, 'https://www.bitcoin.de/de/offerSearch?page=1', askPrice);
		}

		if ($('#search_order_amount').val() == "" && $('#search_order_critical_price').val() == ""){
			reloadList(bidList, 'https://www.bitcoin.de/de/orderSearch?page=1', bidPrice);
		}

		setTimeout(reloadLists, 10000);
	}

	function reloadBtcForSale() {
		var oldValue = parseValue(btcForSale.innerHTML);

		$.ajax({
			url: "https://www.bitcoin.de/de/market",
			success: function(data, status, xhr) {
				var value = $(data).find('article.w220.fleft strong.c1.fs16')[0].innerHTML;			
				if (value != btcForSale.innerHTML) {
					btcForSale.innerHTML = value;
				}				
				flashElement(btcForSale, oldValue, parseValue(btcForSale.innerHTML));
			}
		});

		setTimeout(reloadBtcForSale, 45000);
	}

	function reloadList(list, url, price) {
		var oldValue = parseValue(price.innerHTML);

		list.animate({opacity: 0.4}, 400);
		list.load(url, function() {
			list.animate({opacity: 1.0}, 200);

			var newPrice = $(list).find('tr td')[1].innerHTML;
			if (newPrice != price.innerHTML) {
				price.innerHTML = newPrice;				
			}
			flashElement(price, oldValue, parseValue(price.innerHTML));

			updateTitle();
		});

	}

	function flashElement(element, oldValue, newValue) {
		var color;
		if (newValue > oldValue) {
			color = '#BBFF00';
		} else if (newValue < oldValue) {
			color = '#FF6622';
		} else {
			color = '#CCCCCC';
		}
		$(element).css('background-color', color);
		$(element).animate({'background-color' : 'rgba(255, 255, 255, 0.0)' }, 5000);
	}
		
	function updateTitle() {
		var ask = parseValue(askPrice.innerHTML);
		var bid = parseValue(bidPrice.innerHTML);
		
		document.title = ask.toFixed(2) + getSign(ask - prevAsk) + ' | ' + bid.toFixed(2) + getSign(bid - prevBid);
		document.title += ' Bitcoin Marktplatz';

		prevAsk = ask;
		prevBid = bid;		
	}

	function parseValue(value) {
		return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
	}
	
	function getSign(value) {
		if (value > 0) {
			return '+';
		} else if (value < 0) {
			return '-';
		}
		return '';
	}


	var hide = $('<div><a>Ausblenden</a></div>');
	hide.click(function() {$('.system_messages').slideUp();});
	hide.css({'cursor' : 'pointer',
	'font-weight' : 'bold', 
	'width' : '960px',
	'text-align' : 'center',
	'background-color' : '#FFCCAA'});
	$('.system_messages').prepend(hide);
	
	updateTitle();
	setTimeout(reloadLists, 5000);
	setTimeout(reloadBtcForSale, 10000);
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);