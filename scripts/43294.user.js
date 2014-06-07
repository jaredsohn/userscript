// ==UserScript==
// @name           HWM_Forum_Add_Quotes
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/forum_messages.php*
// ==/UserScript==

document.addEventListener('keydown', keyDownEvent, false);
var tarea = document.getElementsByName('msg')[0];
if (!tarea) {return;}

function keyDownEvent(e){
	var n = e.keyCode?e.keyCode:e.charCode;
	var c = String.fromCharCode(n);
	if(!e.ctrlKey || n != 81) {return;}
	replaceSelectedText(tarea, 'quote');
}

function quote(s) {
	return "[quote]" + s + "[/quote]";
}

function replaceSelectedText(obj, cbFunc){
	obj.focus();
	
	if (document.selection) {
		var s = document.selection.createRange();
		if (s.text) {
			eval("s.text=" + cbFunc + "(s.text);");
			s.select();
			return true;
		}
	}
	else 
		if (typeof(obj.selectionStart) == "number") {
			if (obj.selectionStart != obj.selectionEnd) {
				var start = obj.selectionStart;
				var end = obj.selectionEnd;
				
				eval("var rs = " + cbFunc + "(obj.value.substr(start,end-start));");
				obj.value = obj.value.substr(0, start) + rs + obj.value.substr(end);
				obj.setSelectionRange(end, end);
			}
			return true;
		}
	
	return false;
}