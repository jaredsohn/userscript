// ==UserScript==
// @name        En-Ru Fast Translate
// @namespace   fast_translate
// @homepage	http://userscripts.org/scripts/show/172023
// @updateURL	https://userscripts.org/scripts/source/172023.meta.js
// @downloadURL	https://userscripts.org/scripts/source/172023.user.js
// @include     http://*
// @include     https://*
// @version     0.2
// ==/UserScript==

var d = document, 
	last, tout,
	elem = d.createElement("span");

elem.setAttribute("style", "display:inline-block;background-color:white;color:#333;padding:0 2px;min-height:10px;min-width:40px;position:fixed;right:7px;top:7px;z-index:999999999999;box-shadow:0 0 1px black;");
elem.innerHTML = "<img src='https://raw.github.com/Unknowny/Fast-Translate/master/loader.gif' />";

function main (e) {
	if(e.ctrlKey){

		var str = getString(e.rangeParent);
		var word = getWord(str, e.rangeOffset);

		if(!word || last === word) return;

		last = word;

		appendSpan();
		getTranslate(word);

	}
}

function getString (node) {
	var r = d.createRange(); 
		r.selectNode(node);
	var str = r.toString();
		r.detach();
	return str;
}

function getWord (str, offset) {
	if ( !/[a-z-']/i.test( str[offset] ) ) return;

	var start = str.substr(0, offset).match(/[a-z-'’]+(?!.+[a-z-’']*)/i) || "",
		end = str.substr(offset).match(/[a-z-'’]+/i) || "";

	return start + end;
}

function appendSpan () {
	removeSpan();
	d.body.appendChild(elem);
}

function removeSpan () {
	try{ d.body.removeChild(elem); }catch(e){}
	elem.innerHTML = "<img src='https://raw.github.com/Unknowny/Fast-Translate/master/loader.gif' />";
}

function getTranslate (word) {
	var z=d.createElement("script");
	z.setAttribute("src", "https://translate.yandex.net/api/v1.5/tr.json/translate"+"?key=trnsl.1.1.20130627T145755Z.380c7f262015ef32.f3d5bbc21298dc8d017b6596fcd6d632d62f6c3c&callback=insertText_&lang=en-ru&text="+escape(word));
	d.body.appendChild(z);
}
	// JSONP function
	window.insertText_ = function(text) {
		console.log(text);
		elem.innerHTML = text.text[0];

		clearTimeout(tout);
		tout = setTimeout(function(){
			removeSpan();
		}, 3000)
	}

// Init
document.body.addEventListener("mousemove", main);