// Picture Expander
// Version 1.1 Beta
// 12-03-2010
// Copyright (c) Paul Fanone
// 
// 
// ----------------------------------------------------------------------------------
// 
// Version 1.1 --> made a few changes to the way the scripts takes in the inputs
// 
//----------------------------------------------------------------------------------
//
// ==UserScript==
// @name           Picture Expander
// @namespace      http://userscripts.org
// @description    Expands one picture link into multiple picture links
// @include        *
// ==/UserScript==

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
	function Website() {
		var linkp1   = GM_getValue('linkp1');
		var linkp2   = GM_getValue('linkp2');
		var counter  = GM_getValue('counter');
		var base     = GM_getValue('base');
		var roof     = GM_getValue('roof');
		var zeroId   = GM_getValue('zeroId');
		var i=0;
		linkp1 = prompt("What is the first part of the link?");
		linkp1 = linkp1 || '';
		GM_setValue("linkp1", linkp1);
		linkp2 = prompt("What is the last part of the link?");
		linkp2 = linkp2 || '';
		GM_setValue("linkp2", linkp2);
		zeroId= prompt("What does the first coloumn start with?");
		zeroId= zeroId || '';
		GM_setValue("zeroId", zeroId);
		if(zeroId == 0) {
			counter = prompt("How many pages do you want to open?");
			counter = counter || '';
			GM_setValue("counter", counter);
			for(i=1; i <= 9; i++) {
				window.open(linkp1+'0'+i+linkp2,'Window'+i);
			}
			for(i=10; i <= counter; i++) {
				window.open(linkp1+i+linkp2,'Window'+i);
			}
		}
		else {
			base = prompt("Whats the first number?");
			base = base || '';
			GM_setValue("base", base);
			roof = prompt("Whats the last number?");
			roof = roof || '';
			GM_setValue("roof", roof);
			for(i=base; i <= roof; i++) {
				window.open(linkp1+i+linkp2,'Window'+i);
			}
		}
	}
	function setKeyboardShortcuts() {
		var mainShortcut  = prompt("Please enter Expander shortcut. Examples:\nALT+SHIFT+C");
		if(mainShortcut) GM_setValue("mainShortcut", mainShortcut);
	}

	GM_registerMenuCommand("Picture Expander", Website);
	GM_registerMenuCommand("Set Picture Expander Shortcuts (Adv)", setKeyboardShortcuts);

	var mainShortcut = (GM_getValue('mainShortcut') != undefined && GM_getValue('mainShortcut') != '') ? GM_getValue('mainShortcut') : "ALT+SHIFT+C";
	shortcut(mainShortcut,Website);
})();