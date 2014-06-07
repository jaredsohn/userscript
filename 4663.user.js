// ==UserScript==
// @name           open mefi links
// @namespace      ~msn
// @description    puts links on main pages (a red Omega in the small copy) that on clicking open story in new window (and all of its links in new tabs)
// @include        http://*.metafilter.com/
// @include        http://*.metafilter.com/mefi/*
// ==/UserScript==


// on article pages
//CopyPath = "/html/body/div[@id='page']/div[@class='copy']";
CopyPath = "/html/body/div[@id='page']/div[@class='copy']";
if ("metatalk.metafilter.com" == document.location.host)
 CopyPath = "/html/body/div[@class='copy']";   // lovely inconsistancy

LinksSubPath = ".//a[not(..[@class='smallcopy']) and not(starts-with(@href, '/music/')) and not(@href='')]";
// gee. If the html had decent semantics, e.g. there was a <div class="copybody">,
// then the above path could just be "div[@class='copybody']//a"


// on main pages
//SmallCopyPath = "/html/body/div[@id='page']/div[@class='copy']/span[@class='smallcopy' and not(text()='[more inside]')]";
SmallCopyPath = "/html/body/div[@id='page']/div[@id='ajaxcontentarea']/div[@class='copy']/span[@class='smallcopy' and not(text()='[more inside]')]";
if ("music.metafilter.com" == document.location.host)
 SmallCopyPath = "/html/body/div[@id='page']/div[@id='boxy']/div[@id='boxyleft']/div[@class='copy']/span[@class='smallcopy' and not(text()='[more inside]')]";

MoreHrefSubPath = "a[@class='more']/@href";

GM_addStyle('.oit {color: rgb(255,100,100)}');

function XPFirst(node, xpath){
 return document.evaluate(xpath, node, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function XPOrderedSnap(node, xpath){
 return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function Main(event){
 if ('#openInTabs' == document.location.hash)
  openInTabs();
 else if ('/' == document.location.pathname)
  annotatePage();
}
function openInTabs(){
 document.location.hash = ''; // for reloads
 var copyDiv = XPFirst(document,CopyPath);
  var asSnap = XPOrderedSnap(copyDiv, LinksSubPath);
   for (var i=0; i<asSnap.snapshotLength; i++)
    {var a = asSnap.snapshotItem(i).toString();
//      GM_log("\n" + a);
      GM_openInTab(a);
     }
}
function annotatePage(){
 var scSnap = XPOrderedSnap(document, SmallCopyPath);
  for (var i=0; i<scSnap.snapshotLength; i++)
   {var span = document.createElement('span');
    var sc = scSnap.snapshotItem(i);
     var hrefN = XPFirst(sc, MoreHrefSubPath);
      if (!hrefN) continue;                          // mefideletedposts can make this fail.
      var href= hrefN.nodeValue;
       span.innerHTML = '<a href="' + href + '#openInTabs" target=' + document.location.host + href + '><span class="oit">&Omega;</a>';
       sc.appendChild(span);
   }
}
// this may just be superstition, but I've had problems with
// XPath giving out-of-memory errors, and this sort of delay
// seems to fix them.
window.addEventListener('load', Main, false);

