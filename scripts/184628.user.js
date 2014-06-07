// ==UserScript==
// @name           Chatango Fullscreen PMS by Gizmo
// @version        2.0
// @include        http://*.chatango.com/
// ==/UserScript==

var y = document.getElementById('ad_placeholder_td');
y.parentNode.removeChild(y);

var x = document.getElementById('ad_wrapper');
x.parentNode.removeChild(x);

var t = document.getElementById('bottom_table');
t.parentNode.removeChild(t);

var g = document.getElementById("min_width_gif");
g.parentNode.removeChild(g);