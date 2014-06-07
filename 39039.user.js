// ==UserScript==
// @name           Survival Guide <BR> remover and form-fill
// @namespace      http://www.ballsun.com/greasemonkey/test1
// @include        http://www.dailywheel.com/thegame/game.php
// ==/UserScript==
/* Greasemonkey script by Brian Ballsun-Stanton. Public Domain. */


/*
Functions by RoBorg
RoBorg@geniusbug.com
http://javascript.geniusbug.com | http://www.roborg.co.uk
Please do not remove or edit this message
Please link to this website if you use this script!
*/



function getElementValue(formElement)
{
	if(formElement.length != null) var type = formElement[0].type;
	if((typeof(type) == 'undefined') || (type == 0)) var type = formElement.type;

	switch(type)
	{
		case 'undefined': return;

		case 'radio':
			for(var x=0; x < formElement.length; x++) 
				if(formElement[x].checked == true)
			return formElement[x].value;

		case 'select-multiple':
			var myArray = new Array();
			for(var x=0; x < formElement.length; x++) 
				if(formElement[x].selected == true)
					myArray[myArray.length] = formElement[x].value;
			return myArray;

		case 'checkbox': return formElement.checked;
	
		default: return formElement.value;
	}
}



function setElementValue(formElement, value)
{
	switch(formElement.type)
	{
		case 'undefined': return;
		case 'radio': formElement.checked = value; break;
		case 'checkbox': formElement.checked = value; break;
		case 'select-one': formElement.selectedIndex = value; break;

		case 'select-multiple':
			for(var x=0; x < formElement.length; x++) 
				formElement[x].selected = value[x];
			break;

		default: formElement.value = value; break;
	}
}




var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('br');
for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    thisTextarea.parentNode.removeChild(thisTextarea);
}



var allDivs, thisDiv;
var buss;

allDivs = document.evaluate(
    "//input[@name='buss']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	//alert(getElementValue(thisDiv));
	buss=getElementValue(thisDiv)*50;
}

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//input[@name='explorers']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv, buss);
}

allDivs = document.evaluate(
    "//input[@name='recruiters']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv, buss);
}


allDivs = document.evaluate(
    "//select[@name='type']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv,1);
}


allDivs = document.evaluate(
    "//select[@name='days']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv,4);
}

allDivs = document.evaluate(
    "//select[@name='length']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv,4);
}


allDivs = document.evaluate(
    "//select[@name='endturn']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	setElementValue(thisDiv,4);
}



/*
var popButton = document.createElement('span');
popButton.innerHTML = '<input type="button" onClick="alert(getElementValue(this.form.buss))">';
*/
/*
setElementValue(document.form1.explorers,getElementValue(document.form1.buss) * 50);
form1.explorers.value = document.form1.buss.value * 50;
alert(form1.explorers.value);
form1.type.value=2;
*/
/*
var newElement;
allTextareas = document.getElementsByTagName('select');
for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
	newElement = document.createElement('input');
	var name=thisTextarea.getAttribute('name');
	for( var x = 0; x < thisTextarea.attributes.length; x++ ) {
		
		newElement.setAttribute( thisTextarea.attributes[x].nodeName, thisTextarea.attributes[x].nodeValue);
	}
	thisTextarea.parentNode.replaceChild(newElement, thisTextarea);
	
	
}
*/

