// ==UserScript==
// @name       Nayuki's CnBeta #自古CB出评论 sharing plugin 
// @namespace  http://nayuki.info/
// @version    1.510
// @description  使用twitter和新浪微博分享CB新闻的评论，格式：评论 —— 《新闻标题》#自古CB出评论
// @match      http://*.cnbeta.com/*
// @copyright  2012-2013, Moe Nayuki
// ==/UserScript==

var w;

if ( typeof( Browser ) == "undefined" ) {

    var userAgent = navigator.userAgent.toLowerCase();
    var Browser = {
            version : ( userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,"0"] )[1],
            msie : /msie/.test( userAgent ) && !/opera/.test( userAgent ),
            firefox : /firefox/.test( userAgent ),
            chrome : /chrome/.test( userAgent ) && /mozilla/.test( userAgent ),
            opera : /opera/.test( userAgent ),
            safari : /webkit/.test( userAgent ) && !( /chrome/.test( userAgent ) )
    }

}

if ( Browser.chrome || typeof unsafeWindow == "undefined" ) {

    var div = document.createElement( "div" );

    div.setAttribute( "onclick", "return window;" );
    w = div.onclick();

} else {
    w= unsafeWindow;
}

// Add jQuery
(function(){

    var $;

    if ( typeof jQuery != "undefined" ) {
        $ = jQuery;
    } else if ( typeof w.jQuery != "undefined" ) {
        $ = w.jQuery;
    }

    if ( $ ) {
        main( $ );
    } else {

        var GM_Head = document.getElementsByTagName( "head" )[0] || document.documentElement,
            GM_JQ = document.createElement( "script" );
        
        GM_JQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
        GM_JQ.type = "text/javascript";
        GM_JQ.async = true;

        GM_JQ.addEventListener( "load" , function() {
            var $ = w.jQuery.noConflict( true );
            main( $ );
        });
        
        GM_Head.insertBefore( GM_JQ, GM_Head.firstChild );
    }
})();

// All your GM code must be inside this function
// 以下为正文
// CB新闻的标题在#news_title里，评论在每一个dd.re_detail里
function main( $ ) {
    $( document ).ready(function() { 

        //当文档载入完毕时运行
        var url, comment, finale, oricomment, twitter_link, weibo_link;
        var raw_title = $( "h3#news_title" ).text();

        //简单正则 适用于标题只有一对书名号 待改进
        var reg = /《.*》/;
        var finale_title = raw_title.replace( reg, function( word ) {
            return word.substring( 0, 1 ).replace( /《/, "〈" ) + word.substring( 1 ).replace( /》/, "〉" );
        });

        $( "dd.re_detail" ).each(function() {

            comment = $(this).text(); //获取评论

            //微博分享scheme://host:port/path?query#fragment这样的链接需要去除#fragment部分,否则会没有tag
                        
            finale = comment + " ——《" + finale_title + "》 " + window.location.href.replace( window.location.hash, '' ) + " "; //拼合tweet正文的结果
            finale = $.trim( finale ); //除去原评论字段中多余的空格字符

            //要在此插入长度针对finale的判断模块
            finale = encodeURI( finale ); //编码

            weibo_link = '<a href="http://service.weibo.com/share/share.php?title=' + finale + escape( " #" ) + encodeURI( "自古CB出评论" ) + escape( "#" ) + '" class="weitag" target="_blank" title="以 #自古CB出评论# 发表">#微博</a><style>.weitag{padding:3px 5px 3px 5px;}a.weitag:link{color:red;font-weight:900;}a.weitag:hover{color:#707070;}a.weitag:visted{color:red;font-weight:900;}</style>'
            twitter_link = '    <a href="' + encodeURI( "https://twitter.com/intent/tweet?hashtags=自古CB出评论&text=" ) + finale + '" class="twitag" data-lang="zh-cn" data-related="bgm38" target="_blank" title="以 #自古CB出评论 发表">#推特</a><style>.twitag{padding:3px 5px 3px 5px;}a.twitag:link{color:blue;font-weight:900;}a.twitag:hover{color:#707070;}a.twitag:visted{background-color:blue;font-weight:900;}</style>';
            
            $(this).append( twitter_link ); //在评论的末尾附上最终结果
            $(this).append( weibo_link );

        });

    });
};