// ==UserScript==
// @name chaturbate slim
// @version 0.1
// @namespace chaturbate_goes_slim
// @description chaturbate-list
// @include http://*.chaturbate.com/
// @include http://*.chaturbate.com/female-cams/
// @include http://*.chaturbate.com/couple-cams/
// @include http://*.chaturbate.com/
// @include http://*.chaturbate.com/exhibitionist-cams/female/
// @include http://*.chaturbate.com/exhibitionist-cams/couple/
// @require http://code.jquery.com/jquery-1.11.0.min.js
/* // @require file:///C:\Users\user\AppData\Roaming\Mozilla\Firefox\Profiles\profileUser\gm_scripts\chaturbate_slim\array.js */
// ==/UserScript==

/* var list = ["jerealex", "larissa4", "hondagirl"]; */

for (var i = 0; i < list.length; i++)
    
{  $('ul.list li a[href*="' + list[i] + '"]').parent().hide();  }
    
//.user.js