// ==UserScript==
// @name TicketRefresh
// @namespace TicketRefresh
// @description Refreshes ticket lists
// @include http*://ljhtech.zendesk.com/rules/*
// @CodedBy Karr0t
// @Website www.google.com.au
// @UserScripts http://UserScripts.org/users/Karr0t
// @license Free
// @version 1.0.1
// ==/UserScript==

	//===[Settings]===\\
		var RefreshTime = '4';  //==[Set time by seconds]
	//===[/Settings]===\\
    
    if (RefreshTime > 0) setTimeout("location.reload(true);",RefreshTime*1000);