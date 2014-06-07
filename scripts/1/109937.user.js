// ==UserScript==
// @name           imo.im - smaller design
// @namespace      thekryz
// @description    Makes the friend-list items smaller, so more of them fit in.
// @include        http*://imo.im/*
// @grant          GM_addStyle
// ==/UserScript==

//reduce size of contact field
GM_addStyle("right-sidebar contact.ng-scope.with-proto {height:20px ! important; line-height:18px ! important;}");
GM_addStyle("right-sidebar contact .ng-scope.size-40 {height:20px ! important; width:20px ! important; line-height:20px ! important;}");
GM_addStyle("right-sidebar contact div.img.ng-scope {height:18px ! important; width:18px ! important; line-height:18px ! important;}");
GM_addStyle("right-sidebar contact icon, contact i.icon, contact img.icon {margin:0 4px 1px 1px ! important;}");
GM_addStyle("right-sidebar contact icon .img {height:40% ! important; width:40% ! important;}");
GM_addStyle("right-sidebar contact i.icon .img {height:40% ! important; width:40% ! important;}");
GM_addStyle("right-sidebar contact img.icon .img {height:40% ! important; width:40% ! important;}");

// adjust contacts font size
GM_addStyle("right-sidebar contact .name {font-size: 14px ! important;}");

// adjust the social network icons and stars
GM_addStyle("right-sidebar contacts contact .star, .contacts-bg contacts contact .star, right-sidebar contacts contact .proto, .contacts-bg contacts contact .proto {top:2px ! important;}");
GM_addStyle("right-sidebar contact > .wrapper {width: 150px ! important; font-size:12px;}");
GM_addStyle("right-sidebar contact icon .primitive, contact i.icon .primitive, contact img.icon .primitive {height: 7px ! important; width: 7px ! important; bottom: 3px ! important; right: 0px ! important;}");

// don't blur the line!
GM_addStyle("right-sidebar contact > .wrapper:before {height:17px ! important;}");

// Make "contacts" row smaller
GM_addStyle("right-sidebar.has-chats contacts h1.contacts {height:25px ! important; line-height:15px ! important;}");
GM_addStyle("right-sidebar.has-chats h1.contacts div.title {line-height:20px ! important;}");

// Make favorite contacts bold
GM_addStyle("right-sidebar contacts contact.favorite .name {font-weight:bold ! important;}");