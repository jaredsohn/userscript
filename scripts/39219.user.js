// ==UserScript==
// @name         Kayako Filter Refresh
// @copyright    WayneE
// @description  Reloads Kayako Filter Results
// @include 	 https://ENTERURL/staff/index.php?_m=tickets&_a=manage&ticketsearchid=*
// @exclude      about:*
// @exclude      chrome:*
// ==/UserScript==

// Be sure to edit ticketfilterid=# to match you filter number.
// The number afterwords is how often you want it to refresh.
setTimeout("window.location.href='https://ENTERURL/staff/index.php?_m=tickets&_a=runfilter&ticketfilterid=TICKETFILTERID#'",30000);