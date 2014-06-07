// ==UserScript==
// @name cam4 slim
// @version 0.1
// @namespace cam4_goes_slim
// @description cam4-list
// @include http://*.cam4.com/
// @include http://*.cam4.*.com/
// @include http://*.cam4.*.com/*
// @include http://cam4.*.com/
// @include http://cam4.*.com/*
// @require http://code.jquery.com/jquery-1.11.0.min.js
/* // @require file:///C:\Users\user\AppData\Roaming\Mozilla\Firefox\Profile\1234567.default\gm_scripts\chaturbate_slim\c4array.js */
// ==/UserScript==
for (var i = 0; i < list.length; i++)
    
{  $('div.profileDataBox div a[href*="' + list[i] + '"]').parent().hide();  }
    
//.user.js