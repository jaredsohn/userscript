// ==UserScript==
// @name	Google+ Group Urdu Font
// @namespace   http://bilalkhan.paigham.net
// @description	Jameel Noori Nastaleeq font on Google+ Groups for best view.
// @author	Muhammad Bilal Khan
// @version    1.0
// @include	http://plus.google.com/*
// @include	https://plus.google.com/*
//
// ==/UserScript==
// You Must Need to Install "Jameel Noori Nastaleeq" font in Your Computer
// Please Do not Edit Anything Below
function mbilalkhan (css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
mbilalkhan('body{font:normal 16px Jameel Noori Nastaleeq}.Sb{font-size:16px}.gjzhZd{font-family:arial}.rcHZhc{font-family:arial}.tJO3Me{font-family:arial}.s9sPrc{font-family:arial}.VOr1fd .l2H2ze{font-family:arial}.l2H2ze{font-family:arial}.bOa{font-family:arial}.a-w, .a-qn{font-family:arial}.Om .c-b{font-family:arial}.c-b-da.c-b-E{font-family:arial}.mc, .Bf, .Bf.g-M-n, .mc .pl, .XX .pl, .Zd, .bRsFQc.a-n{font-family:arial}.cK{font-family:tahoma};')