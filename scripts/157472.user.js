// ==UserScript==
// @name       Naver NewsCast Killer
// @namespace  http://flourscent.pe.kr
// @version    0.6
// @description  hides news cast contents from www.naver.com
// @match      http://www.naver.com/
// @copyright  2012+, http://flourscent.pe.kr
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
 
$(document).ready(function() { 
    $('#news_cast2').hide();
});