// ==UserScript==
// @name           MOD Donate weapons, tickets and iron script for erepublik
// @namespace      http://www.erepublik.com
// @description    Doneaza arme, tikete si fier
// @include        http://www.erepublik.com/*/citizen/donate/items/*
// @include        http://www.erepublik.com/*/organization/donate/items/*
// @include        http://www.erepublik.com/*/company/*/donate/items
// ==/UserScript==

var eRepublikDonateWeapons = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(2,3,5,10);
	var desiredOptionsTickets = new Array(2,4);
	var desiredOptionsIron = new Array(5,10);
	var desiredOptionsDiamonds = new Array(5,10);
	var desiredOptionsOil = new Array(5,10);
	var moveItems = function() {
	
		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfWeapons = 0;
		var currentNumber = this.getAttribute('fixnumber');
		var whatuwant = this.getAttribute('product');
		
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
		if (whatuwant == "Iron"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Iron" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};
		if (whatuwant == "Diamonds"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Diamonds" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
					targetNodeArray[numberOfWeapons++] = childNodeArray[i];
				};
			}
		};
		if (whatuwant == "Oil"){
			for (i = 0; i < childNodeArray.length; i++) {
				if ("Oil" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfWeapons < currentNumber) {
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
	for (current in desiredOptionsIron) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsIron[current]);
		
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsIron[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsIron[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptionsIron[current] + ' Iron');
		inputElement.setAttribute('fixnumber', desiredOptionsIron[current]);
		inputElement.setAttribute('product', 'Iron');
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	for (current in desiredOptionsDiamonds) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsDiamonds[current]);
		
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsDiamonds[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsDiamonds[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptionsDiamonds[current] + ' Diamonds');
		inputElement.setAttribute('fixnumber', desiredOptionsDiamonds[current]);
		inputElement.setAttribute('product', 'Diamonds');
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}
	for (current in desiredOptionsOil) {
		  
		  
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptionsOil[current]);
		
		current % 2 ?  newButton.style.marginLeft = "10px":newButton.style.clear = "left" ;
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptionsOil[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptionsOil[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Donate ' + desiredOptionsOil[current] + ' Oil');
		inputElement.setAttribute('fixnumber', desiredOptionsOil[current]);
		inputElement.setAttribute('product', 'Oil');
		inputElement.addEventListener('click', moveItems, false);
		holderDiv.appendChild(newButton);
	}

};

eRepublikDonateWeapons();
