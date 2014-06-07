/* Time-stamp: "2006-07-28 00:44:27 ADT" -*-coding: latin-1;-*-             */
// ==UserScript==
// @name          UsePerlOrg_simplifier
// @description   simplify design of use.perl.org pages
// @include       http://use.perl.org/*
// @version       0.0.2
// @namespace     http://interglacial.com/~sburke/pub/
// ==/UserScript==
/*  -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
    !!
    !! This is a Greasemonkey user script.
    !! See http://greasemonkey.mozdev.org/ for info on using such things.
    !!
    -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
*/

if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  style_simplifying();
  engooden_title();
  tidy_links();
}

function style_simplifying () {
  GM_addStyle(
   '#footer,#topnav,#slogan,#slashboxes,.copyright,.btmnav { display: none; }' + 
   'input[type=checkbox][name=submit] { display: none; }'
  );
}

function tidy_links () {
  var links = document.links;
  for(var i = links.length - 1; i>=0; i--) {
    var link = links[i];
    var t;
    if(! (link.childNodes || '').length == 1 ) continue;
    t   = link.childNodes.item(0);
    if( t.nodeName != "#text" ) continue;

    var href = link.href.toString();
    if( (t.data || '').toString().match(/^#\d+$/) &&  href.match(
       /^http:\/\/use\.perl\.org\/(\~[^\/?]+\/journal\/\d+|comments\.pl\?sid=\d+&cid=\d+)$/
    )) {
      t.data = "\xa7";
      if(!link.title) link.setAttribute('title',"Permalink to this item");
      continue;
    }

    if( href.match( /^http:\/\/use\.perl\.org\/\~[^\/?]+\/$/ )) {
      t.data = t.data.toString().replace( /^\s*(\S+)\s+\(\d+\)\s*$/, '$1' );
      continue;
    }
  }
  return;
}

function engooden_title () {
  var m =
   (document.title || '').toString().match(
    /^\s*Journal\s+of\s+(\S+)\s+\(\d+\)\s*$/ );
  if(!m) return;
  var username = m[1];
  if( ! document.location.toString().match(
   /use.perl.org\/~([^\/]+)\/journal\/\d+/ )) return;

  var t =  document.evaluate(
			     "id('journalslashdot')/*[@class='title']/h3",
     document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

  if(t.snapshotLength == 0)  throw("Can't find page title");
  if(t.snapshotLength == 2)  return;

  var text = t.snapshotItem(0).textContent;
  if(text.match( /\S/ )) {
    document.title = text + " : " + username + " : use.perl.org";
  }
  return;
}

//End
