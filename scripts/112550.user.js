// ==UserScript==
// @name           Filtrowanie rozkazów
// @namespace      http://code.google.com/p/plemiona-skrypty/
// @description    Filtrowanie rozkazów (dla wersji 7.4)
// @include        http://pl*.plemiona.pl/game.php*screen=overview_villages*mode=comm*
// @include        http://pl*.plemiona.pl/game.php*screen=overview_villages*mode=inco*
// @include        http://pl*.plemiona.pl/game.php*screen=info_village*
// ==/UserScript== 

if (window.opera) {
	unsafeWindow = window;
}


var fakesHidden = false;

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function isFake(tableRow) {
	if (tableRow.getElementsByTagName('noscript').length > 0) {
		tableRow.innerHTML = trim(tableRow.innerHTML).substring(10, tableRow.innerHTML.length - 11);
	}
	var cells = tableRow.getElementsByTagName('td');
	if (cells.length == 15) {
		var space = [1, 1, 1, 1, 2, 4, 5, 6, 6, 8, 10, 100];
		var spaceSum = 0;
		for (i = 0; i < 12; i++ ) {
			spaceSum += (parseInt(cells[3 + i].textContent) * space[i]);
		}
		return (spaceSum < 250 && parseInt(cells[14].textContent) == 0);
	} else if (cells.length == 12) {
		var space = [1, 1, 1, 2, 4, 6, 6, 8, 100];
		var spaceSum = 0;
		for (i = 0; i < 9; i++ ) {
			spaceSum += (parseInt(cells[3 + i].textContent) * space[i]);
		}
		return (spaceSum < 250 && parseInt(cells[11].textContent) == 0);
	}

}

function addListBox(villages) {
	var tab = document.getElementById("paged_view_content").getElementsByTagName('table')[1];
	var cells = tab.getElementsByTagName('tr')[0].getElementsByTagName('td');
	for (var i = 0; i < cells.length; i++) {
		cells[i].setAttribute('width', '17%');
	}
	var td = document.createElement('td');
	td.setAttribute('width','17%');
	tab.getElementsByTagName('tr')[0].appendChild(td);
	var select = document.createElement('select');
	var option = document.createElement('option');
	option.text = "Wszystkie"
	option.value = "Wszystkie";
	select.add(option,null);
	for (var i = 0; i < villages.length; i++) {
		option = document.createElement('option');
		option.text = villages[i];
		option.value = villages[i];
		select.add(option,null);
	}
	select.setAttribute("onchange", "filter(this.value)");
	select.setAttribute("onkeyup", "filter(this.value)");
	select.setAttribute("id", "villageSelect");
	td.appendChild(select);

	var td = document.createElement('td');
	td.setAttribute('width','17%');
	tab.getElementsByTagName('tr')[0].appendChild(td);

	if (document.URL.indexOf("mode=comm") >= 0) {
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("onchange", "setFakesHidden(this.checked);");
		td.appendChild(checkbox);
		td.innerHTML += "Ukryj fejki";
		
		var summaryRow = document.createElement('tr');
		summaryRow.setAttribute("id", "summaryRow");
		summaryRow.style.display = "none";
		for (var i = 0; i < 14; i++) 
			summaryRow.appendChild(document.createElement('th'));
		var cells = summaryRow.getElementsByTagName('th');
		cells[0].setAttribute('colspan', 2);
		cells[0].innerHTML = "Łącznie";
		document.getElementById('commands_table').appendChild(summaryRow);
		
		var button = document.createElement("input");
		button.setAttribute("type", "button");
		button.setAttribute("value", "Kopiuj rozkazy");
		button.setAttribute("onclick", "copyCommandsList();");
		button.setAttribute("id", "copyCommandsButton");
		button.style.display = "none";
		document.getElementById('commands_table').appendChild(button);
		
	}
	return select;
}

