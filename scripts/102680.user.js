// ==UserScript==
// @name           Word Count for Evernote
// @namespace      http://loresjoberg.com
// @description    Counts the words in an Evernote document that you are currently editing.
// @include     http://www.evernote.com/Home.action*
// @include     https://www.evernote.com/Home.action*
// @include     http://evernote.com/Home.action*
// @include     https://evernote.com/Home.action*
// ==/UserScript==

var debug = 0;

function count_words() {
	var w_c = 0;
	var inner_body = document.body.innerHTML.toString();
	inner_body = inner_body.replace(/<.*?>/g, ' ');
	inner_body = inner_body.replace(/\s+/g, ' ');
	inner_body = inner_body.replace(/^\s+/g, '');
	inner_body = inner_body.replace(/\s+$/g, '');
	w_c = inner_body.split(" ").length;
	if (debug >= 1) {
		GM_log("Word Count: " + w_c);
	}
	top.document.getElementById('word_count_ls').textContent = "Word count: " + w_c;
}

if (document.getElementsByTagName("body")[0].id == 'tinymce') {
	if (debug >= 2) {
		GM_log("The tinyMCE");
	}
	addEventListener("keyup", count_words, false);
}


if (top.location == location) {
	if (debug >= 2) {
		GM_log("Top Location");
	}
	var word_field = document.createElement('div');
	word_field.setAttribute('style', 'font-size: 11px; color: #BEDF8C; font-weight: bold; padding-top: 8px; text-decoration: none; position: fixed; top: 0; left: 250px; z-index:5000;');
	word_field.setAttribute('id', 'word_count_ls');
	document.body.insertBefore(word_field, document.body.firstChild);
	word_field.textContent = "Word Count: -";
}
