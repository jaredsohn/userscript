// English words searcher (using yahoo Japan's dictionary), and 
// page contents organizer
// written by Julio Matus
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// This script makes filesonic a bit easier to read, and helps to automate downloads
//
// ==UserScript==
// @name          English words searcher, and page contents organizer
// @namespace     http://www.rikijpn.co.cc/
// @description   This script helps organizing contents from English news sites (currently just reuters.com) so you can select and, add words to your own words list. You can also check that list and the news title, as well as search for all the words in it, with one click!
// @include       http://www.reuters.com/*
// ==/UserScript==

window.trim = function(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var title = document.getElementsByTagName('title')[0].innerHTML;
title = trim(title.replace('| Reuters',''));

var wordsSelected = [];
var yahooDictionaryAddress = 'http://dic.search.yahoo.co.jp/search?p=';

window.appendSelectedWord = function(){
    var selectedWord = document.getSelection().toString();
    wordsSelected.push(selectedWord);
    alert('word appended!');
}

window.searchWords = function(){
    for (var i = 0; i < wordsSelected.length; i++){
	window.open(yahooDictionaryAddress + wordsSelected[i]);
    }
}
window.showTitleWords = function(){
    var wordsList = wordsSelected.toString();
    alert('Title:\n' + title + '\n' + 'Selected words:\n' + wordsList);
}
function createSomeButton(val, someFunction, top){
    someButton = document.createElement('input');
    someButton.type = 'button';
    someButton.value = val;
    //    someButton.setAttribute('onclick', eval(someFunction).toLocaleString()); //this was the problem... omg javascript is killing me><
    someButton.addEventListener('click', eval(someFunction), false);
    someButton.style.position = 'fixed';
    someButton.style.top = top + 'px';
    someButton.style.right = '5px';
    return someButton;
}

window.showWordsButton = createSomeButton('Show title/words', 
					 'showTitleWords', 30);
window.searchWordsButton = createSomeButton('Look up words', 
					 'searchWords', 55);
window.addWordsButton = createSomeButton('Append word', 
				      'appendSelectedWord', 80);

var body = document.getElementsByTagName('body')[0];
body.appendChild(addWordsButton);
body.appendChild(searchWordsButton);
body.appendChild(showWordsButton);
