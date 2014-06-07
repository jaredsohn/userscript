// ==UserScript==
// @name Candystand v.2.0
// @namespace Comedian
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://i41.tinypic.com/2rna6m9.jpg
// @resource header http://i39.tinypic.com/nejdw4.jpg
// @resource buttons http://storage.casualcollective.com/images/global/buttons.v1.png
// @resource buttonends http://storage.casualcollective.com/images/global/buttonends.v1.png
// @resource forum http://storage.casualcollective.com/images/global/compiled_forum.v1.png
// @resource general http://storage.casualcollective.com/images/global/compiled_general.v10.png
// @resource profile http://storage.casualcollective.com/images/global/compiled_profile.v0.png
// @resource right http://storage.casualcollective.com/images/global/compiled_right.v2.png
// @resource store http://storage.casualcollective.com/images/global/compiled_store.v0.png
// @resource storeitem http://storage.casualcollective.com/images/popups/storeitem.png
// @resource title http://storage.casualcollective.com/images/global/titlebg.png
// @resource play http://storage.casualcollective.com/images/games/playbutton.v1.png
// @resource tab http://storage.casualcollective.com/images/global/boxbg.png
// @resource twitter http://storage.casualcollective.com/images/global/boxbgsm.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .butbg {background-image: url(\''+GM_getResourceURL('background')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .s-img, #st-menu li a, .st-iitem a, .st-catshow {background-image: url(\''+GM_getResourceURL('store')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} .h-featured a, .h-moregames, .gl-playbutton {background-image: url(\''+GM_getResourceURL('play')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter, #sidebar .searchbox {background-image: url(\''+GM_getResourceURL('twitter')+'\');} ');