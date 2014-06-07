// ==UserScript==
// @run-at         document-start
// @name           Emulate clipboardData object
// @description    It emulates the window.clipboardData object and improve it's use (it is very useful on "XDCC List" pages for example).
// @version        1.1.7
// @author         ale5000
// @namespace      http://userjs.ale5000.altervista.org/
// @include        http://*
// @include        file://*
// @filename       lib-clipboardData.user.js
// @support        Opera(native)|Firefox(Greasemonkey)|Google Chrome(native)|Chromium(native)|K-Meleon(Greasify)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

// FOR OPERA USERS: Rename from lib-clipboardData.user.js to lib-clipboardData.js
// The description of the clipboardData object is here: http://msdn.microsoft.com/en-us/library/ms535220(VS.85).aspx

(function()
{
	var EmulateClipboardData = function()
	{
		var use_alert = 0, use_error_console = 1, use_status_bar = 1;
		var copy_text_to_real_clipboard = 1; // Only for Firefox and Gecko based browsers - You must go on about:config and set "signed.applets.codebase_principal_support" to true to make it working.

		var log = function(text, force)
		{
			if(use_error_console || force)
			{
				if(window.opera && opera.postError) // Opera
					opera.postError(text);
				else if(typeof GM_log == "function") // Firefox
					GM_log(text);
				else if(typeof console == "object" && console.log) // Google Chrome
					try{ console.log(text); } catch(e){}
				else if(!use_alert) // Fallback to an alert if others fail
					alert(text);
			}
		}

		var show = function(text)
		{
			log(text);
			if(use_alert) alert(text);
		}

		var clipboard = null, shift = false, buffer = "";

		var onKeyEvent = function(e)
		{
			var evt = e || window.event;
			var eventType = evt.type;
			var keyCode = evt.keyCode || evt.which;

			if(eventType == "keydown" && keyCode == "16")
				shift = true;
			else if(eventType == "keyup" && keyCode == "16")
				shift = false;
		};

		if(document.addEventListener) // Opera - Firefox - Google Chrome
		{
			document.addEventListener("keydown", onKeyEvent, false);
			document.addEventListener("keyup", onKeyEvent, false);
		}
		else if(document.attachEvent) // Internet Explorer
		{
			document.attachEvent("onkeydown", onKeyEvent);
			document.attachEvent("onkeyup", onKeyEvent);
		}
		else if(!document.onkeydown && !document.onkeyup)
		{
			document.onkeydown = onKeyEvent;
			document.onkeyup = onKeyEvent;
		}

		if(copy_text_to_real_clipboard)
		{
			var SetClipboardData = function(text)
			{
				if(!window.netscape || !netscape.security) return; // Browsers that don't use the Gecko engine
				try
				{
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					var comp_classes = Components.classes;
				}
				catch(e) { return; } // When "signed.applets.codebase_principal_support" is set to false

				var type = "text/unicode";
				var comp_interf = Components.interfaces;
				var clipboard			= comp_interf.nsIClipboard;
				var clipboard_inst		= comp_classes["@mozilla.org/widget/clipboard;1"].createInstance(clipboard);
				var transferable		= comp_interf.nsITransferable;
				var transferable_inst	= comp_classes["@mozilla.org/widget/transferable;1"].createInstance(transferable);
				var supportsstring		= comp_interf.nsISupportsString;
				var supportsstring_inst	= comp_classes["@mozilla.org/supports-string;1"].createInstance(supportsstring);
				if(!clipboard_inst || !transferable_inst || !supportsstring_inst) return;

				transferable_inst.addDataFlavor(type);
				supportsstring_inst.data = text;
				transferable_inst.setTransferData(type, supportsstring_inst, text.length*2);
				clipboard_inst.setData(transferable_inst, null, clipboard.kGlobalClipboard);
			};
		}

		if(!window.clipboardData)
		{
			window.clipboardData = new Object();
			window.clipboardData.setData = function(sDataFormat, sData)
			{
				var evt = null;

				if(window.event && event.type == "click") // Opera - Google Chrome - Internet Explorer
					evt = event;
				else if(arguments.callee.caller) // Firefox - Netscape
				{
					if(typeof arguments.callee.caller.arguments[0] == "object" && arguments.callee.caller.arguments[0].type == "click")
						evt = arguments.callee.caller.arguments[0];
					else if(arguments.callee.caller.caller && typeof arguments.callee.caller.caller.arguments[0] == "object" && arguments.callee.caller.caller.arguments[0].type == "click")
						evt = arguments.callee.caller.caller.arguments[0];
				}

				if(evt)
				{
					var target = evt.target || evt.srcElement;
					if(target.nodeType == 3) target = target.parentNode; // Defeat Safari bug
					if(target == "[object HTMLFontElement]") target = target.parentNode;

					if(target.toString().indexOf(location.href) != -1)
					{
						if(evt.preventDefault) evt.preventDefault(); // Opera - Firefox - Google Chrome
						else evt.returnValue = false;
					}
				}

				if(typeof sData == "undefined") { log("window.clipboardData.setData: The parameter sData is missing", true); return false; }
				if(typeof sDataFormat == "undefined") { log("window.clipboardData.setData: The parameter sDataFormat is missing", true); return false; }
				sDataFormat = sDataFormat.toLowerCase();

				if(sDataFormat == "text" || sDataFormat == "url")
					;
				else
				{
					log("window.clipboardData.setData: The parameter sDataFormat is incorrect", true);
					return false;
				}

				clipboard = sData;
				if(use_status_bar) window.status=sData;
				if(copy_text_to_real_clipboard) setTimeout("("+SetClipboardData+")('"+sData+"');",0);
				if(shift)
				{
					buffer += sData + "\r\n";
					return true;
				}
				else if(buffer != "")
				{
					sData = buffer + sData;
					buffer = "";
				}

				show("clipboard:\r\n" + sData);
				return true;
			};
			window.clipboardData.getData = function(sDataFormat)
			{
				if(typeof sDataFormat == "undefined") { log("window.clipboardData.getData: The parameter sDataFormat is missing", true); return ""; }
				sDataFormat = sDataFormat.toLowerCase();

				if(sDataFormat == "text" || sDataFormat == "url")
					;
				else
				{
					log("window.clipboardData.getData: The parameter sDataFormat is incorrect", true);
					return "";
				}

				return clipboard;
			};
			window.clipboardData.clearData = function(sDataFormat)
			{
				if(typeof sDataFormat == "undefined")
					;
				else
				{
					sDataFormat = sDataFormat.toLowerCase();
					if(sDataFormat == "text" || sDataFormat == "url" || sDataFormat == "file" || sDataFormat == "html" || sDataFormat == "image")
						;
					else
					{
						log("window.clipboardData.clearData: The parameter sDataFormat is incorrect", true);
						return false;
					}
				}

				clipboard = null;
				return true;
			};
			if(typeof unsafeWindow == "object") unsafeWindow.window.clipboardData = window.clipboardData;	// Firefox
		}
	};

	if(navigator.userAgent.indexOf("Chrome") != -1) // Workaround for Google Chrome
		setTimeout("("+EmulateClipboardData+")();",0);
	else
		EmulateClipboardData();
})();
