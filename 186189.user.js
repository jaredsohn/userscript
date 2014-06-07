// ==UserScript==
// @name           Last.fm Musical Compatibility in Percents [Hans]
// @namespace      http://han.sx 
// @author         Hans
// @version        1.3.5
// @include        http://www.last.fm/user/*
// @match          http://www.last.fm/user/*
// @run-at         document-end
// @grant          GM_xmlhttpRequest 
// @icon           http://han.sx/x/lastfm.compatibility/stable/icon.png
// @description    Shows the percentage of your musical compatibility with any user next to the visual bar.
// @require        http://code.jquery.com/jquery-latest.min.js
// @downloadURL    http://han.sx/x/lastfm.compatibility/stable/init.user.js
// ==/UserScript==
$(document).ready(function(){
    if( document.URL !== 'http://www.last.fm' + $('.user-badge').attr('href')){
        var name = document.URL;
        var name_arr = name.split('/user/');
        name = name_arr[1];
        
        var me = $(".user-badge").attr('href');
        var me_arr = me.split('/user/');
        me = me_arr[1];
        
        req_url = 'http://han.sx/lastfm/compability/bot.php?name='+name+'&me='+me;
        GM_xmlhttpRequest({
            method: "GET",
            url: req_url,
            onload: function(data) {
                console.log(data);
                var c = (data.responseText * 100).toFixed(3);
                if(c > 0){
                    
                    $(".reading").append(" - " + c + "%");
                    
                    console.log('added percentage');
                    
                }else{
                    
                    $(".reading").append("- No percentage found");
                }
            }
        });
    }else{
        console.log('Skipped');
    }
});