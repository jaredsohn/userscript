// ==UserScript==
// @name		YouTube HTML5 Interface Improver
// @namespace	the.vindicar.scripts
// @description	Adds some useful buttons to Youtube player interface
// @version	1.0.1
// @grant		none
// @include	http://youtube.com/watch?*
// @include	http://www.youtube.com/watch?*
// @include	https://youtube.com/watch?*
// @include	https://www.youtube.com/watch?*
// @updateURL	http://userscripts.org/scripts/source/178321.meta.js
// @downloadURL	http://userscripts.org/scripts/source/178321.user.js
// ==/UserScript==
(function (){ 
// list of qualities to use for "set optimal quality" button, in order of decreasing preference.
var qualities = ['720p', '1080p', '480p', '360p', '240p', '122p'];

function format(str, dict) {
	return str.replace(
		/%([a-zA-Z_$][a-zA-Z0-9_$]*)%/g, 
		function (match, key, pos) {
			return (typeof dict[key]=='undefined')?match:dict[key];
			} 
		);
	}
/*
function waitFor(selector, callback, mustexist, delay) {
	delay = (typeof delay == 'undefined') ? 50 : delay;
	mustexist = (typeof mustexist == 'undefined') ? true : mustexist;
	var element = document.querySelector(selector);
	if ( (null !== element) == mustexist )
		callback(element);
	else
		setTimeout(function(){waitFor.call(this, callback, mustexist, delay)}, delay);
}
*/
function getNodes(xpath, context) {
	context = (typeof context == 'undefined') ? document.documentElement : context;
	var iter = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var nodes = new Array();
	for (;node = iter.iterateNext();)
		nodes.push(node);
	return nodes;
}

function addCSS(rules) {
	rules = (rules instanceof Array) ? rules.join("\n") : rules;
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	if (styleElement.styleSheet)
		styleElement.styleSheet.cssText = cssCode;
	else
		styleElement.appendChild(document.createTextNode(rules));
	document.getElementsByTagName("head")[0].appendChild(styleElement);
	}

function htmlToNode(html) {
	var container = document.createElement('div');
	container.innerHTML = html;
	return container.childNodes;
	}

function iconToStyle(name, icon, position) {
	var style = ".%name% { background-image: url('%icon%'); %offset% }";
	var offset = (typeof position == 'undefined') ? '' : ('background-position: '+position+';');
	style = format(style, {name:name, icon:icon, offset:position});
	return style;
	}

function makeButton(text, title, callback, cls) {
	if (typeof cls == 'undefined') cls ='';
	else if (cls instanceof Array) cls = cls.join(' ');
	var BTN = '<button aria-label="%TITLE%" title="%TITLE%" role="button" data-tooltip="%TITLE%" class="%CLASS% html5-control-right html5-control-sep yt-uix-button yt-uix-button-player yt-uix-button-size-default yt-uix-button-empty" type="button" onclick=";return false;"><span class="yt-uix-button-valign"></span><span class="yt-uix-button-icon-wrapper"><img title="" alt="" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-uix-button-icon yt-uix-button-icon-html5"></span>%TEXT%</button>';
	BTN = format(BTN,{TITLE:title, TEXT:text, CLASS: cls});
	var button = htmlToNode(BTN)[0];
	button.addEventListener('click', callback, false);
	return button;
	}

//================================================================================================================================
function getQualityButtons(context) {
	var btns = [];
	for (var i=0;i<qualities.length;i++) {
		var found = getNodes("//*[@role='button' and contains(@class, 'ytp-drop-down-menu-button') and contains(.,'"+qualities[i]+"')]", context);
		btns[qualities[i]] = (found) ? found[0] : null;
		}
	return btns;
	}

function getCurrentSize(buttons) {
	for (var size in buttons)
		if (buttons[size].getAttribute('class').indexOf('ytp-drop-down-menu-button-selected') >= 0)
			return size;
	return null;
	}
	
function getBestQuality(btns) {
	for (var index=0;index<qualities.length;index++)
		if (btns[qualities[index]] !== null)
			return qualities[index];
	return null;
	}

function html5_addbuttons(ctl) {
	var chrome = ctl.querySelector('div.html5-player-chrome');
	var menu = ctl.querySelector('div.ytp-menu');
	var css = [
		'.html5-userscript-widescreen-button {width:30px !important; background: url("//s.ytimg.com/yts/imgbin/player-common-vflrUYjjX.png") no-repeat scroll -184px -281px transparent !important;}',
		'.html5-userscript-sizeselect-button {width:30px !important;}',
		];
	addCSS(css);
	var size_item = menu.querySelector('div.ytp-size-control-large');
	if (size_item)
		chrome.appendChild(makeButton(
			'',
			'Toggle widescreen', 
			function(){size_item.click()}, 
			'html5-userscript-widescreen-button'));
	//
	var qbuttons = getQualityButtons(menu);
	var bestsize = getBestQuality(qbuttons);
	if (bestsize) {
		var quality_button = makeButton(
			bestsize,
			'Set quality to '+bestsize, 
			function(){qbuttons[bestsize].click()}, 
			'html5-userscript-sizeselect-button');
		chrome.appendChild(quality_button);
		}
	}

var ctl = document.querySelector('div.html5-video-controls');
if (ctl)
	html5_addbuttons(ctl);
})();