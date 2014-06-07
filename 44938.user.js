// ==UserScript==
// @name           twitter old pagination
// @namespace      pickle.me.uk
// @description    Changes more button back to old pagination links.
// @include        http://twitter.com/*
// ==/UserScript==

var pagination = document.getElementById('pagination');
if (pagination) {
  var page = 1;
  var re = /page=(\d+)/;
  var match = re.exec(window.location.search);
  if (match) {
    var links = '';
    page = parseInt(match[1]);
    if (page > 1) {
      var prevPage = window.location.href.replace(re, "page="+(page-1));
      links += '<a href="'+prevPage+'">Previous page</a> ';
    }
    var nextPage = window.location.href.replace(re, "page="+(page+1));
    links += '<a href="'+nextPage+'">Next page</a>';
    pagination.innerHTML = links;
  }
  else {
    var nextPage = window.location.href + '?page=2';
    pagination.innerHTML = '<a href="'+nextPage+'">Next page</a>';
  }
}
