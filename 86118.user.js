// ==UserScript==
// @name           4chan /fit/ kg;lb
// @namespace      unit_conversion
// @description    Converts between metric and customary units on 4chan.
// @include        http://boards.4chan.org/fit/*
// ==/UserScript==

(function ()
{

var posts = document.getElementsByTagName('blockquote');
var linkReg = /(<a .*?\/a>|http:.*?( |$))/gm;
var regExp = /((\.\d|\d)[,.'\d]*[\d]|(\.\d|\d))/gm;
var foundMatch = null;
var linkRanges;
var i = 0;

if (window.location.href == 'http://boards.4chan.org/fit/') {i = 1};

for (i; i<posts.length; i++) {
	posts[i].innerHTML = convertNumbers(posts[i].innerHTML);
};

function convertNumbers(fullText) {
	if (foundMatch = regExp.exec(fullText)) {
		checkLinks(fullText);
		var isLink = false;
		if (linkRanges.length > 0) {
			for (var i=0; i<linkRanges.length; i++) {
				if (foundMatch.index > linkRanges[i][0] && foundMatch.index < linkRanges[i][1]) {
					isLink = true;
					regExp.lastIndex = linkRanges[i][1];
					break;
				};
			};
		};
		if (!isLink) {
			if (!(foundMatch.index > 0 && fullText.substr(foundMatch.index-1,1).match(/[a-wyzA-WYZ$€]/))) {
				if (!(fullText.length > regExp.lastIndex && fullText.substr(regExp.lastIndex,1).match(/[%$€]/))) {
					if (fullText.length > regExp.lastIndex && fullText.substr(regExp.lastIndex,6).match(/(kg|lb|kilo|pound|cm|inch|['"])/) && fullText.substr(regExp.lastIndex,2).match(/( *[klpci]|['"].*)/)) {
						var numType = fullText.substr(regExp.lastIndex,2).replace(' ','');
					} else {
						var numType = '';
					};
					var tempReplace = foundMatch[0];
					if (foundMatch.index > 0 && fullText.substr(foundMatch.index-1,1).match(/\./)) {tempReplace = tempReplace.replace(/^\./,'')};
					var replacement = replaceText(tempReplace, numType);
					fullText = fullText.substr(0,foundMatch.index) + fullText.substr(foundMatch.index).replace(tempReplace, replacement);
					regExp.lastIndex = foundMatch.index + replacement.length;
				};
			};
		};
		fullText = convertNumbers(fullText);
	};
	return fullText;
};

function replaceText(matchText, numType) {
	var newText = '<span style="cursor:default;" title="';
	var cleanNumber = matchText.replace(/,/g,'').replace(/\.+/,'.').replace(/'+/,"'");
	var numSplit = [];
	if (cleanNumber.match(/'/)) {
		numSplit = cleanNumber.split("'");		
		if (numSplit.length > 2) {return matchText};
		numSplit[0] = Number(numSplit[0]);
		numSplit[1] = Number(numSplit[1]);
		numType = 'i';
	} else {
		cleanNumber = Number(cleanNumber);
	};
	
	switch (numType.charAt(0)){
		case 'k':
			newText += Math.round(cleanNumber * 2.2 * 100) / 100 + ' lb';
			break;
		case 'l':
		case 'p':
			newText += Math.round(cleanNumber / 2.2 * 100) / 100 + ' kg';
			break;
		case 'c':
			if (cleanNumber > 30.48) {
				newText += Math.floor(cleanNumber / 2.54 / 12) + "'" + Math.round(cleanNumber / 2.54 % 12) + "''";
			} else {
				newText += Math.round(cleanNumber / 2.54 * 100) / 100 + ' in';
			};
			break;
		case '"':
		case "'":
		case 'i':
			if (numSplit.length == 2) {
				newText += Math.round((numSplit[0] * 2.54 * 12 + numSplit[1] * 2.54) * 100) / 100 + ' cm';
			} else {
				if (numType.match(/('[^']|^'$)/)) {
					newText += Math.round(cleanNumber * 2.54 * 12 * 100) / 100 + ' cm';
				} else {
					newText += Math.round(cleanNumber * 2.54 * 100) / 100 + ' cm';
				};
			};
			break;
		default:
			newText += Math.round(cleanNumber / 2.2 * 100) / 100 + ' kg / ' + Math.round(cleanNumber * 2.2 * 100) / 100 + ' lb';
	};

	newText += '">' + matchText + '</span>';
	return newText;
};

function checkLinks(checkText) {
	linkRanges = [];
	var i = 0;
	var newMatch = null;

	while (newMatch = linkReg.exec(checkText)) {
		linkRanges[i] = new Array(newMatch.index, linkReg.lastIndex);
		i++;
	};
};

})();