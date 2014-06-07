// ==UserScript==

// @name           Freshbooks - Better Time Logging Comments

// @namespace      http://www.erinhawkins.com

// @description    Eliminate the "Hours Logged" comment

// @include        https://*.freshbooks.com/*
// ==/UserScript==


unsafeWindow.getWord = function()
{
	var logged_words = new Array(
		'Hours flogged',
		'Cha-ching!',
		'I love my job',
		'Shazam!',
		'Time for coffee',
		'Break time',
		'Done, finally',
		'Hallelujah!',
		'About time, too',
		'Ta da!',
		'Wasn\'t that fun?',
		'You\'re the best',
		'Take that!',
		'Giddyup',
		'You are a genius',
		'Life is good',
		'Good work',
		'Good stuff',
		'Nice job',
		'Nice stuff',
		'Giddy-up',
		'Bingo Bango',
		'Blam',
		'Zoink',
		'Oh Snap!',
		'POW!',
		'Pay Day!',
		'Presto',
		'Damn The Man!',
		'Blame Canada!',
		'Client says: \"Ouch!\"');

	var word_length = logged_words.length;
	var random_num = Math.ceil(Math.random() * word_length);
	return logged_words[random_num];
	
}