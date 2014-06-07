// ==UserScript==

// @name OrkUTBoy's Quick Adder 

// @author OrkUtBOy 
// @description Makes the adding process faster

// @author DSSR <http://www.orkut.com/Profile.aspx?uid=3994617343526165457>

// @include http://www.orkut.com/FriendAdd.aspx?uid=*
// @include http://www.orkut.com/FriendAdd.aspx?accept=true*

// ==/UserScript==

javascript:dssr=document.forms[1]; dssr.action='FriendAdd.aspx?Action.yes&'+location.href.match(/uid=\d*/gi); dssr.submit();void (0)