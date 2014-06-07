// ==UserScript==
// @name           ニコ生アラート（簡）
// @namespace      http://userscripts.org/users/347021
// @id             niconico-alert-keyword-347021
// @version        4.0.1
// @description    キーワード検索型のニコ生アラート / Nico Live alert of keyword search type
// @match          http://*.nicovideo.jp/*
// @exclude        http://ads.nicovideo.jp/*
// @exclude        http://bbs.nicovideo.jp/*
// @exclude        http://point.nicovideo.jp/*
// @exclude        http://info.nicovideo.jp/nsentoq/*
// @exclude        http://www.nicovideo.jp/q*
// @exclude        http://ex.nicovideo.jp/*
// @exclude        http://license-search.nicovideo.jp/*
// @exclude        http://info.nicovideo.jp/base/*
// @exclude        http://www.upload.nicovideo.jp/*
// @exclude        http://rcp-smile.nicovideo.jp/*
// @exclude        http://ch.nicovideo.jp/static/tokutei.html*
// @exclude        http://ch.nicovideo.jp/static/blomaga/guide/*
// @exclude        http://nicoshop.nicovideo.jp/*
// @exclude        http://help.nicovideo.jp/*
// @run-at         document-start
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_openInTab
// @updateURL      https://userscripts.org/scripts/source/119354.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @contributor    HADAA
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

polyfill();

// L10N
setLocalizedTexts({
	'en': {
		'（取得不可）': '(No data)',
		'コミュニティシンボルと番組リンク': 'Community avatar and live program link',
		'コミュニティ限定かどうか': 'Community members only or not',
		'コミュ限': 'Exclusive',
		'経過': 'Elapsed',
		'%d 分': '%dm',
		'%d 時間 %u 分': '%dh%um',
		'放送開始からの経過時間': 'Elapsed time from starting time',
		'タイトル': 'Title',
		'番組のタイトル': 'Title',
		'カテゴリ': 'Category',
		'放送カテゴリ': 'Broadcast Category',
		'放送者': 'Broadcaster',
		'放送者のニックネーム': 'Broadcaster nickname',
		'キャプション': 'Description',
		'放送詳細の一部': 'Partial description',
		'来場': 'Visitors',
		'来場者数': 'Visitors',
		'%d 人': '%d people',
		'コメ数': 'Comments',
		'%d コメ': '%d comments',
		'総コメント数': 'Comments',
		'コミュニティ': 'Community',
		'コミュニティ名とリンク': 'Community name and link',
		'%s 更新': '%s updated', // %sは年月日
		'%s 更新【%s】': '%s updated [%s]', // 1番目の%sは年月日、2番目の%sはエラーメッセージ
		'メンテナンス中': 'Under maintenance',
		'サーバーダウン': 'Server is down',
		'オフライン': 'Offline',
		'検索語句リスト': 'Search words',
		'NG コミュニティ・チャンネルリスト': 'Blacklisted communities and channels',
		'保存': 'Save',
		'NG リストを追加する URI を設定': 'Sets URI to append to blacklisted communities and channels',
		'特定の URI から NG リストを読み込んで、検索時に付加します。': 'Loads blacklist from designated URI and appends to search.',
		'JSON 形式のコミュニティ ID 配列のみ有効です。': 'Community and channel IDs array in JSON format only.',
		'また、NG リストの読み込みは、アラートページ読み込み時に1回だけ行われます。': 'This script loads community blacklist only once when alert page is opened.',
		'GM_xmlhttpRequest エラー': 'GM_xmlhttpRequest error',
		'NG リストの読み込みに失敗しました。\n\nエラーメッセージ：\n%s': 'Failure to get communities and channels. Please refresh this page.\n\nError message:\n%s',
		'追加設定ボックスの開閉': 'Toggle extra settings',
		'表示する項目の設定': 'Setting of display items',
		'その他の設定': 'Other Settings',
		'コミュニティ限定の放送を通知しない': 'Hide community member only programs',
		'タイトル・キャプション・コミュニティ名が %d 文字を超えたら省略する': 'Truncate to %d characters if title description or community name is longer than that',
		'アラート音': 'Alert sound',
		'ファイルサイズが大きいため、設定に失敗しました。\n\nエラーメッセージ：\n%s': 'Failure to set because file is too large.\n\nError message:\n%s',
		'使用中のブラウザが対応していないファイル形式です。': 'Your browser cannot play this type of file.',
		'項目名クリックで番組を昇順・降順に並べ替えることができます。': 'If you click on item name, you can sort programs.',
		'項目名をドラッグ＆ドロップで列の位置を変更できます。': 'Drag and drop item name to change column position.',
		'コミュニティ名をテキストエリアにドラッグ＆ドロップで NG 指定ができます。': 'Drag and drop community name to textarea to set filter.',
		'RSSの取得に失敗しました。ページを更新してみてください。\n\nエラーメッセージ：\n%s\n%d 行目': 'Failure to read RSS file. Please refresh this page.\n\nError message:\n%s\non line %d',
		'更新しますか？': 'Do you want to refresh?',
		'指定された URI から NG リストを読み込めませんでした。\n取得せずに続行します。\n\nエラーメッセージ：\n%s': 'Failure to get communities and channels from the specified URI.\nScript will continue without getting them.\n\nError message:\n%s',
		'設定のインポートとエクスポート': 'Import and export settings',
		'JSONファイルからインポートする': 'Import from JSON file',
		'JSON形式でファイルにエクスポート': 'Export to file in JSON format',
		'インポートに失敗しました。\n\nエラーメッセージ：\n%s': 'Import failed.\n\nError message:\n%s',
		'インポートが完了しました。ページを再読み込みします。': 'Import completed. Refreshing this page.',
		'ローカルストレージの容量制限を超えたので、プロパティ %p を無視しました。': 'Because the capacity of local storage was exceeded, %p property is ignored.', // %pはカンマ区切りのプロパティ名
		'値が壊れていたので、プロパティ %p を無視しました。': 'Because the value corrupted, %p property is ignored.', // %pはプロパティ名
		'使用中のブラウザが対応していないファイル形式のため、プロパティ %p を無視しました。': 'Because your browser doesn\'t support this type of file, %p property is ignored.', // %pはプロパティ名
		'アラート音を選択': 'Sets alert sound',
		'設定済みのアラート音を削除': 'Deletes alert sound set in advance',
		
		'ニコ生アラート（簡）': 'Nico Live alert (Kan)',
		'アラート（簡）': 'Alert (Kan)',
	},
});



// クライアントの言語を設定する
setlang(window.navigator.language);

/**
 * ページタイトル、ブラウジングコンテキスト名、ユーザースクリプトのコマンド名に用いる文字列
 * @const {string}
 */
var NAME = _('ニコ生アラート（簡）');

/**
 * niconico上部メニューのリンクテキストに用いる文字列
 * @const {string}
 */
var SHORT_NAME = _('アラート（簡）');

/**
 * {@link GM_setLargeString}や、アラートのルート要素のID等に用いる文字列
 * @const {string}
 */
var ID = 'alert-keyword-347021';

/**
 * 分をミリ秒に変換するときの乗数
 * @const {number}
 */
var MINUTES_TO_MILISECONDS = 60 * 1000;

/**
 * 秒をミリ秒に変換するときの乗数
 * @const {number}
 */
var SECONDS_TO_MILISECONDS = 1000;

/**
 * {@link GM_exportValues}で生成したファイルの解放や、{@link GM_importValues}で作成したinput要素の削除をするまでの時間（ミリ秒）
 * @const {number}
 */
var MAX_LIFETIME = 10 * MINUTES_TO_MILISECONDS;

/**
 * アラートを起動するページのURI
 * @const {string}
 */
var ALERT_URI = 'http://live.nicovideo.jp/alert/?' + ID;

/**
 * コミュニティURIを生成するとき、コミュニティIDに前置する文字列
 * @const {string}
 */
var COMMUNITY_URI_PREFIX = 'http://com.nicovideo.jp/community/';

/**
 * RSS一ページ毎に取得できる放送数
 * @const {number}
 */
var MAX_LIVES_PER_PAGE = 18;

/**
 * RSSの読み込みエラーを無視する回数
 * @const {number}
 */
var MAX_ERROR_COUNT = 10;

/**
 * 検索間隔（ミリ秒）
 * @const {number}
 */
var SEARCH_INTERVAL = 6 * MINUTES_TO_MILISECONDS;

/**
 * 表示している経過時間の修正間隔（ミリ秒）
 * @const {number}
 */
var UPDATING_ELAPSE_INTERVAL = 20 * SECONDS_TO_MILISECONDS;

/**
 * タイトル、キャプション、コミュニティ名の最大表示文字数
 * @const {number}
 */
var MAX_DATA_LENGTH = 60;

/**
 * 検索語句が一致した箇所の前に表示する文字数
 * @const {number}
 */
var WORD_COUNT_BEFORE_MARK = 3;

/**
 * FaviconのData URI
 * @type {Object}
 */
var favicon = {
	notFound: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAABvb2//2drc/9na3P///////////42Hsv+Nh7L////////////Z2tz/2drc/29vb/8AAAAAAAAAAAAAAABvb2//qqqq/////////////////42Hsv/EufX/xLn1/42Hsv///////////9na3P+qqqr/b29v/wAAAABvb2//jYey///////EufX///////////+Nh7L//////8S59f+Nh7L////////////EufX/2drc/42Hsv9vb2//b29v/8S59f///////////xUYI////////////42Hsv+Nh7L///////////8VGCP//////9na3P/EufX/b29v/29vb//EufX///////////8VGCP/////////////////////////////////FRgj///////Z2tz/xLn1/29vb/8AAAAAb29v/9na3P//////////////////////////////////////////////////////2drc/29vb/8AAAAAAAAAAAAAAABvb2//b29v/9na3P/////////////////////////////////Z2tz/b29v/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//b29v/9na3P/Z2tz/2drc/9na3P9vb2//b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//APD//w1qdv9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb/8Nanb/BMbU/w1qdv8Nanb/APD//w1qdv9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//BMbU/wDw//8ExtT/DWp2/wTG1P8A8P//b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb/8Nanb/b29v/29vb/8Nanb/b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb29v/9na3P+/wMP/b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb///////2drc/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb29v/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AcAAMADAACAAQAAAAAAAAAAAAAAAAAAgAEAAMADAADwDwAA/D8AAPAPAADwDwAA+B8AAPw/AAD8PwAA/n8AAA==',
	find: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAya7//yd///9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//J3///8mu//8AAAAAya7//yd///9vb2//2drc/9na3P///////////42Hsv+Nh7L////////////Z2tz/2drc/29vb/8nf///ya7//yd///9vb2//qqqq/////////////////42Hsv/EufX/xLn1/42Hsv///////////9na3P+qqqr/b29v/yd///9vb2//jYey///////EufX///////////+Nh7L//////8S59f+Nh7L////////////EufX/2drc/42Hsv9vb2//b29v/8S59f///////////xUYI////////////42Hsv+Nh7L///////////8VGCP//////9na3P/EufX/b29v/29vb//EufX///////////8VGCP/////////////////////////////////FRgj///////Z2tz/xLn1/29vb/8nf///b29v/9na3P//////////////////////////////////////////////////////2drc/29vb/8nf///ya7//yd///9vb2//b29v/9na3P/////////////////////////////////Z2tz/b29v/29vb/8nf///ya7//8mu///Jrv//J3///yd///9vb2//b29v/9na3P/Z2tz/2drc/9na3P9vb2//b29v/yd///8nf///ya7//8mu//8AAAAAya7//8mu///Jrv//J3///yd///9vb2//APD//w1qdv9vb2//J3///yd////Jrv//ya7//8mu//8AAAAAAAAAAAAAAADJrv//J3///29vb/8Nanb/BMbU/w1qdv8Nanb/APD//w1qdv9vb2//J3///8mu//8AAAAAAAAAAAAAAAAAAAAAya7//yd///9vb2//BMbU/wDw//8ExtT/DWp2/wTG1P8A8P//b29v/yd////Jrv//AAAAAAAAAAAAAAAAAAAAAMmu///Jrv//J3///29vb/8Nanb/b29v/29vb/8Nanb/b29v/yd////Jrv//ya7//wAAAAAAAAAAAAAAAAAAAAAAAAAAya7//8mu//8nf///b29v/9na3P+/wMP/b29v/yd////Jrv//ya7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADJrv//J3///29vb///////2drc/29vb/8nf///ya7//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMmu//8nf///b29v/29vb/8nf///ya7//wAAAAAAAAAAAAAAAAAAAAAAAAAAgAH//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//gAH//8AD///AA///wAP//+AH///wD///+B///w==',
	error: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//b29v/29vb/9vb2//b29v/29vb/9vb2//b29v/29vb/9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAABvb2//2tra/9ra2v///////////5WVlf+VlZX////////////a2tr/2tra/29vb/8AAAAAAAAAAAAAAABvb2//qqqq/////////////////5WVlf/MzMz/zMzM/5WVlf///////////9ra2v+qqqr/b29v/wAAAABvb2//lZWV///////MzMz///////////+VlZX//////8zMzP+VlZX////////////MzMz/2tra/5WVlf9vb2//b29v/8zMzP///////////xsbG////////////5WVlf+VlZX///////////8bGxv//////9ra2v/MzMz/b29v/29vb//MzMz///////////8bGxv/////////////////////////////////Gxsb///////a2tr/zMzM/29vb/8AAAAAb29v/9ra2v//////////////////////////////////////////////////////2tra/29vb/8AAAAAAAAAAAAAAABvb2//b29v/9ra2v/////////////////////////////////a2tr/b29v/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//b29v/9ra2v/a2tr/2tra/9ra2v9vb2//b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//2tra/2NjY/9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb/9jY2P/tbW1/2NjY/9jY2P/2tra/2NjY/9vb2//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvb2//tbW1/9ra2v+1tbX/Y2Nj/7W1tf/a2tr/b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb/9jY2P/b29v/29vb/9jY2P/b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb29v/9ra2v/BwcH/b29v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9vb///////2tra/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb29v/29vb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4Af//8AD//+AAf//AAD//wAA//8AAP//gAH//8AD///wD////D////AP///wD///+B////w////8P////n///w==',
};

