(function qruiserscript(OperaStorage){
var SCRIPTMETA = new Array();
// ==UserScript==
// @name		Qruiserscript
// @description		The Qruiser userscript - Qruiser marked by One of Four ^_^
// @namespace		userscripts.org
// @version		3.2.1
SCRIPTMETA["version"]= "3.2.1";
// @include		http://www.qruiser.com/*
// @include		http://qruiser.com/*
// @include		https://www.qruiser.com/*
// @include		https://qruiser.com/*
// @include		http://userscripts.org/scripts/source/39991.meta.js
// @updateURL		https://userscripts.org/scripts/source/39991.meta.js
// @downloadURL		https://userscripts.org/scripts/source/39991.user.js
// ==/UserScript==
SCRIPTMETA["name"] = "Qruiserscript";
const SCRIPTID = 39991;
const LANGUAGE = readcookie("language");

if (window.opera) {
	// if Opera
	var operaupdate;

	if (location.href == "http://userscripts.org/scripts/source/"+SCRIPTID+".meta.js") {
		var a;
		if ((a = document.getElementsByTagName("body")[0]) && (a = a.textContent)) {
			a = a.match(/\/\/\s+@version\s+([^\r\n]+)/);
			if (a && a.length>1) {
				// update_info = lasttry;lastupdated;etag;version
				var d = new Date();
				d = Math.floor(d.getTime()/1000);
				window.opera.scriptStorage.setItem("update_info", ";"+d+";;"+a[1]);
			}
		}
		return;
	}

	OperaStorage = OperaStorage || window.opera.scriptStorage;
	if (OperaStorage) {
		// if .js and scriptStorage
		if (document.readyState != "complete") {
			// if first run
			GM_setValue = function(mykey, myvalue) {
				OperaStorage.setItem(mykey, myvalue);
			}

			GM_getValue = function(mykey, mydefault) {
				return OperaStorage.getItem(mykey) || mydefault;
			}

			GM_deleteValue = function(mykey) {
				OperaStorage.removeItem(mykey);
			}

			GM_registerMenuCommand = function() {}

			GM_xmlhttpRequest = function() {
			}

			GM_log = opera.postError;

			window.opera.addEventListener("BeforeEvent.load", function(e){if (e.event.target instanceof Document) qruiserscript(OperaStorage);}, false)
			return;
		}
		else {
			// if second run
			window.opera.removeEventListener("BeforeEvent.load", function(e){if (e.event.target instanceof Document) qruiserscript(OperaStorage);}, false);
		}
	}
	else {
		// if .user.js or no scriptStorage
		var text = LANGUAGE=="SE" ?
			unescape('F%F6r att k%F6ra ' + SCRIPTMETA["name"] + ':\n\n1. Byt namn p%E5 filen\n"' +SCRIPTID+ '.user.js" till "' +SCRIPTID+ '.js"\ni din userscripts-mapp.\n\n2. S%E4tt "User JS Storage Quota"\ntill minst 1024 i opera:config.\n\n[OK] %F6ppnar opera:config.') :
			'To run ' + SCRIPTMETA["name"] + ':\n\n1. Rename the file\n"' +SCRIPTID+ '.user.js" to "' +SCRIPTID+ '.js"\nin your userscripts folder.\n\n2. Set "User JS Storage Quota"\nto at least 1024 in opera:config.\n\n[OK] opens opera:config.';
		if (confirm(text)) {
			location.assign("opera:config#PersistentStorage|UserJSStorageQuota");
		}
		return;
	}
}
else if (location.href == "http://userscripts.org/scripts/source/"+SCRIPTID+".meta.js") {
	// Non-Opera does not need this
	return;
}

SCRIPTMETA["description"] = "The Qruiser userscript - Qruiser marked by One of Four ^_^";
SCRIPTMETA["namespace"] = "userscripts.org";

var UDM = document.getElementById('qmenu');
const REALTIME = UDM ? GM_getValue("enable_realtime_rendering", false) : false;
const DATETIME = new Date();

const MENUPREFIX = "Qruiser";
const SCRIPTURL = "http://userscripts.org/scripts/show/"+SCRIPTID;
var STARTUP;

var loggedin = !document.getElementById('loginbox');
var COLUMN_LEFT = document.getElementById("column_left");
var COLUMN_RIGHT = document.getElementById("column_right");
var COLUMN_CENTER = document.getElementById("column_center");
var LOCATION_PATHNAME = location.pathname;
var LOCATION_SEARCH = location.search;
var LOCATION_PROTOCOL = location.protocol;

var OPTIONS = new Array();
if (REALTIME) var REALTIME_FUNCTIONS = new Array();

var XPATH_CACHE = new Array();
function xpath(query, container, cacheable) {
	if (!container) container = document;

	if (cacheable && STARTUP) {
		if (!XPATH_CACHE[query]) {
			return XPATH_CACHE[query] = document.evaluate(query, container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		else {
			return XPATH_CACHE[query];
		}
	}

	return document.evaluate(query, container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}


function realtime_xpath(query, container, cacheable) {
	if (STARTUP) {
		return xpath(query, container, cacheable);
	}
	else {
		var divs = new Array();
		var len = 0;
		divs[len++] = "column_left";
		divs[len++] = "column_right";

		if (column_sections_removed) divs[len++] = "qs_column_sections_removed";

		query = "//div[@id='" + divs.join("' or @id='") + "']/" + query;

		var theresult;
		if (!column_sections_removed) {
			theresult = xpath(query);
		}
		else {
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(column_sections_removed);
			theresult = xpath(query);
			body.removeChild(column_sections_removed);
		}
		return theresult;
	}
}

function readcookie(name){
	var cname = name+"=";
	var cookies = document.cookie.split(';');

	var len = cookies.length;
	for (var i=0; i<len; i++) {
		cookies[i] = cookies[i].replace(/^\s+/,"");

		if (cookies[i].indexOf(cname) == 0) {
			return cookies[i].substring(cname.length);
		}
	}
	return null;
}

function QS_setValue(prefname, prefvalue) {
	if (prefvalue || typeof(GM_deleteValue) != "function") {
		GM_setValue(prefname, prefvalue);
	}
	else {
		GM_deleteValue(prefname);
	}
}

var documenttitles = new Array();
function title(title) {
	documenttitles[documenttitles.length] = title.replace(/^\s+|\s+$/g,"");
}

var QS_STYLE;
var QS_CACHE_STYLES = true;
function addstyle(style) {
	if (!QS_STYLE) {
		QS_STYLE = document.createElement("style");
		QS_STYLE.type = "text/css";
		if (!QS_CACHE_STYLES) document.getElementsByTagName("head")[0].appendChild(QS_STYLE);
		return QS_STYLE.appendChild( document.createTextNode(style) );
	}
	return QS_STYLE.appendChild( document.createTextNode(" "+style) );
}

function flushstyles() {
	if (QS_STYLE && QS_CACHE_STYLES) {
		document.getElementsByTagName("head")[0].appendChild(QS_STYLE);
	}
	QS_CACHE_STYLES = null;
}

function removestyle(node) {
	QS_STYLE.removeChild(node);
	if (QS_STYLE.childNodes.length == 0) {
		QS_STYLE.parentNode.removeChild(QS_STYLE);
		QS_STYLE = null;
	}
}

function previousObject(mynode) {
	do {
		mynode = mynode.previousSibling;
	} while (mynode && mynode.nodeType != 1);
	return mynode;
}

function nextObject(mynode) {
	do {
		mynode = mynode.nextSibling;

	} while (mynode && mynode.nodeType != 1);
	return mynode;
}

function xxx() {
	var xxximages = xpath("//img[starts-with(@class, 'xxx')]");
	var xxximage;
	var xxxshow = readcookie("showallpics");

	var prot = location.protocol+"//";
	var len = xxximages.snapshotLength;
	for (var i=0; i<len; i++) {
		xxximage = xxximages.snapshotItem(i);

		if (xxxshow == 0 || (xxxshow != 5 && xxxshow != parseInt( xxximage.className.substr(3) ))) {
			xxximage.src = prot+"icon.qruiser.com/images/blank.gif";
		}
		else {
			xxximage.src = unescape(xxximage.name);
		}
	}

	if (LOCATION_PATHNAME=="/photo.php") {
		var xxxbox;
		if (xxxbox = parent.frames[1].document.getElementById('showallpicsselect')) {
			var update = document.createEvent("HTMLEvents");
			update.initEvent("change", true, true);
			xxxbox.dispatchEvent(update);
		}
	}
}

function fixxxx() {
	var xxxbox;

	if (LOCATION_PATHNAME != "/photoalbum_nav.php") {
		if (xxxbox = document.getElementById('showallpicsselect')) {
			xxxbox.addEventListener("change", xxx, false);
		}
	}
	else {
		xxxbox = document.createElement('input');
		xxxbox.type = "checkbox";
		xxxbox.id = "showallpicsselect";
		xxxbox.style.display = "none";
		xxxbox.addEventListener("change", xxx, false);

		document.getElementsByTagName('body')[0].appendChild(xxxbox);
	}
}

function udm() {
	if (UDM) {
		var url = LOCATION_PATHNAME;

		if (url.indexOf("index.php") != -1)
			url = url.substring(0, url.indexOf("index.php"));
		return xpath("./li/ul/li/a[@href='"+url+"'][1] | ./li/ul/li/a[@href='"+url+"']/ancestor::li/a", UDM);
	}
}

function subnavbar() {
	var subnav;
	if (subnav = document.getElementById('subnavbar')) {
		if (subnav.getElementsByClassName) {
			subnav = subnav.getElementsByClassName("selectedbutton");
			if (subnav.length > 0) return subnav[0].textContent;
		}
		else {
			subnav = xpath("./div[@class='selectedbutton']/a", subnav);
			if (subnav.snapshotLength > 0) return subnav.snapshotItem(0).textContent;
		}
	}
}

function user() {
	if (COLUMN_CENTER) {
		return xpath("./div[contains(@class, 'insertmember')][1]/div[@class='link']/a", COLUMN_CENTER);
	}
	else {
		return xpath(".//div[contains(@class, 'insertmember')][1]/div[@class='link']/a");
	}
}

function fiximages() {
	var prot = location.protocol+"//";
	var imgs = xpath("//img[@src='"+prot+"icon.qruiser.com/images/blank.gif' or starts-with(@src, '/thumbcorners.php')]");
	var thisurl, thisimage, thisparent;
	var xxxshow = loggedin ? readcookie("showallpics") : 0;
	var URLPATTERN = /url\(\s*["|']*([^"')]*)["|']*\s*\)/;

	var len = imgs.snapshotLength;
	for (var i=0; i<len; i++){
		thisimage = imgs.snapshotItem(i);
		thisurl = null;

		if (thisimage.className!="attachedicon") {
			if (!thisimage.style || !(thisurl = URLPATTERN.exec(thisimage.style.backgroundImage))) {
				thisparent = thisimage;
				while (thisparent = thisparent.parentNode) {
					if (thisparent.style && (thisurl = URLPATTERN.exec(thisparent.style.backgroundImage))) {
						thisparent.style.backgroundImage = 'none';
						break;
					}
				}
			}
		}
		else {
			thisurl = URLPATTERN.exec(window.getComputedStyle(thisimage, "").backgroundImage);
		}

		if (thisurl && (thisurl = thisurl[1])) {
			if (thisimage.className.indexOf("xxx") != 0) {
				thisimage.src = thisurl;
				thisimage.style.backgroundImage = 'none';
			}
			else {
				if (xxxshow == 0 || (xxxshow != 5 && xxxshow != parseInt( thisimage.className.substr(3) ))) {
					thisimage.src = prot+"icon.qruiser.com/images/blank.gif";
				}
				else {
					thisimage.src = thisurl;
				}
				thisimage.style.backgroundImage = "url('"+prot+"icon.qruiser.com/images/xxxflowers.gif')";
				thisimage.name = escape(thisurl);
			}
		}
	}
}


function fixaddscribblelinks() {
	if (COLUMN_CENTER && LOCATION_SEARCH.indexOf("addscribble=1") != -1) {
		var a = xpath(".//a[contains(@href, 'addscribble=1') and contains(@href, 'page=')]", COLUMN_CENTER);
		var b;
		var len = a.snapshotLength;
		for (var i=0; i<len; i++){
			b = a.snapshotItem(i);
			b.href = b.href.replace("addscribble=1&", "");
			b.href = b.href.replace("addscribble=1", "");
		}
	}
}

function fix_quotes(text) {
	text = text.split("");
	var change;
	for (var i=0; i<text.length; i++) {
		if (text[i] == '"' || text[i] == "'") {
			change = false;

			if (i == 0 || !/[a-zåäö0-9]/i.test(text[i-1])) {
				// start
				change = true;
			}
			else if (i+1 == text.length || !/[a-zåäö0-9]/i.test(text[i+1])) {
				// end
				change = true;
			}

			if (change) {
				switch (text[i]) {
					case '"':
						text[i] = "'";
						break;
					case "'":
						text[i] = '"';
						break;
				}
			}
		}
	}
	text = text.join("");

	return text;
}

function format_toolbars_insert(e) {
	var target = e.target;

	var text, target_value;
	switch (target.nodeName.toLowerCase()) {
		case "div":
			return;
		case "button":
			text = target.parentNode.nextSibling;
			target_value = target.value;
			break;
		default:
			text = target.parentNode;
			target_value = text.value;
			text = text.parentNode.nextSibling;
	}

	var patt;

	var selectstart = text.selectionStart;
	var selectend = text.selectionEnd;

	var selectscrolltop = text.scrollTop;
	var selectscrollleft = text.scrollLeft;

	var textstart = text.value.substring(0, selectstart);
	var textchange = text.value.substring(selectstart, selectend);
	var textend = text.value.substring(selectend);


	var whitespace1 = textchange.match(/^(\s*)/);
	var whitespace2 = textchange.match(/(\s*)$/);
	textstart = textstart + whitespace1[1];
	textchange = textchange.substring(whitespace1[1].length, textchange.length - whitespace2[1].length);
	textend = whitespace2[1] + textend;


	var extra = null;

	var buttontext = target.textContent;
	if (buttontext != '"') {
		textstart = textstart + "[" + buttontext;
		textend = "[/" + buttontext + "]" + textend;

		if (target_value != "") {
			textstart = textstart + "=" + textchange;

			switch (target_value) {
				case "URL":
					patt = new RegExp(/^(http[s]*|ftp):\/\/.+/i);
					break;
				case "MAIL":
					patt = new RegExp(/^\w+@\S+\.\S+$/);
					break;
				case "#":
					patt = new RegExp(/^\d+$/);
					break;
				default:
					break;
			}

			if (patt && !patt.test(textchange)) {
				extra = true;
			}
		}

		textstart = textstart + "]";
	}
	else {
		textstart = textstart + '"';
		textend = '"' + textend;

		textchange = fix_quotes(textchange);
	}

	text.value = textstart+textchange+textend;

	if (!extra) {
		selectstart = textstart.length;
		selectend = selectstart + textchange.length;
	}
	else {
		selectstart = textstart.length - textchange.length - 1;
		selectend = selectstart - 1;
	}

	text.selectionStart = selectstart;
	text.selectionEnd = selectstart+textchange.length;

	text.scrollTop = selectscrolltop;
	text.scrollLeft = selectscrollleft;

	// fake input event on the text area so that registered event handlers will fire, if any (e.g. the text counter)
	var update = document.createEvent("HTMLEvents");
	update.initEvent("input", true, true);
	text.dispatchEvent(update);

	var form = text.form;
	if (form && form.scrollIntoView) form.scrollIntoView();

	text.focus();
}

OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa verktygsf%E4lt f%F6r formatering av textf%E4lt (kr%E4ver Guld)"):
	"Show toolbars for formating of textareas (requires Gold)",
	"enable_format_toolbars"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_format_toolbars"] = format_toolbars;
var format_toolbars_active;
function format_toolbars() {
	var textformat;
	if ((textformat = document.getElementById('textformat_text') || document.getElementById('text_format_text'))) {
		var xpather = ".//textarea[@name='body' or @name='description' or starts-with(@name, 'body_')]";

		if (GM_getValue("enable_format_toolbars", false) && !format_toolbars_active) {
			var textareas = xpath(xpather, COLUMN_CENTER);

			var hola, toolbar;
			var len = textareas.snapshotLength;
			for (var i=0; i<len; i++) {
				hola = textareas.snapshotItem(i);

				if (!toolbar) {
					var bs = xpath(".//b[not(starts-with(text(), '[/')) and starts-with(text(), '[')]", textformat);

					toolbar = document.createElement('div');
					toolbar.className = "qs_format_toolbar";
					var accesskeys = "";

					var a, b, c, d, e, buttonname, mybutton, buttonextra, newstuff;
					var len2 = bs.snapshotLength;
					for (var j=0; j<len2; j++) {
						c = bs.snapshotItem(j);
						buttonname = c.textContent; // use regexp to get button-text and button-extra
						mybutton = document.createElement("button");
						mybutton.setAttribute("type", "button");
						d = c.nextSibling;
						e = d.nextSibling;
						mybutton.title = buttonname + d.nodeValue + e.textContent;
						buttonname = buttonname.match(/\[([A-Z0-9-]+)=?(.*)\]/i);
						buttontext = buttonname[1];
						buttonextra = buttonname[2];

						a = null;
						if (buttontext.length == 1) {
							a = buttontext;
						}
						else {
							for (var k=0; k<buttontext.length; k++) {
								b = buttontext.substr(k, 1);
								if (accesskeys.indexOf(b) == -1) {
									a = b;
									break;
								}
							}
						}
						if (a) {
							mybutton.setAttribute("accesskey", a);
							mybutton.title += "          \nAlt+Shift+"+a;
							accesskeys += a;
							c.parentNode.insertBefore(document.createTextNode(" (Alt+Shift+"+a+")"), nextObject(e));
						}

						switch (buttontext.toUpperCase()) {
							case "B":
							case "I":
							case "U":
								newstuff = document.createElement(buttontext);
								newstuff.textContent = buttontext;
								mybutton.appendChild(newstuff);
								break;
							default:
								mybutton.textContent = buttontext;
						}

						switch (buttonextra) {
							case "":
								mybutton.value = "";
								break;
							case "##":
								mybutton.value = "#";
								break;
							default:
								buttontext = buttontext.toUpperCase();
								switch (buttontext) {
									case "MAIL":
									case "URL":
										mybutton.value = buttontext;
										break;
									default:
										mybutton.value = "*";
								}
						}
						toolbar.appendChild(mybutton);
					}
					accesskeys = null;
					mybutton = document.createElement("button");
					mybutton.setAttribute("type", "button");
					mybutton.appendChild( document.createTextNode('"') );
					mybutton.title = LANGUAGE=="SE" ? '"Citat"' : '"Quotation"';
					toolbar.appendChild(mybutton);
				}
				else {
					toolbar = toolbar.cloneNode(true);
				}
				toolbar.addEventListener("click", format_toolbars_insert, false);
				hola.parentNode.insertBefore(toolbar, hola);
			}
			format_toolbars_active = addstyle(".qs_format_toolbar button {margin: 0;}");
		}
		else if (!GM_getValue("enable_format_toolbars", false) && format_toolbars_active) {
			var textareas = xpath(xpather, COLUMN_CENTER);
			var hola;
			var len = textareas.snapshotLength;
			for (var i=0; i<len; i++) {
				hola = textareas.snapshotItem(i);
				hola.parentNode.removeChild( hola.previousSibling );
			}

			var bs = xpath(".//b[starts-with(text(), '[/')]", textformat);
			len = bs.snapshotLength;
			for (i=0; i<len; i++) {
				hola = bs.snapshotItem(i);
				hola.parentNode.removeChild(nextObject(hola).previousSibling);
			}

			removestyle(format_toolbars_active);
			format_toolbars_active = null;
		}
	}
}


function text_counters_update() {
	var textarea = text_counters_array[this.name];
	var maxlength = textarea[0];

	if (maxlength) {
		var length = this.value.length;

		if (length <= maxlength) {
			if (textarea[1]) { // strong	
				var parent = textarea[1].parentNode;

				parent.appendChild(textarea[2]);
				parent.removeChild(textarea[1]);

				text_counters_array[this.name][1] = null;
			}
		}
		else {
			if (!textarea[1]) { // strong
				var strong = document.createElement("strong");

				textarea[2].parentNode.appendChild(strong);
				strong.appendChild(textarea[2]);

				text_counters_array[this.name][1] = strong;
			}
		}
		textarea[2].nodeValue = length+"/"+maxlength+" ("+(maxlength-length)+")";
	}
	else {
		textarea[2].nodeValue = this.value.length;
	}
}

OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa teckenr%E4knare f%F6r textf%E4lt"):
	"Show character counters for textareas",
	"enable_text_counters"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_text_counters"] = text_counters;
var text_counters_active;
var text_counters_array;
function text_counters() {
	if (GM_getValue("enable_text_counters", false) && !text_counters_active) {
		text_counters_array = new Array();

		var textareas = document.getElementsByTagName('textarea');
		var len = textareas.length;
		for (var i=0; i<len; i++) {
			if (!textareas[i].disabled) {
				div = document.createElement("div");

				text_counters_array[textareas[i].name] = new Array();
				text_counters_array[textareas[i].name][0] = parseInt(textareas[i].getAttribute("maxlength"));
				text_counters_array[textareas[i].name][1] = null;
				text_counters_array[textareas[i].name][2] = div.appendChild( document.createTextNode("") );

				text_counters_update.call(textareas[i]);
				textareas[i].parentNode.insertBefore(div, textareas[i].nextSibling);

				textareas[i].addEventListener("input", text_counters_update, false);
			}
		}
		text_counters_active = true;
	}
	else if (!GM_getValue("enable_text_counters", false) && text_counters_active) {
		var textareas = document.getElementsByTagName('textarea');
		var len = textareas.length;
		for (var i=0; i<len; i++) {
			textareas[i].removeEventListener("input", text_counters_update, false);

			if (!text_counters_array[textareas[i].name][1]) {
				text_counters_array[textareas[i].name][2].parentNode.parentNode.removeChild(text_counters_array[textareas[i].name][2].parentNode);
			}
			else {
				text_counters_array[textareas[i].name][1].parentNode.parentNode.removeChild(text_counters_array[textareas[i].name][1].parentNode);
			}
		}
		text_counters_array = null;
		text_counters_active = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa inledningar till diskussioner"):
	"Show introductions to discussions",
	"enable_introductions"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_introductions"] = introductions;
var introductions_active;
function introductions() {
	switch (LOCATION_PATHNAME) {
		case "/forum/discussions/":
		case "/clubs/clubdiscuss.php":
		case "/clubs/club.php":
			if (COLUMN_CENTER) {
				var xpather = ".//div[@class='list']/div/a[@title][1]";

				if (GM_getValue("enable_introductions", false) && !introductions_active) {
					var a = xpath(xpather, COLUMN_CENTER);
					var b, c, d;
					var len = a.snapshotLength;
					for (var i=0; i<len; i++) {
						b = a.snapshotItem(i);
//						if (b.href != "" && b.title != "") {
							d = document.createElement('div');
							c = document.createElement('hr');
							d.appendChild(c);
							c = document.createTextNode( b.title );
							d.appendChild(c);
							b.parentNode.appendChild(d);
//						}
					}
					introductions_active = true;
				}
				else if (!GM_getValue("enable_introductions", false) && introductions_active) {
					var a = xpath(xpather);
					var len = a.snapshotLength;
					for (var i=0; i<len; i++) {
						b = a.snapshotItem(i);
						b.parentNode.removeChild( b.parentNode.childNodes[ b.parentNode.childNodes.length-1 ] );
					}
					introductions_active = null;
				}
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape((!REALTIME?"Ta bort":"D%F6lj")+" \"mobile.qruiser.com\"-bilden"):
	(!REALTIME?"Remove":"Hide")+" the \"mobile.qruiser.com\" image",
	"remove_wapimage"
);
if (REALTIME) REALTIME_FUNCTIONS["remove_wapimage"] = wapimage;
var wapimage_parent;
var wapimage_nextsibling;
var wapimage_node;
function wapimage() {
	if (GM_getValue("remove_wapimage", false) && !wapimage_parent && COLUMN_LEFT) {
		var wap = realtime_xpath(".//img[@src='"+location.protocol+"//icon.qruiser.com/images/mobile_qruiser.png'][1]", COLUMN_LEFT);

		if (wap.snapshotLength > 0) {
			var wapimg = wap.snapshotItem(0);

			if (!REALTIME) {
				wapimg.parentNode.removeChild(wapimg);
			}
			else {
				wapimage_parent = wapimg.parentNode;
				wapimage_nextsibling = wapimg.nextSibling;
				wapimage_node = wapimage_parent.removeChild(wapimg);
			}

		}
	}
	else if (!GM_getValue("remove_wapimage", false) && wapimage_parent) {
		wapimage_parent.insertBefore(wapimage_node, wapimage_nextsibling);
		wapimage_parent = wapimage_nextsibling = wapimage_node = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("L%E4gg till datum och tid i dokumentets titel"):
	"Append date and time to the document\'s title",
	"append_datetime"
);
if (REALTIME) REALTIME_FUNCTIONS["append_datetime"] = fixtitle;


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa l%E4nkar f%F6r sparande av filmer i Flash Video-format (.flv)"):
	"Show links for saving films in Flash Video format (.flv)",
	"enable_film_save_link"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_film_save_link"] = film_save_link;
var film_save_link_active;
function film_save_link() {
	if (GM_getValue("enable_film_save_link", false) && !film_save_link_active) {
		var myobjects = xpath(".//object/param[@name='flashvars']", COLUMN_CENTER, true);

		var newElement, newA, gunnarlisa, hola, mylinks;
		var goo = LANGUAGE == "SE" ? "Spara filmen" : "Save film";
		var theclasses = "qs_film_save_link movieicon";
		var prot = location.protocol+"//";
		var len = myobjects.snapshotLength;
		for (var i=0; i<len; i++) {
			hola = myobjects.snapshotItem(i);
			gunnarlisa = hola.value;


			var jopp;
			jopp = gunnarlisa.indexOf("flvMovieURL=");
			if (jopp != -1) {
				gunnarlisa = prot+"video.qruiser.com/" + gunnarlisa.substring(jopp+12, gunnarlisa.indexOf("&", jopp));				
			}
			else if ((jopp = gunnarlisa.indexOf("file=")) && jopp != -1) {
				gunnarlisa = gunnarlisa.substring(jopp+5, gunnarlisa.indexOf("&", jopp));
				gunnarlisa = unescape(gunnarlisa);				
				hola = hola.parentNode;
			}


			if (!newElement) {
				newElement = document.createElement('div');
				newA = document.createElement("a");
				newA.href = gunnarlisa;
				newA.textContent = goo;
				newElement.appendChild(newA);
			}
			else {
				newElement = newElement.cloneNode(true);
				newElement.firstChild.href = gunnarlisa;
			}

			if (LOCATION_PATHNAME != "/showmovies.php") {
				newElement.className = theclasses + " smalltext";

				hola = hola.parentNode;
				if (gunnarlisa = hola.nextSibling) {
					hola.parentNode.insertBefore(newElement, gunnarlisa);
				}
				else {
					hola = hola.parentNode;
					hola.parentNode.insertBefore(newElement, hola.nextSibling);
				}
			}
			else if (COLUMN_CENTER) {
				newElement.className = theclasses;

				mylinks = xpath("./following-sibling::div/span[@class='smalltext']", hola.parentNode);

				if (mylinks.snapshotLength > 0) {
					hola = mylinks.snapshotItem(0);
					hola.parentNode.insertBefore(newElement, hola.nextSibling);
				}
				else {
					hola = hola.parentNode;
					hola.parentNode.insertBefore(newElement, hola.nextSibling);
				}
			}
		}

		if (len > 0) {
			var mystyle = ".qs_film_save_link {background-position: center left; background-repeat: no-repeat; padding-left: " + (12+3) + "px; ";

			if (LOCATION_PATHNAME != "/showmovies.php") {
				mystyle += "float: right;} .qs_film_save_link + div {clear: ";

				if (LOCATION_PATHNAME != "/showmovie_hq.php") {
					mystyle += "none;} div[onclick=\"toggleAbuse(\'abuse_report_video\');\"] {clear: right;}";
				}
				else {
					mystyle += "right;}";
				}
			}
			else if (COLUMN_CENTER) {
				mystyle += "margin: 10px 0 0 0;}";
			}

			film_save_link_active = addstyle(mystyle);
		}
	}
	else if (!GM_getValue("enable_film_save_link", false) && film_save_link_active) {
		var myobjects = xpath(".//div[contains(@class, 'qs_film_save_link')]", COLUMN_CENTER);

		var len = myobjects.snapshotLength;
		for (var i=0; i<len; i++) {
			hola = myobjects.snapshotItem(i);
			hola.parentNode.removeChild( hola );
		}

		removestyle(film_save_link_active);
		film_save_link_active = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("S%F6k efter skriptuppdateringar automatiskt (rekommenderas)"):
	"Search for script updates automatically (recommended)",
	"enable_autoupdate"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_autoupdate"] = autoupdate;
var autoupdate_div;
var autoupdate_style;
function autoupdate_newversion() {
	if (UDM && COLUMN_CENTER) {
		autoupdate_div = document.createElement('div');
		autoupdate_div.id = "qs_autoupdate";

		var mystyle = "#qs_autoupdate {margin: 0; padding: 0;} #qs_autoupdate a {text-decoration: underline; padding: 1em; margin: 1em; display: block; border: 4px double " + window.getComputedStyle(COLUMN_CENTER, null).color + ";}";

		var a = document.createElement('a');
		a.textContent = LANGUAGE == "SE" ? unescape("Uppdatering av Qruiserscript tillg%E4nglig!") : "Update for Qruiserscript available!";
		autoupdate_style = addstyle(mystyle);
		a.addEventListener("click", function () { this.parentNode.parentNode.removeChild(this.parentNode); removestyle(autoupdate_style); autoupdate_div = null; if (update_div) return; fetchupdate(); }, false);
		autoupdate_div.appendChild(a);

		insertandscrolltodialog(autoupdate_div, true);
	}
}

function autoupdate() {
	if (GM_getValue("enable_autoupdate", false)) {
		fetchupdate(null, true);
	}
	else {
		if (autoupdate_div) {
			autoupdate_div.parentNode.removeChild(autoupdate_div);
			autoupdate_div = null;			
		}
	}
}

var update_div;
var update_message;

function fetchupdate(nothing, auto) {
	if (!auto && update_div) return;

	if (autoupdate_div) {
		autoupdate_div.parentNode.removeChild(autoupdate_div);
		autoupdate_div = null;			
	}

	if (!auto) {
		update_div = document.createElement('div');

		var text = LANGUAGE == "SE" ? unescape("S%F6ker efter uppdateringar") : "Searching for updates";
		var myh2 = document.createElement("h2");
		myh2.textContent = text;
		update_div.appendChild(myh2);

		update_message = update_div.appendChild( document.createElement('p') );

		text = LANGUAGE == "SE" ? unescape("Kontaktar") : "Contacting";

		update_message.appendChild( document.createTextNode(text+" ") );
		var mya = document.createElement('a');
		mya.href = SCRIPTURL;
		mya.textContent = "userscripts.org";
		update_message.appendChild(mya);
		update_message.appendChild( document.createTextNode("...") );


		update_div.appendChild(closebutton(function (){ this.parentNode.parentNode.removeChild(this.parentNode); update_div = null; }));
		
		update_div.appendChild(document.createElement('br'));
		update_div.appendChild(document.createElement('br'));

		insertandscrolltodialog(update_div);
	}
	

	// update_info = lasttry;lastupdated;etag;version
	var update_info = GM_getValue("update_info", ";;;").split(";");
	var d = new Date();

	if (auto) {
		if (GM_getValue("version", "") < update_info[3]) {
			autoupdate_newversion();
			return;
		}
		if (update_info[0] == "") {	// lasttry
			// No update in progress
			var d2 = new Date(update_info[1]*1000);	// lastupdated

			if (d.toDateString() == d2.toDateString()) {
				// The same day
				return;
			}
			if (d.getDay() != 1) {
				// Not monday, one last thing left

				d2.setHours(0,0,0,0);	// UTC??
				d.setHours(0,0,0,0);

				//if (update_info[1]*1000 + 60*60*24*7*1000 > d.getTime()) {
				if (d2.getTime() + 60*60*24*7*1000 > d.getTime()) {
					// One week haven't passed
					return;
				}
			}
			// Not the same day, monday or one week have passed
		}
		else if (update_info[0]*1000 + 60*60*1000 > d.getTime()) {
			// Already trying to update, give it time
			return;
		}
	}
	GM_setValue("update_info", Math.floor(Date.parse(d)/1000)+";"+update_info[1]+";"+update_info[2]+";"+update_info[3]);

	if (!window.opera) {
		var headerArray = new Array();
		if (auto && update_info[2] != "" && update_info[3] != "") {
			// If auto and if Etag and if version is set
			// Only auto updates attempt to use If-None-Match
			headerArray = {
				"If-None-Match":update_info[2]
			};
		}

		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+SCRIPTID+".meta.js",
			headers: headerArray,
			onerror: function(response) {
				parseupdate(response, auto);
			},
			onload: function(response) {
				parseupdate(response, auto);
			}
		});
	}
	else {
		operaupdate = document.createElement("iframe");
		operaupdate.src = "http://userscripts.org/scripts/source/"+SCRIPTID+".meta.js";
		operaupdate.style.height = "0";
		operaupdate.style.width = "0";
		operaupdate.addEventListener("load", function(){parseupdate(null, auto);}, false);

		document.getElementsByTagName("body")[0].appendChild(operaupdate);
	}
}

function parseupdate(response, auto) {
	var newversion = "";

	if (!window.opera) {
		var d = new Date();
		d = Math.floor(d.getTime()/1000);

		switch (response.status) {
			case 200:
				var etag = "";
				var a;

				a = response.responseText;
				if (a) {
					a = a.match(/\/\/\s+@version\s+([^\r\n]+)/);
					if (a && a.length>1) {
						newversion = a[1];
					}
				}

				a = response.responseHeaders;
				if (a) {
					a = a.match(/ETag: ([^\r\n]+)/i);
					if (a && a.length>1) {
						etag = a[1];
					}
				}

				GM_setValue("update_info", ";"+d+";"+etag+";"+newversion);
				break;
			case 304:
				var update_info = GM_getValue("update_info", ";;;").split(";");
				newversion = update_info[3];
				GM_setValue("update_info", ";"+d+";"+update_info[2]+";"+newversion);
				break;
		}	
	}
	else if (operaupdate) {
		operaupdate.parentNode.removeChild(operaupdate);
		operaupdate = null;

		var update_info = GM_getValue("update_info", ";;;").split(";");
		newversion = update_info[3];
	}

	if (newversion != "") {
		if (GM_getValue("version", "") < newversion) {
			if (!auto) {
				var text = LANGUAGE == "SE" ? unescape("Uppdatering tillg%E4nglig!") : "Update available!";
				var text2 = LANGUAGE == "SE" ? unescape("Installera") : "Install";
				var text3 = LANGUAGE == "SE" ? unescape("version") : "version";

				if (update_div) {
					var myp = document.createElement('p');
					var mystrong = document.createElement('strong');
					mystrong.textContent = text;
					myp.appendChild(mystrong);
					update_message.parentNode.replaceChild(myp, update_message);

					update_message = myp;
					myp = document.createElement('p');
					var mya = document.createElement('a');
					mya.href = navigator.userAgent.indexOf("Firefox") != -1 ? 'http://userscripts.org/scripts/source/'+SCRIPTID+'.user.js' : 'http://userscripts.org/scripts/show/'+SCRIPTID;
					mya.textContent = text2+' '+SCRIPTMETA["name"]+' '+text3+' '+newversion;
					myp.appendChild(mya);
					update_message.parentNode.insertBefore(myp, update_message.nextSibling);
				}
			}
			else {
				autoupdate_newversion();
			}

		}
		else {
			if (!auto && update_div) {
				text = LANGUAGE == "SE" ? unescape("Ingen uppdatering tillg%E4nglig.") : "No update available.";
				update_message.textContent = text;
			}
		}
	}
	else {
		if (!auto && update_div) {
			text = LANGUAGE == "SE" ? unescape("Ett fel uppstod, f%F6rs%F6k igen senare.") : "An error occurred, try again later.";
			update_message.textContent = text;
		}
	}

	if (!auto && update_div) {
		scrollToElement(update_div);
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("L%E4nka [antal inl%E4gg] till diskussionens sista sida"):
	"Link [number of entries] to the discussion's last page",
	"enable_last_discussion_page_link"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_last_discussion_page_link"] = last_discussion_page_link;

function last_discussion_page_link_add(data, theobject) {
	var number = data.match(/([0-9]+)/);
	if (number) number = number[1]
	else number = 0;

	var page = Math.ceil(number / 25);
	if (page==0) page = 1;

	var newElement = document.createElement('a');
	newElement.href = theobject.href + "&page=" + page;
	newElement.textContent = number;

	theobject.parentNode.insertBefore(newElement, theobject.nextSibling);
	theobject.parentNode.insertBefore(document.createTextNode(" ["), theobject.nextSibling);
	theobject.parentNode.insertBefore(document.createTextNode("]\n"), newElement.nextSibling);
}

var last_discussion_page_link_active;
function last_discussion_page_link() {
	var xpather = ".//a[(starts-with(@href, '/forum/discussions/?') and contains(@href, 'view=')) and not(contains(@href, 'page='))]";
	var xpather2 = ".//a[(starts-with(@href, '/forum/discussions/?') and contains(@href, 'view=') and not(contains(@href, 'page='))) or (starts-with(@href, '/clubs/clubdiscuss.php?') and contains(@href, 'view=') and not(contains(@href, 'page=')))]";

	var mylinks, i, hoho;
	if (GM_getValue("enable_last_discussion_page_link", false) && !last_discussion_page_link_active) {
		if (COLUMN_RIGHT) {
			mylinks = realtime_xpath(xpather, COLUMN_RIGHT);
			var len = mylinks.snapshotLength;
			for (i=0; i<len; i++) {
				hoho = mylinks.snapshotItem(i);
				if (hoho.childNodes.length > 2) {
					hoho = hoho.childNodes[2];
					a = hoho.nodeValue.lastIndexOf(" [");
					data = hoho.nodeValue.substring(a);
					hoho.nodeValue = hoho.nodeValue.substring(0, a);
					last_discussion_page_link_add(data, hoho.parentNode);
				}
			}
		}

		if (COLUMN_CENTER) {
			switch (LOCATION_PATHNAME) {
				case "/forum/discussions/":
				case "/clubs/clubdiscuss.php":
				case "/clubs/club.php":
				case "/yourdiscussions.php":
					mylinks = xpath(xpather2, COLUMN_CENTER);
					var len = mylinks.snapshotLength;
					for (i=0; i<len; i++) {
						hoho = mylinks.snapshotItem(i);

						hoho2 = hoho.nextSibling;

						if (hoho2 && hoho2.nodeValue) {
							last_discussion_page_link_add(hoho2.nodeValue, hoho);

							hoho2.parentNode.removeChild(hoho2);
						}
					}
			}
		}

		last_discussion_page_link_active = true;
	}
	else if (!GM_getValue("enable_last_discussion_page_link", false) && last_discussion_page_link_active) {
		if (COLUMN_RIGHT) {
			mylinks = realtime_xpath(xpather, COLUMN_RIGHT);
			var len = mylinks.snapshotLength;
			for (i=0; i<len; i++) {
				hoho = mylinks.snapshotItem(i);
				if (hoho.parentNode.childNodes.length > 3) {
					hoho.parentNode.removeChild(hoho.nextSibling);

					if (hoho.childNodes.length > 2) {
						hoho.childNodes[2].nodeValue = hoho.childNodes[2].nodeValue  + " [" + hoho.nextSibling.textContent + "]\n";
					}

					hoho.parentNode.removeChild(hoho.nextSibling);
					hoho.parentNode.removeChild(hoho.nextSibling);
				}
			}
		}

		if (COLUMN_CENTER) {
			switch (LOCATION_PATHNAME) {
				case "/forum/discussions/":
				case "/clubs/clubdiscuss.php":
				case "/clubs/club.php":
				case "/yourdiscussions.php":
					mylinks = xpath(xpather2, COLUMN_CENTER);
					var len = mylinks.snapshotLength;
					for (i=0; i<len; i++) {
						hoho = mylinks.snapshotItem(i);
						if (hoho.parentNode.childNodes.length > 3) {
							hoho2 = hoho.nextSibling.nextSibling.textContent;
							hoho.parentNode.removeChild(hoho.nextSibling);
							hoho.parentNode.removeChild(hoho.nextSibling);
							hoho.parentNode.replaceChild(document.createTextNode("\n["+hoho2+"]\n"), hoho.nextSibling);
						}
					}
			}
		}

		last_discussion_page_link_active = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa l%E5nga smeknamn of%F6rkortade ifall de f%E5r plats"):
	"Show long nicknames unshortened when space permits",
	"unshorten_long_nicknames"
);
if (REALTIME) REALTIME_FUNCTIONS["unshorten_long_nicknames"] = unshorten_long_nicknames;

function unshorten_long_nicknames_mode() {
	var mode = null;
	var xpather = "";

	switch (LOCATION_PATHNAME) {
		case "/members/search/":
		case "/members/search/index.php":
		case "/clubs/clubscribble.php":
		case "/forum/scribbleboard/":
		case "/qa.php":
		case "/showguestbook.php":
		case "/showmovies.php":
		case "/showpolls.php":
			mode = 0;
			break;

		case "/showdiary.php":
		case "/showclubs.php":
		case "/showguestbook.php":
		case "/showfavourites.php":
		case "/showmovies_digged.php":
			mode = 1;
			break;

		case "/photoalbum_nav.php":
		case "/messagebox.php":
			mode = 2;
			break;

		case "/forum/discussions/":
		case "/clubs/clubdiscuss.php":
			if (document.getElementsByTagName("h2").length > 1)
				mode = 0;
			break;

		case "/clubs/club.php":
			mode = 4;
			break;
	}

	switch (mode) {
		case null: break;
		case 0:		// full
			xpather = ".//div[contains(@class,'insertmember')]/div[@class='link']/a";
			break;
		case 1:		// member
			xpather = "./div[contains(@class,'insertmember')][1]/div[@class='link']/a";
			break;
		case 2:		// special message
			xpather = ".//div[contains(@class,'insertmember')][1]/div[@class='link']/a";
			break;
		case 4:		// special club
			xpather = "(.//div[contains(@class,'insertmember')]/div[@class='link']/a)[last()]";
			break;
	}
	return xpather;
}

var unshorten_long_nicknames_active;
function unshorten_long_nicknames() {
	if (GM_getValue("unshorten_long_nicknames", false) && !unshorten_long_nicknames_active) {
		if (xpather = unshorten_long_nicknames_mode()) {
			var as = xpath(xpather, COLUMN_CENTER);
			var a;
			var len = as.snapshotLength;
			for (var i=0; i<len; i++) {
				a = as.snapshotItem(i);
				if (a.title.length > 17) {
					a.textContent = a.title;
				}
				a.parentNode.parentNode.className += " qs_unshorten_long_nicknames";
			}

			var mystyle = "div.qs_unshorten_long_nicknames {overflow: visible !important;}";
			mystyle += " div.qs_unshorten_long_nicknames div.link, div.qs_unshorten_long_nicknames div.description {overflow: visible !important; clip: auto !important; white-space: nowrap !important;}";

			mystyle += " div.qs_unshorten_long_nicknames div.mood {width: ";
			mystyle += LOCATION_PATHNAME != "/messagebox.php" ? 398 : 328;
			mystyle += "px !important;}";

			mystyle += " div.qs_unshorten_long_nicknames ul.icons {width: 150px !important;}";

			unshorten_long_nicknames_active = addstyle(mystyle);
		}
	}
	else if (!GM_getValue("unshorten_long_nicknames", false) && unshorten_long_nicknames_active) {
		if (xpather = unshorten_long_nicknames_mode()) {
			var as = xpath(xpather, COLUMN_CENTER);
			var len = as.snapshotLength;
			for (var i=0; i<len; i++) {
				if (as.snapshotItem(i).title.length > 17) {
					as.snapshotItem(i).textContent = as.snapshotItem(i).title.substring(0, 15)+"...";
				}
				as.snapshotItem(i).parentNode.parentNode.className = as.snapshotItem(i).parentNode.parentNode.className.replace("qs_unshorten_long_nicknames", "");
			}
			removestyle(unshorten_long_nicknames_active);
			unshorten_long_nicknames_active = null;
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa l%E4nkar f%F6r svara p%E5/citera diskussionsinl%E4gg"):
	"Show links for replying to/quoting discussion entries",
	"enable_reply_quote_links"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_reply_quote_links"] = reply_quote_links;

function reply_quote_links_post(stuff) {
	if (reply_quote_links_active) {
		var text = reply_quote_links_active;

//		var selectscrolltop = text.scrollTop;
//		var selectscrollleft = text.scrollLeft;

		if (text.value.length > 0) {
			text.value += "\n\n";
		}
		text.value = text.value + stuff;

//		text.scrollTop = selectscrolltop;
//		text.scrollLeft = selectscrollleft;

		text.scrollTop = text.scrollHeight;	//?

		text.selectionStart = text.selectionEnd = text.value.length;

		// fake input event on the text area so that any registered event handlers will fire, if any (e.g. the text counter)
		var update = document.createEvent("HTMLEvents");
		update.initEvent("input", true, true);
		text.dispatchEvent(update);

		var form = text.form;
		if (form && form.scrollIntoView) form.scrollIntoView();

		text.focus();
	}
}

function reply_quote_links_reply() {
	var hej2 = this.parentNode.parentNode;
	if (hej2.className != "list")	// if a[0]?
		hej2 = hej2.getElementsByTagName("a")[0].getAttribute("name").replace("post", "#");
	else {
		hej2 = "#0";
	}

	reply_quote_links_post(hej2+": ");
}


function reply_quote_links_quote() {
	var textmessage = "";
	var texttitle = "";
	var mynode;

	var hej = this.parentNode.parentNode;
	var len = hej.childNodes.length;
	for (var i=0; i<len; i++) {
		mynode = hej.childNodes[i];
		if (mynode.className == "datetime") {
			break;
		}

		switch (mynode.nodeName.toLowerCase()) {
			case "#text":
				textmessage += mynode.nodeValue;
				break;
			case "br":
				textmessage += "\n";
				break;
			case "h2":
				texttitle = "#0: '" + mynode.textContent.replace(/\s+$/,"") + "\n\n";
				break;
			case "a":
				if (mynode.name) {
					texttitle = mynode.textContent.replace(". ", ": '");

					if (texttitle.length > (texttitle.indexOf(": '")+3)) {
						texttitle += "\n\n";
					}
					break;
				}
			default:
				textmessage += mynode.textContent;
				break;
		}
	}

	textmessage = textmessage.replace(/^\s+|\s+$/g,"");

	reply_quote_links_post(fix_quotes(texttitle)+fix_quotes(textmessage)+'"\n\n');
}

var reply_quote_links_active;
var reply_quote_links_style;
function reply_quote_links() {
	if ((LOCATION_PATHNAME == "/forum/discussions/" || LOCATION_PATHNAME == "/clubs/clubdiscuss.php") && LOCATION_SEARCH.indexOf("view=") != -1 && COLUMN_CENTER) {
		if (GM_getValue("enable_reply_quote_links", false) && !reply_quote_links_active) {
			var bla = xpath(".//textarea[@name='body'][1]", COLUMN_CENTER);
			var len;
			if (bla.snapshotLength>0) {
				reply_quote_links_active = bla.snapshotItem(0);

				bla = xpath(".//div[contains(@class, 'insertmember')]", COLUMN_CENTER);

				var reply = LANGUAGE == "SE" ? "Svara" : "Reply";
				var quote = LANGUAGE == "SE" ? "Citera" : "Quote";
				var newElement, a, hola;
				len = bla.snapshotLength;
				for (var i=0; i<len; i++) {
					if (newElement) {
						newElement = newElement.cloneNode(true);
						a = newElement.getElementsByTagName("a");
						a[0].addEventListener("click", reply_quote_links_reply, false);
						a[1].addEventListener("click", reply_quote_links_quote, false);
					}
					else {
						newElement = document.createElement('div');
						newElement.className = "qs_reply_quote_links smalltext";

						a = document.createElement('a');
						a.textContent = reply;
						a.addEventListener("click", reply_quote_links_reply, false);
						newElement.appendChild(a);

						newElement.appendChild( document.createTextNode(" | ") );

						a = document.createElement('a');
						a.textContent = quote;
						a.addEventListener("click", reply_quote_links_quote, false);

						newElement.appendChild(a);
					}

					hola = bla.snapshotItem(i);
					hola.parentNode.insertBefore(newElement, hola);
				}

				reply_quote_links_style = addstyle(".qs_reply_quote_links {float: right; margin: 1.5em 0 0 1.5em;}");
			}
		}
		else if (!GM_getValue("enable_reply_quote_links", false) && reply_quote_links_active) {
			var bla = xpath(".//div[contains(@class, 'qs_reply_quote_links')]", COLUMN_CENTER);
			var hola;
			var len = bla.snapshotLength;
			for (var i=0; i<len; i++) {
				hola = bla.snapshotItem(i);
				hola.parentNode.removeChild(hola);
			}
			removestyle(reply_quote_links_style);
			reply_quote_links_style = null;
			reply_quote_links_active = null;
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("L%E4nka albumbilden till n%E4sta bild i albumet"):
	"Link the album image to next image in the album",
	"enable_link_album_image_to_next"
);
function link_album_image_to_next() {
	if (GM_getValue("enable_link_album_image_to_next", false) && LOCATION_PATHNAME == "/photo.php") {
		var imgs = xpath("//a/img[@src='"+location.protocol+"//icon.qruiser.com/images/nextphoto.png']");
		if (imgs.snapshotLength > 0) {
			var a = document.createElement("a");
			a.href = imgs.snapshotItem(0).parentNode.href;

			var img = document.getElementById("photo");
			img.parentNode.insertBefore(a, img);
			a.appendChild(img);
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Kom ih%E5g vilken bakgrundsf%E4rg som senast anv%E4ndes f%F6r inl%E4gg"):
	"Remember which background color was used last time for entries",
	"remember_entry_background_color"
);
if (REALTIME) REALTIME_FUNCTIONS["remember_entry_background_color"] = entry_background_color;

function entry_background_color_store() {
	GM_setValue("remember_entry_background_color", entry_background_color_active.value);
}

var entry_background_color_active;
function entry_background_color() {
	var bgcolor, forms;
	if ((bgcolor = GM_getValue("remember_entry_background_color", false)) && !entry_background_color_active && (entry_background_color_active = document.getElementById("color_background")) && (forms = document.getElementsByName("scribbleform")) && (forms.length > 0)) {
		if (typeof(bgcolor) != "boolean") {
			var bgcolorbox = document.getElementById("color_background_color");

			entry_background_color_active.value = bgcolor;
			bgcolorbox.style.backgroundColor = "#" + bgcolor;
		}

		forms[0].addEventListener("submit", entry_background_color_store, false);
	}	
	else if (!GM_getValue("remember_entry_background_color", false) && entry_background_color_active) {
		forms = document.getElementsByName("scribbleform");
		if (forms.length > 0) {
			forms[0].removeEventListener("submit", entry_background_color_store, false);
		}
		entry_background_color_active = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape((!REALTIME?"Ta bort":"D%F6lj")+" toppf%E4ltet / f%E4ltet l%E4ngst upp p%E5 sidan"):
	(!REALTIME?"Remove":"Hide")+" the top bar / the bar at the top of the page",
	"remove_top_bar"
);
if (REALTIME) REALTIME_FUNCTIONS["remove_top_bar"] = top_bar;
var top_bar_active;
var top_bar_parent;
var top_bar_nextsibling;
function top_bar() {
	if (GM_getValue("remove_top_bar", false) && !top_bar_active) {
		var stupido = document.getElementsByTagName("hr");
		if (stupido.length > 0) {
			stupido = stupido[0];
			var stupido2 = previousObject(stupido);

			if (!REALTIME) {
				var parent = stupido.parentNode;
				parent.removeChild(stupido);
				parent.removeChild(stupido2);
			}
			else {
				top_bar_active = document.createDocumentFragment();

				top_bar_parent = stupido.parentNode;
				top_bar_nextsibling = stupido.nextSibling;

				top_bar_active.appendChild(stupido2);
				top_bar_active.appendChild(stupido);
			}
		}
	}
	else if (!GM_getValue("remove_top_bar", false) && top_bar_active) {
		top_bar_parent.insertBefore(top_bar_active, top_bar_nextsibling);
		top_bar_parent = top_bar_nextsibling = top_bar_active = null;
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape((!REALTIME?"Ta bort":"D%F6lj")+" \"Andra medlemmar\"-blocket p%E5 medlemssidor"):
	(!REALTIME?"Remove":"Hide")+" the \"Other members\" block on member pages",
	"remove_other_members_block"
);
if (REALTIME) REALTIME_FUNCTIONS["remove_other_members_block"] = other_members_block;
var other_members_block_parent;
var other_members_block_nextsibling;
var other_members_block_node;
function other_members_block() {
	if ((LOCATION_PATHNAME == "/" || LOCATION_PATHNAME == "/index.php") && loggedin && COLUMN_CENTER && UDM) {
		if (GM_getValue("remove_other_members_block", false) && !other_members_block_parent) {
			var text = document.getElementById("qmenu_members");
			if (text && (text = text.firstChild) && (text = text.textContent)) {
				text = text.toLowerCase();

				var a = xpath(".//div[@class='homepageblock']/div[@class='line']", COLUMN_CENTER);
				var b;
				for (var i=a.snapshotLength-1; i>=0; i--) {
					b = a.snapshotItem(i);

					if (b.textContent.replace(/^\s+|\s+$/g,"").toLowerCase().indexOf(text) > -1) {
						if (!REALTIME) {
							b = b.parentNode;
							b.parentNode.removeChild(b);
						}
						else {
							b = b.parentNode;
							other_members_block_parent = b.parentNode;
							other_members_block_nextsibling = b.nextSibling;
							other_members_block_node = other_members_block_parent.removeChild(b);
						}
						break;
					}
				}
			}
		}
		else if (!GM_getValue("remove_other_members_block", false) && other_members_block_parent) {
			other_members_block_parent.insertBefore(other_members_block_node, other_members_block_nextsibling);
			other_members_block_parent = other_members_block_nextsibling = other_members_block_node = null;
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa l%E4nkar f%F6r att g%E5 till filmers sidor"):
	"Show links to go to films' pages",
	"enable_go_to_film_link"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_go_to_film_link"] = go_to_film_link;
var go_to_film_link_active;
function go_to_film_link() {
	if (LOCATION_PATHNAME != "/showmovies.php") {
		if (GM_getValue("enable_go_to_film_link", false) && !go_to_film_link_active) {
			var myobjects = xpath(".//object/param[@name='flashvars']", COLUMN_CENTER, true);

			var newElement, newA, gunnarlisa, hola, hola2, movieid, memberid;
			var goo = LANGUAGE == "SE" ? unescape("G%E5 till filmen") : "Go to film";
			var len = myobjects.snapshotLength;
			for (var i=0; i<len; i++) {
				hola = myobjects.snapshotItem(i);

				movieid = hola.value;


				var jopp;
				jopp = movieid.indexOf("id=videocontainer_");
				if (jopp != -1) {
					movieid = movieid.substring(jopp+18, movieid.indexOf("&", jopp));
					hola = hola.parentNode;				
				}
				else if ((jopp = movieid.indexOf("id=")) && jopp != -1) {
					movieid = movieid.substring(jopp+3, movieid.indexOf("&", jopp));
				}


				hola = hola.parentNode;
				hola2 = hola.parentNode;

				memberid = xpath(".//div[contains(@class, 'insertmember')]//a", hola2);
				if (memberid.snapshotLength > 0) {
					memberid = memberid.snapshotItem(0).href;
					memberid = memberid.substr(memberid.indexOf("?id=")+4);
					gunnarlisa = location.protocol+"//"+location.host+"/showmovies.php?id="+memberid+"&movieid="+movieid;

					if (!newElement) {
						newElement = document.createElement('div');
						newA = document.createElement("a");
						newA.href = gunnarlisa;
						newA.textContent = goo;
						newElement.appendChild(newA);
						newElement.className = "qs_go_to_film_link smalltext";
					}
					else {
						newElement = newElement.cloneNode(true);
						newElement.firstChild.href = gunnarlisa;
					}

					if (STARTUP || !film_save_link_active) {
						if (gunnarlisa = hola.nextSibling) {
							hola2.insertBefore(newElement, gunnarlisa);
						}
						else {
							hola2.parentNode.insertBefore(newElement, hola2.nextSibling);
						}
					}
					else {
						gunnarlisa = xpath(".//div[contains(@class, 'qs_film_save_link')]", hola2);
						if (gunnarlisa.snapshotLength > 0) {
							gunnarlisa = gunnarlisa.snapshotItem(0);
							gunnarlisa.parentNode.insertBefore(newElement, gunnarlisa.nextSibling);
						}
					}
				}
			}

			if (len > 0) {
				var mystyle = ".qs_go_to_film_link {background: url('"+location.protocol+"//icon.qruiser.com/images/pngicons/63300e/home.png') no-repeat center left; padding-left: " + (11+3) + "px; ";

				mystyle += "float: right;} .qs_film_save_link + div {clear: right !important;} .qs_go_to_film_link + div {clear: ";

				if (LOCATION_PATHNAME != "/showmovie_hq.php") {
					mystyle += "none;} div[onclick=\"toggleAbuse(\'abuse_report_video\');\"] {clear: right;}";
				}
				else {
					mystyle += "right;}";
				}

				go_to_film_link_active = addstyle(mystyle);
			}
		}
		else if (!GM_getValue("enable_go_to_film_link", false) && go_to_film_link_active) {
			var myobjects = xpath(".//div[contains(@class, 'qs_go_to_film_link')]", COLUMN_CENTER);

			var len = myobjects.snapshotLength;
			for (var i=0; i<len; i++) {
				hola = myobjects.snapshotItem(i);
				hola.parentNode.removeChild( hola );
			}

			removestyle(go_to_film_link_active);
			go_to_film_link_active = null;
		}
	}
}


OPTIONS[OPTIONS.length] = new Array(LANGUAGE=="SE"?
	unescape("Visa alla meddelandeikoner (%E4ven ej publika, kr%E4ver Guld)"):
	"Show all message icons (even non-public, requires Gold)",
	"enable_all_message_icons"
);
if (REALTIME) REALTIME_FUNCTIONS["enable_all_message_icons"] = all_message_icons;
var all_message_icons_active;
function all_message_icons() {
	if ((LOCATION_PATHNAME == "/messagebox.php" || LOCATION_PATHNAME == "/readmessage.php" || LOCATION_PATHNAME == "/showguestbook.php")) {
		if (GM_getValue("enable_all_message_icons", false) && !all_message_icons_active) {
			var icons, icon, len;
			if (icons = document.getElementById("icon0")) {
				icons = icons.parentNode;
				icon = icons.getElementsByTagName("input");
				len = icon.length;
				if (len > 0) {
					icon = icon[icon.length-1];
				}
				else {
					icon = null;
				}
			}
			else {
				icons = xpath(".//input[@name='icon']", COLUMN_CENTER);
				len = icons.snapshotLength;
				if (len > 0) {
					icon = icons.snapshotItem(len-1);
					icons = icon.parentNode;
				}
			}

			if (icon) {
				var iconvalue = icon.value;
				var img = nextObject(icon);
				var extraicons = document.createElement("div");
				var prot = location.protocol+"//";

				var max = 19;
				var start = 7;
				var j = 0;
				for (var i=start; i<max; i++) {
					if (i != iconvalue) {
						if (i != start) {
							if (j < 5) {
								extraicons.appendChild(document.createTextNode(" "));
								j++;
							}
							else {
								extraicons.appendChild(document.createElement("br"));
								j = 0;
							}
						}

						icon = icon.cloneNode(false);
						img = img.cloneNode(false);
						icon.value = i;
						img.src = prot+"icon.qruiser.com/images/messageicons/"+i+".gif";
						extraicons.appendChild(icon);
						extraicons.appendChild(img);
					}
				}

				icons.parentNode.insertBefore(extraicons, icons.nextSibling);

				all_message_icons_active = !REALTIME ? true : extraicons;
			}
		}
		else if (!GM_getValue("enable_all_message_icons", false) && all_message_icons_active) {
			all_message_icons_active.parentNode.removeChild(all_message_icons_active);
			all_message_icons_active = null;
		}
	}
}


function functions_preferences(dialog) {
	var heading = LANGUAGE == "SE" ? "Funktioner" : "Functions";
	var group = addgroup(dialog, heading);

	var len = OPTIONS.length;
	for (var i=0; i<len; i++) {
		addoption(group, "checkbox", OPTIONS[i][1], GM_getValue(OPTIONS[i][1], false), null, OPTIONS[i][0]);
	}
}


function login_to_page() {
	var loginpage;

	if (LOCATION_SEARCH == "?didlogin=1" && (loginpage = GM_getValue("login_to_page", ""))) {
		location.replace(location.protocol+"//"+location.host+"/"+loginpage);
		return true;
	}
	return false;
}

function login_to_page_preferences(dialog) {
	var heading = LANGUAGE == "SE" ? "Vid inloggning" : "When logging in";
	var group = addgroup(dialog, heading, null, null, true);

	var pages = new Array();
	var text = LANGUAGE == "SE" ? "Din sida" : "Your page";
	pages[0] = new Array("("+text+")", "")

	var as, b;
	if (COLUMN_LEFT) {
		as = xpath("./p/a[starts-with(@href, '/')]", COLUMN_LEFT);
		var len = as.snapshotLength;
		for (var i=0; i<len; i++) {
			b = as.snapshotItem(i);
			href = b.href.replace(location.protocol+"//"+location.host+"/", "");
			if (href != "goldmember.php") {
				if (href == "messages.php?mailbox=out" || href == "members/online/?settings=lf" || href.indexOf("?") == -1) {
					pages[pages.length] = new Array(b.textContent, href);
				}
			}
		}
	}

	if (UDM) {
		as = UDM.getElementsByTagName('a');
		len = as.length;
		for (i=0; i<len; i++) {
			if (as[i].href == location.protocol+"//"+location.host+"/info/faq/")
				break;

			if (as[i].href.indexOf("javascript:") != 0) {
				b = as[i].href.replace(location.protocol+"//"+location.host+"/", "");
				if (b != "") {
					if (!as[i+1] || as[i].href != as[i+1].href) {
						pages[pages.length] = new Array(as[i].textContent, b);
					}
					else {
						pages[pages.length] = new Array(as[i].textContent, "*");
					}
				}
			}
		}
	}

	var myselect = document.createElement('select');
	myselect.name = "login_to_page";

	var optgroup = null;
	b = GM_getValue("login_to_page", "");
	var notselected = true;
	var myoption;

	var len = pages.length;
	for (i=0; i<len; i++) {
		if (pages[i][1] != "*") {
			myoption = document.createElement("option"),
			myoption.value = pages[i][1];

			if (pages[i][1] == b) {
				myoption.selected = true;
				notselected = false;
			}

			if (pages[i][0] != "") {
				myoption.textContent = pages[i][0];
			}
			else {
				myoption.textContent = "/"+pages[i][1];
			}

			if (optgroup) {
				optgroup.appendChild(myoption);
			}
			else {
				myselect.appendChild(myoption);
			}
		}
		else {
			if (optgroup) {
				myselect.appendChild(optgroup);
			}
			optgroup = document.createElement("optgroup");
			optgroup.label = pages[i][0];
		}
	}

	if (optgroup) {
		myselect.appendChild(optgroup);
	}

	if (notselected) {
		myoption = document.createElement("option"),
		myoption.value = b;
		myoption.selected = true;
		myoption.textContent = "/"+b;
		myselect.appendChild(myoption);
	}

	var mylabel = document.createElement("label");
	mylabel.appendChild( document.createTextNode(LANGUAGE == "SE" ? unescape("G%E5 till ") : "Go to ") );
	mylabel.appendChild(myselect);
	group.appendChild(mylabel);

	group.appendChild( document.createTextNode(LANGUAGE == "SE" ? unescape(" (g%E4ller ej vid k%F6)") : " (doesn't apply to queue)") );
}


function confirm_actions_newhref(href, text) {
	if (href.indexOf("javascript:") == 0) {
		return "javascript:if (confirm('" + text + "?')){" + href.replace("javascript:", "") + "}";
	}
	else {
		return "javascript:if (confirm('" + text + "?')) location.href='" + href + "';";
	}
}

function confirm_actions_oldhref(href) {
	if (href.substr(href.length-1) == "}") {
		return "javascript:"+ href.substring( href.indexOf("{")+1, href.length-1 );
	}
	else {
		if (href.indexOf(".href=") == -1) {
			href = unescape(href);
		}
		return href.substring( href.indexOf(".href=")+7, href.length-2 );
	}
}

function confirm_actions_img_add(img) {
	var as;

	if (typeof(img) == "object") {
		as = xpath(".//a/img[@src='" + img.join("' or @src='") + "']", COLUMN_CENTER);
	}
	else {
		as = xpath(".//a/img[@src='" + img + "']", COLUMN_CENTER);
	}

	var ap, a2, b;
	var len = as.snapshotLength;
	for (var i=0; i<len; i++) {
		b = as.snapshotItem(i);
		ap = b.parentNode;
		if (!(a2 = nextObject(ap)) || !(ap.href == a2.href)) {
			ap.href = confirm_actions_newhref(ap.href, b.title);
		}
		else {
			ap.href = confirm_actions_newhref(a2.href, a2.textContent);
			a2.href = confirm_actions_newhref(a2.href, a2.textContent);
		}
	}
}

function confirm_actions_img_remove(img) {
	var as = xpath(".//a/img[@src='" + img + "']", COLUMN_CENTER);
	var ap, a2;
	var len = as.snapshotLength;
	for (var i=0; i<len; i++) {
		ap = as.snapshotItem(i).parentNode;
		if (!(a2 = nextObject(ap)) || !(ap.href == a2.href)) {
			ap.href = confirm_actions_oldhref(ap.href);
		}
		else {
			ap.href = confirm_actions_oldhref(a2.href);
			a2.href = confirm_actions_oldhref(a2.href);
		}
	}
}

var confirm_actions_page = 1;
var confirm_actions_page_active;
var confirm_actions_delete = 2;
var confirm_actions_delete_active;
var confirm_actions_zero = 4;
var confirm_actions_zero_active;
var confirm_actions_logout = 8;
var confirm_actions_logout_active;
var confirm_actions_vote = 16;
var confirm_actions_vote_active;
var confirm_actions_chat = 32;
var confirm_actions_chat_active;
var confirm_actions_buff = 64;
var confirm_actions_buff_active;

if (REALTIME) REALTIME_FUNCTIONS["confirm_actions"] = confirm_actions;
function confirm_actions() {
	var confirm_actions_setting = GM_getValue("confirm_actions", 0);
	var as, img, xpather, len;

	// page
	xpather = ".//ul[@class='homebuttons']/following-sibling::a[@class='homelink']";
	if ((confirm_actions_setting & confirm_actions_page) && !confirm_actions_page_active) {
		as = xpath(xpather, COLUMN_CENTER);
		var a, b;
		len = as.snapshotLength;
		for (i=0; i<len; i++) {
			a = as.snapshotItem(i);
			b = confirm_actions_newhref(a.href, a.textContent);
			a.href = b;
			a = previousObject(a).firstChild;
			if (a.href) a.href = b;
		}

		if (LOCATION_PATHNAME == "/readmessage.php" && (document.getElementById("makefavourite") || document.getElementById("ignoremember"))) {
			confirm_actions_page_active = document.createElement('script');
			confirm_actions_page_active.type = "text/javascript";
			confirm_actions_page_active.textContent = '\n\
				(function() {\n\
					if (change_makefavourite) {\n\
						var qs_original_change_makefavourite = change_makefavourite;\n\n\
						change_makefavourite = function(e) {\n\
							if (e === -1) {\n\
								change_makefavourite = qs_original_change_makefavourite;\n\
								return;\n\
							}\n\n\
							var a = document.getElementById("makefavourite");\n\
							if (a.checked && !confirm(a.parentNode.textContent.replace(/^\x20+/g, "").replace(/^\s+|\s+$/g,"")+"?")) {\n\
								a.checked = false;\n\
								return false;\n\
							}\n\
							return qs_original_change_makefavourite();\n\
						}\n\
					}\n\n\
					if (change_ignoremember) {\n\
						var qs_original_change_ignoremember = change_ignoremember;\n\n\
						change_ignoremember = function(e) {\n\
							if (e === -1) {\n\
								change_ignoremember = qs_original_change_ignoremember;\n\
								return;\n\
							}\n\n\
							var a = document.getElementById("ignoremember");\n\
							if (a.checked && !confirm(a.parentNode.textContent.replace(/^\x20+/g, "").replace(/^\s+|\s+$/g,"")+"?")) {\n\
								a.checked = false;\n\
								return false;\n\
							}\n\
							return qs_original_change_ignoremember();\n\
						}\n\
					}\n\
				})();\n';

			document.getElementsByTagName('head')[0].appendChild(confirm_actions_page_active);			
		}
		else {
			confirm_actions_page_active = true;
		}
	}
	else if (!(confirm_actions_setting & confirm_actions_page) && confirm_actions_page_active) {
		as = xpath(xpather, COLUMN_CENTER);
		var a, b;
		len = as.snapshotLength;
		for (i=0; i<len; i++) {
			a = as.snapshotItem(i);
			b = confirm_actions_oldhref(a.href, a.textContent);
			a.href = b;
			a = previousObject(a).firstChild;
			if (a.href) a.href = b;
		}

		if (LOCATION_PATHNAME == "/readmessage.php" && (document.getElementById("makefavourite") || document.getElementById("ignoremember"))) {
			var head = document.getElementsByTagName('head')[0];
			head.removeChild(confirm_actions_page_active);

			confirm_actions_page_active = document.createElement('script');
			confirm_actions_page_active.type = "text/javascript";
			confirm_actions_page_active.textContent = 'if (change_makefavourite) change_makefavourite(-1); if (change_ignoremember) change_ignoremember(-1);';

			head.appendChild(confirm_actions_page_active);
			head.removeChild(confirm_actions_page_active);
		}

		confirm_actions_page_active = null;
	}

	var prot = location.protocol+"//";
	if (STARTUP) {
		var img = new Array();
		var len = 0;

		// delete
		if ((confirm_actions_setting & confirm_actions_delete)) {
			img[len++] = prot+"icon.qruiser.com/images/redcross.png";
			confirm_actions_delete_active = true;
		}

		// zero
		if ((confirm_actions_setting & confirm_actions_zero)) {
			img[len++] = prot+"icon.qruiser.com/images/icon_zero.png";
			confirm_actions_zero_active = true;
		}

		if (len > 0) confirm_actions_img_add(img);
	}
	else {
		// delete
		img = prot+"icon.qruiser.com/images/redcross.png";
		if ((confirm_actions_setting & confirm_actions_delete) && !confirm_actions_delete_active) {
			confirm_actions_img_add(img);
			confirm_actions_delete_active = true;
		}
		else if (!(confirm_actions_setting & confirm_actions_delete) && confirm_actions_delete_active) {
			confirm_actions_img_remove(img);
			confirm_actions_delete_active = null;
		}

		// zero
		img = prot+"icon.qruiser.com/images/icon_zero.png";
		if ((confirm_actions_setting & confirm_actions_zero) && !confirm_actions_zero_active) {
			confirm_actions_img_add(img);
			confirm_actions_zero_active = true;
		}
		else if (!(confirm_actions_setting & confirm_actions_zero) && confirm_actions_zero_active) {
			confirm_actions_img_remove(img);
			confirm_actions_zero_active = null;
		}
	}

	// logout
	if ((confirm_actions_setting & confirm_actions_logout) && !confirm_actions_logout_active) {
		if (LOCATION_PATHNAME != "/satellite.php") {
			confirm_actions_logout_active = document.createElement('script');
			confirm_actions_logout_active.type = "text/javascript";
			confirm_actions_logout_active.textContent = '\n\
				(function() {\n\
					if (logout) {\n\
						var qs_original_logout = logout;\n\n\
						logout = function(obj) {\n\
							if (obj === -1) {\n\
								logout = qs_original_logout;\n\
								return;\n\
							}\n\n\
							var c = obj.textContent;\n\
							if (confirm(c+"?")) {\n\
								return qs_original_logout.apply(this, arguments);\n\
							}\n\
							else {return false;}\n\
						}\n\
					}\n\
				})();\n';

			document.getElementsByTagName('head')[0].appendChild(confirm_actions_logout_active);
		}
		else {
			xpather = ".//a[starts-with(@href, 'javascript:openloc(\"?logout=true&')]";
			as = xpath(xpather);
			var a;
			for (i=0; i<as.snapshotLength; i++) {
				a = as.snapshotItem(i);
				a.href = confirm_actions_newhref(a.href, a.textContent);
			}
			confirm_actions_logout_active = true;
		}
	}
	else if (!(confirm_actions_setting & confirm_actions_logout) && confirm_actions_logout_active) {
		var head = document.getElementsByTagName('head')[0];
		head.removeChild(confirm_actions_logout_active);

		confirm_actions_logout_active = document.createElement('script');
		confirm_actions_logout_active.type = "text/javascript";
		confirm_actions_logout_active.textContent = 'if (logout) logout(-1);';

		head.appendChild(confirm_actions_logout_active);
		head.removeChild(confirm_actions_logout_active);

		confirm_actions_logout_active = null;
	}

	// vote
	xpather = ".//form[starts-with(@id, 'poll_')]";
	if ((confirm_actions_setting & confirm_actions_vote) && !confirm_actions_vote_active) {
		polls = xpath(xpather, COLUMN_CENTER);
		if (polls.snapshotLength > 0) {
			confirm_actions_vote_active = document.createElement('script');
			confirm_actions_vote_active.type = "text/javascript";
			confirm_actions_vote_active.textContent = '\n\
				(function() {\n\
					if (pollsubmit) {\n\
						var qs_original_pollsubmit = pollsubmit;\n\n\
						pollsubmit = function(theform, pollkey, event) {\n\
							if (theform === -1) {\n\
								pollsubmit = qs_original_pollsubmit;\n\
								return;\n\
							}\n\n\
							var text = new Array();\n\
							var c = theform.getElementsByTagName("div");\n\
							if (c.length > 1) {\n\
								text[0] = c[1].textContent.replace(/^\s+/,"");\n\
							}\n\n\
							c = theform.elements["option"];\n\
							var len = c.length;\n\
							var d;\n\
							for (var i=0; i<len; i++) {\n\
								if (c[i].checked && c[i].nextSibling && (d = c[i].nextSibling.nodeValue)) {\n\
									text[text.length] = d;\n\
								}\n\
							}\n\n\
							if (confirm(text.join("\\n\\t-"))) {\n\
								return qs_original_pollsubmit.apply(this, arguments);\n\
							}\n\
							else {\n\
								for (i=0; i<len; i++) {\n\
									c[i].checked = false;\n\
								}\n\
							}\n\
							return false;\n\
						}\n\
					}\n\
				})();\n';

			document.getElementsByTagName('head')[0].appendChild(confirm_actions_vote_active);
		}
	}
	else if (!(confirm_actions_setting & confirm_actions_vote) && confirm_actions_vote_active) {
		polls = xpath(xpather, COLUMN_CENTER);
		if (polls.snapshotLength > 0) {
			var head = document.getElementsByTagName('head')[0];
			head.removeChild(confirm_actions_vote_active);

			confirm_actions_vote_active = document.createElement('script');
			confirm_actions_vote_active.type = "text/javascript";
			confirm_actions_vote_active.textContent = 'if (pollsubmit) pollsubmit(-1);';

			head.appendChild(confirm_actions_vote_active);
			head.removeChild(confirm_actions_vote_active);
		}
		confirm_actions_vote_active = null;
	}

	// chat
	if ((confirm_actions_setting & confirm_actions_chat) && !confirm_actions_chat_active) {
		confirm_actions_chat_active = document.createElement('script');
		confirm_actions_chat_active.type = "text/javascript";
		confirm_actions_chat_active.textContent = '\n\
			(function() {\n\
				if (openChatRequest) {\n\
					var qs_original_openChatRequest = openChatRequest;\n\n\
					openChatRequest = function(nr, event) {\n\
						if (nr === -1) {\n\
							openChatRequest = qs_original_openChatRequest;\n\
							return;\n\
						}\n\n\
						var c = event.target.value || event.target.parentNode.title || event.target.title;\n\
						if (confirm(c+"?")) {\n\
							return qs_original_openChatRequest.apply(this, arguments);\n\
						}\n\
						else {return false;}\n\
					}\n\
				}\n\
			})();\n';

		document.getElementsByTagName('head')[0].appendChild(confirm_actions_chat_active);
	}
	else if (!(confirm_actions_setting & confirm_actions_chat) && confirm_actions_chat_active) {
		var head = document.getElementsByTagName('head')[0];
		head.removeChild(confirm_actions_chat_active);

		confirm_actions_chat_active = document.createElement('script');
		confirm_actions_chat_active.type = "text/javascript";
		confirm_actions_chat_active.textContent = 'if (openChatRequest) openChatRequest(-1);';

		head.appendChild(confirm_actions_chat_active);
		head.removeChild(confirm_actions_chat_active);

		confirm_actions_chat_active = null;
	}

	// buff
	if ((confirm_actions_setting & confirm_actions_buff) && !confirm_actions_buff_active) {
		if (confirm_actions_buff_active = document.getElementById("show_buffs")) {
			var as = confirm_actions_buff_active.getElementsByTagName("a");
			var len = as.length;
			var a, b;
			var text = LANGUAGE=="SE" ? "Buffa" : "Nudge";
			for (var i=0; i<len; i++) {
				a = as[i];
				if (b = a.childNodes[0]) {
					a.href = confirm_actions_newhref(a.href, text+' \"'+b.title+'\"');
				}
			}
		}
	}
	else if (!(confirm_actions_setting & confirm_actions_buff) && confirm_actions_buff_active) {
		var as = confirm_actions_buff_active.getElementsByTagName("a");
		var len = as.length;
		var a, b;
		for (var i=0; i<len; i++) {
			a = as[i];
			if (b = a.childNodes[0]) {
				a.href = confirm_actions_oldhref(a.href);
			}
		}
		confirm_actions_buff_active = null;
	}
}

function confirm_actions_preferences(dialog) {
	var heading = LANGUAGE == "SE" ? unescape("Bekr%E4fta handlingar") : "Confirm actions";
	var group = addgroup(dialog, heading);

	var setting = GM_getValue("confirm_actions", 0);
	var options = new Array();
	var text;
	var len=0;
	var prot = location.protocol+"//";

	text = LANGUAGE == "SE" ? unescape("Favorit, ignorera, fl%F6rta") : "Favourite, ignore, flirt";
	options[len++] = new Array(confirm_actions_page, text, new Array(prot+"icon.qruiser.com/images/pngicons/63300e/favourite.png", prot+"icon.qruiser.com/images/pngicons/63300e/ignore.png", prot+"icon.qruiser.com/images/pngicons/63300e/flirt.png"));

	text = LANGUAGE == "SE" ? unescape("Radera (meddelande, inl%E4gg i g%E4stbok/diskussion, favorit etc)") : "Delete (message, entry in guestbook/discussion, favourite etc)";
	options[len++] = new Array(confirm_actions_delete, text, prot+"icon.qruiser.com/images/redcross.png");

	text = LANGUAGE == "SE" ? unescape("Nollst%E4ll (ol%E4sta meddelanden, medlems-/klubbuppdatering etc)") : "Set to zero (unread messages, member/club updates etc)";
	options[len++] = new Array(confirm_actions_zero, text, prot+"icon.qruiser.com/images/icon_zero.png");

	text = LANGUAGE == "SE" ? unescape("Logga ut") : "Log out";
	options[len++] = new Array(confirm_actions_logout, text);

	text = LANGUAGE == "SE" ? unescape("R%F6sta") : "Vote";
	options[len++] = new Array(confirm_actions_vote, text, prot+"icon.qruiser.com/images/pngicons/63300e/poll_large.png");

	text = LANGUAGE == "SE" ? "Chatta" : "Chat";
	options[len++] = new Array(confirm_actions_chat, text, prot+"icon.qruiser.com/images/pngicons/63300e/chat_large.png");

	text = LANGUAGE == "SE" ? "Buffa" : "Nudge";
	options[len++] = new Array(confirm_actions_buff, text);

	for (var i=0; i<len; i++) {
		if (options[i][2]) {
			addoption(group, "checkbox", "confirm_actions", (setting & options[i][0]), options[i][0], options[i][1], options[i][2]);
		}
		else {
			addoption(group, "checkbox", "confirm_actions", (setting & options[i][0]), options[i][0], options[i][1]);
		}
	}
}

function notloggedinswitch() {
	switch (LOCATION_PATHNAME) {
		case "/signup.php":
			var h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				var is = h2s[0].getElementsByTagName('i');
				if (is.length > 0) {
					var h2text = h2s[0].textContent;
					var itext = is[0].textContent;
					title(h2text.substring(0, h2text.lastIndexOf(itext)));
					title(is[0].textContent);
				}
			}
			break;

		case "/qa.php":
			if (!LOCATION_SEARCH) {
				title("Sentry");
			}
			break;
	}
}

function loggedinswitch() {
	var text, thissubnavbar, h2s, as, theseclubs, thisalbum, theseclubs, i, h3s;

	switch (LOCATION_PATHNAME) {
		case "/":
		case "/signup.php":
		case "/showdiary.php":
		case "/showclubs.php":
		case "/showguestbook.php":
		case "/showmovies.php":
		case "/showfavourites.php":
		case "/showmovies_digged.php":
		case "/showpolls.php":
		case "/showblog.php":
		case "/index.php":
			var thissubnavbar = subnavbar();
			if (LOCATION_PATHNAME == "/showpolls.php" || !thissubnavbar) {
				if (UDM) {
					var text = document.getElementById("qmenu_members");
					if (text && (text = text.firstChild) && (text = text.textContent)) {
						title(text);
					}
				}

				if (LOCATION_PATHNAME == "/" || LOCATION_PATHNAME == "/index.php" || LOCATION_PATHNAME == "/signup.php") {
					var h2s = document.getElementsByTagName('h2');
					if (h2s.length > 0) {
						var as = h2s[0].getElementsByTagName('a');
						if (as.length > 0) {
							title(as[0].textContent);
						}
					}
					break;
				}

				var users = user();
				if (users.snapshotLength > 0) {
					title(users.snapshotItem(0).title);
				}

				if (LOCATION_PATHNAME == "/showclubs.php" && COLUMN_CENTER) {
					var theseclubs = xpath("./div/b/a", COLUMN_CENTER);
					if (theseclubs.snapshotLength > 0) {
						title(theseclubs.snapshotItem(0).textContent);
						break;
					}
				}
			}

			// /showpolls.php
			//var thissubnavbar = subnavbar();
			var h2s;
			if (thissubnavbar) {
				title(thissubnavbar);
			}
			else {
				h2s = document.getElementsByTagName('h2');
				if (h2s.length > 0) {
					title(h2s[0].textContent);
				}
			}

			if (LOCATION_PATHNAME == "/showmovies.php" && COLUMN_CENTER) {
				if (!h2s) h2s = document.getElementsByTagName('h2');

				var thisalbum = xpath("./p/span[contains(@style, 'bold')]/a[1]", COLUMN_CENTER);
				if (thisalbum.snapshotLength > 0) {
					title(thisalbum.snapshotItem(0).textContent);

					if (h2s.length > 1 && h2s[1].childNodes.length > 0) {
						title(h2s[1].childNodes[0].nodeValue);
					}
				}
			}
			break;

		case "/showfavourites_matched.php":
			var h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		case "/clubs/club.php":
		case "/clubs/clubmembers.php":
		case "/clubs/clubspotlight.php":
		case "/clubs/clubscribble.php":
		case "/clubs/clubdiscuss.php":
		case "/clubs/clubpolls.php":
		case "/clubs/club_edit.php":
			if (LOCATION_PATHNAME == "/clubs/club_edit.php" && COLUMN_CENTER) {
				var inputs = xpath("./form[@name='editclubform']/p/input[@name='name']", COLUMN_CENTER);
				if (inputs.snapshotLength > 0) {
					h2s = document.getElementsByTagName('h2');
					if (h2s.length > 0) {
						title(h2s[0].textContent);
					}

					title(inputs.snapshotItem(0).value);
					break;
				}
			}

			if (UDM) {
				var text = document.getElementById("qmenu_clubs");
				if (text && (text = text.firstChild) && (text = text.textContent)) {
					title(text);
				}
			}

			var h2s = document.getElementsByTagName('h2');

			if (h2s.length > 0) {
				title(h2s[0].textContent);

				var clubmenu = xpath("./following-sibling::p/b/a", h2s[0]);
				if (clubmenu.snapshotLength > 0)
					title(clubmenu.snapshotItem(0).textContent);
			}

			if (h2s.length > 1) {
				title(h2s[1].textContent);
				if (LOCATION_PATHNAME == "/clubs/clubdiscuss.php") {
					h2 = document.createElement('h2');
					var a = document.createElement('a');
					a.href = location.protocol + '//' + location.host + LOCATION_PATHNAME + LOCATION_SEARCH;
					a.textContent = h2s[1].textContent;
					h2.appendChild(a);
					h2s[1].parentNode.replaceChild( h2, h2s[1] );
				}
			}

			if (LOCATION_PATHNAME == "/clubs/clubpolls.php") {
				var thesepolls = xpath("./p/span[contains(@style, 'bold')]/a", COLUMN_CENTER);
				if (thesepolls.snapshotLength > 0) {
					title(thesepolls.snapshotItem(0).textContent);
					break;
				}
			}
			break;

		case "/contest.php":
			if (COLUMN_CENTER) {
				i = COLUMN_CENTER.getElementsByTagName('i');
				if (i.length > 0) {
					title(i[0].textContent);
				}
			}

			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		case "/favourites_updated.php":
			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		case "/forum/discussions/":
			thissubnavbar = subnavbar();
			if (thissubnavbar) {
				title(thissubnavbar);
			}

			h2s = document.getElementsByTagName('h2');
			if (LOCATION_SEARCH.indexOf("adddiscussion=1") != -1) {
				if (h2s.length > 0) {
					title(h2s[0].textContent);
				}
			}

			h3s = document.getElementsByTagName('h3');
			if (h3s.length > 0) {
				title(h3s[0].textContent);
			}

			if (h2s.length > 1) {
				texts = xpath("./text()", h2s[1]);
				if (texts.snapshotLength > 0) {
					title(texts.snapshotItem(0).nodeValue);

					var hej = document.createElement('a');
					hej.href = location.protocol + '//' + location.host + LOCATION_PATHNAME + LOCATION_SEARCH;
					hej.textContent =  texts.snapshotItem(0).nodeValue;
					h2s[1].replaceChild( hej, texts.snapshotItem(0) );
				}
			}
			break;

		case "/forum/polls/":
			thissubnavbar = subnavbar();
			if (thissubnavbar) {
				title(thissubnavbar);
			}

			var thesepolls = xpath("./a[contains(@style, 'bold')][2]", COLUMN_CENTER);
			if (thesepolls.snapshotLength > 0) {
				title(thesepolls.snapshotItem(0).textContent);
				break;
			}

			break;

		case "/forum/scribbleboard/":
			thissubnavbar = subnavbar();
			if (thissubnavbar) {
				title(thissubnavbar);
			}

			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		case "/goldmember.php":
			h3s = document.getElementsByTagName('h3');
			if (h3s.length > 0) {
				title(h3s[0].textContent);
			}

			break;

		case "/messages.php":
		case "/readmessage.php":
			thissubnavbar = subnavbar();
			if (thissubnavbar) {
				title(thissubnavbar);
			}


			if (COLUMN_CENTER) {
				var h3s = COLUMN_CENTER.getElementsByTagName('h3');
				var message;
				if (h3s.length > 0) {
					message = h3s[0].textContent;
				}
				else {
					message = "";
					var p = xpath("./div[@class='list']/p[1]", COLUMN_CENTER);
					if (p.snapshotLength > 0) {
						var hola = p.snapshotItem(0).childNodes;
						var len = hola.length;
						for (i=0; i<len; i++) {
							switch (hola[i].nodeName.toLowerCase()) {
								case "#text":
									message = message + hola[i].nodeValue;
									break;
								case "br":
									message = message + " ";
									break;
							}
							if (message.length > 60) break;
						}
					}
				}

				if (message.length > 60) {
					message = message.substring(0,57);
					apa = message.lastIndexOf(" ");
					if (apa != -1) {
						message = message.substring(0,apa);
					}

					message = message.replace(/\s+$/,"");
					message = message+"...";
				}
				if (message) title(message);
			}
			break;

		case "/support_message.php":
			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}

			h3s = document.getElementsByTagName('h3');
			if (h3s.length > 0) {
				title(h3s[0].textContent);
			}
			break;

		case "/noticeboard.php":
			h3s = document.getElementsByTagName('h3');
			if (h3s.length > 0) {
				title(h3s[0].textContent);
			}

			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		case "/qa.php":
			title("Sentry");
			if (LOCATION_SEARCH) {
				h2s = document.getElementsByTagName('h2');
				if (h2s.length > 0) {
					title(h2s[0].textContent);
				}
			}
			break;

		case "/map.php":
			h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		default:
			// club special
			if (LOCATION_PATHNAME.indexOf("/clubs/") == 0) {
				if (document.getElementById('subnavbar')) {
					var thisudm = udm();
					var thissubnavbar = subnavbar();
					if (thisudm && thissubnavbar && thisudm.snapshotLength > 0) {	// check if queue
						title(thisudm.snapshotItem(0).textContent);
						title(thisudm.snapshotItem(1).textContent);
					}
					break;
				}

				if (UDM) {
					var text = document.getElementById("qmenu_clubs");
					if (text && (text = text.firstChild) && (text = text.textContent)) {
						title(text);
					}
				}

				h2s = document.getElementsByTagName('h2');
				if (h2s.length > 0) {
					title(h2s[0].textContent);
				}
			}
			// forum special
			else if (LOCATION_PATHNAME.indexOf("/forum/") == 0) {
				thissubnavbar = subnavbar();
				if (thissubnavbar) {
					title(thissubnavbar);
				}
			}
			// user special
			else if (UDM && COLUMN_CENTER) {
				if ((users = user()) && users.snapshotLength > 0) {
					var text = document.getElementById("qmenu_members");
					if (text && (text = text.firstChild) && (text = text.textContent)) {
						title(text);
					}

					title(users.snapshotItem(0).title);

					thissubnavbar = subnavbar();
					if (thissubnavbar) {
						title(thissubnavbar);
					}
					else {
						h2s = document.getElementsByTagName('h2');
						if (h2s.length > 0) {
							title(h2s[0].textContent);
						}
					}
				}
			}
	}
}

function queue() {
	var prot = location.protocol+"//";
	var queuecheck = xpath("./div[@class='insertmember'][1]//img[@src='"+prot+"icon.qruiser.com/images/online_4.gif']", COLUMN_LEFT);
	if (queuecheck.snapshotLength == 0) {
		return false;
	}

	if (COLUMN_CENTER) {
		queuecheck = xpath("./div/img[@src='"+prot+"icon.qruiser.com/images/exclamation.gif'][1]", COLUMN_CENTER);
		if (queuecheck.snapshotLength == 0) {
			return false;
		}

		if (queuecheck.snapshotItem(0).parentNode.textContent.search(/\s\d+\sm/) == -1) {
			return false;
		}

		return true;
	}
	return false;
}

function otherswitch() {
	var thisudm, div, a, b, h2, thissubnavbar, thisa;

	switch (LOCATION_PATHNAME) {
		case "/info/faq/":
			var thisudm = udm();
			if (thisudm && thisudm.snapshotLength > 0) {
				title(thisudm.snapshotItem(0).textContent);
				title(thisudm.snapshotItem(1).textContent);
			}

			if ((LOCATION_SEARCH.indexOf("id=") != -1 || LOCATION_SEARCH.indexOf("parts_id=") != -1) && COLUMN_CENTER) {
				var div = xpath("./div[@class='divider'][1]", COLUMN_CENTER);

				if (div.snapshotLength > 0) {
					var a = div.snapshotItem(0).textContent;
					if (a.substring(a.length-2, a.length-1) == " ")
						a = a.substring(0, a.length-2);
					title(a);
				}
			}

			if ((LOCATION_SEARCH.indexOf("?id=") != -1 || LOCATION_SEARCH.indexOf("&id=") != -1) && COLUMN_CENTER) {
				var b = COLUMN_CENTER.getElementsByTagName('b');
				if (b.length > 0) {
					title(b[0].textContent);
				}
			}
			break;

		case "/theme/pride/":
		case "/theme/sport/":
		case "/theme/regnbagsval/":
			var thisudm = udm();
			if (thisudm && thisudm.snapshotLength > 0) {
				title(thisudm.snapshotItem(0).textContent);
				title(thisudm.snapshotItem(1).textContent);
			}

			var h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			break;

		default:
			var thisudm = udm();
			var thissubnavbar = subnavbar();
			if (thisudm && thissubnavbar && thisudm.snapshotLength > 0) {	// check if queue
				title(thisudm.snapshotItem(0).textContent);
				title(thisudm.snapshotItem(1).textContent);
			}
			else {
				//thissubnavbar = subnavbar();
				if (thissubnavbar) {
					title(thissubnavbar);
				}
				else {
					var h2s = document.getElementsByTagName('h2');
					if (h2s.length > 0) {
						title(h2s[0].textContent);
					}
					else {
						var thisa;
						if ((thisa = xpath(".//a[@href='"+LOCATION_PATHNAME+"']", COLUMN_LEFT)) && thisa.snapshotLength > 0) {
							title(thisa.snapshotItem(0).textContent);
						}
						else {
							if (document.title.indexOf("Qruiser - ") == 0) {
								title(document.title.substring(10));
							}
							else if (document.title.indexOf("Qruiser ") == 0) {
								title(document.title.substring(8));
							}
							else if (document.title.indexOf("Qruiser.com ") == 0) {
								if (document.title.indexOf("-") != 12) {
									title(document.title.substring(12));
								}
							}
						}
					}
				}
			}
			break;
	}
}

function specialswitch() {
	var lis, users, titles, thisbox, h2s;

	switch (LOCATION_PATHNAME) {
		case "/photoalbum_nav.php":
			var lis = xpath("//li[@class='photoalbumicon']");
			if (lis.snapshotLength > 0)
				title(lis.snapshotItem(0).title);

			var users = user();
			if (users.snapshotLength > 0) {
				title(users.snapshotItem(0).title);
			}

			var titles = xpath("//option[@selected][1] | //p[1]");
			if (titles.snapshotLength > 0)
				title(titles.snapshotItem(0).textContent);

			break;

		case "/messagebox.php":
			var h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}

			var users = user();
			if (users.snapshotLength > 0) {
				title(users.snapshotItem(0).title);
			}
			break;

		case "/showmovie_hq.php":
			var lis = xpath("//li[@class='movieicon']");
			if (lis.snapshotLength > 0)
				title(lis.snapshotItem(0).title);

			var users = user();
			if (users.snapshotLength > 0) {
				title(users.snapshotItem(0).title);
			}
			break;

		default:
			var h2s = document.getElementsByTagName('h2');
			if (h2s.length > 0) {
				title(h2s[0].textContent);
			}
			else {
				if (document.title.indexOf("Qruiser - ") == 0) {
					title(document.title.substring(10));
				}
				else if (document.title.indexOf("Qruiser ") == 0) {
					title(document.title.substring(8));
				}
				else if (document.title.indexOf("Qruiser.com ") == 0) {
					if (document.title.indexOf("-") != 12) {
						title(document.title.substring(12));
					}
				}
			}
	}
}

function malformedsections() {
	if (COLUMN_RIGHT) {
		var malformed = xpath("./a/div[@class='smalldivider']/div/span/text()", COLUMN_RIGHT);
		var newa;
		var len = malformed.snapshotLength;
		for (var i=0; i<len; i++) {
			newa = malformed.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.cloneNode(false);
			newa.appendChild( document.createTextNode( malformed.snapshotItem(i).nodeValue ) );

			malformed.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.replaceChild( malformed.snapshotItem(i).parentNode.parentNode.parentNode, malformed.snapshotItem(i).parentNode.parentNode.parentNode.parentNode );
			malformed.snapshotItem(i).parentNode.replaceChild( newa, malformed.snapshotItem(i) );
		}
	}
}

var column_sections_removesections;
var column_sections_movesections;
var column_sections_array;
var column_sections_removed;
var column_sections_left;
var column_sections_right;
var column_sections_startup;

if (REALTIME) REALTIME_FUNCTIONS["column_sections"] = column_sections;

function column_sections() {
	column_sections_removesections = readsections("remove_columnsections");
	column_sections_movesections = readsections("move_columnsections") + "|";
	column_sections_movesections = column_sections_movesections.replace("|", ";|;");

	if (REALTIME) {
		column_sections_originals();
	}

	// if neither column exists or if it's startup and nothing should be removed or moved, exit
	if ((!COLUMN_LEFT && !COLUMN_RIGHT) || (STARTUP && !column_sections_removesections && column_sections_movesections == ";|;")) return;

	column_sections_array = new Array();

	if (column_sections_removed) {
		column_sections_unremove();
	}
	if (column_sections_removesections || (column_sections_movesections != ";|;") || !STARTUP) { // if things to hide or things to move or realtime second
		if (COLUMN_LEFT) column_sections_remove_n_premove(0);
		if (COLUMN_RIGHT) column_sections_remove_n_premove(1);

		column_sections_movesections = column_sections_movesections.split("|");
		if ((column_sections_movesections != ";|;") || !STARTUP) {
			if (COLUMN_LEFT && column_sections_movesections[0]) column_sections_move(0);
			if (COLUMN_RIGHT && column_sections_movesections[1]) column_sections_move(1);
		}
	}
	column_sections_array = null;
}

function column_sections_originals() {
	if (STARTUP) {
		column_sections_startup = new Array();

		var len = 0;
		var columns = new Array();
		columns[len++] = COLUMN_LEFT;
		columns[len++] = COLUMN_RIGHT;

		var i, originals, j, len2;
		for (i=0; i<len; i++) {
			column_sections_startup[i] = new Array();
			if (columns[i]) {
				originals = xpath("./div[@class='smalldivider']", columns[i]);
				len2 = originals.snapshotLength;
				for (j=0; j<len2; j++) {
					column_sections_startup[i][j] = escape(originals.snapshotItem(j).textContent.replace(/^\s+|\s+$/g,""));
				}
			}
		}
	}
	else {
		column_sections_movesections = column_sections_movesections.split("|");

		var i, j, stuff, len2;
		var len = column_sections_startup.length;
		for (i=0; i<len; i++) {
			len2 = column_sections_startup[i].length;
			for (j=0; j<len2; j++) {
				stuff = column_sections_startup[i][j];
				// if not removed, nor moved, then add to move
				if ((column_sections_removesections.indexOf(";"+stuff+";") == -1) && (column_sections_movesections.toString().indexOf(";"+stuff+";") == -1)) {
					if (column_sections_movesections[i] == "") column_sections_movesections[i] = ";";
					column_sections_movesections[i] += stuff + ";";
				}
			}
		}

		column_sections_movesections = column_sections_movesections.join("|");
	}
}

function column_sections_unremove() {
	var mode = null;
	var stuff = "";
	var a = column_sections_removed;
	var b;
	var len = a.childNodes.length;
	for (var i=0; i<len; i++) {
		// if column section
		b = a.childNodes[i];
		if (b.nodeName.toUpperCase() == "DIV" && b.className == "smalldivider") {
			stuff = escape(b.textContent.replace(/^\s+|\s+$/g,""));

			if (column_sections_removesections.indexOf(";"+stuff+";") != -1) {
				mode = null;
			}
			else {
				column_sections_array[stuff] = document.createDocumentFragment();
				mode = true;
			}
		}

		if (mode) {
			column_sections_array[stuff].appendChild(a.childNodes[i]);
			i--;

			len--;
		}
	}

	if (column_sections_removed.length==0) {
		column_sections_removed = null;
	}
}

function column_sections_remove_n_premove(div) {
	var a;

	switch (div) {
		case 0:
			a = COLUMN_LEFT;
			break;
		case 1:
			a = COLUMN_RIGHT;
			break;
	}

	if (a) {
		var tjobba = null;
		var mode = null;
		var stuff = "";
		var b;
		var len = a.childNodes.length;
		for (var i=0; i<len; i++) {
			b = a.childNodes[i];
			// if column section
			if (b.nodeName.toUpperCase() == "DIV" && b.className == "smalldivider") {
				stuff = escape(b.textContent.replace(/^\s+|\s+$/g,""));

				if (column_sections_removesections.indexOf(";"+stuff+";") != -1) {
					mode = 0;
				}
				else if (column_sections_movesections.indexOf(";"+stuff+";") != -1) {
					column_sections_array[stuff] = document.createDocumentFragment();
					mode = 1;
				}
				else {
					if (!tjobba) tjobba = a.childNodes[i];
					mode = null;
				}
			}

			switch (mode) {
				case 0:
					if (!REALTIME) {
						a.removeChild(a.childNodes[i]);
					}
					else {
						if (!column_sections_removed) {
							column_sections_removed = document.createElement('div');
							column_sections_removed.style.display = "none";
							column_sections_removed.id = "qs_column_sections_removed";
						}
						column_sections_removed.appendChild(a.childNodes[i]);
					}

					len--;
					i--;
					break;
				case 1:
					column_sections_array[stuff].appendChild(a.childNodes[i]);

					len--;
					i--;
					break;
			}
		}

		switch (div) {
			case 0:
				column_sections_left = tjobba;
				break;
			case 1:
				column_sections_right = tjobba;
				break;
		}
	}
}

function column_sections_move(div) {
	var a, x;
	var b = null;

	switch (div) {
		case 0:
			a = COLUMN_LEFT;
			b = column_sections_left;
			break;
		case 1:
			a = COLUMN_RIGHT;
			b = column_sections_right;
			break;
	}

	if (a) {
		search = /([^;]+)/g;

		while ((x = search.exec(column_sections_movesections[div])) != null) {
			if (column_sections_array[ x[1] ]) {
				a.insertBefore(column_sections_array[ x[1] ], b);
			}
		}
	}
}

function column_sections_preferences_event(e) {
	var target = e.target;

	var parent = target.parentNode;
	if (parent.nodeName.toLowerCase() != "li") parent = parent.parentNode;

	var a = parent.getElementsByTagName("select");

	var removed = readsections("remove_columnsections");
	var moved = readsections("move_columnsections");

	var b = parent.getAttribute("name");

	var c = new RegExp(";"+b+";","g");
	removed = removed.replace(c, ";");
	if (removed == ";") removed = "";

	moved = moved.replace("|", ";|;");
	moved = moved.replace(c, ";");
	moved = moved.replace(";|;", "|");

	moved = moved.replace(/^;+/,"").replace(/;+$/,"");

	switch (a[0].selectedIndex) {
		case 0:
			break;
		case 1:
			if (removed == "") removed = ";";
			removed += b + ";";
			break;
		case 2:
		case 3:
			moved += "|";
			moved = moved.split("|");
			c = moved[a[0].selectedIndex-2];

			if (c!="" && c!=";") {
				c = c.split(";");

				c.splice(a[1].selectedIndex, 0, b);
				moved[a[0].selectedIndex-2] = c.join(";")
			}
			else {
				c = b;
				moved[a[0].selectedIndex-2] = c;
			}

			moved = moved.join("|");
			break;
	}

	storesections("remove_columnsections", removed);

	moved = moved.replace(/\|+$/,"");
	if (moved) moved = ";" + moved + ";";

	storesections("move_columnsections", moved);

	if (a[0].selectedIndex < 2) {
		a[1].style.visibility = "hidden";
		if (target == a[0]) a[1].selectedIndex = 0;
	}
	else {
		if (target == a[0]) a[1].selectedIndex = 0;
		a[1].style.visibility = "";
	}

	if (REALTIME) {
		if (typeof(REALTIME_FUNCTIONS["column_sections"]) == "function") {
			REALTIME_FUNCTIONS["column_sections"].call(0);
		}
	}
}

function column_sections_preferences(dialog) {
	var heading = LANGUAGE == "SE" ? "Spaltsektioner" : "Column sections";
	var group = addgroup(dialog, heading, null, column_sections_preferences_event);

	var removed = readsections("remove_columnsections");
	var moved = readsections("move_columnsections").replace("|", ";|;");
	var removed_cache = removed;
	var moved_cache = moved;

	var divs = new Array();
	var len=0;
	divs[len++] = "column_left";
	divs[len++] = "column_right";

	if (column_sections_removed) divs[len++] = "qs_column_sections_removed";

	for (var i=0; i<divs.length; i++) {
		divs[i] = "@id='"+ divs[i] +"'";
	}
	query = "//div[" + divs.join(" or ") + "]/div[@class='smalldivider']";

	if (!column_sections_removed) {
		var theresult = xpath(query);
	}
	else {
		var body = document.getElementsByTagName('body')[0];
		body.appendChild(column_sections_removed);
		var theresult = xpath(query);
		body.removeChild(column_sections_removed);
	}

	var sections = new Array();
	var a;
	var len = theresult.snapshotLength;
	for (i=0; i<len; i++) {
		a = theresult.snapshotItem(i).textContent.replace(/^\s+|\s+$/g,"");

		removed_cache = removed_cache.replace(";"+escape(a)+";", ";");
		moved_cache = moved_cache.replace(";"+escape(a)+";", ";");
		sections[sections.length] = a;
	}

	var extracolumns = removed_cache + moved_cache.replace(";|;", ";");
	extracolumns = extracolumns.split(";");
	for (i=0; i<extracolumns.length; i++) {
		if (extracolumns[i] != "") sections[sections.length] = unescape(extracolumns[i]);
	}

	if (!REALTIME) {
		var text_remove = LANGUAGE == "SE" ? "Ta bort" : "Remove";
	}
	else {
		var text_remove = LANGUAGE == "SE" ? unescape("D%F6lj") : "Hide";
	}
	var text_move = LANGUAGE == "SE" ? "Flytta" : "Move";

	var moving = new Array();
	moving[moving.length] = new Array(text_move+" "+unescape("%u2190"), LANGUAGE == "SE" ? unescape("Flytta till v%E4nsterspalten") : "Move to the left column");
	moving[moving.length] = new Array(text_move+" "+unescape("%u2192"), LANGUAGE == "SE" ? unescape("Flytta till h%F6gerspalten") : "Move to the right column");

	var li, label, span, select, option, mode, storedonly, number, b, j, k;
	for (i=0; i<sections.length; i++) {
		storedonly = null;
		number = 1;

		a = sections[i];

		if (removed_cache.indexOf(";"+escape(a)+";") != -1) {
			storedonly = true;
			mode = 1;
		}
		else if (moved_cache.indexOf(";"+escape(a)+";") != -1) {
			storedonly = true;

			b = moved.split("|");
			for (j=0; j<b.length; j++) {
				c = b[j].split(";");
				for (var k=0; k<c.length; k++) {
					if (c[k] == escape(a)) {
						mode = j+2;
						number = k;
						break;
					}
				}
			}
		}
		else if (removed.indexOf(";"+escape(a)+";") != -1) {
			mode = 1;
		}
		else if (moved.indexOf(";"+escape(a)+";") != -1) {
			b = moved.split("|");
			for (j=0; j<b.length; j++) {
				c = b[j].split(";");
				for (var k=0; k<c.length; k++) {
					if (c[k] == escape(a)) {
						mode = j+2;
						number = k;
						break;
					}
				}
			}
		}
		else {
			mode = 0;
		}

		li = document.createElement('li');
		li.setAttribute("name", escape(sections[i]));

		label = document.createElement('label');
		span = document.createElement('span');
		if (!storedonly) span.textContent = sections[i] + " ";
		else span.textContent = sections[i] + " * ";
		label.appendChild(span);

		select = document.createElement('select');

		option = document.createElement('option');
		if (mode == 0) option.selected = true;
		select.appendChild(option);

		option = document.createElement('option');
		option.textContent = text_remove;
		if (mode == 1) option.selected = true;
		select.appendChild(option);

		for (j=0; j<moving.length; j++) {
			option = document.createElement('option');
			option.textContent = moving[j][0];
			option.title = moving[j][1];
			if (mode == j+2) option.selected = true;
			select.appendChild(option);
		}

		label.appendChild(select);
		li.appendChild(label);

		select = document.createElement('select');
		for (j=0; j<sections.length; j++) {
			option = document.createElement('option');
			option.textContent = j+1;
			if (number == j+1) option.selected = true;
			select.appendChild(option);
		}
		if (mode < 2) select.style.visibility = "hidden";
		li.appendChild(select);

		group.appendChild(li);
	}
	var p = document.createElement('p');
	p.textContent = LANGUAGE == "SE" ? unescape("* Sparad inst%E4llning, sektionen finns inte p%E5 nuvarande sida") : "* Stored setting, the section is not on current page";
	dialog.appendChild(p);
}

function readsections(section) {
	var sections = GM_getValue(section, "");
	var a = sections.indexOf(LANGUAGE+"[");
	if (a != -1) {
		var b = sections.indexOf("]", a);
		if (b != -1) {
			sections = sections.substring(a+3, b);
			return ';'+sections+';';
		}
	}
	return "";
}

function storesections(section, sectiondata) {
	var sections = readsections(section);

	var oldsections = LANGUAGE+'['+ sections.substring(1, sections.length-1) +']';

	if (sectiondata && sectiondata != ";;" && sectiondata != ";;;") {
		sectiondata = LANGUAGE+'['+ sectiondata.substring(1, sectiondata.length-1).replace(/\|+$/, "") +']';
	}
	else {
		sectiondata = "";
	}

	if (sections != "") {
		QS_setValue(section, GM_getValue(section, "").replace(oldsections, sectiondata) );
	}
	else {
		QS_setValue(section, GM_getValue(section, "")+sectiondata);
	}
}


function fixtitle() {
	if (GM_getValue("append_datetime", false)) {
		var d = DATETIME;
		var datetimestring = " ";
		datetimestring += d.getFullYear();
		datetimestring += '-';

		if (d.getMonth()<9)	datetimestring += '0';
					datetimestring += d.getMonth()+1;
					datetimestring += '-';
		if (d.getDate()<10)	datetimestring += '0';
					datetimestring += d.getDate();

		datetimestring += ' ';

		if (d.getHours()<10)	datetimestring += '0';
					datetimestring += d.getHours();
					datetimestring += '.';
		if (d.getMinutes()<10)	datetimestring += '0';
					datetimestring += d.getMinutes();
					datetimestring += '.';
		if (d.getSeconds()<10)	datetimestring += '0';
					datetimestring += d.getSeconds();

	}
	else	datetimestring = "";

	var documenttitle = documenttitles.join(" - ");
	if (documenttitle) documenttitle = " - " + documenttitle;

	var title;
	if (!(title = document.getElementsByTagName('title')[0])) {
		title = document.createElement('title');
		document.getElementsByTagName('head')[0].appendChild(title);
	}
	title.textContent = "Qruiser"+documenttitle+datetimestring;
	document.title = "Qruiser"+documenttitle+datetimestring;

	if (LOCATION_PATHNAME=="/photoalbum_nav.php") {
		if (!(title = parent.document.getElementsByTagName('title')[0])) {
			title = document.createElement('title');
			parent.document.getElementsByTagName('head')[0].appendChild(title);
		}
		title.textContent = "Qruiser"+documenttitle+datetimestring;
		parent.document.title = "Qruiser"+documenttitle+datetimestring;
	}
}

function scrollToElement(theelement) {
	var curtop = 0;
	var obj;
	if (theelement.offsetParent) {
		obj = theelement.offsetParent;
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	window.scrollTo(0,curtop);
}

function insertandscrolltodialog(div, noscroll) {
	if (COLUMN_CENTER) {
		if (!thesubmenu) {
			COLUMN_CENTER.insertBefore(div, COLUMN_CENTER.firstChild);
		}
		else {
			COLUMN_CENTER.insertBefore(div, thesubmenu.nextSibling);
		}
	}

	if (!noscroll) scrollToElement(div);
}

function closebutton(event) {
	button = document.createElement('input');
	button.type = "button";
	button.value = LANGUAGE == "SE" ? unescape("St%E4ng") : "Close";

	button.addEventListener("click", event, false);
	return button;
}

function standard_event(e) {
	var target = e.target;

	switch (target.nodeName.toLowerCase()) {
		case "input":
			switch (target.type) {
				case "checkbox":
					if (!target.value) {
						QS_setValue(target.name, target.checked);
					}
					else {
						var a = GM_getValue(target.name, 0);
						var b = parseInt(target.value);
						QS_setValue(target.name, target.checked ? a | b : a ^ b);
					}
					break;

				case "radio":
					if (target.value == "true") {
						QS_setValue(target.name, true);
					}
					else {
						QS_setValue(target.name, target.value);
					}
					break;
			}
			break;

		case "select":
			QS_setValue(target.name, target.options[target.selectedIndex].value);
			break;
	}

	if (REALTIME) {
		if (typeof(REALTIME_FUNCTIONS[target.name]) == "function") {
			REALTIME_FUNCTIONS[target.name].call(0);
		}
	}
}

var dialogs = new Array();
function newdialog(id, heading, text, style, showlanguage) {
	if (dialogs[id]) return false;

// add dialog.class style
	var div = document.createElement('div');
	div.id = id;
	div.className = "qs_dialog";

	// store in array[id][0] = div, [1] = style

	dialogs[id] = new Array(div, addstyle(style));

	var h2 = document.createElement('h2');
	if (!showlanguage) {
		h2.textContent = heading;
	}
	else {
		h2.textContent = heading + " ";
		var img = document.createElement('img');
		img.src = location.protocol+"//icon.qruiser.com/images/flag_"+LANGUAGE+"_large.gif";
		img.alt = LANGUAGE;
		h2.appendChild(img);
	}
	div.appendChild(h2);

	if (text) {
		var p = document.createElement('p');
		p.textContent = text;
		div.appendChild(p);
	}

	return div;
}

function removedialog() {
	var dialog = this.parentNode;
	if (dialog.id && dialogs[dialog.id]) {
		if (dialogs[dialog.id][1]) removestyle(dialogs[dialog.id][1]);
		dialog.parentNode.removeChild(dialog);
		dialogs[dialog.id] = null;
	}
}

function showdialog(dialog) {
	insertandscrolltodialog(dialog);
}

function addclosebutton(dialog) {
	var button = document.createElement('input');
	button.type = "button";
	button.className = "qs_close";
	button.value = LANGUAGE == "SE" ? unescape("St%E4ng") : "Close";

	button.addEventListener("click", removedialog, false);
	dialog.appendChild(button);
}


function addgroup(dialog, heading, text, event, p) {
	// returns group ul
	var div = document.createElement('div');
	div.className = "line";
	var span = document.createElement('span');
	span.className = "header";
	span.textContent = heading;
	div.appendChild(span);
	var ul = !p ? document.createElement('ul') : document.createElement('p');
	if (!event) event = standard_event;
	ul.addEventListener("change", event, false);
	dialog.appendChild(div);
	if (text) {
		var p = document.createElement('p');
		p.textContent = text;
		dialog.appendChild(p);
	}
	return dialog.appendChild(ul);
}

function addoption(ul, type, name, checked, ivalue, text, images) {
	var li = document.createElement('li');
	var label = document.createElement('label');
	var input = document.createElement('input');
	input.type = type;
	input.name = name;
	input.value = ivalue ? ivalue : "";
	input.checked = checked;
	label.appendChild(input);
	if (!images) {
		label.appendChild(document.createTextNode(text));
	}
	else {
		if (typeof(images) == "string") {
			img = document.createElement('img');
			img.alt = "";
			img.src = images;
			label.appendChild(img);
		}
		else {
			for (var i=0; i<images.length; i++) {
				img = document.createElement('img');
				img.alt = "";
				img.src = images[i];
				label.appendChild(img);
			}
		}

		label.appendChild(document.createTextNode(" "+text));
	}
	li.appendChild(label);
	ul.appendChild(li);
}



function rendering_preferences(dialog) {
	var heading = LANGUAGE == "SE" ? "Avancerat" : "Advanced";
	var text = LANGUAGE == "SE" ? unescape("Visa %E4ndringar...") : "Show changes...";
	var group = addgroup(dialog, heading, text);

	var realtimeboolean = GM_getValue("enable_realtime_rendering", false);

	text = LANGUAGE == "SE" ? unescape("n%E4r sidan laddas om (rekommenderas)") : "when the page is reloaded (recommended)";
	addoption(group, "radio", "enable_realtime_rendering", !realtimeboolean, null, text);

	text = LANGUAGE == "SE" ? unescape("direkt (prestandan kan p%E5verkas negativt)") : "directly (the performance can be negatively affected)";
	addoption(group, "radio", "enable_realtime_rendering", realtimeboolean, true, text);
}



function preferences() {
	var heading = LANGUAGE == "SE" ? unescape("Inst%E4llningar") : "Preferences";
	var text = LANGUAGE == "SE" ? unescape("%C4ndringar sparas direkt.") : "Changes are stored immediately.";
	var style = "#qs_preferences ul {list-style: none outside; margin:0; padding: 0;} #qs_preferences li {margin: 0; padding: 0;} #qs_preferences label {cursor: pointer;} #qs_preferences img {vertical-align: baseline;} #qs_preferences p {margin: 0;} .qs_dialog {padding-bottom: 1.5em;} #qs_preferences ul li label span {display: inline-block; width: 20em;}";
	var dialog;

	if (!(dialog = newdialog("qs_preferences", heading, text, style, true))) return;

	column_sections_preferences(dialog);
	functions_preferences(dialog);
	confirm_actions_preferences(dialog);
	login_to_page_preferences(dialog);
	rendering_preferences(dialog);

	addclosebutton(dialog);
	showdialog(dialog);
}

if (typeof(GM_getValue) != "function") {
	preferences = function() {
		alert(LANGUAGE=="SE" ? unescape("Greasemonkey version 0.3 eller h%F6gre kr%E4vs f%F6r att anv%E4nda inst%E4llningar. :(") : "Greasemonkey version 0.3 or higher is required for using preferences. :(");
	}
}
else if (!loggedin) {
	preferences = function() {
		alert(LANGUAGE=="SE" ? unescape("Du m%E5ste vara inloggad f%F6r att kunna %F6ppna inst%E4llningarna.") : "You must be logged in to open the preferences.");
	}
}


function about() {
	var dialog;
	var style = "#qs_about span {font-weight: bold;} .qs_dialog {padding-bottom: 1.5em;}";
	if (!(dialog = newdialog("qs_about", SCRIPTMETA["name"]+' '+SCRIPTMETA["version"], null, style))) return;

	var author = "One of Four";
	var qruiserpage = location.protocol+"//www.qruiser.com/?id=17953";
	var usopage = "http://userscripts.org/users/77159";

	var p = document.createElement('p');
	var stuff = document.createElement('q');
	stuff.textContent = SCRIPTMETA["description"];
	p.appendChild(stuff);
	dialog.appendChild(p);

	p = document.createElement('p');
	stuff = document.createElement('span');
	var text = LANGUAGE == "SE" ? "Utvecklare" : "Developer";
	stuff.textContent = text+":";
	p.appendChild(stuff);

	p.appendChild( document.createTextNode(" "+author+" [ ") );

	stuff = document.createElement('a');
	stuff.href = qruiserpage;
	stuff.textContent = "Qruiser";
	p.appendChild(stuff);

	p.appendChild( document.createTextNode(" | ") );

	stuff = document.createElement('a');
	stuff.href = usopage;
	stuff.textContent = "userscripts.org";
	p.appendChild(stuff);

	p.appendChild( document.createTextNode(" ]") );

	dialog.appendChild(p);

	p = document.createElement('p');
	stuff = document.createElement('a');
	stuff.href = SCRIPTURL;
	text = LANGUAGE == "SE" ? unescape("s hemsida") : "'s homepage";
	stuff.textContent = SCRIPTMETA["name"]+text+" @ userscripts.org";
	p.appendChild(stuff);

	dialog.appendChild(p);

	addclosebutton(dialog);
	showdialog(dialog);
}

var thesubmenu;
var submenustyle;
function submenu() {
	if (thesubmenu) return;

	var myul = document.createElement('ul');
	myul.className = "qs_qsmenu";

	var myli;
	var len = menuarray.length;
	for (var i=0; i<len; i++) {
		myli = document.createElement('li');
		mya = document.createElement('a');
		mya.textContent = menuarray[i][0]+"...";
		mya.addEventListener("click", menuarray[i][1], false);

		myli.appendChild(mya);
		myul.appendChild(myli);
	}

	myli = document.createElement('li');
	mya = document.createElement('a');
	mya.textContent = "[X]";
	mya.title = LANGUAGE == "SE" ? unescape("St%E4ng undermeny") : "Close submenu";
	mya.addEventListener("click", function() {COLUMN_CENTER.removeChild(thesubmenu); removestyle(submenustyle); thesubmenu=submenustyle=null;}, false);

	submenustyle = addstyle(".qs_qsmenu {list-style:none;padding:0;margin:0;overflow:auto;clear:both;display:block;} .qs_qsmenu li {float:left;margin:0;padding:0.5em 0.5em;border-left:1px solid " + window.getComputedStyle(COLUMN_CENTER, null).color + ";} .qs_qsmenu li:first-child {border-left:0;padding-left:0;} .qs_qsmenu a:hover {text-decoration:underline;}");

	myli.appendChild(mya);
	myul.appendChild(myli);

	thesubmenu = COLUMN_CENTER.insertBefore(myul, COLUMN_CENTER.firstChild);
}

var menuarray = new Array();
function menu() {
	if (!UDM || !COLUMN_CENTER) return;

	var text = LANGUAGE == "SE" ? unescape("Inst%E4llningar") : "Preferences";
	menuarray[menuarray.length] = new Array(text, preferences);

	if (typeof(GM_xmlhttpRequest) == "function") {
		text = LANGUAGE == "SE" ? unescape("S%F6k uppdateringar") : "Search for updates";
		menuarray[menuarray.length] = new Array(text, fetchupdate);
	}

	text = LANGUAGE == "SE" ? "Om" : "About";
	menuarray[menuarray.length] = new Array(text, about);


	var len = menuarray.length;
	for (var i=0; i<len; i++) {
		GM_registerMenuCommand(MENUPREFIX+": "+menuarray[i][0]+"...", menuarray[i][1]);
	}


	var myli = document.createElement('li');
	var mya = document.createElement("a");
	mya.href = "javascript:void(0);"
	mya.addEventListener("click", submenu, false);
	mya.textContent = "QS";
	mya.title = SCRIPTMETA["name"];
	myli.appendChild(mya);

	var myul = document.createElement('ul');

	var myli2;
	for (var i=0; i<len; i++) {
		myli2 = document.createElement('li');
		mya = document.createElement('a');
		mya.href = "javascript:void(0);"
		mya.textContent = menuarray[i][0]+"...";
		mya.addEventListener("click", menuarray[i][1], false);

		myli2.appendChild(mya);
		myul.appendChild(myli2);
	}

	myli.appendChild(myul);
	UDM.appendChild(myli);
}

function firsttime() {
	if (typeof(GM_getValue) == "function") {
		if (GM_getValue("version", "") != SCRIPTMETA["version"] && UDM && loggedin) {
			// new version, update
			GM_setValue("version", SCRIPTMETA["version"]);

			var text = LANGUAGE=="SE" ?
				unescape("Det h%E4r %E4r f%F6rsta g%E5ngen du k%F6r den h%E4r versionen av "+SCRIPTMETA["name"]+". Ska jag %F6ppna inst%E4llningarna?\n(Du kan %F6ppna dem senare fr%E5n Qruisers meny.)") :
				"This is the first time you run this version of "+SCRIPTMETA["name"]+". Shall I open the preferences?\n(You can open them later from Qruiser's menu.)";
			if (confirm(text)) {
				preferences();
			}
		}
	}
}

function easter_egg() {
	if (LOCATION_PATHNAME == "/" && LOCATION_SEARCH.indexOf("?id=17953") == 0) {
		var home;
		if (home = document.getElementById("home_17953")) {
			var egg = document.createElement("div");

			var img = document.createElement("img");
			img.style.verticalAlign = "text-top";
			img.src = location.protocol+"//icon.qruiser.com/images/messageicons/4.gif";
			egg.appendChild(img);

			egg.appendChild( document.createTextNode( LANGUAGE=="SE"? " Qruiserscripts utvecklare " : " Qruiserscript's developer" ) );

			egg.appendChild(img.cloneNode(false));
			home.insertBefore(egg, home.firstChild);
		}
	}
}


function main() {
	STARTUP = true;

	// in order to prevent "misclicks" as soon as possible
	confirm_actions();

	if (COLUMN_LEFT) COLUMN_LEFT.style.display = "none";
	if (COLUMN_RIGHT) COLUMN_RIGHT.style.display = "none";

	if (REALTIME) {
		fiximages();
		fixxxx();
	}
	malformedsections();

	wapimage();
	top_bar();
	other_members_block();

	last_discussion_page_link();

	column_sections();
	if (!REALTIME) {
		fiximages();
		fixxxx();
	}

	if (COLUMN_LEFT) COLUMN_LEFT.style.display = "";
	if (COLUMN_RIGHT) COLUMN_RIGHT.style.display = "";

	format_toolbars();
	text_counters();
	introductions();

	go_to_film_link();
	film_save_link();

	unshorten_long_nicknames();
	reply_quote_links();
	all_message_icons();
	entry_background_color();

	fixaddscribblelinks();

	if (COLUMN_LEFT) {
		if (loggedin && !queue()) {
			loggedinswitch();
		}
		else {
			notloggedinswitch();
		}
		if (documenttitles.length == 0) {
			otherswitch();
		}
	}
	else {
		specialswitch();
	}

	flushstyles();
	menu();
	fixtitle();

	easter_egg();

	firsttime();
	autoupdate();

	link_album_image_to_next();

	XPATH_CACHE = STARTUP = null;
}

if (!login_to_page()) {
	main();
}

})();
