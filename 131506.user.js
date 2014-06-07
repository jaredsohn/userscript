// ==UserScript==
// @name         graph365toyoutube
// @version      2.0
// @author       s.shim
// @namespace    s.shim.graph365toyoutube
// @description  洋楽歌詞検索のTube365の検索ページの結果からyoutubeへのリンクを設置します。
// @include      http://tube365.net/index.php*
// @exclude
// ==/UserScript==

(function (d, func) {
	 var h = d.getElementsByTagName('head')[0];
	 var s1 = d.createElement("script");
	 s1.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	 s1.addEventListener('load', function() {
	 var s2 = d.createElement("script");
	 s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
	 h.appendChild(s2);
	 }, false);
	 h.appendChild(s1);
})(document, function($) {
	//設定項目
	//redirect
	var redirect=false;//youtubeへ直接リダイレクトする場合はtrueを選択
	// //設定項目


	//パラメータの配列を返す。
	var GET=function(url){
		if(typeof url=="undefined"){
			url=location.search;
		}
		var vars={};
		if(url!=""){
			var hashes =url.slice(1).split('&'),hash;
		    for(var i = 0; i < hashes.length; i++)
		    {
		      hash = hashes[i].split('=');
		      vars[hash[0]] =hash[1]?hash[1]:null;
		    }
		}
		return vars;
	};

	if(redirect){
		if(document.referrer.indexOf("http://graph.tube365.net/")>-1){
			location.href="http://www.youtube.com/results?q="+GET()["keyword"];
		}
	}
	var q=GET()["keyword"];
	q=q?q:"";

	$("#search_result_block").prepend(
		$("<h3></h3>").append(
			$("<a>youtubeで検索</a>")
				.css({padding:"0.5em",margin:"0.3em",color:"white","background-color":"#08D"})
				.attr("target","blank")
				.attr("href","http://www.youtube.com/results?q="+q)
		).append(
			$("<a>googleで歌詞検索</a>")
				.css({padding:"0.5em",margin:"0.3em",color:"white","background-color":"#08D"})
				.attr("target","blank")
				.attr("href","https://www.google.co.jp/search?q=lyrics "+q)
		)
	);
});