var mainBox, alertSound, alertReader,
		NGsURI = GM_getValue('NGsURI'), NGCommunityURIsFromURI = [], userData, columns, pubDates, draggingEvent, mainBoxStyle,
		table, tableSection, headRow, cell, dl, dt, dd, button, textarea, ul, li, label, input, visibleColumns, columnsPosition, order, value, i, l,
		callbacksForFirefox, siteHeaderMenuLists;

if (ALERT_URI !== document.URL) {
	// アラートを起動するページでなければ
	// ユーザースクリプトのコマンドに追加
	if ('undefined' !== typeof GM_registerMenuCommand) {
		GM_registerMenuCommand(NAME, function () {
			if (window.navigator.userAgent.contains(' AppleWebKit/')) {
				// Blinkで実行時のポップアップブロック回避
				GM_openInTab(ALERT_URI);
			} else {
				window.open(ALERT_URI, NAME);				
			}
		});
	}

	if (document.domain === 'dic.nicovideo.jp') {
		// 大百科
		startScript(addsStartButton,
				function (parent) { return parent.localName === 'li'; },
				function (target) { return target.href === 'http://www.nicovideo.jp/top_service'; },
				function () { return document.getElementById('topline_menu'); },
				{
					isTargetParent: function (parent) { return parent.id === 'contents'; },
					isTarget: function (target) { return target.id === 'topline'; },
				});
	} else {
		switch (document.domain) {
			case 'seiga.nicovideo.jp':
			case 'ch.nicovideo.jp':
			case 'info.nicovideo.jp':
			case 'news.nicovideo.jp':
			case 'blog.nicovideo.jp':
			case 'faq.nicovideo.jp':
				// 静画・チャンネル・その他デバイス・ニュース・インフォ・ヘルプ
				callbacksForFirefox = {
					isTargetParent: function (parent) { return parent.localName === 'html'; },
					isTarget: function (target) { return target.localName === 'body'; },
				};
				break;
			case 'live.nicovideo.jp':
			case 'watch.live.nicovideo.jp':
				// 生放送
				callbacksForFirefox = {
					isTargetParent: function (parent) { return parent.id === 'body_header' || parent.localName === 'body'; },
					isTarget: function (target) { return target.id === 'siteHeader'; },
				};
				break;
			case 'uad.nicovideo.jp':
				// 広告
				callbacksForFirefox = {
					isTargetParent: function (parent) { return parent.id === 'wrapper'; },
					isTarget: function (target) { return target.id === 'siteHeader'; },
				};
				break;
			default:
				callbacksForFirefox = {
					isTargetParent: function (parent) { return parent.localName === 'body'; },
					isTarget: function (target) { return target.id === 'siteHeader'; },
				};
		}

		siteHeaderMenuLists = document.getElementsByClassName('siteHeaderMenuList');
		startScript(addsStartButton,
				function (parent) { return parent.id === 'siteHeaderLeftMenuContainer'; },
				function (target) { return target.classList.contains('menuServiceList'); },
				function () { return siteHeaderMenuLists[0]; },
				callbacksForFirefox);
	}
	return;
}

/**
 * 上部メニューに起動ボタンを追加する
 */
function addsStartButton() {
	var list, originalItem, item, anchor, refChild, separator;
	
	fixPrototypeJavaScriptFramework();

	list = document.getElementById('siteHeaderLeftMenuContainer') || document.getElementById('topbarMenu');
	originalItem = list.getElementsByTagName('li')[0];
	if (originalItem) {
		item = originalItem.cloneNode(true);
		refChild = list.getElementsByClassName('menuServiceList')[0] || list.lastElementChild;
	} else {
		// プルダウンメニューが存在しなければ、生放送へのリンクの右に挿入する
		originalItem = document.querySelector('.siteHeaderGlovalNavigation [href^="http://com.nicovideo.jp/"]').parentNode;
		item = originalItem.cloneNode(true);
		list = originalItem.parentNode;
		refChild = originalItem;
		separator = refChild.previousSibling;
	}
	anchor = item.getElementsByTagName('a')[0];
	if (anchor.className) {
		anchor.className = 'alert';
	}
	anchor.href = ALERT_URI;
	anchor.target = NAME;
	(anchor.getElementsByTagName('span')[0] || anchor).textContent = SHORT_NAME;
	list.insertBefore(item, refChild);

	document.addEventListener('click', function (event) {
		if (event.target.target === NAME && event.button < 2) {
			event.preventDefault();
			window.open(ALERT_URI, NAME);
		}
	});
}



/**
 * それぞれの列に関する情報
 * @type {Object[]}
 */
columns = [
	{
		label: '',
		name: 'thumbnail',
		prefix: 'media',
		attribute: 'url',
		alt: {
			name: 'title',
		},
		link: {
			name: 'link',
		},
		defaultVisible: false,
		title: _('コミュニティシンボルと番組リンク'),
	},
	{
		label: '',
		name: 'member_only',
		prefix: 'nicolive',
		defaultVisible: true,
		title: _('コミュニティ限定かどうか'),
		normalize: function (value) {
			return value === 'true';
		},
		displayFormat: function (value) {
			return value === 'true' ? _('コミュ限') : '';
		},
		type: 'boolean',
	},
	{
		label: _('経過'),
		name: 'pubDate',
		defaultVisible: true,
		title: _('放送開始からの経過時間'),
		displayFormat: getElapseTime,
		normalize: function (value) {
			return new Date(value).toISOString();
		},
		defaultOrder: 'asc',
		type: 'time',
		orderReverse: true,
	},
	{
		label: _('タイトル'),
		name: 'title',
		defaultVisible: true,
		title: _('番組のタイトル'),
		beforeFilter: function (value) {
			// 検索対象の半角カナを全角にし、連続する空白を削除
			return convertHalfKanaToFull(value).replace(/\s+/g, ' ');
		},
		link: {
			name: 'link',
		},
	},
	{
		label: _('カテゴリ'),
		name: 'category',
		defaultVisible: false,
		title: _('放送カテゴリ'),
	},
	{
		label: _('放送者'),
		name: 'owner_name',
		prefix: 'nicolive',
		defaultVisible: true,
		title: _('放送者のニックネーム'),
	},
	{
		label: _('キャプション'),
		name: 'description',
		defaultVisible: true,
		title: _('放送詳細の一部'),
		beforeFilter: function (value) {
			var doc;
			if (/<font[^>]+>.+<\/font>|<br \/>|<b>.+<\/b>|<i>.+<\/i>|<s>.+<\/s>|<u>.+<\/u>|&[0-9a-zA-Z]+;|&#[0-9]+;|&#x[0-9a-fA-F]+;/.test(value)) {
				// 放送詳細で使用できるタグや、文字参照が含まれていれば
				// HTMLタグを取り除き、文字参照を元に戻す
				doc = document.implementation.createHTMLDocument('');
				doc.body.innerHTML = value;
				value = doc.body.textContent;
			}
				
			// 検索対象の半角カナを全角にし、連続する空白を削除
			return convertHalfKanaToFull(value).replace(/\s+/g, ' ');
		},
	},
	{
		label: _('来場'),
		name: 'view',
		prefix: 'nicolive',
		defaultVisible: false,
		title: _('来場者数'),
		displayFormat: function (value) {
			return _('%d 人').replace('%d', value);
		},
		type: 'number',
	},
	{
		label: _('コメ数'),
		name: 'num_res',
		prefix: 'nicolive',
		defaultVisible: false,
		title: _('総コメント数'),
		displayFormat: function (value) {
			return _('%d コメ').replace('%d', value);
		},
		type: 'number',
	},
	{
		label: _('コミュニティ'),
		name: 'community_name',
		prefix: 'nicolive',
		beforeFilter: function (value) {
			// 検索対象の半角カナを全角にし、連続する空白を削除
			return convertHalfKanaToFull(value).replace(/\s+/g, ' ');
		},
		link: {
			name: 'community_id',
			prefix: 'nicolive',
			normalize: function (value) {
				return COMMUNITY_URI_PREFIX + value;
			},
		},
		defaultVisible: true,
		title: _('コミュニティ名とリンク'),
	},
];

/**
 * @type {GM_ValuesDefineder}
 */
var valuesDefineder = {
	words: 'string[]',
	NGs: 'string[]',
	NGsURI: 'string',
	order: {
		_requireValues: ['name', 'order'],
		name: columns.map(function (column) { return column.name; }),
		order: ['asc', 'desc'],
	},
	'columns-position': 'string[]',
	'visible-columns': 'string[]',
	exclusionMemberOnly: 'boolean',
	ellipsisTooLongRSSData: 'boolean',
	audioMuted: 'boolean',
	audioVolume: 'fraction',
	audioData: 'large',
};



/**
 * 検索語・NG コミュニティ
 * @type Object
 */
userData = {
	// 検索語
	get words () {
		return GM_getObject('words', []);
	},
	set words (value) {
		GM_setObject('words', value);
		this.normalize(value);
	},
	// 整形済み検索語
	normalizedWords: [],
	normalize: function (words) {
		this.normalizedWords = words.map(function (word) {
			var normalizedWords = {
				plus: [],
				minus: [],
			};

			// 整形
			word = normalizeWord(word).split(' ');

			// マイナス検索の分割
			word.forEach(function (value) {
				if (value.indexOf('-') === 0) {
					normalizedWords.minus.push(value.slice(1));
				} else {
					normalizedWords.plus.push(value);
				}
			});

			return normalizedWords;
		});
	},
	// NG コミュニティ
	NGsData: (function () {
		var NGs = GM_getValue('NGs');
		if (NGs) {
			return JSON.parse(NGs);
		} else {
			return [];
		}
	})(),
	get NGs () {
		return this.NGsData;
	},
	set NGs (value) {
		GM_setObject('NGs', value);
		this.NGsData = value;
	},
	get NGCommunityURIs () {
		return this.NGsData.map(function (NG) {
			return COMMUNITY_URI_PREFIX + NG;
		});
	},
};
userData.normalize(userData.words);



startScript(prepare,
		function (parent) { return parent.localName === 'html'; },
		function (target) { return target.localName === 'head'; },
		function () { return document.head; },
		{});



// アラート全体を格納するボックス
mainBox = document.createElement('div');
mainBox.id = ID;

