// ==UserScript==
// @name			twitter to STOT or URL
// @namespace		http://www.hosimitu.com/
// @description		Usage: edit twitter status, and go matome tool
// @author			hosimitu
// @include			http://twitter.com/*/status/*
// @include			http://twitter.com/*/statuses/*
// @include			https://twitter.com/*/status/*
// @include			https://twitter.com/*/statuses/*
// @include			http://www.hosimitu.com/twitter/api/matome.php
// @version			0.1.1
// ==/UserScript==

/**
 * document.createElement() +アルファな関数
 * attrsに指定した属性を設定し，stylesに指定したCSSプロパティを設定する
 */
function $tag(tagName, attrs, styles){
	var tag = document.createElement(tagName);
	if(attrs){
		for(a in attrs){
			if(attrs.hasOwnProperty(a)){
				tag[a] = attrs[a];
			}
		}
	}
	if(styles){
		for(a in styles){
			if(styles.hasOwnProperty(a)){
				tag.style[a] = styles[a];
			}
		}
	}
	return tag;
}

/**
 * $tagのショートカット定義
 * $div()でdiv要素を生成できるようにする。
 * 引数は$tagの第2引数，第3引数をそのまま第1引数，第2引数として利用できる。
 */
"div p span a img table tr th td form label input textarea button".split(" ").forEach(function(tagName){
	var func = function(attrs, styles){
		return $tag(tagName, attrs, styles);
	};
	eval("$" + tagName + "= func;" );
});

/**
 * document.createTextNode()のエイリアス
 */
function $text(text){
	return document.createTextNode(text);
}

/**
 * Element#appendChild() +アルファな関数
 * 第1引数の要素の末尾要素として第2引数以降で指定する要素を追加する
 * Element.prototypeの関数として定義するほうがスマートになりそうだが，
 * GreasemonkeyではElement要素を直接扱えないのでこの定義方法をとった。
 */
function $add(parent, children){
	if(arguments.length < 2) return "";
	for(var i=1, child; child=arguments[i];i++){
	if(typeof child != "object"){
		child = $text(child+"");
	}
	parent.appendChild(child);
	} 
	return parent;
}

