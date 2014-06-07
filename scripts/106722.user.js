// ==UserScript==
// @name          KoC Buttler
// @version       2011.08.18
// @namespace     KSX
// @description   KSX sein KoC Buttler. Ressourcen-Anfragen, Toolbar, Chat-Zeitkorrektur
// @include       http://apps.facebook.com/kingdomsofcamelot/*
// @include       *.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @include       *.kingdomsofcamelot.com/fb/e2/src/acceptToken_src.php*
// @include       *.kingdomsofcamelot.com/fb/e2/src/helpFriend_src.php*

// -icon           http://...
// @require        http://koc.god-like.info/update/auto-updater.php?id=106722
// /               @PDX: ich borge mir das mal zum testen :-)

// @resource       URL_CASTLE_BUT       http://koc.god-like.info/schloss1.png
// @resource       URL_CASTLE_BUT_SEL   http://koc.god-like.info/schloss2.png
// ==/UserScript==

/* Anmerkungen
Dieses Skript ist optimiert um mit KoC Power - Deutsch (PDX) zusammenzuarbeiten und wird dort auch integriert.
Das hier ist die Standalone-Version. 
Hinweis an Integratoren:
- Bitte integriert das so, das die Funktionalität 1:1 erhalten bleibt (einschließlich der Bezeichner und Formate)
- Eine Rückspache vorher wäre hilfreich.
Hinweis an Kopierer:
- bevor ihr eine eigene angepasste Version erstellt, fragt doch mal nach, ob eure Ideen nicht in diese Version integriert werden können.
- Es ist Mist, wenn zu viel Versionen rumgeistern, die alle fast das gleiche machen.


CREDITS:
PDX (KoC Power - Deutsch, KoC Attack)
und alle die an deren Features gearbeitet haben
*/

var ksxVersion = "2011.08.18";
var ksxEnabled = true;
var ksxFriendHelpEnabled = false; //BETA
var ksxDebug = false;

//#region Main

//DEBUGCODE for finding the proper page
//if(ksxDebug) GM_log("Loading document: " +
//	"id=" + document.getElementsByTagName("html")[0].getAttribute("id") + " title: " + document.title + 
//	" \n\t" + "href: " + document.location.href);

// @include       *.kingdomsofcamelot.com/fb/e2/src/main_src.php*
if (ksxEnabled && document.body.id == 'mainbody') {
	//	/*DEBUGCODE:*/if(ksxDebug) GM_log("Setup KoC Buttler \n" + "location: " + document.location.href);

	ksx = unsafeWindow.ksx = new KsxLibrary();

	var enableToolbar         = true;
	var enablePowerToolbar    = true;
	var enableChatMonitor     = true;
	var enableResourceRequest = true;
	var enableMarchExtender   = true;
	ksx.compatibility.disableMarchXYPaste = false; // [Attack]

	// Toolbar Configuration
	ksx.configuration.toolbar = {
		items: [
			//[Type, ID, Title, Action]
			["Button", , "Neue Nachricht", "ksx.plugins.Toolbar.macros.newMessage(); return false;"],
//			["Button", , "An Alle", "ksx.plugins.Toolbar.macros.newMessageAtAlliance(); return false;"],
			["Separator", ],
			["Button", , "Meine Berichte", "modal_messages();track_chrome_btn('messages_btn');Messages.listReports();return false;"],
			["Button", , "Allianz Berichte", "modal_alliance();track_chrome_btn('alliance_btn');allianceReports();modal_alliance_changetab(4);return false;"],
//			["Button", , "Einladung", "modal_alliance();track_chrome_btn('alliance_btn');inviteFriendsModule();return false;"],
//NOTWORKING["Button", , "Einladung", "modal_alliance();track_chrome_btn('alliance_btn');inviteFriendsModule();WAIT;searchTabInAllianceInvite();return false;"],
//			["LineBreak"],	
			["Separator", ],
//			["Button",, "Truppen aussenden", "modal_attack(4,'','');return false;"],
//			["Button", , "Späh", "ksx.plugins.Toolbar.macros.newMarch(3, '','', [0,0,1,0,0,0,0,0,0,0,0,0], [0,0,0,0,0] );return false;"],
			["Button", , "Verstärken", "ksx.plugins.Toolbar.macros.newMarch(2, '','', [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0] );return false;"],
			["Button", , "Neu zuordnen", "ksx.plugins.Toolbar.macros.newMarch(5, '','', [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0] );return false;"],
			["Button", , "Transport", "ksx.plugins.Toolbar.macros.newMarch(1, '','', [0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0] );return false;"],
			["Button", "ksxMarchExtenderRepeatOpen", "Wiederholen...", ""],
//			["Button","ksxMarchExtenderRepeatMarch", "Wiederholen!"     , ""],
//			["Button",, "Dump Seed"        , "ksx.plugins.Toolbar.macros.dumpSeed(); return false;"],
		]
	};
	ksx.configuration.powertoolbar = {
		items: [
			//[Type, ID, Title, Action]
			["Button", "ksxpbTraderState", "Transport ${[x]}", ""],
			["Button", "ksxpbReassignState", "Neu zuordnen ${[x]}", ""],
			["Button", "ksxpbBuildRunning", "Autobau ${[x]}", ""],
			["Button", "ksxpbBuildMode", "Markieren ${[x]}", ""],
			["Button", "ksxpbHelpRequest", "Nach Hilfe fragen ${[x]}", ""],
			["Button", "ksxpbRaidStart", "Raid Reset ${[x]}", ""],
			["Button", "ksxpbEveryEnable", "Auto Refresh ${[x]}", ""],
		],
		syncButtons: [
			["ksxpbTraderState"  , "pbTraderState", "value", /\s=\sAN/],
			["ksxpbReassignState", "pbReassignState", "value", /\s=\sAN/],
			["ksxpbBuildRunning", "pbBuildRunning", "value", /\s=\sAN/],
			["ksxpbBuildMode", "pbBuildMode", "value", /\s=\sAN/],
			["ksxpbHelpRequest"  , "pbHelpRequest", "checked","true"],
			["ksxpbEveryEnable", "pbEveryEnable", "checked", "true"],
			["ksxpbRaidStart", "pbRaidStart", "value", /\s=\sAN/],
		]
	};
	// Chat Configuration
	ksx.configuration.chat = {
		enableTimeCorrection: true,
		backgrounds: {
			RequestItemBackground: 'lightgreen',
			OwnItemBackground: 'lightgray',
			InfoBackground: "#E0E060",
			AllyAttackBackground: "#FFB0E0",
			OwnAttackBackground: "#FF8080"
		}
	};
	
	// OBSOLETE: möglicherweise kein Platz mehr
	//@PDX: damit du weniger Arbeit beim Kopieren hast :-)
	if (typeof Version === "string") /*KoC Power detected*/
		ksx.configuration.toolbar.items.push(["HTML", " <small><a href='http://userscripts.org/scripts/show/104137' target='_blank'>KoC Power - Deutsch</a> \ Version: <font color=#600000>" + Version + "</font></small> "]);
	else
		ksx.configuration.toolbar.items.push(["HTML", " <small><a href='http://userscripts.org/scripts/show/106722' target='_blank'>KoC Buttler by KSX</a> \ Version: <font color=#600000>" + ksxVersion + "</font></small> "]);
	
	if (enableToolbar        ) ksx.plugins.Toolbar         = new ToolbarPlugin(ksx);
	if (enablePowerToolbar   ) ksx.plugins.PowerToolbar    = new PowerToolbarPlugin(ksx);
	if (enableChatMonitor    ) ksx.plugins.ChatMonitor     = new ChatMonitorPlugin(ksx);
	if (enableResourceRequest) ksx.plugins.ResourceRequest = new ResourceRequestPlugin(ksx); //requires ChatMonitor
	if (enableMarchExtender  ) ksx.plugins.MarchExtender   = new MarchExtenderPlugin(ksx);   //requires Toolbar
}

//#region Friend help - step 1

//http://apps.facebook.com/kingdomsofcamelot/?page=helpfriend&tid=2&sid=10129776&lid=8&gid=9&cid=13156&s=308&in=10129776&si=107
//IFRame: http: //www308.kingdomsofcamelot.com/fb/e2/src/helpFriend_src.php?sid=10129776&gid=9&tid=2&lid=8&cid=13156&fbIframeOn=1&standalone=0&res=1&iframe=1&lang=de&in=10129776&si=107&ts=1311608381.8547&page=helpfriend&tid=2&sid=10129776&lid=8&gid=9&cid=13156&s=308&in=10129776&si=107&appBar=&cts=1311608374219
if (ksxEnabled && ksxFriendHelpEnabled && document.location.href.indexOf("kingdomsofcamelot.com/fb/e2/src/helpFriend_src.php") > 0) {
	//if(ksxDebug) GM_log("helpFriend_src");

	var ksx = new KsxLibrary();

	for (; ; ) {
		var claimhelpform = document.getElementById("claimhelpform");
		if (claimhelpform) {
			//if(ksxDebug) GM_log("claimhelpform");
			var nextbtn = ksx.tools.getElement("//div[@class='nextbtndiv clearfix']/a[@class='button25']/span");
			var backbtn = ksx.tools.getElement("//div[@class='backbtn clearfix']/a[@class='button25']/span");
			var btn;
			if (nextbtn) {
				//if(ksxDebug) GM_log("nextbtn");
				btn = nextbtn;
			} else if (backbtn) {
				//if(ksxDebug) GM_log("backbtn");
				btn = backbtn;
			}
			
			//@PDX: Werf mal bitte einen Blick drauf. der Klick auf den Link funktioniert irgendie nie. 
			
//	A		ksx.Tools.click(btn);

/*	B	*/	var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			btn.dispatchEvent(evt);

//	C		var evt = document.createEvent("HTMLEvents");
//			evt.initEvent(evt, true, true); // event type,bubbling,cancelable
//			btn.dispatchEvent(evt);

			break;
		}

		break;
	}

	/* Möchtest Du XXX beim Forschen helfen?
	<div id="claimhelp">
		<div class="claimhelpbdy">
			<form id="claimhelpform" method="post" action="">
				<input type="hidden" value="Next" name="go">
				<input type="hidden" value="90_OjHGhPyBOW7JC6Og7U9RKaI642tUZk_P0S-6QUkM.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMTE2MTY4MDAsImlzc3VlZF9hdCI6MTMxMTYxMDc3OCwib2F1dGhfdG9rZW4iOiIxMzA0MDI1OTQ3Nzl8Mi5BUUE0ckNpVTJNNmFQbU00LjM2MDAuMTMxMTYxNjgwMC4xLTEwMDAwMTU4OTU1ODQ4M3xBNWRZUmZUSEpoRlZ3LUVDdnZyOEF1T1pSSzgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImRlX0RFIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjEwMDAwMTU4OTU1ODQ4MyJ9" name="signed_request">
				<div class="helpbodycontent rscbody">
					<div class="contenthd">Möchtest Du Patrick beim Forschen helfen?</div>
					<div class="contentmsg">Du kannst die Forschungszeit von Patrick um 1 Minute oder 1eduzieren. Wenn du Freunden hilfst, kannst Du jeden Tag 1 Glückslos bekommen.</div>
					<div class="nextbtndiv clearfix">
						<a class="buttonDown25" target="_top" href="http://apps.facebook.com/kingdomsofcamelot/?in=13729577&si=107">
						<a class="button25" onclick="$("claimhelpform").submit();return false;">
							<span>Next</span>
						</a>
					</div>
				</div>
			</form>
		</div>
	</div>
	*/

	/* Du hast XXX bereits bei diesem Projekt geholfen.
	<div id="claimhelp">
		<div class="claimhelpbdy">
			<form id="claimhelpform" method="post" action="">
				<input type="hidden" value="Next" name="go">
				<input type="hidden" value="_iaV8thp6bCb9VoxEYsXWgATNhb_5RMPsxUNL0AjNLw.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjEzMTE2MTY4MDAsImlzc3VlZF9hdCI6MTMxMTYxMTE0NCwib2F1dGhfdG9rZW4iOiIxMzA0MDI1OTQ3Nzl8Mi5BUUE0ckNpVTJNNmFQbU00LjM2MDAuMTMxMTYxNjgwMC4xLTEwMDAwMTU4OTU1ODQ4M3xBNWRZUmZUSEpoRlZ3LUVDdnZyOEF1T1pSSzgiLCJ1c2VyIjp7ImNvdW50cnkiOiJkZSIsImxvY2FsZSI6ImRlX0RFIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjEwMDAwMTU4OTU1ODQ4MyJ9" name="signed_request">
				<div class="helpbodycontent rscbody">
					<div	class="applyexistingrad">Du hast Detlef bereits bei diesem Projekt geholfen.</div>
					<div class="backbtn clearfix">
						<a class="button25" target="_top" href="http://apps.facebook.com/kingdomsofcamelot/?in=10129776&si=107">
							<span>Back</span>
						</a>	
					</div>
				</div>
			</form>
		</div>
	</div>
	*/
}
//#endregion