// 項目の位置の設定
if (columnsPosition = GM_getObject('columns-position')) {
	updateColumns(columnsPosition);
}

// 条件に一致した番組を表示する表
table = document.createElement('table');
table.setAttribute('sortable', 'sortable');
tableSection = table.createTHead();
headRow = tableSection.insertRow(-1);
columns.forEach(function (column) {
	var th = document.createElement('th');
	th.classList.add(column.name);
	th.dataset.name = column.name;
	th.dataset.type = column.type || 'string';
	if ('orderReverse' in column) {
		th.dataset.orderReverse = column.orderReverse;
	}
	th.draggable = true;
	th.textContent = column.label;
	headRow.appendChild(th);
});

// 並べ替えの設定
if (!(order = GM_getObject('order'))) {
	// デフォルト値の設定
	for (i = 0, l = columns.length; i < l; i++) {
		if (columns[i].defaultOrder) {
			order = {
				name: columns[i].name,
				order: columns[i].defaultOrder,
			};
			break;
		}
	}
	GM_setObject('order', order);
}
headRow.getElementsByClassName(order.name)[0].classList.add(order.order);
headRow.getElementsByClassName(order.name)[0].setAttribute('sorted', (order.order === 'desc' ? 'reversed ' : '') + '1');


// 更新日時
tableSection = table.createTFoot();
cell = tableSection.insertRow(-1).insertCell(-1);
cell.colSpan = columns.length;

window.setTimeout(showUpdateTime, 1, null, cell);	// Firefox の Date.toLocaleString 文字化け対策

tableSection = document.createElement('tbody');
table.insertBefore(tableSection, table.tFoot);

// 経過時間の更新
pubDates = tableSection.getElementsByClassName('pubDate');
(function updateElapseTime() {
	Array.prototype.forEach.call(pubDates, function (pubDate) {
		var time = pubDate.firstElementChild;
		time.textContent = getElapseTime(time.dateTime);
	});
	window.setTimeout(updateElapseTime, UPDATING_ELAPSE_INTERVAL);
})();

// 表示する項目の初期値の設定
visibleColumns = GM_getObject('visible-columns');
if (!visibleColumns) {
	visibleColumns = columns.filter(function (column) {
		return column.defaultVisible;
	}).map(function (column) {
		return column.name;
	});
	GM_setObject('visible-columns', visibleColumns);
}

// 表に反映
visibleColumns.forEach(function (name) {
	table.classList.add(name);
});

table.addEventListener('dragstart', function (event) {
	draggingEvent = event;
	if (event.target.localName === 'th' && document.querySelector('#' + ID + ' thead tr').contains(event.target)) {
		event.dataTransfer.setData('Text', '');
		// 他のスクリプトを抑制
		event.stopPropagation();
	}
});

headRow.addEventListener('drag', function (event) {
	if (event.target.localName === 'th') {
		// 他のスクリプトを抑制
		event.stopPropagation();
	}
});

headRow.addEventListener('dragover', function (event) {
	var className;
	if (draggingEvent.target.localName === 'th' && event.currentTarget.contains(draggingEvent.target)) {
		event.preventDefault();
		// 項目の移動先
		className = event.pageX < event.target.offsetLeft + event.target.offsetWidth / 2 ? 'inserting-before' : 'inserting-after';
		if (!event.target.classList.contains(className)) {
			removeOldClassName();
			event.target.classList.add(className);
		}
	}
});

headRow.addEventListener('dragleave', function (event) {
	if (draggingEvent.target.localName === 'th' && event.currentTarget.contains(draggingEvent.target)) {
		removeOldClassName();
	}
});

mainBox.appendChild(table);



// 検索語・NG コミュニティ入力ボックス
dl = document.createElement('dl');

// 検索語
dt = document.createElement('dt');
dt.textContent = _('検索語句リスト');
button = document.createElement('button');
button.name = 'save-searching-words';
button.textContent = _('保存');
dt.appendChild(button);
dl.appendChild(dt);

dd = document.createElement('dd');
textarea = document.createElement('textarea');
textarea.name = 'searching-words';
textarea.value = userData.words.join('\n');
dd.appendChild(textarea);
dl.appendChild(dd);

// NG コミュニティ
dt = document.createElement('dt');
dt.textContent = _('NG コミュニティ・チャンネルリスト');
button = document.createElement('button');
button.name = 'save-ng-communities';
button.textContent = _('保存');
dt.appendChild(button);
// 外部NGリスト設定ボタンの追加
if (typeof GM_xmlhttpRequest !== 'undefined' && !GM_xmlhttpRequest.toString().contains('Violentmonkey')) {
	// Violentmonkey以外の実行環境
	button = document.createElement('button');
	button.name = 'sets-blacklist-uri';
	button.textContent = _('NG リストを追加する URI を設定');
	dt.appendChild(button);
}
dl.appendChild(dt);

dd = document.createElement('dd');
textarea = document.createElement('textarea');
textarea.name = 'ng-communities';
textarea.value = userData.NGs.join('\n');
dd.appendChild(textarea);
dl.appendChild(dd);

mainBox.appendChild(dl);

// ダブルクリックした検索語・コミュニティを新しいタブで開く
dl.addEventListener('dblclick', function (event) {
	var URI, words, word, clickedPosition, beginSlice, endSlice;

	if (event.target.localName !== 'textarea') {
		return;
	}
	
	words = event.target.value;

	// ダブルクリックされた位置を取得
	clickedPosition = event.target.selectionStart;

	// ダブルクリックされた行を取得
	beginSlice = words.slice(clickedPosition, clickedPosition + 1) === '\n' ? clickedPosition - 1 : clickedPosition;
	beginSlice = words.lastIndexOf('\n', beginSlice);
	if (beginSlice === -1) {
		beginSlice = 0;
	}
	endSlice = words.indexOf('\n', clickedPosition);
	word = words.slice(beginSlice, endSlice === -1 ? undefined : endSlice).trim();

	if (event.target.name === 'searching-words') {
		// 検索語
		if (!word) {
			return;
		}
		word = word.replace(/\./g, '．');
		URI = 'http://live.nicovideo.jp/search/' + encodeURIComponent(word);
	} else {
		// コミュニティ
		word = getCommunityID(word);
		if (!word) {
			return;
		}
		URI = COMMUNITY_URI_PREFIX + word;
	}
	window.open(URI);
});



// コントローラー
alertSound = new Audio();
alertSound.loop = false;
alertSound.autoplay = false;
alertSound.controls = true;
if (value = GM_getLargeValue('audioData')) {
	alertSound.src = value;
} else {
	alertSound.hidden = true;
}
if (value = GM_getValue('audioMuted')) {
	alertSound.muted = value;
}
if (value = GM_getValue('audioVolume')) {
	alertSound.volume = value;
}
mainBox.appendChild(alertSound);

// 静音状態・音量を記憶
alertSound.addEventListener('volumechange', function (event) {
	GM_setValue('audioMuted', event.target.muted);
	GM_setValue('audioVolume', event.target.volume.toString());
});



// オプションのユーザー設定項目
button = document.createElement('button');
button.type = 'button';
button.classList.add('toggling-user-setting-options');
button.textContent = _('追加設定ボックスの開閉');
mainBox.appendChild(button);

dl = document.createElement('dl');
dl.classList.add('user-setting-options');
dl.addEventListener('change', function (event) {
	var visibleColumns = [], file;
	switch (event.target.name) {
		case 'visible-column':
			// 表示する項目の選択
			document.querySelector('#' + ID + ' table').classList[event.target.checked ? 'add' : 'remove'](event.target.value);
			// 保存
			Array.prototype.forEach.call(document.getElementsByName('visible-column'), function (input) {
				if (input.checked) {
					visibleColumns.push(input.value);
				}
			});
			GM_setObject('visible-columns', visibleColumns);
			break;
			
		case 'exclusion-member-only':
			// コミュ限放送の非表示
			GM_setValue('exclusionMemberOnly', event.target.checked);

			// すでに表示している番組を非表示に
			if (event.target.checked) {
				removeLive(function (row) {
					var memberOnly = row.getElementsByClassName('member_only')[0];
					return memberOnly && memberOnly.textContent;
				});
			}
			break;
			
		case 'ellipsis-too-long-data':
			// 文字数制限を超えている場合に省略
			GM_setValue('ellipsisTooLongRSSData', event.target.checked);
			break;
			
		case 'alert-sound':
			// 音楽ファイルが選択された時
			file = event.target.files[0];
			event.target.parentNode.removeChild(event.target);
			if (file) {
				if (alertSound.canPlayType(file.type)) {
					alertReader.readAsDataURL(file);
				} else {
					window.alert(_('使用中のブラウザが対応していないファイル形式です。'));
				}
			}
			break;
	}
});

// インポートとエクスポート
dt = document.createElement('dt');
dt.textContent = _('設定のインポートとエクスポート');
dl.appendChild(dt);
dd = document.createElement('dd');
button = document.createElement('button');
button.type = 'button';
button.textContent = _('JSONファイルからインポートする');
button.name = 'import';
dd.appendChild(button);
button = document.createElement('button');
button.type = 'button';
button.textContent = _('JSON形式でファイルにエクスポート');
button.name = 'export';
dd.appendChild(button);
dl.appendChild(dd);

// 表示項目の選択肢
dt = document.createElement('dt');
dt.textContent = _('表示する項目の設定');
dl.appendChild(dt);
dd = document.createElement('dd');
ul = document.createElement('ul');
ul.classList.add('visible-columns');
columns.forEach(function (column) {
	var li, label, checkbox;
	li = document.createElement('li');
	li.classList.add(column.name);
	label = document.createElement('label');
	checkbox = document.createElement('input');
	checkbox.name = 'visible-column';
	checkbox.value = column.name;
	checkbox.type = 'checkbox';
	checkbox.checked = visibleColumns.indexOf(column.name) !== -1;
	label.appendChild(checkbox);
	label.appendChild(new Text(column.title));
	li.appendChild(label);
	ul.appendChild(li);
});
dd.appendChild(ul);
dl.appendChild(dd);

// その他の設定
dt = document.createElement('dt');
dt.textContent = _('その他の設定');
dl.appendChild(dt);
dd = document.createElement('dd');
ul = document.createElement('ul');

// コミュ限放送を通知しない
li = document.createElement('li');
label = document.createElement('label');
input = document.createElement('input');
input.name = 'exclusion-member-only';
input.type = 'checkbox';
if (GM_getValue('exclusionMemberOnly')) {
	input.checked = true;
}
label.appendChild(input);
label.appendChild(new Text(_('コミュニティ限定の放送を通知しない')));
li.appendChild(label);
ul.appendChild(li);

// 制限文字数を超えたキャプション等を省略する
li = document.createElement('li');
label = document.createElement('label');
input = document.createElement('input');
input.name = 'ellipsis-too-long-data';
input.type = 'checkbox';
if (GM_getValue('ellipsisTooLongRSSData', true)) {
	input.checked = true;
}
label.appendChild(input);
label.appendChild(new Text(_('タイトル・キャプション・コミュニティ名が %d 文字を超えたら省略する').replace('%d', MAX_DATA_LENGTH)));
li.appendChild(label);
ul.appendChild(li);

dd.appendChild(ul);
dl.appendChild(dd);

// アラート音
li = document.createElement('li');
dt = document.createElement('dt');
dd = document.createElement('dd');
dt.textContent = _('アラート音');
dl.appendChild(dt);

// アラート音の選択
button = document.createElement('button');
button.type = 'button';
button.name = 'select-sound';
button.textContent = _('アラート音を選択');
dd.appendChild(button);

// アラート音の削除
button = document.createElement('button');
button.type = 'button';
button.name = 'delete-sound';
button.textContent = _('設定済みのアラート音を削除');
if (!alertSound.src) {
	button.hidden = true;
}
dd.appendChild(button);

dl.appendChild(dd);

// 注意書き
dt = document.createElement('dt');
dl.appendChild(dt);
dd = document.createElement('dd');
ul = document.createElement('ul');
[
	_('項目名クリックで番組を昇順・降順に並べ替えることができます。'),
	_('項目名をドラッグ＆ドロップで列の位置を変更できます。'),
	_('コミュニティ名をテキストエリアにドラッグ＆ドロップで NG 指定ができます。'),
].forEach(function (content) {
	var li = document.createElement('li');
	li.textContent = content;
	ul.appendChild(li);
});
dd.appendChild(ul);
dl.appendChild(dd);

