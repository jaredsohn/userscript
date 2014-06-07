/*
This script is by: eli smadar
Released under the GPL license.
*/

 // ==UserScript==
 // @name           Replace lang='en-us' to hebrew
 // @namespace      http://mywebsite.com/myscripts
 // @description    replace the lang tag in <div> elements of content of gmail email message so it will be show correctl on firefox with good hebrew support on linux box. debian. it's replace (div lang='en-us') with (div lang='he-il')
 // @include        http://www.gmail.com/*
 // @include        http://gmail.google.com/*
 // @include        https://gmail.google.com/*
 // @include        http://mail.google.com/*
 // @include        https://mail.google.com/*
 // ==/UserScript==

var textnodes;
textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
len=textnodes.snapshotLength;
for(i=0;i<len;++i) {
  if ( textnodes.snapshotItem(i).parentNode.lang == 'EN-US' ) 
       textnodes.snapshotItem(i).parentNode.lang='HE-IL';
  if ( textnodes.snapshotItem(i).parentNode.lang == 'en-us' ) 
       textnodes.snapshotItem(i).parentNode.lang='HE-IL';
}




