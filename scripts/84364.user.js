// ==UserScript==

// @name           Procrastinator

// @namespace      Kirsten

// @description    Puts irrelevant did you mean suggestions at the top of the search results.

// @include        http://www.google.*/*q=*

// @include        http://google.*/*q=*

// @exclude        http://www.google.*/images*

// @exclude        http://google.*/images*

// ==/UserScript==


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

// Main function to display the did you mean stuff

function letsJQuery() {
var messages = ["Boobies", "Facebook", "Twitter", "Keyboard Cat", "Cheerleaders in Swimsuits", "Lolcats Generator", "The Onion", "Xtube", "Online roulette", "Lamebook", "Dilbert", "Cute Animals", "Celebrity Gossip", "People of Walmart"];
message = messages[Math.floor(Math.random() * messages.length)];
  if (messages.length != 0) {
    $('#ires').before('<ol><li><p class="ssp"><span style="color: rgb(204, 0, 0);" class="spell">Did you mean: </span><a class="spell" href="http://www.google.com/search?q=' + message + '"><b><i>' + message + '</i></b></a>&nbsp;&nbsp;<span class="std">Top results shown</span></p></li></ol>');
  }
}