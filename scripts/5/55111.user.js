// ==UserScript==
// @name          Rapidshare fast download start
// @version       1.0
// @namespace     RM
// @author        Rainmaker
// @description   Automatically redirects to free download without time counter.
// @include       http://*rapidshare.com/files/*
// ==/UserScript==

var ff = document.getElementById( 'ff' );
if ( ff )
{
	if ( ff.action.indexOf( '#' ) == -1 )
	{
		ff.action += '#dlt';
	}
	ff.submit();
}
