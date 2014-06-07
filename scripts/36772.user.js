// ==UserScript==
// @name           Live Mail AdHider
// @namespace      adhider
// @include        *mail.live.com/*
// ==/UserScript==

// Hide banner at the top
var banner = document.getElementById("RadAd_Banner");
banner.setAttribute("style", "display: none;");
// Hide ad at the lower left corner
var bottomad = document.getElementById("CustComm_120x60");
bottomad.setAttribute("style", "display: none;");
// Hide the Microsoft bar
var topnav = document.getElementById("c_header");
topnav.setAttribute("style", "display: none;");

// Get the user panel and move it to where the Hotmail title ussually is
var userp = document.getElementById("c_me");
var topbar = document.getElementById("Middle");
topbar.setAttribute("style", "");
var productname = topbar.childNodes[1];
var userPortrait = userp.childNodes[0];
var hiddenList = userp.childNodes[1];

// This makes the menu pop up at the right position
hiddenList.setAttribute("id", "hiddenList");
hiddenList.setAttribute("onmouseover", "this.style.left = '0px';");
userPortrait.setAttribute("onclick", "try{ $menu.bind(event,1,0,1);}catch(e){}; document.getElementById('hiddenList').style.left = '0px';");

// And finally, actually move the menu
productname.innerHTML = "";
productname.appendChild(userPortrait);
productname.appendChild(hiddenList);

