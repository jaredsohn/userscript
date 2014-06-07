// ==UserScript==
// @name           Eztv handler
// @namespace      it.eztv
// @include        http://eztv.it/*
// ==/UserScript==



var but = '<td width="16" class="forum_thread_post" style="border:0px">'+
	'<img height="16" width="16" src="http://www.azbn.gov/App_Themes/Default/Images/icon_checkmark_01.gif" '+
	'/></td>';

var count = 0;
var data = "";
var trs = document.getElementsByTagName("tr");
for (var i=0; i<trs.length; i++) {
	if (trs[i].className == "forum_header_border") {
		trs[i].innerHTML = but + trs[i].innerHTML;
		data = trs[i].childNodes[4].childNodes[1].innerHTML.substring(0,6);
		if (GM_getValue(data) == "setted") {
			trs[i].childNodes[4].childNodes[1].style.color="#000";
		}
		
		trs[i].childNodes[0].childNodes[0].addEventListener("click", function() { GM_setValue(this.parentNode.parentNode.childNodes[4].childNodes[1].innerHTML.substring(0,6), "setted"); this.parentNode.parentNode.childNodes[4].childNodes[1].style.color="#000" }, true);
		
		
		//alert(trs[i].childNodes[0].childNodes[0].src);
		//break;
	}
}


//GM_setValue("test","testing 123");