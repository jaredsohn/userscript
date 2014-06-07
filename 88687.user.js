// ==UserScript==
// @name           Fiverr Inbox Notifier
// @namespace      Yash
// @include        http://www.fiverr.com/*
// ==/UserScript==

t = 1;
if(GM_getValue("last") == undefined){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.fiverr.com/conversations',
        onload: function(data) {
            GM_setValue("last", data.responseText.match(/conversations\/([^"]+)/i)[1]);
        }
    });
}
window.setInterval(function(){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.fiverr.com/conversations',
        onload: function(data) {
            if(GM_getValue("last") != (d = data.responseText.match(/conversations\/([^"]+)/i)[1])){
                confirm("You've got a new message from " + d + ". Would you like to view it now?") ? window.location = "/conversations/" + d : null;
                GM_setValue("last", d);
                console.log("Last checked at " + t + ". Time: " + (t * 5000));
            }
            t += 1;
        }
    });
}, 5000);