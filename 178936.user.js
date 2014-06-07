// ==UserScript==
// @name        Gaia - Left-Align
// @namespace   GaiArch_v3
// @description Left-align Gaia again
// @include     http://*.gaiaonline.com/*
// @version     1
// ==/UserScript==

var head=document.getElementsByTagName('head');
head=head[0];

var style=document.createElement('style');
var styleAttr= {'rel':'stylesheet','type':'text/css'}
for(attr in styleAttr) {
    style.setAttribute(attr,styleAttr[attr]);
}
var css='#gaia_header,#content,#gaia_content,#gaia_header .header_content,#gaia_footer{width:100%!important;border-width:0!important}#gaia_header,#content,#gaia_content,#bd,#gaia_content.grid_madonna #madonna_container{margin:0!important}#gaia_header{min-width:970px!important}#bd{margin-left:10px!important}#gaia_footer p{width:auto;margin:1% 6px}';

style.innerHTML=css;

head.appendChild(style);