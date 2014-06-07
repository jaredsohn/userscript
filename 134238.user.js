// ==UserScript==
// @name		   Tatoeba Markdown Editor
// @namespace	   Jakob V. <jakov@gmx.at>
// @description	   Adds MarkEdit to Tatoeba and parses markdown comments as HTML
// @include		   http://tatoeba.org/*
// @match		   http://tatoeba.org/*
// @require		   http://code.jquery.com/jquery-1.7.js
// @require		   http://code.jquery.com/ui/1.8.20/jquery-ui.min.js
// @require		   https://raw.github.com/sbeam/jquery-ui/1d51378936b8565d901647713948a3bac4758e48/ui/jquery.ui.selectmenu.js
// @require		   http://userscripts.org/scripts/source/134357.user.js
// @require		   https://raw.github.com/jakov/js-pandoc/master/js-pandoc.js
// @require		   http://userscripts.org/scripts/source/135400.user.js
// @require		   https://jquery-json.googlecode.com/files/jquery.json-2.2.js
// @require		   http://kccode.googlecode.com/svn/trunk/source/javascript/diff/source/js/diff_match_patch_uncompressed.js
// ==/UserScript==
// 
// http://userscripts.org/scripts/source/134357.user.js // Tatoeba jQuery UI CSS for @require
// http://userscripts.org/scripts/source/135396.user.js // Showdown.js rehost for userscript integration
// http://userscripts.org/scripts/source/135400.user.js // Markdown Editor rehost for userscript integration
// The MIT License
// 
// Original WMD and Showdwon code copyright (c) 2007 John Fraser
// Toolbar images (c) 2009 Dana Robinson
// MarkEdit jQuery rewrite and modified images (c) 2009 Titus Stone
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
$(document).ready(main);

function main() {
	if(window.location.href.split('/')[4] == 'sentences' && window.location.href.split('/')[5] == 'show' ){
		infoIcon = $('.infoIcon:first');
		if(infoIcon.length==0){
			infoIcon = $('<a class="infoIcon"><img width="16" height="16" alt="" src="data:image/png;base64,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"></a>');
			$('.sentence.mainSentence').prepend(infoIcon);
		}
	
		infoIcon.click(function(event){
			thetextarea = $('.markedittextarea');
			state = thetextarea.markeditGetState();
	
			// insert sentence citation (the selection will be the proposed change;
			// if it's empty the whole sentence will be copied)
			state.beforeSelect = state.beforeSelect + '"' + $('.mainSentence .sentenceContent .text').text() + '" → "';
			state.select = (state.select == "" ? $('.mainSentence .sentenceContent .text').text() : state.select);
			state.afterSelect = '"' + state.afterSelect;
	
			thetextarea.markeditSetState(state);
			event.preventDefault();
		});
	}
	/*$('select#SentenceFrom, select#SentenceTo, select#randomLangChoiceInBrowse').selectmenu({style:'dropdown', menuWidth: 250, format: function(text, opt){ value = opt.attr('value'); if(value=='und'){value = 'unknown';} return '<img width="30" height="20" alt="'+value+'" title="'+text+'" class="languageFlag" src="http://flags.tatoeba.org/img/flags/'+value+'.png"> '+text; }});
	$('input[type="submit"]').button();
	$('input:text, input:password')
  .button()
  .css({
		  'font' : 'inherit',
		 'color' : 'inherit',
	'text-align' : 'left',
	   'outline' : 'none',
		'cursor' : 'text'
  });

	$('#randomLink a, #prevSentence a, #nextSentence a').button();
	$('.languageSelect + ul li').css({'background':'transparent', 'padding':'0', 'margin':'0'});
	$('fieldset.submit').prepend($('<label>_</label>'));
	*/
	
	// debugging
	console = unsafeWindow.console;
	GM_log = console.log;
	
	// define default variables
	default_markdownusers = {
		'jakov': true,
		'Esperantostern': true,
		'sacredceltic': true
	};
	default_markdownusers = $.toJSON(default_markdownusers);

	// get saved variables
	markdownusers = GM_getValue('markdownusers');
	markdownusers = markdownusers || default_markdownusers;
	markdownusers = $.evalJSON(markdownusers);
	console.log('markdownusers: ' + $.toJSON(markdownusers));

	// add CSS
	var css = resourcevar + "\
	.markedit { clear: both; display: inline-block; } \
	.markedit textarea { width: 100%; } \
	.markedit-toolbar { padding: 0.3em; margin: 0; clear: both; height: 22px; border-radius: 8px 8px 0px 0px; -moz-border-radius: 8px 8px 0px 0px;} \
	.markedit-toolbar .toolbar-group { margin-right: 0.5em; padding: 0 0 0 5px; float: left; } \
	.markedit-toolbar .toggle-group {  } \
	.markedit-toolbar .toggle-group button { font-size: 0.85em; font-weight: bold; padding: 0.15em 0.5em; } \
	.markedit-toolbar .toggle-group button:first-child { -moz-border-radius: 11px 0 0 11px; border-radius: 11px 0 0 11px; } \
	.markedit-toolbar .toggle-group button:last-child { -moz-border-radius: 0 11px 11px 0; border-radius: 0 11px 11px 0; } \
	.markedit-toolbar button { height: 22px; outline: 0; cursor: pointer; } \
	.markedit-toolbar button.icon { width: 22px; background-repeat: no-repeat; margin: 0 5px 0 0; } \
	.markedit .light-bg button.icon { background-image: url(images/wmd-buttons.png); } \
	.markedit .dark-bg button.icon { background-image: url(images/wmd-buttons-dark.png); } \
	.markedit-toolbar button.bold { background-position: 0px 0px; } \
	.markedit-toolbar button.italic { background-position: -20px 0px; } \
	.markedit-toolbar button.link { background-position: -40px 1px; } \
	.markedit-toolbar button.quote { background-position: -60px 0px; } \
	.markedit-toolbar button.code { background-position: -80px 1px; } \
	.markedit-toolbar button.image { background-position: -100px 1px; } \
	.markedit-toolbar button.numberlist { background-position: -120px 0px; } \
	.markedit-toolbar button.bulletlist { background-position: -140px 0px; } \
	.markedit-toolbar button.heading { background-position: -160px 0px; } \
	.markedit-toolbar button.line { background-position: -180px 0px; } \
	.markedit-toolbar button.undo { background-position: -200px 0px; } \
	.markedit-toolbar button.redo { background-position: -220px 0px; } \
	.markedit-toolbar button.help { background-position: -240px 0px; } \
	.markedit-dialog { font-size: 0.75em; } \
	.markedit-dialog input { width: 100%; } \
	.markedit-preview { padding: 15px; } \
	\
	/* Selectmenu */ \
	.ui-selectmenu { display: block; display: inline-block; position: relative; height: 2.2em; vertical-align: middle; text-decoration: none; overflow: hidden; zoom: 1; } \
	.ui-selectmenu-icon { position:absolute; right:6px; margin-top:-8px; top: 50%; } \
	.ui-selectmenu-menu { padding:0; margin:0; position:absolute; top: 0; display: none; z-index: 1005;} /* z-index: 1005 to make selectmenu work with dialog */ \
	.ui-selectmenu-menu	 ul { padding:0; margin:0; list-style:none; position: relative; overflow: auto; overflow-y: auto ; overflow-x: hidden; -webkit-overflow-scrolling: touch;}	\
	.ui-selectmenu-open { display: block; } \
	.ui-selectmenu-menu-popup { margin-top: -1px; } \
	.ui-selectmenu-menu li { padding:0; margin:0; display: block; border-top: 1px dotted transparent; border-bottom: 1px dotted transparent; border-right-width: 0 !important; border-left-width: 0 !important; font-weight: normal !important; } \
	.ui-selectmenu-menu li a,.ui-selectmenu-status { line-height: 1.4em; display: block; padding: .405em 2.1em .405em 1em; outline:none; text-decoration:none; } \
	.ui-selectmenu-menu li.ui-state-disabled a, .ui-state-disabled { cursor: default; } \
	.ui-selectmenu-menu li.ui-selectmenu-hasIcon a, \
	.ui-selectmenu-hasIcon .ui-selectmenu-status { padding-left: 20px; position: relative; margin-left: 5px; } \
	.ui-selectmenu-menu li .ui-icon, .ui-selectmenu-status .ui-icon { position: absolute; top: 1em; margin-top: -8px; left: 0; } \
	.ui-selectmenu-status { line-height: 1.4em; } \
	/*.ui-selectmenu-menu li span,.ui-selectmenu-status span { display:block; margin-bottom: .2em; } */\
	.ui-selectmenu-menu li .ui-selectmenu-item-header { font-weight: bold; } \
	.ui-selectmenu-menu li .ui-selectmenu-item-footer { opacity: .8; } \
	/* for optgroups */ \
	.ui-selectmenu-menu .ui-selectmenu-group { font-size: 1em; } \
	.ui-selectmenu-menu .ui-selectmenu-group .ui-selectmenu-group-label { line-height: 1.4em; display:block; padding: .6em .5em 0; font-weight: bold; } \
	.ui-selectmenu-menu .ui-selectmenu-group ul { margin: 0; padding: 0; } \
	/* IE6 workaround (dotted transparent borders) */ \
	* html .ui-selectmenu-menu li { border-color: pink; filter:chroma(color=pink); width:100%; } \
	* html .ui-selectmenu-menu li a { position: relative } \
	/* IE7 workaround (opacity disabled) */ \
	*+html .ui-state-disabled, *+html .ui-state-disabled a { color: silver; } \
	\
	/* selectmenu Tatoeba */ \
	.ui-selectmenu-status { line-height: 0.7em; } \
	.ui-selectmenu { height: 1.5em;} \
	.ui-selectmenu a { width: auto !important; } \
	.ui-button { padding: 0.1em 0.2em !important; } \
	.ui-button-text { padding: 0.1em 0.2em !important; } \
	.ui-selectmenu-status .languageFlag { float: none; margin: 0; vertical-align: text-bottom; } \
	.ui-selectmenu { height: auto !important; width: auto !important; } \
	.ui-selectmenu-menu li a, .ui-selectmenu-status { padding: 0.3em 1.6em 0.3em 0.8em; } \
	/*.search_bar a { color: #257D0C !important; } \
	.search_bar .select, .search_bar .input { width: auto !important; } \
	.search_bar fieldset { float: left; } */ \
	\
	.markedit .light-bg button.icon { background-image: url('data:image/png;base64,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'); } .markedit .dark-bg button.icon { background-image: url('data:image/png;base64,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'); } \
	\
	textarea, .unparsedmarkdown { font-family: monospace; } \
	\
	pre.unparsedmarkdown { white-space: pre-wrap; } \
	.unparsedmarkdown br { display: none; } \
	.profileDescription .unparsedmarkdown { font-size: 1.3em; } \
	.privateMessage div.body { font-size: 1.1em; } \
	.privateMessage pre.body { font-size: 1.2em; } \
	.sticky .unparsedmarkdown { border: 1px solid grey; } \
	.parsedmarkdown { padding: 15px; } \
	.parsedmarkdown blockquote, .markedit-preview blockquote { border-left: 0.3em solid #BBBBBB; margin:0.5em 0;	padding: 0 1.1em; } \
	.parsedmarkdown > :first-child { margin-top: 0 !important; } \
	.parsedmarkdown > :last-child { margin-bottom: 0 !important; } \
	.parsedmarkdown li { margin: 0.2em 0 !important; } \
	.parsedmarkdown p { margin: 0.2em 0 !important; } \
	#WallContent { /* max-width: 508px;*/ } \
	.parsedmarkdown ul, .parsedmarkdown ol	{ padding-left: 3em; } \
	.parsedmarkdown ul { list-style: disc; } \
	\
	.parsedmarkdown ul, .parsedmarkdown ol	{ padding-left: 3em; } \
	.parsedmarkdown ul { list-style: disc; } \
	\
	#sendMessageForm .markedit textarea, .replyFormDiv .markedit textarea, .markedit textarea { min-width: 388px; margin: 3px 0; } \
	#SentenceCommentSaveForm textarea, #sendMessageForm textarea { width: 508px; } \
	.replyFormDiv textarea { width: 508px; width:100%; } \
	#WallSaveForm textarea { width: 508px; } \
	#PrivateMessageContent { width: 560px; } \
	#PrivateMessageSendForm .input.text { clear:both; display: inline-block; width: 100%; } \
	#PrivateMessageSendForm .input.text label { width:auto; } \
	#PrivateMessageSendForm .input.text input { float: right; width: 455px; } \
	#PrivateMessageSendForm { /* display: table; */ } \
	label:empty { display: none; } \
	 #SentenceCommentSaveForm textarea { width: auto; } \
	.markedit-preview { margin-bottom: 3px; } \
	\
	a[href^='/tags/show_sentences_with_tag/'] { background: none repeat scroll 0 0 #FFE684; border-bottom: 1px solid #DDDDDD; border-radius: 5px 5px 5px 5px; border-right: 1px solid #DDDDDD; padding: 2px 8px; color: #333333 !important; font-size: 1.2em;} \
	\
	a[href^='/user/profile/'] { } \
	a[href^='/sentences/show/'] { } \
	\
	a[href^='/tags/show_sentences_with_tag/']:before { content:'#'; } \
	a[href^='/user/profile/']:before { content:'@'; } \
	a[href^='/sentences/show/']:before { content:'№'; } \
	\
	.comp { padding:2px 8px; line-height:25px; background-color: #FBFFC9; border-bottom: 1px solid #DDDDDD; border-right: 1px solid #DDDDDD; border-radius:3px; } \
	.comp del, .patch del {color:red; background-color: #FFE6E6;} \
	.comp ins, .patch ins {color:green; background-color: #E6FFE6;} \
	.comp .before ins, .patch .before ins {display:none;} \
	.comp .after del, .patch .after del {display:none;} \
	\
	.autocorrect .ui-selectmenu { display: block; } \
	.autocorrect { font-size: 0.8em; margin-bottom: 3px; } \
	.autocorrect .patch { width: auto; width: -moz-available; display: inline-table !important; font-family: monospace; white-space:pre-wrap; } \
	.autocorrect .patch > span { display: table-cell !important; text-align:left;} \
	.autocorrect .patch .gets { font-size: x-large !important; } \
	.dropdown { border: 1px solid red; height: 100%; margin-top: -1px; position: absolute; right: -1px; top: 0; width: 26px; } \
	\
	a { -moz-transition: text-shadow 0.5s ease 0s; text-shadow: none;} \
	a:hover { text-shadow: 0 0 2px #89C140; } \
	\
	.parsedmarkdown table, .markedit-preview table { width: auto; } \
	.parsedmarkdown th, .parsedmarkdown td, .markedit-preview th, .markedit-preview td { border: 1px solid black; } \
	a:hover .markdownmark.solid path { fill: #FB6B10 !important; } \
	a:hover .markdownmark.normal path { fill: #FB6B10 !important; } \
	a:hover .markdownmark.normal rect { stroke: #FB6B10 !important; } \
	";
	GM_addStyle(css);


	// prepare wall replies for live preview (work in progress)
	$('.replyLink').click(function () {
		$('.replyFormDiv').find('.markedit').find('.markedit-toolbar, .ac_select, .markedit-preview').remove();
		$('.replyFormDiv').find('textarea').markedit({
		'preview': 'below',
		'toolbar': {
			'backgroundMode': 'light',
			'layout': 'bold italic | link quote code image | numberlist bulletlist heading line | cite-sentence',
			'buttons': [{
				// prepare the link toggle button
				// this should toggle between endnote and inline link
				// doesn'T work at all yet
				'id': 'linktoggle',
				'css': 'icon ui-state-default ui-corner-all',
				//ui-icon ui-icon-transferthick-e-w
				'tip': 'click to toggle between endnote style and inline style',
				'click': function () {
					//markedit = $(this).parentsUntil('.markedit').parent();
					//markedit.markeditSetLinkOrImage('http://example.com');
				},
				'mouseover': function () {},
				'mouseout': function () {}
			}, {
				'id': 'cite-sentence',
				'css': 'icon ui-state-default ui-corner-all',
				//ui-icon ui-icon-transferthick-e-w
				'tip': 'cite the main sentence',
				'click': function () {
					//find the textarea
					thetextarea = $('.markedittextarea');
					state = thetextarea.markeditGetState();

					// insert sentence citation (the selection will be the proposed change;
					// if it's empty the whole sentence will be copied)
					state.beforeSelect = state.beforeSelect + '"' + $('.mainSentence .sentenceContent .text').text() + '" → "';
					state.select = (state.select == "" ? $('.mainSentence .sentenceContent .text').text() : state.select);
					state.afterSelect = '"' + state.afterSelect;

					thetextarea.markeditSetState(state);
				},
				'mouseover': function () {},
				'mouseout': function () {}
			}],
		}
		});
	});

	// diff_match_patch
	// the function that outputs the pretty html for the diffs
	diff_match_patch.prototype.diff_prettyHtml = function (diffs) {
		var html = [];
		var i = 0;
		for (var x = 0; x < diffs.length; x++) {
			var op = diffs[x][0]; // Operation (insert, delete, equal)
			var data = diffs[x][1]; // Text of change.
			var text = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '&para;<BR>');
			switch (op) {
			case DIFF_INSERT:
				html[x] = '<ins>' + text + '</ins>';
				break;
			case DIFF_DELETE:
				html[x] = '<del>' + text + '</del>';
				break;
			case DIFF_EQUAL:
				html[x] = '<span>' + text + '</span>';
				break;
			}
			if (op !== DIFF_DELETE) {
				i += data.length;
			}
		}
		return html.join('');
	};

	// http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery
	$.fn.changeElementType = function(newType) {
		var attrs = {};

		$.each(this[0].attributes, function(idx, attr) {
			attrs[attr.nodeName] = attr.nodeValue;
		});
 
		var newelement = $("<" + newType + "/>", attrs).append($(this).contents());
		this.replaceWith(newelement);
		return newelement;
	};

