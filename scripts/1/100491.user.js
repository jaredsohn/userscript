// ==UserScript==
// @name		Rakuten Add Shop Review Link
// @namespace		http://plaza.rakuten.co.jp/rktnzen/
// @description		adds the link to the shop review in Rakuten.
// @version		1.1.2
// @updateURL	https://userscripts.org/scripts/source/100491.meta.js
// @homepageURL	http://userscripts.org/scripts/show/100491
// @include		http://item.rakuten.co.jp/*
// @include		https://item.rakuten.co.jp/*
// @include		http://www.rakuten.co.jp/*
// @include		https://www.rakuten.co.jp/*
// @include		http://search.rakuten.co.jp/search/*
// ==/UserScript==
(function() {
	var keyNameSortOrder = 'reviewSortOrder';
	var valueSortOrderDefault = '';
	var valueSortOrderInformative = 'sort3/';
	var reviewSortOrder = '';
	var msgDiv = document.createElement('div');
	var msgBase = '\u697d\u5929\u30ec\u30d3\u30e5\u30fc\u4e26\u3073\u66ff\u3048\uff1a\u3000';
	var msgDefault = '\u65b0\u7740\u30ec\u30d3\u30e5\u30fc\u9806';
	var msgInformative = '\u53c2\u8003\u306b\u306a\u308b\u30ec\u30d3\u30e5\u30fc\u9806';

	var main = function () {
		var area = xpath('/html/body/map/area', document, 0);
		var reItm = /(item|www)\.rakuten\.co\.jp/;
		var reSrch = /search\.rakuten\.co\.jp\/search\//;
		var reInfo = /\/info\.html$/
		var reviewUrlTemplate = 'http://review.rakuten.co.jp/shop/4/%ID%_%ID%/1.1/';

		var currentSortOrderValue = GM_getValue(keyNameSortOrder);
		if (currentSortOrderValue != undefined) {
			reviewUrlTemplate += currentSortOrderValue;
		}

		msgDiv.id = 'commandMsgDiv';
		msgDiv.style.backgroundColor = '#BF0000';
		msgDiv.style.color = 'white';
		msgDiv.style.fontSize = 12;
		msgDiv.style.position = 'fixed';
		msgDiv.style.right = '10px';
		msgDiv.style.bottom = '10px';
		msgDiv.style.padding = '4px';
		msgDiv.style.zIndex = '9';
		msgDiv.style.display = 'none';
		document.body.insertBefore(msgDiv, document.body.firstChild);

		var setItemPage = function () {
			var reSpUrl = /\.rakuten\.co\.jp\/[^\/]*/i;
			var mSpUrl = reSpUrl.exec(location.href);
			var linkInfo = null;
			var linkPlaza = null;
			var linkReview = null;
			var linkAnc = null;
			if (mSpUrl != null) {
				linkInfo = document.createElement('a');
				linkInfo.style.marginLeft = '5px';
				linkInfo.style.marginRight = '5px';
				linkInfo.style.marginTop = '5px';
				linkInfo.style.marginBottom = '5px';
				linkInfo.href = getUrl( 0, mSpUrl[0] );
				linkInfo.target = '_blank';
				linkInfo.textContent = '\u4f1a\u793e\u6982\u8981';

				linkPlaza = document.createElement('a');
				linkPlaza.style.marginLeft = '5px';
				linkPlaza.style.marginRight = '5px';
				linkPlaza.style.marginTop = '5px';
				linkPlaza.style.marginBottom = '5px';
				linkPlaza.href = getUrl( 1, mSpUrl[0] );
				linkPlaza.target = '_blank';
				linkPlaza.textContent = '\u5e97\u8217\u30d6\u30ed\u30b0';
			}

			if (area != null) {
				var url = area.href;
				var re = /(?:shop_id=)(\d*)/gi;
				var match = re.exec(url);
				if (match != null) {
					var reviewUrl = getUrl( 2, match[1] );
					linkReview = document.createElement('a');
					linkReview.style.marginLeft = '5px';
					linkReview.style.marginRight = '5px';
					linkReview.style.marginTop = '5px';
					linkReview.style.marginBottom = '5px';
					linkReview.href = reviewUrl;
					linkReview.target = '_blank';
					linkReview.textContent = '\u30b7\u30e7\u30c3\u30d7\u30ec\u30d3\u30e5\u30fc';
				}
			}

			var cartforms = document.getElementsByClassName('item_name');
			if (cartforms.length > 0) {
				var cartform = cartforms[cartforms.length - 1];
				var pnode = cartform.parentNode;
				var linkName = document.createElement('a');
				linkName.name = 'cartform';
				pnode.insertBefore(linkName, cartform);

				linkAnc = document.createElement('a');
				var re = /#\w*$/gi;
				if (re.test(location.href)) {
					linkAnc.href = String(location.href).replace(/#\w*$/, '') + '#cartform';
				} else {
					linkAnc.href = location.href + '#cartform';
				}
				linkAnc.style.fontSize = '12px';
				linkAnc.style.marginLeft = '5px';
				linkAnc.style.marginRight = '5px';
				linkAnc.style.marginTop = '5px';
				linkAnc.style.marginBottom = '5px';
				linkAnc.textContent = '\u8cfc\u5165\u30d5\u30a9\u30fc\u30e0';
			}

			if (linkReview != null || linkAnc != null) {
				var linkDiv = document.createElement('div');
				linkDiv.style.backgroundColor = 'white';
				linkDiv.style.position = 'fixed';
				linkDiv.style.fontSize = '12px';

				if (linkInfo != null) {
					linkDiv.appendChild(linkInfo);
				}

				if (linkPlaza != null) {
					var slash = document.createTextNode(" / ");
					linkDiv.appendChild(slash);
					linkDiv.appendChild(linkPlaza);
				}

				if (linkReview != null) {
					var slash = document.createTextNode(" / ");
					linkDiv.appendChild(slash);
					linkDiv.appendChild(linkReview);
				}

				if (linkAnc != null) {
					var slash = document.createTextNode(" / ");
					linkDiv.appendChild(slash);
					linkDiv.appendChild(linkAnc);
				}

				var firstTable = xpath('/html/body/table', document, 0);
				var pnode = firstTable.parentNode;
				pnode.insertBefore(linkDiv, firstTable);
			}
		}

		var setExShop = function() {
			var inp = document.getElementsByName('nitem');
			for (var i = 0; i < inp.length; i++) {
					if (inp[i].type == 'text') {
						if (inp[i].value.length > 0) inp[i].value += ' ';
						inp[i].value += this.name;
					}
				}
		}

		var setSearchResult = function (doc) {
			var reShopId = /(?:\d{2,}\/)(\d{6,})(?:\/\d{1,})/;
			var resultSections = doc.getElementsByClassName('rsrSResultItemTxt');
			insertAnchor();
			for ( var i = 0; i < resultSections.length; i++ ) {
				var idHolder = xpath('descendant-or-self::input[@name=\'itemCompare\']', resultSections[i], 0);
				var match = null;
				if (idHolder != null) match = reShopId.exec(idHolder.value);
				if (match != null) {
					var deliveryTextDiv = xpath('descendant::div[@class=\'rsrSResultItemInfo\']', resultSections[i].parentNode, 0);
					var txtIconShopNameSpan = xpath('descendant::span[@class=\'txtIconShopName\']/a', resultSections[i], 0);
					if (deliveryTextDiv != null) {
						var reviewUrl = getUrl( 2, match[1] );
						var linkReview = document.createElement('a');
						linkReview.href = reviewUrl;
						linkReview.target = '_blank';
						linkReview.textContent = '\u30B7\u30E7\u30C3\u30D7\u30EC\u30D3\u30E5\u30FC\u3092\u898B\u308B';

						var linkInfo = document.createElement('a');
						linkInfo.href = getUrl( 3, txtIconShopNameSpan.href );
						linkInfo.target = '_blank';
						linkInfo.textContent = '\u4f1a\u793e\u6982\u8981\u3092\u898b\u308b';

						var linkPlaza = document.createElement('a');
						linkPlaza.href = getUrl( 4, txtIconShopNameSpan.href );
						linkPlaza.target = '_blank';
						linkPlaza.textContent = '\u5e97\u8217\u30d6\u30ed\u30b0\u3092\u898b\u308b';

						var exShop = document.createElement('a');
						exShop.textContent = '\u5E97\u540D\u3092\u9664\u5916\u30AD\u30FC\u30EF\u30FC\u30C9\u306B\u8FFD\u52A0\u3059\u308B';
						exShop.href = 'javascript:void(0);';
						exShop.name = txtIconShopNameSpan.textContent.trim();
						exShop.addEventListener("click", setExShop, false);

						var linkAnc = document.createElement('a');
						linkAnc.href = '#myform';
						linkAnc.textContent = '\u691c\u7d22\u6761\u4ef6\u30d5\u30a9\u30fc\u30e0\u3078';

						var linkDiv = document.createElement('p');
						linkDiv.style.fontSize = '10px';
						linkDiv.appendChild(linkReview);
						linkDiv.appendChild(document.createElement('br'));
						linkDiv.appendChild(linkInfo);
						linkDiv.appendChild(document.createElement('br'));
						linkDiv.appendChild(linkPlaza);
						linkDiv.appendChild(document.createElement('br'));
						linkDiv.appendChild(exShop);
						linkDiv.appendChild(document.createElement('br'));
						linkDiv.appendChild(linkAnc);
						deliveryTextDiv.appendChild(linkDiv);
					}
				}
			}
		}

		function xpath(query, objNode, multi) {
			if (multi) {
				return document.evaluate(query, objNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			} else {
				return document.evaluate(query, objNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			}
		}

		function getUrl(urlType, shopUrl) {
			var aflUrl = 'http://pt.afl.rakuten.co.jp/c/0399b810.30267be0/?url=';
			var targetUrl;

			switch ( urlType ) {
				case 0:
					targetUrl = 'http://www' + shopUrl + '/info.html';
					break;
				case 1:
					targetUrl = 'http://shop.plaza' + shopUrl + '/';
					break;
				case 2:
					targetUrl = reviewUrlTemplate.replace(new RegExp('%ID%', 'g'), shopUrl);
					break;
				case 3:
					targetUrl = shopUrl + 'info.html';
					break;
				case 4:
					targetUrl = shopUrl.replace('://www', '://shop.plaza');
					break;
			}
			return aflUrl + encodeURIComponent( targetUrl );
		}

		function insertAnchor() {
			var myFormAnchor = document.getElementsByName('myform');
			if ( myFormAnchor.length == 0 ) {
				var myForm = document.getElementById('rsrCondition');
				var fnode = myForm.parentNode;
				var linkForm = document.createElement('a');
				linkForm.name = 'myform';
				fnode.insertBefore(linkForm, myForm);
			}
		}

		if (reItm.test(location.href) && !(reInfo.test(location.href))) {
			setItemPage();
		}

		if (reSrch.test(location.href)) {
			setSearchResult(document);
		}


		document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
			setSearchResult(evt.target);
		}, false);
	}

	window.addEventListener('load', main, false);


	GM_registerMenuCommand('\u697d\u5929\u30ec\u30d3\u30e5\u30fc\u4e26\u3073\u66ff\u3048\u5909\u66f4', changeReviewSortOrder);
	function changeReviewSortOrder () {
		var currentVal = GM_getValue(keyNameSortOrder);
		var msgTextNode;
		if (currentVal == undefined) {
			GM_setValue(keyNameSortOrder, valueSortOrderInformative);
			msgTextNode = document.createTextNode(msgBase + msgInformative);
		} else if (currentVal == valueSortOrderDefault) {
			GM_setValue(keyNameSortOrder, valueSortOrderInformative);
			msgTextNode = document.createTextNode(msgBase + msgInformative);
		} else {
			GM_setValue(keyNameSortOrder, valueSortOrderDefault);
			msgTextNode = document.createTextNode(msgBase + msgDefault);
		}
		var currentMsgDiv = document.getElementById('commandMsgDiv');
		currentMsgDiv.appendChild(msgTextNode);
		currentMsgDiv.style.display = 'block';
		setTimeout(removeChangeMsg, 3000);
	}

	var removeChangeMsg = function () {
		var currentMsgDiv = document.getElementById('commandMsgDiv');
		currentMsgDiv.style.display = 'none';
		currentMsgDiv.removeChild(currentMsgDiv.firstChild);
	}
})();
