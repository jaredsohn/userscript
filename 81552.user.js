// ==UserScript==
// @name The Pirate Collective
// @namespace Mikau
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://img192.imageshack.us/img192/8283/backroundz.jpg
// @resource header http://img85.imageshack.us/img85/498/header2s.png
// @resource general http://img688.imageshack.us/img688/9559/generalimages.png
// @resource profile http://img715.imageshack.us/img715/4514/profileg.png
// @resource store http://img693.imageshack.us/img693/2148/stored.png
// @resource right http://img227.imageshack.us/img227/4026/sidebarzz.png
// @resource title http://cdn.casualcollective.com/images/site/titlebg.png
// @resource forum http://img28.imageshack.us/img28/1753/forumlj.png
// @resource play http://img191.imageshack.us/img191/7462/playw.png
// @resource footer http://cdn.casualcollective.com/images/site/footer.png
// @resource buttons http://img696.imageshack.us/img696/5552/buttonstarts.png
// @resource buttonends http://img806.imageshack.us/img806/636/buttonends.png
// @resource tab http://cdn.casualcollective.com/images/site/boxbg.png
// @resource twitter http://cdn.casualcollective.com/images/site/boxbgsm.png
// @resource tick http://cdn.casualcollective.com/images/site/tickbox.png
// @resource storeitem http://img204.imageshack.us/img204/9961/storepopup.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .button-newpost, .g-img, .cb-on, .cb-off {background-image: url(\''+GM_getResourceURL('general')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} .s-img, .st-ibuy, .st-cat div {background-image: url(\''+GM_getResourceURL('store')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .groupblock h1, .grouphead h3, .h-forumpulse h1, .boxhead, .boxheading, #widget-shoutbox .ws-input {background-image: url(\''+GM_getResourceURL('title')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .h-featured a, .h-moregames, .gl-playbutton {background-image: url(\''+GM_getResourceURL('play')+'\');} #footer {background-image: url(\''+GM_getResourceURL('footer')+'\');} .butbg, .but span, .dsel span, .usel span {background-image: url(\''+GM_getResourceURL('buttons')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} #sb-twitter {background-image: url(\''+GM_getResourceURL('twitter')+'\');} .cba-on, .cba-off {background-image: url(\''+GM_getResourceURL('tick')+'\');} .popstorePop {background-image: url(\''+GM_getResourceURL('storeitem')+'\');} ');