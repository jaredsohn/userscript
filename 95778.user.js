// ==UserScript==
// @name			DSRenameTroupmovingsInOverview
// @author			Heinzel
// @version			1.0.0
// @namespace			http://userscripts.org
// @description			Dieses Script ermoeglicht es in der Ansicht eines Dorfes, die ankommenden Angriffe bzw. Befehle 'massenhaft' umzubenennen
// @include			http://*.tribalwars.ae/game.php?*screen=overview*
// @exclude			http://*.tribalwars.ae/game.php?*screen=overview_villages*
// ==/UserScript==



// Changelog: 
// 1.0.0: Veroeffentlichung


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

function addMenu() {
	var inputs = _evaluate('//input[@value="Ignorieren"]');
	if(inputs.length != 0) {
		var cell = inputs[0].parentNode;
	} else {
		// Checkboxen setzen
		var spans = _evaluate('//span[contains(@id, "label[")]');
		var ids = new Array();
		for(var x = 0; x < spans.length; x++) {
			var id = spans[x].id.match(/label\[(\d+)\]/)[1];
			ids.push("id_" + id);
			
			var input = document.createElement("input");
			input.type = "checkbox";
			input.name = "id_" + id;
			spans[x].parentNode.insertBefore(input, spans[x]);
			spans[x].parentNode.insertBefore(document.createTextNode("	"), spans[x]);
		}
		
		// ids speichern
		var hiddenField = document.createElement("input");
		hiddenField.id = "ids";
		hiddenField.type = "hidden";
		hiddenField.value = ids.join(",");
		document.body.appendChild(hiddenField);
		
		// Umbenenn-Leiste einfuegen
		var oldRows = _evaluate('//a[contains(., "tzung anfordern")]/parent::td/parent::tr');
		if(oldRows.length != 0) {
			var row = document.createElement("tr");
			oldRows[0].parentNode.insertBefore(row, oldRows[0]);
		} else {
			var tbody = _evaluate('//th[.="Ausgehende Truppen"]/parent::tr/parent::tbody')[0];
			
			var row = document.createElement("tr");
			tbody.appendChild(row);
		}
		
		var cell = document.createElement("th");
		row.appendChild(cell);
		
		var input = document.createElement("input");
		input.name = "all"; 
		input.type = "checkbox"; 
		input.className = "selectAll";
		input.addEventListener('click', function(){
			var checked = document.getElementsByName("all")[0].checked;
			var ids = document.getElementById("ids").value.split(",");
			for(var x = 0; x < ids.length; x++) {
				document.getElementsByName(ids[x])[0].checked = checked;
			}
		}, false);
		cell.appendChild(input);
		
		cell.appendChild(document.createTextNode(" alle auswählen"));
		
		var cell = document.createElement("td");
		cell.colSpan = "3";
		row.appendChild(cell);
	}
	
	var button = document.createElement("input");
	button.type = "button";
	button.value = "Umbenennen";
	button.addEventListener('click', renameOrders, false);
	cell.appendChild(button);
}

function renameOrders() {
	var newName = window.prompt("Wie sollen die Befehle benannt werden?", "");
	
	var inputs = _evaluate('//input[contains(@name, "id_")]');
	for(var x = 0; x < inputs.length; x++) {
		if(inputs[x].checked == true) {
			var id = inputs[x].name.split("_")[1];
			renameOrder(id, newName);
		}
	}
}

function renameOrder(id, newName) {
	document.getElementById("editInput[" + id + "]").value = newName;
	document.getElementById("edit[" + id + "]").style.display = "inline";
	document.getElementById("label[" + id + "]").style.display = "none";
}

(function __DSRenameIncsInOverview() {
	addMenu();
})();