// ==UserScript==
// @name           Magic AutoCard Preview
// @include        http://*mtgsalvation.com/*
// @include        http://*.starcitygames.com/*
// @include        http://*.wizards.com/*
// @include        http://*.mananation.com/*
// @include        http://*.gatheringmagic.com/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require	   https://github.com/malsup/corner/raw/master/jquery.corner.js
// @require    http://usocheckup.redirectme.net/84942.js
// @version	   1.9.0
// ==/UserScript==
// Wrapper for GM_xmlhttpRequest


function GM_XHR() {
	this.type = null;
	this.url = null;
	this.async = null;
	this.username = null;
	this.password = null;
	this.status = null;
	this.headers = {};
	this.readyState = null;

	this.open = function (type, url, async, username, password) {
		this.type = type ? type : null;
		this.url = url ? url : null;
		this.async = async ? async : null;
		this.username = username ? username : null;
		this.password = password ? password : null;
		this.readyState = 1;
	};

	this.setRequestHeader = function (name, value) {
		this.headers[name] = value;
	};

	this.abort = function () {
		this.readyState = 0;
	};

	this.getResponseHeader = function (name) {
		return this.headers[name];
	};

	this.send = function (data) {
		this.data = data;
		var that = this;
		GM_xmlhttpRequest({
			method: this.type,
			url: this.url,
			headers: this.headers,
			data: this.data,
			onload: function (rsp) {
				// Populate wrapper object with returned data
				for (var k in rsp) {
					that[k] = rsp[k];
				}
			},
			onerror: function (rsp) {
				for (var k in rsp) {
					that[k] = rsp[k];
				}
			},
			onreadystatechange: function (rsp) {
				for (var k in rsp) {
					that[k] = rsp[k];
				}
			}
		});
	};
}

$.ajaxSetup({
	xhr: function () {
		return new GM_XHR();
	}
});