unsafeWindow.filter = function filter(village) {
	var ordersTable = document.getElementById("commands_table");
	var rows = ordersTable.getElementsByTagName('tr');
	var rowAClass ="nowrap row_a";
	var rowBClass ="nowrap row_b";
	var rowNumber = 0;

	document.getElementById("copyCommandsButton").style.display = ( village == "Wszystkie" ? "none" : "");
	var unitsSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	var commandsCounter = 0;
	for (var i=1; i < rows.length-2; i++) {
		var order = rows[i].textContent;
		order = trim(order);
		if ((village == null || order.indexOf(village) < 0 && village != "Wszystkie") || (fakesHidden && isFake(rows[i]))){
			rows[i].style.display="none";
		} else {
			if (i != rows.length - 2) commandsCounter++;
			var cells = rows[i].getElementsByTagName('td');
			for (var j = 3; j < cells.length; j++) {
				unitsSum[j-3] += parseInt(cells[j].textContent);
			}
			rows[i].style.display="";
			rows[i].className = (rowNumber % 2 == 0 ? rowAClass : rowBClass);
			rowNumber++;
		}
	}
	
	document.getElementById('summaryRow').style.display = ( village == "Wszystkie" || (document.URL.indexOf("type=all") >= 0 || document.URL.indexOf("type") < 0)) ? "none" : "";

	ordersTable.getElementsByTagName('th')[0].innerHTML = "Rozkaz (" + commandsCounter + ")";
	var cells = document.getElementById('summaryRow').getElementsByTagName('th');
	for (var i = 0; i < unitsSum.length ; i++) {
		cells[i+2].innerHTML = unitsSum[i];
		if (unitsSum[i] == 0)
		cells[i+2].unitsSum = "hidden";
	}
	var defSpace = unitsSum[0] + unitsSum[1] + unitsSum[3] + 6 * unitsSum[7];
	defSpace = Math.round(defSpace / 2000) / 10;
	cells[0].textContent = "Łącznie (" + defSpace + " zagród defa)";
	//alert(document.getElementById('summaryRow').textContent);
	
}

unsafeWindow.copyCommandsList = function copyCommandsList() {
	var ordersTable = document.getElementById('commands_table');
	var rows = ordersTable.getElementsByTagName('tr');
	var ordersString = "";
	var maxTabs = 0;
	for (var i = 1; i < rows.length-2;i++) {
		if (rows[i].style.display != "none") {
				var length = trim(rows[i].getElementsByTagName('td')[2].textContent).length;
				var tabs = Math.floor(length/8) + 1;
				maxTabs = Math.max(tabs, maxTabs);
			
		}
	}
	
	var select = document.getElementById("villageSelect");
	var header = select.options[select.selectedIndex].value;
	var xyPattern = new RegExp( "[(]{1}[0-9]+[|]{1}[0-9]+[)]{1}" );
	header = "[village]" + xyPattern.exec(header) + "[/village]";
	
	var name = "type";
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href )
	if (results == null) results = ["", "all"];

	switch (results[1]){
		case "attack" : header = "Ataki na " + header; break;
		case "support" : header = "Wsparcia dla " + header; break;
		case "return" : header = "Powroty z " + header; break;
		case "all" : header = "Rozkazy dla " + header; break;
	}
	ordersString += "[quote][b]" + header + "[/b][code]";

	for (var i=1; i < rows.length; i++) {
		var order = rows[i].textContent;
		order = trim(order);
		if (i == rows.length - 2) continue // chamski haczyk
		if (rows[i].style.display != "none") {
			var cells = rows[i].getElementsByTagName('td');
			if (cells.length == 0) {
				ordersString += "------\nWojsk razem:";
				ordersString += "\t";
				var tabs = Math.floor("Wojsk razem:".length / 8) + 1;
				while (tabs < maxTabs) {
					tabs++;
					ordersString += "\t";
				}				
				cells = rows[i].getElementsByTagName('th');
			}
			if (results[1] == "all") {
				var str = order.substring(0,3);
				switch (str) {
					case "Ata": ordersString += "Atak     "; break
					case "Wsp": ordersString += "Wsparcie "; break;
					default : ordersString +=   "Powrót   ";
				}
			}
			for (var j = 2; j < cells.length; j++) {
				var cellText = trim(cells[j].textContent);
				ordersString += cellText;
				ordersString += "\t";
				
				if (j == 2 && i != rows.length - 1) {
					var tabs = Math.floor((cellText.length + (results[1] == "all" ? 9 : 0)) / 8) + 1;
			//		alert(tabs);
					while (tabs < maxTabs) {
						tabs++;
						ordersString += "\t";
					}
				}
			}
			ordersString += "\n";
		}
	}
	ordersString += "[/code][/quote]";
	copyToClipboard(ordersString);
}


