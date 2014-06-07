// ==UserScript==
// @name          Enable AutoComplete
// @author        Dan Jump
// @namespace     http://www.flickr.com/photos/walrus
// @description   enables firefox autocomplete for all websites
// @include       *
// ==/UserScript==

forms = document.getElementsByTagName('form');
for (i = 0; i < forms.length; i++)
{
	forms[i].setAttribute("autocomplete", "on");
	inputs = forms[i].getElementsByTagName('input');
	for (j = 0; j < inputs.length; j++)
	{
		inputs[j].setAttribute("autocomplete", "on");
	}
}