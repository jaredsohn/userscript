// ==UserScript==
// @name           NicoNiko Ranking Fillter Ver0.2
// @namespace      http://www.yokomek.com/
// @include        http://www.nicovideo.jp/*
// @include        http://tw.nicovideo.jp/*
// ==/UserScript==

(function(){

//	var dt = (new Date()).getTime();

    var w = unsafeWindow || window;
	var ranking = w.document.getElementsByClassName('content_672')[0]
	var extract = null; //抽出セレクトボックス
	var exclude = null; //除外セレクトボックス

	//全ランキング取得
	var rankinglist = new Array();
	var contents = ranking.getElementsByTagName('div');
	for (var i = 0; i < contents.length; i++){
		if( /item[0-9]+_uad_current/.test(contents[i].id)){
			rankinglist.push(contents[i].parentNode);
		}
	};

	//NGキーワード
	var ngword = new Array();

	//ユーティリティクラス
	var Util = {
		addEvent: function (elem, event, func, capture) {
			if (elem.attachEvent) {
				elem.attachEvent("on" + event, func);
			} else if (elem.addEventListener) {
				elem.addEventListener(event, func, !!capture);
			} else {
				elem["on" + event] = func;
			}
		},
		deleteEvent: function (elem, event, func, capture) {
			if (elem.detachEvent) {
				elem.detachEvent("on" + event, func);
			} else if (elem.removeEventListener) {
				elem.removeEventListener(event, func, !!capture);
			} else {
				delete elem["on" + event];
			}
		},
		//セレクトボックスのオプションを作成して追加
		addOption: function( selector, arr ,selected) {
			if( selected == undefined) selected = "";
			for (var key in arr) {
				var opt = document.createElement("option");
				opt.value = key;
				opt.innerHTML = arr[key];
				if (selected == key) opt.selected = true;
				selector.appendChild(opt);
			}
			return selector;
		}
	};


	//mode true NGワードを非表示 ： false NGワード以外を非表示
	var ctrlRanking = function(word,mode){
		for (var i = 0; i < rankinglist.length; i++){
			for (var j = 0; j < word.length; j++){
				var target = rankinglist[i].getElementsByClassName("font12")[0].nextElementSibling;
				if( target.innerHTML.indexOf(word[j]) > 0){
					if(mode) rankinglist[i].style.display="none";
				}else{
					if(!mode) rankinglist[i].style.display="none";
				}
			}
		}
	};

	//全部表示
	var showAll = function(){
		for (var i = 0; i < rankinglist.length; i++){
			rankinglist[i].style.display="";
		}		
	};


	//新着のみ抽出
	var extractNew = function(){
		var dt = new Date();
		for (var i = 0; i < rankinglist.length; i++){
			var target = rankinglist[i].getElementsByClassName("font12")[0].lastElementChild;
			dtr = new Date(target.innerHTML.replace("年","/").replace("月","/").replace("日","/"));
			res = dt - dtr;
			if(res > (24 * 60 * 60 * 1000)){
				rankinglist[i].style.display="none";
			}
		}
	};

	//ランキングセレクトボックス表示
	var showCategoryFillter = function(){
		var switchs = w.document.getElementById('switch').firstElementChild.firstElementChild.lastElementChild;

		//抽出セレクトボックス追加
		switchs.appendChild(document.createTextNode("抽出 : "));		
		
		var extractor = document.createElement("select");
		Util.addEvent(extractor, "change", function(){ runExtract(); } );
		switchs.appendChild(extractor);

		var modes = {
			"none": "-",
			"new": "新着のみ",
			"preset1": "プリセット１",
			"preset2": "プリセット２",
			"preset3": "プリセット３",
		};

		extractor = Util.addOption(extractor,modes);
		extract = extractor;

		//除外セレクトボックス追加
		switchs.appendChild(document.createTextNode(" 除外 : "));	

		var excluder = document.createElement("select");
		
		Util.addEvent(excluder, "change", function(){ runExclude(); } );
		switchs.appendChild(excluder);

		modes = {
			"none": "-",
			"preset1": "プリセット１",
			"preset2": "プリセット２",
			"preset3": "プリセット３",
		};

		excluder = Util.addOption(excluder,modes,"preset1");
		exclude = excluder;
	};

	//抽出する。
	var runExtract = function(adjust){
		if(adjust == undefined ) adjust = false;

		if(adjust){
			showAll();
		}else{
			runExclude(true);
		}

		switch(extract.value){
			case "new" :
				extractNew();
				break;
		}
	};

	//除外する。
	var runExclude = function(adjust){
		if(adjust == undefined ) adjust = false;

		if(adjust){
			showAll();
		}else{
			runExtract(true);
		}

		switch(exclude.value){
			
			case "preset1":
				ngword = new Array("東方","うたってみた","歌ってみた");
				ctrlRanking(ngword,true);
				break;
		}
		
	};

	//実行
    var execute = function() {
		showCategoryFillter();
		runExclude();
    };

	execute();

//	alert( (new Date()).getTime() - dt );

	//スタイルシート編集
	GM_addStyle(<><![CDATA[
		#switch td{
			font-size:12px;
			font-weight:bold;
		}
	]]></>);

})();

