// ATPL++ 
// version 1.0 
// 2011-05-08
// xerquan
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.9.2 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ATPL++", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ATPL++
// @description   A script to make atplonline.gs navigation easier
// @include       http://atplonline.gs/*
// @include       http://www.atplonline.gs/*
// @include       http://atplonline.co.uk/*
// @include       http://www.atplonline.co.uk/*
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

addGlobalStyle(
' #contentWrapper {' + 
' background-color:#000;' +
'color:#B2B2B2' +
'}' +
'.lowerThird{' +
'background-color:#000; ' +
'-moz-box-shadow:1px 1px 1px #ddd; ' +
'-webkit-box-shadow:1px 1px 1px #ddd;' +
'-moz-border-radius:0px; ' +
'-webkit-border-radius:0px;' +
'}' +
'.dashboardTop li:first-child{' +
'border-top:1px solid #000; ' +
'}' +
'#performancePane{' +
'background-color:#000; ' +
'-moz-box-shadow:1px 1px 1px #aaa; ' +
'-webkit-box-shadow:1px 1px 1px #aaa; ' +
'-moz-border-radius:0px;' +
'//-webkit-border-radius:0px;' +
'}' + 
'.filteredList li{' +
'border-bottom:1px solid #000; ' +
'}' +
'.filteredList li a.inactiveItem{' +
'background-color:#000; ' +
'}' +
'.chart{' +
'background-image:url("");' +
'}' + 
'#footerWrapper{'+
'background-color:#000;' +
'background:#000;'+
'}' +
'.roundedPanel{' +
'background-color:#000;' +
'-moz-box-shadow:1px 1px 1px #aaa;' +
'-webkit-box-shadow:1px 1px 1px #aaa;'+
'-moz-border-radius:0px;'+
'-webkit-border-radius:0px;'+
'}' +
'.answer{' +
'background-color:#000;' +
'}' +
'input[type="submit"],input[type="button"],input[type="text"],input[type="password"]{' +
'background:#000 ;' +
'color:#B2B2B2' +
'}' +
'select {' + 
'background:#000;' +
'}' +
'.homepageTop{' +
'background:#000 url("/images/monochrome-image.png") 0 20px no-repeat;' +
'}' + 
'.homepageLogin{' +
'background-color:#000;'+
'-moz-box-shadow:1px 1px 1px #aaa;'+
'-webkit-box-shadow:1px 1px 1px #aaa;'+
'-moz-border-radius:0px;' +
'-webkit-border-radius:0px;'+
'}' + 
'.resultPane{' +
'background-color:#000;' +
'color:#B2B2B2' +
'-moz-box-shadow:1px 1px 1px #aaa;' +
'-webkit-box-shadow:1px 1px 1px #aaa;'+
'-moz-border-radius:0px;'+
'-webkit-border-radius:0px;'+
'}' +
'body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,select{'+
'color:#B2B2B2' +
'}' + 
'input[type="text"]:focus,input[type="password"]:focus,input[type="checkbox"]:focus,input[type="button"]:focus,input[type="text"]:hover,input[type="password"]:hover,input[type="checkbox"]:hover,select:hover{' +
'color:#B2B2B2' +
'}' +
'input[type="submit"]:focus,input[type="submit"]:hover,input[type="button"]:focus,input[type="button"]:hover{' +
'color:#B2B2B2' +
'}'
);

GM_log('ATPL++');
var ATPLLogoBar = document.getElementById('headerWrapper');

if (ATPLLogoBar) {
ATPLLogoBar.parentNode.removeChild(ATPLLogoBar);
}

var ATPLNav = document.getElementById('homepage');
if (ATPLNav) {
newElement = document.createElement('span');
newElement.innerHTML ='<span class="divider"></span><span class="divider"></span><a href="/" id="ATPLPlusMenu0" style="color:red;">ATPL++&nbsp;&nbsp;v1.0</a><span class="divider"></span><span class="divider"></span><a href="/revise.aspx" id="ATPLPlusMenu3">Start Revision</a><span class="divider"></span><a href="/coursedetails.aspx" id="ATPLPlusMenu1">Change Course Details</a><span class="divider"></span><a href="/courseadmin.aspx" id="ATPLPlusMenu2">Administer Course</a>';
ATPLNav.parentNode.insertBefore(newElement,ATPLNav.nextSibling);
}
