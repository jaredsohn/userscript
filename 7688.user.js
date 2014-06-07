// ==UserScript==
// @name           Textareation
// @namespace      http://userjs.0fk.org
// @include        *
// @version        0.0.1
// ==/UserScript==

/*-----------------------------------------------------------------------------
 * TOC:
 *   Initialize
 *   Functions
 *-------------------------------------------------------------------------- */

/*-----------------------------------------------------------------------------
 * Initialize
 *-------------------------------------------------------------------------- */

for (var i = 0, textarea, textareas = document.getElementsByTagName('textarea'); textarea = textareas[i]; ++i) {
	addKeydown(textarea, i);
	addKeypress(textarea, i);
}

/*-----------------------------------------------------------------------------
 * Functions
 *-------------------------------------------------------------------------- */

function addKeydown(textarea, num) {
	/*
	 * Form save
	 *   Ctrl + S
	 * Form open
	 *   Ctrl + O
	 * Form submit
	 *   Ctrl + Enter
	 * Textarea resize
	 *   Ctrl + Space || Ctrl + Shift + Space
	 */
	var name = textarea.id;
	if (!name) {
		name = textarea.name;
		if (document.getElementsByName(textarea.name).length > 1) {
			name = (name || 'textarea') + num;
		}
	}
	textarea.addEventListener('keydown', function (e) {
		if (e.ctrlKey) {
			switch (e.keyCode) {
			// submit
			case 13:
				textarea.form && textarea.form.submit();
				break;
			// resize
			case 32:
				var s = textarea.style, D = 20;
				if (!s.height) {
					var h = textarea.offsetHeight;
					s.height = (h ? h : 50) + 'px';
				}
				s.height = (parseInt(s.height) + (!e.shiftKey ? 20 : -20)) + 'px';
				break;
			// open
			case 79:
				if ((new RegExp(name + '=([^;]+)')).test(document.cookie)) {
					textarea.value = unescape(RegExp.$1);
				}
				break;
			// save
			case 83:
				document.cookie = name + '=' + escape(textarea.value) + ';expires=' + (new Date((new Date).getTime() + 30 * 24 * 60 * 60 * 1000)).toGMTString() + ';';
				break;
			default:
				return;
			}
			e.preventDefault();
			e.stopPropagation();
		}
	}, true);
}

function addKeypress(textarea, num) {
	/*
	 * Tab input
	 *   Thanks by http://winofsql.jp/VA003334/smalltech051002175912.htm
	 */
	function insertString(o, i, s, e) {
		return o.slice(0, s) + i + o.slice(e);
	}
	function expandString(o, s, e) {
		s = o.lastIndexOf('\n', s);
		e = o.indexOf('\n', e);
		return { start: (s != -1 ? s + 1 : 0), end: (e != -1 ? e : o.length) };
	}
	textarea.addEventListener('keypress', function (e) {
		if (e.keyCode != 9)
			return;
		var elm = e.target;
		var sTop   = elm.scrollTop,
		    sStart = elm.selectionStart,
		    sEnd   = elm.selectionEnd;
		if (sStart == sEnd) {
			elm.value = insertString(elm.value, '\t', sStart, sEnd);
			elm.setSelectionRange(sStart + 1, sStart + 1);
		}
		else {
			var str;
			if (!e.shiftKey) {
				var r = expandString(elm.value, sStart, sEnd);
				sStart = r.start; sEnd = r.end;
				str = '\t' + elm.value.slice(sStart, sEnd).replace(/\n/g, '\n\t');
				if (str.slice(-1) == '\t')
					str = str.slice(0, -2) + '\n';
			}
			else {
				var r = expandString(elm.value, sStart, sEnd);
				sStart = r.start; sEnd = r.end;
				str = elm.value.slice(sStart, sEnd).replace(/\n/g, '\n');
				if (str.charAt(0) == '\t')
					str = str.slice(1, -1);
			}
			elm.value = insertString(elm.value, str, sStart, sEnd);
			elm.setSelectionRange(sStart, sStart + str.length);
		}
		e.preventDefault();
		elm.scrollTop = sTop;
	}, false);
}
