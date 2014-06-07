// ==UserScript==
// @name        v2ex-ignore-topic-home
// @namespace   http://github.com/leoleozhu
// @description Ignore v2ex topics on homepage
// @include	*://*.v2ex.com/
// @include	*://v2ex.com/
// @include	*://*.v2ex.com/?tab=*
// @include	*://v2ex.com/?tab=*
// @include	*://*.v2ex.com/go/*
// @include	*://v2ex.com/go/*
// @version     0.1.2
// ==/UserScript==

var w = unsafeWindow;
var $ = w.$;

String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

$(function(){
    $('.cell').each(function()
      {
          var cell = $(this);

          var ignore = $('<a href="#" style="float:right">忽略主题</a>');

          ignore.click(function(){
              var t = cell.find('.item_title a,.item_hot_topic_title a').attr('href');
              console.log('ignoring '+t);
              $.get(t).done(function(html){
                  var m = /\/ignore\/topic\/\d+\?once=\d+/.exec(html)
                  if(m)
                  {
                      $.get(m[0]).done(function(){cell.remove();});
                  }
              });

              cell.html('<p>ignoring...</p>');
              return false;
          });

          var tool = cell.find('td[width=auto]');
          tool.append(ignore);

     });
});

