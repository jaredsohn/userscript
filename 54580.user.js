// ==UserScript==
// @name Icons with Paint
// @namespace Hephestus
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource header http://dl.getdropbox.com/u/1666535/Header%20-%20Edited.png
// @resource profile http://dl.getdropbox.com/u/1666535/ProfileButtons%20-%20Edited.png
// @resource right http://dl.getdropbox.com/u/1666535/SidebarButtons%20-%20Edited.gif
// ==/UserScript==

GM_addStyle('#header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} ');