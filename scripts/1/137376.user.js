// ==UserScript==
// @name Wupload
// @description Create cookie login Wupload without register
// @include		*://*.www.wupload.com
// @include		*://*.www.wupload.com/*
// @include		*://www.wupload.com
// @include		*://www.wupload.com/*
// @icon      http://phim.soha.vn/images/logo.ico
// @author	Juno_okyo
// @version	1.0.0
// ==/UserScript==
javascript:hf="http://www.wupload.com//";
if(location.href.indexOf(":\/\/www.wupload.com/")==-1)
	{
		g=confirm("Sẽ chuyển hướng đến trang wupload.com\nBạn đồng ý chứ?");
		if(g)location.href=hf;void(0);
	}
	else{c=pro mpt("Paste Cookie Wupload của bạn vào bên dưới\nCoded by Juno_okyo","Cookie Wupload");
	if(c){r=confirm("Bạn chắc chắn là Cookie này còn dùng được chứ?");
	d=new Date();
	nd=new Date(d.getFullYear()+1,2,11);
	void(document.cookie= "PHPSESSID="+c +";
	domain=.wupload.com;
	path=/;"+(r?"expires="+nd:""));
location.href=hf}void( 0)}
