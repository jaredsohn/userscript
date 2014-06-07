// ==UserScript== 
// @name           MOD movingtickets script for eRepublik 
// @namespace      http://www.erepublik.com 
// @description    Script of Kristaches modified by Tooros further modified by joepryde change to work with movign tickets instead Buttons donate them automatically. To vary movingtickets number change array content  
// @include        http://www.erepublik.com/*/citizen/donate/items/* 
// @include        http://www.erepublik.com/*/organization/donate/items/* 
// ==/UserScript== 

var eRepublikTransfermovingtickets = function() { 
	 
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0]; 
	var buttonContainer = holderDiv.getElementsByTagName('span')[0]; 
	var newButton = null; 
	var desiredOptions = new Array(2, 4, 1); 
	 
	var moveItems = function() { 
	 
		var childNodeArray = document.getElementById('small').getElementsByTagName('li'); 
		var targetNodeArray = new Array(); 
		var numberOfmovingtickets = 0; 
		var currentNumber = this.getAttribute('id').charAt(12) * 1; 
		 
		for (i = 0; i < childNodeArray.length; i++) { 
			if ("Moving Tickets" == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfmovingtickets < currentNumber) { 
				targetNodeArray[numberOfmovingtickets++] = childNodeArray[i]; 
			}; 
		} 

		for (i = 0; i < numberOfmovingtickets; i++) { 
			document.getElementById('big').appendChild(targetNodeArray[i]); 
		}		 
		document.getElementById('big').parentNode.submit(); 
	}; 
	 
	for (current in desiredOptions) { 
		newButton = buttonContainer.cloneNode(true); 
	 
		newButton.setAttribute('id', 'newButtonFor' + desiredOptions[current]); 
		 
		current % 2 ? newButton.style.clear = "left" : newButton.style.marginLeft = "10px"; 
	 
		var inputElement = newButton.getElementsByTagName('input')[0]; 
		inputElement.setAttribute('id', 'submitterFor' + desiredOptions[current]); 
		inputElement.setAttribute('name', 'submitterFor' + desiredOptions[current]); 
		inputElement.setAttribute('type', 'button'); 
		inputElement.setAttribute('value', 'Donate ' + desiredOptions[current] + ' tickets'); 

		inputElement.addEventListener('click', moveItems, false); 
		 
		holderDiv.appendChild(newButton); 
	} 
}; 

eRepublikTransfermovingtickets();
