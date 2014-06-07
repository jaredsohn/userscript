// ==UserScript==
// @name		Remove Ad Button 
// @namespace  http://www.fleaflicker.com/
// @version    0.1
// @description  Remove the Remove Ads buttons
// @match      http://www.fleaflicker.com/* 
// @copyright  2014+, Bryan G
// ==/UserScript==

var buttons = document.getElementsByClassName("btn-xs");
var i;
for(i = 0; i < buttons.length; i++){
    if(buttons[i].href == "http://www.fleaflicker.com/mlb/upgrade?upgradeType=AD_FREE")
    buttons[i].style.display = 'none';
}