// ==UserScript==
// @name           Amazon Wishlist Ajax
// @namespace      www.dp.cx/userscripts
// @include        http://www.amazon.com/gp/yourstore/*
// ==/UserScript==

function submit_form(wishlist) {
  return function(event) {

	var post_data = ''

	for(item in wishlist.parentNode.elements) {
		var value = wishlist.parentNode[item].value;
		var name = wishlist.parentNode[item].name;
		if (value != undefined && name != undefined)
			post_data += name + '=' + value + '&';
	}
	post_data += wishlist.name + '=' + wishlist.value;

    GM_xmlhttpRequest({
      method:  'POST',
      url:     wishlist.parentNode.action,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Content-type': 'application/x-www-form-urlencoded',
      },
	  data: post_data,
      onload:  function(responseDetails) {
        var root = wishlist.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var rootNext = root.nextSibling;
		var rootNextNext = rootNext.nextSibling;
		while (root.childNodes.length) {
			root.removeChild(root.childNodes[0]);
		}
		while (rootNext.childNodes.length) {
			rootNext.removeChild(rootNext.childNodes[0]);
		}
		while (rootNextNext.childNodes.length) {
			rootNextNext.removeChild(rootNextNext.childNodes[0]);
		}
		return false;
      }
    });
    event.preventDefault();
  };
}

var inputs = document.getElementsByTagName('input');
for(var i = 0; i < inputs.length; i++) {
  var wishlist = inputs[i];
  if(!wishlist.src.match(/wishlist/))
    continue;
  wishlist.addEventListener('click', submit_form(wishlist), true);
}

