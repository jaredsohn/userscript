// ==UserScript==
// @name           DOMdiff -bookmarklet
// @namespace      http://cheapthinker.shimomire.diff
// @author         shimomire
// @version        0.3
// @description    過去に保存したhtmlと現在のhtmlの差分を比較します。
// @include        *
// ==/UserScript==

//htmlの構造が固定のサイトにのみ有効です。
//データを保存しておくことで過去データとの比較を行うことができます。
//現在単純に差分を比較してるだけなので想定よりも広い範囲で間違いを吐きます。diffアルゴリズムを導入して優先的に修正する予定です。
//ボタンがじゃまなのでアドオンにするか
//ボタン部分のみブックマークレットで配布する予定。

//bookmarklet
//javascript:var lStorage=function(dbname){ var data={ database:null, init:function(){ try { this.database = JSON.parse(localStorage.getItem(dbname)); } catch (e) { this.database = {}; } if (this.database == null) { this.database = {}; } }, reflesh:function() { localStorage.removeItem(dbname); try { localStorage.setItem(dbname, JSON.stringify(this.database)); }catch(e){ console.log("Error inside setItem"); } } }; data.init(); return data; };  var storage=lStorage("cheapthinker.shimomire.diff-"+location.href); storage.database["dom"]=jQuery("body").html(); storage.reflesh(); alert("diff saved");

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
	//iframeは無視。 twitterボタンなどにかぶさってしまう。
	//→bookmarkletに変更
//	if(window != window.parent){
//		return;
//	}
	//ここから
	var lStorage=function(dbname){
		var data={
			database:null,
			init:function(){
				try {
					this.database = JSON.parse(localStorage.getItem(dbname));
				} catch (e) {
					this.database = {};
				}
				if (this.database == null) {
					this.database = {};
				}
			},
			reflesh:function() {
				localStorage.removeItem(dbname);
				try {
					localStorage.setItem(dbname, JSON.stringify(this.database));
				}catch(e){
					console.log("Error inside setItem");
				}
			}
		};
		data.init();
		return data;
	};

	//名前空間の衝突を防ぐ。
	var storage=lStorage("cheapthinker.shimomire.diff-"+location.href);

//	var saveDomData=function(){
//		//test保存。
//		storage.database["dom"]=$("body").html();
//		storage.reflesh();
//		alert("差分の保存が完了しました。");
//	};

	$("body")
//		.append(
//			$("<button>差分保存</button>").css({
//				position:"fixed",left:"0px",bottom:"0px","background-color":"#F00","border-radius":"3px",opacity:"0.5"
//					}).click(saveDomData)
//				)
		.append(
			//異なる場合のstyleを指定
			//デフォルトは背景色　赤のみ
			$("<style> .diff{background-color:#F00}</style>"));

	if(!storage.database["dom"]){
		return;
	}
	//diff
	(function(){
		var oldNode=$("<body>"+storage.database["dom"]+"</body>");
		var newNode=$("body");

		var __search_c=function(oldchildren,newchildren,oldnode,newnode){
			//textnodeでの比較
			if(oldchildren.length>0 && newchildren.length>0){
				for(var i=0,len=Math.min(oldchildren.length,newchildren.length);i<len;i++){
					__search(oldchildren[i],newchildren[i]);
				}
			}else if(oldchildren.length==0 && newchildren.length==0){
				if(oldnode.nodeValue != newnode.nodeValue){
					$(newnode.parentNode).addClass("diff");
				}
			}
		};
		var __search=function(oldnode,newnode){
			__search_c(oldnode.childNodes,newnode.childNodes,oldnode,newnode);
		};
		__search_c(oldNode.toArray(),newNode[0].childNodes);
	})();
});