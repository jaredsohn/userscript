// ==UserScript==
// @name           Trello auto update List Card Count
// @namespace      trello
// @description    update Trello card numbers in a list
// @include        https://trello.com/b/*
// ==/UserScript==

// access the really "window"
// http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
function exec(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}

exec(function() {

  function updateTrelloListCardCount() {
    if(!window.$)return;
    $(".list-header-num-cards").show();
  }
   setInterval(updateTrelloListCardCount, 1000);
  $(updateTrelloListCardCount);

});
