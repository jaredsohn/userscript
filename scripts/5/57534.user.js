// ==UserScript==
// @name				DSsendReportsToOBST
// @author				Heinzel
// @description			Hiermit kann man auf Tastendruck Berichte zu einem OBST-Server schicken
// @namespace			http://userscripts.org
// @include			http://*.die-staemme.de/game.php*screen=report*view=*
// ==/UserScript==


// Code fuer die DS-OBST Schnittstelle: http://np.gfx-dose.de/1584/DS-OBST---AJAX-interface-extension/


function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function openPrefPopup(closePrefPopup) {
	var container = document.getElementById("prefContainer");
	container.style.display = "block";
	
	var link = document.getElementById("openerLink");
	link.href = "javascript: (" + closePrefPopup + ")(" + arguments.callee + ");";
}

function closePrefPopup(openPrefPopup) {
	var container = document.getElementById("prefContainer");
	container.style.display = "none";
	
	var link = document.getElementById("openerLink");
	link.href = "javascript: (" + openPrefPopup + ")(" + arguments.callee + ");";
}

function load(what) {
	switch(what) {
		case 'group':
			var output = GM_getValue('group', 'keine');
			break;
		case 'key':
			var output = GM_getValue('key', 'e');
			break;
		case 'keyCode':
			var output = GM_getValue('keyCode', '101');
			break;
		case 'url':
			var output = GM_getValue('url', '');
			break;
		case 'user':
			var output = GM_getValue('user', '');
			break;
		case 'pwhash':
			var output = GM_getValue('pwhash', '');
			break;
		case 'pass':
			var output = GM_getValue('pass', '');
			break;
		case 'rids':
			var output = GM_getValue('rids', 'new function() {this.ds_rids=[],this.length=0}');
			output = eval(output);
			break;
		default:
			window.alert('Ladevorgang "' + what + '" nicht definiert! \nBitte wenden Sie sich an den Scriptersteller!');
			return '';
	}
	
	return output;
}

function convertKeyCode(key) {
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	for(var x = 0; x < alphabet.length; x++) {
		if(key == alphabet[x].toUpperCase() || key == alphabet[x]) {
			var keyCode = x+65;
		}
	}
	
	return keyCode;
}

function savePrefs() {
	var group = document.getElementById("group").value;
	var url = document.getElementById("url").value;
	var key = document.getElementById("key").value;
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	var keyCode = convertKeyCode(key);
	var pwhash = MD5(pass);
	
	GM_setValue('group', group);
	GM_setValue('key', key);
	GM_setValue('keyCode', keyCode);
	GM_setValue('url', url);
	GM_setValue('user', user);
	GM_setValue('pass', pass);
	GM_setValue('pwhash', pwhash);
	
	window.location.reload();
}

function createPrefPopup(cell, curGroup, curKey, curKeyCode, curURL, curUser, curPass) {
	// Container-Div erstellen
	var div = document.createElement("div");
	div.style.border = "2px solid #804000";
	div.style.backgroundColor = "#F1EBDD";
	div.style.position = "absolute";
	div.style.marginTop = "-0px";
	div.style.marginLeft = "110px";
	div.style.padding = "12px";
	div.style.display = "none";
	div.id = "prefContainer";
	cell.appendChild(div);
	
	// Ueberschrift erstellen
	var title = document.createElement("h3");
	title.innerHTML = "DS-OBST Berichteeinleser - Einstellungen";
	div.appendChild(title);
	div.innerHTML += "<br />";
	
	// Tabelle erstellen
	var table = document.createElement("table");
	table.className = "vis";
	table.style.width = "70%";
	table.style.align = "center";
	table.style.emptyCells = "show";
	div.appendChild(table);
	
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	
	// Zeile fuer den Kopf 
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var head_cell = document.createElement("th");
	head_cell.style.padding = "3px";
	head_cell.colSpan = "2";
	head_cell.innerHTML = "Bitte eingeben";
	row.appendChild(head_cell);
	
	// Zeile fuer die URL
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	cell.innerHTML = "URL: ";
	row.appendChild(cell);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	row.appendChild(cell);
	
	var field = document.createElement("input");
	field.id = "url";
	field.type = "text";
	field.value = curURL;
	cell.appendChild(field);
	
	// Zeile fuer Gruppeneinstellungen
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	cell.innerHTML = "Gruppe: ";
	row.appendChild(cell);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	row.appendChild(cell);
	
	var field = document.createElement("input");
	field.id = "group";
	field.type = "text";
	field.value = curGroup;
	cell.appendChild(field);
	
	// Zeile zum Einstellen Taste, auf die reagiert wird
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	cell.innerHTML = "Taste";
	row.appendChild(cell);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	row.appendChild(cell);
	
	var field = document.createElement("input");
	field.id = "key";
	field.type = "text";
	field.value = curKey;
	cell.appendChild(field);
	
	var field = document.createElement("input");
	field.id = "keyCode";
	field.type = "hidden";
	field.value = curKeyCode;
	cell.appendChild(field);
	
	// Zeile fuer den Nutzernamen des Users
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	cell.innerHTML = "Nick";
	row.appendChild(cell);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	row.appendChild(cell);
	
	var field = document.createElement("input");
	field.id = "user";
	field.type = "text";
	field.value = curUser;
	cell.appendChild(field);
	
	// Zeile fuer das Passwort des Users
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	cell.innerHTML = "Passwort";
	row.appendChild(cell);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.style.width = "50%";
	row.appendChild(cell);
	
	var field = document.createElement("input");
	field.id = "pass";
	field.type = "password";
	field.value = curPass;
	cell.appendChild(field);
	
	// Zeile fuer den Speicher-Button
	var row = document.createElement("tr");
	tbody.appendChild(row);
	
	var cell = document.createElement("td");
	cell.style.padding = "3px";
	cell.colSpan = "2";
	cell.style.textAlign = "right";
	row.appendChild(cell);
	
	var button = document.createElement("button");
	button.type = "button";
	button.style.padding = "0px";
	button.innerHTML = "Speichern";
	button.addEventListener('click', savePrefs, false);
	cell.appendChild(button);
}

