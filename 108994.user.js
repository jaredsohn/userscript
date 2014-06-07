// ==UserScript==
// @name           9GAG Bypass NSFW filter
// @description    Show not safe for work images without logging in
// @namespace      http://9gag.com/
// @include        http://9gag.com/*
// ==/UserScript==

var cloudfront='http://d24w6bsrhbeh9d.cloudfront.net/',
    allElements = document.getElementsByTagName('img'),
    id;
for (var i = 0; i < allElements.length; i++) {
    if (allElements[i].src==cloudfront+'img/nsfw-mask_v2.jpg')  {              
        if (document.URL.split('/')[3]=='gag') id=document.URL.split('/')[4];         
        else id=allElements[i].parentNode.href.split('/')[4];                
        allElements[i].src=cloudfront+'photo/'+id+'_700b.jpg'; 
        allElements[i].addEventListener("error", e, false); 
    }    
    if (allElements[i].src==cloudfront+'img/nsfw-thumbnail.jpg') {
        id=allElements[i].parentNode.href.split('/')[4];
        allElements[i].src=cloudfront+'photo/'+id+'_220x145.jpg';   
        allElements[i].addEventListener("error", e, false); 
    }    
}
var contentDIV = document.getElementById('content');
contentDIV.className="";
function e(){this.src='http://placehold.it/220x145/ddd/1081BC&text=Image+not+found';}