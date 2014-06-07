// ==UserScript==
// @name           	ixaKeyBind
// @namespace      	http://www.motionbros.com
// @description     set key bind for sengoku ixa.
// @include        	http://*.sengokuixa.jp/message/*
// @version         0.1
// ==/UserScript==
// 
// @userscriptorg   http://userscripts.org/scripts/show/?????

(function(){
    //GM_log('start keybind') ;
    if( location.href.match(/inbox.php/) ){
        //GM_log('index') ;
        var tr_list = document.getElementsByTagName('tr') ;
        var a ;
        for( var i = 0 ; i < tr_list.length ; i ++ ){
            if( tr_list[i].className.match(/fs12/) ){
                a = (tr_list[i].getElementsByTagName('a'))[0] ;
                break ;
            }
        }
        if(a){
            document.addEventListener('keypress', function(e){
                if( e.which === 13 ){   // return key
                    location.replace(a.href)
                }
            }, true);
        } ;
    }
    else if( location.href.match(/detail.php/) ){
        //GM_log('detail') ;
        var div_list = document.getElementsByTagName('div') ;
        var div_footer ;
        for( var i = 0 ; i < div_list.length ; i ++ ){
            if( div_list[i].className.match(/message_footernavi/) ){
                div_footer = div_list[i] ;
                break ;
            }
        }
        var a_list = div_footer.getElementsByTagName('a') ;
        var prev ;
        var next ;
        for( var i = 0 ; i < a_list.length ; i ++ ){
            if( a_list[i].innerHTML.match(/&lt;/) ){
                prev = a_list[i] ;
            }
            if( a_list[i].innerHTML.match(/&gt;/) ){
                next = a_list[i] ;
            }
        }
        if(prev){
            document.addEventListener('keypress', function(e){
                if( String.fromCharCode(e.which) === 'j' ){
                    location.replace(prev.href) ;
                }
            }, true);
        }
        if(next){
            document.addEventListener('keypress', function(e){
                if( String.fromCharCode(e.which) === 'k' ){
                    location.replace(next.href) ;
                }
            }, true);
        }else{
            document.addEventListener('keypress', function(e){
                if( String.fromCharCode(e.which) === 'k' ){
                    var inbox = location.protocol + '//' + location.hostname + '/' + 'message/inbox.php' ;
                    location.replace(inbox) ;
                }
            }, true);
        }
    }
})() ;
