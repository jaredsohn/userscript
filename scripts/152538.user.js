// ==UserScript==
// @name			JSHint_Layout_Mod
// @version			2.0.20130823
// @namespace		cssmagic
// @description		A userscript to adjust page layout of JSHint.com.
// @icon			http://www.jshint.com/favicon.ico
// @grant			none
// @include			http://jshint.com/*
// @include			http://www.jshint.com/*
// ==/UserScript==

/*! Tiny.js v0.3.0 **/

//namespace
var $ = function (s, eWrapper) {
	return (eWrapper || document).querySelectorAll(s);
};

//utilties - array-like
$.each = function (a, fn, context) {
	for (var i = 0, l = a.length; i < l; ++i) {
		fn.call(context || window, a[i], i, a);
	}
};

//utilties - str
$.strstr = function (so, s) {
	return so.indexOf(s) > -1;
};

//dom query
$.id = function (s) {
	return document.getElementById(s);
};
$.class = function (s, eWrapper) {
	return (eWrapper || document).getElementsByClassName(s);
};
$.tag = function (s, eWrapper) {
	return (eWrapper || document).getElementsByTagName(s);
};

//creat
$.crElem = function (s) {
	return document.createElement(s);
};
$.crText = function (s) {
	return document.createTextNode(s);
};

//mod dom
$.insertBefore = function (e, eTarget) {
	eTarget.parentNode.insertBefore(e, eTarget);
};
$.before = function (eTarget, e) {
	$.insBefore(e, eTarget);
};
$.append = function (eWrapper, e) {
	eWrapper.appendChild(e);
}
$.appendTo = function (e, eWrapper) {
	$.append(eWrapper, e);
}
$.remove = function (e) {
	e.parentNode.removeChild(e);
};

//classname
$.hasClass = function (e, s) {
	return $.strstr(' ' + e.className + ' ', ' ' + s + ' ');
};
$.addClass = function (e, s) {
	var so = e.className;
	if (!$.hasClass(so, s)) {
		e.className += (' ' + s);
	}
};
$.removeClass = function (e,s) {
	var so = e.className;
	if ($.hasClass(so, s)) {
		e.className = (' ' + so + ' ').replace(' ' + s + ' ', ' ').trim();
	}
};

//style
$.visible = function (e, b) {
	var val = b ? 'visible' : 'hidden';
	e.style.visibility = val;
};
$.hide = function (e) {
	e.style.display = 'none';
};
$.show = function (e) {
	e.style.display = '';
};
$.setStyle = function (e, prop, val) {
	if (v) {
		e.style[prop] = val;
	} else {
		e.style.cssText = prop;
	}
};
$.css = function (s) {
	var e = $.crElem('style');
	var cssText = s || $.cssText;
	if (cssText) {
		e.innerHTML = cssText;
		//console.log(css);
		$.tag('head')[0].appendChild(e);
	}
};
$.cssText = '';

//event
$.on = function (e, sEvent, fn) {
	e.addEventListener(sEvent, fn, false);
};
$.off = function (e, sEvent, fn) {
	e.removeEventListener(sEvent, fn, false);
};

