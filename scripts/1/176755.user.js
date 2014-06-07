// ==UserScript== 
// @name          Facebook Zoom for Odinokov 
// @description   Facebook page zoom 
// @include       *facebook.com*
// @exclude       
// ==/UserScript== 
autoPage(); 
function autoPage(){ 
        var increaseSize=20;
        zoom(increaseSize); 
} 
function zoom(large) 
{ 
        var i = parseInt(document.body.style.zoom); 
        if (isNaN(i)) i=100; 
        newZoom=i+large+'%'; 
        document.body.style.zoom=newZoom; 
}