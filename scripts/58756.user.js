// ==UserScript==
// @name           Google Search Site-block Plus Plus
// @description    Selected web-sites aren't displayed from Google search result.
// @version        1.1
// @author         powchin
// @namespace      http://friendfeed.com/powchin/
// @homepage       http://friendfeed.com/powchin/
// @include        http://www.google.*
// ==/UserScript==

/* == The Original Script Copyright =========
 * modified by code404.
 * http://d.hatena.ne.jp/code404/20070923/1190550216
 * 
 * Written by leva.
 * http://note.openvista.jp/212/
 * 
 * Released under the CCL by-nc-na ja license.
 * http://creativecommons.org/licenses/by-nc-sa/2.1/jp/
/* ======================================= */
// Therefore, the license of this script is under the CCL by-nc-na ja license, too.
// Supported 'AutoPagerize' 0.0.41 or later.

+function(){

const
wanteds = <><![CDATA[
del.icio.us
buzzurl.jp
1470.net
clip.(nifty|livedoor).com/*
(esearch|tag|pt.afl).rakuten.co.jp
psearch.yahoo.co.jp
wiki.livedoor.com/word/*
tech.newzia.jp/*
synclick.jp/*
blog.fc2.com/tag/*
builder.japan.zdnet.com/tag/*
keyword.livedoor.com/*
www.blogpet.net/bookmark/*
seo.kndb.jp/*
www.choix.jp/*
mark.jolt.jp/*
*.rightclicksright.org/*
*.pg-feed.com/*
*.rightclicksright.net/*
*.designmasterdatabase.net/*
*.designlinkdatabase.net/*
*.designrecipedatabase.net/*
*.designiddatabase.net/*
*.thumbnailcloud.net/*
*.basefeed.net/*
bookmark.goo.ne.jp/*
pookmark.jp/*
bookmarks.yahoo.co.jp/*
bookmark.fc2.com/*
1470.net/*
faves.com/*
swik.net/*
buzzurl.jp/*
(a|b|r|s|mgw).hatena.ne.jp
]]></>.toString().split("\n"),
mode = "weaken"; // "hidden" or "weaken",
ap_x = ".//li[@class='g']",
et_x = "//li[@class='g']",
an_x = ".//a[@class='l']",
br_x = ".//h3[@class='r']";

slay($X(et_x));

function slay(results){
  results.forEach(function(ri){
    var anc = $X(an_x, ri)[0];
    wanteds.filter(function(bi){
      return anc.href.match(
        new RegExp(
          "^http:\/\/" + bi.replace(".", "\.").replace("/", "\/") + "\/", "i")
      ) != null ?
          mode == "hidden" ? ri.style.display = "none"
                           : breach($X(br_x, ri)[0], anc)
        : false;
    }) });
}

function breach(ttl, anc){
  anc.style.color = "#999"; // for other scripts
  ttl.style.color = "#999";
  ttl.nextSibling.style.display = "none";
}

// simple version of $X
// @source http://gist.github.com/3242.txt
function $X (exp, ctx) {
  ctx || (ctx = document);
  var expr = (ctx.ownerDocument || ctx).createExpression(exp, function (prefix) {
    return document.createNSResolver(ctx.documentElement || ctx).lookupNamespaceURI(prefix) ||
      ctx.namespaceURI || document.documentElement.namespaceURI || "";
  });
  var result = expr.evaluate(ctx, XPathResult.ANY_TYPE, null);
  switch (result.resultType){
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
      // not ensure the order.
      var ret = [], i = null;
      while (i = result.iterateNext()) ret.push(i);
      return ret;
  }
  return null;
}

// for Autopagerize
document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(e){
    var requestURL = e.newValue;
    var parentNode = e.relatedNode;
    slay($X(ap_x, e.target));
}, false);
}();