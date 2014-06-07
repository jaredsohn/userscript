// ==UserScript==
// @name       Sankaku Real Size Images
// @namespace  http://www.sankakucomplex.com/
// @version    0.1
// @description  replace all with real images
// @match      http://www.sankakucomplex.com/*
// @run-at document-body
// @require	   http://code.jquery.com/jquery-latest.min.js
// @copyright  2012+, You
// ==/UserScript==

var img = $(".fancybox > img");
replaceImages();

function replaceImages(){
    if(img.length){
        img.each(function(){
            this.src = this.parentNode.href;
            console.log(this.src);
        });
    }else{
        img = $(".fancybox > img");
        setTimeout(replaceImages,500);   
    }
}