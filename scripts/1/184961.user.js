// ==UserScript==
// @name        BTC-E Chatbox Refresh
// @namespace   blabliblubblu321
// @include     https://btc-e.com/exchange/*
// @version     1
// ==/UserScript==
refreshchatbox = function() {
  $.get('', function(response) {
    var chatbox = $('<div />').html(response).find('#nChat');
    if (chatbox) $('#nChat').html($(chatbox).html());
    $('#nChat').animate({
      scrollTop: 100000
    }, 50);
    setTimeout(refreshchatbox, 2000);
  });
};
refreshchatbox();
$('#loaderFade').remove();
$('#mainLoader').remove();

setInterval(refreshchatbox, 2000);