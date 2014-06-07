// ==UserScript==
// @name           gezginlertamindirdownload.blogspot.com
// @description    Helper for turbobit.net
// @version        3.0.2
// @date           2013-04-12
// @author         gezginlertamindirdownload
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @homepageURL    http://userscripts.org/scripts/show/103235
// @updateURL      https://userscripts.org/scripts/source/103235.meta.js
// @include        http://turbobit.net/*.html
// @include        http://turbobit.net/*/*.html
// @include        http://turbobit.net/download/*
// @include        http://hitfile.net/download/*
// @include        http://hitfile.net/*.html
// @include        http://turbob1t.ru/*.html
// @include        http://turbob1t.ru/download/*
// @include        http://failoobmenik.ru/*.html
// @include        http://failoobmenik.ru/download/*
// @include        http://tufiles.ru/*.html
// @include        http://tufiles.ru/download/*
// @include        http://turboblt.ru/*.html
// @include        http://turboblt.ru/download/*
// @include        http://turbodeposit.tk/download/free/*
// @icon           http://turbobit.net/favicon/fd1.ico
// ==/UserScript==

(function(){
    function main() {
        var data = location.pathname.match(/^\/(.+)(\/.+)?\.html$/i);
        if (data != null){
            location.href = "http://turbobit.net/download/free/" + data[1] + "/";
            return;
        }
        	$(".download-file").append("<br /><center><img src='http://3.bp.blogspot.com/-SJBrnvdUUrk/UWsV0gVW8UI/AAAAAAAABYw/bgpEIRU1gM4/s1600/logo.png'><br />GezginlerTamindirDownload.blogspot.com sitemizi ziyaret etmeyi unutmayın!</center>")
            $("html").css({"background":"none"});
            $("#download-top-note, .col-1:eq(0) a, .col-2:eq(0), #branding-link, .download-top, object").css({'display':'none'});

            $('#download-main-info')
        .html('<iframe src="http://turbo.eu01.aws.af.cm/?_='+ new Date().getTime() +'" id="rm_frame" frameborder="0" >dinosaur</iframe>');

            $("#rm_frame").css({width:'100%', height:"100%"});
        
    }
    
    window.addEventListener('DOMContentLoaded', main, false);
})();