// ==UserScript==
// @name           Chatango Fullscreen PMS
// @version        1.0
// @include        http://*.chatango.com/
// ==/UserScript==

document.getElementById("ad_placeholder_td").style.display = "none";
document.getElementById("min_width_gif").style.display = "none";
document.getElementById("ad").style.display = "none";
document.getElementById("ad").style.width = "0px";
document.getElementById("ad").style.padding = "0px";
document.getElementById("ad_wrapper").style.display = "none";
document.getElementById("bottom_table").style.display = "none";
document.getElementById("min_width_gif").style.display = "none";

# Try to delete colgroup
document.getElementsByTagName("colgroup")[0].style.display = "none";