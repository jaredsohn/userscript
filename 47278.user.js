// Brought to you by Funkbrotha10
// ====================================================================================
//
// ==UserScript==
// @name Search Bar Removal
// @ This script will remove the search bar completly from the page
// @include http://www.bungie.net/*
// ==/UserScript==
//


var nav_1 = document.getElementById("ctl00_dashboardNav_searchMini_Panel1");
if(nav_1)
{
     nav_1.innerHTML = '<!--REMOVED--!>';
}


//
//This Script may be put out of service
//



