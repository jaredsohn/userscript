// ==UserScript==
// @name        Trello Card Count & Id
// @namespace   http://userscripts.org/users/343120
// @description Shows number of cards in a list next to list title, also displays card Id for each card, for easy reference.
// @include     http://trello.com/*
// @include     https://trello.com/*
// @version     1
// ==/UserScript==



// http://stackoverflow.com/questions/5006460/userscripts-greasemonkey-calling-a-websites-javascript-functions
function exec(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.body.appendChild(script); // run the script
  document.body.removeChild(script); // clean up
}


window.addEventListener("load", function() {
    exec(function() {
        $('p.num-cards').css('display','inline');
        $('span.card-short-id').removeClass('hide').addClass('badge-text').wrap('<div class="badge" style="margin-bottom:0; padding-left:4px;"></div>');
    });
}, false);