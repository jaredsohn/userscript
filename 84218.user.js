// ==UserScript==
// @name CarboRoxide
// @namespace IrRox
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://img409.imageshack.us/img409/5092/78944497.png
// @resource header http://img818.imageshack.us/img818/7766/header5g.png
// @resource right http://img843.imageshack.us/img843/5320/compiledright.png
// @resource title http://img412.imageshack.us/img412/7941/titlebgz.png
// @resource tab http://img375.imageshack.us/img375/9395/21468860.png
// @resource twitter http://img838.imageshack.us/img838/3838/twitterbox2.png
// @resource behind http://img831.imageshack.us/img831/5166/behindconent.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} #surround {background-image: url(\''+GM_getResourceURL('behind')+'\');} #content, .boxcontent, .ms-opts, .a-log { background-color: transparent;} ');