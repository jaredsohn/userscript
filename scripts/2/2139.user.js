// ==UserScript==
// @name          Extensible Textarea
// @namespace     http://lowreal.net
// @description   Extend textarea elements like xyzzy ; version 0.1.3
// @include       http://*
// @exclude       http://*lowreal.net/*
// @exclude       http://localhost/*
// ==/UserScript==
// 2005-11-11:
//   * Ã¥Â¯Â¾Ã¥Â¿ÂÃ£?ÂÃ£ÂÂÃ¦ÂÂ¬Ã¥Â¼Â§Ã£?Â®Ã¨Â¡Â¨Ã§Â¤Âº
//   * Ã§Â½Â®Ã¦?Â
// 2005-11-10:
//   * Ã£ÂÂÃ£ÂÂ¼Ã£ÂÂ¯Ã¨Â¡ÂÃ£?ÂÃ©ÂÂ·Ã£?ÂÃ£?Â¨Ã£?? mode-line Ã£?ÂÃ¤Â¼Â¸Ã£?Â³Ã£ÂÂÃ£?Â®Ã£ÂÂÃ¤Â¿Â®Ã¦Â­Â£ (CSS)
//   * Ã£ÂÂ»Ã£ÂÂ¬Ã£ÂÂ¯Ã£ÂÂ·Ã£ÂÂ§Ã£ÂÂ³Ã£?ÂÃ£?ÂÃ£ÂÂÃ£?Â¨Ã£??Ã£?Â¯ C-x Ã£?Â§Ã£ÂÂÃ£ÂÂÃ£ÂÂ©Ã£ÂÂ«Ã£ÂÂÃ¥ÂÂÃ¤Â½ÂÃ£ÂÂÃ£?ÂÃ£ÂÂÃ£ÂÂÃ£?ÂÃ£?Â«Ã¤Â¿Â®Ã¦Â­Â£
// 2005-11-09:
//   * Ã¨Â£ÂÃ¥Â®ÂÃ£ÂÂªÃ£ÂÂ¹Ã£ÂÂÃ£?Â®Ã¤Â½?Ã§Â½Â®Ã£?ÂÃ¦Â­Â£Ã£?ÂÃ£??Ã£?ÂªÃ£ÂÂÃ£ÂÂÃ£?ÂÃ£?Â«Ã£ÂÂ
//   * Ã¤Â»ÂÃ£?Â®Ã¨Â¦?Ã§Â´Â Ã£?Â«Ã£ÂÂ¹Ã£ÂÂ¿Ã£ÂÂ¤Ã£ÂÂ«Ã£?ÂÃ¥Â½Â±Ã©ÂÂ¿Ã£?ÂÃ£?ÂªÃ£?ÂÃ£ÂÂÃ£?ÂÃ£?Â«Ã¥Â°ÂÃ£?ÂÃ£?Â Ã£?ÂÃ©Â?Ã¦ÂÂ®

