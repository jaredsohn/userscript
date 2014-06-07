// ==UserScript==
// @name       dy161去广告
// @author	monsm
// @namespace  http://weibo.com/monsm
// @version    0.1
// @description  论坛点击最新永远获取最新，不是伪最新
// @include      http*://*.dy161.com*
// @copyright  2013+, monsm
// ==/UserScript==
$("<script language='javascript' src='http://www.dy161.com/fmt.js'  id='ScrollScreen' />").appendTo('body');
$('#ScrollScreen').remove();