// ==UserScript==
// @id             blockBaiduAds
// @name           blockBaiduAds
// @version        1.0
// @namespace      http://www.zfanw.com/blog/
// @author         chenxsan
// @description    移除百度搜索结果中的广告、竞价排名结果
// @include        http://*baidu.com*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @updateURL      https://userscripts.org/scripts/source/131190.user.js
// ==/UserScript==
//移除 SERPs 前、右广告
(function(){
   $("#1").prevAll().remove();
   $("#con-ar").nextAll("div").remove();
   $("#ec_im_container, .fsblock, table.ec_pp_f, .ec_pp_f+br, [class~=EC_mr15], .wgt-ads.qbbanner, .wgt-ads, .info-left-ad, #aside-ads-container, #bottom-ads-container").remove();
}());