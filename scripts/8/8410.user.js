// ==UserScript==
// @name           Remove <myspace> Tags
// @namespace      Adrian232
// @description    Removes the <myspace></myspace> tags in Forums, Comments, Messages, Profiles, etc.
// @include        http://*myspace.com/*
// ==/UserScript==
// CREDITS: Created by Adrian, using the $x standard by Johan Sundström

//GM_log("Removing <myspace> tags...");
$x("//text()").forEach(function(text) {
	var data = text.data;
	var find = /<\/?myspace>/gi
	//if (data.match(find)) GM_log("myspace tag found");
	data = data.replace(find, '');
	text.data = data;
});
$x("//textarea").forEach(function(textarea) {
	var data = textarea.value;
	var find = /<\/?myspace>/gi
	//if (data.match(find)) GM_log("myspace tag found");
	data = data.replace(find, '');
	textarea.value = data;
});

function $x(xpath, root) { // From Johan Sundström
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}
