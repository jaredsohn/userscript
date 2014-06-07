// ==UserScript==
// @name       Ynet Facebook Like Protection Removal
// @description  Removes the overlay from Ynet's facebook articles
// @version    1.1
// @copyright  2013+, Iddo
// @match      https://www.yedioth.co.il/FacebookApps/YnetApps/YnetLikeArticleNew/*
// @match      http://www.yedioth.co.il/FacebookApps/YnetApps/YnetLikeArticleNew/*
// ==/UserScript==

GM_addStyle ('#imgBeforeLike, .fb-like-div { display: none ! important; } #mainDiv { overflow: auto; }');
