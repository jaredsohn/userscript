// ==UserScript==
// @name           Lunu's TF2 Outpost Autobump Script
// @version        1.0
// @description    Automatically Bumps trade on TF2 Outpost
// @include        http://www.tf2outpost.com/trades
// @run-at         document-end
// @grant          none
// ==/UserScript==

(function() {
    var RELOAD_MINUTES = 31; // reload every 31 minutes
    var divid = "tf2oab";
    var reload_time, counter;

    function notify(notify) {
        var div = document.getElementById(divid);
        if (!div) {
            var trades = document.getElementById("trades");
            var div = document.createElement("div");
            div.id = divid;
            trades.insertBefore(div, trades.childNodes[0]);
        }
        div.innerHTML = notify;
    }
    
    /*
    Called by the JS Interval counter to reload the page after reload_time
    */
    function showstatus() {
        reload_time -= 1;
        if (reload_time <= 0)
        {
            clearInterval(counter);
            location.reload();
            return;
        }
        var min = Math.floor(reload_time/60);
        var sec = reload_time - min*60;
        notify("Lunu's TF2 Outpost AutoBump Script: Reloading page in " +min+ " minutes and "+sec+" seconds...Like This Script ? You can Donate Team Fortress 2 Items if you want");
    }
    
    function color_anchor(anchor, apply) {
        anchor.parentNode.parentNode.parentNode.parentNode.style.border = apply?"1px solid red":"none";
    }
    
    function bump_trades() {
        var xpr = document.evaluate(".//li/a[@class='trade_bump']/div[@class='icon_bump']", document, null, XPathResult.ANY_TYPE, null);
        var anchor;
        while (anchor = xpr.iterateNext()) {
            anchor = anchor.parentNode;
            if (anchor.getAttribute('data-tradeid'))
                break;
        }
        if (anchor && anchor.getAttribute('data-tradeid')) {
            anchor.scrollIntoView();
            color_anchor(anchor, true);
            setTimeout(function(){
                    color_anchor(anchor, false);
                    anchor.click();
                    setTimeout(bump_trades, 500);
                }, 500);
        } else {
            reload_time = RELOAD_MINUTES*60;
            window.scrollTo(0,0);
            counter = setInterval(showstatus, 1000);
        }
    }
    
    bump_trades();
}).call(this);
