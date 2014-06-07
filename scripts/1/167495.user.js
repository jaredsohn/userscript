// ==UserScript==
// @name        Emoticon Counter
// @namespace   silvershadow
// @description Counts the number of emoticons in the current comment, to help you avoid going over the limit of twenty.
// @include     http://www.fimfiction.net/story/*
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       GM_registerMenuCommand
// ==/UserScript==

window = unsafeWindow;

allEmotes = [];
comment = {};
emotePanel = false;

function getEmoticons(evt) {
	var content = comment.textarea.val();
	var emoticons = 0;
	for (var n = 0; n < allEmotes.length; n++) {
		var _ = content.match(new RegExp(':' + allEmotes[n] + ':', "g"));
		if (_) {
			emoticons += _.length;
		}
	}
	if (emoticons != comment.emoticons) {
		comment.emoticons = emoticons;
		comment.emoteCount.html('<span style="color: ' + (emoticons < 7 ? 'purple; font-size: x-small' : emoticons < 14 ? 'green; font-size: small' : emoticons < 20 ? 'orange' : emoticons == 20 ? '#FF1493; font-size: large' : 'red; font-size: x-large') + ';">Emote count: ' + emoticons + '</span>');
	}
}

$(function() {
	console.groupCollapsed("Emoticons");
	console.info("Scanning emoticons");
	$('form#add_comment_form div.emoticons_panel div.inner_padding a').each(function() {
		var href = this.href;
		var _ = href.match(/smilie\(':(\S+):'\)/);
		if (_) {
			console.log("Emote #" + allEmotes.push(_[1]) + ": " + _[1]);
			this.onclick = function() {
				// One of them HAS to catch it at the right time! *mentally unbalanced laughter*
				setTimeout(function() { comment.textarea.trigger('change'); }, 50);
				setTimeout(function() { comment.textarea.trigger('change'); }, 100);
				setTimeout(function() { comment.textarea.trigger('change'); }, 150);
				setTimeout(function() { comment.textarea.trigger('change'); }, 200);
				setTimeout(function() { comment.textarea.trigger('change'); }, 250);
				setTimeout(function() { comment.textarea.trigger('change'); }, 300);
				setTimeout(function() { comment.textarea.trigger('change'); }, 350);
				setTimeout(function() { comment.textarea.trigger('change'); }, 400);
				setTimeout(function() { comment.textarea.trigger('change'); }, 450);
				setTimeout(function() { comment.textarea.trigger('change'); }, 500);
			};
		}
		else {
			console.warn('Couldn\'t extract emoticon code from "' + href + '"');
		}
	});
	console.info("Done");
	console.groupEnd();
	$('form#add_comment_form div.emoticons_panel').css('position', 'relative').append('<div id="comment_emote_count"></div>');
	comment = {
		textarea: $('textarea#comment_comment'),
		preview: $('div#comment_preview'),
		content: '',
		emoticons: -1,
		emoteCount: $('form#add_comment_form div.emoticons_panel div#comment_emote_count'),
	};
	comment.emoteCount.attr('style', 'bottom: 1px; position: absolute; left: 5px;');
	// I worked at the Department of Reduncy Department for a while. Picked up some habits.
	comment.textarea.on('keyup', getEmoticons);
	comment.textarea.on('focus', getEmoticons);
	comment.textarea.on('blur', getEmoticons);
	comment.textarea.on('change', getEmoticons);
	comment.textarea.on('mousedown', getEmoticons);
	comment.textarea.on('mouseup', getEmoticons);
	// Make sure that the counter is shown on page load, before anything is actually done to the box. Just in case.
	getEmoticons();
});

