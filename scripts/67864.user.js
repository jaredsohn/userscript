// ==UserScript==
// @name           Movapic OneClick Add Nice!
// @namespace      http://d.hatena.ne.jp/Aoba/
// @include        http://movapic.com/*
// @version        1.1
// @description    OneClick de add "nice!" at Movapic
// ==/UserScript==
(function(){
	/*
	LDRizeを使う場合、ldrize.user.jsに書き込む携帯百景のSITEINFO（ldrize.user.js 32行目付近）
const SITEINFO = [
{
name:      '携帯百景',
domain:    '^http://movapic.com/*',
paragraph: '//td[contains(concat(" ",@class," "), " image ")]',
link:      './a',
}
]
	*/
	
	// 携帯百景に実装されているAutoPagerに対応するためのドキュメント内容監視（こんなやり方しか思いつかなかった）
	var bodyCount = 0;
	var timerId = setInterval(function(){checkBody();}, 500);
	function checkBody() {
		var bodies = document.getElementsByClassName("autopagerize_page_element");
		var targetBody;
		if (bodyCount < bodies.length) {
			targetBody = bodies[bodies.length - 1];
			bodyCount = bodies.length;
		} else if (0 == bodyCount && 0 == bodies.length) {
			targetBody = document.getElementById("content");
			bodyCount = 1;
		}
		if (targetBody) {
			main(targetBody);
			if (window.Minibuffer) {
				// LDRizeを使う場合のみ意味がある処理
				window.setTimeout(function(){window.Minibuffer.execute('LDRize::paragraph-re-collect');}, 10);
			}
		}
	}
	
	function main(doc) {
		var stars = doc.getElementsByClassName('star');
		for(var i = 0, max = stars.length; i < max; i++) {
			var photoId = stars[i].getAttribute("id").match(/^star-(\d+)$/i);
			var photoNum = RegExp.$1;
			var nice = stars[i].getElementsByTagName("a");
			var f = closure(photoNum); // 引数の参照渡しをやめさせる。もっとスマートに実装できる気がする
			
			var elm = document.createElement("input");
			elm.id = "oneclick_add_nice_" + photoNum + "";
			elm.type = "button";
			elm.value = "add nice!";
			elm.addEventListener("click", f, false);
			insertAfter(elm, nice[0]);
		}
	}
	
	function addNice(photoNum) {
		GM_xmlhttpRequest({
			"method" : "POST", 
			"headers" : {"Content-type":"application/x-www-form-urlencoded"},
			"data" : "id=" + photoNum + "",
			"url" : "http://movapic.com/star/add",
			"onload" : function(){getNice(photoNum);}
		});
	}
	
	function getNice(photoNum) {
		GM_xmlhttpRequest({
			"method" : "GET", 
			"data" : "star-" + photoNum + "",
			"url" : "http://movapic.com/star/list/" + photoNum + "",
			"onload" : function(x){writeNice(photoNum, x.responseText)}
		});
	}
	
	function writeNice(photoNum, text){
		var targetDiv = document.getElementById("star-" + photoNum + "");
		targetDiv.innerHTML = text;
	}
	
	function closure(n){
		return function(){addNice(n)}
	}
	
	function insertAfter(newNode, node) {
		return node.parentNode.insertBefore(newNode, node.nextSibling);
	}
})();
