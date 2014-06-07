// ==UserScript==
// @name           gtfoSaydrah
// @namespace      http://userscripts.org/user/citricsquid
// @description    Hides all saydrah shit from reddit.com
// @include        http://*reddit.com/*
// ==/UserScript==

var cont = document.getElementById("siteTable");
var subs = cont.getElementsByClassName('thing');
var total = 0;

for (i = 0; i < subs.length; i++){
	var titles = subs[i].getElementsByClassName('title')[0];
	var title = (titles.getElementsByTagName('a')[0].innerHTML).toLowerCase();
	if(title != "sick of saydrah posts? i made a userscript to hide them all! firefox and chrome, enjoy!"){
		if(title.match('(.*)saydrah(.*)')){
			subs[i].style.display='none';
		}
	}
}