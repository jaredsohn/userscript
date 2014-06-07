// ==UserScript==
// @name           RS - Grand Exchange Ticker
// @namespace      frostedfreeze@gmail.com
// @description    Adds the Grand Exchange ticker to the page of the world you're on, for those of you who like to know without the hassle of going to the Grand Exchange database.
// @include        http://*.runescape.com/*l*,p*,j*
// ==/UserScript==
tickerFrame=window.location.href.indexOf("tickerframe");
frameHolder=document.referrer.substring(document.referrer.indexOf("runescape.com/")+14).replace("l=1/","");
function worldCheck() {if(frameHolder.charAt(0)=="l" && frameHolder.charAt(3)=="p" && frameHolder.charAt(6)=="j") return true;}
if(tickerFrame>-1 && worldCheck()==true) {
body=document.getElementsByTagName('body')[0];
body.style.background="url(http://www.runescape.com/img/gamewin/navbar.gif) repeat-y scroll center top";
body.innerHTML='<div align="center">'+body.innerHTML+'</div>';
} else if(tickerFrame<0) {
language="";
if(window.location.href.indexOf("l=1/")>-1) language="l=1/";
insert='<iframe border=1 opacity="0.5" width="100%" height="18" frameborder=0 src="http://itemdb-rs.runescape.com/'+language+'tickerframe.ws"></iframe></td><td align="center">';
td=document.getElementsByTagName('td');
td[td.length-1].innerHTML=insert+td[td.length-1].innerHTML;
}