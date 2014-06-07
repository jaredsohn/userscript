// ==UserScript==
// @name          prohardver.hu : forum : hotkeys in editor
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/muvelet/*
// @include       http://prohardver.hu/muvelet/*
// @include       http://www.mobilarena.hu/muvelet/*
// @include       http://mobilarena.hu/muvelet/*
// @include       http://www.logout.hu/muvelet/*
// @include       http://logout.hu/muvelet/*
// @include       http://www.itcafe.hu/muvelet/*
// @include       http://itcafe.hu/muvelet/*
// @include       http://www.gamepod.hu/muvelet/*
// @include       http://gamepod.hu/muvelet/*
// @include       http://www.bitmarket.hu/muvelet/*
// @include       http://bitmarket.hu/muvelet/*
// @include       http://www.hardverapro.hu/muvelet/*
// @include       http://hardverapro.hu/muvelet/*
// @version       1.3
// ==/UserScript==
function event_handler()
{
	var editor = document.evaluate("//textarea[@name=\"content\"]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (editor == null)
		return;
	var buttons = document.evaluate("//input", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var is_comment = buttons.snapshotItem(0).type == "radio";
	var n = is_comment ? 2 : 0;
	editor.hotkeys = 
	{
		"ctrl-enter"  : buttons.snapshotItem(n++), // send comment
		//"ctrl-s" : ":)",
		//"ctrl-x" : function() { window.alert("pressed"); },
		"ctrl-b" : buttons.snapshotItem(n++), // bold
		"ctrl-i" : buttons.snapshotItem(n++), // italic
		"ctrl-u" : buttons.snapshotItem(n++), // underlined
		"ctrl-s" : buttons.snapshotItem(n++), // strike-through
		"ctrl-o" : buttons.snapshotItem(n++), // off topic
		"ctrl-k" : buttons.snapshotItem(n++), // link
		"ctrl-g" : buttons.snapshotItem(n++), // image
		"ctrl-d" : buttons.snapshotItem(n++), // code
		"ctrl-m" : buttons.snapshotItem(n++), // monospace
		"ctrl-w" : buttons.snapshotItem(n++), // raw
		"ctrl-p" : buttons.snapshotItem(n++), // paragraph
		"ctrl-l" : buttons.snapshotItem(n++), // left-aligned
		"ctrl-r" : buttons.snapshotItem(n++), // right-aligned
		"ctrl-e" : buttons.snapshotItem(n++), // centered
		"ctrl-j" : buttons.snapshotItem(n++)  // justified
	};
	
	if (is_comment)
	{
		editor.hotkeys["ctrl-alt-n"] = buttons.snapshotItem(0); // normal comment
		editor.hotkeys["ctrl-alt-o"] = buttons.snapshotItem(1); // off-topic comment
	}

	var onhotkeycancel = function (e)
	{
		e.returnValue = false;
		if (e.stopPropagation)
			e.stopPropagation();
		if (e.preventDefault)
			e.preventDefault();
		return false;
	};
	
	var onhotkeypress = function (e)
	{
		if (editor.hotkey == null)
			return true;

		var hotkey = editor.hotkey;
		if (typeof(hotkey) == "function")
			hotkey(e);
		else if (typeof(hotkey) == "string")
			editor.value = editor.value.substr(0, editor.selectionStart) + hotkey + editor.value.substr(editor.selectionEnd);
		else if (typeof(hotkey) == "object" && hotkey.tagName == "INPUT" && window.opera == null)
			hotkey.click();

		return onhotkeycancel(e);
	}

	var onhotkeydown = function (e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if (code == null)
			return true;
		
		var named_keys =
		{
			8: "backspace", 9: "tab", 13: "enter", 32: "space", 27: "esc",
			33: "pageup", 34: "pagedown", 35: "end", 36: "home", 
			37: "left", 38: "up", 39 : "right", 40: "down",
			45: "insert", 46: "delete", 
			112: "f1", 113 : "f2", 114 : "f3", 115 : "f4", 116 : "f5", 117 : "f6",
			118: "f7", 119 : "f8", 120 : "f9", 121 : "f10", 122 : "f11", 123 : "f12"
		};

		var key = 
			(e.ctrlKey ? "ctrl-" : "") + (e.altKey ? "alt-" : "") + (e.shiftKey ? "shift-" : "");
		if ((code >= 65 && code <= 90) || (code >= 48 && code <= 57))
			key += String.fromCharCode(code).toLowerCase();
		else if (named_keys[code] == null)
			return true;
		else
			key += named_keys[code];
		
		editor.hotkey = editor.hotkeys[key];
		if (editor.hotkey == null)
			return true;
		
		return onhotkeypress(e);
	};

	var onhotkeyup = function (e)
	{
		if (editor.hotkey == null)
			return true;
		
		editor.hotkey = null;
		return onhotkeycancel(e);
	}

	editor.addEventListener("keydown", onhotkeydown, false);
	editor.addEventListener("keyup", onhotkeyup, false);
}

if (document.body)
	event_handler();
else
	window.addEventListener("load", event_handler, false);
	

//////////////////////////////////////////
// 1.3 FF4 kompatibilitás
// 1.2 Chrome kompatibilitás
// 1.1 privát írásakor elcsúszott a billentyűkiosztás
// 1.0 eredeti változat
