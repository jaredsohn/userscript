// ==UserScript==
// @name           Delete Trash in Outlook Web Access
// @namespace      DeleteMail@DeleteMail
// @description    Adds links to quickly clear deleted messages from Microsoft Outlook Exchange web mail.
// @include        *mail*/exchange/*
// ==/UserScript==

/*
 * This open source script is provided "as is", use at your own
 * risk.
 */

if (endswith(document.location.toString(),"/?Cmd=navbar"))
{
	// Add shortcuts.
	document.documentElement.innerHTML+=("<p> <a target='viewer' href='Deleted%20Items/?Cmd=contents'>Deleted Items</a> <br><a target='viewer' href='Deleted%20Items/?Cmd=showdeleted'>Trash</a></p>")
}
if (endswith(document.location.toString(),"/Deleted%20Items/?Cmd=showdeleted") ||
	endswith(document.location.toString(),"/Deleted%20Items/?Cmd=contents"))
{
	// Check each checkbox for convenience.
	var checks = document.getElementsByTagName("input")
	for (i=0; i<checks.length; i++)
	{
		checks[i].checked = true
	}
}

function endswith(text, end)
{
	return text.substr(text.length-end.length) == end
}