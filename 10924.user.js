// ==UserScript==
// @name           Blingo Search Helper
// @namespace      http://userscripts.org/users/30227
// @description    Win free prizes when you search the web through BLINGO.COM's search engine! Blingo only counts your first 25 searches each day, so this keeps a count next to your search box and lets you know when you've reached 25 or more in a given day so you can switch back to google.
// @include        *blingo.com*
// ==/UserScript==
(function(){

var blingoCount = GM_getValue("blingoCount","0")*1;
var bF = document.getElementsByTagName('input');
var bA=" style='margin-left: -0.8em; color:white; font-weight:bold;";
var bN = new Date();
var blingoNow = (bN.getMonth()+"-"+bN.getDate()+"-"+bN.getFullYear())
var blingoThen = GM_getValue("blingoThen",blingoNow);

// Different Day
if (blingoNow!=blingoThen){
  blingoCount=0;
}

// More than 25 visits today
if (blingoCount >= 25){
bF[0].style.color="white";
bF[0].style.backgroundColor="navy";
bF[0].style.borderColor="red";
bA += " text-decoration:blink;"
}    

// Show how many visits today
bF[0].nextSibling.style.width="70px";
var howmany=document.createElement("span");
howmany.innerHTML="<span "+bA+"'>"+blingoCount+" </span>";
bF[0].parentNode.insertBefore(howmany, bF[0].nextSibling);

// Search submitted - add one
document.addEventListener('submit', function() {
  blingoCount = blingoCount + 1;
  GM_setValue("blingoCount", blingoCount);
  GM_setValue("blingoThen", blingoNow);
}, true);


})();
