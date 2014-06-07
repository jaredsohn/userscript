// ==UserScript==
// @name F7U12 Alt Text Underliner
// @include        *.reddit.com/*
// ==/UserScript==

(function(){
$.each($('a'),function(ind,val){
if(val.title!=""){
$('a').eq(ind).css({
"border-bottom" :"1px solid #FF4500"}
)}
}
)}
())