// ==UserScript==
// @name        PassThePopcorn - Release description resizer
// @description The script auto sizes the release description text area to fit the content. The text area's width is maximized, and a -- larger than the default -- minimum height can be set for empty release descriptions. v2010.11.08. by TnS
// @homepage    http://userscripts.org/scripts/show/90052
// @namespace   http://greasemonkey.mozdev.com
// @include     http://*passthepopcorn.me/torrents.php*
// @include     https://*passthepopcorn.me/torrents.php*
// @include     http://*passthepopcorn.me/upload.php*
// @include     https://*passthepopcorn.me/upload.php*
// ==/UserScript==

function main()
{
	var textArea = document.getElementById( "release_desc" )
	if ( textArea )
	{
		textArea.style.width = "98%"; // Make it full width.
		textArea.style.height = "800px"; // Set minimum height.
		textArea.style.height = textArea.scrollHeight + "px"; // Autosize height to show all content without a scrollbar in the text area.
   
		// We could add an event to automatically autosize on each modification, but it is annoying.
	}
}

main();