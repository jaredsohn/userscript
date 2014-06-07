// ==UserScript==
// @name	Google+ Nastaleeq
// @namespace   http://blog.muhasab.info
// @description	Google+ Nastaleeq font style for Urdu Community.
// @author	Muhammad Sabir
// @homepage    http://userscripts.org/users/351380
// @include	http://plus.google.com/*
// @include	https://plus.google.com/*
// @include	https://talkgadget.google.com/*
// ==/UserScript==

function getWidth() {
var screenwidth;
var screenheight;
 

 if (typeof window.innerWidth != 'undefined')
 {
      screenwidth = window.innerWidth,
      screenheight = window.innerHeight
 }
 else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0)
 {
       screenwidth = document.documentElement.clientWidth,
       screenheight = document.documentElement.clientHeight
 }
 else
 {
       screenwidth = document.body.clientWidth,
       screenheight = document.body.clientHeight
 }

return screenwidth;
}

function UrduStyle(css) {

    var head, style;
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);

}
//G+ Nastaleeq
UrduStyle('body {font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .a-f-i {font-size: 16px; line-height: 1.4;} .a-Lc-Sr{font-size: 13px;} .a-la-h {font-size: 15px;} .tk3N6e-e {font-size: 15px;} .a-j-K-Oce8ee {line-height: 13px;} .a-f-i-sb-e {vertical-align: middle;} .ea-S-R {font-size: 16px;} .n {font-size: 16px} .ea-S-qg{margin-top: 10px;} .a-j-xa-wa {font-size: 14px;} .a-j-Zc-e-ua {font-size: 16px;} .a-kh-fs-Hc-R {font-size: 16px; font-weight: normal;} .a-j-lc-Rd-R {font-size: 15px;} .a-f-U{font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .PE{font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} body.hCJnsb{font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .al{font-size: 18px;} .P-I-S{font-size: 18px;} .a-sb-k{font-size: 18px;} .hv{font: 18px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .a-dd-Zx {font-size: 18px;} .a-og-Tm-nb-S {font-size: 18px;} .h {font-size: 18px;} .l-e {font-size: 18px;}');
//Widescreen
UrduStyle('.a-A {width: '+getWidth()+'px;} .a-p-M-T-gi-xc {width: '+(getWidth()-410)+'px;} .a-f-p {width: '+(getWidth()-410)+'px;} .a-f-n-A {width: '+(getWidth()-450)+'px;}');
//GUI
UrduStyle('.a-f-p {background: #F1F1F1;} .a-p-M-T-gi-xc {background: #F1F1F1;} .a-p-A-xc-zb {background: #F1F1F1;} .a-p-M-T-gi-xc {border-style: hidden;} .a-f-i {margin-bottom: 18px; border-bottom-left-radius: 4px 4px; border-bottom-right-radius: 4px 4px; border-top-left-radius: 4px 4px; border-top-right-radius: 4px 4px; box-shadow: #AAAAAA 1px 1px 1px;}');
//Chat Area
UrduStyle('.me_entry_search {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .me_entry_search_label {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .CSS_CW_ENTRY_TEXT_AREA {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .mole_title_text {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .wackmsg_new_sender {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;} .wackmsg_same_sender {font: 16px "Alvi Lahori Nastaleeq","Jameel Noori Nastaleeq",Tahoma;}');

