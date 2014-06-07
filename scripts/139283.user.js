// ==UserScript==
// @id             chatwork_notification
// @name           ChatWork Notification
// @version        1.0
// @namespace      http://efcl.info/
// @author         azu
// @description    ChatWork notification for Scriptish
// @include        https://www.chatwork.com/*
// @run-at         window-load
// @icon           https://www.chatwork.com/favicon.ico
// ==/UserScript==
(function(){
    var prevUnreadCount = 0;
    var roomList = document.getElementById("cw_roomlist_items");
    if (!roomList){
        console.log("チャット画面ではない?");
        return;
    }
    /*
     http://domes.lingua.heliohost.org/webapi/intro-domcore1.html
     https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
     */
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var openChatWork = function(){
        GM_openInTab(location.href, false, true);
    };

    // https://github.com/ento/chatwork-userscripts
    function getUnreadCount(){
        return unsafeWindow.RL.unread_sum.contact;
    }

    var observer = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            if (mutation.type === 'childList'){
                var unreadCount = getUnreadCount()
                // roomに新規メッセージがついた場合
                if (prevUnreadCount < unreadCount){
                    GM_notification("new message", "ChatWork", null, openChatWork);
                }
                prevUnreadCount = unreadCount;
            }
        });
    });

    observer.observe(roomList, {
        attributes : false,
        childList : true,
        characterData : false
    });
})();