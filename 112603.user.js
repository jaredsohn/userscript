// ==UserScript==
// @name           Append Tag Searching Tub
// @namespace      http://loda.jp/script/
// @id             niconico-adds-search-tab-347021
// @version        3.0.1
// @description    『niconico』の検索窓にタグ検索タブを追加 / Adds "tag" search tab above search box in "niconico"
// @match          http://www.nicovideo.jp/*
// @match          http://seiga.nicovideo.jp/search/*
// @match          http://live.nicovideo.jp/*
// @match          http://watch.live.nicovideo.jp/*
// @match          http://com.nicovideo.jp/*
// @match          http://blog.nicovideo.jp/en_info/*
// @match          http://tw.blog.nicovideo.jp/*
// @match          http://info.nicovideo.jp/psvita/en/*
// @grant          GM_xmlhttpRequest
// @domain         www.nicovideo.jp
// @domain         seiga.nicovideo.jp
// @domain         live.nicovideo.jp
// @domain         watch.live.nicovideo.jp
// @domain         com.nicovideo.jp
// @domain         blog.nicovideo.jp
// @domain         tw.blog.nicovideo.jp
// @domain         info.nicovideo.jp
// @run-at         document-start
// @updateURL      https://userscripts.org/scripts/source/112603.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,AAABAAEAMDAAAAEAIADMBwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAwAAAAMAgGAAAAVwL5hwAAB5NJREFUaIHdWWtsHFcV/u6d2Zmd3Z21d9d2Y6+TtH4mKvUrdp6u5aaKooiqClUbHioESgUSf4qoqBAV0AqIAIk/4VEJUSSgpRIVtPyheQlQA4RGQJNiEeWFk9rUTt3C7sbenTs7M4cfu7Oe3ezDz9rlk6xZn3PvOd+555w7d+8CC8TQ4ABzP7fG41/d0t31Y/f/fffu5Qu1UwmDA/33t8bjx/t6e1vyIlZ1wlLw9ae+rDQ2NnyFMUaSJFF3d9dRV9fbc9eSHY4M7xnV9VACAAUCgT9v3dLVuSKES/HtI09HGxpiFwEQAJJlmbq7On+wHJt379m1NxwOp1ybgUCA+vt6D68E37I4sH9fTzQSGYcniK7OzmdcfVdX54IzMbx7576wrs+6tvx+P931gTu/tPKsS/DpT368PRotDaLjR65+7z2jNXti984d+3Vdt+AhP9Df93lXP7xn98r3gBcPPXCwOxaNXkUhCIk6OzoKjV2tJ3bt2H5A1/W0O1fz+6m3t+eLq0q4HA49+KGuWDR62SUiSRJ1drT/pNqcnduHPqjresado2ka9fX2PP5e8C0FB4CPfeShjlgsepExVgiio739p+6g1ni8kIkdQ4P366GQAQ/5/r7eQtncMzqyumVTCU88/li8IRa7wDAfRHtb28+9Y4YGBw6GgkFCYbfRaGhw22dd/ejI3WtD3sWjn/rE5oZYbIx5yqntjtufA4Bt/X336aGQDc9WuW2g/3NrSrgc/vj7Y3VNjY2nOecEgDjn1BpveTUUDL6NPPlgMJjas3vXR1fKZyFtflXpYVw6HItGBhlDyLIci0AAEYgAIgJRrgIIADkEx3FgWRYYY+A5zDHGNieSydtt26YSHzYAKazraVVVz5umCc65nA9soWy5xKWs4ziTgWDgpcnJf7/AACASqd8bi0Zf3j44oEeiEdiWDdM0IUwTpmnCNLMQQhTJhCFgGAYSqRQSiSRM0wRjLB8knDzx0romV8Y5d8cubrXzPhhj0PXQMwwANm5sPXHfgf37dmwfQjqdhmVZJIRgmYxBhmHAEDmyhjBgGAKGIZDJZCCEyYQpKJFI4tq165hLp0v9UZlnJW61ovHaAQDIsgQZAGLRyHBHexuEEAAAnyxDkiSoqgrTDOSIZ/KBCAEhBDIZA0IYEMJENBKBpmn4++vn4DjOolZ1CSgEalk2kwFAkmVNURRy65wAMMYgyzJkWWaaplI2GIQQJkQ+G2kjFwARMcuyaGr6RjnyrORZDrW2z3LZceeQDABERJzzwkDmqTMA4FyCquYyYttBZLMmDCHAAPw3kcSZ187i9XPna/BYURRKSfZIiqJkgNtkVBwMQygUQjgcxsVLl/DbV07Q2D8v1HJUVLuVyFTRV5TLFZQAY0VW3SBUVYVlWTh56nc4dvIUUqmbVXyvPrwBzNcaEcCY+2SUT4Xfr2J2dg4v/uolnP7Tmdwkj74MVqsHCvLyGZjnXhD5fDISiSR+9vwLOHf+HwX5YvfylYb3i4eHCQMDuW9fUhQFppnFi79+uYj8rfNuAS1izGL1BBQHUIz86kuSBFmW8YdXT+PMX87W8PXegwO59WaeWnTLIt+0bPzadRw7fqqSjYXU93J7oKKcA/mDGgiMzdc9EYFzDtM08crxE5idm6vhZ23AAcCyLNxM3STDELBtB5xzcM6hKAouXb5Cb7wxVs3GmvaADACmaWJq+gaCwSD8qgpN06CqCnw+H87+9W8QplnDx9pBBgAhBKamp1koGCJVVeD3+xHWdbw1NYUrV67WOinWOmV6n9XGLNb+/Hvg5uwsLl/5F25raoSiKPCrfszVp/HmxARm3nmnhv21RS4DhsD4+DWybRuaX4Xf74chDExMTsKy7KXWqKtb/bMQYwzJVApvTkygLhyGFtCQSs3ixtsz1amvAxQCAMCSyRSlMxkEtAAkzpDMHdTWfw94kTWzSJrJGjbXDyqchYqw3B5Y6JjF6muchd4n8AZQ9cxRBWt/Fno/4/+mB9b2ZngZ4AAgy5W/22P99gAAMA4Atm1fQPELY71mxMvLZiyfAUVVns0Leckg7wqWk7s/WLAyf5UIlBvnPQ+V81nqmwGQNU0bkwHg0KGDR59/7pd6OmM8rChKOwPBoflkMAYIYcI0zdIsEQDGOUcgoKE4idWQs+neepeQy99sMgSDAe+Nd2GeYztpLkkn6+vqnyxaqU0bW1u5JDXBcXyW4zhgADlE4bCeTKcz+6enb3wv79CBZwdr3rDhF41NDd96993/yJyzqg0F5K76gsFgKmtmh9+amn7WMAyvTQcAv62p8TfNLc1PzczMEOdcyV/zMM6YA8LsZx59ZPzJrz0tqjoqRbyl5Wj+1xcLQBYARSORC0984bHIogx5sGnTxm9IkkTI/QCSBUD1dXXXP/zgA61LtXkLNE1jAPDd7xwJ6aHQa8jXvs/nE1u3dN+7HNtE5AuH9VOuTVmWqL297eDyWZfgjs2bOQB0dXQMK4qS5ZxTU2PDN5dpUwKAO7du7VNVNcUYo4ZY9Psrwbcqmjds+GF9Xd3YI4cfDgHAyPCeZW+78ZbmI/V1dVdHR4YbAWB0ZHhBNv8HQF4nZ+TFtAIAAAAASUVORK5CYII=
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

