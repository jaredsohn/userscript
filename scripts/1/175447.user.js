// ==UserScript==
// @name       No timeline AD for Tencent Weibo
// @namespace  https://no-timeline-ad.googlecode.com/
// @version    0.7
// @description  腾讯微博消息流广告移除脚本，在页面刷新后自动移除来自“微博推广”/“今日热点”的广告内容。
// @match      http://t.qq.com/*
// @copyright  2013+, Tencent Weibo
// @require    http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

function remove_timeline_pubfrom() {
    var timeline_ad;
    $('#talkList li').each(function(idx,li_html) {
        timeline_ad = $.grep($(li_html).find('.pubInfo span, .pubInfo a').find('.f'), function(el,i) {
            //console.log($(el).text());
            return $(el).text() == "微博推广" || $(el).text() == "微博推荐";
        });
        if (timeline_ad.length > 0) {   // found!
            console.log("[No Timeline AD] 发现信息流广告：\n", li_html);
            li_html.outerHTML = "<!-- Timeline AD-PubFrom Killed. -->";
        }
    });
}

function remove_timeline_richmod() {
    var timeline_ad;
    $('#talkList li').each(function(idx,li_html) {
        timeline_ad = $.grep($(li_html).find('.rich_mod div').find("h3"), function(el,i) {
            //console.log($(el).text());
            return $(el).text() == "今日热点" || $(el).text() == "推荐收听";
        });
        if (timeline_ad.length > 0) {   // found!
            console.log("[No Timeline AD] 发现信息流广告：\n", li_html);
            li_html.outerHTML = "<!-- Timeline AD-RichMod Killed. -->";
        }
    });
}

var talklist_tweets = 0;
function check_timeline_changes() {
    var tmp_tweets = $('#talkList').find("li").length;
    if (tmp_tweets != talklist_tweets) {
        // timeline中的消息条数与上次不同
        console.log("[No Timeline AD] timeline.onChange(): twt_num " + talklist_tweets + " -> " + tmp_tweets);
        talklist_tweets = tmp_tweets;
        remove_timeline_pubfrom();
        remove_timeline_richmod();
    }
    // 延迟1秒继续检查更新
    setTimeout(check_timeline_changes, 1000);
}

$(document).ready(function() {
    check_timeline_changes();
});