//----------------------------------------------------
// main code
//----------------------------------------------------
var outputText = (function(){
	//----------------------------------------------------
	// output
	//----------------------------------------------------
	var container = document.getElementById('container');
        
	var value = getall();
	var div = $div({id:css("")}); 
	$add(div,
		$add($span({id:css("setumei")}),$text("Twitterの個別ステータス画面のURLを追加していくツール"))
	);
	$add(div,
		$add($div({id:css("click")}),
			$input({id:css("addURL"),value:"追加",type:"button"}),
			$input({id:css("clear"),value:"クリア",type:"button"}),
			$input({id:css("save"),value:"リスト保存",type:"button"}),
			$input({id:css("update"),value:"リスト更新",type:"button"}),
			$input({id:css("tool"),value:"まとめツールへ",type:"button"}),
			$textarea({id:css("textarea"),rows:"10",cols:"45"})
		)
	);
	$add(div,
		$add($span({id:css("footer")}),$text(""))
	);
	setStyle();
        if(document.URL == 'http://www.hosimitu.com/twitter/api/matome.php'){
            var input_textarea = document.getElementById("input_txtarea");
            input_url = getall();
            input_textarea.value = input_url;
        }else{
            $add(container,div);
            addURL();
        };

	//----------------------------------------------------
	// ボタンの上にマウスが来た時のイベント(EventListener)
	//----------------------------------------------------
	//onmouseのエイリアス
	function $onmouse(parent, target, mes){
		document.getElementById(parent).addEventListener("mouseover", function(){
			var footer = document.getElementById(target);
			var a = $add(footer, mes);
		}, false);
	}
	//mouseoutのエイリアス
	function $mouseout(parent, target){
		document.getElementById(parent).addEventListener("mouseout", function(){
			var footer = document.getElementById(target);
			footer.innerHTML = "";
		}, false);
	}
	
	
	$onmouse(css("addURL"), css("footer"), "現在の発言のURLを追加する");
	$mouseout(css("addURL"), css("footer"));
	
	$onmouse(css("clear"), css("footer"), "全URLを削除する");
	$mouseout(css("clear"), css("footer"));
	
	$onmouse(css("save"), css("footer"), "現在のURLを保存する");
	$mouseout(css("save"), css("footer"));
	
	$onmouse(css("update"), css("footer"), "保存されているURLを読み込む");
	$mouseout(css("update"), css("footer"));
	
	$onmouse(css("tool"), css("footer"), "新しいウィンドウにまとめツールを開く");
	$mouseout(css("tool"), css("footer"));

	//----------------------------------------------------
	// ボタンがクリックされた時のイベント(EventListener)
	//----------------------------------------------------
	document.getElementById(css("addURL")).addEventListener("click", function(){
		addURL();
	}, false);
	
	document.getElementById(css("clear")).addEventListener("click", function(){
		clear();
	}, false);

	document.getElementById(css("save")).addEventListener("click", function(){
		save();
	}, false);

	document.getElementById(css("update")).addEventListener("click", function(){
		update();
	}, false);

	document.getElementById(css("tool")).addEventListener("click", function(){
		var tool_window = window.open('http://www.hosimitu.com/twitter/api/matome.php')
		var textarea = document.getElementById(css("textarea"));
		
		var input_textarea = document.getElementById(css("input_textarea"));
		input_textarea.value = textarea.value;
	}, false);

	//----------------------------------------------------
	// function
	//----------------------------------------------------
	//CSSをグリモン専用にするための関数
	function css(name){
		return "_matome_" + name;
	}

	//重複チェックのための関数
	function unique(array) {
		var storage = {};
		var uniqueArray = [];

		var i, value;
		for (i = 0; i < array.length; i++) {
			value = array[i];
			if (!(value in storage)) {
				storage[value] = true;
				uniqueArray.push(value);
			}
		}

		return uniqueArray;
	}
	
	//データ全部を持ってくる
	function getall(){
		var list=GM_getValue("allurl",false);
		return list? list.split(","):[];
	};

	//現在のURLを追加
	function addURL(){
		var url = window.location.href;
		var allurl = new Array();
		allurl = getall();
		allurl.push(url)
		allurl = unique(allurl);
		GM_setValue("allurl",allurl.join("\n"))
		var textarea = document.getElementById(css("textarea"));
		url = getall();
		textarea.value = url;
	};

	function del(url){
		var list = getall();
		for(var i=0; i<list.length; i++) if(list[i]==id) list.splice(i,1);
		GM_setValue("allurl",list.join(","));
		var val=GM_listValues();
		for(var i=0; i<val.length; i++) if(val[i].replace(/[a-z]+_/,"")==id) GM_deleteValue(val[i]);
	};
	
	//現在のテキストエリアを保存する
	function save(){
		var textarea = document.getElementById(css("textarea"));
		GM_setValue("allurl",textarea.value);
	};
	
	//最新の状態へ更新する
	function update(){
		var textarea = document.getElementById(css("textarea"));
		url = getall();
		textarea.value = url;
	};
	
	//URL全部を削除する
	function clear(){
		GM_setValue("allurl","")
		var textarea = document.getElementById(css("textarea"));
		textarea.value = "";
	};
	
	//----------------------------------------------------
	// style css
	//----------------------------------------------------
	function setStyle(){
		var style =
			<><![CDATA[
				#_matome_ {
					margin:0px;
					padding:5px 0 0 10px;
					position:fixed;
					bottom:40px;
					left:0;
					z-index:20000;
					width:488px;
					height:280px;
					background-color:#C3D9FF;
					border-collapse: separate;
					border: 1px solid gray;
				}
				#_matome_ *{
					font-family : Verdana;
					letter-spacing:0.03em;
					line-height:1.2em;
				}
				
				#_matome_setumei {
					font-size:1.4em;
					font-weight:bold;
				}
				#_matome_footer {
					font-size:1.4em;
					font-weight:bold;
				}
				#_matome_click {
					font-size:1.8em;
					font-weight:bold;
				}
				#_matome_addURL, #_matome_clear, #_matome_save, #_matome_update, #_matome_tool {
					font-size:0.5em;
					font-weight:bold;
				}
				]]></>;
		GM_addStyle(style);
	}
})();