// ==UserScript==
// @name           Middle click images to view
// @namespace      http://userscripts.org/users/23652
// @description    Middle click on images to view them. Option for opening in a new tab and changing to left click
// @include        http://*
// @include        https://*
// @include        file*
// @copyright      JoeSimmons
// @version        1.01
// ==/UserScript==

// OPTIONS /////////////////////////////////
var open_in_new_tab = false;
var use_middle_click = false;
////////////////////////////////////////////

function openImg(e) {
  var btnCode;
  if ('object' == typeof e){
    btnCode = e.button;
  }
// 0=normal click. 1=middle click. 2=right click
if(btnCode==1 && use_middle_click) {
if(open_in_new_tab) {GM_openInTab(e.target.src);}
else {top.location=e.target.src;}
}
else if(btnCode==0 && !use_middle_click) {
if(open_in_new_tab) {GM_openInTab(e.target.src);}
else {top.location=e.target.src;}
}
}

function aCheck(e) {
var p=e.parentNode, r=true;
while(p!=null && typeof p!='undefined') {
if(p.tagName && typeof p.tagName!='undefined' && p.tagName.toLowerCase()=='a') {r=false;}
p=p.parentNode;
}
return r;
}

if(typeof document.body=='undefined') return;

try {
var x, img, p1, p2, p3;
for(var i=document.images.length-1; i>=0; i--) {
img=document.images[i];
if(aCheck(img) && img.getAttribute('onClick')==null && img.parentNode.getAttribute('onClick')==null && !/(iPhorum\/editor\/)|(bbcode)|(\/reader\/ui)|(style_images\/)|(images\/smilies\/)|(\/editor)|(aw\/pics\/icons\/)/.test(img.src)) {
img.addEventListener('click', function(e){openImg(e);}, false);
}
}
} catch(e) {
alert('Error! Please report this to the creator!\n\nClicking OK will bring up a box in which you can copy the error and email it to TheTenfold@Gmail.com');
prompt('Here is the error:', e.description);
}