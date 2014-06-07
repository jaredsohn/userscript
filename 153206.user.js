// ==UserScript==
// @id             Yahoo!Japan_search
// @name           Yahoo!Japan「タイトルと商品説明」ボタン復元スクリプト
// @version        1.6
// @copyright      Noi & Noisys & NoiSystem & NoiProject
// @license        https://creativecommons.org/licenses/by-nc-sa/3.0/
// @author         noi
// @description    Yahoo!Japanの検索オプション「タイトルと商品説明」を復活させる
// @include        /^https?:\/\/auctions.search.yahoo.co.jp\/search\?*/
// @include        /^https?:\/\/category.auctions.yahoo.co.jp\/list\/*/
// @namespace      https://www.userscripts.org/scripts/show/153206
// @updateURL      https://userscripts.org/scripts/source/153206.user.js
// @run-at         document-end
// ==/UserScript==
/*=====================================================================================================================
**************************************************************
*************** Caution!  [Yahoo!Japan] Only.*****************
**************************************************************


このスクリプトはYahoo!Japanがかつて表示していた「タイトルと商品説明」を復活させるためのスクリプトです。
「あいまい検索」ボタンも追加しました。

このスクリプトに関して、すべてにおいて自己責任にてご使用下さい。

なお、万が一Yahoo!Japanより公開停止要請があった場合、即刻公開中止いたしますのでご了承下さい。
その場合、ご利用を中止してください。

備忘録：「タイトルと商品説明」で検索すると、URLの引数に「?f=0x4」付く
	ただし、だからといって単純に「?f=0x4」だけ追記しても表示が変わらないので他にもファクターがあると思われる?
	「タイトル」検索に戻す場合は「?f=0x2」
	「あいまい検索」は「?ngram=1」
	http://auctions.search.yahoo.co.jp/search?ei=UTF-8&p=「検索文字列」&auccat=「カテゴリーID」
	http://category.auctions.yahoo.co.jp/list/「カテゴリーID」/

=====================================================================================================================*/
(function(){

	//変数---------------------------------------------------------------------------------------
	//共通
	var nowURL =window.location.href;			//現在のページの完全なＵＲＬの取得
	var targetId = document.getElementById('S_Items');		//追加したい場所の要素取得
	var tagName = targetId.getElementsByTagName('ul');		//追加したい場所をさらに特定する
	var hiddenElm = "";					//検索オプションをつけるとhiddenで追加される要素
	//「タイトルと商品説明」
	var addTagText;						//今回追加するHTML文
	var elmTagName = "f";					//追加するタグのname
	var elmTagId = "ni03";					//追加するタグのid
	var elmTagValue1 = "0x4";				//追加するタグのvalue(「タイトルと商品説明」検索)
	var elmTagValue2 = "0x2";				//追加するタグのvalue(通常検索)
	var elmTagText = "タイトルと商品説明";			//追加するタグのテキスト文
	var hiddenTagName = "f";				//検索後何やら追加されるhiddenのname
//	addTagText = '<li><input type="checkbox" name="f" id="ni03" class="cb" value="0x4"><label for="ni03">タイトルと商品説明</label></li>';
	//「あいまい検索」
	var addAimaiText;					//今回追加するHTML文
	var elmAimaiName = "ngram";				//追加するタグのname
	var elmAimaiId = "ni04";				//追加するタグのid
	var elmAimaiValue1 = "1";				//追加するタグのvalue(「タイトルと商品説明」検索)
	var elmAimaiValue2 = "0";				//追加するタグのvalue(通常検索)
	var elmAimaiText = "あいまい検索";			//追加するタグのテキスト文
	var hiddenAimaiName = "ngram";				//検索後何やら追加されるhiddenのname
//	addAimaiText = '<li><input type="checkbox" name="ngram" id="ni04" class="cb" value="1"><label for="ni04">あいまい検索</label></li>';
	document.createElement("aimai_tag");			//「aimai_tag」タグ追加
	var hiddenAimai = document.getElementsByName('ngram');	//検索オプションをつけるとhiddenで追加される要素


//alert(targetId.innerHTML);	//テスト用
//alert(tagName[0].innerHTML);	//テスト用


	//「タイトルと商品説明」---------------------------------------------------------------------

	//HTMLタグ生成
	addTagText = addHtml(elmTagName,elmTagId,elmTagValue1,elmTagText);

	//「タイトルと商品説明」の追加
	tagName[0].insertAdjacentHTML('beforeend',addTagText);

	//検索後チェックボックスにチェックを入れる(yahooの仕様に揃えるため)
	if(window.location.search.indexOf(elmTagValue1) != -1){
		document.ni[elmTagId].checked = true;
	}

	//チェックボックスのクリックに応じてhidden要素を書き換える
	document.ni[elmTagId].addEventListener("click", function() {changeHidden(elmTagId,hiddenTagName,elmTagValue1,elmTagValue2)},false);



	//「あいまい検索」----------------------------------------------------------------------------
	
	//文書生成
	addAimaiText = addHtml(elmAimaiName,elmAimaiId,elmAimaiValue1,elmAimaiText);

	//「あいまい検索」の追加
	tagName[0].insertAdjacentHTML('beforeend',addAimaiText);

	//検索後チェックボックスにチェックを入れる(yahooの仕様に揃えるため)
	if(window.location.search.indexOf("ngram=1") != -1){
		document.ni.ni04.checked = true;
	}

	//チェックボックスのクリックに応じてhidden要素を書き換える
	document.ni[elmAimaiId].addEventListener("click", function() {changeHidden(elmAimaiId,hiddenAimaiName,elmAimaiValue1,elmAimaiValue2)},false);



	//関数----------------------------------------------------------------------------------------

	//HTMLタグ生成
	function addHtml(name,elmid,elmvalue1,text){

		var text = '<li><input type="checkbox" name="' + name
			+ '" id="' + elmid
			+ '" class="cb" value="' + elmvalue1
			+ '"><label for="' + elmid
			+ '">' + text
			+ '</label></li>';

		return text;
	}


	//チェックボックスのチェックを外したら通常検索に戻す
	function changeHidden(id,name,value1,value2){
		hiddenElm = document.getElementsByName(name);

		//エラー対策(検索前はこのinputタグがないため)
		if(hiddenElm.length > 1){
			for(i=0;i<hiddenElm.length;i++){
				if(document.ni[id].checked){
					hiddenElm[i].value = value1;
				}else{
					hiddenElm[i].value = value2;
				}
			}
//alert(hiddenElm[2].value);	//テスト用
		}
	}


})();
//=====================================================================================================================
