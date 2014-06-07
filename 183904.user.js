// ==UserScript==
// @name       [btc-e.com] Automaticly refresh trollbox
// @namespace  http://btc-e.com/
// @version    0.1
// @description  This script enables automatic updating of the Troll box (sometimes BTC-e disables it).
// @match      https://btc-e.com/*
// @copyright   Unknown (donate BTC: 15YGxQUS9UN3cWnPtUKPtsXCDJeBYArXYS)
// ==/UserScript==

refreshTrollbox = function() {
  $.get('', function(response) {
    var trollbox = $('<div />').html(response).find('#nChat');
    if (trollbox) $('#nChat').html($(trollbox).html());
 
    setTimeout(refreshTrollbox, 2000);
  });
};
refreshTrollbox();
$('#loaderFade').remove();
$('#mainLoader').remove();