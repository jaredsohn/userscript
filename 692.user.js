// ==UserScript==
// @namespace     http://dunck.us/code/greasemonkey
// @name          My Yahoo! Cleaner
// @description   Removes the clunky headers above main content in my.yahoo.com
// @include       http://my.yahoo.*
// ==/UserScript==

(function() {


	el = document.getElementById( "ymadbn" );
	el.style.display = 'none';

	el = document.getElementById( "ymv1" );
	el.style.display = 'none';

	els = document.getElementsByTagName( "div" );
	var i;
	for( i = 0 ; i < els.length ; i ++ )
	{
		if( els[i].className.indexOf("tb") > -1 )
		{
			els[i].style.display = "none";
		}
	}
})();
