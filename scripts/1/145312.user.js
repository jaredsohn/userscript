// ==UserScript==
// @name        AnkiWeb RubyText
// @namespace   bevyn.ankiweb.rubytext
// @include     http://ankiweb.net
// @include     http://ankiweb.net/study
// @include     https://ankiweb.net
// @include     https://ankiweb.net/study
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource    CSSRubyText http://www.useragentman.com/shared/css/ruby/screen.css
// @version     6
// ==/UserScript==

// include startsWith function
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

// load UserAgentMan's Cross Browser Ruby Text in CSS3
GM_addStyle(GM_getResourceText("CSSRubyText"));
var ua = $.browser
if (ua.msie) {
  var vn = parseInt(ua.version, 10);
  if (vn < 7) {
    $(document.body).addClass('ie6');
  } else if (vn === 7) {
    $(document.body).addClass('ie7');
  } else if (vn === 8) {
    $(document.body).addClass('ie8');
  } else if (vn === 9) {
    $(document.body).addClass('ie9');
  } else if (vn > 9) {
    $(document.body).addClass('modern');
  }
} else {
  $(document.body).addClass('notIE modern');
}
// load the observation code
$(function() {
  $('#qa_box').live('DOMNodeInserted', function(event) {
    if (event.target.id.startsWith('cm')) {
    
      $(event.target).children('span').each(function(index,span) {
        var span = $(span),
            text = span.text(),
            expr = /\s?([^\[^\]^\s]+)\[([^\[^\].]+)\]/,
            html = '',
            match;
        
        // transform KANJI[READING] to RubyText
        while (match = expr.exec(text)) {
          if (match.index > 0) {
            html += text.slice(0,match.index);
            text  = text.slice(match.index);
          }
          html += '<ruby><rb>'+match[1]+'</rb><rp>[</rp><rt>'+match[2]+'</rt><rp>]</rp></ruby>';
          text = text.slice(match[0].length);
        }
        html += text;
        
        // replace the contents in the DOM
        span.html(html);
      });
    }
  });
});