// ==UserScript==
// @name           HCI EMB Auto Logout
// @namespace      hci_emb_logout
// @description    Auto logout for EMB
// @include        http://*smb.chs.edu.sg/*
// ==/UserScript===

if (String(window.location).indexOf("http://smb.chs.edu.sg/smb/hs_student/")!=-1) {
	var xmlreq=new XMLHttpRequest();
	xmlreq.open("GET","http://smb.chs.edu.sg/cgi-bin/smb/logout.pl",true);
	xmlreq.send(null);
}