 // ==UserScript==
// @name Ypox script
// @namespace Ypox
// @description Just login n let the script wrk for u
// @include *ypox.com*
// @grant none
// @version beta2
// @author rahulg007
// ==/UserScript==
var path=window.loc ation.href;
var i=document.getE lementById("das hMenu")[0].getA ttribute("ssid" );
var ssid=i.replace( "dashBoard.acti on?id=","");
if(path==(" http:// www.ypox.com/ dashBoard.action ?id "+ssid))
document.getEle mentById("sendS MSMenu").click( );
else if(path==(" http:// www.ypox.com/ main.action?id "+ssid))
{
document.getEle mentById('txtMo bile').value=97 62225547;
document.getEle mentById('txtaM ess').value="Hi ..., Happy Earning...! '"+Math.floor(( Math.random()*20000000000000 0000) + 2)+"'";
document.sendsm s1.submit();
setTimeout("win dow.location.hr ef = \" http:// www.ypox.com/ main.action?id \";",500);
}
