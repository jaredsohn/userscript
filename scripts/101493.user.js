// ==UserScript==
// @name           Antikarp
// @namespace      http://userscripts.org/users/132504
// @description    Removes Yellow's posts from NDForums
// @include        http://www.ndforums.com/*
// ==/UserScript==

var post=false;
if(document.body.innerHTML.indexOf("Post #")!=-1) post=true;

setTimeout(function() {

for(var i=0;i<100;i++) {
   if(!document.getElementById('term'+i)) continue;
   var pspan=document.getElementById('term'+i);
   if(pspan.parentNode.innerHTML.indexOf('karp')!=-1) {
      if(post) {
         pspan.parentNode.parentNode.parentNode.childNodes[1].innerHTML='<span style=\'color:red;\'>I am dumb.</span><br /><br /><br />';
      } else {
      if(pspan.parentNode.parentNode.parentNode.childNodes[1].innerHTML=="0") {
         pspan.parentNode.parentNode.parentNode.innerHTML='<div style=\'text-align:center;padding-top:4px;padding-bottom:10px;\'>-</div>';
      } else {
         pspan.parentNode.parentNode.parentNode.innerHTML='<div style=\'text-align:center;padding-top:4px;padding-bottom:25px;\'>-</div>';
      }
      }
   }
}

setInterval(function() {
for(var i=0;i<100;i++) {
   if(!document.getElementById('term'+i)) continue;
   var pspan=document.getElementById('term'+i);
   if(pspan.parentNode.innerHTML.indexOf('karp')!=-1) {
      if(post) {
         pspan.parentNode.parentNode.parentNode.childNodes[1].innerHTML='<span style=\'color:red;\'>I am dumb.</span><br /><br /><br />';
      } else {
      if(pspan.parentNode.parentNode.parentNode.childNodes[1].innerHTML=="0") {
         pspan.parentNode.parentNode.parentNode.innerHTML='<div style=\'text-align:center;padding-top:4px;padding-bottom:10px;\'>-</div>';
      } else {
         pspan.parentNode.parentNode.parentNode.innerHTML='<div style=\'text-align:center;padding-top:4px;padding-bottom:25px;\'>-</div>';
      }
      }
   }
}
},5);

},5);