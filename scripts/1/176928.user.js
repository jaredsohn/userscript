// ==UserScript==
// @name        tieba_remove_sb_tip
// @namespace   null
// @include     http://tieba.baidu.com/*
// @version     1
// ==/UserScript==


GM_addStyle('div.wrapui_bubble_wrap,div.ui_bubble_content ,div.editor_tip_show , div.tieba_client_extra , table.lzl_panel_wrapper tbody tr td p ,li.l_client,div[id^="ebt"]>div:not(.editor_banned_tip_info),.editor_banned_tip_info>p:last-child {display:none;}')
