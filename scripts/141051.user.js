// ==UserScript==
// @name           Kafan.Signature
// @namespace      http://OpenGG.me
// @description    Enable signature in quick-reply mode.
// @version        1.04
// @updateURL      https://userscripts.org/scripts/source/141051.meta.js
// @downloadURL    https://userscripts.org/scripts/source/141051.user.js
// @match          http://bbs.kafan.cn/*
// ==/UserScript==

(function(){
	'use strict';
	function addSig(form){
		if(form&&form.action.indexOf('action=reply')!==-1&&!form.querySelector('input[name="usesig"]')){
			var div=document.createElement('div');
			div.innerHTML = '<label><input type="checkbox" checked="checked" value="1" name="usesig" />\u4f7f\u7528\u4e2a\u4eba\u7b7e\u540d</label>';
			var parent = form.querySelector('#psd,.pnpost,#moreconf');
			if(parent){
				parent.appendChild(div.querySelector('*'));
			}
		}
	}
	function onDOMNodeInsertedHandler(e) {
		var target = e.target;
		if (target.nodeType === 1 && /FORM/ig.test(target.nodeName)) {
			addSig(target);
		}
	}
	function onAnimationStartHandler(e) {
		if (e.animationName === 'nodeInserted') {
			var target = e.target;
			// console.log(target);
			if (target.nodeType === 1 && /FORM/ig.test(target.nodeName)) {
				addSig(target);
			}
		}
	}
	function animationNotSupported(){
		var style = document.createElement('div').style;
		var arr = ['animation', 'MozAnimation', 'webkitAnimation', 'OAnimation'];
		for(var i =0;i<arr.length;++i){
			if( arr[i] in style){
				return false;
			}
		}
		return true;
	}
	var style = document.createElement('style');
	style.textContent = '@-moz-keyframes nodeInserted{from{opacity:0.99;}to{opacity:1;}}@-webkit-keyframes nodeInserted{from{opacity:0.99;}to{opacity:1;}}@-o-keyframes nodeInserted{from{opacity:0.99;}to{opacity:1;}}@keyframes nodeInserted{from{opacity:0.99;}to{opacity:1;}}form{animation-duration:.001s;-ms-animation-duration:.001s;-moz-animation-duration:.001s;-webkit-animation-duration:.001s;-o-animation-duration:.001s;animation-name:nodeInserted;-ms-animation-name:nodeInserted;-moz-animation-name:nodeInserted;-webkit-animation-name:nodeInserted;-o-animation-name:nodeInserted;}';
	document.head.appendChild(style);
	/*Firefox*/
	document.body.addEventListener('animationstart', onAnimationStartHandler, false);
	/*/Firefox*/
	/*Chrome*/
	document.body.addEventListener('webkitAnimationEnd', onAnimationStartHandler, false);
	/*/Chrome*/
	/*Opera 12+*/
	document.body.addEventListener('oAnimationStart', onAnimationStartHandler, false);
	/*/Opera 12+*/
	/*IE, but I never tested this*/
	document.body.addEventListener('msAnimationStart', onAnimationStartHandler, false);
	/*/IE, but I never tested this*/
	if (animationNotSupported()) {
		/*Old fashion, slower maybe*/
		document.body.addEventListener('DOMNodeInserted', onDOMNodeInsertedHandler, false);
		var matches = document.body.querySelectorAll('form');
		for(var i=0;i<matches.length;++i){
			addSig(matches[i]);
		}
	}
})();