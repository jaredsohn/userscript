// ==UserScript==
// @name           SinekAddon v0.3
// @namespace      http://userscripts.org/users/sinekanone/
// @description    Inverse le sens du titre des onglets & ajoute un lien vers le haut de page
// @version        0.3
// @include        http://www.lebardeswareziens.info/forums/*
// @include        http://www.planete-lolo.com/*
// @include        http://forum.wawa-mania.ws/*
// ==/UserScript==
(function() {
	var titre = document.title;
	var pos = titre.indexOf("/");
	if (pos >= 0){
		document.title = titre.substring(pos + 2, titre.length) + " / " + titre.substring(0,pos - 1);
	}
	$x("//li[@class='postquote']").forEach(function(elt) { elt.parentNode.innerHTML = elt.parentNode.innerHTML + "&nbsp;|&nbsp;<li><a title='haut de page' href='#'>▲</a></li></ul>"; });
  }
)();
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}