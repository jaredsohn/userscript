// ==UserScript==
// @name       Get user data
// @namespace  http://sevadenisov.ru
// @version    0.1
// @description  Get user data for some page
// @match      http://www.workle.local/offers/prolongation/
// @copyright  2014+, Seva Denisov
// ==/UserScript==

$.parseJSON($('#prolongData').html());