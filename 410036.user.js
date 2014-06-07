// ==UserScript==
// @name       VK Article Font bigger
// @namespace  http://no.no/
// @version    0.1
// @description  Увеличивает шрифт вконтакте
// @include     http*://vk.com/*
// @copyright  2014+, andrey_di
// @grant       GM_addStyle
// ==/UserScript==



GM_addStyle(".feed_article, .wall_post_text {\
font-size: 15px !important;\
}");