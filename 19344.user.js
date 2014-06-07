// ==UserScript==  -*- coding:utf-8 -*-
// @name           Fold comments
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/19344.user.js
// @description    Folds comments and the like by XPath expressions.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @include        http://*
// ==/UserScript==

var debug = GM_getValue("debug", false);

var wpcomments = ['id("comments")','following-sibling::*[last()]','../ol/li'];
var lolsumptin = {
  comment:['id("comments")',
           'following-sibling::*[not(.//textarea)][last()]',
           '//div[starts-with(@id,"div-comment-")]']
};

// Map site name to fold handlers. Indices mark what to fold, values how. The
// array lists xpath expressions to start (and optional end point, if another
// node) of what to fold, the optional third argument an expression used to
// count (and show) how many somethings were folded. Both latter expressions
// may be relative to the start node. (Alternatetively, an array with a single
// element enumerating all comments can be given, from which first, last and
// count expressions will be generated.)
var data = {
  "blog.wired.com":{
    comment:['//div[@class="comment"]'],
    categorie:['//img[contains(@src,"RRheadings/hed_categories")]',
               'following-sibling::div[1]', 'following-sibling::div/div/ul/li']
  },
  "\\.wordpress\\.com$":{
    comment:['id("comments")','id("respond")/preceding-sibling::*[1]',
             'following-sibling::dl[@class]/dd']
  },
  "intertwingly.net":{
    comment:['id("comments")','following-sibling::*[@class="comment"][last()]',
             'following-sibling::*[@class="comment"]']
  },
  "blog.jonudell.net":{ comment:wpcomments },
  "www.schneier.com":{
    comment:['//div[@class="commentform"]','following-sibling::div[last()]',
             '//div[@class="commentbody"]'],
    "archived link":['//h3[.="Recent Entries"]','following-sibling::ul[3]',
                     '../ul/li']
  },
  "webkit.org":{
    comment:wpcomments,
    "archive link":['//li[@class="subtitle" and .="Archives"]',
                    'following-sibling::li[last()]',
                    'following-sibling::li']
  },
  "userscripts.org":{
    comment:['//table[@class="comments posts wide"]',,'tbody/tr[@id]']
  },
  "www.antiwar.com":{
    comment:['id("comments")', '//div[contains(@class,"commentlist")]',
             '..//div[not(@id="addcomment") and starts-with(@class,"comment")]']
  },
  "www.guardian.co.uk":{
    "related article":['id("related-info")/h2',
                       'id("related-articles")',
                       'id("related-articles")/ul/li']
  },
  "www.independent.co.uk":{
    comment:['//div[@id="comments"]',,
	     './/div[@class="comments-body"]//div[@class="comment-body"]']
  },
  "ejohn.org":{
    comment:['id("comments")','id("commentlist")','id("commentlist")/li']
  },
  "radaronline.com":{
    comment:['//div[@class="entry-footer"]',,'.//div[@class="commentBody"]']
  },
  "www.expressen.se":{
    article:['(id("article")/following-sibling::*)[1]',
             'following-sibling::*[last()]',
             '../div[starts-with(@class,"slot ")]'],
    block:['id("rightcol")',,'div[starts-with(@class,"block")]'],
    left:['id("nav-wrap")',,'.//div[@class="contentpush"]']
  },
  "www.vk.se":{
    snippet:['//div[@class="column_tertiary"]',,'h5'],
    comment:['//h2[.="Kommentarer"]','(following-sibling::div)[1]',
             '//table[@class="commenttable"]'],
    teaser:['//div[@class="teaser"]','(//div[@class="teaser"])[last()]',
            '//div[@class="teaser"]'],
    telegram:['//div[@class="column_secondary"]',,'ul/li'],
    blahblah:['//div[@class="column_tertiary last"]'],
    menuitem:['id("mainmenu")','//ul[@class="submenu"]','li']
  },
  "\\.theoildrum\\.com$":{
    comment:['id("comments")','id("footer")','.//div[@class="comment"]']
  },
  "www.okcupid.com":{
    visitee:['id("lsRecent")','id("lsRecentContent")',
             'id("lsRecentContent")/a'],
    favorite:['id("lsFavorites")','id("lsFavoritesContent")']
              //'id("lsFavoritesContent")/ul[not(@style)]/li']
  },
  "paulgraham.com":{
    note:['//b[.="Notes"]',
          '//a[starts-with(@name,"f")][last()]/following-sibling::br[1]',
          '../a[starts-with(@name,"f")]'],
    comment:['id("dsq-comments-count")',
             'id("dsq-pagination")',
             '//*[@class="dsq-comment"]']
  },
  "www.codinghorror.com":{
    comment:['//div[@class="comments-head"]',
             '//div[@class="comments-body"][last()-1]',
             '//div[@class="comments-body"][position()<last()]']
  },
  "\\.blogspot\\.com$":{
    comment:['id("comments")',,'id("comments-block")//dt[starts-with(@id,"c")]']
  },
  "www.antipope.org":{
    comment:['id("comments")',,'div[@class="comment"]']
  },
  "blogg.aftonbladet.se":{
    comment:['id("comments")/h2','../dl[last()]','../dl']
  },
  "tianmi.info":{
    comment:['//*[name()="h3" and .="Kommentarer:"]',
             '//*[name()="a" and @name="form"]',
             '//*[name()="div" and @class="comment"]'],
    "old post":['//*[name()="h3"][*[@src="/blogge/img/artiklar.png"]]',
                '../*[name()="p"][following-sibling::*[1][name()="div"][*[name()="form"]]]',
                '../*[name()="p" and not(@class)][not(preceding-sibling::*[name()="div"][*[name()="form"]])]'],
    "left column filler":['//*[parent::*[@class="vänster"]][2]',
                          '//*[parent::*[@class="vänster"]][last()]',
                          '//*[parent::*[@class="vänster"]][position()>1]'],
    "right column filler":['//*[parent::*[@class="höger"]][5]',
                           '//*[parent::*[@class="höger"]][last()]',
                           '//*[parent::*[@class="höger"]][position()>4]']
  },
  "www.techcrunch.com":{
    //trackback:['id("trackbacks")','following-sibling::div',]
  trackback:['(//ol[@class="commentlist"])[1]',,'li'],
    comment:['(//ol[@class="commentlist"])[2]',,'li']
    //comment:['//ol[@class="commentlist"][preceding::h3[.="Comments"]]',,'li']
  },
  "pogue.blogs.nytimes.com":{
    comment:['id("blog_comments")',,'ul/li']
  },
  "blog.brokep.com":{
    comment:['id("comments")/h3','following::dl','id("comment_list")/dt']
  },
  "www.fourhourworkweek.com":{
    comment:['id("comments")',,'id("comment_list")/*']
  },
  "hackademix.net":{
    comment:['id("comments")','following::ol','(following::ol)[1]/li']
  },
  "adblockplus.org":{
    comment:['id("comment")','following::ol','(following::ol)[1]/li']
  },
  "extjs.com":{
    comment:['id("comments")','following::ol','(following::ol)[1]/li']
  },
  "dilbert.com":{
    comment:['//div[@class="CMT_CommentList"]',,'div']
  },
  "icanhascheezburger.com":lolsumptin,
  "totallylookslike.com":lolsumptin,
  "punditkitchen.com":lolsumptin,
  "engrishfunny.com":lolsumptin,
  "onceuponawin.com":lolsumptin,
  "ihasahotdog.com":lolsumptin,
  "roflrazzi.com":lolsumptin,
  "graphjam.com":lolsumptin,
  "failblog.org":lolsumptin,
  "code.google.com": {
    comment:['id("commentlist")//*[@class="artifactcomment"]']
  },
  "blog.chromium.org": {
    comment:['id("comments")',,'id("comments")//dt[starts-with(@id,"c")]']
  },
  "vimeo.com":{
    comment:['//ul[@id and @class="comments"]',,'//ul[@id and @class="comments"]/li[@class]/a[@name]']
  }
};

