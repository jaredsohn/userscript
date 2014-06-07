// ==UserScript==
// @name           Trukz Deposit
// @namespace      trukz
// @description    Deposit All
// @include        http://*trukz.com/bank.asp
// ==/UserScript==

var oldValueNum; 

for(var i = 0; i < document.body.getElementsByTagName('TABLE').length; i++) {
	var table = document.body.getElementsByTagName('TABLE')[i];
	
	if (table.className == "TableCSS") {
		read = false;
		
		for(var j = 0; j < table.getElementsByTagName('TD').length; j++) { //break apart the table info by cell
			var cell = table.getElementsByTagName('TD')[j];
			
			if (read) {
				oldValueStr = trim(cell.innerHTML);
				oldValueNum = parseFloat(oldValueStr.replace(/[^-0-9\.]/g,''));
				
				if (oldValueNum > 100) { // Leave quickrest money :P
					cell.innerHTML += '<input id="myButton" type="button" value="Deposit all" class="Buttons">';
					but = document.getElementById('myButton');
					but.addEventListener('click', myButton, true);	

				}
				
				read = false;
			}
			
			if (cell.innerHTML.search(/Driver Pocket Money:/i) != -1)
				read = true;
		}
		
		break; // no next table
	}
}

function myButton() {
	field = document.getElementById('Transaction');
	field.value = oldValueNum - 100;
	
	submitButton = document.getElementById('perform_bank_transaction');
	submitButton.click();
}

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
