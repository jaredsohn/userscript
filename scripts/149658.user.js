// ==UserScript==
// @name       移除百度推广
// @namespace  http://userscripts.org/scripts/show/149658
// @version    0.1
// @description  enter something useful
// @match      http://www.baidu.com/*
// @copyright  2012+, EDC
// ==/UserScript==

    

    
// 竞价推广
GM_addStyle(".ec_pp_f { display:none !important; }");
    
// 上下推广链接
GM_addStyle(".EC_mr15 { display:none !important; }");

//右侧
GM_addStyle(".fsblock { display:none !important; }");//推广链接
GM_addStyle("#ec_im_container { display:none !important; }");//推广链接
GM_addStyle("#m211029_ec_ma_ctner { display:none !important; }");//推广网址



    