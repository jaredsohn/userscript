// ==UserScript==
// @name		Comment Pre-fill
// @author		Aaron Bassett http://foobr.co.uk
// @description		Attempts to prefill comment fields (url, name, email)
// @include		*
// ==/UserScript==

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
	function preFillComment() {
		var author = GM_getValue('author');
		var email  = GM_getValue('email');
		var url    = GM_getValue('url');
		if(author == undefined) {
			author = prompt("What name should be used for comments?");
			author = author || '';
			GM_setValue("author", author);
		}
		if(email == undefined) {
			email = prompt("What email should be used for comments?");
			email = email || '';
			GM_setValue("email", email);
		}
		if(url == undefined) {
			url = prompt("What url should be used for comments?");
			url = url || '';
			GM_setValue("url", url);
		}
		if(document.getElementById('author') && author != undefined) document.getElementById('author').value = author;
		if(document.getElementById('email') && email != undefined) document.getElementById('email').value = email;
		if(document.getElementById('url') && url != undefined) document.getElementById('url').value = url;
		var textareas = document.getElementsByTagName("textarea");
		for(var i=0; i < textareas.length; i++) {
			if(textareas[i].id == 'comment') {
				textareas[i].focus();
				break;
			}
		}
	}
	function resetPreFillComment() {
		var author = prompt("What name should be used for comments?");
		author = author || '';
		GM_setValue("author", author);
		var email = prompt("What email should be used for comments?");
		email = email || '';
		GM_setValue("email", email);
		var url = prompt("What url should be used for comments?");
		url = url || '';
		GM_setValue("url", url);
		alert("Thank you all values set :)");
	}
	function setKeyboardShortcuts() {
		var mainShortcut  = prompt("Please enter prefill shortcut. Examples:\nALT+C\nALT+SHIFT+C");
		var resetShortcut = prompt("Please enter prefill-reset shortcut. Examples:\nALT+C\nALT+SHIFT+C");
		if(mainShortcut) GM_setValue("mainShortcut", mainShortcut);
		if(resetShortcut) GM_setValue("resetShortcut", resetShortcut);
	}

	GM_registerMenuCommand("Prefill Comment", preFillComment);
	GM_registerMenuCommand("Reset Prefill Comment", resetPreFillComment);
	GM_registerMenuCommand("Set Prefill Comment Shortcuts (Adv)", setKeyboardShortcuts);

	var mainShortcut = (GM_getValue('mainShortcut') != undefined && GM_getValue('mainShortcut') != '') ? GM_getValue('mainShortcut') : "ALT+C";
	var resetShortcut = (GM_getValue('resetShortcut') != undefined && GM_getValue('resetShortcut') != '') ? GM_getValue('resetShortcut') : "ALT+SHIFT+C";
	shortcut(mainShortcut,preFillComment);
	shortcut(resetShortcut,resetPreFillComment);

})();