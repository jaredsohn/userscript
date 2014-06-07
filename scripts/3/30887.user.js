// ==UserScript==
// @name           Cellphone Keyboard
// @namespace      http://userscripts.org/scripts/show/30887
// @include        file://*
// @include        http://*
// @include        https://*
// ==/UserScript==

(function(){

var delay = 2000;
var lastkey = ['',1,-2];
var timer;

var cellkeys = [['0',' ','-'],
		['1','.','/',':','"'],
		['2','a','b','c'],
		['3','d','e','f'],
		['4','g','h','i'],
		['5','j','k','l'],
		['6','m','n','o'],
		['7','p','q','r','s'],
		['8','t','u','v'],
		['9','w','x','y','z']
		];
/*
function simulate_key(target, type, ctrlKey, altKey, shiftKey, keyCode, charCode) {
	var e = document.createEvent('KeyboardEvent');
	e.initKeyEvent(type, false, false, null, ctrlKey, altKey, shiftKey, false, keyCode, charCode);
	target.dispatchEvent(e);
}
*/

function cellinput(e) {
var text = this.value;
var curpos = this.selectionStart;
var match = false;

if (text.length > 0) {
	var key = text[curpos-1];

	clearTimeout(timer);

	for (var i = 0; i<10; i++) {
		if (key == cellkeys[i][0]) {
			if (key == lastkey[0]) {
				lastkey[0] = key;
				if (lastkey[1] >= cellkeys[i].length-1) {
					lastkey[1] = 0;
				} else {
					lastkey[1] = lastkey[1] + 1;
				}
				if (curpos == lastkey[2]+1) {
					if (curpos == 0) {
						lastkey = ['',1,curpos];
					} else if (curpos == 1) {
						lastkey = [key,1,curpos];
						text = text.substring(0,curpos-1) + cellkeys[i][lastkey[1]] + text.substring(curpos,text.length);
					} else {
						text = text.substring(0,curpos-2) + cellkeys[i][lastkey[1]] + text.substring(curpos,text.length);
						curpos = curpos - 1;
					}
				} else {
					lastkey = [key,1,curpos];
					text = text.substring(0,curpos-1) + cellkeys[i][lastkey[1]] + text.substring(curpos,text.length);
				}
			} else {
				if (curpos > 0) {
					lastkey = [key,1,curpos];
					text = text.substring(0,curpos-1) + cellkeys[i][lastkey[1]] + text.substring(curpos,text.length);
				}
			}
			timer = setTimeout(function(){lastkey = ['',1,curpos];}, delay);
			match = true;
		}
	}

	if (match == false) {
		lastkey = ['',1,curpos];
	}

	this.value = text;
	this.selectionStart = curpos;
	this.selectionEnd = curpos;
	this.focus();

//	simulate_key(inputs[0], 'keypress', false, false, false, null, 32);
//	simulate_key(inputs[0], 'keypress', false, false, false, 8, null);
}	
}

var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('input', cellinput, false);
}

var textareas = document.getElementsByTagName('textarea');

for (var i = 0; i < textareas.length; i++) {
	textareas[i].addEventListener('input', cellinput, false);
}

})();