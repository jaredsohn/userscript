// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.huobi.com/news/index.php?a=show&cat=0
// @copyright  2012+, You
// ==/UserScript==

setTimeout(function(){location.reload()},10000)
if($('.content_list .c_list li:first-child div.text h4.title a').text()!='莱特币利息发放说明'){location.href='https://www.youtube.com/watch?v=GWXLPu8Ky9k'}