polyfill();

// L10N
setLocalizedTexts({
	'en': {
		'静画を検索': 'Search Image',
		'静画': 'Images',
		'生放送を検索': 'Search Live Program',
		'生放送': 'Live',
		'タグ': 'Tags',
		'マンガ': 'Comics',
	},
	'zh': {
		'静画を検索': '搜尋靜畫',
		'静画': '靜畫',
		'生放送を検索': '搜尋生放送',
		'生放送': '生放送',
		'タグ': '標籤',
		'マンガ': '漫畫',
	},
});

/**
 * 検索窓の最大幅
 * @constant {string}
 */
var MAX_SEARCH_BOX_WIDTH = '268px';



var host = window.location.host, pathname = window.location.pathname, pageType,
		targetParentIdFirefox, isTargetParentFirefox, isTargetFirefox;

// 検索ページの種類を取得
switch (host) {
	case 'www.nicovideo.jp':
		if (window.location.pathname === '/') {
			pageType = 'top';
		} else if (/^\/(?:search\/|mylist_search(?:\/|$))/.test(pathname)) {
			pageType = 'video';
		} else if (/^\/(?:(?:tag|related_tag|watch|mylist)\/|(?:recent|newarrival|hotlist|video_top|openlist|playlist|recommendations)(?:\/|$))/.test(pathname)) {
			pageType = 'tag';
		}
		break;
	case 'seiga.nicovideo.jp':
		pageType = 'image';
		break;
	case 'live.nicovideo.jp':
	case 'watch.live.nicovideo.jp':
		if (pathname.startsWith('/search')) {
			pageType = 'live';
		}
		break;
	case 'info.nicovideo.jp':
		 if (pathname.startsWith('/psvita/en/')) {
			 // 英語版PS Vita紹介ページ
			 startScript(prepare,
					function (parent) { return parent.localName === 'body'; },
					function (target) { return target.id === 'header'; },
					function () { return document.getElementById('header'); },
					{
						isTargetParent: function (parent) { return parent.localName === 'html'; },
						isTarget: function (target) { return target.localName === 'body'; },
					});
		 }
		 return;
}