mainBox.appendChild(dl);

mainBox.addEventListener('click', function (event) {
	var target = event.target, name = target.name, classList = target.classList,
			words, normalizedWords, isSearchingWords, started, opened,
			input, explanation, newURI, table, tBody, rows, cell, reversed, dt, textarea;

	if (target.localName === 'button') {
		if (name === 'sets-blacklist-uri') {
			// 特定の URI から NG リストを読み込んで、検索時に付加
			explanation = _('特定の URI から NG リストを読み込んで、検索時に付加します。') + '\n'
					+ _('JSON 形式のコミュニティ ID 配列のみ有効です。') + '\n'
					+ _('また、NG リストの読み込みは、アラートページ読み込み時に1回だけ行われます。');
			newURI = window.prompt(explanation, NGsURI || '');
			if (newURI !== null) {
				NGsURI = newURI;
				GM_setValue('NGsURI', NGsURI);
			}
		} else if (name === 'import') {
			// インポート
			GM_importValues(valuesDefineder, function (values, errorProperties) {
				var message = _('インポートが完了しました。ページを再読み込みします。'), audio;
				if (errorProperties.length > 0) {
					message += '\n' + _('ローカルストレージの容量制限を超えたので、プロパティ %p を無視しました。').replace('%p', errorProperties.join(', '));
				}
				if (errorProperties.indexOf('audioData') === -1 && 'audioData' in values) {
					// audioDataがインポートされていれば
					if (!values.audioData.startsWith('data:audio/')) {
						// 音楽ファイルのData URIでなければ
						message += '\n' + _('値が壊れていたので、プロパティ %p を無視しました。').replace('%p', 'audioData');
						ignoreAudioData();
					} else {
						audio = new Audio(values.audioData);
						audio.addEventListener('loadeddata', function () {
							if (audio.error) {
								// ブラウザが再生できないデータなら
								message += '\n' + _('使用中のブラウザが対応していないファイル形式のため、プロパティ %p を無視しました。').replace('%p', 'audioData');
								ignoreAudioData();
							}
							window.alert(message);
							window.location.reload();
						});
						audio.addEventListener('error', function () {
							// ブラウザが再生できないデータなら
							message += '\n' + _('使用中のブラウザが対応していないファイル形式のため、プロパティ %p を無視しました。').replace('%p', 'audioData');
							ignoreAudioData();
							window.alert(message);
							window.location.reload();
						});
						return;
					}
				}
				window.alert(message);
				window.location.reload();

				/**
				 * audio要素に設定済みの音楽ファイルを{@link GM_setLargeValue}で保存する
				 */
				function ignoreAudioData() {
					var audio = document.querySelector('#' + ID + ' audio');
					GM_deleteLargeValue('audioData');
					if (audio.src) {
						try {
							GM_setLargeValue('audioData', audio.src);
						} catch(e) {
							if (e.name !== 'QuotaExceededError' && e.name !== 'NS_ERROR_DOM_QUOTA_REACHED') {
								throw(e);
							}
						}
					}
				}
			}, function (e) {
				window.alert(_('インポートに失敗しました。\n\nエラーメッセージ：\n%s').replace('%s', e));
			});
		} else if (name === 'export') {
			// エクスポート
			GM_exportValues(valuesDefineder, ID);
		} else if (name === 'select-sound') {
			// アラート音の選択
			input = document.createElement('input');
			input.type = 'file';
			input.name = 'alert-sound';
			input.accept = 'audio/*';
			input.hidden = true;
			event.target.appendChild(input);
			input.click();
			window.setTimeout(function (input) {
				if (document.contains(input)) {
					input.parentNode.removeChild(input);
				}
			}, MAX_LIFETIME, input);
			input = null;
		} else if (name === 'delete-sound') {
			// 設定済みのアラート音の削除
			target.hidden = true;
			alertSound.hidden = true;
			alertSound.src = '';
			GM_deleteLargeValue('audioData');
		} else if (classList.contains('toggling-user-setting-options')) {
			// 追加設定ボックスの開閉
			opened = event.currentTarget.classList.toggle('opening-user-setting-options');
			target.scrollIntoView(opened);
			if (opened && !document.body.classList.contains('nofix')) {
				window.scrollBy(0, -document.getElementById('siteHeader').clientHeight);
			}
		} else if (name === 'save-searching-words' || name === 'save-ng-communities') {
			// 検索語・NG コミュニティの保存
			// 二重クリックを防止
			target.disabled = true;

			// 対応するテキストエリアを取得
			dt = target.parentNode;
			textarea = dt.nextElementSibling.firstElementChild;

			// 改行で分割
			words = textarea.value.split(/\r\n|\r|\n/);

			// 前後の空白を削除
			words = words.map(function (value) {
				return value.trim();
			});

			// 空行を削除
			words = words.filter(function (value) {
				return value;
			});

			// 検索語句リストかNGコミュニティリストか
			isSearchingWords = name === 'save-searching-words';

			// 整形
			normalizedWords = words.map(isSearchingWords ? normalizeWord : getCommunityID);

			// 重複を検出
			if (!isSearchingWords) {
				words = JSON.parse(JSON.stringify(normalizedWords));
			}
			normalizedWords.forEach(function (word, i) {
				// 現在の要素を削除
				normalizedWords[i] = null;

				// 現在の要素と同じ値が存在するか
				if (normalizedWords.indexOf(word) !== -1) {
					words[i] = null;
				}
			});

			// 重複・コミュニティ ID が見つからなかった行を削除
			words = words.filter(function (word) {
				return word;
			});

			// 保存
			if (isSearchingWords) {
				started = userData.words.length > 0;
				userData.words = words;

				if (!started && userData.words.length > 0) {
					// RSS 取得が動いていなかったら
					getLives(1, false, 0);
				}
			} else {
				userData.NGs = words;
			}

			// テキストエリアに出力
			textarea.value = words.join('\r\n');

			// クリック禁止を解除
			target.disabled = false;

			// すでに表示している番組を非表示に
			if (!isSearchingWords) {
				removeLive(function (row) {
					return userData.NGCommunityURIs.indexOf(getCommunityURI(row)) !== -1;
				});
			}
		}
	} else if (target.localName === 'th') {
		// 列ごとの並び替え
		// すでに並び替えられている列を取得
		cell = target.parentNode.querySelector('[sorted]');
		
		// 並べ替え後は降順になるか否か
		reversed = cell === target && cell.getAttribute('sorted').toLowerCase().trim().split(/\s+/).indexOf('reversed') === -1;
		
		if (!('sort' in target)) {
			// table要素のソートが実装されていなければ
			// sortイベントを発行
			table = event.currentTarget.getElementsByTagName('table')[0];
			table.dispatchEvent(new Event('sort'));
			
			// 行リストを配列化
			tBody = table.tBodies[0];
			rows = Array.prototype.slice.call(tBody.rows);

			
			
			if (cell === target) {
				// 選択された列が、すでに並べ替えられている列なら
				// sorted属性の設定
				cell.setAttribute('sorted', (reversed ? 'reversed ' : '') + '1');
				// 並び順を反転
				rows.reverse();
			} else {
				// 他の列のsorted属性を削除
				cell.removeAttribute('sorted');

				// sorted属性の設定
				target.setAttribute('sorted', '1');

				// 昇順に並び替え
				rows.sort(function (a, b) {
					return compareRows(target, a, b);
				});
			}

			// 画面に反映
			rows.forEach(function (row) {
				tBody.appendChild(row);
			});
		}

		// 保存
		GM_setObject('order', {
			name: target.dataset.name,
			order: reversed ? 'desc' : 'asc',
		});
	}
});



// 音声ファイルの読み込み
alertReader = new FileReader();
alertReader.addEventListener('load', function (event) {
	try {
		GM_setLargeValue('audioData', event.target.result);
		alertSound.src = event.target.result;
		alertSound.hidden = false;
		document.getElementsByName('delete-sound')[0].hidden = false;
	} catch(e) {
		if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
			window.alert(_('ファイルサイズが大きいため、設定に失敗しました。\n\nエラーメッセージ：\n%s').replace('%s', e));
		} else {
			throw(e);
		}
	}
});

/**
 * 列の移動先を示すクラス名を削除する
 */
function removeOldClassName() {
	var oldRef = document.querySelector('.inserting-before, .inserting-after');
	if (oldRef) {
		oldRef.classList.remove('inserting-before');
		oldRef.classList.remove('inserting-after');
	}
}

mainBox.addEventListener('drop', function (event) {
	var targetIndex, refIndex, ul, row,
			dragEvent, init = {}, key, columnsPosition;

	row = event.currentTarget.querySelector('thead tr');
	if (draggingEvent.target.localName === 'th' && row.contains(draggingEvent.target) && event.target.localName === 'th' && row.contains(event.target)) {
		// 項目を移動
		targetIndex = draggingEvent.target.cellIndex;
		refIndex = event.target.cellIndex + (event.target.classList.contains('inserting-before') ? 0 : 1);

		// 変更があれば
		if (targetIndex !== refIndex) {
			// 表示を変更
			Array.prototype.forEach.call(document.querySelectorAll('#' + ID + ' table > :not(tfoot) tr'), function (row) {
				row.insertBefore(row.cells[targetIndex], row.cells[refIndex]);
			});

			// 項目の位置を取得
			columnsPosition = Array.prototype.map.call(row.cells, function (th) {
				return th.dataset.name;
			});

			// 表示する列一覧を並べ替える
			ul = document.getElementsByClassName('visible-columns')[0];
			ul.insertBefore(ul.getElementsByClassName(draggingEvent.target.dataset.name)[0],
					draggingEvent.target.nextElementSibling ? ul.getElementsByClassName(draggingEvent.target.nextElementSibling.dataset.name)[0] : null);

			// 設定を保存
			updateColumns(columnsPosition);
			GM_setObject('columns-position', columnsPosition);
		}

		event.target.classList.remove('inserting-before');
		event.target.classList.remove('inserting-after');
	} else if (event.target.name === 'ng-communities') {
		// NG コミュニティを追加
		event.preventDefault();

		// 他のスクリプトを阻害しないよう dragend イベントを発生させておく
		for (key in draggingEvent) {
			init[key] = draggingEvent[key];
		}
		dragEvent = new DragEvent('dragend', init);
		draggingEvent.target.dispatchEvent(dragEvent);

		event.target.value += '\n' + event.dataTransfer.getData('Text');
		document.getElementsByName('save-ng-communities')[0].click();
	}
});



startScript(main, function (parent) {
	return parent.localName === 'body';
}, function (target) {
	return target.id === 'utility_link';
}, function () {
	return document.getElementById('utility_link');
}, {});


/**
 * {@link main}より先に実行しておく処理
 */
