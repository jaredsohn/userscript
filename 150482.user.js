/*
Removes the MyTradeMe and Community Drop-down window boxes and replaces
it with normal hyperlinks to the My Trade Me and Community pages.
Oct 2013

During the Month of OCT 2012, Trademe made more of the usual
pointless changes that they quite often make to the trademe website.
They really outdid themselves this time and added drop-down windows to
the `My Trade me` and `Community` tabs at the top of their pages.
This Script reverts those changes by removing the drop-down window source
code and replacing it with normal hyperlinks to `/mytrademe/default.aspx` 
and `/community/default.aspx`
To Enable or Disable this script, simply tick or untick the entry from the
greasemonkey drop-down menu.

*/

// ==UserScript==
// @name remove MTM Dropdown
// @include http://www.trademe.co.nz/*
// @version 1
// ==/UserScript==

document.getElementById('MyTradeMeDropDown').innerHTML = '<a href="/mytrademe/default.aspx" id="SiteHeader_SiteTabs_myTradeMeDropDownLink" class="beta header-link-btn mytrademe" >My Trade Me</a>';
document.getElementById('CommunityDropDown').innerHTML = '<a class="beta header-link-btn community" href="/Community/default.aspx" >Community</a>';