// 上部メニューが追加されるまで待機
switch (host) {
	case 'seiga.nicovideo.jp':
		// 静画
		isTargetFirefox = function (target) { return target.id === 'wrapper'; };
		break;
	case 'live.nicovideo.jp':
		// 生放送
		targetParentIdFirefox = 'body_header';
		break;
	case 'blog.nicovideo.jp':
		// 英語版ニコニコインフォ
		targetParentIdFirefox = 'container-inner';
		break;
	case 'tw.blog.nicovideo.jp':
		// 台湾版ニコニコインフォ
		targetParentIdFirefox = 'header';
		break;
	case 'info.nicovideo.jp':
		break;
}
if (!isTargetParentFirefox) {
	if (targetParentIdFirefox) {
		isTargetParentFirefox = function (parent) { return parent.id === targetParentIdFirefox; };
	} else {
		isTargetParentFirefox = function (parent) { return parent.localName === 'body'; };
	}
}
startScript(prepare,
		function (parent) { return parent.classList.contains('siteHeaderGlovalNavigation'); },
		function (target) { return target.id === 'siteHeaderLeftMenu'; },
		function () { return document.getElementById('siteHeaderLeftMenu'); },
		{
			isTargetParent: isTargetParentFirefox,
			isTarget: isTargetFirefox || function (target) { return target.id === 'siteHeader'; },
		});

