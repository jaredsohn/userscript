// ==UserScript==
// @name           Del.icio.us AutoTag
// @namespace      http://e5media.com
// @description    Inserts popular tags automatically into the tag field, if there are no popular tags, it inserts recommended tags.
// @include        http://del.icio.us/*
// ==/UserScript==

var poptags = unsafeWindow['tagPop'];
if (poptags) { // test to make sure we're on the post page
  if (poptags == "") {
    var rectags = unsafeWindow['tagRec'];
    var finaltags = rectags.toString();
  } else {
    var finaltags = poptags.toString();
  }

  var myarray = finaltags.split(",");
  for (var tag in myarray) {
    if (document.getElementById('tags').value.search(/myarray[tag]/) == -1) {
	    document.getElementById('tags').value += myarray[tag] + " ";
	  }
  }
}