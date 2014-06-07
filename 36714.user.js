// ==UserScript==
// @name           Force Autocomplete & Remember Passwords
// @namespace      arnab
// @version        1.00
// @description    Remembers passwords in sites like del.ici.ous and yahoo.
// @include        https://secure.delicious.com/*
// @include        https://login.yahoo.com/*
// ==/UserScript==

function enableAutoComplete(element) {
	if (element.hasAttribute("autocomplete"))
		element.setAttribute("autocomplete","on");
}

allfields=document.getElementsByClassName("field");
for (i=0; i<allfields.length; ++i)
	enableAutoComplete(allfields[i]);

for (i=0; i<document.forms.length; ++i)
	enableAutoComplete(document.forms[i]);