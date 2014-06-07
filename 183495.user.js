// ==UserScript==
// @name        GCalColorWeekend
// @include     https://www.google.com/calendar*
// @include	    http://www.google.com/calendar*
// @version     0.3
// ==/UserScript==

var d=window.document;
var css=''
,head=d.getElementsByTagName('head')[0]
,style=d.createElement('style');
style.type='text/css';
css+='.st-dtitle:last-child {background-color: #ff99ff;}';
css+='.st-dtitle:first-child{background-color: #ff99ff;}';

if(style.styleSheet){
    style.styleSheet.cssText = css;
}else{
    style.appendChild(d.createTextNode(css));
}
head.appendChild(style);