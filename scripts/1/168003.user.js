// ==UserScript==
// @name          WaniKani Meaning/Reading Color
// @namespace     http://www.wanikani.com
// @description   WaniKani Meaning/Reading Color by Alucardeck
// @version 0.31
// @include       http://www.wanikani.com/review/session/disabled
// @grant       none
// ==/UserScript==
function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}

function defineType(e){
	var color = '';
	var text = '';
	if(questionNode.className == 'meaning'){
		color = '#57842A';
		text = 'Meaning';
	}else{
		color = '#FF6666';
		text = '読み方';
	}
	questionNode.childNodes[1].style.color = color;
	questionNode.childNodes[1].style.fontSize = '42px';
	questionNode.childNodes[1].style.fontWeight = 'bold';
	questionNode.childNodes[1].innerHTML = text;
	questionNode.style.paddingBottom = '0px';
	questionNode.style.paddingTop = '0px';
}

var questionNode = get('question');
questionNode.addEventListener('DOMNodeInserted', defineType);
defineType(null);