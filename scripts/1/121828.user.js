// ==UserScript==  
// @name Unlight Fix
// @include http://111.171.201.135/*  
// @include http://cn.unlight.jp/*  
// @include http://apps.facebook.com/*  
// @include https://hangame-check.unlight.jp/* 
// @include http://hangame-check.unlight.jp/* 
// ==/UserScript==  
 
if(/unlight\.jp/.test(location.href)){ 
    var checkswf=function(){ 
        var swf=document.getElementById("swfBox"); 
        if(swf.nodeName=="OBJECT"){ 
            swf.removeChild(swf.childNodes[0]); 
            clearInterval(window.ivid); 
        } 
    } 
    window.ivid=setInterval(checkswf,1000); 
} 
 
if(/facebook/.test(location.href)){ 
    var checkframe=function(){ 
        var frame=document.getElementById("iframe_canvas"); 
        if(frame){ 
            clearInterval(window.frid); 
            frame.scrolling="no" 
            var container=document.getElementById("contentArea"); 
            container.style.overflow="hidden"; 
        } 
    } 
    window.frid=setInterval(checkframe,1000); 
}