function prepare() {
	var styleSheet, cssRules, base;

	// スタイルの設定
	styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	cssRules = styleSheet.cssRules;
	[
		'#' + ID + ' {'
				+ 'margin: 1em;'
				+ '}',
		'#all_cover {'
				+ 'display: none;'
				+ '}',
		'#' + ID + ' a:link {'
				+ 'color: mediumblue;'
				+ '}',
		'#' + ID + ' a:visited {'
				+ 'color: midnightblue;'
				+ '}',
		'#' + ID + ' table {'
				+ 'width: 100%;'
				+ '}',
		'#' + ID + ' tr {'
				+ 'background: silver;'
				+ 'border-width: 1px;'
				+ 'border-style: solid none;'
				+ '}',
		'#' + ID + ' thead th {'
				+ 'white-space: nowrap;'
				+ '}',
		'#' + ID + ' tbody {'
				+ 'text-align: left;'
				+ 'border-top: solid;'
				+ 'border-bottom: solid;'
				+ '}',
		// ボタンの左右のマージン
		'#' + ID + ' button {'
				+ 'margin-left: 0.2em;'
				+ 'margin-right: 0.2em;'
				+ '}',
		// セル内容の右寄せ・改行禁止
		'#' + ID + ' td.pubDate,' +
		'#' + ID + ' td.view,' +
		'#' + ID + ' td.num_res {'
				+ 'text-align: right;'
				+ 'white-space: nowrap;'
				+ '}',
		// 行の背景色
		'#' + ID + ' tbody tr:nth-child(2n-1),' +
		'#' + ID + ' tbody:not(.odd) + tfoot tr {'
				+ 'background: white;'
				+ '}',
		'#' + ID + ' tr td,' +
		'#' + ID + ' tr th {'
				+ 'padding: 3px;'
				+ '}',
		'#' + ID + ' tr td.illegal {'
				+ 'font-style: oblique;'
				+ '}',
		// 列ごとの並べ替え
		'#' + ID + ' thead th:hover {'
				+ 'cursor: pointer;'
				+ 'background: gainsboro;'
				+ '}',
		// ▲▼
		'[sorted]::before,' +
		'.toggling-user-setting-options::before {'
				+ 'content: "▲";'
				+ 'color: darkslategray;'
				+ 'margin-right: 0.5em;'
				+ '}',
		'[sorted*="reversed"]::before,' +
		'#' + ID + ':not(.opening-user-setting-options) .toggling-user-setting-options::before {'
				+ 'content: "▼";'
				+ '}',
		// 項目の移動
		'.inserting-before {'
				+ 'border-left: solid lightskyblue thick;'
				+ '}',
		'.inserting-after {'
				+ 'border-right: solid lightskyblue thick;'
				+ '}',
		'#' + ID + ' dl:first-of-type {'
				+ '-webkit-column-count: 2;'    // Blink
				+ '-moz-column-count: 2;'       // Firefox
				+ 'column-count: 2;'
				+ '}',
		'#' + ID + ' dl textarea {'
				+ 'width: 100%;'
				+ 'height: 20em;'
				+ '}',
		// 検索語句の強調表示
		'#' + ID + ' mark {'
				+ 'color: inherit;'
				+ 'background: khaki;'
				+ '}',
		// 省略記号の表示
		'.ellipsis-left::before,' +
		'.ellipsis-right::after {'
				+ 'content: "…";'
				+ 'color: dimgray;'
				+ '}',
		'.ellipsis-left::before {'
				+ 'margin-right: 0.2em;'
				+ '}',
		'.ellipsis-right::after {'
				+ 'margin-left: 0.2em;'
				+ '}',
		'.ellipsis-left::before {'
				+ 'margin-right: 0.2em;'
				+ '}',
		'.ellipsis-right::after {'
				+ 'margin-left: 0.2em;'
				+ '}',
		// Blinkにおける全文の表示
		'#' + ID + ' td {'
				+ 'position: relative;'
				+ '}',
		'[data-entire-text]:hover::after {'
				+ 'content: attr(data-entire-text);'
				+ 'position: absolute;'
				+ 'top: calc(100% + 0.2em);'
				+ 'left: 1em;'
				+ 'border: 1px solid dimgray;'
				+ 'background: khaki;'
				+ 'padding: 0.5em;'
        		+ 'opacity: 0.9;'
				+ 'border-radius: 0.7em;'
				+ 'z-index: 1;'
				+ '}',
		// 追加設定ボックスの開閉
		'.user-setting-options {'
				+ 'display: none;'
				+ 'width: 100%;'
				+ '-moz-box-orient: vertical;'  // Firefox 17 ESR
				+ 'flex-direction: column;'
				+ '-moz-box-align: center;'     // Firefox 17 ESR
				+ 'align-items: center;'
				+ '}',
		'.opening-user-setting-options .user-setting-options {'
				+ 'display: -moz-box;'          // Firefox 17 ESR
				+ 'display: flex;'
				+ '}',
		// 追加設定ボックス
		'.user-setting-options dt {'
				+ 'margin-top: 2em;'
				+ 'font-weight: bold;'
				+ '}',
		'.user-setting-options dd > * {'
				+ 'text-align: left;'
				+ '}',
		'.user-setting-options > :last-of-type li {'
				+ 'list-style: disc;'
				+ '}',
		// 列の非表示設定
		columns.map(function (column) {
			return '#' + ID + ' table:not(.' + column.name + ') .' + column.name;
		}).join(',') + ' { display: none; }',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	// アラート全体を格納するボックスのスタイル
	mainBoxStyle = cssRules[0].style;



	// ページタイトルの設定
	document.title = NAME;



	// ファビコンの設定
	setIcon(favicon.notFound);

	window.addEventListener('focus', setIcon);
	window.addEventListener('blur', setIcon);
	document.addEventListener('mousemove', setIcon);



	// 新しいタブで開く
	base = document.createElement('base');
	base.target = '_blank';
	document.head.insertBefore(base, document.head.firstChild);
}

function main() {
	fixPrototypeJavaScriptFramework();
	
	
	// 削除
	document.body.removeChild(document.getElementById('all_cover'));
	

	// ヘッダを修正
	Array.prototype.forEach.call(document.querySelectorAll('[href^="javascript:"]'), function (select) {
		select.target = '_self';
	});



	// 挿入
	document.body.insertBefore(mainBox, document.getElementById('utility_link'));






	// 検索開始
	if (NGsURI && typeof GM_xmlhttpRequest !== 'undefined' && !GM_xmlhttpRequest.toString().contains('Violentmonkey')) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: NGsURI,
			onload: function (response) {
				try {
					NGCommunityURIsFromURI = JSON.parse(response.responseText).map(function (NG) {
						return COMMUNITY_URI_PREFIX + NG;
					});
				} catch (e) {
					window.alert(_('指定された URI から NG リストを読み込めませんでした。\n取得せずに続行します。\n\nエラーメッセージ：\n%s').replace('%s', e));
				}
				getLives(1, false, 0);
			},
			onerror: function(res) {
				/**
				 * @type string
				 * @see {@link https://github.com/scriptish/scriptish/wiki/GM_xmlhttpRequest#examples GM_xmlhttpRequest · scriptish/scriptish Wiki · GitHub}
				 */
				var msg = "An error occurred."
						+ "\nresponseText: " + res.responseText
						+ "\nreadyState: " + res.readyState
						+ "\nresponseHeaders: " + res.responseHeaders
						+ "\nstatus: " + res.status
						+ "\nstatusText: " + res.statusText
						+ "\nfinalUrl: " + res.finalUrl;
				
				window.alert(_('指定された URI から NG リストを読み込めませんでした。\n取得せずに続行します。\n\nエラーメッセージ：\n%s').replace('%s', msg));
				getLives(1, false, 0);
			},
		});
	} else {
		getLives(1, false, 0);
	}

	startScript(trueUpFooterBottom, function (parent) {
		return parent === document.body;
	}, function (target) {
		return target.id === 'body_footer_wrap';
	}, function () {
		return document.getElementById('body_footer_wrap');
	}, {});
}

/**
 * {@link Array#sort}の比較関数内で用いる、行と行を比較する関数
 * @param {HTMLTableHeaderCellElement} th - thead要素内のセル。比較対象の列を示し、datasetプロパティに列の情報を持つ
 * @param {HTMLTableRowElement} a
 * @param {HTMLTableRowElement} b
 * @returns {number} a < b なら -1、a > b なら 1 を返す
 */
function compareRows(th, a, b) {
	var columnName = th.dataset.name, type = th.dataset.type;
	return (getCellContent(a, columnName, type) < getCellContent(b, columnName, type) ? -1 : 1) * (th.dataset.orderReverse ? -1 : 1);
}

/**
 * 正規化済みのセルの内容を取得する
 * @param {HTMLTableRowElement} row
 * @param {string} columnName - セルのクラス名
 * @param {string} type - セルの内容のデータ型
 * @returns {(string|number)}
 */
function getCellContent(row, columnName, type) {
	var content = row.getElementsByClassName(columnName)[0].firstElementChild;
	switch (type) {
		case 'time':
			return new Date(content.dateTime);
			break;
		case 'number':
			return Number(content.value);
			break;
		default:
			return content.value;
	}
}

/**
 * 行を挿入
 * @param {Object} live
 */
