// ==UserScript==
// @name		سيكربت الملاحظت عند الهجوم
// @namespace		agrafix.net
// @description		Ermöglicht es Notizen in die Angriffsbestätigunsseite einzufügen
// @include		http://de*.ae-tribalwars.ae/game.php?village=*&screen=place&try=confirm*
// @include		http://de*.die-staemme.de/game.php?village=*&screen=map*
// @include		http://de*.die-staemme.de/game.php?village=*&screen=settings&mode=settings*
// ==/UserScript==

// @version 2.0b

dsData = unsafeWindow.game_data;

function main() {

	if (loadSetting("ds_attacknote_map") == null) {
		saveSetting("ds_attacknote_map") = "1";
	}

	if (dsData["screen"] == "settings") {
		var table = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/form/table");
		
		var thr = document.createElement("tr");
		var th = document.createElement("th");
		th.setAttribute("colspan", "2");
		th.innerHTML = "ملاحظات عن تأكيد الهجوم";
		thr.appendChild(th);
		table.appendChild(thr);
		
		var tr = document.createElement("tr");
		
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		
		td1.innerHTML = "على الخريطة:";
		
		var inp = document.createElement("input");
		inp.type = "checkbox";
		inp.id = "ds_attacknote_map";
		inp.checked = (loadSetting("ds_attacknote_map") == "1" ? true : false);
		inp.addEventListener("click", function (event) {
			if (event.target.checked == true) {
				saveSetting("ds_attacknote_map", "1");
			}
			else {
				saveSetting("ds_attacknote_map", "0");
			}
		}, false);
		
		td2.appendChild(inp);
		
		tr.appendChild(td1);
		tr.appendChild(td2);
		
		table.appendChild(tr);
		
	
	}

	if (dsData["screen"] == "place") {
		// row
		var tr = document.createElement("tr");
		
		// td
		var td1 = document.createElement("td");
		td1.innerHTML = "الملاحظات: ";
		tr.appendChild(td1);
		
		// td2
		var td2 = document.createElement("td");
		// input
		var input = document.createElement("input");
		input.id = "dsnote";
		input.value = loadSetting(getUnique());
		input.setAttribute('style', 'font-size:8pt;width:98%;');
		input.addEventListener('keyup', function(){
			var note = document.getElementById("dsnote").value;
			
			saveSetting(getUnique(), note);
			
		}, false);
		td2.appendChild(input);
		
		tr.appendChild(td2);
		
		// table
		var table = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table")
		table.appendChild(tr);
	}
	
	if (dsData["screen"] == "map" && loadSetting("ds_attacknote_map") == "1") {
	
		// add attacknote row
		var tr = document.createElement("tr");
		tr.id = "ds_attacknote_row";
		
		var td1 = document.createElement("td");
		td1.innerHTML = "Notiz:";
		tr.appendChild(td1);
		
		var td2 = document.createElement("td");
		td2.id = "ds_attacknote";
		td2.innerHTML = "";
		tr.appendChild(td2);
		
		var table = $gid("info_content");
		table.appendChild(tr);
	
		// get popup element
		var popup = $gid("map_popup");
		
		if (popup.addEventListener) {
			popup.addEventListener('DOMAttrModified', OnAttrModified, false);
		}
		else if (popup.attachEvent) {
			popup.attachEvent ('onpropertychange', OnAttrModified);
		}
	}
}

main();


/*
 * The function library
 * 
 */ 
 
function OnAttrModified(event) {
	
	if (event.attrChange == 1) {
		//GM_log(event.attrName + " CHANGED: " + event.prevValue + " to " + event.newValue + ".");
		
		if (event.attrName == "style")  {
		
			if (event.newValue == "display: table-row;") {
				var title = $gid("info_title").innerHTML;
				var Exp = /\(([0-9]*)\|([0-9]*)\)/;
				Exp.exec(title);
				
				var x = parseInt(RegExp.$1);
				var y = parseInt(RegExp.$2);

				var villageInfo = unsafeWindow.TWMap.villages[x * 1000 + y];
				
				var note = loadSetting("ds_note_" + dsData["village"]["id"] + "|" + villageInfo["id"]);
			
				if (note != null) {
					$gid("ds_attacknote_row").style.display = "table-row";
					$gid("ds_attacknote").innerHTML = note;
				}
				
			}
			if (event.newValue == "display: none;") {
				$gid("ds_attacknote_row").style.display = "none";
			}
		}
	}
}
 
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(id) {
	var el = document.getElementById(id);

	return el;
}

function getUnique() {
	var link = $xpath("/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a");
	var villID = link.getAttribute("href").split("village&id=")[1];

	return "ds_note_" + dsData["village"]["id"] + "|" + villID
}

//
// Use cookies.
// based on PPK: http://www.quirksmode.org/js/cookies.html
//

function saveSetting(k, v) {
	var days = 30;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else {
		var expires = "";
	}
	
	window.document.cookie = k + "=" + v + expires + "; path=/";
}

function loadSetting(k) {
	var nameEQ = k + "=";
	var ca = window.document.cookie.split(';');
	for( var i=0; i < ca.length; i++) {
		var c = ca[i];
		while ( c.charAt(0)==' ' ) {
			c = c.substring(1,c.length);
		}
		if ( c.indexOf(nameEQ) == 0 ) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;

}5581