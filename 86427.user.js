// ==UserScript==
// @name Umineko ColoredTextRender
// @description Umineko Colored Text, will change the <red>, <blue>, <gold>, <green> tags to the css's em/b/i tags and replace them with the colors in messages.
// @namespace http://forte.spacequadrat.de/
// @include http://www.gamefaqs.com/boards/*
// ==/UserScript==

var CONST = {NEW:'Post Message', PREV:'Preview Message', PREVS:'Preview and Spellcheck Message'};
var BTN_ID = {RED:'btnRed', BLUE:'btnBlue', GOLD:'btnGold', GREEN:'btnGreen'};

if (document.getElementsByName('messagetext').length != 0) {
	document.addEventListener('click', eventListener, true);
	
	btnRed = document.createElement("input"); 
	btnRed.setAttribute("id", BTN_ID.RED); 
	btnRed.setAttribute("value", "Red"); 
	btnRed.setAttribute("type", "button"); 
	
	btnBlue = document.createElement("input"); 
	btnBlue.setAttribute("id", BTN_ID.BLUE); 
	btnBlue.setAttribute("value", "Blue"); 
	btnBlue.setAttribute("type", "button"); 
	
	btnGold = document.createElement("input"); 
	btnGold.setAttribute("id", BTN_ID.GOLD); 
	btnGold.setAttribute("value", "Gold"); 
	btnGold.setAttribute("type", "button"); 

	btnGreen = document.createElement("input"); 
	btnGreen.setAttribute("id", BTN_ID.GREEN); 
	btnGreen.setAttribute("value", "Green"); 
	btnGreen.setAttribute("type", "button"); 
	if (document.getElementsByName('gamefox-quickpost-normal').length != 0) {
		var elemParent = document.getElementsByName('gamefox-quickpost-normal')[0];
		elemParent.insertBefore(btnRed, elemParent.childNodes[0]);
		//elemParent.childNodes[0].appendChild(btnRed);
	} else {
		var elemParent = document.getElementsByName('messagetext')[0];
		elemParent.parentNode.parentNode.insertBefore(btnRed, elemParent.parentNode);
	}
	
	btnRed.parentNode.insertBefore(btnBlue, btnRed.nextSibling);
	btnBlue.parentNode.insertBefore(btnGold, btnBlue.nextSibling);
	btnGold.appendChild(document.createElement("br"));
}

renderColors();

function eventListener(event) {
	var elemVal = event.target.value;
	if (elemVal == CONST.NEW || elemVal == CONST.PREV || elemVal == CONST.PREVS) {
		var text = document.getElementsByName('messagetext')[0].value;
		//red
		text = text.replace(/<red>/gi, '<em><b><i>').replace(/<\/red>/gi, '</i></b></em>');
		//blue
		text = text.replace(/<blue>/gi, '<em><b><b>').replace(/<\/blue>/gi, '</b></b></em>');
		//gold
		text = text.replace(/<gold>/gi, '<em><i><b>').replace(/<\/gold>/gi, '</b></i></em>');
		//green
		text = text.replace(/<green>/gi, '<b><i><em>').replace(/<\/green>/gi, '</em></i></b>');
			
		document.getElementsByName('messagetext')[0].value = text;
	} else {
		var elemId = event.target.id;
		var obj = document.getElementsByName('messagetext')[0];
		if (elemId == BTN_ID.RED) {	
			insertAtCaret(obj, '<red>', '</red>');
		} else if (elemId == BTN_ID.BLUE) {
			insertAtCaret(obj, '<blue>', '</blue>');
		} else if (elemId == BTN_ID.GOLD) {
			insertAtCaret(obj, '<gold>', '</gold>');
		} else if (elemId == BTN_ID.GREEN) {
			insertAtCaret(obj, '<green>', '</green>');
		}
	}
}

function insertAtCaret(obj, tagOpen, tagClose) {
	if (obj.selectionStart) {
		obj.focus();
		var start = obj.selectionStart;
		var end   = obj.selectionEnd;
		obj.value = obj.value.substr(0, start).concat(tagOpen).concat(obj.value.substr(start, end - start)).concat(tagClose).concat(obj.value.substr(end));
	}

	if (start != null) {
		setCaretTo(obj, start + tagOpen.length);
	} else {
		//obj.value += text;
	}
}

function setCaretTo(obj, pos) {
	if(obj.createTextRange) {
		var range = obj.createTextRange();
		range.move('character', pos);
		range.select();
	} else if(obj.selectionStart) {
		obj.focus();
		obj.setSelectionRange(pos, pos);
	}
}

function renderColors() {
	var msg = document.getElementsByClassName('msg_body');
	if (msg.lenght != 0) {
		var i = 0;
		for (i = 0; i < msg.length; i++) {
			//old red
			msg[i].innerHTML = msg[i].innerHTML.replace(/<em><b><i>/gi, "<font color=#F00><b>").replace(/<\/i><\/b><\/em>/gi, '</b></font>');
		
			//old blue
			msg[i].innerHTML = msg[i].innerHTML.replace(/<em><b><b>/gi, "<font color=#00F><b>").replace(/<\/b><\/b><\/em>/gi, '</b></font>');
		
			//old gold
			msg[i].innerHTML = msg[i].innerHTML.replace(/<em><i><b>/gi, "<font color=#FC0><b>").replace(/<\/b><\/i><\/em>/gi, '</b></font>');

			//old green
			msg[i].innerHTML = msg[i].innerHTML.replace(/<b><i><em>/gi, "<font color=#6C0><b>").replace(/<\/em><\/i><\/b>/gi, '</b></font>');
		}
	}
}