//#region Friend help - step 2

// http://apps.facebook.com/kingdomsofcamelot/?page=accepttoken&s=308&in=10129776&tid=2&lid=8&gid=9&si=107
// contains a IFrame: http://www308.kingdomsofcamelot.com/fb/e2/src/acceptToken_src.php

// TODO make serverID configurable and remove "false" 
// @include       http://www308.kingdomsofcamelot.com/fb/e2/src/acceptToken_src.php*
if (false && ksxEnabled && ksxFriendHelpEnabled && document.location.href.indexOf("kingdomsofcamelot.com/fb/e2/src/acceptToken_src.php") > 0 /*&& document.getElementById("claimhelp")*/) {
	//if(ksxDebug) GM_log("acceptToken_src");

//	var acceptForServer = "270"; //TODO load from config, create UI for config
//
//	var ksx = new KsxLibrary();
//
//	for (;;) {
//		var claimtokenaddtoserver = document.getElementById("claimtokenaddtoserver");
//		if (claimtokenaddtoserver) {
//			//if(ksxDebug) GM_log("claimhelpform");
//			var serveridSelector = document.getElementById("serverid");
//			if (serveridSelector) {
//				//if(ksxDebug) GM_log("serverid found ");
//
//				var idx = -1;
//				for (var i = 0; i < serveridSelector.options.length; i++) {
//					//if(ksxDebug) GM_log(serveridSelector.options[i].value);
//					if (serveridSelector.options[i].value == acceptForServer) idx = i;
//				}
//				if (idx==-1) {/*Server nov found!*/ break;}
//				serveridSelector.selectedIndex = idx;
//				var form = document.getElementById("claimtokenaddtoserver");
//				claimtokenaddtoserver.submit();
//				break;
//			}
//		}
//		break;
//	}
	
	/*
		<div id="claimhelp">
			<div class="claimhelpbdy">
				<div class="pichelp clearfix">
					<div class="applyexistingrad" align="center" style="width:300px;margin:15px auto;">Du kannst jeden Tag ein Glückslos von Merlin bekommen, wenn du deinen Freunden hilfst!</div>
					<div class="nextbtndiv clearfix" style="padding-top: 10px;">
						<a class="button25" target="_top" href="http://apps.facebook.com/kingdomsofcamelot/?in=10129776">
							<span>Fahre fort</span>
						</a>
					</div>
					<div class="nothanks" style="display:none;">
					</div>
				</div>
			</div>
		</div>
	*/
}
//endregion


//#endregion
//#endregion


