// ==UserScript==
// @name           Changes Form Action
// @description    Changes Form Action
// @include        http://prettypowerful.bobbibrowncosmetics.com/contestants?search=state&sort_by=votes&word=pennsylvania
// @author         Andrew Connor
// ==/UserScript==

var arr2 = document.getElementsByClassName("button_to");
for (i = 0; i < 2; i++) {   
        alert("Here");    
	arr2[i].action = "/contestants/1178/vote";
}