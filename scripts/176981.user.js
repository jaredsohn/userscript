// Script creator: http://www.reddit.com/u/dadosky2010. You may use or modify this for any purpose as long as I am credited.
// ==UserScript==
// @name John Has An Erection
// @description EB: i have an erection.
// @include http://www.mspaintadventures.com/?s=6&p=*
// ==/UserScript==

var REPLACE_TEXT = 'i have an erection.';

//Note: Since Hussie is a shitty web developer, none of the pesterlog lines are in a class
//      (All the CSS is inlined). So just grab all the spans in the page and parse.
var span_elements = document.getElementsByTagName('span');
for(var i = 0; i < span_elements.length; i++) {
	var header = span_elements[i].innerHTML.match(/(^(EB|JOHN|GT): )/);
	if(header != null) {
		span_elements[i].innerHTML = header[0] + REPLACE_TEXT;
		break;
	}
}