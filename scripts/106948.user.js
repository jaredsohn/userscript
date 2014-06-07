// ==UserScript==
// @name          KoC7Help
// @version       26.07.2011
// @namespace     A7u
// @description   Outils Pratiques Pour Kofc
// @include       http://apps.facebook.com/kingdomsofcamelot/*
// @include       *.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @icon           http://...
// @require        http://koc.god-like.info/update/auto-updater.php?id=106722

// @resource       URL_CASTLE_BUT       http://koc.god-like.info/schloss1.png
// @resource       URL_CASTLE_BUT_SEL   http://koc.god-like.info/schloss2.png
// ==/UserScript==



var a7uVersion = "26.07.2011";
var a7uEnabled = true;
var a7uDebug = false;

//#region Main

///*DEBUGCODE:*/ var ids=document.id + "/" + document.getElementsByTagName('html')[0].id +"/"+ document.body.id;
///*DEBUGCODE:*/ logit("Start KoC Buttler \n" + "loacation: " + document.location.href + "\n" + "IDs:" + ids);
///*DEBUGCODE:*/ if(a7uDebug) GM_log("Loading document: id="+ document.getElementsByTagName("html")[0].getAttribute("id")+ " title: "+document.title + " href: "+document.location.href);

// @include       *.kingdomsofcamelot.com/fb/e2/src/main_src.php*
if (a7uEnabled && document.body.id == 'mainbody') {
	//	/*DEBUGCODE:*/if(a7uDebug) GM_log("Setup KoC Buttler \n" + "location: " + document.location.href);

	var enableToolbar         = true;
	var enableChatMonitor     = true;
	var enableResourceRequest = true;

	a7u = new a7uLibrary(); unsafeWindow.a7u = a7u;
	if(enableToolbar        ) a7u.Plugins.Toolbar         = new ToolbarPlugin(a7u);
//	if(enableChatMonitor    ) a7u.Plugins.ChatMonitor     = new ChatMonitorPlugin(a7u);
	if(enableResourceRequest) a7u.Plugins.ResourceRequest = new ResourceRequestPlugin(a7u);
}
//#endregion


//#region a7u Library