unsafeWindow.setFakesHidden = function setFakesHidden(value) {
	fakesHidden = value;
	unsafeWindow.filter(document.getElementById("villageSelect").value);
}

function addLinks() {
	var tables = document.getElementsByTagName('table');
	var tidPattern = new RegExp("t=[0-9]+");
	var tid = tidPattern.exec(document.URL);
	if (tid) {
		tid = "&t=" + tid.toString().substring(2);
	} else {
		tid = "";
	}
	for (i = tables.length-1; i >= 0; i--) {
		if ( tables[i].getElementsByTagName('tr').length > 1 && trim(tables[i].getElementsByTagName('tr')[1].textContent).substring(0, 11) == "Współrzędne") {
			var coords = tables[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent;
			var newRow = document.createElement("tr");
			var newCell = document.createElement("td");
			newCell.setAttribute("colspan", "2");
			newCell.innerHTML = "<a href='/game.php?screen=overview_villages&page=-1&group=0&mode=commands&type=attack"+tid+"&coords=" + coords+"'>» Pokaż ataki wysłane na wioskę</a>"
			newRow.appendChild(newCell);
			tables[i].getElementsByTagName('tbody')[0].appendChild(newRow);

			newRow = document.createElement("tr");
			newCell = document.createElement("td");
			newCell.setAttribute("colspan", "2");
			newCell.innerHTML = "<a href='/game.php?screen=overview_villages&page=-1&group=0&mode=commands&type=support"+tid+"&coords=" + coords+ "'>» Pokaż wsparcia wysłane do wioski</a>"
			newRow.appendChild(newCell);
			tables[i].getElementsByTagName('tbody')[0].appendChild(newRow);

			break;
		}
	}
}

function createVillagesList() {
	var table = document.getElementById('commands_table');
	var rows = table.getElementsByTagName('tr');
	var villages = new Array(0);
	for (i = 1; i < rows.length - 1; i++) {
		var order = trim(rows[i].getElementsByTagName('td')[0].textContent);
		if (document.URL.indexOf("mode=inco") >= 0) {
			var target = rows[i].cells[1].textContent;
		}
		var village;
		if (order.substring(0,9) != "Przerwana") {
			village = order.substr(order.indexOf(' ', order.indexOf(' ') + 1));
		} else  {
			village = order.substr(order.indexOf(' ', order.indexOf(' ', order.indexOf(' ') + 1) + 1));
		}
		var j = 0;
		for (j = 0; j < villages.length; j++) {
			if (villages[j] == village) {
				break;
			}
		}
		if (j == villages.length) {
			villages[villages.length] = village;
		}
	}
	return villages;
}


function copyToClipboard(text) {
	function cc(text) {
	try	{
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		var comp_classes = Components.classes;
	} catch(e) { alert(e); } // When "signed.applets.codebase_principal_support" is set to false

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
	supportsstring_inst.data = unescape(text);
	transferable_inst.setTransferData(type, supportsstring_inst, text.length*2);
	clipboard_inst.setData(transferable_inst, null, clipboard.kGlobalClipboard);
	}
	
	setTimeout("("+cc+")('"+escape(text)+"');",0);
}


// entry point
if (document.URL.indexOf("mode=comm") >= 0 || document.URL.indexOf("mode=inco") >= 0) {
	var listbox = addListBox(createVillagesList());
	if (document.URL.indexOf("coords") >= 0) {
		var coords = document.URL.substring(document.URL.indexOf("coords") + 7);
		var options = listbox.options;
		var i;
		for (i = 0; i < options.length; i++) {
			if (options[i].textContent.indexOf(coords) >= 0) {
				listbox.selectedIndex = i;
				unsafeWindow.filter(listbox.value);
				break;
			}
		}
		if (i == options.length) {
			if ( document.URL.indexOf("type=support") >= 0) {
				alert("Nie wysłałeś żadnych wsparć do wybranej wioski");
			} else if ( document.URL.indexOf("type=attack") >= 0 ) {
				alert("Nie wysłałeś żadnych ataków na wybraną wioskę");
			}
		}
	}
} else if (document.URL.indexOf("screen=info_village")) {
	addLinks();
}




