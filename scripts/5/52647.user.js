// ==UserScript==
// @name           Sixthman Message Board Tweaker
// @namespace      http://codedrobot.com/greasemonkey/sixthman
// @include        http://www.sixthman.net/community/*
// ==/UserScript==

	
(function() {


	/* This segment of code hides the Sixthman branding */	
	var bodylines = document.evaluate( '//div[@class="section2"]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	if ( bodylines.snapshotLength == 0 )
		return;

	document.body.innerHTML = bodylines.snapshotItem( 0 ).innerHTML;
	document.body.setAttribute( "background", "" );
	document.body.setAttribute( "style", "margin-left: 5%; margin-right: 5%; background: #eee" );


	/* This segment of code modifies the "View New Posts" link */
	var pagination = document.getElementsByClassName('pagination')[0];
	var divString = pagination.innerHTML;	
	var searchString = '<a href="./search.php?search_id=newposts">View new posts</a>';
	var firstPart = divString.substring(0, divString.indexOf(searchString));
	var lastPart = divString.substring(divString.indexOf(searchString) + divString.length);
	
	var newLinks = "New Posts: ";
	newLinks += '<a href="./search.php?search_id=newposts">All</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=2&sc=1">TEC</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=3&sc=1">TRB</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=4&sc=1">SMC</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=5&sc=1">CAY</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=27&sc=1">VH1</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=43&sc=1">KRC</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=48&sc=1">SSG</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=59&sc=1">SND</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=67&sc=1">311</a> | ';
	newLinks += '<a href="./search.php?search_id=newposts&fid[]=75&sc=1">ROM</a>';
	document.getElementsByClassName('pagination')[0].innerHTML = firstPart + newLinks + lastPart;

})();

