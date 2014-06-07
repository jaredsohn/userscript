// ==UserScript==
// @name       eRepublik warning link remover
// @namespace  http://euslp.com
// @version    1.0
// @description  Makes life easier
// @include    http://www.erepublik.com/en/main/warn/*
// ==/UserScript==

var z="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a=unsafeWindow.location,b,c=unsafeWindow.location.href.split("/")[6],d="",e,f,g="",h,i,j,k="",l=0;
if(/[^A-Za-z0-9\+\/\=]/g.exec(c))b=false;else{c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");do h=z.indexOf(c.charAt(l++)),i=z.indexOf(c.charAt(l++)),j=z.indexOf(c.charAt(l++)),k=z.indexOf(c.charAt(l++)),e=h<<2|i>>4,f=(i&15)<<4|j>>2,g=(j&3)<<6|k,d+=String.fromCharCode(e),j!=64&&(d+=String.fromCharCode(f)),k!=64&&(d+=String.fromCharCode(g));while(l<c.length);b=unescape(d)}a.href=b;