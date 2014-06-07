// ==UserScript==
// @name           BvS Party House Logger
// @namespace      rvBvS
// @description    BvS Party House Logger 1.1
// @include        http://*animecubed.com/billy/bvs/partyhouse.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.1
// @history        1.1  Made script more compliant.
// ==/UserScript==

var showDialogResponse = true;

const VERSION = "1.1";
const GMSTORAGE_PATH = "BvS_PartyLogger_";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSPartyLogger", "http://rveach.romhack.org/BvS/bvs_party_house_logger.user.js", VERSION);
} catch(e) {};

function load(e) {
	try {
		GM_addStyle("div#bvsPartyLogger {background-image: url('http://rveach.romhack.org/BvS/scrollbg2.JPG'); min-width: 100px; max-width: 200px; position: fixed; bottom: 8px; right: 8px; padding: 0; border: 1px solid black; text-align: center;}");
		GM_addStyle("#bvsPartyLogger h1 {color: white; font-size: 16px; font-weight: bold; padding: 4px; margin: 0; background-image: url('http://rveach.romhack.org/BvS/scrolldark.jpg');}");

		var headerText = document.evaluate("//font//font/b/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((headerText != null) &&  (headerText.snapshotLength != 0)) {
			var title = headerText.snapshotItem(0).nodeValue;
//alert(title);
			if (title == "The First Loser") {
				doFirstLoser();
			} else if (title == "Lottery") {
				
			} else if (title == "The Big Board") {
				doBigBoard();
			} else if (title == "Over 11,000") {
				doOver11K();
			}
		}
	}
	catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

String.prototype.startsWith	= function(str) { return (this.match("^"+str) == str); }
String.prototype.trim		= function() { return this.replace(/^\s+|\s+$/g,""); }

var saveName = null;
var saveText = null;

function QueryServer(query, insaveName, insaveText) {
	saveName = insaveName;
	saveText = insaveText;

	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://rveach.romhack.org/BvS/partylogger.php',
		headers: {'Content-type' : 'application/x-www-form-urlencoded'},
		data: encodeURI(query),

		onerror: function(response) {
			alert("Party House Logger Failed!");
		},
		onload: function(response) {
			try {
				var text = response.responseText;

				if (text.startsWith("Saved;")) {
					//saved

					GM_setValue(saveName, saveText);

					if (showDialogResponse) {
						var divContent = document.createElement("div");
						divContent.id = "bvsPartyLogger";
						divContent.innerHTML = "<h1>Party House Logger</h1>Saved";
						document.body.appendChild(divContent);
					}
				} else if (text.startsWith("Exists;")) {
					GM_setValue(saveName, saveText);

					if (showDialogResponse) {
						var divContent = document.createElement("div");
						divContent.id = "bvsPartyLogger";
						divContent.innerHTML = "<h1>Party House Logger</h1>Already Saved";
						document.body.appendChild(divContent);
					}
				} else if ((text == null) || (text.length == 0)) {
					alert("Party House Logger Error:\n\nUnknown Error");
				} else if (text.length >= 200) {
					alert("Party House Logger Error:\n\nError Message too big to display!");
				} else {
					alert("Party House Logger Error:\n\n" + text);
				}
			} catch(e) {
				alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
			}
		}
	});
}

