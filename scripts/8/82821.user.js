// ==UserScript==

// @name	Improve CARDS ModSite
// @author	joshua.buzzard

// @description	Improves the CARDS ModSite by making it easier to use
// @version	1.0
// @include	http*://portal.scytale-inc.com/*
// @include	http*://portal.scytale-inc.com/pls/mods/*

// ==/UserScript==

//in the issue tracker need to set hidden to scroll so that
//we can actuall see all the issues.
var issueDivs = document.querySelectorAll("div");

for(i=0;i<issueDivs.length;i++){
   if(issueDivs[i].style.overflowY == "hidden")
     	issueDivs[i].style.overflowY = "scroll";
}


setTimeout("if( document.getElementsByName('frmAuth').length > 0)  document.getElementsByName('frmAuth')[0].submit();",300);