// ==UserScript==
// @name       KTXP&dmhyTorrentLinkToMagnet
// @namespace  http://KTXP&dmhyTorrentLinkToMagnet/
// @version    2.0
// @description  复制种子链接之后迅雷总是跳出来，但是下种子是怎么回事，给我下资源去！于是这个把极影首页以及搜索页的绿底白箭头种子链接改为磁链的脚本就诞生了。去了趟动漫花园发现下种子还要登录，于是稍微更新一下
// @match      http://bt.ktxp.com/*
// @match	   http://share.dmhy.org
// @match	   http://share.dmhy.org/topics/list*
// @require    http://www.sise.com.cn/js/jquery-latest.js
// @copyright  2014.01.17, JMNSY
// ==/UserScript==

$().ready(function(){
    var link;
    if($(".quick-down").length > 0){
        link = $(".quick-down");
    }
    if($(".download-arrow[title='種子']").length > 0){
        link = $(".download-arrow[title='種子']");
    }
    link.each(function(){
        str = $(this).attr("href");
        var words = str.split("/");
        torrent = words[words.length - 1];
        hash = torrent.split(".")[0];
        magnet = "magnet:?xt=urn:btih:" + hash;
        $(this).attr("href",magnet);
    });
});