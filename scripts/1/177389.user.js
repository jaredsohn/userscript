// ==UserScript==
// @name		玛雅网去广告
// @description	玛雅网广告太霸气了，清理下。
// @namespace	http://userscripts.org/scripts/show/177389
// @include     http://*
// @updateURL		https://userscripts.org/scripts/source/177389.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177389.user.js
// @author			ejin
// @version     2013.12.23
// ==/UserScript==

if (document.title.indexOf("玛 雅 网 - Maya ! - Powered by Discuz!")!=-1) {
	var all_elem = document.getElementsByTagName("div");
	for(var i=0; i<all_elem.length; i++) {
			if( all_elem[i].innerHTML.indexOf("faq.php")<0 && all_elem[i].className!="maintable") {
				if (all_elem[i].className.indexOf("subtable")==0 || all_elem[i].innerHTML.indexOf("class=\"left\"")!=-1){break}
				all_elem[i].innerHTML="";
			}
	}
	
	var all_elem = document.getElementsByTagName("table");
	for(var i=0; i<all_elem.length; i++) {
			if( all_elem[i].width=="760" && all_elem[i].innerHTML.indexOf("cps_user=130114")!="-1" ) {
				all_elem[i].style.display="none";
			}
	}
	
	var all_elem = document.getElementsByTagName("tr")
	for(var i=0; i<all_elem.length; i++) { 
		if (all_elem[i].className=="t_infoline"){all_elem[i].innerHTML=""}
	}
	top.document.onclick = null ;
	document.onclick = null ;
}