(function () {
	var MTGS_QUERY_URL_ = 'http://www.magiccards.info/autocard.php?card=';
	var PRICES_QUERY_URL_ = 'http://partner.tcgplayer.com/syn/synhighlow.ashx';
	var PRICES_TABLE_URL_ = 'http://partner.tcgplayer.com/syn/Synidcate.ashx';
	var IMAGE_PREFIX_ = 'http://magiccards.info/scans/';
		
	var SLIDE_ANIM_DURATION_ = 100;
	var FADE_ANIM_DURATION_ = 300;

	var REQUESTS_ = {};
	var CARDS_ = {};

	var POPUP_OFFSET_X_ = 15;
	var POPUP_OFFSET_Y_ = 15;

	function determineTop($obj, top) {
		var tooltipHeight = $obj.height();
		var border_top = $(window).scrollTop();
		if (border_top + (POPUP_OFFSET_Y_ * 2) >= top - tooltipHeight) {
			return top + POPUP_OFFSET_Y_;
		} else {
			return top - tooltipHeight - POPUP_OFFSET_Y_;
		}
	}

	function determineLeft($obj, left) {
		var tooltipWidth = $obj.width();
		var border_right = $(window).width();
		if (border_right - (POPUP_OFFSET_X_ * 2) >= tooltipWidth + left) {
			return left + POPUP_OFFSET_X_;
		} else {
			return border_right - tooltipWidth - POPUP_OFFSET_X_;
		}
	}
	
	function buildTimeoutMagic(timeout, $obj, slide) {
		slide = slide || false;
		$obj.mouseenter(function (e) {
			window.clearTimeout(timeout);
		});
		$obj.mouseleave(function (e) {
			timeout = window.setTimeout(function () {
				if (slide) {
					$obj.slideUp(SLIDE_ANIM_DURATION_);
				} else {
					$obj.fadeOut(FADE_ANIM_DURATION_);
				}
			}, 500);
		});
	}

	function AutoCardGatherer() {
		var selection = window.getSelection();
		var cardName = selection.toString().replace(/ /g, "%5Cs");
		if (cardName) {
			var params = 'toolbar=0, location=0, directories=0, status=0, menubar=0, scrollbars=1, resizable=1, width=767, height=670';
			window.open('http://gatherer.wizards.com/Pages/Search/Default.aspx?name=%2B%5Bm%2F%5E' + cardName + '%24%2F%5D&special=true', 'autocard', params);
		}
	}

	function AutoCardMagicCardsInfo() {
		var selection = window.getSelection();
		var cardName = selection.toString().replace(/\&amp;/, '%26');
		if (cardName) {
			var params = 'width=950, height=500, scrollbars=1, resizable=1, menubar=0, status=0';
			window.open('http://www.magiccards.info/autocard.php?card=' + cardName, 'autocard', params);
		}
	}
	
	function toggleSlide() {
		var toggle = GM_getValue('toggleSlide', true);
		GM_setValue('toggleSlide', !toggle);
	}
	
	function toggleAnim() {
		var toggle = GM_getValue('toggleAnim', false);
		$.fx.off = !toggle;
		GM_setValue('toggleAnim', !toggle);
	}

	function expandPopup(id, $popup) {
		if (GM_getValue('toggleSlide', true)) {
			window.setTimeout(function () {
				if ($popup.is(':visible') && !$popup.is(':animated')) {
					$popup.animate({
						'width': '70%'
					}, SLIDE_ANIM_DURATION_, function () {
						$popup.animate({
							'left': determineLeft($popup, $popup.position().left - POPUP_OFFSET_X_)
						}, SLIDE_ANIM_DURATION_, function () {						
							$('#popupCardText-' + id).show();
						});
					});
				}
			}, 2000);
		}
	}

	function showPopup(msg) {
		var $xml = $(msg.xml);
		var id = msg.id;
		var style = msg.style;
		var expand = msg.expand;
		var cardImage = $xml.find('img[src^="' + IMAGE_PREFIX_ + '"]:first').attr('src');
		if (cardImage) {		
			var $text = $xml.find('td[width="70%"]:first');
			$text.attr('id', 'popupCardText-' + id);
			$text.hide();
			$text.find('ul').wrapAll('<div style="height: 35%; overflow: auto" />');
			$text.find('.otext').remove();
			var $name = $text.find('a:eq(0)');
			var cardName = $name.text();
			$name.replaceWith(cardName);
			$name = $text.find('span:eq(0)');
			$('img', $text).remove();
			$('a', $text).remove();

			var $list = $xml.find('td[width="30%"][nowrap="nowrap"]:first');
			$list.find('a:last').remove();
			$list.find('br').slice(-3).remove();
			$list.wrapInner('<div id="editions-' + id + '" style="max-height: 88%; overflow: auto; position: absolute;" />');
			$list = $($list.html());
			$list.find('small').css({
				'font': '8pt verdana, geneva, lucida, "lucida grande", arial, helvetica, sans-serif'
			});
			if (!expand) {
				$list.hide();
			}
			$list.addClass('alt1');
			if (style || $list.css('background-color') == "rgba(0, 0, 0, 0)") {
				$list.removeClass('alt1');
				$list.css({
					'background': 'white',
					'border-spacing': '2px 2px',
					'border-collapse': 'separate',
					'font': '10pt verdana, geneva, lucida, "lucida grande", arial, helvetica, sans-serif'
				});
			}
			$list.css({
				'border': '1px solid gray',
				'padding': '5px'
			});			
			$name.append($list);
			
			/*
			$name.append('<a id="close-button-' + id + '" style="float:right;" />');
			$name.find('#close-button-' + id).unbind().bind('click', function(e) {
				$('#popup-' + id).fadeOut(FADE_ANIM_DURATION_);
			}).text('[X]');
			*/
			var textHtml = $('<div>').append($text.clone()).remove().html();
			var popupHtml = "<table id='popup-" + id + "' width='305' border='0' class='popup'><tbody><tr><td valign='top' width='300'><div id='prices-" + id + "'></div><img width='300' height='428' src='" + cardImage + "' /></td>" + textHtml + "</tr></tbody></table>";
			var $popup = $('#popup-' + id);
			var $oldPrices = $('#prices-' + id);
			var oldPos = $popup.position();
			if ($popup.length > 0) {
				$popup.remove();
			}
			$('body').append(popupHtml);
			// Reset $popup to account for new content
			$popup = $('#popup-' + id);
			if (!expand) {
				$popup.hide();
			} else {
				// Add back in old prices for now just to keep the space
				$('#prices-' + id).replaceWith($oldPrices);
			}
			var $popupCardText = $('#popupCardText-' + id);
			$popupCardText.height('100%');
			
			$name = $popupCardText.find('span:eq(0)');
			var $editions = $('#editions-' + id);
			var timeout;
			$name.mouseover(function() {
				$editions.slideDown(SLIDE_ANIM_DURATION_);
				buildTimeoutMagic(timeout, $editions, true);
			}).mouseleave(function() {
				timeout = window.setTimeout(function() {
					$editions.slideUp(SLIDE_ANIM_DURATION_);
				}, 500);
			});
			$editions.mouseenter(function() {
				window.clearTimeout(timeout);
			});
			$editions.find('a').each(function (index, element) {
				var $element = $(element);
				var href = $element.attr('href');
				$element.attr('href', 'javascript:void(0);');
				$element.bind('click', function (e) {
					ajax({
						'id': id,
						'url': 'http://www.magiccards.info' + href,
						'dataType': 'html',
						'style': style,
						'expand': true
					});
				}, false);
			});
			
			$popup.css({
				'border': '1px solid gray',
				'padding': '5px',
				'position': 'absolute',
				'z-index': '1000'
			});
			$popup.addClass('alt1');
			if (style || $popup.css('background-color') == "rgba(0, 0, 0, 0)") {
				$popup.removeClass('alt1');
				$popup.css({
					'background': 'white',
					'border-spacing': '2px 2px',
					'border-collapse': 'separate',
					'font': '10pt verdana, geneva, lucida, "lucida grande", arial, helvetica, sans-serif'
				});
			}
			$popup.corner();
			
			if (expand) {				
				$popup.css({
					'width': '70%'
				});
				// Determine left separately so we can shift the left of the expanded popup correctly
				$popup.css({
					'left': determineLeft($popup, oldPos.left - POPUP_OFFSET_Y_),
					'top': determineTop($popup, oldPos.top - POPUP_OFFSET_X_)
				});				
			} else {
				$popup.css({
					'top': determineTop($popup, msg.top),
					'left': determineLeft($popup, msg.left)
				});				
			}
		
			var prices = $xml.find('script[src^="' + PRICES_TABLE_URL_ + '"]:first').attr('src');
			$.ajax({
				url: prices,
				complete: function (xhr, status) {
					if (status === "success") {
						$('#prices-' + id).empty();
						// We have to be clever here.
						// We get back javascript that we have to eval but we can't overwrite the page.
						// Instead change document.write to replace the correct prices div via jQuery.
						var text = xhr.responseText;
						text = text.replace('document.write', '$("#prices-' + id + '").append');
						text = text.replace(new RegExp('TCGPlayerPricingContainer', 'g'), 'TCGPlayerPricingContainer-' + id);
						text = text.replace(new RegExp('TCGProductPriceLowHigh', 'g'), 'TCGProductPriceLowHigh-' + id);
						text = text.replace(new RegExp('TCGPProducePriceList', 'g'), 'TCGPProducePriceList-' + id);
						text = text.replace(new RegExp('TCGPlayerStoreProducts', 'g'), 'TCGPlayerStoreProducts-' + id);
						eval(text);
						var $newPrices = $('#prices-' + id);
						$newPrices.find('.TCGPProductName, .TCGPHeader, .TCGPFooter').remove();
						$newPrices.find('.TCGPBuyNowCon').parent().remove();
						// Replace links in table with just the text.
						$newPrices.find('.TCGPPriceLow, .TCGPPriceMid, .TCGPPriceHigh').find('a').each(function(index, element) {
							var $element = $(element);
							var text = $element.text();
							$element.replaceWith(text);
						});
						
						var $list = $('#TCGPProducePriceList-' + id);
						$list.addClass('alt1');
						if (style || $list.css('background-color') == "rgba(0, 0, 0, 0)") {
							$list.removeClass('alt1');
							$list.css({
								'background': 'white',
								'border-spacing': '2px 2px',
								'border-collapse': 'separate',
								'font': '8pt verdana, geneva, lucida, "lucida grande", arial, helvetica, sans-serif'
							});
						}
						$('#TCGPlayerPricingContainer-' + id).width(300);
						var timeout;
						$('#TCGProductPriceLowHigh-' + id).width(300).css('border-bottom', '0px').mouseenter(function() {
							window.clearTimeout(timeout);
							$list.slideDown(SLIDE_ANIM_DURATION_);
							buildTimeoutMagic(timeout, $list, true);
						}).mouseleave(function() {
							timeout = window.setTimeout(function() {
								$list.slideUp(SLIDE_ANIM_DURATION_);
							}, 500);
						});
						$list.mouseenter(function() {
							window.clearTimeout(timeout);
						});
						$list.width(300).hide();
						$list.css({
							'position': 'absolute',
							'border': '1px solid gray'
						});
						$list.find('td').css('border', 'none');
						var $listTable = $list.find('.TCGPTable');
						$listTable.width(300);
						$listTable.find('td').removeClass('TCGPDetails').removeClass('TCGPDetailsRow1').removeClass('TCGPDetailsRow2').css({
							'border-top-width': '0px',
							'font-size': '8pt'
						});
						$listTable.find('tr:eq(1)').find('td').css('border', 'none');
						$list.find('a').each(function(index, element) {
							var $element = $(element);
							$element.attr('target', '_blank');
						});
					}
					
					if (expand) {
						$popupCardText.show();
						var timeout;
						buildTimeoutMagic(timeout, $popup);
					} else {
						$popup.fadeIn(FADE_ANIM_DURATION_);
						expandPopup(id, $popup);
					}
				}
			});
		}
	}

	function ajax(msg) {	
		var url = msg.url;
		var dataType = msg.dataType || 'xml';
		var id = msg.id;			
		var expand = msg.expand || false;
		$.ajax({
			url: url,
			dataType: dataType,
			beforeSend: function (xhr) {
				REQUESTS_[id] = xhr;
			},
			complete: function (xhr, status) {
				if (status == 'success') {
					var xml = xhr.responseText;
					showPopup({
						'xml': xml,
						'id': id,
						'left': msg.left,
						'top': msg.top,
						'style': msg.style,
						'expand': expand
					});
				}
			}
		});
	}

	function abort(id) {
		var xhr = REQUESTS_[id];
		if (xhr) {
			xhr.abort();
			delete REQUESTS_[id];
		}
	}

	function gup(url, name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = '[\\?&]' + name + '=([^&#]*)';
		var regex = new RegExp(regexS);
		var results = regex.exec(url);
		if (results === null) {
			return '';
		} else {
			return results[1];
		}
	}

	function magic(id, $element, cardUrl, style) {
		style = style || false;
		cardUrl = cardUrl.toLowerCase();
		var timeout;
		$element.mouseenter(function (e) {
			$('.popup').fadeOut(FADE_ANIM_DURATION_);
			timeout = window.setTimeout(function() {
				if (CARDS_[cardUrl]) {
					id = CARDS_[cardUrl];
				}
				var $popup = $('#popup-' + id);
				if ($popup.length > 0) {
					$('#popupCardText-' + id).hide();
					$('#TCGPProducePriceList-' + id).hide();
					$popup.width(300).css({
						'top': determineTop($popup, e.pageY),
						'left': determineLeft($popup, e.pageX)
					}).fadeIn(FADE_ANIM_DURATION_);
					expandPopup(id, $popup);
				} else {
					CARDS_[cardUrl] = id;
					ajax({
						'id': id,
						'url': cardUrl,
						'dataType': 'html',
						'top': e.pageY,
						'left': e.pageX,
						'style': style
					});
				}
			}, 100);
		});
		$element.mouseleave(function (e) {
			if (CARDS_[cardUrl]) {
				id = CARDS_[cardUrl];
			}
			abort(id);
			var $popup = $('#popup-' + id);
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function () {
				$popup.fadeOut(FADE_ANIM_DURATION_);
			}, 500);
			if ($('#popupCardText-' + id).is(':visible')) {
				buildTimeoutMagic(timeout, $popup);
			}
		});
		$element.mousemove(function (e) {
			if (CARDS_[cardUrl]) {
				id = CARDS_[cardUrl];
			}
			if ($('#popupCardText-' + id).is(':hidden')) {
				var $popup = $('#popup-' + id);
				$popup.css({
					'top': determineTop($popup, e.pageY),
					'left': determineLeft($popup, e.pageX)
				});
			}
		});
	}

	GM_registerMenuCommand('AutoCard MagicCards.info', AutoCardMagicCardsInfo);
	
	// Only register these if on Firefox.
	// NinjaKit 0.8 has a bug that prevents them from working.
		GM_registerMenuCommand('AutoCard Gatherer', AutoCardGatherer);
		GM_registerMenuCommand('Toggle AutoCard Expansion', toggleSlide);
		GM_registerMenuCommand('Toggle Animation', toggleAnim);
	
	// Set animation
	$.fx.off = GM_getValue('toggleAnim', false);

	// MTGS
	$('a[href^="' + MTGS_QUERY_URL_ + '"]').each(function (index, element) {
		var $element = $(element);
		var cardUrl = $element.attr('href');
		magic(index, $element, cardUrl);
	});

	// SCG
	$('.card_popup').each(function (index, element) {
		var $element = $(element);
		var cardName = gup($element.attr('href'), 'singlesearch');
		var cardUrl = MTGS_QUERY_URL_ + cardName;
		magic(index, $element, cardUrl, true);
		$element.mouseenter(function (e) {
			// Remove the qtip div that will cause us problems
			$('#qtip-' + index).remove();
		});
	});

	// WotC free floating links
	$('a[onmouseover^="OpenTip(event,"]').each(function (index, element) {
		var $element = $(element);
		var cardName = $element.attr('keyvalue');
		cardName = cardName.replace(new RegExp('_', 'g'), ' ');
		cardName = cardName.replace(new RegExp('\\[', 'g'), '\'');
		var cardUrl = MTGS_QUERY_URL_ + cardName;
		magic(index, $element, cardUrl, true);
		$element.mouseover(function (e) {
			window.setTimeout(function () {
				$('.prototip').remove();
			}, 10);
		});
	});

	// WotC deck list links
	$('a[onmouseover*="ChangeBigCard("]').each(function (index, element) {
		var $element = $(element);
		var cardName = $element.text();
		var cardUrl = MTGS_QUERY_URL_ + cardName;
		magic(index, $element, cardUrl, true);
	});
	
	// MN free floating links
	$('.jTip').each(function (index, element) {
		var $element = $(element);
		var cardName = gup($element.attr('href'), 'Card_Name');
		var cardUrl = MTGS_QUERY_URL_ + cardName;
		magic(index, $element, cardUrl, true);
		$element.mouseenter(function(e) {
			$('#JT').remove();
		});
	});
	
	// MN deck list links
	$('.cardname>a').each(function(index, element) {
		var $element = $(element);
		var cardName = gup($element.attr('href'), 'search_text');
		var cardUrl = MTGS_QUERY_URL_ + cardName;
		magic(index, $element, cardUrl, true);
	});
})();