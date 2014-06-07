// ==UserScript==
// @name           Betfair Refresh
// @namespace      NA
// @description    Refreshes betfair
// @include        http://site.sports.betfair.com/*
// @include        http://sports.betfair.com/*
// ==/UserScript==

/*
#
#
# Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
# Be careful of betfair data rate charges!!!!
# Default rate is set to 3 seconds or 3000ms
# 
# Code 'borrowed' from gruss and moneysavingexpert forum.
# History
# -------
#
# 2011-08-15 - First working version
#
*/


function autoRefresh()
{
    var e1 = frames[2].frames[1].document.getElementById("mpv_0_btnRefresh");
    var e2 = frames[2].frames[1].document.getElementById("mb1_btnRefresh");
    var e3 = frames[2].frames[1].document.getElementById("m1_btnRefresh");
    
    if (e1 || e2 || e3){
        if (document.createEvent){
            var ev = document.createEvent('MouseEvents');
            ev.initEvent("click",true,false);
            if (e1)
                e1.dispatchEvent(ev);
            if (e2)
                e2.dispatchEvent(ev);
            if (e3)
                e3.dispatchEvent(ev);
            
        }
        else{
            if (e1)
                e1.click();
            if (e2)
                e2.click();
            if (e3)
                e3.click();
        }
    }
}

if (window.timerId){
    clearInterval(window.timerId);
    window.timerId = undefined;
    alert("Auto refresh stopped");
}
else{
    window.timerId = setInterval(autoRefresh, '3000');
}

void(0);
