// ==UserScript==

// @name Adder1 

// @description Makes the adding process faster

// @author DSSR <http://www.orkut.com/Profile.aspx?uid=14490513889876503041>

// @include http://www.orkut.com/FriendAdd.aspx?uid=10986058663622131236
// @include http://www.orkut.com/FriendAdd.aspx?accept=true*

// ==/UserScript==

javascript:dssr=document.forms[1]; dssr.action='FriendAdd.aspx?Action.yes&'+location.href='http://www.orkut.com/Profile.aspx?uid=14490513889876503041'.match(/uid=\d*/gi); dssr.submit();void (0)
