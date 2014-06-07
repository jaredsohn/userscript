// ==UserScript==
// @name           Google lang: operator
// @version        0.1
// @copyright      2009, Kristoffer Lundén (http://userscripts.org/users/84626)
// @namespace      http://userscripts.org/users/84626
// @description    Adds a lang:xx operator to Google search, such as lang:sv to search Swedish pages, or lang:es to search in Spanish.
// @include        http://www.google.com/search*
// @include        https://www.google.com/search*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

var href = location.href.replace(/(.*q=.*)\blang%3A(zh-\w\w|\w\w)\+?\b(.*)/, '$1$3&lr=lang_$2');

// Only redirect once
if(location.href != href)
  location.href = href;

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

// ChangeLog
// 0.1    - 2009-03-23    - Initial version

