// ==UserScript==
// @name           MSP Gaya "Emulator"
// @namespace      MSP
// @include        http://www.mspportal.com/*
// ==/UserScript==


var body = document.getElementsByTagName("body")[0]; 

/*
 * Show HD draw area
 * by allanmc - allanmc@gmail.com
 */
 
 var hd = true;
 if (hd){
	div=document.createElement('div');
	div.setAttribute('style','position:absolute;top:0;left:0;width:1280px;height:720px;border:1px solid red;z-index:1000;');
	body.appendChild(div);
	div=document.createElement('div');
	div.setAttribute('style','position:absolute;top:0px;left:0px;width:1100px;height:656px;border:1px dashed red;z-index:1000;');
	body.appendChild(div);
 } else {
	div=document.createElement('div');
	div.setAttribute('style','position:absolute;top:0;left:0;width:720px;height:576px;border:1px solid red;z-index:1000;');
	body.appendChild(div);
	div=document.createElement('div');
	div.setAttribute('style','position:absolute;top:0px;left:0px;width:624px;height:416px;border:1px dashed red;z-index:1000;');
	body.appendChild(div);
 }
/*
 * MSP Remote Emulator
 * by allanmc - allanmc@gmail.com
 */

var shortcut = shortcutObject();

//body.setAttribute("onload", "");

var focus_name = body.getAttribute("onloadset");
var focus_element = null;

//eval(body.getAttribute("onload"));
//alert(body.getAttribute("onload"));

var keyup;
var keydown;
var keyleft;
var keyright;

//Inject CSS to hide Firefox's the outline of focused links
var head = document.getElementsByTagName("head")[0];         
var style = document.createElement('style');
style.innerHTML = ':focus{-moz-outline-style: none;}';
style.innerHTML += 'img {border-style: none;}';
head.appendChild(style);
/*
var tables = document.getElementsByTagName("table"); 
for (var i = 0; i < tables.length; i++) { 
	tables[i].border = 1;
}
*/
//Traverse link elements
var links = document.getElementsByTagName("a"); 
if (!focus_name) setFocus(links[0]);
for (var i = 0; i < links.length; i++) { 
	if (links[i].name==focus_name) setFocus(links[i]);
	assignKeys(links[i]);
}

if (!focus_element) setFocus(links[0]);

//Traverse meta elements, and look for syabas background image
var meta = document.getElementsByTagName("meta"); 
for (var i = 0; i < meta.length; i++) { 
	if (meta[i].getAttribute("syabas-background")) {
		body.style.backgroundImage='url('+meta[i].getAttribute("syabas-background")+')';
	}
}
if (hd) {
	body.style.backgroundPosition = '-90px -32px';
} else {
	body.style.backgroundPosition = '-48px -80px';
}
body.style.backgroundRepeat = 'no-repeat';
//body.style.margin = '32px 0px 0px 90px';

shortcut.add('up','goUp()'); 
shortcut.add('down','goDown()'); 
shortcut.add('left','goLeft()'); 
shortcut.add('right','goRight()'); 

function setFocus(element) {
	if (!element) return;
	if (element==focus_element) return;
	if (element.getAttribute("onfocusload")=='' && element.getAttribute("onfocusload")!=null && element.href!='') {
		redirectHref(element.href);
	}
	keyup = element.getAttribute("onkeyupset"); 
	keydown = element.getAttribute("onkeydownset"); 
	keyleft = element.getAttribute("onkeyleftset"); 
	keyright = element.getAttribute("onkeyrightset"); 
	var img = element.getElementsByTagName("img"); 
	img = img[0];
	if (img) {
		var onfocussrc = img.getAttribute('onfocussrc');
		if (onfocussrc) {
			if (!img.getAttribute('offfocussrc')) {
				img.setAttribute('offfocussrc', img.src);
			}
			img.src = onfocussrc;
		}
		if (!element.getAttribute('onfocus')) element.setAttribute('onfocus', img.getAttribute('onfocus'));
		if (!element.getAttribute('onblur')) element.setAttribute('onblur', img.getAttribute('onblur'));
	}
	element.focus();
	if (focus_element) {
		img = focus_element.getElementsByTagName("img"); 
		img = img[0];
		if (img) {
			if (img.getAttribute('offfocussrc')) {
				img.src = img.getAttribute('offfocussrc');
			}
		}
	}
	//alert("Old focus: "+focus_name+"\nNew focus: "+element.name);
	
	focus_name = element.name;
	focus_element = element;
	
}


