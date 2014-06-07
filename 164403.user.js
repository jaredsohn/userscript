// ==UserScript==
// @name        Facebook Remove Ads
// @namespace   facebook
// @description Remove Ads from Facebook homepage right column
// @include     http*://*.facebook.com/
// @version     1
// @author Aziz Khalmukhamedov
// ==/UserScript==

   var ad1 = document.getElementById('pagelet_ego_pane_w');
   var ad2 = document.getElementById('pagelet_side_ads');	
    
   if (ad1) ad1.style.display = "none";
   if (ad2) ad2.style.display = "none";