var togglers = []; // all fold/unfold functions
var divs = []; // all folded sections
var host = location.hostname.toLowerCase();
var hide = data[host];
if (hide)
  debug && console.info("Folding to rule %x: %x", host, hide);
else
  for (var re in data)
    if (/[^a-z0-9.-]/i.test(re) &&
	(host.match(re) ||
	 /^xn--/.test(host) && IDNAtoASCII(host).match(re))) {
      hide = data[re];
      debug && console.info("Folding to regexp rule %x: %x", re, hide);
      break;
    }
try {
  for (var unit in hide) {
    var args = hide[unit];
    if (args.length == 1 && $x(args[0]).length > 0) {
      args[2] = args[0]; // count
      args[1] = '('+ args[0] +')[last()]';
    }
    args[3] = unit;
    fold.apply( this, args );
  }
} catch(e) {}

if (divs.length) {
  document.body.addEventListener("click", unfoldOnIntraLinkClick, true);
}

function IDNAtoASCII(hostname) {
  var a = document.createElement("a");
  a.href = "http://" + hostname + "/";
  return a.hostname;
}

function unfoldOnIntraLinkClick(e) {
  function unfoldFolded(div, n, all) {
    if (div) {
      togglers[n](!!"unfold");
    }
  }
  var a = $X('ancestor-or-self::a[1]', e.target);
  if (a) {
    debug && console.log("Unfold %s", a.hash);
    hasAnchor(a.hash).forEach(unfoldFolded);
  }
}

