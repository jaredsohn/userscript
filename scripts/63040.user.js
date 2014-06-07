// ==UserScript==
// @name          Everyone Doesn't Love Stack Overflow
// @description	  Removes ads between responses, removes job adverts on the sidebar
// @author        acousticsam
// @include       http://stackoverflow.com*
// @include       http://www.stackoverflow.com*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.everyonelovesstackoverflow, .welovestackoverflow, .module[style=\"padding-bottom: 1px;\"], .newuser, #notify-container, #notify-table {display:none !important;} #topbar {position:absolute!important;top:0!important;left:50%!important;width:330px!important;margin-left:-165px!important}');