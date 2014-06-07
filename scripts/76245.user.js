// --------------------------------------------------------------------------------
// Copyright (C) 2010  Cui Mingda [ https://cuimingda.net ]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Renren Shortcuts
// @namespace       http://cuimingda.net
// @description     shortcuts for renren.com
// @include         http://guide.renren.com/guidexf.do
// @include         http://www.renren.com/Home.do
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
//
// This is a Greasemonkey 0.8 script, you need to install Firefox (http://www.mozilla.com/firefox/)
// and Greasemonkey (https://addons.mozilla.org/firefox/addon/748) first, and then
// reinstall this script.
// --------------------------------------------------------------------------------

(function() {

    var 
    
    homepage = location.href,
    
    scrollTop = function() {
        $('html').animate({'scrollTop':0}, 'slow');
    },
    
    readLastFeed = function() {
        lastLink = $('#feedHome li:first').find('a[href*=getphoto\.do]:first');
        if(lastLink.length === 1) {
            window.open(lastLink.attr('href'));
        }
    },
    
    tagLastFeed = function() {
        $('#feedHome li').find('a[href*=getphoto\.do] img:first').css({
            "border" : "5px solid red"
        });
    },
    
    removeLastFeed = function() {
        lastFeed = $('#feedHome li:first').attr("id");
        if(lastFeed) {
            location.href = "javascript:readHomeFeed('" + lastFeed.replace("feed", "") + "');";
        }
        else {
            location.href = homepage;
            location.reload(true);
        }
    }; // end of removeLastFeed
    
    $(function() {
        tagLastFeed();
    });

    $(window).keypress(function(ev) {
        switch(ev.keyCode) {
        
            // key page down
            case 34:
                ev.preventDefault();
                scrollTop();
                removeLastFeed();
                tagLastFeed();
                break;
                
            // key page up
            case 33:
                readLastFeed();
                break;
                
            default:
                // no nothing
                break;
                
        } // end of switch ev.keyCode
        
    }); // end of $(window).keypress
    
})();