// ==UserScript==
// @name           Super iGoogle
// @namespace      userscripts.org
// @description    Show/hide the header, footer and sidebar on iGoogle to save space! Perfect for small screens or netbooks!
// @include        http://google.*
// @include        http://www.google.*
// @copyright      Richard Coombs (stinkinrich88)
// @website        http://userscripts.org/scripts/show/26855
// @version        3.1
// ==/UserScript==

var loadTime = new Date();

//var outterSideClass = "G-LS kdSidebarHolder"; 
//var sidebarClass = "G-LS kdSidebarHolder"; 
//var tabsClass = "G-NX kdSidebarTab";
//var chatClass = "CSS_LAYOUT_COMPONENT CSS_CHAT_ROSTER";

var headerClass = "header_tile_image";
var headBarClass = "G-FU";
var lowerHeaderClass = "kdAppBar";
var tabTopBarClass = "G-PT";
var footerClass = "footerwrap";
var footBarClass = "G-BT kdRoundedContainer";
var miniSearchClass = "miniSearch";
var settingsMenuClass = "gbmcc";
var settingsMenuIndex = 2;
var pageToShorten = "G-CT kdRoundedContainer G-AT"
var forMiniSearchClass = "gbtc";
var forMiniSearchIndex = 1;

var hideSidebarClass = "kdSidebarButton";

var checkHeader = function() {
	waitForClass(headerClass, function(elm) {elm.style.display = (headerOn.value == 'true') ? '' : 'none';} );
	waitForClass(headBarClass, function(elm) {elm.style.borderTopWidth = (headerOn.value == 'true') ? '5px' : '0px'; elm.style.borderBottomWidth = '0px';});
}

var checkLowerHeader = function() {
	waitForClass(lowerHeaderClass, function(elm) {elm.style.display = (lowerHeaderOn.value == 'true') ? '' : 'none';} );
}

var checkSidebar = function() {
	waitForClass(hideSidebarClass, function(elm) {clickElement(elm);});
}

var checkFooter = function() {
	waitForClass(footerClass, function(elm) {elm.style.display = (footerOn.value =='true') ? '' : 'none';});
}

/*var checkAutoSide = function() {
	if (autoSideOn.value == 'true') sidebarOn.value = 'false';
	
	waitForClass(outterSideClass, function(elm) {if (autoSideOn.value =='true') {elm.addEventListener('mouseover', sidebarMouseOverEvent, false); elm.addEventListener ('mouseout', sidebarMouseOutEvent, false);} else {elm.removeEventListener('mouseover', sidebarMouseOverEvent, false); elm.removeEventListener ('mouseout', sidebarMouseOutEvent, false);}});
	waitForClass(tabsClass, function(elm) {if (autoSideOn.value =='true') {elm.addEventListener('mouseover', tabsChatMouseOverEvent, false);} else {elm.removeEventListener('mouseover', tabsChatMouseOverEvent, false);}});
	waitForClass(chatClass, function(elm) {if (autoSideOn.value =='true') {elm.addEventListener('mouseover', tabsChatMouseOverEvent, false);} else {elm.removeEventListener('mouseover', tabsChatMouseOverEvent, false);}}); // Stop inner sidebar counting as a mouseout
	
	checkSidebar();
}*/

var checkMiniSearch = function() {
	waitForClass(miniSearchClass, function(elm) {elm.style.display = (miniSearchOn.value =='true') ? '' : 'none';});
}

//					[Cookie name]		[Default value]
var headerOn 	= {key:'HeaderOn', 	value:'false', check:checkHeader};
var sidebarOn 	= {key:'SidebarOn', value:'false', check:checkSidebar}; 
var footerOn 	= {key:'FooterOn', 	value:'false', check:checkFooter}; 
var miniSearchOn = {key:'MiniSearchOn', value:'false', check:checkMiniSearch};
//var autoSideOn 	= {key:'AutoSideOn', 	value:'true', check:checkAutoSide};
var lowerHeaderOn 	= {key:'LowerHeaderOn', 	value:'false', check:checkLowerHeader};

/* START OF PROGRAM ##################### */

if (document.getElementById('bodyContainer')) {	// (Sloppy) check to see if current page is iGoogle
	document.body.style.background = '#FFFFFF';
	waitForClass(footBarClass, function(elm) {elm.style.borderBottomWidth = '0px';});	// To hide bar above footer
	waitForClass(pageToShorten, function(elm) {elm.style.marginBottom = '-4em';});	// Reduce white-space at bottom of page
	waitForClass('gssb_k', function(elm) {elm.style.display = 'none';});	// Reduce white-space at bottom of page
	// Added old style of installing menu as new version isn't working for some people:
	var optionMenuWorkaround = document.getElementById('gbd5');
	if (optionMenuWorkaround && optionMenuWorkaround.firstChild && optionMenuWorkaround.firstChild.firstChild) modifySettingsMenu(optionMenuWorkaround.firstChild.firstChild);
	else waitForClassIndex(settingsMenuClass, settingsMenuIndex, function(elm) {modifySettingsMenu(elm);});
	waitForClassIndex(forMiniSearchClass, forMiniSearchIndex, function(elm) {initMiniSearch(elm)});

	initCookies();
	initKeyboardShortcuts();

	checkHeader();
	checkLowerHeader();
	checkFooter();
//	checkAutoSide();
	checkMiniSearch();
}

/* END OF PROGRAM ####################### */

function waitForClass(cls, code){waitForClassIndex(cls, 0, code);}
function waitForClassIndex(cls, index, code){
	if (document.getElementsByClassName(cls)[index]) {
		var elm = document.getElementsByClassName(cls)[index];
		code(elm);
		// If class can't be found, call again later (if before timeout)
	} else if (new Date() - loadTime < 10000) setTimeout(function(){waitForClassIndex(cls, index, code)}, 100);
}

