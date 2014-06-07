// ==UserScript==
// @name           Trademe sidebar - extra(custom) links
// @namespace      http://www.notjustgaming.co.nz/
// @description    script to add extra links into the trademe sidebar
// @include        http://www.trademe.co.nz/*
// @include        http://trademe.co.nz/*
// ==/UserScript==
//**PLEASE EXCUSE ANY ERRORS, I'M NOT VERY FAMILIAR WITH JAVASCRIPT. I JUST WANTED TO GET SOMETHING WORKING.**
//YOU'RE WELCOME TO USE THIS CODE AS A STARTING POINT TO MAKE AN IMPROVED VERSION
var extralinks = document.createElement("font");
//I'm only using 'font' as it should be the least likely to muck up the formatting, it's only there as an element is required
extralinks.innerHTML =
'<li class="Selling"><strong id="SiteHeader_SideBar_Quicklinks_SellingText">Extras</strong>' +
'<li><a href="/MyTradeMe/WeeklySummary.aspx">Sales summary</a></li>' +
'<li><a href="/MyTradeMe/AccountStatement.aspx">Trade Me account</a></li>' +
'<li><a href="/MyTradeMe/PayNow/Statement.aspx">Pay Now account</a></li>' +
'<li><a href="/MyTradeMe/Favourites.aspx">My favourites</a></li>' +
'<li><a href="/Members/Feedback.aspx?">My feedback</a></li>' +
'<li><a href="/listings-onedollar.htm">$1 reserve</a></li>' +
'<li><a href="/listings-closing.htm">Closing soon</a></li>' +
'<li><a href="/listings-latest.htm">latest listings</a></li>' +
'<li><a href="/Community/MessageBoard/Default.aspx">Message Board</a></li>' +
'</li>';

//To remove links, just remove the appropriate line above
//To add a link, select the link you want to copy in firefox, then right-click & select...
//... 'view selection source' Copy all of the text that is displayed. Paste somewhere in between...
//... the lines above. Then make sure  '<li><a...' at the start & '..</a></li>' +' at the end of the line

var sidebar;
sidebar = document.getElementById('SiteHeader_SideBar_Quicklinks_UnsoldItemsLink');
if (sidebar) {
    sidebar.parentNode.insertBefore(extralinks, sidebar.nextSibling);
}