// ==UserScript==
// @name          WebForFaculty auto-login
// @author        Dr.Nixon - modified from Rafael Gattringer's Yahoo Login
// @namespace     http://www.flowconsult.at
// @description   Enables autocomplete for ECSU Web For faculty
// @include       https://pwfs.ecsu.edu/*
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