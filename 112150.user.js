// ==UserScript==
// @name           Ping's Glitch @Reply and Quotes Helper
// @namespace      http://beta.glitch.com/profiles/PIF6RN35T3D1DT2/
// @include        http://www.glitch.com/groups/*
// @include        http://www.glitch.com/forum/*
// @match          http://www.glitch.com/groups/*
// @match          http://www.glitch.com/forum/*
// @require        http://updater.usotools.co.cc/112150.js
// @description    Lets you @reply and quote posts in group and forum threads. Version 0.2
// ==/UserScript==

(function() {

if (window.top != window.self)  { return; }	// block double-loading of script because of iframes

var script, style;
function injectTweakScript(tweakFn) {
	script = document.createElement('script');
	script.appendChild(document.createTextNode('(' + tweakFn + ')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}

function atReply() {
	// Get user selection text on page
	function getSelectedText() {
		if (window.getSelection) {
			return window.getSelection();
		}
		else if (document.selection) {
			return document.selection.createRange().text;
		}
		return '';
	}
	// Jump to bottom of page to the reply field
	function jumpToPreview() {
		var target_top = $('#preview').offset().top;
		$('html, body').animate({scrollTop:target_top}, 300);
	}
	// Inject generated text into reply field
	function appendToReplyField(text) {
		var existing = '';
		if ($('iframe.rte').length > 0) { existing = $('iframe.rte').contents().find('body').html(); }
		if ($('textarea.rte').length > 0) { existing = $('textarea.rte').val(); }
		text = (existing.length > 0 ? existing + ' ' : '') + text;
		
		if ($('iframe.rte').length > 0) {
			$('iframe.rte').contents().find('body').html(text).focus();
		}
		if ($('textarea.rte').length > 0) {
			$('textarea.rte').val(text).focus();
		}
	}
	$(document).ready(function() {
		$.each($('div.reply div.minor, div.topic div.minor, li.reply div.minor'), function(idx, item) {
			var replyMinor = $(item);
			var replyID = replyMinor.parent().attr('id');
			var poster = replyMinor.find('a:first-child');
			var posterName = poster.html();	
			var posterProfile = poster.attr('href');
			
			var replyLink = $('<a title="Append @' + posterName + ' to your reply" href="javascript: void(0);">@Reply</a>').click(function() {
				var replyText = '@<a href="' + document.location.protocol + '//' + document.location.host + posterProfile + '">' + posterName + '</a>: ';
				appendToReplyField(replyText);
				jumpToPreview();
			});
			replyMinor.append(' | ').append(replyLink);
			
			// Insert selected text as a quote
			var quoteLink = $('<a title="Append selected text as a quote" href="javascript: void(0);">Quote</a>').click(function() {
				var quoteText = getSelectedText();
				if (quoteText == '') { alert('Please select some text for quoting!'); return; }
				quoteText = ''
					+ '<a href="' + document.location.protocol + '//' + document.location.host + document.location.pathname + '#' + replyID + '">' + posterName + ' wrote</a>: ' 
					+ '<i>' + quoteText + '</i>'
					+ '<br><br>';
				appendToReplyField(quoteText);
				jumpToPreview();
			});
			replyMinor.append(' | ').append(quoteLink);
			
		});	// $.each($('div.reply div.minor')		
	});	// $(document).ready
}

// Forum thread
if (document.location.pathname.match(/\/forum\/[a-z]+\/[0-9]+\//)) { injectTweakScript(atReply); }
// Group thread
if (document.location.pathname.match(/\/groups\/[A-Z,0-9]+\/discuss\/[0-9]+\//)) { injectTweakScript(atReply); }

})();