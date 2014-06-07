// ==UserScript==
// @name           Baidu Tieba Wide Screen
// @namespace      BTWS_CK
// @description    by Carl Kuang
// @include        http://tieba.baidu.com/p/*
// ==/UserScript==
GM_addStyle(".fixedwidth {margin:5px; width:inherit;}");
GM_addStyle(".l_banner {display:none;}");
GM_addStyle("#rightAd {display:none;}");
GM_addStyle(".p_postlist {width:90%;}");
GM_addStyle(".fixedwidth .l_thread_info, .fixedwidth .l_post, .fixedwidth #editor {width:95%;}");
GM_addStyle(".fixedwidth .l_core, .fixedwidth .pb_content_wrapper, .fixedwidth .comment_last {width:inherit;}");