function prepare () {
	var parentId, parentIdFirefox, targetId, targetIdFirefox, isTargetParent, isTargetParentFirefox,
			textVideo, harajuku, itemLive, item;

	// ニコニコ生放送ではlang属性値が常にja-JPのため、ニコニコ動画へのリンク文字によって、ページの言語を判定する
	textVideo = document.querySelector('[href^="http://www.nicovideo.jp/video_top"]').textContent;
	if (textVideo.contains('Video')) {
		setlang('en');
	} else if (textVideo.contains('動畫')) {
		setlang('zh');
	}
	
	if (!document.querySelector(pageType === 'image' ? '#siteHeader [href="/?header"], #siteHeader [href="/"]' : '#siteHeader [href^="http://seiga.nicovideo.jp/"], #globalNav [href^="http://seiga.nicovideo.jp/"]')) {
		// ヘッダに静画へのリンクが無ければ
		// 生放送へのリンクを取得
		itemLive = document.querySelector('#siteHeader [href^="http://live.nicovideo.jp/"], #globalNav [href^="http://live.nicovideo.jp/"]').parentNode;
		// 生放送リンクの複製
		item = itemLive.cloneNode(true);
		// リンク文字を変更
		(item.getElementsByTagName('span')[0] || item.getElementsByTagName('a')[0]).textContent = _('静画');
		// アドレスを変更
		item.getElementsByTagName('a')[0].host = 'seiga.nicovideo.jp';
		// ヘッダに静画へのリンクを追加
		itemLive.parentNode.insertBefore(item, itemLive);
	}
	
	// スクリプトを起動
	if (!pageType) {
		return;
	}
	harajuku = document.doctype.publicId;
	switch (pageType) {
		case 'video':
			if (harajuku) {
				// マイリスト検索、キーワード検索
				parentId = 'form_search';
				targetId = 'search_united_form';
				parentIdFirefox = 'PAGEMAIN';
				targetIdFirefox = 'PAGEBODY';
			} else {
				// GINZAバージョンのキーワード検索
				startScript(main,
						function (parent) { return parent.classList.contains('formSearch'); },
						function (target) { return target.id === 'search_united_form'; },
						function () { return document.getElementById('search_united_form'); },
						{
							isTargetParent: function (parent) { return parent.localName === 'body'; },
							isTarget: function (target) { return target.localName === 'section'; },
						});
				return;
			}
			break;
			
		case 'top':
			// トップページ
			main = mainTop;
			parentId = 'searchFormInner';
			targetId = 'searchForm';
			isTargetParentFirefox = function (parent) {
				return parent.id === 'main_container' || parent.localName === 'body';
			};
			targetIdFirefox = 'searchFormWrap';
			break;
			
		case 'image':
			// 静画
			parentId = 'usearch_form';
			targetId = 'usearch_form_input';
			parentIdFirefox = 'wrapper';
			targetIdFirefox = 'main';
			break;
			
		case 'live':
			// 生放送
			isTargetParentFirefox = isTargetParent = function (target) {
				return target.classList.contains('container');
			};
			targetIdFirefox = targetId = 'form_frm_btm';
			break;
			
		case 'tag':
			if (harajuku) {
				// タグ検索等
				main = mainTag;
				parentId = 'search_tab';
				targetId = 'target_m';
				parentIdFirefox = 'PAGEMAIN';
				targetIdFirefox = 'PAGEBODY';
			} else {
				// GINZAバージョンのタグ検索
				startScript(mainTag,
						function (parent) { return parent.classList.contains('videoSearchOption'); },
						function (target) { return target.classList.contains('optMylist'); },
						function () { return document.getElementsByClassName('optMylist')[0]; },
						{
							isTargetParent: function (parent) { return parent.localName === 'body'; },
							isTarget: function (target) { return target.localName === 'header'; },
						});
				return;
			}
	}
	startScript(main,
			isTargetParent || function (parent) { return parent.id === parentId; },
			function (target) { return target.id === targetId; },
			function () { return document.getElementById(targetId); },
			{
				isTargetParent: isTargetParentFirefox || function (parent) { return parent.id === parentIdFirefox; },
				isTarget: function (target) { return target.id === targetIdFirefox; },
			});
}



