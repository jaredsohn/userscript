// ==UserScript==
// @name            twitterViewMovie
// @namespace       http://www.motionbros.com/
// @description     view movie on Twitter
// @include         http://twitter.com/*
// @include         https://twitter.com/*
// @version         0.4.1
// ==/UserScript==
// 
// @userscriptorg   http://userscripts.org/scripts/show/81662

(function() {
    var sourceurl   = 'http://userscripts.org/scripts/source/81662.user.js' ;
    var scriptname  = 'twitterViewMovie' ;
    GM_registerMenuCommand( scriptname + ' re-install', reinstall ) ;
    function reinstall() {
        if( confirm('do you reinstall ' + scriptname + ' ?') == true ){
            window.location.href = sourceurl ;
        }
    }

    var SITEINFO = [
        {
            regexp: /^http:\/\/.*youtube\.com\/watch\?v\=([^&]+).*$/,
            method: "youtube",
        },
        {
            regexp: /^http:\/\/youtu\.be\/(.+)$/,
            method: "youtube",
        },
        {
            regexp: /^http:\/\/vimeo.com\/(.+)$/,
            method: "vimeo",
        },
        {
            //  http://yfrog.us/2mpj4z >  http://yfrog.us/2mpj4z:iphone
            regexp: /^(http:\/\/yfrog\.us\/.*)$/,
            method: "fromResponseEmbed",
        },
    ] ;
        
    function fetch() {
        var as ;
        if( document.getElementById("timeline") != null ){
            // for TimeLine
            as = document.getElementById("timeline").getElementsByTagName("a") ;
        }else if( document.getElementById("permalink") != null ){
            // for Status
            as = document.getElementById("permalink").getElementsByTagName("a") ;
        }else{
            return ;
        }
        
        for ( var i = 0 ; i < as.length ; i ++ ){
            if( as[i].parentNode.className !== "entry-content" ){
                continue ;
            }
            decodeUrl( as[i] ) ;
            for( var j = 0 ; j < SITEINFO.length ; j ++ ){
                if( as[i].href.search(SITEINFO[j].regexp) === 0 ){
                    if( SITEINFO[j].method === "youtube" ){
                        appendMovieYoutube( as[i], SITEINFO[j].regexp ) ;
                    }
                    if( SITEINFO[j].method === "vimeo" ){
                        appendMovieVimeo( as[i], SITEINFO[j].regexp ) ;
                    }
                    if( SITEINFO[j].method === "fromResponseEmbed" ){
                        appendFromResponseEmbed( as[i] ) ;
                    }
                    break ;
                }
            }
        }
    }

    function decodeUrl(a) {
        if( a.host == "bit.ly" || a.host == "j.mp" ){
            var bitlyid = "twitterviewimage" ;
            var apikey  = "R_0f0ae80a45290a65b82d99dfd704088c" ;
            var url     = "http://api.bit.ly/v3/expand?shortUrl=" + a.href
                          + "&login=" + bitlyid
                          + "&apiKey=" + apikey
                          + "&format=txt" ;
            //GM_log(url) ;
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(resp) {
                    //GM_log(resp.responseText) ;
                    a.href = resp.responseText ;
                },
            });
        }
    }
    
    function appendFromResponseEmbed(a) {
        if( wasFetched(a) ){
            return ;
        }
        GM_xmlhttpRequest({
            method: "GET",
            url: a.href ,
            onload: function(resp) {
                // GM_log(resp.responseText) ;
                var tempdiv = document.createElement("div") ;
                tempdiv.innerHTML = resp.responseText ;
                var embed = tempdiv.getElementsByTagName("embed") ;
                var div = document.createElement("div") ;
                div.id  = a.href;
                if( embed[0].width ){
                    embed[0].height = embed[0].height * 440 / embed[0].width ;
                    embed[0].width  = 440 ;
                }
                // for Yflog
                embed[0].src    = embed[0].src.replace( /autostart=true/, 'autostart=false' ) ;
                GM_log(embed[0].src) ;
                div.appendChild(embed[0]) ;
                a.parentNode.appendChild(div) ;
            },
        });
    }
    
    function appendMovieYoutube(a, regexp) {
        if( wasFetched(a) ){
            return ;
        }
        var id = a.href.replace(regexp, "$1") ;
        GM_log( id ) ;
        var value   = "http://www.youtube.com/v/" + id + "&amp;hl=en_US&amp;fs=1" ;
/*
    <object width="440" height="272">
    <param name="movie" value="http://www.youtube.com/v/kw_oWwuhPYk&amp;hl=en_US&amp;fs=1"></param>
    <param name="allowFullScreen" value="true"></param>
    <param name="allowscriptaccess" value="always"></param>
    <embed src="http://www.youtube.com/v/kw_oWwuhPYk&amp;hl=en_US&amp;fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="440" height="272">
    </embed>
    </object>
*/

        var div = document.createElement("div") ;
        div.id  = a.href;
        var object  = document.createElement("object") ;
        object.width    = 440 ;
        object.height   = 272 ;
        var param1  = document.createElement("param") ;
        param1.name     ="movie" ;
        param1.value    =value ;
        var param2  = document.createElement("param") ;
        param2.name     ="allowFullScreen" ;
        param2.value    ="true" ;
        var param3  = document.createElement("param") ;
        param3.name     ="allowscriptaccess" ;
        param3.value    ="always" ;
        var embed   = document.createElement("embed") ;
        embed.src       =value ;
        embed.type      ="application/x-shockwave-flash" ;
        embed.allowscriptaccess ="always" ;
        embed.allowfullscreen   ="true" ;
        embed.width     = 440 ;
        embed.height    = 272 ;
        object.appendChild(param1) ;
        object.appendChild(param2) ;
        object.appendChild(param3) ;
        object.appendChild(embed) ;
        div.appendChild(object) ;
        a.parentNode.appendChild(div) ;
    }

    function appendMovieVimeo(a, regexp) {
        if( wasFetched(a) ){
            return ;
        }
/*
<iframe src="http://player.vimeo.com/video/14844291" width="400" height="225" frameborder="0">
</iframe>
*/

        var src = "http://player.vimeo.com/video/" + a.href.replace(regexp, "$1") ;
        GM_log(src) ;
        var div = document.createElement("div") ;
        div.id  = a.href;
        var iframe  = document.createElement("iframe") ;
        iframe.src      = src ;
        iframe.width    = 440 ;
        iframe.height   = 248 ;
        iframe.frameborder  = 0 ;
        div.appendChild(iframe) ;
        a.parentNode.appendChild(div) ;
    }

    function wasFetched(a) {
        var divs = a.parentNode.getElementsByTagName("div") ;
        for( var i = 0 ; i < divs.length ; i ++ ){
            if( divs[i].id === a.href ){
                return true ;
            }
        }
        return false ;
    }
    
    fetch() ;
    setInterval(fetch,5000);
})() ;
