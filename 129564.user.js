// ==UserScript==
// @author			Angel Vladov
// @name			eRepublik Economy Helper
// @namespace		eRepublikEconomyHelper
// @include			http://www.erepublik.com/*/market/*
// @include		   	http://www.erepublik.com/*/economy/exchange-market/
// @include			http://www.erepublik.com/*/main/messages-inbox
// @include			http://www.erepublik.com/*/citizen/profile/*
// @include			http://www.erepublik.com/*/economy/donate-items/*
// @include			http://www.erepublik.com/*/economy/donate-money/*
// @version			1.3.1
// @uso:version		1.3.1
// @description		Makes eRepublik economy easier. Sets market offers quantity from 1 to max. Shows scammers.
// @updateURL		http://userscripts.org/scripts/source/120277.user.js
// @grant		   	GM_xmlhttpRequest
// @grant			GM_addStyle
// @grant			GM_log 
// ==/UserScript==

var jQuery, $ = null;
var SHEET_KEY = '0ApMTf9THaJnRdHVzVklQT3JDV1hUU2xOUFgzX1pRQ3c';

function addJQuery(callback) {
	var p = null;
	
	if(window.opera || window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	}
	else {
		p = unsafeWindow;
	}
	
	jQuery = $ = p.jQuery.noConflict();
	callback();
}

function normalizeNumber(num) {
	var res = num.toString();
	var dotIndex = res.lastIndexOf('.');
	
	if(dotIndex < 0) {
		res += '.00';
	}
	else if(res.length - dotIndex <= 2) {
		res += '0';
	}
	
	return res;
}

var modifyMarket = function() {
	var INVENTORY_URL = 'http://www.erepublik.com/en/economy/inventory';
	var MARKET_MARKERS = ['market/', '/citizen'];
	var RES_TYPE_INDEX = 1;
	var RES_QUALITY_INDEX = 2;

	// Read total quantity
	var onInventoryError = function() {
		// Do nothing. Something wrong happened.
		return;
	};
	
	var onInventoryLoaded = function(response) {
		if(response.status != 200) return;
	
		var href = window.location.href;
		var marketInfo = href.substring(
			href.indexOf(MARKET_MARKERS[0]) + MARKET_MARKERS[0].length, 
			href.lastIndexOf(MARKET_MARKERS[1]))
			.split('/');
			
		var stockId = 'stock_' + marketInfo[RES_TYPE_INDEX] + '_' + marketInfo[RES_QUALITY_INDEX];
		var $inventory = $(response.responseText);
		var stockCount = $.trim($inventory.find('#' + stockId).text());
		
		if(!stockCount.length) return;
		
		var inventoryTag = '<div class="sattr">														\
			<small>Inventory</small>																\
			<div>																					\
				<span class="solid damage" style="background-color: #3BADA7">						\
					<strong style="text-shadow: 0 1px 0 #2F847E">' + stockCount + '</strong>\
				</span>																				\
			</div>				 																	\
		</div>';
		
		$(inventoryTag).insertAfter($('#filters_summary .sactual .sattr:last')).hide().fadeIn();
	};
	
	GM_xmlhttpRequest({
		method: "GET", 
		url: INVENTORY_URL,
		onerror: onInventoryError,
		onload: onInventoryLoaded
	});
	
	// Setup offers
	$('#content table td.m_product').parent().each(function() {
		var $row = $(this);
		var $buyBtn = $row.find('.m_buy a');
		
		var maxValue = parseInt($buyBtn.attr('data-max'));
		var price = parseFloat($buyBtn.attr('data-price'));
		var currency = $buyBtn.attr('data-currency');
	
		var totalPrice = Math.round(maxValue * price * 100) / 100;
		
		$row.find('input').val(maxValue);
		$buyBtn.find('span').text([$buyBtn.attr('data-i18n'), normalizeNumber(totalPrice), currency].join(' '));
	});
};

var modifyEconomyExchange = function() {
	var currency = $.trim($('#buy_flag em').text());
	
	$('#content table td.ex_buy').parent().each(function() {
		var $row = $(this);
		var $buyBtn = $row.find('button');
		
		var maxValue = Math.min(parseFloat($buyBtn.attr('data-max')), 10);
		var price = parseFloat($buyBtn.attr('data-price'));
		
		var totalPrice = Math.round(maxValue * price * 100) / 100;
		
		$row.find('input').val(maxValue);
		$buyBtn.text([$buyBtn.attr('data-i18n'), normalizeNumber(totalPrice), currency].join(' '));
	});
};

