// ==UserScript==
// @name       Uncensor GFAQs - fool edition
// @namespace  http://www.google.com
// @version    0.2.9
// @description  Uncensors words on gamefaqs
// @match      http://*.gamefaqs.com/*
// @copyright  2012+, foolmoron
// ==/UserScript==

(function() {
	console.log("UNCENZORIN WORDS");

	//simple list of words
	var BANNED_WORDS = [
		'ass',
		'fuck',
		'shit',
		'tits',
		'twat',
		'cunt',
		'clit',
		'jizz',
		'ulti',
		'bitch',
		'nigga',
		'nigger',
	];
		
	//process words into a better data structure
	var bannedWords = {};
	for (var i = 0; i < BANNED_WORDS.length; i++) {
		var word = BANNED_WORDS[i];
		var length = word.length;
		var firstChar = word.charAt(0);
		if (length < 1)
			continue;
		
		if (!bannedWords[length])
			bannedWords[length] = { all: []};
		if (!bannedWords[length][firstChar])
			bannedWords[length][firstChar] = [];
			
		bannedWords[length][firstChar].push(word);
		bannedWords[length].all.push(word);
	}

	//takes censored word and uncensors it
	var uncensor = function(censoredWord) {
		var length = censoredWord.length;
		var firstChar = censoredWord.charAt(0);
		var uncensoredWord = '';
		
		var listOfPossibleWords;
		if (firstChar !== '*') { // first character known
			if (bannedWords[length]) {
				if (bannedWords[length][firstChar]) {
					listOfPossibleWords = bannedWords[length][firstChar];	
				}
			}
		} else { // fully censored
			if (bannedWords[length]) {
				listOfPossibleWords = bannedWords[length].all;				
			}
		}
		
		if (listOfPossibleWords && listOfPossibleWords.length > 0)
			return "<font color='red'>" + listOfPossibleWords[Math.floor(Math.random() * listOfPossibleWords.length)] + "</font>";
		else
			return censoredWord; // no words matched length and first character
	};
	
	//uncensor posts
	var messageBodies = $('.message, .msg_body');
	$.each(messageBodies, function(i, val) {
		var messageBody = $(val);
		var text = messageBody.html();
		//first do censored words that have the first letter
		text = text.replace(/[a-zA-Z]\*{2,}/gi, uncensor);
		//then do words that are all asterisks
		text = text.replace(/\*{2,}/gi, uncensor);
		messageBody.html(text);
	});
})();