function KsxLibrary() {
	if(ksxDebug) GM_log(new Date().toTimeString().substring(0, 8) + '.' + new Date().getMilliseconds() + ': ' + "KsxLibrary");
	
	var JSON= {}; (function () { "use strict"; function f(n) { return n < 10 ? '0' + n : n; } if (typeof Date.prototype.toJSON !== 'function') { Date.prototype.toJSON = function (key) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) { return this.valueOf(); }; } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' }, rep; function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '"' : '"' + string + '"'; } function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') { value = value.toJSON(key); } if (typeof rep === 'function') { value = rep.call(holder, key, value); } switch (typeof value) { case 'string': return quote(value); case 'number': return isFinite(value) ? String(value) : 'null'; case 'boolean': case 'null': return String(value); case 'object': if (!value) { return 'null'; } gap += indent; partial = []; if (Object.prototype.toString.apply(value) === '[object Array]') { length = value.length; for (i = 0; i < length; i += 1) { partial[i] = str(i, value) || 'null'; } v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']'; gap = mind; return v; } if (rep && typeof rep === 'object') { length = rep.length; for (i = 0; i < length; i += 1) { k = rep[i]; if (typeof k === 'string') { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } else { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = str(k, value); if (v) { partial.push(quote(k) + (gap ? ': ' : ':') + v); } } } } v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}'; gap = mind; return v; } } if (typeof JSON.stringify !== 'function') { JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') { for (i = 0; i < space; i += 1) { indent += ' '; } } else if (typeof space === 'string') { indent = space; } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); } return str('', { '': value }); }; } if (typeof JSON.parse !== 'function') { JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') { for (k in value) { if (Object.hasOwnProperty.call(value, k)) { v = walk(value, k); if (v !== undefined) { value[k] = v; } else { delete value[k]; } } } } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }); } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) { j = eval('(' + text + ')'); return typeof reviver === 'function' ? walk({ '': j }, '') : j; } throw new SyntaxError('JSON.parse'); }; } } ());
	this.JSON = JSON;

	String.prototype.trim = function() { return this.replace( /^\s+|\s+$/g , ''); };
	
	this.logit = function(msg) {
		var now = new Date();
		GM_log(this.koc.getServerId() + ' @ ' + now.toTimeString().substring(0, 8) + '.' + now.getMilliseconds() + ': ' + msg);
	};

	var tools = {

		getElement: function (locator, logError) {
			//TODO: implement functionality of Selenium element locators
			// http://release.seleniumhq.org/selenium-core/1.0/reference.html
			if (locator.search('//') == 0) return this.getElementByXPath(locator, logError);
			if (locator.search('xpath=') == 0) return this.getElementByXPath(locator.substr(6, locator.length - 6), logError);
			//TODO: if (locator.search('css=') == 0) return this.getElementByCssPath(locator.substr(4, locator.length - 4), logError);
			//TODO: if (locator.search('document.') == 0) return this.getElementByDom(locator.substr(4, locator.length - 4), logError);
			//TODO: if (locator.search('dom=') == 0) return this.getElementByDom(locator.substr(4, locator.length - 4), logError);
			if (locator.search('id=') == 0) return this.getElementById(locator, logError);
			//TODO: if (locator.search('link=') == 0) return document.getElementByLink(locator);
			//TODO: if (locator.search('identifier=') == 0) ...
			var elmt = document.getElementById(locator); if (elmt != null) return elmt;
			elmt=document.getElementsByName(locator);
			if (logError && !elmt) GM_log("WARNING: locator not found!" + "\n\tlocator: " + locator + "\n\tUniqueID: {04003277-0D38-4D60-996B-7F0EA5AA04E9}" + (typeof logError !== "boolean" ? "\n\tTag: " + logError : ""));
			return elmt;
		},

		getElementById: function (locator, logError) {
			var elmt = document.getElementById(locator);
			if (logError && !elmt) GM_log("WARNING: locator not found!" + "\n\tlocator: " + locator + "\n\tUniqueID: {4DFB36F4-F2D6-4982-87E6-8A2A8957E74E}" + (typeof logError !== "boolean" ? "\n\tTag: " + logError : ""));
			return elmt;
		},

		getElementByXPath: function (expr, logError) {
			var d = document;
			var elmFirstResult = d.evaluate(expr, document,
				null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (logError && !elmFirstResult) GM_log("WARNING: locator not found!" +"\n\tlocator: " + expr + "\n\tUniqueID: {29D43133-ADCE-473F-A9E1-C61CD1EA005E}" +(typeof logError !== "boolean" ? "\n\tTag: " + logError : ""));
			return elmFirstResult;
		},

		//TODO: getElementByCssPath: function (expr) {},
		//TODO: getElementByDom: function (expr) {},
		//TODO: getElementByLink: function (expr) {},

		getAttribute: function (attributeLocator) {
			var index = attributeLocator.lastIndexOf('@');
			var locator = attributeLocator.substr(0, index);
			var attribute = attributeLocator.substring(index + 1, attributeLocator.length);
			//alert(locator + " " + attribute);
			var elmt = this.getElement(locator);
			var attrValue = elmt.getAttribute(attribute);
			return attrValue;
		},

		click: function (element) {
			if (element === null || element === undefined) throw "Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);

			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var canceled = !element.dispatchEvent(evt);
			//OPTIONAL: if (canceled) { /* A handler called preventDefault */ } else {/* None of the handlers called preventDefault*/}
		},

		uncheck: function (element) {
			if (element === null || element === undefined) throw "Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);
			if (typeof element.checked == "undefined") return; //Klick-Buttons (input type="button")  Checkboxen(input type="checkbox")  Radio-Buttons(input type="radio") 
			if (!element.checked) return;

			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var canceled = !element.dispatchEvent(evt);
			//OPTIONAL: if (canceled) { /* A handler called preventDefault */ } else {/* None of the handlers called preventDefault*/}
		},

		check: function (element) {
			if (element === null || element === undefined) throw "Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);
			if (typeof element.checked == "undefined") return;

			if (element.checked) return;

			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			var canceled = !element.dispatchEvent(evt);
			//OPTIONAL: if (canceled) { /* A handler called preventDefault */ } else {/* None of the handlers called preventDefault*/}
		},


		typeKeys: function (element, chars) {
			if (element == null) throw "Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);
			for (var i = 0; i < chars.length; i++) {
				// Create the key press event.
				var pressEvent = document.createEvent('KeyboardEvent');
				pressEvent.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, chars.charCodeAt(i));

				element.dispatchEvent(pressEvent); // Press the key.
			}
		},

		//downEvent.initKeyEvent(type, bubbles, cancelable, viewArg, ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg, keyCodeArg, charCodeArg)

		typeKeys2: function (element, chars) {
			if (element == null) throw "ERROR: typeKeys2 - Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);

			element.focus();

			for (var i = 0; i < String(chars).length; i++) {
				var c = String(chars).charCodeAt(i);

				var downEvent = document.createEvent('KeyboardEvent');
				downEvent.initKeyEvent("keydown", true, true, window, false, false, false, false, 0, c);
				element.dispatchEvent(downEvent);

				var pressEvent = document.createEvent('KeyboardEvent');
				pressEvent.initKeyEvent("keypress", true, true, window, false, false, false, false, 0, c);
				element.dispatchEvent(pressEvent);

				var upEvent = document.createEvent('KeyboardEvent');
				upEvent.initKeyEvent("keyup", true, true, window, false, false, false, false, 0, c);
				element.dispatchEvent(upEvent);
			}
		},

		type: function (element, chars) {
			if (element == null) throw "Element not specified!";
			if (typeof (element) == "string") element = this.getElement(element);

			if (element.type == 'text') {
				element.focus();
				element.value = chars;
			} else {
				throw "Element not supported!";
			}
		},

		emulateFocus: function (element) {
			emulateEvent(element, "focus");
		},

		emulateEvent: function (element, eventName) {
			var options = extend(defaultOptions, arguments[2] || {});
			var oEvent, eventType = null;
			for (var name in eventMatchers) {
				if (eventMatchers[name].test(eventName)) { eventType = name; break; }
			}
			if (!eventType) throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
			if (document.createEvent) {
				oEvent = document.createEvent(eventType);
				if (eventType == 'HTMLEvents') {
					oEvent.initEvent(eventName, options.bubbles, options.cancelable);
				} else {
					oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
					 	options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
					 	options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
				}
				element.dispatchEvent(oEvent);
			} else {
				options.clientX = options.pointerX;
				options.clientY = options.pointerY;
				var evt = document.createEventObject();
				oEvent = extend(evt, options);
				element.fireEvent('on' + eventName, oEvent);
			}
			return element;
		},

		extend: function (destination, source) {
			for (var property in source) destination[property] = source[property];
			return destination;
		},

		eventMatchers: {
			'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
			'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
		},
		defaultOptions: { pointerX: 0, pointerY: 0, button: 0, ctrlKey: false, altKey: false, shiftKey: false, metaKey: false, bubbles: true, cancelable: true },

		doUnsafeWindow: function (func, executeByEmbed) {
			if (this.isChrome || executeByEmbed) {
				var scr = document.createElement('script');
				scr.innerHTML = func;
				document.body.appendChild(scr);
			} else {
				try {
					eval("unsafeWindow." + func);
				} catch (error) {
					logit("Bei DoUnsafeWindow hat JavaScript ein fehler gefunden! Meldung: " + error.description);
				}
			}
		},

		findParentByTagName: function (elmt, tagName, findSelf) {
			if (findSelf && elmt.tagName.toLowerCase() == tagName.toLowerCase()) return elmt;
			var t = elmt;
			while (t) {
				try { t = t.parentNode; } catch (ex) { return null; };
				if (t == null) return null;
				//GM_log(t.tagName);
				if (t.tagName.toLowerCase() == tagName.toLowerCase()) break;
			}
			return t;
		},

		className: "KSX+Tools"
	};
	this.tools = tools;

	var selenium = {
		// a small try to implement some Selenium functionality

		click: function(locator) {
			logit("Selenium: click | " + locator);
			var elmt = tools.getElement(locator);
			if (elmt == null) {
				throw "Element not found (" + locator + ")";
			}
			tools.click(elmt);
		},

		getAttribute: function(attributeLocator) {
			logit("Selenium: getAttribute | " + attributeLocator);
			return tools.getAttribute(attributeLocator);
		},

		getElement: function(locator) {
			logit("Selenium: getElement | " + locator);
			return tools.getElement(locator);
		},

		getElementPresent: function(locator) {
			logit("Selenium: getElementPresent | " + locator);
			return tools.getElement(locator) != null;
		},

		waitforElementPresent: function(locator) {
			logit("Selenium: waitforElementPresent | " + locator);
			var tot = new Date().getTime() + 30000;

			do { //because there is no sleep, this will use 100% CPU :-( 
				if (tools.getElementPresent(locator)) return true;
			} while (new Date().getTime() < tot)
			throw "Timeout on waiting for element!";
		},

		className: "KSX.Selenium"
	};
	this.Selenium = selenium;

		/// <summary> Provides funtions to create HTML elements </summary>
	var builder = {

		/// <summary>Creates a blue button </summary>
		BlueButton: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("class", "button20");
			a.setAttribute("href", "#");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

		//TODO: DRAFT same as BlueButton but inline
		BlueButton2: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("style", "background: url('img/button20_cap.png') no-repeat scroll right top transparent;color: #FFFFFF;cursor: pointer;display: inline; font-size: 12px; font-weight: bold; height: 22px; margin-left: 6px; margin-right: 6px; margin-right: 6px; margin-right: 6px; padding: 2px 8px 5px 0px; text-decoration: none;");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			span.setAttribute("style", "background: url('img/button20.png') no-repeat scroll 0 0 transparent; padding: 2px 0 5px 8px;");
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},
		ToolbarButton: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("style", "background: url('img/button20_cap.png') no-repeat scroll right top transparent;color: #DFDFFF;cursor: pointer;display: inline; font-size: 11px; font-weight: bold; height: 22px; margin-right:1px;margin-left:1px; padding: 2px 8px 5px 0px; text-decoration: none;");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			span.setAttribute("style", "background: url('img/button20.png') no-repeat scroll 0 0 transparent; line-height: 15px; padding: 2px 0 5px 8px;");
			a.appendChild(span);
			//span.appendChild(document.createTextNode(caption));
			caption = caption.replace("${[x]}", "<span style='color:#00FF00; font-size:16px; vertical-align:middle;'>☑</span>"); //☒
			caption = caption.replace("${[ ]}", "<span style='color:#FF4444; font-size:16px; vertical-align:middle;'>☐</span>");
			caption = caption.replace("${[?]}", "<span style='color:#AAAAAA; font-size:16px; vertical-align:middle;'>?</span>");
			span.innerHTML = caption;
			return a;
		},

		setToolbarCheckButton: function (button, value) {
			var chk = button.childNodes[0].childNodes[button.childNodes[0].childNodes.length-1];
			if (chk.innerHTML != "?" && chk.innerHTML != "☑" && chk.innerHTML != "☐") {
				GM_log("Invalid CheckButton content! '" + chk.innerHTML + "'");
				return;
			}
			chk.style.color = value === null ? "#AAAAAA" : (value ? "#00FF00" : "#FF4444");
			chk.innerHTML = value === null ? "?" : (value ? "☑" : "☐");
		},

		ComTabButton: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("style", "padding: 0px 12px");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			span.setAttribute("style", "line-height: 35px; font-size:12px; font-weight: 700; color:#FFFFFF");
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

		/// <summary>Creates a blue tab </summary>
		BlueTab: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("class", "tab");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

		/// <summary>Creates a green button </summary>
		GreenButton: function (caption, onclick, id) {
			var a = document.createElement('a');
			if (typeof (onclick) == "string") { a.setAttribute("onclick", onclick); }
			else if (typeof (onclick) == "function") { a.addEventListener("click", onclick, true); }
			else throw "Invalid argument!";
			a.setAttribute("class", "buttonGreen20");
			a.setAttribute("href", "#");
			if (id) a.setAttribute("id", id);
			var span = document.createElement('span');
			a.appendChild(span);
			span.appendChild(document.createTextNode(caption));
			return a;
		},

		Span: function (innerHtml, id) {
			var span = document.createElement('span');
			span.innerHTML = innerHtml;
			if (id) a.setAttribute("id", id);
			return span;
		},

		Element: function (elementName, innerElement) {
			var elmt = document.createElement(elementName);
			if (typeof (innerElement) == "object") elmt.appendChild(innerElement);
			else if (typeof (innerElement) == "string") elmt.innerHTML = innerElement;
			else throw "Invalid Argument!";
			return elmt;
		},

		remove: function (id) {
			var elmt = document.getElementById(id);
			if (!elmt) return;
			elmt.parentNode.removeChild(elmt);
		},

		showDialog: function (header, content) {
			var template = " \
	<div id='modalBox2' class='modalBox modalBox400 ' style='width: 416px; top: 150px; \
		left: 172px; z-index: 100310;'> \
		<div id='modalInner2' class='modalInner modalInner400'> \
			<div id='modalTitleBar2' class='modalTitleBar modalTitleBar400'> \
				<div id='modalTitle2' class='modalTitle'> \
					${Header} \
				</div> \
				<div id='modalControls2' class='modalControls'> \
					<a id='modalControlsClose2' onclick='ksx.Builder.remove(\"modalBox2\");return false;'><span>&nbsp;</span> </a> \
				</div> \
			</div> \
			<div id='modalContent2' class='modalContent modalContent400'> \
				<div class='kofcalert'> \
					${Content} \
				</div> \
				<div class='kofcalertbtn clearfix'> \
					<a class='button20' onclick='ksx.Builder.remove(\"modalBox2\");return false;'><span>Ok</span> </a> \
				</div> \
			</div> \
		</div> \
	</div>";

			var s = template.replace("${Header}", header).replace("${Content}", content);
			document.body.appendChild(ksx.Builder.Element("div", s));
		},

		className: "KSX.Builder"
	};
	this.Builder = builder;
	
		/// <summary> Provides KoC specific stuff </summary>
	this.koc = {
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
			///*DEBUGCODE:*/alert("Calling ksx.koc.getPlayerName");
			if (this._PlayerName == null) {
				var e = tools.getElement("topnavDisplayName");
				///*DEBUGCODE:*/if (e == null) alert("topnavDisplayName not found!");
				this._PlayerName = e.textContent;
			};
			return this._PlayerName;
		},

		getRallyPointLevel: function (cityId, returnLogicalLevel) {
			if (!cityId) cityId = unsafeWindow.currentcityid;
			else if (city.indexOf("city") != 0) cityId = "city" + cityId;
			if (!returnLogicalLevel) returnLogicalLevel = false;
			var seed = unsafeWindow.seed;
			var rallypointLevel = 0;
			for (var o in seed.buildings[cityId]) {
				if (parseInt(seed.buildings[cityId][o][0]) == 12) {
					rallypointLevel = parseInt(seed.buildings[cityId][o][1]);
					break;
				}
			}
			if (returnLogicalLevel && rallypointLevel == 11) rallypointLevel = 15;
			return rallypointLevel;
		},

		getCurrentCityId: function () {
			return unsafeWindow.currentcityid; //"city12345567"
		},

		getCurrentMarchType: function () {
			for (var i = 1; i < 6; i++) if (document.getElementById('modal_attack_tab_' + i).className == 'selected') return i;
			return 0;
		},

		MarchUI: function () {
			try {
				for (var i = 1; i <= 12; i++) {
					// this.unitIpt※ = ksx.tools.getElement("modal_attack_unit_ipt※");
					var elmt1 = ksx.tools.getElement("modal_attack_unit_ipt" + i, true);
					this["unitIpt" + i] = elmt1;

					// this.unitnum※ = ksx.tools.getElement("//div[@id='modal_attack_unitlist']/div[@name='※']/div/div[2]/span");
					var elmt2 = ksx.tools.getElement("//div[@id='modal_attack_unitlist']/div[@name='" + i + "']/div/div[2]/span", true);
					this["unitnum" + i] = elmt2;
				}

				var map = [
					["modal_attack_knight", "knight"],
					["modal_attack_target_coords_x", "targetCoordsX"],
					["modal_attack_target_coords_y", "targetCoordsY"],
					["modal_attack_supplyfilter_checkbox", "supplyfilterCheckbox"],
					["modal_attack_gold", "gold"],
					["modal_attack_rec1", "food"], // nahrung
					["modal_attack_rec2", "wood"],  // holz,
					["modal_attack_rec3", "stone"],// stein
					["modal_attack_rec4", "ore"],  // erz				   
				];
				for (i = 0; i < map.length; i++) {
					var elmt = ksx.tools.getElement(map[i][0], true);
					this[map[i][1]] = elmt;
				}

				this.maxGoldValue = ksx.tools.getElement("modal_attack_rec_max_gold", true).textContent;
				this.maxFoodValue = ksx.tools.getElement("modal_attack_rec_max_rec1", true).textContent;
				this.maxWoodValue = ksx.tools.getElement("modal_attack_rec_max_rec2", true).textContent;
				this.maxStoneValue = ksx.tools.getElement("modal_attack_rec_max_rec3", true).textContent;
				this.maxOreValue = ksx.tools.getElement("modal_attack_rec_max_rec4", true).textContent;

				this.maxUnit = ksx.tools.getElement("modal_attack_maxunt", true);
				this.maxRes = ksx.tools.getElement("modal_attack_maxres", true);

				this.getMarchType = function () {
					for (i = 1; i < 6; i++) if (ksx.tools.getElement('modal_attack_tab_' + i, true).className == 'selected') return i;
					return 0;
				};
			} catch (e) {
				GM_log("ERROR: MarchUI - " + e);
				throw e;
			}

		},

		getCityBuilding: function getCityBuilding(cityId, buildingId) {
			var b = unsafeWindow.seed.buildings['city' + cityId];
			var ret = { count: 0, maxLevel: 0 };
			for (var i = 1; i < 33; i++) {
				if (b['pos' + i] && b['pos' + i][0] == buildingId) {
					++ret.count;
					if (parseInt(b['pos' + i][1]) > ret.maxLevel)
						ret.maxLevel = parseInt(b['pos' + i][1]);
				}
			}
			return ret;
		},

		getMyAlliance: function () {
			if (unsafeWindow.seed.allianceDiplomacies == null || unsafeWindow.seed.allianceDiplomacies.allianceName == null)
				return [0, 'Keine'];
			else
				return [unsafeWindow.seed.allianceDiplomacies.allianceId, unsafeWindow.seed.allianceDiplomacies.allianceName];
		},

		getAllianceId: function () {
			if (unsafeWindow.seed.allianceDiplomacies == null || unsafeWindow.seed.allianceDiplomacies.allianceName == null)
				return 0; else return unsafeWindow.seed.allianceDiplomacies.allianceId;
		},

		className: "ksx.koc"
	};

	this.plugins = {className: "ksx.plugins"};
	this.compatibility = { className: "ksx.compatibility" };
	this.configuration = { className: "ksx.configuration" };
	this.className = "KSX";

	/*DEBUGCODE:*/ this.logit("Current player: " + this.koc.getPlayerName());
};


