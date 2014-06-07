// ==UserScript==
// @name	<get/play>deb.net new tab/window remover for install links
// @description	Injects a new (invisible) iframe on playdeb.net and getdeb.net which handles install links instead of having all install links open a new window/tab by changing the target attribute for install links from "_blank" to "debframe" (the injected iframe)
// @namespace	http://userscripts.org/
// @include	http://www.getdeb.net/updates/*
// @include	http://www.playdeb.net/updates/*
// ==/UserScript==
var body=document.body;
var debframe="<iframe src='about:blank' name='debframe' style='display:none'></iframe>";
body.innerHTML=body.innerHTML+debframe;
var links=document.links;
var href="";
var debl="deb.net\\/install/";
var foundone=false;
for(i in links){
	href=links[i].href;
	if(href.search(debl)>0){
	foundone=true;
		if(links[i].target=="_blank"){
			links[i].target="debframe";
		}
	}
}