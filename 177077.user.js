// ==UserScript==
// @name         度娘三倍经验去死
// @namespace    http://jixun.org/
// @version      1.0.1.7 丧病特别版
// @description  强制隐藏三倍经验提示，每次发帖都有，太烦人了（无误
// @include      http://tieba.baidu.com/*
// @include      http://tieba.com/*
// @copyright    2013+, jixun66, jixun67, Yellow.Yoshi.Moe, Jixun.Moe // Jixun.Org
// @run-at       document-start
// ==/UserScript==

var e=document.createElement ('style');
e.innerHTML = 
 	// 度娘经验
    '.editor_tip_show,.tb_poster_placeholder, td:first-child, .lzl_panel_wrapper p:first-child, .lzl_panel_voice,'
	// 度娘游戏贴吧显示的广告
	+ '#game_couplet_pb_left, #game_couplet_pb_right, .game_spread_thread,'
	// 其他 ABP 遗漏的广告?
	+ 'a#search_button, #pb_adbanner,'
	// 其它乱七八糟的东西
	+ '#ueg_policy_open, .sign_title_text_bright, .tbui_placeholder,'
	+ '.game_couplet_left, .game_couplet_right,'
	// 贴吧某些遗漏的广告
	+ '#game_frs_head, #j_ten_years, #lucky_lottery, [class*="hgame_mod"], #game_rank, #search_baidu_promote, '
	+ '#cproshow, #ssq_lottery, .frs_game_spread， .frs_qunzu_wrpa,'
	// 丧心病狂
	+ '#j_navtab_game, p.new, .poster_head_surveillance, .edui-btn-voice, a[pv_code], .tbui_aside_float_bar, '
	+ '#union_mod, .tieba_notice, .u_mobile, .l_client, .p_sharebar, .time_gift_title, .time_gift_area'
	+ ' { display: none !important; }';

var c = setInterval (function(){
    if (!document.body)
        return;
    clearInterval (c);
    document.body.appendChild (e);
}, 10);