function pushMatchLive(live) {
	var table = document.querySelector('#' + ID + ' table'), tBody = table.tBodies[0], row = tBody.insertRow(-1), rows = tBody.rows, insertingColumn,
			name, result, i, l,
			cell, text, entireText, dataElement, ranges = [], trimRanges = [], viewStartOffset, viewEndOffset,
			range, anchor, img, type;

	// 検索語句の強調表示
	['title', 'description', 'community_name'].forEach(function (name) {
		if (live[name].data !== null) {
			// 検索語句が含まれる位置を確認
			live[name].markOffsets = [];
			live.searchWords.plus.forEach(function (word) {
				var index = normalizeString(live[name].displayData).indexOf(word);
				if (index !== -1) {
					live[name].markOffsets.push([index, index + word.length]);
				}
			});

			// ソート
			live[name].markOffsets.sort(function (a, b) {
				return a[0] - b[0];
			});

			// 位置が重なっていたら一つにまとめる
			for (i = 0; i < live[name].markOffsets.length; i++) {
				if (live[name].markOffsets[i + 1] && live[name].markOffsets[i][1] >= live[name].markOffsets[i + 1][0]) {
					// 次の位置のペアが存在し、現在のペアの終了位置が次のペアの開始位置以上であれば
					// 現在のペアの終了位置を次のペアの終了位置に
					live[name].markOffsets[i][1] = live[name].markOffsets[i + 1][1];
					// 次のペアを削除
					live[name].markOffsets.splice(i + 1, 1);
					// 次の次のペアと重なっているかも確認
					i--;
				}
			}

			if (live[name].markOffsets.length === 0) {
				delete live[name].markOffsets;
			}
		}
	});
	delete live.searchWords;

	// 列を挿入
	for (name in live) {
		cell = row.insertCell(-1);
		
		cell.classList.add(name);
			
		if (live[name].data === null) {
			// 取得できなかった場合
			cell.classList.add('illegal');
		}
		
		// 並べ替え用の文字列を保存
		type = table.getElementsByClassName(name)[0].dataset.type;
		dataElement = document.createElement(type === 'time' ? 'time' : 'data');
		dataElement[type === 'time' ? 'dateTime' : 'value'] = live[name].normalizedData;
		dataElement = cell.appendChild(dataElement);

		// リンクを作成
		if (live[name].link) {
			anchor = document.createElement('a');
			anchor.href = live[name].link;
			dataElement = dataElement.appendChild(anchor);
		}

		// 挿入
		if (live[name].alt) {
			img = new Image();
			img.src = live[name].data;
			img.alt = live[name].alt;
			dataElement.appendChild(img);
		} else {
			// 文字列をDocumentFragmentに
			text = new DocumentFragment();
			text.textContent = live[name].displayData;
			if (live[name].markOffsets) {
				// 検索語句が一致する箇所があれば
				// Rangeインスタンスを生成
				live[name].markOffsets.forEach(function (offsets) {
					range = new Range();
					range.setStart(text.firstChild, offsets[0]);
					range.setEnd(text.firstChild, offsets[1]);
					ranges.push(range);
				});
			}
			if (GM_getValue('ellipsisTooLongRSSData', true) && ['title', 'description', 'community_name'].indexOf(name) !== -1 && live[name].displayData.length > MAX_DATA_LENGTH) {
				// 設定の省略するにチェックが入っており、タイトル・キャプション・コミュニティ名の文字数が制限を超えていれば
				entireText = live[name].displayData;
				if (live[name].markOffsets) {
					// 検索語句が一致する箇所があれば
					// 検索語句が一致する箇所を <<>> で囲んだ文字列を作成
					live[name].markOffsets.concat().reverse().forEach(function (offsets) {
						entireText = entireText.slice(0, offsets[1]) + '>> ' + entireText.slice(offsets[1]);
						entireText = entireText.slice(0, offsets[0]) + ' <<' + entireText.slice(offsets[0]);
					});
					// 表示する部分の開始位置・終了位置を取得
					if (live[name].markOffsets[live[name].markOffsets.length - 1][1] <= MAX_DATA_LENGTH) {
						// 先頭から制限文字数の範囲内にマーク位置がすべて含まれていれば
						viewStartOffset = 0;
						viewEndOffset = MAX_DATA_LENGTH;
					} else {
						viewStartOffset = live[name].markOffsets[0][0] - WORD_COUNT_BEFORE_MARK;
						viewEndOffset = viewStartOffset + MAX_DATA_LENGTH;
						if (viewStartOffset < 0) {
							// 表示する部分の開始位置がキャプションの先頭を超えていれば
							viewStartOffset = 0;
						}
						if (viewEndOffset >= live[name].displayData.length) {
							// 表示する部分の終了位置がキャプションの末尾を超えていれば
							// 終了位置をキャプションの末尾に
							viewEndOffset = live[name].displayData.length;
							// 開始位置を終了位置からキャプションの制限文字数分引いた位置に
							viewStartOffset = viewEndOffset - MAX_DATA_LENGTH;
						}
					}
					// 切り取り範囲の指定
					if (viewStartOffset > 0) {
						// 表示部分の開始位置が、キャプションの先頭より後なら
						range = new Range();
						range.setStart(text.firstChild, 0);
						range.setEnd(text.firstChild, viewStartOffset);
						trimRanges.push(range);
						dataElement.classList.add('ellipsis-left');
					}
					if (viewEndOffset < live[name].displayData.length) {
						// 表示部分の終了位置がキャプションの末尾より前なら
						range = new Range();
						range.setStart(text.firstChild, viewEndOffset);
						range.setEnd(text.firstChild, live[name].displayData.length);
						trimRanges.push(range);
						dataElement.classList.add('ellipsis-right');
					}
					// 切り取る
					trimRanges.forEach(function (range) {
						range.deleteContents();
					});
				} else {
					text.textContent = live[name].displayData.slice(0, MAX_DATA_LENGTH);
					dataElement.classList.add('ellipsis-right');
				}
				// セルに全文を保持
				if (/\(Windows NT 6\..+ Chrome\//.test(window.navigator.userAgent)) {
					// Windows 6.x の Blink
					cell.dataset.entireText = entireText;
				} else {
					cell.title = entireText;
				}
			}
			// 検索語句をmark要素で覆う
			ranges.forEach(function (range) {
				range.surroundContents(document.createElement('mark'));
			});

			// セルにDocumentFragmentを追加
			dataElement.appendChild(text);
		}
	}

	// 挿入位置
	insertingColumn = table.querySelector('[sorted]');
	for (i = 0, l = rows.length; i < l; i++) {
		result = compareRows(insertingColumn, rows[i], row);
		if (insertingColumn.getAttribute('sorted').contains('reversed') ? result < 0 : 0 < result) {
			tBody.insertBefore(row, rows[i]);
			break;
		}
	}

	setLivesNum();
}

/**
 * RSSの1ページから生放送一覧を取得し、検索語句がヒットした放送を表示する
 * 次のページがあれば、当関数を再帰的に実行する
 * @param {number} page
 * @param {boolean} matched
 * @param {number} errorCount
 */
function getLives(page, matched, errorCount) {
	try {
	// 検索語が一つも無かったら
	if (userData.words.length < 1) {
		return;
	}

	var req = new XMLHttpRequest();
	req.open('GET', '/recent/rss?p=' + page);

	// 読み込みに失敗した場合
	req.onerror = function () {
		try {
			checkLoadingError(true, page + 1, matched, errorCount);
		} catch(e) {
			alertException(e);
		}
	};

	// 読み込みに成功した場合
	req.onload = function () {
		try {
		var responseXML, livesNum = 0, maxPage, lives = [], isMatching, alreadyMatched, errorMessage,
				liveData, subject, element,
				tBody, i, j, l, l2;

		responseXML = req.responseXML;
		if (!responseXML || !responseXML.documentElement || responseXML.documentElement.localName === 'parsererror') {
			// 整形式でなかったら
			// 制御文字を削除し再読み込み
			responseXML = req.responseText.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');
			responseXML = new DOMParser().parseFromString(responseXML, 'application/xml');
		}

		if (responseXML && responseXML.documentElement && responseXML.documentElement.localName === 'nicolive_api') {
			// メンテナンス中なら
			errorMessage = _('メンテナンス中');
		}

		if (!errorMessage
				&& (!responseXML || !(element = responseXML.getElementsByTagNameNS('http://live.nicovideo.jp/', 'total_count')[0]) || !(livesNum = element.textContent))) {
			// XML が取得出来ない、または全体の生放送数が取得出来なかったら
			if (checkLoadingError(false, page, matched, errorCount)) {
				// エラー許容回数を超えていれば
				errorMessage = _('サーバーダウン');
			} else {
				return;
			}
		} else {
			// 生放送一覧の取得
			lives = responseXML.getElementsByTagName('item');
		}



		// 取得するページ数
		maxPage = Math.ceil(livesNum / MAX_LIVES_PER_PAGE);
		
		tBody = document.querySelector('#' + ID + ' tbody');
		
		for (i = 0, l = lives.length; i < l; i++) {
			// 番組の情報を取得
			liveData = {};
			columns.forEach(function getLiveData(column, index, columns, parentName, propertyName) {
				var element, data, normalizedData, displayData;

				// 要素を取得
				element = lives[i].getElementsByTagNameNS(column.prefix ? lives[i].lookupNamespaceURI(column.prefix) : '*', column.name)[0];

				// 要素内の情報を取得
				data = element ? (column.attribute ? element.getAttribute(column.attribute) : element.textContent || null) : null;

				if (parentName) {
					liveData[parentName][propertyName] = 'normalize' in column ? column.normalize(data) : data;
				} else {
					if (data !== null) {
						if ('beforeFilter' in column) {
							data = column.beforeFilter(data);
						}
						// 正規化
						normalizedData = 'normalize' in column ? column.normalize(data) : normalizeString(data).toLowerCase().replace(/\s+/g, '');
						// 表示する形式に
						displayData = 'displayFormat' in column ? column.displayFormat(data) : data;
					} else {
						// 取得に失敗したら
						normalizedData = column.type === 'number' ? -1 : '';
						displayData = _('（取得不可）');
					}

					liveData[column.name] = {
						data: data,
						normalizedData: normalizedData,
						displayData: displayData,
					};

					// 追加情報
					['link', 'alt'].forEach(function (propertyName) {
						if (column[propertyName]) {
							getLiveData(column[propertyName], index, columns, column.name, propertyName);
						}
					});
				}
			});

			// 世界の新着動画・ニコ生クルーズを除外。NG コミュニティの番組を除外。コミュ限放送を除外
			if (!liveData.community_name.link
					|| userData.NGCommunityURIs.concat(NGCommunityURIsFromURI).indexOf(liveData.community_name.link) !== -1
					|| liveData.member_only.normalizedData && GM_getValue('exclusionMemberOnly')) {
				continue;
			}

			// 検索対象を生成
			subject = (liveData.title.data || '') + ' ' + (liveData.description.data || '') + ' ' + (liveData.community_name.data || '');

			// 文字種の統一
			subject = normalizeString(subject);

			// OR 検索
			isMatching = userData.normalizedWords.some(function (search) {
				// 検索語句を記録
				liveData.searchWords = search;
				// AND 検索
				return !search.minus.some(function (word) {
					return subject.contains(word);
				}) && search.plus.every(function (word) {
					return subject.contains(word);
				});
			});
			if (!isMatching) {
				continue;
			}

			// すでに表に追加されていたら
			for (j = 0, l2 = tBody.rows.length; j < l2; j++) {
				if (getCommunityURI(tBody.rows[j]) === liveData.community_name.link) {
					tBody.deleteRow(j);
					alreadyMatched = true;
					break;
				}
			}

			// 新しい番組だったら
			if (!alreadyMatched) {
				matched = true;
				setIcon(favicon.find);
			}

			// 表に追加
			pushMatchLive(liveData);
		}

		if (page < maxPage) {
			// 次のページが存在すれば、次のページを取得
			getLives(page + 1, matched, 0);
		} else {
			// 最後のページだったら、一定時間後に1ページ目から取得
			waitGettingLives(errorMessage, matched);
		}
		} catch(e) {
			alertException(e);
		}
	};
	req.send();
	} catch(e) {
		alertException(e);
	}
}

/**
 * 指定した行の生放送のコミュニティURIを取得する
 * @param {HTMLTableRowElement} row
 * @returns {string}
 */
function getCommunityURI(row) {
	return row.querySelector('td.community_name a').href;
}

/**
 * 更新日時を表示し、{@link SEARCH_INTERVAL}ミリ秒後に{@link getLives}を実行
 * @param {string} errorMessage
 * @param {boolean} matched - trueならアラートを鳴らす
 */
function waitGettingLives(errorMessage, matched) {
	var tBody, rows;

	// 更新日時の設定
	showUpdateTime(errorMessage);

	// アラート音
	if (matched && !alertSound.hidden && !alertSound.muted && alertSound.volume > 0) {
		alertSound.play();
	}

	// 古い番組を削除
	tBody = document.querySelector('#' + ID + ' tbody');
	rows = tBody.getElementsByClassName('old');
	while (rows[0]) {
		tBody.deleteRow(rows[0].sectionRowIndex);
	}
	if (!errorMessage && tBody.rows.length === 0) {
		setIcon(favicon.notFound);
	}

	// ページタイトルの変更
	setLivesNum();

	// 古い番組に目印を付ける
	Array.prototype.forEach.call(tBody.rows, function (row) {
		row.classList.add('old');
	});

	// 一定時間後に更新
	window.setTimeout(getLives, SEARCH_INTERVAL, 1, false, 0);
}

/**
 * 読み込みエラー発生時、エラー発生回数が{@link MAX_ERROR_COUNT}を超えていれば true を返し、さもなくば{@link getLives}を実行する
 * @param {boolean} regetting - trueなら、読み込み停止後{@waitGettingLives}を実行する
 * @param {number} page
 * @param {boolean} matched
 * @param {number} errorCount
 * @returns {boolean}
 */
function checkLoadingError(regetting, page, matched, errorCount) {
	// エラー発生回数をカウントアップ
	errorCount++;

	if (errorCount > MAX_ERROR_COUNT) {
		// エラー許容回数を超えたら
		if (regetting) {
			waitGettingLives(_('オフライン'));
		}
		return true;
	} else {
		// 超えていなければ、再読み込み
		getLives(page, matched, errorCount);
		return false;
	}
}

/**
 * 例外を通知し、ページを再読み込みする
 * @param {Error} e
 */
function alertException(e) {
	var message = _('RSSの取得に失敗しました。ページを更新してみてください。\n\nエラーメッセージ：\n%s\n%d 行目').replace('%s', e).replace('%d', e.lineNumber);
	if (window.confirm(message + '\n\n' + _('更新しますか？'))) {
		window.location.reload();
	} else {
		document.querySelector('#' + ID + ' tfoot td').textContent = message;
	}
}

/**
 * {@link mainBoxStyle}を変更し、フッターとページ下端の隙間を詰める
 */
function trueUpFooterBottom() {
	var style = window.getComputedStyle(document.getElementById(ID), '');
	var outsideHeight = document.getElementById('body_header').clientHeight + document.getElementById('siteHeader').clientHeight
			+ parseInt(style.marginTop) + parseInt(style.marginBottom) + document.getElementById('utility_link').clientHeight + document.getElementById('page_footer').clientHeight + document.getElementById('body_footer').clientHeight;

	setMinHeight();
	window.addEventListener('resize', setMinHeight);
	function setMinHeight() {
		mainBoxStyle.minHeight = window.innerHeight - outsideHeight + 'px';
	}
}

/**
 * {@link columns}を並べ替える
 * @param {string[]} columnsPosition - {@link columns}のnameプロパティ値の配列
 */
function updateColumns(columnsPosition) {
	columnsPosition.forEach(function (name) {
		for (var i = 0, l = columns.length; i < l; i++) {
			if (columns[i].name === name) {
				columns.push(columns.splice(i, 1)[0]);
				break;
			}
		}
	});
}

/**
 * 生放送一覧の更新日時を現在時刻に更新する
 * @param {string} [errorMessage] - 更新日時の代わりに表示するエラーメッセージ
 * @param {HTMLTableCellElement} [cell] - 更新日時を表示する要素
 */
function showUpdateTime(errorMessage, cell) {
	(cell || document.querySelector('#' + ID + ' tfoot td')).textContent = errorMessage
			? _('%s 更新【%s】').replace('%s', new Date().toLocaleString()).replace('%s', errorMessage)
			: _('%s 更新').replace('%s', new Date().toLocaleString());
	if (errorMessage) {
		setIcon(favicon.error);
	}
}

/**
 * 削除対象の放送か否かを返すコールバック関数
 * @callback isRemovedLive
 * @param {HTMLTableRowElement} row
 * @returns {boolean}
 */

/**
 * すでに表示している番組を非表示にし、{@link setLivesNum}を実行する
 * @param {isRemovedLive} removed
 */
function removeLive(removed) {
	var tBody = document.querySelector('#' + ID + ' tbody'), rows = tBody.rows, row, i;
	for (i = 0; i < rows.length; i++) {
		row = rows[i];
		if (removed(row)) {
			if (row.parentNode) {
				tBody.deleteRow(row.sectionRowIndex);
				setLivesNum();
				i--;
			}
		}
	}
}

/**
 * ヒットした放送数を更新する
 */
function setLivesNum() {
	var tBody = document.querySelector('#' + ID + ' tbody'), livesNum;
	
	// 放送数の取得
	livesNum = tBody.rows.length;

	// ページタイトルの修正
	document.title = (livesNum > 0 ? '(' + livesNum + ')' : '') + NAME;

	// 行の色分けの調整
	tBody.classList[livesNum % 2 === 0 ? 'remove' : 'add']('odd');
}

/**
 * Faviconを変更する
 * @param {string} data - FaviconのData URI
 */
function setIcon(data) {
	var icon = document.querySelector('[rel="icon"]');
	if (!icon) {
		return;
	}

	if (typeof data !== 'string') {
		if (icon.href === favicon.error) {
			return;
		}
		data = favicon.notFound;
	}
	icon.href = data;
	document.head.appendChild(icon);
}

/**
 * 文字列からコミュニティIDを抽出する
 * @param {string} value - テキストエリアの一行分
 * @returns {?string}
 */
function getCommunityID(value) {
	value = normalizeString(value);
	var result = /(?:co|ch)[1-9][0-9]*/.exec(value);
	return result ? result[0] : null;
}

/**
 * 現在時刻から指定した時刻を引いた差を返す
 * @param {string} value - Dateコンストラクタが理解できる形式の日時
 * @returns {string} 「○時間○分」のような形式
 */
function getElapseTime(value) {
	var sign, minutes, hours;
	minutes = Math.round((Date.now() - new Date(value)) / (60 * 1000));
	sign = minutes >= 0 ? 1 : -1;
	minutes = Math.abs(minutes);
	hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	return hours ? _('%d 時間 %u 分').replace('%d', sign * hours).replace('%u', minutes) : _('%d 分').replace('%d', sign * minutes);
}

/**
 * 検索語句を正規化する
 * @param {string} word - テキストエリアの一行分
 * @returns {string}
 */
function normalizeWord(word) {
	// 文字種の統一
	word = normalizeString(word);

	if (word.contains(' ')) {
		// 空白が含まれていたら
		// 分割
		word = word.split(' ')
				// 整列
				.sort()
				// 重複の削除
				.filter(function (value, i) {
					return word[i] !== word[i + 1];
				})
				// 連結
				.join(' ');
	}

	return word;
}

/**
 * 文字列を正規化する
 * @param {string} str
 * @returns {string}
 */
function normalizeString(str) {
	/**
	 * 全角文字を半角に変換するときの加数
	 * @type {number}
	 */
	var ADDEND_FULL_TO_HALF_WIDTH = '!'.charCodeAt() - '！'.charCodeAt();
	
	/**
	 * ひらがなをカタカナに変換するときの加数
	 * @type {number}
	 */
	var ADDEND_HIRAGANA_TO_KATAKANA = 'ァ'.charCodeAt() - 'ぁ'.charCodeAt();

	// 半角カナを全角にし、連続する空白を削除
	return convertHalfKanaToFull(str).replace(/\s+/g, ' ')
			// 全角英数字を半角に
			.replace(/[！-～]/g, function (match) {
				return String.fromCharCode(match.charCodeAt() + ADDEND_FULL_TO_HALF_WIDTH);
			})
			// ひらがなをカタカナに
			.replace(/[ぁ-ゖ]/g, function (match) {
				return String.fromCharCode(match.charCodeAt() + ADDEND_HIRAGANA_TO_KATAKANA);
			});
}

/**
 * 半角カタカナを全角カタカナに変換する
 * @param {string} str
 * @returns {string}
 * @see 半角カタカナと全角カタカナの対応表は{@link http://www5e.biglobe.ne.jp/~access_r/hp/javascript/js_111.html 半角カタカナを全角カタカナに変える方法}を元に作成
 */
function convertHalfKanaToFull(str) {
	if (/[ｦ-ﾝ]/.test(str)) {
		// 半角カナが含まれていれば、全角に変換
		[
			[/ｶﾞ/g, "ガ"], [/ｷﾞ/g, "ギ"], [/ｸﾞ/g, "グ"], [/ｹﾞ/g, "ゲ"], [/ｺﾞ/g, "ゴ"],
			[/ｻﾞ/g, "ザ"], [/ｼﾞ/g, "ジ"], [/ｽﾞ/g, "ズ"], [/ｾﾞ/g, "ゼ"], [/ｿﾞ/g, "ゾ"],
			[/ﾀﾞ/g, "ダ"], [/ﾁﾞ/g, "ヂ"], [/ﾂﾞ/g, "ヅ"], [/ﾃﾞ/g, "デ"], [/ﾄﾞ/g, "ド"],
			[/ﾊﾞ/g, "バ"], [/ﾋﾞ/g, "ビ"], [/ﾌﾞ/g, "ブ"], [/ﾍﾞ/g, "ベ"], [/ﾎﾞ/g, "ボ"],
			[/ﾊﾟ/g, "パ"], [/ﾋﾟ/g, "ピ"], [/ﾌﾟ/g, "プ"], [/ﾍﾟ/g, "ペ"], [/ﾎﾟ/g, "ポ"],
			[/ｦ/g, "ヲ"], [/ｧ/g, "ァ"], [/ｨ/g, "ィ"], [/ｩ/g, "ゥ"], [/ｪ/g, "ェ"],
			[/ｫ/g, "ォ"], [/ｬ/g, "ャ"], [/ｭ/g, "ュ"], [/ｮ/g, "ョ"], [/ｯ/g, "ッ"],
			[/ｰ/g, "ー"],
			[/ｱ/g, "ア"], [/ｲ/g, "イ"], [/ｳ/g, "ウ"], [/ｴ/g, "エ"], [/ｵ/g, "オ"],
			[/ｶ/g, "カ"], [/ｷ/g, "キ"], [/ｸ/g, "ク"], [/ｹ/g, "ケ"], [/ｺ/g, "コ"],
			[/ｻ/g, "サ"], [/ｼ/g, "シ"], [/ｽ/g, "ス"], [/ｾ/g, "セ"], [/ｿ/g, "ソ"],
			[/ﾀ/g, "タ"], [/ﾁ/g, "チ"], [/ﾂ/g, "ツ"], [/ﾃ/g, "テ"], [/ﾄ/g, "ト"],
			[/ﾅ/g, "ナ"], [/ﾆ/g, "ニ"], [/ﾇ/g, "ヌ"], [/ﾈ/g, "ネ"], [/ﾉ/g, "ノ"],
			[/ﾊ/g, "ハ"], [/ﾋ/g, "ヒ"], [/ﾌ/g, "フ"], [/ﾍ/g, "ヘ"], [/ﾎ/g, "ホ"],
			[/ﾏ/g, "マ"], [/ﾐ/g, "ミ"], [/ﾑ/g, "ム"], [/ﾒ/g, "メ"], [/ﾓ/g, "モ"],
			[/ﾔ/g, "ヤ"], [/ﾕ/g, "ユ"], [/ﾖ/g, "ヨ"], [/ﾗ/g, "ラ"], [/ﾘ/g, "リ"],
			[/ﾙ/g, "ル"], [/ﾚ/g, "レ"], [/ﾛ/g, "ロ"], [/ﾜ/g, "ワ"], [/ﾝ/g, "ン"],
		].forEach(function (search) {
			str = str.replace(search[0], search[1]);
		});
	}
	return str;
}


/**
 * {@link GM_exportValues}及び{@link GM_importValues}の引数に用いるプロパティ定義一覧。
 * キーにはプロパティ名を指定する。
 * 値について、
 *     文字列 (string, integer, boolean, double, fraction, large, object) -> データ型（fractionは0以上1以下の浮動小数点数, largeは1MiBを超えるかもしれない文字列）
 *     文字列 (string[], integer[], boolean[], double[]) -> すべての要素が指定したデータ型の配列
 *     文字列の配列 -> 列挙型
 *     {@link GM_ValuesDefineder}、又は{@link GM_ValuesDefineder}を含む要素数1の配列を指定すると、再帰的に検証される。
 * @typedef {Object} GM_ValuesDefineder
 * @property {string[]} [_requireValues] - 必須プロパティ名の一覧
 */

/**
 * {@link GM_setValue}と{@link GM_setObject}によって設定された値をエクスポートする。値の検証は行わない
 * @param {GM_ValuesDefineder} valuesDefineder
 * @param {string} settingsFileName - 出力する設定ファイル名（拡張子を除く）
 */
function GM_exportValues(valuesDefineder, settingsFileName) {
	var name, value, values = {}, a = document.createElement('a'), uri;
	for (name in valuesDefineder) {
		switch (typeof valuesDefineder[name] !== 'string' || valuesDefineder[name].endsWith('[]') ? 'object' : valuesDefineder[name]) {
			case 'string':
			case 'integer':
			case 'boolean':
				value = GM_getValue(name);
				break;
			case 'double':
				value = GM_getValue(name);
				if (value !== undefined) {
					value = Number(value);
				}
				break;
			case 'large':
				value = GM_getLargeValue(name);
				break;
			case 'object':
				value = GM_getObject(name);
				break;
			default:
				value = undefined;
		}
		if (value !== undefined) {
			values[name] = value;
		}
	}
	
	uri = window.URL.createObjectURL(
				new Blob([JSON.stringify(values, null, '\t')],
				{ type: 'download' in a ? 'application/json; charset=UTF-8' : /* Firefox 17 ESR */'application/octet-stream' }));
	a.href = uri;
	a.download = settingsFileName + '.json';
	a.hidden = true;
	document.body.appendChild(a);
	a.click();
	a.parentNode.removeChild(a);
	a = null;
	window.setTimeout(function () {
		window.URL.revokeObjectURL(uri);
	}, MAX_LIFETIME);
}

/**
 * {@link GM_exportValues}によってエクスポートされたデータをインポートする
 * @param {GM_ValuesDefineder} valuesDefineder
 * @param {Function} succeedCallback - 成功時のコールバック関数。第1引数にインポートしたオブジェクト、第2引数にQuotaExceededErrorが起きたプロパティの配列
 * @param {Function} errorCallback - 失敗時のコールバック関数。第1引数にエラーメッセージ
 */
function GM_importValues(valuesDefineder, succeedCallback, errorCallback) {
	var input = document.createElement('input'), reader = new FileReader(), errorProperties = [];
	reader.addEventListener('load', function (event) {
		var values, parsedValues, name;
		try {
			parsedValues = JSON.parse(event.target.result);
			values = getValidatedValues(parsedValues, valuesDefineder);
		} catch (e) {
			errorCallback(e);
			return;
		}
		
		try {
			for (name in values) {
				switch (typeof valuesDefineder[name] !== 'string' || valuesDefineder[name].endsWith('[]') ? 'object' : valuesDefineder[name]) {
					case 'string':
					case 'integer':
					case 'boolean':
						GM_setValue(name, values[name]);
						break;
					case 'large':
						GM_setLargeValue(name, values[name]);
						break;
					case 'double':
						GM_setValue(name, values[name].toString());
						break;
					case 'object':
						GM_setObject(name, values[name]);
						break;
				}
			}
		} catch(e) {
			if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
				// ローカルストレージの容量制限を超過したら
				errorProperties.push(name);
			} else {
				throw e;
			}
		}
		succeedCallback(values, errorProperties);
	});
	
	input.type = 'file';
	input.accept = 'application/json';
	input.hidden = true;
	document.body.appendChild(input);
	input.addEventListener('change', function parseSettingsFile(event) {
		event.target.removeEventListener(event.type, parseSettingsFile);
		var file = event.target.files[0];
		if (file) {
			reader.readAsText(file, 'UTF-8');
		}
		input.parentNode.removeChild(input);
		input = null;
	});
	input.click();
	
	window.setTimeout(MAX_LIFETIME, function () {
		if (input) {
			input.parentNode.removeChild(input);
			input = null;
		}
	});
}

