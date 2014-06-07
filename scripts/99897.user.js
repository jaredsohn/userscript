// ==UserScript==
// @name           trac templates english
// @namespace      trac
// @description    keyboard shrotcuts
// @include        http://*/newticket
// ==/UserScript==

//Get elements
var descField    = document.getElementById('field-description');
var typeField    = document.getElementById('field-type');
var TicketOwn    = document.getElementById('field-owner');
var TicketPri    = document.getElementById('field-priority');
var TicketMil    = document.getElementById('field-milestone');
var TicketComp   = document.getElementById('field-component');
var BtnNewTicket = document.forms[1].childNodes[6].childNodes[5];

if(descField == null || typeField == null) {
	throw 'some fields are not found';
}

// ===========  CONFIG ===========  
// Visual formating textarea
descField.rows = 20;
descField.style.width='98%';

typeField.size  = 4;
TicketOwn.size  = 8;
TicketPri.size  = 3;
TicketMil.size  = 5;
TicketComp.size = 5;

BtnNewTicket.style.fontWeight      = "bold";
BtnNewTicket.style.color           = "white";
BtnNewTicket.style.backgroundColor = "green";
BtnNewTicket.style.width           = "150px;";
BtnNewTicket.style.height          = "60px";

//Define number of choices
var iNumOptions = typeField.length;
var insert = 0;
//Define templates (same number as iNumOptions)
var template = new Array(iNumOptions);

// Reseting all templates to empty strings
for(var a=0;a < iNumOptions;a++) {
	template[a]="";
}


template[0]  = "'''How to reproduce:'''\n\n";
template[0] += "'''What happens:'''\n\n";
template[0] += "'''What should happen instead:'''";

template[1]  = "'''Specs:'''\n\n";
template[1] += "'''Interface:'''";

template[2]  = "'''Problem:'''\n\n";
template[2] += "'''Aim:'''\n\n";
template[2] += "'''tips:'''";

template[3]  = "'''The idea is:'''\n\n";



/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */

//Init the shortcut handler object
function initShortcuts () {

	shortcut = {
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

			var ele = opt.target
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

}


//Handle select dropdown menu
function typeChange() {
	index = typeField.selectedIndex;
	oldDescFieldValue = descField.value;
	descField.value = template[index];
	if(oldDescFieldValue.length > 0 && confirm('Append?')) {
		descField.value += "\n"+oldDescFieldValue;
	}
}

//Add event listeners
typeField.addEventListener("change", typeChange, true);

//Handle key shortcuts
initShortcuts();


/* bug : ne se prisvoqvat niakakvi neshta kato horata
for(var u=0;u < iNumOptions;u++) {
	sShortCut=""+"Alt+"+(u+1).toString();
	shortcut.add(sShortCut ,function() {
		oldDescFieldValue = descField.value;
		descField.value = template[u];
		if(1 == insert) {
				descField.value += oldDescFieldValue;
		}
		typeField.options[u].selected = true;
	});
}
*/

	shortcut.add("Alt+1",function() {
		oldDescFieldValue = descField.value;
		descField.value = template[0];
		if(oldDescFieldValue.length > 0 && confirm('Append?')) {
			descField.value += "\n" + oldDescFieldValue;
		}
		typeField.options[0].selected = true;
	});

	shortcut.add("Alt+2",function() {
		oldDescFieldValue = descField.value;
		descField.value = template[1];
		if(oldDescFieldValue.length > 0 && confirm('Append?')) {
				descField.value += "\n" + oldDescFieldValue;
		}
		typeField.options[1].selected = true;
	});	
	
	shortcut.add("Alt+3",function() {
		oldDescFieldValue = descField.value;
		descField.value = template[2];
		if(oldDescFieldValue.length > 0 && confirm('Append?')) {
				descField.value += "\n" + oldDescFieldValue;
		}
		typeField.options[2].selected = true;
	});

	shortcut.add("Alt+4",function() {
		oldDescFieldValue = descField.value;
		descField.value = template[3];
		if(oldDescFieldValue.length > 0 && confirm('Append?')) {
				descField.value += "\n" + oldDescFieldValue;
		}
		typeField.options[3].selected = true;
	});	