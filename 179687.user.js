// ==UserScript==
// @name           Cart Checkout
// @namespace      http://wwww.pgc.umn.edu
// @description    WARP auto checkout script
// @include        https://warp.nga.mil/cgi-bin/nlprime/Cart.cgi
// ==/UserScript==

function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}

window.checkBoxes = function() {
	allInputs = document.getElementsByTagName('input'); 
	numChecked = 0;
	index = 0;
	while(numChecked < 25 && index < allInputs.length) { 
		input = allInputs[index];
		if(input.type == "checkbox") {
			input.checked = true;
			numChecked++;
		}
		index++;
	}

	addButton = document.getElementsByName("ADD_TO_CART");
	click(addButton[0]);
}

window.findOrderButton = function() {
	var orderButton;
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i ++) {
			if (inputs[i].type == 'button' && inputs[i].value == "Order Cart") {
					orderButton = inputs[i];
			}
	}
		
	if(orderButton) {
		click(orderButton);
	} else {
		checkBoxes();
	}
	
}

window.checkDelete = function() {
	var numChecked = 0;
	var trs = document.getElementsByTagName('tr');
	for (var i = 0; i < trs.length; i++) {
		tds = trs[i].getElementsByTagName('td');

		if(tds.length > 6 && tds[6].innerHTML.trim() === "Not Available") {
			tds[0].children[0].checked = true;
			//console.log("Checked for deletion: " + tds[2].children[0].innerHTML);
			numChecked++;
		}
	}
	
	if(numChecked > 0) {
		var deleteButton;
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i ++) {
				if (inputs[i].type == 'button' && inputs[i].value == "Delete Saved") {
						deleteButton = inputs[i];
				}
		}
		click(deleteButton);
	} else {
		findOrderButton();
	}
}

window.setTimeout(checkDelete(), 5000);