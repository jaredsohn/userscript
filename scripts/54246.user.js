// ==UserScript==
// @name DRPG CC+ theme
// @namespace Josh Gittinger (ASDM)
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/Background-1.gif
// @resource header http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_header2v2.png
// @resource buttons http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_header2v2.png
// @resource buttonends http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/buttonendsv1.png
// @resource forum http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_fourmv1.png
// @resource general http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_generalv1.png
// @resource profile http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_profilev0.png
// @resource right http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_rightv2.png
// @resource store http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_storev0.png
// @resource storeitem http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/storeitem.png
// @resource title http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/titlebg.png
// @resource play http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/playbuttonv1.png
// @resource tab http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/boxbg.png
// @resource twitter http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/boxbgsm.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .butbg {background-image: url(\''+GM_getResourceURL('background')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .s-img, #st-menu li a, .st-iitem a, .st-catshow {background-image: url(\''+GM_getResourceURL('store')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} .h-featured a, .h-moregames, .gl-playbutton {background-image: url(\''+GM_getResourceURL('play')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter, #sidebar .searchbox {background-image: url(\''+GM_getResourceURL('twitter')+'\');} ');