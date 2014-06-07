// ==UserScript==
// @name           facebook "like" viewer
// @namespace      http://www.facebook.com
// @include        *facebook.com/*
// ==/UserScript==
setInterval(
function(){
    if (location.href.match(/\/pages\//)){
        a = document.getElementsByTagName("*");
        for(var i=0;a[i];i++){
         try{
              if(a[i].style.visibility =='hidden') a[i].style.visibility = 'visible';
        }catch(e){}
        }
    }
},2000);