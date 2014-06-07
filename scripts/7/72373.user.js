// ==UserScript==
// @name           MOD Donate weapons and tickets script for erepublik
// @namespace      http://www.erepublik.com
// @description    Another modification of Kristaches script. I just added a food button, it seemed to be missing that. Thanks to Blazix and tooros for thier contributions(tickets, automation)
// @include        http://www.erepublik.com/*/citizen/donate/items/*
// @include        http://www.erepublik.com/*/organization/donate/items/*
// ==/UserScript==

var eRepublikDonateWeapons = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(5,10);
	var desiredOptionsTickets = new Array(2,4);
	var desiredOptionsFood = new Array(1,7);
	
	var moveItems = function() {
	
		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfWeapons = 0;
		var currentNumber = this.getAttribute('fixnumber');
		var whatuwant = this.getAttribute('product');
		
		if (whatuwant == "Food"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Food" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};
		if (whatuwant == "Weapon"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Weapon" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};
		if (whatuwant == "Moving Tickets"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Moving Tickets" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};

		for (i = 0; i < numberOfWeapons; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}		
		document.getElementById('big').parentNode.submit(); 
	};
	
	for (current in desiredOptions) {

	
		newButton = buttonContainer.cloneNode(true);
		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptions[current] + ' Weapons');
		inputElement.setAttribute('fixnumber', desiredOptions[current]);
		inputElement.setAttribute('product', 'Weapon'); 
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	
	for (current in desiredOptionsTickets) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsTickets[current]);
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsTickets[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsTickets[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptionsTickets[current] + ' Tickets');
		inputElement.setAttribute('fixnumber', desiredOptionsTickets[current]);
		inputElement.setAttribute('product', 'Moving Tickets');
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	
	for (current in desiredOptionsFood) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsFood[current]);
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsFood[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsFood[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptionsFood[current] + ' Food');
		inputElement.setAttribute('fixnumber', desiredOptionsFood[current]);
		inputElement.setAttribute('product', 'Food');
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	

};

eRepublikDonateWeapons();
