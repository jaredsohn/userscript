// ==UserScript==
// @name        	asoiaf despoiler
// @description		Makes spoiler-tagged content visible on /r/asoiaf. 
// @namespace      http://userscripts.org/users/176670
// @include        http://www.reddit.com/r/asoiaf/*
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
	// This function was swiped from http://diveintogreasemonkey.org/patterns/add-css.html
	
addGlobalStyle(
'a[href$="/spoiler"]{background:#CCC!important;color:#000!important}a[href$="/spoiler"]:hover{color:#000!important}a[href="/s"]{color:#000!important;background:#ccc!important;background-image:none!important;background-repeat:no-repeat;padding:0!important;cursor:text;width:0}a[href="/s"]:hover{color:#000!important}a[href="/s"]::after{content:attr(title);background:#CCC!important;color:#600!important;padding:0 10px}a[href="/s"]:hover::after,a[href="/s"]:active::after{color:#000!important}.link{border:0!important;margin-bottom:16px!important}body,.content{background:#fff!important}.domain a{color:#000!important}#sr-header-area{visibility:visible!important}.entry .buttons li a{visibility:visible!important}.res .author.moderator{padding:2px!important;background-color:transparent!important;border 1px solid #53a93f!important;border-radius:2px!important;color:#53a93f!important}.linkflair-mod .linkflairlabel{background-color:transparent!important;color:rgba(62,128,47,.6)!important;border-radius:2px!important;border-color:rgba(62,128,47,.6)!important}.linkflair-all .linkflairlabel{background-color:transparent!important;color:rgba(71,122,173,.6)!important;border-radius:2px!important;border-color:rgba(71,122,173,.6)!important}.linkflair-agot .linkflairlabel,.linkflair-acok .linkflairlabel,.linkflair-asos .linkflairlabel,.linkflair-affc .linkflairlabel,.linkflair-dae .linkflairlabel,.linkflair-none .linkflairlabel,.linkflair-adwd .linkflairlabel{background-color:transparent!important;border:1px solid rgba(215,61,50,.6)!important;color:rgba(215,61,50,.6)!important}#sr-header-area,#sr-header-area a,#header .tabmenu,.tabmenu li a,.tabmenu li.selected a,.side,.titlebox h1 a,.link .flat-list,.linkflairlabel,.flair,.stylesheet-customize-container textarea,.comments-page .tagline,.comments-page .tagline a,.popup,.pagename{font-family:Arial,sans-serif!important}.comments-page .tagline a{letter-spacing:0!important}');