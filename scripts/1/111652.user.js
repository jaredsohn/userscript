// ==UserScript==
// @name VK for me only
// @version 0.1
// @description More important space in VK
// @author Мусаткин Роман
// @include http://vk.com/*
// @include http://vkontakte.ru/*
// @include http://*.vk.com/*
// @include http://*.vkontakte.ru/*
// ==/UserScript==
var sheet = document.createElement('style');sheet.innerHTML = "#stl_side, #stl_left, .ad_box_new, #left_blocks, #left_ads {display:none; height:0; width:0; position:absolute; top:-1px; left:-1px;} #side_bar {position:fixed;} img {border-radius:3px; -webkit-border-radius:3px; -moz-border-radius:3px;}";document.body.appendChild(sheet);return false;