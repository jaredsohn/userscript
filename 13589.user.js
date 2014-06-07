// ==UserScript==
// @name           CS 246
// @namespace      http://payne.cheng.googlepages.com/
// @description    CS 246 Temporary Link
// @include        http://portal.acm.org/*
// ==/UserScript==
// [IMPORTANT] This script is modified from Clif Kussmaul's script, and is used for CS246 demo only
// // ==UserScript==
// // @name           ACM portal search result augmentation
// // @namespace      http://www.kussmaul.org
// // @description    Search other databases from ACM Portal
// // @include        http://portal.acm.org/*
// // ==/UserScript==

function addLink(label, title, href, target) {
  // replace space and punctuation with +
  target = target.innerHTML.replace(/[?&,:. ]+/g, '+');
  var link = document.createElement('a');
  link.setAttribute('title', title);
  link.setAttribute('href' , href + target);
  link.setAttribute('class' , 'small-link-text');
  link.innerHTML = label;
  return link;
}

function addParserLink(target) {
    var str = document.URL;
    var patt = new RegExp(/id=([\d.]+)/);
    var result = patt.exec(str);
    var id = result[1];
    return addLink(' [Go To ACM-CS246]',  'redirect', 'http://localhost/cgi-bin/citation.cfm?id=' + id + '&rest=', target);
}

function addXMLLink(target) {
    var str = document.URL;
    var patt = new RegExp(/id=([\d.]+)/);
    var result = patt.exec(str);
    var id = result[1];
    return addLink(' [View XML]',  'xml', 'http://localhost/cgi-bin/citation.cfm?id=' + id + '&type=xml&rest=', target);
}


// extract data items and find position to insert links
var title = document.evaluate("//td[@class='medium-text']/strong", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (title) {
  title.parentNode.appendChild(addParserLink(title));
  title.parentNode.appendChild(addXMLLink(title));
}

// vim: sw=4 ts=4 sts=4 expandtab
