// ==UserScript==
// @name          Sort the Dark Throne attack and spy lists
// @namespace     http://www.darkthrone.com/
// @description	  Sorts the Dark Throne attack and spy lists by Race, Army Size and Gold
// @include       http://www.darkthrone.com/userlist/attack*
// @include       http://www.darkthrone.com/userlist/spy*
// ==/UserScript==
unsafeWindow.SortTable("2", "numbers");
unsafeWindow.SortTable("3", "numbers");
unsafeWindow.SortTable("5", "races");