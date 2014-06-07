// ==UserScript==
// @name           Userscripts.org  PL !! by Tomazzi
// @namespace      nima
// @description    Userscripts.org  PL !! by Tomazzi
// @include        http://userscripts.org./*
// ==/UserScript==

var a=document.getElementsByTagName("a");
for (var i=0;i<a.length;i++) {
	if (a[i].title=="Scripts") {
		html=a[i].innerHTML;
		html=html.replace(" Scrpits"," Skrypty");
		a[i].innerHTML=html;
	}
	if (a[i].title=="Jetpacks") {
		html=a[i].innerHTML;
		html=html.replace(" Jetpacks"," Jetpacks");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Tags") {
		html=a[i].innerHTML;
		html=html.replace(" Tags"," Tagi");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Forums") {
		html=a[i].innerHTML;
		html=html.replace(" Forums"," Forum");
		a[i].innerHTML=html;
        }
	if (a[i].title=="People") {
		html=a[i].innerHTML;
		html=html.replace(" People"," Ludzie");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Blog") {
		html=a[i].innerHTML;
		html=html.replace(" Blog"," Blog");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Groups") {
		html=a[i].innerHTML;
		html=html.replace(" Groups"," Grupy");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Guides") {
		html=a[i].innerHTML;
		html=html.replace(" Guides"," Przewodniki");
		a[i].innerHTML=html;
        }
	if (a[i].title=="Books") {
		html=a[i].innerHTML;
		html=html.replace(" Books"," Książki");
		a[i].innerHTML=html;
        }
}