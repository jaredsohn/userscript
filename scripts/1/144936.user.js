// ==UserScript==
// @name           BBCodeShortCut
// @namespace      Mokadd.im/gmscripts/Enhancher
// @author         Shiplu Mokaddim
// @description    Add shortcut to the text area so that you can add link, image etc
// @version        0.1.3
// ==/UserScript==

function contentEval(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
}

var BBCS = {
	WIN : null,
	tag : function(t) {
		return BBCS.WIN.document.getElementsByTagName(t);
	},
	id : function(t) {
		return BBCS.WIN.document.getElementById(t);
	},
	tpl : {
		start : '[',
		end : ']',
		B : {
			name : 'B'
		},
		G : {
			name : 'IMG'
		},
		I : {
			name : 'I'
		},
		K : {
			name : 'CODE'
		},
		L : {
			name : 'URL',
			prompt : "Enter the url please",
			attr : null
		},
		Q : {
			name : 'QUOTE'
		},
		U : {
			name : 'U'
		},
	},
	setWindow : function(winObject) {
		BBCS.WIN = winObject;
	},
	addEvent : function(el, evt, cb) {
		if (el.addEventListener) {
			el.addEventListener(evt, cb, false);
		} else if (el.attachEvent) {
			el.attachEvent('on' + evt, cb);
		}
	},
	prompt : function(text) {
		return BBCS.WIN.prompt(text, '');
	},
	/// See http://stackoverflow.com/questions/5149683/
	getCaretPosition : function(el) {
		if (el.selectionStart) {
			return el.selectionStart;
		} else if (document.selection) {
			el.focus();

			var r = document.selection.createRange();
			if (r == null) {
				return 0;
			}

			var re = el.createTextRange(), rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length;
		}
		return 0;
	},
	/// see http://stackoverflow.com/questions/512528
	setCaretPosition : function(el, caretPos) {
		if (el != null) {
			if (el.createTextRange) {
				var range = el.createTextRange();
				range.move('character', caretPos);
				range.select();
			} else {
				el.focus();
				if (el.selectionStart !== undefined) {
					el.setSelectionRange(caretPos, caretPos);
				}
			}
		}
	},
	getSelectedText : function(el) {
		el.focus();
		var txt = '';
		if (BBCS.WIN.document.selection) {
			txt = BBCS.WIN.document.selection.createRange().text;
		} else if (el.selectionStart) {
			txt = el.value;
			var start = el.selectionStart
			    ,len = el.selectionEnd-el.selectionStart;
			txt = txt.substr(start, len);
		} else
			txt = "";

		return txt;
	},
	handler : function(event) {
		if (!event.ctrlKey)
			return;
		var key = event.keyCode ? event.keyCode : event.which;
		var character = String.fromCharCode(key);
		var selection = BBCS.getSelectedText(event.target).toString();
		
		if (selection.length <= 0)
			return;

		var position = BBCS.getCaretPosition(event.target);
		var text = event.target.value;
		var prefix = text.substr(0, position);
		var suffix = text.substring(position + selection.length);

		if (BBCS.tpl[character]) {
			var tpl = BBCS.tpl[character];
			var param = "";
			var otext = "";
			var newPos = 0;
			if (tpl.prompt && tpl.prompt.length > 0 && ( param = BBCS.prompt(tpl.prompt, ""), param.length > 0)) {
				if (tpl.attr)
					event.target.value = prefix + BBCS.tpl.start + tpl.name + " " + tpl.attr + "=" + param + BBCS.tpl.end + selection + BBCS.tpl.start + "/" + tpl.name + BBCS.tpl.end + suffix;
				else
					event.target.value = prefix + BBCS.tpl.start + tpl.name + "=" + param + BBCS.tpl.end + selection + BBCS.tpl.start + "/" + tpl.name + BBCS.tpl.end + suffix;

			} else
				event.target.value = prefix + BBCS.tpl.start + tpl.name + BBCS.tpl.end + selection + BBCS.tpl.start + "/" + tpl.name + BBCS.tpl.end + suffix;

			/// set new caret position
			newPos = event.target.value.length - suffix.length;
			BBCS.setCaretPosition(event.target, newPos);

			event.preventDefault();
			event.stopPropagation();

			return false;
		}
	},

	init : function(win) {
		BBCS.setWindow(win);
		var all_ta = BBCS.tag('textarea');
		for (var i = 0; i < all_ta.length; i++) {
			BBCS.addEvent(all_ta[i], 'keydown', BBCS.handler);
		}
	}
};

if (window.location.host.indexOf("forum.projanmo.com") != -1) {
	BBCS.init(window);
}