/**
 * 指定したデータ型になっているか否か再帰的に検証し、取得する
 * @param {Object} parsedValues
 * @param {GM_ValuesDefineder} valuesDefineder
 * @returns {Object}
 * @throws {ReferenceError} 必須プロパティが存在しなかったとき
 * @throws {TypeError} 指定したデータ型でなかったとき
 * @throws {RangeError} 列挙型、又は純小数で、指定した値でなかったとき
 */
function getValidatedValues(parsedValues, valuesDefineder) {
	var values = {}, name, type;
	for (name in valuesDefineder) {
		if (!(name in parsedValues) || parsedValues[name] === null) {
			// JSONファイルにキーが存在しなければ
			if (Array.isArray(valuesDefineder._requireValues) && valuesDefineder._requireValues.indexOf(name) !== -1) {
				// 必須プロパティなら
				throw new ReferenceError(name + ' is not defined.');
			} else {
				continue;
			}
		}
		values[name] = parsedValues[name];

		if (typeof valuesDefineder[name] === 'string') {
			// 型名をtypeof演算子の戻り値に変換
			switch (valuesDefineder[name]) {
				case 'large':
					type = 'string';
					break;
				case 'integer':
				case 'double':
				case 'fraction':
					type = 'number';
					break;
				case 'integer[]':
				case 'double[]':
					type = 'number[]';
					break;
				default:
					type = valuesDefineder[name];
			}
			if (type.endsWith('[]')) {
				// 基本型の配列が指定されていれば
				type = type.replace('[]', '');
				if (values[name].some(function (value) { return typeof value !== type; })) {
					// 指定した型でない要素が一つでもあれば
					throw new TypeError(name + ' has invalid value.');
				}
			} else {
				// 基本型が指定されていれば
				if (typeof values[name] !== type) {
					// 指定した型でなければ
					throw new TypeError(name + ' has invalid value.');
				} else if (valuesDefineder[name] === 'fraction' && (values[name] < 0 || values[name] > 1)) {
					// 純小数が指定されていて、0未満、又は1より大きければ
					throw new RangeError(name + ' has invalid value.');
				}
			}
		} else if (Array.isArray(valuesDefineder[name])) {
			if (typeof valuesDefineder[name][0] === 'string') {
				// 列挙型が指定されていれば
				if (valuesDefineder[name].indexOf(values[name]) === -1) {
					// 指定した配列のどの文字列とも一致しなければ
					throw new RangeError(name + ' has invalid value.');
				}
			} else {
				// オブジェクトの配列が指定されていれば
				// 各オブジェクトに対して再帰呼び出しを行う
				values[name].forEach(function (objects) { getValidatedValues(objects, valuesDefineder[name][0]); });
			}
		} else {
			// オブジェクトなら
			// 再帰呼び出しを行う
			getValidatedValues(values[name], valuesDefineder[name]);
		}
	}
	return values;
}