function createOverview() {
	var row = _evaluate('//td[.="Gesendet"]/parent::tr')[0];
	
	var new_row = document.createElement("tr");
	row.parentNode.insertBefore(new_row, row);
	
	var cell = document.createElement("td");
	cell.innerHTML = "DS-OBST Status&nbsp;"
	new_row.appendChild(cell);
	
	var link = document.createElement("a");
	link.id = "openerLink";
	link.href = "javascript: (" + openPrefPopup + ")(" + closePrefPopup + ");";
	cell.appendChild(link);
	
	var image = document.createElement("img");
	image.style.height = "10px";
	image.src = "http://" + location.host + "/graphic/rename.png";
	image.alt = "DS-OBST Berichteeinleser - Einstellugen";
	image.title = "DS-OBST Berichteeinleser - Einstellugen";
	link.appendChild(image);
	
	var cell_status = document.createElement("td");
	cell_status.id = "status";
	cell_status.style.fontStyle = "italic";
	cell_status.innerHTML = "warte auf Befehl";
	new_row.appendChild(cell_status);
	
	return cell;
}

function checkPressedKey(event) {
	var keyCode = document.getElementById("keyCode").value;
	if(event.which == keyCode) {
		sendReport();
	}
}

function getWorld() {
	var server = location.host.split(".")[0];
	var world = server.split("de")[1];
	
	return world;
}

function doRequest(method, url, data, onload, onerror) {
	GM_xmlhttpRequest({
		method: method.toUpperCase(),
		url: url, 
		headers: {
			'Content-type': 'application/x-www-form-urlencoded'
		}, 
		data: data, 
		onload: onload,
		onerror: onerror
	});
}

function _getNodeTextRecursively(node, delimeter) {
	var result = '';
	if(node.nodeType == 3) {
		if(node.nodeValue && !node.nodeValue.match(/^\s+$/)) {
			result += _trim(node.nodeValue)+delimeter;
		}
	}
	
	if(node.hasChildNodes()) {
		for(var k=0; k<node.childNodes.length; k++) {
			result += _getNodeTextRecursively(node.childNodes[k], delimeter);
		}
	}
	
	return result;
}

function _trim (str) {
    return str.replace (/^\s+/, '').replace (/\s+$/, '');
}

function error() {
	// Fehlermeldung ausgeben
	var status = document.getElementById("status");
	status.style.color = arguments[1] ? arguments[1] : "red";
	
	if(typeof arguments[0] != "boolean") {
		status.innerHTML = arguments[0];
	} else {
		status.innerHTML = "Fehler! Erst alle Daten setzen!";
	}
	
	if(arguments[0] === true) {
		// Das Einstellungs-Popup oeffnen
		openPrefPopup(closePrefPopup);
	}
	
	return false;
}

