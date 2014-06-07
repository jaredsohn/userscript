// ==UserScript==
// @name        script-coding Enhanced
// @version     0.7
// @updateURL   http://userscripts.org/scripts/source/117572.meta.js
// @namespace	schreque-uso
// @author      schreque
// @description The script improves the forum's usability
// @include     http://forum.script-coding.com/post.php*
// @include     http://forum.script-coding.com/edit.php*
// @include     http://forum.script-coding.com/viewtopic.php*
// @include     http://script-coding.com/forum/post.php*
// @include     http://script-coding.com/forum/edit.php*
// @include     http://script-coding.com/forum/viewtopic.php*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function()
{

var textarea = document.querySelector('textarea[name=req_message]');

// a textarea should be presented on the page
if ( ! textarea ) {
	return;
}

// Wider and Higher
textarea.rows = 20;
textarea.cols = 95;

var insert_text = unsafeWindow.insert_text || function insert_text(open, close)
{
// this original line has ben replaced
//	msgfield = (document.all) ? document.all.req_message : document.forms['post']['req_message'];
	var msgfield = textarea;

	// IE support
	if ( document.selection && document.selection.createRange ) {
		msgfield.focus();
		sel = document.selection.createRange();
		sel.text = open + sel.text + close;
		msgfield.focus();

		return;
	}

	// Moz support
	if ( msgfield.selectionStart || msgfield.selectionStart == '0' ) {
		var x = msgfield.selectionStart;
		var y = msgfield.selectionEnd;

		msgfield.value = msgfield.value.substring(0, x) 
			+ open + msgfield.value.substring(x, y) + close 
			+ msgfield.value.substring(y, msgfield.value.length);

		msgfield.selectionStart = msgfield.selectionEnd = y + open.length + close.length;
		msgfield.focus();

		return;
	}

	// Fallback support for other browsers
	msgfield.value += open + close;
	msgfield.focus();
};

// Reference to the buttons Submit and Preview
var submit;
var preview;

var s = textarea.form.querySelectorAll('input[type=submit]');

submit = s[0];

if ( s.length == 2 ) {
	preview = s[1];
} else {
	preview = document.createElement('input');
	preview.type = 'submit';
	preview.name = 'preview';
	preview.value = '\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c';
	preview.tabIndex = submit.tabIndex + 1;
	preview.accessKey = 'p';
	submit.parentNode.insertBefore(preview, submit.nextSibling);
}

// Cancel proccessing of event
var cancelEvent = function(e)
{
	if ( e.preventDefault ) {
		e.preventDefault();
	}
	if ( e.stopPropagation ) {
		e.stopPropagation();
	}
	return e.returnValue = false;
};

var keystrokes = [
	// ALT-B
	{ chr: 'B', tag: 'b',     alt: true }, 
	// ALT-I
	{ chr: 'I', tag: 'i',     alt: true }, 
	// ALT-U
	{ chr: 'U', tag: 'u',     alt: true }, 
	// ALT-Q, CTRL-Q
	{ chr: 'Q', tag: 'quote', alt: true }, 
	{ chr: 'Q', tag: 'quote', ctrl: true }, 
	// ALT-K
	{ chr: 'K', tag: 'url',   alt: true }, 
	// ALT-C
	{ chr: 'C', tag: 'code',  alt: true }, 

	// TAB
	{ code: 9, func: function(e) { insert_text('\t', ''); return cancelEvent(e); } }, 
	//CTRL-TAB
	{ code: 9, ctrl: true, func: function(e) { e.target.focus(); } }, 

	// CTRL-ENTER
	{ code: 13, ctrl: true, func: function(e) { submit.click() } }, 
	// ALT-ENTER
	{ code: 13, alt:  true, func: function(e) { preview.click() } }, 
];

keystrokes.pressed = function(e, k)
{
	return ( e.keyCode == k.code || String.fromCharCode(e.keyCode) == String(k.chr).toUpperCase() ) 
		&& e.shiftKey == !! k.shift 
		&& e.ctrlKey == !! k.ctrl 
		&& e.altKey == !! k.alt;
};

keystrokes.process = function(e, k)
{
	var f = k.func || function(e)
	{
		insert_text('[' + k.tag + ']', '[/' + k.tag + ']');
		return cancelEvent(e);
	};
	return f(e);
};

// Process keystrokes: 
// ALT+x, CTRL+Q, CTRL+ENTER, ALT-ENTER, TAB, CTRL+TAB
textarea.addEventListener('keydown', function(e)
{
	for (var i = 0; i < keystrokes.length; i++) {
		var k = keystrokes[i];
		if ( k && keystrokes.pressed(e, k) ) {
			return keystrokes.process(e, k);
		}
	}
}, false);

var getSelection = function()
{
	// MSIE
	if ( window.document.selection && window.document.selection.createRange ) {
		return window.document.selection.createRange().text;
	}

	// Opera, Mozilla
	if ( window.getSelection ) {
		return window.getSelection();
	}

	// Navigator
	if ( window.document.getSelection ) {
		return window.document.getSelection();
	}
};

var getSel = function()
{
	var s = getSelection();
	return ('' + s).replace(/^\s+|\s+$/g, '');
};

// Process a click over a username
var usernames = document.querySelectorAll('.box .inbox .postleft dl dt strong');
[].slice.call(usernames).forEach(function(username)
{
	username.addEventListener('mousedown', function(e)
	{
		if ( e.shiftKey || e.altKey || e.ctrlKey || e.metaKey ) {
			return;
		}

		var n = this.innerHTML.replace(/<[^>]+>/g, '');
		var s = getSel();
		var t = s 
			? '[quote="' + n + '"]' + s + '[/quote]\n' 
			: '[b]' + n + '[/b]\n';
		textarea.value += t;
		textarea.focus();

		return cancelEvent(e);
	}, false);
});

// Prevent processing a click on A
var userprofiles = document.querySelectorAll('.box .inbox .postleft dl dt strong a');
[].slice.call(userprofiles).forEach(function(userprofile)
{
	userprofile.addEventListener('click', function(e)
	{
		if ( e.shiftKey || e.altKey || e.ctrlKey || e.metaKey ) {
			return;
		}
		return cancelEvent(e);
	}, false);
}, false);

}, false);
