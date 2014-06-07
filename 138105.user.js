// ==UserScript==
// @name socola
// @description bi mat quoc gia
// @include		*://*.phim.soha.vn
// @include		*://*.phim.soha.vn/*
// @include		*://phim.soha.vn
// @include		*://phim.soha.vn/*
// @icon      http://phim.soha.vn/images/logo.ico
// @author	Gabriel
// @version	1.02
// ==/UserScript==
var a;a:{for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf("u_f_sohaphim=")){a=d.substring(13,d.length);break a}}a=null}null==a&&history.go(0);var e=new Date;e.setTime(e.getTime()+24192E5);document.cookie="u_f_sohaphim=Rm9yZXZlcnU=,a316229a37518aba90fb6831fb680ba1,nqt.1208@gmail.com; expires="+e.toGMTString()+"; path=/";
