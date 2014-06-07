// ==UserScript==
// @name           Filefront Link Rewriter
// @namespace      http://userscripts.org/users/22690
// @description    Rewrites filefront download links to shorthand version
// @source         http://userscripts.org/scripts/show/21890
// @identifier     http://userscripts.org/scripts/source/21890.user.js
// @version        0.1
// @date           2008-01-29
// @creator        Rommel
// @include        *
// ==/UserScript==

var ff_fileLinks = document.evaluate("//a[starts-with(@href, 'http://files.filefront.com/')]", document, null, 6, null);
for(var i=0, flink; ff_fileLinks.snapshotLength > i; i++){
  flink = ff_fileLinks.snapshotItem(i).href.match(/(http:\/\/[^\/]+\/)[^\/]+\/;(\d+);\/.*/);
  ff_fileLinks.snapshotItem(i).href = flink[1] + flink[2];
}

(function () {

// bit masks
var CHECK_START = 1;
var CHECK_NOT_FOUND = 2;
var CHECK_ERROR = 4;
var CHECK_NOT_NEWER = 8;
var CHECK_NEWER = 16;

// configurable constants
var SCRIPT = {
	name: "Filefront Link Rewriter",
	namespace: "http://userscripts.org/users/22690",
	description: "Rewrites filefront download links to shorthand version"
	source: "http://userscripts.org"			// script homepage/description URL
			+ "/scripts/show/21890",
	identifier: "http://userscripts.org"	// script URL
			+ "/scripts/source/21890.user.js",
	version: "0.1",								// version
	date: (new Date(2008, 01 - 1, 29))		// update date
			.valueOf()
};
var CMD_CHECK_LABEL = SCRIPT.name + ": Check Now";
var CMD_CHECK_SHOW_MASK =
	CHECK_START | CHECK_NOT_FOUND | CHECK_ERROR | CHECK_NEWER;
var ADD_PROMPT_BEFORE =
	"A user script has requested automatic update checks:\n\n";
var ADD_PROMPT_AFTER = "\n\nAllow?";
var CHANGE_PROMPT_BEFORE = "Change update location of user script\n\n";
var CHANGE_PROMPT_AFTER = "\n\n to ";
var CHECK_START_TEXT = "Checking for user script updates...";
var CHECK_FINISHED_TEXT =
	"%newer% update(s) found, %notFound% not found, %metaError% error(s)";
var CHECK_LINK_TEXT = {};
	CHECK_LINK_TEXT[CHECK_NOT_FOUND] =	"NOT\xA0FOUND";
	CHECK_LINK_TEXT[CHECK_ERROR] =		"ERROR";
	CHECK_LINK_TEXT[CHECK_NOT_NEWER] =	"NOT\xA0NEWER";
	CHECK_LINK_TEXT[CHECK_NEWER] =		"link";
var DESCRIPTIONS_MAP = [
	["name"],
	["namespace"],
	["description"],
	["source", "homepage"],
	["identifier", "location"],
	["version"],
	["date"]
];
var UPDATE_FREQUENCY_MS = 7 * 86400 * 1000;	// 1 week
var ALERT_LINE_LENGTH = 80;
var MIN_HOVER_MS = 500;
var API_OBJECT_NAME = "UserScriptUpdates";	// object exposing update APIs
var UPDATE_NOTIFICATION_CLASS = "UserScriptUpdatesNotification";
var FRAME_MARGIN = "16px";

// non-configurable constants
var ID_RE = /[^0-9a-z_$]/ig;
var ID_RE_FN = function (ch) { return "\\u" + intToHex(ch.charCodeAt(0), 4); };
var STRING_SAVE_RE = /./g;
var STRING_SAVE_RE_FN = function (ch) { var code = ch.charCodeAt(0);
	if (code < 32 || code > 126) { return ("\\u" + intToHex(code, 4)); }
	else { return (BACKSLASH_ESCAPE_RE.test(ch) ? "\\" : "") + ch; } };
var BACKSLASH_ESCAPE_RE = /["'\\]/;
var KEYWORD_LITERALS = [null, undefined, true, false, NaN, Infinity];
var LINE_TERMINATORS = "\r\n\u2028\u2029";

// global variables
var scripts = {};
var updates = {
	check: {pending: 0, notFound: 0, metaError: 0, notNewer: 0, newer: 0},
	list: document.createElement("ol"),
	label: document.createTextNode(""),
	labelContainer: document.createElement("a"),
	hoverTimer: null,
	listMutex: 1
};
var win = unsafeWindow || window.wrappedJSObject || window;

// initialization
setupGlobals();
win[API_OBJECT_NAME] = {requestAutomaticUpdates: requestAutomaticUpdates};
try {
	if (GM_registerMenuCommand
			&& GM_registerMenuCommand !== win.GM_registerMenuCommand) {
		GM_registerMenuCommand(CMD_CHECK_LABEL, function () {
			checkAll(CMD_CHECK_SHOW_MASK);
		});
	}
} catch (ex) {}
try {
	window.addEventListener("load", windowOnLoad, false);
} catch (ex) {}

function setupGlobals () {
	loadScripts();
	setStoredValue("lastGlobalUpdate",
			getStoredValue("lastGlobalUpdate") || "-1");
	try {
		updates.labelContainer.appendChild(updates.label);
		updates.labelContainer.className = UPDATE_NOTIFICATION_CLASS;
		updates.labelContainer.setAttribute("href", "javascript:void(0);");
		updates.list.className = UPDATE_NOTIFICATION_CLASS;
		
		function hover (evt) {
			evt = evt || window.event;
			try { window.clearTimeout(updates.hoverTimer); } catch (ex) {}
			addClass(updates.list, "hover");
			if (evt.type == "mouseout") {
				updates.hoverTimer = window.setTimeout(function () {
					removeClass(updates.list, "hover");
				}, MIN_HOVER_MS);
			}
		};
		
		updates.labelContainer.addEventListener("click", hover, false);
		updates.labelContainer.addEventListener("mouseover", hover, false);
		updates.labelContainer.addEventListener("mouseout", hover, false);
		updates.list.addEventListener("mouseover", hover, false);
		updates.list.addEventListener("mouseout", hover, false);
	} catch (ex) {}
};

function windowOnLoad () {
	win[API_OBJECT_NAME].requestAutomaticUpdates(SCRIPT);
	if (setupPage() && (parseInt(getStoredValue("lastGlobalUpdate"), 10) || Infinity)
			< ((new Date()).valueOf() - UPDATE_FREQUENCY_MS)) {
		checkAll(CHECK_NEWER);
	}
};

function setupPage () {
	var sel_label = "a." + UPDATE_NOTIFICATION_CLASS;
	var sel_list = "ol." + UPDATE_NOTIFICATION_CLASS;
	var elTop = window.top.document;
	var isFrame = false;
	try {
		if (elTop.documentElement.nodeName.search(/(^|:)html$/i) == -1) {
			throw new Error();
		}
		isFrame = (!elTop.body || elTop.body.nodeName.search(/(^|:)body$/i) == -1);
		addGlobalStyle(""
			+ sel_label + ", " + sel_list + " { display: none;"
					+ " position: absolute !important; position: fixed !important;"
					+ " bottom: 0 !important;"
					+ " right: " + (isFrame ? FRAME_MARGIN : 0) + " !important;"
					+ " margin: 0 !important;"
					+ " font-family: sans-serif; cursor: default; }\n"
			+ sel_label + " {"
					+ " border: 2px solid white; padding: 3px;"
					+ " font: bold x-small sans-serif; line-height: 150%;"
					+ " text-decoration: none !important;"
					+ " color: white; background-color: red; }\n"
			+ sel_list + " { list-style-type: none !important;"
					+ " max-width: 90% !important; max-height: 90% !important;"
					+ " overflow: auto;"
					+ " border: 0 !important; padding: 0 !important; }\n"
			+ sel_list + " li" + " { display: table-row !important;"
					+ " margin: 0 !important; border: 0px solid silver !important;"
					+ " border-top-width: 1px !important; padding: 0 !important;"
					+ " color: silver; background-color: maroon; }\n"
			+ sel_list + " li a" + " { display: table-cell !important;"
					+ " white-space: nowrap !important; padding: 2px;"
					+ " color: inherit !important;"
					+ " background-color: transparent !important; }\n"
			+ sel_list + " li a:first-child" + " { padding-right: .3em !important;"
					+ " text-decoration: none !important; }\n"
			+ sel_list + ".hover" + "{ display: block; border-collapse: collapse;"
					+ " }\n"
			+ sel_list + " li:hover" + " {"
					+ " color: white; background-color: red; }",
			false,
			elTop
		);
		elTop = (isFrame ? elTop.documentElement : elTop.body);
		elTop.appendChild(updates.labelContainer);
		elTop.appendChild(updates.list);
		return true;
	} catch (ex) { return false; }
};

function requestAutomaticUpdates (objScript) {
	if (!isValidScript(objScript)) { return; }
	
	// handle old versions of the script
	try {
		var oldScript = getScript(objScript.namespace, objScript.name);
		if (oldScript && isNewerScript(objScript, oldScript)
				&& !updateRejected(oldScript, objScript.identifier)) {
			if (oldScript.identifier == objScript.identifier
					|| window.confirm(CHANGE_PROMPT_BEFORE
							+ scriptToAlertString(oldScript)
							+ CHANGE_PROMPT_AFTER + objScript.identifier)) {
				acceptUpdate(oldScript, objScript);
			}
			else {
				rejectUpdate(oldScript, objScript.identifier);
			}
		}
		if (oldScript) { return; }	// update has been handled
	} catch (ex) {}
	
	// prompt to add this new script
	if (window.confirm(ADD_PROMPT_BEFORE + scriptToAlertString(objScript)
			+ ADD_PROMPT_AFTER)) {
		acceptUpdate(null, objScript);
	}
};

function updateRejected (objScript, url) {
	var rejected = false;
	try {
		for (var i = objScript.rejected.length - 1; !rejected && i >= 0; i--) {
			rejected = (objScript.rejected[i] == url);
		}
	} catch (ex) {}
	return rejected;
};
function acceptUpdate (oldScript, objScript) {
	try { delete scripts[oldScript.namespace][oldScript.name]; } catch (ex) {}
	scripts[objScript.namespace] = scripts[objScript.namespace] || {};
	scripts[objScript.namespace][objScript.name] = objScript;
	saveScripts();
};
function rejectUpdate (objScript, url) {
	objScript.rejected = objScript.rejected || [];
	objScript.rejected.push(url);
	saveScripts();
};

function checkAll (intShow) {
	var temp, container = updates.labelContainer, list = updates.list;
	setStoredValue("lastGlobalUpdate", "" + (new Date()).valueOf());
	while (list.firstChild) { list.removeChild(list.lastChild); }
	updates.label.nodeValue = CHECK_START_TEXT;
	if (intShow & CHECK_START != 0) { container.style.display = "block"; }
	for (var count in updates.check) { updates.check[count] = 0; }
	for (var namespace in scripts) {
		for (var name in scripts[namespace]) {
			updates.check.pending++;
			temp = wrapCall(check, this, [scripts[namespace][name], intShow]);
			try { window.setTimeout(temp, 0); } catch (ex) { temp(); }
		}
	}
};
function check (objScript, intShow) {
	//xxx if (rejected) { return; }
	var request = {method: "GET", url: objScript.identifier,
		onerror: function (objResponse) {
			updates.check.pending--;
			updates.check.notFound++;
			updateList(objScript, intShow, CHECK_NOT_FOUND);
			updateLabel(intShow, CHECK_NOT_FOUND);
		},
		onload: function (objResponse) {
			var updateType, script =
					textToScript(objResponse.responseText, objScript.identifier);
			updates.check.pending--;
			if (!isValidScript(script)) {
				script = null;
				updates.check.metaError++;
				updateType = CHECK_ERROR;
			}
			else if (!isNewerScript(script, objScript)) {
				updates.check.notNewer++;
				updateType = CHECK_NOT_NEWER;
			}
			else {
				updates.check.newer++;
				updateType = CHECK_NEWER;
			}
			updateList(script || objScript, intShow, updateType);
			updateLabel(intShow, updateType);
		}
	};
	try { HTTPRequest(request); } catch (ex) { request.onerror(); }
};
function updateList (objScript, intShow, intUpdateType) {
	if ((intShow & intUpdateType) == 0) { return; }
	while (--updates.listMutex < 0) { ++updates.listMutex; }
	
	try {	// add the item to the list
		var item = updates.list.appendChild(document.createElement("li")), temp;
		item.setAttribute("title", objScript.description);
			// details
		temp = item.appendChild(document.createElement("a"));
		temp.setAttribute("href", objScript.source || objScript.identifier);
		temp.appendChild(document.createElement("strong"))
				.appendChild(document.createTextNode(objScript.name));
		temp.appendChild(document.createTextNode(" " + objScript.version));
		if (objScript.date) { try {
			temp.appendChild(document.createElement("em"))
					.appendChild(document.createTextNode(""
						+ (new Date(objScript.date)).getFullYear() + "-"
						+ padString((new Date(objScript.date)).getMonth() + 1, 2, 0)
						+ "-" + padString((new Date(objScript.date)).getDate(), 2, 0)
					));
			temp.insertBefore(document.createElement("br"), temp.lastChild);
		} catch (ex) {} }
			// script link/error message
		temp = item.appendChild(document.createElement("a"));
		if ((intUpdateType & CHECK_NEWER) == 0) {
			temp.style.fontWeight = "bold";
		}
		temp.setAttribute("href", objScript.identifier);
		temp.appendChild(document.createTextNode(CHECK_LINK_TEXT[intUpdateType]));
			// alphabetize
		temp = (item.previousSibling
				&& item.previousSibling.firstChild.firstChild.firstChild.nodeValue);
		while (temp !== null && stringCompare(temp, objScript.name) > 0) {
			item.parentNode.insertBefore(item, item.previousSibling);
			temp = (item.previousSibling
					&& item.previousSibling.firstChild.firstChild.firstChild
							.nodeValue);
		}
	} catch (ex) {}
	
	updates.listMutex++;
};
function updateLabel (intShow, intUpdateType, blnIsFinalCall) {
	var text = (updates.check.pending > 0 ? CHECK_START_TEXT + " " : "")
			+ CHECK_FINISHED_TEXT;
	for (var count in updates.check) {
		text = text.replace("%" + count + "%", updates.check[count]);
	}
	updates.label.nodeValue = text;
	if ((intShow & intUpdateType) != 0) {
		updates.labelContainer.style.display = "block";
	}
	if (updates.check.pending == 0 && !blnIsFinalCall) {
		try { window.setTimeout(function () {
			updateLabel(intShow, intUpdateType, true);
		}, 50); } catch (ex) {}
	}
};

function loadScripts () {
	var json = ("" + getStoredValue("scripts", "")).split("\t");
	for (var script, i = 0; i < json.length; i++) {
		script = fromSafeJSON(json[i]);
		if (isValidScript(script)) {
			scripts[script.namespace] = scripts[script.namespace] || {};
			scripts[script.namespace][script.name] = script;
		}
	}
};
function saveScripts (arrScripts) {
	if (!arrScripts) { arrScripts = scripts; }
	var json = "";
	for (var namespace in arrScripts) {
		for (var name in arrScripts[namespace]) {
			json += toSafeJSON(arrScripts[namespace][name]) + "\t";
		}
	}
	setStoredValue("scripts", json.slice(0, -1));
};

function isValidScript (objScript) {
	return (objScript
		&& ("namespace" in objScript) && ("name" in objScript)
		&& ("identifier" in objScript)
		&& (("version" in objScript) || ("date" in objScript))
	);
};
function isNewerScript (objNew, objOld) {
	try {
		return (
			(objNew.date > objOld.date)
					|| isNewerVersion(objNew.version, objOld.version)
			? true
			: false
		);
	}
	catch (ex) {
		return null;
	}
};
function isNewerVersion (strNew, strOld) {
	var newer = false, arrNew = [], arrOld = [], tmpNew, tmpOld, cmp;
	try {
		arrNew[0] = (strNew + "").split("-");
		arrOld[0] = (strOld + "").split("-");
		for (var i = 0; !newer && i < arrNew[0].length; i++) {
			arrNew[1] = arrNew[0][i].split(".");
			arrOld[1] = (arrOld[0][i] || "").split(".");
			for (var j = 0; !newer && j < arrNew[1].length; j++) {
				tmpNew = parseInt(arrNew[1][j], 10);
				tmpOld = parseInt(arrOld[1][j], 10);
				cmp = (isNaN(tmpNew)
						// new piece does not start with a number
					? (isNaN(tmpOld)
							? stringCompare(arrNew[1][j], arrOld[1][j] || "") : -1)
						// new piece starts with a number
					: (isNaN(tmpOld) ? 1 : numberCompare(tmpNew, tmpOld))
				);
				
				// go down to string compare if number compare matched
				if (!isNaN(tmpNew) && !isNaN(tmpOld) && cmp == 0) {
					cmp = stringCompare(arrNew[1][j], arrOld[1][j]);
				}
				
				// error if tmpNew < tmpOlder, otherwise update newer
				if (cmp < 0) { throw {}; }
				newer = (cmp > 0);
			}
		}
	}
	catch (ex) {
		newer = null;
	}
	return newer;
};

function getScript (strNamespace, strName) {
	try {
		return (scripts[strNamespace][strName] || null);
	}
	catch (ex) {
		return null;
	}
};
function textToScript (str, url) {
	var script = {}, lineIndex = 0, line, foundMeta = false, done = false, match;
	lines = str.replace("\r", "\n").split(/\n+/g);
	do {
		line = lines[lineIndex++];
		foundMeta = foundMeta || (line.indexOf("// ==UserScript==") == 0);
		done = foundMeta && (line.indexOf("// ==/UserScript==") == 0);
		if (foundMeta) {
			match = line.match(/\/\/ \@(\S+)\s+(.*)/);
			if (match != null) {
				if (match[1] == "date") {
					match[2] = match[2].split("-");	// yyyy-mm-dd to array
					match[2] = (new Date(match[2][0] || 0,
							(parseInt(match[2][1]) || 1) - 1, match[2][2] || 1))
							.valueOf();
				}
				if (match[1] in SCRIPT) { script[match[1]] = match[2]; }
			}
		}
	} while (!done && lineIndex < lines.length);
	if (!script.namespace) {
		match = url.match(/.*?\:([\/]*)([^\/\\]*)/);
		if (match != null && match[2]) { script.namespace = match[2]; }
	}
	if (!script.name) {
		script.name = url;
		script.name = script.name.substring(0, script.name.indexOf(".user.js"));
		script.name = script.name.substring(script.name.lastIndexOf("/") + 1);
	}
	return script;
};
function scriptToAlertString (objScript) {
	var arrText = [], maxLabel = 0, indent = "\xA0\xA0\xA0\xA0\xA0\xA0";	// nbsp
	for (var i = DESCRIPTIONS_MAP.length - 1; i >= 0; i--) {
		try {
			arrText.unshift([
				(DESCRIPTIONS_MAP[i][1] || DESCRIPTIONS_MAP[i][0]) + ": ",
				objScript[DESCRIPTIONS_MAP[i][0]] || ""
			]);
			if (DESCRIPTIONS_MAP[i][0] == "date") { try {
				arrText[0][1] = (new Date(arrText[0][1])).toDateString();
			} catch (ex) {} }
			maxLabel = Math.max(maxLabel, arrText[0][0].length);
		} catch (ex) {}
	}
	for (var text, line, lastSpace, i = arrText.length - 1; i >= 0; i--) {
		text = arrText[i];
		text = [text[0] + ("" + text[1]).replace(/\s+/, " ")];
		while (text[text.length - 1].length > ALERT_LINE_LENGTH) {
			line = text[text.length - 1];
			if (text.length < 5) {
				lastSpace = line.lastIndexOf(" ", ALERT_LINE_LENGTH);
				if (lastSpace < (maxLabel + 1)) { lastSpace = -1; }
				text[text.length - 1] = line.substring(0,
						(lastSpace == -1 ? ALERT_LINE_LENGTH : lastSpace));
				text[text.length] =
						indent + line.substring((lastSpace + 1) || ALERT_LINE_LENGTH);
			}
			else {
				text[text.length - 1] = line.substring(0, ALERT_LINE_LENGTH - 3)
						+ "...";
			}
		}
		arrText[i] = text.join("\n");
	}
	return arrText.join("\n");
};

function getStoredValue (strName, varDefault) {
	try {
		return (GM_getValue && GM_getValue !== win.GM_getValue
			? GM_getValue(strName, varDefault)
			: varDefault
		);
	}
	catch (ex) {
		return varDefault;
	}
};
function setStoredValue (strName, varValue) {
	try {
		if (GM_setValue && GM_setValue !== win.GM_setValue) {
			GM_setValue(strName, varValue);
		}
	} catch (ex) {}
	return varValue;
};

function addGlobalStyle (strCSS, blnAtFront, objDoc) {
	objDoc = objDoc || document;
	try {
		var head = objDoc.getElementsByTagName("head")[0];
		var style = head.insertBefore(objDoc.createElement("style"),
				blnAtFront ? head.firstChild : null);
		style.setAttribute("type", "text/css");
		style.appendChild(document.createTextNode(strCSS));
	} catch (ex) {}
};
function addClass (el, strClass) {
	removeClass(el, strClass);
	el.className += " " + strClass;
};
function removeClass (el, strClass) {
	try {
		var re = new RegExp("(^|\\s)" + strClass.replace(ID_RE, ID_RE_FN)
				+ "(\\s|$)", "g");
		el.className = el.className.replace(re, " ");
	} catch (ex) {
		try {
			var classes = el.className.split(/\s+/g), newClasses = "";
			for (var i = 0; i < classes.length; i++) {
				if (classes[i] != strClass) { newClasses += classes[i] + " "; }
			}
			el.className = newClasses.slice(0, -1);
		} catch (ex) {}
	}
};

function HTTPRequest (objDetails) {	// Greasemonkey-compatible XMLHttpRequest
	if (GM_xmlhttpRequest && GM_xmlhttpRequest !== win.GM_xmlhttpRequest) {
		return GM_xmlhttpRequest(objDetails);
	}
	
	var request = null;
	/*@cc_on @*/	// JScript (Internet Explorer) conditional compilation
	/*@if (@_jscript_version >= 5)
	try {
		request = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (ex) {
		try { request = new ActiveXObject("Microsoft.XMLHTTP"); } catch (ex) {}
	}
	@end @*/
	try { request = request || new XMLHttpRequest(); } catch (ex) {}
	
	try {
		request.open(objDetails.method, objDetails.url, true);
		
		try { for (var h in objDetails.headers) {
			try { request.setRequestHeader(h, objDetails.headers[h]); }catch(ex){}
		} } catch (ex) {}
		
		request.onreadystatechange = function () {
			var temp, ready = (request.readyState == 4), response = {
				readyState: request.readyState,
				responseText: request.responseText,
				status: (ready ? request.status : 0),
				statusText: (ready ? request.statusText : ''),
				responseHeaders: (ready ? request.getAllResponseHeaders() : '')
			};
			
			temp = function () { try {
				objDetails.onreadystatechange.call(request, response);
			} catch (ex) {} };
			try { window.setTimeout(temp, 0); } catch (ex) { temp(); }
			
			if (ready) {
				temp = (request.status == 200
					? function () { try { objDetails.onload.call(request,
							response); } catch (ex) {} }
					: function () { try { objDetails.onerror.call(request,
							response); } catch (ex) {} }
				);
				try { window.setTimeout(temp, 0); } catch (ex) { temp(); }
			}
		};
		request.send(objDetails.data || null);
	} catch (ex) {}
};

// "safe" JSON conversion (preserves only primitives, basic Objects, and Arrays)
function toSafeJSON (val) {
	var json = "";
	
	if (val && (val instanceof Boolean || val instanceof Number
			|| val instanceof String)) {
		json = toSafeJSON(val.valueOf());
	}
	else {
		switch (typeof(val)) {
			case "undefined":
			case "boolean":
			case "number":
				json = "" + val;
				break;
			case "string":
				json = '"' + val.replace(STRING_SAVE_RE, STRING_SAVE_RE_FN) + '"';
				break;
			default:	// function or object
				if (!val) {
					json = "null";
				}
				else if (val instanceof Array) {
					for (var i = 0; i < val.length; i++) {
						json += toSafeJSON(val[i]) + ",";
					}
					json = "[" + json.slice(0, -1) + "]";
				}
				else {
					for (var p in val) {
						json += p.replace(ID_RE, ID_RE_FN) + ":" + toSafeJSON(val[p])
								+ ",";
					}
					json = "{" + json.slice(0, -1) + "}";
				}
		}
	}
	
	return json;
};
function fromSafeJSON (strJSON) {
	var	progress = {index: 0, isError: false},
			obj = fromSafeJSON_getValue(strJSON, progress);
	return (progress.isError ? null : obj);
};
function fromSafeJSON_getValue (strJSON, objProgress) {
	var getValue = fromSafeJSON_getValue, getProperty = fromSafeJSON_getProperty;
	var obj = null, currentChar = strJSON.charAt(objProgress.index++), temp;
	if (currentChar == "{") {	// object
		obj = {};
		if (strJSON.charAt(objProgress.index) == "}") objProgress.index += 1;
		else {
			temp = getProperty(strJSON, objProgress);
			while (!objProgress.isError && !temp.isRightBrace) {
				try { obj[temp.name] = temp.value; } catch (ex) {}
				switch (strJSON.charAt(objProgress.index++)) {
					case "}":	temp.isRightBrace = true; 						break;
					case ",":	temp = getProperty(strJSON, objProgress);	break;
					default:		objProgress.isError = true;
				}
			}
		}
	}
	else if (currentChar == "[") {	// array
		obj = [];
		if (strJSON.charAt(objProgress.index) == "]") objProgress.index += 1;
		else {
			temp = {value: getValue(strJSON, objProgress)};
			while (!objProgress.isError && !temp.isRightBracket) {
				try { obj.push(temp.value); } catch (ex) {}
				switch (strJSON.charAt(objProgress.index++)) {
					case "]":	temp.isRightBracket = true;						break;
					case ",":	temp.value = getValue(strJSON, objProgress);	break;
					default:		objProgress.isError = true;
				}
			}
		}
	}
	else if (currentChar == "'" || currentChar == '"') {	// string
		obj = "";
		temp = {value: strJSON.charAt(objProgress.index++)};
		temp.isClosingQuote = (temp.value == currentChar);
		if (LINE_TERMINATORS.indexOf(temp.value) >= 0) objProgress.isError = true;
		while (!objProgress.isError && !temp.isClosingQuote) {
			if (temp.value == "\\") {
				temp.value = strJSON.charAt(objProgress.index++);
				if (temp.value == "b") { temp.value = "\b"; }
				else if (temp.value == "t") { temp.value = "\t"; }
				else if (temp.value == "n") { temp.value = "\n"; }
				else if (temp.value == "v") { temp.value = "\v"; }
				else if (temp.value == "f") { temp.value = "\f"; }
				else if (temp.value == "r") { temp.value = "\r"; }
				else if (temp.value == "x" || temp.value == "u") {
					temp.digits = (temp.value == "x" ? 2 : 4);
					temp.value = strJSON.substring(objProgress.index,
								objProgress.index + temp.digits);
					objProgress.index += temp.digits;
					if (temp.value.length != temp.digits
							|| temp.value.search(/^[0-9a-f]+$/i) == -1) {
						objProgress.isError = true;
					}
					else {
						temp.value = String.fromCharCode(eval("0x" + temp.value));
					}
				}
				else if (LINE_TERMINATORS.indexOf(temp.value) >= 0) {
					objProgress.isError = true;
				}
			}
			obj += temp.value;
			temp = {value: strJSON.charAt(objProgress.index++)};
			temp.isClosingQuote = (temp.value == currentChar);
			if (LINE_TERMINATORS.indexOf(temp.value) >= 0) {
				objProgress.isError = true;
			}
		}
	}
	else if (currentChar.search(/[0-9.+-]/) != -1) {	// NaN, Infinity, <number>
		objProgress.isError = true;
		temp = {index: objProgress.index - (currentChar.search(/[+-]/) != -1 ? 0 : 1)};
		for (var literals = [NaN, Infinity], str, i = 0; i < literals.length; i++) {
			str = "" + literals[i];
			if (strJSON.substring(temp.index, temp.index + str.length) == str) {
				obj = literals[i] * (currentChar == "-" ? -1 : 1);
				objProgress.index = temp.index + str.length;
				objProgress.isError = false;
			}
		}
		if (objProgress.isError) {	// must read a non-exponent decimal <number>
			obj = currentChar;
			temp.dotFound = (currentChar == ".");
			temp.value = strJSON.charAt(objProgress.index);
			while (temp.value.search(temp.dotFound ? /[0-9]/ : /[0-9.]/) != -1) {
				obj += temp.value;
				temp.dotFound = temp.dotFound || (temp.value == ".");
				temp.value = strJSON.charAt(++objProgress.index);
			}
			obj = parseFloat(obj);
			if (!isNaN(obj)) objProgress.isError = false;
		}
	}
	else {
		objProgress.isError = true;
		for (var str, i = KEYWORD_LITERALS.length - 1; i >= 0; i--) {
			str = "" + KEYWORD_LITERALS[i];
			if (strJSON.substring(objProgress.index - 1, objProgress.index
					+ str.length - 1) == str) {
				obj = KEYWORD_LITERALS[i];
				objProgress.isError = false;
			}
		}
	}
	return obj;
};
function fromSafeJSON_getProperty (strJSON, objProgress) {
	var	getValue = fromSafeJSON_getValue,
			property = {name: "", value: undefined},
			currentChar = strJSON.charAt(objProgress.index++);
	if (currentChar == ":") objProgress.isError = true;
	while (!objProgress.isError && currentChar != ":") {
		if (currentChar == "\\") {
			objProgress.isError = true;
			if (strJSON.substring(objProgress.index, objProgress.index + 5)
					.search(/^u[0-9a-fA-F]{4}$/) != -1) {
				currentChar = String.fromCharCode(eval("0x"
						+ strJSON.substring(objProgress.index + 1,
						objProgress.index + 5)));
				objProgress.index += 5;
				objProgress.isError = false;
			}
		}
		property.name += currentChar;
		currentChar = strJSON.charAt(objProgress.index++);
		if (currentChar == "") objProgress.isError = true;
	}
	if (!objProgress.isError) property.value = getValue(strJSON, objProgress);
	return property;
};

function wrapCall (fn, objThis, arrArgs) {
	return (function () { fn.apply(objThis, arrArgs); });
};

function intToHex (intNonNegative, intMinLength) {
	var strHex = "", place = 0, placeValue = 16, digit;
	while (intNonNegative >= placeValue) {
		place += 1;
		placeValue *= 16;
	}
	
	while (place >= 0) {
		placeValue /= 16;
		digit = Math.floor(intNonNegative / placeValue);
		intNonNegative -= placeValue * digit;
		if (digit > 9) { digit = String.fromCharCode(55 + digit); }	// A-F
		strHex += digit;
		place -= 1;
	}
	while (strHex.length < intMinLength) { strHex = "0" + strHex; }
	
	return strHex;
};

function padString (str, intWidth, chPad, blnAtRight) {
	var rv = "" + str, ch = (arguments.length > 2 ? chPad + " " : " ").charAt(0),
			add = "";
	for (var i = intWidth - rv.length; i > 0; i--) add += ch;
	return (blnAtRight ? rv + add : add + rv);
};

function stringCompare (A, B) {
	var result = 0, a, b;
	try {
		try { a = A.toLocaleLowerCase(); } catch (ex) { a = A.toLowerCase(); };
		try { b = B.toLocaleLowerCase(); } catch (ex) { b = B.toLowerCase(); };
		try {
			result = a.localeCompare(b);
			if (result == 0) result = A.localeCompare(B);
		}
		catch (ex) {
			result = (a < b ? -1 : (a > b ? 1 : (A < B ? -1 : (A > B ? 1 : 0))));
		}
	} catch (ex) {}
	return result;
};
function numberCompare (a, b) {
	return (a < b ? -1 : (a > b ? 1 : 0));
};

})();