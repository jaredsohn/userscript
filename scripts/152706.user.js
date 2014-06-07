// ==UserScript==
// ==UserScript==
// ==UserScript==
// @name        D3 Strike
// @namespace   http://userscripts.org/users/107277
// @include     http://*.d3.ru/*
// @include     http://d3.ru/*
// @version     1.0.1
// ==/UserScript==

(function(){
	
	strike = function (event) {
		var txtarea = event.target.parentNode.parentNode.parentNode.getElementsByClassName('i-form_text_input')[0];
		if (!txtarea) {
			return false;
		}
		txtarea.focus();

		var scrtop = txtarea.scrollTop;

		var txt_pre = txtarea.value.substring(0, txtarea.selectionStart);
		var txt_sel = txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd);
		
		var result = txt_sel.split('').join('\u0336');
		
		var txt_aft = txtarea.value.substring(txtarea.selectionEnd);

		if (txtarea.selectionStart == txtarea.selectionEnd) {
			var nuCursorPos = txtarea.selectionStart;
		} else {
			var nuCursorPos = String(txt_pre + result).length;
		}
		txtarea.value = txt_pre + result + txt_aft;
		txtarea.setSelectionRange(nuCursorPos, nuCursorPos);

		if (scrtop) txtarea.scrollTop = scrtop;
		return false;
	}
	
	process = function (event) {
		try {
			if (event.target.className != 'b-comments_reply_block') {
				return;
			}
			var tb = event.target.getElementsByClassName('b-textarea_editor')[0];
			if (tb) {
				(function (el) {
					setTimeout(
						function () {
							var a = document.createElement('a');
							a.href = 'javascript:void(0)';
							var s = document.createElement('s');
							var st = document.createTextNode('Strike');
							s.appendChild(st);
							a.appendChild(s);
							a.addEventListener('click', strike, false);
							el.insertBefore(a, el.children[3]);
						}
						, 100
					);
				})(tb);
			}
		} catch (e) {
			GM_log(e);
		}
	}
	
	window.addEventListener( "DOMNodeInserted", process, false);
})();