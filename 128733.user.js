// ==UserScript==
// @name           cing.be bypasser
// @namespace      http://www.warforum.cz
// @include        http://cing.be/*
// ==/UserScript==

(function()
{
	if (document.getElementsByName('redir').length)
	{
		document.forms["short_it"].submit();
	}
}
)();