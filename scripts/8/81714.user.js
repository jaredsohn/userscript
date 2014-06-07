// ==UserScript==
// @name Pokemon
// @namespace richard1312
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://i758.photobucket.com/albums/xx222/richard1312/boxbg.png
// @resource header http://i758.photobucket.com/albums/xx222/richard1312/compiled_header2v2.png
// @resource general http://i758.photobucket.com/albums/xx222/richard1312/compiled_generalv11.png
// @resource profile http://i758.photobucket.com/albums/xx222/richard1312/compiled_profilev0.png
// @resource store http://i758.photobucket.com/albums/xx222/richard1312/compiled_store.png
// @resource right http://i758.photobucket.com/albums/xx222/richard1312/compiled_rightv3.png
// @resource forum http://i758.photobucket.com/albums/xx222/richard1312/compiled_forumv1.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} .s-img, .st-ibuy, .st-cat div {background-image: url(\''+GM_getResourceURL('store')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} ');