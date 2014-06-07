// ==UserScript==
// @name Dark Red CC+ Theme
// @namespace Josh Gittinger (ASDM)
// @include http://casualcollective.com/*
// @include http://www.casualcollective.com/*
// @exclude http://www.casualcollective.com/radio
// @resource background http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/background.png
// @resource header http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_header2v2.png
// @resource buttons http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_rightv3.png
// @resource buttonends http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/buttonendsv3.png
// @resource forum http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_forumv1.png
// @resource profile http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_profilev0.png
// @resource right http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_generalv11.png
// @resource store http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/compiled_store.png
// @resource tab http://i651.photobucket.com/albums/uu232/AWESOMESUPERDUDEMAN/buttonsv3.png
// ==/UserScript==

GM_addStyle('body {background-image: url(\''+GM_getResourceURL('background')+'\');} #header, #topmenu ul li a, #loginbox, #userbox, #radioinfo, .radio-listen {background-image: url(\''+GM_getResourceURL('header')+'\');} .butbg {background-image: url(\''+GM_getResourceURL('background')+'\');} .but a, .dsel, .usel {background-image: url(\''+GM_getResourceURL('buttonends')+'\');} .f-img {background-image: url(\''+GM_getResourceURL('forum')+'\');} .p-img, .profilemenu li a {background-image: url(\''+GM_getResourceURL('profile')+'\');} #sb-twitter a.sb-t-but, #sb-mc-friends-divider a.sb-mc-showoff, #sb-mc-friends-divider a.sb-mc-hideoff, #login-submit, .button-register, #logoutbox, #userbox a.ulink, .button-join, .button-playing, .button-find, .button-findon, .button-searchb, .button-searchbon, .r-img {background-image: url(\''+GM_getResourceURL('right')+'\');} .s-img, #st-menu li a, .st-iitem a, .st-catshow {background-image: url(\''+GM_getResourceURL('store')+'\');} #sb-tabs, .a-log {background-image: url(\''+GM_getResourceURL('tab')+'\');} ');