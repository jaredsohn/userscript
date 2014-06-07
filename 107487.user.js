// ==UserScript==
// @name           Facebook Share
// @namespace      http://userscripts.org
// @description    In just a click shares whatever the page to  Facebook and twitter  !!
// @include        *
// @exclude        http://twitter.com/*
// @exclude        https://twitter.com/*
// @exclude        http://*.facebook.com/* 
// @exclude        https://*.facebook.com/* 
// @exclude        *mail.* 
// ==/UserScript==
var intervalhandle=0;
var paddingoffset=(window.innerWidth-50)/4;
window.addEventListener("load",timerInitialise,false);
function timerInitialise()
{
 intervalhandle=setInterval(decrementPadding,1);
}
function decrementPadding()
{
 if(paddingoffset>=0){
  document.getElementById('something').style.padding='0px '+paddingoffset+'px 0px 0px';
  paddingoffset--;
 }
 else{
  clearInterval(intervalhandle);
 }
}
var divnode=document.createElement('div');
divnode.setAttribute('id','something');
divnode.setAttribute('style','position:fixed; z-index:900002; right:0px; bottom:0px; padding-right:'+paddingoffset+"px");
document.body.appendChild(divnode);
var htmlstring="<a href=http://www.facebook.com/sharer.php?u="+escape(document.URL)+">"+
               "<img src=http://static.ak.fbcdn.net/rsrc.php/yi/r/q9U99v3_saj.ico></a>"+
 			   "<a href=http://twitter.com/share?url="+escape(document.URL)+"&text="+escape(document.title+" - ")+">"+
			   "<img src=http://twitter.com/phoenix/favicon.ico></a>";
document.getElementById('something').innerHTML=htmlstring;
