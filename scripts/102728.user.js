// ==UserScript==
// @name           F.F.S.Coinfinder below the belt
// @namespace      FriendsForSale
// @description    CoinFinder
// @include        http://app.ffs.likagames.com/users/show/*
// Friends For Sale Coin Bot
// ==/UserScript==
// I've just edited some of the scripts and added it here. 
// Original post was from "morizuki" thanks for the script, 
// I just want to get higher cash so i edited your script. hahaha thanks again.
// ==/UserScript==
// Updated and improved by Slavik Meltser

// Add jQuery
    var $;
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    
// Check if jQuery's loaded

    function GM_wait()
    {
        if( typeof unsafeWindow != 'undefined' )
        {
            if (typeof unsafeWindow.jQuery != 'undefined')
            { 
                 $ = unsafeWindow.jQuery;
                 letsJQuery();
            }
            else
            {
                window.setTimeout(GM_wait,1000);
            }
        }
        else if (typeof jQuery != 'undefined')
        { 
            $ = jQuery;
            letsJQuery();
        }
        else
        {
            window.setTimeout(GM_wait,1000);
        }
    }
    GM_wait();
	
// All your GM code must be inside this function
    function letsJQuery()
    {
        var group = {'thousand':1000,'million':1000000};
        // Find out if the coin on the website.
        // Note that querySelectorAll is only available in Firefox 3.5 and above
        var coin = $("div[id^=the_coin] a:eq(1)");
        if (coin.length)
        {
            var matches = /([0-9]+)([a-z]+)/.exec($(coin.get(0)).text());
            
            var value = parseInt(matches[1]);
            if ( matches.length == 2 )
                value *= group[matches[2]];
            
            // 1 - 999k is a mock value, FFS use it to detect bots
            //But i want large cash so i'll just take the risk haha
            if (value > 0 && value < 200000) {
                window.location.reload();
            } 
            else 
            {
                // wait between 500 and 1500 microseconds before click on the coin (anti-bot detection) 
                setTimeout(Math.floor(Math.random()*1001)+500,function(){
                    window.location = coin.attr('href');
                });
            }
        } 
        else
        {
                window.location.reload();
        }
        window.setTimeout("window.location.reload();", 1000);
    }