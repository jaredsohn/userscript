// ==UserScript==
// @name           atsui_canceler
// @namespace      darui.dolpen.net
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

atsui=[
[/猛暑/g, '極寒'],
[/夏/g, '冬'],
[/[日熱]射病/g, '低体温症'],
[/熱中症/g, '低体温症'],
[/(火傷|やけど)/g, '凍傷'],
[/高温/g, '低温'],
[/温(が|の)高/g, '温$1低'],
[/温(が|の)上昇/g, '温$1下降'],
[/温(が|の)上/g, '温$1下'],
[/日(差|ざ)し(が|の)強/g, '日$1し$2弱'],
[/高気圧/g, '低気圧'],
[/エルニーニョ/g, 'ラニーニャ'],
[/温上昇/g, '温低下'],
[/晴れる/g, '吹雪になる'],
[/晴れ/g, '吹雪'],
[/熱帯夜/g, '極寒夜'],
[/([0123456789０１２３４５６７８９十一二三四五六七八九.．・][0123456789０１２３４５６７８９十一二三四五六七八九.．・]+[度℃])/g, 'マイナス$1'],
[/(超える|上回る)/g, '下回る'],
[/上回っ/g, '下回っ'],
[/超え([^、,])/g, '下回り$1'],
[/([度℃分])以上/g, '$1未満'],
[/冷房/g, '暖房'],
[/暑/g, '寒']
];

// 文字列変換
function filter(text){
　for(var i=0;i<atsui.length;i++)
	text = text.replace(atsui[i][0], atsui[i][1]);
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