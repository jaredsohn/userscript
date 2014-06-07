// ==UserScript==
// @name           Add Autocomplete to Forms
// @namespace      http://userscripts.org/users/93173
// @description    Add Autocomplete to Forms
// @include        http://helpdesk.parkland.edu/ehelpdesk/login.jsp
// ==/UserScript==

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