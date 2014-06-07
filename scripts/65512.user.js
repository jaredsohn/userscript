// ==UserScript==
// @name           MI Donate Weapons Script
// @namespace      http://www.erepublik.com
// @description    This script adds some "Transfer weapons" buttons in order to quickly transfer up weapons to soldiers. Modified by Blazix
// @include        http://www.erepublik.com/*/citizen/donate/items/*
// @include        http://www.erepublik.com/*/organization/donate/items/*
// ==/UserScript==

var eRepublikTransferWeapons = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(5,10);
	var desiredOptionsTix = new Array(2,4);
	
	var moveItems = function() {
	
		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfWeapons = 0;
		// var currentNumber = this.getAttribute('id').charAt(12) * 1;
		// Blazix's fix: Get's the attribute no_bfix and transfers that number of products, increased of using the charAt() function.
		var currentNumber = this.getAttribute('no_bfix');
		var bProductCond = this.getAttribute('product');
		
		if (bProductCond == "Weapon"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Weapon" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};
		if (bProductCond == "Moving Tickets"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Moving Tickets" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};

		for (i = 0; i < numberOfWeapons; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}		
	
	};
	
	for (current in desiredOptions) {

	
		newButton = buttonContainer.cloneNode(true);
		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptions[current] + ' Weapons.');
		// Blazix's fix, creates a new attribute called no_bfix that has the number of weapons necessary.
		inputElement.setAttribute('no_bfix', desiredOptions[current]);
		inputElement.setAttribute('product', 'Weapon'); //added this because now moving tix buttons are added.
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	
	// B Moving Tix Modification -- STARTS HERE
	
	for (current in desiredOptionsTix) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsTix[current]);
		
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsTix[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsTix[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptionsTix[current] + ' Tickets.');
		// Blazix's fix, creates a new attribute called no_bfix that has the number of weapons necessary.
		inputElement.setAttribute('no_bfix', desiredOptionsTix[current]);
		inputElement.setAttribute('product', 'Moving Tickets'); //added this because now moving tix buttons are added.
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	
	// B Moving Tix Modification -- ENDS HERE

};

eRepublikTransferWeapons();