// ==UserScript==
// @name           Comcast Ad Hider
// @include        *comcast*
// @version                1.2
// ==/UserScript==
document.getElementById('comcast-adsrvc').style.display = 'none';
document.getElementById('skin_td_tree_bottom_ad').style.display = 'none';
document.getElementById('adslug').style.display = 'none';
document.getElementById('portlet_msgcenterad').style.display = 'none';
document.getElementById('portal_sidebar').style.display = 'none';
document.getElementById('skin_container_sidebar_ad').style.display = 'none';