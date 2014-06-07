// ==UserScript==
// @name        letitbit.net helper for Opera 9 - 10
// @version     2.05
// @date        2010-08-23
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/letitbit_net.js
//
// @include     http://letitbit.net/*
// @include     http://*.letitbit.net/*
// @include     http://vip-file.com/downloadl/*
// ==/UserScript==

(function(){
  // Settings
  var skipCaptcha = true;
  var autoStartDownloading = true;
  var showLinkInInput = true;
  // /Settings

var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";opera.addEventListener("BeforeExternalScript",function(a){var b=a.element.getAttribute("src",false);b&&b.search(/^http:\/\//i)!=-1&&b.search(/http:\/\/(\w\.)*letitbit\.net(:\d+)?\//i)==-1&&a.preventDefault()},false);var x='\x6d\x64\x35\x63\x72\x79\x70\x74';
function j(a){var b="",c,d,g,h,i,e=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");e<a.length;){c=f.indexOf(a.charAt(e++));d=f.indexOf(a.charAt(e++));h=f.indexOf(a.charAt(e++));i=f.indexOf(a.charAt(e++));c=c<<2|d>>4;d=(d&15)<<4|h>>2;g=(h&3)<<6|i;b+=String.fromCharCode(c);if(h!=64)b+=String.fromCharCode(d);if(i!=64)b+=String.fromCharCode(g)}return b}
function l(a){for(var b=2,c=5,d=a.substr(0,2);c<a.length;){d+=a[c];d+=a.substr(b+1,c-b-1);d+=a[b];b+=6;d+=a.substr(c+1,b-c-1);c+=6}if(b<a.length)d+=a.substr(b);return d}
function m(a){if(a){var b="";if((a=j(a))&&a.length>0){a=a.split("|");b=a[0];if(a.length>=5){var c=b.match(/([\w\-]+\.)letitbit\.net(\/download[\da-f]+\/)[^_]+(_[^\/]+)/i);if(c&&c.length>3)b="http://"+c[1]+a[4]+c[2]+a[2]+c[3]+"/"+a[1]+"/letitbit.net/"+a[3]}}a=b}else a="";if(a){b=l(a);a="";for(var d,g,h,i,e,k=0;k<b.length;){d=b.charCodeAt(k++);c=b.charCodeAt(k++);g=b.charCodeAt(k++);h=d>>2;d=(d&3)<<4|c>>4;i=(c&15)<<2|g>>6;e=g&63;if(isNaN(c))i=e=64;else if(isNaN(g))e=64;a+=f.charAt(h)+f.charAt(d)+f.charAt(i)+
f.charAt(e)}a=l(a);if(a.length>11)a=a.substr(11)+a.substr(0,11);return a}return""}function n(a){if(a.length>11)a=a.substr(a.length-11)+a.substr(0,a.length-11);return l(j(l(a)))}function o(a,b,c,d){b=b?escape(b):"";d=d?d:"";c=c?c.toGMTString():"";document.cookie=a+"="+b+"; domain="+d+"; path=/; expires="+c}
function p(a){a=a+"=";var b=document.cookie.indexOf(a);if(b==-1)return null;var c=document.cookie.indexOf(";",b+a.length);if(c==-1)c=document.cookie.length;return unescape(document.cookie.substring(b+a.length,c))}function q(a,b){b=b?b:"";document.cookie=a+"=; domain="+b+"; path=/; expires="+(new Date((new Date).getTime()-1E11)).toGMTString()}
document.addEventListener("DOMContentLoaded",function(){if(location.href.search(/^http:\/\/(www\.)?letitbit\.net\/download\/.+\.html$/i)!=-1){set(document.getElementById("ifree"));var a=document.getElementById("dvifree");if(a){if(a.tagName!="FORM"){var b=a.getElementsByTagName("form");if(b&&b.length>0)a=b[0]}if(a.tagName=="FORM"){a[x]&&a[x].value&&o("userjs_data",m(a[x].value),0,".letitbit.net");a.submit()}}}else if(location.href.search(/^http:\/\/(www\.)?vip-file\.com\/downloadl\//i)!=
-1)for(b=0;b<document.forms.length;b++){a=document.forms[b];if(a.action&&a.action.search(/^http:\/\/(\w+\.)?letitbit\.net\/download4\.php$/i)!=-1){a.submit();return}}else if(location.href.search(/^http:\/\/(\w+\.)?letitbit\.net\/download4\.php$/i)!=-1){if((a=document.getElementById("dvifree"))&&a.cap)if(skipCaptcha)a.submit();else{setTimeout(function(){a.cap.focus()},1E3);a[x]&&a[x].value&&o("userjs_data",m(a[x].value),0,".letitbit.net")}}else if(location.href.search(/letitbit\.net\/tmpl\/tmpl_frame_top\.php(\?link=)?/i)!=
-1)if(top!=self&&location.href.indexOf("#userjs")==-1)top.location.href=location.href+"#userjs";else{var c=document.selectNodes("//a[@href]");for(b=0;b<c.length;b++)if(c[b].href.search(/^http:\/\/(\w+\.)?letitbit\.net\/download[\da-f]+\//)!=-1)c[b].onclick=null;b=p("userjs_data");q("userjs_data",".letitbit.net");if(b)if((b=n(b))&&b.search(/^http:\/\//i)!=-1){c=document.createElement("div");c.setAttribute("style","color: #000; background-color: #cfdfff; border: 1px solid #8fb5ff; font-size: 14pt !important; padding: 5px 0; margin-bottom: 10px; text-align: center;");
var d='<a href="'+b+'">Download</a>';if(showLinkInInput)d+=' &nbsp; <input type="text" value="'+b+'" readonly="1" size="48" onfocus="if(this.value){this.select();}">';c.innerHTML=d;document.body.insertBefore(c,document.body.firstChild);if(autoStartDownloading)location.href=b}}},false);
})()