// ==UserScript==
// @name           Family News
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/en?*
// ==/UserScript==

var e = document.getElementById("orderContainer");

var fake = document.createElement("div");
fake.setAttribute("class", "boxes news_articles");
fake.setAttribute("id", "odigies");


e.parentNode.insertBefore(fake, e);
document.getElementById("odigies").innerHTML=("<h1>Family News</h1><div><div class='map'>Hello my whole family!!! Welcome to our news!</div><p><u>Family Members:</u> TEObest1 [dady]<br/>antony15, SmooveTur [children]</p><div><img src='http://www.greekrepublik.cshtml.com/paidia.png' height='200' /><a style='cursor: default;'>Don't forget! Send your daily report everyday about: your GRD, your gold, your strength and your military rank...</a></div></div>");