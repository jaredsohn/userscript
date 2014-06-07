// ==UserScript==
// @name          Yahoo remember login and password
// @author        Rafael Gattringer
// @namespace     http://www.flowconsult.at
// @description   Enables autocomplete for https://login.yahoo.com/
// @include       https://login.yahoo.com/*
// ==/UserScript==

// Version 0.1.1 - 20060923

var forms = document.getElementsByTagName('form');
for (i = 0; i < forms.length; i++)
{
	forms[i].setAttribute("autocomplete", "on");
	inputs = forms[i].getElementsByTagName('input');
	for (j = 0; j < inputs.length; j++)
	{
		inputs[j].setAttribute("autocomplete", "on");
	}
}
