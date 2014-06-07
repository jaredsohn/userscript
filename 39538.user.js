// ==UserScript==
// @name           test
// @namespace      Syrnia
// @include        http://www.syrnia.com/*
// ==/UserScript==

var Foods = [
['Beet','1'],
['Radishes','1'],//
['Elven Cocktail','1'],
['Keg of Rum','1'],
['Cooked Shrimps','2'],//
['Carrots','2'],//
['Cooked Frog','2'], //
['Cabbage','3'], //
['Bread','3'],
['Cooked Piranha','3'],//
['Onion','4'],//
['Cooked Sardine','4'],//
['Tomato','5'],
['Halloween pumpkin','5'],//
['Cooked Catfish','5'],
['Cooked Herring','5'],//
['Red Easter Egg','5'],//
['Corn','6'],//
['Cooked Mackerel','6'],//
['Cooked Queen spider meat','6'],//
['Strawberry','7'],//
['Cooked Cod','7'],//
['Cooked Trouts','7'],//
['Green pepper','8'],//
['Cooked Pike','8'],//
['Spinach','9'],//
['Cooked Salmon','9'],//
['Green easter egg','9'], //
['Eggplant','10'],//
['Cooked Tuna','10'],//
['Cooked Giant catfish','10'], //
['Cucumber','11'],//
['Cooked Lobster','12'], //
['Pumpkin','12'],//
['Cooked Bass','13'],//
['Blue easter egg','13'],//
['Apple','13'],
['Cooked Swordfish','14'],//
['Pear','14'],
['Broccoli','15'],
['Cooked Saurus meat', '16'],//
['Yellow easter egg', '17'],//
['Pink easter egg','20'],//
['Black Easter Egg','20'],//
['White Easter Egg','20'],//
['Cooked Shark','20'],//
['Orange easter egg','23'],//
['Purple easter egg','26'] //
];

var Cookables = [
['Frog','2'],
['Shrimps','2'],
['Grain','3'],
['Piranha','3'],
['Sardine','4'],
['Catfish','5'],
['Herring','5'],
['Mackerel','6'],
['Queen spider meat','6'],
['Cod','7'],
['Trouts','7'],
['Pike','8'],
['Salmon','9'],
['Giant catfish','10'],
['Tuna','10'],
['Lobster','12'],
['Bass','13'],
['Swordfish','14'],
['Saurus meat','16'],
['Shark','20']
];

function start() {
	if (location=='http://www.syrnia.com/game.php') {
		TotalInventory();
	}
}
if (document.body) start();
else window.addEventListener('DOMContentLoaded', start, false);

function TotalInventory() {
	// set a watch on the inventory
	try {
		inv = document.getElementById('playerInventory');
		inv.addEventListener('DOMSubtreeModified',inventoryTotals,false);
	} catch(e) {
		window.setTimeout(TotalInventory(),1000);
	}
	inv.setAttribute('width','200');

	// create the table to hold the totals
	var myTable = document.createElement('table');
	myTable.setAttribute('cellspacing','0');
	myTable.setAttribute('cellpading','0');
	myTable.setAttribute('border','0');
	myTable.style.backgroundColor = 'black';
	myTable.style.textAlign = 'center';

	if (inv.tagName == 'TD') { // then we are in a table, and thus in drag&drop
		invTable = inv.parentNode.parentNode;
		ttlTr = document.createElement('tr');
		ttlTd = document.createElement('td');
		ttlTd.appendChild(myTable);
		ttlTr.appendChild(ttlTd);
		invTable.appendChild(ttlTr);
	} else { // in normal inventory mode
		inv.parentNode.insertBefore(myTable,inv.nextSibling);
		myTable.setAttribute('width','200');
	}

	var myTR1 = document.createElement('tr');
	var Cked = document.createElement('td');
	Cked.setAttribute('width', '200');
	Cked.style.color = 'white';
	myTR1.appendChild(Cked);
	myTable.appendChild(myTR1);

	var myTR2 = document.createElement('tr');
	var Raws = document.createElement('td');
	Raws.setAttribute('width', '200');
	Raws.style.color = 'yellow';
	myTR2.appendChild(Raws);
	myTable.appendChild(myTR2);

	var myTR3 = document.createElement('tr');
	var Brns = document.createElement('td');
	Brns.setAttribute('width', '200');
	Brns.style.color = 'grey';
	myTR3.appendChild(Brns);
	myTable.appendChild(myTR3);
	
	// run a first cut of the totalling function
	inventoryTotals();

	// This function only runs on the DOMSubTree modified event of the inv
	// (except the first run)
	function inventoryTotals() {
		var totalHP = 0;
		var numCooked = 0;
		var totalRawHP = 0;
		var numRaw = 0;
		var numBurnts = 0;

		var myDivs = inv.getElementsByTagName('div');

		if(myDivs) {	
			for (i=0;i<myDivs.length;i++) {
				for (j=0;j<Foods.length;j++) {
					if (myDivs[i].title == Foods[j][0]) {
						totalHP += parseInt(myDivs[i].textContent)*Foods[j][1];
						numCooked += parseInt(myDivs[i].textContent);
					}
				}

				for (j=0;j<Cookables.length;j++) {
					if (myDivs[i].title == Cookables[j][0]) {
						totalRawHP += parseInt(myDivs[i].textContent)*Cookables[j][1];
						numRaw += parseInt(myDivs[i].textContent);
					}
				}

				if (myDivs[i].title.indexOf('Burnt') > -1) {
					numBurnts += parseInt(myDivs[i].textContent);
				}
			}
		}

		if (numBurnts > 0) {
			Brns.textContent = 'Dragging ' + numBurnts + ' burnt food';
			Brns.parentNode.style.display = '';
		} else {
			Brns.parentNode.style.display = 'none';
		}
		if (numRaw > 0) {
			Raws.textContent = '' + numRaw + ' raw food (' + totalRawHP + ' hp)';
			Raws.parentNode.style.display = '';
		} else {
			Raws.parentNode.style.display = 'none';
		}
		if (numCooked > 0) {
			Cked.textContent = '' + numCooked + ' cooked food (' + totalHP + ' hp)';
			Cked.parentNode.style.display = '';
		} else {
			Cked.parentNode.style.display = 'none';
		}
	}
}