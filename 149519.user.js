// ==UserScript==
// @name        GoogleCalWeekEndColumnColor
// @include     https://www.google.com/calendar*
// @version     0.3
// ==/UserScript==

var d=window.document;
    var css=''
    ,head=d.getElementsByTagName('head')[0]
    ,style=d.createElement('style');
    style.type='text/css';
    css+='.tg-weekend{background-color: #F4FCCC;}';
    
    if(style.styleSheet){
        style.styleSheet.cssText = css;
    }else{
        style.appendChild(d.createTextNode(css));
    }
    head.appendChild(style);