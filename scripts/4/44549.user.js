// ==UserScript==
// @name             gentoo-utils
// @version          0.5
// @namespace        http://sam.intelunix.fr
// @description      http=>https - don't wait for the automatic refresh after editing/creating a post
// @include          http://bugs.gentoo.org/*
// @include          http://forums.gentoo.org/*
// @include          https://forums.gentoo.org/posting.php*
// ==/UserScript==


// http -> https
if (location.href.match(/^http:/)) {
   // try to handle redirection better
   var href_tmp = location.href.toString();
   // e.g.: http://forums.gentoo.org/login.php?redirect=viewtopic.php&p=6353777&sid=0019aabbb344556667788899cddddddf#6353777
   if (href_tmp.match(/http:\/\/forums.gentoo.org\/login.php\?redirect=viewtopic.php&[pt]=/)) {
       // make it like http://forums.gentoo.org/viewtopic-p-6353777.html#6353777
       href_tmp = href_tmp.replace(/\/login.php\?redirect=viewtopic.php&/,'/viewtopic-');
       href_tmp = href_tmp.replace(/=/, '-');
       href_tmp = href_tmp.replace(/&[^#]+/, '.html');
   }   

   location.replace(href_tmp.replace(/^http:/, 'https:'));
   return;
}   

// message just created/edited, refresh the page as soon as it is loaded
// "<meta http-equiv="refresh" content="3;url=viewtopic-p-1111111.html">
if (location.href.match(/\/posting.php/)) {
   var meta = document.evaluate('/html/head/meta[@http-equiv="refresh"][contains(@content,";url=")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
   if (meta)
      location.pathname = document.location.protocol + '//' + document.location.hostname + '/' + meta.content.slice(meta.content.indexOf('=')+1);
}   
