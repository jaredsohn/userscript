// ==UserScript==
// @name           HTMLInsert
// @namespace      http://artyv.ru
// @description    Allows to insert html tags into textareas and text fields using hotkeys
// @include        *
// ==/UserScript==

/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
shortcut={all_shortcuts:{},add:function(B,H,D){var G={type:"keydown",propagate:false,disable_in_input:false,target:document,keycode:false};if(!D){D=G}else{for(var A in G){if(typeof D[A]=="undefined"){D[A]=G[A]}}}var F=D.target;if(typeof D.target=="string"){F=document.getElementById(D.target)}var C=this;B=B.toLowerCase();var E=function(M){M=M||window.event;if(D.disable_in_input){var J;if(M.target){J=M.target}else{if(M.srcElement){J=M.srcElement}}if(J.nodeType==3){J=J.parentNode}if(J.tagName=="INPUT"||J.tagName=="TEXTAREA"){return }}if(M.keyCode){code=M.keyCode}else{if(M.which){code=M.which}}var L=String.fromCharCode(code).toLowerCase();if(code==188){L=","}if(code==190){L="."}var Q=B.split("+");var P=0;var N={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"};var K={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123};var O={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};if(M.ctrlKey){O.ctrl.pressed=true}if(M.shiftKey){O.shift.pressed=true}if(M.altKey){O.alt.pressed=true}if(M.metaKey){O.meta.pressed=true}for(var I=0;k=Q[I],I<Q.length;I++){if(k=="ctrl"||k=="control"){P++;O.ctrl.wanted=true}else{if(k=="shift"){P++;O.shift.wanted=true}else{if(k=="alt"){P++;O.alt.wanted=true}else{if(k=="meta"){P++;O.meta.wanted=true}else{if(k.length>1){if(K[k]==code){P++}}else{if(D.keycode){if(D.keycode==code){P++}}else{if(L==k){P++}else{if(N[L]&&M.shiftKey){L=N[L];if(L==k){P++}}}}}}}}}}if(P==Q.length&&O.ctrl.pressed==O.ctrl.wanted&&O.shift.pressed==O.shift.wanted&&O.alt.pressed==O.alt.wanted&&O.meta.pressed==O.meta.wanted){H(M);if(!D.propagate){M.cancelBubble=true;M.returnValue=false;if(M.stopPropagation){M.stopPropagation();M.preventDefault()}return false}}};this.all_shortcuts[B]={callback:E,target:F,event:D.type};if(F.addEventListener){F.addEventListener(D.type,E,false)}else{if(F.attachEvent){F.attachEvent("on"+D.type,E)}else{F["on"+D.type]=E}}},remove:function(A){A=A.toLowerCase();var D=this.all_shortcuts[A];delete (this.all_shortcuts[A]);if(!D){return }var B=D.event;var C=D.target;var E=D.callback;if(C.detachEvent){C.detachEvent("on"+B,E)}else{if(C.removeEventListener){C.removeEventListener(B,E,false)}else{C["on"+B]=false}}}};

function insertTag(e, j) {
	/** If selection exists */
	if(e.target.selectionStart || e.target.selectionStart == '0') {

		/** Opening tag */
		var tagOpn = shortcuts[j][1];
		/** Closing tag */
		var tagCls = shortcuts[j][2];

		/** Selection start */
		var selSta = e.target.selectionStart;
		/** Selection end */
		var selEnd = e.target.selectionEnd;

		/** Default cursor position - end */
		var curPos = selEnd + tagOpn.length + tagCls.length;
		/** Check for custom cursor position */
		var curOff = tagOpn.indexOf('|');

		/** If no closing tag */
		if(!tagCls.length) {
			/** Inserting it at end of selection */
			selSta = selEnd;
			curPos = selEnd + tagOpn.length;
		}

		/** If custom cursor position is specified */
		if(curOff > -1) {
			/** Remove cursor marker from tag */
			tagOpn = tagOpn.replace('|', '');
			/** Setting cursor position to marker place */
			curPos = selSta + curOff;
		}

		/** If no custom cursor position and empty selection */
		else if(selSta == selEnd) {
			/** Setting cursor to end of opening tag */
			curPos = selSta + tagOpn.length;
		}

		/** Updating textbox value */
		e.target.value = e.target.value.substring(0, selSta) +
						 tagOpn +
						 e.target.value.substring(selSta, selEnd) +
						 tagCls +
						 e.target.value.substring(selEnd, e.target.value.length);

		/** Setting focus to textbox and placing cursor */
		e.target.focus();
		e.target.setSelectionRange(curPos, curPos);
	}
}

function addShortcuts() {
	var elements = new Array();
	/** Getting all text inputs into array of elements */
	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].getAttribute('type') == 'text') {
			elements[elements.length] = inputs[i];
		}
	}
	/** Getting all textareas into array of elements */
	var textareas = document.getElementsByTagName('textarea');
	for(var i = 0; i < textareas.length; i++) {
		elements[elements.length] = textareas[i];
	}
	if(!elements.length) return;
	for(i = 0; i < elements.length; i++) {
		for(var j = 0; j < shortcuts.length; j++) {
			var action = 'function(e) { insertTag(e, ' + j + '); }';
			/** Attaching action on shortcut */
			shortcut.add(shortcuts[j][0], eval(action), { 'target' : elements[i] });
		}
	}
}


function htmlInsertInit() {
	/**
	 * Array of shortcuts
	 *
	 * Example:
	 * ['Key+combination', '<openingTag>', '<closingTag>']
	 *
	 * Also you can specify where to place cursor after tag insertion
	 * by typing | in opening tag. Example:
	 * ['Keys+combination', '<openingTag placeCursorHere="|">', '<closingTag>']
	 *
	 * Available key combinations you can find here:
	 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
	 */
	shortcuts = [['Ctrl+B', '<strong>', '</strong>'],
				 ['Ctrl+I', '<i>', '</i>'],
				 ['Ctrl+U', '<u>', '</u>'],
				 ['Ctrl+S', '<s>', '</s>'],
				 ['Ctrl+L', '<a href="|">', '</a>'],
				 ['Ctrl+P', '<p>', '</p>'],
				 ['Ctrl+G', '<img src="|" alt="" />', ''],];

	addShortcuts();
}

htmlInsertInit();