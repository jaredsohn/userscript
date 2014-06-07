// ==UserScript==
// @name            twitterViewConversation
// @namespace       http://www.motionbros.com/
// @description     view conversation on Twitter
// @include         http://twitter.com/*
// @include         https://twitter.com/*
// @version         0.2.2
// ==/UserScript==

(function() {
    var mode ;

    function fetch() {
        var as ;
        if( document.getElementById("timeline") != null ){
            // for TimeLine
            as = document.getElementById("timeline").getElementsByTagName("a") ;
            mode = "timeline" ;
        }else if( document.getElementById("permalink") != null ){
            // for Status
            as = document.getElementById("permalink").getElementsByTagName("a") ;
            mode = "status" ;
        }else{
            return ;
        }
        
        // var as = document.getElementById("timeline").getElementsByTagName("a") ;
        for ( var i = 0 ; i < as.length ; i ++ ){
            if( as[i].text.search( /^in reply to / ) == 0 ){
                fetchConversationTweet( as[i] ) ;
            }
        }
    }

    function fetchConversationTweet(a) {
        GM_xmlhttpRequest({
            method: "GET",
            url: a.href,
            onload: function(resp) {
                //GM_log(resp.responseText) ;
                var div     = document.createElement("div") ;
                div.innerHTML = resp.responseText ;
                var status  = a.href.substr( a.href.lastIndexOf("/")+1 ) ;
                var tweet ;
                if( mode === "timeline" ){
                    tweet  = document.createElement("li") ;
                }else if( mode === "status" ){
                    tweet  = document.createElement("div") ;
                }   
                var margin  = 26 ;
                var imgoffset = 14 ;
                var body    = document.createElement("span") ;
                body.className = "status-body" ;
                body.style.marginLeft = (56 - imgoffset) + "px" ;
                body.style.width      = (425 - margin) + "px" ;
                var content = document.createElement("span") ; 
                content.className = "status-content" ;
                var actions = document.createElement("span") ;
                var entry   = document.createElement("span") ;
                var meta    = document.createElement("span") ;
                var hover   = document.createElement("ul") ;
                var clear   = document.createElement("ul") ;
                clear.className = "meta-data clearfix" ;
                
                var divs    = div.getElementsByTagName("div") ;
                for( var i = 0 ; i < divs.length ; i ++ ){
                    if( divs[i].id === "status_" + status ){
                        var spans   = divs[i].getElementsByTagName("span") ;
                        for( var j = 0 ; j < spans.length ; j ++ ){
                            if( spans[j].className === "actions" ){
                                actions = spans[j] ;
                            }else if( spans[j].className === "entry-content" ){
                                entry   = spans[j] ;
                                entry.style.color   = "#666" ;
                                if( mode === "status" ){
                                    entry.style.fontSize = "14px" ;
                                }
                            }else if( spans[j].className === "meta entry-meta" ){
                                meta    = spans[j] ;
                            }
                        }
                        var uls     = divs[i].getElementsByTagName("ul") ;
                        for( var j = 0 ; j < uls.length ; j ++ ){
                            if( uls[j].className === "actions-hover" ){
                                hover   = uls[j] ;
                                break ;
                            }
                        }
                        tweet.className = divs[i].className ;
                        tweet.id        = divs[i].id ;
                        tweet.style.marginLeft  = margin + 'px' ;
                        break ;
                    }
                }
                var thumb   = document.createElement("span") ;
                thumb.className = "thumb vcard author" ;
                if( mode === "status" ){
                    thumb.style.width = "50px" ;
                    thumb.style.position = "absolute" ;
                }
                var name    = document.createElement("strong") ;
                var as      = div.getElementsByTagName("a") ;
                for( var i = 0 ; i < as.length ; i ++ ){
                    if( as[i].className === "tweet-url profile-pic" ){
                        as[i].lastChild.style.width  = (50 - imgoffset) + "px" ;
                        as[i].lastChild.style.height = (50 - imgoffset) + "px" ;
                        thumb.appendChild(as[i]) ;
                        tweet.appendChild(thumb) ;
                    }
                    if( as[i].className === "tweet-url screen-name" ){
                        if( mode === "status" ){
                            as[i].className = "tweet-url user-name" ;
                        }
                        name.appendChild(as[i]) ;
                        entry.innerHTML = "<strong>" + name.innerHTML + "</strong> " + entry.innerHTML ;
                        content.appendChild(actions) ;
                        content.appendChild(entry) ;
                        body.appendChild(content) ;
                        body.appendChild(meta) ;
                        body.appendChild(hover) ;
                        body.appendChild(clear) ;
                        tweet.appendChild(body) ;
                    }
                }
                var reply = a.parentNode.parentNode.parentNode ;
                reply.parentNode.insertBefore(tweet, reply.nextSibling) ;
                a.parentNode.removeChild(a) ;
            },
        });
    }

    fetch() ;
    setInterval(fetch,5000);
})();

