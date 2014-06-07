// ==UserScript==
// @name         oogiriphp can sort ranking view
// @version      1.0.4
// @author       Shimomire
// @namespace    oogiri.symphonic-net.com.shimomire.ranking.sort
// @description  ランキングにソート機能を追加します。
// @include      http://oogiri.symphonic-net.com/two/rank_now.php*
// @include      http://oogiri.symphonic-net.com/one/rank_now.php*
// @include      http://oogiri.symphonic-net.com/rank_now.php*
// @include      http://oogiri.symphonic-net.com/two/rank.php*
// @include      http://oogiri.symphonic-net.com/one/rank.php*
// @include      http://oogiri.symphonic-net.com/rank.php*
// ==/UserScript==

//ユーザー設定
//DBNAME = "ranking.sort";(未使用)

(function (d, func) {
	 var h = d.getElementsByTagName('head')[0];
	 var s1 = d.createElement("script");
	 s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	 s1.addEventListener('load', function() {
	 var s2 = d.createElement("script");
	 s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
	 h.appendChild(s2);
	 }, false);
	 h.appendChild(s1);
})(document, function($) {

	// ソート用拡張JQuery
	var sortingelements = function() {
		$.fn.sortElements = function(comparator) {
			var valueset =new Array();
			for ( var i = 0; i < $(this).size(); i++) {
				valueset[i] = $($(this)[i]);
			}
			valueset.sort(comparator);
			for ( var val in valueset) {
				$(this).parent().append(valueset[val]);
			}
			return $(this.selector,$(this).parent());
		};
	};

	//database用staticメソッド
//	var dbCreate=function(){
//		var data={
//			database:null,
//			init:function(){
//				try {
//					this.database = JSON.parse(window.localStorage.getItem(DBNAME));
//				} catch (e) {
//					this.database = {};
//				}
//				if (this.database == null) {
//					this.database = {};
//				}
//			},
//			reflesh:function() {
//				window.localStorage.removeItem(DBNAME);
//				try {
//					window.localStorage.setItem(DBNAME, JSON.stringify(this.database));
//				}catch(e){
//					console.log("Error inside setItem");
//				}
//			}
//		};
//		data.init();
//		return data;
//	};

	//メイン
	var run = function() {
		var thlist = [ "rank", "name", "hyo","tokoCount", "HRCount",
						"bigHRCount", "No1Count", "aveDev", "lastTime" ];
		var DomInit=function(){
			$("table").each(function(){
				//setId
				for(var th in thlist){
					$("th:eq("+th+")",this).attr("id", thlist[th]);
				}
				//setソートイベント
				$("th:gt(0)",this).each(function(){
					$(this).click(function() {
						var $table=$(this).closest("table");
						if($table.attr("data-doing")!="true"){
							$table.attr("data-doing","true");
							sortReflesh(this);
							$table.attr("data-doing","");
						}
					});
				});
			});
		};
		//ソートイベント
		var sortReflesh = function(x) {
			//プロパティ
			var active=$(x).attr("id");
			var sort=$(x).attr("data-sort") == "desc" ? "asc": "desc";
			var $table=$(x).closest("table");
			var sortindex = thlist.indexOf(active);
			var isnumber=active!="name" && active!="No1Count";
			var itii=active=="No1Count";
			var serchtxt="td:eq(" + sortindex + ")";

			//関数
			var ascSort=!isnumber?!itii?
				function(a,b){
					var _a=$(serchtxt, a).html();
					var _b=$(serchtxt, b).html();
					return _a>_b ?1:-1;
				}:
				function(a,b){
					var _a=$(serchtxt, a).html();
					var _b=$(serchtxt, b).html();
					return Number(_a.slice(0,_a.indexOf("("))) - Number(_b.slice(0,_b.indexOf("(")));
				}:
				function(a,b){
					var _a=$(serchtxt, a).html();
					var _b=$(serchtxt, b).html();
					return Number(_a) - Number(_b);
				};
			var descSort = function(a, b) {
				return -ascSort(a, b);
			};
			var numberformat=function(data,length,val){
				data=data.toString();
				var zerolength=length-data.length;
				for(var i=0;i<zerolength;i++){
					data=val+data;
				}
				return data;
			};

			$("th",$table).each(function() {
				$("span", this).remove();
				if ($(this).attr("id") == active) {
					switch (sort) {
					case "asc":
						$(this).attr("data-sort", "asc").prepend(
								"<span class='asc'>↑</span>");
						break;
					case "desc":
						$(this).attr("data-sort", "desc").prepend(
								"<span class='desc'>↓</span>");
						break;
					default:
						$(this).attr("data-sort", "").prepend("<span></span>");
						break;
					}
				} else {
					$(this).attr("data-sort", "").prepend("<span></span>");
				}
			});
			// テーブル毎だと激重なので1テーブルのみ
			$table.each(function() {
				var $data=$("tr:gt(0)", $(this));
				$data=$data.sortElements(sort == "asc" ? ascSort : descSort);
				for(var i=0,size=$data.size();i<size;i++){
					$("td:eq(0)",$data[i]).html(numberformat(i+1,3,0));
				}
			});
		};
		DomInit();
	};
	$(document).ready(function() {
		sortingelements();
		run();
	});
});