function a7uLibrary() {
	if(a7uDebug) GM_log(new Date().toTimeString().substring(0, 8) + '.' + new Date().getMilliseconds() + ': ' + "a7uLibrary");
	
	var JSON; if (!JSON) { JSON = {}; } (function () { "use strict"; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', { '': value }); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; } throw new SyntaxError('JSON.parse'); }; } } ());
	this.JSON = JSON;

	String.prototype.trim = function() { return this.replace( /^\s+|\s+$/g , ''); };
	
	this.logit = function(msg) {
		var now = new Date();
		GM_log(this.KoCTools.getServerId() + ' @ ' + now.toTimeString().substring(0, 8) + '.' + now.getMilliseconds() + ': ' + msg);
	};

	var Tools = {

		getElement: function(locator) {
			//TODO: implement functionality of Selenium element locators
			// http://release.seleniumhq.org/selenium-core/1.0/reference.html
			if (locator.search('//') == 0) return this.getElementByXPath(locator);
			if (locator.search('xpath=') == 0) return this.getElementByXPath(locator.substr(6, locator.length - 6));
			//if (locator.search('css=') == 0) return this.getElementByCssPath(locator.substr(4, locator.length - 4));
			//if (locator.search('document.') == 0) return this.getElementByDom(locator.substr(4, locator.length - 4));
			//if (locator.search('dom=') == 0) return this.getElementByDom(locator.substr(4, locator.length - 4));
			if (locator.search('id=') == 0) return document.getElementById(locator);
			//if (locator.search('link=') == 0) return document.getElementByLink(locator);
			//if (locator.search('identifier=') == 0) ...
			var elmt = document.getElementById(locator); if (elmt != null) return elmt;
			return document.getElementsByName(locator);
		},

		getElementByXPath: function(expr) {
			//var d=window.frames[0].frames[0].document;
			var d = document;
			var elmFirstResult = d.evaluate(expr, document,
				null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			return elmFirstResult;
		},

			//TODO: getElementByCssPath: function (expr) {},
			//TODO: getElementByDom: function (expr) {},
			//TODO: getElementByLink: function (expr) {},

		getAttribute: function(attributeLocator) {
			var index = attributeLocator.lastIndexOf('@');
			var locator = attributeLocator.substr(0, index);
			var attribute = attributeLocator.substring(index + 1, attributeLocator.length);
			//alert(locator + " " + attribute);
			var elmt = this.getElement(locator);
			var attrValue = elmt.getAttribute(attribute);
			return attrValue;
		},

		click: function(element) {
			if (element == null) throw "Element not specified!";
			if (typeof(element) == "string") element = this.getElement(element);

			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var canceled = !element.dispatchEvent(evt);
			//OPTIONAL: if (canceled) { /* A handler called preventDefault */ } else {/* None of the handlers called preventDefault*/}
		},

		typeKeys: function(element, chars) {
			if (element == null) throw "Element not specified!";
			if (typeof(element) == "string") element = this.getElement(element);
			for (var i = 0; i < chars.length; i++) {
				// Create the key press event.
				var pressEvent = document.createEvent('KeyboardEvent');
				pressEvent.initKeyEvent("keypress", true, true, window,
					false, false, false, false,
					0, chars.charCodeAt(i));

				element.dispatchEvent(pressEvent); // Press the key.
			}
		},

		type: function(element, chars) {
			if (element == null) throw "Element not specified!";
			if (typeof(element) == "string") element = this.getElement(element);

			if (element.type == 'text') {
				element.focus();
				element.value = chars;
			} else {
				throw "Element not supported!";
			}
		},

		doUnsafeWindow: function(func, executeByEmbed) {
			if (this.isChrome || executeByEmbed) {
				var scr = document.createElement('script');
				scr.innerHTML = func;
				document.body.appendChild(scr);
			} else {
				try {
					eval("unsafeWindow." + func);
				} catch(error) {
					logit("Bei DoUnsafeWindow hat JavaScript ein fehler gefunden! Meldung: " + error.description);
				}
			}
		},

		className: "a7u+Tools"
	};
	this.Tools = Tools;

	var Selenium = {
		// a small try to implement some Selenium functionality

		click: function(locator) {
			logit("Selenium: click | " + locator);
			var elmt = Tools.getElement(locator);
			if (elmt == null) {
				throw "Element not found (" + locator + ")";
			}
			Tools.click(elmt);
		},

		getAttribute: function(attributeLocator) {
			logit("Selenium: getAttribute | " + attributeLocator);
			return Tools.getAttribute(attributeLocator);
		},

		getElement: function(locator) {
			logit("Selenium: getElement | " + locator);
			return Tools.getElement(locator);
		},

		getElementPresent: function(locator) {
			logit("Selenium: getElementPresent | " + locator);
			return Tools.getElement(locator) != null;
		},

		waitforElementPresent: function(locator) {
			logit("Selenium: waitforElementPresent | " + locator);
			var tot = new Date().getTime() + 30000;

			do { //because there is no sleep, this will use 100% CPU :-( 
				if (Tools.getElementPresent(locator)) return true;
			} while (new Date().getTime() < tot)
			throw "Timeout on waiting for element!";
		},

		className: "a7u.Selenium"
	};
	this.Selenium = Selenium;

		/// <summary> Provides funtions to create HTML elements </summary>
	var Builder = {

		/// <summary>Creates a blue button </summary>
		BlueButton: function(caption, onclick) {
			var a = document.createElement('a');
			if (typeof(onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof(onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("class", "button20");
			var span = document.createElement('span');
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

			//TODO: DRAFT same as BlueButton but inline
		BlueButton2: function(caption, onclick) {
			var a = document.createElement('a');
			if (typeof(onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof(onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("style", "background: url('img/button20_cap.png') no-repeat scroll right top transparent;color: #FFFFFF;cursor: pointer;display: inline; font-size: 12px; font-weight: bold; height: 22px; margin-left: 6px; margin-right: 6px; margin-right: 6px; margin-right: 6px; padding: 2px 8px 5px 0px; text-decoration: none;");
			var span = document.createElement('span');
			span.setAttribute("style", "background: url('img/button20.png') no-repeat scroll 0 0 transparent; line-height: 15px; padding: 2px 0 5px 8px;");
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},
		
		ComTabButton: function(caption, onclick) {
			var a = document.createElement('a');
			if (typeof(onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof(onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("style", "padding: 0px 12px");
			var span = document.createElement('span');
			span.setAttribute("style", "line-height: 35px; font-size:12px; font-weight: 700; color:#FFFFFF");
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

			/// <summary>Creates a blue tab </summary>
		BlueTab: function(caption, onclick) {
			var a = document.createElement('a');
			if (typeof(onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof(onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("class", "tab");
			var span = document.createElement('span');
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

		Span: function(innerHtml) {
			var span = document.createElement('span');
			span.innerHTML = innerHtml;
			return span;
		},

		Element: function(elementName, innerElement) {
			var elmt = document.createElement(elementName);
			if (typeof (innerElement) == "object") elmt.appendChild(innerElement);
			else if (typeof (innerElement) == "string") elmt.innerHTML = innerElement;
			else throw "Invalid Argument!";
			return elmt;
		},

		className: "a7u.Builder"
	};
	this.Builder = Builder;
	
		/// <summary> Provides KoC specific stuff </summary>
	this.KoCTools = {
		_ServerID: null,
		getServerId: function() {
			if (this._ServerID == null) {
				var m = /^[a-zA-Z]+([0-9]+)\./ .exec(document.location.hostname);
				if (m)
					this._ServerId = m[1];
				else
					this._ServerId = '??';
			}
			return this._ServerId;
		},

		_PlayerName: null,
		getPlayerName: function() {
			///*DEBUGCODE:*/alert("Calling a7u.KoCTools.getPlayerName");
			if (this._PlayerName == null) {
				var e = Tools.getElement("topnavDisplayName");
				///*DEBUGCODE:*/if (e == null) alert("topnavDisplayName not found!");
				this._PlayerName = e.textContent;
			};
			return this._PlayerName;
		},

		//TODO: getAllianceId: function () {}

		className: "a7u.KoCTools"
	};

	this.Plugins = {
		className: "a7u.Plugins"
	};

	this.className = "a7u";

	/*DEBUGCODE:*/ this.logit("Current player: " + this.KoCTools.getPlayerName());
};

//#endregion a7u Library

//#region Feature "Set Titel with player name"
//NOT WORKING
//// @include       http://apps.facebook.com/kingdomsofcamelot/*
//if (document.getElementsByTagName("html")[0].getAttribute("id") == "facebook") {
//	/*DEBUGCODE:*/if(a7uDebug) GM_log("Setup KoC Buttler \n" + "location: " + document.location.href);
//	window.setInterval(function () {
//		if(a7uDebug) GM_log("facebook 1 " + document.title);
//		if(a7uDebug) GM_log(unsafeWindow.getPropertyValue("a7u"));
//		if (typeof (a7u) != "object") return;
//		if(a7uDebug) GM_log("facebook 2");
//		var newTitle = a7u.KoCTools.getPlayerName();
//		var title = document.title;
//		a7u.logit("Update Title: " + title + " -> " + newTitle);
//		document.title = newTitle;
//	}, 5000);
//}
//#endregion Feature "Set Titel with player name"

//#region Feature "Toolbar"
function ToolbarPlugin(a7u) {

	var Macros = {
		// contains all functions, which can be called from toolbar buttons

		NewMessage : function () {
			a7u.Tools.doUnsafeWindow("modal_messages(); track_chrome_btn('messages_btn'); modal_messages_compose();", true);
		},
		
		// template: function(){},
		
		className: "Macros"
	};
	this.Macros = Macros;

	this.initUI = function () {
		if (a7uDebug) GM_log("Calling ToolbarPlugin.initUI");

		var fc = document.body.firstChild;

		var div = document.createElement('div');
		div.id = "a7u_ToolbarPlugin_ToolbarContainer";
		div.style.fontSize = 'small';
		div.style.textAlign = 'left';
		div.style.borderBottom = '1px solid silver';
		div.style.height = '24px';
		div.style.width = '772px';
		div.style.margin = '0 0 0 20px';

		//div.appendChild(a7u.Builder.BlueButton("Composser un Message", "modal_messages();track_chrome_btn('messages_btn');modal_messages_compose();return false;"));
		div.appendChild(a7u.Builder.BlueButton("Composser un Message", Macros.NewMessage));
		//TODO: div.appendChild(a7u.Builder.BlueButton("An Alle", "getMessageWindow(a7u.KoCTools.getAllianceId(),'Alliance Members','allianceall');return false;"));
		div.appendChild(a7u.Builder.BlueButton("Rapports De L'Alliance", "modal_alliance();track_chrome_btn('alliance_btn');allianceReports();modal_alliance_changetab(4);return false;"));
		div.appendChild(a7u.Builder.BlueButton("Envoyer Une Marche", "modal_attack(4,'','');return false;"));
		///*DEBUGCODE*/div.appendChild(a7u.Builder.BlueButton("Scan Chat", scanAllianceChat));
		///*DEBUGCODE*/ div.appendChild(a7u.Builder.BlueButton("Test", "alert(a7u.KoCTools.getPlayerName()); return false;"));
		div.appendChild(a7u.Builder.Span(" KoC7Help V" + a7uVersion + " par A7U"));

		document.body.insertBefore(div, document.body.firstChild);
	};

	this.initUI();

}
//#endregion Buttler Toolbar

//#region Feature "ResourceRequest"

function ResourceRequestPlugin() {
	this.RequestItemBackground = 'lightgreen';
	this.OwnItemBackground = 'lightgray';
	this.InfoBackground = "#E0E060";
	this.AllyAttackBackground = "#FFB0E0";
	this.OwnAttackBackground = "#FF8080";

	//#region Feature: "Cheat Zeit Korrektur"
	this.chatEntryTimeCorrection = function (msgdiv) {
		var enableTimeCorrection = true; // TODO read from Config
		//if(a7uDebug) GM_log("enableTimeCorrection: " + enableTimeCorrection);
		if (!enableTimeCorrection) return;
		if (msgdiv.getAttribute("class") != "chatwrap clearfix" && msgdiv.getAttribute("class") != "chatwrap clearfix direct") return;

		var timeOffset = 9; // TODO read from Config
		var chhmm = a7u.Tools.getElement("kochead_time").innerHTML.split(":");
		var cmmm = (60 * chhmm[0]) + (1 * chhmm[1]);

		var timeSpan = msgdiv.childNodes[1].childNodes[0].childNodes[3];
		var hhmm = timeSpan.innerHTML.split(":");
		var hh = (1 * hhmm[0]);
		var mmm = hh * 60 + (1 * hhmm[1]);
		
		if (Math.abs(cmmm - mmm) > 2) {
			hh += timeOffset; if (hh >= 24) hh -= 24; if (hh < 10) hh = "0" + hh;
			var newTime = hh + ":" + hhmm[1];
			//if(a7uDebug) GM_log("Chat entry: time correction: " + timeSpan.innerHTML + " + Offset " + timeOffset + "h = " + newTime);
			timeSpan.innerHTML = newTime;
		}

	};
	//#endregion

	this.scanAllianceChat = function () {
		//if(a7uDebug) GM_log("ResourceRequestPlugin.scanAllianceChat");

		function setEntryHandled() {
			msgdiv.innerHTML += "<div style='display:none'>Entry processed by a7u</div>";
		}

		function startsWithAny(txt, tokens) {
			for (var j = 0; j < tokens.length; j++) {
				if (txt.indexOf(tokens[j]) == 0) return tokens[j];
			}
			return null;
		}


		var a7u = unsafeWindow.a7u; if (a7u == null) throw "a7u is null!";
		var reqStyle = "background: " + a7u.Plugins.ResourceRequest.RequestItemBackground;
		var ackStyle = "background: " + a7u.Plugins.ResourceRequest.RequestItemBackground;
		var dlyStyle = "background: " + a7u.Plugins.ResourceRequest.RequestItemBackground;
		var ownStyle = "background: " + a7u.Plugins.ResourceRequest.OwnItemBackground;
		var infoStyle = "background: " + a7u.Plugins.ResourceRequest.InfoBackground;
		var allyAttackStyle = "background: " + a7u.Plugins.ResourceRequest.AllyAttackBackground;
		var ownAttackStyle = "background: " + a7u.Plugins.ResourceRequest.OwnAttackBackground;

		var requestTokens = ['Ressources:', "*J'ai Besoin de Ressources*"];
		var acknowledgeTokens = ["RES BESTÄTIGUNG:", "*BESTÄTIGUNG*", "BESTÄTIGT:"];
		var deliveryTokens = ["RES LIEFERUNG:", "*LIEFERUNG*"];
		var infoTokens = ["INFO:"]; //Spam vom KoC Power z.B.
		var attackTokens = ["MÖGLICHER ANGRIFF:", "ALARM:","*ALARM*","!!! Hilfe ich werde angegriffen !!!"];
		var playerName = a7u.KoCTools.getPlayerName();

		var modCommList2 = a7u.Tools.getElement("mod_comm_list2");
		for (var i = 0; i < modCommList2.childNodes.length; i++) {
			var msgdiv = modCommList2.childNodes[i];
			if (msgdiv.lastChild.innerHTML == "Entry processed by a7u") return; //allready handled item found,exit loop

			//#region Feature: "Cheat Zeit Korrektur"
			if (a7u.Plugins.ResourceRequest.chatEntryTimeCorrection(msgdiv)) { setEntryHandled(); return; };
			//#endregion			


			//if(a7uDebug) GM_log("msgdiv.class: " + msgdiv.getAttribute("class"));

			var msgType = "unknown"; var isAlliance = false; var isDirect = false; var isNoAlliance = false; var isGlobal = false;
			if (msgdiv.getAttribute("class") == "chatwrap clearfix") { msgType = "alliance"; isAlliance = true; }
			else if (msgdiv.getAttribute("class") == "chatwrap clearfix direct") { msgType = "direct"; isDirect = true; }
			else if (msgdiv.getAttribute("class") == "chatwrap clearfix noalliance") { msgType = "noalliance"; isNoAlliance = true; }
			else if (msgdiv.getAttribute("class") == "chatwrap clearfix global") { msgType = "global"; isGlobal = true; }

			if (!isNoAlliance) {
				var img = msgdiv.childNodes[0];
				var contentDiv = msgdiv.childNodes[1];
				var infoDiv = msgdiv.childNodes[1].childNodes[0];
				var whoA = msgdiv.childNodes[1].childNodes[0].childNodes[0];
				var saysB = msgdiv.childNodes[1].childNodes[0].childNodes[1];
				var timeSpan = msgdiv.childNodes[1].childNodes[0].childNodes[3];
				var clearfixDiv = msgdiv.childNodes[1].childNodes[1];
				var tx = msgdiv.childNodes[1].childNodes[1].childNodes[0];

				var isOwnEntry = (whoA.textContent == playerName);
				var msgtxt = tx.textContent;
			} else {
				//TODO
				setEntryHandled();
				continue;
			}

			/*DEBUGCODE:*/if (a7uDebug) GM_log("who: " + whoA.textContent + " timeSpan: " + timeSpan.innerHTML + " isOwnEntry: " + isOwnEntry + " context: " + msgType + " \nmsgtxt: " + msgtxt);

			var token = null; var token0 = null;
			if (!token) if (token = startsWithAny(msgtxt, attackTokens)) { token0 = attackTokens[0]; }
			if (!token) if (token = startsWithAny(msgtxt, infoTokens)) { token0 = infoTokens[0]; }
			if (!token) if (token = startsWithAny(msgtxt, requestTokens)) { token0 = requestTokens[0]; }
			if (!token) if (token = startsWithAny(msgtxt, acknowledgeTokens)) { token0 = acknowledgeTokens[0]; }
			if (!token) if (token = startsWithAny(msgtxt, deliveryTokens)) { token0 = deliveryTokens[0]; }
			if (!token) {
				setEntryHandled();
				continue;
			}

			/*DEBUGCODE:*/if (a7uDebug) GM_log("Chat token found: " + token + " isOwnEntry: " + isOwnEntry + " context: " + msgType);

			if (token0 == requestTokens[0] && !isOwnEntry) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("ANFRAGE token found");
				msgdiv.setAttribute("style", reqStyle);
				var ackdiv = document.createElement('div');
				var tReqR = msgtxt;
				var t1R = tReqR.indexOf(token);
				tReqR = tReqR.substring(t1R, tReqR.length);
				var t2R = tReqR.indexOf("'");
				if (t2R >= 0) tReqR = tReqR.substr(0, t2R);

				var tAck = tReqR.replace(token, acknowledgeTokens[0]);
				var cA = "var chat = document.getElementById('mod_comm_input'); chat.value = '" + tAck + "';chat.focus();return false;";
				ackdiv.appendChild(a7u.Builder.BlueButton("Bestätigen", cA));
				msgdiv.appendChild(ackdiv);
				setEntryHandled();
				continue;
			} else if (token0 == acknowledgeTokens[0] && isOwnEntry) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("BESTÄTIGUNG token found");
				msgdiv.setAttribute("style", ackStyle);
				var dlydiv = document.createElement('div');
				var tAckM = msgtxt;
				var t1A = tAckM.indexOf(token);
				tAckM = tAckM.substring(t1A, tAckM.length);
				var t2A = tAckM.indexOf("'");
				if (t2A >= 0) tAckM = tAckM.substr(0, t2A);

				var tDly = tAckM.replace(token, deliveryTokens[0]);
				var cD = "var chat = document.getElementById('mod_comm_input'); chat.value = '" + tDly + " / ??min';chat.focus();return false;";
				dlydiv.appendChild(a7u.Builder.BlueButton("Liefern", cD));
				msgdiv.appendChild(dlydiv);
				setEntryHandled();
				continue;
			} else if (token0 == deliveryTokens[0] && !isOwnEntry) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("LIEFERUNG token found");
				msgdiv.setAttribute("style", dlyStyle);
				setEntryHandled();
				continue;
			} else if (token0 == infoTokens[0]) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("INFO token found");
				msgdiv.setAttribute("style", infoStyle);
				setEntryHandled();
				continue;
			} else if (token0 == attackTokens[0] && isOwnEntry) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("ANGRIFF (Selber) token found");
				msgdiv.setAttribute("style", ownAttackStyle);
				setEntryHandled();
				continue;
			} else if (token0 == attackTokens[0] && !isOwnEntry) {
				/*DEBUGCODE:*/if (a7uDebug) GM_log("ANGRIFF (Alli) token found");
				msgdiv.setAttribute("style", allyAttackStyle);
				setEntryHandled();
				continue;
			}

			if (isOwnEntry) {
				msgdiv.setAttribute("style", ownStyle);
				setEntryHandled();
				continue; // skip own message
			}

			setEntryHandled();
		}
	};

	var atResourceRequestClick = function () {
		if(a7uDebug) GM_log("ResourceRequestPlugin.atResourceRequestClick");
		var a7u = unsafeWindow.a7u; if (a7u == null) throw "a7u is null!";

		var rrDestination = a7u.Tools.getElement("rrDestination");
		var rrGoldAmount  = a7u.Tools.getElement("rrGoldAmount");
		var rrFoodAmount  = a7u.Tools.getElement("rrFoodAmount");
		var rrWoodAmount  = a7u.Tools.getElement("rrWoodAmount");
		var rrStoneAmount = a7u.Tools.getElement("rrStoneAmount");
		var rrOreAmount   = a7u.Tools.getElement("rrOreAmount");

		var req = a7u.Plugins.ResourceRequest;

		req.a7uVersion = "2";
		req.Destination = rrDestination.value.toLowerCase().replace(";", ",").replace("-", ",").replace("/", ",").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "");
		req.Gold = rrGoldAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Food = rrFoodAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Wood = rrWoodAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Stone = rrStoneAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Ore = rrOreAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");

		var pers = a7u.JSON.stringify(req);
		a7u.logit("save: "+pers);
		GM_setValue("ResourceRequest_" + a7u.KoCTools.getServerId(),pers);

		var mod_comm_input = a7u.Tools.getElement("mod_comm_input");
		if (mod_comm_input == null) { alert("mod_comm_input not found!"); return; }


		var sA = "";
		if (req.Gold.length > 0 && req.Gold != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Or" + " " + req.Gold;
		if (req.Food.length > 0 && req.Food != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Nourriture" + " " + req.Food;
		if (req.Wood.length > 0 && req.Wood != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Bois" + " " + req.Wood;
		if (req.Stone.length > 0 && req.Stone != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Pierre" + " " + req.Stone;
		if (req.Ore.length > 0 && req.Ore != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Minerai" + " " + req.Ore;
		//if(sA.length==0) return;
		var s = "/a " + "J'ai Besoin De Ressources:" + " " + req.Destination + " " + sA;
		a7u.logit("Send: "+s)

		;
		a7u.Tools.type(mod_comm_input, s);
		a7u.Tools.click(mod_comm_input.nextSibling);

		a7u.Tools.getElement("rrContainer").style.display = "none";
		a7u.Tools.getElement("//*[@class='comm_body comm_global']").style.display = "";
	};
	this.atResourceRequestClick = atResourceRequestClick;

	this.CurrentRequest = {
		a7uVersion: "2",
		Destination: "XXX,YYY",
		Gold: "0",
		Food: "0",
		Wood: "0",
		Stone: "0",
		Ore: "0"
	};

	var atShowResourceRequest = function () {
		/*DEBUGCODE:*/if(a7uDebug) GM_log("ResourceRequestPlugin.atShowResourceRequest");
		a7u.Tools.getElement("rrContainer").style.display = "";
		a7u.Tools.getElement("//*[@class='comm_body comm_global']").style.display = "none";
	};
	this.atShowResourceRequest = atShowResourceRequest;

	var atCloseResourceRequest = function () {
		/*DEBUGCODE:*/if(a7uDebug) GM_log("ResourceRequestPlugin.atCloseResourceRequest");
		a7u.Tools.getElement("rrContainer").style.display = "none";
		a7u.Tools.getElement("//*[@class='comm_body comm_global']").style.display = "";
	};
	this.atCloseResourceRequest = atCloseResourceRequest;
	

	this.initUI = function () {
		/*DEBUGCODE:*/if(a7uDebug) GM_log("ResourceRequestPlugin.initUI");

		var koc_comm_tabs = a7u.Tools.getElement("comm_tabs");
		if (!koc_comm_tabs) { throw "Element 'koc_comm_tabs' not found! Maybe KoC has some changes."; }
		var mod_comm = a7u.Tools.getElement("//*[@class='mod_comm']");
		if (!mod_comm) { throw "Element 'mod_comm' not found! Maybe KoC has some changes."; }

		// Append the "Anfrage" Tab
		var btn = a7u.Builder.ComTabButton("Ressources", "a7u.Plugins.ResourceRequest.atShowResourceRequest();return false;");
		koc_comm_tabs.appendChild(btn);


		// Append the "Anfrage" form
		var htmlTemplate = "<div id='rrContainer' style='position: relative; top: 96px; border: 1px solid #A56631; height: 350px; margin-left: 10px;margin-top: 84x; overflow-x: hidden; overflow-y: hidden; position: relative; width: 340px;'><table style='width: 100%'><tr><td><span style='font-weight: bold'>Demander des ressources </span></td><td style='text-align: right'><a href='#' onclick='a7u.Plugins.ResourceRequest.atCloseResourceRequest();return false;'><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/close_icon.png' alt='X' /></a></td></tr></table><table><tbody><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png'></td><td>Quantité:<input id='rrFoodAmount' type='text' value='0' maxlength='30' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png'></td><td>Quantité:<input id='rrWoodAmount' type='text' value='0' maxlength='30' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png'></td><td>Quantité:<input id='rrStoneAmount' type='text' value='0' maxlength='30' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png'></td><td>Quantité:<input id='rrOreAmount' type='text' value='0' maxlength='30' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png'></td><td>Quantité:<input id='rrGoldAmount' type='text' value='0' maxlength='30' size='11'></td></tr></tbody></table><div style='margin-bottom: 10px; display: none'><span id='rrCityTo'><input id='rrTraderTo_0' class='castleBut castleButNon' type='submit' value='1'><input id='rrTraderTo_1' class='castleBut castleButNon' type='submit' value='2'><input id='rrTraderTo_2' class='castleBut castleButNon' type='submit' value='3'><input id='rrTraderTo_3' class='castleBut castleButNon' type='submit' value='4'><input id='rrTraderTo_4' class='castleBut castleButNon' type='submit' value='5'><input id='rrTraderTo_5' class='castleBut castleButNon' type='submit' value='6'><input id='rrTraderTo_6' class='castleBut castleButNon' type='submit' value='7'><span id='rrTraderToCityName' style='display: inline-block; width: 85px; font-weight: bold;'></span></span></div><div>Coordonées:<input id='rrDestination' type='text' maxlength='7' size='7'></div><br/><span><a class='button20' onclick='a7u.Plugins.ResourceRequest.atResourceRequestClick();return false;'><span>Demander</span></a></span></div>";
		var div = a7u.Builder.Element("div", htmlTemplate);
		div.setAttribute("id", "rrContainer"); //WORKARROUND id from template is not pressent!?
		div.style.display = "none"; // hide on init
		mod_comm.appendChild(div);
		
		var s = GM_getValue("ResourceRequest_" + a7u.KoCTools.getServerId());

		var rrDestination = a7u.Tools.getElement("rrDestination");
		var rrGoldAmount = a7u.Tools.getElement("rrGoldAmount");
		var rrFoodAmount = a7u.Tools.getElement("rrFoodAmount");
		var rrWoodAmount = a7u.Tools.getElement("rrWoodAmount");
		var rrStoneAmount = a7u.Tools.getElement("rrStoneAmount");
		var rrOreAmount = a7u.Tools.getElement("rrOreAmount");

		if (s != null) {
			var rr = a7u.JSON.parse(s);
			if(a7uDebug) GM_log("Output: " + typeof (rr.a7uVersion));
			if (typeof (rr.a7uVersion) != "string" || rr.a7uVersion != "2") {
				rrDestination.value = "XXX-YYY";
				rrGoldAmount.value = "0";
				rrFoodAmount.value = "0";
				rrWoodAmount.value = "0";
				rrStoneAmount.value = "0";
				rrOreAmount.value = "0";
			} else {
				rrDestination.value = rr.Destination;
				rrGoldAmount.value = rr.Gold;
				rrFoodAmount.value = rr.Food;
				rrWoodAmount.value = rr.Wood;
				rrStoneAmount.value = rr.Stone;
				rrOreAmount.value = rr.Ore;
			}
		} else {
			rrDestination.value = "XXX,YYY";
			rrGoldAmount.value = "0";
			rrFoodAmount.value = "0";
			rrWoodAmount.value = "0";
			rrStoneAmount.value = "0";
			rrOreAmount.value = "0";
		}
	};

	this.initUI();
	if(a7uDebug) GM_log("setInterval scanAllianceChat");
	window.setInterval(this.scanAllianceChat, 5000);
};







//#endregion Buttler ResourceRequest

//function userFunctionB() {
//	alert("Marschbefehl");
//	Selenium.click("mod_views_city");
//	var rallyPointId = Selenium.getAttribute("//a[@class='bldg_12_11' or @class='bldg_12_10' or @class='bldg_12_9' or @class='bldg_12_8' or @class='bldg_12_7' or @class='bldg_12_6' or @class='bldg_12_5' or @class='bldg_12_4' or @class='bldg_12_3' or @class='bldg_12_2' or @class='bldg_12_1']@id");
//	Selenium.click(rallyPointId);
//	Selenium.waitforElementPresent("//*[@id='modal_rallypoint_tabs']/a[3]/span"); // "css=#modal_rallypoint_tabs > a.button20 > span"
//	Selenium.click("//*[@id='modal_rallypoint_tabs']/a[3]/span");
//	//Selenium.waitforElementPresent("modal_attack_tab_1");
//	Selenium.click("modal_attack_tab_1");
//	Selenium.click("modal_attack_supplyfilter_checkbox");
////	Selenium.click("ptatp_${CityIndex}");
////	var x = Selenium.getValue("modal_attack_target_coords_x");
//	//	var y = Selenium.getValue("modal_attack_target_coords_y");
//	Selenium.type("modal_attack_rec1", "12345");
////	Selenium.type("modal_attack_rec1", "${TransportFood}");
////	Selenium.type("modal_attack_rec2", "${TransportWood}");
////	Selenium.type("modal_attack_rec3", "${TransportStone}");
////	Selenium.type("modal_attack_rec4", "${TransportOre}");
////	Selenium.click("modal_attack_unit_ipt8");
////	Selenium.type("modal_attack_unit_ipt8", "${HCav}");
////	Selenium.typeKeys("modal_attack_rec4", ".");
////	Selenium.click("btnMarch");
//}