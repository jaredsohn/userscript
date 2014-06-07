// ==UserScript==
// @name           No Refresh!
// @namespace      norefresh
// @description    norefresh
// @include        http://minnesota.cbslocal.com/*
// ==/UserScript==
loader();
//------------------------------------------------------------------------------------------------------
function loader()
{
	window.setTimeout(function() 
	{
		if(cbs_cancel_page_refresh()!=true)
		{
			loader();
		}
	},1000);
}