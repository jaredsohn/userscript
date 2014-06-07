// ==UserScript==
// @name          KoC plus
// @namespace     KSX (madman79 traduzione)
// @description   KSX sein KoC Buttler. Ressourcen-Anfragen, und mehr(messaggistica interna e richiesta risorse in ally rapida e altro)
// @include       *.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// ==/UserScript==

var Version = "2011071811.ita";

// JSON
var JSON; if (!JSON) { JSON = {}; } (function () { "use strict"; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', { '': value }); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; } throw new SyntaxError('JSON.parse'); }; } } ());
var JSON2 = JSON;

var Tools = {

	getElementByXPath: function (expr) {
		//var d=window.frames[0].frames[0].document;
		var d = document;
		var elmFirstResult = d.evaluate(expr, document,
			null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		return elmFirstResult;
	},

	click: function (element) {
		if (element == null) throw "Element not specified!";
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var canceled = !element.dispatchEvent(evt);
		if (canceled) {
			// A handler called preventDefault
		} else {
			// None of the handlers called preventDefault
		}
	},

	typeKeys: function (element, char) {
		try {
			for (var i = 0; i < char.length; i++) {
				// Create the key press event.
				var pressEvent = document.createEvent('KeyboardEvent');
				pressEvent.initKeyEvent("keypress", true, true, window,
					false, false, false, false,
					0, char.charCodeAt(i));

				element.dispatchEvent(pressEvent); // Press the key.
			}
		}
		catch (e) {
			alert("Your browser does not support this example!");
		}
	},

	type: function (element, char) {
		try {
			if (element.type == 'text') {
				element.focus();
				element.value = char;
			} else {
				alert("Unknown element!");
			}
		} catch (e) {
			alert("Your browser does not support this example!");
		}
	}
};

var Selenium = {

	click: function (locator) {
		logit("Selenium: click | " + locator);
		var elmt = this.getElementNoLog(locator);
		if (elmt == null) {
			throw "Element not found (" + locator + ")";
		}
		Tools.click(elmt);
	},

	getAttribute: function (attributeLocator) {
		logit("Selenium: getAttribute | " + attributeLocator);
		var index = attributeLocator.lastIndexOf('@');
		var locator = attributeLocator.substr(0, index);
		var attribute = attributeLocator.substring(index + 1, attributeLocator.length);
		//alert(locator + " " + attribute);
		var elmt = this.getElement(locator);
		var attrValue = elmt.getAttribute(attribute);
		return attrValue;
	},

	getElementNoLog: function (locator) {
		if (locator.search('//') == 0) return Tools.getElementByXPath(locator);
		if (locator.search('xpath=') == 0) return Tools.getElementByXPath(locator.substr(6, locator.length - 6));
		//if (locator.search('css=') == 0) return Tools.getElementByCssPath(locator.substr(4, locator.length - 4));
		var elmt = document.getElementById(locator); if (elmt != null) return elmt;
		return document.getElementsByName(locator);
	},

	getElement: function (locator) {
		logit("Selenium: getElement | " + locator);
		return this.getElementNoLog(locator);
	},

	getElementPresentNoLog: function (locator) {
		return this.getElementNoLog(locator) != null;
	},
	getElementPresent: function (locator) {
		logit("Selenium: getElementPresent | " + locator);
		return this.getElementNoLog(locator) != null;
	},

	waitforElementPresent: function (locator) {
		logit("Selenium: waitforElementPresent | " + locator);
		var tot = new Date().getTime() + 30000;
		do {
			if (this.getElementPresentNoLog(locator)) return true;
		} while (new Date().getTime() < tot)
		throw "Timeout on waiting for element!";
	}

};

var Builder = {
	BlueButton: function (caption, onclick) {
		var a = document.createElement('a');
		if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
		else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
		else throw "Invalid argument!";
		a.setAttribute("class", "button20");
		var span = document.createElement('span');
		a.appendChild(span);
		span.appendChild(document.createTextNode(caption));
		return a;
	},
	BlueTab: function (caption, onclick) {
		var a = document.createElement('a');
		a.addEventListener("click", onclick, true);
		a.setAttribute("class", "tab");
		a.appendChild(document.createTextNode(caption));
		return a;
	},

	Html: function (html) {
		var span = document.createElement('span');
		span.innerHTML = html;
		return span;
	},

	Element: function (elementName, innerElement) {
		var elmt = document.createElement(elementName);
		if (innerElement != null) elmt.appendChild(innerElement);
		return elmt;
	}
};

var KoC = {
	_ServerID: null,
	getServerId: function () {
		if (this._ServerID == null) {
			var m = /^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
			if (m)
				this._ServerId = m[1];
			else
				this._ServerId = '??';
		}
		return this._ServerId;
	},

	_PlayerName: null,
	getPlayerName: function () {
		if (this._PlayerName == null) {
			var e = Tools.getElementByXPath("//*[@id='topnavDisplayName']");
			_PlayerName = e.text;
		};
		return this._PlayerName;
	}
};

function logit (msg){

  var now = new Date();
  GM_log (KoC.getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);

}

function userFunctionB() {
	alert("Marschbefehl");
	Selenium.click("mod_views_city");
	var rallyPointId = Selenium.getAttribute("//a[@class='bldg_12_11' or @class='bldg_12_10' or @class='bldg_12_9' or @class='bldg_12_8' or @class='bldg_12_7' or @class='bldg_12_6' or @class='bldg_12_5' or @class='bldg_12_4' or @class='bldg_12_3' or @class='bldg_12_2' or @class='bldg_12_1']@id");
	Selenium.click(rallyPointId);
	Selenium.waitforElementPresent("//*[@id='modal_rallypoint_tabs']/a[3]/span"); // "css=#modal_rallypoint_tabs > a.button20 > span"
	Selenium.click("//*[@id='modal_rallypoint_tabs']/a[3]/span");
	//Selenium.waitforElementPresent("modal_attack_tab_1");
	Selenium.click("modal_attack_tab_1");
	Selenium.click("modal_attack_supplyfilter_checkbox");
//	Selenium.click("ptatp_${CityIndex}");
//	var x = Selenium.getValue("modal_attack_target_coords_x");
	//	var y = Selenium.getValue("modal_attack_target_coords_y");
	Selenium.type("modal_attack_rec1", "12345");
//	Selenium.type("modal_attack_rec1", "${TransportFood}");
//	Selenium.type("modal_attack_rec2", "${TransportWood}");
//	Selenium.type("modal_attack_rec3", "${TransportStone}");
//	Selenium.type("modal_attack_rec4", "${TransportOre}");
//	Selenium.click("modal_attack_unit_ipt8");
//	Selenium.type("modal_attack_unit_ipt8", "${HCav}");
//	Selenium.typeKeys("modal_attack_rec4", ".");
//	Selenium.click("btnMarch");


}

ResourceRequest = {
	Destination: "coord",
	Type:"risorse",
	Amount:"quantità"
};

var ids=document.id + "/" + document.getElementsByTagName('html')[0].id +"/"+ document.body.id;
logit("Start KSX Buttler \n" + "loacation: " + document.location.href + "\n" + "IDs:" + ids);

//if(document.getElementsByTagName('html')[0].id=='facebook'){
if (document.body.id == 'mainbody') {
	
	logit("Setup KSX Buttler \n" + "loacation: " + document.location.href + "\n" + "IDs:" + ids);
	
	var div = document.createElement('div');
	div.style.fontSize = 'small';
	div.style.textAlign = 'left';
	div.style.borderBottom = '1px solid silver';
	div.style.height = '24px';
	div.style.width = '772px';
	div.style.margin = '0 0 0 20px';
	//div.appendChild(Builder.BlueButton(" [ A ] ",function(event){alert('A');}));
	div.appendChild(Builder.BlueButton(" Messaggio ", "modal_messages();track_chrome_btn('messages_btn');modal_messages_compose();return false;"));
	div.appendChild(Builder.BlueButton(" a tutti ", "getMessageWindow(1445,'Alliance Members','allianceall');return false;"));
	div.appendChild(Builder.BlueButton(" Rapporti ally ", "modal_alliance();track_chrome_btn('alliance_btn');allianceReports();modal_alliance_changetab(4);return false;"));
	div.appendChild(Builder.BlueButton(" Punto di raduno ", "modal_attack(4,'','');return false;"));
	div.appendChild(Builder.Html(" KSX Buttler (tradotta) v" + Version));

	document.body.insertBefore(div, document.body.firstChild);

	InitResourceRequest();
}

function InitResourceRequest() {
	var div = document.createElement('div');
	div.style.fontSize = 'small';
	div.style.textAlign = 'left';
	div.style.borderBottom = '1px solid silver';
	div.style.margin = '0 0 0 10px';
	div.appendChild(Builder.BlueButton(" *Richiesta* ", atResourceRequestClick));
	div.appendChild(Builder.Html("<input id='rrDestination' type='text' size='7' maxlength='7' /><select id='rrType' ><option>Oro</option><option>Cibo</option><option>Legna</option><option>Pietra</option><option selected='selected'>Minerali</option></select><input id='rrAmount' type='text' size='7' maxlength='7'/>"));

	var e = Tools.getElementByXPath("//*[@class='comm_body comm_global']/form");
	e.parentNode.insertBefore(div, e);
	
	var s = GM_getValue("ResourceRequest_" + KoC.getServerId());
	var rrDestination = Tools.getElementByXPath("//*[@id='rrDestination']");
	var rrType        = Tools.getElementByXPath("//*[@id='rrType']");
	var rrAmount      = Tools.getElementByXPath("//*[@id='rrAmount']");
	if (s != null) {
		var rr = JSON2.parse(s);
		rrDestination.value = rr.Destination;
		rrType       .value = rr.Type;
		rrAmount     .value = rr.Amount;
	} else {
		rrDestination.value = "coord";
		rrType       .value = "risorse";
		rrAmount     .value = "48kk";
	}
};

function atResourceRequestClick() {
	var rrDestination = Tools.getElementByXPath("//*[@id='rrDestination']").value;
	var rrType        = Tools.getElementByXPath("//*[@id='rrType']").value;
	var rrAmount      = Tools.getElementByXPath("//*[@id='rrAmount']").value;

	ResourceRequest.Amount = rrAmount;
	ResourceRequest.Type = rrType;
	ResourceRequest.Destination = rrDestination;

	GM_setValue("ResourceRequest_" + KoC.getServerId(), JSON2.stringify(ResourceRequest));

	var e = Tools.getElementByXPath("//*[@id='mod_comm_input']");
	if (e == null) { alert("XPath not found!"); return; }
	//alert(e.id);
	Tools.type(e, "/a *Richiesta* " + rrDestination + " " + rrType + " " + rrAmount);
	var b = e.nextSibling;
	Tools.click(b);
}

