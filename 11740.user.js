// ==UserScript==
// @name		KYC Php Fix - Main Menu
// @namespace	mailto:ch_xxvi@yahoo.com.hk
// @description	Simulates the original VB-scripts, on the menu pages.
// @include		http://www.ccckyc.edu.hk/php/*
// @exclude		http://www.ccckyc.edu.hk/php/*/brow.php*
// @include		http://www.ccckyc.edu.hk/notice/*.php
// @creator		XXVi
// @version		1.5
// ==/UserScript==


$$ = document.getElementsByTagName;

//strLoading = "<font color=black size=6>Load \u7DCA, \u7B49\u7B49...</font>";
strLoading = "<font color=black face=Arial size=7>Loading...</font>";

redList = Array(
	Array("/php/subtitle.php", "/php/postboard/left.php", "leftFrame"),
	Array("/php/postboard/left.php", "/php/postboard/brow.php?sort=G", "mainFrame"),
	Array("/php/fileul/left.php", "/php/fileul/brow.php", "mainFrame"),
	Array("/php/refresher/left.php", "/php/refresher/brow.php?sort=G", "mainFrame"),
	Array("/php/itrecover/left.php", "/php/itrecover/brow.php", "mainFrame"),
	Array("/php/recover/left.php", "/php/recover/brow.php", "mainFrame"),
	Array("/php/photo/class.php", "about:blank", "mainFrame"),
	Array("/php/forum/left.php", "/php/forum/top.php", "mainFrame"),
	Array("/php/user/setting.php", $$('a')[0]? $$('a')[0].href: null, "mainFrame"),
	Array("/php/room/left.php", "/php/room/brow.php", "mainFrame"),
	Array("/php/merit/left.php", "/php/merit/addform.php", "mainFrame"),
	Array("/notice/teacher.php", "about:blank", "leftFrame"),
	Array("/notice/staff.php", "about:blank", "leftFrame"),
	Array("/notice/criticize.php", "about:blank", "leftFrame"),
	Array("/notice/policy.php", "about:blank", "leftFrame"),
	Array("/notice/meeting.php", "about:blank", "leftFrame"),
	null);

	
for (i=0; i<redList.length-1; i++) {
	if (document.location.href.indexOf(redList[i][0])>0) {
		open("javascript:document.body.innerHTML=\""+strLoading+"\"", redList[i][2]);
		open("javascript:location.replace(\""+redList[i][1]+"\")", redList[i][2]);
		break;
	}
}