http://stackoverflow.com/questions/202605/repeat-string-javascript
String.prototype.repeat = function(count) {
	if (count < 1) return '';
	var result = '', pattern = this.valueOf();
	while (count > 0) {
		if (count & 1) result += pattern;
		count >>= 1, pattern += pattern;
	}
	return result;
};

function linum2int(input) { //jakob
	input = input.replace(/[^A-Za-z]/, '');
	output = 0;
	for (i = 0; i < input.length; i++) {
		output = output * 26 + parseInt(input.substr(i, 1), 26 + 10) - 9;
	}
	console.log('linum', output);
	return output;
}

function int2linum(input) { //jakob
	// There's a quicker function that does the same on stackoverflow, but i wrote this one myself and im not sure about the license of the other one
	// http://stackoverflow.com/questions/8603480/how-to-create-a-function-that-converts-a-number-to-a-bijective-hexavigesimal/11506042#11506042
	var zeros = 0;
	var next = input;
	var generation = 0;
	while (next >= 27) {
		next = (next - 1) / 26 - (next - 1) % 26 / 26;
		zeros += next * Math.pow(27, generation);
		generation++;
	}
	output = (input + zeros).toString(27).replace(/./g, function ($0) {
		return '_abcdefghijklmnopqrstuvwxyz'.charAt(parseInt($0, 27));
	});
	return output;
}

function roman2int(input) { //jakob

	romans = {
		'm': 1000,
		'd': 500,
		'c': 100,
		'l': 50,
		'x': 10,
		'v': 5,
		'i': 1
	};
	input = input.replace(/[^A-Za-z]/, '').toLowerCase();
	output = 0;
	highest = false;
	for (i = input.length - 1; i >= 0; i--) {
		num = romans[input.substr(i, 1)] || 0;
		highest = (num > highest ? num : highest);
		output = (num < highest ? (output - num) : (output + num));
	}
	return output;
}

function int2roman(number) {
	// http://www.blackwasp.co.uk/NumberToRoman_2.aspx
	result = "";
	values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	numerals = ["m", "cm", "d", "cd", "c", "xc", "l", "xl", "x", "ix", "v", "iv", "i"];

	for (i = 0; i < 13; i++) {
		while (number >= values[i]) {
			number -= values[i];
			result += numerals[i];
		}
	}
	return result;
}

