// ==UserScript==
// @id             GoogleViewer
// @name           GoogleViewer
// @version        1.0
// @namespace      All
// @author         FrozenVoid
// @description    Adds Google Viewer links to documents(such as pdf/docx/xls/ppt)
// @include        *
// @run-at         document-end
// @priority      -10
// @license UFIL1.01 http://pastebin.com/6y9PmKMX
// ==/UserScript==
var googletypes=/\.xps$|\.ttf$|\.eps$|\.ps$|\.dxf$|\.tiff$|\.psd$|\.ai$|\.pages$|\.pdf$|\.ppt$|\.pptx$|\.xls$|\.xlsx$|\.doc$|\.docx$/gi
var l=document.querySelectorAll('a')
for(i in l){
if(l[i].href&&l[i].href.search(googletypes)!=-1&&l[i].href.search("docs.google.com")==-1){ 
var fimg=document.createElement('a')
fimg.href="http://docs.google.com/viewer?url="+l[i].href;
fimg.innerHTML="[Google Viewer]";
l[i].parentNode.insertBefore(fimg,l[i])
}}