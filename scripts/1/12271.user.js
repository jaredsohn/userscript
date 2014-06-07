// ==UserScript==
// @name           SkipPreview
// @namespace      http://www.dlugosz.com
// @description    Skip preview and link right to the indicated story page.
// @include        http://www.physorg.com/*
// ==/UserScript==

// version 1.1
var verbose= false;

///////
/////// Strip some blocks from the page.

var strip= {
// Comment or uncomment the following lines (or set values to true/false) to configure.
 Video: true,
 Pix: true,
 Popular: false,
 Forumtopics: true,
 Feeds: true,
 Archive: true,
 Only: true,
 Relevant: false,
 Toolbox: true
 };

var contents_rows= document.getElementById ('rows');

function removebox (title) {
 var xpath= ".//div/div[1]/*[name()='H3' or name()='H1'][normalize-space(text())='" + title + "']";
 var n= document.evaluate (xpath, contents_rows, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
 if (!n) {
    if (verbose)  GM_log ("did not find " + xpath);
    return;
    }
//    /**/  n.setAttribute ("debug", title);
 n=n.parentNode.parentNode;
 n.parentNode.removeChild(n);
 if (verbose) GM_log ("removed " + title);
 }

if (strip.Video)  removebox ("PhysOrg Video");
if (strip.Pix)  removebox ("News Pix");
if (strip.Popular)  removebox ("Most popular stories");
if (strip.Forumtopics)  removebox ("Latest forum topics");
if (strip.Feeds)  removebox ("News Feeds");
if (strip.Archive)  removebox ("News Archive");
if (strip.Only)  removebox ("Only on PhysOrg.com");
if (strip.Relevant)  removebox ("Relevant Stories");
if (strip.Toolbox)  {
   var n= document.getElementById ('headTLB');
   if (n) {
      n= n.parentNode;
      n.parentNode.removeChild(n);
      }
   }

///////
/////// Replace preview links with direct link to story.

var pattern= /^\/preview(.+)\.html$/;

function foo (links) {
 for (var i = 0; i < links.snapshotLength; i++) {
    var thisLink = links.snapshotItem(i);
    // do something with thisLink
    var changed= thisLink.pathname.replace(pattern, "news$1.html");
    thisLink.pathname= changed;  // unedited if pattern does not match.
    }
 }

function onNewNode (event)
 {
 var links= document.evaluate ('.//a[@href]', this, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 foo (links);
 }

var tabcontent= document.getElementById ('tabcontent-1');
// "Breaking news" filled via AJAX.
if (tabcontent) {
   tabcontent.addEventListener ('DOMNodeInserted', onNewNode, false);
   }

var allLinks = document.evaluate( 
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
foo (allLinks);
allLinks= null;
