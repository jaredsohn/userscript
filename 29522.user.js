// FriendFeed Language Filter
//
// Copyright 2008 Yu-Jie Lin
//
// Version       : 0.2.2
// License       : GPLv3
// Website       : http://thetinybit.com/Project/FriendFeedLanguageFilter
//
// Author        : Yu-Jie Lin
// Author Website: http://thetinybit.com/
// Creation Date : 2008-07-03T10:23:06+0800
// Last Modified : 2008-07-09T19:30:10+0800
//
// Release Notes:
// = 0.2.2 (2008-07-09) =
//  Remove .show-lang-hidden when no .show-lang-hidden
//  Replace .show-lang-hidden-top
//  Replace .show-lang-hidden with new button icon
//
// = 0.2.1 (2008-07-06) =
//  Remove modal attribute, can not work normally on FriendFeed
//  Reset position of "Show all hidden items"
//  Fix check_cluster, used wrong express '.entries' -> '.entry'
//  Add support to unsigned-in users
//
// = 0.2.0.1 (2008-07-05) =
//  Fix "Show all hidden items" not shown on search page
//
// = 0.2 (2008-07-05) =
//  Add Japanese Katakana
//  Add Detecting Context - Entry, Comment
//  Add Action - Move, Hide
//
// = 0.1 (2008-07-03) =
//  Initial Release
//
// ==UserScript==
// @name           FriendFeed Language Filter
// @namespace      http://thetinybit.com/
// @description    FriendFeed Language Filter
// @include        http://friendfeed.com/*
// @resource       show_lang_hidden http://livibetter.googlepages.com/show_lang_hidden.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://livibetter.googlepages.com/jquery-ui-personalized-1.5.1.min.js
// ==/UserScript==

var DEBUG = true;

// ============================
var detect_entry = false;
var detect_comment = false;
var action = 'move';
var lang_re;
var languages = {
	// http://en.wikipedia.org/wiki/Arabic_alphabet
	'arabic': ['Arabic - العربية',
		[/[ﺍﺏﺕﺙﺝﺡﺥﺩﺫﺭﺯسﺵﺹﺽﻁﻅﻉﻍﻑﻕﻙﻝﻡﻥهﻭﻱ]/
		]],
	// http://en.wikipedia.org/wiki/Written_Cantonese
	'cantonese': ['Cantonese - 粵語',
		[/[叻吓吔呃咁咗咩哂哋唔唥唧啱啲喐喥喺嗰嘅嘜嘞嘢嘥嚟嚡嚿囖]/,
		 /[乜冇仔佢佬係俾靚]/,
		]],
	// http://www.edu.tw/files/site_content/M0001/86news/86rest1.html?open
	// http://www.edu.tw/files/site_content/M0001/86news/86rest2.html?open
	// 的一是有在人不大中為以國會上了我年時來這他出個可到生公也要成之十
	// 的在有是了這為到個我上以也之他人與中及而和就後來最會於說要等大年都時對將
	'chinese': ['Chinese - 中文',
		[/[為國會時來這個]/,
		 /[與後於說對將]/,
		 /[軟體離圖點總顯駕警車辦樓電腦機]/
		]],
	// 的一是有在人不大中为以国会上了我年时来这他出个可到生公也要成之十
	// 的在有是了这为到个我上以也之他人与中及而和就后来最会于说要等大年都时对将
	'chinese_simplified': ['Chinese (Simplified) - 简体中文',
		[/[为国会时来这个]/,
		 /[与后于说对将]/,
		 /[软体离图点总显驾农车办楼电脑机]/
		]],
	// http://en.wikipedia.org/wiki/Greek_alphabet
	'greek': ['Greek - Ελληνικά',
		[/[ΑαΝνΒβΞξΓγΟοΔδΠπΕεΡρΖζΣσςΗηΤτΘθΥυΙιΦφΚκΧχΛλΨψΜμΩω]/
		]],
	// http://en.wikipedia.org/wiki/Hebrew_alphabet 
	'hebrew': ['Hebrew - עִבְרִית',
		[/[בגדהוזחטיכךלמנסעפצקרשתםןףץ]/
		]],
	// http://en.wikipedia.org/wiki/Hiragana
	// http://en.wikipedia.org/wiki/Katakana
	'japanese': ['Japanese - 日本語',
		[/[ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ]/,
		 /[ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾ]/
		]],
	// http://en.wikipedia.org/wiki/Korean_language
	'korean': ['Korean - 한국어',
		[/[ㅂㄷㅈㄱㅃㄸㅉㄲㅍㅌㅊㅋㅅㅎㅆㅁㄴㅇㄹ]/,
		 /[ㅣㅔㅚㅐㅏㅗㅜㅓㅡㅢㅖㅒㅑㅛㅠㅕㅟㅞㅙㅘㅝ]/
		]],
	// http://en.wikipedia.org/wiki/Romanian_alphabet
	'romanian': ['Romanian - Română',
		[/[ĂăÂâÎîŞşŢţ]/
		]],
	// http://en.wikipedia.org/wiki/Russian_alphabet
	'russian': ['Russian - Русский язык',
		[/[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя]/
		]]
	};

