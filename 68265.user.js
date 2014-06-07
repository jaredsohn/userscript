// ==UserScript==
// @name         Preceding (and Following) Tweets
// @namespace    http://twitter.com/m_satyr
// @description  Appends immediately preceding tweets to each status page.
// @include      http*://twitter.com/*/status*/*
// @license      MIT
// ==/UserScript==
var {$} = unsafeWindow,
[, url, uid, sid] = (
  /^(https?:\/\/twitter\.com\/(\w+))\/status(?:es)?\/(\d+)$/(location));
if(!$ || !url || !sid) return;

var sp = '<img src="http://a1.twimg.com/images/spinner.gif"/>';
var ul = $('<ul>').append(sp).insertBefore('#footer');
$.get(url +'?max_id='+ (sid - 1), function pt_got(h){
  $('#timeline > li', h).remove('.fav-action').appendTo(ul.empty())
    .find('.meta').css('background-color', '#eee');
});
$('<button>Get Following Tweets</button>').click(function onft(){
  setTimeout(function securityworkaround($ft){
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://search.twitter.com/search?from='+ uid +'&since_id='+ sid,
      onload: function(x){
        ($('#results ul', x.responseText).addClass('entry-content')
         .find('.avatar').remove().end()
         .find('.info').addClass('meta').end()
         .hide().replaceAll($ft).slideDown());
      }});
  }, 0, $(this).unbind().html(sp));
}).insertAfter('#header');
