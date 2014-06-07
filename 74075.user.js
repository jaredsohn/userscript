// ==UserScript==
// @name Transparent Theme
// @namespace IrRox
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header http://img641.imageshack.us/img641/4751/header2q.png
// @resource general http://img15.imageshack.us/img15/4384/general4.png
// @resource right http://img194.imageshack.us/img194/6469/sidebar4.png
// @resource footer http://img269.imageshack.us/img269/1386/foot2.png
// @resource tab http://img269.imageshack.us/img269/1386/foot2.png
// @resource twitter http://img269.imageshack.us/img269/1386/foot2.png
// @resource behind http://img535.imageshack.us/img535/6162/behind5copy.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} #footer {background-image: url(\''+GM_getResourceURL('footer')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} #surround {background-image: url(\''+GM_getResourceURL('behind')+'\');} #content, .boxcontent, .ms-opts, .a-log { background-color: transparent;} ');