function saveRids(ds_rid, obst_rid) {
	// Alle report-ids laden
	var all_rids = load('rids');
	
	// Falls es zu einer doppel-speicherung kam, dies in der Fehlerkonsole vermerken, mit beiden rids
	if(all_rids['ds_' + ds_rid]) {
		GM_log('Bericht bereits einmal eingelesen! \nds_rid: ' + ds_rid + '\nobst_rid: ' + obst_rid);
		return false;
	} else {
		all_rids['ds_' + ds_rid] = obst_rid;
		all_rids.ds_rids.push(ds_rid);
		all_rids.length++;
	}
	
	// das all_rids-objekt zu einem string aufloesen
	var string = 'new function() {';
	for(var x = 0; x < all_rids.length; x++) {
		string += 'this.ds_' + all_rids.ds_rids[x] + '=' + all_rids['ds_' + all_rids.ds_rids[x]] + ',';
	}
	string += 'this.length=' + all_rids.length + ',';
	string += 'this.ds_rids=[\'' + all_rids.ds_rids.join("','") + '\']';
	string += '}';
	
	GM_setValue('rids', string);
}

function checkRequestResult(responseDetails) {
	var doc = responseDetails.responseText;
	var msg = doc.match(/<message>(.+?)<\/message>/)[1];
	if(msg != "The report has been parsed successfully.") {
		// evtl. Fehler melden
		error(msg);
	} else {
		var cur_obst_rid = doc.match(/<reportid>(\d+)<\/reportid>/)[1];
		var url = load('url') + "/index.php?page=reports&action=view&id=" + cur_obst_rid;
		
		// Erfolg melden
		error("<a href = '" + url + "' >Bericht</a> erfolgreich eingelesen", 'green');
		
		// die rid mit der ds-rid speichern
		var cur_ds_rid = location.href.match(/view=(\d+)/)[1];
		saveRids(cur_ds_rid, cur_obst_rid);
	}
	
	document.removeEventListener('keyup', checkPressedKey, false);
}

function requestError(responseDetails) {
	error(responseDetails.statusText);
}

function sendReport() {
	// Ueberpruefen ob eine URL gesetzt wurde
	var url = unescape(load('url'));
		if(url == '') return error(true);
	url += "/ajax.php?action=parse_report";
	
	// status auf 'senden' setzen
	var status = document.getElementById("status");
	status.style.color = "blue";
	status.innerHTML = "wird gesendet!";
	
	// Daten ermitteln und codieren
	var group = escape(load('group'));
		if(group == 'keine') group = -1;
	var user = escape(load('user'));
		if(user == '') return error(true);
	var pwhash = load('pwhash');
		if(pwhash == '') return error(true);
	var world = getWorld();
	
	var data = "report=" + window.text + "&user=" + user + "&pass=" + pwhash + "&group=" + group + "&world=" + world;
	
	// Daten senden
	doRequest('POST', url, data, checkRequestResult, requestError);
}

(function main() {
	// Eine kleine Uebersicht hinzufuegen
	var cell = createOverview();
	
	// Daten laden
	var group = load('group');
	var url = load('url');
	var user = load('user');
	var pass = load('pass');
	var key = load('key');
	var keyCode = load('keyCode');
	
	// Das Einstellungs-Feld erstellen
	createPrefPopup(cell, group, key, keyCode, url, user, pass);
	
	// Berichte-ID mit den gespeicherten IDs vergleichen 
	//falls bereits vorhanden, dies anzeigen und dann die Ausfuehrung des Scripts beenden
	var cur_ds_rid = location.href.match(/view=(\d+)/)[1];
	var rids = load('rids');
	
	if(rids['ds_' + cur_ds_rid]) {
		var cur_obst_rid = rids['ds_' + cur_ds_rid];
		var status = document.getElementById("status");
		status.style.color = "green";
		
		if(url == '') {
			status.innerHTML = "Bericht bereits eingelesen";
		} else {
			var rep_url = url + "/index.php?page=reports&action=view&id=" + cur_obst_rid;
			status.innerHTML = "<a href = '" + rep_url + "' >Bericht</a> bereits eingelesen";
		}
		return;
	}
	
	// Den Bericht-Text ermitteln
	window.text = escape(_getNodeTextRecursively(_evaluate('//th[.="Betreff"]/parent::tr/parent::tbody')[0], ' ').replace(/(Dorf:|Anzahl:)/g, '\n$1'));
	
	// Den Eventlistener setzen, der aufpasst ob die gespeicherte Taste gedrueckt wird
	document.addEventListener('keyup', checkPressedKey, false);
})();



/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}