// =====================================
// Functions
// =====================================

function log(text) {
	if (debug)
		GM_log(text);
	}

function is_valid_language(text) {
	for (var i = 0; i < lang_re.length; i++) {
		if (lang_re[i].test(text))
			return false;
		}
	return true;
	}

function build_re() {
	lang_re = new Array();
	for (lang in languages)
		if (GM_getValue('lang_' + lang, false)) {
			l_re = languages[lang][1];
			for (var i = 0; i < l_re.length; i++)
				lang_re.push(l_re[i]);
			}
	}

function create_show_top() {
	if ($('.show-lang-hidden-top').length >= 1)
		return
	// Need to create
	$('body').append(
		$('<div class="show-lang-hidden-top">Show all hidden items</div>')
			.click(function() {
				$('.lang-hidden').show();
				$('.show-lang-hidden').remove();
				$(this).remove();
				})
		);
	}

function check_remove_show_top() {
	if (!$('.show-lang-hidden').length)
		$('.show-lang-hidden-top').remove()
	}

function create_show_bottom() {
	if ($('.show-lang-hidden-bottom').length >= 1)
		return
	// Need to create
	$('#feed')
		.append('<hr style="color: #4477cc"/>')
		.append(
			$('<span class="show-lang-hidden-bottom">Show hidden items</span>')
				.click(function() {
					$('.lang-hidden').show();
					$(this).remove();
					})
			);
	}

function get_entry_text(entry) {
	return entry.find('.link').text();
	}

function get_comment_text(comment) {
	return comment.clone()
		// remove last <a>, which is the link to commenter
		.find('a:last')
			.remove()
			.end()
		.text();
	}

function move_entry(entry) {
	create_show_bottom();

	// Need to duplicate .cluster
	entry.parents('.cluster').clone()
		.find('.entries')
			.empty()
			.append(entry)
			.end()
		.attr('fflf', 'checked')
		.addClass('lang-hidden')
		.hide()
		.appendTo($('#feed'));
	}

function hide_entry(entry) {
	create_show_top();
	log('Hide Entry');
	entry.addClass('lang-hidden')
		 .css('background-color', '#f6f9fd')
	     .hide();
	cluster = entry.parents('.cluster');
	if (!cluster.hasClass('has-lang-hidden'))
		cluster
			.find('.summary')
				.append(' ')
				.append($('<img class="show-lang-hidden" alt="Show hidden items" title="Show hidden items" src="' + GM_getResourceURL('show_lang_hidden') + '"/>').click(function() {
					$(this)
						.parents('.cluster')
							.find('.lang-hidden')
								.show()
								.end()
							.end()
						.remove();
					check_remove_show_top();
					}))
				.end()
			.addClass('has-lang-hidden');
	}

function hide_comment(comment) {
	create_show_top();
	log('Hide Comment');
	comment.addClass('lang-hidden')
	       .css('background-color', '#f6f9fd')
	       .hide();
	cluster = comment.parents('.cluster');
	if (!cluster.hasClass('has-lang-hidden'))
		cluster
			.find('.summary')
				.append(' ')
				.append($('<img class="show-lang-hidden" alt="Show hidden items" title="Show hidden items" src="' + GM_getResourceURL('show_lang_hidden') + '"/>').click(function() {
					$(this)
						.parents('.cluster')
							.find('.lang-hidden')
								.show()
								.end()
							.end()
						.remove();
					check_remove_show_top();
					}))
				.end()
			.addClass('has-lang-hidden');
	}

function check_comment() {
	comment = $(this);
	if (!is_valid_language(get_comment_text(comment))) {
		if (action == 'move') {
			move_entry(comment.parents('.entry'));
			// One invalid comment causes entire entry moving to bottom.
			// No need to check rest of comments
			return false;
			}
		else if (action == 'hide') {
			hide_comment(comment);
			return;
			}					
		}
	}

function check_entry() {
	entry = $(this);
	if (detect_entry && !is_valid_language(get_entry_text(entry))) {
		if (action == 'move') {
			move_entry(entry);
			return;
			}
		else if (action == 'hide') {
			hide_entry(entry);
			return;
			}
		}
	if (detect_comment){
		entry.find('.comment').each(check_comment);
		}
	}

function check_cluster() {
	cluster = $(this);
	cluster.find('.entry').each(check_entry);
	// Empty cluster?
	if (cluster.find('.entry').length == 0)
		cluster.remove();
	else
		cluster.attr('fflf', 'checked');
	}

