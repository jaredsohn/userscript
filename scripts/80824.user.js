// ==UserScript==
// @name            twitterViewImage
// @namespace       http://www.motionbros.com/
// @description     view image on Twitter
// @include         http://twitter.com/*
// @include         https://twitter.com/*
// @version         0.6.7
// ==/UserScript==
// 
// @userscriptorg   http://userscripts.org/scripts/show/80824

(function() {
    var sourceurl   = 'http://userscripts.org/scripts/source/80824.user.js' ;
    var scriptname  = 'twitterViewImage' ;
    GM_registerMenuCommand( scriptname + ' re-install', reinstall ) ;
    function reinstall() {
        if( confirm('do you reinstall ' + scriptname + ' ?') == true ){
            window.location.href = sourceurl ;
        }
    }
    
    var SITEINFO = [
        {
            // http://p.twipple.jp/t4neF > http://p.twipple.jp/data/t/4/n/e/F.jpg
            regexp: /^http:\/\/p\.twipple\.jp\/(.)(.)(.)(.)(.)$/,
            replace:"http://p.twipple.jp/data/$1/$2/$3/$4/$5.jpg",
        },
        {
            // http://twitpic.com/258vtp > http://twitpic.com/show/iphone/258vtp
            regexp: /^http:\/\/twitpic\.com\/(.*)$/,
            replace:"http://twitpic.com/show/iphone/$1",
        },
        {
            // http://brizzly.com/pic/30JI > http://brizzly.com/30JI.jpg
            regexp: /^http:\/\/brizzly\.com\/pic\/(.*$)/,
            replace:"http://pics.brizzly.com/$1.jpg",
        },
        {
            // http://yfrog.com/0fh5rvw4j > http://yfrog.com/0fh5rvw4j:iphone
            regexp: /^(http:\/\/yfrog\.com\/.*)$/,
            replace:"$1:iphone",
        },
        {
            // http://tweetphoto.com/0fh5rvw4j
            regexp: /^http:\/\/tweetphoto\.com\/.*$/,
            divid:  "photo",
        },
        {
            // http://rapeco.jp/
            regexp: /^http:\/\/rapeco\.jp\/.*$/,
            divclass: "yumImageBox shadow",
        },
        {
            // http://photozou.jp/photo/show/714502/43982689
            regexp: /^http:\/\/photozou\.jp\/photo\/.*$/,
            divid: "indivi_media",
        },
        {
            // http://plixi.com/p/43774016
            regexp: /^http:\/\/plixi\.com\/p\/.*$/,
            divid: "photo_box",
        },
        {
            // http://4sq.com/egoZym
            regexp: /^http:\/\/4sq\.com\/.*$/,
            divclass: "photo",
        },
        {
            // http://instagr.am/p/BwTiN/
            regexp: /^http:\/\/instagr\.am\/p\/.*$/,
            divclass: "stage-inner",
        },
        {
            // http://instagram.com/p/BwTiN/
            regexp: /^http:\/\/instagram\.com\/p\/.*$/,
            divclass: "stage-inner",
        },
        {
            // http://img.ly/xxxx
            regexp: /^http:\/\/img\.ly\/.*$/,
            divid: "image-box",
        },

    ] ;

    function fetch() {
        var a_list ;
        if( document.getElementById("timeline") != null ){
            // for TimeLine
            a_list = document.getElementById("timeline").getElementsByTagName("a") ;
        }else if( document.getElementById("permalink") != null ){
            // for Status
            a_list = document.getElementById("permalink").getElementsByTagName("a") ;
        }else{
            return ;
        }
        
        for ( var i = 0 ; i < a_list.length ; i ++ ){
            if( a_list[i].parentNode.className !== "entry-content" ){
                continue ;
            }
            decodeUrl( a_list[i] ) ;
            for( var j = 0 ; j < SITEINFO.length ; j ++ ){
                if( a_list[i].href.search(SITEINFO[j].regexp) === 0 ){
                    if( SITEINFO[j].replace ){
                        appendImageRegexp( a_list[i], SITEINFO[j].regexp, SITEINFO[j].replace ) ;
                    }
                    else if( SITEINFO[j].divid ){
                        appendImageFromResponse( a_list[i], "div", "id", SITEINFO[j].divid ) ;
                    }
                    else if( SITEINFO[j].divclass ){
                        appendImageFromResponse( a_list[i], "div", "class", SITEINFO[j].divclass ) ;
                    }
                    break ;
                }
            }
            if( a_list[i].href.search(/\.gif$/i) != -1
                || a_list[i].href.search(/\.jpe?g$/i) != -1
                || a_list[i].href.search(/\.png$/i) != -1 ){
                appendImage( a_list[i], a_list[i].href ) ;
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
    
    function wasFetched(a) {
        var imgs = a.parentNode.getElementsByTagName("img") ;
        for( var i = 0 ; i < imgs.length ; i ++ ){
            if( imgs[i].alt === a.href ){
                return true ;
            }
        }
        return false ;
    }
    
    function appendImage(a, image_url) {
        if( wasFetched(a) ){
            return ;
        }
        var img = document.createElement("img") ;
        img.src = image_url ;
        img.style.maxWidth = "440px" ;
        img.alt = a.href ;
        a.parentNode.appendChild(img) ;
    }
    
    function appendImageRegexp(a, from, to) {
        if( wasFetched(a) ){
            return ;
        }
        var image_url = a.href.replace(from, to) ;
        appendImage(a, image_url) ;
    }

    function appendImageFromResponse(a, tag, param, value) {
        if( wasFetched(a) ){
            return ;
        }
        GM_xmlhttpRequest({
            method: "GET",
            url: a.href,
            onload: function(resp) {
                //GM_log(resp.responseText) ;
                var div = document.createElement("div") ;
                div.innerHTML = resp.responseText ;
                var tags = div.getElementsByTagName(tag) ;
                for( var i = 0 ; i < tags.length ; i ++ ){
                    var checkv ;
                    if( param === "id" ){
                        checkv = tags[i].id ;
                    }else if( param === "class" ){
                        checkv = tags[i].className ;
                    }
                    if( checkv === value ){
                        //GM_log(tags[i].innerHTML) ;
                        var img = tags[i].getElementsByTagName("img")[0] ;
                        img.style.maxWidth = "440px" ;
                        img.alt = a.href ;
                        changeAbsolutePath(a.href, img) ;
                        //GM_log(img.src) ;
                        a.parentNode.appendChild(img) ;
                    }
                }
            },
        });
    }

    function changeAbsolutePath(href, img) {
        for( var i = 0 ; i < img.attributes.length ; i ++ ){
            if( img.attributes[i].name === 'src' ){
                if( img.attributes[i].value.indexOf('http') !== 0 ){
                    var baseuri = href.match(/^.*\//) ;
                    img.src = baseuri + img.attributes[i].value ;
                    return ;
                }
            }
        }
    }
    
    fetch() ;
    setInterval(fetch,5000);
})();

