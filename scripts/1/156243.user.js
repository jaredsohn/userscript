// ==UserScript==
// @id             YahooJapanAuctionSecurity@noi
// @name           YahooJapanAuctionSecurity
// @version        1.2
// @copyright      Noi & Noisys & NoiSystem & NoiProject
// @license        https://creativecommons.org/licenses/by-nc-sa/3.0/
// @author         noi
// @description    このスクリプトはYahoo!Japanが提供する「トラブル口座リスト」を元に、口座番号と一致する数字を警告します。(誤検出も多いので注意)
// @include        http*://contact.auctions.yahoo.co.jp/*
// @include        file:///D:/Desktop/*
// @namespace      https://www.userscripts.org/scripts/show/117908
// @updateURL      https://userscripts.org/scripts/source/156243.user.js
// @run-at         document-end
// ==/UserScript==

/*=====================================================================================================================
**************************************************************
*************** Caution!  [Yahoo!Japan] Only.*****************
**************************************************************


このスクリプトはYahoo!Japanが提供する「トラブル口座リスト」を元に、口座番号と一致する数字を警告します。

通常は口座番号は取引ナビにてやり取りするものと思われるため、取引ナビのページのみチェック対象にしています。

もしトラブル口座と一致した場合は、警告文を表示します。

※単純なマッチングのため、誤検出する可能性があります。


・トラブル口座リスト(Yahoo!Japanサイト)
http://info.auctions.yahoo.co.jp/f/trouble/


※口座番号について
2012/11/25現在、登録されている口座番号は4桁～8桁となります。
取引ナビの文章から数字でマッチングをかけるため、誤検出する恐れがあるのでご容赦下さい。
理由は、「銀行番号 + 支店番号 + 口座番号」のようにつなげて書く人もいるため、下4桁～8桁全て検索対象にするからです。


※個人的備忘録
// @include        file:///D:/Desktop/*
開発の際は↑のように指定したテスト用スクリプトを別途用意し、
HDDに保存した取引ナビページの内容を書き換えてローカル環境で作った。
Scriptishのセキュリティも変更。

=====================================================================================================================*/

//プログラム部==================================================================================================