function show_lang_setting() {
	lang_setting = $('<div id="lang-setting"><div class="left"></div><div class="right"></div><p><em>Changes</em> need to <strong>refresh</strong> page to take effects</p></div>')
		.appendTo('body');

	lang_setting_left = lang_setting.find('.left');
	lang_setting_left.append('<strong>Unwanted Language</strong><br/>');
	for (lang in languages) {
		checked = (GM_getValue('lang_' + lang, false)) ? ' checked' : '';
		lang_setting_left.append('<label><input type="checkbox" name="lang_' + lang +
			'" id="lang_' + lang + '"' + checked + '/>' + languages[lang][0] + '</label><br/>');
		}
	
	lang_setting_right = lang_setting.find('.right');
	lang_setting_right.append('<strong>Detect on</strong><br/>');
	checked = (GM_getValue('detect_entry', false)) ? ' checked' : '';
	lang_setting_right.append('<label><input type="checkbox" name="detect_entry"' + checked + '/>Entry</label><br/>');
	checked = (GM_getValue('detect_comment', false)) ? ' checked' : '';
	lang_setting_right.append('<label><input type="checkbox" name="detect_comment"' + checked + '/>Comment</label><br/>');
	lang_setting_right.append('<strong>Action if detected</strong><br/>');
	checked = (GM_getValue('action', 'move') == 'move') ? ' checked' : '';
	lang_setting_right.append('<label><input type="radio" name="action" value="move"' + checked + '/>Move entire entry to bottom</label><br/>');
	checked = (GM_getValue('action', 'move') == 'hide') ? ' checked' : '';
	lang_setting_right.append('<label><input type="radio" name="action" value="hide"' + checked + '/>Hide the Entry or Comment</label><br/>');

	lang_setting.dialog({
		title: 'Language Filter',
		height: 320,
		width: 480,
		buttons: {
			'Save': function() {
				elements = $(this).find(':checkbox');
				for (var i = 0; i < elements.length; i++)
					GM_setValue(elements[i].name, elements[i].checked);

				elements = $(this).find('input[name=action]:checked');
				if (elements.length == 1)
					GM_setValue(elements[0].name, elements[0].value);

				$(this).dialog('destroy');
				$('#lang-setting').remove();
				},
			'Cancel': function() {
				$(this).dialog('destroy');
				$('#lang-setting').remove();
				}
			}
		});
	}

function init() {
	// Add styles
	GM_addStyle(".ui-dialog-titlebar {\
	border-bottom: 1px solid #d8d2aa;\
	background-color: #4477cc;\
	padding: 0px;\
	height: 28px;\
	_height: 29px;\
	}\
.ui-dialog-title {\
	margin-left: 5px;\
	color: #fff;\
	font-weight: bold;\
	position: relative;\
	top: 7px;\
	left: 4px;\
	}\
.ui-dialog-titlebar-close {\
	display: none;\
	}\
.ui-dialog-buttonpane {\
	position: absolute;\
	bottom: 8px;\
	right: 10px;\
	width: 100%;\
	text-align: center;\
	}\
#lang-setting {\
	background-color: #ecf2fa;\
	color: #1030cc;\
	padding: 10px;\
	}\
#lang-setting p{\
	color: #ff7744;\
	clear: both;\
	text-align: center;\
	}\
#lang-setting .left {\
	float: left;\
	}\
#lang-setting .right {\
	float: right;\
	margin-right: 20px;\
	}\
.show-lang-hidden {\
	cursor: pointer;\
	}\
.show-lang-hidden-top,\
.show-lang-hidden-bottom {\
	color: #cc7744;\
	font-weight: bold;\
	cursor: pointer;\
	}\
.show-lang-hidden-top {\
	position: fixed;\
	top: 50px;\
	left: 700px;\
	}");

	// Create setting link
	if ($('.settings').length == 0)
		$('<div class="settings"><table><tbody><tr></tr></tbody></table></div>').appendTo('#tabhead');

	$('.settings').find('tr').append('<td style="width: 10px"></td><td class="l_tab"><div class="rounded bb"><div class="t"><div class="l"><div class="r"><div class="tl"><div class="tr"><div class="body"><span class="lang-setting-link">language filter</span></div></div></div></div></div></div></div></td>');

	$('.lang-setting-link')
		.click(show_lang_setting)
		.css({color: '#1030cc', fontWeight: 'bold'});

	// Load variables
	detect_entry = GM_getValue('detect_entry', false);
	detect_comment = GM_getValue('detect_comment', false);
	action = GM_getValue('action', 'move');

	build_re();
	}

function check() {
	$('.cluster[fflf!=checked]').each(check_cluster);
	window.setTimeout(check, 1000);
	}

// =====================================
// Main
// =====================================

init();
check();
