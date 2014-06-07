// ==UserScript==
// @name Jyte Comment Helper
// @namespace http://www.brucestockwell.net/
// @description Gives you a little html toolbar above the comment textarea.
// @include http://*jyte*
// ==/UserScript==

var textarea;

function insertAroundCursor(fld, pre, post) {
	if (fld.selectionStart || fld.selectionStart == '0') {
		var startPos = fld.selectionStart;
		var endPos = fld.selectionEnd;
		fld.value = fld.value.substring(0, startPos)+ pre + fld.value.substring(startPos,endPos) + post + fld.value.substring(endPos, fld.value.length);
	} else {
		fld.value += val;
	}
}

function insertAnchorAroundCursor(fld) {
	if (fld.selectionStart || fld.selectionStart == '0') {
		var startPos = fld.selectionStart;
		var endPos = fld.selectionEnd;
		var href = prompt("Enter URL.", "http://");
		fld.value = fld.value.substring(0, startPos)+ "<a href='" + href + "' >" + fld.value.substring(startPos,endPos) + "</a>" + fld.value.substring(endPos, fld.value.length);
	} else {
		fld.value += val;
	}
}  

function anchorWrap(event) {
	var textarea;
    textarea = event.currentTarget._target;
	insertAnchorAroundCursor(document.getElementById(comment_id));
	event.preventDefault();
}

function emWrap(event) {
	var textarea;
    textarea = event.currentTarget._target;
	insertAroundCursor(document.getElementById(comment_id),"<em>","</em>");
	event.preventDefault();
}

function strongWrap(event) {
	var textarea;
    textarea = event.currentTarget._target;
	insertAroundCursor(document.getElementById(comment_id),"<strong>","</strong>");
	event.preventDefault();
}

function preWrap(event) {
	var textarea;
    textarea = event.currentTarget._target;
	insertAroundCursor(document.getElementById(comment_id),"<pre>","</pre>");
	event.preventDefault();
}

function createAnchor(target, text, title, fn) {
    var anchor;
    anchor = document.createElement('a');
	anchor._target = target;
	anchor.setAttribute('href','#');
    anchor.setAttribute('title',title);
    anchor.appendChild(document.createTextNode(text));
    anchor.addEventListener("click", fn, false);
    return anchor;
}


var div;
var comment_id = 'new_comment_textarea'
textarea = document.getElementById(comment_id);
if (textarea) {
	div = document.createElement('div');
	div.setAttribute('class','clearfix');
	div.setAttribute('id','html-helper');
	div.appendChild(createAnchor(textarea, '<a>', 'anchor', anchorWrap));
	div.appendChild(createAnchor(textarea, '<em>', 'emphasis', emWrap));
	div.appendChild(createAnchor(textarea, '<strong>', 'strong', strongWrap));
	div.appendChild(createAnchor(textarea, '<pre>', 'preformated', preWrap));
	textarea.parentNode.insertBefore(div, textarea);

	GM_addStyle (
	    '#html-helper {border-left: 1px solid #CCCCCC;}' +
	    '#html-helper a {display: block; float: left; text-decoration: none; padding: 5px; background-color: #F2F9FF;}' +
		'#html-helper a {border-top: 1px solid #CCCCCC; border-right: 1px solid #CCCCCC; border-bottom: 1px solid #CCCCCC; color:#888888;}' +
		'#html-helper a:hover {background-color: #D0D7DD; color:#2C8439; text-decoration: none;}' +
		'.clearfix:after {content: "."; display: block; height: 0; clear: both; visibility: hidden;}'
	);
}





