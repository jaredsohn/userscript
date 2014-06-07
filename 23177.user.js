// ==UserScript==
// @name           Unpaginate OkCupid journal (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/23177.user.js
// @description    Marks up OkCupid journals with the pagination microformat.
// @include        http://www.okcupid.com/journal*
// ==/UserScript==

// console.info("producing %x", location.href);

var nav = 'id("journal_nav")'; // this is where all the pagination controls live
addMeta("pagination-container", nav);

addMeta("items-xpath", 'id("posts")/div[@class="journalEntry"]'); // post cutter

var next = nav + '/text()[contains(.,"-")]/following-sibling::a'; // next page
addMeta("next-xpath", next);

var a = $X(next);
if (a)
  addLink("next", a.href);


// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function addMeta(name, content) {
  var meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  return document.documentElement.firstChild.appendChild(meta);
}

function addLink(rel, href) {
  var link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  return document.documentElement.firstChild.appendChild(link);
}
