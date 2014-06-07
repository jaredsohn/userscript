// ==UserScript==
// @name		CC+ | Shipwrecked!
// @namespace		https://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/CCplusThemeShipwrecked.user.js
// @description		The Shipwrecked! Theme
// @include		http://www.casualcollective.com/*
// @exclude		http://www.casualcollective.com/radio/*
// @resource		header		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Header.png
// @resource		general		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/General.png
// @resource		buttons		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Buttons.png
// @resource		ends		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Ends.png
// @resource		right		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Right.png
// @resource		forum		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Forum.png
// @resource		profile		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Profile.png
// @resource		store		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Store.png
// @resource		level		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Level.png
// @resource		background	http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Bkgd.png
// @resource		bottle		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Bottle.png
// @resource		footer		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/Footer.png
// @resource		sandBkgd	http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/SandBkgd.png
// @resource		boxBkgd		http://dl.getdropbox.com/u/492373/CC%2BThemes/Shipwrecked%21/BoxBkgd.png
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen { background-image: url(\''+GM_getResourceURL('header')+'\'); }');
GM_addStyle('.but span, .dsel span, .usel span, .butbg { background-image: url(\''+GM_getResourceURL('buttons')+'\'); }');
GM_addStyle('.but a, .dsel, .usel { background-image: url(\''+GM_getResourceURL('ends')+'\'); }');
GM_addStyle('.f-img { background-image: url(\''+GM_getResourceURL('forum')+'\'); }');
GM_addStyle('.p-img, .profilemenu li a { background-image: url(\''+GM_getResourceURL('profile')+'\'); }');
GM_addStyle('#st-menu li a { background-image: url(\''+GM_getResourceURL('store')+'\'); }');
GM_addStyle('.groupblock h1 a.manage, .groupmenu li a, .grouphead a.rightlink, .groupblock h1 a.showhide, #login-cookie a.unchecked, #login-cookie a.checked, .ub-lv, .ub-un, .ub-ex, .groupbox .gb-expand, .groupbox .gb-groupname, .a-log table tr td.icon div, .pamenu ul li a, .grouphead span.p-lo-seen, .close, .wm-topbar a, .ub-more a, .button-ok, .button-cancel, .button-accept, .button-decline, .button-view, .button-close, .button-edit, .button-markread, .button-buy, .button-update, #am_tabs li a, .am-replytoggle a, .sortoptions .gd-sels a, .gd-create, .button-joingame, .button-showgames, .g-img, .cb-on, .cb-off { background-image: url(\''+GM_getResourceURL('general')+'\'); }');
GM_addStyle('#sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img { background-image: url(\''+GM_getResourceURL('right')+'\'); }');
GM_addStyle('#userbox .levelometer .lm-background { background-image: url(\''+GM_getResourceURL('level')+'\'); }');
GM_addStyle('#body { background-image: url(\''+GM_getResourceURL('background')+'\'); }');
GM_addStyle('.sb-s-chat img { background-image: url(\''+GM_getResourceURL('bottle')+'\'); }');
GM_addStyle('#radio .flash, #radio table { background-image: url(\''+GM_getResourceURL('sandBkgd')+'\'); }');
GM_addStyle('#footer { background-image: url(\''+GM_getResourceURL('footer')+'\'); }');
GM_addStyle('#sb-tabs, .CCPlusModule { background-image: url(\''+GM_getResourceURL('boxBkgd')+'\'); }');
GM_addStyle('#surround { background-image: url(\''+GM_getResourceURL('planks1')+'\'); }');
GM_addStyle('#content, .boxcontent, .ms-opts, .a-log { background-color: transparent; }');
GM_addStyle('#gamepulse, #widget-blog, #w-upgrades .wi-icon, #w-upgrades .w-u-u, .sb-sc-info, #sb-b-nobookmarks, .sb-a-title, .sb-a-body, .invitebox, .sb-a-actions, #widget-news, .gm-menu, .st-itemp, .gg-chart, .w-gh-headline, .w-gh-content, .f-pulse, #sb-search, .gm-menu, #ws-shouts, .p-b-comment  { background: url(\''+GM_getResourceURL('planks2')+'\') repeat; }');
GM_addStyle('.group-about, .ms-list, .gm-menu .ms-opts, #gasettings table, .boxcontentpad, .dtab, .a-menu ul, .f-table td { background: transparent url(\''+GM_getResourceURL('planks2')+'\') repeat; }');
