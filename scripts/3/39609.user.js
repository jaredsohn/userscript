// ==UserScript==
// @name         Selectable Twitter Refresh
// @namespace    http://userscripts.org/users/35001
// @description  Selectable Refresh to the Twitter sidebar.
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @author       Hannibal Smith.
// ==/UserScript==

// Copyright (c) 2008, Hannibal Smith
// Released under the BSD license.
// http://www.opensource.org/licenses/bsd-license.php

var tabmenu, myformhtml;
var refresh  = null; GM_getValue( "dlay" );
tabmenu = document.getElementById( "tabMenu" );

function RefreshAction( dlay ) {
	GM_setValue( "dlay", dlay );
	dlay = parseInt( dlay ); 
	if ( refresh ) {
		clearInterval( refresh );
		refresh = null;
	}
	if ( dlay )  {
		refresh = setInterval(  function(  ) {
		             	 	status = document.getElementById( "status" );
 		             		if ( status && status.value == "" )  
 		                  	     window.location.href = window.location.href;
		             		}, dlay * 60000 );	
	}	
}

if ( tabmenu ) {
myformhtml = document.createElement( "div" );
myformhtml.innerHTML = '<strong><form name = "myform" style="margin-left:15px; margin-bottom:15px;">Refresh every <select name="refrselect"><option value="0">0</option><option value="1">1</option><option value="2" >2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8" >8</option><option value="9">9</option></select> minutes <input type="submit" value="Go" onclick="RefreshAction(document.myform.refrselect.selectedIndex)" style="padding:2px;"></form></strong>';
tabmenu.parentNode.insertBefore( myformhtml, tabmenu ); 
}
