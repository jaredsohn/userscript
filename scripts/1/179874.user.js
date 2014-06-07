// ==UserScript==
// @name           Smart vills Renamer
// @author         Bassem
// @namespace      TW
// @description    Gives you many option to choose from on how to rename tour village
// @include        http://ae*.tribalwars.ae/game.php?*&mode=commands*
// @include        http://us*.tribalwars.us/game.php?*&mode=commands*
// @version        1.0
// ==/UserScript==

var type = prompt("Select the method you wish to Rename your Villages by :\n\n\n 1 : Normal\n\n 2 : with Index\n\n 3 : Distance from a certain coords\n\n 4 : In the form of Random coordinates\n\n 5 : Villages list as HTML code with points from the player profile page\n\n 6 : Import/Export Old Village Names");
var doc = document;
if (window.frames.length > 0)
	doc = window.main.document;

var inputs = doc.getElementsByTagName('input');

function _lz(n, l) {
	n = String(n);
	while (n.length < l)
	n = "0" + n;
	return n;
}

/*--- Type 1 --- Normal Villages Renamer*/

if (type == '1') {
	var text = prompt("Naming My Villages", value = '');
	for ( i = 0; i < inputs.length; i++) {
		if (inputs[i].id.indexOf('edit_input') != -1) {
			inputs[i].value = text;
			inputs[i + 1].click();
		}
	}

	/*--- Type 2 --- Villages Renamer  Name with index */

} else if (type == '2') {
	var text = prompt("Naming My Villages", value = '');
	var len = parseInt(prompt("Length of the Number:", 4));
	var idx = parseInt(prompt("index to begin with\n1 or 1001 or 2001:", 1)) - 1;

	for ( i = 0; i < inputs.length; i++) {
		if (inputs[i].id.indexOf('edit_input') != -1) {

			inputs[i].value = text + ' ' + _lz(++idx, len);
			inputs[i + 1].click();
		}
	}

	/*--- Type 3 --- Villages Renamer in the form of distance from a certain coords*/

} else if (type == '3') {
	var UnitSpeed;
	var doc = document;
	var coords = prompt("Coords?", "400|400");
	var type = prompt("Which code do you wish to use? \n sp: &#1585;&#1605;&#1581; \n sw: &#1587;&#1610;&#1601; \n hc: &#1579;&#1602;&#1610;&#1604; \n ram: &#1605;&#1581;&#1591;&#1605;&#1577; \n lc: &#1582;&#1601;&#1610;&#1601; \n noble: &#1606;&#1576;&#1610;&#1604;", "sp");
	if (type == 'sp') {
		UnitSpeed = 18;
	}
	if (type == 'sw') {
		UnitSpeed = 22;
	}
	if (type == 'hc') {
		UnitSpeed = 11;
	}
	if (type == 'ram') {
		UnitSpeed = 30;
	}
	if (type == 'lc') {
		UnitSpeed = 10;
	}
	if (type == 'noble') {
		UnitSpeed = 35;
	}
	var X = -1;
	var Y = -1;
	ths = doc.getElementsByTagName('th');
	for ( i = 0; i < ths.length; i++) {
		index = ths[i].innerHTML.indexOf('&#1575;&#1604;&#1602;&#1585;&#1610;&#1607;');
		if (index != 0) {
			X = coords.split('|')[0];
			Y = coords.split('|')[1];
			finish();
		}
	}
	function sq(x) {
		return Math.pow(x, 2);
	}

	function distance(x, y) {
		str = Math.sqrt(sq(X - x) + sq(Y - y));
		if (str < 10)
			str = '000' + str;
		else if (str < 100)
			str = '00' + str;
		else if (str < 1000)
			str = '0' + str;
		return str
	}

	function finish() {
		var inputs = doc.getElementsByTagName('input');
		for ( i = 0; i < inputs.length; i++) {
			id = inputs[i].id;
			index = id.indexOf('edit_input');
			if (index != -1) {
				id = id.substring(index + 11);
				str = doc.getElementById('label_text_' + id).innerHTML;
				mid = str.lastIndexOf('|');
				x = str.substring(str.lastIndexOf('(') + 1, mid);
				y = str.substring(mid + 1, str.lastIndexOf(')'));
				var time = Math.floor(distance(x, y) * UnitSpeed / 60);
				var tim = Math.round(distance(x, y) * UnitSpeed % 60);
				if (tim < 10) {
					tim = '0' + tim;
				}
				if (time < 10) {
					inputs[i].value = '0' + time.toFixed(0) + ':' + tim;
				} else {
					inputs[i].value = time.toFixed(0) + ':' + tim;
				}
				inputs[i + 1].click();
			}
		}
	}

	/*--- Type 4 --- Villages Renamer in the form of Random coordinates	*/

} else if (type == '4') {
	var XK = 6;
	var YK = 5;
	function randCoords() {
		return Math.round(Math.random() * 999) + '|' + Math.round(Math.random() * 999);
	}

	function randCoords(x, y) {
		return x + "" + rand99() + '|' + y + "" + rand99();
	}

	function rand99() {
		num = Math.round(Math.random() * 99);
		if (num < 10)
			num = '0' + num;
		return num;
	}

	var inputs = doc.getElementsByTagName('input');
	for ( i = 0; i < inputs.length; i++) {
		if (inputs[i].id.indexOf('edit_input') != -1) {
			inputs[i].value = randCoords(XK, YK);
			inputs[i + 1].click();
		}
	}

	/*--- Type 5 --- Villages list as HTML code with points from the player profile page*/

} else if (type == '5') {
	function getGameDoc() {
		getdoc = window.document;
		if (! getdoc.URL.match('game\.php')) {
			for (var i = 0; i < window.frames.length; i++) {
				if (window.frames[i].document.URL.match('game\.php')) {
					getdoc = window.frames[i].document;
				}
			}
		}
		return getdoc;
	}

	doc = getGameDoc();
	function main(doc) {
		var getMain = doc.getElementsByTagName("TABLE");
		for (var a = 0; a < getMain.length; a++) {
			if (getMain[a].className == "main") {
				var getTable1 = getMain[a].getElementsByTagName("TABLE")[1];
				var clonePlayer = getTable1.getElementsByTagName("TR")[0].cloneNode(true);
				var clonePoints = getTable1.getElementsByTagName("TR")[1].cloneNode(true);
				var cloneRang = getTable1.getElementsByTagName("TR")[2].cloneNode(true);
				var cloneAlly = getTable1.getElementsByTagName("TR")[3].cloneNode(true);
				if (!getTable1.getElementsByTagName("A")[4]) {
				} else {
					var getAkte = getTable1.getElementsByTagName("A")[4].href;
					var AkteSplit = getAkte.split(".");
					var welt = AkteSplit[0].slice(8, 10);
					AkteSplit = getAkte.split("&");
					var pit = AkteSplit[1];
				}
				var getTable2 = getMain[a].getElementsByTagName("TABLE")[2];
				var getRows = getTable2.getElementsByTagName("TR");
				for (var c = 0; c < getRows.length; c++) {
					if (getRows[c].firstChild.nodeName == "TD") {
						getRows[c].getElementsByTagName("TD")[1].firstChild.insertData(0, "[village]");
						getRows[c].getElementsByTagName("TD")[1].firstChild.insertData(getRows[c].getElementsByTagName("TD")[1].firstChild.data.length, "[/village]");
						getRows[c].removeChild(getRows[c].firstChild);
					}
				}
				getRows[0].removeChild(getRows[0].firstChild.nextSibling);
				if (!getTable1.getElementsByTagName("A")[4]) {
				} else {
					var newTR = doc.createElement("TR");
					var newTD = doc.createElement("TD");
					var newText = doc.createTextNode("");
					newTD.appendChild(newText);
					newTR.appendChild(newTD);
					getTable2.firstChild.nextSibling.insertBefore(newTR, getTable2.getElementsByTagName("TR")[0]);
				}
				getTable2.firstChild.nextSibling.insertBefore(cloneAlly, getTable2.getElementsByTagName("TR")[0]);
				getTable2.getElementsByTagName("A")[0].firstChild.insertData(0, "[ally]");
				getTable2.getElementsByTagName("A")[0].firstChild.insertData(getTable2.getElementsByTagName("A")[0].firstChild.data.length, "[/ally]");
				getTable2.firstChild.nextSibling.insertBefore(cloneRang, getTable2.getElementsByTagName("TR")[0]);
				getTable2.firstChild.nextSibling.insertBefore(clonePlayer, getTable2.getElementsByTagName("TR")[0]);
				getTable2.getElementsByTagName("TH")[0].firstChild.insertData(0, "[player]");
				getTable2.getElementsByTagName("TH")[0].firstChild.insertData(getTable2.getElementsByTagName("TH")[0].firstChild.data.length, "[/player]");
			}
		}
	}

	if (!doc.URL.match('screen=info_player')) {
		alert('You must be in the player profile page!');
	} else {
		main(doc);
	}

	/*--- Type 6 --- Import/Export Old Village Names*/

} else if (type == '6') {
	var sep = [";", "#"];
	if (document.URL.indexOf("screen=overview_villages&mode=combined") > 0) {
		var wtd = prompt("Enter [1] for export,\n [2] for import", '2');
		if (wtd == "import") {
			inputlist();
		} else {
			outputlist();
		}
	} else {
		alert("This script must be run from the preview combined");
	}
	function outputlist() {
		var vlist = new String();
		var inputs = document.getElementsByTagName('span');
		for ( i = 0; i < inputs.length; i++) {
			if (inputs[i].id.indexOf('label_text') != -1) {
				var arr = inputs[i].innerHTML.split(" ");
				vlist = vlist + inputs[i].id.slice(11) + sep[1];
				for ( x = 0; x < arr.length - 2; x++) {
					vlist = vlist + arr[x] + ' ';
				}
				vlist = vlist + sep[0];
			}
		}
		if (vlist) {
			output = window.open('', '', 'height=300,width=300');
			output.document.open();
			output.document.write('<textarea rows="10" cols="30" onclick="javascript:select();">' + vlist + '</textarea>');
			output.document.close();
		}
	}

	function inputlist() {
		var vils = new Array();
		var reply = prompt('Enter the list that you previously exported', '');
		p = reply.split(sep[0]);
		for ( i = 0; i < p.length; i++) {
			m = p[i].split(sep[1]);
			vils[m[0]] = m[1];
		}
		var inputs = document.getElementsByTagName('input');
		for ( i = 0; i < inputs.length; i++) {
			if (inputs[i].id.indexOf('edit_input') != -1) {
				if (vils[inputs[i].id.slice(11)]) {
					inputs[i].value = vils[inputs[i].id.slice(11)];
					inputs[i + 1].click();
				}
			}
		}
	}

}
/*------------------------------------*/
void (0);