var modifyMessagesInbox = function() {
	function ScammersList(rawCsv) {
		var self = this;
		
		this.findById = function(id) {
			return self.data['id.' + id];
		};
		
		function parseRawCsv(rawCsv) {
			var lines = rawCsv.split('\n');
			if(lines.length < 1) return []; // DAFUQ happened here? Return an empty object.
			
			var fields = lines.shift().split(',');
			
			for(var i = 0; i < lines.length; i++) {
				var cells = lines[i].split(',');
				var obj = {};
				
				for(var j = 0; j < cells.length; j++) {
					obj[fields[j]] = cells[j];
				}
				
				lines[i] = obj;
				lines['id.' + obj['scammer.id']] = obj;
			}
			
			return lines;
		}
		
		this.data = parseRawCsv(rawCsv);
	}
	
	
	GM_addStyle('.eh-scammer .avatarholder {			\
		margin-top: 10px;								\
	}');
	
	GM_addStyle('.eh-scammer-alert {					\
		font-weight: bold;								\
		font-size: 10px!important;						\
		color: #FF0000 !important;						\
		text-decoration: none;							\
	}');
	
	GM_xmlhttpRequest({
		method: "GET", 
		url: 'http://docs.google.com/spreadsheet/pub?key=' + SHEET_KEY + '&output=csv',
		onerror: function() { /* Do nothing */ },
		onload: function(response) {
			if(response.status != 200) return;
			
			var scammers = new ScammersList(response.responseText);
			var $messages = $('#content div.message_ajax_container table.message_listing tr .entity .nameholder a');
			
			$messages.each(function() {
				var lastIndex = this.href.lastIndexOf('/');
				if(lastIndex < 0) return;
				
				var authorId = this.href.substr(lastIndex + 1);
				var scammerMatch = scammers.findById(authorId);
				
				if(scammerMatch) {
					var $thisParent = $(this).parent();
				 	$thisParent.find('span').prepend('<a class="eh-scammer-alert" href="javascript:void(0)" title="' + 
						scammerMatch['reason.en'] + 
						'">SCAMMER<a/><br />'
					);
						
					$thisParent.parents('tr').addClass('eh-scammer');
				}
			});
		}
	});
};

var modifyCitizenProfile = function() {
	var pageHref = window.location.href;
	var citizenId = pageHref.substr(pageHref.lastIndexOf('/') + 1);
	
	GM_addStyle('.eh-scammer-alert {					\
		font-weight: bold;								\
		font-size: 16px!important;						\
		color: #FF0000 !important;						\
		text-decoration: none;							\
	}');
	
	GM_xmlhttpRequest({
		method: "GET", 
		url: 'http://spreadsheets.google.com/feeds/list/' + 
			SHEET_KEY + '/od6/public/values?alt=json&sq=scammer.id%3D' + citizenId,
		onerror: function() { /* Do nothing */ },
		onload: function(response) {
			if(response.status != 200) return;
			
			var json = eval('(' + response.responseText + ')');
			console.log(json);
			if(json && json.feed && json.feed.entry.length) {
				var scammerMatch = json.feed.entry[0];
				var linkHtml = '<a class="eh-scammer-alert" href="javascript:void(0)" title="' + scammerMatch['gsx$reason.en']['$t'] + '">&nbsp;&nbsp;SCAMMER<a/>';
				
				$(linkHtml).appendTo($('#content .citizen_profile_header h2 .citizen_presence').parent()).hide().fadeIn();
			}
		}
	});
};

// Apply script modifications
(function(href) {
	var pageModifiers = {
		'economy/exchange-market': 	modifyEconomyExchange,	// Economy exchange page
		'economy/market':			modifyMarket,			// Market page
		'messages-inbox':			modifyMessagesInbox,	// Modifies messages box to alerts for scammers
		'citizen/profile':			modifyCitizenProfile,	// Modifies citizen profile to show when user is a scammer
		'economy/donate-items':		modifyCitizenProfile,
		'economy/donate-money':		modifyCitizenProfile
	}
	
	for(var pageId in pageModifiers) {
		if(href.lastIndexOf(pageId) > 0) {
			addJQuery(pageModifiers[pageId]);
			return;
		}
	}
})(window.location.href);
