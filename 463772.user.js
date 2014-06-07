// ==UserScript==
// @name           UserFilter_for_2ch.sc
// @version        1.0.0
// @description    2ch.sc の上部メニューに「.sc抽出」を追加します。クリックで sc ユーザーのみ抽出表示します。
// @include        http://*.2ch.sc/*
// ==/UserScript==


(function(){
	try{

		// --------------------------------------------------------------------------------
		// 上部メニュー
		// --------------------------------------------------------------------------------
		var top_menu = document.getElementsByTagName("div")[0];
		if(top_menu.textContent.search(/■掲示板に戻る■/i) < 0) return;

		var nodes = top_menu.getElementsByTagName("a");
		var anchor = nodes[nodes.length - 1];


		// --------------------------------------------------------------------------------
		// 抽出ボタン
		// --------------------------------------------------------------------------------
		var filter_button = document.createElement("a");
		filter_button.textContent = ".sc抽出";
		filter_button.href = "javascript:void(0);";
		anchor.parentNode.insertBefore(filter_button, anchor.nextSibling);
		anchor.parentNode.insertBefore(document.createTextNode(" "), anchor.nextSibling);
		filter_button.onclick = function(){

			var regexp_id = new RegExp("((ID:[-?a-zA-Z0-9+/.●!]{8,})|([0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{2}[ ][^:]+?[.]net)|(発信元:[^:]+?[.]net)|ID:[?]+.net)","i")
			var nodes = document.getElementsByTagName("dt");
			var i;
			var num = nodes.length;
			for(i=0;i<num;i++){
				var node = nodes[i];
				var m = node.textContent.match(regexp_id);
				if(!m) continue;

				m = m[0].match(/[.]net$/i);
				if(!m) continue;

				var next = node.nextSibling;
				if(next.tagName != "DD") continue;

				node.style.display = "none";
				next.style.display = "none";
			}

			return false;
		};

	}catch(e){
	}
})();
