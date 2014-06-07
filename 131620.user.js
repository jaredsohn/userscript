// ==UserScript==
// @name           3gokushi-skillrecovery
// @namespace      http://userscripts.org/scripts/show/131620
// @description    ブラウザ三国志のスキル回復時間表示
// @include        http://*.3gokushi.jp/card/domestic_setting.php*
// @include        http://*.3gokushi.jp/card/deck.php*
// ==/UserScript==

( function() {

/**
 * デバッグ用のコンソール
 * (console.logが停止されているので、代替用)
 */
var logConsole = undefined;
if ( false ) {
  logConsole = document.createElement('div');
  logConsole.style.backgroundColor="#111111";
  logConsole.style.color="#44ff44";
  logConsole.style.overflow="visible";
  logConsole.innerHTML = "# -----------------------------SkillRecover log";
  document.body.appendChild(logConsole);
}

/**
 * ログ出力
 * @param text ログ用のテキスト
 */
function logging(text) {
  if (logConsole === undefined ) return;
  logConsole.innerHTML = logConsole.innerHTML + "<br># " + text;
}

/**
 * クロム用にinnerTextからも取得するように記述
 */
function getTextData(elm) {
	var rtn = "";
	// ブラウザ判定
	if (typeof elm.textContent != "undefined") {
		rtn = elm.textContent;
	} else {
		rtn = elm.innerText;
	}
	return rtn;
}

/**
 * 時刻表示
 */
function formatDate(date) {
	var rtn = date.getFullYear() + "年" +
			  (date.getMonth() + 1) + "月" + 
			  date.getDate() + "日" +
			  date.getHours() + "時" + 
			  date.getMinutes() + "分" + 
			  date.getSeconds() + "秒";
	return rtn;
}

/**
 * 指定した時間を現在時刻に足し込む
 * @param recoveryData 残り時間
 * @returns {Date} 現在時刻に足し込んだ時間
 */
function computeDate(recoveryData) {

	//実際はサーバ時間から算出すべきだが、サーバ時間に日付がないので
	//端末の時刻で代替
	var date = new Date();
    var baseSec = date.getTime();

    var recoveryArray = recoveryData.split(":");
    var addSec = new Number(recoveryArray[2]);
    addSec += new Number(recoveryArray[1]) * 60;
    addSec += new Number(recoveryArray[0]) * 60 * 60;
    
    var targetSec = baseSec + (addSec * 1000);
    date.setTime(targetSec);
    return date;
}

/**
 * リンクタグを抜き出してカードのIDを取得する
 * @param tag hrefに「inlineId=cardWindow_xxxxxx」の入ったリンクタグ
 * @returns {String} カードID
 */
function getCardId(tag) {
	
	var linkText = tag.href;
	var index = linkText.indexOf("inlineId");

	//[inlineId=cardWindow_] までを削る
	var inlineId = linkText.substring(index + 20);

	var ampIndex = inlineId.indexOf("&");
	if ( ampIndex != -1 ) {
		inlineId = inlineId.substring(0,ampIndex);
	}
	return inlineId;
}

/**
 * デッキ内の表示
 */
var display = function () {

	//カードの表示形式を取得
	var sortTotal = document.getElementsByClassName("sortTotal")[0];
	var displayType = new Number(sortTotal.value);
	//カード表示の場合
	if ( displayType == 1 ) {
		displayCardColmn();
	} else {
		displayStatusDetail();
	}

};

/**
 * カード表示形式の小さい版
 * 
 * ・カード情報のリンクからカードIDを取得
 * ・ストレージからデータが存在するかを取得
 * ・ストレージの内容と回復中のスキルの名称を照らしあわせて、一緒だったらリンクに変更
 */
var displayStatusDetail = function () {
	//カード情報を取得
	var cardTags = document.getElementsByClassName("cardStatusDetail");
	if ( cardTags == null ) {
		logging("カードが見つからない");
		return;
	}

	logging("ファイル枚数:" + cardTags.length);

	//カード数回繰り返す
	for ( var cnt = 0; cnt < cardTags.length; ++cnt ) {
	

		var cardTag = cardTags[cnt];
		//カード情報を取得
		var linkTag = cardTag.getElementsByClassName( "thickbox" )[0];
		var cardId = getCardId(linkTag);
		logging("---------------------------------" + cardId);
		var data = localStorage["SR:" + cardId];
		logging("データ:" + data);
		if ( data == null || data == "" ) {
			continue;
		}

		var recoverArray = data.split(",");
		for ( var rId = 0; rId < recoverArray.length; rId = rId + 2) {
			var skillName   = recoverArray[rId];
			var recoverDate = new Date(recoverArray[rId + 1]);
			var nowDate = new Date();
			if ( recoverDate.getTime() < nowDate.getTime() ) {
				logging("すでに回復:" + skillName);
				continue;
			}

			//カード情報を取得
			var usedTags = cardTag.getElementsByClassName("used");
			if ( usedTags　== null ) {
				logging("使用中が存在しない");
				continue;
			}

			skillName = skillName.substring(0,skillName.indexOf("LV"));
			for ( var skillId = 0; skillId < usedTags.length; ++skillId ) {
				var usedTag = usedTags[skillId]; 
				var nameTag = usedTag.getElementsByTagName("td")[0];
				var nameIdx = nameTag.innerHTML.indexOf(skillName);
				if ( nameIdx == -1 ) {
					continue;
				}
				var skillLink = '<a href="#" title="' + formatDate(recoverDate) + '辺りに回復">' + skillName + '</a>';
				nameTag.innerHTML = nameTag.innerHTML.replace(skillName,skillLink);
			}
		}
	}
};

/**
 * カード表示形式の大きい版
 * 
 * ・カード情報(カード保護ボタン)からカードIDを取得
 *   武将デュエルに設定している武将が拾えないので改善の余地あり。
 * ・ストレージからデータが存在するかを取得
 * ・ストレージの内容と回復中のスキルの名称を照らしあわせて、一緒だったらリンクに変更
 */
var displayCardColmn = function () {

	//カード情報を取得
	var cardTags = document.getElementsByClassName( "cardColmn" );
	if ( cardTags == null ) {
		logging("カードが見つからない");
		return;
	}

	logging("デッキ＋ファイル数:" + cardTags.length);
	//カード数回繰り返す
	for ( var cnt = 0; cnt < cardTags.length; ++cnt ) {
		var cardTag = cardTags[cnt];
		var protectTag = cardTag.getElementsByClassName("sub-control-buttons-wrapper")[0];
		if ( protectTag == null ) {
			logging("保護系のボタンが存在しない(おそらくデッキ内)");
			continue;
		}

		var linkTag = protectTag.getElementsByTagName("a")[0];
		var linkText = linkTag.outerHTML;
		var dataArray = linkText.split(",");
		if ( dataArray.length == 1 ) {
			logging("ボタンのデータ(デュエル参加かな？):" + linkText);
			continue;
		}

		var cardId = new Number(dataArray[1]);
		logging("---------------------------------" + cardId);
		var data = localStorage["SR:" + cardId];

		logging("データ:" + data);
		if ( data == null || data == "" ) {
			continue;
		}

		var recoverArray = data.split(",");
		for ( var rId = 0; rId < recoverArray.length; rId = rId + 2) {
			var skillName   = recoverArray[rId];
			var recoverDate = new Date(recoverArray[rId + 1]);
			var nowDate = new Date();

			if ( recoverDate.getTime() < nowDate.getTime() ) {
				logging("すでに回復:" + skillName);
				continue;
			}
			
			var fixTag = cardTag.getElementsByClassName("clearfix")[0];
			var dataTags = fixTag.getElementsByTagName("dd");
			var labelTag = dataTags[dataTags.length-2];
			var skillLink = '<a href="#" title="' + formatDate(recoverDate) + '辺りに回復">' + skillName + '</a>';
			labelTag.innerHTML = labelTag.innerHTML + "," + skillLink;
			logging(labelTag.innerHTML);
		}
	}

};
/**
 * 座標をすべて取得して
 * オブジェクト化して送る
 */
var regist = function () {
	
	//カード情報を取得
	var cardTags = document.getElementsByClassName( "general" );
	if ( cardTags == null ) {
		logging("デッキのカードがない" + linkText);
		return false;
	}

	//時間を取得
	//var timeTag = document.getElementById( "server_time_disp" );
	//var nowTime = timeTag.innerHTML;
	logging("認識できた内政武将数:" + cardTags.length);

	for ( var cnt = 0; cnt < cardTags.length; ++cnt ) {

		var cardTag = cardTags[cnt];
		var cardTrTag = cardTag.getElementsByTagName("tr");

		//データ
		var dataTag = cardTrTag[1];
		var linkTags = dataTag.getElementsByTagName("a");
		logging("武将のリンク:" + linkTags[0]);

		var cardId = getCardId(linkTags[0]);
		logging("武将のカードID:" + cardId);

		//回復用のタグ
		var recoveryTags = dataTag.getElementsByClassName( "recovery" );
		if ( recoveryTags == null ) {
			logging("回復中のスキルが存在しない");
			continue;
		}

		var csv = "";
		logging("回復中のデータ数:" + recoveryTags.length);
		for ( var rcnt = 0; rcnt < recoveryTags.length; ++rcnt ) {

			var recoveryTag = recoveryTags[rcnt];
			var spanTags = recoveryTag.getElementsByTagName("span");
			var spanTag = spanTags[0];

			logging("取得したデータ:" + spanTag.innerHTML);

			var skillName = getTextData(recoveryTag);
			if ( skillName.indexOf(spanTag.innerHTML) != -1 ) {
				skillName = skillName.substring(0,skillName.indexOf(spanTag.innerHTML));
			}
			
			var date = computeDate(spanTag.innerHTML);
			if ( csv != "" ) {
				csv = csv + ",";
			}
			csv = csv + skillName + "," + date;
		}

		localStorage["SR:" + cardId] = csv;
		logging("設定したデータ:" + csv);
	}

};

//アクセスしたURLを取得
var url = window.location.pathname;
//内政設定だった場合
if ( url.indexOf("domestic_setting.php") != -1 ) {
	logging("regist()");
	regist();
} else {
	logging("display()");
	display();
}

})();