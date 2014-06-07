// ==UserScript==
// @name           ztitle
// @namespace      http://www.userscripts.org/people/171
// @include        *lolthai.com/*
// ==/UserScript==
var show_room = 0; //หากต้องการให้แสดงชื่อห้อง เปลี่ยนจาก 0 เป็น 1
var site_name = "LOLthai | ";
var patt1=new RegExp("([a-zA-Z0-9_-])+\.php");
var purl=new Array("browse.php","pets.php","casino.php","arena.php");
var pname=new Array("Browse","Pets","Casino","Battle Arena");

function stripHTML(txt){
	var re = /(<([^>]+)>)/gi;
	return txt.replace(re, "");
}

var title_str = stripHTML(document.getElementsByTagName("H1")[0].innerHTML);
var title_array = title_str.split("&gt;");

if(title_array.length>1){
	if(show_room==1){
		document.title = site_name + title_array[0]+" > "+title_array[1];
	}else{
		document.title = site_name + title_array[1];
	}
}else{
	for (i in purl){
		if(purl[i]==patt1.exec(window.location.href)[0])	
			title_str = pname[i];
	}
	document.title = site_name + title_str;
}