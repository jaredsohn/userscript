// ==UserScript==
// @name           Show your blocking user for Twitter
// @namespace      umezo.tsuyabu.in
// @include        http://twitter.com/
// ==/UserScript==

function addBlockList(){
    var navDiv = document.getElementById("primary_nav") ,
        li = document.createElement("li");
    li.innerHTML = '<a class="block-list-link" href=""><span>Blocked</span></a>'

    li.addEventListener( "click" , function ( event ){
        event.preventDefault();
        event.stopPropagation();
        init();
    },true);
    navDiv.appendChild( li );
}

function init(){
    var container = document.getElementById("timeline")
    var urlMap ={
        unblock : "http://twitter.com/blocks/destroy/",
        follow  : "http://twitter.com/friendships/create/" 
    };

    container.innerHTML = '<img src="https://twitter.com/images/spinner.gif">';
    container.addEventListener( "click" , function ( event ) {
        var target = event.target ;
        if( target.className == "GM_" ){
            event.preventDefault();
            event.stopPropagation();

            target.innerHTML = '<img src="https://twitter.com/images/spinner.gif">';
            GM_xmlhttpRequest({
                method : "POST" ,
                headers: { 'Content-type': 'application/x-www-form-urlencoded' } ,
                url    : urlMap[ target.getAttribute("cmd") ] + target.getAttribute("title") ,
                data   : (function( data ){
                    var text = [];
                    for( var i in data ){
                        text.push( i + "=" + encodeURIComponent( data[i] ) );
                    }

                    return text.join("&");
                })({
                    authenticity_token : document.getElementById("authenticity_token").value ,
                    twttr : "true" 
                }),
                onload : function ( resp ){
                    target.innerHTML = "end";
                }
            });
        }
    } , true );
    GM_xmlhttpRequest({
        method : "GET" ,
        url    : "https://twitter.com/blocks/blocking?format=json&page=2" ,
        onload : function ( json ){
            json = eval( "(" + json.responseText + ")" );
            json = json.users;

            start( json );
        }
    });
}


function start( list ){
    var html = "";
    for( var i = 0 , n = list.length ; i < n ; i++ ){
        var user = list[i];
        html += applyTemplate( user );        

    }

    document.getElementById("timeline").innerHTML = html ;

    GM_addStyle();
}


function applyTemplate( user ){
    return template.replace( /%s/g , (function( user ){
        var i = 0;
        var map = [ 
            "screen_name" ,
            "profile_image_url" ,
            "name" ,
            "screen_name" ,
            "screen_name" ,
            "name" ,
            "description" ,
            "screen_name" ,
            "following" ,
            "followers_count" ,
            "friends_count" ,
            "id" ,
            "id" ,
        ];


        return function(){
            return user[ map[i++] ] || "&nbsp;&nbsp;&nbsp;";
        };
    })( user ) );
}


    addBlockList();
//init();

var template ='\
        <li class="hentry status">\
            <span class="thumb vcard author">\
                <a class="tweet-url profile-pic url" href="http://twitter.com/%s">\
                    <img height="48" width="48" src="%s" class="photo fn" alt="%s">\
                </a>\
            </span>  \
            <span class="status-body">\
                <span class="status-content">\
                    <strong><a class="tweet-url screen-name" href="http://twitter.com/%s">%s</a> / %s</strong><br>\
<!--\
                    <span class="actions">\
                        <div>\
                            <a title="favorite this tweet" class="fav-action non-fav" >&nbsp;&nbsp;</a>\
                        </div>\
                    </span>\
-->\
                    <span class="entry-content">%s</span>\
                </span>\
                <span data="{}" class="meta entry-meta">\
                    <a href="http://twitter.com/%s" rel="bookmark" class="entry-date">\
                    <span data="" class="published timestamp">%s|%s|%s</span></a>\
                </span>\
                <ul class="actions-hover">\
                          <li>\
                              <span class="unblock">\
                              <span class="reply-icon icon"></span>\
                              <a class="GM_" cmd="unblock" title="%s" href="">unblock</a>\
                              </span>\
                          </li>\
\
                          <li>\
                              <span class="retweet-link">\
                              <span class="retweet-icon icon"></span>\
                              <a class="GM_" cmd="follow" href="#" title="%s">follow</a>\
                              </span>\
                          </li>\
\
                </ul>\
                <ul class="meta-data clearfix">\
\
                </ul>\
            </span>\
        </li>\
    ';