function clickElement(elm) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
	elm.dispatchEvent(evt);  
}

function initCookies() {
	initCookie(headerOn);
	initCookie(sidebarOn);
	initCookie(footerOn);
	initCookie(miniSearchOn);
	initCookie(lowerHeaderOn);
	//initCookie(autoSideOn);
}

function initCookie(obj) {
	var setting = readCookie(obj.key);
	if (setting == null) createCookie(obj.key, 	obj.value, 99999);
	else obj.value = setting;
}

function toggleElement(obj) {
	obj.value = (obj.value == 'true' ? 'false' : 'true');
	createCookie(obj.key, obj.value, 99999);
	obj.check();
}

function initMiniSearch(elm) {	
	var miniSearch = document.createElement('li');
	var miniForm = document.createElement("form");
	var miniInput = document.createElement("input");
	
	miniForm.appendChild(miniInput);
	miniInput.setAttribute('size', '30px');
	miniInput.style.margin="1px 5px 0 0";
	miniInput.setAttribute("class", miniSearchClass);
	miniForm.appendChild(document.createTextNode(" ")); 	// Spacing
	
	miniForm.action="/search";	// Need this for submitting queries
	miniInput.name='q';		// Need this for submitting queries
	miniInput.setAttribute("autocomplete", "off");
	// Need these lines to make minisearch position correct
	miniForm.className += 'gbgt';
	miniSearch.className += 'gbt gbtb';

	miniSearch.appendChild(miniForm);
	elm.insertBefore(miniSearch, elm.firstChild);
}

function modifySettingsMenu(elm) {
	elm.appendChild(newMenuItem("Add stuff", "/ig/directory?hl=en&root=/ig&igtab=Super&dpos=top", false));
	elm.appendChild(newMenuItem("Change theme", "/ig/directory?type=themes&dpos=indi_top&sort=popular&cat=&gl=us&hl=en", false));
	elm.appendChild(newMenuSeparator());
	elm.appendChild(newMenuItem("Header (Alt+1)", function() {toggleElement(headerOn);}, true));
	elm.appendChild(newMenuItem("Lower header (Alt+1)", function() {toggleElement(lowerHeaderOn);}, true));
	//elm.appendChild(newMenuItem("Sidebar (Alt+2)", function() {if (autoSideOn.value == 'true') toggleElement(autoSideOn); toggleElement(sidebarOn);}, true));
	elm.appendChild(newMenuItem("Sidebar (Alt+2)", function() {toggleElement(sidebarOn);}, true));
	//elm.appendChild(newMenuItem("Autohide sidebar", function() {toggleElement(autoSideOn);}, true));
	elm.appendChild(newMenuItem("Footer (Alt+3)", function() {toggleElement(footerOn);}, true));
	elm.appendChild(newMenuItem("Mini-search (Alt+4)", function() {toggleElement(miniSearchOn);}, true));
}

function newMenuItem(text, href, isScript) {
	var item = document.createElement("li");
	item.className += 'gbkp gbmtc';
	var link = document.createElement("a");
	item.appendChild(link);
	link.appendChild(document.createTextNode(text));
	link.className += 'gbmt';
	if (isScript) link.addEventListener("click", href, false);
	else link.href += href;
	return item;
}

function newMenuSeparator() {
	var item = document.createElement("li");
	var div = document.createElement("div");
	div.className += 'gbmh gbmtc';
	item.appendChild(div);

	return item;
}

// Function to add keyboard shortcuts to page
function initKeyboardShortcuts(){
	shortcut = getShortcutVar();
	shortcut.add("Alt+1", function() {toggleElement(headerOn); toggleElement(lowerHeaderOn);});
	//shortcut.add("Alt+2", function() {if (autoSideOn.value == 'true') toggleElement(autoSideOn); toggleElement(sidebarOn);});
	shortcut.add("Alt+2", function() {toggleElement(sidebarOn);});
	shortcut.add("Alt+3", function() {toggleElement(footerOn);});
	shortcut.add("Alt+4", function() {toggleElement(miniSearchOn);});
}

// ################################################################################
// ################ ALL FOLLOWING CODE NOT WRITTEN BY STINKINRICH88 ###############
// ################################################################################
//
// The following code is only used to read / save cookies which are used to save settings. 
// Code obtained from http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// ################################################################################
// ################ ALL FOLLOWING CODE NOT WRITTEN BY STINKINRICH88 ###############
// ################################################################################
//
// The following code is only used to add keyboard shortcuts. To change the keyboard
// shortcuts look at the initKeyboardShortcuts function
function getShortcutVar() {
/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
	return {
		'all_shortcuts':{},//All the shortcuts are stored in this array
		'add': function(shortcut_combination,callback,opt) {
			//Provide a set of default options
			var default_options = {
				'type':'keydown',
				'propagate':false,
				'disable_in_input':false,
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
				var character = String.fromCharCode(code);
				if(code == 188) character=","; //If the user presses , when the type is onkeydown
				if(code == 190) character="."; //If the user presses , when the type is onkeydown
				var keys = shortcut_combination.split("+");
				//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
				var kp = 0;
				//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
				var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^",
					"7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",
					".":">","/":"?","\\":"|"}
				//Special Keys - and their codes
				var special_keys ={
					'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,
					'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,
					'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,
					'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,
					'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,
					'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,
					'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
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
								if(character == k) kp++;}}}}
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
						}return false;}}}
			this.all_shortcuts[shortcut_combination] = {
				'callback':func, 'target':ele, 'event': opt['type']};
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
		}}}