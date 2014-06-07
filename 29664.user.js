// FriendFeed Translator
//  Powered by Google AJAX Language API
//
// Copyright 2008 Yu-Jie Lin
//
// Version       : 0.2
// License       : GPLv3
// Website       : http://thetinybit.com/Project/FriendFeedTranslator
//
// Author        : Yu-Jie Lin
// Author Website: http://thetinybit.com/
// Creation Date : 2008-07-06T00:30:29+0800
// Last Modified : 2008-07-10T19:51:43+0800
//
// Release Notes:
// = 0.2 (2008-07-10) =
//  Exclude untranslatable languages
//  Add missing readable text of Russian language
//  Replace Translate text with an icon
//  Fix language box shows in wrong pages by checking #feedcontainer
//  Work with page auto-refresh
//
// = 0.1 (2008-07-06) =
//  Initial Release
//
// ==UserScript==
// @name           FriendFeed Translator
// @namespace      http://thetinybit.com/
// @description    FriendFeed Translator
// @include        http://friendfeed.com/*
// @resource       translate_icon http://livibetter.googlepages.com/translate_icon.png
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==
// @require        http://www.google.com/jsapi
// @require        http://livibetter.googlepages.com/jquery-ui-personalized-1.5.1.min.js

var debug = false;

var show_o = false; // Show originals
var to_lang = '';   // Translating to which language

var id_re = /^<label for="([\w-]+)">.*<\/label>(.*)$/;
var cmt_end_re = /^(.*)( - <a href="\/[^"]+" uid=.*)$/;

var trans = {};     // Translation storage

// Only supported languages
var lang_readable = {
	'ARABIC' : 'Arabic - العربية',
	'BULGARIAN' : 'Bulgarian - Български',
	'CHINESE' : 'Chinese - 中文',
	'CHINESE_SIMPLIFIED' : 'Chinese (Simplified) - 简体中文',
	'CHINESE_TRADITIONAL' : 'Chinese (Traditional) - 正體中文',
	'CROATIAN' : 'Croatian - Hrvatski',
	'CZECH' : 'Czech - čeština',
	'DANISH' : 'Danish - dansk',
	'DUTCH': 'Dutch - Nederlands',  
	'ENGLISH' : 'English',
	'FINNISH' : 'Finnish - suomi',
	'FRENCH' : 'French - Français',
	'GERMAN' : 'German - Deutsch',
	'GREEK' : 'Greek - Ελληνικά',
	'HINDI' : 'Hindi - हिन्दी',
	'ITALIAN' : 'Italian - Italiano',
	'JAPANESE' : 'Japanese - 日本語',
	'KOREAN' : 'Korean - 한국어',
	'NORWEGIAN' : 'Norwegian - norsk',
	'POLISH' : 'Polish - język',
	'PORTUGUESE' : 'Portuguese - Português',
	'ROMANIAN' : 'Romanian - Română',
	'RUSSIAN' : 'Russian - Русский язык',
	'SPANISH' : 'Spanish - Español',
	'SWEDISH' : 'Swedish - svenska',
	};

// =====================================
// Functions
// =====================================

function log(msg) {
	if (debug)
		GM_log(msg);
	}

function save_trans(id, html) {
	t = trans[id];
	if (t == null) {
		log('Trans Error: No ID = ' + id);
		return;
		}
	t['translation'] = html;
	}

function update_trans(id) {
	t = trans[id];
	if (t == null) {
		log('Trans Error: No ' + id);
		return;
		}
	translation = t['translation'];
	if (translation == null) {
		log('Trans Error: No translation for ' + id);
		return;
		}
	jobj = $('#' + id);
	if (jobj.length != 1) {
		log('Trans Error: Count of element with ' + id + ' is not 1.');
		return;
		}

	if (id.substring(0, 2) == 'e-') {
		// is an entry
		jobj.find('.link').html(translation);
		if (show_o) {
			log('append original, ' + t['original']);
			jobj.find('.link')
				.append($('<br/>'))
				.append(t['original']);
			}
		}
	else if (id.substring(0, 4) == 'cmt-') {
		// is a comment, put the last part back from original
		re_result = cmt_end_re.exec(t['original']);
		if (re_result == null || re_result.length != 3) {
			log('Trans Error: Can not get last part from original comment.');
			return;
			}
		translation += re_result[2];
		jobj.html(translation);
		if (show_o)
			jobj.append($('<br/>'))
				.append(t['original']);
		}
	else {
		log('Trans Error: Unknown type of ' + id);
		return;
		}
	}

function trans_done(result) {
	if (result.error) {
		log('Trans Error ' + result.error.code + ': ' + result.error.message + ', detected ' + result.detectedSourceLanguage);
		return;
		}
	// Retrieve id from translation
	id_result = id_re.exec(result.translation);
	if (id_result == null || id_result.length != 3) {
		log('Trans Error: No planted ID from translation, ' + result.translation);
		return;
		}
	
	id = id_result[1];
	// remove planted ID
	translation = id_result[2];
	log(translation);
	// Save translation
	save_trans(id, translation);
	// Update page
	update_trans(id);
	}