//#region Feature "Set Titel with player name"
//NOT WORKING
//// @include       http://apps.facebook.com/kingdomsofcamelot/*
//if (document.getElementsByTagName("html")[0].getAttribute("id") == "facebook") {
//	/*DEBUGCODE:*/if(ksxDebug) GM_log("Setup KoC Buttler \n" + "location: " + document.location.href);
//	window.setInterval(function () {
//		if(ksxDebug) GM_log("facebook 1 " + document.title);
//		if(ksxDebug) GM_log(unsafeWindow.getPropertyValue("ksx"));
//		if (typeof (ksx) != "object") return;
//		if(ksxDebug) GM_log("facebook 2");
//		var newTitle = ksx.koc.getPlayerName();
//		var title = document.title;
//		ksx.logit("Update Title: " + title + " -> " + newTitle);
//		document.title = newTitle;
//	}, 5000);
//}
//#endregion Feature "Set Titel with player name"


function ToolbarPlugin(ksx) {

	var macros = {
		// contains all functions, which can be called from toolbar buttons
		
		dumpSeed: function () {
			function dump(obj,path) {
				for (var o in objs) {if(o===obj) return;} objs.push(obj);
				//if(ksxDebug) GM_log("dump " + path);
				
				for (var propName in obj) {
					var propPath = path + "." + propName;
					var propValue = obj[propName];
					
					if(propValue===null) {
						s += "" + propPath +" (undefinied): null" + "\n";
						return;
					}
					var propValueType = typeof propValue;
					switch (propValueType) {
						case "function":return;
						case "object": s += "" + propPath +" ("+ propValueType +"): >>" /*+ propValue.toString().substr(0,20)*/ + "\n";break;
						default:s += "" + propPath +" ("+ propValueType +"): "+ propValue.toString() + "\n";break;
					}
				
					if(obj.propertyIsEnumerable(propName) && !(typeof propValue === "string")) {
						++ind;dump(propValue,propPath);--ind;
					}
				}
			}
			var objs = [];
			var ind = 0;
			var s = "";
			dump(unsafeWindow.seed,"seed");
			//GM_log(s);
		},

		// opens the new message dialog
		newMessage: function () {
			if(ksxDebug) GM_log("Calling ksx.plugins.Toolbar.macros.newMessage()");
			ksx.tools.doUnsafeWindow("modal_messages(); track_chrome_btn('messages_btn'); modal_messages_compose();", true);
		},
		
		// opens the send to alliance dialog
		newMessageAtAlliance: function () {
			if(ksxDebug) GM_log("Calling ksx.plugins.Toolbar.macros.newMessageAtAlliance()");
			var doit = "getMessageWindow(" + ksx.koc.getAllianceId() + ",'Alliance Members','allianceall')";
			//if(ksxDebug) GM_log("doUnsafeWindow "+doit);
			ksx.tools.doUnsafeWindow(doit, true);
		},
		
		newMarch: function (marchType, x, y, troops, res) { ksx.plugins.MarchExtender.march.show(marchType, x, y, troops, res); },

		// template: function(){},

		className: "Macros"
	};
	this.macros = macros;

	this.initUI = function (thisPlugin) {
		if (ksxDebug) GM_log("Calling ToolbarPlugin.initUI");

		var fc = document.body.firstChild;

		var tbDiv = document.createElement('div');
		tbDiv.id = "ksx_ToolbarPlugin_ToolbarContainer";
		tbDiv.setAttribute("style", "line-height: 22px; font-size: small; text-align: left; border-bottom: 1px solid silver; height: 24px; width: 1100px; background: none repeat scroll 0% 0% rgb(223, 223, 255); ");
		// div.style.width = '772px';
		// div.style.width = '1100px'; //+ Chat Rechts

		var lines = 1;
		for (var i = 0; i < ksx.configuration.toolbar.items.length; i++) {
			var item = ksx.configuration.toolbar.items[i];
			if (!item) continue; //skip empty item
			if (ksxDebug) GM_log("Create toolbar item: " + item);
			switch (item[0].toLowerCase()) {
				case "button": tbDiv.appendChild(ksx.Builder.ToolbarButton(item[2], item[3], item[1])); break;
				case "label": tbDiv.appendChild(ksx.Builder.Span(item[2])); break;
				case "html": tbDiv.appendChild(ksx.Builder.Span(item[1])); break;
				case "linebreak": lines++; tbDiv.appendChild(document.createElement("br")); break; //TODO 
				//				case "popup": break; //TODO              
				case "separator": tbDiv.appendChild(ksx.Builder.Span(" | ")); break;
				default: break;
			}
		}

		tbDiv.style.height = (lines * 22 + 4) + 'px';

		var toolbarsPanelDiv = document.getElementById("ksx_ToolbarPlugin_ToolbarsPanel");
		if (toolbarsPanelDiv == null) {
			toolbarsPanelDiv = document.createElement('div');
			toolbarsPanelDiv.id = "ksx_ToolbarPlugin_ToolbarsPanel";
			toolbarsPanelDiv.setAttribute("style", "margin: 36px 0pt 0pt 20px;");
			document.body.insertBefore(toolbarsPanelDiv, document.body.firstChild);
		}

		toolbarsPanelDiv.appendChild(tbDiv);
	};

	this.addToolbarItem = function(item) {
		var div = ksx.tools.getElement("ksx_ToolbarPlugin_ToolbarContainer");
		switch (item[0].toLowerCase()) {
			case "button": div.appendChild(ksx.Builder.BlueButton(item[1], item[2])); break;
			case "label" : div.appendChild(ksx.Builder.Span(item[1])); break;
			case "html"  : div.appendChild(ksx.Builder.Span(item[1])); break;
			default: break;
		}
	};

	this.initUI(this);
}

function PowerToolbarPlugin(ksx) {
	
	this.macros = { className: "PowerToolbarPlugin+Macros" };

	this.atSyncButtonClick = function (evt) {
		if (ksxDebug) GM_log("PowerToolbarPlugin.atSyncButtonClick");

		var t = ksx.tools.findParentByTagName(evt.target, "A", true);
		if (!t) { GM_log("Element for event not found!"); return; }

		var id = t.getAttribute("id");
		if (!id) { GM_log("ERROR: Element has no id!"); return; }
		for (var i = 0; i < ksx.configuration.powertoolbar.syncButtons.length; i++) {
			var cfg = ksx.configuration.powertoolbar.syncButtons[i];
			if (cfg[0] === id) {
				var pbButton = document.getElementById(cfg[1]);
				if (!pbButton) { GM_log("ERROR: Element not found! '" + cfg[1] + "'"); return; }
				if (ksxDebug) GM_log("Click: " + cfg[1]);
				ksx.tools.click(pbButton);
				return;
			}
		}
		GM_log("ERROR: Config not found! " + id); return;
	};

	this.updateButtons = function () {
		for (var i = 0; i < ksx.configuration.powertoolbar.syncButtons.length; i++) {
			var cfg = ksx.configuration.powertoolbar.syncButtons[i];
			var ksxpbButton = document.getElementById(cfg[0]);
			if (ksxpbButton) {
				var pbButton = document.getElementById(cfg[1]);
				if (pbButton) {
					ksx.Builder.setToolbarCheckButton(ksxpbButton, String(pbButton[cfg[2]]).search(cfg[3]) != -1);
				} else {
					ksx.Builder.setToolbarCheckButton(ksxpbButton, null);
				}
			}
		}
	};

	this.initUI = function (thisPlugin) {
		if (ksxDebug) GM_log("Calling PowerToolbarPlugin.initUI");

		var tbDiv = document.createElement('div');
		tbDiv.id = "ksx_PowerToolbarPlugin_ToolbarContainer";
		tbDiv.setAttribute("style", "line-height: 22px; font-size: small; text-align: left; border-bottom: 1px solid silver; height: 24px; width: 1100px; background: none repeat scroll 0% 0% rgb(223, 223, 255);");
		// div.style.width = '772px';
		// div.style.width = '1100px'; //+ Chat Rechts

		var lines = 1;
		for (var i = 0; i < ksx.configuration.powertoolbar.items.length; i++) {
			var item = ksx.configuration.powertoolbar.items[i];
			if (!item) continue; //skip empty item
			if (ksxDebug) GM_log("Create toolbar item: " + item);
			switch (item[0].toLowerCase()) {
				case "button": tbDiv.appendChild(ksx.Builder.ToolbarButton(item[2], item[3], item[1])); break;
				case "label": tbDiv.appendChild(ksx.Builder.Span(item[2])); break;
				case "html": tbDiv.appendChild(ksx.Builder.Span(item[1])); break;
				case "linebreak": lines++; tbDiv.appendChild(document.createElement("br")); break; //TODO 
				//				case "popup": break; //TODO             
				case "separator": tbDiv.appendChild(ksx.Builder.Span(" | ")); break;
				default: break;
			}
		}
		tbDiv.style.height = (lines * 22 + 4) + 'px';

		var toolbarsPanelDiv = document.getElementById("ksx_ToolbarPlugin_ToolbarsPanel");
		toolbarsPanelDiv.appendChild(tbDiv);
	};

	this.addToolbarItem = function (item) {
		var div = ksx.tools.getElement("ksx_PowerToolbarPlugin_ToolbarContainer");
		switch (item[0].toLowerCase()) {
			case "button": div.appendChild(ksx.Builder.BlueButton(item[1], item[2])); break;
			case "label": div.appendChild(ksx.Builder.Span(item[1])); break;
			case "html": div.appendChild(ksx.Builder.Span(item[1])); break;
			default: break;
		}
	};

	this.updateTimer = function () {
		ksx.plugins.PowerToolbar.updateButtons();
	};

	this.initSync = function (thisPlugin) {
		for (var i = 0; i < ksx.configuration.powertoolbar.syncButtons.length; i++) {
			var cfg = ksx.configuration.powertoolbar.syncButtons[i];
			GM_log("Init toolbarsync: " + cfg[0] + " " + cfg[1]);
			var tbButton = document.getElementById(cfg[0]);
			if (!tbButton) { GM_log("Element not found! '" + cfg[0] + "'"); }
			if (tbButton) { tbButton.addEventListener("click", thisPlugin.atSyncButtonClick, false); }
		}
	};
	this.className = "PowerToolbarPlugin";
	this.initUI(this);
	this.initSync(this);
	window.setInterval(this.updateTimer, 1000);
}

