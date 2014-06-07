// ==UserScript==
// @name GetMap
// @run-at document-start
// @include hce.halomaps.org
// @include http://hce.halomaps.org/index.cfm
// @include http://www.hce.halomaps.org/index.cfm
// @description Download maps instantly
// @updateURL http://www.javascripthost.comoj.com/s2/bin/getmap.user.js
// @version 1.0.1
// ==/UserScript==
function waitforload(){
var cheCK=document.getElementById("my-timer").innerHTML;
var str = document.getElementsByTagName('body')[0].innerHTML
var tf=str.indexOf("index.cfm?fid="); 
var tc=str.indexOf("&action=now&hcode=");
var thefile = str.substr(tf,18);
var thecode = str.substr(tc,50);

if ( cheCK == null )
{
// Check for nothing first
} 
else if ( thefile && thecode )
{
window.location.href='http://hce.halomaps.org/' + thefile + thecode;
var div = document.getElementById("Download_display");
div.parentNode.removeChild(div);
} 
else 
{
//if thefile && thecode aren't being grabbed
alert('Whoops! Something went wrong... sorry about that');
}

}

//2 Second wait (this is a realistic grace for preparing the download)
window.setTimeout(waitforload,2000);