function getYPos(node, y) {
  y = (y || 0) + node.offsetTop;
  if (node.offsetParent)
    return getYPos(node.offsetParent, y);
  return y;
}

function hasAnchor(hash, div) {
  function hasId(root) {
    return $x('count(.//*[@id="'+ id +'" or @name="'+ id +'"])', root) && root;
  }
  function hasXPath(root) {
    var node = $X(xp);
    var root_contains_node = 1<<4;
    return (root.compareDocumentPosition(node) & root_contains_node) ? 1 : 0;
  }
  if (!hash) return [0];
  var haystack = div ? [div] : divs;
  var id = (hash || "").replace(/^#/, "");
  var xp = /^xpath:(.*)/i.match(id);
  if (xp) {
    xp = decodeURIComponent(xp[1]);
    return haystack.map(hasXPath);
  }
  return haystack.map(hasId);
}

// Seeks out the start and end node, folds the content (including the start and
// end node) and annotates the folded section with the count and type of things
// it purportedly contains, as well as how many (vertical) pagefuls it spanned.
//
// As a bonus, it uses the "count" XPath expression to mark up the page with the
// part of the pagination microformat that tracks items. (This makes my keyboard
// shortcuts script feeding off of those able to key through a comment at a time
// when unfolded, without shifting eye focus much, making skimming much easier.)
function fold( from, to, countXPath, unit ) {
  var r = document.createRange();
  var f = typeof from == "string" ? $X( from ) : from;
  var t = typeof to == "string" ? $X( to, f ) : to || f;
  var p = f.parentNode;
  var count = countXPath ? $x(countXPath, f).length : "";
  if (debug) {
    console.info("Folding %d %x to %x; %scommon parent", count, f, t,
                 p==t.parentNode ? "" : "un");
  }
  if (count === 0) return null;
  if (!f || !t || f.parentNode != t.parentNode)
    throw new Error(!f?"No from node":!t?"No to node":"Different parent nodes");

  addMeta("items-xpath", countXPath);

  r.setStartBefore(f);
  r.setEndAfter(t);
  var dy = getYPos(t) + t.offsetHeight - getYPos(f);
  var pagefuls = Math.round(dy / innerHeight);
  var div = document.createElement("div");
  r.surroundContents(div);

  var title = "Toggle "+ count +" "+ (unit || "comment") + (count==1?"":"s");
  if (pagefuls > 0)
    title += " ("+ pagefuls +" pageful"+ (pagefuls==1?"":"s") +")";
  addToggleBefore(title, div, null, div);
  var toggler = addToggleBefore(title, p, div, div);
  if (!hasAnchor(location.hash, div)[0]) toggler(); // fold unless referenced
  togglers.push(toggler);
  divs.push(div);
  return div;
}

function addToggleBefore(title, p, node, div) {
  function toggle(state) {
    if ("boolean" != typeof state)
      state = !!div.style.display;
    div.style.display = state ? "" : "none";
  }

  var a = document.createElement("a");
  a.addEventListener("click", toggle, false);
  a.style.cursor = "pointer";
  a.innerHTML = title;

  p.insertBefore(a, node);
  return toggle;
}
