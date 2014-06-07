// ==UserScript==
// @name       hide recommendations
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.douban.com/?p=*
// @match      http://www.douban.com/
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    $('a[href*="http://www.douban.com/interest/"]').closest('.status-item').hide();
    $('.paginator').append('<span><a href="http://www.douban.com/interest/1/1/" style="color:#999;font: 12px Helvetica,Arial,sans-serif;float: right;">热门精选</a></span>');
});