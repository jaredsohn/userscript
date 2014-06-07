// ==UserScript==
// @name           Wikipedia undelete
// @url            http://userscripts.org/scripts/source/19097.user.js
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Salvages deleted Wikipedia articles from archive.org, as you encounter them.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        http://*.wikipedia.org/*
// ==/UserScript==

var url = "http://web.archive.org/web/*/" + location.href;
var deleted = $X('//div/p[1][starts-with(.,"This page has been deleted.")]');
var desc = $X('//b[.="Wikipedia does not have an article with this exact name."]');

if (deleted && desc) {
  wget$x(url, gotArchivePage, // scrape the archive.org page for links matching:
         '//a[following-sibling::node()[1][contains(.,"*")]]' + // file changed
         '[starts-with(@href,"http://web.archive.org/web/")]' + // @archive.org
         '[contains(@href,"'+ location.href +'")]');            // for this url
}

function gotArchivePage(links) {
  var ul;
  for each (var a in links) {
    if (!ul) ul = node({ after: desc, tag: <ul/> });
    var li = node({ prepend: ul, tag: <li/> });
    li.appendChild(document.importNode(a, true));
  }
  if (ul) {
    var versions = "version" + (links.length == 1 ? "" : "s");
    node({ before: ul, tag: <><br/><b>Old article {versions} saved for posterity
            thanks to <a href={ url }>archive.org</a>:</b><br/></> });
  }
}