// タグ検索
function mainTag () {
	var mylistTab, tabList, styleSheet, cssRules, script;
	
	// スタイルの設定
	styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	cssRules = styleSheet.cssRules;
	[
		'#PAGEHEADER > div {'
				+ 'display: flex;'
				+ '}',
		'#head_search {'
				+ 'max-width: ' + MAX_SEARCH_BOX_WIDTH + ';'
				+ 'flex-grow: 1;'
				+ '}',
		'#search_input {'
				+ 'width: 100%;'
				+ 'display: flex;'
				+ '}',
		'#search_input .typeText {'
				+ 'flex-grow: 1;'
				+ '}',
		'#head_ads {'
				+ 'margin-right: -26px;'
				+ '}',
		'#search_input #bar_search {'
				+ '-moz-box-sizing: border-box;'
				+ 'box-sizing: border-box;'
				+ 'width: 100% !important;'
				+ '}',
		// GINZAバージョン
		'.siteHeader > .inner {'
				+ 'display: flex;'
				+ '}',
		'.videoSearch {'
				+ 'max-width: ' + MAX_SEARCH_BOX_WIDTH + ';'
				+ 'flex-grow: 1;'
				+ 'padding-left: 4px;'
				+ 'padding-right: 4px;'
				+ '}',
		'.videoSearch form {'
				+ 'display: flex;'
				+ '}',
		'.videoSearch form .inputText {'
				+ 'flex-grow: 1;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});
	
	// タブリストの取得
	mylistTab = document.querySelector('#target_m, .optMylist');
	tabList = mylistTab.parentNode;
	
	// タブの複製・追加
	[
		{
			type: 'image',
			title: _('静画を検索'),
			uri: 'http://seiga.nicovideo.jp/search',
			text: _('静画'),
		},
		{
			type: 'live',
			title: _('生放送を検索'),
			uri: 'http://live.nicovideo.jp/search',
			text: _('生放送'),
		},
	].forEach(function (option) {
		var tab = mylistTab.cloneNode(true);
		if (mylistTab.classList.contains('optMylist')) {
			// GINZAバージョン
			tab.classList.remove('optMylist');
			tab.classList.add('opt' + option.type[0].toUpperCase() + option.type.slice(1));
			tab.dataset.type = option.type;
			tab.getElementsByTagName('a')[0].textContent = option.text;
		} else {
			// 原宿バージョン
			tab.id = 'target_' + option.type[0];
			tab.title = option.title;
			tab.setAttribute('onclick', tab.getAttribute('onclick').replace(/'.+?'/, '\'' + option.uri + '\''));
			tab.textContent = option.text;
		}
		tabList.appendChild(tab);
	});
	
	if (mylistTab.classList.contains('optMylist')) {
		// GINZAバージョン
		script = document.createElement('script');
		script.text = '(' + (function () {
			eval('Nico.Navigation.HeaderSearch.Controller.search = ' + Nico.Navigation.HeaderSearch.Controller.search.toString().replace(/(switch.+?{.+?)(})/, '$1; break;'
					+ 'case "image":'
						+ 'd = "http://seiga.nicovideo.jp/search/" + e; break;'
					+ 'case "live":'
						+ 'd = "http://live.nicovideo.jp/search/" + e; break;'
					+ '$2'));
		}).toString() + ')();';
		document.head.appendChild(script);
	}
}



// トップページ
function mainTop() {
	var styleSheet, cssRules, refItem, item, anchor;
	
	fixPrototypeJavaScriptFramework();
	
	// スタイルの設定
	styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	cssRules = styleSheet.cssRules;
	[
		'#searchFormInner {'
				+ 'width: auto;'
				+ 'margin-left: 136px;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});
	
	// マイリスト検索ボタンの取得
	refItem = document.getElementsByClassName('sMylist')[0].parentNode;
	
	// マイリスト検索ボタンの複製
	item = refItem.cloneNode(true);
	
	// ボタン名を変更
	anchor = item.getElementsByTagName('a')[0];
	anchor.textContent = _('タグ');
	
	// クラス名を変更
	anchor.className = 'sVideo';
	
	// アドレスを変更
	anchor.href = 'http://www.nicovideo.jp/tag/';
	
	// タグ検索ボタンを追加
	refItem.parentNode.insertBefore(item, refItem);
	
	if (!document.getElementsByClassName('sSeiga')[0]) {
		// 静画検索ボタンが存在しなければ
		// 生放送検索の取得
		refItem = document.getElementsByClassName('sLive')[0].parentNode;
		// 生放送検索の複製
		item = refItem.cloneNode(true);
		// ボタン名を変更
		anchor = item.getElementsByTagName('a')[0];
		anchor.textContent = _('静画');
		// クラス名を変更
		anchor.className = 'sSeiga';
		// アドレスを変更
		anchor.href = 'http://seiga.nicovideo.jp/search/';
		// 静画検索を追加
		refItem.parentNode.insertBefore(item, refItem);
		
		startScript(function () {
			var list, item, anchor;
			// メニューの生放送リンクの取得
			list = document.querySelector('.service_main .live').parentNode.parentNode;
			// 生放送リンクの複製
			item = list.cloneNode(true);
			// リンク文字を変更
			anchor = item.getElementsByTagName('a')[0];
			anchor.title = anchor.textContent = _('静画');
			// クラス名を変更
			anchor.classList.remove('live');
			anchor.classList.add('seiga');
			// アドレスを変更
			item.getElementsByTagName('a')[0].href = 'http://seiga.nicovideo.jp/';
			// メニューに静画へのリンクを追加
			list.parentNode.insertBefore(item, list);

			// サブメニューの複製
			item = document.getElementsByClassName('service_sub')[0].cloneNode(true);
			// 2つ目以降の要素を削除
			Array.prototype.forEach.call(item.querySelectorAll('li:first-child ~ li'), function (item) {
				item.parentNode.removeChild(item);
			});
			// リンク文字を変更
			anchor = item.getElementsByTagName('a')[0];
			anchor.title = anchor.textContent = _('マンガ');
			// アドレスを変更
			item.getElementsByTagName('a')[0].href = 'http://seiga.nicovideo.jp/manga/';
			// メニューに静画のサブメニューへのリンクを追加
			list.parentNode.insertBefore(item, list);
		},
				function (parent) { return parent.id === 'sideNav'; },
				function (target) { return target.id === 'trendyTags'; },
				function () { return document.querySelector('#menuService [href="http://live.nicovideo.jp/timetable/"]'); },
				{
					isTarget: function (target) { return target.id === 'NewServiceList'; },
				});
	}
}



// キーワード検索、マイリスト検索、静画検索、生放送検索
function main() {
	var inactiveTab, mylistTab, tagTab, tabNameNode, searchCount, anchor, searchWords = '', searchWordsPattern;
	
	// マイリスト検索タブの取得
	mylistTab = document.querySelector('.tab_table td:nth-of-type(2), #search_frm_a a:nth-of-type(2), .seachFormA a:nth-of-type(2)');
	
	// マイリスト検索タブの複製
	tagTab = mylistTab.cloneNode(true);
	
	// タブ名を変更
	anchor = tagTab.tagName.toLowerCase() === 'a' ? tagTab : tagTab.getElementsByTagName('a')[0];
	tabNameNode = anchor.getElementsByTagName('div');
	tabNameNode = (tabNameNode.length > 0  ? tabNameNode[0].firstChild : anchor.firstChild);
	tabNameNode.data = _('タグ') + (pageType === 'live' ? '(' : ' ( ');
	
	// クラス名を変更・動画件数をリセット
	searchCount = tagTab.querySelector('strong, span');
	if (pageType === 'image') {
		searchCount.classList.remove('search_value_em');
		searchCount.classList.add('search_value');
	} else if (pageType === 'live') {
		searchCount.classList.remove('Redtxt');
	} else{
		searchCount.style.removeProperty('color');
	}
	searchCount.textContent = '-';
	
	if (searchCount.id) {
		// 生放送
		searchCount.id = 'search_count_tag';
	}

	// 検索語句を取得
	searchWordsPattern = /(?:\/(?:search|tag|mylist_search)\/|[?&]keyword=)([^?&#]+)/g;
	if (searchWords = window.location.href.match(searchWordsPattern)) {
		searchWords = searchWordsPattern.exec(searchWords[pageType === 'live' ? searchWords.length - 1 : 0])[1];
	}
	
	// タグが付いた動画件数を取得・表示
	if (searchWords) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.nicovideo.jp/tag/' + searchWords,
			onload: function (response) {
				var responseDocument, total, trimmedThousandsSep;
				responseDocument = new DOMParser().parseFromString(response.responseText, 'text/html');
				if (!responseDocument) {
					// Blink
					// Issue 265379: DOMParser + text/html does not work <http://code.google.com/p/chromium/issues/detail?id=265379>
					responseDocument = document.implementation.createHTMLDocument();
					responseDocument.documentElement.innerHTML = response.responseText;
				}
				total = responseDocument.title.contains('(原宿)')
						// 原宿バージョン
						? /[,0-9]+/.exec(responseDocument.getElementsByClassName('searchTagTotal')[0].textContent)[0]
						// GINZAバージョン
						: responseDocument.querySelector('.tagCaption .dataValue .num').textContent;
				trimmedThousandsSep = total.replace(/,/g, '');
				if (trimmedThousandsSep >= 100) {
					if (pageType === 'image') {
						searchCount.classList.remove('search_value');
						searchCount.classList.add('search_value_em');
					} else if (pageType === 'live') {
						searchCount.classList.add('Redtxt');
					} else {
						searchCount.style.color = '#CC0000';
					}
				}
				searchCount.textContent = pageType === 'live' ? trimmedThousandsSep : (pageType === 'image' ? total : ' ' + total + ' ');
			}
		});
	}
	
	// 非アクティブタブを取得
	inactiveTab = document.querySelector('.tab_0, .tab1');
	
	// クラス名を変更
	anchor.className = inactiveTab.className;
	
	// アドレスを変更
	anchor.href = 'http://www.nicovideo.jp/tag/' + searchWords + inactiveTab.search;
	
	// タグ検索タブを追加
	mylistTab.parentNode.insertBefore(tagTab, mylistTab);
	if (inactiveTab.classList.contains('tab1')) {
		// GINZAバージョン
		mylistTab.parentNode.insertBefore(tagTab.previousSibling.cloneNode(true), mylistTab);
	}
}



/**
 * 挿入された節の親節が、目印となる節の親節か否かを返すコールバック関数
 * @callback isTargetParent
 * @param {(Document|Element)} parent
 * @returns {boolean}
 */

/**
 * 挿入された節が、目印となる節か否かを返すコールバック関数
 * @callback isTarget
 * @param {(DocumentType|Element)} target
 * @returns {boolean}
 */

/**
 * 目印となる節が文書に存在するか否かを返すコールバック関数
 * @callback existsTarget
 * @returns {boolean}
 */

/**
 * 目印となる節が挿入された直後に関数を実行する
 * @param {Function} main - 実行する関数
 * @param {isTargetParent} isTargetParent
 * @param {isTarget} isTarget
 * @param {existsTarget} existsTarget
 * @param {Object} [callbacksForFirefox] - DOMContentLoaded前のタイミングで1回だけスクリプトを起動させる場合に設定
 * @param {isTargetParent} [callbacksForFirefox.isTargetParent] - FirefoxにおけるisTargetParent
 * @param {isTarget} [callbacksForFirefox.isTarget] - FirefoxにおけるisTarget
 * @version 2013-09-23
 */
function startScript(main, isTargetParent, isTarget, existsTarget, callbacksForFirefox) {
	var observer, flag;
	
	// FirefoxのDOMContentLoaded前のMutationObserverは、要素をまとめて挿入したと見なすため、isTargetParent、isTargetを変更
	if (callbacksForFirefox && window.navigator.userAgent.contains(' Firefox/')) {
		if (callbacksForFirefox.isTargetParent) {
			isTargetParent = callbacksForFirefox.isTargetParent;
		}
		if (callbacksForFirefox.isTarget) {
			isTarget = callbacksForFirefox.isTarget;
		}
	}
	
	// 指定した節が既に存在していれば、即実行
	startMain();
	if (flag) {
		return;
	}
	
	observer = new MutationObserver(mutationCallback);
	observer.observe(document, {
		childList: true,
		subtree: true,
	});
	
	if (callbacksForFirefox) {
		// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した節が存在するか確認し、存在すれば実行）
		document.addEventListener('DOMContentLoaded', function stopScript(event) {
			event.target.removeEventListener('DOMContentLoaded', stopScript);
			if (observer) {
				observer.disconnect();
			}
			startMain();
			flag = true;
		});
	}
	
	/**
	 * 目印となる節が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する
	 * @param {MutationRecord[]} mutations - a list of MutationRecord objects
	 * @param {MutationObserver} observer - the constructed MutationObserver object
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, nodeType, addedNodes, addedNode, i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			nodeType = target.nodeType;
			if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE) && isTargetParent(target)) {
				// 子が追加された節が要素節か文書節で、かつそのノードについてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					nodeType = addedNode.nodeType;
					if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_TYPE_NODE) && isTarget(addedNode)) {
						// 追加された子が要素節か文書型節で、かつそのノードについてisTargetが真を返せば
						observer.disconnect();
						checkExistingTarget(0);
						return;
					}
				}
			}
		}
	}
	
	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ再度実行
	 * @param {number} count - {@link startMain}を実行した回数
	 */
	function checkExistingTarget(count) {
		var LIMIT = 500, INTERVAL = 10;
		startMain();
		if (!flag && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}
	
	/**
	 * 指定した節が存在するか確認し、存在すれば監視を停止しスクリプトを実行
	 */
	function startMain() {
		if (!flag && existsTarget()) {
			flag = true;
			main();
		}
	}
}

/**
 * prototype汚染が行われる Prototype JavaScript Framework (prototype.js) 1.5.1.1 のバグを修正（Tampermonkey用）
 */
function fixPrototypeJavaScriptFramework() {
	[
		[document, 'getElementsByClassName'],
	].forEach(function (objectProperty) {
		delete objectProperty[0][objectProperty[1]];
	});
}

/**
 * 国際化・地域化関数の読み込み、ECMAScript仕様のPolyfill
 */
function polyfill() {
// i18n
(function () {
	/**
	 * 翻訳対象文字列 (msgid) の言語
	 * @constant {string}
	 */
	var ORIGINAL_LOCALE = 'ja';
	
	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか
	 * @constant {string}
	 */
	var DEFAULT_LOCALE = 'en';
	
	/**
	 * 以下のような形式の翻訳リソース
	 * {
	 *     'IETF言語タグ': {
	 *         '翻訳前 (msgid)': '翻訳後 (msgstr)',
	 *         ……
	 *     },
	 *     ……
	 * }
	 * @typedef {Object} LocalizedTexts
	 */
	
	/**
	 * クライアントの言語。{@link setlang}から変更される
	 * @type {string}
	 * @access private
	 */
	var langtag = 'ja';
	
	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される
	 * @type {string}
	 * @access private
	 */
	var language = 'ja';
	
	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される
	 * @type {LocalizedTexts}
	 * @access private
	 */
	var multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};
	
	/**
	 * テキストをクライアントの言語に変換する
	 * @param {string} message - 翻訳前
	 * @returns {string} 翻訳後
	 */
	window._ = window.gettext = function (message) {
		// クライアントの言語の翻訳リソースが存在すれば、それを返す
		return langtag in multilingualLocalizedTexts && multilingualLocalizedTexts[langtag][message]
				// 地域下位タグを取り除いた言語タグの翻訳リソースが存在すれば、それを返す
				|| language in multilingualLocalizedTexts && multilingualLocalizedTexts[language][message]
				// デフォルト言語の翻訳リソースが存在すれば、それを返す
				|| DEFAULT_LOCALE in multilingualLocalizedTexts && multilingualLocalizedTexts[DEFAULT_LOCALE][message]
				// そのまま返す
				|| message;
	};
	
	/**
	 * {@link gettext}から参照されるクライアントの言語を設定する
	 * @param {string} lang - IETF言語タグ（「language」と「language-REGION」にのみ対応）
	 */
	window.setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};
	
	/**
	 * {@link gettext}から参照される翻訳リソースを追加する
	 * @param {LocalizedTexts} localizedTexts
	 */
	window.setLocalizedTexts = function (localizedTexts) {
		var localizedText, lang, language, langtag, msgid;
		for (lang in localizedTexts) {
			localizedText = localizedTexts[lang];
			lang = lang.split('-');
			language = lang[0].toLowerCase();
			langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
			
			if (langtag in multilingualLocalizedTexts) {
				// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば上書き）
				for (msgid in localizedText) {
					multilingualLocalizedTexts[langtag][msgid] = localizedText[msgid];
				}
			} else {
				multilingualLocalizedTexts[langtag] = localizedText;
			}
			
			if (language !== langtag) {
				// 言語タグに地域下位タグが含まれていれば
				// 地域下位タグを取り除いた言語タグも翻訳リソースとして追加する
				if (language in multilingualLocalizedTexts) {
					// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば無視）
					for (msgid in localizedText) {
						if (!(msgid in multilingualLocalizedTexts[language])) {
							multilingualLocalizedTexts[language][msgid] = localizedText[msgid];
						}
					}
				} else {
					multilingualLocalizedTexts[language] = localizedText;
				}
			}
			
			// msgidの言語の翻訳リソースを生成
			for (msgid in localizedText) {
				multilingualLocalizedTexts[ORIGINAL_LOCALE][msgid] = msgid;
			}
		}
	};
})();

// Polyfill for Blink
if (!String.prototype.hasOwnProperty('startsWith')) {
	/**
	 * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
	 * @param {string} searchString - The characters to be searched for at the start of this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith 21.1.3.18 String.prototype.startsWith (searchString [, position ] )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith String.startsWith - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.startsWith
	 */
	Object.defineProperty(String.prototype, 'startsWith', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			var position = arguments[1];
			return this.indexOf(searchString, position) === Math.max(Math.floor(position) || 0, 0);
		},
	});
}

if (!String.prototype.hasOwnProperty('contains')) {
	/**
	 * Determines whether one string may be found within another string, returning true or false as appropriate.
	 * @param {string} searchString - A string to be searched for within this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.contains 21.1.3.6 String.prototype.contains (searchString, position = 0 )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/contains String.contains - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.contains
	 */
	Object.defineProperty(String.prototype, 'contains', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			return this.indexOf(searchString, arguments[1]) !== -1;
		},
	});
}

}

})();
