// ==UserScript==
// @name       51job广告
// @namespace  
// @version    0.1.1
// @description  
// @match      http://www.51job.com/*
// @copyright  2014+, Jast
// ==/UserScript==

$('.firstscreen').nextAll().remove();
$('#main').siblings().remove();
$('#ad_left,#ad_right,.ad_xz_left,.weifantang-wrap,#SlipLay,#ad_top').remove();
//内页
$('.mainleft.s_search.search_btm0').remove();
$('.bline_search.zjjzss_kb').siblings()[2].innerHTML='';