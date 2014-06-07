

    // ==UserScript==
    // @name       ROBLOX Friend Cleaner
    // @namespace  http://use.i.E.your.homepage/
    // @version    0.1
    // @description  enter something useful
    // @match      http://www.roblox.com/My/EditFriends.aspx
    // @copyright  2013+, Ozzypig
    // ==/UserScript==
     
    var a = document.getElementById("ctl00_ctl00_cphRoblox_cphMyRobloxContent_rbxEditFriendsPane_dlFriends_ctrl0_bDelete");
    if (a) {
        a.click();
    }

