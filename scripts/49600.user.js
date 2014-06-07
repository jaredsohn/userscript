// ==UserScript==
// @name           WassrNetaGiretter
// @namespace      mkfs
// @description    ワッサーのマイページで定型postを選択して投稿
// @include        http://wassr.jp/my/
// @author         mkfs http://wassr.jp/user/manasvin
// @version			0.1
// ==/UserScript==
//  silvers くんが作った「はらへグリモン」を改造して作っています。
//  もっとキレイに書き直せる人は書き直してください。
// 
//  
//  ※使い方
//  設定の中にある文章を編集すれば、自分の好きな内容でpostすることが出来ます。
//  「 " 」ダブルクォーテーションの間に入力し、「 , 」カンマで区切ります。
//  ワードとかパワーポイントじゃ編集できないかんね。こういうスクリプトが扱えるエディタでやってください。
//  絵文字コードも埋められるよ。当然URLも。
//  定型文ウザいとか言われて購読切られても明日になったら忘れるさ。
// 
// 

( function(){
	//---設定始---
	var statuses = [
		"むくり",
		"おはようございます{emoji:E72A}",
		"おやすみなさい{emoji:E72A}",
		"ぐないWassr!{emoji:E72A}",
		"やあやあ {emoji:E72A}",
		"今日も今日とてミラノサンド",
		"今日もWassrなう！(´▽｀)",
		"はらへ！",
		"てってれー",
		"てれってー",
		"挨拶なんてタイムラインの無駄遣い。やあやあ。",
		"一服してくる！(´ｰ`)y-~~",
		"メシなう！",
		"{emoji:E72A}",
		"おはようございまシュッシャなう！　{emoji:E72A}",
		"さて、報酬分働いてやるか。",
		"お弁当なう！　{emoji:E749}　よく噛んで食べるなう！　咀嚼なう！",
		"休憩しよーよー、何もしないからさー。",
		"自宅に到着しました。帰宅までの所要時間は、…お察しください。",
		"これより入浴および浴槽洗浄を開始する。",
		"～犬を飼うか犬になるか迷っている～　どＭ　* 名言",
		"～秋ナスを嫁で試すな～　菜食主義　* 名言",
		"～無類のワッサー好き～　栄作　* 名言",
		"～クーラーの設定温度勝手に上げないでくれる？見てよこの汗！～　説得力のあるデブ　* 名言",
		"～よく来たな、まあワサれ～　廃人　* 名言",
		"～unkgmn　(;´ｰ`)y-~~　* 名言",
		"～ＰＴなんて飾りです！～　偉くない人　* 名言",
		"～裸だったら何が悪い！～　つよし　* 名言",
		"～アイコン詐欺は重罪です！～　必死な人　* 名言",
		"～ワサラーの間にチームプレイなどという都合のいい言い訳は存在しない。 あるのは変態postの結果として生じるチームワークだけだ～　課長　* 名言",
		"～Twitterはもう終わった、Wassrやってなくて良いのは幼稚園児までだよね ～　Yappo　* 名言",
		"～まふまふ{emoji:ed65}～　haiju　* 名言",
		"～明日から本気出す。～　口ばっかり　* 名言",
		"～ポイしないでください！～　リア・ディゾン　* 名言",
		"～正しいことをしたいなら、偉くなれ～　和久 平八郎（いかりや長介）　* 名言",
		"～交尾なう！",
	];
	//--設定終--



	//--ここから先はわかる人だけ編集してね。
	//--APIのパスを取得
	var HITOKOTO_API_PATH = [
		'http://',
		'api.wassr.jp',
		'/update.json?',
		'&source=NetaGiretter&status='
	].join('');

	//--ヒトコトを投稿する時のおまじない	
	var gmXHRArgs = {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded'
		},
		onload: function(){ location.reload(); }
	};
	

	//選択肢を作る
	var netaselect = document.createElement('select');
	netaselect.setAttribute("id", "netalist");
		var i = 0;
		for(i in statuses){
			var outstt = statuses[i].substring(8, 0) + "…";    
			netaselect.innerHTML = netaselect.innerHTML +"<option value='" + i + "'>" + outstt;
		}

	// ネタボタンの追加
	var mysub = $x('//div[@class="MySub"]')[0];
	var btn = document.createElement('div');
	btn.innerHTML = "<input id='netaannounce' type='button' value='ネタ' />";
	btn = btn.firstChild;

	// ボタンを押下したら選んだネタを投稿
	btn.addEventListener("click", function() {
		var registneta = document.getElementById("netalist");
		var status = statuses[registneta.selectedIndex];
		gmXHRArgs.url = HITOKOTO_API_PATH + encodeURIComponent(status);
		GM_xmlhttpRequest(gmXHRArgs);
	}, false);
	mysub.appendChild(netaselect);
	mysub.appendChild(btn);

// cho45 - http://lowreal.net/
function $x(exp, context) {
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
  var exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return len != 0 ? ret : null;
    }
  }
  return null;
}

})();


