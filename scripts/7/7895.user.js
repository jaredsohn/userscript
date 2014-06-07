// ==UserScript==
// @name           FTP files to directories
// @namespace      http://pile0nades.wordpress.com/
// @description    Rewrites ftp links to point to the folder the file is in
// @include        *
// @exclude        ftp://*
// ==/UserScript==

var ftp = get("//a[starts-with(@href, 'ftp://')]");

for(var i = 0; i < ftp.length; i++) {
  var link = ftp[i];
  if(link.href.charAt(link.href.length-1) != "/") link.href = link.href.slice(0, link.href.lastIndexOf("/") + 1);
}


function get(query) {
  var array = [];
  var result = document.evaluate(query, document, null, 7, null);
  for(var i = 0; i < result.snapshotLength; i++) {
    array.push(result.snapshotItem(i));
  }
  return array;
}