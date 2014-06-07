// ==UserScript==
// @name           Password Field Uncensorer
// @namespace      http://localhost
// @description    This script removes the stars in a password field so you can see what you are typing.
// @include        *
// ==/UserScript==

for (i=0;i<document.forms.length;i++) //Search for forms
{
	for (j=0;j<document.forms[i].length;j++) //Search for input fields
	{
		if (document.forms[i][j].type.toLowerCase()=="password") //Search for password fields
		{
			document.forms[i][j].type="text"; //Change password fields to text fields
		}
	}
}