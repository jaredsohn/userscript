// ==UserScript==
// @name            Coursera EXT - algs4partI letter to numbers
// @description     Coursera Extension -- COurse algs4partI: convert letters to numbers and back in Exercises
// @namespace       http://sepczuk.com/
// @version         0.02
// @include         https://class.coursera.org/algs4partI-*/quiz/*
// @match           https://class.coursera.org/algs4partI-*/quiz/*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/145823.user.js
// @updateURL       https://userscripts.org/scripts/source/145823.meta.js
// ==/UserScript==

function mainWrapper(){
    function main() {
// ------------------------------------------------------------------------
var charCodeOfA = "A".charCodeAt(0);

function letterToNumber(letter) {
	return letter.charCodeAt(0) - charCodeOfA + 1;
}

function numberToLetter(number) {
	return String.fromCharCode( +number + charCodeOfA - 1);
}
    
function replaceBigLettersByNumbers(text) {
	return text.replace(/[A-Z]/g, letterToNumber);
}

function replaceNumbersByBigLetters(text) {
	return text.replace(/[0-9]+/g, numberToLetter);
}

	
function onMatchFunction(text){
	return text + " -> [" + replaceBigLettersByNumbers(text).trim() + "]";
}
	
var bigLettersSeq = /(?:\s|^)([A-Z](?:[ -]+[A-Z]){1,})/g;

var textNodes = document.evaluate('//div[@id="page-content"]//text()',
                                  document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var noOfItems = textNodes.snapshotLength;
for (var i = 0; i<noOfItems; ++i)
{
	var item = textNodes.snapshotItem(i);
	item.data = item.data.replace(bigLettersSeq, onMatchFunction);
}

var inputNumbersSeq = /[0-9]+(\s+[0-9]+)*/
var inputBigLettersSeq = /[A-Z](\s+[A-Z])*/

function inputNumLetConv() {
    var inputField = $(this).prevAll('.quiz_input');
    var value = inputField.val();
	
	if (inputBigLettersSeq.test(value.trim())) {
	    value = replaceBigLettersByNumbers(value)
	} else if (inputNumbersSeq.test(value.trim())) {
		value = replaceNumbersByBigLetters(value)
	}
    inputField.val(value.trim().replace(/\s+/g, ' '));
}

function spacesToTABs() {
	var inputField = $(this).prevAll('.quiz_input');
    var value = inputField.val();
	inputField.val(value.replace(/\s+/g, "\t"));
}

$('<input type="button" value="SPC -> TAB"/>').click(spacesToTABs).insertAfter('.quiz_input');
$('<input type="button" value="Letters <-> Numbers"/>').click(inputNumLetConv).insertAfter('.quiz_input');

// ------------------------------------------------------------------------
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}