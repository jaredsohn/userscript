// ==UserScript==
// @name       Goodbye，知乎专栏！
// @namespace  http://drownincodes.sinaapp.com/
// @version    0.2
// @description  在知乎时间轴中隐藏知乎专栏相关动态。
// @match      http://www.zhihu.com/
// @copyright  2013+, James Swineson
// ==/UserScript==


console.log('Goodbye，知乎专栏！ Version 0.1 By James Swineson');
function hideZhuanlan(){
    $("div.source:contains('一篇文章')").parent().parent().hide();
}
hideZhuanlan();
$(window).on('scroll',hideZhuanlan);