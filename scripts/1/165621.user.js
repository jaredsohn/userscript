// ==UserScript== 
// @name Animated YouTube Thumbnails 
// @include http://*.youtube.com/my_subscriptions*
// @include https://youtube.com/my_subscriptions*
// @include https://*.youtube.com/my_subscriptions*
// @include http://youtube.com/my_videos*
// @include http://*.youtube.com/my_videos*
// @include https://youtube.com/my_videos*
// @include https://*.youtube.com/my_videos*
// @include http://youtube.com/my_favorites*
// @include http://*.youtube.com/my_favorites*
// @include https://youtube.com/my_favorites*
// @include https://*.youtube.com/my_favorites*
// @include http://youtube.com/my_history*
// @include http://*.youtube.com/my_history*
// @include https://youtube.com/my_history*
// @include https://*.youtube.com/my_history*
// @include http://youtube.com/watch*
// @include http://*.youtube.com/watch*
// @include https://youtube.com/watch*
// @include https://*.youtube.com/watch*
// @include http://youtube.com/user/*
// @include http://*.youtube.com/user/*
// @include https://youtube.com/user/*
// @include https://*.youtube.com/user/*
// ==/UserScript==

var imgVideoThumb=null; 
var astrImageFilters=new Array('/hqdefault.jpg','/default.jpg','/1.jpg','/2.jpg','/3.jpg');

var mouseOverVideoThumbnail=function (){ 
if(this.src && this.src.indexOf("ytimg.com/vi/")!=-1){ 
for(var i=0;i<astrimagefilters.length;i++){>
if(this.src.indexOf(astrImageFilters[i])!=-1){ 
imgVideoThumb=this; 
} 
} 
} 
};

var mouseOutVideoThumbnail=function (){ 
imgVideoThumb=null; 
};

var changeVideoThumbnail=function (){ 
if(imgVideoThumb && imgVideoThumb.src){ 
var strSuffix=imgVideoThumb.src; 
if(strSuffix.indexOf("?")!=-1){ 
strSuffix=strSuffix.substring(0,strSuffix.indexOf("?")); 
} 
strSuffix=strSuffix.substring(strSuffix.lastIndexOf("/")); 
for(var i=0;i<astrimagefilters.length;i++){>
if(strSuffix==astrImageFilters[i]){ 
if(i==astrImageFilters.length-1){ 
imgVideoThumb.src=imgVideoThumb.src.substring(0,imgVideoThumb.src.lastIndexOf("/"))+astrImageFilters[1]; //no hq thumbs on animation 
} else { 
imgVideoThumb.src=imgVideoThumb.src.substring(0,imgVideoThumb.src.lastIndexOf("/"))+astrImageFilters[i+1];
} 
} 
} 
} 
setTimeout(changeVideoThumbnail,1000); 
};

var addEvents=function (){ 
for(var i=0;i<document.images.length;i++){>
try{ 
var img=document.images[i]; 
img.removeEventListener("mouseover",mouseOverVideoThumbnail,false); 
img.removeEventListener("mouseout",mouseOutVideoThumbnail,false); 
img.addEventListener("mouseover",mouseOverVideoThumbnail,false); 
img.addEventListener("mouseout",mouseOutVideoThumbnail,false); 
}catch(e){} 
} 
};

var monitorDynEls=function (){ 
document.body.addEventListener("DOMNodeInserted",addEvents,false); 
};

addEvents(); 
monitorDynEls();

setTimeout(changeVideoThumbnail,1000);