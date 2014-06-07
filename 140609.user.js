// ==UserScript==
// @name           SLZ BB-Code
// @author         Tristan DANIEL (modified by Nit)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @namespace      http://userscripts.org/scripts/show/125668
// @include        http://stadolwiejziemi.pun.pl/viewtopic.php*
// @include        http://stadolwiejziemi.pun.pl/post.php*
// @include        http://stadolwiejziemi.pun.pl/edit.php*
// @include        http://www.stadolwiejziemi.pun.pl/viewtopic.php*
// @include        http://www.stadolwiejziemi.pun.pl/post.php*
// @include        http://www.stadolwiejziemi.pun.pl/edit.php*
// @include        http://stadolwiejziemi.pun.pl/message_send.php*
// @include        http://www.stadolwiejziemi.pun.pl/message_send.php*
// ==/UserScript==
(function () {
	var texttools = {
		"[b]":       { "pattern": "[b]%s[/b]", "accesskey": "b" },
		"[u]": { "pattern": "[u]%s[/u]", "accesskey": "u" },
		"[i]":     { "pattern": "[i]%s[/i]", "accesskey": "i" },
		"[s]":     { "pattern": "[s]%s[/s]", "accesskey": "s" },
		"img":        { "pattern": "[img]%s[/img]", "accesskey": "k" },
		"kolor":     { "pattern": "[color=%p]%s[/color]", "accesskey": "c", "prompt": "Wpisz nazwę koloru (red, #ff6, #ccff33, itp.)" },
		"url":        { "pattern": "[url=%p]%s[/url]", "accesskey": "l", "prompt": "Wpisz adres URL (lub pozostaw puste jeśli go zaznaczyłeś)", "default": "http://" },
		"cytat":      { "pattern": "[quote=%p]%s[/quote]", "accesskey": "c", "prompt": "Wpisz nick osoby, której tekst cytujesz (opcjonalne)" },
		"kod":       { "pattern": "[code]%s[/code]", "accesskey": "o" },
		"html":       { "pattern": "[html]%s[/html]", "accesskey": "h" },
		"YT":       { "pattern": "[youtube]%s[/youtube]", "accesskey": "y" },
	};
	var userjs = "j2userjs125668";
	var textarea = document.getElementsByTagName("textarea");
	var form = null;
	var submittedButt = null;
	var operaAccessKeyHack = {};
	for (var ita=0; ita<textarea.length; ita++) {
		if (textarea[ita].getAttribute("name") == "req_message") {
			textarea = textarea[ita];
			form = getParent(textarea, "form");
			tt = document.createElement("div");
			tt.style.lineHeight= "2em";
			tt.appendChild(document.createTextNode("BBCode: "));
			if (typeof opera != "undefined" && operaAccessKeyHack) {
				textarea.addEventListener("keypress", function(e) { if (e.altKey && e.ctrlKey && (butt = operaAccessKeyHack[e.keyCode])) { submittedButt = butt; butt.click(); } }, false);
				form.addEventListener("submit", function(e) {
					if (e.shiftKey || e.ctrlKey) {
						setTimeout(function() {
							submittedButt.removeAttribute("disabled");
							var click = document.createEvent("MouseEvents");
							click.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
							submittedButt.dispatchEvent(click);
						}, 100);
						e.cancelBubble = true;
						if (e.stopPropagation) e.stopPropagation();
						e.preventDefault();
						return false;
					} else {
						submittedButt = null;
						return true;
					}
				}, false);
			}
			for (tool in texttools) {
				if (texttools.hasOwnProperty(tool)) {
					tt.appendChild(createBBCodeButt(tool, function(e) {
						textarea.focus();
						var osel = [textarea.value.substring(textarea.selectionStart, textarea.selectionEnd), textarea.selectionStart, textarea.selectionEnd];
						var tool = this.textContent;
						var nsel = texttools[tool]["pattern"].replace(/%s/g, osel[0]);
						var p = null;
						if (texttools[tool]["pattern"].indexOf("=%p") != -1) {
							p = prompt(texttools[tool]["prompt"]?texttools[tool]["prompt"]:"Type parameter (%p) for \u201c"+nsel+"\u201d\u00a0:", texttools[tool]["default"]?texttools[tool]["default"]:"");
							nsel = nsel.replace(/=%p/g, p?"="+p:"");
						}
						textarea.value = textarea.value.substr(0, osel[1]) + nsel + textarea.value.substr(osel[2]);
						if (osel[1] != osel[2]) {
							textarea.selectionStart = osel[1];
							textarea.selectionEnd = osel[1] + nsel.length;
						} else {
							textarea.selectionStart = osel[1] + nsel.indexOf("[", 1);
							textarea.selectionEnd = textarea.selectionStart;
						}
					}, texttools[tool]["pattern"], texttools[tool]["accesskey"]));
					tt.appendChild(document.createTextNode(" "));
				}
			}
			textarea.parentNode.insertBefore(tt, textarea);
			if (form != null) {
				var action = form.getAttribute("action");
				var tid = action.match(/^post\.php\?tid=([0-9]+)$/i);
				if (tid) {
					tid = tid[1];
					var stuff = document.createElement("span");
					form.setAttribute("action", "post.php?action=post&tid="+tid);
					form.setAttribute("id", "post");
					var preview = stuff.appendChild(createInput("submit", "preview", "Preview"));
					preview.setAttribute("accesskey", "p");
					var lbl = stuff.appendChild(document.createElement("label"));
					lbl.style.display = "inline";
					lbl.appendChild(createInput("checkbox", "subscribe", "1"));
					lbl.appendChild(document.createTextNode("Subskrybuj ten temat"));
					var ou = form.getElementsByTagName("p");
					if (ou.length>0) { ou = ou[ou.length-1]; }
					else { ou = form; }
					ou.appendChild(stuff);
				}
				var subs = form.getElementsByTagName("input");
				for (var sb=0; sb<subs.length; sb++) {/*opens in new window because of shift:/*/
					if (subs[sb].getAttribute("type") == "submit" && (accesskey = subs[sb].getAttribute("accesskey"))) {
						operaAccessKeyHack[accesskey.toLowerCase().charCodeAt(0)] = subs[sb];
						subs[sb].setAttribute("title", akey(accesskey));
					}
				}
			}
			break;
		}
	}
	function akey(k) {
		var t = "ALT+"+k.toUpperCase();
		if (navigator.userAgent.match(/firefox/i)) { t = "ALT+SHIFT+"+k.toUpperCase(); }
		else if (typeof opera != "undefined") { t = "CTRL+" + t; }
		return t;
	}
	function getParent(obj, tag) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase()) {
				return cur;
			} else {
				return getParent(cur, tag);
			}
		} else {
			return null;
		}
	}
	function createInput(type, name, value) {
		var input = document.createElement("input");
		input.setAttribute("type", type);
		input.setAttribute("name", name);
		input.setAttribute("value", value);
		return input;
	}
	function createBBCodeButt(text, link, title, accesskey) {
		var truc = document.createElement("span");
		truc.style.whiteSpace = "nowrap";
		truc.appendChild(document.createTextNode("\u00a0"));
		var a = truc.appendChild(document.createElement("a"));
		if (link && typeof link == "string") {
			a.setAttribute("href", link);
		}
		else {
			if (link && typeof link == "function") {
				a.addEventListener("click", link, false);
			}
			a.style.cursor = "pointer";
		}
		a.style.color = "blue";
		a.style.background = "#F5F5F5";
		a.style.padding = "2px 4px";
		a.style.border = "1px outset grey";
		a.style.textTransform = "uppercase";
		if (title) { a.setAttribute("title", title); }
		if (accesskey) {
			a.setAttribute("accesskey", accesskey);
			var key = akey(accesskey);
			if (navigator.userAgent.match(/firefox/i)) { key += ":"; }
			a.setAttribute("title", key+" \n" + a.getAttribute("title"));
			if (typeof opera != "undefined" && operaAccessKeyHack) {
				operaAccessKeyHack[accesskey.toLowerCase().charCodeAt(0)] = a;
			}
		}
		if (accesskey) {
			var kpos = text.indexOf(accesskey);
			a.appendChild(document.createTextNode(text.substr(0,kpos)));
			a.appendChild(document.createElement("strong")).appendChild(document.createTextNode(text.charAt(kpos)));
			a.appendChild(document.createTextNode(text.substr(kpos+1)));
		}
		else { a.appendChild(document.createTextNode(text)); }
		return truc;
	}
})();