// ==UserScript==
// @name           Test GM Node Inserted compatibility
// @namespace      Pi
// @include        http://piyushsoni.com/testgmnodeinserted.html
// ==/UserScript==

document.addEventListener("DOMNodeInserted", nodeInserted, false);

var button = document.getElementsByTagName('input')[0];
button.addEventListener('click', clicked, false);

function nodeInserted(e)
{
	alert('node of type ' + e.target.nodeType + ' inserted');
	GM_setValue('NodeInsertedWorking', true);
	if(GM_getValue('NodeInsertedWorking', false))
		alert('GM working in Node Inserted !');
	else
		alert('GM not working in Node Inserted!!');
}

function clicked()
{
	GM_setValue('NodeClickWorking', true);
	if(GM_getValue('NodeClickWorking', false))
		alert('GM working in Click (nothing new).');
	else
		alert('GM not working in Click!!');
}