// ==UserScript==
// @name        BTC-E
// @namespace   http://btc-e.com
// @description BTC-E enhancements
// @match     https://btc-e.com/*
// @version     1
// @grant       none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  // alert("There are " + jQ('a').length + " links on this page.");

  // alert($); // check if the dollar (jquery) function works
  // alert($().jquery); // check jQuery version

    // Left Column
        $newsH3 = $("h3:contains('news')");
        $news = $newsH3.parent().attr('id','news');
        $left = $news.parent().attr('id','left');
        $table = $news.find('table');

    // Buy/Sell BTC
        $buyH1 = $("h1:contains('Buy')");
        $buy = $buyH1.parent().attr('id','buy');
        $buyHeader = $buy.find('.order_header');
        $buyTable = $buy.find('table.tabla2');

        $sellH1 = $("h1:contains('Sell')");
        $sell = $sellH1.parent().attr('id','sell');
        $sellHeader = $sell.find('.order_header');
        $sellTable = $sell.find('table.tabla2');

    // Right Column
        $chatCon = $('#nChatCon');
        $chat = $chatCon.parent().attr('id','chat');
        $right = $chatCon.parent().parent().attr('id','right');

        $usersOnline = $('div#users-online');
        $users = $usersOnline.parent();

    $left.append($news);
    $right.prepend('<div id="buyBox"></div><div id="sellBox"></div>');
    $buyBox = $('div#buyBox').addClass('block');
    $sellBox = $('div#sellBox').addClass('block');
    $('div#buyBox')
        .append($buyH1)
        .append($buyHeader)
        .append($buyTable);
    $('div#sellBox')
        .append($sellH1)
        .append($sellHeader)
        .append($sellTable);

    // extras?
        $chat.prepend('<h1>Trollbox</h1>');

        $chat.before($users);
        $users.prepend('<h1>Users Online</h1>');
}

// load jQuery and execute the main function
addJQuery(main);