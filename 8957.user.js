// ==UserScript==
// @name           Bloglines Relative Link Fixer
// @namespace      http://userscripts.org/users/674;scripts
// @include        http://www.bloglines.com/myblogs_display*
// @include        https://www.bloglines.com/myblogs_display*
// ==/UserScript==

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

var items = $x("//div[@class='content-main']//div[@class='item']//div[starts-with(@id, 'siteItem')]");

items.forEach( function(i){
  var hdlink = $x("//h3//a[@class='bl_itemtitle']", i);
  if (hdlink.length == 0) next;

  var links = $x("//p//a", i);
  links.forEach(function(a){
      if ( a.getAttribute("href").substr(0, 1) == "/" ) {
	    a.protocol = hdlink[0].protocol;
        a.host = hdlink[0].host;
      }
    }
  );
});
