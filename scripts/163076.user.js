// ==UserScript==
// @name        AdflyAutoClicker
// @namespace   Adfly auto button skiper
// @include     *.*
// @version     1
// ==/UserScript==




 var wind = $(window)[0];
  
  var wparent = wind.wrappedJSObject || wind;
 
  
  if (wparent.location.href.indexOf(".gs") != -1) {
   console.log(wparent);



setInterval(function(){

var time=document.getElementById('timer').innerHTML;
console.log(time);
if(time === '0'){
 document.getElementById('skiplink').click();
}},1000);
 

setInterval(function(){window.active = true;window.checkfocus = function() {} },100);

}


 if (wparent.location.href.indexOf("adf.ly") != -1) {
 setInterval(function(){

var exp=document.getElementById('countdown').innerHTML;
if(exp === '0 secondes'){
 document.getElementById('skip_button').click();
}},1000);
 

setInterval(function(){window.active = true;window.checkfocus = function() {} },100);

}
