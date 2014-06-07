// ==UserScript==
// @name           Reverse Orkut strings
// @namespace      http://www.deadlydevil.blogspot.com/
// @description    Reverse the string posted
// @include        http://www.orkut.com/*
// ==/UserScript==

function newSubmit(event)
{
var target = event ? event.target : this;

var textArea = document.getElementsByName('bodyText')[0];
var str = textArea.value;
var reverseString = flipString(str);
textArea.value = reverseString;
// call real submit
this._submit();
    
}
function flipString(aString) {
	aString = aString.toLowerCase();
	var last = aString.length - 1;
	var result = "";
	for (var i = last; i >= 0; --i) {
		result += flipChar(aString.charAt(i))
	}
	return result;
}

function flipChar(c) {
	if (c == 'a') {
		return '\u0250';
	}
	else if (c == 'b') {
		return 'q';
	}
	else if (c == 'c') {
		return '\u0254'; //Open o -- copied from pne
	}
	else if (c == 'd') {
		return 'p';
	}
	else if (c == 'e') {
		return '\u01DD';
	}
	else if (c == 'f') {
		return '\u025F'; //Copied from pne -- 
		//LATIN SMALL LETTER DOTLESS J WITH STROKE
	}
	else if (c == 'g') {
		return 'b';
	}
	else if (c == 'h') {
		return '\u0265';
	}
	else if (c == 'i') {
		return '\u0131';//'\u0131\u0323' //copied from pne
	}
	else if (c == 'j') {
		return '\u0638';
	}
	else if (c == 'k') {
		return '\u029E';
	}
	else if (c == 'l') {
		return '1';
	}
	else if (c == 'm') {
		return '\u026F';
	}
	else if (c == 'n') {
		return 'u';
	}
	else if (c == 'o') {
		return 'o';
	}
	else if (c == 'p') {
		return 'd';
	}
	else if (c == 'q') {
		return 'b';
	}
	else if (c == 'r') {
		return '\u0279';
	}
	else if (c == 's') {
		return 's';
	}
	else if (c == 't') {
		return '\u0287';
	}
	else if (c == 'u') {
		return 'n';
	}
	else if (c == 'v') {
		return '\u028C';
	}
	else if (c == 'w') {
		return '\u028D';
	}
	else if (c == 'x') {
		return 'x';
	}
	else if (c == 'y') {
		return '\u028E';
	}
	else if (c == 'z') {
		return 'z';
	}
	else if (c == '[') {
		return ']';
	}
	else if (c == ']') {
		return '[';
	}
	else if (c == '(') {
		return ')';
	}
	else if (c == ')') {
		return '(';
	}
	else if (c == '{') {
		return '}';
	}
	else if (c == '}') {
		return '{';
	}
	else if (c == '?') {
		return '\u00BF'; //From pne
	}
	else if (c == '\u00BF') {
		return '?';
	}
	else if (c == '!') {
		return '\u00A1';
	}
	else if (c == "\'") {
		return ',';
	}
	else if (c == ',') {
		return "\'";
	}
	return c;
}
window.addEventListener('submit', newSubmit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = newsubmit;
