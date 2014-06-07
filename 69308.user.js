// ==UserScript==
// @name           Google lang: operator
// @version        0.2
// @copyright      2010 Nicolai Ehemann (en@enlightened.de)
// @namespace      http://www.enlightened.de
// @description    Adds a lang:xx operator to Google search, such as lang:sv to search Swedish pages, or lang:es to search in Spanish, without requiring a redirect
// @include        http://www.google.*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
//
// ChangeLog
// 0.2  2010-02-18  Initial version
//
// ==/UserScript==

(function() {

  var form = document.getElementsByTagName('form')[0];
  if ('/search' == form.action) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'lr';
    form.appendChild(input);
    form.addEventListener('submit', function(event) {
        var form = document.getElementsByTagName('form')[0];
        var match = form.q.value.match(/\blang:(zh-\w\w|\w\w)\b/);
        if (1 < match.length) {
          form.lr.value = 'lang_' + match[1];
          form.q.value = form.q.value.replace(/(.*)\blang:(zh-\w\w|\w\w)\b(.*)/, '$1$3');
        }
      }, false);
  }
})()

//  Supported lang: operators:
//  lang:af    - Afrikaans
//  lang:ar    - Arabic
//  lang:hy    - Armenian
//  lang:be    - Belarusian
//  lang:bg    - Bulgarian
//  lang:ca    - Catalan
//  lang:zh-CN - Chinese (Simplified)
//  lang:zh-TW - Chinese (Traditional)
//  lang:hr    - Croatian
//  lang:cs    - Czech
//  lang:da    - Danish
//  lang:nl    - Dutch
//  lang:en    - English
//  lang:eo    - Esperanto
//  lang:et    - Estonian
//  lang:tl    - Filipino
//  lang:fi    - Finnish
//  lang:fr    - French
//  lang:de    - German
//  lang:el    - Greek
//  lang:iw    - Hebrew
//  lang:hu    - Hungarian
//  lang:is    - Icelandic
//  lang:id    - Indonesian
//  lang:it    - Italian
//  lang:ja    - Japanese
//  lang:ko    - Korean
//  lang:lv    - Latvian
//  lang:lt    - Lithuanian
//  lang:no    - Norwegian
//  lang:fa    - Persian
//  lang:pl    - Polish
//  lang:pt    - Portuguese
//  lang:ro    - Romanian
//  lang:ru    - Russian
//  lang:sr    - Serbian
//  lang:sk    - Slovak
//  lang:sl    - Slovenian
//  lang:es    - Spanish
//  lang:sw    - Swahili
//  lang:sv    - Swedish
//  lang:th    - Thai
//  lang:tr    - Turkish
//  lang:uk    - Ukrainian
//  lang:vi    - Vietnamese
