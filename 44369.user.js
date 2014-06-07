// ==UserScript==
// @name           YaHoo Autocomplete & Remember Passwords
// @description    Remembers passwords in sites like yahoo &  delicious
// @include        https://secure.delicious.com/*
// @include        https://login.yahoo.com/*
// @version        5.0
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