// ==UserScript==
// @name        神来一笔转文字
// @namespace   定义
// @description 神来一笔转文字
// @include     http://tieba.baidu.com/*
// @version     1
// ==/UserScript==
$.fn.banSLYJ=function()//替换函数
{
$.each(this,function(key,val)
{
$(val).replaceWith(
$(val).attr("text"));
});
}
$(".BDE_Smiley2").banSLYJ();//替换内容
$(".BDE_Smiley").banSLYJ();//替换内容