(function(){

	//変数宣言--------------------------------------------------
	//トラブル口座ページ
	var numFlg = 14;							//トラブル口座番号部分指定(smallタグの15個目)
	var nameFlg = 15;							//トラブル口座の名義部分指定(smallタグの16個目)
	var troubleNum = 0;							//トラブル口座番号
	var troubleName = "";							//トラブル口座名義（名字のみ）
	//取引ナビ別ページ
	var strNavi = document.getElementsByClassName('ptsMessageArea')[0];	//取引ナビのメッセージ文章取得用
	var numNavi = "";							//数字だけを半角化したコメント(口座チェック用一時データ)
	regMax = new RegExp(/[0-9]{,8}/g);					//口座名義の最大の桁数以下(8桁)
	regMin = new RegExp(/[0-9]{4,}/g);					//口座名義の最小の桁数以上(4桁)
	var maxKeta = 8;							//口座名義の最大の桁数(8桁)
	var minKeta = 4;							//口座名義の最小の桁数(4桁)
	var alartMsg = "";							//警告文
	document.createElement("alart_tag");					//「alart_tag」タグ追加
	document.createElement("alart_num");					//「alart_num」タグ追加
	var tagName = strNavi.getElementsByTagName('alart_num');		//追加したい場所をさらに特定する


	//プログラム--------------------------------------------------


//throw strNavi.innerHTML;

	//本文の数字を全て半角数字にする
	numNavi = CharCodeChange(strNavi.innerHTML);

	//トラブル口座チェック
	if (numNavi != null){
		CheckTroubleNumber(numNavi);
	}
	
//throw strNavi.innerHTML;

//ユーザー関数==================================================================================================

	//トラブル口座情報チェック--------------------------------------------------
	function CheckTroubleNumber(trNum){

		var kouzaNum = trNum.match(regMin);			//口座番号の最小桁数以上の数字のみを抽出した配列
		

		if (kouzaNum != null){
		
			//まずは取引ナビ内の文章から口座番号らしき数字を抜き出す
			for (i = 0; i < kouzaNum.length; i++){
				for (j= minKeta; j <= maxKeta & j <=kouzaNum[i].length; j++){

					var kouzaNumCheck = "";		//一時格納先
					kouzaNumCheck = kouzaNum[i].substr(kouzaNum[i].length - j,j);
					
//if (i==1 & j ==8 ){throw  kouzaNumCheck;}	//確認用

					//別のWEBページ(トラブル口座リスト(Yahoo!Japanサイト))よりトラブル口座情報チェック
					CheckGM_xmlhttpRequest(kouzaNumCheck);

				}
			}
		}
	}


	//別のWEBページ(トラブル口座リスト(Yahoo!Japanサイト))よりトラブル口座情報チェック
	function CheckGM_xmlhttpRequest(webCheckNum){
			xmlhttp = GM_xmlhttpRequest({
				method : 'POST',
				url : "http://info.auctions.yahoo.co.jp/f/trouble/index?mode=search&string=" + webCheckNum,
				overrideMimeType: "text/plain; charset=EUC-JP",
				onload: function(response) {
					
					//口座番号で検索
					if (response.responseText.match(/該当する口座はありません。/)){
						//該当する口座なしの場合何もしない
//throw response.responseText;
					}else if (response.responseText.match(/口座名義/)){
						//トラブル口座と一致した場合警告文の追加
//throw response.responseText;
						//GM_xmlhttpRequestで取得したresponseTextを、innerHTMLで流し込んでDOMを取得する
						var div = document.createElement('div');
						div.innerHTML = response.responseText;
						
						//トラブル口座番号を取得する
						troubleNum = div.getElementsByTagName('small').item(numFlg).innerHTML;
						//トラブル口座の名義を取得する
						troubleName = div.getElementsByTagName('small').item(nameFlg).innerHTML;
						
//throw webCheckNum + " || " + troubleName;
						//取引ナビのコメントを警告文で上書き
						MakeAlart();

						//警告文にトラブル口座リストの追記
						SetAlartMsg(webCheckNum, troubleName);
					}
				},
				//接続エラーの場合
				onerror: function(response) {
					alert("Yahooのトラブル口座リストにアクセスできません。（UserScript:YahooJapanAuctionSecurityより）");
				}
			});
	}


	//警告文作成
	function MakeAlart(){
		alartMsg =  '<font color = red>====================================================<br>'
			+ '<B>警告！</B><br><br>この出品者の口座はトラブル口座に登録されている可能性があります。<br>'
			+ '-------------------------------------------------------------------------<br>'
			+ '<alart_num></alart_num>'
			+ '-------------------------------------------------------------------------<br>'
			+ '※口座名義と一致しない場合は誤検出の可能性が高いですが、念のため表示します。</a><br>'
			+ '<br>以下より本文となります。<br>'
			+ '====================================================</font><br><br>'
			+ strNavi.innerHTML;
		
		//警告文を実際のWEBページに反映させる
		strNavi.innerHTML =  alartMsg ;
//throw alartMsg; //テスト用
	}



	//警告文追記------------------------------------------------------------
	function SetAlartMsg(alartnum, alartname){
		alartMsg = '口座番号：' + alartnum + '　　口座名義：' + alartname 
			+ '<a href="http://info.auctions.yahoo.co.jp/f/trouble/index?mode=search&string=' 
			+ alartnum + '" target="_blank">★誤検出かどうかの詳細確認はこちら</a><br>';
		tagName[0].insertAdjacentHTML('beforeend',alartMsg);
//throw tagName[0].innerHTML;

	}



	//全角数の半角化------------------------------------------------------
	function CharCodeChange(str){

//throw 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９'.replace(/[０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}); //テスト用

//		conStr = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0); });	//←英語数字全部
		conStr = str.replace(/[０-９]/g, function(s) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)});

		return conStr;
	}

})();
//=====================================================================================================================
