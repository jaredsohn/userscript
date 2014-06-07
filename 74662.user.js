// ==UserScript==
// @name			MagicCardRankFixForChrome
// @namespace		http://userscripts.org/notXX
// @description		qq magic card rank fix for chrome
// @include			http://appimg2.qq.com/card/rank.html
// ==/UserScript==

(function() {
	function fix() {
		window.setTimeout(function (){
			var host = document.getElementById("div_score_rank").style.display != "none" ?
					document.getElementById("ol_score_rank") : document.getElementById("ol_gold_rank");
			var list = document.getElementsByTagName("li");
			for (var i = 0, len = list.length; i < len; i++) {
				var li = list[i];
				if (li.parentNode != host && li.className.indexOf("level_") >= 0)
					host.appendChild(li);
			}
		}, 500);
	}
	window.addEventListener("mouseup", fix, false);
	fix();
})();