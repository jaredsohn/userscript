// ==UserScript==
// @name           Autotopic
// @namespace      myprizee
// @include        http://www.prizee.com/forum/index.php?/topic/*
// ==/UserScript==


if(document.body.innerHTML.search('<div class="message error">')!=-1){location.replace("http://www.prizee.com/forum/index.php?app=forums&module=post&section=post&do=new_post&f=8&autotopic");}else{if(document.body.innerHTML.search("ce message se recrera automatiquement en cas de suppresions")!=-1){setTimeout("location.reload();",10000);}}