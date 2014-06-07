// ==UserScript==
// @name           TreasuryDirect Password / Autocomplete Enable
// @description    Enables the password field for TreasuryDirect and AutoComplete so you don't have to remember your account or password.
// @include        https://www.treasurydirect.gov/*
// ==/UserScript==

var form = document.evaluate("/html//form[@id='Login']", document, null, 9, null).singleNodeValue;
if (form)
{
	form.setAttribute('autocomplete', 'on');
	
	var fields = document.evaluate("//input[@type='text' or @type='password']", form, null, 6, null);
	for (var i=0; i < fields.snapshotLength; i++)
	{
		var field = fields.snapshotItem(i);
		if (field == null) break;
		
		field.setAttribute('autocomplete', 'on');
		if (field.getAttribute('type').toLowerCase() == 'password')
		{
			field.removeAttribute('readonly');
		}
	}
}