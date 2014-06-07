// ==UserScript==
// @name           ARP reply confirmation
// @namespace      ARP reply confirmation
// @description    Adds a confirmation dialog when replying to an ARP thread
// @include        http://*.forumwarz.com/discussions/reply/*
// @include        http://forumwarz.com/discussions/reply/*
// ==/UserScript==

if(document.body.innerHTML.indexOf('<a href="/discussions/rp">Role-Playing</a>\n&gt;\n<a href="/discussions/topics/7252-advanced-role-playing">Advanced Role-Playing</a>') > -1) {
 if(!confirm("This is an Advanced Role-Playing thread. Are you sure you wish to reply?")){
  history.go(-1);
 }
}