(function () {

	function d(args) {
		var out = [];
		for (var i = 0; i < arguments.length; i++) out.push(arguments[i]);
		if (navigator.userAgent.match(/Firefox/)) {
			dump(out.join(" ") + "\n");
		} else {
			// alert(out.join(" "));
		}
	}

	{
		function Array_each(func) {
			try {
				var context = {
					escape : function () {
						throw "break";
					}
				}
				for (var i = 0, len = this.length; i < len; i++) {
					func.apply(context, [this[i]]);
				}
			} catch (e) {
				if (e != "break") throw e;
			}
			return this;
		}
		Array.prototype.each = Array_each;
		function Array_include(val) {
			var ret = false;
			this.each(function (i) {
				if (val == i) ret = true;
			});
			return ret;
		}
		Array.prototype.include = Array_include;

		function Array_uniq() {
			var ret = new Array();
			this.each(function (i) {
				if (!ret.include(i)) ret.push(i);
			});
			return ret;
		}
		Array.prototype.uniq = Array_uniq;

		// string.match Ã£?Â¯ g Ã¦ÂÂÃ£?Â« regexp.exec Ã£?Â®Ã§Â¬Â¬Ã¤Â¸ÂÃ¨Â¦?Ã§Â´Â Ã£?ÂÃ£?ÂÃ£?ÂÃ£?ÂÃ£?ÂÃ£?Â¦Ã£??Ã£ÂÂÃ£?ÂªÃ£?ÂÃ£?Â®Ã£?Â§Ã£ÂÂ
		function String_match2(regexp) {
			if (regexp.global) {
				var ret = [];
				regexp.lastIndex = 0;
				for (;;) {
					var lastIndex = regexp.lastIndex;
					var m = regexp.exec(this);
					if (!m) break;
					ret.push(m);
					if (regexp.lastIndex == lastIndex) regexp.lastIndex++;
				}
				return ret;
			} else {
				return regexp.exec(this);
			}
		}
		String.prototype.match2 = String_match2;

	}

	var Global = this;
	var HTTP = {
		UNINITIALIZED : 0,
		LOADING       : 1,
		LOADED        : 2,
		INTERACTIVE   : 3,
		COMPLETED     : 4,

		createXMLHttpRequest : function () {
			return Global.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		},

		/* Ã¥?ÂÃ¦ÂÂÃ£ÂÂªÃ£ÂÂ¯Ã£ÂÂ¨Ã£ÂÂ¹Ã£ÂÂÃ£?ÂÃ£ÂÂÃ£ÂÂAjax Ã£?Â«Ã£?Â¯Ã¥?ÂÃ£?ÂÃ£?ÂªÃ£?ÂÃ£?Â Ã£Â?Ã£?ÂÃ£ÂÂ */
		get : function (path, func) {
			var ret;
			var req = this.createXMLHttpRequest();
			req.open("GET", path, false);
			req.send(null);
			if (func) {
				ret = func(req);
			} else {
				if (req.status == 200) {
					ret = req.responseText;
				} else {
					throw this.HTTPError(req.status);
				}
			}
			return ret;
		},


		ajax : function (method, path, func) {
			var ret;
			var req = this.createXMLHttpRequest();
			req.open(method, path, true);
			ret = func(req);
			req.send(ret);
		},


		HTTPError : function (message) {
			var ret = new Error(message);
			ret.name = "HTTPError";
			return ret;
		}
	}

	function keyBinding(textarea, binding) {
		this.textarea = textarea;
		this.keyStack = [];
		this.exec = null;
		this.input = 0;
		this.bindingHelp = null;
		this.eventHook = {};
		this.setKeyBinding(binding);

		// e.which == 0
		this.specialCharTable1 = {
			9 : "TAB",
			27 : "ESC",
			33 : "PageUp",
			34 : "PageDown",
			35 : "End",
			36 : "Home",
			37 : "Left",
			38 : "Up",
			39 : "Right",
			40 : "Down",
			45 : "Insert",
			46 : "Delete",
			112 : "F1",
			113 : "F2",
			114 : "F3",
			115 : "F4",
			116 : "F5",
			117 : "F6",
			118 : "F7",
			119 : "F8",
			120 : "F9",
			121 : "F10",
			122 : "F11",
			123 : "F12"
			};
		this.specialCharTable2 = {
			8 : "BS",
			13 : "RET",
			32 : "SPC"
			};

		var _this = this;
		textarea.addEventListener("keydown", function (e) {
			return _this.keydown(e);
		}, true);
		textarea.addEventListener("keypress", function (e) {
			return _this.keypress(e);
		}, true);
		textarea.addEventListener("keyup", function (e) {
			return _this.keyup(e);
		}, true);
	}
	keyBinding.prototype = {
		keydown : function (e) {
			if (e.which >= 16 && e.which <= 18) { // Ctrl Shift Alt
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			d();
			d("keydown");
			d(e.which, e.charCode,  e.keyCode, String.fromCharCode(e.which));
		},

		keypress : function (e) {
			d();
			d("keypress");
			// alert([e.which, e.charCode,  e.keyCode, String.fromCharCode(e.which)].join(", "));
			d(e.which, e.charCode,  e.keyCode, String.fromCharCode(e.which));
			if (this.bindingHelp) this.bindingHelp.style.display = "none";
			var input = "";
			if (e.ctrlKey) input += "C-";
			if (e.altKey)  input += "M-";
			if (e.which == 0) {
				chr = this.specialCharTable1[e.keyCode];
			} else {
				chr = this.specialCharTable2[e.which];
				if (!chr) chr = String.fromCharCode(e.which);
			}
			input += chr;
			this.keyStack.push(input);

			var wish = false;
			var keyStroke = this.keyStack.join(" ");
			var regexp = RegExp("^" + keyStroke.replace(/\\/, "\\\\").replace(/(\.|\(|\)|\||\?|\$|\^|\*|\+|\{|\}|\[|\])/, "\\$1") + " ");
			d(keyStroke);

			this.callEventHooks("keypress", [input, keyStroke]);
			for (bind in this.binding) {
				if (bind == keyStroke) {
					var ret = this.binding[bind]();
					if (typeof ret == "undefined") {
						d("Canceling Event");
						e.preventDefault();
						e.stopPropagation();
					} else if (ret == false) {
						wish = true;
					}
					break;
				}
				if (bind.concat(" ").match(regexp)) {
					wish = true;
				}
			}
			if (wish) {
				window.status = keyStroke;
				e.preventDefault(); // Ã¥ÂÂ¥Ã¥ÂÂÃ£ÂÂÃ£ÂÂ­Ã£ÂÂ£Ã£ÂÂ³Ã£ÂÂ»Ã£ÂÂ«
				e.stopPropagation();
			} else {
				// Ã£Â?Ã£ÂÂ¤Ã£ÂÂ³Ã£ÂÂÃ£?ÂÃ£ÂÂÃ£?Â¦Ã£?ÂªÃ£?ÂÃ£?ÂªÃ£ÂÂÃ£ÂÂ¯Ã£ÂÂªÃ£ÂÂ¢
				this.keyStack = [];
				window.status = "";
			}
		},

		keyup : function (e) {
			this.callEventHooks("keyup", [this.keyStack.join(" ")]);
		},

		showBindingHelp : function () {
			var table = document.getElementById("key-bind-binding-table");
			if (table) table.parentNode.removeChild(table);
			table = document.createElement("dl");
			table.id = "key-bind-binding-table";
			for (bind in this.binding) {
				var dt  = document.createElement("dt");
				var dd  = document.createElement("dd");
				var pre = document.createElement("pre");
				dt.appendChild(document.createTextNode(bind));

				var content = this.binding[bind].toString();
				content = content.replace(/^\s*function \(\) \{[\r\n]*|\}\s*$/g, "");
				pre.appendChild(document.createTextNode(content));
				dd.appendChild(pre);
				table.appendChild(dt);
				table.appendChild(dd);
			}
			this.textarea.parentNode.insertBefore(table, this.textarea);
			this.bindingHelp = table;
		},

		setKeyBinding : function (binding) {
			this.binding = {};
			for (bind in binding) {
				this.binding[bind] = binding[bind];
			}
		},

		addEventHook : function (ev, func) {
			if (!this.eventHook[ev]) this.eventHook[ev] = [];
			this.eventHook[ev].push(func);
		},

		callEventHooks : function (ev, arg) {
			if (!this.eventHook[ev]) return;
			for (var i = 0, len = this.eventHook[ev].length; i < len; i++) {
				this.eventHook[ev][i].apply(this, arg);
			}
		}
	}
	/*
window.addEventListener("load", function (e) {
	var kb = new keyBinding(document.getElementById("xmltext"), {
		"C-x i" : function () { alert("C-x i") },
		"C-x I" : function () { alert("C-x I") },
		"C-x b" : function () { alert("C-x b") },
		"M-x" : function () { alert("M-x") },
		"/" : function () { alert("/"); }
	});
}, true);
	 */

	function extensibleTextarea (targetTextarea, modeFunctions, defaultMode) {
		this.caretPos = 0;
		this.lineNum  = 0;
		this.linesBuf = [];
		this.mode     = "";
		this.modeFunctions = modeFunctions;
		this.mark     = 0;
		this.killRing   = "";
		this.isNarrow = false;

		this.defaultKeyBind = {
			"M-x"     : function () { _this.focusMiniBuffer() },
			"TAB"     : function () { _this.complement(); },
			"C-SPC"   : function () { _this.setMark() },
			"Down"    : function () { return _this.complementDown() },
			"Up"      : function () { return _this.complementUp() },
			"C-w"     : function () { _this.killRegion() },
			"M-w"     : function () { _this.copyRegionAsKill() },
			"C-y"     : function () { _this.yank() },
			"C-r"     : function () { _this.showReplaceWindow() },
			"C-x"     : function () { return _this.ctrlXPrefix() },
			"C-x r s"     : function () { return _this.regionToSelection() },
			"C-x n"   : function () { _this.narrow() },
			"C-x w"   : function () { _this.widen() },
			"C-x C-x"   : function () { _this.exchangePointAndMark() },
			"C-x h"   : function () { _this.kb.showBindingHelp() }
		};

		this.textarea = targetTextarea;
		this.complementWindow = document.createElement("div");
		this.complementWindow.id = "complement-window";
		with (this.complementWindow.style) {
			position = "absolute";
			display  = "none";
			height   = "15em";
		}
		this.textarea.parentNode.appendChild(this.complementWindow);
		this.complementWindow.list = [];
		this.setComplementList([]);

		this.modeLine = document.createElement("div");
		this.modeLine.id = "mode-line";

		this.miniBuffer = document.createElement("input");
		this.miniBuffer.id = "mini-buffer"
			this.miniBuffer.type = "text";
		this.miniBuffer.style.width = "100%";
		var miniBufferContainer = document.createElement("div");
		miniBufferContainer.appendChild(this.miniBuffer);
		this.miniBufferHistory = [];
		this.miniBuffer.history = -1;

		this.statusArea = document.createElement("div");
		this.statusArea.id = "status-area";
		this.setStatus("ready");

		if (this.textarea.nextSibling) {
			this.textarea.parentNode.insertBefore(this.statusArea, this.textarea.nextSibling);
			this.textarea.parentNode.insertBefore(miniBufferContainer, this.textarea.nextSibling);
			this.textarea.parentNode.insertBefore(this.modeLine, this.textarea.nextSibling);
		} else {
			this.textarea.parentNode.appendChild(this.modeLine);
			this.textarea.parentNode.appendChild(miniBufferContainer);
			this.textarea.parentNode.appendChild(this.statusArea);
		}

		var _this = this;
		this.kb = new keyBinding(this.textarea, this.defaultKeyBind);
		this.mkb = new keyBinding(this.miniBuffer, {
			"RET" : function () { _this.miniBufferRET() },
			"C-g" : function () { _this.miniBuffer.value = ""; _this.textarea.focus(); },
			"Down"    : function () { return _this.miniBufferComplementDown() },
			"Up"      : function () { return _this.miniBufferComplementUp() },
			"TAB" : function () { _this.miniBufferComplement() }
		});
		this.mkb.addEventHook("keypress", function (input, stroke) {
			if (input == "Down" || input == "Up" || input == "TAB") return;
			if (_this.complementWindow.style.display == "block") {
				_this.complementWindow.style.display = "none";
			}
		});
		this.kb.addEventHook("keypress", function (input, stroke) {
			_this.setVar();
			if (stroke != "") _this.setStatus(stroke);
			if (input == "Down" || input == "Up" || input == "TAB") return;
			if (_this.complementWindow.style.display == "block") {
				_this.complementWindow.style.display = "none";
			}
		});
		this.kb.addEventHook("keyup", function (stroke) {
			_this.setVar();
			_this.setModeLine();
		});
		this.textarea.addEventListener("click", function (e) {
			_this.setVar();
			_this.setModeLine();
			// d(_this.textarea.offsetHeight, _this.textarea.rows);
			if (_this.complementWindow.style.display == "block")
				_this.complementWindow.style.display = "none";
		}, false);

		this.setVar();
		this.setMode(defaultMode);
		this.setModeLine();
	}
	extensibleTextarea.prototype = {

		showReplaceWindow : function () {
			var rw = document.getElementById("replace-window");
			if (!rw) {
				rw = document.createElement("div");
				rw.id = "replace-window";
				eSearchP = document.createElement("p");
				eSearchLabel = document.createElement("label");
				eInputSearch = document.createElement("input");
				eInputSearch.type = "text";
				eSearchLabel.appendChild(document.createTextNode("Search (RegExp):"));
				eSearchLabel.appendChild(document.createElement("br"));
				eSearchLabel.appendChild(eInputSearch);
				eSearchP.appendChild(eSearchLabel);

				eReplaceP = document.createElement("p");
				eReplaceLabel = document.createElement("label");
				eInputReplace = document.createElement("input");
				eInputReplace.type = "text";
				eReplaceLabel.appendChild(document.createTextNode("Replace:"));
				eReplaceLabel.appendChild(document.createElement("br"));
				eReplaceLabel.appendChild(eInputReplace);
				eReplaceP.appendChild(eReplaceLabel);

				eInputReplaceAll = document.createElement("input");
				eInputReplaceAll.type = "button";
				eInputReplaceAll.value = "Ã¥ÂÂ¨Ã£?Â¦Ã§Â½Â®Ã£??Ã¦?ÂÃ£?Â";
				eInputCancel = document.createElement("input");
				eInputCancel.type = "button";
				eInputCancel.value = "Ã£ÂÂ­Ã£ÂÂ£Ã£ÂÂ³Ã£ÂÂ»Ã£ÂÂ«";

				var _this = this;

				eInputCancel.addEventListener("click", function (e) {
					rw.style.display = "none";
					_this.textarea.focus();
				}, false);
				eInputReplaceAll.addEventListener("click", function (e) {
					d(eInputSearch.value, eInputReplace.value)
						_this.update(_this.textarea.value.replace(RegExp(eInputSearch.value, "g"), eInputReplace.value));
					rw.style.display = "none";
					_this.textarea.focus();
				}, false);
				with (rw) {
					appendChild(eSearchP);
					appendChild(eReplaceP);
					appendChild(eInputReplaceAll);
					appendChild(eInputCancel);
				}
				document.getElementsByTagName("body")[0].appendChild(rw);
			} else {
				rw.style.display = "block";
			}
			eInputSearch.focus();
		},

		ctrlXPrefix : function () {
			d(this.textarea.selectionStart, this.textarea.selectionEnd);
			if (this.textarea.selectionStart == this.textarea.selectionEnd) {
				return false;
			} else {
				return true;
			}
		},

		regionToSelection : function () {
			var start = this.caretPos;
			var end = this.mark;
			if (end < start) {
				tmp = start;
				start = end;
				end = tmp;
			}
			this.textarea.setSelectionRange(start, end);
		},

		setMark : function () {
			if (this.isNarrow)
				this.mark = this.narrowBuffer[0].length + this.caretPos;
			else
				this.mark = this.caretPos;
			this.setStatus("Set Mark");
		},

		copyRegionAsKill : function () {
			var start = this.mark;
			var end   = this.caretPos;
			if (start > end) {
				var tmp = start;
				start = end;
				end = tmp;
			}
			this.killRing = this.textarea.value.substring(start, end);
		},

		killRegion : function () {
			var start = this.mark;
			var end   = this.caretPos;
			if (start > end) {
				var tmp = start;
				start = end;
				end = tmp;
			}
			this.killRing = this.textarea.value.substring(start, end);
			this.update(this.textarea.value.substring(0, start) + this.textarea.value.substring(end), start);
		},

		yank : function () {
			this.insert(this.killRing);
		},

		narrow : function () {
			d("narro() ", this.isNarrow);
			if (this.isNarrow) return;
			var start = this.mark;
			var end   = this.caretPos;
			if (start > end) {
				var tmp = start;
				start = end;
				end = tmp;
			}
			this.mark = this.mark - start;
			this.narrowBuffer = [this.textarea.value.substring(0, start), this.textarea.value.substring(end)];
			this.update(this.textarea.value.substring(start, end), 0);
			this.isNarrow = true;
			this.textarea.className = "narrow";
		},

		widen : function () {
			if (!this.isNarrow) return;
			this.update(this.narrowBuffer[0] + this.textarea.value + this.narrowBuffer[1], this.narrowBuffer[0].length + this.caretPos);
			this.mark = this.mark + this.narrowBuffer[0].length;
			this.isNarrow = false;
			this.textarea.className = "";
		},

		exchangePointAndMark : function () {
			var tmp = this.mark;
			this.mark = this.caretPos;
			this.caretPos = tmp;
			this.update(this.textarea.value);
		},

		focusMiniBuffer : function () {
			this.miniBuffer.focus();
			this.miniBuffer.history = -1;
		},

		miniBufferRET : function () {
			var buff = this.miniBuffer.value;
			var func = buff.match(/^\w+/);
			this.miniBuffer.value = "";
			var ret = "";
			this.textarea.focus();
			if (buff == "") return;
			this.miniBufferHistory.unshift(buff);
			d(func);
			if (this.modeFunctions[func]) {
				d("M-x set-mode");
				this.setMode(func);
			} else if (this.modeObj[func] && typeof this.modeObj[func] == "function") {
				d("M-x call mode-func");
				this.setStatus("Call function `" + func + "'");
				eval("this.modeObj." + buff);
			} else {
				try {
					ret = eval(buff).toString();
					this.setStatus("Insert: " + buff);
				} catch (e) {
					this.setStatus(e.toString());
				}
				this.insert(ret);
			}
		},

		miniBufferComplement : function () {
			var caret = this.miniBuffer.selectionStart;
			if (this.complementWindow.style.display == "block") {
				with (this.complementWindow) {
					this.miniBuffer.value = this.miniBuffer.value.substring(0, caret) + list[cpos].substring(del);
					style.display = "none";
				}
			} else {
				var tokens = this.miniBuffer.value.substring(0, caret).match2(/\b\w+\b/g);
				var prevToken = tokens[tokens.length-1];
				var candidate = [];

				prevToken = prevToken ? prevToken : [""];
				for (mode in this.modeFunctions) {
					if (mode.indexOf(prevToken[0]) == 0) {
						candidate.push(mode);
					}
				}
				for (func in this.modeObj) {
					if (func.indexOf(prevToken[0]) == 0) {
						candidate.push(func);
					}
				}
				candidate = candidate.uniq().sort();

				this.setComplementList(candidate, prevToken[0].length);
				if (this.complementWindow.list == 0) return;

				/* calc window position */
				var css = window.getComputedStyle(this.miniBuffer, "");
				var fontSize = parseFloat(css.getPropertyValue("font-size"));
				var x = 0;
				var y = 0;

				y = 1;
				var last = this.miniBuffer;
				for (var i = 0; i < last.length; i++) {
					var chr = last.charCodeAt(i);
					if (chr == 9) {
						x += 8;
					} else if (chr <= 177) {
						x += 1;
					} else {
						x += 2;
					}
				}
				x = x * fontSize / 2;
				y = y * fontSize * 1.2 + 2;

				x = x - this.miniBuffer.scrollLeft;
				y = y - this.miniBuffer.scrollTop;
				var offsetNode = this.miniBuffer;
				while (offsetNode.offsetParent) {
					d(offsetNode.offsetParent);
					x += offsetNode.offsetLeft;
					y += offsetNode.offsetTop;
					offsetNode = offsetNode.offsetParent;
				}

				with (this.complementWindow.style) {
					display = "block";
					top     =  y + "px";
					left    =  x + "px";
				}
				this.setComplementPos(0);
			}
		},

		setStatus : function (str) {
			var cn = this.statusArea.childNodes;
			for (var i = 0, len = cn.length; i < len; i++) {
				this.statusArea.removeChild(cn[i]);
			}
			if (typeof str == "string") {
				this.statusArea.value = str;
				this.statusArea.appendChild(document.createTextNode(str));
			} else {
				this.statusArea.appendChild(str);
			}
		},

		setModeLine : function () {
			if (this.modeLine.firstChild) this.modeLine.removeChild(this.modeLine.firstChild);

			var modeLineNode = document.createElement("span");
			with (modeLineNode) {
				appendChild(document.createTextNode("(" + this.mode + ") "));
				if(this.isNarrow) appendChild(document.createTextNode(":Narrow "));
				appendChild(document.createTextNode("Line: " + (this.lineNum + 1) + " / " + this.linesBuf.length));
				appendChild(document.createTextNode("  Caret: " + this.caretPos));
			}

			var markLine = this.textarea.value.substring(0, this.mark).match(/\n/g);
			markLine = markLine ? markLine.length : 0;
			var markLinePos = this.mark - this.linesBuf.slice(0, markLine).join("\n").length;
			if (markLine != 0) markLinePos--;

			with (modeLineNode) {
				appendChild(document.createTextNode("        Mark: " + (markLine + 1) + ":" + (markLinePos + 1) + "  ["));
				appendChild(document.createTextNode(this.linesBuf[markLine].substring(markLinePos - 20, markLinePos)));
				var mark = document.createElement("em");
				mark.className = "mark";
				mark.appendChild(document.createTextNode("|"));
				appendChild(mark);
				appendChild(document.createTextNode(this.linesBuf[markLine].substring(markLinePos, markLinePos + 20)));
				appendChild(document.createTextNode("]"));
			}
			this.modeLine.appendChild(modeLineNode);
		},

		setMode : function (mode) {
			// reset
			this.kb.setKeyBinding(this.defaultKeyBind);
			this.setComplementList([]);
			// make mode instance
			this.modeObj = new this.modeFunctions[mode](this);
			this.mode = mode;
		},

		// str Ã£ÂÂÃ§?Â¾Ã¥ÂÂ¨Ã£?Â®Ã£ÂÂ­Ã£ÂÂ£Ã£ÂÂ¬Ã£ÂÂÃ£ÂÂÃ£?Â®Ã¤Â½?Ã§Â½Â®Ã£?Â«Ã¦ÂÂ¿Ã¥ÂÂ¥Ã£?ÂÃ£ÂÂ
		// offset Ã£?Â¯Ã¦ÂÂ¿Ã¥ÂÂ¥Ã¥Â¾ÂÃ£?Â®Ã£ÂÂ­Ã£ÂÂ£Ã£ÂÂ¬Ã£ÂÂÃ£ÂÂÃ¤Â½?Ã§Â½Â®Ã¨Â£ÂÃ¦Â­Â£
		insert : function (str, offset, del) {
			// this.setVar();
			if (!offset) offset = 0;
			if (!del) del = 0;
			var content = this.textarea.value;
			var pos = this.caretPos + str.length + offset - del;
			var newstr = content.substring(0, this.caretPos - del) + str + content.substring(this.caretPos, content.length);
			var t = str.match(/\n/g);
			t = t ? t.length : 0;
			this.update(newstr, pos, t);
			this.setVar();
		},

		setKey : function (key, func) {
			this.kb.binding[key] = func;
		},

		update : function (str, pos, scroll) {
			if (!pos) pos = this.caretPos;
			if (!scroll) scroll = 0;
			var pTop = this.textarea.scrollTop;
			var pLeft = this.textarea.scrollLeft;
			var css = window.getComputedStyle(this.textarea, "");
			scroll = scroll * (parseFloat(css.getPropertyValue("font-size")) + 3);
			this.textarea.value = str;
			this.textarea.setSelectionRange(pos, pos);
			this.caretPos = pos;
			this.textarea.scrollTop = pTop + scroll;
			this.textarea.scrollLeft = pLeft;
		},

		setVar : function () {
			d("setVar()");
			this.caretPos = this.textarea.selectionStart;
			if (navigator.userAgent.match(/MSIE/)) {
				var sel = document.selection.createRange();
				var r = this.textarea.createTextRange();
				var len = this.textarea.value.length;
				r.moveToPoint(sel.offsetLeft, sel.offsetTop);
				r.moveEnd("textedit");
				this.caretPos = len - r.text.length;
			}
			this.lineNum = this.textarea.value.substring(0, this.caretPos).match(/\n/g);
			this.lineNum = this.lineNum ? this.lineNum.length : 0;
			this.linesBuf = this.textarea.value.split("\n");

			var paren = this.findParen(this.caretPos);
			if (paren) {
				var line = this.textarea.value.substring(0, paren).match(/\n/g)
					line = line ? line.length : 0;

				var status = document.createElement("span");
				var pos = paren - this.linesBuf.slice(0, line).join("\n").length - 1;

				status.appendChild(document.createTextNode("Paren Match:Line:" + (line + 1) + ":  "));
				status.appendChild(document.createTextNode(this.linesBuf[line].substring(0, pos)));
				var em = document.createElement("em");
				em.appendChild(document.createTextNode(this.linesBuf[line].charAt(pos)));
				status.appendChild(em);
				status.appendChild(document.createTextNode(this.linesBuf[line].substring(pos + 1)));
				this.setStatus(status);
			}
		},

		findParen : function (pos) {
			var oparen = ["<", "(", "[", "{"];
			var cparen = [">", ")", "]", "}"];

			var cm = this.textarea.value.charAt(pos-1).match(RegExp(cparen.join("|\\")));
			if (cm) {
				var o = oparen[cparen.join("").indexOf(cm[0])];
				var c = cm[0];
				var parens = this.textarea.value.substring(0, pos-1).match2(RegExp("\\"+o+"|\\"+c, "g"))
					parens.reverse();
				d("C", o, c, parens);
				var s = [];
				for (var i = 0; i < parens.length; i++) {
					if (parens[i][0] == c) {
						s.push(true);
					} else {
						var p = s.pop();
						d(p);
						if (!p) return parens[i].index;
					}
				}
				return;
			}
			var om = this.textarea.value.charAt(pos).match(RegExp(oparen.join("|\\")));
			if (om) {
				var o = om[0]
					var c = cparen[oparen.join("").indexOf(om[0])];
				var parens = this.textarea.value.substring(pos+1).match2(RegExp("\\"+o+"|\\"+c, "g"))
					d("O", o, c, parens);
				var s = [];
				for (var i = 0; i < parens.length; i++) {
					if (parens[i][0] == o) {
						s.push(true);
					} else {
						var p = s.pop();
						d(p);
						if (!p) return pos + 1 + parens[i].index;
					}
				}
				return;
			}
		},

		// pos Ã£?Â¯Ã¥??Ã¦ÂÂ Ã¥Â¾ÂÃ£?Â® caret Ã¤Â½?Ã§Â½Â®
		reflect : function (pos) {
			this.update(this.linesBuf.join("\n"), pos);
		},

		complement : function () {
			if (this.complementWindow.style.display == "block") {
				with (this.complementWindow) {
					this.insert(list[cpos].substring(del));
					style.display = "none";
				}
			} else {
				if (this.modeObj["complement"]) this.modeObj["complement"]();
				if (this.complementWindow.list == 0) return;
				/* calc window position */
				var css = window.getComputedStyle(this.textarea, "");
				var fontSize = parseFloat(css.getPropertyValue("font-size"));
				var x = 0;
				var y = 0;

				var lines = this.textarea.value.substring(0, this.caretPos).split(/\n/);
				y = lines.length;
				var last = lines[lines.length-1];
				for (var i = 0; i < last.length; i++) {
					var chr = last.charCodeAt(i);
					if (chr == 9) {
						x += 8;
					} else if (chr <= 177) {
						x += 1;
					} else {
						x += 2;
					}
				}
				x = x * fontSize / 2;
				y = y * fontSize * 1.2 + 2;

				x = x - this.textarea.scrollLeft;
				y = y - this.textarea.scrollTop;

				var offsetNode = this.textarea;
				while (offsetNode.offsetParent) {
					d(offsetNode.offsetParent);
					x += offsetNode.offsetLeft;
					y += offsetNode.offsetTop;
					offsetNode = offsetNode.offsetParent;
				}

				with (this.complementWindow.style) {
					display = "block";
					top     =  y + "px";
					left    =  x + "px";
				}
				this.setComplementPos(0);
			}
		},

		// del Ã¥ÂÂÃ£?Â Ã£?ÂÃ¥ÂÂÃ©Â Â­Ã£ÂÂÃ¥ÂÂÃ©ÂÂ¤Ã£?ÂÃ£?Â¦Ã¦ÂÂ¿Ã¥ÂÂ¥Ã£?ÂÃ£ÂÂÃ£ÂÂ
		setComplementList : function (complementList, del) {
			if (!del) del = 0;
			if (this.complementWindow.firstChild) this.complementWindow.removeChild(this.complementWindow.firstChild);
			var ol = document.createElement("ol");
			for (var i = 0; i < complementList.length; i++) {
				var li = document.createElement("li");
				li.appendChild(document.createTextNode(complementList[i]));
				ol.appendChild(li);
			}
			this.complementWindow.appendChild(ol);
			this.setComplementPos(0);
			this.complementWindow.cmax = complementList.length - 1;
			this.complementWindow.list = complementList;
			this.complementWindow.del  = del;
		},

		setComplementPos : function (pos) {
			var lis = this.complementWindow.firstChild.childNodes;
			for (var i = 0, len = lis.length; i < len; i++) {
				if (pos == i) {
					lis[i].className = "complement-highlight";
				} else {
					lis[i].className = "";
				}
			}
			this.complementWindow.cpos = pos;
		},

		complementUp : function () {
			if (this.complementWindow.style.display == "block") {
				if (this.complementWindow.cpos > 0)
					this.setComplementPos(this.complementWindow.cpos-1);
				return;
			}
			return true;
		},

		complementDown : function () {
			if (this.complementWindow.style.display == "block") {
				if (this.complementWindow.cpos < this.complementWindow.cmax)
					this.setComplementPos(this.complementWindow.cpos+1);
				return;
			}
			return true;
		},

		miniBufferComplementUp : function () {
			if (this.complementWindow.style.display == "block") {
				if (this.complementWindow.cpos > 0)
					this.setComplementPos(this.complementWindow.cpos-1);
			} else {
				if (this.miniBuffer.history < this.miniBufferHistory.length - 1)
					this.miniBuffer.history++;

				d("History:", this.miniBuffer.history);
				if (this.miniBufferHistory[this.miniBuffer.history])
					this.miniBuffer.value = this.miniBufferHistory[this.miniBuffer.history];
			}
		},

		miniBufferComplementDown : function () {
			if (this.complementWindow.style.display == "block") {
				if (this.complementWindow.cpos < this.complementWindow.cmax)
					this.setComplementPos(this.complementWindow.cpos+1);
			} else {
				if (this.miniBuffer.history >= 0)
					this.miniBuffer.history--;
				d("History:", this.miniBuffer.history);

				if (this.miniBufferHistory[this.miniBuffer.history])
					this.miniBuffer.value = this.miniBufferHistory[this.miniBuffer.history];
				else
					this.miniBuffer.value = "";
			}
		}
	}

	function xmlMode (eta) {
		var _this = this;
		this.eta = eta;
		eta.setKey("C-x m a i l", function () { eta.insert("cho45@lowreal.net"); });
		eta.setKey("/", function () { _this.slash() });
		eta.setKey("=", function () { _this.equal() });
		eta.setKey("C-=", function () { _this.toggleComment() });
		eta.setKey("C-.", function () { _this.wellClose() });
		eta.setKey("C-x i", function () { _this.indentBuffer() });
		eta.setKey("C-x v", function () { _this.validation() });
		eta.setKey("RET", function () { _this.newLineAndIndent() });
		this.setNoIndentElements(["pre"]);
		this.complementList = {
			"head" : ['<meta name="" content=""/>', '<link rel="" href=""/>'],
			"body" : ['<div class="section"', "<p>", "<address>"],
			"div"  : ['<div class="section"', "<p>"],
			"p"    : ['<abbr title', "<span class"],
			"ul"   : ["<li>"],
			"ol"   : ["<li>"],
			"dl"   : ["<dt>", "<dd>"],
			"pre"  : ["<![CDATA["]
			};
	}
	xmlMode.prototype = {
		// TAB callback
		complement : function () {
			var tokens = this.eta.textarea.value.substring(0, this.eta.caretPos).match2(/<\w*|\b\w+\b/g);
			var prevToken = tokens[tokens.length-1];
			var dabbrev = (prevToken.index + prevToken[0].length == this.eta.caretPos);
			var del = 0;
			var candidate = [];
			if (dabbrev) {
				// Ã§ÂÂ´Ã¥Â?Ã£?Â«Ã£ÂÂÃ£ÂÂ¼Ã£ÂÂ¯Ã£ÂÂ³Ã£?ÂÃ£?ÂÃ£ÂÂÃ¥Â Â´Ã¥?Â Ã¥ÂÂÃ§ÂÂÃ¨Â£ÂÃ¥Â®Â
				for (var i = 0; i < tokens.length; i++) {
					if (tokens[i][0].length > prevToken[0].length && tokens[i][0].indexOf(prevToken[0]) == 0) {
						candidate.push(tokens[i][0]);
					}
				}
				del = prevToken[0].length;
			} else {
				var prevTag = this.findPrevTag();
				candidate = this.complementList[prevTag] ? this.complementList[prevTag] : [];
			}
			candidate = candidate.uniq().sort();
			this.eta.setComplementList(candidate, del);
		},

		validation: function () {
			var _this = this;
			var tagList = this.tagList(this.eta.textarea.value);
			var tagStack = [];
			d(tagList);
			try {
				for (var i = 0; i < tagList.length; i++) {
					if (tagList[i][1]) {
						// close
						if (tagStack.pop() != tagList[i][2])
							throw Error("Invalid: <" + tagList[i][2] + "> is not found.");
					} else {
						// open
						tagStack.push(tagList[i][2]);
					}
				}
				if (tagStack.length != 0)
					throw Error("Invalid: </" + tagStack.pop() + "> is not found.");
			} catch (e) {
				alert(e);
				return;
			}

			this.eta.setStatus("Validation Requesting...");

			HTTP.ajax("POST", "/temp/xml-validation.rb", function (req) {
				req.onreadystatechange = function () {
					if (req.readyState == HTTP.COMPLETED) {
						alert(req.responseText);
						_this.eta.setStatus("Validation done.");
					}
				}
				return "xml=" + encodeURIComponent(_this.eta.textarea.value);
			});

		},

		slash : function () {
			var content = this.eta.textarea.value;
			this.eta.insert("/");
			if (this.parsePointSyntax() == "tag") {
				if (content.charAt(this.eta.caretPos-2) == "<") {
					// closing tag

					this.eta.insert(this.findPrevTag() + ">");
				} else if (content.charAt(this.eta.caretPos-1) != ">") {
					// Ã§Â?Ã§ÂÂ¥Ã£ÂÂ¿Ã£ÂÂ°Ã¨Â¨ÂÃ¦Â³Â
					var openParenPos = content.substring(0, this.eta.caretPos-1).lastIndexOf("<");
					if (!content.substring(openParenPos, this.eta.caretPos-1).replace(/"[^\"]*"|'[^\']*'/g, "").match(/\"|\'/)) {
						this.eta.insert(">");
					}
				}
			}
			this.eta.setVar();
			// Ã§?Â¾Ã¥ÂÂ¨Ã£?Â®Ã£ÂÂ¤Ã£ÂÂ³Ã£ÂÂÃ£ÂÂ³Ã£ÂÂÃ©Â? - Ã¨Â£ÂÃ¦Â­Â£Ã£ÂÂ¤Ã£ÂÂ³Ã£ÂÂÃ£ÂÂ³Ã£ÂÂÃ©Â?
			var tabs = this.eta.linesBuf[this.eta.lineNum].match(RegExp("^\t*"))[0].length;
			tabs -= this.indentLine();
			this.eta.reflect(this.eta.caretPos - tabs);
		},

		equal : function () {
			this.eta.insert("=");
			if (this.parsePointSyntax() == "tag") {
				var content = this.eta.textarea.value;
				if (content.charAt(this.eta.caretPos) != "\"") {
					this.eta.insert('""', -1);
				}
			}
		},

		newLineAndIndent : function () {
			this.eta.insert("\n");
			this.eta.setVar();
			this.indentLine(this.eta.lineNum-1);
			var tabs = this.indentLine();
			this.eta.reflect(this.eta.caretPos + tabs);
		},

		wellClose : function () {
			// this.setVar();
			switch (this.parsePointSyntax()) {
				case "cdata": {
					this.eta.insert("]]>");
					break;
				}
				case "pi": {
					this.eta.insert("?>");
					break;
				}
				case "comment": {
					this.eta.insert("-->");
					break;
				}
				case "declaration": {
					this.eta.insert(">");
					break;
				}
				case "tag": {
					this.eta.insert(">");
					break;
				}
				default : {
					this.eta.insert("</" + this.findPrevTag() + ">\n");
					this.eta.setVar();
					this.indentLine(this.eta.lineNum-1);
					var tabs = this.indentLine();
					this.eta.reflect(this.eta.caretPos + tabs);
				}
			}
		},


		toggleComment : function () {
			var content = this.eta.textarea.value;
			switch (this.parsePointSyntax()) {
				case "tag": {
					var cont  = content.substring(0, this.eta.caretPos);
					var open  = cont.lastIndexOf("</");
					var close = cont.lastIndexOf(">");
					var temp  = this.eta.caretPos;
					if (open > close) {
						this.eta.caretPos = open;
					} else {
						close = this.eta.caretPos + content.substring(this.eta.caretPos).indexOf(">");
						this.eta.caretPos = close;
					}
					var tagName = this.findPrevTag();
					open  = content.substring(0, this.eta.caretPos).lastIndexOf("<" + tagName);
					var close = content.substring(this.eta.caretPos).match(RegExp("</" + tagName + ">"));
					close = this.eta.caretPos + close.index + close[0].length;
					var result = "";
					result += content.substring(0, open) + "<!-- ";
					result += content.substring(open, close);
					result += " -->" + content.substring(close);
					this.eta.update(result, temp + 5);

					break;
				}
				case "comment": {
					var open  = content.substring(0, this.eta.caretPos).lastIndexOf("<!-- ");
					var close = this.eta.caretPos + content.substring(this.eta.caretPos).indexOf(" -->");
					d("open", open, "close", close);
					var result = "";
					result += content.substring(0, open);
					result += content.substring(open+5, close);
					result += content.substring(close+4);
					this.eta.update(result, this.eta.caretPos-5);
					break;
				}
			}
		},

		indentBuffer : function () {
			this.eta.setVar();
			for (var i = 0; i < this.eta.linesBuf.length; i++) {
				this.indentLine(i);
			}
			this.eta.reflect();
		},


		indentLine : function (lineNum) {
			// this.setVar();
			if (typeof lineNum == "undefined") lineNum = this.eta.lineNum;
			var line = this.eta.linesBuf;
			var tagLevel = 0;
			if (this.parseLineSyntax(lineNum, this.NoIndentElements)) {
				d("No indent line:", lineNum);
				return 0;
			}

			var prevLine = "";
			for (var i = lineNum - 1; i >= 0; i--) {
				if (this.parseLineSyntax(i, this.NoIndentElements) || line[i].match(/^\s*$/)) continue;
				prevLine = line.slice(i, lineNum).join(" ");
				break;
			}
			d("prevLine:", prevLine);
			// if (typeof line[lineNum-1] == "undefined") line[lineNum-1] = "";
			tagLevel = prevLine.match(RegExp("^\t*"))[0].length;
			var tags = this.tagList(prevLine);
			d(tags);
			if (tags.length != 0) {
				if (!tags[tags.length-1][1]) {
					tagLevel++;
				}
			}
			var tags = this.tagList(line[lineNum]);
			d(tags);
			if (tags.length != 0) {
				if (tags[0][1]) {
					tagLevel--;
				}
			}
			//var t = this.parseLineSyntax(lineNum-1, this.NoIndentElements);
			//if (t && t != "cdata") tagLevel--;

			var tab = "";
			for (var i = 0; i < tagLevel; i++) {
				tab += "\t";
			}
			d("indent:", tagLevel);
			line[lineNum] = line[lineNum].replace(RegExp("^\t*"), tab);
			return tagLevel;
		},

		setNoIndentElements : function (eleNames) {
			this.NoIndentElements = [["<![CDATA[", "]]>", "cdata"]];
			for (var i = 0; i < eleNames.length; i++) {
				this.NoIndentElements.push(["<" + eleNames[i], "</" + eleNames[i] + ">", eleNames[i]]);
			}
			return this.NoIndentElements;
		},

		/* private */
		findPrevTag : function () {
			// Ã¤Â¸ÂÃ§ÂÂªÃ¨Â¿ÂÃ£?ÂÃ©ÂÂÃ¥Â§ÂÃ£ÂÂ¿Ã£ÂÂ°Ã£ÂÂÃ¦ÂÂ¢Ã£?ÂÃ£?Â¾Ã£?ÂÃ£ÂÂ
			// Ã©ÂÂÃ£?ÂÃ£ÂÂ¿Ã£ÂÂ°Ã£ÂÂÃ§ÂÂºÃ¨Â¦ÂÃ£?ÂÃ£?ÂÃ£ÂÂÃ£ÂÂ¹Ã£ÂÂ¿Ã£ÂÂÃ£ÂÂ¯Ã£?ÂÃ£Â?Ã©ÂÂÃ¥Â§ÂÃ£ÂÂ¿Ã£ÂÂ°Ã£ÂÂÃ¨Â¦ÂÃ£?Â¤Ã£?ÂÃ£?ÂÃ£ÂÂÃ¦Â¯ÂÃ¨Â¼ÂÃ£?ÂÃ£?Â¦Ã¤ÂºÂÃ£ÂÂ
			var prevTags = this.eta.textarea.value.substring(0, this.eta.caretPos).match2(this.tagRegExp());
			prevTags.reverse();
			d(prevTags);
			var tagLvl;
			var closeTagStack = [];
			var prevTag;
			for (var i = 0; i < prevTags.length; i++) {
				d("Find Tag:", prevTags[i][0]);
				if (this.emptyTagP(prevTags[i].index+1)) continue;
				d("Find Tag (not empty):", prevTags[i][0]);
				if (prevTags[i][1]) {
					// yeah, this is close tag
					closeTagStack.unshift(prevTags[i][2]);
				} else {
					// open tag;
					if (closeTagStack[0] == prevTags[i][2]) {
						closeTagStack.shift();
					} else {
						prevTag = prevTags[i][2];
						break;
					}
				}
			}
			d("PrevTag:", prevTag);
			return prevTag;
		},

		// str Ã£?Â®Ã¥?Â«Ã£?Â¾Ã£ÂÂÃ£ÂÂÃ£ÂÂ¿Ã£ÂÂ°Ã£?Â®Ã£ÂÂªÃ£ÂÂ¹Ã£ÂÂÃ£ÂÂÃ¥?ÂÃ¥Â¾ÂÃ£ÂÂÃ§Â©ÂºÃ¨Â¦?Ã§Â´Â Ã£?Â¯Ã§ÂÂ¡Ã¨Â¦ÂÃ£ÂÂ
		// restrict Ã£?Â¯Ã©Â?Ã¥ÂÂÃ£?Â§Ã£Â?Ã§ÂÂ¹Ã¥Â®ÂÃ£?Â®Ã¨Â¦?Ã§Â´Â Ã¥??Ã£?Â Ã£?ÂÃ£?Â«Ã£ÂÂÃ£ÂÂÃ£Â?Ã£?ÂÃ£?ÂÃ£ÂÂÃ£ÂÂ ["pre", "xmp"]
		tagList : function (str, restrict) {
			var result = []
				var tags = str.match2(this.tagRegExp(restrict));
			for (var i = 0, len = tags.length; i < len; i++) {
				if (!this.emptyTagP(tags[i].index+1, str)) {
					result.push(tags[i])
					}
			}
			return result;
		},


		tagRegExp : function (restrict) {
			if (restrict) {
				return RegExp("<(/)?(" + restrict.join("|") + ")", "g");
			} else {
				return RegExp("<(/)?([^/<>?!%$ \t]+)", "g");
			}
		},

		parsePointSyntax : function (index, syntax) {
			if (!index) index = this.eta.caretPos;
			if (!syntax) {
				syntax = [
					["<![CDATA[", "]]>", "cdata"],
					["<?", "?>", "pi"],
					["<!--", "-->", "comment"],
					["<!", ">", "declaration"],
					["<", ">", "tag"]
					];
			}
			for (var i = 0, len = syntax.length; i < len; i++) {
				var cont  = this.eta.textarea.value.substring(0, index);
				var open  = cont.lastIndexOf(syntax[i][0]);
				var close = cont.lastIndexOf(syntax[i][1]);
				// dump("PPS:" + syntax[i][2] + " o:" + open + " c:" + close + "\n");
				if (open > close) return syntax[i][2];
			}
			return null;
		},

		parseLineSyntax : function (lineNum, syntax) {
			var line = this.eta.linesBuf;
			d("lineNum:", lineNum);
			var linePos = line.slice(0, lineNum).join("\n").length;
			d("linePos:", linePos);
			var lineSyntax = this.parsePointSyntax(linePos, syntax);
			d("lineSyntax:", lineSyntax);
			return lineSyntax;
		},

		emptyTagP: function (index, content) {
			if (!content) content = this.eta.textarea.value;
			content = content.substring(index, content.length);
			var et = content.indexOf("/>");
			var tt = content.indexOf("<");
			if (et != -1 && (tt == -1 || et < tt))
				return true;
			else
				return false;
		}


	}

	function cssMode(eta) {
		this.eta = eta;
		var _this = this;
		eta.setKey("}", function () { _this.electricClose() });
		eta.setKey("RET", function () { _this.newLineAndIndent() });
	}
	cssMode.prototype = {
		complement : function () {
			var tabs = this.eta.linesBuf[this.eta.lineNum].match(RegExp("^\t*"))[0].length;
			this.eta.reflect(this.eta.caretPos + this.indentLine() - tabs);
		},

		newLineAndIndent : function () {
			this.eta.insert("\n");
			this.eta.setVar();
			this.indentLine(this.eta.lineNum-1);
			var tabs = this.indentLine();
			this.eta.reflect(this.eta.caretPos + tabs);
		},

		electricClose: function () {
			this.eta.insert("}");
			var tabs = this.eta.linesBuf[this.eta.lineNum].match(RegExp("^\t*"))[0].length;
			this.eta.reflect(this.eta.caretPos + this.indentLine() - tabs);
		},

		indentLine : function (lineNum) {
			if (typeof lineNum == "undefined") lineNum = this.eta.lineNum;
			var line = this.eta.linesBuf;
			var linePos = line.slice(0, lineNum).join("\n").length;
			var lineSyntax = this.parsePointSyntax(linePos);
			d("lineSyntax", lineSyntax);

			var level = 0;
			if (lineSyntax == "electric") {
				level++;
			}
			if (line[lineNum].indexOf("}") != -1) level--;

			var tab = "";
			for (var i = 0; i < level; i++) {
				tab += "\t";
			}

			line[lineNum] = line[lineNum].replace(RegExp("^\t*"), tab);
			return level;
		},

		parsePointSyntax : function (index, syntax) {
			if (!index) index = this.eta.caretPos;
			if (!syntax) {
				syntax = [
					["{", "}", "electric"],
					];
			}
			for (var i = 0, len = syntax.length; i < len; i++) {
				var cont  = this.eta.textarea.value.substring(0, index);
				var open  = cont.lastIndexOf(syntax[i][0]);
				var close = cont.lastIndexOf(syntax[i][1]);
				if (open > close) return syntax[i][2];
			}
			return null;
		},
	}

	function cMode(eta) {
		this.eta = eta;
	}

	//	window.addEventListener("load", function (e) {
	var textarea = document.getElementsByTagName("textarea");
	var eta = [];
	for (var i = 0, len = textarea.length; i < len; i++) {
		textarea[i].style.width = "100%";
		textarea[i].className = "eta";
		eta.push(new extensibleTextarea(textarea[i], {
			"xml" : xmlMode,
			"c"   : cMode,
			"css"   : cssMode,
		}, "xml"));
	}

	var head = document.getElementsByTagName("head")[0];
	var style = document.createElement("style");
	style.type = "text/css";
	style.appendChild(document.createTextNode('textarea {width: 100% !important;font-family: "Lucida Console", sans-serif !important;font-size: 12px !important;border-style: solid !important;border-width: 1px !important;border-color: #666 !important;}textarea.narrow {background: #efefff !important;}#key-bind-binding-table {position: absolute !important;font-size: 12px !important;padding: 0.5em !important;width: 30% !important;right: 1em !important;border-style: solid !important;border-width: 1px !important;border-color: #666 !important;background: #fff !important;opacity: 0.8 !important;}#key-bind-binding-table dt {font-weight: bold !important;}#key-bind-binding-table dd pre {font-family: "Lucida Console", sans-serif !important;font-size: 12px !important;margin: 0 !important;padding: 0 !important;white-space: -moz-pre-wrap !important;overflow: auto !important;line-break: strict !important;word-break: break-all !important;word-wrap:  break-word !important;}#complement-window {padding: 0 !important;margin: 0 !important;font-size: 12px !important;background: #fff !important;border-style: solid !important;border-width: 1px !important;border-color: #666 !important;overflow: hidden !important;}#complement-window ol {list-style: none !important;padding: 0 !important;margin: 0 !important;}#complement-window ol li {padding: 0 0.5em !important;margin: 0 !important;}.complement-highlight {background: #000 !important;color: #fff !important;}#mini-buffer {font-size: 12px !important;font-family: "Lucida Console", sans-serif !important;border-style: solid !important;border-width: 1px !important;border-color: #666 !important;}#mode-line {line-height: 1.66 !important;background: #000 !important;color: #fff !important;font-size: 11px !important;font-family: "Tahoma" !important;padding: 0 0.5em !important;white-space: pre !important;overflow: hidden !important;}#mode-line em.mark {font-style: normal !important;color: #0c0 !important;}#status-area {line-height: 1.66 !important;background: #fff !important;color: #333 !important;font-size: 11px !important;font-family: "Tahoma" !important;padding: 0 0.5em !important;border: 1px solid #000 !important;height: 1.66em !important;}'));
	head.appendChild(style);


	//	}, true);


	Date.prototype.w3cdtf = function () {
		var year  = this.getFullYear();
		var month = this.getMonth();
		var date  = this.getDate();
		var hour  = this.getHours();
		var min   = this.getMinutes();
		var sec   = this.getSeconds();
		var mil   = this.getMilliseconds();
		var tz    = -this.getTimezoneOffset();
		var ret   = "";

		var format = function (num) {
			var ret = String(num);
			if (ret.length == 1) ret = "0" + ret;
			return ret;
		}

		ret += year + "-" + format(month) + "-" + format(date);
		ret += "T";
		ret += format(hour) + ":" + format(min) + ":" + format(sec);
		ret += "." + mil;

		var tzs  = (tz < 0) ? "-" : "+";
		if (tz < 0) tz = -tz;
		var tz_h = String(tz / 60).match(/^\d+(\.|$)/)[0];
		var tz_m = tz % 60;
		tzs += format(tz_h) + ":" + format(tz_m);

		ret += tzs;
		return ret;
	}

})();