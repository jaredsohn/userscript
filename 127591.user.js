// ==UserScript==
// @name           LOS_TimezoneSelection
// @namespace      LiveOnSat Timezone Selection
// @description    Change Timezone on LiveOnSat.com
// @include        http://liveonsat.com/*
// ==/UserScript==

function SelectTimezone(SelectID, SelectValue)
	{
		if (document.getElementById(SelectID).value != SelectValue)
		{
			document.getElementById(SelectID).value = SelectValue;
			document.getElementById(SelectID).onchange();
		}
	}
	
SelectTimezone("tzSelect", 1);