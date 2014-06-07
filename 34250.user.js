// ==UserScript==
// @name           Google Reader: Web2Notify Notifier
// @namespace      http://jawtek.com
// @description    Sends notification when new items appear
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

(function(realWin) {

    var intervalID;
    var lastUnread = 0;
    var reCount = /(\d+)/;
    var e = document.createElement("script");
    e.id = "JawTek";
    e.type = "text/JavaScript";
    document.getElementsByTagName("head")[0].appendChild(e);
    e.src = "http://localhost:9887/script.js/";

    function checkReadCount()
    {
        var unread = document.getElementById('reading-list-unread-count').innerHTML;
        unread = reCount.exec(unread);
        //alert("unread=" + unread);
        if (unread != null)
            unread = parseInt(unread[1]);
        else
            unread = 0;
      
        if (unread > lastUnread)
        {
            var entries = document.getElementById('entries');

            var unreadEntries = document.evaluate(
                "count(div[contains(@class,'entry') and not(contains(@class,'read'))])",
                entries,
                null,
                XPathResult.NUMBER_TYPE,
                null).numberValue;
            //alert("unreadEntries=" + unreadEntries);
            if (unread != unreadEntries)
            {
                if(realWin.JawTek != null)
                {
                    if(realWin.JawTek.Web2Notify != null)
                    {
                        var W2N = realWin.JawTek.Web2Notify;
                        if(W2N.isRegistered){
							var iconpath = "http://www.iphonealley.com/images/storyimages/may08/googlereader_logo.png";
                            W2N.notify("New Items","Google Reader","There are " + unread + " unread items available on Google Reader",iconpath);
                        }
                    }
                }
            }
        }
        lastUnread = unread;
    }
    window.addEventListener("load", function(e) {
        if(realWin.JawTek != null)
        {
            if(realWin.JawTek.Web2Notify != null)
            {
                var W2N = realWin.JawTek.Web2Notify;
                W2N.registerApp("Google Reader","http://www.google.com/reader/ui/favicon.ico");
                W2N.registerNotifcation("Google Reader", "New Items", "New items are available on Google Reader");
            }
        }
        intervalID = window.setInterval(checkReadCount, 2000);
    }, false);
})((unsafeWindow != null) ? unsafeWindow : window);
