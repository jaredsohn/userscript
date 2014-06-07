// ==UserScript==
// @name       AOL Reader Open in Background
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.0
// @description  enter something useful
// @match      http://userscripts.org/scripts/review/172421
// @copyright  2012+, You
// @include        http://reader.aol.com/*
// @require http://code.jquery.com/jquery-latest.js
// @grant GM_openInTab
// ==/UserScript==


//Config
var key = 66; // 'b' key
var jkey = 74;
var kkey = 75;


(function() {    
    var onKeyDown = function(event) {
        // push "b" key
        if(event.keyCode == key && !event.shiftKey) {
            var news = document.getElementsByClassName("article-title");
            //alert (news.length);
            var links = news[0].getElementsByTagName('a');
            //alert(links[0]);
            
            var evt = document.createEvent("MouseEvents");
            //the tenth parameter of initMouseEvent sets ctrl key
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
            links[0].dispatchEvent(evt);
        }
    };
    
    var onJUp = function(event) {
        
        if((event.keyCode == jkey && !event.shiftKey) || (event.keyCode == kkey && !event.shiftKey )) {
            var news = document.getElementsByClassName("article-title");
            //alert (news.length);
            var links = news[0].getElementsByTagName('a');
            //alert(links[0].innerHTML);
            jQuery.getJSON('http://graph.facebook.com/?id='+links[0],function(data) {
               links[0].innerHTML = links[0].innerHTML +' || '+(data.shares || 0)+' Shares';
                
            });
            
        };
    };
    
    
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onJUp, false);
    
    
    
    
    
    
    
})();
