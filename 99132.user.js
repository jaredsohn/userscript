// ==UserScript==
// @name           Emerald Empire Proboards
// @namespace      Emerald Empire
// @include        http://rokuganee.proboards.com/*
// ==/UserScript==

divs = document.getElementsByTagName("div");

divs[4].style.background = 0;
document.getElementsByTagName("img")[9].style.display = "none";
document.getElementById("pb_report_ad").style.display = "none";
document.getElementsByTagName("img")[10].style.display = "none";

d = document.getElementById("cboxdiv");
d.innerHTML = "";
d.id = "noUse";

d = document.getElementsByTagName("table")[4];
e = d.getElementsByTagName("img");
for( f = 0; f < e.length; f++ )  { e[f].style.width = "20px"; e[f].style.height = "20px"; }

d=divs[3];
d.style.width = "92%"
d.innerHTML = "<div id=cboxdiv style='text-align: center; line-height: 0'><div style='background-color: #c7ac8f;'><iframe frameborder=0 width=100% height=300 src='http://www2.cbox.ws/box/?boxid=2264592&boxtag=59800j&sec=main' marginheight=2 marginwidth=2 scrolling=auto allowtransparency=yes name=cboxmain style='border: 0px solid;' id=cboxmain></iframe></div><div><iframe frameborder=0 width=100% height=75 src='http://www2.cbox.ws/box/?boxid=2264592&boxtag=59800j&sec=form' marginheight=2 marginwidth=2 scrolling=no allowtransparency=yes name=cboxform style='background: #ba8456; border: 0px solid;border-top:0px' id=cboxform></iframe></div></div>" + d.innerHTML;

document.getElementsByTagName("font")[2].innerHTML += "<br />View the <a href='/index.cgi?action=recent'>50 most recent posts</a> of this forum."
