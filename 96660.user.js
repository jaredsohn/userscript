// ==UserScript==
// @name           Change Facebook Photo Viewer Background by thefacebookforum.net
// @copyright      Dion Designs and TheFacebookForum.net
// @description    Changes background to white
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/home.php?sk=lf
// @include        http://www.facebook.com/home.php?filter=app_*
// @include        https://www.facebook.com/*
// @include        https://www.facebook.com/home.php?sk=lf
// @include        https://www.facebook.com/home.php?filter=app_*
// ==/UserScript==

var newSS, styles='.stageBackdrop {background:#FFFFFF!important;}';
if(document.createStyleSheet) {document.createStyleSheet(styles);}
else {
newSS=document.createElement('link');
newSS.rel='stylesheet';
newSS.href='data:text/css,'+escape(styles);
document.getElementsByTagName('head')[0].appendChild(newSS);
}