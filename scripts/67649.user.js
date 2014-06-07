// ==UserScript==
// @name           Facebook Chat Neuterizer
// @author         dremelofdeath
// @description    Eliminates the Facebook Chat windows and buttons and reprograms the Who's Online box to take you to a user's profile instead of opening a new chat window.
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#chat, #chat_tab_bar, .chat_conv, .chat_window_wrapper, .tab_availability, div[title='Show/Hide Chat Window'], div[title='Close Chat Window'], #chat_previous_tab, #chat_next_tab { display: none !important; }");
unsafeWindow.__inject = function(){
    if(unsafeWindow.buddyList != null) {
        unsafeWindow.buddyList._prance = function(){document.getElementById("buddy_list_parent").innerHTML=document.getElementById("buddy_list_parent").innerHTML.replace(/(<a .+?")#(".*?) onclick=".+?itemOnClick\((\d+)\).*?"/g,"$1http://www.facebook.com/profile.php?id=$3$2");return false;};
        unsafeWindow.buddyList._magicalUnicorns = unsafeWindow.buddyList.openTab;
        unsafeWindow.buddyList.openTab = function(){var ret = this._magicalUnicorns();this._prance();return ret;};
        unsafeWindow.buddyList.openTab.bind = unsafeWindow.buddyList._magicalUnicorns.bind;
        unsafeWindow.buddyList.openTab.curry = unsafeWindow.buddyList._magicalUnicorns.curry;
        unsafeWindow.buddyList.openTab.defer = unsafeWindow.buddyList._magicalUnicorns.defer;
        unsafeWindow.buddyList.openTab.deferUntil = unsafeWindow.buddyList._magicalUnicorns.deferUntil;
        unsafeWindow.buddyList.openTab.extend = unsafeWindow.buddyList._magicalUnicorns.extend;
        unsafeWindow.buddyList.openTab.memoize = unsafeWindow.buddyList._magicalUnicorns.memoize;
        unsafeWindow.buddyList.openTab.mixin = unsafeWindow.buddyList._magicalUnicorns.mixin;
        unsafeWindow.buddyList.openTab.occur = unsafeWindow.buddyList._magicalUnicorns.occur;
        unsafeWindow.buddyList.openTab.recur = unsafeWindow.buddyList._magicalUnicorns.recur;
        unsafeWindow.buddyList.openTab.shield = unsafeWindow.buddyList._magicalUnicorns.shield;
        return true;
    }
    return false;
};
unsafeWindow.__injector = unsafeWindow.setInterval("__inject()?clearInterval(__injector):false;",750);
