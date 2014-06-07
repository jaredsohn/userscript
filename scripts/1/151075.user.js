// ==UserScript==
// @name        Trademe 'My Products'  Width Increase (For Widescreens)
// @description   Increase the width of the `My Products` Page on trademe
// @include     http://www.trademe.co.nz/MyTradeMe/Products/MyProducts*
// @version     1.1

/*
>> Description:
If you use the trademe `My Products`, you no longer have to put up with truncated auction titles.
This Script enables the Full Auction title to be displayed by increasing the Page width from the
normal 980 to 1300 Pixels. 
It then uses this extra space to increase the title column width and then relist the titles in full.

1300 Pixels is the best size for widescreen Monitors which usually have a horizontal Pixel Resolution
of 1336 or more. If you have a Non Wide Screen Monitor, you are best to install the non Widescreen
Version to avoid columns disappearing of the edge of your screen.   http://userscripts.org/users/489302

>> History:
V1.1
Increased Title Width from 350 to 430
Improved Description text
*/

// ==/UserScript==

// increase the Page width and Auction title column width

GM_addStyle ("body .wrapper, .wrap { margin: 0 auto; width: 1300px; }");
GM_addStyle (".bltTable .bltProductCol { width: 430px;}");

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
