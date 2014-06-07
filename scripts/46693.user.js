// ==UserScript==
// @name Dont know
// @namespace Ididapoo
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com
// @exclude http://www.casualcollective.com/radio
// @resource background http://i42.tinypic.com/2wqv8y8.jpg
// @resource header http://i39.tinypic.com/28m1xrs.jpg
// @resource buttons http://i44.tinypic.com/15qrc3k.jpg
// @resource buttonends http://i43.tinypic.com/xfx6o9.jpg
// @resource forum http://i39.tinypic.com/e8op4i.jpg
// @resource general http://i44.tinypic.com/2s0kapw.jpg
// @resource profile http://i42.tinypic.com/2vv7sxu.jpg
// @resource right http://img89.imageshack.us/img89/7536/rightw.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #logo a, #topmenu ul li a, #loginbox, #userbox, #loginbox .lb-content .lb-text, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .butbg, .but span, .dsel span {background-image: url(\''+GM_getResourceURL('background')+'\');} .but a, .dsel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-addthem, .button-donothing, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, #sb-s-view a, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} ');