/**
 * Firefox 23 からの仕様変更により、{@link GM_setValue}で1MiB以上のデータを保存できなくなったため、容量制限を超過したデータはローカルストレージに保存する
 * @param {string} name
 * @param {string|number|boolean} value
 * @returns {string}
 * @see {@link https://github.com/Constellation/ldrfullfeed/issues/1 GM_setValue size exception(1 * 1024 * 1024) · Issue #1 · Constellation/ldrfullfeed · GitHub}
 */
function GM_setLargeValue(name, value) {
	var error;
	try {
		GM_setValue(name, value);
		// UserScriptLoader.uc.jsではエラーが抑制されているため、値が正しく設定されたか否か調べる
		if (GM_getValue(name) !== value) {
			error = new Error('Component returned failure code: 0x8007000e (NS_ERROR_OUT_OF_MEMORY) [nsIPrefBranch.setComplexValue]');
			error.name = 'NS_ERROR_OUT_OF_MEMORY';
			throw error;
		}
		if (GM_setValue !== setValueToLocalStorage) {
			deleteValueFromLocalStorage(name);
		}
		return value;
	} catch(e) {
		if (e.name === 'NS_ERROR_OUT_OF_MEMORY') {
			setValueToLocalStorage(name, value);
			GM_deleteValue(name);
			return value;
		} else {
			throw e;
		}
	}
}

/**
 * {@link GM_setLargeValue}で保存したデータを取得する
 * @param {type} name
 * @param {*} defaultValue
 * @returns {*}
 */
function GM_getLargeValue(name, defaultValue) {
	var value;
	if ((value = GM_getValue(name)) !== undefined) {
		return value;
	} else if ((value = getValueFromLocalStorage(name)) !== undefined) {
		return value;
	} else {
		return defaultValue;
	}
}

/**
 * {@link GM_setLargeValue}で保存したデータを削除する
 * @param {type} name
 */
function GM_deleteLargeValue(name) {
	GM_deleteValue(name);
	deleteValueFromLocalStorage(name);
}

/**
 * オブジェクトを保存できるようにした{@link GM_setValue}のラッパー
 * @param {string} name
 * @param {Object} value
 * @returns {Object}
 */
function GM_setObject(name, value) {
	GM_setValue(name, JSON.stringify(value));
	return value;
}

/**
 * {@link GM_setObject}と対になる{@link GM_getValue}のラッパー
 * @param {string} name
 * @param {Object} defaultValue
 * @return {Object}
 */
function GM_getObject(name, defaultValue) {
	var value = GM_getValue(name);
	return value === undefined ? defaultValue : JSON.parse(value);
}

/**
 * ローカルストレージを利用する{@link GM_setValue}ライク関数
 * @param {string} name - The unique (within this script) name for this value. Should be restricted to valid Javascript identifier characters. 
 * @param {string|number|boolean} value - Any valid value of these types. Any other type may cause undefined behavior, including crashes. 
 * @returns {*} The unmodified value passed to {@link setValueToLocalStorage}.
 * @see {@link http://wiki.greasespot.net/GM_setValue GM_setValue - GreaseSpot Wiki}
 * @see {@link https://github.com/scriptish/scriptish/wiki/GM_setValue GM_setValue · scriptish/scriptish Wiki · GitHub}
 */
function setValueToLocalStorage(name, value) {
	var item = getValuesFromLocalStorage();
	item[name] = value;
	window.localStorage.setItem(ID, JSON.stringify(item));
};

/**
 * ローカルストレージを利用する{@link GM_getValue}ライク関数
 * @param {string} name - The property name to get. See {@link setValueToLocalStorage} for details.
 * @param {*} [defaultValue] - Any value to be returned, when no value has previously been set.
 * @returns {*}
 * @see {@link http://wiki.greasespot.net/GM_getValue GM_getValue - GreaseSpot Wiki}
 */
function getValueFromLocalStorage(name, defaultValue) {
	var item = getValuesFromLocalStorage();
	return item[name] === undefined ? defaultValue : item[name];
}

/**
 * ローカルストレージを利用する{@link GM_deleteValue}ライク関数
 * @param {type} name - Property name to delete. See {@link setValueToLocalStorage} for details on what names are valid. 
 * @see {@link http://wiki.greasespot.net/GM_deleteValue GM_deleteValue - GreaseSpot Wiki}
 */
function deleteValueFromLocalStorage(name) {
	var item = getValuesFromLocalStorage();
	delete item[name];
	window.localStorage.setItem(ID, JSON.stringify(item));
};

/**
 * {@link setValueToLocalStorage} {@link getValueFromLocalStorage} {@link deleteValueFromLocalStorage}から利用される、すべての設定値を取得する関数
 * @returns {DOMString|Array|Object}
 */
function getValuesFromLocalStorage() {
	var item = window.localStorage.getItem(ID);
	if (item) {
		try {
			item = JSON.parse(item);
		} catch (e) {
			item = {};
		}
	} else {
		item = {};
	}
	return item;
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
 * 国際化・地域化関数の読み込み、ECMAScriptとWHATWG仕様のPolyfill、GM関数の実装、prototype汚染回避
 */
function polyfill() {

// i18n
(function () {
	/**
	 * 翻訳対象文字列 (msgid) の言語
	 * @const string
	 */
	var ORIGINAL_LOCALE = 'ja';
	
	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか
	 * @const string
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
	 * @type string
	 * @access private
	 */
	var langtag = 'ja';
	
	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される
	 * @type string
	 * @access private
	 */
	var language = 'ja';
	
	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される
	 * @type LocalizedTexts
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

// Polyfill for Firefox and Blink
try {
	new DragEvent('drag');
} catch (e) {
	/**
	 * @constructor
	 * @param {string} type
	 * @param {DragEventInit} [eventInitDict]
	 * @see {@link http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#dragevent 8.7.4 The DragEvent interface}
	 * @name DragEvent
	 */
	Object.defineProperty(window, 'DragEvent', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: MouseEvent,
	});
}

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

if (!String.prototype.hasOwnProperty('endsWith')) {
	/**
	 * Determines whether a string ends with the characters of another string, returning true or false as appropriate.
	 * @param {string} searchString - The characters to be searched for at the end of this string.
	 * @param {number} [endPosition] - Search within this string as if this string were only this long; defaults to this string's actual length, clamped within the range established by this string's length.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.endswith 21.1.3.7 String.prototype.endsWith (searchString [, endPosition] )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith String.endsWith - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.endsWith
	 */
	Object.defineProperty(String.prototype, 'endsWith', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			var searchStr = String(searchString),
					endPosition = arguments[1],
					len = this.length,
					end = endPosition === undefined ? len : Math.min(Math.max(Math.floor(endPosition) || 0, 0), len);
			return this.substring(end - searchStr.length, end) === searchStr;
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

// Polyfill for Firefox 17 ESR
try {
	new DocumentFragment();
} catch (e) {
	/**
	 * Returns a new DocumentFragment node.
	 * @constructor
	 * @returns {DocumentFragment}
	 * @see {@link http://dom.spec.whatwg.org/#interface-documentfragment 6.6 Interface DocumentFragment}
	 */
	DocumentFragment = function () {
		return document.createDocumentFragment();
	};
}

try {
	new Text();
} catch (e) {
	/**
	 * Returns a new Text node whose data is data.
	 * @constructor
	 * @param {string} [data=""]
	 * @returns {Text}
	 * @see {@link http://dom.spec.whatwg.org/#interface-text 6.10 Interface Text}
	 */
	Text = function () {
		return document.createTextNode(arguments.length === 0 ? '' : arguments[0]);
	};
}

try {
	new Range();
} catch (e) {
	/**
	 * Returns a new range.
	 * @constructor
	 * @returns {Range}
	 * @see {@link http://dom.spec.whatwg.org/#interface-range 7.2 Interface Range}
	 */
	Range = function () {
		return document.createRange();
	};
}

// Implement GM_getValue, GM_setValue and GM_deleteValue for Google Chrome
if ('function' !== typeof GM_deleteValue || GM_deleteValue.toString().contains('not supported')) {
	window.GM_setValue = setValueToLocalStorage;
	window.GM_getValue = getValueFromLocalStorage;
	window.GM_deleteValue = deleteValueFromLocalStorage;
}

// prototype.js読み込み前に実行する必要があるprototype汚染回避
Object.defineProperty(Array.prototype, 'map', { writable: false });
}

/**
 * prototype汚染が行われる Prototype JavaScript Framework (prototype.js) 1.5/1.6 のバグを修正（Tampermonkey用）
 */
function fixPrototypeJavaScriptFramework() {
	[
		// 1.5
		[document, 'getElementsByClassName'],
		// 1.6
		[Array.prototype, 'toJSON'],
		[String.prototype, 'toJSON'],
	].forEach(function (objectProperty) {
		delete objectProperty[0][objectProperty[1]];
	});
}

})();
