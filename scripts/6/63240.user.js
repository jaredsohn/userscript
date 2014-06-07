// ==UserScript==
// @name		Logowanie automatyczne
// @description		Automatycznie loguje do gry menelgame/pennergame/mendigogame/clodogame/serserionline/bumrise (SHIFT+ENTER)
// @version		3.5
// @author		mikskape
// @include		http://*menelgame.pl/
// @include		http://*menelgame.pl/logout/
// @include		http://*menelgame.pl/login/check/
// @include		http://*mendigogame.es/
// @include		http://*mendigogame.es/logout/
// @include		http://*mendigogame.es/login/check/
// @include		http://*pennergame.de/
// @include		http://*pennergame.de/logout/
// @include		http://*pennergame.de/login/check/
// @include		http://*clodogame.fr/
// @include		http://*clodogame.fr/logout/
// @include		http://*clodogame.fr/login/check/
// @include		http://*serserionline.com/
// @include		http://*serserionline.com/logout/
// @include		http://*serserionline.com/login/check/
// @include		http://*bumrise.com/
// @include		http://*bumrise.com/logout/
// @include		http://*bumrise.com/login/check/
// ==/UserScript==

var s_wersja = '3.5';
var s_info = 'http://userscripts.org/scripts/show/63240';
var s_url = 'http://userscripts.org/scripts/source/63240.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Automatyczne logowanie". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});

if (document.URL.match('menelgame.pl')) {
menelgame()
} else {
if (document.URL.match('mendigogame.es')) {
mendigogame()
} else {
if (document.URL.match('pennergame.de')) {
pennergame()
} else {
if (document.URL.match('clodogame.fr')) {
clodogame()
} else {
if (document.URL.match('serserionline.com')) {
serserionline()
} else {
if (document.URL.match('bumrise.com')) {
bumrise()
} else {
}
}
}
}

}
}


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

/**
 * END SCRIPT
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */


 
function menelgame() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("memail");
GM_deleteValue("mpass");
alert("Twój login i hasło zostały usunięte!");
});


var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("memail", "");
var pass  = GM_getValue("mpass", "");

if(email == "" || pass == "") {
GM_setValue("memail", prompt("Podaj swój login:"));
GM_setValue("mpass",  prompt("Podaj swoje hasło:"));

}

var email = GM_getValue("memail", "");
var pass  = GM_getValue("mpass", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementsByName("submitForm")[0].click ()

});
	}}
);


}


function mendigogame() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("mesemail");
GM_deleteValue("mespass");
alert("Twój login i hasło zostały usunięte!");
});


var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("mesemail", "");
var pass  = GM_getValue("mespass", "");

if(email == "" || pass == "") {
GM_setValue("mesemail", prompt("Podaj swój login:"));
GM_setValue("mespass",  prompt("Podaj swoje hasło:"));

}

var email = GM_getValue("mesemail", "");
var pass  = GM_getValue("mespass", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementsByName("submitForm")[0].click ()

});
	}}
);


}


function pennergame() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("pemail");
GM_deleteValue("ppass");
GM_deleteValue("pstolica");
alert("Twój login i hasło zostały usunięte!");
});

var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("pemail", "");
var pass  = GM_getValue("ppass", "");
var stolica  = GM_getValue("pstolica", "");

if(email == "" || pass == "" || stolica == "") {
GM_setValue("pemail", prompt("Podaj swój login:"));
GM_setValue("ppass",  prompt("Podaj swoje hasło:"));
confirmation();
}

function confirmation() {
	var answer = confirm("Berlin? (Kliknij OK)")
	if (answer){
		GM_setValue("pstolica", 'berlin')
	}
	else{
		GM_setValue("pstolica", 'hamburg')
	}
}

var email = GM_getValue("pemail", "");
var pass  = GM_getValue("ppass", "");
var stolica  = GM_getValue("pstolica", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementById(stolica).click ()
document.getElementsByName("submitForm")[0].click ()

});
	}}
);


}


function clodogame() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("cemail");
GM_deleteValue("cpass");
alert("Twój login i hasło zostały usunięte!");
});


var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("cemail", "");
var pass  = GM_getValue("cpass", "");

if(email == "" || pass == "") {
GM_setValue("cemail", prompt("Podaj swój login:"));
GM_setValue("cpass",  prompt("Podaj swoje hasło:"));

}

var email = GM_getValue("cemail", "");
var pass  = GM_getValue("cpass", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementsByName("submitForm")[0].click ()

});
	}}
);

}
function serserionline() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("semail");
GM_deleteValue("spass");
alert("Twój login i hasło zostały usunięte!");
});


var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("semail", "");
var pass  = GM_getValue("spass", "");

if(email == "" || pass == "") {
GM_setValue("semail", prompt("Podaj swój login:"));
GM_setValue("spass",  prompt("Podaj swoje hasło:"));

}

var email = GM_getValue("semail", "");
var pass  = GM_getValue("spass", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementsByName("submitForm")[0].click ();

});
	}}
);

}


function bumrise() {

GM_registerMenuCommand("Resetuj login i hasło", function(){
GM_deleteValue("bemail");
GM_deleteValue("bpass");
alert("Twój login i hasło zostały usunięte!");
});


var efield = document.getElementById('login_username');
var pfield = document.getElementById('password');

var email = GM_getValue("bemail", "");
var pass  = GM_getValue("bpass", "");

if(email == "" || pass == "") {
GM_setValue("bemail", prompt("Podaj swój login:"));
GM_setValue("bpass",  prompt("Podaj swoje hasło:"));

}

var email = GM_getValue("bemail", "");
var pass  = GM_getValue("bpass", "");

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js', onload: function (source)
	{
		shortcut.add("Shift+Enter", function(){

efield.value=email;
pfield.value=pass;
document.getElementsByName("submitForm")[0].click ();

});
	}}
);

}
;
