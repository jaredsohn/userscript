// Thanks to irc.dal.net #javascript and yegs
// Made by yegs, Idea and finding yegs woofcat145
// Updates and help from "anonymous" Thanks alot.
// ==UserScript==
// @name            filelist ad killer
// @namespace       www.filelist.org
// @description     Remove tons of useless stuff from filelist.
// @include         http://www.filelist.org/browse.php
// @include         http://filelist.org/browse.php
// @include         http://www.filelist.org/browse.php?page=*
// @include         http://filelist.org/browse.php?page=*
// @include	    http://filelist.org/browse.php?cat=*
// @include	    http://www.filelist.org/browse.php?cat=
// ==/UserScript==
(function() {
   var t1 = document.getElementById("table1");
   var t3 = t1.parentNode;
   while (t3.nodeName.toLowerCase() != "table") {
       t3 = t3.parentNode;
   }
   var t2 = t3.nextSibling;
   while ((t2) && (t2.nodeName.toLowerCase() != "table")) {
       var x = t2;
       t2 = t2.nextSibling;
       x.parentNode.removeChild(x);
   }
   t3.parentNode.removeChild(t3);
   if (t2) {
       t2.parentNode.removeChild(t2);
   }
   //document.getElementsByTagName('form')[0].style.display='none';
   var foo;
   foo = document.getElementsByTagName('form')[1];
   foo = foo.parentNode.parentNode.parentNode.parentNode;
   foo = foo.parentNode.removeChild(foo);

   //remove some blank paragraphs taking up space
   var bar, baz;
   bar = document.evaluate(
       "//html/body/table/tbody/tr[3]/td/p",
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);
   baz = bar.snapshotItem(0);
   baz.parentNode.removeChild(baz);
   baz = bar.snapshotItem(1);
   baz.parentNode.removeChild(baz);
})();
