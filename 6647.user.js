// ==UserScript==
// @name           Blenderartists: page navigation bar at the top of thread view
// @description    Puts a copy of the page navigation bar at the top of the page in thread view
// @include        http://blenderartists.org/forum/showthread.php*
// ==/UserScript==

// Get the page navigation table from the bottom of the page
pagenav = document.evaluate("//div[@class='pagenav']/ancestor::table",
                            document, null,
                            XPathResult.FIRST_ORDERED_NODE_TYPE, null);
pagenavTable = pagenav.singleNodeValue;

// Get the div containing the thread tools at the top of the page
threadtools = document.evaluate("//td[@id='threadtools']/ancestor::div[1]",
                                document, null,
                                XPathResult.FIRST_ORDERED_NODE_TYPE, null);
threadtoolsDiv = threadtools.singleNodeValue;

// Copy the page navigation table and all its children to the thread tools div
if(pagenavTable && threadtoolsDiv) {
	newpagenavTable = pagenavTable.cloneNode(true);
	threadtoolsDiv.appendChild(newpagenavTable);

	newpagenavTable.style.borderTop = "solid lightgrey 1px";
	newpagenavTable.style.borderBottom = "solid lightgrey 1px";
}