function ChatMonitorPlugin(ksx) {

	this.infoTokens = ["INFO:"]; //Spam vom KoC Power z.B.
	this.attackTokens = ["MÖGLICHER ANGRIFF:", "ALARM:", "*ALARM*", "!!! ACHTUNG = ANGRIFF !!!"];

	this.hooks = [];

	this.AddHook = function (fnc) {
		this.hooks.push(fnc);
	};

	this.Filter = function (name, tokens, conditions, fnc) {
		this.name = name;
		this.tokens = tokens || [];
		this.conditions = conditions || {};
		this.fnc = fnc;
	};

	this.MsgDivWrapper = function (msgdiv) {
		this.msgdiv = msgdiv;
		this.msgType = "unknown"; this.isAlliance = false; this.isDirect = false; this.isNoAlliance = false; this.isGlobal = false;
		if (msgdiv.getAttribute("class") == "chatwrap clearfix") { this.msgType = "alliance"; this.isAlliance = true; }
		else if (msgdiv.getAttribute("class") == "chatwrap clearfix direct") { this.msgType = "direct"; this.isDirect = true; }
		else if (msgdiv.getAttribute("class") == "chatwrap clearfix noalliance") { this.msgType = "noalliance"; this.isNoAlliance = true; }
		else if (msgdiv.getAttribute("class") == "chatwrap clearfix global") { this.msgType = "global"; this.isGlobal = true; }


		if (!this.isNoAlliance) {
			var playerName = ksx.koc.getPlayerName();
			this.img = msgdiv.childNodes[0];
			this.contentDiv = msgdiv.childNodes[1];
			this.infoDiv = msgdiv.childNodes[1].childNodes[0];
			this.whoA = msgdiv.childNodes[1].childNodes[0].childNodes[0];
			this.saysB = msgdiv.childNodes[1].childNodes[0].childNodes[1];
			this.timeSpan = msgdiv.childNodes[1].childNodes[0].childNodes[3];
			this.clearfixDiv = msgdiv.childNodes[1].childNodes[1];
			this.tx = msgdiv.childNodes[1].childNodes[1].childNodes[0];

			this.isOwnEntry = (this.whoA.textContent == playerName);
			this.msgtxt = this.tx.textContent;
		} else {

		}
	};

	this.filters = [];

	//#region Feature: "Cheat Zeit Korrektur"
	this.chatEntryTimeCorrection = function (chatEntry) {
		//if(ksxDebug) GM_log("enableTimeCorrection: " + enableTimeCorrection);
		if (chatEntry.msgdiv.getAttribute("class") != "chatwrap clearfix" && chatEntry.msgdiv.getAttribute("class") != "chatwrap clearfix direct") return;

		var timeOffset = 9; // TODO read from Config
		var chhmm = ksx.tools.getElement("kochead_time").innerHTML.split(":");
		var cmmm = (60 * chhmm[0]) + (1 * chhmm[1]);

		var timeSpan = chatEntry.msgdiv.childNodes[1].childNodes[0].childNodes[3];
		var hhmm = timeSpan.innerHTML.split(":");
		var hh = (1 * hhmm[0]);
		var mmm = hh * 60 + (1 * hhmm[1]);

		if (Math.abs(cmmm - mmm) > 2) {
			hh += timeOffset; if (hh >= 24) hh -= 24; if (hh < 10) hh = "0" + hh;
			var newTime = hh + ":" + hhmm[1];
			//if(ksxDebug) GM_log("Chat entry: time correction: " + timeSpan.innerHTML + " + Offset " + timeOffset + "h = " + newTime);
			timeSpan.innerHTML = newTime;
		}

	};
	//#endregion

	this.scanChatItem = function (chatEntry, filter) {
		var infoStyle = "background: " + ksx.configuration.chat.backgrounds.InfoBackground;
		var allyAttackStyle = "background: " + ksx.configuration.chat.backgrounds.AllyAttackBackground;
		var ownAttackStyle = "background: " + ksx.configuration.chat.backgrounds.OwnAttackBackground;
		var infoTokens = ksx.plugins.ChatMonitor.infoTokens;
		var attackTokens = ksx.plugins.ChatMonitor.attackTokens;

		if (chatEntry.token0 == infoTokens[0]) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("INFO token found");
			chatEntry.msgdiv.setAttribute("style", infoStyle);
			return true;
		} else if (chatEntry.token0 == attackTokens[0] && chatEntry.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("ANGRIFF (Selber) token found");
			chatEntry.msgdiv.setAttribute("style", ownAttackStyle);
			return true;
		} else if (chatEntry.token0 == attackTokens[0] && !chatEntry.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("ANGRIFF (Alli) token found");
			chatEntry.msgdiv.setAttribute("style", allyAttackStyle);
			return true;
		}
		return false;
	};

	this.scanAllianceChat = function () {
		//if(ksxDebug) GM_log("ChatMonitorPlugin.scanAllianceChat");

		function setEntryHandled() {
			msgdiv.innerHTML += "<div style='display:none'>Entry processed by ksx</div>";
		}

		var modCommList2 = ksx.tools.getElement("mod_comm_list2");
		for (var i = 0; i < modCommList2.childNodes.length; i++) {
			var msgdiv = modCommList2.childNodes[i];
			if (msgdiv.lastChild.innerHTML == "Entry processed by ksx") return; //allready handled item found => exit loop
			var chatEntry = new ksx.plugins.ChatMonitor.MsgDivWrapper(msgdiv);

			if (chatEntry.isNoAlliance) { setEntryHandled(); continue; }

			//#region Feature: "Cheat Zeit Korrektur"
			if (ksx.configuration.chat.enableTimeCorrection) {
				ksx.plugins.ChatMonitor.chatEntryTimeCorrection(chatEntry, null);
			}
			//#endregion

			//*DEBUGCODE: if (!chatEntry.isNoAlliance) GM_log("who: " + chatEntry.whoA.textContent + " timeSpan: " + chatEntry.timeSpan.innerHTML + " isOwnEntry: " + chatEntry.isOwnEntry + " context: " + chatEntry.msgType + " \nmsgtxt: " + chatEntry.msgtxt);


			var token = null; var token0 = null;
			for (var k = 0; k < ksx.plugins.ChatMonitor.filters.length; k++) {
				token = null; token0 = null;
				var filter = ksx.plugins.ChatMonitor.filters[k];
				//GM_log("Checking filter: [" + k + "].name: " + filter.name);
				for (var j = 0; j < filter.tokens.length; j++) {
					if (chatEntry.msgtxt.indexOf(filter.tokens[j]) == 0) {
						token = filter.tokens[j];
						token0 = filter.tokens[0];
					}
					if (token != null) break;
				}
				if (token != null) break;
			}
			if (!token) {
				setEntryHandled();
				//GM_log("No token found. filters: (" + ksx.plugins.ChatMonitor.filters.length + ")"); 
				continue;
			}
			chatEntry.token0 = token0;
			chatEntry.token = token;

			/*DEBUGCODE:*/if (ksxDebug) GM_log("Chat token found: " + chatEntry.token + " isOwnEntry: " + chatEntry.isOwnEntry + " context: " + chatEntry.msgType);

			var entryHandled = false;
			for (var k = 0; k < ksx.plugins.ChatMonitor.filters.length; k++) {
				var filter = ksx.plugins.ChatMonitor.filters[k];
				GM_log("Checking filter: [" + k + "].name: " + filter.name + " tokens: " + filter.tokens + " isOwnEntry: " + filter.conditions.isOwnEntry);
				if (!filter.tokens) continue;
				if (filter.tokens[0] != token0) continue;
				if (!(typeof filter.conditions.isOwnEntry === "undefined") && !(filter.conditions.isOwnEntry === null) && filter.conditions.isOwnEntry != chatEntry.isOwnEntry) continue;

				entryHandled = filter.fnc(chatEntry, filter);
				if (entryHandled) { entryHandled = true; setEntryHandled(); return ; }
			}

			//special case, no token, must be allways the last
			if (entryHandled && chatEntry.isOwnEntry) {
				(function () {
					var ownStyle = "background: " + ksx.configuration.chat.backgrounds.OwnItemBackground;
					chatEntry.msgdiv.setAttribute("style", ownStyle);
				})();
				setEntryHandled();
				continue;
			}

			setEntryHandled();
		}
	};

	var filters = this.filters;
	var Filter = this.Filter;
	filters.push(new Filter('infoTokens', this.infoTokens, {}, this.scanChatItem));
	filters.push(new Filter('attackTokens', this.attackTokens, {}, this.scanChatItem));

	if (ksxDebug) GM_log("setInterval scanAllianceChat");
	window.setInterval(this.scanAllianceChat, 5000);
}

