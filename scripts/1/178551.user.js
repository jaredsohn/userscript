// ==UserScript==
// @name           NT Stalkmaster 4000
// @namespace      https://nordic-t.me
// @include 	   *nordic-t.me*
// @description    NT Stalkmaster 4000
// @version        1.0
// ==/UserScript==

function addFunction(func, exec) {
  var script = document.createElement("script");
  script.textContent = "-" + func + (exec ? "()" : "");
  document.body.appendChild(script);
}

function stalk () {
    jQuery('a[href*="scontent"]').each(function(index, para) {
	var a = para.getAttribute('href');
	b = a.split("_");

	newurl = "https://www.facebook.com/photo.php?fbid=" + b[1];

	jQuery(this).parent().append('<br /><a target="_BLANK" href="' + newurl + '">Stalkmaster 4000</a>');
});
}

addFunction(stalk, true);