function request_trans(id, html) {
	if (trans[id]) {
		html = trans[id]['original'];
		log('load original, ' + html)
		}
	else {
		log('save original, ' + html)
		trans[id] = {
			original: html
			}
		}
	// Plant id
	html = '<label for="' + id + '">[T]</label>' + html;
	// Remove last part of comment, if requesting for a comment
	if (id.substring(0, 4) == 'cmt-') {
		re_result = cmt_end_re.exec(html);
		if (re_result == null || re_result.length != 3) {
			log('Trans Error: Can not remove last part of comment, request cancelled.');
			return;
			}
		html = re_result[1];
		}
	log('Reguest for ' + id + ', ' + html);
	// Send request
	unsafeWindow.google.language.translate(
//		html,
		{text: html, type: 'html'},
		'',
		unsafeWindow.google.language.Languages[to_lang],
        trans_done
      	);
	}

function trans_comment() {
	comment = $(this);
	id = comment.attr('id');
	if (!id) {
		// Set up an ID for non-FriendFeed comment
		id = 'cmt-' + Math.round(Math.random()*1000000000000);
		comment.attr('id', id);
		}
	html = comment.html();
	request_trans(id, html);
	}

function trans_entry() {
	entry = $(this);
	id = entry.attr('id');
	html = entry.find('.link').html();
	request_trans(id, html);
	// Comments
	entry.find('.comment').each(trans_comment);
	}

function trans_cluster() {
	if (to_lang == '')
		return;
	cluster = $(this).parents('.cluster');
	// Get entries
	cluster.find('.entry').each(trans_entry);
	}

function trans_attach() {
	$('.cluster').not('.trans-attached')
		.find('.summary')
			.append(' ')
			.append('<img class="do-trans" alt="Translate this cluster of entries" title="Translate this cluster of entries" src="' + 
				GM_getResourceURL('translate_icon') + '"/>')
			.end()
		.find('.do-trans')
			.click(trans_cluster)
			.end()
		.addClass('trans-attached')
	// Run run run
	window.setTimeout(trans_attach, 1000);
	}

function refresh_trans() {
	for (id in trans)
		update_trans(id);
	}

// This is actual init function
function lang_api_loaded() {
	log('Language API loaded');
	// Only enabled when #feedcontainer exists
	if (!$('#feedcontainer').length)
		return;

	google = unsafeWindow.google
	// Check settings
	if (to_lang != '')
		if (!google.language.isTranslatable(google.language.Languages[to_lang]))
			to_lang == '';

	// Create t-box
	t_box = $('<div id="t-box"></div>').appendTo('body');
	// Add languages
	t_box_lang = $('<select id="t-box-lang"><option value="">Disable</option></select>');
	for (lang in google.language.Languages) {
		if (!google.language.isTranslatable(google.language.Languages[lang])
			|| lang == 'UNKNOWN')
			continue;
		selected = (lang == to_lang) ? ' selected' : '';
		lang_desc = lang;
		if (lang_readable[lang])
			lang_desc = lang_readable[lang];
		$('<option value="' + lang + '"' + selected + '>' + lang_desc + '</option>').appendTo(t_box_lang);
		}

	t_box_lang
		.appendTo(t_box)
		.change(function() {
			to_lang = $(this).find(':selected').get(0).value;
			log('To language: ' + to_lang);
			GM_setValue('to_lang', to_lang);
			});
	t_box.append(' ');
	t_ori = $('<span class="toggle-original">Original</span>')
		.click(function() {
			show_o = !show_o;
			GM_setValue('show_o', show_o);
			if (show_o)
				$(this).css({fontWeight: 'bold'});
			else
				$(this).css({fontWeight: 'normal'});
			refresh_trans();
			});
	if (show_o)
		t_ori.css({fontWeight: 'bold'});
	t_ori.appendTo(t_box);
	// Add 'Translate' to each cluster
	trans_attach();
	}

unsafeWindow.jsapi_loaded = function() {
	log('JSAPI loaded');
	unsafeWindow.google.load('language','1', {"callback" : lang_api_loaded});
	} 

function init() {
	var script = document.createElement('script');
	script.src = 'http://www.google.com/jsapi?callback=jsapi_loaded';
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script); 

	// Add styles
	GM_addStyle('#t-box {\
	position: fixed;\
	top: 10px;\
	left: 700px;\
	}\
.do-trans {\
	cursor: pointer;\
	}\
.toggle-original{\
	color: #cc7744;\
	cursor: pointer;\
	text-align: center;\
	}');

	// Load variables
	show_o = GM_getValue('show_o', false);
	to_lang = GM_getValue('to_lang', '');
	}

// =====================================
// Main
// =====================================

init();
