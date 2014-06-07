// ==UserScript==
// @name           Digg.com Old Comments
// @namespace      digg.com
// @description    Partially restores Digg comments to the old style, while keeping the threading
// @include        http://*digg.com/*
// ==/UserScript==

GM_addStyle(".c-box-on { display: none !important; } .c-replies { border: 0px !important; } .c-head { border:0px !important;} .comment li .c-active { background: url(http://digg.com/img/comment-1.png) top left no-repeat !important; } .comment li .c-active { background: url(http://digg.com/img/comment-1.png) top left no-repeat !important; } .comment li .c-disabled { background: url(http://digg.com/img/comment-2.png) top left no-repeat !important; } .c-box { background: transparent !important; } .comment ul { margin: 0 !important;} .c-body { margin: 5px 5px 5px 5px !important;} .c-head { margin-bottom: 1px !important; } .c-ir .c-box { 0px 10px 4px 10px !important; } a.c-box { text-align: right !important; border: 0 !important; } .comment li { margin: 0 !important; } .comment li li { margin: 0 0 0 10px !important; } .c-reply { margin-bottom: 2px !important; }");