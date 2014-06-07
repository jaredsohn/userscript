// ==UserScript==
// @name        Twitter Mentions Search
// @namespace     http://userscripts.org/scripts/source/47736.user.js
// @description    Adds link to see mentions of twitter users in each status update
// @include     http://twitter.com/*
// @include     http://www.twitter.com/*
// ==/UserScript==

function withJQuery(func) {
  if(!unsafeWindow.jQuery) {
    var s = document.createElement('script');
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';

    s.addEventListener('load', function() {
      // lots of people like to have their own $ function
      unsafeWindow.jQuery.noConflict();
      func(unsafeWindow.jQuery);
    },false);

    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    func(unsafeWindow.jQuery);
  }
}

function addSeeMentions($){
  $('span.status-body strong')
    .not(':has(a.seeMentions)')
    .find('a.tweet-url:first')
      .each(function(){
        var user = $(this).text();
        $('<a> </a>')
          .addClass('seeMentions')
          .attr({
            'target': '_blank',
            'title': 'See Mentions to ' + user,
            'href': 'http://search.twitter.com/search?q=%40' + user
          })
          .css({
            'display': 'block',
            'float': 'left',
            'background-image': 'url(http://s.twimg.com/a/1274144130/images/sprite-icons.png)',
            'background-position': '0 64px',
            'height': '13px',
            'width': '15px',
            'color': '#999'
          })
          .mouseover( function(){ $(this).css('background-position', '-16px 64px') } )
          .mouseout( function(){ $(this).css('background-position', '0 64px') } )
          .insertBefore(this);
      });
}

withJQuery(function($) {
  addSeeMentions($);
  $('#pagination').ajaxSuccess(function(){ addSeeMentions($); })
});
