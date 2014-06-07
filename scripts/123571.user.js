/* 
* @Author: hanjiyun
* @Date:   2013-12-28 22:24:19
* @Last Modified by:   hanjiyun
* @Last Modified time: 2013-12-29 03:51:35
*/

// ==UserScript==
// @name DoubanFilter
// @namespace http://han.im/
// @include http://www.douban.com
// @include http://www.douban.com/
// @include http://www.douban.com/*
// @include http://www.douban.com/?p=*
// @include http://www.douban.com/people/*/status/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js
// @version 0.11.3
// ==/UserScript==


// 过滤
$('head').append('<style type="text/css"> .dreamer-filter {margin:0;position:absolute;top:-26px;right:107px;} .dreamer-block {float:left; background:url("http://t.douban.com/pics/a1.png") no-repeat scroll 100% -19px transparent !important; padding-right:10px; padding-left: 30px; color:#ccc !important;} .dreamer-block:hover {color:#999!important;} .dreamer-block-on {background-position:100% 4px !important; position:relative !important;right:0px; z-index:10 !important;} #dreamer-options {position:absolute; left:-400px; top:20px;z-index:2;} #dreamer-options .hd {background:#fff; border:1px solid #aaa; border-bottom:none; height:24px; overflow:hidden; padding:0 5px; position:absolute; right:0; top:-24px;} #dreamer-options .bdd {background:#fff; border:1px solid #aaa; padding:10px; width:450px;} #dreamer-options .bdd li {line-height:17px; margin-bottom:5px;display:inline-block;width:150px;} #dreamer-options .bdd label{display:inline;}</style>');

$('.statuses-setting .hd').after('<div class="dreamer-filter"><a id="dreamer-block" class="dreamer-block" href="#">过滤</a><div id="dreamer-options" class="hidden"><div class="hd" style="width:40px;"></div><div class="bdd"><ul><li><input type="checkbox" id="DBFT_sns_say" name="sns_say" value="1018"><label for="DBFT_sns_say">友邻说</label></li><li><input type="checkbox" id="DBFT_rec_note" name="rec_note" id="DBFT" name="rec_note" value="1015"><label for="DBFT_rec_note">日记</label></li><li><input type="checkbox" id="DBFT_movie" name="movie" id="DBFT" name="movie" value="1002"><label for="DBFT_movie">电影</label></li><li><input type="checkbox" id="DBFT_rec_photo" name="rec_photo" value="1025"><label for="DBFT_rec_photo">照片</label></li><li><input type="checkbox" id="DBFT_rec_music" name="rec_music" value="1003"><label for="DBFT_rec_music">音乐</label></li><li><input type="checkbox" id="DBFT_book" name="book" value="1001"><label for="DBFT_book">读书</label></li><li><input type="checkbox" id="DBFT_doulist" name="doulist" value="1020"><label for="DBFT_doulist">书影音图豆列</label></li><li><input type="checkbox" id="DBFT_rec_doulist" name="rec_doulist" value="3093"><label for="DBFT_rec_doulist">推荐商品豆列</label></li><li><input type="checkbox" id="DBFT_add_to_doulist" name="add_to_doulist" value="3090"><label for="DBFT_add_to_doulist">向豆列添加商品</label></li><li><input type="checkbox" id="DBFT_rec_topic" name="rec_topic" value="1013"><label for="DBFT_rec_topic">小组话题</label></li><li><input type="checkbox" id="DBFT_rec_url" name="rec_url" value="1022"><label for="DBFT_rec_url">推荐网址</label></li><li><input type="checkbox" id="DBFT_rec_album" name="rec_album" value="1026"><label for="DBFT_rec_album">推荐相册</label><li><input type="checkbox" id="DBFT_follow" name="follow" value="1005"><label for="DBFT_follow">谁关注谁</label></li><li><input type="checkbox" id="DBFT_site" name="site" value="site"><label for="DBFT_site">小站内容</label></li><li><input type="checkbox" id="DBFT_siteroom" name="siteroom" value="2011"><label for="DBFT_siteroom">小站房间</label></li><li><input type="checkbox" id="DBFT_rec_single" name="rec_single" value="3043"><label for="DBFT_rec_single">推荐FM单曲</label></li><li><input type="checkbox" id="DBFT_rec_song" name="rec_song" value="2005"><label for="DBFT_rec_song">推荐音乐人歌曲</label></li><li><input type="checkbox" id="DBFT_change_info" name="change_info" value="0"><label for="DBFT_change_info">更改签名</label></li><li><input type="checkbox" id="DBFT_app" name="app" value="app"><label for="DBFT_app">移动应用</label></li><li><input type="checkbox" id="DBFT_post_event" name="post_event" value="1011"><label for="DBFT_post_event">发起活动</label></li><li><input type="checkbox" id="DBFT_join_event" name="join_event" value="2001"><label for="DBFT_join_event">参加活动</label></li><li><input type="checkbox" id="DBFT_read_ark" name="read_ark" value="5006"><label for="DBFT_read_ark">阅读-批注</label></li><li><input type="checkbox" id="DBFT_read_ark_2" name="read_ark_2" value="2014"><label for="DBFT_read_ark_2">阅读-读过</label></li><li><input type="checkbox" id="DBFT_read_ark_3" name="read_ark_3" value="2015"><label for="DBFT_read_ark_3">阅读-试读</label></li><li><input type="checkbox" id="DBFT_read_ark_3_2" name="read_ark_3_2" value="5014"><label for="DBFT_read_ark_3_2">阅读-购买</label></li><li><input type="checkbox" id="DBFT_read_ark_3_3" name="read_ark_3_3" value="5021"><label for="DBFT_read_ark_3_3">阅读-分享段落</label></li><li><input type="checkbox" id="DBFT_read_ark_3_4" name="read_ark_3_4" value="5022"><label for="DBFT_read_ark_3_4">推荐作品</label></li><li><input type="checkbox" id="DBFT_read_ark_3_5" name="read_ark_3_5" value="5015"><label for="DBFT_read_ark_3_5">订阅专栏</label></li><li><input type="checkbox" id="DBFT_rec_readbook" name="rec_readbook" value="4002"><label for="DBFT_rec_readbook">推荐阅读作品</label></li><li><input type="checkbox" id="DBFT_booknote" name="booknote" value="3049"><label for="DBFT_booknote">读书笔记</label></li><li><input type="checkbox" id="DBFT_join_group" name="join_group" value="1019"><label for="DBFT_join_group">加入小组</label></li><li><input type="checkbox" id="DBFT_follow_site" name="follow_site" value="2012"><label for="DBFT_follow_site">关注小站</label></li><li><input type="checkbox" id="DBFT_rec_trailer" name="rec_trailer" value="1047"><label for="DBFT_rec_trailer">推荐预告片</label></li><li><input type="checkbox" id="DBFT_rec_review" name="rec_review" value="1012"><label for="DBFT_rec_review">推荐书影音剧评</label></li><li><input type="checkbox" id="DBFT_rec_fmcid" name="rec_fmcid" value="3072"><label for="DBFT_rec_fmcid">推荐FM兆赫</label></li><li><input type="checkbox" id="DBFT_rec_things" name="rec_things" value="3065"><label for="DBFT_rec_things">推荐东西</label></li><li><input type="checkbox" id="DBFT_rec_musician" name="rec_musician" value="1044"><label for="DBFT_rec_musician">推荐音乐艺术家</label></li><li><input type="checkbox" id="DBFT_rec_jiudian" name="rec_jiudian" value="1021"><label for="DBFT_rec_jiudian">推荐9点文章</label></li><li><input type="checkbox" id="DBFT_rec_read_p" name="rec_read_p" value="4001"><label for="DBFT_rec_read_p">推荐阅读段落</label></li><li><input type="checkbox" id="DBFT_drama" name="drama" value="3069"><label for="DBFT_drama">话剧</label></li><li><input type="checkbox" id="DBFT_event_dis" name="event_dis" value="1014"><label for="DBFT_event_dis">推荐活动讨论</label></li><li><input type="checkbox" id="DBFT_thing_experience" name="thing_experience" value="3092"><label for="DBFT_thing_experience">事情-故事</label></li><li><input type="checkbox" id="DBFT_things" name="things" value="3096"><label for="DBFT_things">事情-做过/想做</label></li></ul></div></div></div>');