function ResourceRequestPlugin(ksx) {
	//REQUIRES ChatMonitorPlugin, MarchExtenderPlugin

	var atResourceRequestClick = function () {
		if(ksxDebug) GM_log("ResourceRequestPlugin.atResourceRequestClick");
		//var ksx = unsafeWindow.ksx; if (ksx == null) throw "ksx is null!";

		var rrDestination = ksx.tools.getElement("rrDestination");
		var rrGoldAmount  = ksx.tools.getElement("rrGoldAmount");
		var rrFoodAmount  = ksx.tools.getElement("rrFoodAmount");
		var rrWoodAmount  = ksx.tools.getElement("rrWoodAmount");
		var rrStoneAmount = ksx.tools.getElement("rrStoneAmount");
		var rrOreAmount   = ksx.tools.getElement("rrOreAmount");

		var req = ksx.plugins.ResourceRequest.CurrentRequest;

		req.Version = "2";
		req.Destination = rrDestination.value.toLowerCase().replace(/;|-|\//, ",").replace("-", ",").replace("/", ",").replace(/\s+/g, "");
		req.Gold = rrGoldAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Food = rrFoodAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Wood = rrWoodAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Stone = rrStoneAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");
		req.Ore = rrOreAmount.value.toLowerCase().replace(" ", "").replace("mille", "mio").replace("kk", "mio");

		var pers = ksx.JSON.stringify(req);
		ksx.logit("save: "+pers);
		GM_setValue("ResourceRequest_" + ksx.koc.getServerId(), pers);

		var modCommInput = ksx.tools.getElement("mod_comm_input");
		if (modCommInput == null) { alert("mod_comm_input not found!"); return; }

		var sA = "";
		if (req.Gold.length > 0 && req.Gold != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Gold" + " " + req.Gold;
		if (req.Food.length > 0 && req.Food != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Nahrung" + " " + req.Food;
		if (req.Wood.length > 0 && req.Wood != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Holz" + " " + req.Wood;
		if (req.Stone.length > 0 && req.Stone != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Steine" + " " + req.Stone;
		if (req.Ore.length > 0 && req.Ore != 0) sA = sA + (sA.length > 0 ? " + " : "") + "Erz" + " " + req.Ore;
		//if(sA.length==0) return;
		var s = "/a " + "RES ANFRAGE:" + " " + req.Destination + " " + sA;
		ksx.logit("Send: "+s)

		;
		ksx.tools.type(modCommInput, s);
		ksx.tools.click(modCommInput.nextSibling);

		ksx.tools.getElement("rrContainer").style.display = "none";
		ksx.tools.getElement("//*[@class='comm_body comm_global']").style.display = "";
	};
	this.atResourceRequestClick = atResourceRequestClick;
	

	

	this.CurrentRequest = {
		ksxVersion: "2",
		Destination: "xxx,yyy",
		Gold: "",
		Food: "",
		Wood: "",
		Stone: "",
		Ore: "100mio"
	};

	var atShowResourceRequest = function () {
		/*DEBUGCODE:*/if(ksxDebug) GM_log("ResourceRequestPlugin.atShowResourceRequest");
		ksx.tools.getElement("rrContainer").style.display = "";
		ksx.tools.getElement("//*[@class='comm_body comm_global']").style.display = "none";
	};
	this.atShowResourceRequest = atShowResourceRequest;

	var atCloseResourceRequest = function () {
		/*DEBUGCODE:*/if(ksxDebug) GM_log("ResourceRequestPlugin.atCloseResourceRequest");
		ksx.tools.getElement("rrContainer").style.display = "none";
		ksx.tools.getElement("//*[@class='comm_body comm_global']").style.display = "";
	};
	this.atCloseResourceRequest = atCloseResourceRequest;


	this.initUI = function () {
		/*DEBUGCODE:*//*if (ksxDebug)*/ GM_log("ResourceRequestPlugin.initUI");

		var koc_comm_tabs = ksx.tools.getElement("comm_tabs");
		if (!koc_comm_tabs) { throw "Element 'koc_comm_tabs' not found! Maybe KoC has some changes."; }
		var mod_comm = ksx.tools.getElement("//*[@class='mod_comm']");
		if (!mod_comm) { throw "Element 'mod_comm' not found! Maybe KoC has some changes."; }

		// Append the "Anfrage" Tab
		var btn = ksx.Builder.ComTabButton("Ressourcen Anfrage", "ksx.plugins.ResourceRequest.atShowResourceRequest();return false;");
		koc_comm_tabs.appendChild(btn);


		// Append the "Anfrage" form
		var htmlTemplate = "<div id='rrContainer' style='position: relative; top: 96px; border: 1px solid #A56631; height: 350px; margin-left: 10px;margin-top: 84x; overflow-x: hidden; overflow-y: hidden; position: relative; width: 340px;'><table style='width: 100%'><tr><td><span style='font-weight: bold'>RESSOURCEN-ANFRAGE </span></td><td style='text-align: right'><a href='#' onclick='ksx.plugins.ResourceRequest.atCloseResourceRequest();return false;'><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/close_icon.png' alt='X' /></a></td></tr></table><table><tbody><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/food_30.png'></td><td>Menge:<input id='rrFoodAmount' type='text' value='0' maxlength='11' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/wood_30.png'></td><td>Menge:<input id='rrWoodAmount' type='text' value='0' maxlength='11' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/stone_30.png'></td><td>Menge:<input id='rrStoneAmount' type='text' value='0' maxlength='11' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/iron_30.png'></td><td>Menge:<input id='rrOreAmount' type='text' value='0' maxlength='11' size='11'></td></tr><tr align='center'><td><img src='http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/gold_30.png'></td><td>Menge:<input id='rrGoldAmount' type='text' value='0' maxlength='11' size='11'></td></tr></tbody></table><div style='margin-bottom: 10px; display: none'><span id='rrCityTo'><input id='rrTraderTo_0' class='castleBut castleButNon' type='submit' value='1'><input id='rrTraderTo_1' class='castleBut castleButNon' type='submit' value='2'><input id='rrTraderTo_2' class='castleBut castleButNon' type='submit' value='3'><input id='rrTraderTo_3' class='castleBut castleButNon' type='submit' value='4'><input id='rrTraderTo_4' class='castleBut castleButNon' type='submit' value='5'><input id='rrTraderTo_5' class='castleBut castleButNon' type='submit' value='6'><input id='rrTraderTo_6' class='castleBut castleButNon' type='submit' value='7'><span id='rrTraderToCityName' style='display: inline-block; width: 85px; font-weight: bold;'></span></span></div><div>Ziel-Koordinate:<input id='rrDestination' type='text' maxlength='7' size='7'></div><br/><span><a class='button20' onclick='ksx.plugins.ResourceRequest.atResourceRequestClick();return false;'><span>Anfrage Senden</span></a></span></div>";
		var div = ksx.Builder.Element("div", htmlTemplate);
		div.setAttribute("id", "rrContainer"); //WORKARROUND id from template is not pressent!?
		div.style.display = "none"; // hide on init
		mod_comm.appendChild(div);

		var s = GM_getValue("ResourceRequest_" + ksx.koc.getServerId());
		// GM_log("Load ResourceRequest:" + s);

		var rrDestination = ksx.tools.getElement("rrDestination");
		var rrGoldAmount = ksx.tools.getElement("rrGoldAmount");
		var rrFoodAmount = ksx.tools.getElement("rrFoodAmount");
		var rrWoodAmount = ksx.tools.getElement("rrWoodAmount");
		var rrStoneAmount = ksx.tools.getElement("rrStoneAmount");
		var rrOreAmount = ksx.tools.getElement("rrOreAmount");

		if (s != null) {
			var rr = ksx.JSON.parse(s);
			if (ksxDebug) GM_log("Output: " + typeof (rr.ksxVersion));
			if (typeof (rr.ksxVersion) != "string" || rr.ksxVersion != "2") {
				rrDestination.value = "xxx,yyy";
				rrGoldAmount.value = "";
				rrFoodAmount.value = "";
				rrWoodAmount.value = "";
				rrStoneAmount.value = "";
				rrOreAmount.value = "100mio";
			} else {
				rrDestination.value = rr.Destination;
				rrGoldAmount.value = rr.Gold;
				rrFoodAmount.value = rr.Food;
				rrWoodAmount.value = rr.Wood;
				rrStoneAmount.value = rr.Stone;
				rrOreAmount.value = rr.Ore;
			}
		} else {
			rrDestination.value = "xxx,yyy";
			rrGoldAmount.value = "";
			rrFoodAmount.value = "";
			rrWoodAmount.value = "";
			rrStoneAmount.value = "";
			rrOreAmount.value = "100mio";
		}
	};

	this.requestTokens = ['RES ANFRAGE:', "*ANFRAGE*"];
	this.acknowledgeTokens = ["RES BESTÄTIGUNG:", "*BESTÄTIGUNG*", "RES BESTÄTIGT:", "BESTÄTIGT:"];
	this.deliveryTokens = ["RES LIEFERUNG:", "*LIEFERUNG*"];
	this.foodLowTokens = ["Mein Heiligtum"]; //TODO: Mein Heiligtum {City} (X,Y) hat zu wenig Nahrung sie reicht noch für 1,541,348 (2h 40m) - Verbrauch: -577,150

	this.atRequestEntry = function(msg, filter) { // requestTokens && !isOwnEntry
		/*DEBUGCODE:*/if (ksxDebug) GM_log("ANFRAGE token found");
		
		var acknowledgeTokens = ksx.plugins.ResourceRequest.acknowledgeTokens;
		
		var tReqR = msg.msgtxt;
		var t1R = tReqR.indexOf(msg.token);
		tReqR = tReqR.substring(t1R, tReqR.length);
		var t2R = tReqR.indexOf("'");
		if (t2R >= 0) tReqR = tReqR.substr(0, t2R);

		var tAck = tReqR.replace(msg.token, acknowledgeTokens[0]);
		var cA = "var chat = document.getElementById('mod_comm_input'); chat.value = '" + tAck + "';chat.focus(); return false;";

		var actiondiv = document.createElement('div');
		actiondiv.setAttribute("style", "padding: 0 0 0 30px;");
		actiondiv.appendChild(ksx.Builder.GreenButton("Bestätigen", cA));
		msg.msgdiv.appendChild(actiondiv);
		var reqStyle = "background: " + ksx.configuration.chat.backgrounds.RequestItemBackground;
		msg.msgdiv.setAttribute("style", reqStyle);
		return true;
	};
	this.atOwnAcknowledgeEntry = function (msg, filter) {
		/*DEBUGCODE:*/if (ksxDebug) GM_log("BESTÄTIGUNG token found");
		var deliveryTokens = ksx.plugins.ResourceRequest.deliveryTokens;
		
		var tAckM = msg.msgtxt;
		var t1A = tAckM.indexOf(msg.token);
		tAckM = tAckM.substring(t1A, tAckM.length);
		var t2A = tAckM.indexOf("'");
		if (t2A >= 0) tAckM = tAckM.substr(0, t2A);

		var goldAmount = 0;
		var foodAmount = 0;
		var woodAmount = 0;
		var stoneAmount = 0;
		var oreAmount = 0;
		var x; var y;

		var xyPattern = /([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})/;
		var match = xyPattern.exec(msg.msgtxt);
		if (match === null) return false;
		x = match[1]; y = match[3];

		var pattern = /(Nahrung|Futter|Food|Erz|Ore|Holz|Wood|Steine|Stein|Stone|Gold)\s*([0-9]+)(mio|mrd|bio|M|G|T|kkkk|kkk|kk|k)/gi;
		while (match = pattern.exec(msg.msgtxt)) {
			var res = match[1];
			var amount = match[2];
			var unit = match[3];
			var amountB;
			switch (unit.toLowerCase()) {
				case "k": amountB = amount * 1000; break;
				case "m": case "mio": case "kk": amountB = amount * 1000000; break;
				case "g": case "mrd": case "kkk": amountB = amount * 1000000000; break;
				case "t": case "bio": case "kkkk": amountB = amount * 1000000000000; break;
				default: amountB = amount * 1;
			}

			switch (res.toLowerCase()) {
				case "gold": goldAmount = amountB; break;
				case "nahrung": case "futter": case "food": foodAmount = amountB; break;
				case "holz": case "wood": woodAmount = amountB; break;
				case "steine": case "stein": case "stone": stoneAmount = amountB; break;
				case "erz": case "ore": oreAmount = amountB; break;
				default: break;
			}
		}

		var tDly = tAckM.replace(msg.token, deliveryTokens[0]);
		var cD = " \
				ksx.plugins.MarchExtender.march.show(1, " + x + ", " + y + ", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [" + goldAmount + ", " + foodAmount + ", " + woodAmount + ", " + stoneAmount + ", " + oreAmount + "]); \
				ksx.plugins.MarchExtender.march.transportTools.calculateFastestTroopsForTransport(); \
				var chat = document.getElementById('mod_comm_input'); \
				chat.value = '" + tDly + " / ??min';chat.focus(); \
				return false;";

		var ackStyle = "background: " + ksx.configuration.chat.backgrounds.RequestItemBackground;
		var actiondiv = document.createElement('div');
		actiondiv.setAttribute("style", "padding: 0 0 0 30px;");
		actiondiv.appendChild(ksx.Builder.GreenButton("Liefern", cD));
		msg.msgdiv.appendChild(actiondiv);
		msg.msgdiv.setAttribute("style", ackStyle);

		return true;
	};
	this.atFootLowEntry = function (msg, filter) {
		/*DEBUGCODE:*/if (ksxDebug) GM_log("FoodLow (Alli) token found");
		// Mein Heiligtum TEST (777,888) hat zu wenig Nahrung sie reicht noch für 1,234,567 (1h 33m) - Verbrauch: -666,777
		var foodLowTokens = ksx.plugins.ResourceRequest.foodLowTokens;
		var allyFoodLowStyle = "background: " + ksx.configuration.chat.backgrounds.RequestItemBackground;
		var pattern = /.*\(([0-9]{1,3})\s*(,|-)\s*([0-9]{1,3})\).*für\s([0-9,]+)\s\(([0-9\shms]+)\).*Verbrauch:\s([0-9,-]+)/img;
		var match = pattern.exec(msg.msgtxt);

		var x = match[1];
		var y = match[3];
		var foodleft = match[4].replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "");
		var timeleft = match[5];
		var foodconsumption = match[6].replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "");

		var foodAmount = -1 * foodconsumption * 8;

		if (ksxDebug) GM_log("FoodLow (Alli): " + x + "," + y + " " + foodleft + " " + timeleft + " " + foodconsumption + "/h -> " + foodAmount);



		// Bestätigung
		var tAck = acknowledgeTokens[0] + " " + x + "," + y + " " + "Nahrung" + " " + foodAmount;
		var cA = "var chat = document.getElementById('mod_comm_input'); chat.value = '" + tAck + "';chat.focus(); return false;";
		

		// Lieferung
		var tDly = deliveryTokens[0] + " " + x + "," + y + " " + "Nahrung" + " " + foodAmount + " /??min";
		var cDt = "\
				ksx.plugins.MarchExtender.march.show(1, " + x + ", " + y + ", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, " + foodAmount + ", 0, 0, 0]); \
				ksx.plugins.MarchExtender.march.transportTools.calculateFastestTroopsForTransport(); \
				var chat = document.getElementById('mod_comm_input'); chat.value = '" + tDly + "'; \
				return false;";
		
		var actiondiv = document.createElement('div');
		actiondiv.setAttribute("style", "padding: 0 0 0 30px;");
		actiondiv.appendChild(ksx.Builder.GreenButton("Bestätigen", cA));
		actiondiv.appendChild(ksx.Builder.GreenButton("Express Liefern", cDt));
		msg.msgdiv.appendChild(actiondiv);
		msg.msgdiv.setAttribute("style", allyFoodLowStyle);
		return true;
	};
	this.scanChatItem = function (msg, filter) {
		/*DEBUGCODE:*/if (ksxDebug) GM_log("ResourceRequestPlugin.scanChatItem");


		var dlyStyle = "background: " + ksx.configuration.chat.backgrounds.RequestItemBackground;
		
		var ownFoodLowStyle = "background: " + ksx.configuration.chat.backgrounds.OwnAttackBackground;

		var requestTokens = ksx.plugins.ResourceRequest.requestTokens;
		var acknowledgeTokens = ksx.plugins.ResourceRequest.acknowledgeTokens;
		var deliveryTokens = ksx.plugins.ResourceRequest.deliveryTokens;
		var foodLowTokens = ksx.plugins.ResourceRequest.foodLowTokens;

		//		var token0=msg.token0;
		//		var isOwnEntry = msg.isOwnEntry;
		//		var token = msg.token;

		if (msg.token0 == acknowledgeTokens[0] && !msg.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("BESTÄTIGUNG (alliance) token found");
			msg.msgdiv.setAttribute("style", dlyStyle);
			return true;
		} else if (msg.token0 == deliveryTokens[0] && !msg.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("LIEFERUNG (alliance) token found");
			msg.msgdiv.setAttribute("style", dlyStyle);
			return true;
		} else if (msg.token0 == foodLowTokens[0] && msg.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("FoodLow (own) token found");
			msg.msgdiv.setAttribute("style", ownFoodLowStyle);
			return true;
		} else if (msg.token0 == foodLowTokens[0] && !msg.isOwnEntry) {
			/*DEBUGCODE:*/if (ksxDebug) GM_log("FoodLow (Alliance) token found");
//			return this.atFootLowEntry(msg, filter);
		}
		return false;
	};



	this.initUI();
	var filters = ksx.plugins.ChatMonitor.filters;
	var Filter = ksx.plugins.ChatMonitor.Filter;
	filters.push(new Filter('requestTokens', this.requestTokens, { isOwnEntry: false }, this.atRequestEntry));
	filters.push(new Filter('requestTokens', this.requestTokens, { isOwnEntry: true }, this.scanChatItem));
	filters.push(new Filter('acknowledgeTokens', this.acknowledgeTokens, { isOwnEntry: true }, this.atOwnAcknowledgeEntry));
	filters.push(new Filter('acknowledgeTokens', this.acknowledgeTokens, { isOwnEntry: false }, this.scanChatItem));
	filters.push(new Filter('deliveryTokens', this.deliveryTokens, {}, this.scanChatItem));
	filters.push(new Filter('foodLowTokens', this.foodLowTokens, { isOwnEntry: false }, this.atFootLowEntry));
	filters.push(new Filter('foodLowTokens', this.foodLowTokens, { isOwnEntry: true }, this.scanChatItem)); 
};

function MarchExtenderPlugin(ksx) {
	var thisPlugin = this;

	this.march = {
		type: 0,
		ui: null,

		transportTools: {
			uiElement: null,
			uiElementId: "ksxTransportTools",

			hide: function () {
				//if(ksxDebug) GM_log("MarchExtenderPlugin.march.transportTools.hide()");
				uiElement = ksx.tools.getElement("ksxTransportTools");
				if (!uiElement) return;
				uiElement.style.display = "none";
			},

			show: function (visible) {
				if (ksxDebug) GM_log("MarchExtenderPlugin.march.transportTools.show(" + Boolean(visible) + ")");
				var t = ksx.plugins.MarchExtender.march.transportTools;
				uiElement = document.getElementById(t.uiElementId);
				if (!uiElement) uiElement = t.create();
				t.uiElement.style.display = ((visible) ? "" : "none");
			},

			create: function (visible) {
				if (ksxDebug) GM_log("MarchExtenderPlugin.march.transportTools.create(" + Boolean(visible) + ")");
				var t = ksx.plugins.MarchExtender.march.transportTools;
				t.uiElement = document.getElementById(t.uiElementId);
				if (t.uiElement) return t.uiElement;

				var myString = " \
					<div class='section' style='height: 100'> \
						<div class='section_title'>Transport tools</div> \
						<div class='section_content' style='height:100px'> \
							<a class='button20' href='#' onclick='ksx.plugins.MarchExtender.march.transportTools.calculateFastestTroopsForTransport();return false;'><span>Truppen Berechnen</span></a> \
							<a class='buttonGreen20' style='display:inline; position:absolute;margin-left:4px' href='#' onclick='ksx.plugins.MarchExtender.march.transportTools.calculateFastestTroopsForTransportHelp();return false;'><span>?</span></a> \
							<br/><br/> \
							<span> \
								Vordefinierte Transporte:<br/>  \
								<select onchange='ksx.plugins.MarchExtender.march.transportTools.atTransportTemplateChanged(this);return false;'> \
										<option value=''><option> \
									<optgroup label='Training (für 4 Hütten/Bevölkerung 18000, S-Kav,VP11,FP10)'> \
										<option value='0,1400000,2700000,0,180000'>Versorgungstruppe (18k)</option>	 \
										<option value='0,1940000,1800000,0,900000'>Milizsoldat (18k)</option> \
										<option value='0,2660000,1800000,0,2700000'>Späher (18k)</option> \
										<option value='0,3200000,9000000,0,1800000'>Lanzenträger (18k)</option>	 \
										<option value='0,4100000,2700000,0,7200000'>Schwertkämpfer (18k)</option> \
										<option value='0,2700000,3150000,0,2700000'>Bogenschütze (9k)</option> \
										<option value='0,6500000,3600000,0,3000000'>Kavallerie (6k)</option>	 \
										<option value='0,6500000,1500000,0,7500000'>Schwere Kavallerie (3000)</option> \
										<option value='0,2700000,6750000,0,1575000'>Versorgungswagen (4500)</option> \
										<option value='0,7250000,8100000,0,4860000'>Ballisten (2700)</option> \
										<option value='0,6500000,9000000,0,2250000'>Rammbock (1500)</option> \
										<option value='0,5000000,5000000,8000000,1200000'>Steinschleuder (1000)</option> \
									</optgroup> \
									<optgroup label='Training (Transport mit S-Kav)'> \
										<option value='0,4900000,5500000,0,2750000'>Milizsoldat (55k, S-Kav,VP:9,FP:9)</option> \
										<option value='0,8500000,10000000,0,5000000'>Milizsoldat (100k, S-Kav,VP:11,FP:10)</option> \
									</optgroup> \
									<optgroup label='Zuletzt verwendet'> \
										<option value='0,1500000000,0,0,0'>Nahrung 1500mio</option>	 \
									</optgroup> \
								</select> \
									<a class='buttonGreen20' style='display:inline; position:absolute;margin-left:4px' href='#' onclick='ksx.plugins.MarchExtender.march.transportTools.transportTemplateHelp();return false;'><span>?</span></a> \
							</span> \
						</div> \
					</div> \
					";
				var modalAttackTransport = ksx.tools.getElement("modal_attack_transport");
				t.uiElement = ksx.Builder.Element("div", myString);
				t.uiElement.setAttribute("id", t.uiElementId);
				t.uiElement.style.display = ((visible) ? "" : "none");
				modalAttackTransport.parentNode.appendChild(t.uiElement);
				return t.uiElement;
			},

			calculateFastestTroopsForTransport: function () {
				try {
					if (ksxDebug) GM_log("MarchExtenderPlugin.march.transportTools.calculateFastestTroopsForTransport");
					ui = new ksx.koc.MarchUI();

					var fp = unsafeWindow.seed.tech["tch10"]; // Level Federgewicht-Pulver
					var maxUnits = Number(ui.maxUnit.textContent);
					var hKavLoad = 80;
					var wagonLoad = 5000;
					var kavLoad = 100;
					var scoutLoad = 5;
					var m = 1 * ui.gold.value + 1 * ui.food.value + 1 * ui.wood.value + 1 * ui.stone.value + 1 * ui.ore.value;

					var cHKav = Math.ceil(m / (hKavLoad * (1 + fp / 10)));
					var cWagon = Math.ceil(m / (wagonLoad * (1 + fp / 10)));
					var cKav = Math.ceil(m / (kavLoad * (1 + fp / 10)));
					var cScout = Math.ceil(m / (scoutLoad * (1 + fp / 10)));
					if(ksxDebug) GM_log("Reset all units");
					for (var i = 1; i <= 12; i++) {
						if (!ui["unitIpt" + i]) GM_log("WARNING: calculateFastestTroopsForTransport - Element not specified - unitIpt" + i);
						ui["unitIpt" + i].value = 0; ksx.tools.typeKeys2(ui["unitIpt" + i], "0");
					}
					if (ksxDebug) GM_log("set best unit");
					if (cScout < Number(ui.unitnum3.textContent) && cScout < maxUnits) ksx.tools.typeKeys2(ui.unitIpt3, cScout);
					else if (cKav < Number(ui.unitnum7.textContent) && cKav < maxUnits) ksx.tools.typeKeys2(ui.unitIpt7, cKav);
					else if (cHKav < Number(ui.unitnum8.textContent) && cHKav < maxUnits) ksx.tools.typeKeys2(ui.unitIpt8, cHKav);
					else if (cWagon < Number(ui.unitnum9.textContent) && cWagon < maxUnits) ksx.tools.typeKeys2(ui.unitIpt9, cWagon);
				} catch (e) {
					GM_log("ERROR: MarchExtenderPlugin.calculateFastestTroopsForTransport - " + e);
					throw e;
				}
			},
			calculateFastestTroopsForTransportHelp: function () {
				ksx.Builder.showDialog("Truppen Berechnen", "Berechnet für die angegebenen Mengen, die schnellste Transportmöglichkeit.");
			},
			transportTemplateHelp: function () {
				ksx.Builder.showDialog("Vordefinierte Transporte", "Enthält ein Liste mit vordefinierte Transporten. Truppentrainingstransporte sind berechnet für 4 Hütten.");
			},

			atTransportTemplateChanged: function (sender) {
				if (ksxDebug) GM_log("MarchExtenderPlugin.march.transportTools.atTransportTemplateChanged(" + sender + ")");
				ui = new ksx.koc.MarchUI();
				var selectedValue = sender.options[sender.selectedIndex].value;
				var res = selectedValue.split(",");
				ui.gold.value = ""; ksx.tools.typeKeys2(ui.gold, res[0]);
				ui.food.value = ""; ksx.tools.typeKeys2(ui.food, res[1]);
				ui.wood.value = ""; ksx.tools.typeKeys2(ui.wood, res[2]);
				ui.stone.value = ""; ksx.tools.typeKeys2(ui.stone, res[3]);
				ui.ore.value = ""; ksx.tools.typeKeys2(ui.ore, res[4]);

				ksx.plugins.MarchExtender.march.transportTools.calculateFastestTroopsForTransport();
			},
			className: "MarchExtenderPlugin+TransportTools"
		},

		attachXYPaste: function (xId, yId, func) {
			// thx (c) unchanged from [KoC Attack - Deutsch] 
			var x = document.getElementById(xId);
			if (!x) {
				//this.Log('Auto Attack: kann X Koordinaten Box nicht finden: ' + xId);
				return;
			}
			var attached = x.getAttribute('KOCpasteAttached');
			if (attached) return;
			x.setAttribute('maxlength', '20');

			var onchange = function () {
				var xValue = x.value.trim();
				var xI = /^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);
				if (xI) {
					var y = document.getElementById(yId);
					x.value = xI[1];
					y.value = xI[2];

					if (func != undefined) func(xI[0], xI[1]);
				}
			};
			x.setAttribute('KOCpasteAttached', true);
			x.addEventListener('keyup', function () { onchange(); }, false);
			x.addEventListener('change', function () { onchange(); }, false);
		},
		show: function (type, x, y, troops, res) {
			// marchType: 1-Transport, 2-Reinforce, 3-Scout, 4-Attack, 5-Reassign
			// x,y
			// troops: array[12]
			// res: array[gold,food,wood,stone,ore]
			if (ksxDebug) GM_log("MarchExtenderPlugin.newMarch(...)");
			if (type === 'repeatlast' || type === 'repeatlast!') {
				var s = GM_getValue("LastMarch_" + ksx.koc.getServerId());
				if (!s) { /*No configuration*/return; };
				var cfg = ksx.JSON.parse(s);
				type = cfg[0];
				if (!x) x = cfg[1]; // param x will overwride cfg value
				if (!y) y = cfg[2]; // param y will overwride cfg value
				troops = cfg[3];
				res = cfg[4];
				if (!type) type = 1/*Transport*/;
				ksx.tools.doUnsafeWindow("modal_attack(" + type + "," + x + "," + y + ")", true);
			}
			else {
				ksx.tools.doUnsafeWindow("modal_attack(" + type + ", '" + x + "', '" + y + "')", true);
			}
			ksx.plugins.MarchExtender.march.type = type;
			if (typeof ksx.plugins.MarchExtender.original_modal_attack === "undefined") ksx.plugins.MarchExtender.march.init(type); //WORKAROUND if hooks not enabled
			ksx.plugins.MarchExtender.march.fill(type, x, y, troops, res);
		},
		init: function (type) {
			if (typeof type == "undefined") type = ksx.koc.getCurrentMarchType();

			//add tab handler
			for (var i = 1; i < 6; i++) document.getElementById('modal_attack_tab_' + i).addEventListener('click', ksx.plugins.MarchExtender.march.atMarchTypeChanged, false);
			//add "March" click handler
			document.getElementById('btnMarch').addEventListener('click', ksx.plugins.MarchExtender.march.atMarchClicked, false);


			//TODO: create option
			ksx.tools.uncheck("modal_attack_supplyfilter_checkbox");

			//TODO: create option
			ksx.plugins.MarchExtender.march.transportTools.show((type == 1/*Transport*/ || type == 2/*Reinforce*/ || type == 5/*Reassign*/));

			if (!ksx.compatibility.disableMarchXYPaste)
				ksx.plugins.MarchExtender.march.attachXYPaste('modal_attack_target_coords_x', 'modal_attack_target_coords_y');
		},
		saveConfig: function () {
			if (ksxDebug) GM_log("MarchExtenderPlugin.saveMarchConfig()");
			var t = ksx.plugins.MarchExtender.march.transportTools;
			ui = new ksx.koc.MarchUI();

			var cfg = [
				ui.getMarchType(),
				ui.targetCoordsX.value, ui.targetCoordsY.value,
				[ui.unitIpt1.value, ui.unitIpt2.value, ui.unitIpt3.value, ui.unitIpt4.value, ui.unitIpt5.value, ui.unitIpt6.value, ui.unitIpt7.value, ui.unitIpt8.value, ui.unitIpt9.value, ui.unitIpt10.value, ui.unitIpt11.value, ui.unitIpt12.value],
				[ui.gold.value, ui.food.value, ui.wood.value, ui.stone.value, ui.ore.value],
				[]
			];

			var s = ksx.JSON.stringify(cfg);
			/*if (ksxDebug) */GM_log("Save 'LastMarch': " + s);
			GM_setValue("LastMarch_" + ksx.koc.getServerId(), s);
		},

		fill: function (type, x, y, troops, res) {
			var ui = new ksx.koc.MarchUI();
			if (!type) type = 1;

			if (type == 1/*Transport*/) {
				ksx.tools.uncheck(ui.supplyfilterCheckbox);
			}

			ui.unitIpt1.value = ""; ksx.tools.typeKeys2(ui.unitIpt1, troops[0]);
			ui.unitIpt2.value = ""; ksx.tools.typeKeys2(ui.unitIpt2, troops[1]);
			ui.unitIpt3.value = ""; ksx.tools.typeKeys2(ui.unitIpt3, troops[2]);
			ui.unitIpt4.value = ""; ksx.tools.typeKeys2(ui.unitIpt4, troops[3]);
			ui.unitIpt5.value = ""; ksx.tools.typeKeys2(ui.unitIpt5, troops[4]);
			ui.unitIpt6.value = ""; ksx.tools.typeKeys2(ui.unitIpt6, troops[5]);
			ui.unitIpt7.value = ""; ksx.tools.typeKeys2(ui.unitIpt7, troops[6]);
			ui.unitIpt8.value = ""; ksx.tools.typeKeys2(ui.unitIpt8, troops[7]);
			ui.unitIpt9.value = ""; ksx.tools.typeKeys2(ui.unitIpt9, troops[8]);
			ui.unitIpt10.value = ""; ksx.tools.typeKeys2(ui.unitIpt10, troops[9]);
			ui.unitIpt11.value = ""; ksx.tools.typeKeys2(ui.unitIpt11, troops[10]);
			ui.unitIpt12.value = ""; ksx.tools.typeKeys2(ui.unitIpt12, troops[11]);

			ui.targetCoordsX.value = ""; ksx.tools.typeKeys2(ui.targetCoordsX, x);
			ui.targetCoordsY.value = ""; ksx.tools.typeKeys2(ui.targetCoordsY, y);

			if (type == 1/*Transport*/ || type == 2/*Reinforce*/ || type == 5/*Reassign*/) {
				ui.gold.value = ""; ksx.tools.typeKeys2(ui.gold, res[0]);
				ui.food.value = ""; ksx.tools.typeKeys2(ui.food, res[1]);
				ui.wood.value = ""; ksx.tools.typeKeys2(ui.wood, res[2]);
				ui.stone.value = ""; ksx.tools.typeKeys2(ui.stone, res[3]);
				ui.ore.value = ""; ksx.tools.typeKeys2(ui.ore, res[4]);
			}

			if (type == 4/*Attack*/) {
				// ui.attackKnight.selectedIndex = ui.attackKnight.options.length - 1; // select last
			}
		},

		atMarchTypeChanged: function (evt) {
			if (ksxDebug) GM_log("MarchExtenderPlugin.atMarchTypeChanged");
			type = parseInt(evt.target.id.substr(17)); //modal_attack_tab_{marchType}
			var ui = new ksx.koc.MarchUI();

			//TODO create config option
			ksx.plugins.MarchExtender.march.transportTools.show((type == 1/*Transport*/ || type == 2/*Reinforce*/ || type == 5/*Reassign*/));

			if (type == 3/*Scout*/) {
				//TODO create config option	
				ui.unitIpt3.value = ""; ksx.tools.typeKeys2(ui.unitIpt3, 1);
			}
			if (type == 1/*Transport*/) {
				//TODO create config option
				ksx.tools.uncheck(ui.supplyfilterCheckbox);
			}

			switch (type) {
				case 1/*Transport*/: break;
				case 2/*Reinforce*/: break;
				case 3/*Scout    */: break;
				case 4/*Attack   */: break;
				case 5/*Reassign */: break;
				default: break;
			}
		},
		atMarchClicked: function () {
			if (ksxDebug) GM_log("MarchExtenderPlugin.atMarchClicked()");
			ksx.plugins.MarchExtender.march.saveConfig();
		},

		className: "MarchExtenderPlugin+March"
	},

	this.unsafeModalAttackHook = function (marchType, x, y) {
		//if(ksxDebug) GM_log("MarchExtenderPlugin.unsafeModalAttackHook(..)");

		/*ORIGINAL CALL*/
		var ret = ksx.plugins.MarchExtender.original_modal_attack(marchType, x, y);
		/*WORKAROUND  [Power]*/
		if (typeof attackDialog_hook === "function") attackDialog_hook(marchType, x, y); // 

		ksx.plugins.MarchExtender.march.init(marchType);
		return ret;
	};
	
	this.unsafeModalAttackCheckHook=function() {
		/*WORKAROUND [Power]*/ 
		if(typeof modalAttack_hook === "function") modalAttack_hook();
		/*NEWCALL*/ 
		ksx.plugins.MarchExtender.saveMarchConfig();
		/*ORIGINALCALL*/
		var ret=ksx.plugins.MarchExtender.original_modal_attack_check();
		return ret;
	};

	this.setHooks = function () {
		if(ksxDebug) GM_log("MarchExtenderPlugin.setHooks");
		if (typeof unsafeWindow.modal_attack != "function") {/*UUPS*/GM_log("Check KoC: 'modal_attack' not found!");return;}

		thisPlugin.original_modal_attack = unsafeWindow.modal_attack;
		unsafeWindow.modal_attack = this.unsafeModalAttackHook;

//      not used! event handler attached instead
//		thisPlugin.original_modal_attack_check = unsafeWindow.modal_attack_check;
//		unsafeWindow.modal_attack_check = this.unsafeModalAttackCheckHook;
	};
	
	// @PDX: Schau mal bitte, wenn ich meine hooks setze, funktionieren deine hooks nicht mehr.
	// die WORKAROUNDs rufen als Notlösung zwar deine Funktionen auf, aber eine sauber Lösung  ist das leider nicht.
	thisPlugin.setHooks();

	if (ksx.plugins.Toolbar != null) {
		var ksxMarchExtenderRepeatOpen = document.getElementById("ksxMarchExtenderRepeatOpen");
		if (ksxMarchExtenderRepeatOpen) ksxMarchExtenderRepeatOpen.addEventListener("click", function () { thisPlugin.march.show('repeatlast', '', '', [], []); }, false);
		var ksxMarchExtenderRepeatMarch = document.getElementById("ksxMarchExtenderRepeatMarch");
		if (ksxMarchExtenderRepeatMarch) ksxMarchExtenderRepeatOpen.addEventListener("click", function () { thisPlugin.march.show('repeatlast!', '', '', [], []); }, false);
	}
}

//function userFunctionB() {
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