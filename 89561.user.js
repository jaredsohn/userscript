// ==UserScript==
// @name           Chatango Fullscreen PMS
// @namespace      http://darkgeni.us/
// @description    Fullscreens the Chatango PM shiz.
// @author        guyfox
// @version        1.1
// @include        http://*.chatango.com/
// ==/UserScript==

try {
 document.getElementById("bottom_table").style.display = "none";
 document.getElementById("ad_wrapper").style.display = "none";
 document.getElementById("ad_placeholder_td").style.display = "none";
 document.getElementById("min_width_gif").style.display = "none";
 
 // Firefox fix
 document.getElementsByTagName("col")[1].style.display = "none";
 document.getElementsByTagName("embed")[0].style.height = "95%";
 
 // Try to delete colgroup
 document.getElementsByTagName("colgroup")[0].style.display = "none"; 
} catch(err) {
}