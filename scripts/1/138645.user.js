?// ==UserScript==
// @name       GrepoUtils RU (HotKey Plugin)
// @namespace  http://www.grepoutils.webxxs.com
// @version    1.0.0
// @description  Grepolis utils 2.0
// @description  Добавляет в игру Будильник, Игру на весь экран, Счетчик очков культуры, 
// @description  ссылки на (grepolis stats, grepo world, grepoutils, альянсовый форум
// @description  ссылки на (grepolis stats - данные по игроку, кнопки распределения войск при атаке
// @description  В окне города показывает код города в ББ-коде
// @description  Кнопки, будильник и другое. (By Evgenatrix)
// @include    *.grepolis.com/game*
// @copyright  RU Grepolis, Epsilon, Альянс Принципат Меч Камелота by Evgenatrix
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
/* оригинальная ссылка на скрипт запуска хоткеев (искать в самом начале скрипта слово "hotkey" и далее заменить http-адрес на: http://allykx1.no.sapo.pt/user/shortcut.js */


shortcut = {
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':true,
			'target':document,
			'keycode':true
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
};

function ajuda2() {
document.body.removeChild(document.getElementById('hka'));
};


function ajuda() {
var divha = document.createElement('div'); 
divha.style.zIndex = '10'; 
divha.id = 'hka';
divha.style.position = 'fixed'; 
divha.style.top = '63px'; 
divha.style.left = '496px';  //196 px  
divha.style.height = '180px'; //170px
divha.style.width = '210px'; 
divha.style.backgroundColor = '#2D5487';
divha.style.color = '#FFFFFF';   
divha.style.border = '1px solid #FFCC66';
divha.innerHTML = ' <br/> S - Сенат (Senate) <br/> B - Казарма (Barracks) <br/> D - Гавань (Docks) <br/> A - Академия (Academy) <br/> T - Храм (Temple) <br/> M - Рынок (Market) <br/> C - Пещера (Cave) <br/> P - Агора (Place) <br/> Z - Склад (Storage) <br/> X -  Симулятор (Simulator)'; 
document.body.appendChild(divha);
};


function inita() {
	shortcut.add("S",function() { Layout.buildingWindow.open('main'); },{ 'keycode':83 });	//S
	shortcut.add("B", function() { Layout.buildingWindow.open('barracks'); },{ 'keycode':66 }); //B
	shortcut.add("D", function() { Layout.buildingWindow.open('docks'); },{ 'keycode':68 }); //D
	shortcut.add("A", function() { Layout.buildingWindow.open('academy'); },{ 'keycode':65 }); //A
	shortcut.add("T", function() { Layout.buildingWindow.open('temple'); },{ 'keycode':84 }); //T
	shortcut.add("M", function() { Layout.buildingWindow.open('market'); },{ 'keycode':77 }); //M
	shortcut.add("C", function() { Layout.buildingWindow.open('hide'); },{ 'keycode':67 }); //C
	shortcut.add("P", function() { Layout.buildingwindow.location.href ='javascript:Overviews.openOverview("culture_overview")',},{ 'keycode':55 }); //P
	shortcut.add("Z", function() { Layout.buildingWindow.open('storage'); },{ 'keycode':90 }); //Z
	shortcut.add("X", function() { Layout.buildingWindow.open('place',{},'simulator'); },{ 'keycode':88 }); //X (place - agora, storage - sklad)
	// H - 72,  p- 80, Y - 89, Z - 90
};

function remover() {
shortcut.remove("S",function() { Layout.buildingWindow.open('main'); },{ 'keycode':83 });	
shortcut.remove("B", function() { Layout.buildingWindow.open('barracks'); },{ 'keycode':66 });
shortcut.remove("D", function() { Layout.buildingWindow.open('docks'); },{ 'keycode':68 });
shortcut.remove("A", function() { Layout.buildingWindow.open('academy'); },{ 'keycode':65 });
shortcut.remove("T", function() { Layout.buildingWindow.open('temple'); },{ 'keycode':84 });
shortcut.remove("M", function() { Layout.buildingWindow.open('market'); },{ 'keycode':77 });
shortcut.remove("C", function() { Layout.buildingWindow.open('hide'); },{ 'keycode':67 });
shortcut.remove("P", function() { Layout.buildingwindow.location.href ='javascript:Overviews.openOverview("culture_overview")',},{ 'keycode':55 }); 
shortcut.remove("Z", function() { Layout.buildingWindow.open('storage'); },{ 'keycode':90 });
shortcut.remove("X", function() { Layout.buildingWindow.open('place',{},'simulator'); },{ 'keycode':88 });
document.head.removeChild(document.getElementById('hotkey'));
document.body.removeChild(document.getElementById('hk'));
document.body.removeChild(document.getElementById('hka'));
};

inita();


if (hk.which == 55 && $.inArray(target,notTheseOnes) < 0){
            window.location.href ='javascript:Overviews.openOverview("culture_overview")';