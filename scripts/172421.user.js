// ==UserScript==
// @name           Feedly Open in Background Tabs
// @namespace      http://www.somyeol.com/
// @description    Open all Feedly news in a background tab (with w key)
// @include        http://cloud.feedly.com/*
// @include        http://feedly.com/*
// @include        https://cloud.feedly.com/*
// @include        https://feedly.com/*
// @grant          GM_openInTab
// @version        1.0.0
// ==/UserScript==

//Config
var key = 87; // 'w' key
var maxTabs = 50;

(function() {    
    var onKeyDown = function(event) {
        // push "w" key
        if(event.keyCode == key && !event.shiftKey) {
            var news = document.getElementsByClassName("condensedTools");
            //alert (news.length);
            for (var i = 0; i < news.length && i < maxTabs ; i++) {
                var links = news[i].getElementsByTagName('a');
                //alert(links[0]);
                if(links[0].href == "about:blank")
                {
                    continue;
                }
                GM_openInTab(links[0].href);
                links[0].click();
            }
        }
    }
    document.addEventListener('keydown', onKeyDown, false);
})();

