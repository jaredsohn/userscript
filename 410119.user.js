// ==UserScript==
// @name       Inoreader FB Share Count
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.0
// @description  enter something useful
// @match      http://userscripts.org/scripts/review/172421
// @copyright  2012+, You
// @include        http://www.inoreader.com/*
// @require http://code.jquery.com/jquery-latest.js
// @grant GM_openInTab
// ==/UserScript==


//Config
var key = 66; // 'b' key
var jkey = 74;
var kkey = 75;


(function() {    

    
    var onJUp = function(event) {
        
            
        if((event.keyCode == jkey && !event.shiftKey) || (event.keyCode == kkey && !event.shiftKey )) {
            //var news = document.getElementsByClassName("article_title_link bluelink");
            var news = document.getElementsByClassName("article_title");
            //alert (news.length);
            var links = news[0].getElementsByTagName('a');
            //alert(links[0].innerHTML);
            jQuery.getJSON('http://graph.facebook.com/?id='+links[0],function(data) {
               links[0].innerHTML = links[0].innerHTML +' || '+(data.shares || 0)+' Shares';
                
            });
            
        };
    };
    
    document.addEventListener('keyup', onJUp, false);
    
    
    
    
    
    
    
})();
