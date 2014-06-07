// Use Alt+Shift+W to open five WordPress.com blogs at random
// Use Ctrl+W to close tabs
//
//
// ==UserScript==
// @name           Random WordPress.com Blogs
// @namespace      http://internetducttape.com
// @description    Press Ctrl-Alt-W and it will open 5 WordPress.com blogs at random.
// @include        *
// @exclude        */wp-admin*
// @exclude        */wp-include*
// ==/UserScript==

/* Script copied from Aaron Bassett http://foobr.co.uk Comment Pre-fill */

/*
* Slightly compressed version of shortcuts.js
* http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/
function shortcut(shortcut,callback,opt) {
	var default_options = {'type':'keydown','propagate':false,'target':document}
	if(!opt) opt = default_options;
	else {for(var dfo in default_options) {if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];}}
	var ele = opt.target;
	if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
	var ths = this;
	var func = function(e) {
		e = e || window.event;
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		var character = String.fromCharCode(code).toLowerCase();
		var keys = shortcut.toLowerCase().split("+");
		var kp = 0;
		var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
		var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
		for(var i=0; k=keys[i],i<keys.length; i++) {
			if(k == 'ctrl' || k == 'control') {if(e.ctrlKey) kp++;
			} else if(k ==  'shift') {if(e.shiftKey) kp++;
			} else if(k == 'alt') {if(e.altKey) kp++;
			} else if(k.length > 1) { if(special_keys[k] == code) kp++;
			} else { if(character == k) kp++;
				else {if(shift_nums[character] && e.shiftKey) { 
						character = shift_nums[character]; 
						if(character == k) kp++;
					}
				}
			}
		}
		if(kp == keys.length) {
			callback(e);
			if(!opt['propagate']) {
				e.cancelBubble = true;
				e.returnValue = false;
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
				return false;
			}
		}
	}
	if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
	else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
	else ele['on'+opt['type']] = func;
}

(function(){
	function openRandomWordPressCom() {
	  GM_openInTab('http://wordpress.com/next/');
	  GM_openInTab('http://wordpress.com/next/');
	  GM_openInTab('http://wordpress.com/next/');
	  GM_openInTab('http://wordpress.com/next/');
	  GM_openInTab('http://wordpress.com/next/');
	}
	function setKeyboardShortcuts() {
		var randomWordPressComShortcut  = prompt("Please enter prefill shortcut. Examples:\nALT+C\nALT+SHIFT+C");
		if(randomWordPressComShortcut) GM_setValue("randomWordPressComShortcut", randomWordPressComShortcut);
	}

	GM_registerMenuCommand("Random WordPress.com Blogs - Open Five Blogs at Random", openRandomWordPressCom);
	GM_registerMenuCommand("Random WordPress.com Blogs - Set Keyboard Shortcut (Adv)", setKeyboardShortcuts);

	var randomWordPressComShortcut = (GM_getValue('randomWordPressComShortcut') != undefined && GM_getValue('randomWordPressComShortcut') != '') ? GM_getValue('randomWordPressComShortcut') : "ALT+SHIFT+W";
	shortcut(randomWordPressComShortcut,openRandomWordPressCom);
})();
