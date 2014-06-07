// ==UserScript==
// @name           Trademe sidebar on home page
// @description    script to add sidebar onto trademe home page(with extra links)
// @namespace      http://www.gamegeek.co.nz
// @include        http://www.trademe.co.nz/
// ==/UserScript==
//**PLEASE EXCUSE ANY ERRORS, I'M NOT VERY FAMILIAR WITH JAVASCRIPT. I JUST WANTED TO GET SOMETHING WORKING.**
//YOU'RE WELCOME TO USE THIS CODE AS A STARTING POINT TO MAKE AN IMPROVED VERSION

//remove the top horizontal line of 'buying' & 'selling' links
var tmHorizbar1 = document.getElementById('SiteLinks_QuickLinks');
if (tmHorizbar1) {
    tmHorizbar1.parentNode.removeChild(tmHorizbar1);
}

//remove the lower horizontal line of '$1 reserve', 'hot' etc links
var tmHorizbar2 = document.getElementById('HomepageBonusLinks');
if (tmHorizbar2) {
    tmHorizbar2.parentNode.removeChild(tmHorizbar2);
}

//remove the getting started box
var tmGettingStarted = document.getElementById('GettingStarted');
if (tmGettingStarted) {
    tmGettingStarted.parentNode.removeChild(tmGettingStarted);
}

var extralinks = document.createElement("div");
extralinks.innerHTML =
'<div id="SiteHeader_SidebarColumn" class="SidebarColumn">' +
'<div id="SiteHeader_SideBar_Quicklinks_QuickLinks" class="QuickLinks">' +
//buying
'<ul><li><strong id="SiteHeader_SideBar_Quicklinks_BuyingText">Buying</strong><ul>' +
'<li><a href="/MyTradeMe/Buy/Watchlist.aspx?source=sidebar">Watchlist</a></li>' +
'<li><a href="/MyTradeMe/Buy/Won.aspx?source=sidebar" id="SiteHeader_SideBar_Quicklinks_WonItemsLink">Items I won</a></li>' +
'<li><a href="/MyTradeMe/Buy/Lost.aspx?source=sidebar" id="SiteHeader_SideBar_Quicklinks_LostItemsLink">Items I lost</a></li>' +
'<li class="Last"><a href="/MyTradeMe/Favourites.aspx?source=sidebar">My favourites</a></li></ul></li>' +
//selling
'<li class="Selling"><strong id="SiteHeader_SideBar_Quicklinks_SellingText">Selling</strong><ul>' +
'<li id="SiteHeader_SideBar_Quicklinks_ListAnItem"><a href="/Sell/Default.aspx?source=sidebar">List an item</a></li>' +
'<li><a href="/MyTradeMe/Sell/Current.aspx?source=sidebar">Items I\'m selling</a></li>' +
'<li><a href="/MyTradeMe/Sell/Sold.aspx?source=sidebar" id="SiteHeader_SideBar_Quicklinks_SoldItemsLink">Sold items</a></li>' +
'<li class="Last"><a href="/MyTradeMe/Sell/Unsold.aspx?source=sidebar" id="SiteHeader_SideBar_Quicklinks_UnsoldItemsLink">Unsold items</a></li></ul></li>' +
//extras
'<li class="Selling"><strong id="SiteHeader_SideBar_Quicklinks_SellingText">Extras</strong><ul>' +
'<li><a href="/MyTradeMe/WeeklySummary.aspx">Sales summary</a></li>' +
'<li><a href="/MyTradeMe/AccountStatement.aspx">Trade Me account</a></li>' +
'<li><a href="/MyTradeMe/PayNow/Statement.aspx">Pay Now account</a></li>' +
'<li><a href="/MyTradeMe/Favourites.aspx">My favourites</a></li>' +
'<li><a href="/Members/Feedback.aspx?">My feedback</a></li>' +
'<li><a href="/listings-onedollar.htm">$1 reserve</a></li>' +
'<li><a href="/listings-closing.htm">Closing soon</a></li>' +
'<li><a href="/listings-latest.htm">Latest listings</a></li>' +
'<li><a href="/Community/MessageBoard/Default.aspx">Message Board</a></li></ul></li>' +
'</li></ul></div></div>';

//To remove links, just remove the appropriate line above
//To add a link, select the link you want to copy in firefox, then right-click & select...
//... 'view selection source' Copy all of the text that is displayed. Paste somewhere in between...
//... the lines above. Then make sure  '<li><a...' at the start & '..</a></li>' +' at the end of the line

var sidebar;
sidebar = document.getElementById('HomepageLeft');
sidebar.style.marginLeft = '20px';
//move the category links etc right by 20 pixels, to give a gap between the sidebar & the links
if (sidebar) {
    sidebar.parentNode.insertBefore(extralinks, sidebar);
}