// ==UserScript==
//
// @name           Printing System display fix
// @description    Fix page layout of Printing System under Chrome
// @namespace      Fix_outputCenter_table
// @author         PinGu
// @authorURL      http://plurk.com/pingu8007
// @version        1.0
// @include        http://140.122.65.121/outputCenter/jobDisplay.jsp*
// @include        http://140.122.65.121/outputCenter/mySelfDisplay.jsp*
//
// ==/UserScript==


//And of course your code!!
document.body.removeChild(document.getElementById('psview'));
document.getElementsByTagName('meta')[0].content=document.getElementsByTagName('meta')[0].content.replace(";text/html; charset=big5","");
document.getElementsByName('OCenter')[0].method="get";
for (i=0;i<document.getElementsByClassName('title').length;i++){
document.getElementsByClassName('title')[i].style.width="";
document.getElementsByClassName('title')[i].style.height="15px";
}
for (i=0;i<document.getElementsByClassName('cdata').length;i++){
document.getElementsByClassName('cdata')[i].style.width="";
document.getElementsByClassName('cdata')[i].style.height="15px";
}
for (i=0;i<document.getElementsByClassName('cdata2').length;i++){
document.getElementsByClassName('cdata2')[i].style.width="";
document.getElementsByClassName('cdata2')[i].style.height="15px";
}