// ==UserScript==
// @name            Google Reader Helpers
// @description     Add a New Shortcut( Esc : Collapse item ), add logout menu item, put link icon to first position in entry list
// @author          jmozmoz
// @version         0.1
// @grant           GM_addStyle
// @namespace       http://grh.userscripts.org/
// @include       	http://www.google.tld/reader/*
// @include		  	https://www.google.tld/reader/*
// ==/UserScript==

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':true,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}
 
function click_list_item(element) {
	// Click the specified element
	var mouseEvent = document.createEvent('MouseEvents');
	//mouseEevent.initEvent("click", true, false);
	mouseEvent.initMouseEvent('click', true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	element.dispatchEvent(mouseEvent);
}

function AddLogoutMenu() {
	if (!document.getElementById("cust-menu-item-logout")) {
		var settingsMenu = document.getElementById(":5").parentNode;
		var newSeparator = settingsMenu.appendChild(document.createElement("div"));
		newSeparator.setAttribute("class", "goog-menuseparator");
		newSeparator.setAttribute("style", "-moz-user-select: none;");
		newSeparator.setAttribute("role", "separator");
		var customizeMenuItemOuter = settingsMenu.appendChild(document.createElement("div"));
		customizeMenuItemOuter.setAttribute("class", "goog-menuitem");
		customizeMenuItemOuter.setAttribute("role", "menuitem");
		customizeMenuItemOuter.setAttribute("style", "-moz-user-select: none;");
		customizeMenuItemOuter.setAttribute("id", "cust-menu-item-logout");
		customizeMenuItemOuter.addEventListener("mouseover", function () {
			this.setAttribute("class", "goog-menuitem goog-menuitem-highlight")
		}, false);
		customizeMenuItemOuter.addEventListener("mouseout", function () {
			this.setAttribute("class", "goog-menuitem")
		}, false);
		var customizeMenuItemInner = customizeMenuItemOuter.appendChild(document.createElement("div"));
		customizeMenuItemInner.setAttribute("class", "goog-menuitem-content");
		customizeMenuItemInner.setAttribute("id", "cust-menu-item-logout");
		customizeMenuItemInner.innerHTML = "Logout";
		customizeMenuItemInner.setAttribute('onclick',"document.getElementById('gb_71').click();");
	}
}

function press_all_read() {
	var mark_all_btn = document.getElementById('mark-all-as-read-split-button').firstChild;
	if (mark_all_btn) {
//		window.alert("no button");
		var keyEvent = document.createEvent("KeyboardEvent");
        keyEvent.initKeyEvent("keypress", true, true, null, false, false, true, false, 65, 0);
        mark_all_btn.dispatchEvent(keyEvent);
//		window.alert("Shift+A clicked");
	} else {
//		window.alert("no button");
	}
}

let settingsMenuButton = document.getElementById("settings-button");
settingsMenuButton.addEventListener("click", AddLogoutMenu, false);

shortcut.add("esc",function() {
	if(document.getElementById('current-entry')!=null){
		var currentEntry = document.getElementById('current-entry');
		if (currentEntry.children.length > 1)
			click_list_item(currentEntry.childNodes[0]);
	}
});

shortcut.add("Shift+M",function() {
	press_all_read();
});

GM_addStyle('.entry-original { position:static !important;}');
GM_addStyle('.entry-original { float:left !important;}');
GM_addStyle('.entry-original { margin-top: 4px !important;}');
GM_addStyle('.entry-secondary { left: 15px !important;}');
GM_addStyle('.entry-secondary { margin-right: 5.5em !important;}');
GM_addStyle('.entry-source-title { left: 40px !important;}');
GM_addStyle('.entry-source-title { width: 12em !important;}');
GM_addStyle('.entry-icons { left: 20px !important;}');
GM_addStyle('.entry-date { margin-right: 0.5em !important;}');
