// ==UserScript==
// @name        TieBaHDAvatar
// @author      有一份田,Sonico俺の嫁
// @description 可以查看贴吧高清头像用户的高清头像
// @namespace   http://userscripts.org/scripts/show/185730
// @updateURL   https://userscripts.org/scripts/source/185730.meta.js
// @downloadURL https://userscripts.org/scripts/source/185730.user.js
// @icon        http://img.duoluohua.com/appimg/script_tiebahdavatar_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        09/12/2013
// @modified    10/12/2013
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com/home/*
// @grant       none
// @run-at      document-end
// @version     1.0.3
// ==/UserScript==



/*
 * === 说明 ===
 *@作者:有一份田,Sonico俺の嫁
 *@官网:http://www.duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *
 *
 * */



var VERSION='1.0.3';
var APPNAME='TieBaHDAvatar';
(function(){
    var portraitCache={};
    $('body').bind('DOMNodeInserted',function(e){
        var o=$(e.target).find('.interaction_wrap');
        if(o.length){
            createEleBtn(o);
        }
    });
    function createEleBtn(o){
        $('<a href="javascript:;">').css({"background-position":"-255px -52px","padding-left":"11px"}).click(function(){
            var uname=o.parents('.ui_card_content').find('a.userinfo_username').html();
            showHighAvatar(uname);
        }).html('\u9ad8\u6e05\u5934\u50cf').prependTo(o);
    }
    function showHighAvatar(uname){
        var url='http://tieba.baidu.com/home/get/panel?ie=utf-8&un='+encodeURIComponent(uname),
        hdImgUrl='http://himg.baidu.com/sys/portraitl/item/',httpHwnd=null,
        modal= new $.modal({show: true}),box=$('<div/>').css({
            "left":"50%",
            "top":"50%",
            "position":"fixed",
            "min-height":"240px",
            "min-width":"240px",
            "z-index":$.getzIndex()
        }).appendTo("body"),
        dialogClose=function(){
            if(httpHwnd){httpHwnd.abort();}
            modal.remove();
            box.remove();
        },
        loadingImg=$('<img src="http://tieba.baidu.com/tb/img/loading.gif"/>').css({
            "height":"32px",
            "width":"32px",
            "margin-left":"-16px",
            "margin-top":"-16px"
        }).appendTo(box),
        loadImg=function(portrait){
            var imgurl=hdImgUrl+portrait,img = new Image();
            img.src = imgurl;
            img.onload=function(){
                var h=img.height,w=img.width;
                loadingImg.remove();
                $(img).css({
                    "height":h+"px",
                    "width":w+"px",
                    "margin-left":"-"+w/2+"px",
                    "margin-top":"-"+h/2+"px",
                    "border-radius":"3px",
                    "box-shadow":"0 0 15px rgba(127, 173, 220, 0.8), 0 0 15px #7FADDC inset",                    
                    "cursor":"url(\"http://static.tieba.baidu.com/tb/img/frs/cur_zout.cur\"), pointer"
                }).attr('title',uname).appendTo(box);
            }
        };
        if(portraitCache[uname]){
            loadImg(portraitCache[uname]);
        }else{
            httpHwnd=$.get(url,function(o){
                var portrait=o.data.portrait_h;
                portraitCache[uname]=portrait;
                loadImg(portrait);
            });
        }
        box.click(dialogClose);
        modal.element.click(dialogClose);   
    }
})();


