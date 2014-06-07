// ==UserScript==
// @name           Facebook Chat Killer Plus
// @author         soren121, dremelofdeath
// @description    Improves soren121's Facebook Chat Window Killer by also killing the next and previous chat buttons.
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle("#chat, #chat_tab_bar, .chat_conv, .chat_window_wrapper, .tab_availability, div[title='Show/Hide Chat Window'], div[title='Close Chat Window'], #chat_previous_tab, #chat_next_tab, #buddy_list_tab { display: none !important; }");
