// ==UserScript==
// @name Dont know2
// @namespace Ididapoo
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com
// @exclude http://www.casualcollective.com/radio
// @resource buttons http://img515.imageshack.us/img515/3559/buttons.png
// @resource right http://img89.imageshack.us/img89/7536/rightw.png
// ==/UserScript==

GM_addStyle('.butbg, .but span, .dsel span {background-image: url(\''+GM_getResourceURL('background')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, #sb-s-view a, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} ');