function tatoebaundo(text) {
		  //console.log(text);

		// undo the link shortening and fix its bugs
		// replace shortened link within inline markdown links or images
		// text = text.replace(/\(<a href="(.*?)">(.*?)<\/a>\)/gi, '\($1\)');
		
// repair markdown forced links <http://example.com>
		text = text.replace(/&lt;<a href="(.*?)%3E">(.*?)&gt;<\/a>;/gim, function($0, $1, $2){ return '<'+unescape($1)+'>';});
		
		// repair link detection errors
		text = text.replace(/<a href="(.*?&amp;)">(.*?)<\/a>;/gim, function($0, $1, $2){ return '<'+unescape($1)+'>';});

// replace shortened link with its URL
	   text = text.replace(/<a href="(.*?)">(.*?)<\/a>/gi, function($0, $1, $2){ return '<'+unescape($1)+'>';});
	   
		// remove forced linebreaks (<br>)
		text = text.replace(/(<br\/*>)+/gim, "");

		// replace shortened link within reference markdown links or images
		text = text.replace(/\[(.*)\]\: <a href="(.*)">(.*)<\/a>/gi, '[$1]: $2');

	
		return text;
	}

	function tatoedown(text) {


		// mimik Tatoeba's HTML denial by displaying angle brackets as they are
		// this will be later reenabled further down, but in the end we maybe don't even want html to be parsed!!!
		text = text.replace(/</gim, "&lt;").replace(/>/gim, "&gt;");

		// reenable html (Tatoeba doesn't allow HTML, so it displays the angle brackets as &lt; and &gt;)
		// however in the end we maybe don't even want html to be parsed!!!
		text = text.replace(/&lt;/gim, "<").replace(/&gt;/gim, ">");

		// "[blah](http://example.com/) asdf asdf asdf asdf http://blah.com deng asdf asdf asd".replace(/[^\(\<]((mailto\:|(news|(ht|f)tp(s?))\:\/\/){1}\S+)[^\)\>]/, 'xxx')
		// this is the linkification pattern taken from tatoeba's php (views > helpers > clickable_links.php)
	//	text = text.replace(/((ht|f)tps?:\/\/([\w\.]+\.)?[\w-]+(\.[a-zA-Z]{2,4})?[^\s\r\n\(\)"\'\!<]+)/g, '$1');
		
		//convert links to sentences (like nº642253)
		text = text.replace(/()(?:\[(?:n°|№)([0-9]+)\]|(?:n°|№)([0-9]+))/ig, '$1[$2$3](/sentences/show/$2$3)');
		//text = text.replace(/(\s)\[n°([0-9]+)\]/ig, '$1[n°$2](/sentences/show/$2 )');
		// convert simple #hashtags to links to the respective tag		 
		text = text.replace(/(\s)(?:\#([@0-9A-Za-z\u00A1-\uFFFF]+)|\[\#(.+)\])/ig, '$1[$2$3](/tags/show_sentences_with_tag/$2$3)');
		// convert @username to a link to the respective user profile
		text = text.replace(/(\s)(?:\@([A-Za-z0-9_]+)|\[\@([A-Za-z0-9_]+)\])/ig, '$1[$2$3](/user/profile/$2$3)');

		// convert [reference]-style links to "[reference][]" to activate [reference] (not only [reference][]) js-markdown-extra
		// i found out that this isnt even intended in markdown, but showdown seems to tolerate it
		// i think it disables the useage of [square brackets] in other intentions, which is bad
		// therefore i will not bypass this
		// and i think the code below isnt working well, but i'll let it here if needed later
		//text = text.replace(/\[(.+)\](?=[^\[\(])/ig, '[$1][$1]');
		//text = text.replace(/\[([^\]\^]+)\]\[([^\]\^]+)\]|\[([^\]\^]+)\](?=[^\[\(]\:)/ig, '[$1$3][$2]');

		//console.log(text);

		/*
		// convert "1) " lists to "1. " lists; this is the natural behaviour of some users
		text = text.replace(/^(\s*)(\d+)\) /img, '$1$2. ');
		*/
		
		// convert wiki-style headers "== header ==" with markdown style headers
		text = text.replace(/^\s*= (.*?) =\s*$/gim, '# $1 #').replace(/^\s*== (.*?) ==\s*$/gim, '## $1 ##').replace(/^\s*=== (.*) ===\s*$/gim, '### $1 ###').replace(/^\s*==== (.*?) ====\s*$/gim, '#### $1 ####').replace(/^\s*====== (.*?) ======\s*$/gim, '###### $1 ######').replace(/^\s*======= (.*?) =======\s*$/gim, '####### $1 #######');

		// prepare for easier matching of text-change patterns
		// e.g. “this” => “that” or «this» => «that» both gets {this}=>{that}
		text = text.replace(/([„\"{«»“`´'‘’"'])[ ]?(.*?)[ ]?([“\"}»«”`´'‘’"'])\s*(?:-+&gt;|=+&gt;|-+>|=+>|→|⇒|➢|➔|➡|➸|→)\s*\1(.*?)\3/ig, "{$2}=>{$4}");

		// match unified change proposals like {this}=>{that}
		if (text.match(/{(.*?)}=>{(.*?)}/gim) != null) {
			// each of them gets its own diff
			$.each(text.match(/{(.*?)}=>{(.*?)}/gim), function (index, value) {
				// reference is the old one, compareto is the new one
				reference = value.replace(/{(.*?)}=>{(.*?)}/im, "$1");
				compareto = value.replace(/{(.*?)}=>{(.*?)}/im, "$2");
				// initialize the diff_match_patch
				var dmp = new diff_match_patch();
				dmp.Diff_Timeout = 1;
				// compare them
				var d = dmp.diff_main(reference, compareto);
				// this makes it readable
				dmp.diff_cleanupSemantic(d);
				// when clicking on such a proposal, copy the text to the sentence if editable by you
				noins = (dmp.diff_prettyHtml(d).replace(/<ins>.*?<\/ins>/g,'')==dmp.diff_prettyHtml(d) ? ' noins':'');
				nodel = (dmp.diff_prettyHtml(d).replace(/<del>.*?<\/del>/g,'')==dmp.diff_prettyHtml(d) ? ' nodel':'');
				
				var ds = '<a onclick=\'$(".mainSentence .editableSentence").click();$(".mainSentence .editableSentence input").val($(".mainSentence .editableSentence input").val().replace("'+reference+'", "' + compareto + '"))\' class="comp'+noins+nodel+'"><span class="before">' + dmp.diff_prettyHtml(d).replace(/<ins>.*?<\/ins>/g,'') + '</span><span class="gets"> → </span><span class="after">' + dmp.diff_prettyHtml(d).replace(/<del>.*?<\/del>/g,'') + '</span></a>';
				// now put it into the text
				text = text.replace(value, ds);
			});
		}
		
		return text;
	}

	//
	//	$.markeditGetHtml
	//
	$.fn.markeditGetHtml = function () {

		/*
		// Load Showdown if it's not loaded
		if (typeof(MarkEditShowDown) === 'undefined') {
			if (typeof(Attacklab) === 'undefined') {
				throw 'Showdown.js (Attacklab.showdown) must be loaded before MarkEdit.';
			}
			MarkEditShowDown = new Attacklab.showdown.converter();
		}*/

		// Render the preview
		var textarea = MarkEdit.getTextArea(this);
		var text = $(textarea).val();
		if (typeof (text) !== 'undefined') {

			var text = $(this).val();

			var html = Pandoc(tatoedown(tatoebaundo(text)));
			// html = html.replace(/\r/g, '');
			/* //this seems to be unneccessary for Tatoeba purposes
			// Convert newlines to <br/> inside a <p>
			var lineBreakInP = /(<p>(?:[\S\s](?!<\/p>))*)\n([\S\s]*?<\/p>)/g;
			var lineBreaksRemaining = lineBreakInP.exec(html);

			while (lineBreaksRemaining !== null) {
				html = html.replace(lineBreakInP, '$1<br />$2');
				lineBreaksRemaining = lineBreakInP.exec(html);
			}
			*/

			return html;
		} else {
			return '';
		}

	};

	//
	//	$.markeditBindAutoPreview
	//
	$.fn.markeditBindAutoPreview = function (element) {

		// Convert out of jQuery & find Textarea
		if (element.get) {
			element = element.get(0);
		}
		var textarea = MarkEdit.getTextArea(this);
		
		autocorrect = $('<div class="autocorrect"></div>');
		first = $('<div id="first"></div>');
		apply = $('<a id="apply"></a>').button().css({'display':'table-cell', 'width':'95%'});
		dropdown = $('<span id="dropdown"></span>').button({
					text: false,
					icons: {
						primary: "ui-icon-triangle-1-s"
					}
				}).css({'display':'table-cell'});
		dropdown.find('.ui-button-icon-primary').css({'position':'inherit'});
		dropdown.find('.ui-button-text').css({'display':'none'});
		first.append(apply).append(dropdown).css({'width':'100%', 'display':'table-row'});
		autocorrect.append(first).css({'display':'table'});
		$(textarea).after(autocorrect);
		
		default_markeditlang = 'eng';
		// get saved variables
		markeditlang = GM_getValue('markeditlang'); 
		markeditlang = markeditlang || default_markeditlang;
		console.log('markeditlang: ' + markeditlang);
		
		langchooser = $('fieldset.select:first select:first').clone().removeAttr('id').removeAttr('name').css({'width':'68px'});
		langchooser.attr('id', 'langchooser');
		langchooser.val(markeditlang);
		//langchooser.find('option:not([value="'+markeditlang+'"])').removeAttr('selected');
		//langchooser.find('option[value="'+markeditlang+'"]').attr('selected', true);
		
		langchooser.change(function(){
			markeditlang = $(this).find('option:selected').val();
			// save the new state
			GM_setValue('markeditlang', markeditlang);
			console.log('markeditlang: ' + markeditlang);
		});
		//langchooser.find('label:first').remove();
		//langchooser.find('select:first').removeAttr('id').removeAttr('name');
		//langchooser.find('select:first').change(function(){
		//	lang = $(this).find('option:selected').val();
		//});
		
		langchoosergroup = $('<div class="langchooser toolbar-group"></div>');
		langchoosergroup.append(langchooser);
		$('.toolbar-group:last').after(langchoosergroup);

		// Enable events for auto-preview
		$(textarea).bind('keyup', function (event) { //input paste change 

			// get the current state of the text
			thismarkeditor = $(this);

			state = thismarkeditor.markeditGetState();
			if (markeditlang != 'false') {
				/*
				RegExp.escape = function(text) {
				  if (!arguments.callee.sRE) {
					var specials = [
					  '/', '.', '*', '+', '?', '|',
					  '(', ')', '[', ']', '{', '}', '\\'
					];
					arguments.callee.sRE = new RegExp(
					  '(\\' + specials.join('|\\') + ')', 'g'
					);
				  }
				  return text.replace(arguments.callee.sRE, '\\$1');
				}
				
				text = 'at the end at the end';
				text.replace(new RegExp(RegExp.escape('at the end')+'$'), 'x');
				
				GESPERRTER TEXT IST BETONTER TEXT:
				
				"Here is an example of how to  e m p h a s i z e  words. You can add `*` for  * s t r o n g *  or `**` for	* * s t r o n g e m p h a s i s * *	 . <= Here you can see the downside (you can't use punktuation around it). It would however work with line breaks:	d o n a u d a m \np f s c h i f f  ".replace(/[ ][ ](\S(?:[ ]\n?\S\n?)*)[ ][ ]/g, function($1, $2){console.log($1+',', $2+',');return ' *'+$2.replace(/\s(\n?\S\n?)/g, function($x, $y){return $y;})+'* ';});
				
				
				TABELLENSPALTEN ANWÄHLEN
				
				$('.markedit-preview').find('table').prepend($('<colgroup/>').css({'background-color':'red'}));
				
				*/

				replacementarray = [
					['all', /(?:^|[ ][ ])(\S(?:[ ]\n?\S\n?)*)[ ]?[ ]?$/g, function($1, $2){console.log($1+',', $2+',');return ' *'+$2.replace(/\s(\n?\S\n?)/g, function($x, $y){return $y;})+'* ';}, 'gesperrter Text'],
					
					//['all', /([„\"{«»“`´'‘’"'])[ ]?(.*?)[ ]?([“\"}»«”`´'‘’"'])(\s*(?:-+&gt;|=+&gt;|-+>|=+>|→|⇒|➢|➔|➡|➸|→)\s*)\1?[ ]?$/, "$1$2$3$4$1$2$3", 'sentence changes'],
					['deu', /([„"{«»“`´'‘’"'])[ ]?(.*?)[ ]?([“"}»«”`´'‘’"'])(\s*(?:-+&gt;|=+&gt;|-+>|=+>|→|⇒|➢|➔|➡|➸|→)\s*)\1[ ]?(.*?)[ ]?\3$/, "„$2“ → „$5“", 'sentence changes'],
					['eng', /([„"{«»“`´'‘’"'])[ ]?(.*?)[ ]?([“"}»«”`´'‘’"'])(\s*(?:-+&gt;|=+&gt;|-+>|=+>|→|⇒|➢|➔|➡|➸|→)\s*)\1[ ]?(.*?)[ ]?\3$/, "“$2” → “$5”", 'sentence changes'],
					['fra', /([„"{«»“`´'‘’"'])[ ]?(.*?)[ ]?([“"}»«”`´'‘’"'])(\s*(?:-+&gt;|=+&gt;|-+>|=+>|→|⇒|➢|➔|➡|➸|→)\s*)\1[ ]?(.*?)[ ]?\3$/, "« $2 » → « $5 »", 'sentence changes'],
					
					['deu', /("|„)(.*?)"$/, '„$2“', 'Anführungszeichen'],
					['deu', /('|‚)(.*?)'$/, '‚$2‘'],
					['deu', /(>>|»)(.*?)<<$/, '»$2«'],
					['deu', /(>|›)(.*?)<$/, '›$2‹'],

					['eng', /("|“|``)(.*?)("|'')$/, '“$2”'],
					['eng', /('|‘|`)(.*?)'$/, '‘$2’'],

					['fra', /~c$/, 'ç', 'c cedilla'],
					['fra', /\\?oe$/, 'œ', 'oe'],
					['fra', /\\?Oe|OE$/, 'Œ', 'OE'],
					['fra', /\\?ae$/, 'æ', 'ae'],
					['fra', /\\?Ae|AE$/, 'Æ', 'AE'],
					['fra', /"\s?([^"\n]*?)\s?"$|<<\s?([^"\n]*?)\s?>>$/, '« $1$2 »'],
					['fra', /'\s?([^'\n]*?)\s?'$|<\s?([^<\n]*?)\s?>$/, '‹ $1$2 ›'],
					['fra', / ([\;\:\?\!»›])$/, ' $1'], // automatically convert spaces before :;?!»›
					['fra', /([«‹]) $/, '$1 '], // automatically convert spaces after «‹
				
					['epo', /\^s|sx$/, 'ŝ', 's ^', 'auto'],
					['epo', /\^S|Sx|SX$/, 'Ŝ', 'S ^', 'auto'],
					['epo', /\^c|cx$/, 'ĉ', 'c ^', 'auto'],
					['epo', /\^C|Cx|C$/, 'Ĉ', 'C ^', 'auto'],
					['epo', /\^g|gx$/, 'ĝ', 'g ^', 'auto'],
					['epo', /\^G|Gx|GX$/, 'Ĝ', 'G ^', 'auto'],
					['epo', /\^h|hx$/, 'ĥ', 'h ^', 'auto'],
					['epo', /\^H|Hx|HX$/, 'Ĥ', 'H ^', 'auto'],
					['epo', /\^j|jx$/, 'ĵ', 'j ^', 'auto'],
					['epo', /\^J|Jx|JX$/, 'Ĵ', 'J ^', 'auto'],
					['epo', /\^u|ux$/, 'ŭ', 'u ^', 'auto'],
					['epo', /\^U|Ux|UX$/, 'Ŭ', 'U ^', 'auto'],
					['epo', /ŝx$/, 's', 's'],
					['epo', /Ŝx|ŜX$/, 'S', 'S'],
					['epo', /ĉx$/, 'c', 'c'],
					['epo', /Ĉx|ĈX$/, 'C', 'C'],
					['epo', /ĝx$/, 'g', 'g'],
					['epo', /Ĝx|ĜX$/, 'G', 'G'],
					['epo', /ĥx$/, 'h', 'h'],
					['epo', /Ĥx|ĤX$/, 'H', 'H'],
					['epo', /ĵx$/, 'j', 'j'],
					['epo', /Ĵx|ĴX$/, 'J', 'J'],
					['epo', /ŭx$/, 'u', 'u'],
					['epo', /Ŭx|ŬX$/, 'U', 'U'],
					['epo', /(\S*)(?:\^s|sx)(\S*)$/, '$1ŝ$2', 's ^'],
					['epo', /(\S*)(?:\^S|Sx|SX)(\S*)$/, '$1Ŝ$2', 'S ^'],
					['epo', /(\S*)(?:\^c|cx)(\S*)$/, '$1ĉ$2', 'c ^'],
					['epo', /(\S*)(?:\^C|Cx|CX)(\S*)$/, '$1Ĉ$2', 'C ^'],
					['epo', /(\S*)(?:\^g|gx)(\S*)$/, '$1ĝ$2', 'g ^'],
					['epo', /(\S*)(?:\^G|Gx|GX)(\S*)$/, '$1Ĝ$2', 'G ^'],
					['epo', /(\S*)(?:\^h|hx)(\S*)$/, '$1ĥ$2', 'h ^'],
					['epo', /(\S*)(?:\^H|Hx|HX)(\S*)$/, '$1Ĥ$2', 'H ^'],
					['epo', /(\S*)(?:\^j|jx)(\S*)$/, '$1ĵ$2', 'j ^'],
					['epo', /(\S*)(?:\^J|Jx|JX)(\S*)$/, '$1Ĵ$2', 'J ^'],
					['epo', /(\S*)(?:\^u|ux)(\S*)$/, '$1ŭ$2', 'u ^'],
					['epo', /(\S*)(?:\^U|Ux|UX)(\S*)$/, '$1Ŭ$2', 'U ^'],
					['epo', /(\S*)(?:ŝx)(\S*)$/, '$1s$2', 's'],
					['epo', /(\S*)(?:Ŝx|ŜX)(\S*)$/, '$1S$2', 'S'],
					['epo', /(\S*)(?:ĉx)(\S*)$/, '$1c$2', 'c'],
					['epo', /(\S*)(?:Ĉx|ĈX)(\S*)$/, '$1C$2', 'C'],
					['epo', /(\S*)(?:ĝx)(\S*)$/, '$1g$2', 'g'],
					['epo', /(\S*)(?:Ĝx|ĜX)(\S*)$/, '$1G$2', 'G'],
					['epo', /(\S*)(?:ĥx)(\S*)$/, '$1h$2', 'h'],
					['epo', /(\S*)(?:Ĥx|ĤX)(\S*)$/, '$1H$2', 'H'],
					['epo', /(\S*)(?:ĵx)(\S*)$/, '$1j$2', 'j'],
					['epo', /(\S*)(?:Ĵx|ĴX)(\S*)$/, '$1J$2', 'J'],
					['epo', /(\S*)(?:ŭx)(\S*)$/, '$1u$2', 'u'],
					['epo', /(\S*)(?:Ŭx|ŬX)(\S*)$/, '$1U$2', 'U'],
			
					['all',
						/(?:^|\n)((?:[ ]|\t)*)(\d+|[a-zA-Z]+|[mdclxviMDCLXVI]+)([.\)][ ])(.*?)$/,
						function($0, $s, $1, $2, $3){ 
							if($1.match(/\d+/)){
								return $0+'\n'+$s+($1*1+1)+$2; 
							}
							else if($2==') ') {
								return $0+'\n'+$s+int2linum(linum2int($1)*1+1)+$2;
							} else {
								return $0+'\n'+$s+int2roman(roman2int($1)*1+1)+$2;
							}							
						},
						'numbered lists'
					],
					//['all', /((\d+)[.]\s.*?)$/, function($0, $1, $2){ return $1+"\n"+($2*1+1)+". ";}, 'simple numbered lists'],
					['all', /(^|\n)((?:[ ]|\t)*[*+->][ ])(.*?)$/, '$1$2$3\n$2', 'bulletlists or blockquotes'],
					['all', /((?:^|\n)[^\n]*?)\n(=+|-+)$/, function($0, $1, $2){ return $1+"\n"+$2.charAt(0).repeat($1.length-($1.charAt(0)=='\n'?1:0));}, 'Setext-style headers'],
					['all', /([_*`]{1,2})(?!\s)([^_*`]+)$/, '$1$2$1', 'markdown emphasis or codespan'],
					['all', /[\<]?((https?\:|ftps?\:|mailto\:|[-.\w]+\@)[^'">\s]*)$/, '<$1>', 'markdown auto url'],
					['all', /([!]?)\[([^\]]+)$/, '$1[$2]()', 'markdown (image)url complete'],
					['all', /<(a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blink|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h[1-6]|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|ul|var|video|wbr)([ ].*?)?(?:>(?:([^<>]*?)(<(\/((\1|\w+)(>)?)?)?)?)?)?$/, '<$1$2>$3</$1>', 'html tag complete'],
					['all',
						/(.*?[|].*?)\n(.*?[|].*?)$/,
						function ($0, $1, $2) {
							firstline = $1.split(/[|]/).reverse();
							secondline = $2.split(/[|]/).reverse();
						
							firstsmaller = firstline.length < secondline.length;
							while ((firstsmaller ? firstline : secondline).length < (!firstsmaller ? firstline : secondline).length) {
								(firstsmaller ? firstline : secondline).unshift('');
							}
							firstuebertrag = seconduebertrag = 0;
							firsttrenner = $1.match(/^[\|\-\:]*$/);
							secondtrenner = $2.match(/^[\|\-\:]*$/);
						
							$.each((firstline.length > secondline.length ? firstline : secondline), function (index, value) {
								firstline[index] = (typeof firstline[index] === "undefined" ? (firsttrenner ? '-' : ' ') : firstline[index].trim());
								secondline[index] = (typeof secondline[index] === "undefined" ? (firsttrenner ? '-' : ' ') : secondline[index].trim());
								letterdiff = (firstline[index].length + seconduebertrag) - (secondline[index].length + firstuebertrag);
						
								firstuebertrag = (letterdiff < 0 ? letterdiff * (-1) : 0);
								seconduebertrag = (letterdiff > 0 ? letterdiff * (+1) : 0);
								if (firstline[index].length > 0) {
									firstline[index] = firstline[index] + (firsttrenner ? '-' : ' ').repeat(firstuebertrag);
									firstuebertrag = 0;
								}
								if (secondline[index].length > 0) {
									secondline[index] = secondline[index] + (secondtrenner ? '-' : ' ').repeat(seconduebertrag);
									seconduebertrag = 0;
								}
							});
						
							return firstline.reverse().join('|') + '\n' + secondline.reverse().join('|');
						},
						'Table'
					],
					
					['all', /(\w+)'(\w+)$/, '$1’$2', 'apostrophe'],
					['all', /\.\.\.|\\ldots|\\mathellipsis$/, '…', 'ellipsis', 'auto'],
					['all', /–-|---|\\textemdash$/, '—', 'em-dash'],
					['all', /--|\\textendash$/, '–', 'en-dash'],
					['all', /\^a\^|\\textordfeminine$/, 'ª', 'feminine ordinal indicator'],
					['all', /\^o\^|\\textordmasculine$/, 'º', 'masculin ordinal indicator'],
					['all', /\^0\^$/, '⁰', 'superscript zero'],
					['all', /\^1\^$/, '¹', 'superscript one'],
					['all', /\^2\^$/, '²', 'superscript two'],
					['all', /\^3\^$/, '³', 'superscript three'],
					['all', /\^4\^$/, '⁴', 'superscript four'],
					['all', /\^5\^$/, '⁵', 'superscript five'],
					['all', /\^6\^$/, '⁶', 'superscript six'],
					['all', /\^7\^$/, '⁷', 'superscript seven'],
					['all', /\^8\^$/, '⁸', 'superscript eight'],
					['all', /\^9\^$/, '⁹', 'superscript nine'],
					['all', /\^-\^$/, '⁻', 'superscript minus'],
					['all', /\^=\^$/, '⁼', 'superscript equal'],
					['all', /\^\(\^$/, '⁽', 'superscript left parenthesis'],
					['all', /\^\)\^$/, '⁾', 'superscript right parenthesis'],
					['all', /\^+\^$/, '⁺', 'superscript plus sign'],
					['all', /\^n\^$/, 'ⁿ', 'superscript n'],

					['all', /\~0\~$/, '₀', 'subscript zero'],
					['all', /\~1\~$/, '₁', 'subscript one'],
					['all', /\~2\~$/, '₂', 'subscript two'],
					['all', /\~3\~$/, '₃', 'subscript three'],
					['all', /\~4\~$/, '₄', 'subscript four'],
					['all', /\~5\~$/, '₅', 'subscript five'],
					['all', /\~6\~$/, '₆', 'subscript six'],
					['all', /\~7\~$/, '₇', 'subscript seven'],
					['all', /\~8\~$/, '₈', 'subscript eight'],
					['all', /\~9\~$/, '₉', 'subscript nine'],
					['all', /\~i\~$/, 'ᵢ', 'subscript i'],
					['all', /\~r\~$/, 'ᵣ', 'subscript r'],
					['all', /\~u\~$/, 'ᵤ', 'subscript u'],
					['all', /\~v\~$/, 'ᵥ', 'subscript v'],
					['all', /\~a\~$/, 'ₐ', 'subscript a'],
					['all', /\~e\~$/, 'ₑ', 'subscript e'],
					['all', /\~o\~$/, 'ₒ', 'subscript o'],
					['all', /\~x\~$/, 'ₓ', 'subscript x'],
					['all', /\~schwa\~$/, 'ₔ', 'subscript schwa'],
					['all', /\~j\~$/, 'ⱼ', 'subscript j'],
					['all', /\~beta\~$/, 'ᵦ', 'subscript beta'],
					['all', /\~gamma\~$/, 'ᵧ', 'subscript gamma'],
					['all', /\~rho\~$/, 'ᵨ', 'subscript rho'],
					['all', /\~chi\~$/, 'ᵪ', 'subscript chi'],
					['all', /\~\+\~$/, '₊', 'subscript plus'],
					['all', /\~\-\~$/, '₋', 'subscript minus'],
					['all', /\~\=\~$/, '₌', 'subscript equals'],
					['all', /\~\(\~$/, '₍', 'subscript left parenthesis'],
					['all', /\~\)\~$/, '₎', 'subscript right parenthesis'],

					// http://theoval.cmp.uea.ac.uk/~nlct/latex/novices/symbols.html
					['all', /\~\!\~|\!`|\\textexclamdown$/, '¡', 'inverted exclamation mark'],
					['all', /\~\?\~|\?`|\\textquestiondown$/, '¿', 'inverted question mark'],

					['all', /1\/2$/, '½', ''],
					['all', /(-+>|\\rightarrow)$/, '→', 'rightwards arrow'],
					['all', /(=>|\\Rightarrow)$/, '⇒', 'rightwards double arrow'],
					['all', /==>$/, '⟹', 'long rightwards double arrow'],
					['all', /(‰%|%‰|%%%|\\textpertenthousand)$/i, '‱', 'per ten thousand sign'],
					['all', /(%%|\\textperthousand)$/i, '‰', 'per mille sign'],
					['all', /(\(c\)|\\copyright)$/i, '©', 'copyright sign'],
					['all', /\(R\)$/i, '®', 'registered sign'],
					['all', /\(P\)$/i, '℗', 'sound recording copyright'],
					['all', /\(tm\)|\\texttrademark$/i, '™', 'trade mark'],
					['all', /(N°|\\textnumero)$/i, '№', 'number sign'],
					['all', /\!\!$/, '‼', ''],
					['all', /\?\?$/, '⁇', ''],
					['all', /\?\!$/, '⁈', ''],
					['all', /\!\?$/, '⁉', ''],
					['all', /(\!\?\!|\\textinterrobang)$/, '‽', 'interrogbang'],
					['all', /(\!\?\!`|\\textinterrobangdown)$/, '⸘', 'inverted interrogbang'],
					['all', /\$\*$/, '·', 'middle dot'],
					['all', /(\$x|\\times)$/, '×', 'multiplication sign'],
					['all', /(\$:|\\div)$/, '÷', 'division sign'],
					['all', /\$-$/, '−', 'minus sign'],
					['all', /(\$?\+-|\\pm)$/, '±', 'plus-minus sign'],
					['all', /(\$?-\+|\\mp)$/, '∓', 'minus-or-plus sign'],
					['all', /(\$?<=|\\leq)$/, '≤', 'less-than or equal to'],
					['all', /(\$?>=|\\geq)$/, '≥', 'greater-than or equal to'],
					['all', /\^_$/, '¯', 'macron'],
					['all', /\\alpha$/, 'α', 'alpha'],
					['all', /\\beta$/, 'β', ''],
					['all', /\\gamma$/, 'γ', ''],
					['all', /\\delta$/, 'δ', ''],
					['all', /\\epsilon$/, '', ''],
					['all', /\\varepsilon$/, 'ε', ''],
					['all', /\\zeta$/, 'ζ', ''],
					['all', /\\eta$/, 'η', ''],
					['all', /\\theta$/, 'θ', ''],
					['all', /\\vartheta$/, '', ''],
					['all', /\\kappa$/, 'κ', ''],
					['all', /\\lambda$/, 'λ', ''],
					['all', /(\\mu|\\micro)$/, 'µ', ''],
					['all', /\\nu$/, 'ν', ''],
					['all', /\\xi$/, 'ξ', ''],
					['all', /\\pi$/, 'π', ''],
					['all', /\\varpi$/, '', ''],
					['all', /\\rho$/, 'ρ', ''],
					['all', /\\varrho$/, '', ''],
					['all', /\\sigma$/, 'σ', ''],
					['all', /\\varsigma$/, '', ''],
					['all', /\\tau$/, 'τ', ''],
					['all', /\\upsilon$/, 'υ', ''],
					['all', /\\phi$/, 'φ', ''],
					['all', /\\varphi$/, '', ''],
					['all', /\\chi$/, 'χ', ''],
					['all', /\\psi$/, 'ψ', ''],
					['all', /\\omega$/, 'ω', ''],
					['all', /\\Gamma$/, 'Γ'],
					['all', /\\Delta$/, '∆'],
					['all', /\\Theta$/, 'Θ'],
					['all', /\\Lambda$/, 'Λ'],
					['all', /\\Xi$/, 'Ξ'],
					['all', /\\Pi$/, 'Π'],
					['all', /\\Sigma$/, 'Σ'],
					['all', /\\Upsilon$/, 'Υ'],
					['all', /\\Phi$/, 'Φ'],
					['all', /\\Psi$/, 'Ψ'],
					['all', /(\\Omega|\\ohm)$/, 'Ω'],
					
					['all', /\\aa$/, 'å'],
					['all', /\\AA$/, 'Å'],
					['all', /\\DH$/, 'Ð'],
					['all', /\\dh$/, 'ð'],
					['all', /\\DJ$/, 'Ð'],
					['all', /\\dj$/, 'đ'],
					['all', /\\o$/, 'ø'],
					['all', /\\O$/, 'Ø'],
					['all', /\\ss$/, 'ß'],
					['all', /\\NG$/, 'Ŋ'],
					['all', /\\ng$/, 'ŋ'],
					['all', /\\TH$/, 'Þ'],
					['all', /\\th$/, 'þ'],
					['all', /\\L$/, 'Ł'],
					['all', /\\l$/, 'ł'],
					['all', /\\(`|grave){a}$/, 'à',		'grave accent'],
					['all', /\\('|acute){a}$/, 'á', 'acute accent'],
					['all', /\\(\^|hat){a}$/, 'â', 'circumflex'],
					['all', /(\\("|ddot){a}|ä)$/, 'ä', 'umlaut or dieresis'],	
					['all', /\\(~|tilde){a}$/, 'ã', 'tilde'],
					['all', /\\k{a}$/, 'ą', 'ogonek'],
					['all', /\\(=|bar){a}$/, 'ā', 'macron accent (a bar over the letter)'],
					['all', /\\(\.|dot){a}$/, 'ȧ', 'dot over the letter'],
					['all', /\\d{a}$/, 'ạ', 'dot under the letter'],
					['all', /\\(r{a}|aa|{aa})$/, 'å', 'ring over the letter (for å there is also the special command \{aa})'],
					['all', /\\(u|breve){a}$/, 'ă', 'breve over the letter'],
					['all', /\\(v|check){a}$/, 'ǎ', 'caron/hacek ("v") over the letter'],
					
					['all', /\\b{b}$/, 'ḇ', 'b line below'],
					['all', /\\(\.|dot){b}$/, 'ḃ', 'b dot above'],
					['all', /\\d{b}$/, 'ḅ', 'b dot below'],
					
					/*
					['all', /\\(`|grave){o}$/, 'ò',		'grave accent'],
					['all', /\\('|acute){o}$/, 'ó', 'acute accent'],
					['all', /\\(\^|hat){o}$/, 'ô', 'circumflex'],
					['all', /\\("|ddot){o}$/, 'ö', 'umlaut or dieresis'],
					['all', /\\H{o}$/, 'ő', 'long Hungarian umlaut (double acute)'],
					['all', /\\(~|tilde){o}$/, 'õ', 'tilde'],
					['all', /\\c{c}$/, 'ç', 'cedilla'],
					['all', /\\k{a}$/, 'ą', 'ogonek'],
					['all', /\\l$/,		'ł', 'l with stroke'],
					['all', /\\(=|bar){o}$/, 'ō', 'macron accent (a bar over the letter)'],
					['all', /\\b{o}$/, 'o', 'bar under the letter'],
					['all', /\\(\.|dot){o}$/, 'ȯ', 'dot over the letter'],
					['all', /\\d{u}$/, 'ụ', 'dot under the letter'],
					['all', /\\r{a}$/, 'å', 'ring over the letter (for å there is also the special command \{aa})'],
					['all', /\\(u|breve){o}$/, 'ŏ', 'breve over the letter'],
					['all', /\\(v|check){s}$/, 'š', 'caron/hacek ("v") over the letter'],
					*/
					['all', /"\+E$/, 'Ë', 'E diaeresis'],
					['all', /"\+e$/, 'ë', 'e diaeresis'],
					['all', /"\+a$/, 'ä', 'a diaeresis'],
					['all', /"\+A$/, 'Ä', 'A diaeresis'],
					['all', /"\+o$/, 'ö', 'a diaeresis'],
					['all', /"\+O$/, 'Ö', 'A diaeresis'],
					['all', /"\+u$/, 'ü', 'u diaeresis'],
					['all', /"\+U$/, 'Ü', 'U diaeresis'],
					['all', /\\t{(.)(.)}$/, '$1͡$2', '"tie" (inverted u) over the two letters'], 

					['eng', /dont$/, 'don’t'],				  
					['eng', /doesnt$/, 'doesn’t'],
					['eng', /hasnt$/, 'hasn’t'],
					['eng', /havent$/, 'haven’t'],
					['eng', /isnt$/, 'isn’t'],
					['eng', /arent$/, 'aren’t'],
					['eng', /wasnt$/, 'wasn’t'],
					['eng', /werent$/, 'weren’t'],
					['eng', /hadnt$/, 'hadn’t'],
					['eng', /cant$/, 'can’t'],
					['eng', /couldnt$/, 'couldn’t'],
					['eng', /wouldnt$/, 'wouldn’t'],
					
					['fra', /francais$/, 'français'],
					
					// thanks to [freefighter](http://tatoeba.org/deu/user/profile/freefighter) for the turkish replacement patterns!
					["tur", /akşam üstü$/, "akşamüstü"],
					["tur", /alı koymak$/, "alıkoymak"],
					["tur", /anbar$/, "ambar"],
					["tur", /anfi$/, "amfi"],
					["tur", /antreman$/, "antrenman"],
					["tur", /ara söz$/, "arasöz"],
					["tur", /ara yön$/, "arayön"],
					["tur", /arasıra$/, "ara sıra"],
					["tur", /ardısıra$/, "ardı sıra"],
					["tur", /arzetmek$/, "arz etmek"],
					["tur", /ayak üstü$/, "ayaküstü"],
					["tur", /ayırdetmek$/, "ayırt etmek"],
					["tur", /ayidat$/, "aidat"],
					["tur", /baş vurma$/, "başvurmak"],
					["tur", /baş vurmak$/, "başvurmak"],
					["tur", /bilimum$/, "bilumum"],
					["tur", /bir az$/, "biraz"],
					["tur", /bir çok şey$/, "birçok şey"],
					["tur", /bir kaç şey$/, "birkaç şey"],
					["tur", /birçok$/, "bir çok"],
					["tur", /birgün$/, "bir gün"],
					["tur", /birşey$/, "bir şey"],
					["tur", /canbaz$/, "cambaz"],
					["tur", /çenber$/, "çember"],
					["tur", /deynek$/, "değnek"],
					["tur", /direk$/, "direkt"],
					["tur", /egsoz$/, "egzoz"],
					["tur", /eksoz$/, "egzoz"],
					["tur", /entellektüel$/, "entelektüel"],
					["tur", /eşortman$/, "eşofman"],
					["tur", /farketmek$/, "fark etmek"],
					["tur", /haketmek$/, "hak etmek"],
					["tur", /harfiyat$/, "hafriyat"],
					["tur", /herbiri$/, "her biri"],
					["tur", /hergün$/, "her gün"],
					["tur", /herhangibiri$/, "herhangi biri"],
					["tur", /herkez$/, "herkes"],
					["tur", /herşey$/, "her şey"],
					["tur", /heryer$/, "her yer"],
					["tur", /hiç bir şey$/, "hiçbir şey"],
					["tur", /hiçbirşey$/, "hiçbir şey"],
					["tur", /hiçkimse$/, "hiç kimse"],
					["tur", /hoşçakal$/, "hoşça kal"],
					["tur", /ızdırap$/, "ıstırap"],
					["tur", /insiyatif$/, "inisiyatif"],
					["tur", /kiprik$/, "kirpik"],
					["tur", /kirbit$/, "kibrit"],
					["tur", /kordalye$/, "kurdele"],
					["tur", /laboratuar$/, "laboratuvar"],
					["tur", /makina$/, "makine"],
					["tur", /matba$/, "matbaa"],
					["tur", /metod$/, "metot"],
					["tur", /meyva$/, "meyve"],
					["tur", /muhafiyet$/, "muafiyet"],
					["tur", /muhattap$/, "muhatap"],
					["tur", /muhtacolmak$/, "muhtaç olmak"],
					["tur", /mütevazi$/, "mütevazı"],
					["tur", /orjinal$/, "orijinal"],
					["tur", /ön görmek$/, "öngörmek"],
					["tur", /pardesü$/, "pardösü"],
					["tur", /pekaz$/, "pek az"],
					["tur", /pekçok$/, "pek çok"],
					["tur", /peşisıra$/, "peşi sıra"],
					["tur", /pilaj$/, "plaj"],
					["tur", /poaça$/, "poğaça"],
					["tur", /sandoviç$/, "sandviç"],
					["tur", /sırıl sıklam$/, "sırılsıklam"],
					["tur", /suç üstü$/, "suçüstü"],
					["tur", /süpriz$/, "sürpriz"],
					["tur", /şartel$/, "şalter"],
					["tur", /şarz$/, "şarj"],
					["tur", /şehidolmak$/, "şehit olmak"],
					["tur", /tazik$/, "tazyik"],
					["tur", /tazzik$/, "tazyik"],
					["tur", /terketmek$/, "terk etmek"],
					["tur", /traş$/, "tıraş"],
					["tur", /vaadetmek$/, "vaat etmek"],
					["tur", /var saymak$/, "varsaymak"],
					["tur", /vaz geçmek$/, "vazgeçmek"],
					["tur", /ve ya$/, "veya"],
					["tur", /vijdan$/, "vicdan"],
					["tur", /ya hut$/, "yahut"],
					["tur", /yada$/, "ya da"],
					["tur", /yalnış$/, "yanlış"],
					["tur", /yanısıra$/, "yanı sıra"],
					["tur", /yanlız$/, "yalnız"],
					["tur", /zatüre$/, "zatürree"],
					["tur", /zatürre$/, "zatürree"],
					["tur", /allah$/, "Allah"],
					["tur", /af et$/, "affet"],
					["tur", /aferim$/, "aferin"],
					["tur", /bişey$/, "bir şey"],
					["tur", /bi$/, "bir"],
					["tur", /biliyo musun$/, "biliyor musun"],
					["tur", /biliyomusun$/, "biliyor musun"],
					["tur", /burda$/, "burada"],
					["tur", /buda$/, "bu da"],
					["tur", /bugun$/, "bugün"],
					["tur", /bu gün$/, "bugün"],
					["tur", /başed$/, "baş ed"],
					["tur", /başet$/, "baş et"],
					["tur", /bir çok$/, "birçok"],
					["tur", /bir çoğ$/, "birçoğ"],
					["tur", /bukadar$/, "bu kadar"],
					["tur", /belkide$/, "belki de"],
					["tur", /bayağa$/, "bayağı"],
					["tur", /bikaç$/, "bir kaç"],
					["tur", /biryer$/, "bir yer"],
					["tur", /birazda$/, "biraz da"],
					["tur", /miyeceğ$/, "meyeceğ"],
					["tur", /birkere$/, "bir kere"],
					["tur", /barış sever$/, "barışsever"],
					["tur", /çünki$/, "çünkü"],
					["tur", /cagım$/, "cağım"],
					["tur", /cegim$/, "ceğim"],
					["tur", /çokta$/, "çok da"],
					["tur", /çoksatan$/, "çok satan"],
					["tur", /cok$/, "çok"],
					["tur", /dahamı$/, "daha mı"],
					["tur", /dahada$/, "daha da"],
					["tur", /değermi$/, "değer mi"],
					["tur", /degermi$/, "değer mi"],
					["tur", /dakka$/, "dakika"],
					["tur", /dogru$/, "doğru"],
					["tur", /degil$/, "değil"],
					["tur", /etmeliyimki$/, "etmeliyim ki"],
					["tur", /eger$/, "eğer"],
					["tur", /elbetteki$/, "elbette ki"],
					["tur", /geceyarısı$/, "gece yarısı"],
					["tur", /gördünmü$/, "gördün mü"],
					["tur", /görmiy$/, "görmey"],
					["tur", /hiçbiryere$/, "hiçbir yere"],
					["tur", /her hangi$/, "harhangi"],
					["tur", /herne$/, "her ne"],
					["tur", /haket$/, "hak et"],
					["tur", /hadi$/, "haydi"],
					["tur", /hazir misin$/, "hazır mısın"],
					["tur", /haftasonu$/, "hafta sonu"],
					["tur", /hayir$/, "hayır"],
					["tur", /hiçbirsey$/, "hiçbir şey"],
					["tur", /hicbirsey$/, "hiçbir şey"],
					["tur", /hersey$/, "her şey"],
					["tur", /hatirla$/, "hatırla"],
					["tur", /herzaman$/, "her zaman"],
					["tur", /hastene$/, "hastane"],
					["tur", /hiçbirseye$/, "hiçbir seye"],
					["tur", /hicbir$/, "hiçbir"],
					["tur", /hzt$/, "hz"],
					["tur", /hıristiyan$/, "Hristiyan"],
					["tur", /hiristiyan$/, "Hristiyan"],
					["tur", /istermiydin$/, "ister miydin"],
					["tur", /içişler$/, "iç işler"],
					["tur", /lslak$/, "Islak"],
					["tur", /istesende$/, "istesen de"],
					["tur", /İşden$/, "İşten"],
					["tur", /istermisin$/, "ister misin"],
					["tur", /ikisinide$/, "ikisini de"],
					["tur", /İsaya$/, "İsa'ya"],
					["tur", /icin$/, "için"],
					["tur", /İlerde$/, "İleride"],
					["tur", /ikimizde$/, "ikimiz de"],
					["tur", /kiz kardes$/, "kız kardeş"],
					["tur", /kızkardes$/, "kız kardeş"],
					["tur", /mışdı$/, "mıştı"],
					["tur", /mişdi$/, "mişti"],
					["tur", /mahfol$/, "mahvol"],
					["tur", /mahfet$/, "mahvet"],
					["tur", /mağruz$/, "maruz"],
					["tur", /mütesekkir$/, "müteşekkir"],
					["tur", /mutesekkir$/, "müteşekkir"],
					["tur", /mr$/, "Mr."],
					["tur", /nerde$/, "nerede"],
					["tur", /naber$/, "n'aber"],
					["tur", /orda$/, "orada"],
					["tur", /oto yol$/, "otoyol"],
					["tur", /olcak$/, "olacak"],
					["tur", /onuda$/, "onu da"],
					["tur", /papayi$/, "Papayı"],
					["tur", /planli$/, "planlı"],
					["tur", /super$/, "süper"],
					["tur", /şuanda$/, "şu anda"],
					["tur", /suanda$/, "şu anda"],
					["tur", /senle$/, "seninle"],
					["tur", /şindi$/, "şimdi"],
					["tur", /secim$/, "seçim"],
					["tur", /sefkat$/, "şefkat"],
					["tur", /sevkat$/, "şefkat"],
					["tur", /sınırdışı$/, "sınır dışı"],
					["tur", /tamammı$/, "tamam mı"],
					["tur", /taktir$/, "takdir"],
					["tur", /tabiki$/, "tabii ki"],
					["tur", /tanrı$/, "Tanrı"],
					["tur", /tanemi$/, "tane mi"],
					["tur", /tabi$/, "tabii"],
					["tur", /tanri$/, "Tanrı"],
					["tur", /tesekkürler$/, "teşekkürler"],
					["tur", /tesekkurler$/, "teşekkürler"],
					["tur", /tamam mi$/, "tamam mı"],
					["tur", /tesekkür$/, "teşekkür"],
					["tur", /ulaşamak$/, "ulaşmak"],
					["tur", /üc$/, "üç"],
					["tur", /vaz geç$/, "vazgeç"],
					["tur", /vaz geçm$/, "vazgeçm"],
					["tur", /, ve$/, " ve"],
					["tur", /yinede$/, "yine de"],
					["tur", /yoket$/, "yok et"],
					["tur", /yoked$/, "yok ed"],
					["tur", /yapmıyacağım$/, "yapmayacağım"],
					["tur", /yapıyım$/, "yapayım"],
					["tur", /ingiltere$/, "İngiltere"],
					["tur", /almanya$/, "Almanya"],
					["tur", /ivan$/, "Ivan"],
					["tur", /japon$/, "Japon"],
					["tur", /tokyo$/, "Tokyo"],
					
					['all', /variante$/, 'variante eins', 'test'],
					['all', /variante$/, 'variente zwei', 'test'],
				];

				autocorrect.find('tr').remove();
				apply.unbind('click').html('');
				
				//ac_select.append($('<option class="default">_</option>').attr('html', '<span class="before"></span><span class="gets"> → </span><span class="after"></span>'));
		
				
				// keycodes: http://asquare.net/javascript/tests/KeyCode.html
						
				// http://stackoverflow.com/questions/3977642/how-to-know-if-keyup-is-a-character-key-jquery
				//var c= String.fromCharCode(event.keyCode);
				//var isWordcharacter = c.match(/\w/);
				
				//console.time("replacement");
				replacements = 0;
				$.each(replacementarray, function (index, regexparray) {
					if(regexparray[0]=='all' || regexparray[0]==markeditlang){
						match = (state.beforeSelect + state.select).match(regexparray[1]);
						if (match) {
							replacements ++;
							/*if(regexparray[4]=='auto' && (isWordcharacter || event.keyCode == "32") ){
								state.beforeSelect = (state.beforeSelect + state.select).replace(regexparray[1], regexparray[2]);
								state.select = "";
								
								thismarkeditor.markeditSetState(state);
								thismarkeditor.keyup();
							}
							else*/
							if(regexparray[4]!='never'){
								
								// reference is the old one, compareto is the new one
								reference = match[0];
								compareto = match[0].replace(regexparray[1], regexparray[2]);
								// initialize the diff_match_patch
								var dmp = new diff_match_patch();
								dmp.Diff_Timeout = 1;
								// compare them
								var d = dmp.diff_main(reference, compareto);
								// this makes it readable
								dmp.diff_cleanupSemantic(d);
								
																
								if(replacements>1){
									line = $('<tr></tr>');
									cell = $('<a></a>').css({'display':'table-cell'}).button();
									autocorrect.append(line.append(cell));
								}
								
								(replacements==1 ? apply : cell).html('<span class="patch"><span class="before">'+dmp.diff_prettyHtml(d)+'</span><span class="gets"> → </span><span class="after">'+dmp.diff_prettyHtml(d)+'</span></span>').bind("click", function () {
									state.beforeSelect = (state.beforeSelect + state.select).replace(regexparray[1], regexparray[2]);
									state.select = "";
									thismarkeditor.markeditSetState(state);
									thismarkeditor.trigger('keyup');
									//thismarkeditor.trigger('input');
								});
							}
						}
					}
				});
				//console.timeEnd("replacement");
				$(element).html($(this).markeditGetHtml());

			}
		});
		$(textarea).bind('updated', function () {
			$(element).html($(this).markeditGetHtml());
		});

		// Load initial value
		$(element).html($(this).markeditGetHtml());
	};

	// prepare the link toggle button
	// this should toggle between endnote and inline link
	// doesn'T work at all yet
	//$.extend($.markedit(), blah : function(){alert('didit');});

	// enable MarkEdit with live preview 
	$('#SentenceCommentText, #WallContent, #UserDescription, #PrivateMessageContent').addClass('markedittextarea').markedit({
		'preview': 'below',
		'toolbar': {
			'backgroundMode': 'light',
			'layout': 'bold italic | link quote code image | numberlist bulletlist heading line | cite-sentence',
			'buttons': [{
				// prepare the link toggle button
				// this should toggle between endnote and inline link
				// doesn'T work at all yet
				'id': 'linktoggle',
				'css': 'icon ui-state-default ui-corner-all',
				//ui-icon ui-icon-transferthick-e-w
				'tip': 'click to toggle between endnote style and inline style',
				'click': function () {
					//markedit = $(this).parentsUntil('.markedit').parent();
					//markedit.markeditSetLinkOrImage('http://example.com');
				},
				'mouseover': function () {},
				'mouseout': function () {}
			}, {
				'id': 'cite-sentence',
				'css': 'icon ui-state-default ui-corner-all',
				//ui-icon ui-icon-transferthick-e-w
				'tip': 'cite the main sentence',
				'click': function () {
					//find the textarea
					thetextarea = $('.markedittextarea');
					state = thetextarea.markeditGetState();

					// insert sentence citation (the selection will be the proposed change;
					// if it's empty the whole sentence will be copied)
					state.beforeSelect = state.beforeSelect + '"' + $('.mainSentence .sentenceContent .text').text() + '" → "';
					state.select = (state.select == "" ? $('.mainSentence .sentenceContent .text').text() : state.select);
					state.afterSelect = '"' + state.afterSelect;

					thetextarea.markeditSetState(state);
				},
				'mouseover': function () {},
				'mouseout': function () {}
			}],
		}
	});

	profile = (window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile');

	if (profile == true) {
		user = $('.profileSummary .username').text().trim();
	} else {
		user = '_';
	}

	$('.comments .commentText, .wall .message .body, .profileDescription .content, .privateMessage .body').each(function () {

		// determine the author of a comment or post
		if (profile == true) {
			author = user;
		} else {
			author = $(this).parentsUntil('li').parent().find('.meta .author:first').text().trim();
		}
		GM_log(author);
		text = $(this).html();

		// trim leading and trailing whitespace to avoid interpretation like code-blocks  
		if($(this).is('.commentText')){
			text = text.substring(9, text.length-8);
		}
		else if($(this).parent().is('.root')){
			text = text.substring(16, text.length-14);
		}
		else if($(this).parent().is('.privateMessage')){
			text = text.substring(9, text.length-8);
		}
		else if($(this).parentsUntil('.replies').parent().is('.replies')){
			text = text.substring(17, text.length-12);
		}


		text = text.replace(/<br\/?>/g,'');
		$(this).html(text);
		
		

		// prepare for parsing:
		text = Pandoc(tatoedown(tatoebaundo(text)));

		// old parsing
		// MarkEditShowDown = new Attacklab.showdown.converter();
		// parsedmarkdown = $('<div class="parsedmarkdown"></div>').html(MarkEditShowDown.makeHtml(text));

		// create the new element
		parsedmarkdown = $('<div class="parsedmarkdown"></div>').html(text);
		// copy the CSS classes to the new element
		parsedmarkdown.addClass($(this).attr("class")).hide();
		// hide the new element and put it below the original 
		var pre = $(this);
		pre.after(parsedmarkdown);
		pre = pre.changeElementType("pre");
		pre.addClass('unparsedmarkdown');
		
		// add classes for later control of visibility
		//GM_log(markdownusers[author]);
		if (markdownusers[author] == true) {
			pre.addClass('md_force');
			parsedmarkdown.addClass('md_force');
		} else if (markdownusers[author] == false) {
			pre.addClass('md_deny');
			parsedmarkdown.addClass('md_deny');
		} else {
			pre.addClass('md_normal');
			parsedmarkdown.addClass('md_normal');
		}
	});

	// This mark was designed by Dustin Curtis, a villain. http://twitter.com/dcurtis
	markdownmark_normal = '<?xml version="1.0" encoding="utf-8"?> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="14" viewBox="0 0 208 128" style="vertical-align: text-bottom;" class="markdownmark normal"> <rect style="fill:none;stroke:white;stroke-width:10" width="198" height="118" x="5" y="5" ry="10" /> <path style="fill:white" d="m 30,98 0,-68 20,0 20,25 20,-25 20,0 0,68 -20,0 0,-39 -20,25 -20,-25 0,39 z" /> <path style="fill:white" d="m 155,98 -30,-33 20,0 0,-35 20,0 0,35 20,0 z" /> </svg>';
	markdownmark_solid = '<?xml version="1.0" encoding="utf-8"?> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="14" viewBox="0 0 208 128" style="vertical-align: text-bottom;" class="markdownmark solid"> <path d="M 15,0 C 6.7764862,0 0,6.7764862 0,15 l 0,98 c 0,8.22351 6.7764862,15 15,15 l 178,0 c 8.22351,0 15,-6.77649 15,-15 l 0,-98 C 208,6.7764862 201.22351,0 193,0 L 15,0 z m 15,30 20,0 20,25 20,-25 20,0 0,68 -20,0 0,-39 -20,25 -20,-25 0,39 -20,0 0,-68 z m 115,0 20,0 0,35 20,0 -30,33 -30,-33 20,0 0,-35 z" style="fill:white;" /> </svg>';
	
	// create a toggle "button" for switching between "on" and "all off"
	md_button = $('<a class="menuSection" id="md_button"><span class="state"></span>md<span id="mduser"></span></a>');
	md_button.html(markdownmark_normal);
	// add it a list called "menu"
	menu = $('<li id="md"></li>').append(md_button);
	// put it before the user menu in the navigation bar
	$('#user_menu > ul').prepend(menu);

	// the toggle function
	md_button.click(function () {
		GM_log('md_button click');
		// get saved variables
		markdownusers = GM_getValue('markdownusers');	
		markdownusers = markdownusers || default_markdownusers;
		markdownusers = $.evalJSON(markdownusers);
		console.log('markdownusers: ' + $.toJSON(markdownusers));
		// the '#' variable represents the on or all-off toggle
		// if the current state was "on" switch to "all-off"
		if (markdownusers['#'] == true) {
			GM_log('all-off');
			// hide all parsed stuff in "all-off" state
			$('.parsedmarkdown, .markedit-preview').hide();
			$('.unparsedmarkdown').show();
			// update the button
			$('.state').html(markdownmark_solid);
			$('#md_button').html(markdownmark_solid);
			// for saving the state
			markdownusers['#'] = false;
		}
		// if the current state was "all-off", or not set, switch to "on"
		else {
			GM_log('on');
			// switch the parsing on according to the current mode
			if (markdownusers['_'] == true) {
				$('.md_force').toggle();
			} else if (markdownusers['_'] == false) {
				$('.md_force, .md_normal, .md_deny').toggle();
			} else {
				$('.md_force, .md_normal').toggle();
			}
			// the preview shows in all modes when state is on
			$('.markedit-preview').show();
			// update the button
			$('.state').html(markdownmark_normal);
			$('#md_button').html(markdownmark_normal);
			// for saving the state
			markdownusers['#'] = true;
		}
		// save the new state
		GM_setValue('markdownusers', $.toJSON(markdownusers));
	});

	// create the mode switcher links
	md_force = $('<li><a id="md_force"><span class="state"></span> !</a></li>');
	md_normal = $('<li><a id="md_normal"><span class="state"></span> .</a></li>');
	md_deny = $('<li><a id="md_deny"><span class="state"></span> /</a></li>');

	// create the mode switch list
	list = $('<ul class="sub-menu"></ul>');
	// add the mode switcher links to the mode switch list and put it to the menu
	menu.append(list.append(md_force, md_normal, md_deny));

	// switch to "md_force" mode: only contributions by opt-in users will be parsed
	md_force.click(function () {
		GM_log('md_force click');
		if (profile == true) {
			markdownusers[author] = true;
		} else {
			markdownusers['_'] = true;
		}
		// save the new mode
		GM_setValue('markdownusers', $.toJSON(markdownusers));
		$('#md_normal, #md_normal, #md_deny').parent().show();
		$('#md_force').attr('disabled', 'disabled');
		$('#md_normal, #md_deny').removeAttr('disabled');
		$('#mduser').text("!");
		// click twice to unset and reset, so the navigation menu shows the right state
		md_button.click().click();
	});
	// switch to "md_normal" mode: all contributions except the opt-out users will be parsed
	md_normal.click(function () {
		GM_log('md_normal click');
		if (profile == true) {
			delete markdownusers[author];
		} else {
			delete markdownusers['_'];
		}
		// save the new mode
		GM_setValue('markdownusers', $.toJSON(markdownusers));
		$('#md_normal, #md_normal, #md_deny').parent().show();
		$('#md_normal').attr('disabled', 'disabled');
		$('#md_force, #md_deny').removeAttr('disabled');
		$('#mduser').text(".");
		// click twice to unset and reset, so the navigation menu shows the right state
		md_button.click().click();
	});
	// switch to "md_deny" mode: all contributions, even the opt-out users, will be parsed
	md_deny.click(function () {
		GM_log('md_deny click');
		if (profile == true) {
			markdownusers[author] = false;
		} else {
			markdownusers['_'] = false;
		}
		// save the new mode
		GM_setValue('markdownusers', $.toJSON(markdownusers));
		$('#md_normal, #md_normal, #md_deny').parent().show();
		$('#md_deny').attr('disabled', 'disabled');
		$('#md_force, #md_normal').removeAttr('disabled');
		$('#mduser').text("/");
		// click twice to unset and reset, so the navigation menu shows the right state
		md_button.click().click();
	});

	if (profile == true) {
		if (markdownusers[author] === true) {
			md_force.click();
		} else if (markdownusers[author] === false) {
			md_deny.click();
		} else {
			md_normal.click();
		}
		$('#md_normal, #md_normal, #md_deny, #md_button').css({
			'font-style': 'italic'
		});
	} else {
		if (markdownusers['_'] === true) {
			md_force.click();
		} else if (markdownusers['_'] === false) {
			md_deny.click();
		} else {
			md_normal.click();
		}

	}
}