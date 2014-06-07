// ==UserScript==
// @name Account Thanhlovelan
// @description Thanhlovelan
// @include		*://*.phim.soha.vn
// @include		*://*.phim.soha.vn/*
// @include		*://phim.soha.vn
// @include		*://phim.soha.vn/*
// @icon      http://phim.soha.vn/images/logo.ico
// @author	Thanhvcu110
// @version	1.0
// ==/UserScript==
var a;a:{for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf("u_f_sohaphim=")){a=d.substring(13,d.length);break a}}a=null}null==a&&history.go(0);var e=new Date;e.setTime(e.getTime()+24192E5);document.cookie="u_f_sohaphim=anVuZ2Jlbm5pZUB5YWhvby5jb20=,dd0e3013ada9c5ca0c6c515cc72784ad,jungbennie@yahoo.com; expires="+e.toGMTString()+"; path=/";