// ==UserScript==
// @name        taobao-try-answer-fill
// @namespace   http://github.com/leoleozhu
// @description load taobao try answer from item details
// @grant       GM_xmlhttpRequest
// @include	*://try.taobao.com/item.htm?*
// @require     http://code.jquery.com/jquery-latest.js
// @version     0.1.1
// ==/UserScript==

// string formatter
String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

// the guts of this userscript
$(function() {
  // Note, jQ replaces $ to avoid conflicts.
  var question = $('.question>a').first().attr('href')
  var question_prop = $('.question>em').text()

  GM_xmlhttpRequest({
      method:     'GET',
      url:        question,
      onload:     function(response){
          var item_content = response.responseText
          var item = $.parseHTML(item_content)
          var result = $(item).find('#J_AttrUL>li:contains("{0}")'.f(question_prop)).attr('title').trim()
          $('#J_AnswerInput').val(result)
      }
  });
});
