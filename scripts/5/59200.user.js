// ==UserScript==
// @name           Sort WebSphere Library Names
// @namespace      websphere.6.0
// @description    Sort the Shared Library names in WebSphere 6.0 dropdown boxes
// @include        http://rtst1p02.mo.sbc.com:9091/ibm/console/collectionButton.do
// ==/UserScript==
function sortByName(a, b) { 
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

var sel = document.getElementById("selectLibrary");

if (sel) {
  var opts = sel.getElementsByTagName("option");

  var arr = new Array();
  for (var i = 0; i < opts.length; i++) {
    arr[i] = { el: opts[i], name: opts[i].innerHTML }
  }

  arr.sort(sortByName);

  while(opts.length > 0) {
    sel.removeChild(opts[0]);
  }

  for (var i = 0; i < arr.length; i++) {
    sel.appendChild(arr[i].el);
  }
}