function assignKeys(element) {
	if (!element) return;
    tvid = element.getAttribute("tvid"); 
	accessKey = element.getAttribute("accessKey");
	url = element.href;
	key = '';
	id = (tvid!=''?tvid:accessKey);
	if (id) {
		switch (id.toLowerCase()) {
			case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":case "8":case "9":
				key = tvid;
				break;
			case "pgup":
				key = "pageup"; 
				break;
			case "pgdn":
				key = "pagedown"; 
				break;
			case "repeat":
				key = "r";
				break;
			case "tab":
				key = "t";
				break;
			case "red":
				key="f1";
				break;
			case "green":
				key="f2";
				break;
			case "yellow":
				key="f3";
				break;
			case "blue":
				key="f4";
				break;
			case "back":
				key="b";
				break;
			case "tab":
				key="t";
				break;
		}
	}
	if (key!='') {
		//alert('assigning: ' + key);
		shortcut.add(key,'redirectHref(\''+url+'\')'); 
		if (element.getAttribute('onclick')) {
			//shortcut.add(key,'doJS(\''+element.onclick+'\')'); 
			shortcut.add(key,'redirectHref(\'javascript:'+element.getAttribute('onclick')+'\')'); 
		}
		
		var innerImgs = element.getElementsByTagName("img"); 
		for (var i = 0; i < innerImgs.length; i++) { 
			if (innerImgs[i].getAttribute('onclick')) {
				var onclickEvent = innerImgs[i].getAttribute('onclick');
				onclickEvent = onclickEvent.replace('return true','');
				onclickEvent = onclickEvent.replace('return false','');
				onclickEvent = onclickEvent.replace('return','');
				shortcut.add(key,'redirectHref(\'javascript:function clickclick(){'+onclickEvent+'};clickclick();\')'); 
			}
		}
	}
}

function findByName(name) {
	if (!name) return;
	var links = document.getElementsByTagName("a"); 
	for (var i = 0; i < links.length; i++) { 
		//alert("Checking: " + links[i].name);
		if (links[i].name==name) return links[i];
	}
	return;
}

function focusNext() {
	//alert('Looking for next!');
	if (!focus_element) return;
	var links = document.getElementsByTagName("a"); 
	var foundit = false;
	for (var i = 0; i < links.length; i++) { 
		//alert('trying: '+links[i].name);
		if (/*links[i].name!='' && */foundit) {
			setFocus(links[i]);
			break;
		}
		if (links[i]==focus_element) {
			foundit = true;
		}
	}
}

function focusPrev() {
	//alert('Looking for previous!');
	if (!focus_element) return;
	var links = document.getElementsByTagName("a"); 
	var lastelement = null;
	for (var i = 0; i < links.length; i++) { 
		//alert('trying: '+links[i].name);
		if (links[i]==focus_element) {
			if (lastelement) {
				setFocus(lastelement);
			}
			break;
		}
		//if (links[i].name!='') {
			lastelement = links[i];
		//}
	}
}

function goUp() {
	if (keyup) {
		setFocus(findByName(keyup));
	} else {
		focusPrev();
	}
}

function goDown() {
	if (keydown) {
		setFocus(findByName(keydown));
	} else {
		focusNext();
	}
}

function goLeft() {
	if (keyleft) {
		setFocus(findByName(keyleft));
	} else {
		focusPrev();
	}
}

function goRight() {
	if (keyright) {
		setFocus(findByName(keyright));
	} else {
		focusNext()
	}
}

isInteger = function( s ) {
	return !isNaN( parseInt( s ) );
}

function redirectHref(url) {
	location.href=url;
	//alert('okay');
}

function doJS(js) {
	eval(js);
}

/**
 * Shortcut objects - made by:
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */

function shortcutObject()
 {
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
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
			//Special Keys - and their codes
			var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
	
	
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
				
				eval(callback);
				
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
 }