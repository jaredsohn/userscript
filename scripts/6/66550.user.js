// ==UserScript==
// @name           Donate raws script for eRepublik
// @namespace      http://www.erepublik.com
// @description    This script adds some "Move raws" buttons in order to quickly transfer up raw materials
// @include        http://www.erepublik.com/en/company/*/donate/items
// ==/UserScript==

var eRepublikTransferRaws = function() {
	
	var holderDiv = document.getElementById('big').parentNode.getElementsByTagName('div')[0];
	var buttonContainer = holderDiv.getElementsByTagName('span')[0];
	var rawMaterials = {"food" : "Grain", "gift" : "Diamonds", "weapon" : "Iron", "moving tickets" : "Oil", "house" : "Wood" };
	var companyId = location.href.split("/")[5];
	var newButton = null;

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://api.erepublik.com/v1/feeds/companies/' + companyId + '.json',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml,text/json',
	    },
	    onload: function(responseDetails) {
			var jsonDataObject = eval("(" + responseDetails.responseText + ")");
	        var rawMaterial = rawMaterials[jsonDataObject.industry];
	
			newButton = buttonContainer.cloneNode(true);
			newButton.setAttribute('id', 'newButtonForTransfer');
			newButton.style.marginLeft = "10px";

			var inputElement = newButton.getElementsByTagName('input')[0];
			inputElement.setAttribute('id', 'submitterForTransfer');
			inputElement.setAttribute('name', 'submitterForTransfer');
			inputElement.setAttribute('type', 'button');
			inputElement.setAttribute('value', 'Move 10 ' + rawMaterial);

			inputElement.addEventListener('click', function() {
				var childNodeArray = document.getElementById('small').getElementsByTagName('li');
				var targetNodeArray = new Array();
				var rawMaterial = this.getAttribute('value').substring(8);
				var numberOfItems = 0;
				
				for (i = 0; i < childNodeArray.length; i++) {
					if (rawMaterial == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt') && numberOfItems < 10) {
						targetNodeArray[numberOfItems++] = childNodeArray[i];
					};
				}

				for (i = 0; i < numberOfItems; i++) {
					document.getElementById('big').appendChild(targetNodeArray[i]);
				}
			}, false);

			holderDiv.appendChild(newButton);
			
			newButton = buttonContainer.cloneNode(true);
			newButton.setAttribute('id', 'newButtonForDonate');
			newButton.style.clear = "left";

			inputElement = newButton.getElementsByTagName('input')[0];
			inputElement.setAttribute('id', 'submitterForDonate');
			inputElement.setAttribute('name', 'submitterForDonate');
			inputElement.setAttribute('type', 'button');
			inputElement.setAttribute('value', 'Donate ' + rawMaterial);

			inputElement.addEventListener('click', function() {
				var childNodeArray = document.getElementById('small').getElementsByTagName('li');
				var targetNodeArray = new Array();
				var rawMaterial = this.getAttribute('value').substring(7);
				var numberOfItems = 0;

				for (i = 0; i < childNodeArray.length; i++) {
					if (rawMaterial == childNodeArray[i].getElementsByTagName('img')[0].getAttribute('alt')) {
						targetNodeArray[numberOfItems++] = childNodeArray[i];
					};
				}

				for (i = 0; i < numberOfItems; i++) {
					document.getElementById('big').appendChild(targetNodeArray[i]);
				}
				
				document.getElementById('big').parentNode.submit();
			}, false);

			holderDiv.appendChild(newButton);
	    }
	});

};

eRepublikTransferRaws();