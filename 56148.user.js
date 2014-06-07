// ==UserScript==
// @name           hotgirl_remove_conversation
// @namespace      HOTGIRL
// @description    You can remove the conversation which you won't read by this script.
// @include        http://www.hotgirl.com.tw/discuss/view?fp_id=*
// ==/UserScript==
//document.write("<script src='http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js'></script>");
//function removeIt(){alert(true);$("div:has('a:contains(\"熱舞甜心\")') + div[class='style11']").remove();}
//window.onload = removeIt;
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
 if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
 else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
   $(document).ready(function(){
     nameArray = [];
     nameArray.push('熱舞甜心'); // Add names Like this format: nameArray.push('Name1', 'Name2', 'Name3');
     for(name in nameArray)
     $("div:has('a:contains("+nameArray[name]+")') + div[class='style11']").remove();
   })
 }