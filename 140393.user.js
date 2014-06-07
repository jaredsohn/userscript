// ==UserScript==
// @name	Wikipedia Urdu Font
// @namespace   http://bilalkhan.paigham.net
// @description	Jameel Noori Nastaleeq font on Urdu Wikipedia for best view.
// @author	Muhammad Bilal Khan
// @version    1.0
// @include	http://*ur.wikipedia.org/*
// @include	https://*ur.wikipedia.org/*
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




mbilalkhan('body{height:100%;margin:0;padding:0;font-family:Jameel Noori Nastaleeq;font-size:1.2em}.mw-tag-markers{font-family:Jameel Noori Nastaleeq;font-style:italic;font-size:90%}.breadcrumb{list-style:none;overflow:hidden;font:14px Jameel Noori Nastaleeq}ul.tabbernav{margin:0;padding:3px 0;font:bold 15px Jameel Noori Nastaleeq};')
    
    
    
// Thank You For Using this Script
// Muhammad Bilal Khan ( Author )