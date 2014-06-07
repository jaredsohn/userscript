// ==UserScript==
// @name           Github filter news by project
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/?.user.js
// @description    Shows header filters for projects based on number of items.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @include        http://github.com/
// @include        https://github.com/
// ==/UserScript==

var news = $X('id("dashboard")/div[@class="news"]');
var filter = $X('ul[@class="feed_filter"]', news);
var newsItems = './/div[contains(@class,"title")]/' +
  'a[starts-with(@href,"http://github.com/")]';
var parentNewsItem = 'ancestor::div[contains(@class,"alert")][1]';

var projects = {};

function csssafe(name) {
  return name.replace(/[^a-zA-Z_$]+/g, "_");
}

function group(a) {
  var name = a.pathname.split("/").slice(1,3).join("/");
  projects[name] = (projects[name] || 0) + 1;
  var div = $X(parentNewsItem, a);
  div.className = (div.className || "") + " project_"+ csssafe(name);
}

$x(newsItems, news).forEach(group);
for (var name in projects) {
  var count = name.match(/\/(.*)/)[1] +": "+ projects[name];
  var className = "project_" + csssafe(name);
  var toggler = 'javascript:void $(".'+ className +'").toggle()';
  node({ append: filter, tag: <li>|
         <a title={ name } href={ toggler }>{ count }</a></li> });
}
