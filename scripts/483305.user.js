// ==UserScript==
// @id             www.yaplakal.com-a6208452-b0ed-42d2-b816-fc58aeba151d@scriptish
// @name           ЯПBlock
// @version        0.1
// @namespace      
// @author         Zloy_Gelud
// @description    Скрывает блоки на ЯПе, которые не имеют возможности изменения рейтинга (реклама?)
// @include        http://www.yaplakal.com/
// @run-at         document-end
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var Ad = $('td.newshead:not(:has(div.rating-short-value))').parent();
$(Ad).css({'display':'none'});
$(Ad).next().css({'display':'none'});
$(Ad).next().next().css({'display':'none'});