3096
var toggleBlock = function(e){
    e.preventDefault();
    var x = $('#dreamer-block').position().top + 20;
    var y = $('#dreamer-block').position().left - 52;
    // $('#dreamer-options').css('top', x);
    // $('#dreamer-options').css('left', y);
    $('#dreamer-block').toggleClass('dreamer-block-on');
    $('#dreamer-options').toggleClass('hidden');
}

$('#dreamer-block').click(toggleBlock);

$(document).mouseup(function(e){
    if ($(e.target).parents('.dreamer-filter').length == 0 && $('#dreamer-block').hasClass('dreamer-block-on')){
        toggleBlock(e);
    }
});

$("#dreamer-options input[type='checkbox']").click(function(e){
    var name = $(e.target).attr('name');
    var value = $(e.target).attr('value');
    if ($(e.target).attr('checked')){

        $(".stream-items .status-item").each(function(index){
            var t = $(this),
                c = t.next('.combined-statuses');
            if ( t.attr("data-object-kind") == value || t.attr("data-target-type") == value){
                 slide(t,c)
            }

            // var site = $(this).find('.usr-pic a'),
            //     notSite = site.size() >= 1;
            // if(notSite){
            //     if(site.attr('href').indexOf(value) !== -1){
            //          $(this).slideUp(300);
            //          $(this).next('.combined-statuses').hide();
            //     }
            // }
        });
  
        GM_setValue(name, true);

    } else {

        $(".stream-items .status-item").each(function(index){
            var t = $(this),
                c = t.next('.combined-statuses');
            if ( t.attr("data-object-kind") == value || t.attr("data-target-type") == value){
                shooow(t,c);
            }

            // var site = $(this).find('.usr-pic a'),
            //     notSite = site.size() >= 1;
            // if(notSite){
            //     if(site.attr('href').indexOf(value) !== -1){
            //          $(this).slideUp(300);
            //          $(this).next('.combined-statuses').hide();
            //     }
            // }
        });

        GM_setValue(name, false);
    }
});

$("#dreamer-options input[type='checkbox']").each(function(index){
    var name = $(this).attr('name');
    var checked = GM_getValue(name, false);

    if (checked){
        $(this).attr('checked', true);

        var value = $(this).attr('value');

        $(".stream-items .status-item").each(function(index){
            var t = $(this),
                // site = t.find('.usr-pic a'),
                // notSite = site.size() >= 1,
                c = t.next('.combined-statuses');

            if ( t.attr("data-object-kind") == value || t.attr("data-target-type") == value){
                hiddddden(t,c)
            }

            // if(notSite){
            //     if(site.attr('href').indexOf(value) == true){
            //         slide(t,c)
            //     }
            // }
        });

    }
});

function slide(t,c){
    t.slideUp(300);
    c.hide();
}
function hiddddden(t,c){
    c.hide();
    t.hide();
}

function shooow(t,c){
    t.fadeIn(0);
    c.show(0);
}
// var NewDoubanFilter = {name: 'New Douban filter',id: '123571',version: '0.11.1'};
// typeof(Updater)!= 'undefined' && new Updater(NewDoubanFilter).check();//自动更新

