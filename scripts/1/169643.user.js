// ==UserScript==
// @name       Bypass Ads JAV Screen Shot
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  bypass ads from jav image screenshot 
// @include http://gzvd.info/viewer.php?file=*
// @include http://imagerabbit.com/viewer.php?file=*
// @include http://image69.us/viewer.php?file=*
// @include http://games8y.com/viewer.php?file=*
// @include http://kissdown.com/viewer.php?file=*
// @include http://picjav.net/picjav2/viewer.php?file=*
// @include http://pixup.us/img*
// @include http://imgcandy.net/img*
// @include http://imgcloud.co/img*
// @include http://imgmoney.com/img*
// @include http://imagecorn.com/img*
// @include *.picbucks.com/url/*
// @include *.http://imgdino.com/*
// @include http://picjav.net/viewer.php?file=*
// @run-at document-body
// @match  
// @copyright  2012+, GU
// ==/UserScript==
var url = window.location.toString() , imgTag = document.getElementsByTagName('img');

function flyaway(regex){
    for(var i=0; i<imgTag.length; i++){
    	if(imgTag[i].parentNode.href.match(regex))
           window.location = imgTag[i].parentNode.href.replace(regex,"");
    }
}
function removeElement(el) {
	el.parentNode.removeChild(el);
}

if(url.indexOf("imagerabbit") != -1 || url.indexOf("gzvd.info") != -1){
	window.location = url.replace("viewer.php?file=","images/");
}else if(url.indexOf("image69") != -1){
    flyaway(/http.+image69.us/,"");
}else if(url.indexOf("games8y") != -1){
    flyaway(/http.+games8y\.com\//,"");
}else if(url.indexOf("picjav2/") != -1){
    flyaway(/.+picjav2\//,"");
}else if(url.indexOf("picjav.") != -1){
    flyaway(/.+picjav\.net\//,"");
}else if(url.indexOf("kissdown.") != -1){
    flyaway(/.+kissdown\.com\//,"");
}else if(url.match(/adf.+\/.+\.com\/images/)){
    window.location = url.replace(/adf.+\/(.+\.com)/,"$1");      
}else if(url.indexOf("imgdino.com") != -1){
    removeElement(document.getElementsByClassName("table_border")[0]);
}else if(url.indexOf("pixup.us" != -1) || url.indexOf("imgcandy.us") != -1 || url.indexOf("imgcloud.us") != -1 || url.indexOf("imgmoney.com") != -1 || url.indexOf("imagecorn.com") != -1){
    setTimeout(function(){
		document.getElementsByTagName("input")[0].click();       
    }, 1000);
}
