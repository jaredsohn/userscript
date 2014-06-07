// ==UserScript==
// @name       ACG Zone add search next to title
// @namespace  http://jixun.org/
// @version    0.1
// @description  因为和谐期间暂时禁止会员注册，而且没会员不能看内容，所以写了这个脚本 =-=
// @include    http://acgzone.us/*
// @require    http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js
// @copyright  2012+, jixun66
// ==/UserScript==

$('h1.entry-title a').each(function(index){$(this).after('   <a class="s_12px" href="http://google.com/search?q=' + $(this).html() + '" target="_blank">搜索</a>' )});
$('a.s_12px').css('font-size', '14px');