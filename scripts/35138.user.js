// ==UserScript==
// @name           UploadFree
// @namespace      vene4ka.com
// @description    #18@05B @5:;0<=K9 D@59< 8 A@07C ?>:07K205B AAK;:C =0 D09;
// @include        http://upload.com.ua/dget/*
// ==/UserScript==
function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;
function defined(constant_name) {return (typeof window[constant_name]!=='undefined');}
function myf(){
for (i = 0, url = ""; i < link.length; i++){url += link[i];}
document.write("<a href=\""+url+"\">Link for download</a>");}
function wait(){
   if (defined('link')) myf()
   else window.setTimeout(function (){wait()},300,false);
}
wait();