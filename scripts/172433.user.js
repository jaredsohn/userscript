// ==UserScript==
// @name        InoReader
// @namespace   InoReader
// @include     http://*inoreader.com*
// ==/UserScript==

// adjust css for cleaner, more minimal appearance
GM_addStyle(".article_title_link { font-weight : bold; font-size : 13pt; }");
GM_addStyle(".article_title { padding : 0 0px; }");
GM_addStyle(".article_card { margin-bottom : 0px !important; }");
GM_addStyle(".article_content { padding-bottom : 0px; padding-left : 4px; padding-right : 4px; border-top : 0px; }");
GM_addStyle(".article_full_contents { margin-top: 4px; }");
GM_addStyle(".article_unread { border-left: 1px solid #AAAAAA !important; border-top : 0px; }");
GM_addStyle(".article_unreaded { border-bottom : 1px solid #AAAAAA; border-left : 0px solid #AAAAAA; border-top : 0px solid #AAAAAA; border-right : 1px solid #AAAAAA; color : #000000; font-weight : bold; padding : 3.5px; }");
GM_addStyle(".header_date { color : #000000; }");
GM_addStyle(".header_small_padding { margin-bottom : -28px; }");
GM_addStyle(".unread_cnt { font-size : 0px; }");
GM_addStyle("legend { font-size : 0px; }");
GM_addStyle(".plus { margin : 0; }");
GM_addStyle(".showed { margin: 0 0 0 5px; }");
GM_addStyle("#subscriptions_articles { padding: 0; }");
GM_addStyle("#subscriptions_buttons { border-bottom : 1px solid #AAAAAA; }");
GM_addStyle("#subscriptions_fieldset { margin : 0; padding : 0; border-width : 0; }");
GM_addStyle(".article_footer { background-color : #FFFFFF; line-height : 0px; margin-top : 10px; min-height : 0px; padding : -10px 0 0 -10px; position : absolute; }");
GM_addStyle(".splitter-bar-vertical { width : 1px; }");
GM_addStyle(".ui-state-default, .ui-widget-content { border-width : 0; background-image : none; background-color : #AAAAAA; }");
GM_addStyle(".selected_parent { background-color: #A9DA92; }");
GM_addStyle(".selected { color : #000000; }");

// remove logo and unneeeded functions to make more room for subscription list
document.getElementById("subscriptions_nav").style.display = "none";

// simplify doc title
document.title = "InoReader";