// ==UserScript==
// @name           CM Decoder
// @namespace      http://localhost
// @description    Decode secret messages!
// @author         Xyan Flux
// @version        1.1.0
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @exclude
// ==/UserScript==

GM_registerMenuCommand("Decode", start);var e="";function start(){var a=document.getElementById("fb_menu_account");if(a){e=a.getElementsByTagName("a")[0].innerHTML}if(e&&e!=""){var patt1=/cm\[[^\]]*\]/gm;var patt2=/cm\[[^\]]*\]/m;var str=document.body.innerHTML;var list=str.match(patt1);if(list&&list.length>0){for(var j=0;j<list.length;++j){str=str.replace(patt2,decode(list[j]).fontcolor("#ff0000"))}document.body.innerHTML=str}}return}function decode(s){var m=s.substring(3,s.length-1).replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&amp;/gm,"&");s=m.replace(/ /gm,"").replace(/%}/gm,"]").replace(/%5/gm,"%");var l=s.length;var t=s+"!!!!";var c="";var u=0;for(var i=0,j;i<l;i+=4){u=(t.charCodeAt(i)-33)+(t.charCodeAt(i+1)-33)*94+(t.charCodeAt(i+2)-33)*8836+(t.charCodeAt(i+3)-33)*830584;for(j=0;j<4;++j){c+=String.fromCharCode(u%95+32);u/=95}}c=c.substring(0,l);var d="";if(c.substring(l-3)=="v#1"){c=c.substring(0,l-3);c=c.replace(/%%/gm,"\t").replace(/%{/gm,"{").replace(/%}/gm,"}").replace(/%\|/gm,"|").replace(/%~/gm,"~").replace(/\t/gm,"%");t="";for(var i=0;i<c.length;i+=2){t+=c.charAt(i)}for(var i=1;i<c.length;i+=2){t+=c.charAt(i)}c=t;u=c.charCodeAt(0)-48;l=0;t="";if(u>0){for(;u>0;--u){l=c.indexOf('!',l+1)}d=e.toLowerCase().replace(/[^a-z]/gm,"");for(var i=0;i<d.length;++i){t+=String.fromCharCode(219-d.charCodeAt(i))}}if(c.substring(0,l).indexOf(t)>=0){d=c.substring(l+1)}else{d=s.substring(l+1)}}else{d="";for(var i=0;i<m.length;++i){if(m.charAt(i)==' '){d+=' '}else{d+=String.fromCharCode(159-m.charCodeAt(i))}}}if(e){l=e.indexOf(" ");d=d.replace(/&fn;/gm,e.substring(0,l)).replace(/&ln;/gm,e.substring(l+1)).replace(/&wn;/gm,e)}else{d=d.replace(/(&fn;|&ln;|&wn;)/gm,"")}return d}