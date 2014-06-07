// ==UserScript==
// @name        lang-8 text wrap fix
// @namespace   yellow
// @description lang-8 text wrap fix
// @include     http://lang-8.com/*
// @version     1
// @grant       none
// ==/UserScript==

unsafeWindow.jQuery('div.comment_field p, pre, #journals_show .reply_comment_field p.f_left, .comment_after_correction, .comment_after_correction p.comment_small, table#message_form td, #rankings_index .short_introduction, #rankings_index .on_ranking_list').css('word-break', 'normal')