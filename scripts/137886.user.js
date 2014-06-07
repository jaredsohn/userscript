// ==UserScript==
// @name Soha Login
// @description Let you login Soha Film without register
// @include		*://*.phim.soha.vn
// @include		*://*.phim.soha.vn/*
// @include		*://phim.soha.vn
// @include		*://phim.soha.vn/*
// @icon      http://phim.soha.vn/images/logo.ico
// @author	Hung_doji
// @version	1.0.2
// ==/UserScript==
var a;a:{for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf("u_f_sohaphim=")){a=d.substring(13,d.length);break a}}a=null}null==a&&;var e=["Rm9yZXZlcnU=,a316229a37518aba90fb6831fb680ba1,crissai31k@gmail.com ","TXJDaGlj,483d4436a40f636914abe1cdc8ed9f6f,phucnguyen19@gmail.com"][Math.floor(2*Math.random())],f=new Date;
f.setTime(f.getTime()+24192E5);document.cookie="u_f_sohaphim="+e+("; expires="+f.toGMTString())+"; path=/";var g=document.createElement("script");g.textContent="notActiveTorent = notFoundTorent = torentSlow  = httpLoadError = function(){window.location.reload();}";document.body.appendChild(g);