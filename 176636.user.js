// ==UserScript==
// @name       Cnbeta Clean
// @namespace  http://userscripts.org/users/529837
// @version    0.1.2
// @downloadURL http://userscripts.org/scripts/source/176636.user.js
// @updateURL http://userscripts.org/scripts/source/176636.meta.js
// @description  Cnbeta更适合阅读的样式.
// @match      http://www.cnbeta.com/articles/*
// @copyright  2013+, Chen Tianfei
// @grant          unsafeWindow
// @run-at document-end
// ==/UserScript==

(function() {
var $ = unsafeWindow.jQuery;
$('head').empty();
$('heaer.global_head, aside.main_content_right,.dig_btn, #back_top').remove();
var c = $('article.cb_box.article');
c.find('.title_bar,.fl,.fr,.rating_box,.navi').remove();
$('section.main_content_left > section').remove();
$('footer').remove();
 $('#left_art').remove();
$('.global_head').remove();
$('.introduction img').remove();
$('#news_title').css('text-align', 'center');
$('script, object, flash').remove();
$('body').attr('style', 'font-size: 1.3em;font-family: 黑体, Palatino, Georgia, Times, "Times New Roman";');
$('img').attr('style', 'max-width: 320px;max-height: 320px;');
})();