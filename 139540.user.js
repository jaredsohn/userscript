// ==UserScript==
// @name LyThongAc Login
// @description Let you login PUB Film without register
// @include		*://*.pub.vn
// @include		*://*.pub.vn/*
// @include		*://pub.vn
// @include		*://pub.vn/*
// @icon      http://pub.vn/favicon_home.ico
// @author	LyThongAc
// @version	9.9.9
// ==/UserScript==
var a;a:{for(var b=document.cookie.split(";"),c=0;c<b.length;c++){for(var d=b[c];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf("bb_userid=")){a=d.substring(13,d.length);break a}}a=null}null==a&&(alert("Powered By LyThongAc"),window.location.reload());var e=["2256","74063","9325","4969"][Math.floor(4*Math.random())],f=new Date;var b=["eeeb717022ec847c32c103f89e4fc602","d33749bcd03c9588de1aaa81eee397dc","1beca7e79dff15bce14479ede32011fe","8e0fe5548cf6f64267d4b48b44f81114"][Math.floor(4*Math.random())],f=new Date;
f.setTime(f.getTime()+24192E5);document.cookie="bb_userid="+e+("; expires="+f.toGMTString())+";bb_password="+b+("; expires="+f.toGMTString())+"; path=/";var g=document.createElement("script");g.textContent="notActiveTorent = notFoundTorent = torentSlow  = httpLoadError = function(){window.location.reload();}";document.body.appendChild(g);document.cookie="bb_password="+b+("; expires="+f.toGMTString())+"; path=/";var g=document.createElement("script");g.textContent="notActiveTorent = notFoundTorent = torentSlow  = httpLoadError = function(){window.location.reload();}";document.body.appendChild(g);
