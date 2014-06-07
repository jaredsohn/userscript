// ==UserScript==
// @name           Donate Foods Script for eRepublik
// @namespace      http://www.erepublik.com
// @description    This script adds some "Transfer foods" buttons in order to quickly transfer up foodss to citizens.
// @include        http://www.erepublik.com/*/citizen/donate/items/*
// @include        http://www.erepublik.com/*/organization/donate/items/*
// ==/UserScript==

var eRepublikTransferFoods = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var newButton = null;
	var desiredOptions = new Array(3, 4, 5);
	
	var moveItems = function() {
	
		var childNodeArray = document.getElementById('small').getElementsByTagName('li');
		var targetNodeArray = new Array();
		var numberOfFoods = 0;
		var currentNumber = this.getAttribute('id').charAt(12) * 1;
		
		for (i = 0; i < childNodeArray.length; i++) {
			if ("Food" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfFoods < currentNumber) {
				targetNodeArray[numberOfFoods++] = childNodeArray[i];
			};
		}

		for (i = 0; i < numberOfFoods; i++) {
			document.getElementById('big').appendChild(targetNodeArray[i]);
		}		
	
	};
	
	for (current in desiredOptions) {
		newButton = buttonContainer.cloneNode(true);
	
		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]);
		
		current % 2 ? newButton.style.clear = "left" : newButton.style.marginLeft = "10px";
	
		var inputElement = newButton.getElementsByTagName('input')[0];
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]);
		inputElement.setAttribute('type', 'button');
		inputElement.setAttribute('value', 'Transfer ' + desiredOptions[current] + ' food');

		inputElement.addEventListener('click', moveItems, false);
		
		holderDiv.appendChild(newButton);
	}
};

eRepublikTransferFoods();