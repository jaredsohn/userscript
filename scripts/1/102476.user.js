// ==UserScript==
// @name            facebookWallHideTwitter
// @namespace       http://www.motionbros.com/
// @description     hide twitter comment on facebook wall
// @include         http://www.facebook.com/*
// @version         0.1
// ==/UserScript==
//
// @userscriptorg   http://userscripts.org/scripts/show/102476

(function() {
    function fetch() {
        var li_list ;
        if( document.getElementById("home_stream") != null ){
            li_list = document.getElementById("home_stream").getElementsByTagName("li") ;
        }
        else if( document.getElementById("profile_minifeed") != null ){
            li_list = document.getElementById("profile_minifeed").getElementsByTagName("li") ;
        }
        else{
            return ;
        }

        for ( var i = 0 ; i < li_list.length ; i ++ ){
            if( li_list[i].className.search(/uiStreamStory/) === -1 ){
                continue ;
            }
            var sourceapp   = getSourceApp( li_list[i] ) ;
            // GM_log( 'app is ' + sourceapp ) ;
            if( sourceapp === 'Twitter' ){
                if( li_list[i].style.display === 'none' ){
                    continue ;
                }
                if( ! hasComment( li_list[i] ) ){
                    li_list[i].style.display = 'none' ;
                    continue ;
                }
            }
        }
    }
    
    // get source apprication name
    function getSourceApp(li) {
        var span_list = li.getElementsByTagName('span') ;
        for( var j = 0 ; j < span_list.length ; j ++ ){
            if( span_list[j].className === 'uiStreamSource' ){
                var a_list = span_list[j].getElementsByTagName('a') ;
                if( ! a_list || a_list.length <= 1 ){
                    continue ;
                }
                return a_list[1].innerHTML ;
            }
        }
        return ;
    }
    
    // return true when this comment has Comment or Like
    function hasComment(li) {
        var li_list = li.getElementsByTagName('li') ;
        for( var i = 0 ; i < li_list.length ; i ++ ){
            // has Like
            if( li_list[i].className.search(/uiUfiLike/) !== -1 ){
                //GM_log(li_list[i].innerHTML) ;
                if( li_list[i].innerHTML !== '' ){
                    return true ;
                }
            }
            // has Comment
            if( li_list[i].className.search(/uiUfiComment/) !== -1 ){
                //GM_log(li_list[i].innerHTML) ;
                if( li_list[i].innerHTML !== '<ul class="commentList"></ul>' ){
                    return true ;
                }
            }
        }
        return false ;
    }

    fetch() ;
    setInterval(fetch,10000);
})();
