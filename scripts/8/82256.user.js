// ==UserScript==
// @name        PassThePopcorn - collapsible filter
// @description Makes the filter collapsible on the torrents page. v2010.07.25. by TnS
// @homepage    http://userscripts.org/scripts/show/82256
// @namespace   http://passthepopcorn.me/
// @include     http://*passthepopcorn.me/torrents.php*
// @include     https://*passthepopcorn.me/torrents.php*
// @exclude     http://*passthepopcorn.me/torrents.php?id=*
// @exclude     https://*passthepopcorn.me/torrents.php?id=*
// ==/UserScript==

var configKeyName = "ShowFilter";
var showFilter = GM_getValue( configKeyName, false );

function toggleFilterDisplay()
{
	showFilter = !showFilter;
	setFilterDisplay();
	GM_setValue( configKeyName, showFilter );
}

function setFilterDisplay()
{
	var filterNodes = document.getElementsByName( "filter" );
	if ( filterNodes && filterNodes.length > 0 )
	{
		filterNodes[ 0 ].style.display = showFilter ? "none" : "";
	}
}

function main()
{
	var searchbarNode = document.getElementById( "searchbars" );
	if ( searchbarNode != null && searchbarNode.children.length > 0 )
	{
		var addressNode = document.createElement( "a" );
		addressNode.href = "#";
		addressNode.addEventListener( "click", function() { toggleFilterDisplay(); }, false );
		addressNode.appendChild( document.createTextNode( "Filter" ) );
		var liNode = document.createElement( "li" );
		liNode.appendChild( addressNode );
		searchbarNode.children[ 0 ].insertBefore( liNode, searchbarNode.children[ 0 ].firstChild );
	}
	
	setFilterDisplay();
}

main();