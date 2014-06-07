// ==UserScript==
// @name           valentine_canceler
// @namespace      vanallenbelt.team-lab.com
// @include        *
// ==/UserScript==

function $(id){
  return document.getElementById(id);
}
function xpath(query,cont) {
  var results = document.evaluate(query, cont||document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var nodes = new Array();
  for(var i=0; i<results.snapshotLength; i++){
    nodes.push(results.snapshotItem(i));
  }
  return nodes;
}

// 文字列変換
function filter(text){
	text = text.replace(/バレンタイン/g, 'バンアレン帯');
	text = text.replace(/valentine/g, 'vanallen');
	text = text.replace(/Valentine/g, 'Vanallen');
	text = text.replace(/チョコレート/g, '惑星');
	text = text.replace(/チョコ/g, '岩石');
	return text;
}



// Twitter
if(/https?\:\/\/twitter\.com\/.?/.test(document.location.toString())){
function jqcheck(){
  if(!unsafeWindow.jQuery) return setTimeout(jqcheck,100);
  $j = unsafeWindow.jQuery;
$j(document).bind('DOMNodeInserted',function(e){
	$j("p.js-tweet-text").filter(":contains('バレンタイン'),:contains('チョコ')").each(function(){
		var el = $j(this);
		el.text(filter(el.text()));
	});
});
}
jqcheck();



}

// HTMLのテキストノード切り替え（一般ページ）
function walker(node) {
	if (node.nodeType === 3) {
		node.textContent = filter(node.textContent);
	} else if (node.nodeType === 1) {
		if(/^(IFRAME|STYLE|SCRIPT)$/i.test(node.tagName)) {
			// TODO
		} else if (/^(INPUT|TEXTAREA)$/i.test(node.tagName)) {
			node.value = filter(node.value);
		} else {
			var childNodes = node.childNodes;
			for (var i = 0, l = childNodes.length; i < l; ++i) {
				walker(childNodes[i]);
			}
		}
	}
}
document.title = filter(document.title);
walker(document.body || document.documentElement);
if(!/https?\:\/\/twitter\.com\/.?/.test(document.location.toString())){
  document.addEventListener('DOMNodeInserted', function(e) {
    walker(e.target);
  }, false);
}