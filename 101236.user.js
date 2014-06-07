// ==UserScript==
// @name CC Cup
// @namespace Anthe
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://cdn.casualcollective.com/images/site/background.png
// @resource header http://img717.imageshack.us/img717/8332/headervbl.png
// @resource general http://cdn.casualcollective.com/images/site/compiled_general2.png
// @resource profile http://cdn.casualcollective.com/images/site/compiled_profile.png
// @resource store http://cdn.casualcollective.com/images/site/compiled_store.png
// @resource right http://cdn.casualcollective.com/images/site/compiled_right.png
// @resource title http://cdn.casualcollective.com/images/site/titlebg.png
// @resource forum http://cdn.casualcollective.com/images/site/compiled_forum.png
// @resource play http://cdn.casualcollective.com/images/site/playbutton.png
// @resource footer http://img846.imageshack.us/img846/5299/footeraj.png
// @resource buttons http://cdn.casualcollective.com/images/site/buttons.png
// @resource buttonends http://cdn.casualcollective.com/images/site/buttonends.png
// @resource tab http://img845.imageshack.us/img845/7592/boxbg.png
// @resource twitter http://cdn.casualcollective.com/images/site/boxbgsm.png
// @resource tick http://img52.imageshack.us/img52/83/tickbox.png
// @resource storeitem http://storage.casualcollective.com/images/popups/storeitem.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} .s-img, .st-ibuy, .st-cat div {background-image: url(\''+GM_getResourceURL('store')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .h-featured a, .h-moregames, .gl-playbutton {background-image: url(\''+GM_getResourceURL('play')+'\');} #footer {background-image: url(\''+GM_getResourceURL('footer')+'\');} .butbg, .but span, .dsel span, .usel span {background-image: url(\''+GM_getResourceURL('buttons')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} .cba-on, .cba-off {background-image: url(\''+GM_getResourceURL('tick')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} ');