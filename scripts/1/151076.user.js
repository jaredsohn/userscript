// ==UserScript==
// @name        'My Products'  Width Increase (Non Widescreen)
// @description   Increase the width of the `My Products` Page on trademe
// @include     http://www.trademe.co.nz/MyTradeMe/Products/MyProducts*
// @version     1.1

/*

If you use the trademe `My Products`, you no longer have to put up with truncated auction titles.
This Script enables the Full Auction title to be displayed by increasing the Page width from the
normal 980 to 1200 Pixels. 
It then uses this extra space to increase the title column width and then relist the titles in full.

1200 Pixels is the best size for non-widescreen Monitors such as older 17" LCD Monitors.
If you have a widescreen Monitor or run at a horizontal resolution of 1336 are greater, you can install
the Widescreen Version to gain even more space.  http://userscripts.org/users/489302/scripts

History
V1.1
Corrected Scripts Link to http://userscripts.org/users/489302/scripts
Shorted Script Name

*/
// ==/UserScript==

// increase the Page width and Auction title column width

GM_addStyle ("body .wrapper, .wrap { margin: 0 auto; width: 1180px; }");
GM_addStyle (".bltTable .bltProductCol { width: 320px;}");

// Repopulate truncated titles with full text using the original title text

var x="";

 for (var i=1;i<10;i++)
 {
     x="ProductListRepeater_ctl0" + i + "_ProductCard_ProductEditLink";
     document.getElementById(x).text = document.getElementById(x).title;
 }

  for (var i=10;i<101;i++)
 {
     x="ProductListRepeater_ctl" + i + "_ProductCard_ProductEditLink";
     document.getElementById(x).text = document.getElementById(x).title;
 }