////////////////////  fn  ////////////////////
var _ = {};
_.ini = function () {
	if (location.pathname === '/') {
		this.getElem();
		this.modLayout();
		this.autoResetMsg();
		this.setOptionBox();
	}
};
_.getElem = function () {
	this.msgInfo = $.crElem('div');  //will be inserted to alert area later.
	this.msgError = $('.alert-error')[0];
	this.msgSuccess = $('.alert-success')[0];
	this.codeBox = $('.CodeMirror')[0];
	this.optionBox = $('.editor > .options')[0];
	this.reportBox = $('.editor > .report')[0];
	this.btn = $('.editorArea > .controls button')[0];
};
_.modLayout = function () {
	//fix main body
	$.cssText += 'html {overflow-y:scroll;}';
	$.cssText += 'body {height: auto; padding: 15px 0 30px;}';
	$.cssText += 'body > .content {margin: 0;}';
	$.cssText += 'body > .content:after {content:"";display:block;clear:both;height:0;}';
	
	//layout - page
	$.cssText += 'body {width: 1620px; max-width: 1620px;}';
	$.cssText += '.editor {position: relative;}';
	$.cssText += '.editor > .editorArea {float: left; width: 880px;}';
	$.cssText += '.editor > .report {position: absolute; top: 0; right: 0; width: 680px;}';

	//hide nav & header & footer
	$.cssText += 'body > .navbar {display: none;}';
	$.cssText += 'body > .page-header {display: none;}';
	$.cssText += 'body > .content > .intro {display: none;}';
	$.cssText += 'body > .footer {display: none;}';
	
	//hide intro
	$.cssText += '#jshint-pitch, body > .content > .alert-info {display: none;}';
	
	//hide github badge - out of date
	//$.cssText += 'body > .content > a[href*="github.com/jshint"] {display: none;}';
	
	//msg bar
	$.cssText += '.editorArea > .alert {margin-bottom: 10px;}';
	$.cssText += '.editorArea > .alert-success {border-color: #468847;}';
	$.cssText += '.editorArea > .alert-error {border-color: #B94A48;}';
	$.cssText += '.editorArea > .alert-info {border-color: #3A87AD; padding-right: 14px;}';
	$.cssText += '.editorArea > .alert-info a {float: right; white-space: nowrap; text-decoration: underline;}';
	
	//layout - option
	$.cssText += '.editor > .options-switch {clear: both; width: 860px; padding: 20px 10px 5px; text-align: right;}';
	$.cssText += '.editor > .options {clear: both; width: 848px; margin-bottom: 0; overflow: hidden;}';
	$.cssText += '.editor > .options {border: 1px solid #ccc; background-color: #eee; padding: 10px 15px; border-radius: 5px;}';
	$.cssText += '.editor > .options ul {width: 270px;}';
	$.cssText += '.editor > .options li {margin-bottom: 5px;}';
	$.cssText += '.editor > .options ul label {font-size: 12px;}';
	$.cssText += '.editor > .options .more-options {float: right;}';
	
	//layout - report
	$.cssText += '.editor > .report > h4:first-child {display: none;}';
	$.cssText += '.editor > .report > h4 {margin-top: 0;}';
	$.cssText += '.editor > .report .options-string {display: none;}';
	$.cssText += '.editor > .report .documentation-link {display: none;}';
	
	//lint btn
	$.cssText += '.editorArea > .controls button {width:100%;height:60px;font-size:30px;padding:10px 0 12px;border-radius:8px;font-weight: 700;}';
	
	//apply css
	$.css($.cssText);
};

_.autoResetMsg = function () {
	var _ns = this;

	//insert info bar, to avoid page jump
	var msgInfo = this.msgInfo;
	var msgError = this.msgError;
	$.addClass(msgInfo, 'alert alert-info');
	msgInfo.innerHTML = 'Ready to lint. Please paste your code below. <a href="http://userscripts.org/scripts/show/152538" target="_blank">JSHint Layout Mod</a>';
	$.insertBefore(msgInfo, msgError);
	
	//remove link in error msg, to avoid page scroll
	var html = msgError.innerHTML;
	html = html.split('<a ')[0];
	html += 'report on the right side.';
	msgError.innerHTML = html;

	//bind
	$.on(this.codeBox, 'click', function () {
		$.show(msgInfo);
		$.hide(msgError);
		$.hide(_ns.msgSuccess);
		$.hide(_ns.reportBox);
	});
	$.on(this.btn, 'click', function () {
		$.hide(msgInfo);
	});
};

_.setOptionBox = function () {
	var _ns = this;
	var texts = [
		'- Options',
		'+ Options',
	];
	var optionBox = this.optionBox;
	
	//set switch
	var optionSwitch = $.crElem('div');
	optionSwitch.className = 'options-switch';
	
	//set switch btn
	var btn = $.crElem('a');
	btn.href = '#toggle-option-box';
	$.append(optionSwitch, btn);
	btn.innerHTML = texts[1];
	btn.isOpen = false;
	btn.texts = texts;
	$.on(btn, 'click', function (ev) {
		this.blur();
		ev.preventDefault();
		var isOpen = this.isOpen;
		this.isOpen = !isOpen;
		this.innerHTML = this.texts[isOpen + 0];
		$[isOpen ? 'hide' : 'show'](_ns.optionBox);
	});
	
	//insert switch
	this.optionSwitch = optionSwitch;
	$.insertBefore(optionSwitch, optionBox);
	$.hide(optionBox);
};

////////////////////  ini  ////////////////////
_.ini();
