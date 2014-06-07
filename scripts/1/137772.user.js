// ==UserScript==
// @name           Declutter Designboom
// @namespace      URI
// @include        http://www.designboom.com*
// ==/UserScript==

var elmDeleted = document.getElementById("webblog_banner300x250");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("content_submission");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("content_competition");
elmDeleted.parentNode.removeChild(elmDeleted); 
elmDeleted = document.getElementById("shop_footer");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("box_news");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("sidebar");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("rig_box_doppi");
elmDeleted.parentNode.removeChild(elmDeleted);
elmDeleted = document.getElementById("content_sub_menu_grigio");
elmDeleted.parentNode.removeChild(elmDeleted);