function doFirstLoser() {
	var results = document.evaluate("//center[2]/center/table/tbody/tr/td", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// FF 3: //center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/  table[2]/tbody/tr/td/table/tbody/tr/td/     center[2]/center/table/tbody/tr/td
// FF 4: //center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/a/table   /tbody/tr/td/table/tbody/tr/td/font/center[2]/center/table/tbody/tr/td
	if ((results == null) || (results.snapshotLength == 0))
		return;

	var lastsave = GM_getValue("lastfirstloser", "");
	var text = results.snapshotItem(0).textContent;
	var match;

	if (match = text.match("(\\d+)/(\\d+) \\(\\w+ - (\\d+):(\\d+)\\).*:(.*)\\((\\d+)-(\\d+) Ryo\\)\n.*\\((.*)\\): (.*)!? \\((\\d+) Ryo\\)")) {
		/*alert(text);
		alert(match[1] + "/" + match[2]);
		alert(match[3] + ":" + match[4]);
		alert(match[5]);
		alert(match[6] + " - " + match[7] + " ryo");
		alert(match[8]);
		alert(match[9] + " with " + match[10] + " ryo");//*/

		var newsave = match[1] + "/" + match[2] + " " + match[3] + ":" + match[4];

		if (lastsave != newsave) {
			var params = "";
			for (var i = 1; i < 11; i++) {
				params += ("&param" + i + "=" + match[i]);
			}

			QueryServer("game=loser" + params, "lastfirstloser", newsave);
		}
	} else {
		alert("Party House Logger Error:\n\nFailed to match text in First Loser!");
	}
}

function doLottery() {
	// var results = document.evaluate("//center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/center[2]/font/font", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// 
	// if ((results == null) || (results.snapshotLength == 0))
	// 	return;
}

function doOver11K() {
	var results = document.evaluate("//center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/font[4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// FF 3: //center/table/tbody/tr[3]/td[3]/center/table   /tbody/tr   /td/       table[2]/tbody/tr   /td   /       table/tbody/tr/td/                                      font[4]
// FF 4: //center/table/tbody/tr/   td/          table[2]/tbody/tr[2]/td/center/table   /tbody/tr[3]/td[3]/center/table/tbody/tr/td/a/table/tbody/tr/td/table/tbody/tr/td/font
	if ((results == null) || (results.snapshotLength == 0)) {
		var results = document.evaluate("//center/table/tbody/tr/td/a/table/tbody/tr/td/table/tbody/tr/td/font", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if ((results == null) || (results.snapshotLength == 0))
			return;
	}

	var lastsave = GM_getValue("lastover11k", "");
	var text = results.snapshotItem(0).textContent;
	var match;

	if (match = text.match("Most Recent Winner: (.*)")) {
		/*alert(text);
		alert(match[1]);//*/

		if (lastsave != match[1]) {
			QueryServer("game=over11k&param1=" + match[1], "lastover11k", match[1]);
		}
	} else {
		alert("Party House Logger Error:\n\nFailed to match text in Over 11,000!");
	}
}

function doBigBoard() {
	var board = document.getElementById("iitem");

	if (board == null)
		return;

	var lastsave = GM_getValue("lastbigboard", "");
	var text = board.textContent;
	var match;

	if (match = text.match("Game (\\d+) Winner: (.*) with the only throw of (\\d+)!")) {
		/*alert(text);
		alert("game #" + match[1] + ", winner " + match[2] + ", score " + match[3]);//*/

		if (lastsave != match[1]) {
			var array = text.split("\n");
			var params = "";
			for (var i = 1; i < 4; i++) {
				params += ("&param" + i + "=" + match[i]);
			}

			for (var i = 2; i < array.length; i++) {
				params += ("&param" + (i+2) + "=" + encodeURI(array[i]));
			}

			QueryServer("game=board" + params, "lastbigboard", match[1]);
		}
	} else {
		alert("Party House Logger Error:\n\nFailed to match text in Big Board!");
	}
}

var gvar = new Object();

function GM_ApiBrowserCheck() {
	if (typeof(unsafeWindow) == 'undefined') { unsafeWindow=window; }
	if (typeof(GM_log) == 'undefined') { GM_log = function(msg) { try { unsafeWindow.console.log('GM_log: ' + msg); } catch(e) {} }; }
	GM_clog = function(msg) { if (arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle = function(css) {
		var sel = document.createElement('style');
		sel.setAttribute('type','text/css');
		sel.appendChild(document.createTextNode(css));
		var hel = document.documentElement.firstChild;
		while (hel && hel.nodeName != 'HEAD') { hel=hel.nextSibling; }
		if (hel && hel.nodeName == 'HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	
	var needApiUpgrade=false;

	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera) != 'undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
	}

	if(typeof(GM_setValue) != 'undefined') {
		try {
			var gsv=GM_setValue.toString();
			if (gsv.indexOf('staticArgs') > 0) { gvar.isGreaseMonkey = true; GM_log('GreaseMonkey Api detected...'); }
			else if (gsv.match(/not\s+supported/)) { needApiUpgrade = true; gvar.isBuggedChrome = true; GM_log('Bugged Chrome GM Api detected...'); }
		} catch(e) {
			gvar.isGreaseMonkey = (typeof(GM_setValue) == 'function');
			if (gvar.isGreaseMonkey)
				GM_log('GreaseMonkey Api is assumed because of exception...');
			else
				needApiUpgrade = true;
		}
	} else {
		needApiUpgrade=true; GM_log('No GM Api detected...');
	}

	if(needApiUpgrade) {
		GM_log('Try to recreate needed GM Api...');
 		var ws = null;
		try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error

		if (ws=='object') {
			GM_log('Using localStorage for GM Api.');
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		
		if(typeof(GM_addStyle)=='undefined') { GM_addStyle=function(css) { var heads = document.getElementsByTagName("head"); if (heads.length > 0) { var node = document.createElement("style"); node.type = "text/css"; node.appendChild(document.createTextNode(css)); heads[0].appendChild(node); } } }
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			GM_log('Using XMLHttpRequest for GM Api.');
			GM_xmlhttpRequest=function(obj) {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	}
}

function waitForReady(callback) {
	var docState;
	
	try { docState = unsafeWindow.document.readyState; } catch(e) { docState = null; }
	if(docState) {
		if ((docState != 'complete') && (docState != 'interactive')) {
			window.setTimeout(waitForReady, 150, callback);
			return;
		}
	}
	
	callback();
}

GM_ApiBrowserCheck();
waitForReady(load);