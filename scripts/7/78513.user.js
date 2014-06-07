// ==UserScript==
// @name           Nordea
// @namespace      http://arneball.com
// @include        *nordea.se*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require       http://underscorejs.org/underscore-min.js
// @grant GM_getValue
// @grant GM_setValue
// @description Sparar ditt personnummer i inloggningssidan, gör dessutom att inmatning av kontrollkoder inte ballar ur som det brukar göra i firefox. Pimpar upp kontoutdraget
// ==/UserScript==

function musta(/*thisElement*/) {
	var thisElement=this;
	var reg= new RegExp(/^(\s*[0-9]{1}\s*){9}$/);
	if (thisElement.value.match(reg))
		thisElement.style.background="lightGreen";
	else if (thisElement.value.match(new RegExp(/[a-zA-Z]/)))
		thisElement.style.background="red";
	else
		thisElement.style.background="";
}

function submitButtSave() {
	
	var button = document.evaluate(
	'//input[@class="button"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
	
	button.snapshotItem(0).addEventListener("click", savePn,false);
}

function savePn() {
	GM_setValue('pn', document.getElementById('personnummer').value);
}

function resetButton()
{
	if(GM_getValue('pn')!='')
	{
		
		var scriptElement = document.createElement('script');
		scriptElement.type = 'text/javascript';
		document.getElementsByTagName("head")[0].appendChild(scriptElement);
		scriptElement.innerHTML =  'function checkForOrders() { document.getElementById("personnummer").value="";  }';

		var  element = document.evaluate(
		"//form[@id='commonlogin']/table/tbody/tr/td[@class='last']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
		);
		var buttonnode= document.createElement('input');
		buttonnode.setAttribute('type','button');
		buttonnode.setAttribute('name','sal');
		buttonnode.setAttribute('value','Glöm mig');
		buttonnode.setAttribute('onClick', 'checkForOrders();return false;');
		buttonnode.addEventListener("click",resetPn, false);
		element.snapshotItem(0).appendChild(buttonnode);
	}
} 


function resetPn() {
	GM_setValue('pn','');
}
(function(){

	//read personnummer
	$('#personnummer').val(GM_getValue('pn'));

	submitButtSave();
	resetButton();

	//fix failed inputs
	var pelle = _.filter($("input[type=text]"), function(e) {
	  return e.hasAttribute('onkeyup');
	});
	_.each(pelle, function(thisElement) {
		thisElement.addEventListener('keyup', musta, false);
		thisElement.removeAttribute('onkeyup');
	});
})();