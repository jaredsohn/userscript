// ==UserScript==
// @name           cybersport
// @namespace      a
// @description    Poprawa wygladu strony glownej serwisu cybersport.pl
// @include        http://cybersport.pl/
// ==/UserScript==

document.getElementById("news").style.width="100%";
document.getElementById("ajax_news").style.width="100%";
d=document.getElementsByTagName("div");
for (i=0;i<d.length;i++) {
	if (d[i].title=="reklama") {
		d[i].style.display="none";
	}
	if (d[i].className=="box_item") d[i].align="center";
	if (d[i].className=="main_news") d[i].style.width="100%";
	if (d[i].className=="news_middle") d[i].style.width="100%";
	if (d[i].className=="news-br") {
		d[i].style.width="560px";
		d[i].align="left";
		d[i].leftMargin="0px";
		d[i].style.backgroundImage="url('')";
	}
	if (d[i].className=="main_news_side_3") {
		d[i].style.width="100%";
		d[i].align="left";
		d[i].leftMargin="0px";
	}
	if (d[i].className=="main_news_side_4") {
		d[i].style.width="100%";
		d[i].align="left";
	}
	if (d[i].className=="news_while") {
		d[i].className="news_while_full";
		d[i].align="left";
		d[i].style.width="90%";
	}
	if (d[i].className=="news_while_short") {
		d[i].className="news_while_full";
		d[i].style.width="90%";
	}
	if (d[i].className=="news_short_title") d[i].className="news_while_title";
	if (d[i].className=="news_short_body") d[i].className="news_while_body";
	if (d[i].className=="news_short_user size10") d[i].style.width="100%";
}