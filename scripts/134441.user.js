// vim:foldmethod=marker:noexpandtab:foldmarker=//{{{,//}}}
//^NOHL //{{{
// ==UserScript==
// @name           sengokuixa-moko
// @namespace      sengokuixa-ponpoko
// @description    戦国IXA用ツール（Firefox + Scriptish用）
// @version        1.8.6.223.20120317
// @author         mokofox
// require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js
// require        https://ajax.googleapis.com/ajax/libs/mootools/1.4.0/mootools-yui-compressed.js
// @require        http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js
// @match          http://*.sengokuixa.jp/*
// @include        http://*.sengokuixa.jp/*
// @icon data:image/png;base64,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
// ==/UserScript==
//$NOHL //}}}
//console.log(jQuery.fn.jquery);

var GLOBAL = (function(){return this})();

// 0: コンテキストメニュー表示調整あり
// 1: コンテキストメニュー表示調整なし
// 2: コンテキストメニュー表示調整あり＋強制位置調整
var TEST_07_326 = 2

/** README
改造版 +2-16 を Firefox 対応したちらし版の動かない機能を修正。
ちらし版から設定は引き継ぐけど共有はできない。
その後追加された機能や野良機能（俺用含む）もなんとなく取り込み。
キャッシュの関係でバージョンアップ後に動ないことが多いので再起動推奨。
Firefox7＋Scriptish1.5で製作・確認なので左記推奨。狐4+、グリモン0.9.8+でも動くと思う。
*/

/** TODOリスト
////{{{
TODO	ここへ部隊出陣→確認画面へ→出陣確認画面の出陣！ボタンを押すまで表示し続けることはできませんでしょうか？
		設定次第でできるが原因が不明。要調査。
TODO	画面上にある資源の数値にコンマ(,)いれる機能があると地味にうれしい
TODO	損害欄で(または生存数の欄に後付けで)括弧で「(0)」や「(-0)」などとしてはいかがでしょうか？
TODO	座標入力は元々IXAでできる座標入力したらエンターキーで飛ぶように
TO?	全編成一番上に戻る
TO?	待機武将一覧ワイド表示時に最大数（14）までページングを拡張（200件用）
TODO	地図で部隊状況の2度読みがあるので回避。
TODO	エラー報告補助機能
TODO	例外処理（どれかの機能がこけてもMoko全体を引きずらないように）
TODO	ローディング・ダイアログの最適化
TODO	Z-Index の整理
TODO	練兵所の兵舎情報キャッシュ（何処市と同じく登録制）
TODO	どの拠点にいても秘境に行く
TO?	全編成高速化（まあまあ速くなった）
TO?	練兵所200人ずつとか
TODO	最寄陣から部隊編成
TODO	部隊編成の移動速度の速度スキル対応

TODO	13陣目から名称変更できない件の再現と修正
		6スレ >>896
		合戦中に陣の名称を変更しているのですが１２拠点までは正常に変更
		しかし13以降は変更出来ません。

TO?	一括編成見直し
		6スレ >>808
			「いろんなパターンで一括編成」と「標準兵種のインターフェイスを表示する」
			の両方にチェックが入っているといろんなパターンができないのは
			仕様なのかバグなのかよくわからないので一応報告。

			「下位生産施設非表示」にチェック入れてると上位施設がなくても消えてるような。

			あと、Chrome版の編成画面で実装されている
			兵種選択時の変更押下（なし＜＞なにかのとき）が実装してもらえるとうれしいです。

TODO	同期通信部分で jQuery.ui.tabs のエラーがでる。
		setTimeout に突っ込むとでなくなるので、処理待ちの間にコンフリクト起こしてる可能性あり。
		→XHR通信系は jQuery.Deferred で非同期に書き直すのでそれで対応。

TODO	XHR通信系は jQuery.Deferred で書き直す。

TODO	［要確認］合流時、確認ボタン上にも
		6スレ >>351
		単独出撃の時は最終決定ボタンが上下に現れているけど、
		合流に乗ろうとした時は上に表示される最終決定ボタンがなかった。
		chrome版みたいに合流でも上にも表示されるといいな。

TO?	一斉攻撃 【中止】7スレ >>14 に任せた
TO?	CPって上級兵(複合)の最高コス比を表すの？それとも単一兵科？【テスト中】

TO?	陣ソートができていなかった。
		陣名頭に方角いれてたから並びがおかしいのに気づいた。

TO?	地図ツールチップの「ここを記憶する」はもっと下のがいいかな。
		部隊出陣のがよく使うので。

TO?	6スレ >>987
		しかし水車に関しては対応していないみたいです。
		? 水車を建てるとその拠点だけ左上の生産量を教示する表が出ない。
		? 水車だけ右クリックで建設できない。
		水車lv0→1の間だけです。
		Lv1からは通常通り機能しています。

TO?	破城槌を練兵すると選択される兵舎が厩舎

TO??	6スレ >>891
		山林奉行所がある所領のボーナス数値が
		木以外にもかかってる気がする。

TO?	>>892
		狐版の各所領の生産量を表示する機能のことだけど
		釣り堀を建てた辺りから糧の計算が合わなくなった
		本当の値よりも200位加算されてる

TO?	何処でも市場で2度以上開く
TO?	建設可能になる時間表示
TO?	全配置で8ページ目以降
TO?	部隊編成画面右上にある「待機武将一覧」から部隊長無しで編成

TO?	拠点施設にも何処でも市場
TO?	所領ソートで領主プロファイル読まないようにする方法。
		? 各ページを開くたび、表示拠点選択の文字列を保存してある古いものと比較し、
		  変更があればキャッシュをクリアする
		? 城主ページを開くことで強制キャッシュクリア

		↓ボツ案。オーバースペック杉
		いきなり完全対応はアレなので
		Step 1. 城主ページを開いたら情報を更新するようにするところから始める。
		Step 2. Ajax で /user/ のぞいたら更新。これでほぼ問題なくなるはず。
		Step 3. 直接名前を変えているところを絞り出し、インターフェイスをまとめる。
		Step 4. 開拓地獲得、所領獲得、陣張、領地攻撃、所領・陣破棄をフックする方法を考える。
				いずれも獲得する時間は実行時にとれるので、localStorage 経由でタイマー仕込めば良いかな。

*/////}}}

/** 改造版の機能が動くかどうか
////{{{
○：動く ●：多分動く ×：動かない

■ 全ページ
○敵襲を枠内に表示
○サイドメニューのカードを非表示
○書状の一括既読
○メニューと資源バーの位置を逆転表示
○サイドメニューの所領ソート

■ チャット
○チャットウィンドウに敵襲状況表示

■ 部隊
○待機武将一覧をシンプル表示
○お気に入り部隊編成の登録とお気に入りからのデッキセット
○全部隊解散
○全部隊配置
○待機武将一覧にグループアイコン表示

■ 地図
○部隊行動状況を表示
○戦況マップを表示
○ダブルクリックで対象の合戦報告書を表示
○陣取り禁止区域表示
○カーソル選択対象を拡大表示
○右クリックでツールチップを表示
●攻撃目標をマーク表示
●最寄り陣から出撃

■ 内政
○復活するボタンを非表示
○空き地戦力を表示
○訓練施設内に他訓練施設リンクを設置
○右クリックで施設操作ツールを表示
○機能選択を押しボタン表示
○建築状況一覧表示

■ 出陣
○合流攻撃検索に出陣確認情報表示

■ 秘境
○全部隊を秘境へ送る

■ 簡易編成
○秘境部隊に兵士を一括セット
○兵士0武将に兵士を一括セット
●簡易編成カード200枚表示
○補充リンク押下で最大補充
●グループを表示順に覚えなおす
 */////}}}

/** 履歴
////{{{
* 2012.03.17
	+ 最後のご奉公
	+ カード一括破棄時、新参者のみ表示・選択
	  新規武将＝くじを引いて10分以内／入手後全編成を開いていない武将
	+ 壁状の陣張禁止区域表示
	+ 1時間あたり、24時間あたりの生産量をポップアップ表示
	+ 資源バーの数値をコンマ区切り
	+ 敵襲デスクトップ通知（Scriptishのみ）
	+ 部隊選択のリンクを通常のリンクに変更【テスト中】
	+ 出品中武将を暗色表示
	+ 兵編成支援（全武将最大／兵1）
	+ 極振り支援
	+ 他にもあるかも
	+ jQuery 1.7.1 に変更。
	+ MooTools 1.4.1 に変更。
* 2011.10.20
	+ 右クリックから拠点変更が壊れてた
	+ 右クリック出ないケースがあり、表示位置調整を殺してみた
	+ 敵襲コメントリストが壊れてた
	+ 練兵所の練兵単位フォームが効いていなかった
* 2011.10.19.3
	+ 地図拡大（テスト）
	+ 地図UIを上に（テスト）
	+ 部隊状況系をキャッシュする設定（テスト）
	+ 兵舎の増減ボタン修正
	+ 何処でも市場が使えなかった件に対応
* 2011.10.19
	+ ワイド表示＋Ajaxページャー時の表示溢れ対応
	+ 総合練兵所のデフォルト分割単位を200に変更
	+ 総合練兵所の分割単位を設定可能に
	+ 内政・地図のコンテキストメニュー調整
* 2011.10.17
	+ ワイド表示＋Ajaxページャー時は全ページのリンクを表示
	+ 建設状況一覧をサイドボックスの並びに合わせた
	+ 全編成高速化一応終わり
	+ 全編成最上部へ戻るリンク
	+ 所領名称欄に進む戻るリンク
	+ サイドボックスから拠点名変更
	+ 練兵終了時、現在の拠点に戻っていなかった
* 2011.10.16
	+ 自国／他国反転時、建設状況一覧のリンクがなかった
* 2011.10.15
	+ 待機武将一覧表示のグループアイコン対策にミス
	+ 陣ソート修正
	+ 敵襲コメントリスト修正
	+ 待機武将一覧ワイド表示（テスト）
	+ CP表示指揮兵別（テスト）
* 2011.10.14
	+ 練兵所の練兵ウェイトを500ms→1000ms
	+ 報告書の戦闘報告の経験値合計
	+ 地図：部隊状況表示の表示同期
	+ jQuery.Deferred
	+ 秘境が空のとき、待機部隊が最初に見つかった拠点に飛ぶ。
	  合戦中は陣にも飛んでしまう。（初期値オフ）
	+ 陥落表示修正
	+ 一括編成修正
	+ 待機武将一覧表示のグループアイコンにバグ
* 2011.10.13.1
	+ 下位施設しかないときも非表示にしていた
	+ IXA時間表示。公式のをコピってるだけなのでIXA的に正確（誤差-1秒未満）。
	+ 設定初期化ボタン
* 2011.10.13
	+ 秘境収入のプログレスダイアログが閉じない件
* 2011.10.12.1
	+ 拠点ソートキャッシュ
	+ 全編成クイックソート、グループ・兵数・兵種変更時に対応
	+ 地図移動強化2
	+ 地図：右クリックメニューをちゃんと文脈対応（未完）
	+ 余り兵一括編成で最初の武将がこけていた
	+ 生産力ボーナス施設の計算を間違えていた
	+ 全編成：全兵士数に大殿の兵が加算されてなかった
	+ 地図：右クリックの記録削除を最下部に
* 2011.10.12
	+ 何処でも市場2回開けるように
	+ 地図移動強化
	+ 水車のエラー対応（多分）
	+ 生産力強化施設のボーナスを適正値に（多分）
	+ 練兵所で破城鎚が厩で生産するようになっていた
	+ 建設可能になる時間表示
	+ 全配置で8ページ目以降
	+ 部隊編成画面右上にある「待機武将一覧」から部隊長無しで編成
* 2011.10.09
	+ 建築可能まで
* 2011.10.09
	+ 陣ソート今度こそ
	+ 最寄陣から出陣を空き地でも
	+ 何処でも市場販路拡大
	+ 不足／余剰資源を陣と出城に
	+ 簡易編成にクイックソート。今のところ兵編成変えた後は正しく動ない。
	+ 出陣中部隊、4人未満部隊もお気に入りに
	+ 表示拠点選択の自国と他国を入れ替え
	+ 空き地戦力修正
* 2011.10.08
	+ 設定ボタンの位置変更
	+ 初期値の参照順に不整合があったので、
	  初期値が見つからない場合は全機能を舐めることにした
	+ @matchだけだとグリモンでどこでも当たるようになるので @include 併記
	!!! 全編成、グループ機能リファクタリング中
	+ グループの表示順登録が逆になってた
	+ 空き地戦力修正 thx 6スレ >>785
* 2011.10.07
	+ 何処でも市場
	+ 実行中のパネルの広げる高さを調整可能に
* 2011.10.06
	+ 資源のゲージ、資源バー未逆転時に対応
	+ 施設レベル数上限が10だったので無制限に＆段組み化
* 2011.10.04
	+ スキル強化時のAjaxページャ修正
	+ 地図上の出陣状況の「加勢」が攻撃になってたのを修正
	+ 地図上の出陣状況の「陣張」対応
	+ 非AJAX時の最終ページ取得ミス
	+ 所領ソートで領地のフィルターミス
	+ 資源のゲージ
	+ 練兵所の場所変更
	+ 練兵所で訓練施設レベルに応じた訓練分担
	+ チャット100件修正
	+ お気に入り施設（荒削り）
* 2011.10.03
	+ 少しずつ訓練の数を任意に設定可能に
	+ 合戦向けサイドバーに合戦中ボタンが出ていた
	+ ページャの最終ページ取得を失敗していた
		+ 待機武将関連の機能が全滅だった…
	+ 生産施設の差分表示を追加
	+ 合流時のボタン上にも（多分直った）
* 2011.10.01
	+ 総合練兵所
	+ UIのバグいくつか修正
	+ MooTools More をいくつか導入
	+ 部隊編成以外のページャー：デフォルトを無効に
* 2011.09.30
	+ 俺得さんのCP表示
	+ 書状の合成のみ、IXA運営のみ選択
	+ 不足資材のツールチップ表示
* 2011.09.29
	+ 右パネルの並び変更でエラー。insertBefore がいくない。
	+ jQuery 1.6.4 に変更。
* 2011.09.28
	+ 改造さん 2-23 に対応。
* 2011.09.27
	+ 一括編成大幅改修。
	+ 敵襲コメントリストの日付修正。たぶん。
	+ 右パネルの並びがおかしかった。
* 2011.09.26
	+ 改造さん 2-20 に対応。インターフェイスはちょっと違う
	+ 座標記録、グループ設定削除ボタン
	+ 下位兵、下位施設非表示
	+ 所領収入を三章になんとなく対応
* 2011.09.24
	+ 所領の収入に人口考慮オプション
	+ ★8対応。未検証。
	+ グループ設定の色が反映されたなかった。
* 2011.09.23
	+ 改造さん 2-19 に対応
* 2011.09.22
	+ 改造さん 2-18 を取り込み
	+ MooTools を require ではなく埋め込みでもう一度
* 2011.09.19
	+ dataスキームの画像を再圧縮＆Base64化
	+ 設定周り修正
	+ 戦況マップの砦番号ダブルクリックで砦へ移動（2ch）
	+ MooTools を削除してグリモンで動くようにした
	+ Firefox 3.6 で動かなくなった
* 2011.09.15
	+ jQuery 1.6.4 に更新
	+ お気に入り部隊を修正
	+ アップデートに対応（残りタイムアウト、敵襲関連）
	+ 参加せよ！うざい
* 2011.09.11
	+ jQuery 1.6.3 に更新
	+ MooTools 1.3.2 を追加 → グリモンで動かなくなった
	+ sprintf() for JavaScript 0.7-beta1 を追加
	+ jQuery.tmpl を追加
	+ 機能追加：待機兵一覧をポップアップ表示
	+ jQuery.cookie を削除
* 2011.09.10
	+ 全部隊配置パフォーマンス上がったかも
	+ 内政：所領の生産力表示
	+ unsafeWindow.jQuery がまだ必要なことが判明（一部要素にイベントを登録する場合に。onchange のみ？）
* 2011.09.09
	+ unsafeWindow.jQuery を使わなくても良いようにした（多分）
	+ jQuery.fn.fireEvent() 追加
	+ jQuery を 1.6.2 に変更
	+ jQuery().attr に対するモンキーパッチを削除
	+ 改造さん版のCSS（http://www.jj-midi.com/ixa-kaizou2.css）をインラインで追加
	    - 待機武将一覧、チャットウィンドウでの敵襲表示に影響
	+ JSON プラグインを削除し、JSONオブジェクトを使用
	+ jQuery 1.6 の attr の仕様変更に係るバグ修正（attr → prop）
	+ 地図：ダブルクリックで城主名の報告書検索の仕様変更に追随
	+ タイムアウト画面から一発再ログイン（副作用有り）
* 2011.09.06
	+ 部隊のAjaxページャーが3.6で動かなかったのを修正。
	    - NOTE jQuery().attr() でバグるときは getAttribute() に変えると良さそう
* 2011.09.04
	+ 地図: 敵拠点ダブルクリックで報告書の挙動を修正
	+ 拠点: 合戦報告書のリンクを復活
* 2011.09.03
	+ 全編成: グループアイコン右クリック時に逆順に変わらなかったのを修正。
	+ Scriptish で動作確認
* 2011.09.02
	+ プログレスバーをカウント表示可能に。
	+ 部隊の戦闘力データを表示するようにした。
	+ 新秘境一括に対応。
	+ 全解散のパフォーマンスアップ。
* 2011.09.01
	コードベース http://jsfiddle.net/RvLb2/1/ （火狐ちらし改）
	これ以前は↑参照
*/////}}}

/** 命名規則
 * 資源： wood, cotton, iron, food
 * 市  ： market
 * 兵舎： yard 、訓練： drill
 * 施設： facility
 * 部隊： unit
 * 小隊／武将： squad  ※小隊と武将は同一とみなす
 * 兵士： soldier 兵種： soldierType
 * 所領： village  拠点： foothold or hold ※foothold は village を含む
 * 所領名： villageName  拠点名： holdName
 * 城主： lord  城主名： lordName
 * ID各種： villageID, holdID, squadsID, lordID
 */

//******************************************************************************
// 外部（？）ライブラリ
//------------------------------------------------------------------------------
////{{{
jQuery.fn.extend({

	// IE の fireEvent エミュレーション
	// jQuery.trigger が GM のプロセスでは動かないので。
	// .live で設定したイベントはダメっぽい
	fireEvent: function(type) {
		if( /^click$|^mouse/.test(type) ){ ename = 'MouseEvent' }
		else if( /^(?:submit|change)$/.test(type) ){ ename = 'Event' }
		else if( /^MokoEvent_/.test(type) ){ ename = 'Event' }
		return this.each(function() {
			var tmpEvent = window.document.createEvent(ename); 
			tmpEvent.initEvent(type, true, true); 
			this.dispatchEvent(tmpEvent);
		});
	},
	
	// text().toInt() がめんどくさい
	toNum: function( forceIntegerize ){
		return forceIntegerize
			? parseInt( this.text().trim(), 10 )
			: parseFloat( this.text().trim() )
	},

	/** テキストノードのみ */
	textNodes: function(){
		return this
		.contents()
		.filter(function(){return this.nodeType==3})
	},

});

jQuery.form = function(s){
	var def = {
			type: 'get',
			url: location.href,
			data: {}
	};
	s = jQuery.extend(true, s, jQuery.extend(true, {}, def, s));
	var form = $('<form>').attr({'method': s.type,'action': s.url}).appendTo(document.body);
	for (var a in s.data) {
		$('<input>').attr({'name': a,'value': s.data[a]}).appendTo(form);
	}
	form.fireEvent('submit');
}

/** Prototype.js の $R もどき */

var $R = function(_beg, _end){
	var i = 0, ar = [];
	var beg = _beg, end = _end;
	if( !_end ){ beg = 0; end = _beg - 1 }
	for( i = beg; i <= end; i++ ){ ar.push(i); }
	return ar;
}
////}}}

/** MooTools もどき */////{{{
//new function (){
//	String.prototype.toInt = Number.prototype.toInt = function(){ return parseInt( this.toString(), 10 ) };
//	String.prototype.toFloat = Number.prototype.toFloat = function(){ return parseFloat( this.toString() ) };
//	Number.prototype.ceil = function(){ return Math.ceil( this ) };
//	Number.prototype.floor = function(){ return Math.floor( this ) };
//	var slice = Array.prototype.slice;
//	Array.slice = function (arr, index) {
//		return slice.apply( arr, slice.call(arguments, 1) )
//	}
//	Array.prototype.each = Array.prototype.forEach;
//	Array.prototype.append = function(array){
//		this.push.apply(this, array);
//		return this;
//	};
//	var hasOwnProperty = Object.prototype.hasOwnProperty;
//	Object.each = function(object, fn, bind){
//		for (var key in object){
//			if (hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
//		}
//	};
//	Object.filter = function( obj, func, thisArg ){
//		var nObj = {};
//		var trueKeys = Object.keys(obj).forEach(function(key){
//			if( hasOwnProperty.call(obj,key) && func.call( thisArg, obj[key], key, obj ) ) nObj[key] = obj[key];
//		});
//		return nObj;
//	};
//	Object.getLength = function( obj ){ return Object.keys(obj).length };
//	Object.merge = function(){ return $.extend.apply( $, arguments ); };
//	Function.prototype.pass = function(args, bind){
//		var func = this;
//		if( !Array.isArray(args) ) args = [ args ];
//		return function () { return func.apply( bind, args ) };
//	}
//};////}}}
//GM_log('MooTools','BEGIN',Date.now());
/** MooTools 1.4.1 */
var setupMooTools = function () {////{{{
//^NOHL
/*
---
MooTools: the javascript framework

web build:
 - http://mootools.net/core/cb006b8a6c24e2536185b1175530098e

packager build:
 - packager build Core/Core Core/Array Core/String Core/Number Core/Function Core/Object Core/Cookie

copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
(function(){this.MooTools={version:"1.4.1",build:"d1fb25710e3c5482a219ab9dc675a4e0ad2176b6"};var o=this.typeOf=function(i){if(i==null){return"null";}if(i.$family){return i.$family();
}if(i.nodeName){if(i.nodeType==1){return"element";}if(i.nodeType==3){return(/\S/).test(i.nodeValue)?"textnode":"whitespace";}}else{if(typeof i.length=="number"){if(i.callee){return"arguments";
}if("item" in i){return"collection";}}}return typeof i;};var j=this.instanceOf=function(t,i){if(t==null){return false;}var s=t.$constructor||t.constructor;
while(s){if(s===i){return true;}s=s.parent;}return t instanceof i;};var f=this.Function;var p=true;for(var k in {toString:1}){p=null;}if(p){p=["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];
}f.prototype.overloadSetter=function(s){var i=this;return function(u,t){if(u==null){return this;}if(s||typeof u!="string"){for(var v in u){i.call(this,v,u[v]);
}if(p){for(var w=p.length;w--;){v=p[w];if(u.hasOwnProperty(v)){i.call(this,v,u[v]);}}}}else{i.call(this,u,t);}return this;};};f.prototype.overloadGetter=function(s){var i=this;
return function(u){var v,t;if(s||typeof u!="string"){v=u;}else{if(arguments.length>1){v=arguments;}}if(v){t={};for(var w=0;w<v.length;w++){t[v[w]]=i.call(this,v[w]);
}}else{t=i.call(this,u);}return t;};};f.prototype.extend=function(i,s){this[i]=s;}.overloadSetter();f.prototype.implement=function(i,s){this.prototype[i]=s;
}.overloadSetter();var n=Array.prototype.slice;f.from=function(i){return(o(i)=="function")?i:function(){return i;};};Array.from=function(i){if(i==null){return[];
}return(a.isEnumerable(i)&&typeof i!="string")?(o(i)=="array")?i:n.call(i):[i];};Number.from=function(s){var i=parseFloat(s);return isFinite(i)?i:null;
};String.from=function(i){return i+"";};f.implement({hide:function(){this.$hidden=true;return this;},protect:function(){this.$protected=true;return this;
}});var a=this.Type=function(u,t){if(u){var s=u.toLowerCase();var i=function(v){return(o(v)==s);};a["is"+u]=i;if(t!=null){t.prototype.$family=(function(){return s;
}).hide();}}if(t==null){return null;}t.extend(this);t.$constructor=a;t.prototype.$constructor=t;return t;};var e=Object.prototype.toString;a.isEnumerable=function(i){return(i!=null&&typeof i.length=="number"&&e.call(i)!="[object Function]");
};var q={};var r=function(i){var s=o(i.prototype);return q[s]||(q[s]=[]);};var b=function(t,x){if(x&&x.$hidden){return;}var s=r(this);for(var u=0;u<s.length;
u++){var w=s[u];if(o(w)=="type"){b.call(w,t,x);}else{w.call(this,t,x);}}var v=this.prototype[t];if(v==null||!v.$protected){this.prototype[t]=x;}if(this[t]==null&&o(x)=="function"){m.call(this,t,function(i){return x.apply(i,n.call(arguments,1));
});}};var m=function(i,t){if(t&&t.$hidden){return;}var s=this[i];if(s==null||!s.$protected){this[i]=t;}};a.implement({implement:b.overloadSetter(),extend:m.overloadSetter(),alias:function(i,s){b.call(this,i,this.prototype[s]);
}.overloadSetter(),mirror:function(i){r(this).push(i);return this;}});new a("Type",a);var d=function(s,w,u){var t=(w!=Object),A=w.prototype;if(t){w=new a(s,w);
}for(var x=0,v=u.length;x<v;x++){var B=u[x],z=w[B],y=A[B];if(z){z.protect();}if(t&&y){delete A[B];A[B]=y.protect();}}if(t){w.implement(A);}return d;};d("String",String,["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","quote","replace","search","slice","split","substr","substring","trim","toLowerCase","toUpperCase"])("Array",Array,["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice","indexOf","lastIndexOf","filter","forEach","every","map","some","reduce","reduceRight"])("Number",Number,["toExponential","toFixed","toLocaleString","toPrecision"])("Function",f,["apply","call","bind"])("RegExp",RegExp,["exec","test"])("Object",Object,["create","defineProperty","defineProperties","keys","getPrototypeOf","getOwnPropertyDescriptor","getOwnPropertyNames","preventExtensions","isExtensible","seal","isSealed","freeze","isFrozen"])("Date",Date,["now"]);
Object.extend=m.overloadSetter();Date.extend("now",function(){return +(new Date);});new a("Boolean",Boolean);Number.prototype.$family=function(){return isFinite(this)?"number":"null";
}.hide();Number.extend("random",function(s,i){return Math.floor(Math.random()*(i-s+1)+s);});var g=Object.prototype.hasOwnProperty;Object.extend("forEach",function(i,t,u){for(var s in i){if(g.call(i,s)){t.call(u,i[s],s,i);
}}});Object.each=Object.forEach;Array.implement({forEach:function(u,v){for(var t=0,s=this.length;t<s;t++){if(t in this){u.call(v,this[t],t,this);}}},each:function(i,s){Array.forEach(this,i,s);
return this;}});var l=function(i){switch(o(i)){case"array":return i.clone();case"object":return Object.clone(i);default:return i;}};Array.implement("clone",function(){var s=this.length,t=new Array(s);
while(s--){t[s]=l(this[s]);}return t;});var h=function(s,i,t){switch(o(t)){case"object":if(o(s[i])=="object"){Object.merge(s[i],t);}else{s[i]=Object.clone(t);
}break;case"array":s[i]=t.clone();break;default:s[i]=t;}return s;};Object.extend({merge:function(z,u,t){if(o(u)=="string"){return h(z,u,t);}for(var y=1,s=arguments.length;
y<s;y++){var w=arguments[y];for(var x in w){h(z,x,w[x]);}}return z;},clone:function(i){var t={};for(var s in i){t[s]=l(i[s]);}return t;},append:function(w){for(var v=1,t=arguments.length;
v<t;v++){var s=arguments[v]||{};for(var u in s){w[u]=s[u];}}return w;}});["Object","WhiteSpace","TextNode","Collection","Arguments"].each(function(i){new a(i);
});var c=Date.now();String.extend("uniqueID",function(){return(c++).toString(36);});})();Array.implement({every:function(c,d){for(var b=0,a=this.length>>>0;
b<a;b++){if((b in this)&&!c.call(d,this[b],b,this)){return false;}}return true;},filter:function(d,e){var c=[];for(var b=0,a=this.length>>>0;b<a;b++){if((b in this)&&d.call(e,this[b],b,this)){c.push(this[b]);
}}return c;},indexOf:function(c,d){var b=this.length>>>0;for(var a=(d<0)?Math.max(0,b+d):d||0;a<b;a++){if(this[a]===c){return a;}}return -1;},map:function(c,e){var d=this.length>>>0,b=Array(d);
for(var a=0;a<d;a++){if(a in this){b[a]=c.call(e,this[a],a,this);}}return b;},some:function(c,d){for(var b=0,a=this.length>>>0;b<a;b++){if((b in this)&&c.call(d,this[b],b,this)){return true;
}}return false;},clean:function(){return this.filter(function(a){return a!=null;});},invoke:function(a){var b=Array.slice(arguments,1);return this.map(function(c){return c[a].apply(c,b);
});},associate:function(c){var d={},b=Math.min(this.length,c.length);for(var a=0;a<b;a++){d[c[a]]=this[a];}return d;},link:function(c){var a={};for(var e=0,b=this.length;
e<b;e++){for(var d in c){if(c[d](this[e])){a[d]=this[e];delete c[d];break;}}}return a;},contains:function(a,b){return this.indexOf(a,b)!=-1;},append:function(a){this.push.apply(this,a);
return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[Number.random(0,this.length-1)]:null;
},include:function(a){if(!this.contains(a)){this.push(a);}return this;},combine:function(c){for(var b=0,a=c.length;b<a;b++){this.include(c[b]);}return this;
},erase:function(b){for(var a=this.length;a--;){if(this[a]===b){this.splice(a,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var d=[];
for(var b=0,a=this.length;b<a;b++){var c=typeOf(this[b]);if(c=="null"){continue;}d=d.concat((c=="array"||c=="collection"||c=="arguments"||instanceOf(this[b],Array))?Array.flatten(this[b]):this[b]);
}return d;},pick:function(){for(var b=0,a=this.length;b<a;b++){if(this[b]!=null){return this[b];}}return null;},hexToRgb:function(b){if(this.length!=3){return null;
}var a=this.map(function(c){if(c.length==1){c+=c;}return c.toInt(16);});return(b)?a:"rgb("+a+")";},rgbToHex:function(d){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!d){return"transparent";
}var b=[];for(var a=0;a<3;a++){var c=(this[a]-0).toString(16);b.push((c.length==1)?"0"+c:c);}return(d)?b:"#"+b.join("");}});String.implement({test:function(a,b){return((typeOf(a)=="regexp")?a:new RegExp(""+a,b)).test(this);
},contains:function(a,b){return(b)?(b+this+b).indexOf(b+a+b)>-1:String(this).indexOf(a)>-1;},trim:function(){return String(this).replace(/^\s+|\s+$/g,"");
},clean:function(){return String(this).replace(/\s+/g," ").trim();},camelCase:function(){return String(this).replace(/-\D/g,function(a){return a.charAt(1).toUpperCase();
});},hyphenate:function(){return String(this).replace(/[A-Z]/g,function(a){return("-"+a.charAt(0).toLowerCase());});},capitalize:function(){return String(this).replace(/\b[a-z]/g,function(a){return a.toUpperCase();
});},escapeRegExp:function(){return String(this).replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");},toInt:function(a){return parseInt(this,a||10);},toFloat:function(){return parseFloat(this);
},hexToRgb:function(b){var a=String(this).match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);return(a)?a.slice(1).hexToRgb(b):null;},rgbToHex:function(b){var a=String(this).match(/\d{1,3}/g);
return(a)?a.rgbToHex(b):null;},substitute:function(a,b){return String(this).replace(b||(/\\?\{([^{}]+)\}/g),function(d,c){if(d.charAt(0)=="\\"){return d.slice(1);
}return(a[c]!=null)?a[c]:"";});}});Number.implement({limit:function(b,a){return Math.min(a,Math.max(b,this));},round:function(a){a=Math.pow(10,a||0).toFixed(a<0?-a:0);
return Math.round(this*a)/a;},times:function(b,c){for(var a=0;a<this;a++){b.call(c,a,this);}},toFloat:function(){return parseFloat(this);},toInt:function(a){return parseInt(this,a||10);
}});Number.alias("each","times");(function(b){var a={};b.each(function(c){if(!Number[c]){a[c]=function(){return Math[c].apply(null,[this].concat(Array.from(arguments)));
};}});Number.implement(a);})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);Function.extend({attempt:function(){for(var b=0,a=arguments.length;
b<a;b++){try{return arguments[b]();}catch(c){}}return null;}});Function.implement({attempt:function(a,c){try{return this.apply(c,Array.from(a));}catch(b){}return null;
},bind:function(e){var a=this,b=arguments.length>1?Array.slice(arguments,1):null,d=function(){};var c=function(){var g=e,h=arguments.length;if(this instanceof c){d.prototype=a.prototype;
g=new d;}var f=(!b&&!h)?a.call(g):a.apply(g,b&&h?b.concat(Array.slice(arguments)):b||arguments);return g==e?f:g;};return c;},pass:function(b,c){var a=this;
if(b!=null){b=Array.from(b);}return function(){return a.apply(c,b||arguments);};},delay:function(b,c,a){return setTimeout(this.pass((a==null?[]:a),c),b);
},periodical:function(c,b,a){return setInterval(this.pass((a==null?[]:a),b),c);}});(function(){var a=Object.prototype.hasOwnProperty;Object.extend({subset:function(d,g){var f={};
for(var e=0,b=g.length;e<b;e++){var c=g[e];if(c in d){f[c]=d[c];}}return f;},map:function(b,e,f){var d={};for(var c in b){if(a.call(b,c)){d[c]=e.call(f,b[c],c,b);
}}return d;},filter:function(b,e,g){var d={};for(var c in b){var f=b[c];if(a.call(b,c)&&e.call(g,f,c,b)){d[c]=f;}}return d;},every:function(b,d,e){for(var c in b){if(a.call(b,c)&&!d.call(e,b[c],c)){return false;
}}return true;},some:function(b,d,e){for(var c in b){if(a.call(b,c)&&d.call(e,b[c],c)){return true;}}return false;},keys:function(b){var d=[];for(var c in b){if(a.call(b,c)){d.push(c);
}}return d;},values:function(c){var b=[];for(var d in c){if(a.call(c,d)){b.push(c[d]);}}return b;},getLength:function(b){return Object.keys(b).length;},keyOf:function(b,d){for(var c in b){if(a.call(b,c)&&b[c]===d){return c;
}}return null;},contains:function(b,c){return Object.keyOf(b,c)!=null;},toQueryString:function(b,c){var d=[];Object.each(b,function(h,g){if(c){g=c+"["+g+"]";
}var f;switch(typeOf(h)){case"object":f=Object.toQueryString(h,g);break;case"array":var e={};h.each(function(k,j){e[j]=k;});f=Object.toQueryString(e,g);
break;default:f=g+"="+encodeURIComponent(h);}if(h!=null){d.push(f);}});return d.join("&");}});})();(function(){var a=this.Class=new Type("Class",function(h){if(instanceOf(h,Function)){h={initialize:h};
}var g=function(){e(this);if(g.$prototyping){return this;}this.$caller=null;var i=(this.initialize)?this.initialize.apply(this,arguments):this;this.$caller=this.caller=null;
return i;}.extend(this).implement(h);g.$constructor=a;g.prototype.$constructor=g;g.prototype.parent=c;return g;});var c=function(){if(!this.$caller){throw new Error('The method "parent" cannot be called.');
}var g=this.$caller.$name,h=this.$caller.$owner.parent,i=(h)?h.prototype[g]:null;if(!i){throw new Error('The method "'+g+'" has no parent.');}return i.apply(this,arguments);
};var e=function(g){for(var h in g){var j=g[h];switch(typeOf(j)){case"object":var i=function(){};i.prototype=j;g[h]=e(new i);break;case"array":g[h]=j.clone();
break;}}return g;};var b=function(g,h,j){if(j.$origin){j=j.$origin;}var i=function(){if(j.$protected&&this.$caller==null){throw new Error('The method "'+h+'" cannot be called.');
}var l=this.caller,m=this.$caller;this.caller=m;this.$caller=i;var k=j.apply(this,arguments);this.$caller=m;this.caller=l;return k;}.extend({$owner:g,$origin:j,$name:h});
return i;};var f=function(h,i,g){if(a.Mutators.hasOwnProperty(h)){i=a.Mutators[h].call(this,i);if(i==null){return this;}}if(typeOf(i)=="function"){if(i.$hidden){return this;
}this.prototype[h]=(g)?i:b(this,h,i);}else{Object.merge(this.prototype,h,i);}return this;};var d=function(g){g.$prototyping=true;var h=new g;delete g.$prototyping;
return h;};a.implement("implement",f.overloadSetter());a.Mutators={Extends:function(g){this.parent=g;this.prototype=d(g);},Implements:function(g){Array.from(g).each(function(j){var h=new j;
for(var i in h){f.call(this,i,h[i],true);}},this);}};})();(function(){this.Chain=new Class({$chain:[],chain:function(){this.$chain.append(Array.flatten(arguments));
return this;},callChain:function(){return(this.$chain.length)?this.$chain.shift().apply(this,arguments):false;},clearChain:function(){this.$chain.empty();
return this;}});var a=function(b){return b.replace(/^on([A-Z])/,function(c,d){return d.toLowerCase();});};this.Events=new Class({$events:{},addEvent:function(d,c,b){d=a(d);
this.$events[d]=(this.$events[d]||[]).include(c);if(b){c.internal=true;}return this;},addEvents:function(b){for(var c in b){this.addEvent(c,b[c]);}return this;
},fireEvent:function(e,c,b){e=a(e);var d=this.$events[e];if(!d){return this;}c=Array.from(c);d.each(function(f){if(b){f.delay(b,this,c);}else{f.apply(this,c);
}},this);return this;},removeEvent:function(e,d){e=a(e);var c=this.$events[e];if(c&&!d.internal){var b=c.indexOf(d);if(b!=-1){delete c[b];}}return this;
},removeEvents:function(d){var e;if(typeOf(d)=="object"){for(e in d){this.removeEvent(e,d[e]);}return this;}if(d){d=a(d);}for(e in this.$events){if(d&&d!=e){continue;
}var c=this.$events[e];for(var b=c.length;b--;){if(b in c){this.removeEvent(e,c[b]);}}}return this;}});this.Options=new Class({setOptions:function(){var b=this.options=Object.merge.apply(null,[{},this.options].append(arguments));
if(this.addEvent){for(var c in b){if(typeOf(b[c])!="function"||!(/^on[A-Z]/).test(c)){continue;}this.addEvent(c,b[c]);delete b[c];}}return this;}});})();
(function(){var k=this.document;var i=k.window=this;var b=1;this.$uid=(i.ActiveXObject)?function(e){return(e.uid||(e.uid=[b++]))[0];}:function(e){return e.uid||(e.uid=b++);
};$uid(i);$uid(k);var a=navigator.userAgent.toLowerCase(),c=navigator.platform.toLowerCase(),j=a.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],f=j[1]=="ie"&&k.documentMode;
var o=this.Browser={extend:Function.prototype.extend,name:(j[1]=="version")?j[3]:j[1],version:f||parseFloat((j[1]=="opera"&&j[4])?j[4]:j[2]),Platform:{name:a.match(/ip(?:ad|od|hone)/)?"ios":(a.match(/(?:webos|android)/)||c.match(/mac|win|linux/)||["other"])[0]},Features:{xpath:!!(k.evaluate),air:!!(i.runtime),query:!!(k.querySelector),json:!!(i.JSON)},Plugins:{}};
o[o.name]=true;o[o.name+parseInt(o.version,10)]=true;o.Platform[o.Platform.name]=true;o.Request=(function(){var q=function(){return new XMLHttpRequest();
};var p=function(){return new ActiveXObject("MSXML2.XMLHTTP");};var e=function(){return new ActiveXObject("Microsoft.XMLHTTP");};return Function.attempt(function(){q();
return q;},function(){p();return p;},function(){e();return e;});})();o.Features.xhr=!!(o.Request);var h=(Function.attempt(function(){return navigator.plugins["Shockwave Flash"].description;
},function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");})||"0 r0").match(/\d+/g);o.Plugins.Flash={version:Number(h[0]||"0."+h[1])||0,build:Number(h[2])||0};
o.exec=function(p){if(!p){return p;}if(i.execScript){i.execScript(p);}else{var e=k.createElement("script");e.setAttribute("type","text/javascript");e.text=p;
k.head.appendChild(e);k.head.removeChild(e);}return p;};String.implement("stripScripts",function(p){var e="";var q=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(r,s){e+=s+"\n";
return"";});if(p===true){o.exec(e);}else{if(typeOf(p)=="function"){p(e,q);}}return q;});o.extend({Document:this.Document,Window:this.Window,Element:this.Element,Event:this.Event});
this.Window=this.$constructor=new Type("Window",function(){});this.$family=Function.from("window").hide();Window.mirror(function(e,p){i[e]=p;});this.Document=k.$constructor=new Type("Document",function(){});
k.$family=Function.from("document").hide();Document.mirror(function(e,p){k[e]=p;});k.html=k.documentElement;if(!k.head){k.head=k.getElementsByTagName("head")[0];
}if(k.execCommand){try{k.execCommand("BackgroundImageCache",false,true);}catch(g){}}if(this.attachEvent&&!this.addEventListener){var d=function(){this.detachEvent("onunload",d);
k.head=k.html=k.window=null;};this.attachEvent("onunload",d);}var m=Array.from;try{m(k.html.childNodes);}catch(g){Array.from=function(p){if(typeof p!="string"&&Type.isEnumerable(p)&&typeOf(p)!="array"){var e=p.length,q=new Array(e);
while(e--){q[e]=p[e];}return q;}return m(p);};var l=Array.prototype,n=l.slice;["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice"].each(function(e){var p=l[e];
Array[e]=function(q){return p.apply(Array.from(q),n.call(arguments,1));};});}})();var Cookie=new Class({Implements:Options,options:{path:"/",domain:false,duration:false,secure:false,document:document,encode:true},initialize:function(b,a){this.key=b;
this.setOptions(a);},write:function(b){if(this.options.encode){b=encodeURIComponent(b);}if(this.options.domain){b+="; domain="+this.options.domain;}if(this.options.path){b+="; path="+this.options.path;
}if(this.options.duration){var a=new Date();a.setTime(a.getTime()+this.options.duration*24*60*60*1000);b+="; expires="+a.toGMTString();}if(this.options.secure){b+="; secure";
}this.options.document.cookie=this.key+"="+b;return this;},read:function(){var a=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.escapeRegExp()+"=([^;]*)");
return(a)?decodeURIComponent(a[1]):null;},dispose:function(){new Cookie(this.key,Object.merge({},this.options,{duration:-1})).write("");return this;}});
Cookie.write=function(b,c,a){return new Cookie(b,a).write(c);};Cookie.read=function(a){return new Cookie(a).read();};Cookie.dispose=function(b,a){return new Cookie(b,a).dispose();
};

// MooTools: the javascript framework.
// Load this file's selection again by visiting: http://mootools.net/more/86c702c670f220019bab3a1655ad4beb 
// Or build this file again with packager using: packager build More/Array.Extras More/Object.Extras More/String.Extras More/String.QueryString More/URI
/*
---
copyrights:
  - [MooTools](http://mootools.net)

licenses:
  - [MIT License](http://mootools.net/license.txt)
...
*/
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};(function(a){Array.implement({min:function(){return Math.min.apply(null,this);
},max:function(){return Math.max.apply(null,this);},average:function(){return this.length?this.sum()/this.length:0;},sum:function(){var b=0,c=this.length;
if(c){while(c--){b+=this[c];}}return b;},unique:function(){return[].combine(this);},shuffle:function(){for(var c=this.length;c&&--c;){var b=this[c],d=Math.floor(Math.random()*(c+1));
this[c]=this[d];this[d]=b;}return this;},reduce:function(d,e){for(var c=0,b=this.length;c<b;c++){if(c in this){e=e===a?this[c]:d.call(null,e,this[c],c,this);
}}return e;},reduceRight:function(c,d){var b=this.length;while(b--){if(b in this){d=d===a?this[b]:c.call(null,d,this[b],b,this);}}return d;}});})();(function(){var b=function(c){return c!=null;
};var a=Object.prototype.hasOwnProperty;Object.extend({getFromPath:function(e,f){if(typeof f=="string"){f=f.split(".");}for(var d=0,c=f.length;d<c;d++){if(a.call(e,f[d])){e=e[f[d]];
}else{return null;}}return e;},cleanValues:function(c,e){e=e||b;for(var d in c){if(!e(c[d])){delete c[d];}}return c;},erase:function(c,d){if(a.call(c,d)){delete c[d];
}return c;},run:function(d){var c=Array.slice(arguments,1);for(var e in d){if(d[e].apply){d[e].apply(d,c);}}return d;}});})();(function(){var c={a:/[aaaaaa??]/g,A:/[AAAAAA??]/g,c:/[??c]/g,C:/[??C]/g,d:/[??]/g,D:/[?D]/g,e:/[eeee??]/g,E:/[EEEE??]/g,g:/[?]/g,G:/[?]/g,i:/[iiii]/g,I:/[IIII]/g,l:/[???]/g,L:/[???]/g,n:/[n??]/g,N:/[N??]/g,o:/[oooooo?]/g,O:/[OOOOOO]/g,r:/[??]/g,R:/[??]/g,s:/[???]/g,S:/[???]/g,t:/[??]/g,T:/[??]/g,ue:/[u]/g,UE:/[U]/g,u:/[uuu?μ]/g,U:/[UUU?]/g,y:/[yy]/g,Y:/[?Y]/g,z:/[???]/g,Z:/[???]/g,th:/[t]/g,TH:/[T]/g,dh:/[d]/g,DH:/[D]/g,ss:/[s]/g,oe:/[?]/g,OE:/[?]/g,ae:/[a]/g,AE:/[A]/g},b={" ":/[\xa0\u2002\u2003\u2009]/g,"*":/[\xb7]/g,"'":/[\u2018\u2019]/g,'"':/[\u201c\u201d]/g,"...":/[\u2026]/g,"-":/[\u2013]/g,"&raquo;":/[\uFFFD]/g};
var a=function(f,h){var e=f,g;for(g in h){e=e.replace(h[g],g);}return e;};var d=function(e,g){e=e||"";var h=g?"<"+e+"(?!\\w)[^>]*>([\\s\\S]*?)</"+e+"(?!\\w)>":"</?"+e+"([^>]+)?>",f=new RegExp(h,"gi");
return f;};String.implement({standardize:function(){return a(this,c);},repeat:function(e){return new Array(e+1).join(this);},pad:function(e,h,g){if(this.length>=e){return this;
}var f=(h==null?" ":""+h).repeat(e-this.length).substr(0,e-this.length);if(!g||g=="right"){return this+f;}if(g=="left"){return f+this;}return f.substr(0,(f.length/2).floor())+this+f.substr(0,(f.length/2).ceil());
},getTags:function(e,f){return this.match(d(e,f))||[];},stripTags:function(e,f){return this.replace(d(e,f),"");},tidy:function(){return a(this,b);},truncate:function(e,f,i){var h=this;
if(f==null&&arguments.length==1){f="…";}if(h.length>e){h=h.substring(0,e);if(i){var g=h.lastIndexOf(i);if(g!=-1){h=h.substr(0,g);}}if(f){h+=f;}}return h;
}});})();String.implement({parseQueryString:function(d,a){if(d==null){d=true;}if(a==null){a=true;}var c=this.split(/[&;]/),b={};if(!c.length){return b;
}c.each(function(i){var e=i.indexOf("=")+1,g=e?i.substr(e):"",f=e?i.substr(0,e-1).match(/([^\]\[]+|(\B)(?=\]))/g):[i],h=b;if(!f){return;}if(a){g=decodeURIComponent(g);
}f.each(function(k,j){if(d){k=decodeURIComponent(k);}var l=h[k];if(j<f.length-1){h=h[k]=l||{};}else{if(typeOf(l)=="array"){l.push(g);}else{h[k]=l!=null?[l,g]:g;
}}});});return b;},cleanQueryString:function(a){return this.split("&").filter(function(e){var b=e.indexOf("="),c=b<0?"":e.substr(0,b),d=e.substr(b+1);return a?a.call(null,c,d):(d||d===0);
}).join("&");}});(function(){var b=function(){return this.get("value");};var a=this.URI=new Class({Implements:Options,options:{},regex:/^(?:(\w+):)?(?:\/\/(?:(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,parts:["scheme","user","password","host","port","directory","file","query","fragment"],schemes:{http:80,https:443,ftp:21,rtsp:554,mms:1755,file:0},initialize:function(d,c){this.setOptions(c);
var e=this.options.base||a.base;if(!d){d=e;}if(d&&d.parsed){this.parsed=Object.clone(d.parsed);}else{this.set("value",d.href||d.toString(),e?new a(e):false);
}},parse:function(e,d){var c=e.match(this.regex);if(!c){return false;}c.shift();return this.merge(c.associate(this.parts),d);},merge:function(d,c){if((!d||!d.scheme)&&(!c||!c.scheme)){return false;
}if(c){this.parts.every(function(e){if(d[e]){return false;}d[e]=c[e]||"";return true;});}d.port=d.port||this.schemes[d.scheme.toLowerCase()];d.directory=d.directory?this.parseDirectory(d.directory,c?c.directory:""):"/";
return d;},parseDirectory:function(d,e){d=(d.substr(0,1)=="/"?"":(e||"/"))+d;if(!d.test(a.regs.directoryDot)){return d;}var c=[];d.replace(a.regs.endSlash,"").split("/").each(function(f){if(f==".."&&c.length>0){c.pop();
}else{if(f!="."){c.push(f);}}});return c.join("/")+"/";},combine:function(c){return c.value||c.scheme+"://"+(c.user?c.user+(c.password?":"+c.password:"")+"@":"")+(c.host||"")+(c.port&&c.port!=this.schemes[c.scheme]?":"+c.port:"")+(c.directory||"/")+(c.file||"")+(c.query?"?"+c.query:"")+(c.fragment?"#"+c.fragment:"");
},set:function(d,f,e){if(d=="value"){var c=f.match(a.regs.scheme);if(c){c=c[1];}if(c&&this.schemes[c.toLowerCase()]==null){this.parsed={scheme:c,value:f};
}else{this.parsed=this.parse(f,(e||this).parsed)||(c?{scheme:c,value:f}:{value:f});}}else{if(d=="data"){this.setData(f);}else{this.parsed[d]=f;}}return this;
},get:function(c,d){switch(c){case"value":return this.combine(this.parsed,d?d.parsed:false);case"data":return this.getData();}return this.parsed[c]||"";
},go:function(){document.location.href=this.toString();},toURI:function(){return this;},getData:function(e,d){var c=this.get(d||"query");if(!(c||c===0)){return e?null:{};
}var f=c.parseQueryString();return e?f[e]:f;},setData:function(c,f,d){if(typeof c=="string"){var e=this.getData();e[arguments[0]]=arguments[1];c=e;}else{if(f){c=Object.merge(this.getData(),c);
}}return this.set(d||"query",Object.toQueryString(c));},clearData:function(c){return this.set(c||"query","");},toString:b,valueOf:b});a.regs={endSlash:/\/$/,scheme:/^(\w+):/,directoryDot:/\.\/|\.$/};
a.base=new a(Array.from(document.querySelectorAll("base[href]",true)).getLast(),{base:document.location});String.implement({toURI:function(c){return new a(this,c);
}});})();
//$NOHL
GLOBAL.Cookie = Cookie;
GLOBAL.$O = Object;
};////}}}
setupMooTools();

//GM_log('MooTools','END',Date.now());

/** オレオレ Native 拡張 */
new function(){////{{{

// splice(0) みたいな
Object.clearAll = function(obj){
	Object.keys(obj).forEach(function(k){ delete obj[k]; });
}

// 00:00:00 ←こういうのを秒数に展開
String.prototype.toSec = function(){
	var d = this.toString();
	var times, h = 0, m = 0, s = 0 ;
	times = /(\d+):(\d+)(?::(\d+))?/.exec(d);
	if(times){
		times.shift();
		h = parseInt(times[0]||0, 10) || 0;
		m = parseInt(times[1]||0, 10);
		s = parseInt(times[2]||0, 10);
	}
	if(!times) throw(new Error('エラー：String.prototype.toSec:', d ) );
	return h*3600 + m*60 + s;
}

// 秒数を "00:00:00" ←こんな感じに書式化。24時間超えても時間が増える。
Number.prototype.miliSecondsToDateTime = function(){
	return (this / 1000).floor().secondsToDateTime();
}
Number.prototype.secondsToDateTime = function(){
	var dates, times, Y = 0, M = 0, D = 0, h = 0, m = 0, s = 0 ;
	var sec = this;
	s = sec % 60;
	m = ( (sec - s ) / 60).floor() % 60;
	h = (sec / 60 / 60).floor();
	if( (''+h).length == 1 ) h = '0'+ h ;
	if( (''+m).length == 1 ) m = '0'+ m ;
	if( (''+s).length == 1 ) s = '0'+ s ;
	return [h,m,s].join(':');
}

Number.prototype.commalize = function(){
	var numlook = this.toString();
	var numParts = numlook.split('.');
	numParts[0] = numParts[0]
	.split("").reverse().join("")
	.replace(/(\d{3}(?=\d))/g,'$1,')
	.split("").reverse().join("");
	var commalize = numParts[0];
	if( numParts[1] ) commalize += '.' + numParts[1];
	return commalize;
}

/** 文字列から数字っぽいのを抜き出す */
String.prototype.fetchNum = function(){
	var mat = /-?\d+((?:,\d+)*)(?:\.\d+)?/.exec( this.toString() );
	if( !mat ) return null;
	var numlook = mat[0];
	if( mat[1] )
		numlook = numlook.replace(/,/g,'');
	return parseFloat(numlook);
};
/** 配列内の文字列から数字っぽいのを抜き出す */
Array.prototype.fetchNums = function(){
	return this.map(function(v){
		return ( typeof(v) == 'string' || v instanceof String )?
			v.fetchNum(): null;
	});
};
////}}}
// 日付系、なんか勘違いしてる////{{{
//var oneDayMSec = 24 * 60 * 60 * 1000;
//var jst = 9 * 60 * 60 * 1000;
//String.prototype.toDateDate = function(){
//	return this.toDate({date:true});
//}
//String.prototype.toDateTime = function(){
//	return this.toDate({time:true});
//}
String.prototype.toDate = function(mode){
	var d = this.toString();
	var dates, times, Y = 0, M = 0, D = 0, h = 0, m = 0, s = 0 ;
	if( !mode || (!mode.date && !mode.time) || mode.date ){
		dates = /(?:(\d+)[\/-])?(\d+)[\/-](\d+)/.exec(d);
		if(dates){
			dates.shift();
			Y = parseInt(dates[0]||0, 10);
			M = parseInt(dates[1]   , 10) - 1;
			D = parseInt(dates[2]   , 10);
		}
	}
	if( !mode || (!mode.date && !mode.time) || mode.time ){
		times = /(\d+):(\d+)(?::(\d+))?/.exec(d);
		if(times){
			times.shift();
			h = parseInt(times[0]||0, 10) || 0;
			m = parseInt(times[1]||0, 10);
			s = parseInt(times[2]||0, 10);
		}
		if(!dates && !times) throw(new Error);
	}
	return new Date(Y,M,D,h,m,s);
}
// Date.prototype.formDateTime = function(){
// 	var dates, times, Y = 0, M = 0, D = 0, h = 0, m = 0, s = 0 ;
// 	var sec = this/ 1000;
// 	h = (sec / 60 / 60).floor();
// 	m = (sec / 60).floor() % 60;
// 	s = sec % 60;
// 	if( h.length == 1 ) h = '0'+ h ;
// 	if( m.length == 1 ) m = '0'+ m ;
// 	if( s.length == 1 ) s = '0'+ s ;
// 	return [h,m,s].join(':');
// }
// Date.prototype.formDateDate = function(){
// 	var dates, times, Y = 0, M = 0, D = 0, h = 0, m = 0, s = 0 ;
// 	Y = this.getFullYear();
// 	M = this.getMonth();
// 	D = this.getDate();
// 	if( M.length == 1 ) M = '0'+ M ;
// 	if( D.length == 1 ) D = '0'+ D ;
// 	return [Y,M,D].join('/');
// }
// Date.prototype.formDate = function(){
// 	return this.formDateDate() +' '+ this.formDateTime();
// }////}}}
Date.prototype.formatFullDate = function(){
	return this.toLocaleFormat('%Y-%m-%d %H:%M:%S');
}
Date.prototype.formatTime = function(){
	return this.toLocaleFormat('%Y-%m-%d %H:%M:%S');
}
}

/** sprintf */
//^NOHL //{{{
var sprintf=function(){function j(d){return Object.prototype.toString.call(d).slice(8,-1).toLowerCase()}var g=function(){g.cache.hasOwnProperty(arguments[0])||(g.cache[arguments[0]]=g.parse(arguments[0]));return g.format.call(null,g.cache[arguments[0]],arguments)};g.format=function(d,f){var i=1,k=d.length,a="",h=[],e,c,b,l;for(e=0;e<k;e++){a=j(d[e]);if(a==="string")h.push(d[e]);else if(a==="array"){b=d[e];if(b[2]){a=f[i];for(c=0;c<b[2].length;c++){if(!a.hasOwnProperty(b[2][c]))throw sprintf('[sprintf] property "%s" does not exist',b[2][c]);a=a[b[2][c]]}}else a=b[1]?f[b[1]]:f[i++];if(/[^s]/.test(b[8])&&j(a)!="number")throw sprintf("[sprintf] expecting number but found %s",j(a));switch(b[8]){case "b":a=a.toString(2);break;case "c":a=String.fromCharCode(a);break;case "d":a=parseInt(a,10);break;case "e":a=b[7]?a.toExponential(b[7]):a.toExponential();break;case "f":a=b[7]?parseFloat(a).toFixed(b[7]):parseFloat(a);break;case "o":a=a.toString(8);break;case "s":a=(a=String(a))&&b[7]?a.substring(0,b[7]):a;break;case "u":a=Math.abs(a);break;case "x":a=a.toString(16);break;case "X":a=a.toString(16).toUpperCase();break}a=/[def]/.test(b[8])&&b[3]&&a>=0?"+"+a:a;c=b[4]?b[4]=="0"?"0":b[4].charAt(1):" ";l=b[6]-String(a).length;if(b[6]){c=c;l=l;for(var m=[];l>0;m[--l]=c);c=m.join("")}else c="";c=c;h.push(b[5]?a+c:c+a)}}return h.join("")};g.cache={};g.parse=function(d){d=d;for(var f=[],i=[],k=0;d;){if((f=/^[^\x25]+/.exec(d))!==null)i.push(f[0]);else if((f=/^\x25{2}/.exec(d))!==null)i.push("%");else if((f=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(d))!==null){if(f[2]){k|=1;var a=[],h=f[2],e=[];if((e=/^([a-z_][a-z_\d]*)/i.exec(h))!==null)for(a.push(e[1]);(h=h.substring(e[0].length))!=="";)if((e=/^\.([a-z_][a-z_\d]*)/i.exec(h))!==null)a.push(e[1]);else if((e=/^\[(\d+)\]/.exec(h))!==null)a.push(e[1]);else throw"[sprintf] huh?";else throw"[sprintf] huh?";f[2]=a}else k|=2;if(k===3)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";i.push(f)}else throw"[sprintf] huh?";d=d.substring(f[0].length)}return i};return g}(),vsprintf=function(j,g){g.unshift(j);return sprintf.apply(null,g)};
if($F) console.warn('$F is already assignmented: $F = sprintf');
var $F = sprintf;
//$NOHL //}}}

//******************************************************************************
// 定数
//------------------------------------------------------------------------------

const DEV_MODE = false;

/** 兵士データ */
const SOLDIER_DATA = new function(){////{{{
let _UnitData1 = {
	"足軽"    :{typeno:321, off:11,def:11,mov:15,des: 2,tp1:"t1",tp2:"t1", cmd1:"yari" ,cmd2:"yari" , drill:true , order: 1},
	"長槍足軽":{typeno:322, off:16,def:16,mov:16,des: 2,tp1:"t1",tp2:"t1", cmd1:"yari" ,cmd2:"yari" , drill:true , order: 2},
	"武士"    :{typeno:323, off:18,def:18,mov:18,des: 2,tp1:"t1",tp2:"t3", cmd1:"yari" ,cmd2:"yumi" , drill:true , order: 3},
	"国人衆"  :{typeno:324, off:17,def:13,mov:17,des: 3,tp1:"t1",tp2:"t1", cmd1:"yari" ,cmd2:"yari" , drill:false, order:15},
	"弓足軽"  :{typeno:325, off:10,def:12,mov:16,des: 1,tp1:"t3",tp2:"t3", cmd1:"yumi" ,cmd2:"yumi" , drill:true , order: 7},
	"長弓兵"  :{typeno:326, off:15,def:17,mov:18,des: 1,tp1:"t3",tp2:"t3", cmd1:"yumi" ,cmd2:"yumi" , drill:true , order: 8},
	"弓騎馬"  :{typeno:327, off:17,def:19,mov:23,des: 1,tp1:"t2",tp2:"t3", cmd1:"kiba" ,cmd2:"yumi" , drill:true , order: 9},
	"海賊衆"  :{typeno:328, off:16,def:17,mov:20,des: 2,tp1:"t3",tp2:"t3", cmd1:"yumi" ,cmd2:"yumi" , drill:false, order:17},
	"騎馬兵"  :{typeno:329, off:12,def:10,mov:22,des: 1,tp1:"t2",tp2:"t2", cmd1:"kiba" ,cmd2:"kiba" , drill:true , order: 4},
	"精鋭騎馬":{typeno:330, off:17,def:15,mov:23,des: 1,tp1:"t2",tp2:"t2", cmd1:"kiba" ,cmd2:"kiba" , drill:true , order: 5},
	"赤備え"  :{typeno:331, off:21,def:20,mov:25,des: 1,tp1:"t1",tp2:"t2", cmd1:"yari" ,cmd2:"kiba" , drill:true , order: 6},
	"母衣衆"  :{typeno:332, off:19,def:16,mov:24,des: 2,tp1:"t2",tp2:"t2", cmd1:"kiba" ,cmd2:"kiba" , drill:false, order:16},
	"破城鎚"  :{typeno:333, off: 3,def:8 ,mov: 8,des:10,tp1:"t4",tp2:"t4", cmd1:"heiki",cmd2:"heiki", drill:true , order:12},
	"攻城櫓"  :{typeno:334, off:14,def: 5,mov:10,des: 7,tp1:"t4",tp2:"t4", cmd1:"heiki",cmd2:"heiki", drill:true , order:13},
	"大筒兵"  :{typeno:335, off:10,def:12,mov: 8,des:20,tp1:"t3",tp2:"t4", cmd1:"yumi" ,cmd2:"heiki", drill:true , order:14},
	"鉄砲足軽":{typeno:336, off:18,def:26,mov:15,des: 1,tp1:"t1",tp2:"t4", cmd1:"yari" ,cmd2:"heiki", drill:true , order:10},
	"騎馬鉄砲":{typeno:337, off:26,def:18,mov:21,des: 1,tp1:"t2",tp2:"t4", cmd1:"kiba" ,cmd2:"heiki", drill:true , order:11},
	"雑賀衆"  :{typeno:338, off:23,def:27,mov:18,des: 5,tp1:"t1",tp2:"t4", cmd1:"yari" ,cmd2:"heiki", drill:false, order:18},
};

// キーを name に設定
$O.each( _UnitData1, function(v,k,o){ v.name = k });

let _UnitData2 = {
	"足軽"    :{ wood:9  , cotton:14 , iron:5   , food:5 , period:150, yard:'足軽兵舎'},
	"長槍足軽":{ wood:14 , cotton:20 , iron:7   , food:8 , period:165, yard:'足軽兵舎'},
	"武士"    :{ wood:18 , cotton:27 , iron:9   , food:11, period:180, yard:'足軽兵舎'},
	"弓足軽"  :{ wood:14 , cotton:9  , iron:5   , food:5 , period:155, yard:'弓兵舎'},
	"長弓兵"  :{ wood:20 , cotton:14 , iron:8   , food:7 , period:170, yard:'弓兵舎'},
	"弓騎馬"  :{ wood:27 , cotton:18 , iron:11  , food:9 , period:185, yard:'弓兵舎'},
	"騎馬兵"  :{ wood:5  , cotton:5  , iron:9   , food:14, period:160, yard:'厩舎'},
	"精鋭騎馬":{ wood:7  , cotton:8  , iron:14  , food:20, period:175, yard:'厩舎'},
	"赤備え"  :{ wood:9  , cotton:11 , iron:18  , food:27, period:190, yard:'厩舎'},
	"破城鎚"  :{ wood:14 , cotton:7  , iron:11  , food:9 , period:255, yard:'兵器鍛冶'},
	"攻城櫓"  :{ wood:22 , cotton:16 , iron:11  , food:14, period:255, yard:'兵器鍛冶'},
	"大筒兵"  :{ wood:69 , cotton:81 , iron:108 , food:45, period:330, yard:'兵器鍛冶'},
	"鉄砲足軽":{ wood:72 , cotton:67 , iron:90  , food:75, period:240, yard:'兵器鍛冶'},
	"騎馬鉄砲":{ wood:67 , cotton:90 , iron:72  , food:75, period:310, yard:'兵器鍛冶'},
};
return Object.merge({}, _UnitData1, _UnitData2);
};

const SOLDIER_DATA_BY_TYPENO = new function(){
	let t = {};
	Object.each(SOLDIER_DATA, function(v, k){
		t[v.typeno] = v;
	});
	return t;
};

const SOLDIER_TYPE_KEY_TO_SOLDIER_NAME = {
	"":"",
	yari1:  "足軽"     , yari2: "長槍足軽" , yari3: "武士"   , yari4: "国人衆" , 
	yumi1:  "弓足軽"   , yumi2: "長弓兵"   , yumi3: "弓騎馬" , yumi4: "海賊衆" , 
	kiba1:  "騎馬兵"   , kiba2: "精鋭騎馬" , kiba3: "赤備え" , kiba4: "母衣衆" , 
	heiki1: "破城鎚"   , heiki2:"攻城櫓"   , heiki3:"大筒兵" , 
	heiki4: "鉄砲足軽" , heiki5:"騎馬鉄砲" , heiki6:"雑賀衆"
};

const COMMAND_RANK_TO_RATE ={
	sss: 1.20, ss: 1.15, s: 1.10,
	a: 1.05, b: 1, c: 0.95, d: 0.9, e: 0.85, f: 0.80,
	SSS: 1.20, SS: 1.15, S: 1.10,
	A: 1.05, B: 1, C: 0.95, D: 0.9, E: 0.85, F: 0.80,
};

////}}}

////{{{
const TOOL_NAME = "戦国IXA用ツール";
const VERSION_NAME = "戦国IXA用ツール ver 1.8.6";
const OPTION_PREFIX = 'ixa_moko_';
const HPres0 = [18, 19, 20, 21, 23, 25, 27, 29, 31, 34, 37, 40, 43, 46, 49, 52, 56, 60, 64, 68, 72];
const HPres1 = [90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150];
////}}}
/** 画像 */
//^NOHL //{{{
const IMAGES = {
	rel_interstitial_loading:'data:image/gif;base64,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',
	bg_status_red:           'data:image/jpeg;base64,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',
	btn_all_departure:       'data:image/png;base64,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',
	mode_jinhari:            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAAAuCAMAAAD+3dylAAAArlBMVEVbAACXVFTq6de+jIzf39OcKynfxcXf4NTZjofkxrrhz83OqanQdnHfqqD///+aVFSBAACKAACioZTQqamVlYmzZ2ByGxvw4eGtOziXmIxjAACdnZHgxcWbm4+op5p0AACtf32FNzfV1MK4VE+wiX6Tk4eRAADo5taINzdrAAC3tqfHxrXv4eGscHCiHx94AAGnLCqYGxri4tXx8NyMDQ3AjIzg38zt7Nm3kI+kcXBarrVNAAAEkUlEQVR4XrSSB47kIBBFOQHROXXOOc3M3v9i+ynsRt3G0q40/Y3BKnA9/aLYYhHleV2WWuuGtG22pN125zTdTa2+pl/Q9br6hm637xuWK4Qg9qxw0gn/OiGZldZlWdd5HkU9HNE8z+McDbgr4Yi2WoFmeR7naBieBpx2uIXDHZcf0jmAi/J4+Sn9tDRUM4+As7S8vn8Kl73fHeFmH7Pni+lbJZ9/DDcLdWad/QZAufllXAKdWes/7rAKD7x4ukV1q1JtwG/3FZO7V1ypj/gXI/j4jWckdDb85zngrixj9S86qf/Wct7Hwd4dOwNjo5ZS0gdjmzZmp9FJbQqsduOkutNeLpSF3JUzNaSCWY2IZnknoNogIp3kM78fLqIDOD0fgMmCCZd6xBg3a1awwgahdcImD2IJk8DfgGYhnM4GrguQyqTpGgB8Ebko2MEYBBOBPYjzlA3x5CWIG2Mn8BBOpKkgnIETbh2thRAVB+4hnFghVTiDijUu6x2nj4PuTMIP3IsLRjIcbEG1hHcQwu7UWetXXG1xcd+bbHEH1KpzR/K4Vq6WMphCjVHMHq6596yBRw1SHZDcCIGyir1JgDqgiFXnjmEqguYk5cj6dwdcZrdOmPzc4lKL2xvD8e7TCTlDqwBHd2d4mnTu3lI4Xhly9yPpQL9VzAQmjHHFxEo4+nKdCa3ZBqzwI+UMvfLmrmmaTPZFOFalzKStuycumXTFZOJBlycHdOkXs9HNOICjYtq0pnJ3VxGu4gDjUlt3nO/Bk4OKqTMj9rcWs21RHIaisG4zRkdNFwaKlIEifpBAiuvdAf//P9tzX0Jss9NP40kbM7nNfXKSVAYdRN6R6r6Amy5mSACHtglNG0Z78RZwJ3IeJODA8ka7nr7DjVN3BtaTmcZuH9oFc9AfcqQ4KLs7frOYKYTQfaSyd72+d0lwTcKqjvhWWdCWyHCAeU+OHWZzT/O8ibsPZB1b9dSi6nt1KLiOexeWEro7AObudgAZ65aLLaZ8JZu7EBr2B8xecG0KZ8ZBOqQuMOeB84Yj0QURHlFUcOeWFTbtGgXZIZyR1TpsQhoTWqvIs5wLKNR3Igecz+48OTUnJQvgjDPBj+m8B6TdBEwAPlP4PINXyYAHmCvu7HBe/ju3qJDY97220IiwvA9g7xMb7VfdZ8KLoO7qLF/vhlN3aPLOaWzGGzjzWnaGfTZyJNhzp0sK2HCL8llxbDfYXI071A8DxpltX/Q/Bg0oAaE43FCiUPH0TBJkc3owDedAe/8ahhrHxIhUEAb23LJA7KP12rxqWf+BxF3BgecOGFfj5LbCZIZC+pfGliSP7GjmznuY49BcOade5iJ3CblEK1n0orSCA/l6sOjzZblKY/Y5Dd3qS4A7KryV7pyn+/AamTnyhvMC3L6KZuaKO+DIvczciVTlvUNrizP3kms40sSdF3dvQ1b8wbqYK3sH0dEQ8YeB0cz5570jd+LoK+y9UZYvi4kmsbS+EvHPT1I9fj2m+jsTeh5Zv/hGRTpWMuEum5ePiiOR0a4mAGV4YXGZiDsLUXH0sPGPJxZojPsHjc4boFxTvb4AAAAASUVORK5CYII=',
	mode_jinhari_yellow:     'data:image/png;base64,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',
	hd_joinattack:           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAAQBAMAAAB0CfmiAAAAHlBMVEVAFgCjj3x7XkrKwK1nRjLy8d1ULhq2p5SPd2Pe2MW6CYY4AAADLUlEQVR4XnXTT0/jVhTG4TeOc2+ySwF3ys5c8JTuLDQZiZ3Ln9GwS+y8OHfnUkKUnQP1JMtoJGbELlNhMnzbHjtihFr1t7B1jq3HsiyDUsGqfVpb8kfP5I8xZd3rIe6xfH61tb2Xy6LVKgS7NepDjolHXnqsyu+ZOuTywZa3CF6p/Y7Ixr+eQM34o5FL6ecH9lu1mqSK5Lc99+PKNDpk3GaV79XqE9bAyT7J9ZxVvXxM2q3u2YPjd8tuwU2hKknGap7r2z9xZPyrNr8xBbDcgjhDzR5JsFatFrvqHdBmYozy763HXKaGjyDvcGF2SWZfppQOTXZtDpHm+j2A+9RVOElufiNXk/KKHLjz+cL9SJaiJhdM1Y4TBZzjLqv4PMrc4P1V2T0PgSYZOzbzGO+Rbx9PCfZbYWvVYqVGULSJj2kYcKiNOVCmR6YAXIbTuBm3SSSwYK0CY/rFOv/Vo/UDPrk9m+3PnRmKSo10N2B6oqIEmiFw7IzkrC3rd/dSp/oAUW81rjgMMZP1X/51K0TBG/INKeJ85mSqfDTA1bIjaqdxFhXsQmY4u/GVQ8cqRnoViDqAGmhRrcOuR7kPq50zLWtA+dh7brNq4B4Zc/i9QasPtu2irNSvS0XJGR3sR2MbN0Xw3yg9cERl6sSVmjaYsVa/LzAm2Q8+n7xTqd6mZMs7MilLjlq5rzVhczTCBsn11lu4cmE1FmxRHmlmX2v1slWrozYJroFteOLMTIYLmzaax6yC1CRX5xs1xB/0Vf0b+M5PF2T3fqBJxpq/pLUa3ouaqO6YAzeB8mJMZW0M9nbKFOeGFBik3DXMvI16+TtjlU1JI6o5KJl5w+ZG5Ub9QFGZoWC3w2uP/o0qGYtqzAVRLFXUflFTlMtc6wUs6U+fVBGibpq4WTR+pe7glHFAPk6SL25J8dRzNklQp8rofAS4LyrBaKX1Z5BPDhM0xchlzWFjhWKjxnCYYgtVPXK0JwfaLGBYjXNQ+rtgHSRRo7XuawBM3R75qRAPlWp30ztKcZP0NXnC2/pneik/JdMJBQBfBbI/Jg+6RXrst0EKumne438r/zUnL4M8/H/7B+kZX+MKj6uvAAAAAElFTkSuQmCC',
	btn_gojinhere:           'data:image/png;base64,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',
	btn_butai_save:          'data:image/png;base64,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',
	btn_all_breakup:         'data:image/png;base64,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',
	btn_all_setting:         'data:image/png;base64,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',
	wait:                    'data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq+vrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf///wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh+QQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd/AnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh+QQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2/AeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD+BCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY+gbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi/Zyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE/gEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH+IGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa+AepgPNB8qaJGg6RQpB4P1GV+IWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs3',
	panel_rollover_pink:     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8BAMAAADI0sRBAAAAG1BMVEX////+1v/+1f/+1//+2P/+2f/+1P/////+2v9UVb4kAAAACXRSTlMAZmZmZmZmHmZn3sEXAAAAvElEQVR4Xu2VMRKDIBBFMSnSunABobBnPhfIiDfQPhV1LpF7Z4kSGVEvoK99/P0LDeItDniIs3BxcXEzR9YQUb0nK5rYtvSn2YvCKtZSr61dsoZpX7m8A4uXrEMIWVR1izWJJrXC+Q5UHGjnhZXzQPQAlNSa1XSsmXeGgo1DLOVkN4b3vU8dMsbr/NKO5WfwgGVJevV2ROjHcXiCK2nj5StSgPt1S46WmDiVUrSkkkZnC5cU0WIDcRKOP8kv6sshIjhWepkAAAAASUVORK5CYII=',
	bg_information_timer:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAAjCAMAAABhGJ6uAAAANlBMVEX////37Jr++7j796n05JL9+bH59KLs3IrkwR7LpR7+/R6ngR7k1ILtzR7dzXvYsx733h67lB4rylP8AAAAAXRSTlMAQObYZgAABDlJREFUeF7Fl+ly3DgMhN24NJePvP/LrrubrDijza/sOuCEwjAwPlyUyy+S+/3l78n9b9Gvt9vtE367Xb+f/Xr7lMud+8e3499FF/v1Q/Lq9atcfsr7fyYv3C4CfCz2iX7h+r/g9Cj4bQbIwsTMpFdmInjAI3+fjOG/HkCfmsTINGkGGwYd2Asm/CzIoOrI2fCV+g1TlZjoGfnrtSLHniZEiMmOnCwkAOJAfhKzhFwd9AQGhM/Ilk8qz5kfM3BsK+/QQUxjyKca09z5SJSSQSUgFtk7kkjxuetJFwcoVQXgGY4Sih/l291AIlfCPHUpiGcw8pIOmFZVZtPSibQq7meN0Sjyn+EuW66eCgdQ3Qk3t+icaR7/hDu9IRxDFQ42M6mG0DPsOQqS556nW0ZurmQxZJJshVr3UlAHQAzp4uyWgRRYb3mgXVYJXlP4JfMPDhxI646O2WyksNkeuo3u7pnVPVPWQG3VhaNONtVoByev57KDp4A970zaTYxICalagqFKxRQ0ASdvYnKn5tuWrf9OMeo4wXf4LpWjzLW6fXuJjSaLbByFAURJU21vT1vLRK7RUCBA4Xp56vnYI9nhxomYE1xOXEXcbKaAx3ovbTQGU0JmuIBBahHMD9l16nlGeEzY2EiHobFv+Jax6nQpM5f9mAeAVjDMEMq2CAmNC8WlkgS1Oo7T6zUdW8d4XtzbSNSEJiGzeUDQrGErd5RJUTBcM45cJ5AFKEOdRT3D5eHgXCZhpFORtuGhltONREpO7v6kyOZER7vUWHBqNCP9dM+JO/Yl4R6ybOrtwsfIIVAGT274vlsG8Sc6GEqBpw40aGnAc8/lgRZONaDcnVN0GN6iVwmN0haDL3Dxw4EeGPeF9lqZ/px6Pp4zEpm0qhv2w0kbReDc1PB0g4/cmXNzECvzsrOyvaxXWU9wOfmSBbi7lc0V4V81Tl1Td+jmZNAAafjyH5MEOrIVKSAI8Dj1vEOzPYYT6mV0T0TPsW94EYEaqLIUkKmS7SGola3AU/6uCXx77rmI0QoOSiPslWVP84FxrXGQjkLloAw3M2SkbpWS3e+FgjvPg9NVa3XXxQdGkpJpOZPbFFTzngkdAOVZSzhtgHCKDPTweI7bXjjDnTrbPpUZguvZpHeg/IaSGOY3W9XAQYmtTlHcEiXueGmmoJ97HqIrQVKj9U1uPG3umG+xYSxhYlR4w6DyZ4eNRzuZVTsAhffc8+hWjSnIDINhek/QwSE4tJvmmfaUetVE69QVH+KqymH4idNVC02qJFzqDn2Xj3q8vT2OA4Irb8Oh5ApJ2QHFLn+WzJc9UrfkN/De9PbMxEBjiOOoo5SK8yx3d+VS3DSnPDKalgq6FG6Bsgp26vm//8Vy8b7kU3m3XC/X9ysVHZzl8ruzy9XKU88lT2zRz38umfqH8nL9UvYfL98u9x+CX+/fTv4HDxZZUho6AOwAAAAASUVORK5CYII=',
	panel_attack:            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAhFBMVEX////////////wAAX7xsfuVVv94uL4jY/6qqv84uP+JRWCGwDsCwDxHCDmAArzjZHoHCT4rar84+L2cXP0d3H+hXz+trHgAAr2qq3zODv+VEj6yMbwQDj+zsryXFX1VVj/Pzv/amL+q4vmOD/+PC7+bWP5xsj+nZbqVVvuJRztcXb0qq0Hiew9AAAAAnRSTlMAHoyc8FsAAADQSURBVHhe7dPHjsQgEEVR/MiOoXPuyen//28o2V6iqbZ3I45ULJCuqA0iE3NR+u8kSZIUEaz2OYJRF09Rf9fFPYoR55PNMc9f3y4fm+12uGDEJVl33RrXsvwC0J/Qn+mSEUtyUMoikAgUrCTcWDqncICsnFHWoHowNsYoJaubXQEYav7axlmspHQIFPvlmux9oz32dfsO0tSEGVOOpvW+1VojDDfeDT5fwkHz/bMbceIIiufXvG81maKReMiYilkiu/IsacWSVjDaJEmSbEH6C2YiHcsMhjZ2AAAAAElFTkSuQmCC',
	panel_meeting:           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA6lBMVEX///////8AAABMShnm4UnMyEGZlTEzMhHmoUdmZCHr52n47Yv47pPo41Pr33vn4k6zrznw5Hzm11mAfSnt5nJNSxzBuG1MRx5MSxo0MRpuaT/p3G/BuXOzp0jt6E7///D//73////s6HP47pI0MRwaGAu0sD3s5m7o2maEf0K6sV/Vym80MRtOSinMyEP47Yz47Y347Y/BuXHo2mQ0MxkbGg4bGQ4aGQnm11vNwFOZlTLOwllMSxvp22qBfjDp5Fnp5V22s0ycmUROTCPMyELm4Us0Mxjn4kxnZSQzMhMaGQpoZSmbmECCgDxusGPvAAAAAnRSTlMAHoyc8FsAAADnSURBVHhe7dO1csUwEIVheXclsy8zc5iZmfP+r5Mbx5NOk7XdZfR1p/jLIyyRmSX+H8MwDEeD1Y40GLUz0Pq7doZajNhP1Ov+9s7u3iTotpcrCHyfEZdjJ6cA5yuXndbG5nTWaPSiaL/MiCk2f3v/gM9FdXVtHdDeKpRKHnFjBd+eDqqHRwA2Hi/jMTuWZ83mRe3q+ub2Du4RHh49jx+TspVy8bnw8go1BKIwTB2TBBdcBLdI5KWLKxWSaCtZRJREISvWyR3z6/6P3zbVJZPYSYhUklRkErciozytyNMKRmsYhmHlSL8A1JIfmD1WKSQAAAAASUVORK5CYII=',
	panel_backup:            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAt1BMVEX///////8AAAAVFx3E1/6Qn8d7h6o9Q1UWGB0+RFW5zP6Up/vN4P7C1f7P4v5ARlW8z/5SW3K/0v4/RVUrLzkpLTm1yP6Yp8eRoMe7zv4UFh3O4f4qLjmJlqrZ+v7A0/6IlarZ+f7X8/5yfI5UXHJWX3K2yf4pLjm2x+NzfY58iaqBjaorMDl5hapnco6Pnsd9iqo/RlUVGB2nuOORn8c9RFW4y/57iKpoco5lb46kteNncY5td445lFx0AAAAAnRSTlMAHoyc8FsAAADmSURBVHhe7dPFbsUwEIZRZ8Ycpsu3zMz8/s/VJI26szpJdpXPwvpl6VsOC9hoAft/PM/zQgdSu+NAqMN9p7/r8MCJEEeds732Xa+T821y2OwkiSJCPOtcw8utlIvHI9yUq9X7SVHYGSG2LXEKCNVxOq80aITnJeexpcb2AkpIL9O51ldfALjgnNPjG2PA3JXF/YOulMCnOB4Q17kC9WqWb2YDSgmbZfRYQo6AtbL2o84tyuYrpsdSSCGaAfhpAdqVkWKXyTG93v3x2w46yT4Oe2yQPmWjdC0baUrLprSM0Hqe5wUT0m9NfB/cMq09jQAAAABJRU5ErkJggg==',
	panel_jinhari:           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAb1BMVEX////////+FW3+7vX3qtD5mcaCAB/5qsr93ezgAG76qs/7u9n1mcb+7vT97vb4iLzwAHD/O4//YqH+i5/mAHHsAF/+NID+c6f3d7P+JXf+RIrziL3pIoT4u9nyd7PtRJftEWrxiLvsZqj5zOLkIoGv7HfNAAAAAnRSTlMAHoyc8FsAAACiSURBVHhe7c63DsMwDEVRWd3d6b3n/78xHvySSYjIbAEPCA0ELihVKC6kf0UIIXxCVrtIyKj9POl77WdJGbGG3X6t9UZ/ZMQrCG0bwjhXLDLiASoXe2dcPwApritTmdrwYlebaCIz3kby5SXYpmvGORyxIMWns7WdtRdCXMLtPj6PZ/lGiIEQo6a24AHRRJFMqWLBX1nQsqBlyWiFEKL4IX0B4e4WdYSReksAAAAASUVORK5CYII=',
    flt_action_log:          'data:image/gif;base64,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QhuK3GLmpLQgFU8VdZlWU7L1BK1t7VnF+8hHhpenKQSvecvLXpmq1bvi9S4dy3temYLXA+qVqQowa92CBtOvwNwTMqvL3L0u6b/rC/CB1ZdgBWO3kadFSxPV0sQJ66V2Fqbwfje8lgx3eMMY5vALQ1xhtkx4l6ElbooBvGLRtvjFr3uw7babRETauDEfeKRuYczjHvv4x0CWioxDWt/5rrfISEbrkZN83vE62chLPjJ76ctk+tZxx0HOspa3zGXADlm7+A1zesUM3zGD98xhRjP+mtur5jS7ec1vFjOUyyzlJ8s5vPldbwGw3OU++/nP9iOw/bBrVxHQ7dCILtuKBd1nRnfZ0YBe8ZdFMOUpy7fS9U1ypa1c5fZCedOgDrWoR21pJ1eZvKROtXnVq+pQn9rUsNZ0q1Mt51ljOta4fjWqbe1qVvPa07rONa5/TexZB/vY4xXRULdb6GJP2dfOjra0p01tade62tjONqahre1uY/va3g63uMf960vtebuNpPalyc3udrv73fCOt7znTe9601vZsaOmvffN7377+98AD7jAB05qcxvkssghuMIXzvCGO/zhEJc3vrMTYdtF/OIYz7jGN85xfxOWkRbvuMj+R07ykpv85FzFqmFDjvKWu/zlMI85uT+eXUrL/OY4z7nOd57y7PoPtSznudCHTvSiL5zm6Ta60pfO9KbPXOVAT7jTp071qlt91EgP+tW3zvWuD720UReP18dO9rK7POtSN7va1872h4M96W2Pu9znbm+0i53ueM+73r39dq3v/e+AD3zBsQrytAv+8Ig/fN8Nn/jGO37udrf54ydPebMv/u6Vz7zmrR75zXv+80u/vORBT/rS37zzpk+96lEu+tW7/vUcRz3sZ097hre+9rjP/b9lr/ve+x7et/+98Icfbt4T//jId3bwk8/85qva+M6PvvTLu/zpW9/50L++9on+X/3te//32f+++Gvf/fGbH/bhP7/6TV/+9bsf9Ol/v/wr3/752//x8b+//gVf//37/+8PtkKj938ECHiTVoAIaICEx10DmIAOGHcH+IASCIELuF+MN4EYOHYRmIEc6HVIJ4AdGIJct4EiWIJO94EXaIIqSHQkuIIuKHQoiHkvOIM614I0eIMwF4MNiIM8eHI22INAOHI6GIREWHI/WIRIGHFDmIRMiHFH2IRQOHBLGIVUqHCE5ndVmIX9NoVa2IX8NmRc5YViuG9cOIZm+G5XaEo7eIZsWHwViIVtGIfZloZhKId22G35d4d6aGt0uIZ7+IezloeAOIig1oeEeIj+gfiGKYiIjDhlhtiIkLhpghiJgPiIlHiJk3iJemiJmgiJmdiJcsiJoIiInziKbCiKpjiIT5iKdzhxUnRFdciKhLiKshiHrqhValiLs6hyNaeLqihU+eYBsOiHvniKvAh3xdiKwEhxMDGMybiHtPiMXniLzbhVxCiN03iMcIiNYkiNwmiN3BiK2riI4diF3uiM5WiMPodu25iOVXiO4OiOZliK8hiE8JiL9diNiiiD+ZiF1Bh1sdiP/liBICiQWnglKfRzqXWNBkmEZdiQTYiQzAiQDAmRPfiQFomEEqmQ8ZiREUmQ5OiRF3kdCVlx+CiSSYiRKDmSolOSK3eSK+n+kCDJjzHJkmjhkhRZk0Wokjo5gxtpkgHZkzjIk0K5gj/5kkFZlD45kxWplB14lDnplDdIlFIZgj95AieAFlhpVVzZlV75lWAZlmI5lmRZlmZ5ll6JlVqZWyGgliqAlXAZl3I5l3QJAXZ5l3Z5AhCAlXlJl3KJl3uZl3fJl3jpl4Z5mIiZmIA5mHupl42JmIDpmI7ZmJGZmJZ5mYe5mIJJmJYZmYLZl5WJmaI5mpoZmJypmIX5mZRZmKPZmpdZmnp5mpCZmoEJmqzpmrhpmLC5mom5lgbhlrlZl3FZmYOZmZpJmMfZl7oZnK85nKxZnLp5nJO5mJKZmczZmc5ZnND+6ZewOZ2e+ZjceZ2KmZ22CZ51KZ2lWZuQKZ7rCZfEqZzciZ67aZ5zSZ/sOZzkuZr2CZe+2ZZZeWMAGqACOqAEWqAGeqAImqBuoZe/eQI1pqAQGqESOqEUWqEWeqEwZJcNep3wGZvjWZ/paZqTiZv7SaLmWaL4CaLp6aHbKZoo2pod+qJ8eZ4rqp8kep/V6Z7YqaK7iZw3ep8xuqN/GaIs2qGYKaMueqJCmp8QsKHMWaMoGqOMKZ+bKaIpiqNDmpxReqJTSp3TGZtWqqNYmqXUaaTOSabeqZ2MCab1OaZk+p3GiabdmZps+pduyqRTGqfkmablaZphOqN3ipxluqUYcppohnqoiJqoirqojNqojvqokBqpDxEQADs=',
	facility_tool:           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAYCAMAAAAGTsm6AAABWVBMVEVCIQsAAABCIQtCIQtCIQvQyJbNxZLTzJvSy5rWz5/VzZ3X0KHZ0qPCuInAtoe9soLOxpS8soG+s4S/tYXRyZi7sIDCuIjNxZXv7d3QyJjFu4rw7d7Wz6PMw5TUzZ7Hvo++s4PLw5LTzKDRyZrGvI3KwpLUzZ3GvY3TzJzFu4vIv4/Fu4zMxJTDuIjPx5fAtYXDuorGvIvOxpe6r37DuojRyprb1Kbe16rd1qjz8fDa06TGu43f2azj3bHOxJj39efJv5D////OxZfg2q3JwJLm4brp477RyJrY0aOhkIXXz6H39ehCIQvi26/LwpXWz6Hk3rPc1dHKwJPNw5XSyZzd1qrLwZPUzJ7GvI/LwpPPxpjY0aLQx5nZ0qTKwJJOLxrb1KjHvpDDuYrVzZ/m4LXIv5HEuYvUzJ/LwZXQxpjSypzHvI7Z0aTa06ba0qTRyZzJvpDNxJXWzp9hbJNIAAAABXRSTlPvAJ8gMC39vXwAAAFySURBVHhevM1FdsQwFETRL9tr+iIzYzOGmXn/EFlp98kG5DupU6MHhNgWtKMCyyYEiAMVj0bFK3AI2DBv8rtR5c1cZa0qmP1z5c1GEFQWAM+8o7X/5K898zIOcBl1g+Rx0ftMOuOiVoWTg/fJ/Z/FW2KaCreRe7C6Hpy4pukw7U3jc1qmu15aUoxvqVE6zBjDpZSyYKxQ84zs5VXKzQczSIcRt/Kh91Vjvf/B+kI/WaA5OizCm8G3EOLs+MJTYYoK/xZb31gKw1AYRsFghALCjORAcBzCDGmGVFBS+hwatuD9LwJJNrCCZ9/uVV/5/vuNfReD0jxilEVxdRVHBsaEKcUx10JKQ77A1Pf0tVpSOCaMlT0X/xc89oQQ3hj//AruY0gmTDTkE7T+Km0Q2SICyoRRZTd8+UPQTLhfkYdRaSL70ExYvqWJ67pJKuGpcOs6sz8mp7Njw5upt2jlU6d209zS0yfIerXKAjV9Ght7jc3bJzxj/bF/4YKoAAAAAElFTkSuQmCC',
	moko_config:             'data:image/png;base64,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',
	fenceYellowE : 'data:image/png;base64,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',
	fenceYellowN : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABcVBMVEX/////7zj/7zj/7jX/3Q//7zj/7zj/7zj/7zj/7zj/5AD/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/6y3/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7TT/7zj/7zj/7zj/7zj/7zj/5h7/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/7zj/5xD/6yT/7zj/7zj/7zj/6CP/7zj/7TD/6ij/5h7/5h//7C7/5yH/6ir/7zj/7zj/6Sb/7zj/7TL/7zj/7zj/7zj/7zf/3xX/6Sf/3hL/7zf/6Sb/5Bv/6iz/3RD/7zj/5yT/6Sn/5R7/6y3/4hj/5SD/7zj/7TL/7jX/7jb/6zD/6ir/5yP/5Bz/6y//7jT/7jb/4hn/4Bb/3xP/3hBTim+sAAAAe3RSTlMAAL8A+3Y2Ma+EAGx8Qj+4pIKQjYpOJrG6n38rKDO8mJKrOamzXadFZkiaUb1XVGC1Y51w73NplYdLHiG+rbdaHC6iPHkjAAAXGRPdEYDH7uuU5bkVp9MPalQNCQz0tvcWvuaS+QfIqt2H7tcLWz4lbaHO43k/KOvx9vlNMYHhAAABF0lEQVR4Xu3MVVPDUBBA4YY67u4SvFgNdw11KBXc3f3Xc4fMsIHszO7wfM/7dyycZDKZbFv5zrq8lGuKxHf72RPdw4GNX17X1rcy14LCgY1vbsdmVlc2xEG3cGDgZ09dfeXiuH5QfmUl8VGq1dHgnP05GDWJz0LdnQWF88YDHx/E+tO9FaN/Dkz8qHYNDXRMmw8cfJ6w+0by/MjBc0/iw7C7pDZ/ATmkLkh8mWwuLSsPIofQA4l3tJrhnqYAcojtkngv3tK2WTyHHNRTEh9HB9urXJPIIXFFYlukr7G6aAo5hJ9IrHhzRBPIIflGY5HQyEF7Z2HwxkP8g4nBwyH6ycTgoYiNhXHvZWHEczEaH+MRmJlMJpN9AU6PSx2hAvB+AAAAAElFTkSuQmCC',
	fenceYellowS : 'data:image/png;base64,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',
	fenceYellowW : 'data:image/png;base64,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',
}
//$NOHL //}}}

const FACILITY = {////{{{
	'木工所':{
		product: 'wood',
		1:	{wood:6	,cotton:24	,iron:15	,food:15	,cost:1	,crop:5	,sec:105	},
		2:	{wood:15	,cotton:60	,iron:37	,food:37	,cost:2	,crop:11	,sec:195	},
		3:	{wood:34	,cotton:138	,iron:86	,food:86	,cost:3	,crop:20	,sec:429	},
		4:	{wood:103	,cotton:414	,iron:259	,food:259	,cost:5	,crop:32	,sec:858	},
		5:	{wood:258	,cotton:1035	,iron:647	,food:647	,cost:7	,crop:52	,sec:1716	},
		6:	{wood:879	,cotton:1811	,iron:1242	,food:1242	,cost:9	,crop:78	,sec:3260	},
		7:	{wood:1495	,cotton:3079	,iron:2112	,food:2112	,cost:12	,crop:108	,sec:6195	},
		8:	{wood:2094	,cotton:4311	,iron:2957	,food:2957	,cost:15	,crop:144	,sec:11151	},
		9:	{wood:2722	,cotton:5604	,iron:3843	,food:3843	,cost:18	,crop:185	,sec:18956	},
		10:	{wood:3538	,cotton:7286	,iron:4996	,food:4996	,cost:21	,crop:229	,sec:30330	},
		11:	{wood:4871	,cotton:9472	,iron:6360	,food:6360	,cost:24	,crop:240	,sec:45494	},
		12:	{wood:6819	,cotton:13260	,iron:8904	,food:8904	,cost:27	,crop:252	,sec:63692	},
		13:	{wood:10230	,cotton:19891	,iron:13355	,food:13355	,cost:30	,crop:265	,sec:82799	},
		14:	{wood:15345	,cotton:29837	,iron:20034	,food:20034	,cost:33	,crop:280	,sec:99360	},
		15:	{wood:23017	,cotton:44755	,iron:30050	,food:30050	,cost:38	,crop:300	,sec:109295	},
	},
	'機織り場':{
		product: 'cotton',
		1:	{wood:15	,cotton:6	,iron:24	,food:15	,cost:1	,crop:5	,sec:105	},
		2:	{wood:37	,cotton:15	,iron:60	,food:37	,cost:2	,crop:11	,sec:195	},
		3:	{wood:86	,cotton:34	,iron:138	,food:86	,cost:3	,crop:20	,sec:429	},
		4:	{wood:259	,cotton:103	,iron:414	,food:259	,cost:5	,crop:32	,sec:858	},
		5:	{wood:647	,cotton:258	,iron:1035	,food:647	,cost:7	,crop:52	,sec:1716	},
		6:	{wood:1242	,cotton:879	,iron:1811	,food:1242	,cost:9	,crop:78	,sec:3260	},
		7:	{wood:2112	,cotton:1495	,iron:3079	,food:2112	,cost:12	,crop:108	,sec:6195	},
		8:	{wood:2957	,cotton:2094	,iron:4311	,food:2957	,cost:15	,crop:144	,sec:11151	},
		9:	{wood:3843	,cotton:2722	,iron:5604	,food:3843	,cost:18	,crop:185	,sec:18956	},
		10:	{wood:4996	,cotton:3538	,iron:7286	,food:4996	,cost:21	,crop:229	,sec:30330	},
		11:	{wood:6360	,cotton:4871	,iron:9472	,food:6360	,cost:24	,crop:240	,sec:45494	},
		12:	{wood:8904	,cotton:6819	,iron:13260	,food:8904	,cost:27	,crop:252	,sec:63692	},
		13:	{wood:13355	,cotton:10230	,iron:19891	,food:13355	,cost:30	,crop:265	,sec:82799	},
		14:	{wood:20034	,cotton:15345	,iron:29837	,food:20034	,cost:33	,crop:280	,sec:99360	},
		15:	{wood:30050	,cotton:23017	,iron:44755	,food:30050	,cost:38	,crop:300	,sec:109295	},
	},
	'たたら場':{
		product: 'iron',
		1:	{wood:24	,cotton:15	,iron:6	,food:15	,cost:1	,crop:5	,sec:105	},
		2:	{wood:60	,cotton:37	,iron:15	,food:37	,cost:2	,crop:11	,sec:195	},
		3:	{wood:138	,cotton:86	,iron:34	,food:86	,cost:3	,crop:20	,sec:429	},
		4:	{wood:414	,cotton:259	,iron:103	,food:259	,cost:5	,crop:32	,sec:858	},
		5:	{wood:1035	,cotton:647	,iron:258	,food:647	,cost:7	,crop:52	,sec:1716	},
		6:	{wood:1811	,cotton:1242	,iron:879	,food:1242	,cost:9	,crop:78	,sec:3260	},
		7:	{wood:3079	,cotton:2112	,iron:1495	,food:2112	,cost:12	,crop:108	,sec:6195	},
		8:	{wood:4311	,cotton:2957	,iron:2094	,food:2957	,cost:15	,crop:144	,sec:11151	},
		9:	{wood:5604	,cotton:3843	,iron:2722	,food:3843	,cost:18	,crop:185	,sec:18956	},
		10:	{wood:7286	,cotton:4996	,iron:3538	,food:4996	,cost:21	,crop:229	,sec:30330	},
		11:	{wood:9472	,cotton:6360	,iron:4871	,food:6360	,cost:24	,crop:240	,sec:45494	},
		12:	{wood:13260	,cotton:8904	,iron:6819	,food:8904	,cost:27	,crop:252	,sec:63692	},
		13:	{wood:19891	,cotton:13355	,iron:10230	,food:13355	,cost:30	,crop:265	,sec:82799	},
		14:	{wood:29837	,cotton:20034	,iron:15345	,food:20034	,cost:33	,crop:280	,sec:99360	},
		15:	{wood:44755	,cotton:30050	,iron:23017	,food:30050	,cost:38	,crop:300	,sec:109295	},
	},
	'水田':{
		product: 'food',
		1:	{wood:21	,cotton:21	,iron:18	,food:0	,cost:0	,crop:6	,sec:94	},
		2:	{wood:52	,cotton:52	,iron:45	,food:0	,cost:0	,crop:14	,sec:168	},
		3:	{wood:121	,cotton:121	,iron:103	,food:0	,cost:0	,crop:24	,sec:303	},
		4:	{wood:362	,cotton:362	,iron:310	,food:0	,cost:0	,crop:38	,sec:516	},
		5:	{wood:906	,cotton:906	,iron:776	,food:0	,cost:0	,crop:56	,sec:877	},
		6:	{wood:1811	,cotton:1811	,iron:1552	,food:0	,cost:1	,crop:84	,sec:1490	},
		7:	{wood:3079	,cotton:3079	,iron:2639	,food:0	,cost:2	,crop:118	,sec:2533	},
		8:	{wood:4311	,cotton:4311	,iron:3695	,food:0	,cost:3	,crop:156	,sec:4306	},
		9:	{wood:5604	,cotton:5604	,iron:4804	,food:0	,cost:4	,crop:198	,sec:6890	},
		10:	{wood:7286	,cotton:7286	,iron:6245	,food:0	,cost:5	,crop:244	,sec:10334	},
		11:	{wood:9472	,cotton:9472	,iron:8119	,food:0	,cost:7	,crop:256	,sec:15501	},
		12:	{wood:13260	,cotton:13260	,iron:11366	,food:0	,cost:9	,crop:269	,sec:21702	},
		13:	{wood:19891	,cotton:19891	,iron:17049	,food:0	,cost:11	,crop:283	,sec:28213	},
		14:	{wood:29837	,cotton:29837	,iron:25575	,food:0	,cost:13	,crop:299	,sec:35265	},
		15:	{wood:44755	,cotton:44755	,iron:38362	,food:0	,cost:16	,crop:320	,sec:42296	},
	},
	'伐採所':{
		product: 'wood',
		1:	{wood:14	,cotton:46	,iron:30	,food:30	,cost:1	,crop:9	,sec:135	},
		2:	{wood:32	,cotton:118	,iron:76	,food:76	,cost:3	,crop:19	,sec:250	},
		3:	{wood:69	,cotton:262	,iron:166	,food:166	,cost:5	,crop:36	,sec:550	},
		4:	{wood:201	,cotton:791	,iron:497	,food:497	,cost:8	,crop:60	,sec:1100	},
		5:	{wood:476	,cotton:1895	,iron:1187	,food:1187	,cost:11	,crop:94	,sec:2200	},
		6:	{wood:1541	,cotton:3168	,iron:2175	,food:2175	,cost:14	,crop:139	,sec:4180	},
		7:	{wood:2495	,cotton:5130	,iron:3520	,food:3520	,cost:19	,crop:193	,sec:7942	},
		8:	{wood:3492	,cotton:7184	,iron:4928	,food:4928	,cost:24	,crop:256	,sec:14296	},
		9:	{wood:4539	,cotton:9339	,iron:6405	,food:6405	,cost:29	,crop:328	,sec:24303	},
		10:	{wood:5900	,cotton:12142	,iron:8327	,food:8327	,cost:34	,crop:406	,sec:38884	},
		11:	{wood:7715	,cotton:14996	,iron:10070	,food:10070	,cost:39	,crop:489	,sec:64159	},
		12:	{wood:9663	,cotton:18784	,iron:12614	,food:12614	,cost:44	,crop:574	,sec:97987	},
		13:	{wood:12789	,cotton:24863	,iron:16695	,food:16695	,cost:49	,crop:661	,sec:137999	},
		14:	{wood:16625	,cotton:32323	,iron:21704	,food:21704	,cost:54	,crop:750	,sec:184707	},
		15:	{wood:26855	,cotton:52214	,iron:35059	,food:35059	,cost:64	,crop:882	,sec:224195	},
	},
	'機織り工房':{
		product: 'cotton',
		1:	{wood:30	,cotton:14	,iron:46	,food:30	,cost:1	,crop:9	,sec:135	},
		2:	{wood:76	,cotton:32	,iron:118	,food:76	,cost:3	,crop:19	,sec:250	},
		3:	{wood:166	,cotton:69	,iron:262	,food:166	,cost:5	,crop:36	,sec:550	},
		4:	{wood:497	,cotton:201	,iron:791	,food:497	,cost:8	,crop:60	,sec:1100	},
		5:	{wood:1187	,cotton:476	,iron:1895	,food:1187	,cost:11	,crop:94	,sec:2200	},
		6:	{wood:2175	,cotton:1541	,iron:3168	,food:2175	,cost:14	,crop:139	,sec:4180	},
		7:	{wood:3520	,cotton:2495	,iron:5130	,food:3520	,cost:19	,crop:193	,sec:7942	},
		8:	{wood:4928	,cotton:3492	,iron:7184	,food:4928	,cost:24	,crop:256	,sec:14296	},
		9:	{wood:6405	,cotton:4539	,iron:9339	,food:6405	,cost:29	,crop:328	,sec:24303	},
		10:	{wood:8327	,cotton:5900	,iron:12142	,food:8327	,cost:34	,crop:406	,sec:38884	},
		11:	{wood:10070	,cotton:7715	,iron:14996	,food:10070	,cost:39	,crop:489	,sec:64159	},
		12:	{wood:12614	,cotton:9663	,iron:18784	,food:12614	,cost:44	,crop:574	,sec:97987	},
		13:	{wood:16695	,cotton:12789	,iron:24863	,food:16695	,cost:49	,crop:661	,sec:137999	},
		14:	{wood:21704	,cotton:16625	,iron:32323	,food:21704	,cost:54	,crop:750	,sec:184707	},
		15:	{wood:35059	,cotton:26855	,iron:52214	,food:35059	,cost:64	,crop:882	,sec:224195	},
	},
	'高殿':{
		product: 'iron',
		1:	{wood:46	,cotton:30	,iron:14	,food:30	,cost:1	,crop:9	,sec:135	},
		2:	{wood:118	,cotton:76	,iron:32	,food:76	,cost:3	,crop:19	,sec:250	},
		3:	{wood:262	,cotton:166	,iron:69	,food:166	,cost:5	,crop:36	,sec:550	},
		4:	{wood:791	,cotton:497	,iron:201	,food:497	,cost:8	,crop:60	,sec:1100	},
		5:	{wood:1895	,cotton:1187	,iron:476	,food:1187	,cost:11	,crop:94	,sec:2200	},
		6:	{wood:3168	,cotton:2175	,iron:1541	,food:2175	,cost:14	,crop:139	,sec:4180	},
		7:	{wood:5130	,cotton:3520	,iron:2495	,food:3520	,cost:19	,crop:193	,sec:7942	},
		8:	{wood:7184	,cotton:4928	,iron:3492	,food:4928	,cost:24	,crop:256	,sec:14296	},
		9:	{wood:9339	,cotton:6405	,iron:4539	,food:6405	,cost:29	,crop:328	,sec:24303	},
		10:	{wood:12142	,cotton:8327	,iron:5900	,food:8327	,cost:34	,crop:406	,sec:38884	},
		11:	{wood:14996	,cotton:10070	,iron:7715	,food:10070	,cost:39	,crop:489	,sec:64159	},
		12:	{wood:18784	,cotton:12614	,iron:9663	,food:12614	,cost:44	,crop:574	,sec:97987	},
		13:	{wood:24863	,cotton:16695	,iron:12789	,food:16695	,cost:49	,crop:661	,sec:137999	},
		14:	{wood:32323	,cotton:21704	,iron:16625	,food:21704	,cost:54	,crop:750	,sec:184707	},
		15:	{wood:52214	,cotton:35059	,iron:26855	,food:35059	,cost:64	,crop:882	,sec:224195	},
	},
	'棚田':{
		product: 'food',
		1:	{wood:35	,cotton:35	,iron:30	,food:0	,cost:0	,crop:9	,sec:120	},
		2:	{wood:88	,cotton:88	,iron:75	,food:0	,cost:0	,crop:19	,sec:216	},
		3:	{wood:202	,cotton:202	,iron:173	,food:0	,cost:0	,crop:36	,sec:389	},
		4:	{wood:604	,cotton:604	,iron:518	,food:0	,cost:0	,crop:57	,sec:661	},
		5:	{wood:1510	,cotton:1510	,iron:1294	,food:0	,cost:0	,crop:84	,sec:1124	},
		6:	{wood:3019	,cotton:3019	,iron:2588	,food:0	,cost:1	,crop:126	,sec:1910	},
		7:	{wood:5132	,cotton:5132	,iron:4339	,food:0	,cost:2	,crop:177	,sec:3247	},
		8:	{wood:7186	,cotton:7186	,iron:6159	,food:0	,cost:3	,crop:234	,sec:5520	},
		9:	{wood:9341	,cotton:9341	,iron:8077	,food:0	,cost:4	,crop:297	,sec:8833	},
		10:	{wood:12144	,cotton:12144	,iron:10409	,food:0	,cost:5	,crop:366	,sec:13249	},
		11:	{wood:14998	,cotton:14998	,iron:12855	,food:0	,cost:7	,crop:438	,sec:21860	},
		12:	{wood:18786	,cotton:18786	,iron:16102	,food:0	,cost:9	,crop:513	,sec:33388	},
		13:	{wood:24864	,cotton:24864	,iron:21312	,food:0	,cost:11	,crop:591	,sec:47021	},
		14:	{wood:32324	,cotton:32324	,iron:27706	,food:0	,cost:13	,crop:672	,sec:65557	},
		15:	{wood:52215	,cotton:52215	,iron:44756	,food:0	,cost:16	,crop:794	,sec:86760	},
	},
	'釣り堀':{
		product: 'food',
		1:	{wood:992	,cotton: 992,	iron:875	,wood:350	,cost:0	,crop:87	},
		2:	{wood:1055	,cotton:1055,	iron:887	,wood:360	,cost:0	,crop:91	},
		3:	{wood:1122	,cotton:1122,	iron:956	,wood:378	,cost:0	,crop:97	},
		4:	{wood:1211	,cotton:1211,	iron:1038	,wood:413	,cost:0	,crop:105	},
		5:	{wood:1326	,cotton:1326,	iron:1136	,wood:453	,cost:0	,crop:115	},
		6:	{wood:1362	,cotton:1362,	iron:1168	,wood:793	,cost:1	,crop:127	},
		7:	{wood:1512	,cotton:1512,	iron:1296	,wood:881	,cost:2	,crop:141	},
		8:	{wood:1684	,cotton:1684,	iron:1443	,wood:981	,cost:3	,crop:157	},
		9:	{wood:1876	,cotton:1876,	iron:1608	,wood:1094	,cost:4	,crop:175	},
		10:	{wood:2091	,cotton:2091,	iron:1792	,wood:1218	,cost:5	,crop:195	},
		_TENTATIVE: true, _TENTATIVE_REF_MAX_LEVEL: 10,
	},
	'畑'	:{ product: 'food', crop: 10 },
	'鉄鉱山':{ product: 'iron', crop: 10 },
	'綿花'	:{ product: 'cotton', crop: 10 },
	'森林'	:{ product: 'wood', crop: 10 },
	'池': {},
	'荒地': {},
	'平地': {},
	'村落':{},
	'足軽兵舎':{},
	'弓兵舎':{},
	'厩舎':{},
	'兵器鍛冶':{},
	'寺':{},
	'教会':{},
	'蔵':{},
	'市':{},
	'学舎':{},
	'長屋':{},
	'陣屋':{},
	'本丸':{},
	'砦':{},
	'村落':{},
	'天守':{},
	//'山林奉行所':{},
	//'大舎人座':{},
	//'鉄穴流し':{},
	//'水車':{},
};////}}}

const EN2JA = { wood: '木', cotton: '綿', iron: '鉄', food: '糧' }
const RESOURCE_ORDER = ['wood','cotton','iron','food'];
const RESOURCE_KEY_TO_BARID = {
	wood: 'wood',
	cotton: 'stone',
	iron: 'iron',
	food: 'rice',
};

/** 空き地戦力 */
const VACANCY_FORCE_DATA = {
	2: {
		'10000': {rank: 1,　tile:'平', code:'1000', list:[{ type:'槍', power:245    },{ type:'弓', power:185    },{ type:'馬', power:155    },{ type:'器', power:203    }]}, 
		'01000': {rank: 1,　tile:'平', code:'0100', list:[{ type:'槍', power:185    },{ type:'弓', power:155    },{ type:'馬', power:245    },{ type:'器', power:173    }]}, 
		'00200': {rank: 2,　tile:'鉄', code:'0020', list:[{ type:'槍', power:520    },{ type:'弓', power:520    },{ type:'馬', power:520    },{ type:'器', power:448    }]}, 
		'00010': {rank: 2,　tile:'平', code:'0001', list:[{ type:'槍', power:370    },{ type:'弓', power:550    },{ type:'馬', power:430    },{ type:'器', power:370    }]}, 
		'20100': {rank: 3,　tile:'木', code:'2010', list:[{ type:'槍', power:2170   },{ type:'弓', power:1210   },{ type:'馬', power:730    },{ type:'器', power:1498   }]}, 
		'02100': {rank: 3,　tile:'綿', code:'0210', list:[{ type:'槍', power:1210   },{ type:'弓', power:730    },{ type:'馬', power:2170   },{ type:'器', power:1018   }]}, 
		'00120': {rank: 3,　tile:'糧', code:'0012', list:[{ type:'槍', power:730    },{ type:'弓', power:2170   },{ type:'馬', power:1210   },{ type:'器', power:1018   }]}, 
		'30100': {rank: 4,　tile:'木', code:'3010', list:[{ type:'槍', power:4890   },{ type:'弓', power:3170   },{ type:'馬', power:2310   },{ type:'器', power:3686   }]}, 
		'03001': {rank: 4,　tile:'綿', code:'0300', list:[{ type:'槍', power:3220   },{ type:'弓', power:2210   },{ type:'馬', power:5240   },{ type:'器', power:2816   }]}, 
		'00310': {rank: 4,　tile:'鉄', code:'0031', list:[{ type:'計', power:3200   }                                                                                    ]}, 
		'00031': {rank: 4,　tile:'糧', code:'0003', list:[{ type:'槍', power:2320   },{ type:'弓', power:5080   },{ type:'馬', power:3240   },{ type:'器', power:2872   }]}, 
		'40110': {rank: 5,　tile:'木', code:'4011', list:[{ type:'槍', power:17360  },{ type:'弓', power:11390  },{ type:'馬', power:6445   },{ type:'器', power:12341  }]}, 
		'04110': {rank: 5,　tile:'綿', code:'0411', list:[{ type:'槍', power:11470  },{ type:'弓', power:5985   },{ type:'馬', power:17680  },{ type:'器', power:8868   }]}, 
		'00402': {rank: 5,　tile:'鉄', code:'0040', list:[{ type:'槍', power:11800  },{ type:'弓', power:11800  },{ type:'馬', power:11800  },{ type:'器', power:10360  }]}, 
		'00052': {rank: 5,　tile:'糧', code:'0005', list:[{ type:'槍', power:6370   },{ type:'弓', power:17785  },{ type:'馬', power:11540  },{ type:'器', power:8536   }]}, 
		'32230': {rank: 5,　tile:'木', code:'3223', list:[{ type:'槍', power:15250  },{ type:'弓', power:8050   },{ type:'馬', power:12850  },{ type:'器', power:10930  }]}, 
		'50111': {rank: 6,　tile:'木', code:'5011', list:[{ type:'槍', power:62250  },{ type:'弓', power:31550  },{ type:'馬', power:16200  },{ type:'器', power:40760  }]}, 
		'05111': {rank: 6,　tile:'綿', code:'0511', list:[{ type:'槍', power:31960  },{ type:'弓', power:17510  },{ type:'馬', power:60860  },{ type:'器', power:26180  }]}, 
		'10511': {rank: 6,　tile:'鉄', code:'1051', list:[{ type:'計', power:61600  }                                                                                    ]}, 
		'22280': {rank: 6,　tile:'糧', code:'2228', list:[{ type:'槍', power:16900  },{ type:'弓', power:62500  },{ type:'馬', power:32100  },{ type:'器', power:26020  }]}, 
		'55552': {rank: 7,　tile:'山', code:'5555', list:[{ type:'槍', power:186700 },{ type:'弓', power:94200  },{ type:'馬', power:47950  },{ type:'器', power:121950 }]}, 
		'12110': {rank: 7,　tile:'山', code:'1211', list:[{ type:'槍', power:103700 },{ type:'弓', power:57800  },{ type:'馬', power:195500 },{ type:'器', power:85340  }]}, 
		'44503': {rank: 7,　tile:'山', code:'4450', list:[{ type:'計', power:104800 }                                                                                    ]}, 
		'22230': {rank: 7,　tile:'山', code:'2223', list:[{ type:'槍', power:46950  },{ type:'弓', power:187800 },{ type:'馬', power:93900  },{ type:'器', power:75120  }]}, 
	},
	3: {
		'10000': {rank: 1, tile:'平', code:'10000', list:[{ type:'槍', power:245    },{ type:'弓', power:185    },{ type:'馬', power:155    },{ type:'器', power:203    }]}, 
		'01000': {rank: 1, tile:'平', code:'01000', list:[{ type:'槍', power:185    },{ type:'弓', power:155    },{ type:'馬', power:245    },{ type:'器', power:173    }]}, 
		'10010': {rank: 2, tile:'平', code:'10010', list:[{ type:'槍', power:370    },{ type:'弓', power:550    },{ type:'馬', power:430    },{ type:'器', power:370    }]}, 
		'00200': {rank: 2, tile:'鉄', code:'00200', list:[{ type:'槍', power:520    },{ type:'弓', power:520    },{ type:'馬', power:520    },{ type:'器', power:448    }]}, 
		'11100': {rank: 3, tile:'平', code:'11100', list:[{ type:'槍', power:1210   },{ type:'弓', power:730    },{ type:'馬', power:2170   },{ type:'器', power:1018   }]}, 
		'11110': {rank: 3, tile:'平', code:'11110', list:[{ type:'槍', power:2170   },{ type:'弓', power:1210   },{ type:'馬', power:730    },{ type:'器', power:1498   }]}, 
		'01101': {rank: 3, tile:'平', code:'01101', list:[{ type:'槍', power:730    },{ type:'弓', power:2170   },{ type:'馬', power:1210   },{ type:'器', power:1018   }]}, 
		'20001': {rank: 4, tile:'木', code:'20001', list:[{ type:'槍', power:5930   },{ type:'弓', power:3835   },{ type:'馬', power:2788   },{ type:'器', power:4464   }]}, 
		'12000': {rank: 4, tile:'綿', code:'12000', list:[{ type:'槍', power:3840   },{ type:'弓', power:2640   },{ type:'馬', power:6240   },{ type:'器', power:3360   }]}, 
		'00210': {rank: 4, tile:'鉄', code:'00210', list:[{ type:'槍', power:2790   },{ type:'弓', power:6120   },{ type:'馬', power:3900   },{ type:'器', power:3456   }]}, 
		'11021': {rank: 4, tile:'糧', code:'11021', list:[{ type:'計', power:3840   }                                                                                    ]}, 
		'50002': {rank: 5, tile:'木', code:'50002', list:[{ type:'槍', power:19910  },{ type:'弓', power:10550  },{ type:'馬', power:16790  },{ type:'器', power:14292  }]}, 
		'30021': {rank: 5, tile:'木', code:'30021', list:[{ type:'槍', power:8320   },{ type:'弓', power:23140  },{ type:'馬', power:15080  },{ type:'器', power:11128  }]}, 
		'13020': {rank: 5, tile:'綿', code:'13020', list:[{ type:'槍', power:15340  },{ type:'弓', power:15340  },{ type:'馬', power:15340  },{ type:'器', power:13468  }]}, 
		'02300': {rank: 5, tile:'鉄', code:'02300', list:[{ type:'槍', power:8385   },{ type:'弓', power:15763  },{ type:'馬', power:15470  },{ type:'器', power:9464   }]}, 
		'01520': {rank: 5, tile:'鉄', code:'01520', list:[{ type:'槍', power:23200  },{ type:'弓', power:15400  },{ type:'馬', power:8700   },{ type:'器', power:16540  }]}, 
		'30140': {rank: 5, tile:'糧', code:'30140', list:[{ type:'槍', power:14970  },{ type:'弓', power:7810   },{ type:'馬', power:23340  },{ type:'器', power:11596  }]}, 
		'30210': {rank: 6, tile:'木', code:'30210', list:[{ type:'槍', power:39178  },{ type:'弓', power:21578  },{ type:'馬', power:74378  },{ type:'器', power:32138  }]}, 
		'14321': {rank: 6, tile:'綿', code:'14321', list:[{ type:'槍', power:56900  },{ type:'弓', power:28450  },{ type:'馬', power:50800  },{ type:'器', power:40120  }]}, 
		'23122': {rank: 6, tile:'綿', code:'23122', list:[{ type:'槍', power:86960  },{ type:'弓', power:44160  },{ type:'馬', power:22760  },{ type:'器', power:57000  }]}, 
		'13432': {rank: 6, tile:'鉄', code:'13432', list:[{ type:'槍', power:63200  },{ type:'弓', power:61100  },{ type:'馬', power:32750  },{ type:'器', power:50030  }]}, 
		'22242': {rank: 6, tile:'糧', code:'22242', list:[{ type:'槍', power:51400  },{ type:'弓', power:25700  },{ type:'馬', power:56600  },{ type:'器', power:37160  }]}, 
		'03340': {rank: 6, tile:'糧', code:'03340', list:[{ type:'槍', power:22010  },{ type:'弓', power:81410  },{ type:'馬', power:41810  },{ type:'器', power:33890  }]}, 
		'42402': {rank: 7, tile:'山', code:'42402', list:[{ type:'槍', power:210200 },{ type:'弓', power:114200 },{ type:'馬', power:66200  },{ type:'器', power:143000 }]}, 
		'89331': {rank: 7, tile:'山', code:'89331', list:[{ type:'槍', power:225000 },{ type:'弓', power:112500 },{ type:'馬', power:56250  },{ type:'器', power:146250 }]}, 
		'13221': {rank: 7, tile:'山', code:'13221', list:[{ type:'槍', power:112020 },{ type:'弓', power:64020  },{ type:'馬', power:208020 },{ type:'器', power:92820  }]}, 
		'41151': {rank: 7, tile:'山', code:'41151', list:[{ type:'槍', power:111000 },{ type:'弓', power:55500  },{ type:'馬', power:222000 },{ type:'器', power:88800  }]}, 
		'52630': {rank: 7, tile:'山', code:'52630', list:[{ type:'槍', power:58000  },{ type:'弓', power:232000 },{ type:'馬', power:116000 },{ type:'器', power:92800  }]}, 
		'43510': {rank: 7, tile:'山', code:'43510', list:[{ type:'槍', power:67800  },{ type:'弓', power:202800 },{ type:'馬', power:112800 },{ type:'器', power:94800  }]}, 
		'62211': {rank: 8, tile:'山', code:'62211', list:[{ type:'槍', power:243220 },{ type:'弓', power:132670 },{ type:'馬', power:93320  },{ type:'器', power:167200 }]}, 
		'15112': {rank: 8, tile:'山', code:'43510', list:[{ type:'槍', power:98560  },{ type:'弓', power:181360 },{ type:'馬', power:126160 },{ type:'器', power:115120 }]}, 
		'21601': {rank: 8, tile:'山', code:'21601', list:[{ type:'槍', power:125620 },{ type:'弓', power:95820  },{ type:'馬', power:230020 },{ type:'器', power:109860 }]}, 
		'33310': {rank: 8, tile:'山', code:'33310', list:[{ type:'計', power:124800 }                                                                                    ]}, 
	},
};


/** jQuery.ajax デフォルト設定 */
////{{{
// jQuery ajax 設定：同期、キャッシュしない、GET
$.ajaxSetup({
	type:"GET",
	dataType: "text",
	cache: true,
	dataFilter: function( data, dataType ){
		if(!DEV_MODE) return data;
		GM_log('In dataFilter');

		var sett = this;
		var url = sett.url;
		if( dataType == 'text' && /^\s*<!DOCTYPE/.test(data) ){
			if( $(data).find('IMG.fade[alt="敵襲"]').size() ){
				GM_log('敵襲 in dataFilter');
				$(document).trigger('MokoEvent_NotifyRaided');
			}
		}

		return data;
	},
	beforeSend : function( xhr ){
		xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
	},
});
const AJAX_ASYNC_NOCACHE_GET = {
	type:"GET",
	async: true,
	//timeout: 2000,
	dataType: "text",
	cache: true,
};

// jQuery ajax 設定：同期、キャッシュしない、POST
const AJAX_ASYNC_NOCACHE_POST = {
	type:"POST",
	async: true,
	dataType: "text",
};

// jQuery ajax 設定：非同期、キャッシュしない、GET
const AJAX_NOASYNC_NOCACHE_GET = {
	type:"GET",
	async: false,
	dataType: "text",
};

// jQuery ajax 設定：非同期、キャッシュしない、POST
const AJAX_NOASYNC_NOCACHE_POST = {
	type:"POST",
	async: false,
	dataType: "text",
};
////}}}

/** Moko 機能読み込み優先度定数 */
////{{{
const PRIO_MORE_ERALY = 3;
const PRIO_ERALY      = 4;
const PRIO_NORMAL     = 5;
const PRIO_LATE       = 6;
const PRIO_MORE_LATE  = 7;
////}}}

/** Z-Index 定数 */
const ZIDX_DIALOG = 2101; // マスク上のダイアログ
const ZIDX_DIALOG_MASK   = 2100; // マスク
const ZIDX_CMENU = 2010; // コンテキストメニュー
const ZIDX_WINDOW = 2001; // 何処でも市場みたいな
const ZIDX_WINDOW_MASK = 2000;
const ZIDX_CONTENT_TOP = 1950;
const ZIDX_CONTENT = 1900; // 独自コンテンツやUI
const ZIDX_CONTENT_BASE = 1800; // 練兵所みたいなページ差し替え時

//******************************************************************************
// グローバル変数
//------------------------------------------------------------------------------

/** このスクリプトで追加するStyleSheetオブジェクト */
var MOKO_CSS = null; // attachMokoCss() 内で設定

/** 現在ページ判定用 */
////{{{
var LPath = function(){
	var func = arguments.callee;
	return Array.slice(arguments).some(function(check_key, idx){
		return func[check_key];
	});
} ;
LPath.ALWAYS = true ;
switch( location.pathname ){
	case '/world/select_world.php'          : LPath.select_world       = true ; break ;
	case '/village.php'                     : LPath.village            = true ; break ;
	case '/land.php'                        : LPath.land               = true ; break ;
	case '/map.php'                         : LPath.map                = true ; break ;
	case '/facility/select_facility.php'    : LPath.select_facility    = true ; break ;
	case '/facility/dungeon.php'            : LPath.dungeon            = true ; break ;
	case '/facility/dungeon02.php'          : LPath.dungeon02          = true ; break ;
	case '/card/deck.php'                   : LPath.deck               = true ; break ;
	case '/card/deck_card_delete.php'       : LPath.deck_card_delete   = true ; break ;
	case '/card/status_info.php'            : LPath.status_info        = true ; break ;
	case '/facility/unit_confirm.php'       : LPath.unit_confirm       = true ; break ;
	case '/facility/unit_status.php'        : LPath.unit_status        = true ; break ;
	case '/facility/set_unit.php'           : LPath.set_unit           = true ; break ; // 部隊編成での兵編成
	case '/facility/set_unit_list.php'      : LPath.set_unit_list      = true ; break ;
	case '/facility/unit_list.php'          : LPath.unit_list          = true ; break ;
	case '/facility/facility.php'           : LPath.facility           = true ; break ;
	case '/facility/castle.php'             : LPath.castle             = true ; break ;
	case '/facility/send_troop.php'         : LPath.send_troop         = true ; break ;
	case '/message/detail.php'              : LPath.message_detail     = true ; break ;
	case '/report/list.php'                 : LPath.report_list        = true ; break ;
	case '/report/detail.php'               : LPath.report_detail      = true ; break ;
	case '/bbs/res_view.php'                : LPath.bbs_res_view       = true ; break ;
	case '/user/'                           : LPath.user               = true ; break ;
	case '/user/kosho_change.php'           : LPath.kosho_change       = true ; break ;
	case '/war/fight_history.php'           : LPath.fight_history      = true ; break ;
	case '/war/detail.php'                  : LPath.war_detail         = true ; break ;
	case '/alliance/chat_view.php'          : LPath.chat_view          = true ; break ;
	case '/union/levelup.php'               : LPath.union_levelup      = true ; break ;
	case '/union/additional.php'            : LPath.union_additional   = true ; break ;
	case '/union/remove.php'                : LPath.union_remove       = true ; break ;
	case '/message/inbox.php'               : LPath.message_inbox      = true ; break ;
	case '/facility/confluence_confirm.php' : LPath.confluence_confirm = true ; break ;
	case '/facility/confluence_list.php'    : LPath.confluence_list    = true ; break ;
	case '/facility/camp_proc.php'          : LPath.camp_proc          = true ; break ; // 陣、出城レベルアップ
	case '/senkuji/senkuji_result.php'      : LPath.senkuji_result     = true ; break ; // くじ結果
}

/** ingame：ログイン後は常に */
LPath.ingame = true ;
switch( location.hostname ){
	case 'sengokuixa.jp': case 'world.sengokuixa.jp':
		LPath.ingame = false ; break ;
}
if( location.pathname == '/false/login_sessionout.php' )
	LPath.ingame = false;

/** 施設 */
if( LPath.facility ){
	new function(){
		var fname = $('DIV.ig_tilesection_detailarea > H3:eq(0) > A').text();
		// 核施設は施設名も
		LPath.facility = fname;
		LPath[fname] = true ;

		// 兵舎は'兵舎'でも
		if ( LPath['厩舎'] || LPath['足軽兵舎'] || LPath['弓兵舎'] || LPath['兵器鍛冶'])
			LPath['兵舎'] = true ;
	}
}

// 報告書：詳細
if( LPath.report_detail ){
	if( $('#ig_mainareaboxInner img[alt="戦闘報告"]').length )
		LPath['戦闘報告'] = true;
}

/** 秘境 */
if( LPath('dungeon', 'dungeon02') ) LPath['秘境'] = true;
////}}}

var MokoCfg = {};

/** IXA の素材流用のためのベースURL */
if( LPath.ingame ){
	const FABRIC_BASE_URL = $('link[rel="stylesheet"][href^="http://cache."]').attr('href').replace(/^(http:\/\/[^\/]*\/world\/[^\/]+).*/,'$1');
}

/** グループ用アイコン画像データ */
//^NOHL //{{{
var defaultGroupIcons = [
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAK%2FSURBVEhLvZdPSBRRHMfn3tmzdGwPXvIS%2FRGCwCWKoNAMFCHMAi%2Br1MHaINJYIbFEBRHRwDTIQywe9BheOqX3uodnDx5%2F7efRd3mNz5032bjwmJk37%2F0%2Bv%2F9vNrE%2Fv%2F1vuzb%2F%2BplV%2BroLGciGoV%2FCzdTTYbt%2B%2Fpz1XinZwI3OQgayYcDil%2BxsrrmJ2vMxq9frhY7xJwOOBTN5dPOSjQ3eKxToG3TnYrvBTNBgYbp2ZmBZHQXGI8SeTcsLs6dSMhq8trJstzrabHt91GqVbnePEp8%2FbQQVwHuvRh8b%2B0I5Ew3GWoB29MWNw4OPNlS%2BEAwPUBSr9HRaudRmMxPVY%2FAoMFYh4NfPpSZ47uXdE0uPtbtbL9xariiRhkeBQ9bufX1jJ40f3983FQSOkkO3u%2F6yOhMst%2FnWImz1bX9TOC5lDkU0zz2VopHLYlxMvW0uNrpMQzCJpRjHgrE0VAEtLR7pLbuEwloSSZbFWtx3ud25OdQRW4LRlo3Vh9cclHtZ7FuveWKree4Va67AfctbgnkJELcyfBgxTCuBZzTPvfZxxXq%2FM7YEE2MWMHB7XldjpfbTTPxGkpnVWoy2%2FwKmpkMnXiaYTbRGztG8YKoB19NA0idfJthlZCOz88aYlqocIN7IyeVqfTGwEYspKymj5kDiYBXP6tF61hrk5AKTYJQVAui7WM49VlAmACg3rMO1KKHMpgp4T2KmT6hMV7OAzb4wwOpcKMOzahY46%2BVq5kmw9PGYCaZl6qRRxwIkRdST1VYB8l7P7CFE6a%2BbKLAgCMWVcruOPZ7VveQBvwJC53YmmAXAEKR4UWJKJNzIGq5KJJoFyQSQwbv0l0ommKSgxyLM77XEDPf5Av1n5tnDCH0eRYGL%2BM5ugh9cLZ3pdzWhgJl8eDfpYhSquf9tMQxYMN1%2Fp%2BrwfTdBCRX13wnZ%2Fn%2Bn34ENZin29EmRAAAAAElFTkSuQmCC',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAPYSURBVEhLtZdrSBRRFMf3U1%2F6YJDmM7WiMEHBCKK0KCHRlqKHSS4KgakEPVghkdIitDQyUFBKSshKIzAK6WF9CEyhCHoQFUUSBVH0JYKkKIQTv0tnubM77o6CA5eZvXPn%2Fs7%2FnP%2B9M%2BuT%2F8eLx6PS3VwvwfLiWWnMDUMPHxenDtVK4aK5UpmeLDUL02elMTcMWBy%2Be4NXTEdvUoG8ig%2BYM%2FCGtCw5nbJCRhK2mn4afdw7nppjxj2J3xm6p2OinZkPFkxfjX%2B1mUgfYOLBnlrTuo7uEH9mnLk3vMAv1SXL5fnISbnYXinBspUmCC9Ae0xpRrzA9BHBjcQiB5jJ5fdN%2BTp%2BXjbnJhhlBEcg9NN%2Bfus39whoOnBVHRWMMgIDinICAUpgo7caZXigTspyUqQreZVneASYh%2BkkFaqYyYGR4rZgsUOpqn%2F%2FrNOkned4PpZ6B5gf5fkZpnY0VWanldTyG2BT1bpQynUMATCHXTa3IBxgHEpKtaliTTXKAWtgeibVCuYZymGvgphgO0pSRvRMCIDJVS0B2HDtZ6wXtQTiai6ixamqQt3L0uJa60lNaRogARFwrPpOCcZgaiIbbtealGpTxQShG1AsuKti29FuYIBuXgAcy1QakOtyYgIbSIrps1Nt11jdP2MwaWIjYCLMFO5qBVNLPKCqtZ91zj4eK80RNaa2uJL1yaThYDWRbqNaY1VMrXney%2FYZkeqBpA1m6%2BP1ZYOZUN2tS0wVk3Z7T4%2B1hqd0NTd449hgrkm%2FQrjW5aQbCGP0TQVct1%2FUhTfGEXjUlwQpZnIGKlhfi%2FzWADmTqYNpS8zYTdnzpWpjbtQWAeZNhFlQpV8lGIc%2BYJwBMA6jMY5yaPrb6wLyaKgn1O53HpOHVzscfdyPAJNu1iTN%2FsLA%2BaQNL6h7MRPj1DDdR6ocQKBdeXnSNi9RHlxodcBdwV6WhT2GDAQKlsqd1nrpryg1rWNZlgG2zImTc%2FlrDJRArtVUmOtpgcfXN8i7vAMhxZ8qz5hrDNO4uySkCBhBXA9WG3DfNr%2BBEwgBod4zGOjkjwn5sKXZwL4PjMjE2OsQuGXvdgd4qHG%2FtKdmmkaNAeq1Z8UK5bMUMFCOaGBqi2JNPco1zZ7BAPT4cvhS6NoNTB21rsBJM79Js%2B1uT6l%2Bs3iP%2FHr50QBR%2FHnfWVfFNgSlgLTOdpqN4sDabMd39VSOVrjWGHi4YtQCV2XAUdtbVBhSrQH5%2BjpOmMXv5e0CnKbBqcNxtW0uVGImgLp%2BMRvppu%2Ft2F0x%2F52aancZuPnKn8F%2FJz7ybDDK7d1Lrwni6e3LMvn3j%2FwD8a1KlgUnpDUAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAPXSURBVEhLtZdraM5RHMef914oDZMxcynXsXINY3shT8st7JaFuSyFmTLCaFsuy73mlsaIJVaorUhi7Y0ml4QsyyXK5QWT6wv14%2FPL7995PP9n%2Bz%2Fi1OmcnfP%2Fn8%2Fv%2Bz2%2Fc%2F7PQvK73LvZLAcrS6Ukb%2Fp%2FqawNw0qITtW6IslM6SJrwulSVbjgv9QVGWOUAYsSulJ%2FWgfOZhfJ%2B5PXpHDCcP07Jy1F1ocz5XbVMR2nZZy6KmOc7MnLlZdHL%2Blc0NpQsVPfhxlanjVBynuPkIdJi%2BTt9nM6Id8uypM7B6T%2BaJEGwsKAancX6Nzdpu1SvWWuVMyZERhqwW3MnykwQ4Au9JwmDxLyFW5gAIBQx0s4QDCMf3p7Rvu5Y%2Ft5jsSrOgIM3AWXZI%2BWvInJqpo%2BUCr9123HFD4jtbu68fhAXSD1ZreCq3uNk%2BV9%2Bmp1wSyMurIl6WqvuQDMVY8zFkBnyiPAAFHBAraPts8AgZvFzFsQ5gAtDhB0XOBYiglmWXiIl2yW1dZerlsbYX%2BQZItQbMl1uUeWB0IFWY2lqLFsNleYM8U4QPJ1ppZ5XzDKd5ZM9xY0u20%2Fgbqq3WQ7taL478EFfXtJc8PmCLC7jygzxW4uBNlbcyNKMXZzdFyQm1SW0X6K%2Fxpcl5gh85ITVK3B7LyyqGUxyfRPFRcnDdCzyl5aFrtgN7l4jmynWuLxDpdI3MnFXc0FkNWvq%2B%2FN5drvqraAcCmo3VF7zFFqSZgfBcZaFjYISm2f3duML1nciu0c%2F3lX8wUCipV%2B%2B2zBENyRxUu9zyf9WHXTnLAG7vuRAEblkgDqJpir2I4e%2B149K0e%2F3zw7eWA3SUsd2mGNAm9IGuxZyR1OxpMDHDWCIPubus%2FWccsJnuMOAJo0ZbaEcnZ0Xt3vMVbHquSAuyXuczWJkxSamJkrU8rPSPLKQzKytEZm7arXALaeb%2Fb6XlBBwR0FhUtjhvX3IM%2FetQuV0nXxXm0vtLRq34KJstoP8KJgj%2BdEa9pqaZu6IcIZrB40PsMDX3%2F4Qj58%2Fia0d5%2B9UTD9Ezfua4sjgcC8%2BGrlYYU9nVkpP9o%2FR8ABp0wKRygGiEKsp9BiP2NqdxCr7bcwcMAUF%2F4n2NRhr4H3NbZ4LsQNBobtVj423lIX%2FMDsJaW49qoCgVFItLjAptAUf73%2FXB71X%2BoLBkQhwUy9gQlEwfmTh%2Bo57ShrXVsBu9BYilFGJQiSyd1rBZ%2Fcv03PIEciFpxMtjlUmlIb87N64aEGVUtCoZJili%2F6Naf%2FO5UV5SqcW8l%2B5sbTcoNZVtvFoUfGucGAMzZq%2FXFp%2F%2FJdfgJ7ERiiCCpPkgAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOYSURBVEhLtZdbSBRRGMfnNYSgOxRR0gUUM5Cu2AWkSIt9KEFaIQy20kCoFTbCWw9qJkhsFyERpKIsQkFEKSEC8SEfzC5PUb1EDxE9FPUQ6eaXv8N%2Bw3HdnR1lHfiYM2dmz%2B%2F7f5czs47Ejzdjo9LRdEnCweJFMdaGoYfDoC1SKUXZWXKmcKVcPLRmUYy1YcDicIZ7H5iJodocmeovlPH27dJatl6ehLfKj0d7zFwqe99RIMGCZcYYez3Lve6qTYYF0zl3bK%2FcrNjo%2FgjF18LFxgI5S83DqQwVvZ2VMjpYL4H8Va7zXg7gJEwHD1CpDwN%2BPXJV5E%2B%2FOd9tP5XSgPIc9nHihnHUr2pPMIuFy3YYY6wAnbPPZ0tyMgdGMRHB7ChwDQhHUM31SFOefOnemRnFXz91uWFmDEjnyCvOYDhhp8sr3FpgaXOcSjHztxtLJVi4wYQ4XQeoM77AXjl%2B1lNjIvD720NT0X7ayW6pjBSX31byDSZ%2FhBGzi4tr2o4%2BBkrIOVNgGWknr%2BLS%2FrbbDIfSVXbSHOOxrU5zDKQhdMAowxnym9jf5NtPdScFMwlEt0HALEbrUERso9zXjYTK1jbDGUKfrrqTgskbUCAsyhnTzQIgSnWbJAo6JhosOu8c83ZKBGhBodIe6x5t79V%2Bwpy0qlFLSFUByjSsqGFhrhlzJuxEQ3uZCLEw%2Fez1RoPDs24f1wXWmjDb%2BaPQdPPn%2Fcwz7FS2gzyPM9zDWPRo7goJHc73NBesL3V%2BCJDQUyjswXbBcE3PUlSEH%2BUUlX5htNeUy8uBTteed7XKSE901hz35%2Bxc6YpD84RzwPRrBYc76kIuAFhfbbXcKjootVnL5Wm0cRZ8QeBE54CX79siAy0R6Q4eN9acvVkizhIDZYxK1N8JFJvx%2FMAvKmRquNRtmdjYZTOmYOpPl7iKAALHEcaoxq6sXmeMef%2FgGej05C%2BJjVYb2L%2FPQzL9fcIFN58%2FMQfclrfNqCXM13fvMupR7V9xHMpnKWCgHF5ggISVPHMGimotPF%2BKAegRexd1x8nAKCK8qMWAco2pWv%2BKB4%2FI9M8PBoji2KvmpIofXwi5ENQBIsxAya1d2U75%2FtxZ39Up2ykO1xwDT1RMCwHUviXMGmLOWmg45NyLtpjdhpZI28Mz8ClM%2F13EK5yqtosLIMWEE1QwoUUtqgn%2F2%2BE%2BMf%2BdGipPGjhf%2BQv578RmYoMVZu9gjInE%2BNB9iU3%2Blf%2FPeQO6TNS4ugAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAO0SURBVEhLtZdpSJRRFIbnf1AURBFFGRVo0KpU5EISlZQkSMtEZRZlP4ScdkxtT6OyPYh2yoIStNAohMr8UUhpBEFWIBGtf5QWjNROPofO16fOON9EXTjcO3fu3Pe871mu%2BuT3ePKwRo7v3CgB%2F6z%2FYtwNhg0fi70bsiQ5qpesmxcvBwL%2B%2F2LZcyYqBlgM3%2B3SS7pxs3ixvH1wWvIWJ0rR6hSpKyuU9sbrPVpOWqz%2B9uj69LBnuavqwg49D6Zv1ewpciRjmLTeSFbwlSnRUnoyS%2FxTh6oT57YtDWp8l78iUb58LJHA%2FFjBiXCO8n3e8lQB04cHj%2FaPldbyqTpzibSU64U4cH7%2FkpDGGc5iOOxFJWMdEpjLcAI7VpDuANgebDH7DIGGqsNhWXsC5jLMVMAZPqeO6S8v6w6rwZQYkx9epPYEXF%2B9RzAATFLbs7koMEtzwQuoO8F6lDoUY%2FYBRGrWXmJrjnlibIl16%2FJahzF7JJ0pADjl908Z95Rc9h1l57WU%2FonUFgYkxwmvrD1JHS653ElHdtNswkneDfjN2ThJje7drXSIIZfCsKYiz%2BlqfCbeFmvi7kXybsDWtWCBfO9fndKLrYZhz9q6FWsDZu%2BvG8jVwCgtDxgAbJnLbFnNbGvY4wznmb2w7ZZclbnR2o1gyUUwMSdggyMGYKzdMrOO9IXSBrIldZBzuQFTJgZmDcPkBahrYt2%2FmK%2BJRb8O9aKxX5A5Q8OiwDyLAMHY%2Bq9%2FQl89gBEGjORzPxg4huScba7O1dbJ%2BYQR%2FWT8mJgezWmZgHMxpu9zxzPZ1ZquTJac6QM0FMSV2T9poDw%2FPkH3AR2clCa%2BBYXhzf0eBwPrumcgABXOHyKUITnCPQOTF0rS9hIZmn1Cxm48I3P3laoDW6%2FVOGvHqUiBgzmHA3GjhzsgjZ%2BaBWP0ySzWuay2QdfmTKfXKRTjtoeb%2F8h%2BO11a72R0CgPsR06e5gDfffZamr62CHN94wcFZn3u3lOdUcQTMD9se7xLwdpqsuXnj8%2BdwAGOik%2FpxBhAGCI9gxn52VO5vUhtfwsDDjDDDd4V2NghrwEfrKx1VIgYGDBkt9H%2BrlpVCAZMLBlrzlcpIGAMEi0iYGPoMG5%2BIa0VM4MCA8QgwYy9AeOIAi9KiAlZt5Zsblk1xi7QUIxhhuEEyeSOtQJfOLRba5CSCFnHZLI1FFj%2BZmp7waTOOFGhbEkoWDJM8mUd3%2Bn%2FTvlZCxWc1sclkRrdzrLaGoeWjKuDAc7euE1npfnbd%2FkFkEaXWn%2Fb5mAAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAN8SURBVEhLtZdLSFRRGMdn1aZFgUQLF%2BVjrCQEwU1pLaSHZhL2kDQFQUZJqBgpKVJb%2BAyMlDSSEpQ0iUxC7GFBlAbZoscmCWpXELmLFlkEX%2FwOfZczzuMeB7pwuHfunHt%2B3%2F%2F%2Ffee7MwH5d7ybn5OBtiYJVxT9l8HaMPQIcHHxTL0Upq2WsvQMKU%2Ff6jT2pqWs6BnWhgGLIzAzMWpunMo8Iq3Bk06DuaU56yRUvEX2p6VKW7BJrmy67DsaMksNC2agrmSbhDJ2mQW46TrePu8U%2BXlPusNFgvrurFZfMMHBgRkAhFLOwz3VzuPrp%2BsGrPCajAInsKr2wNinqlGQKNcEqYp%2FfBuTcHmeJA3GBmAttTulIn%2BDCeJ0ZnXMnNtgAuDzpazO5BQrWJU8utVolMQbH9%2F0GZsV7FJczImymptErrnDwkQ513mceS5pMFXJAlowKMFuIlw%2BbKvnpptNVScNprKxVcETg%2FVyLD0v5oJsP3vbEaDrdoqymhvsSQX3tx7y3dM6n7modmkkUWDUoVLBFA92Jxo6lzPP0hb9LI8CY5dWNAuxpRJ1MVqmDaYQkwazh1kA6wgkXvTk2E4Lal17dpRiisOuXi0W8qYvEJoEn8mn3TJx51ww5Gtz3H0cSyEQqp03kVpPc1m%2B7fxyq9%2FHbCDxwNhKQ7FzqtcERGvVZ3EKh2Ltf%2B7RlhHgvSTiRcxCvAAoJttewHZBkQZ2Bovuy06R2t05CYcvWANiUUDanylE%2Bz2sSnoaK%2BXl1KA3HvddkNnx3oh7fO8Mpqj0tcmZytY3ElajdOB8bQQQaH9urnSvXS9Pb3RFwJ3BiYoHNyoLgvKgq0nGqg6b0Zu12QDbV62Ra%2FnbDZRAbtdVmesVgccPjMpw4ZBXSNMNU%2BYam5trij1FwAjibjhkwCNlJQZOIASEemcw0KXvSzJZfcfAFibfy5dXnz1w%2B%2FGDEeCp5hPSk7rRDHIMUK%2BdFSuUn6WAgXIkApNbFKv1KFebncEA9JjteOZdxwKTR80rcGzmMzbb1e1k9WDeVVlcWDRAFD85OxNTsQ1BKSDNs22zUVy5I9tsDb%2BWp3DNMfDlilELXJUBR%2B3QnkJPtQYUGOntMHvQ5ecpcIYGqRVOVdvFhUqKCaDuX4oNu7n34cVDMf%2BdWuqPGjiNwfW%2Fkz2PDmaDUW53L70miNf3b8qf37%2FkL%2Fjl%2BzOmHEA6AAAAAElFTkSuQmCC',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOnSURBVEhLtZdfSFNxFMf33kNQREGBbP4JLdTAIFOTVpA2xcQ0TVZKzoGVYpha5KIiNaxmzCwJc4F%2FCEeGKCg%2BlEgUPmRIBZEhPVW%2BZFTo26nvoXP7TbfdO60fHO7153Y%2F5%2Fs95%2FyumujPevVigm5fqaXqooz%2FEng2GLJMuLl21klW8xo6abPS5bJSQ%2BE8mELHrAmGPotnllmTmQEWlmnU180bTfmVNNDkNRQtjkrKjt9ARSkRZN%2BdSJPeZ%2FT64bRu9DV6mAWmqdyWTMWWJDpgXs%2BbRgLQ9y9vES08pubqjLDgdcW5BKYJoIqobAZ6r9sNB6AS1QVJ1Hb6vK5iuCKqGeyKriRH5H5NtS12I5XvSw0a%2BI5AP83cI0dm7MrBnq1uBjec2MP1A7jX5QlYcxU8Nd7IVhupcUDFAKsP9HU4CRYGC1EMMJJcMbg5xuUHhoWhav7PwKgz1MkDoTjXEsmN58oqJYyQBJz5%2FqWHP4vkVqUYAIyGgNtceQxFCe4keOh5699ZrbJl%2Bo0dwOHOstbVJZGpnL06InozjUShPJxZXjZOsBWNotYOP4cKdZYxDfWH83WbbBlYrRtU6KlV%2B0FUowR63b0MjBlGXWE3si%2BwbOf6BgocsWg%2BUQyrUecRty98MMYJzSRxI6aRoej2mig7X%2BVnHDDS1eLO%2BN1RXWjQA2SpOplt2Io3EewHdKT3jKZ21eMUyFIB4%2BGiUG0o7CGRrnK3phZ2qzO%2F9L4mL4cFaOMUrJ6wGPXGi0CF4h69gHrju4NVPpL5TotaRzvi40KGLlgSwrjBYqicGLrApxz2pBeQHJRsST9EpiNN%2BiGvxWCKZf9ctEN7bcpRKlA0H56zyVpI6Zd6KOJUOyXUdlJOi48TuNg%2Fod1rSRkFh0oMp97ObRYNMjs3TwistaU3%2BTow%2BY7vJRlDVg9VDGrz7LV2Ul9Ot998w%2BboXXs18JM3H%2BnrjwXCdWr2M4Nx3%2FV0mq9wxBAYXxyrH2XYI3s%2FLX5b9IMDbE7N9FMMIBTCeixcYT%2F22G4jVsvfwoADjKXCl4JFHewVsHt4UnMhbDBgsF3Wh7EZdiEQGLXEqvKOMRAwLDRaWGBRKIrn3s5RR1J7QDBAWGgwUS9gJMLgo2lx%2FBdmqK5VbQVYhQZTDGUIJIFmUmvN4AetV3kGMRLB4Ohk%2BR1UilLZC2T18fYhVouGgkossbzk9%2B%2F4f6cGZyHDs8ybuV7hBl6p0tVycPDIKCcY4NhLrLtP8z8X6RfGWdbbxHboJQAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAASYSURBVEhLtZdtaJVlGMfPB5EgYUJHnVOnOzr3os6dodhyvr%2FOmTTT0YaDYLoxKGNCIjntg%2BYLTpgwUSkhKyeBkUil9SGYikXgC2JRJFIQRV8iSIpEuOJ31f%2Fpfs6eow70wMXznPvc9%2FW7rv913ffznJT997n%2B5UU7vGurdTWvfCyGbxj6pLjZ%2F2qHLS550maXjrXs1AlDttrJaXu2apQbfvZ1rbTmuRP9nt%2FwiW%2B%2Bw%2BKT%2BvT0ez5QWFVrqTlND7QnZq0eFFj9zCL75dab9v3VQ9bVNMvsrzNup491WMn0ahtRs8L915RPdxbMVHtDrZVWTnsgUEGNzC7xjK4N7HEYgD9%2BPenfMeCM8RsKSA3WrJuYdjDMFDc4e5hsmTNsdqNngXxv97Q65OJH3Q7Al4LhqmA0RlDMwYYMVoCoBBDwjrb5NqMs41e%2Bkx3OVXcF%2BEjANAuZIDOQTfUVUZ0BYYCYc75%2FiwfE2KCMKyrKfDEOyQZJJS0yqjvT1fONBqNrVUtlDoDmkqneuiaCcaxGQSoCEVCdSvQAqbHkY03fzud9LQB%2BZ92KkrTXWJnq2lr877byGtPqco50koeaqUnkWMGoYRjXWoJRt3OvOZIaf%2B0Tiv8Hk52i5kf2n2QMrzilHDiSsySwsgu3G2OsjWU8L1Pg0VErOlESaaFqqGYK5c0Hplxap%2BDV7ZHUSIXETKROGHAyBxbWUI2j5sJp2LUKmnkA5AslB20ngMighgGIMZEoVUOcogiB4FRHowJTjSU1PpnHeh0mse2E83CRHJIti8KMJZ%2B2CHPJnjkEFcorP%2BF1EJjFyhgnyIc8gNVsRB3uU%2BYTNJ364ZjldrywzoNgnPXKkmA0NwbGsWqsbaPaMVFg5pBVXcUCBx0oqnHYV%2Bn1djPd4jYw6jkfT7L%2BwkU%2BHmuuXFmIWM9XdTPyMk6GAuVeAfeNnZMXHtvHNAHZqG5Ig8ySTAe%2Fupcr%2BxGIwGT9yvjJns2qyqesbVnVfc1PrvAwUObhIUEAqzPFsYc89WuaURSBlUnPlhb74uyxyD479LpdONUbG%2BN3B6trcUazILGOPJqpMVNml0c3u8TqWtZ0TpviYOqMn8Pb22JAoH3ZrO0bOcY%2Bf2tvDO5gQMjN0ckDAJkJgHP56cqlDgWAnMAIKqwzErfUldone7fayQ3r3Hqnljtw9%2FACOzr3GYcSyPvtG%2FzewXrU6SHPQwMrq26KoIBvLdxm12s6vXHOj26wH1sPekAE0f1ifZQRMIL4oGuTg080NjicQAiI7PO%2BgSRB7%2F1%2Bx26v2eWw3%2FoH7M6lryPw7s61MfDZ7petZ9wkN2oMUPdRxrnvXPmgvJYCBsrnfmBqS8aSnswlcyI4F0p2APT5%2BbV3ovskMHVUXYEjM9%2BROezumNRJUMDfZDbanzd%2BcCAZ%2F%2FTSkcSMQwiZAlKdQ5k945Z5lf6OlQ%2BqA0Jw1Rh4bsZkC1yZASfb48sXR1kroNSJ3jd8D24bX573GAzhBKDv32U3JzYXWdJMALV%2FaTbkZuzbS%2BfM%2Fzvt6HjB4bzpszWGag2TCizsajIPTy%2FdE8SVj9%2B1e3f%2Ftn8Awd1PQbHvu5IAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAATASURBVEhLtZdtaJVlGMfP1%2BjDIo6zRjrPaq3NvZwTrbVss80sD9vMl7G56dKabgY6W7U0a0aGtUjtXRlimTQhGsxgwkKkZBBhkCEVjCwTgl4%2B1CLLPgRX%2Fm77P9zPOc8m%2B9ANF%2Ff93M9zX%2F%2Fr%2F7%2Bu63nOidl%2F44tPx23%2FwA7rbVvyvxi%2BwdCIsXixr9vqE1fbusZae3zD6hlbz5pl9kB9hTHjJ10ct86GO0N%2B2hZVuntgMWIfDr%2FrNlZ3dtngyPEZ2%2BtHjtqKBaU20LvEmspnufnQ7g7bkC621nuqQv5gDRaYsa6GaissmW9X1a6xna8duCJwR1O99bbcFrKxI4%2BaXTxqp08%2Bb1r%2F8fOQA8fn5o2d1vdIj307%2BIFtb19qYMaI4JrUIotVtTjwvl17pgxg78EhxwJGGM4FmLnX31nr2DXemrDhwW57Y8dKe6i61N7b3u%2F2Q8AEQJQcWlk1zzauXeUUAJCIuYdx8L7iXAeKSVZk5vrHswcce5meIwBqIQs4nqx1TPRg24J8x1Bg46NPu3vM3GP9zeevOlYYgFyTa5wr7%2FLH9WMrFmcDk2s5xwEHiJLIxYSZ4MQOCQmM5xQIz%2Bu8ZikzunMgG7j6xrjLGweJGAaKVkwF7DtWrqUMZylA%2Fwxr9rOAkRkWOEFGmIgBswLSWgHBXopwXkUlYD91kcCVhdcHReEDKQD1pyQXSx8YxjorRfz22lxXFWacV365gHBOVGLKYRn7csKecuoD6ywKqN2ULvZaUwl7s7srnGPkVS%2F6jGFGwXFPTlSAyrek9oHxp32eQzmIZbUTD8JIbaIeBBCHmOQjj8ohwUh2H7jxUp%2FjiyB5Ht%2FMr3Rc9he8QFI3z3GMxEogevWlK%2FKCCpeUUzEWQ4IDTGmJ7ONEaTIkjYpILaIiy%2BxzfRBgB0ux99tQa85mSU1V%2B3nEAZEiEcY1KiCTnLPPW2rsyV326zsn7PDDW5y86gDVDDPsCSyyuDKjxDFOAERe5L69qCiobr3ZyBvAGEHQNlEG6FPL0%2BEclxUVBAB6x5Ifco7MKJIsa7ITs5utpSwvaDPWh69baBPrd9vWdL1zWnPTtZYqL5nWguLiy1RTkGMUGW8xAgF4cWqu0edFyRb7JLfNvoy321hugwMn%2FyOz73V7XXPmOtC8umaLtb5wZfO%2Fx3yTfdN32gcFBDs5a5kLgDWMBbrw2SHL37TPKp44aPe%2FNOwCeOb98WAdBDUdMEFEgQpc87YbbrHK%2BQUByLlfJg1j5Dy4180jpybcWsGEfghkMhbo%2BY49jhk2keqxs3dvC64lc%2BEddQHwR1%2Bdt98uXDTm0%2Bd%2BcsCs3%2F74jJtRZEpgnykHf9i034F9t%2FQ5%2B2fyQgic%2FCbuSocYAwhDpGcwIz97Tu4oqTPl1W9hwAFm%2BOCZwGKHvAJ%2B%2BdipQIVI4KicChgwZNf4%2FdhnQUX7jAEml4wth447QMAYFFoW8FSF5DMU47%2FOfG9fF6yPBAaIQYGJvYAJxAG315S439XTVa8vK8A%2BqIorkzHMMIKgmPxcO2D9uqclMtvEr2StYSmm2ovK8dp9o44tBQVLhiRfd%2Bme%2B%2B%2FU373KvQCa8%2BPuDTRTa5iXE1S1XhyuZbw3GODsJbe%2BZZN%2F%2Fm3%2FAv6MsDKqJCOrAAAAAElFTkSuQmCC',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOuSURBVEhLtZdNSFRRGIbvokVQ9ANGZkmpqYzmbw4mpoQJKTVgRNIE0SLNlk1Qi8o29gsuKnIRgRT0R7hwUVCLFuKmRVTLoHYtIlq0aNGixVfPsXc4ztyZM0IOHM6913vO%2B73v937fuUb27%2FfhzbxNTZyzTHpgWQZ7g6FfxMWNs2PWV7XKkrWbrK2uclkGe4MBFr%2Fo1cxD92BLU9KqdrRaeXOXRZ3DbnDdU73WEol697fRwYR11ZRZU321rW7fZys7DmTf1Zpic%2BvOZocFZnRyf5fVNjTaura9dj0z4Aabwxygn98e2czdBUXez101%2BzVrdy4dsnT3Vjf8QIuBtqSG7PvT3ZZuX29gRmwIKOP%2B5DG38dfP97Kzrgno07tbWWACYhzu2R5kLtDfs902farGkYgFVgDzzy%2B6IGCsZwqMewaqIHshtj5oEFiSAso1AMgLKMEww578l7X2lgwaBBY7mL58fMbGT%2FQ65siNTJKfIAZbKmIZ5zIFNAisjWGmQQCSl2vyK%2BYY0Ze6EGgQWIyZcS4yww7mkl6g5JiqEHAx0CCwciwXa5YSYst71HepoEFgmJJfBswE5Oee5z5wiGnBHBM55oEVQ2AC8GcFIOBSQWMZkyeVigwlcDHHVPzNBx7qa3QdSYxCc14DwZnqRqpf5VSmwkiAKwD%2BnhnusJHuMns72eLAfzzZ5e55nu4st2vDlYuCygOGMQAsoDZlKORU7%2BYdWmRuuXGfSqxxgARHrUs17r9MJ7PgecA4k35N%2B2NmAZLmNggOBQJUU1FZoRYe8Xs91wQEGErE5ji31yqAFcmDec3h9eWFI1L5ptZ990stnhEgqUF2mMcyDp2pci%2BLMRwA%2FnEpc%2Fqp8A3KuiUDCxTJRvurXZ5lMnygugco1bwhm2MCYyD5x6n2pQH7dcpiDIjUzMqxZtqrzIUivEdgzC%2FOJ0oHzm0OlI0281up30bVcnnmf1TIaIs%2BBOLyG9eRYIx72VwuVoOhCthUSgDK%2Fen%2BjW48y9SFGRdrg9Sr72L%2FfAZIgfAOwSFxwV5d6nnKBkTv93J9ADoT%2FTWW%2Br3ObeW3aB2HGj61SN3qe0wNA%2Bn9AwYwaljKIP%2Ft49vipQ6BqhereWhTmLExM%2BBiSEp8cxFwto6P9jS4L4hSQJWnC6kKx5j8jezZ7BTQlwn3OjBUAaSF2p%2Bb2OH6OZjRg5tXnPNyT5Fix5saARvxHmv5UPdNpPU8o4xwNO%2BBBab732l87Ih7wGJZ%2F3%2FP7O3%2F7%2FQHZmNV8t0bvlIAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAALTSURBVEhLvZcxSFVhFMfv0BAY1KBgkISKyTMVDR%2FxEB1qSNEGCSSDplDnJ9SULWEUOCjoIC0F1eTg4KCjuDhVu%2B7S3NB44vfZ%2F3H6fHrvzXd78HHv%2Fc53z%2F%2F7n%2F85534vsT%2B%2F7wf7tv76hVVnxgoZ%2BAZDv4Sbd8%2Fn7V57k5W7rtvgrbZCBr7BAItfsrv5KUy09lcsuTtd6GjvHQhYYCZzExXr6rldKKAnVOlsNjATdnBt8H5d4MtDkw3fkFifCdw8MBrCIu2R4kZfuTZXKnUbu2dwz3oIkCO8w%2FVSeerUxlOBWVCdHrLjo%2Ff2YfmpPexvCQ73t1%2Fat703NjteCoP7tVePava31bEwt%2FhsNCRrDJ4Z2H5tGePw62pwqOefPz4HsNjORjUHONHwGucGhj2M5XRz46QE9Sw70fFzDQcGIA0Ye8NDHQNLCh9qgOPekDvUJBKO0JZQkmRe4zjUbCQ3Y0qnr7sjOMbhzPDNWhntfFn4K8GwC3Sk42pYh%2F4wZ7NxZp%2FJmFoUoJzqSpYqcbhSRvEa5nzmx5l9LjAM0TAeXj9CLTvzhLbeO2yM6EnrczWmQ7GAQR8nfJ4t4WYOOx2KpgFLQqxG47ueb8mpycUOKQU0QisllUBh4Tem5sI61kgG3kX7TIxZdOXOg9CHCZVAYYQMMISRTyyYap3PAzWaVGBYKhy%2BC6lnoyWOYYhT7mVDdw%2FKM2z5gKQCoy%2Bs4t5M%2BGAoYNh5IGw%2Bo7ERZvxl6tUqJ9WuGKhTSUuuPiIKve%2FTub9O6Ktv70WAkSx3y4S5%2FwiIoWo5Zgx739UIe0OA41CrgSgibBJN9Uzm%2FxMw5y2csXOdQMhQnJNIlA95gF21ih2bnuud2TI1EMqARsHgw6FS42WkUIfjig0g7nmv3nkLvTMBF3HOrgE%2FGen5r%2BdqSgzM5OPKUtAyPhsVwRYMsMAM%2F50W5x%2BHCXpzUf%2Bd8O3%2FO%2F0G%2BUf425geeJUAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKuSURBVEhLxZc9SJVRGMffvVCKLmLcr6LFBqeWiBqcDHUKUoMWxVxcblAt6WAkBg4JioiLRjndoUHIRnVxKjeHmlqioanB8dHfob88vvhx3u597cLhvp73%2BPyej%2F95zrmJ%2Ff3sbG%2FZ%2FKvnVhvszmVgG4Y%2BCQ9vno1a17ULNlRttbHKpVwGtmHA4pN8rr8PE%2FXSVftdvJHrWCi3BRbM5EnPbZspF3IF%2BoD6qy0GM8GDzVLpVPBusXrmmthsKeoocG%2F1ovV1FozvycqVE53AwReVy0EjZJHy%2FShePxJUNJh%2FHrxTMdv7aN%2B%2BzNrcxIPgxLty%2B6FBZYzvkfsdtr761JZnHodnnPDZiAajxvrigRIPwBoYBU69pFZKxqg9vHW4bmvtZZjLDP5UKgbAn18fjkQsB3AIw183psIavpUd1uAEpckEpjZEpGhJs%2BpMxB4OUKVgjd4BJrWZwIhEaRMURxCYTydQgXGIDPwzmPQgDNLHGB%2B%2BF2AMxCXDODRd624OGLUC%2Ffl9KaSZKBj8DZDoNIcjqjHvGopYYKIkOsRynHHe4WDTwAiBzZ%2Buo5RN5KSYCFWGk2qM85nERSPw4HRU%2Fh3pFVjby%2B%2F33MDeKRzwqsaphsBpcdESFRV1VsQNgxGYTyfPUjXp9Fuq6WAZJDrfBum%2F7F2EI8XzrEOhoVTTLjlV1PjVNokasNKMA6yhm2mtb5mZa8yWQtkYxLi2DlnwhwbzihqHqLG2mhpKtLgULQBFikGgHIEMLy7A9HDW%2B3nAOB0N1mEODDBAIpcBLgZASCO1xREyxBGqrUXU2tPcSqJOJxaqZpxQx11fmOMdHc5fbXS70FUZZ9J3segbSOwlLnbd%2Fwc%2FunvzXO%2FVaAJmsvL2dRBF%2Bm4Um7os62DAghl%2BO42PDoQJtkVev52w7X877QMjGuoUck7pWgAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKXSURBVEhLvZc%2FSBxREIe3SCEkAcEYDhKUQxROkoMLBhFRQrA4EQsRDk%2BQFKJne4GkimlCRMEiAVNImgTUyiJFCi3FxkrttRdrC8uR7%2BEsz3HPze5lXXjsn%2Fd2vjczv3lvN5Dr4%2FhgX358%2BSj1ajmThm0YegRcrHyoydv8Q3ldbJPSq6eZNGzDgMUR7G5vuAe58R4JFvozbfmRvGPBDObHBqT7TUemQN%2BhgUKrwAyYQWvlxb2B1euG4EfTxVsTejDbd2OCjMGQtn9x4E4wBseL7VId7BRCQ%2F5f9udcfrinn%2FDxrF7pk1%2BrM%2B7MO4ylIdIo3dwJZuYYkcs%2FsrP13hldnB2Wi%2FNN2V6vyVD3YwdHG0AZR1v7POkqg3d5Tyfi5zgWjHdqECNHe0vhPTD6aT5Yn%2B3%2F%2FeTG8g6TbHlXClOUCIzHwDGG1xjUdnb6M5yQ%2F1yv8drPfWIwAKCEnIbBKI%2FnRgsuCtqPDlKHmtzhLZ7T1HPybVNwcvjd9TNR4E8mCunB5EwNKVjFpCnQiSmY6FAVVtmpQq0K91XcCEwkULhdhhODCStAX8VRalexAaaWmwYrkBCqx7p46D1i05z%2FN7B6rBBdXKy4fI%2BbDrUP8%2BsWtTfKMYIkAnZ9T5RjXYlQLHWKlwCj6hglL9fLrgo4W68TgVkwtIbt2XpMv5YUkWKifkklAmMMTxCYbTbHth%2Fw83JX%2BrWa0vD3Xq55ZjcJO4Z7P8%2BJPeaFqJq04LjvtliwvzRyHQemvhFbU2D2T4ygSqB2T1Xj5I7cqwaiVqpEKxeD2UPxEuO2Fn1jKJZxdhdq5Hnsx15cyNL2h%2BDpod57%2Fa5mQYEZ%2FP721eWzMPgsVhhpvdT3YMCC6f6dFmtT4adrVv9OfBb7%2F05XeuML89AWolYAAAAASUVORK5CYII%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAALhSURBVEhLvZdPSBRRHMfn7sFLHroYBRKGCUJ7MLFAKtZEwU3WXFCEJZcgiE30lF5EKeiQUIfwUlCe9tChgx7DSyftXvfo7MHjLz6Pvsuvadh9K44Dj5l9M%2FM%2Bv9%2F392feJvb3%2BP7twN5urFp9rpjLYG0YOhIuXq7UbOxyl01cv2hTQ725DNaGAYsj2W98DBOL92%2FacnU211EZGwosmMnSxLDNjg7kCvQOFfsvGMwEC5ZKd84NLK87Aj%2BpTNr8vYI9XSid2tCOwID0wqPx%2FpCEGIBajLt93TYzfDUox5mBkVk5EwXmZR5k4Xr5hv043DY7%2BWwv6sUAXKvesuPfn%2Bzo65a9WX8Q5uZGLjXvUyGPy8V%2FDGgJrk7dDl5pcRYG6AeGcB8jNN94VwsG8BuDuCaZvOctwVj6%2FtW8HXx5HrxhERb79XMneDk52BOgLMqZ5wT316yBWtFgWaUYymPOQBlAkZWYMyQ5xslI3u9IapqJOhgWezBxZgDHe8mK5Bggz%2FF2unDlvwRrKzXxAuil9jFGUuKsOaDA9Bs1yJV0ZrcEY6lk5qzFMMLPezDzkhmj0kklA9qWE7GhVrFcYBZWNuOdB%2FtrQkCIgKSbTVswFtLDfbl4z1XPmtvbfRYMJP5KNDWb6KzWg8jlyyNdy1n38FyxxgDgKBctNZntZVaJqKb5nW4seK3u5ZsKFRIFJi54K%2Fm8xL5kPJj4U2L0aZ%2BQqBINJrYC0PZ8HaslYowvH57nPSpC7xBv5kmoKI%2FVMpXB6c6FEmSujzFeKmPxnjAxhwI%2Bs9t%2BJIDjAR8LD1Ydp8OAZ8A0z3XWdiqqnJAHkAcDQELmskrNl5ePbZTUvu48GKBaJQ2CZMr6ZOor1nGv9mAA6tt4SLarI2mT4NuoroFmbZGipSZOwFmQxbK2NADY9sRsGqPBZ73XboIro9fOdV9NlcBMPrzebNbbWXuXXk9dDWb477RWe9jcQ%2BX130n7M%2F13%2BgOW7PP25m3OhAAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAJxSURBVEhLvZc9iBNBFIC3txQ7Qa64QotUgsjdgVglkWsMSJLD6jRptIgYK03hoVEQjODBhUOI4B2IKUQsjJ2k0ELUxko7C7EUC8sn3%2BBbhnF3dpPsGBgu995kvvc%2Fu5H8%2FXx6N5XtrWvSaZSDLM6GoZ%2BIL3e7bTm9dEA2qstyoV4KsjgbBiw%2B0WT8xAh2nm3KexkGXf3BWcOCGbXOnJTezUpQoO1QbfWwwIyw4OnbbiFgznn9re89S71eCDz9OZDR5JJ0r56SaumgrJcOZaZtLvCLzz1TC6RGi6WxckTudMoyfXld5Pdz%2BfjmtjEAY5JqJhMM5HLrhKlw8kJKWJ1zx%2BVhryav9q%2FI96%2B7BuYu5Bh0%2F1HzH3gmGCAQAHiRBvn1Y8%2Fo2Te6dz5egAm%2F2y1eMHnjR7aXGKE5RK5eAtV9%2Bvdi5aioQfzG7hovGG%2FJG4emLQUrwN6HTPXkHoM0314wFqr1Wjy2t2kes4f8u3spxFxgNtGTFAchxnq8GA%2FbcQ7VI3KvucVr5MgIN5FzZ0RmcSlcwRxIAfG%2FLfvy4UEsQ68G4Tlgt6WCg0kHRVoImFBqWH2hRpc2iufyGKgWXVI7oVd5oWCKRtsmqZ3sIVMomILJ4zEdsFCOmdU6n2kPe0IlhZr%2BpcrRYSTTz70mc%2BUYEL2bNL2SQq1Q1TF8ZprVtACW2reSO499s5q9eEyUmFrc27kmFxPLBc0CtgcJM98eJN5Qo8y6JHwXiK0jVbkvCSaOL8xZ0bD1FBiO5Ap1yMfcXFUdwoAY3Fw79l%2Bfq6lymNHjwS2T%2FLSnwiK9hgELpnl3utGuGwEFFerdSYtV353%2BAIXiswe2o3QJAAAAAElFTkSuQmCC',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAALhSURBVEhLxZc%2FSFZRGMbv3tzSEo4WNIUYYVBLX6iLgn8CB5NUiIZPUBr8ghBFMSLJAmlRTBcdIkRyNJeG6M9cQ1s0NTg4vvo7%2Bsj7HT7vdxSufXA4995z7nne53mf95z7ZXb0%2B%2F55x15PjFm5t1RIY20w9Mu4mBkdsjsNF6zjdrN1t5YKaawNBlj8sq31d%2BHBk9llW%2FhihbbHY5MBC8xssPWGDT8aLRTQE2prajQwMyKYWPp0bsBinQs88mw%2B5PtB%2F6DxwovN31UBVt58COMoxjj39dKVBIwai8%2F7Qpsul0J%2BPDigPNd4783LRrB54EnAOPHb9pTZ3nvb%2FbtiLCzXY0audzbGwziNIFAH8FoKEVASMAsLmB7GtI%2BrI6G%2Fe%2FVSYAuoxnn28F6jVQZuGUZ6tf2vSoFcYOTEcJ4xC88%2F7bT2axcD0M%2BvcwHsz6%2B3x4pwT0MdKdDX1Z0GTIREXe66HhoAklKSq4c5zGAIIOy513wCQBmf8xMZT6%2F9CJNlKjGiX1842HWO8ul7pUMBESz5piF3ErAMQH5h7nOMuTwbrgkIZfQcxgQutydL7aOrZS4xUR4B8sAExz3jeAKXJzPGXJQLMvlygh33KiG52wP7FDA%2FOcfeXORZzMQAxizOGKkgQJxOMHK1es1JYgwwUcYmYjFkhSVyMgdF5AXVuIJFBQLDrEnATJLEsJSrtUHINHK9773reRcl4gModwPBEESs%2BvQ7E89U477OKSH%2FXIzjgyUXGLmZ4M0FY3YyGKjFOxv3nFCUEPt1DFp3r%2BZFFonrmHzmlRvjvIcqyFzrq%2BZExrDBKHKpXA1jAvHfZHFgvAeo9nLA42MyV2oWV4nI3ToU4pLx5eYPCN4jeIJLdjUTiVTmooQIRCVzmv7UWyYGgzkg9OTLGyv1Ov4aSfoQqPf9dJbx%2Fw98v%2BXKuX5XU25gZksvD7%2Fu4%2BPrLDLWewcMsMAM%2F50qQz1Vm34R%2F5%2FYBf1%2Fp31QIMv2Ud3ZdQAAAABJRU5ErkJggg%3D%3D',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAALSSURBVEhLvZc9SFVhGMfP7hhtQTQ0VOAkikRiTX7gkiBqNIRfQzVc4TrpBQm1SFChInFR0CB0iBDRNrlLg6R77tHs4Pjq78X%2F4bm3c869r5fTgZfz%2BT7%2F5%2F9%2FPt73RO7qOPlZdh%2FfTLnCUFcuA9tg6Ii4eFeccE%2FuNLlnj%2B%2B60d7mXAa2wQCLIzrY2fQPPr8fcUdHq7mOhamnHgvMaLy33ZVeducKaAn1t95yYEZ48HWjGASMOsz5vl0KmocDYh0MvDQ77IYe3nZj3fe8bIzii87YARzCeFrorg3MxJmRDufOv%2Fnx%2B9eKd0QK4MiHUr%2Fra75Z4ZDkzgT%2Bsbfgeh7ciBmJmc6FgZYYuLw7XfHdzupl1l45hCoA2RhnAiMnk44P5xMHLMX4z%2BlaxTd6znn%2Fy6QvzbqBQxivLz6PGcP%2B7O%2BWD4XUCWKMh8QsjXUSY%2FsMcGIM2%2FLhcv2MkZpMrY5tUowtY73HCcDfFrp8N7TgqTGGKQYwmDaInWJJHtjvkNvGmUSESM2spikAzISkAYgtJUpH94BWz0HyuoDxDHAkkSxigXxkMWcAcdCyR2LJTXyZv%2F7pVf0xBpzMRnY6EDVNvGwJSRWeyRGcYqAKTJPWgMw6ltzVyWXZ0a2kAOWDAmoeaiCAV68DmcB8zCSbJFnXJBhOAW5zgPvgOkZeW5uSlHhb40nlhBJ8fy1g6pgMxTCNRAsDwFYNlZJ1DEDmJi25NVcniv71QJufDLBYAEACSXox5hurEPIHx5isFjBJJIMAkt08s7VL6aAQQNapYKnJamKMXMpcAGEPCGfbubQCKTx6FwxMHAAlU7XSYFS1bYEpIQGjEr2ZudoMBJUTABhg0AS4V6%2FFOGogKw5wbfdevFfXS9rL1UyurK0uxjEauklsaLPX6N47Zjz86P5%2F3VcTPjCjjeW5f7aojbJKm6%2FNBZj%2B32lmYtCDs8vP698J2%2Fbf6QLY0m2scvZLqgAAAABJRU5ErkJggg%3D%3D',
];
var groups_img_recommand = [
	'data:image/gif;base64,R0lGODlhGAAYAJEAAP///wAAAP//ZgAAACwAAAAAGAAYAAACRpSPqSvhDNGLdDKrnN4cn90ExuNJIimGanWmKKVOr9fV9dWOObu+vLyL+Gapj+1YgsGAxubCAi2WMFGT9brSKbfcrverKAAAOw==',
	'data:image/gif;base64,R0lGODlhGAAYAJEAAABm/2YAAP//ZgAAACwAAAAAGAAYAAACM5SPqcvt34CETFqq7MVIT354ABhqZCkFwSmk6nq+LyurdA2DeM7tMX6TBWck4M/GSioxBQA7',
	'data:image/gif;base64,R0lGODlhGAAYAJEAAGYAAP+ZM///ZgAAACwAAAAAGAAYAAACP5SPqcvtCGJ8SlpAz7VZbNl9RpBtCEldCeqoa8q9Tyy3oMI29AlPeI/5zXYjoO+QY4iQpU8kaXN2PNLpcjotAAA7',
	'data:image/gif;base64,R0lGODlhGAAYAJEAAAAAAJkzAP//ZgAAACwAAAAAGAAYAAACSJSPqcvtDwGALUi6gr3Y6M9hHxhCoyZNneZtXXLGoyPXVX2WME7evMv4oVQZoQ7BYgmUw9sy0GodD0noM0qDMq1K59bzCosFBQA7',
	'data:image/gif;base64,R0lGODlhGAAYAKIAAAAAAGZmZpkAAJmZAP//ZgAAAAAAAAAAACwAAAAAGAAYAAADYki63P4wyklrHWLYJ/rm2uYto5UpQ6quqzOysOpqcR2SAmEHPJ82J1+qR+zdFJ6ikjgjLFc5iKdDrVIjJ0wVwz1xctZwdZahAgDRsMt6RoM75yjDC4+nBXGJGDnGWuclHxEJADs=',
	'data:image/gif;base64,R0lGODlhGAAYAKIAAGYAAGZmZplmAP8AAP//ZgAAAAAAAAAAACwAAAAAGAAYAAADNEi63P4wykmrvViNkdvujQCACyCQiogSZhO8cCzH7mzL9Q0DPNzxIxRQOCQVjcGVcslsKhIAOw==',
	'data:image/gif;base64,R0lGODlhGAAYAJEAAP///wAAAP//ZgAAACwAAAAAGAAYAAACTpSPqcsW354MCkZqU5YI+gmCx8RkC3lSl+qEYse1I2sKn4zbLP658Szb0Ha64BAIMyKLMIzTV3sJG8zSziSEvqopak1DBHvDyQv1jE5TCwA7',
];
var GROUP_ICON_IMAGE = 'data:image/png;base64,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';
//$NOHL //}}}

/** グループ設定基準データ */
var defaultGroupConfigs = [];
$R(17).each(function(v, idx){
	defaultGroupConfigs[idx] = {
		src   : defaultGroupIcons[idx],
		colors: { normal: '', wounded: '#AAA' },
		alt   : '',
	}
});

//******************************************************************************
// メモ化変数
//------------------------------------------------------------------------------

var MAP_LIST_CACHE ;

//******************************************************************************
// もこ
//------------------------------------------------------------------------------

//thickbox を呼び出す関数を IXA 本体から再利用
//<a href='#TB_inline?height={int}&amp;width={int}&amp;inlineId={id}'>
//からポップアップを表示
var tb_init;
//var tb_init = function( selector ){
//    unsafeWindow.tb_init( selector );
//};
function Moko_addJQuery(callback) {
	if (typeof(unsafeWindow.tb_init)!='undefined') {tb_init = unsafeWindow.tb_init;}
	//GM_log( 'CSS', 'BEGIN', Date.now() );
	// CSS適用
	attachMokoCss();
	//GM_log( 'CSS', 'END', Date.now() );
	//GM_log( 'MOKO', 'BEGIN', Date.now() );
	callback(jQuery);
	//GM_log( 'MOKO', 'END', Date.now() );
}

function MokoMain($) {

	// スクリプト開始時刻
	Moko_pastTime.begin();
	
	// ログイン時間の記録
	Moko.InitLoginTime();

	if( /^world\./.test( location.hostname ) ) return;
	if( /^sengokuixa\./.test( location.hostname ) ) return;

	// 秒刻みイベント開始
	Moko_startSecondHand();

	//// エラーログ表示パネル
	//new function(){

	//	$('<div id="moko-error-log"><h2></h2><div class="moko-error-log-content"></div></div>').hide()
	//	.prepend($('<h2>Moko</h2>').css({background:'#888',color:'#fff',margin:0, padding: 4}))
	//	.prepend($('<button>閉じる</button>').css({fontSize:8,float:'right'}).click(function(){$('#moko-error-log').hide()}))
	//	.appendTo('body')
	//	.css({
	//		width:'100%',position:'fixed',bottom:0,left:0,
	//		height: 300, overflowY: 'scroll', overflowX: 'auto',
	//		background: '#eee', color: '#444',
	//	});


	//	$('<span id="moko-error-display-btn">エラーログを表示</span>')
	//	.css({
	//		display:'inline-block',
	//		background:'#555','border-radius':'3px',color:'#aaa',
	//		fontSize: 10, padding: '2px 6px',
	//		cursor: 'pointer',
	//		marginLeft: 10,
	//	})
	//	.appendTo('.copyright')
	//	.bind('click', function(){
	//		$('#moko-error-log').show();
	//	});
	//}

	Moko.readyConfig();
	
	// レイアウト用のサイズの無いブロックを挿入
	Moko.Layouter = $('<div id="ixamoko_layouter">').css({position:'relative'}).prependTo($('#wrapper_body'));
	$('<DIV id="loading_mask" class="ixamoko_mask"></DIV>').prependTo('body');
	// IXAツールのサイドボックス
	Moko.InitSideBox();

	/** 機能実行
	 *  各機能を順次実行
	 */
	Moko.eachFeatures(function(feature){
		//GM_log( feature.name, 'BEGIN', Date.now() );
		if( !DEV_MODE ){
			feature.exec();
		}
		else {
			try{
			feature.exec();
			}
			catch(e){
				console.warn(e);
				var $errorState;
				if( !($errorState = $('#moko-error-state')).length )
					$errorState = $('<div id="moko-error-state">').appendTo('body');
				$errorState.hide();
				var $errorItem = $('<pre>');
				$errorItem.append(feature.name+' :: '+e);
			}
		}
		//GM_log( feature.name, 'END', Date.now() );
	});
}


//******************************************************************************
// 機能のベース
//------------------------------------------------------------------------------

var Moko = {
	common: {}
};
Moko.Config = {};

Moko.readyConfig =function(){
	var cfg ;
	cfg = mokoStorage.getItem('Config');
	// 設定がない場合
	if( !Object.getLength(cfg) ){
		var oldConfig = oldMoKoConfig();
		// 古い形式の設定があれば読み込む
		if(oldConfig){
			mokoStorage.setItem('Config', oldConfig.Config );
			mokoStorage.setItem('Squads', oldConfig.Squads );
			Object.merge( cfg, oldConfig.Config );
		}
	}

	Moko.Config = cfg;
	mokoStorage.flush();
};

/** Moko.* の名前空間から Moko機能だけ抽出（exec関数を持つメンバー）し、優先度を解決しコールバックに投げる */
Moko.eachFeatures = function( callback ){
	Object.keys(this)
	.filter(function(name){ return !!Moko[name].exec && !/^_/.test(name) })
	.sort(function(a, b){
		return Moko[a].priority - Moko[b].priority ;
	})
	.each(function(name){
		callback( Moko[name] );
	});
	;
};

Moko._Base = {////{{{
	enable: true,
	alwaysEnable: false,
	config: null,
	options: null,
	capttion: null,
	detail: null,
	name: '_Base',
	configurable: true,
	priority: PRIO_NORMAL,
	common: Moko.common,

	setEnable: function(){ this.enable = true },
	setDisable: function(){ this.enable = false },

	checkConfig: function () {
		if( !this.config ) return true ;
		switch( typeof( this.config ) ){
			// 文字列の場合（基本）
			case 'string':
				var configKey = this.config;
				// 該当する設定を参照

				// 該当設定が未設定の場合
				if( typeof(Moko.Config[configKey]) === 'undefined' ) {
					this.assignConfigDefaultValue(configKey);
				}
				// 文字列のゼロは数値として返す
				return (Moko.Config[configKey] === '0') ? 0 : Moko.Config[configKey];
			break;
			// 関数の場合
			case 'function':
				// 関数の戻り値を評価
				return this.config(Moko.Config);
			break;
			default:
				throw(new Error('Feature.config形式が違う'));
			break;
		}
	},
	
	assignConfigDefaultValue: function(configKey){
		// 該当設定が未設定の場合
		if( typeof(Moko.Config[configKey]) === 'undefined' ) {
			// configSettings をしらべて初期値を得る
			if(this.configSettings && this.configSettings[configKey]
			   && typeof(this.configSettings[configKey].default_value)!=='undefined')
			{
				// 初期値を設定に入れる
				Moko.Config[configKey] = this.configSettings[configKey].default_value ;
			}
			else {
				var default_value;
				// 全機能を巡って、参照先がないか調べる
				try{
				Moko.eachFeatures(function(feature){
					if( feature.configSettings && feature.configSettings[configKey] ){
						if( typeof(feature.configSettings[configKey].default_value) !== 'undefined' ){
							default_value = feature.configSettings[configKey].default_value;
							throw false;
						}
					}
				});
				} catch(e){ if(e) throw e; }
				// 初期値 default_value なければ真
				if( typeof(default_value) === 'undefined' ){
					Moko.Config[configKey] = true ;
				}
				else{
					Moko.Config[configKey] = default_value ;
				}
			}
		}
	},

	checkOptions: function () {
		if( !this.options ) return ;
		// キーと同名のプロパティに、値と同名の設定を代入
		// { propName: cfgKey } -> this.propName == cfg['cfgKey'];
		Object.each(this.options, function(cfgKey, propName){
			// 設定がなければ初期値を
			if( typeof(Moko.Config[cfgKey]) === 'undefined' ) this.assignConfigDefaultValue(cfgKey);

			this[propName] = Moko.Config[cfgKey] === '0' ? 0 : Moko.Config[cfgKey];
			//if( propName == 'defaultSoldierNumber' ) GM_log( propName, this[propName] );
		}, this);
	},

	exec: function () {
		this.checkConfig();
		this.checkOptions();
		//console.log('Exec: ', this.name);
		if( !this.checkConfig() ) return;
		if(!this.enable) return ;
		if( this.condition() ){
			this.ready ?
				this.ready() : this.run();
		}
	},
	//------------------------------------------------------------------------------
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	// ready: function(){ /* anything */ },
	// run: function(){ /* anything */ },
};////}}}

//******************************************************************************
/** 各設定項目を作る */
// コンテキスト： MokoFeature
//------------------------------------------------------------------------------
Moko.structUserOption = new function(){
	var structUserOption = function (){////{{{
		var here = arguments.callee;
		var items = [];
		var settings = {};
		var cfg = mokoStorage.getItem('Config');

		// 標準の設定をまず入れる
		if( typeof( this.config ) === 'string' ){
			settings[this.config] = { caption: this.caption, detail: this.detail } ;
		}
		// configSettings がある場合、上書き。
		if( this.configSettings ){
			var mainConfig = {};
			if( typeof( this.config ) === 'string' && this.configSettings[ this.config ] ){
				mainConfig[ this.config ] = Object.merge( settings[this.config], this.configSettings[ this.config ] );
			}
			Object.merge( settings, this.configSettings, mainConfig );
		};
		var templates = here.templates;
		
		if( Object.getLength( settings ) ){
			Object.each( settings, function( sett, configKey ){
				//console.log( configKey );
				if( !sett.type ) sett.type = 'simpleCheckBox';
				//if( typeof(cfg[configKey]) === 'undefined' ){
				//	var defValue = defaultConfig()[configKey];
				//	if( typeof(defValue) === 'undefined' ){
				//		sett.type == 'simpleCheckBox' && typeof(cfg[configKey]) === 'undefined'
				//	}
				//}
				
				var cfgItemTemplate = sett.type ? templates[sett.type] : templates.simpleCheckBox ;
				if(!cfgItemTemplate) throw(new Error('Template not found: "'+sett.type+'".')) ;
				cfgItemTemplate = Object.merge({}, templates._base, cfgItemTemplate );
				
				if( typeof(cfg[configKey]) === 'undefined' || cfg[configKey] == null ){
					sett.value = sett.default_value ;
				}
				else {
					sett.value = cfg[configKey];
				}

				if( !sett.selected ) sett.selected = '';
				//if( sett.enable === undefined ) sett.enable = true;

				var $cfgItem = $.tmpl(
					cfgItemTemplate.template,
					Object.merge({id:configKey}, sett, cfgItemTemplate.templateVars() )
				);

				$cfgItem.data({
					valueGetter    : cfgItemTemplate.valueGetter,
					configKey      : configKey,
					templateSetting: Object.merge({id:configKey},sett),
					isNotConfig    : cfgItemTemplate.isNotConfig,
				});
				
				if( cfgItemTemplate.attachEvents ){
					cfgItemTemplate.attachEvents( $cfgItem );
				}

				items.push( $cfgItem );
			}, this);
		}
		return items.length ? items : null ;
	};////}}}
	
	//******************************************************************************
	// 設定項目のテンプレート
	//------------------------------------------------------------------------------
////{{{
	// 標準の設定取得関数
	var defaultValueGetter = function($item){
		var val = $item.find('.ixamoko-cfg-field').val();
		if( /^-?\d+(?:\.\d+)?$/.test(val) )
			val = parseFloat( val );
		return val;
	};

	structUserOption.templates = {

		_base: {
			template: '',
			templateVars: function(){},
			valueGetter: defaultValueGetter,
			isNotConfig: false,
			attachEvents: function($item){},
		},
		
		simpleCheckBox: {
			template: ''+<><![CDATA[
				<div class="ixamoko-cfg-item ixamoko-cfg-checkbox" title="${detail}">
				<label>
				<input type="checkbox"{{if value}} checked="checked"{{/if}} id="ixamoko_useroption_${id}" value="ON" class="ixamoko-cfg-field ixamoko_cfg_checkbox"/>
				{{html caption}}</label>
				</div>
			]]></>,
			//valueGetter: function($item){ return defaultValueGetter($item) ? true : false }
			valueGetter: function($item){
				return $item.find(':input').prop('checked');
			}
		},

		selectBox: {
			template: ''+<><![CDATA[
				<div title="${detail}">
				{{html caption}}<select id="ixamoko_useroption_${id}" class="ixamoko-cfg-item ixamoko-cfg-field ixamoko-cfg-selectBox-area">
				{{each optionList}}
					<option value="${$value}"{{if $value==value}} selected="selected"{{/if}}>${$value}</option>{{/each}}
				{{each optionMap}}
					<option value="${$index}"{{if $index==value}} selected="selected"{{/if}}>${$value}</option>{{/each}}
				</select>${caption_after}</div>
			]]></>,
			valueGetter: defaultValueGetter
		},
		
		comboCheckBox: {
			template: ''+<><![CDATA[
				<div title="${detail}" class="ixamoko-cfg-item ixamoko-cfg-combocheckbox">
				<div class="ixamoko-cfg-item-title">{{html caption}}</div>
				<div class="ixamoko-cfg-item-combobox">
				{{each optionList}}<label>
					<input type="checkbox"{{if value.indexOf($value)>=0}} checked="checked"{{/if}} id="ixamoko_useroption_${id}" value="${$value}" class="ixamoko_cfg_checkbox"/>
					${$value}</label><br />
				{{/each}}
				</div>
				</div>
			]]></>,
			valueGetter: function($item){
				var values = [];
				$item.find(':input:checked')
					.each(function(){ values.push( $(this).val() ) })
					;
				values = values.map( function(v){
					return /^-?\d+(?:\.\d+)?$/.test(v) ? parseFloat( v ) : v;
				});
				return values;
			}
		},
		
		textInput: {
			template: ''+<><![CDATA[
				<div class="ixamoko-cfg-item ixamoko-cfg-textinput" title="${detail}">
				<label>${caption}<input type="text" id="ixamoko_useroption_${id}" value="${value}" class="ixamoko-cfg-field ixamoko_cfg_textinput"/></label>
				</div>
			]]></>,
			valueGetter: defaultValueGetter,

			attachEvents: function ($item){
				var sett = $item.data('templateSetting');
				if( sett['validation'] ){
					//var defaultText = sett['default_value'];
					//if( typeOf(defaultText) !== 'string' && typeOf(defaultText) !== 'number' ){
					//	defaultText = '';
					//}
					var validation = sett['validation'];

					$item.bind('change',function(){
						$item.removeClass('ixamoko-cfg-validation-fail');
						var $field = $item.find(':text');
						var value = $field.val();

						var result = true;

						if( validation instanceof RegExp ){
							if(!validation.test(value)){
								result = false;
								$field.val("");
							}
						}

						else {
							var validated = validation(value)
							// false, null, undefined なら空にする
							if( validated === false
								|| validated === null
								|| typeof(validated) === 'undefined'
							){
								result = false;
								$field.val(""); }
							// true ならそのまま
							else if( validated === true ) {}
							// なにか帰ってきていたらそれを設定
							else {
								$field.val( validated ); }
						}

						if(!result){
							$item.addClass('ixamoko-cfg-validation-fail');
						}
					});
				}
			}
		},
		
		markerIcon: {
			template: ''+<><![CDATA[
				<div id="ixamoko-cfg-item-${id}" title="${detail}" class="ixamoko-cfg-item ixamoko-cfg-markericon">
					<div class="ixamoko-cfg-item-title">${caption}</div>
					<div class="ixamoko-cfg-item-markericon">
					{{each value}}
						<div class="ixamoko-cfg-item-markericon-entrybond" index="${$index}" style="background-color: ${$value.colors.normal}">
							<img width="30" height="30" align="absmiddle" src="${$value.src}" />
							<input type="text" value="${$value.src}"   class="ixamoko-cfg-markericon-field-src   ixamoko-cfg-textinput index-${$index}"/>
							色 <input type="text" value="${$value.colors.normal}"
									class="ixamoko-cfg-markericon-field-color ixamoko-cfg-textinput index-${$index}" />
							字 <input type="text" value="${$value.alt}" class="ixamoko-cfg-markericon-field-alt  ixamoko-cfg-textinput index-${$index}"/>
							<input type="button" class="ixamoko-cfg-markericon-update" value="更新" />
							<input type="button" class="ixamoko-cfg-markericon-delete" value="削除" />
							<select class="ixamoko-cfg-markericon-field-soldierType">
								<option value="">基本兵種</option>
								{{each(solname, soldata) soldier}}
								<option value="${soldata.typeno}" {{if $value.soldierType == soldata.typeno}}selected="selected"{{/if}}>${solname}</option>{{/each}}
								</select>
						</div>
					{{/each}}
					</div>
					<div class="ixamoko-cfg-item-footer">
						<input type="button" class="ixamoko-cfg-groupconfig-additem" value="追加" />
						<input type="button" class="ixamoko-cfg-groupconfig-default" value="標準に戻す" />
						<!--<input type="button" class="ixamoko-cfg-groupconfig-recomendation" value="お勧め" />-->
					</div>
				</div>
			]]></>,
			valueGetter: function($item){
				var values = [];
				$item.find('.ixamoko-cfg-item-markericon-entrybond')
					.each(function(idx){
						var opt = values[idx] = {};
						opt.colors = {};
						var $this = $(this);
						opt.src   = $this.find('.ixamoko-cfg-markericon-field-src'  ).val();
						opt.colors.normal = $this.find('.ixamoko-cfg-markericon-field-color').val();
						opt.alt   = $this.find('.ixamoko-cfg-markericon-field-alt'  ).val();
						opt.soldierType = $this.find('.ixamoko-cfg-markericon-field-soldierType'  ).val();
					})
				;//$end
				return values;
			},
			
			templateVars: function(){
				return Object.merge({}, { soldier: SOLDIER_DATA });
			},
			
			attachEvents: function ($item){
				var self = this;
				var func = $item.data('valueGetter');
				// デフォルトに戻す
				$item.find('.ixamoko-cfg-groupconfig-default').click(function(e) {
					if (confirm('本当に標準に戻して良いですか。全てのグループ設定は破棄されます。')) {
						var baseSett = $item.data('templateSetting');
						var defSett = {
							id: baseSett.id,
							caption: baseSett.caption ,
							value: defaultGroupConfigs,
						};
						// 差し替え
						var $defCfgItem = $.tmpl( self.template, defSett );
						$item.empty().append( $defCfgItem.children() );
						// グループ設定クリア
						var squadConfig = mokoStorage.getItem('Squads');
						Object.keys(squadConfig).each(function(key){ delete squadConfig[key].groupID });
						// 現在の内容で設定保存
						var values = func( $item );
						var mokoConfig = mokoStorage.getItem('Config');
						mokoConfig[$item.data('configKey')] = values;
						
						mokoStorage.flush();
					}
				});

				// 1項目追加
				$item.find('.ixamoko-cfg-groupconfig-additem').click(function(e) {
					var itemTemplate = ''+<><![CDATA[
						<div class="ixamoko-cfg-item-markericon-entrybond" index="${index}">
							<img width="30" height="30" align="absmiddle" src="${src}" />
							<input type="text" value="${src}" class="ixamoko-cfg-markericon-field-src ixamoko-cfg-textinput"/>
							<input type="text" value="" class="ixamoko-cfg-markericon-field-color ixamoko-cfg-textinput"/>
							<input type="text" value="" class="ixamoko-cfg-markericon-field-alt ixamoko-cfg-textinput"/>
							<input type="button" class="ixamoko-cfg-markericon-delete" value="削除" />
							<select class="ixamoko-cfg-markericon-field-soldierType"><option value="">兵種</option>
							{{each soldier}}<option value="${$value.typeno}">${$index}</option>{{/each}}</select>
						</div>
					]]></>;
					
					var $list = $item.find('.ixamoko-cfg-item-markericon');
					var index = $list.children().length;
					//console.log( $list.children(':eq(0) img') );
					var src = $list.children(':eq(0) img').attr('src');
					$.tmpl( itemTemplate, { src: src, index: index, soldier: SOLDIER_DATA } ).appendTo($list);
				});
				
				// 画像差し替え
				$('#'+$item.attr('id')+' .ixamoko-cfg-markericon-field-src').live('change', function(e) {
					$(this).prev().attr('src', $(this).val() );
				});

				// 画像差し替え
				$('#'+$item.attr('id')+' .ixamoko-cfg-markericon-field-color').live('change', function(e) {
					var color = $(this).val();
					$(this).closest('div').css({backgroundColor: color});
				});

				// 1項目削除（設定強制書き換え）
				$('#'+$item.attr('id')+' .ixamoko-cfg-markericon-delete').live('click', function(e) {
					if( $item.find('.ixamoko-cfg-item-markericon').children().length <= 1 ){
						confirm('項目を0個にはできません。');
					}
					if (confirm('本当に変更して良いですか。データは即座に書き換わります。')) {
						var remIdx = $(this).closest('div').remove().attr('index').toInt();
						var squadConfig = mokoStorage.getItem('Squads');
						$item.find('div[index]').each(function(){
							var idx = $(this).attr('index');
							if( idx > remIdx ){
								$(this).attr('index', idx - 1 );
							}
						});
						Object.each( squadConfig, function(squad, squadID ){
							if( squad.groupID == remIdx ){
								squad.groupID = 0 ;
							}
							if( squad.groupID > remIdx ){
								squad.groupID -= 1 ;
								if( squad.groupID < 0 ) squad.groupID = 0;
							}
						});
						var values = $item.data('valueGetter')( $item );
						var mokoConfig = mokoStorage.getItem('Config');
						mokoConfig[$item.data('configKey')] = values;
						mokoStorage.flush();
					}
				});

			}
		},
		
		functionableButton: {
			template: ''+<><![CDATA[
				<div class="ixamoko-cfg-item ixamoko-cfg-checkbox" title="${detail}">
				<button id="ixamoko_useroption_${id}">${caption}</button>
				</div>
			]]></>,
			
			isNotConfig: true,
			attachEvents: function($item){
				$item.click(function(){
					$item.data('templateSetting').function()
				});
			}
		},
		
	};

	return structUserOption;
};
////}}}


//==============================================================================
//------------------------------------------------------------------------------
/**                          ここから Moko 機能                               */
//------------------------------------------------------------------------------
//==============================================================================

/** 機能登録関数。基本的な動きを継承？する */
function FeatureInit(){
	var feature = Object.merge.apply( null, [{}, Moko._Base ].concat( Array.slice( arguments ) ) )
	feature.common = Moko.common;
	return feature;
}

//******************************************************************************
/** ワールド選択時：ログイン時間取得 */
//------------------------------------------------------------------------------
Moko.InitLoginTime = function () {////{{{
	// ワールド選択はホスト名が違うので localStorage ではなく Cookie 経由で取得する
	if (LPath.select_world) {
	    Cookie.write('im_st', getUnixTime(), { domain: '.sengokuixa.jp' } );
	}
	else if (Cookie.read('im_st')!=null) {
	    localStorage.setItem(OPTION_PREFIX+'starttime', Cookie.read('im_st'));
	    Cookie.dispose('im_st', { domain: '.sengokuixa.jp' } );
	}
}////}}}

//******************************************************************************
/**  */
//------------------------------------------------------------------------------
Moko.OuterSideContents = FeatureInit({
	enable: false,
    name: 'OuterSideContents',
    condition: function () { return LPath[''] },
    //------------------------------------------------------------------------------
    run: function () {
		$('<div>',{
			id: 'moko-outside-left',
			css:{position:'fixed',top:0,left:0,width:$('#wrapper_side').offset()
				.left,background:'#444',height:'100%',overflowY:'auto',borderRight:'double 3px #B39433'}
		})
		.appendTo('body')
		;

		$(window).resize(function(){
			$('#moko-outside-left').css({
				'width':
					$('#wrapper_side').offset().left
			})
		})
	}
});

//******************************************************************************
/** 全般：資源バーをメインメニューの上に */
//------------------------------------------------------------------------------
Moko.HoistResourceBar = FeatureInit({////{{{
	name: 'HoistResourceBar',
	config: 'menu_reversal',
	configDefault: true,
	group: 'all',
	caption: 'メニューと資源バーの位置を逆転表示',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		var tmp = $('#status.clearfix').clone();
		$('#status.clearfix').remove();
		$('#gnavi').prepend(tmp);
	}
});////}}}

//******************************************************************************
/** 全般：資源バーの資源数をコンマで区切る */
//------------------------------------------------------------------------------
Moko.CommalizedResource = FeatureInit({////{{{
	//enable: DEV_MODE,
	config: 'commalized_resource_display',
	caption: '資源量を3桁づつコンマで区切る',
    name: 'CommalizedResource',
	group: 'all',
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    ready: function () {
		//return;
		var procs = [];
		[
			[ 'wood'      , 'moko-fake-wood' ],
			[ 'stone'     , 'moko-fake-stone' ],
			[ 'iron'      , 'moko-fake-iron' ],
			[ 'rice'      , 'moko-fake-rice' ],
			[ 'wood_max'  , 'moko-fake-wood-max' ],
			[ 'stone_max' , 'moko-fake-stone-max' ],
			[ 'iron_max'  , 'moko-fake-iron-max' ],
			[ 'rice_max'  , 'moko-fake-rice-max' ],
		].each(function(v){
			var $org = $('#'+v[0]);
			var $fake = $('<span>',{id: v[1]});
			$org.hide().after($fake);
			procs.push(function(){
				$fake.text( $org.text().fetchNum().commalize() );
			});
		});

		var perSecFunc = function(){
			procs.each(function(fn){ fn() });
		};
		perSecFunc();
		$(document).bind('MokoEvent_SecondHand', perSecFunc);
	}
});////}}}

//******************************************************************************
/** 全般：IXA時間を表示 */
//------------------------------------------------------------------------------
Moko.IXATimeDisplay = FeatureInit({////{{{
    name: 'IXATimeDisplay',
	config: 'ixatime-display',
	caption: 'IXA時間を表示。多分海外でもズレない（IXA的に）。',
	group: 'all2',
    condition: function () { return LPath.ingame },
	style: '#moko-ixatime {height: 14px; font-weight: normal; text-align: center; font-size:16px !important;}',
	ready: function(){
		$(this.template).prependTo('#sideboxTop');
		this.$timeArea = $('#moko-ixatime');
		this.changeIXATime();
		$(document).bind('MokoEvent_SecondHand', this.changeIXATime.bind(this) );
	},
    //------------------------------------------------------------------------------
    changeIXATime: function () {
		this.$timeArea.text( $('#server_time').text().replace(/^\d+-?/,'') );
	},
	template: ''+<><![CDATA[
		<div class="sideBox">
			<div id="moko-ixatime" class="sideBoxInner">
			</div>
		</div>
	]]></>,
});////}}}

//******************************************************************************
/** 部隊状況のキャッシュをクリアする */
//------------------------------------------------------------------------------
Moko.UnitStatusCacheClear = FeatureInit({
    name: 'UnitStatusCacheClear',
	priority: PRIO_MORE_ERALY,
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    run: function () {
		if(
			LPath.dungeon
			|| LPath.dungeon02
			|| LPath.deck
			|| LPath.unit_status
			|| LPath.send_troop
			|| LPath.confluence_confirm
			|| LPath.confluence_list
		)
		IXA_clearUnitStatusCache();
	}
});

//******************************************************************************
/** 全般：参加せよ！しない */
//------------------------------------------------------------------------------
Moko.BattleMenuNoBlink = FeatureInit({////{{{
	name: 'BattleMenuNoBlink',
	config: 'disableBattleMenuBlinck',
	group: 'all2',
	caption: '「参加せよ！」を通常の合戦ボタンに',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var img = $('#gnavi img[src$="/gnavi_blink_battle.gif"]');
		if( img.length )
			img.attr('src', img.attr('src').replace(/_blink_battle\.gif$/, '_battle.gif') );
	}
});////}}}

//******************************************************************************
/** 全般：チャット：チャットの座標をリンクに */
//------------------------------------------------------------------------------
Moko.AttachLinkToCoordinate = FeatureInit({////{{{
	name: 'AttachLinkToCoordinate',
	config: 'chat_mapcood',
	group: 'chat',
	caption: 'チャット中の座標っぽいものをリンクに',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var cood = new RegExp(/(-?\d+),\s?(-?\d+)/);
		$('.msg > SPAN').each(function() {
			var $this = $(this);
			var msg = $this.text();
			var tmp = null;
			if (tmp=msg.match(cood)) {
				var tmp2 = '<A style="display:inline;" href="/map.php?x='+tmp[1]+'&y='+tmp[2]+'">'+tmp[0]+'</A>';
				msg = $('<div>').text(msg).html();
				msg = msg.replace(tmp[0], tmp2);
				$this.html(msg);
			}
		});
	}
});////}}}

//******************************************************************************
/** 全般：IXAツールメニュー（資源の右隣） */
//------------------------------------------------------------------------------
Moko.ToolMenu = FeatureInit({////{{{
	name: 'ToolMenu',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var tmpl = '<SPAN class="normal"><A href="%(href)s">%(label)s</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN>';
		var $statusLeft = $('#status_left').css({width:'900px'});
		var menuItems = $();
		[
			{href: '/facility/unit_status.php?dmo=all'        , label: '全部隊', id: 'ixamoko_toolbar_allunit'},
			{href: '/facility/set_unit_list.php?show_num=100' , label: '簡易', id: 'ixamoko_toolbar_organize'},
			{href: '/facility/unit_list.php'                  , label: '待機兵', id: 'ixamoko_toolbar_standby'},
			{href: '/senkuji/senkuji.php'                     , label: 'くじ'  , id: 'ixamoko_toolbar_lottery'},
			{href: '/card/trade.php?t=name&k=&s=no&o=a'       , label: '取引'  , id: 'ixamoko_toolbar_exchange'},
			{href: '/union/index.php'                         , label: '合成'  , id: 'ixamoko_toolbar_synthesis'},
			{href: '/war/fight_history.php?type=1&find_name=五七の桐&find_x=&find_y=&find_length=&btn_search=true'               , label: '敵襲'  , id: 'ixamoko_toolbar_enemy'},
			{href: '/war/list.php?m=&s=1&name=alliance&word=五七の桐&coord=map&x=&y='               , label: '報告書'  , id: 'ixamoko_toolbar_report'},
		].forEach(function(v, idx){
			var menuItem = $( sprintf( tmpl, v ) );
			if( v.id ){ $('a', menuItem ).attr('id', v.id); }
			$statusLeft.append( menuItem );
		});

		$('<a class="fade" id="moko-config-btn" href="#"><span>Moko設定</span></a>')
		.appendTo(Moko.Layouter)
		.click(function(){
			Moko.ConfigDialog.openDialog();
			return false;
		})
		;

		// ダイアログを開く
		$('#ixamoko_setting', $statusLeft).click(function(e) {
			Moko.ConfigDialog.openDialog();
			return false;
		});
	}
});////}}}

//******************************************************************************
/** 全般：資源の蓄積状況をグラフィカルに */
//------------------------------------------------------------------------------
Moko.ResourceGageIndication = FeatureInit({////{{{
    name: 'ResourceGageIndication',
	config: 'resouce_gage_indication',
	caption: '資源の蓄積状況をグラフィカルに',
	group: 'all',
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    run: function () {
		var baseX = $('#ixamoko_layouter').offset().left;
		var gageHeight = 2, gageColor = '#4A4', gageBG = '#811',
			gageTop = $('#status').position().top + 22 ;
		var defaultStyle = {
			height    :gageHeight,
			position  :'absolute',
			background: gageBG,
			top       : gageTop,
		};

		var isFake;
		if($('#moko-fake-wood').size()){
			isFake = true;
		}

		var idBaseTags = ['wood','stone','iron','rice'];
		if(isFake)
			idBaseTags = ['moko-fake-wood','moko-fake-stone','moko-fake-iron','moko-fake-rice'];

		idBaseTags.each(function(idBase){
			var rscId, maxId ;
			rscId = '#'+idBase;
			maxId = rscId + (isFake ? '-max' : '_max') ;
			var $rsc = $(rscId), $max = $(maxId);
			//GM_log(rscId, maxId);

			var baseWidth = $max.offset().left - $rsc.offset().left + $max.width()
			//GM_log(baseWidth);
			var rscX = $rsc.offset().left - baseX;
			var rscRate = $rsc.text().fetchNum() / $max.text().fetchNum();
			var rscWidth = baseWidth * rscRate;
			var rscPercent = ( rscRate * 100 ).floor() + '%';

			$('<div>')
				.css($O.merge({}, defaultStyle,{width:baseWidth,left:rscX}))
				.attr('title', rscPercent)
				.appendTo($('#ixamoko_layouter'))
			;//$end

			$('<div>')
				.css($O.merge({}, defaultStyle,{width:rscWidth,background:'#4A4',left:rscX}))
				.attr('title', rscPercent)
				.appendTo($('#ixamoko_layouter'))
			;//$end

		});

	}
});////}}}

//******************************************************************************
/** 全般：資源総計ツールチップ */
//------------------------------------------------------------------------------
Moko.ResourceTooltipDisplay = FeatureInit({
    name: 'ResourceTooltipDisplay',
    condition: function () { return LPath.ingame },
	style: sprintf( ''+<><![CDATA[
		#moko-tooltip-html {
			position: absolute;
			background: #ffe;
			border: solid 1px #665;
			border-radius: 4px;
			color: #443;
			z-index: %(ZIDX_CMENU)s;
			max-width: 300px;
			padding: 8px;
		}
	]]></>, {ZIDX_CMENU: ZIDX_CMENU} ),
    //------------------------------------------------------------------------------
    run: function () {
		var timer;
		var $tooltip = $('<div id="moko-tooltip-html">')

		$('.sideBoxHead H3:has(img[alt="生産"])')
		.mouseenter(function(e){
			var $e = $(this);

			String.prototype.fetchNumAll = function(){
				return (this.match(/-?\d+(?:,\d+)*(?:\.\d+)?/g)||[])
				.map(function(v){return parseFloat(v.replace(/,/g,''))})
			};
			var totals = $('.sideBoxInner .side_make li').map(function(){
				var total = $(this).text().fetchNumAll().sum();
				$(this).attr('title', total);
				return total;
			}).toArray();

			var tmplVars = {perHour:{}, perDay:{}};
			totals.each(function(v, idx){
				var rscKey = RESOURCE_ORDER[idx];
				tmplVars.perHour[ rscKey ] = totals[idx].commalize()
				tmplVars.perDay [ rscKey ] = (totals[idx] * 24).commalize()
			});
			tmplVars.perHour.all = $O.values(tmplVars.perHour).fetchNums().sum().commalize();
			tmplVars.perDay.all  = $O.values(tmplVars.perDay).fetchNums().sum().commalize();

			var $report = $.tmpl(''+<><![CDATA[
				<table class="tablesorter no_mb">
				<thead>
					<tr> <th></th> <th>1時間あたり</th> <th>1日あたり</th></tr>
				</thead>
				<tbody>
					<tr> <th>木</th>  <td>${v.perHour.wood}  </td><td>${v.perDay.wood}  </td> </tr>
					<tr> <th>綿</th>  <td>${v.perHour.cotton}</td><td>${v.perDay.cotton}</td> </tr>
					<tr> <th>鉄</th>  <td>${v.perHour.iron}  </td><td>${v.perDay.iron}  </td> </tr>
					<tr> <th>糧</th>  <td>${v.perHour.food}  </td><td>${v.perDay.food}  </td> </tr>
					<tr> <th>総計</th><td>${v.perHour.all}   </td><td>${v.perDay.all}   </td> </tr>
				</tbody>
				</table>
			]]></>, {v: tmplVars});

			$tooltip.empty().append( $report )
				.appendTo('body')
				.show()
				.css({
					top: e.pageY - 20 - $tooltip.height(),
					left: e.pageX -20 - $tooltip.width(),
				})
				.hide()
				.delay(400)
				.fadeIn(200)
			;//$end

			return false;
		})
		.mouseleave(function(){
			$tooltip.fadeOut(200)
		});
	}
});

//******************************************************************************
/** 全般：タイムアウト逆算タイマー */
//------------------------------------------------------------------------------
Moko.TimeOutCountdown = FeatureInit({////{{{
	name: 'TimeOutCountdown',
	config: 'timeout_countdown',
	group: 'all',
	caption: 'タイムアウト予想時間カウントダウン',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		if (localStorage.getItem(OPTION_PREFIX+'starttime')!==null) {
			var totime = (parseInt(localStorage.getItem(OPTION_PREFIX+'starttime'))+3*60*60);
			var sec = totime-getUnixTime();
			if (sec<0) sec = 0;
			var timeText = formatTime(sec);
			var dayText = caddDate2(new Date(), timeText);
			var str = '<p>タイムアウトまで<br>残り <SPAN todo="d30m" totime="'
						+totime+'" class="ixamoko_countdown">'+timeText+'</SPAN></p>';
			var $scroll = $('<div class="information_situ" id="ixamoko_sessout">'+str+'</div>');
			$scroll.css({
				boxSizing: 'border-box', '-moz-box-sizing': 'border-box', '-webkit-box-sizing': 'border-box',
				marginLeft: 6, padding: '8px 8px 8px 18px',
				width: 124, height: 35,
				backgroundImage: 'url(/img/common/sidebar/bg_information.gif)',
				display:'none'
			})
			$('#mokotool').after($scroll);
			$('#ixamoko_sessout p').css({fontWeight:'bold', padding:0, margin: 0, fontSize: 10});
			$('#ixamoko_sessout').click(function(e) {
				if(confirm('ログアウトしますか？')){
					location.href='/logout.php';
					$(this).hide();
				}
			});
		}
		var countdownTimer = null;
		var countDown = function(nowdate) {
			if (countdownTimer!==null) clearTimeout(countdownTimer);
			$('.ixamoko_countdown').each(function() {
				var $this = $(this);
				var totime = parseInt($this.attr('totime'));
				var todo = $this.attr('todo');
				var sec = totime - getUnixTime();
				if (sec<0) sec = 0;
				var timeText = formatTime(sec);
				$this.html(timeText);
				if (sec<60*10/*分*/) {
					$('#ixamoko_sessout').css('background-image','url('+IMAGES.bg_information_timer+')');
				} else {
					$('#ixamoko_sessout').css('background-image','url("/img/common/sidebar/bg_information.gif")');
				}
				if (todo=='d30m' && sec < 60 * 30/*分*/) {
					$('#ixamoko_sessout').show();
				}
			});
			countdownTimer = setTimeout(function() {countDown(new Date());}, 1000-new Date().getMilliseconds());
		}
		countDown(new Date());
	}
});////}}}

//******************************************************************************
/** 全般：敵襲コメントリスト */
//------------------------------------------------------------------------------
Moko.RaidMessageList = FeatureInit({////{{{
	name: 'RaidMessageList',
	config: 'commentListEnemy',
	group: 'chat',
	caption: 'チャットウィンドウに敵襲状況を表示',
	condition: function () { return LPath.ingame },
	ready: function () { this.readyRaidMessageList() },
	//------------------------------------------------------------------------------
	readyRaidMessageList: function () {
		var self = this;
		// Reruit、Chat 以外だとRecruitになってしまうのでオリジナルのタブ変更関数を殺す
		unsafeWindow.tabChangeList = function(){;};

		// 敵襲ボタン作成
		var raidButton = $('<li id="comBtnEnemy"><a href="#" id="Enemy">敵襲</a></li>');

		// ボタンを追加し、IDを書き換える
		$('li#comBtnChat').after(raidButton);
		$('li#comBtnRecruit').find('a').attr('id','Recruit');
		$('li#comBtnChat').find('a').attr('id','Chat');

		// クリックイベントを乗っ取る
		$('#Recruit').click(function(){self.tabChangeListKaizou('Recruit');});
		$('#Chat'   ).click(function(){self.tabChangeListKaizou('Chat');});
		$('#Enemy'  ).click(function(){self.tabChangeListKaizou('Enemy');});

		var raidMessageList = ''+<><![CDATA[
			<div id="commentListEnemy" style="display: none; ">
				<div id="enemyComment">
					<table style="float:left;width:400px;"><tbody id="enemyLine">
						<tr><td>&nbsp;&nbsp;現在、該当する状態の部隊はいません</td></tr>
					</tbody></table>
				</div>
				<ul style="float: right;width: 53px;padding: 7px 6px 0 0;">
					<li style="padding-bottom: 4px;">
						<a href="#" id="enemyReload"><img src="/img/common/news/btn_comment_reload.gif" alt="敵襲欄を更新" title="敵襲欄を更新" class="fade" style="opacity: 1;"/></a>
					</li>
				</ul>
			</div>
		]]></>;
		$('#commentListChat').after(raidMessageList);
		$('#enemyReload').click(function(){self.updateRaidMessageList();});

		// 現在の状態に合わせ、選択を切り替える
		this.initCommentListSelection();

		var $raid = $('IMG.fade[alt="敵襲"]');
		if ($raid.get().length > 0) {
			self.updateRaidMessageList();
		}

		// 強制テスト
		//self.DEV_updateRaidMessageList();
	},

	// localStorage に保存された状態をもとにコメントリストの選択を切り替え
	initCommentListSelection: function (){
		var self = this;
		var target = localStorage.getItem("header_info_type");
		if(target!=undefined){
			self.tabChangeListKaizou(target);
		}
	},

	// 「出陣状況一覧／敵襲」を確認し、敵襲メッセージリストを更新する
	updateRaidMessageList: function () {
		var self = this;
		$.get('/facility/unit_status.php?dmo=enemy')
		.done(self.fetchRaidedInfo)
		;
	},

	DEV_updateRaidMessageList: function(){
		GM_log('強制敵襲');
		var self = this;
		Moko_get('http://cdn.local/mokotest/unit_status.raid.htm')
		.done(self.fetchRaidedInfo)
		;
	},

	fetchRaidedInfo: function(html){
		$('#enemyLine').children().remove();
		var t = $(html).find('.ig_decksection_innermid').text();
		t=t.replace(/\s/g,'');

		if(t=='現在、該当する状態の部隊はいません'){
			var tmp='<tr><td>&nbsp;&nbsp;現在、該当する状態の部隊はいません</td></tr>';
			$('#enemyLine').append(tmp);
		}

		else {
			var cnt = 1;
			var new_enemy_list=new Array;
			var raidedInfos = [];

			$(html).find('.ig_decksection_innermid .ig_fight_statusarea').each(function(){
				var $html = $(this);
				var enemy_time = $(this).find('.paneltable.table_fightlist').find('td:eq(1)').text();

				// 2011-09-27 12:33:05　（あと00:03:50)
				// ^^^^^^^^^^^^^^^^^^^ ここ抜き出す
				enemy_time = (enemy_time.match(/\d+-\d+-\d+ \d+:\d+:\d+/)||['0000-00-00 00:00:00'])[0];
				/*ここから長距離砲対策*/
				//着弾時間の抽出
				impact_time_h = enemy_time.match(/\d+:\d+:\d+/)[0].substring(0,2);
				impact_time_m = enemy_time.match(/\d+:\d+:\d+/)[0].substring(3,5);
				impact_time_s = enemy_time.match(/\d+:\d+:\d+/)[0].substring(6,8);
				//文字を整数に変換(0x等になった時の為)
				impact_time_h = parseInt(impact_time_h);
				impact_time_m = parseInt(impact_time_m);
				impact_time_s = parseInt(impact_time_s);
				//0時以降の場合24時25時とする
				if ( impact_time_h == 0){
					impact_time_h = 24;
				} else if( impact_time_h == 1){
					impact_time_h = 25;
				}
				//時間を秒数に変換
				impact_time_total = impact_time_h*3600+impact_time_m*60+impact_time_s;

				now_time = $('#server_time').text();
				now_time_h = now_time.match(/\d+:\d+:\d+/)[0].substring(0,2);
				now_time_m = now_time.match(/\d+:\d+:\d+/)[0].substring(3,5);
				now_time_s = now_time.match(/\d+:\d+:\d+/)[0].substring(6,8);
				now_time_h = parseInt(now_time_h);
				now_time_m = parseInt(now_time_m);
				now_time_s = parseInt(now_time_s);
				if ( now_time_h == 0){
					now_time_h = 24;
				} else if( now_time_h == 1){
					now_time_h = 25;
				}
				now_time_total  = now_time_h*3600+now_time_m*60+now_time_s;
				//着弾までの秒数
				impact = impact_time_total - now_time_total;

				//着弾時間設定（秒数記述：指定時間以上の敵襲があった際にはループから抜けて設定時間内の物だけを表示するように）
				if( impact >= 1800) return false;
				/*長距離砲対策ここまで*/

				raidedInfos.push({
					enemy_time       : enemy_time,
					enemy_nm         : $html.find('a:eq(0)').text(),
					enemy_href       : $html.find('a:eq(0)').attr('href'),
					enemy_start      : $html.find('.td_bggray:eq(0)').text(),
					enemy_start_href : $html.find('a:eq(1)').attr('href'),
					player_start     : $html.find('.td_bggray:eq(1)').text(),
					player_start_href: $html.find('a:eq(2)').attr('href'),
				});

				// 5つ目なら抜ける
				if( ++cnt >= 5 ) return false;
			});

			if( raidedInfos.length ){
				var tmpl = ''+<><![CDATA[
					<tr><td>&nbsp;${enemy_time}</td>
						<td><a href="${enemy_href}" style="color:#C00;width:100%;">${enemy_nm}</a></td>
						<td>の</td>
						<td><a href="${enemy_start_href}" style="color:#C00;width:100%;">【${enemy_start}】</a></td>
						<td>から</td>
						<td><a href="${player_start_href}" style="color:#C00;width:100%;">${player_start}</a></td>
					</tr>
				]]></>;
				$.tmpl(tmpl, raidedInfos).appendTo('#enemyLine');
			}

		}
	},

	tabChangeListKaizou: function (b){
		$("div[id^=commentList]").css("display","none");
		$("#commentNavi li a").css("display","block");
		$("#commentList"+b).css("display","block");
		$("#commentNavi #comBtn"+b+" a").css("display","none");
		if("Chat"==b){
			localStorage.setItem("header_info_type","Chat");
		}else if("Enemy"==b){
			localStorage.setItem("header_info_type","Enemy");
		}else{
			localStorage.setItem("header_info_type","Recruit");
		}
	}
});////}}}

//******************************************************************************
/** 全般：敵襲時、マーキーでウィンドウ最上段で敵襲を知らせる */
//------------------------------------------------------------------------------
Moko.RaidUppermostNotification = FeatureInit({////{{{
	name: 'RaidUppermostNotification',
	config: 'raid',
	group: 'all',
	caption: '敵襲の最上段表示',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var $raid = $('IMG.fade[alt="敵襲"]');
		if ($raid.get().length>0) {
			// 敵襲あり
			var href = $raid.parent().attr('href');
			$('<DIV id="ixamoko_raid"><MARQUEE scrolldelay="100"><A href="'+href+'">敵襲あり</A></MARQUEE></DIV>')
			.click(function(e) { $(this).hide(); })
			.css({top:0, right: 0, width:18, height: '100%'})
			.appendTo('body');
		}
	}
});////}}}

//******************************************************************************
/** 全般：「敵襲」通知 */
//------------------------------------------------------------------------------
Moko.RaidNotification = FeatureInit({////{{{
	//enable: DEV_MODE,
	name: 'RaidNotification',
	config: 'raid_notification',
	group: 'all',
	caption: '敵襲時、デスクトップの端に通知を表示（Scriptishのみ）【テスト】',
	configSettings: {
		raid_notification: { default_value: false }
	},
	condition: function () { return LPath.ingame && GM_notification },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var $raid = $('IMG.fade[alt="敵襲"]');
		if ($raid.get().length>0) {
			GM_notification('敵襲！')
		}
	}
})////}}}

//******************************************************************************
/** 全般：資源バーの背景を赤っぽくし、ツールメニューに「敵襲」メニューを加える */
//------------------------------------------------------------------------------
Moko.RaidTimeMenu = FeatureInit({////{{{
	name: 'RaidTimeMenu',
	config: 'inside_attack_view',
	group: 'all',
	caption: '敵襲を枠内に表示',
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function () {
		var $raid = $('IMG.fade[alt="敵襲"]');
		if ($raid.get().length>0) {
			// 敵襲あり
			var href = $raid.parent().attr('href');
			$('div#status.clearfix').css('background','url('+IMAGES.bg_status_red+')');
			$('span.sep').last().after('<span class="normal"><a href="'+href+'">敵襲</a></span>');
		}
	}
})////}}}

//******************************************************************************
/** 全般：サイドボックス入れ替え
/* IXA, 金、カード、状態、生産、拠点選択、報告 → IXA, 状態、報告、拠点、生産、金、カード */
//------------------------------------------------------------------------------
Moko.AlterSideBoxOrder = FeatureInit({////{{{
	name: 'AlterSideBoxOrder',
	config: 'sidebox_change',
	group: 'all',
	caption: '合戦向けサイドメニュー表示',
	options: {useToHankaku: 'tohankaku'},
	condition: function () { return LPath.ingame },
	ready: function () { this.run() },
	//------------------------------------------------------------------------------
	run: function (){
		var $sideboxTop, $sideboxBottom, $_boxes;
		var $ixatool, $gold, $card, $state, $production, $footholds, $report;

		$sideboxTop = $('#sideboxTop');
		$sideboxBottom = $('#sideboxBottom');

		$gold  = $sideboxTop.find('>.sideBox:has(img[alt="金を購入"])');
		$card  = $sideboxTop.find('>.sideBox:has(img[alt="カード"])');
		$production = $sideboxTop.find('.sideBox:has(img[alt="生産"])');
		$footholds  = $sideboxTop.find('.sideBox:has(img[alt="表示拠点選択"])');
		$report     = $sideboxTop.find('.sideBox:has(img[alt="報告"])');
		$report.removeClass('last');
		// FIXME insertBefore すると死ぬ
		//$report.insertBefore( $production );
		// 拠点を報告の後に
		$footholds.insertAfter( $report );
		// 生産を拠点の後に
		$production.insertAfter( $footholds );

		$sideboxBottom.append($gold).append($card);
		$sideboxBottom.find('.sideBox:last-child').addClass('last')

		$('TABLE.situationWorldTable').remove();
		if (this.useToHankaku) {
			$('INPUT[type="text"]').change(function(e) {
				var $this = $(this);
				$this.val(Moko.toHankaku($this.val()));
			});
		}
	}
});////}}}

//******************************************************************************
/** 全般：サイドメニューの「カード」ボックスを非表示 */
//------------------------------------------------------------------------------
Moko.HiddenCardview = FeatureInit({////{{{
	name: 'HiddenCardview',
	config: 'non_cardview',
	group: 'all2',
	caption: 'サイドメニューのカードを非表示',
	run: function (){
		$('#sideboxTop').find('.sideBox:has(img[alt="カード"])').remove();
		$('#sideboxBottom .sideBox:last-child').addClass('last');
		//$('#sideboxTop > .sideBox:last-child').addClass('last');
	}
});////}}}

//******************************************************************************
/** 全般：サイドボックスの拠点リストから拠点名称変更 */
//------------------------------------------------------------------------------
Moko.FootholdRenameInterfaceInSidebox = FeatureInit({////{{{
    name: 'FootholdRenameInterfaceInSidebox',
	config: 'foothold_rename_nterface_in_sidebox',
	caption: 'サイドボックスの拠点リストから拠点名称変更',
	detail: '拠点リスト右端の［R］をクリックでプロンプト表示',
	options: {
		useSortedFootholdsList: 'sort_village',
	},
	configSettings: {
		foothold_rename_nterface_in_sidebox: { default_value: false }
	},
	group: 'all2',
	priority: PRIO_ERALY,
    condition: function () { return LPath.ingame },
	style: ''+<><![CDATA[
		.moko-sidebox-renamer {
			display: inline-box;
			float:right;
			background:#444;
			color:black;
			cursor:pointer;
			-moz-user-select:none;
			font-size:10px;
			padding:1px;
			border-radius:1px;
			-moz-box-sizing: border-box;
			height: 12px; width: 10px;
		}
		.moko-sidebox-renamer:hover {background: #777}
	]]></>,
	ready: function(){

		var self = this;

		$('.moko-sidebox-renamer')
		.live('click', function(){
			IXA_renameFootholdPrompt('name', $(this).parent().contents().last().text().trim() );
		});

		if( this.useSortedFootholdsList ){
			$(document).bind(
				'MokoEvent_FootholdListSorted',
				function(){ self.run(); }
			);
		}
		else{
			this.run();
		}
	},
    //------------------------------------------------------------------------------
    run: function () {
		$('.sideBoxInner.basename>ul>li')
		.prepend($('<div class="moko-sidebox-renamer">').text('R'))
		;
	}
});////}}}

//******************************************************************************
/** 全般：拠点リストを並べ替える（軽量版） */
//------------------------------------------------------------------------------
Moko.SortedFootholdsListLight = FeatureInit({
	enable: false,
    name: 'SortedFootholdsListLight',
	options: {
		isAscending: 'ad_sort',
		useFilteringHold: 'place_skip',
		filteringHoldStr: 'place_skip_str',
		useReverseOwnOther: 'foothold_sort_reverse_own_other',
	},
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;

		var descent = !self.isAscending;

		var $footholdBox = $('.sideBox:has(>.sideBoxHead>h3>img[alt="表示拠点選択"])');
		var $ownList = $footholdBox.find('.sideBoxHead:has(>h4:contains("自国"))+.sideBoxInner.basename ul');
		var $otherList = $footholdBox.find('.sideBoxHead:has(>h4:contains("他国"))+.sideBoxInner.basename ul');

		var $list = $ownList;

		var homeHold = $ownList.children().get(0);
		var lastVillageIdx = 6;
		self.sortVillageList( $ownList, lastVillageIdx, descent );
		$(homeHold).prependTo( $ownList );
		$ownList.children('li').last().addClass('last');

		if( $otherList.size() ){
			var otherHold = $ownList.children().last();
			self.sortVillageList( $otherList, 0 );
			$(otherHold).prependTo( $otherList );
			$otherList.children('li').last().addClass('last');
		}
	},

	sortVillageList: function($list, lastVillageIdx, descent){
		var lower  = !descent ? -1 :  1,
			higher = !descent ?  1 : -1 ;

		$list.children('li')
		.removeClass('last')
		.toArray()
		.map(function(ele, idx){
			return [ ele, $(ele).text(), idx > lastVillageIdx ];
		})
		.sort(function(a, b){
			return (
				a[2] && !b[2] ? -1
				: !a[2] && b[2] ? 1
				: a[1] < b[1] ? lower
				: a[1] > b[1] ? higher
				: 0
			);
		})
		.each(function(ele){
			$(ele[0]).appendTo($list)
		});
		;
	}
});

//******************************************************************************
/** 国情報のキャッシュ処理 */
//------------------------------------------------------------------------------
Moko.ManagingNationInfoCache = FeatureInit({
    name: 'ManagingNationInfoCache',
	priority: PRIO_MORE_ERALY,
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    run: function () {

		// サイドバーの拠点リストに変更があるようならキャッシュをクリア

		// 現在の状態
		var listCache = $('.sideBoxInner.basename li')
		.map(function(){return $(this).text().trim()})
		.toArray()
		.join('\n');

		// 過去の状態
		var oldListCache = mokoStorage.getItem('NationInfo').listCache;
		//GM_log(listCache, oldListCache);

		if( oldListCache != listCache ){
			var nationInfoStore = mokoStorage.getItem('NationInfo');
			nationInfoStore.cache = undefined;
			nationInfoStore.listCache = listCache;
			// 拠点が変わると部隊状況が変わる可能性があるので部隊状況のキャッシュもクリア
			IXA_clearUnitStatusCache();
			mokoStorage.flush();
		}

	}
});

//******************************************************************************
/** 全般：拠点リストを並べ替える */
//------------------------------------------------------------------------------
Moko.SortedFootholdsList = FeatureInit({////{{{
	group: 'all2',
	name: 'SortedFootholdsList',
	config: 'sort_village',
	caption: 'サイドメニューの拠点ソート',
	priority: PRIO_ERALY,
	options: {
		isAscending: 'ad_sort',
		useFilteringHold: 'place_skip',
		filteringHoldStr: 'place_skip_str',
		useReverseOwnOther: 'foothold_sort_reverse_own_other',
		useNationInfoCache: 'nation_info_cache',
	},
	configSettings: {
		ad_sort       : { caption: '昇順降順', type: 'selectBox', optionMap: {1: '昇順', 0: '降順'}, default_value: 1 },
		place_skip    : { caption: '該当文字列を含む所領を非表示にする' },
		place_skip_str: { caption: 'スキップ文字列', type: 'textInput', default_value: "" },
		foothold_sort_reverse_own_other: {
			caption: '自国と他国を入れ替える',
			default_value: false,
		},
		nation_info_cache: { caption: '拠点ソートをキャッシュする【テスト中】',
			detail: '城主プロフィールを開く、表示拠点選択の項目が変更される、とキャッシュクリア',
			default_value: false,
		},
	},
	condition: function () { return LPath.ingame },
	ready: function(){

		this.run();

	},
	//------------------------------------------------------------------------------
	run: function () {

		var self = this;
		var pathname = location.pathname;
		var search   = location.search;
		var currPagePath = pathname;
		var curSelected = $('#lordSiteArea').text().replace("選択中の拠点:","");
		if(search!=''){ currPagePath += encodeURIComponent(search);}
		// 2つ目のリストがある場合は出城あり
		var dejiro = $('.sideBoxHead > h4:eq(1)').text();

		var procVillageListSort = function ( own, other ){
			// 現在の拠点処理
			own.concat(other).each(function(v, i){
				if( v.name == curSelected ){
					v.current = true;
					var kyoten = '<input type="hidden" id="ixamoko-kyoten-url" value="'+v.mapURL+'">';
					$('#lordSiteArea').append(kyoten);
					return false;
				}
			});

			// 並べ替え
			new function(){
				var flag_true = -1, flag_false = 1;
				if(self.isAscending == '1'){
					flag_true = 1; flag_false = -1;
				}
				var key = 'name';
				var sort_hdl = function (m1, m2) {
					if( /^(?:本領|出城)$/.test(m1.kind) ) return -1;
					if( /^(?:本領|出城)$/.test(m2.kind) ) return 1;
					if( m1.kind == '開拓地' && m2.kind == '所領' ) return 1;
					if( m1.kind == '所領' && m2.kind == '開拓地' ) return -1;
					if( m1.kind == '陣' && m2.kind != '陣' ) return 1;
					if( m2.kind == '陣' && m1.kind != '陣' ) return -1;
					return m1[key] == m2[key]
							? 0 : ( m1[key] > m2[key] ? flag_true : flag_false );
				};
				own.sort(sort_hdl);
				other.sort(sort_hdl);
			};

			// 指定文字列フィルタリング
			if( self.useFilteringHold && self.filteringHoldStr !='' ) {new function(){
				var skipStr = self.filteringHoldStr;
				if( typeOf(skipStr) !== 'string' ) return;
				skipStr = skipStr.trim();
				if( !skipStr.length ) return;
				other = other.filter(function(v, i){
					if( v.name == curSelected ) return true;
					return v.name.indexOf(skipStr) >= 0 ? false : true ;
				})
			}}
			// 拠点選択に領地はないので削除
			own = own.filter(function(v, i){ return v.kind != '領地' })
			other = other.filter(function(v, i){ return v.kind != '領地' })

			var listOwn, listOther;
			listOwn = $.tmpl(self.tmpl_villageList, { holds: own, currPagePath: currPagePath } );
			if( $O.getLength(other) ){
				listOther = $.tmpl(self.tmpl_villageList, { holds: other, currPagePath: currPagePath } );
			}

			if( !$O.getLength(other) ) {
				if( Object.getLength( other ) ) $('.sideBoxInner.basename:eq(0)').after(listOther);
				$('.sideBoxInner.basename:eq(0)').replaceWith(listOwn);
			}
			else {
				$('.sideBoxInner.basename:eq(0)').replaceWith(listOwn);
				$('.sideBoxInner.basename:eq(1)').replaceWith(listOther);
				// 自国と他国を入れ替える
				if(self.useReverseOwnOther ){
					$('.sideBoxHead:has(>h4:contains("自国")), .sideBoxHead:has(>h4:contains("自国"))+.sideBoxInner')
					.appendTo('.sideBox:has(>.sideBoxHead:first-child>h3>img[alt="表示拠点選択"])')
				}
			}

			$(document).trigger('MokoEvent_FootholdListSorted');
		};

		// 城主情報を取得
		IXA_getNationInfo( self.useNationInfoCache )
		.done(function( nationInfo ){
			var own   = $O.values(nationInfo).filter(function(v){ return v.own });
			var other = $O.values(nationInfo).filter(function(v){ return v.other });
			procVillageListSort( own, other );
		});
	},
	
	tmpl_villageList : ''+<><![CDATA[
	<div class="sideBoxInner basename"><ul>
		{{each holds}}
		{{if $value.current}}
		<li class="on"><span title="${$value.name} (${$value.coord})">${$value.name}</span></li>
		{{else}}
		<li><a href="${$value.url}&from=menu&page=${currPagePath}" title="${$value.name} (${$value.coord})">${$value.name}</a></li>
		{{/if}}
		{{/each}}
	</ul></div>
	]]></>,
});////}}}

//******************************************************************************
/** 全般：コメントリストの文字のずれを直す */
//------------------------------------------------------------------------------
Moko.ModifyChatListGap = FeatureInit({////{{{
	name: 'ModifyChatListGap',
	config:'chat_mikire',
	group: 'chat',
	caption: 'チャットの見切れを修正',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		$('TD[class="al"]').css({width: '105px', height: '14px'}).find('> A').css({width: '105px', overflow: 'hidden'});
		$('TD[class="msg"] > SPAN').css('width', '230px');

		$('UL[class="commentbtn"] > LI[class="right"] > A, UL[class="commentclose"] > LI:eq(0) > A').click(function(e) {
			setTimeout(function(){
				$('TD[class="al"]').css({width: '105px', height: '14px'}).find('> A').css({width: '105px', overflow: 'hidden'});
				$('TD[class="msg"] > SPAN').css('width', '230px');
			}, 500);
		});
	}
});////}}}

//******************************************************************************
/** 全般：プルダウンメニュー作成 */
//------------------------------------------------------------------------------
//function initPullDownMenu()
Moko.PullDownMenu = FeatureInit({////{{{
	name: 'PullDownMenu',
	config: 'pulldown_menu',
	group: 'all',
	caption: 'メニューのプルダウン化',
	options: {
		torideCount: 'toride_count',
		new_war: 'new_war',
	},
	configSettings: {
		pulldown_menu: { default_value: false, },
		toride_count: { caption: '砦表示', type: 'selectBox', optionList: [10, 20, 30], default_value: 10 },
		new_war: { caption: '新合戦仕様', type: 'selectBox', optionList: ["on","off"], default_value: "off" },

	},
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		var br3 = this.br3;
		var menu = new Array();
		/*内政*/
		if( this.new_war =="off") {
		menu = [["/map.php?x=7&y=18&c=11", "盟主を中心に"],
		];
		}
		if( this.new_war =="on") {
				menu = [
					["/map.php?x=-97&y=145", "西軍内城1"],
					["/map.php?x=-145&y=1", "西軍内城2"],
					["/map.php?x=-145&y=-119", "西軍内城3"],
					["/map.php?x=-121&y=97", "西軍1砦1"],
					["/map.php?x=-97&y=97", "西軍1砦2"],
					["/map.php?x=-73&y=97", "西軍1砦3"],
					["/map.php?x=-49&y=145", "西軍1砦4"],
					["/map.php?x=-49&y=121", "西軍1砦5"],
					["/map.php?x=-145&y=49", "西軍2砦1"],
					["/map.php?x=-121&y=49", "西軍2砦2"],
					["/map.php?x=-97&y=25", "西軍2砦3"],
					["/map.php?x=-97&y=1", "西軍2砦4"],
					["/map.php?x=-97&y=-23", "西軍2砦5"],
					["/map.php?x=-145&y=-47", "西軍3砦1"],
					["/map.php?x=-121&y=-71", "西軍3砦2"],
					["/map.php?x=-97&y=-95", "西軍3砦3"],
					["/map.php?x=-73&y=-119", "西軍3砦4"],
					["/map.php?x=-97&y=-143", "西軍3砦5"]
				];
		}
		br3.makeMenu(menu,"gnavi01");
		$(".gnavi01 > A").mouseover(function() {br3.openMenu("gnavi01");});
		$(".gnavi01 > A").mouseout(function(){br3.closetime();});

		/*デッキ*/
		if( this.new_war =="off") {
			menu = [
				["/card/deck.php"                           , "部隊編成"]       , 
				["/facility/unit_status.php?dmo=all"        , "出陣状況"]       , 
				["/facility/set_unit_list.php?show_num=100" , "簡易兵士編成"]   , 
				["/facility/unit_list.php"                  , "待機兵士一覧"]   , 
				["/card/deck_card_delete.php"               , "カード一括破棄"] , 
				["/union/union_history.php"                 , "合成履歴"]
			];
		}
		if( this.new_war =="on") {
			menu = [
				["/map.php?x=119&y=121", "東軍内城1"],
				["/map.php?x=167&y=49", "東軍内城2"],
				["/map.php?x=119&y=-95", "東軍内城3"],
				["/map.php?x=71&y=121", "東軍1砦1"],
				["/map.php?x=71&y=97", "東軍1砦2"],
				["/map.php?x=95&y=145", "東軍1砦3"],
				["/map.php?x=95&y=73", "東軍1砦4"],
				["/map.php?x=119&y=169", "東軍1砦5"],
				["/map.php?x=119&y=49", "東軍2砦1"],
				["/map.php?x=143&y=73", "東軍2砦2"],
				["/map.php?x=143&y=25", "東軍2砦3"],
				["/map.php?x=167&y=97", "東軍2砦4"],
				["/map.php?x=167&y=25", "東軍2砦5"],
				["/map.php?x=71&y=-71", "東軍3砦1"],
				["/map.php?x=71&y=-119", "東軍3砦2"],
				["/map.php?x=95&y=-143", "東軍3砦3"],
				["/map.php?x=119&y=-47", "東軍3砦4"],
				["/map.php?x=119&y=-143", "東軍3砦5"],
			];
		}
		br3.makeMenu(menu,"gnavi02");
		$(".gnavi02 > A").mouseover(function() {
			br3.openMenu("gnavi02");
		});
		$(".gnavi02 > A").mouseout(function(){
			br3.closetime();
		});

		/*地図*/
		menu = [[12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100]];
		if( this.torideCount ==20) {
			menu = [
				[12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100],
				[36,84],[60,60],[84,36],[100,12],[12,124],[36,108],[60,84],[84,60],[108,36],[124,12]
			];
		}
		if( this.torideCount ==30) {
			menu = [
				[12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100],
				[36,84],[60,60],[84,36],[100,12],[12,124],[36,108],[60,84],[84,60],[108,36],[124,12],
				[12,148],[36,132],[60,108],[84,84],[108,60],[132,36],[148,12],[36,156],[60,132],[84,108]
			];
		}
		br3.makeMapMenu(menu,"gnavi03");
		$(".gnavi03 > A").mouseover(function() {br3.openMenu("gnavi03");});
		$(".gnavi03 > A").mouseout(function(){br3.closetime();});

		/*合戦*/
		menu = [
			["/country/all.php","全国地図"],["/war/war_situation.php","合戦状況"],["/war/war_ranking.php","合戦格付表"],
			["/war/fight_history.php","敵襲状況"],["/war/list.php","合戦報告書"]
		];
		br3.makeMenu(menu,"gnavi05");
		$(".gnavi05 > A").mouseover(function() {br3.openMenu("gnavi05");});
		$(".gnavi05 > A").mouseout(function(){br3.closetime();});

		/*秘境*/
			menu = [["/facility/dungeon.php","深淵の秘境"],["/facility/dungeon02.php","永劫の秘境"]];
		if( this.new_war =="on") {
			menu = [
				["/war/list.php?m=&s=1&name=lord&word=島津義久","島津義久"],
				["/war/list.php?m=&s=1&name=lord&word=黒田如水","黒田如水"],
				["/war/list.php?m=&s=1&name=lord&word=北条氏康","北条氏康"],
				["/war/list.php?m=&s=1&name=lord&word=上杉謙信","上杉謙信"],
				["/war/list.php?m=&s=1&name=lord&word=織田信長","織田信長"],
				["/war/list.php?m=&s=1&name=lord&word=伊達政宗","伊達政宗"],
				["/war/list.php?m=&s=1&name=lord&word=徳川家康","徳川家康"],
				["/war/list.php?m=&s=1&name=lord&word=長宗我部元親","長宗我部元親"],
				["/war/list.php?m=&s=1&name=lord&word=石田三成","石田三成"],
				["/war/list.php?m=&s=1&name=lord&word=毛利元就","毛利元就"],
				["/war/list.php?m=&s=1&name=lord&word=豊臣秀吉","豊臣秀吉"],
				["/war/list.php?m=&s=1&name=lord&word=武田信玄","武田信玄"],
			];
		}
			br3.makeMenu(menu,"gnavi04");
			$(".gnavi04 > A").mouseover(function() {br3.openMenu("gnavi04");});
			$(".gnavi04 > A").mouseout(function(){br3.closetime();});

		/*同盟*/
		menu = [
			[$(".gnavi07 > A:eq(0)").attr('href'),"同盟情報"],["/alliance/level.php","同盟貢物"],
			["/bbs/topic_view.php","同盟掲示板"],["/alliance/manage.php","同盟管理"],
			["/alliance/invite.php","同盟募集"]
		];
		br3.makeMenu(menu,"gnavi07");
		$(".gnavi07 > A").mouseover(function() {br3.openMenu("gnavi07");});
		$(".gnavi07 > A").mouseout(function(){br3.closetime();});

		/*格付*/
		menu = [["/user/ranking.php?m=","国別格付"],["/user/ranking.php?m=&c=0","全体格付"],["/country/country_ranking.php","天下勢力"]];
		br3.makeMenu(menu,"gnavi08");
		$(".gnavi08 > A").mouseover(function() {br3.openMenu("gnavi08");});
		$(".gnavi08 > A").mouseout(function(){br3.closetime();});
	},
	br3: {
		closeTimer : null,
		// プルダウンメニューのアイテム作成
		makeMenu : function(arr,target){
			var br3 = this;
			var submenu = document.createElement('div');
			submenu.id = target;
			submenu.style.position = "absolute";
			submenu.style.zIndex = 200000;
			submenu.style.background = "#000000";
			submenu.style.display = "none";
			$("."+target).append(submenu);
			$(submenu).mouseover(function(){br3.closetimeC();});
			$(submenu).mouseout(function(){br3.closetime();});
			for(var i=0;i<arr.length;++i){
				var a = document.createElement('a');
				a.href = arr[i][0];
				a.innerHTML = arr[i][1];
				a.style.margin = "12px";
				a.style.fontSize = "100%";
				a.style.textIndent = "0px";
				a.style.height = "14px";
				a.style.background = "#000000";
				submenu.appendChild(a);
			}
		},

		// プルダウンメニューの地図メニュー作成
		makeMapMenu : function(arr,target){
			var br3 = this;
			var c = location.href.match(/c=\d+$/);
			if (c!==null) {c = "&" + c;
			} else {c = "";}
			var submenu = document.createElement('div');
			submenu.id = target;
			submenu.style.position = "absolute";
			submenu.style.zIndex = 200000;
			submenu.style.background = "#000000";
			submenu.style.display = "none";
			submenu.style.width = "235px";
			$("."+target).append(submenu);
			$(submenu).mouseover(function(){br3.closetimeC();});
			$(submenu).mouseout(function(){br3.closetime();});
			for(var i=0;i<4;++i){
				var l = document.createElement('li');
				l.style.background = "#000000";
				l.style.height = arr.length*27.5+"px";
				l.style.width = "55px";
				var dir,x,y;
				switch (i) {
					case 0:dir = "北東砦";x = 1;y = 1;break;
					case 1:dir = "南東砦";x = 1;y = -1;break;
					case 2:dir = "南西砦";x = -1;y = -1;break;
					case 3:dir = "北西砦";x = -1;y = 1;break;
				}
				for(var j=0;j<arr.length;++j){
					var a = document.createElement('a');
					a.href = "/map.php?x="+arr[j][0]*x+"&y="+arr[j][1]*y+c;
					a.innerHTML = dir + eval(j + 1);
					a.style.margin = "12px";
					a.style.fontSize = "100%";
					a.style.textIndent = "0px";
					a.style.height = "14px";
					a.style.width = "50px";
					a.style.background = "#000000";
					l.appendChild(a);
				}
				submenu.appendChild(l);
			}
		},
		// メニューを開く
		openMenu : function(obj) {
			var br3 = this;
			br3.closeMenu();
			br3.closetimeC();
			$("#"+obj).toggle();
		},
		// メニューを閉じる
		closeMenu : function() {
			var br3 = this;
			$("#gnavi01").css('display', "none");
			$("#gnavi02").css('display', "none");
			$("#gnavi03").css('display', "none");
			$("#gnavi04").css('display', "none");
			$("#gnavi05").css('display', "none");
			$("#gnavi07").css('display', "none");
			$("#gnavi08").css('display', "none");
		},
		closetime : function() {
			var br3 = this;
			br3.closeTimer = window.setTimeout(br3.closeMenu, 50);
		},
		closetimeC :function() {
			var br3 = this;
			if(br3.closeTimer) {
				window.clearTimeout(br3.closeTimer);
				br3.closeTimer = null;
			}
		}
	}
});////}}}

//******************************************************************************
/** 全般：半角に（ちょっとよくわかってない） */
//------------------------------------------------------------------------------
Moko.ToHankaku = FeatureInit({////{{{
	name: 'ToHankaku',
	config: 'tohankaku',
	caption: 'あらゆる入力欄で全角数字を半角に強制変換',
	group: 'all',
	condition: function () { return LPath[''] },
	//------------------------------------------------------------------------------
	run: function () {
	},
});////}}}

//******************************************************************************
/** 全般：全所領の建設状況一覧の表示 */
//------------------------------------------------------------------------------
//function villageListView(){
Moko.AllConstructionView = FeatureInit({////{{{
	name: 'AllConstructionView',
	config: 'villageListView',
	group: 'all2',
	caption: '建設状況一覧の表示',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------

	run: function () {

		var self = this;
		$.event.special.ready.setup();

		// display: none なテーブルを #mokotool に追加しておく
		$('#mokotool').append(''+<><![CDATA[
			<div id="villagelistdialog" style="display:none;">
				<table class="tablesorter" width=100%>
				<thead><tr><th>名前</th><th>実行中作業</tr></thead>
				<tbody id="tb_villagelist"></tbody></table>
			</div>
		]]></> );

		$('.sideBoxHead > h4:contains("自国")').each(function(){

			if($(this).text()!='自国') return false;

			// サイドボックス「自国」を置き換える
			$(this).replaceWith(
				'<h4><a href="#TB_inline?height=400&amp;width=560&amp;inlineId=villagelistdialog" class="thickbox" title="自国" onclick="return false;">自国</a></h4>');

			// サイドボックス「自国」のクリックイベント
			$('.sideBoxHead > h4 a.thickbox:contains("自国")')
			.live("mousedown",function() {

				// 現在の拠点名を記憶
				var lastSelect = $(".sideBoxInner.basename .on").text();

				// 素のオーバーレイダイアログを表示
				tb_init('a.thickbox');
				$('#tb_villagelist').children().remove();

				//// 城主ページから情報を取得

				IXA_getNationInfo()
				.done(function(nationInfo){
					var href_point=[];
					var ins_point=[];

					var villages = $O.values(nationInfo).filter(function(v){return v.isVillage })
					var villageNames = villages.map(function(v){return v.name});
					var villageInfos = [];

					$('.sideBox > div.sideBoxHead:has(h4:contains("自国"))+.sideBoxInner > ul > li')
					.each(function(){
						var footholdName = $(this).contents().last().text().trim();
						if( villageNames.contains( footholdName ) ){
							$O.some(nationInfo, function(v){
								if( v.name == footholdName ){
									villageInfos.push( v );
									return true;
								}
							});
						}
					})

					self.addVillageList(villageInfos);
				});

				return false;
			});
		});
	},

	addVillageList: function (villageInfos){
		var self = this;
		if(0) {
			//地図の表示サイズタイプと同様にデフォルト所領選択値もサーバサイドで保持されている為、
			//最後にリクエストした所領がサーバで保持される
			//よって、建設状態リストを表示する直前のデフォルト所領選択値を保持しておき
			//最後にそのデフォルト所領へアクセスすることで、デフォルト値を元の値に戻す処理
			IXA_getNationInfo(true)
			.done(function(nationInfo){
				var currentVillageID = $O.values(nationInfo)
				.filter(function(v){return v.current})[0]
				.villageID;
				IXA_villageChange(currentVillageID, null, true );
			});

			return;
		}

		var dfd = $.Deferred();

		(function(){
			var here = arguments.callee;
			var info = villageInfos.shift();
			if(!info){
				dfd.resolve();
				return;
			}

			$.get(info.url)
			.done(function (html){
				var $block = $('<td style="text-align: left; line-height: 150%">');
				$(html).find('#actionLog .clearfix:has(.buildStatus) li').each(function(){
					var $li = $(this);
					$block.append(
						$li.find('.buildStatus').text()+'が'
						+$li.find('.buildTime').text()+'に完了します。',
						'<br>'
					);
				});
				var tmpl = ''+<><![CDATA[
					<tr><td><a href="${villageURL}">${villageName}</a></td></tr>
				]]></>;
				$.tmpl(tmpl,{ villageName: info.name, villageURL: info.url })
				.append($block)
				.appendTo('#tb_villagelist')
				;
				here();
			});

		})()

		dfd.promise().done(function(){
			IXA_getNationInfo(true)
			.done(function(nationInfo){
				var currentVillageID = $O.values(nationInfo)
				.filter(function(v){return v.current})[0]
				.villageID;
				IXA_villageChange(currentVillageID, null, true );
			});
		});
	}
});////}}}

//******************************************************************************
/** 内政：所領を次へ前へ */
//------------------------------------------------------------------------------
Moko.VillagePatrolLink = FeatureInit({////{{{
    name: 'VillagePatrolLink',
	config: 'village_patrol_link',
	options: { arrowStrings: 'village_patrol_link_arrow_string' },
	caption: '所領名欄に次へ前へリンク',
	group: 'faci',
	configSettings: {
		village_patrol_link_arrow_string: {
			type: 'textInput', default_value: "?,?",
			caption: '次へ前への文字。半角コンマで区切る。初期値「?,?」',
		},
	},
    condition: function () { return LPath.village },
	style: ''+<><![CDATA[
		.moko-rotate-village-arrow-box {
			float: right;
			margin-right: 8px;
		}
		.moko-rotate-village-arrow {
			color: gray;
			font-size: 20px;
			margin-left: 2px;
			-moz-user-select: none;
		}
		.moko-rotate-village-arrow.moko-avalable {
			color: white;
			cursor: pointer;
		}
	]]></>,
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;

		IXA_getNationInfo(true)
		.done(function(nationInfo){

			var villageNames = $O.values(nationInfo)
			.filter(function(v){ return v.isVillage })
			.map(function(v){return v.name});

			var arrows = (self.arrowStrings || "").split(/[,]/);
			var prevStr = arrows[0] || '?',
				nextStr = arrows[1] || '?';

			var $prevArrow = $('<span>',{text:prevStr,class:'moko-rotate-village-arrow'});
			var $nextArrow = $('<span>',{text:nextStr,class:'moko-rotate-village-arrow'});
			var $currLi = $('.sideBoxInner.basename ul li.on');

			if( ($next = $currLi.next().find('a[href]')).length ){
				if( villageNames.contains($next.text()) ){
					$nextArrow
					.addClass('moko-avalable')
					.click(function(){ location.href = $next.attr('href') })
				}
			}

			if( ($prev = $currLi.prev().find('a[href]')).length ){
				if( villageNames.contains($prev.text()) ){
					$prevArrow
					.addClass('moko-avalable')
					.click(function(){ location.href = $prev.attr('href') })
				}
			}

			$('<div>',{class:'moko-rotate-village-arrow-box',css:{float:'right',color:'white'}})
			.append( $prevArrow, $nextArrow )
			.insertBefore('.left .basename')
		});
	}
});////}}}

//******************************************************************************
/** 内政：施設共通 */
//------------------------------------------------------------------------------
Moko.FacilityCommon = FeatureInit({////{{{
    name: 'FacilityCommon',
    condition: function () { return LPath.facility || LPath.castle || LPath.camp_proc },
	style: sprintf(''+<><![CDATA[
		.moko-facility-tool{
			margin: 10px -13px 0 -13px; padding: 0 3px;
			width : 126px; minHeight: 50px; -moz-box-sizing: border-box;
		}
		.moko-facility-tool-button {
			font-family: 'Meiryo UI' !important;
			font-weight: bold;
			width: 120px;
			height:24px;
			font-size: 12px;
			line-height: 12px;
			vertical-align: middle;
			background-image: url("%(bgimage)s");
			color: #534741;
			-moz-user-select: none;
			cursor: pointer;
			overflow: hidden;
			-moz-box-sizing: border-box;
			padding-top: 6px;
			/*padding-left: 12px;*/
			text-align: center;
		}
		.moko-facility-tool-button.moko-tool-phase-fade {
			color: #776660;
		}
		.moko-facility-tool .moko-facility-tool-button+.moko-facility-tool-button {
			margin-top:4px;
		}
	]]></>,{bgimage:IMAGES.facility_tool}),
    //------------------------------------------------------------------------------
    run: function () {
		// アイコンの下にボックスを作る
		$('.ig_tilesection_iconarea').append(
			$('<div class="moko-facility-tool">')
		)
	}
});////}}}

// 鉄120 → 木72
//change_btn: true // 常にtrue
//st:	1 // 常に1
//tc:	120 // 交換元資源量
//tf_id: 103 // 交換元資源
//tt_id: 101 // 欲しい資源 // 綿 102、糧 104
//village_id: 000000 // villageID
//x:	4 // 市の座標
//y:	6 // 市の座標

/** 施設のMoko機能ボタン */
function Moko_createFacilityButton( noAppend ){
	var $facilityButton = $(
		'<div class="moko-facility-tool-button"></div>'
	);
	if( !noAppend ){
		$facilityButton.appendTo( '.moko-facility-tool:eq(0)' )
	}
	return $facilityButton;
}

//******************************************************************************
/** 内政：何処でも市場 */
//------------------------------------------------------------------------------
Moko.AnytimeMarket = FeatureInit({////{{{
	//enable: false,
    name: 'AnytimeMarket',
	config: 'anytime_market',
	caption: '何処でも市場を使う',
	detail: ''+<><![CDATA[
まず市を開き、アイコンの下に「この市を登録」というボタンがあるのでクリック。
次から施設全てに「何処でも市場」というボタンが現れる。
施設以外には「総合練兵所」、設定をONにすれば内政画面から直接開けるようになる。
練兵所で兵数を入力した後だと、市を開いたときに転写されるようになっている。
	]]></>,
	group: 'faci',
	configSettings: {
		'anytime_market_village_button': {
			caption: '内政画面に「何処でも市場」のボタンを表示',
		},
	},
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
	options: {
		defaultSoldierKind: 'def_kind_soldier',
		useVillageButton: 'anytime_market_village_button',
	},
	style: $F(''+<><![CDATA[
		.moko-message {
			font-size: 14px;
			line-height: 24px;
		}
		#moko-anytime-market-btn {
			width: 60px; height: 60px; -moz-border-radius: 8px; border: solid 2px #ca7;
			background: url("%(fabric)s/img/panel/villagepanel.png");
			background-position: -220px -1620px; cursor: pointer; z-index: 1000;
			background-color: white;
			top: 153px; left: 300px; position: absolute;
		}
		#moko-market-panel {
			position: absolute;
			/*width: 600px;*/
			padding: 20px 20px 20px 20px;
			background: white;
			z-index: 1000;
			background: #F5F2E5;
			-moz-box-sizing: border-box;
			-moz-border-radius: 8px; border: solid 4px #ca7;
			/*cursor: move;*/
		}
		#moko-market-panel h3 {
			font-size: 24px; font-weight: bold;
			background: #ca7;
			margin-bottom: 10px;
			color: white;
			padding: 4px;
		}
		#moko-market-close {
			width: 30px; height: 30px;
			position: absolute;
			right: -10px; top: -10px;
			-moz-border-radius: 15px;
			font-size: 24px;
			font-height: 24px;
			color: white;
			background: #ca7;
			text-align: center;
			padding-top: 2px;
			-moz-box-sizing: border-box;
			overflow: hidden;
			cursor: pointer;
			-moz-user-select: none;
		}
		#moko-market-panel table input[type="text"] {
			width: 4em;
		}
		#moko-market-panel .moko-market-select-resource span {
			padding: 1px 1px 1px 3px;
			font-size: 16px;
			font-weight: bold;
			-moz-border-radius: 3px;
			cursor: pointer;
			background: #EBE1CD;
			color: #B8A886;
			-moz-user-select: none;
			opacity: 0.5;
		}
		#moko-market-panel .moko-market-select-resource span+span {
			margin-left: 3px;
		}
		#moko-market-panel .moko-market-select-resource span.moko-market-selected {
			background: #FFFCF0;
			color: #66421C;
			opacity: 1;
		}
		.moko-market-maxsoldier-complex-check {
			cursor: pointer;
			-moz-user-select: none;
		}
		#moko-market-panel span[inc]{
			padding: 3px 4px;
			font-size: 10px;
			font-weight: bold;
			-moz-border-radius: 3px;
			cursor: pointer;
			-moz-user-select: none;
			background: #7B8;
			color: white;
		}
		#moko-market-panel span[inc]+span[inc] { margin-left: 3px }
		#moko-market-panel span[inc^="-"]{
			background: #CB9;
			color: white;
		}
		.moko-market-want-field {
			-moz-box-sizing: border-box;
			width: 100%%;
			text-align: center;
		}
		.moko-market-overflowed .moko-market-want-field {
			color: #822;
			background: #FEE;
		}
		#moko-market-tally-result .moko-market-overflowed {
			color: #C44;
			font-weight: bold;
		}
		#moko-market-tally-result .moko-market-overflowed:after {
			content: "超過";
		}
		.moko-market-resource { font-size: 14px; }
		.moko-market-shortage { color : #C44; }
		.moko-market-shortage[id$="-result"] { font-weight: bold; }
		#moko-market-control {
			position: relative;
			font-size: 24px; font-weight: bold;
			-moz-border-radius: 4px;
			-moz-box-sizing: border-box;
			height: 40px;
			margin: 0 200px;
			margin-top: 10px;
			text-align: center;
			background: #ca7;
			color: white;
			padding: 4px;
			margin-bottom: 10px;
		}
		#moko-market-control input[type="button"] {
			height: 100%%;
			padding-left: 2em;
			padding-right: 2em;
			-moz-box-sizing: border-box;
		}
		[exchangediff^="+"] {
			color: #4C4;
			font-weight: bold;
		}
		[exchangediff^="-"] {
			color: #C44;
			font-weight: bold;
		}
	]]></>,{fabric: FABRIC_BASE_URL}),
    //------------------------------------------------------------------------------
	ready: function(){
		var self = this;

		var marketInfo = mokoStorage.getItem('AnytimeMarket');

		if(LPath['市']){
			var $regMarketBtn = Moko_createFacilityButton();
			$regMarketBtn.text('この市を登録');
			$regMarketBtn.click(function(e){
				self.registMarket(e);
			});
			setTimeout(function(){
				if( $O.getLength( marketInfo ) ){
					var hereInfo = IXA_getCurrentFacilityInfo();
					if(
						hereInfo.x == marketInfo.x &&
						hereInfo.y == marketInfo.y &&
						hereInfo.villageID == marketInfo.villageID
					){
						$regMarketBtn
						.text( '登録中の相場:'+ (marketInfo.marketRate * 100).round() +'%' );
					}
				}
			},0);
		}

		// 市が未登録の場合終了
		if( !Object.getLength(marketInfo) ) return;

		// 内政
		if(LPath.village && this.useVillageButton ){
			var btn = ''+<><![CDATA[
				<div id="moko-anytime-market-btn"></div>
			]]></>;
			$(btn).appendTo( Moko.Layouter )
			.click(function(e){
				var $market = self.openMarket(e);
			});
		}

		else if( LPath.facility || LPath.castle || LPath.camp_proc ){
			var $favorBtn = Moko_createFacilityButton(true)
			.appendTo('.ig_tilesection_iconarea:not(:contains("現在の兵士数")) .moko-facility-tool');

			$favorBtn.click(function(e){
				var $market = self.openMarket(e);
				var $faci = $(e.target).closest('.ig_tilesection_innermid, .ig_tilesection_innermid2');
				//GM_log($faci.find('tr:has(th img[alt="必要資材"])'));
				var $rscRow;
				if( ($rscRow = $faci.find('tr:has(th img[alt="必要資材"], th img[alt="研究に必要な資源"])')).length ){
					var want = {};
					$rscRow.find('td > div').each(function(idx){
						var type = RESOURCE_ORDER[idx];
						var num = $(this).text().fetchNum();
						//GM_log(type, num);
						want[type] = num;
					});
					self.setWanttedResource( want );
				}
			})
			.text('何処でも市場')
			;

			if( LPath['学舎'] ){
				$favorBtn.text('何処でも生協');
			}

			if(LPath.camp_proc){
				$favorBtn.css({fontSize:11}).text('何処でも市場出張所');
			}
			else if(LPath.castle){
				$favorBtn.text('何処でも市場相談室');
				if( $('#lordSiteArea').text().replace(/^選択中の拠点:/,'') == $('.sideBoxInner ul li.on:first-child').text().trim() ){
					$favorBtn.text('何処でも市場本店');
				}
			}
		}

		$('.moko-facility-tool-button.moko-call-antytime-market')
		.live('click', function(e){
			var $market = self.openMarket(e);
			if( $(e.target).data('afterOpenMarket') ){
				$(e.target).data('afterOpenMarket')(self);
			}
		});
	},
    //------------------------------------------------------------------------------

	/** 何処でも市場で使用する市を登録する */
	registMarket: function(e){
		setTimeout(function(){
			var facility = IXA_getCurrentFacilityInfo();
			var rate = $('th:has(img[alt="取引相場"])+td').text().fetchNum() / 100 ;
			facility.marketRate = rate ;
			facility = mokoStorage.setItem('AnytimeMarket', facility );
			$(e.target).text(
				'登録中の相場:' + (rate * 100).round() + '%'
			)
		},0);
	},

	/** 必要資源の欄を埋めてイベントを起こす */
	setWanttedResource: function( want ){
		var self = this;
		if( $O.getLength(want) ){
			var $lastInput;
			$O.each(want, function( v, rscKey ){
				$lastInput = self.$marketPanel.find($F('#moko-market-%s-want', rscKey));
				$lastInput.val( v );
			});
			if( $lastInput.length ){
				$lastInput.fireEvent('change');
			}
		}
	},

	/** 何処でも市場を開く */
    openMarket: function (e) {

		if( this.$marketPanel ){
			this.$marketPanel.fadeIn(500);
			return;
		}

		var self = this;
		var $btn = $(e.target);
		var $area = $btn.closest('.ig_tilesection_innermid2, .ig_tilesection_innermid');


		// アイコン画像
		var img = {
			wood  : $('img[alt="木"]').attr('src'),
			cotton: $('img[alt="綿"]').attr('src'),
			iron  : $('img[alt="鉄"]').attr('src'),
			food  : $('img[alt="糧"]').attr('src'),
		};

		// 市場パネル作成
		var $marketPanel = $.tmpl(this.tmplMarketUI(),{img:img})
		this.$marketPanel = $marketPanel;
		// 取引欄追加
		$R(4).each( this.addExchanger.bind(this) );
		// 最大兵士追加
		var maxSoldierTbl = this.maxSoldierTable();
		$marketPanel.append( maxSoldierTbl );

		$marketPanel.appendTo(Moko.Layouter)
		.css({ top: $(document).scrollTop() +30, left: 20 })
		.hide().fadeIn(500)
		;
		this.updateResource();

		// 資源選択
		$('.moko-market-select-resource span')
		.live('click',function(){
			var $btn = $(this);
			var $holder = $btn.parent();
			var $group = $holder.parent();

			var isFromSide = $holder.hasClass('moko-market-from') ? true : false;
			var side      = isFromSide ? 'from' : 'to' ;
			var otherSide = isFromSide ? 'to' : 'from' ;

			var rscJp = $btn.attr('resource');
			var currentSelected = $btn.attr('resource');

			// 他方のクラス
			var otherSideClass = 'moko-market-' + ( isFromSide ? 'to' : 'from' );
			var $otherSide        = $group.find('.'+otherSideClass);
			var $otherSelectedBtn = $otherSide.find('span[resource="'+rscJp+'"].moko-market-selected');
			var otherSelected = $otherSelectedBtn.length ? $otherSelectedBtn.attr('resource') : '' ;

			// 他方が同じ値なら他方を削除
			if( currentSelected == otherSelected ){
				$otherSelectedBtn
				.removeClass("moko-market-selected")
					.parent() // TH
					.attr('prevselect', rscJp )
						.parent() // TR
						.attr(otherSide, "" )
				;
			}

			// 他方に前回選択値があれば復活させる
			else if( !otherSelected
				&& $otherSide.attr('prevselect')
				&& $otherSide.attr('prevselect') != currentSelected
			){
				var $otherSideButtonGroup = $group.find( '.'+otherSideClass );
				var prevSelect = $otherSideButtonGroup.attr('prevselect');
				//GM_log(prevSelect);
				if( prevSelect ){
					$group.attr( otherSide, prevSelect );
					$otherSideButtonGroup
					.attr('prevselect','')
						.children()
						.removeClass("moko-market-selected")
					.end()
						.children('[resource="'+prevSelect+'"]')
						.addClass("moko-market-selected")
				}
			}

			// 表示更新
			$holder.children().removeClass('moko-market-selected');
			$btn.addClass('moko-market-selected');

			// データをTRの属性に付与
			$group.attr(side, rscJp)
			self.updateResource();
		})

		// インクリメンター
		$('#moko-market-exchange [inc]')
		.live('click',function(e){
			var $btn = $(e.target);
			var $input = $btn.parent().children(':text');
			var num = $input.val().fetchNum() || 0;
			num += $btn.attr('inc').toInt();
			if( num <= 0 ) num = "";
			$input.val(num);
			$input.fireEvent('change');
		});

		// テキスト変更時
		$('#moko-market-exchange :text')
		.live('change', function(e){
			var $input = $(e.target);

			var val = $input.val();
			if( !/^\d*$/.test(val) ){
				//alert('数字を入力してください');
				$input.val("");
			}

			var $holder = $input.parent();
			var $group = $holder.parent();

			var isFromSide = $holder.hasClass('moko-market-from') ? true : false;
			var side      = isFromSide ? 'from' : 'to' ;
			var otherSide = isFromSide ? 'to' : 'from' ;

			var rate = mokoStorage.getItem('AnytimeMarket').marketRate;
			rate = isFromSide ? rate : (1 / rate) ;

			var otherVal = ( $input.val() * rate )[isFromSide? 'ceil': 'floor']();

			$group.find('.moko-market-'+otherSide+' :text') .val( otherVal );
			$group.attr('exchange', $group.find('.moko-market-from :text').val() )
			$group.attr('income', $group.find('.moko-market-to :text').val() )
			self.updateResource();
		});

		$('.moko-market-want-field')
		.live('change',function(e){

			var val = $(e.target).val();
			if( !val || !/^\d+$/.test(val) ){
				//alert('数字を入力してください');
				$(e.target).val("");
			}

			self.updateWant();
		});

		$('#moko-market-close')
		.live('click', function(){
			self.closeMarket();
		});

		$('#moko-market-do-exchange')
		.live('click',function(){
			self.doExchange();
		});

		return $marketPanel;
	},

	/** パネル閉じる */
	closeMarket: function(){
		$('#moko-market-panel').fadeOut(500);
	},

	/** 必要量から自動設定 */
	updateWant: function(){
		var self = this;
		self.clearExchangeEntry();
		$('#moko-market-want').removeClass('moko-market-overflowed');

		var rate = mokoStorage.getItem('AnytimeMarket').marketRate;
		var rsc = IXA_getCurrentResources();
		var want = {
			wood  : $('#moko-market-wood-want'  ).val().fetchNum() || 0 ,
			cotton: $('#moko-market-cotton-want').val().fetchNum() || 0 ,
			iron  : $('#moko-market-iron-want'  ).val().fetchNum() || 0 ,
			food  : $('#moko-market-food-want'  ).val().fetchNum() || 0 ,
		};

		var diff = $O.map(want, function(w, key){ return rsc[key] - w; });
		var diffShort = $O.filter(diff, function(w){ return w < 0 });
		var diffExceed = $O.filter(diff, function(w){ return w >= 0 });

		var wantTotal = $O.keys(diffShort).map(function(k){return diffShort[k]}).sum();
		var exceedTotal = $O.keys(diffExceed).map(function(k){return diffExceed[k]}).sum();

		if( !wantTotal ) return ;

		if( (exceedTotal * rate) < wantTotal.abs() ){
			$('#moko-market-want').addClass('moko-market-overflowed');
			return;
		}

		var wantRatio = {};
		$O.each(diffShort, function( wantV, wantKey ){
			wantRatio[wantKey] = wantV / wantTotal;
		});

		var excRatio = {};
		$O.each(diffExceed, function( excV, excKey ){
			excRatio[excKey] = excV / exceedTotal;
		});

		var exchangePlans = [];
		// 足りない資源のループ
		$O.each( diffShort, function(wantV, wantKey){
			var realNeed = ( wantV * (1/rate) ).abs();
			// 余った資源のループ
			$O.each( diffExceed, function( excV, excKey ){
				var exchange = ( realNeed * excRatio[excKey] ).floor();
				exchangePlans.push({
					from: excKey, to: wantKey, exchange: exchange
				});
			})
		});

		//GM_log( exchangePlans );

		$('#moko-market-exchange tr').each(function(idx){
			var $group = $(this);
			var plan = exchangePlans[idx];
			if(!plan) return false;
			$group.attr( plan );

			$group.find('.moko-market-select-resource')
				.children().removeClass('moko-market-selected')
			;
			$group.find('.moko-market-from.moko-market-select-resource')
				.children('[resource="'+plan.from+'"]').addClass('moko-market-selected')
			;
			$group.find('.moko-market-to.moko-market-select-resource')
				.children('[resource="'+plan.to+'"]').addClass('moko-market-selected')
			;

			$group.find('.moko-market-from :text').val( plan.exchange );
			$group.find('.moko-market-from :text').fireEvent('change');

		})

	},

	/** 交換欄を初期化 */
	clearExchangeEntry: function(){
		var input;
		$('#moko-market-exchange tr').each(function(idx){
			var $group = $(this);
			$group.attr({from:"", to:"", exchange:""});
			$group.find('.moko-market-select-resource')
				.children().removeClass('moko-market-selected');
			$group.find('.moko-market-from :text, .moko-market-to :text').val("");
			input = $group.find('.moko-market-from :text');
		})
		input.fireEvent('change');
	},

	/** 資源欄を更新 */
	updateResource: function(){
		var rsc = IXA_getCurrentResources();
		var rscMax = IXA_getCurrentMaxResources();
		var isExchangeDisable = false;
		$('#moko-market-do-exchange').prop('disabled',true);

		// 現在資源
		$('#moko-market-wood').text( rsc.wood );
		$('#moko-market-cotton').text( rsc.cotton );
		$('#moko-market-iron').text( rsc.iron );
		$('#moko-market-food').text( rsc.food );

		// 資源最大値
		$('#moko-market-wood-max').text( rscMax.wood );
		$('#moko-market-cotton-max').text( rscMax.cotton );
		$('#moko-market-iron-max').text( rscMax.iron );
		$('#moko-market-food-max').text( rscMax.food );

		// 交換状況を整理
		var tradings = {'wood':0,'cotton':0,'iron':0,'food':0};
		var tradingTime = 0;
		$('#moko-market-exchange tr').each(function(){
			var $row = $(this), from, to, exchange, income ;
			from = $row.attr('from');
			to   = $row.attr('to');
			exchange = $row.attr('exchange').fetchNum() || 0 ;
			income   = $row.attr('income').fetchNum() || 0 ;
			if( !( from && to && exchange && income ) ) return;

			++tradingTime;
			tradings[from] -= exchange ;
			tradings[to] += income ;
		});

		if(!tradingTime)
			isExchangeDisable = true;


		// 予想資源高
		var result = rsc;
		$O.each(tradings, function(v, key){
			result[key] += v;
		});

		// 交換量
		$('#moko-market-wood-exchange'  ).text( (''+tradings['wood'  ]).replace(/^(?=[1-9])/,'+') );
		$('#moko-market-cotton-exchange').text( (''+tradings['cotton']).replace(/^(?=[1-9])/,'+') );
		$('#moko-market-iron-exchange'  ).text( (''+tradings['iron'  ]).replace(/^(?=[1-9])/,'+') );
		$('#moko-market-food-exchange'  ).text( (''+tradings['food'  ]).replace(/^(?=[1-9])/,'+') );

		// 予想資源高
		$('#moko-market-wood-result'  ).text( result.wood   );
		$('#moko-market-cotton-result').text( result.cotton );
		$('#moko-market-iron-result'  ).text( result.iron   );
		$('#moko-market-food-result'  ).text( result.food   );

		// 表示調整
		// 負数を含む場合赤く
		$('#moko-market-rcs .moko-market-resource')
		.removeClass('moko-market-shortage')
			.filter(':contains("-")')
			.addClass('moko-market-shortage')

		$('#moko-market-tally-result .moko-market-resource')
			.removeClass('moko-market-overflowed');

		$O.each(result, function( resV, rscType ){
			if( rscMax[rscType] < resV ){
				isExchangeDisable = true;
				$($F('#moko-market-%s-result',rscType)).addClass('moko-market-overflowed');
			}
		});

		$('#moko-market-rcs td').textNodes().each(function(){
			var $td = $(this);
			var text = $td.text();
			if( /\d{4,}/.test(text) ){
				text = text.replace(/\d+(?:\.\d+)?/,function(v){ return v.toInt().commalize() });
				$td.text(text);
			}
		});

		// 交易可能か
		if( $('#moko-market-tally-result .moko-market-resource:contains("-")').length ){
			isExchangeDisable = true;
		}

		$('#moko-market-do-exchange').prop('disabled',isExchangeDisable);
	},


// 鉄120 → 木72
//change_btn: true // 常にtrue
//st:	1 // 常に1
//tc:	120 // 交換元資源量
//tf_id: 103 // 交換元資源
//tt_id: 101 // 欲しい資源 // 綿 102、糧 104
//village_id: 000000 // villageID
//x:	4 // 市の座標
//y:	6 // 市の座標

	getResourceCode: function( resourceName ){
		var resourceCode = { 'wood': 101, 'cotton': 102, 'iron': 103, 'food': 104 };
		if(!/^(?:wood|cotton|iron|food)$/.test(resourceName))
			throw(new Error( resourceName +' は不正です：getResourceCode'));
		return resourceCode[resourceName];
	},

	/** 交換を実行 */
	doExchange: function(){////{{{
		var self = this;

		var exchangePlans = [];

		$('#moko-market-exchange tr').each(function(){
			var $row = $(this), from, to, exchange = 0;
			from = $row.attr('from');
			to   = $row.attr('to');
			exchange = $row.attr('exchange').fetchNum() || 0 ;

			if( !( from && to && exchange ) ) return;

			exchangePlans.push({
				tf_id: self.getResourceCode(from),
				tt_id: self.getResourceCode(to),
				tc: exchange,
			});
		});

		if(!exchangePlans.length) return;

		if( !confirm("交換を実行します。構いませんか？") ) return;
		nowLoading( exchangePlans.length );

		var currRsc = {};
		RESOURCE_ORDER.each(function(rscKey){
			var barID = RESOURCE_KEY_TO_BARID[rscKey];
			if(!barID) throw(new Error('invalid resource key'));
			currRsc[rscKey] = $('#'+barID).text().fetchNum();
		});

		var marketInfo = mokoStorage.getItem('AnytimeMarket');
		var planBase = {
			change_btn: 'true',
			st: 1, 
			village_id: marketInfo.villageID,
			x: marketInfo.x,
			y: marketInfo.y,
		};

		var postURL = $F('/facility/facility.php?x=%(x)s&y=%(y)s', {x: marketInfo.x, y: marketInfo.y});

		// 一旦マーケットのある拠点へ空撃ち
		if( !IXA_villageChange( marketInfo.villageID ) ){
			GM_log("doExchage: 拠点移動に失敗");
			return;
		}

		var error = false;
		var html;
		exchangePlans.each(function(planVar){
			if( error ) return;

			var plan = $O.merge({}, planVar, planBase );
			//GM_log( postURL, plan );
			$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST,{
				url: postURL,
				data: plan,
				success: function(_html){ countUpProgress(); html = _html },
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					error = true;
					GM_log('doExchange:取引に失敗:', textStatus, plan );
				}
			}));
		});

		// 元の拠点に戻る
		var currVillageID = IXA_getVillageID();
		if( !IXA_villageChange( currVillageID ) ){
			GM_log("doExchage: 元の拠点に戻るのに失敗");
			return;
		}

		var $resHTML = $(html);
		var resRsc = {};
		RESOURCE_ORDER.each(function(rscKey){
			var barID = RESOURCE_KEY_TO_BARID[rscKey];
			if(!barID) throw(new Error('invalid resource key'));
			resRsc[rscKey] = $resHTML.find('#'+ barID).text().fetchNum();
		});

		var report = { current: currRsc, result: resRsc, diff: {} } ;
		RESOURCE_ORDER.each(function(rscKey){
			report.diff[rscKey] = report.result[rscKey] - report.current[rscKey];
		});

		// 資源バー書き換え
		RESOURCE_ORDER.each(function(rscKey){
			var barID = RESOURCE_KEY_TO_BARID[rscKey];
			$('#'+barID).text( report.result[rscKey] );
		});

		nowLoading.removeDialog()
		this.createResultPanel( report );

		// // 総合練兵所にもどる
		// if( $('#ixamoko-general-yard-panel').length ){
		// 	mokoStorage.getItem('Status').openGeneralDrillYard = true;
		// 	mokoStorage.flush();
		// }

		// // 元ページを再読み込み
		// location.href = location.href;

	},////}}}

	createResultPanel: function (report){
		var tmpl = ''+<><![CDATA[
			<div style="padding: 20px; background: #fff;">
				<table class="ixamoko-table" id="moko-market-result">
					<tr>
						<th>実行前</th>
						<td><span><img class="ixamoko-resource-icon" src="${img.wood}"  /></span><span class="moko-market-resource">${current.wood}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.cotton}"/></span><span class="moko-market-resource">${current.cotton}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.iron}"  /></span><span class="moko-market-resource">${current.iron}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.food}"  /></span><span class="moko-market-resource">${current.food}</span></td>
					</tr>
					<tr>
						<th>実行後</th>
						<td><span><img class="ixamoko-resource-icon" src="${img.wood}"  /></span><span class="moko-market-resource">${result.wood}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.cotton}"/></span><span class="moko-market-resource">${result.cotton}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.iron}"  /></span><span class="moko-market-resource">${result.iron}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.food}"  /></span><span class="moko-market-resource">${result.food}</span></td>
					</tr>
					<tr>
						<th>差</th>
						<td><span><img class="ixamoko-resource-icon" src="${img.wood}"  /></span><span class="moko-market-resource"  exchangediff="${diff.wood}"  >${diff.wood}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.cotton}"/></span><span class="moko-market-resource"  exchangediff="${diff.cotton}">${diff.cotton}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.iron}"  /></span><span class="moko-market-resource"  exchangediff="${diff.iron}"  >${diff.iron}</span></td>
						<td><span><img class="ixamoko-resource-icon" src="${img.food}"  /></span><span class="moko-market-resource"  exchangediff="${diff.food}"  >${diff.food}</span></td>
					</tr>
				</table>
				<div class="moko-message">
					※実行中の時間経過による増分も含むため不正確です。
				</div>
				<div class="ixamoko-control">
					<input id="ixamoko-yard-stop-progress" type="button" value="閉じる" style="width: 200px;"/>
				</div>
			</div>
		]]></>;

		// アイコン画像
		var img = {
			wood  : $('img[alt="木"]').attr('src'),
			cotton: $('img[alt="綿"]').attr('src'),
			iron  : $('img[alt="鉄"]').attr('src'),
			food  : $('img[alt="糧"]').attr('src'),
		};

		report = $O.merge({ img: img }, report);
		RESOURCE_ORDER.each(function(rscKey){
			if( report.diff[rscKey] > 0 ){
				report.diff[rscKey] = '+'+report.diff[rscKey] ;
			}
		});

		var $resultPanel = $.tmpl(tmpl, report);
		var $mask = Moko_showMaskWithDialog( $resultPanel, { hideWithRemove: true } );

		$resultPanel.find('#ixamoko-yard-stop-progress')
		.click(function(){ $mask.hideMask() });

		return $mask;
	},

	tmplMarketUI: function(){
		return ''+<><![CDATA[
			<div id="moko-market-panel">

				<h3>何処でも市場</h3>
				<div id="moko-market-close">&#10008;</div>

				<table id="moko-market-rcs" class="ixamoko-table">
					<tr id="moko-market-tally-resource">
						<th>現在資源</th>
						<td class="moko-market-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.wood}"  /></span><span class="moko-market-resource" id="moko-market-wood"  >0</span></td>
						<td class="moko-market-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.cotton}"/></span><span class="moko-market-resource" id="moko-market-cotton">0</span></td>
						<td class="moko-market-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.iron}"  /></span><span class="moko-market-resource" id="moko-market-iron"  >0</span></td>
						<td class="moko-market-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.food}"  /></span><span class="moko-market-resource" id="moko-market-food"  >0</span></td>
					</tr>
					<tr id="moko-market-tally-max">
						<th>最大</th>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-wood-max"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-cotton-max">0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-iron-max"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-food-max"  >0</span></td>
					</tr>
					<tr id="moko-market-want">
						<th>希望する資源量</th>
						<td><input type="text" id="moko-market-wood-want"   class="moko-market-want-field" /></td>
						<td><input type="text" id="moko-market-cotton-want" class="moko-market-want-field" /></td>
						<td><input type="text" id="moko-market-iron-want"   class="moko-market-want-field" /></td>
						<td><input type="text" id="moko-market-food-want"   class="moko-market-want-field" /></td>
					</tr>
					<tr id="moko-market-tally-exchange">
						<th>交換</th>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-wood-exchange"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-cotton-exchange">0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-iron-exchange"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-food-exchange"  >0</span></td>
					</tr>
					<tr id="moko-market-tally-result">
						<th>結果</th>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-wood-result"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-cotton-result">0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-iron-result"  >0</span></td>
						<td class="moko-market-resource-cell"><span class="moko-market-resource" id="moko-market-food-result"  >0</span></td>
					</tr>
				</table>

				<table class="ixamoko-table">
					<thead>
						<tr>
							<th colspan="2">提供</th>
							<th> </th>
							<th colspan="2">交換</th>
						</tr>
					</thead>
					<tbody id="moko-market-exchange">
					</tbody>
				</table>

				<div id="moko-market-control">
					<input id="moko-market-do-exchange" type="button" value="交換" disabled="disabled" />
				</div>
			</div>
		]]></>;
	},

	addExchanger: function(){
		this.$marketPanel
			.find('#moko-market-exchange')
			.append(
				this.produceExchanger()
			);
	},

	_produceExchangerState: null,
	produceExchanger: function(){

		if( this._produceExchangerState ){
			return this._produceExchangerState.clone();
		}

		// アイコン画像
		var img = {
			wood  : $('img[alt="木"]').attr('src'),
			cotton: $('img[alt="綿"]').attr('src'),
			iron  : $('img[alt="鉄"]').attr('src'),
			food  : $('img[alt="糧"]').attr('src'),
		};

		this._produceExchangerState = $.tmpl(''+<><![CDATA[
			<tr from="" to="" exchange="" income="">
				<th class="moko-market-select-resource moko-market-from"><span
					resource="wood"  ><img class="ixamoko-resource-icon" src="${img.wood}"   alt="木" /></span><span
					resource="cotton"><img class="ixamoko-resource-icon" src="${img.cotton}" alt="綿" /></span><span
					resource="iron"  ><img class="ixamoko-resource-icon" src="${img.iron}"   alt="鉄" /></span><span
					resource="food"  ><img class="ixamoko-resource-icon" src="${img.food}"   alt="糧" /></span></th>
				<td class="moko-market-from"><input type="text"/>
					<span
					inc="10000">万</span><span inc="1000">千</span><span inc="100">百</span><span
					inc="-100">百</span><span inc="-1000">千</span><span inc="-10000">万</span></td>
				<td>→</td>
				<th class="moko-market-select-resource moko-market-to"><span
					resource="wood"  ><img class="ixamoko-resource-icon" src="${img.wood}"   alt="木" /></span><span
					resource="cotton"><img class="ixamoko-resource-icon" src="${img.cotton}" alt="綿" /></span><span
					resource="iron"  ><img class="ixamoko-resource-icon" src="${img.iron}"   alt="鉄" /></span><span
					resource="food"  ><img class="ixamoko-resource-icon" src="${img.food}"   alt="糧" /></span></th>
				</th>
				<td class="moko-market-to"><input type="text"/>
					<span
					inc="10000">万</span><span inc="1000">千</span><span inc="100">百</span><span
					inc="-100">百</span><span inc="-1000">千</span><span inc="-10000">万</span></td>
			</tr>
		]]></>,{img:img});

		return this._produceExchangerState.clone() ;
	},

	/** 最大訓練可能兵士数テーブル */
	maxSoldierTable: function(){
		var self = this;
		var tmpl = ''+<><![CDATA[
			<table class="ixamoko-table">
				<thead>
				<tr>
					<th>複合</th>
					<th>兵種</th>

					<th><img class="ixamoko-resource-icon" src="${img.wood}"   alt="木" /></th>
					<th><img class="ixamoko-resource-icon" src="${img.cotton}" alt="綿" /></th>
					<th><img class="ixamoko-resource-icon" src="${img.iron}"   alt="鉄" /></th>
					<th><img class="ixamoko-resource-icon" src="${img.food}"   alt="糧" /></th>

					<th>最大数</th>
					<th>転写</th>
				</tr>
				</thead>
				<tbody>
				{{each(idx, v) soldiers}}
				<tr wood  ="${v.want.wood}"
					cotton="${v.want.cotton}"
					iron  ="${v.want.iron}"
					food  ="${v.want.food}"
				>
					<td class="moko-market-maxsoldier-complex-check" soldiercomplexed=""></td>

					<th>${v.soldierName}</th>

					<td>${v.want.wood}</td>
					<td>${v.want.cotton}</td>
					<td>${v.want.iron}</td>
					<td>${v.want.food}</td>

					<td>${v.maxSoldierNum}</td>
					<td><input class="moko-market-maxsoldier-entry" type="button" value="転写" /></td>
				</tr>
				{{/each}}
				<tr id="moko-market-complex-max">
					<td id="moko-market-complex-max-soldiers" colspan="2"></td>

					<td class="moko-market-complex-max-wood"></td>
					<td class="moko-market-complex-max-cotton"></td>
					<td class="moko-market-complex-max-iron"></td>
					<td class="moko-market-complex-max-food"></td>

					<td id="moko-market-complex-max-num"></td>
					<td><input class="moko-market-maxsoldier-entry" type="button" value="転写" /></td>
				</tr>
				</tbody>
			</table>
		]]></>;

		// アイコン画像
		var img = {
			wood  : $('img[alt="木"]').attr('src'),
			cotton: $('img[alt="綿"]').attr('src'),
			iron  : $('img[alt="鉄"]').attr('src'),
			food  : $('img[alt="糧"]').attr('src'),
		};
		var soldierKinds = self.defaultSoldierKind;
		var soldiers = []
		soldierKinds.each(function(soldierName){
			var capa = IXA_calcDrillCapability( soldierName );
			var maxNum = capa.maxsoldier;
			var want = capa.want ;
			soldiers.push({
				soldierName: soldierName,
				maxSoldierNum: maxNum,
				want: want,
			});
		});

		$('.moko-market-maxsoldier-complex-check')
		.live('click',function(e){
			var $cell = $(e.target);
			var isComplexed = !!$cell.attr('soldiercomplexed');
			$cell.attr('soldiercomplexed', ( isComplexed ? "" : true ) )
			$cell.text( isComplexed ? "" : "?" )
			self.updateComplexSoldier();
		});

		$('.moko-market-maxsoldier-entry')
		.live('click',function(e){
			var $btn = $(e.target);
			var $row = $btn.closest('tr');
			var want = {};
			RESOURCE_ORDER.each(function(rscKey){
				want[rscKey] = $row.attr(rscKey).fetchNum() || 0;
			});

			self.setWanttedResource(want);
		});

		var $table = $.tmpl(tmpl, {soldiers: soldiers, img: img });
		//$table.find('td').textNodes().each(function(){
		//	var $textNode = $(this);
		//	var text = $textNode.text();
		//	if( /\d{4,}/.test(text) ){
		//		text = text.replace(/\d+(?:\.\d+)?/,function(v){ return v.toInt().commalize() });
		//		$textNode.text(text);
		//	}
		//});
		return $table;
	},

	updateComplexSoldier: function(){

		var $row = $('#moko-market-complex-max');

		var soldierNames = $('.moko-market-maxsoldier-complex-check[soldiercomplexed="true"]+th')
		.map(function(){ return $(this).text().trim() })
		.toArray();

		if(!soldierNames) soldierNames = [];

		var complexNum = soldierNames.length;

		var capa = IXA_calcComplexDrillCapability( soldierNames );
		RESOURCE_ORDER.each(function(rscKey){
			$row.attr(rscKey, capa.want[rscKey] );
			$row.find($F('td.moko-market-complex-max-%s',rscKey)).text(capa.want[rscKey])
		});

		$('#moko-market-complex-max-num').text( complexNum ? capa.maxsoldier : "" );

		var $complexNameCell = $('#moko-market-complex-max-soldiers')
		$complexNameCell.empty()
		soldierNames.each(function(soldierName){
			$('<div>',{text: soldierName}).appendTo($complexNameCell);
		});
	},

});////}}}

//******************************************************************************
/** 内政：お気に入り施設 */
//------------------------------------------------------------------------------
Moko.FavoriteFacility = FeatureInit({////{{{
    name: 'FavoriteFacility',
	config: 'favorite_faclity',
	caption: 'お気に入り施設',
    condition: function () { return LPath.facility },
	style: ''+<><![CDATA[
		#ixamoko-favorite-facility-list ul li {
			font-size: 11px;
			margin-bottom: 4px;
		}
	]]></>,
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;
		if(!/\S\sレベル\s*\d/.test( $('.ig_decksection_top:eq(0)').text() ) ) return;
		if(!/x=\d+&y=\d+/.test( location.search ) ) return;

		// ボタン追加
		self.generateFavoriteButton();
		// メニューに追加
		self.generateFavoriteFacilityList();

	},

	/** 既に登録されてるかどうかチェック */
	checkAlreadyFavorited: function( facility ){

		var favList = mokoStorage.getItem('FavoriteFacilities');

		var exists = favList.some(function(v){
			return ( v.villageID == facility.villageID
					&& v.x == facility.x && v.y == facility.y );
		});
		return exists;
	},

	/** ボタンをつくる */
	generateFavoriteButton: function(){
		var selff = this;

		//var $favorBtn = $(
		//	'<div class="moko-facility-tool-button"></div>'
		//).appendTo( '.moko-facility-tool' );
		var $favorBtn = Moko_createFacilityButton();
		$favorBtn.text('準備中');

		setTimeout(function(){
			var facility = IXA_getCurrentFacilityInfo();

			var exists = selff.checkAlreadyFavorited( facility );

			//GM_log( $favorBtn);
			$favorBtn.data('exists', false );
			if( exists ){
				selff.buttonToRemover($favorBtn);
				$favorBtn.data('exists', true );
			}
			else{
				selff.buttonToRegister($favorBtn);
			}

			$favorBtn.click(function(e){ selff.setFavoriteStatus(e, facility) });
		},0);
	},

	/** 削除ボタンにする */
	buttonToRemover: function( btn ){
		var $btn = (btn);
		$btn.addClass('moko-tool-phase-fade');
		$btn.text('お気に入りから削除');
		$btn.data('exists',true)
	},

	/** 追加ボタンにする */
	buttonToRegister: function( btn ){
		var $btn = $(btn);
		$btn.removeClass('moko-tool-phase-fade');
		$btn.text('お気に入りに追加');
		$btn.data('exists',false)
	},

	/** 状況により、追加したり削除したりする */
	setFavoriteStatus: function( e, facility ){
		var self = this;
		var $btn = $(e.target);
		var facility = IXA_getCurrentFacilityInfo();
		var favList = mokoStorage.getItem('FavoriteFacilities');

		if( $btn.data('exists') ){
			if( confirm('施設のお気に入りから除外しても構いませんか？') ){
				let filtered = favList.filter(function(v){
					return !( v.villageID == facility.villageID
							&& v.x == facility.x && v.y == facility.y );
				});
				favList.splice(0);
				favList.append(filtered);
				self.buttonToRegister( $btn );
			}
			else {
				return false;
			}
		}
		else {
			favList.push( facility );
			self.buttonToRemover( $btn );
		}
		this.generateFavoriteFacilityList();
		mokoStorage.flush();
	},

	/** サイドバー用のお気に入り施設リストを作る */
	generateFavoriteFacilityList: function(){
		var $ixaBox = $('#mokotool');
		var favList = mokoStorage.getItem('FavoriteFacilities');

		var tmpl = ''+<><![CDATA[
			<div id="ixamoko-favorite-facility-list"> <ul>
				{{each list}}
					<li><a href="${$value.url}">${$value.field}</a></li>
				{{/each}}
			</ul> </div>
		]]></>;
		var list = favList.map(function(v){
			var facilityURL = IXA_makeFacilityURL(v.x, v.y);
			return {
				field: ( v.villageName + '：' + v.facilityName ),
				url: IXA_makeVillageChangeURL( v.villageID, facilityURL )
			};
		})

		var $list = $.tmpl(tmpl, { list: list });

		var $oldList;
		if( ($oldList = $('#ixamoko-favorite-facility-list')).length ){
			$oldList.replaceWith( $list );
		}
		else {
			$ixaBox.append($list);
		}
	},

});////}}}

//******************************************************************************
/** 内政：「実行中の作業」を広くする */
//------------------------------------------------------------------------------
Moko.ExpandedActionLogPanel = FeatureInit({////{{{
    name: 'ExpandedActionLogPanel',
	config: 'expanded_action_log_panel',
	group: 'faci',
	caption: '「実行中の作業」を広くする',
	configSettings: {
		expanded_action_log_panel_shortly: {
			caption: '広くする高さを少しにする'
		},
	},
	options: {
		useShortlyExanding: 'expanded_action_log_panel_shortly'
	},
    condition: function () { return LPath.village },
    //------------------------------------------------------------------------------
	//実行中作業ウィンドウ拡大
	run: function (){
		var adjust = this.useShortlyExanding ? 30 : 0 ;
		$('#actionLog').css({
			backgroundImage: 'url('+IMAGES.flt_action_log+')',
			height: 130 - adjust,
			bottom: -25 + (adjust ? 20 : 0 ),
		});
		$('#actionLog .clearfix:eq(0)').css({
			height: 120    - adjust ,
			maxHeight: 120 - adjust ,
		});
	}
})////}}}

//******************************************************************************
/** 内政：拠点あたり生産力を所領名の下に表示 */
//------------------------------------------------------------------------------
Moko.ProductionPanel = FeatureInit({////{{{
	name: 'ProductionPanel',
	config: 'production_panel',
	group: 'faci',
	caption: '拠点の生産量を表示',
	options: {
		usePopulationInfluence: 'population_influence',
		useProductionBunusFacility: 'production_bonus_facility',
	},
	configSettings: {
		population_influence: {
			caption: '所領人口を考慮する',
			default_value: false,
		},
		production_bonus_facility: {
			caption: '生産量ボーナス施設を考慮する（陥落時未加算）',
			detail: '現在8レベルまで。以降レベルは8レベルとして扱う。',
			default_value: false,
		}
	},
	condition: function () { return LPath.village },
	ready: function () { this.showProductionPanel() },
	//------------------------------------------------------------------------------
	showProductionPanel: function () {
		var self = this;
		var report = IXA.analizeFacilities();
		var pro = report.production;
		var panel = $('<div id="ixamoko_facilities_detail">');
		panel.css({
			position: 'absolute',
			background: '#F5F2E5', zIndex: 1, padding: 2,
			border: 'solid 1px #555'
		});
		var table = $('<table><thead><tr><th>種類</th><th>量</th><th>ボ</th><th>計</th></tr></thead></table>')
		  .addClass('tablesorter no_mb')
		  .appendTo( panel );
		var tbody = $('<tbody>').appendTo( table );

		var bonus = pro['bonus'] || 0 ;
		['wood', 'cotton', 'iron', 'food'].each(function(v, idx){
			if( self.useProductionBunusFacility ){
				bonus += (pro['bonus-'+v] || 0)
			}
			var p = pro[v] || 0;
			var row = $('<tr>').append(
				$('<th style="vertical-align:middle">').append( $('<img>').attr('src', $('img[alt="'+EN2JA[v]+'"]').attr('src') ) ),
				$('<td>').text( p ),
				$('<td>').text( Math.floor( p * bonus ) )
			)
			var totalCell = $('<td>').appendTo(row);
			var total = Math.floor( p + p * bonus );
			totalCell.text( total )
			if( v == 'food' && self.usePopulationInfluence){
				totalCell.append('<br>（'+ ( total - report.population ) +'）')
			}
			row.appendTo(tbody);
		});

		panel.insertAfter('#basepointMain');

		var offset = $('#basepointBottom').offset();
		offset.top += $('#basepointBottom').height()+ 4;

		table.wrap($('<div>').css({
			padding: 5, border: 'solid 2px #776',
		}));

		panel.offset(offset);

		if( $('#back_bottom').length ){
			$('#back_bottom').offset({left: $('#back_bottom').offset().left + panel.width() + 15 })
		}
	}
});////}}}

//******************************************************************************
/** 内政：下位生産施設非表示  */
//------------------------------------------------------------------------------
//function hide_facility()
Moko.HideBasicFacility = FeatureInit({////{{{
    name: 'HideBasicFacility',
	config: 'hide_facility',
	caption: '下位生産施設非表示（上位施設があるときのみ）',
	group: 'faci',
	configSettings: { hide_facility: { default_value: false } },
    condition: function () { return LPath.select_facility },
    //------------------------------------------------------------------------------
    run: function () {
		var $facilityPanels = $('div#ig_mainareaboxInner div.ig_tilesection_mid div.ig_tilesection_innermid')
		var buildableFacilities = 
		$facilityPanels.find('h3 a')
			.map(function(){ return $(this).text().trim() })
			.toArray()
		;
		$facilityPanels.each(function(){
			var fname = $(this).find('h3 a').text().trim();
			if(fname == '水田' && buildableFacilities.contains('棚田')
			   || fname == '機織り場' && buildableFacilities.contains('機織り工房')
			   || fname == '木工所'   && buildableFacilities.contains('伐採所')
			   || fname == 'たたら場' && buildableFacilities.contains('高殿')
			  ){
				//GM_log('remove :' + fname);
				//$(this).css("border", "3px groove blue");
				//$(this).prev().css("border", "3px groove blue");
				//$(this).next().css("border", "3px groove blue");
				$(this).prev().remove();
				$(this).next().remove();
				$(this).remove();
			};
		});
	}
});////}}}

//******************************************************************************
/** 内政：レベル別施設＆建築中数表示 */
//------------------------------------------------------------------------------
Moko.FacilityList = FeatureInit({////{{{
	name: 'FacilityList',
	config: 'faci_list',
	caption: 'レベル別施設＆建築中数表示',
	configSettings: {
		facility_list_multicolumn: { caption: 'レベル別施設を段組みにする' },
	},
	group: 'faci',
	//------------------------------------------------------------------------------
	options: { useMultiColumn: 'facility_list_multicolumn' },
	condition: function () { return LPath.village },
	//------------------------------------------------------------------------------
	run: function () {

		var tmp = '';
		var facilityLV = {};
		$('#mapOverlayMap area[alt*="LV."]').each(function(){
			var $this = $(this);
			var level = $this.attr('alt').replace(/^.*LV\.|\D+$/g, '').toInt();;
			if( typeof(facilityLV[level]) === 'undefined' ) facilityLV[level] = 0;
			++facilityLV[level];
		})

		var order = $O.keys(facilityLV).sort(function(a,b){ return a - b });

		order.each(function( level ){
			var count = facilityLV[level];
			if( count < 1 ) return;
			tmp += sprintf('Lv.%s × %s<br />', level, count );
		});

		if( this.useMultiColumn )
			if( tmp ) tmp = '<div style="-moz-column-count:2">'+tmp+'</div>';

		var $building = $('.buildStatus');
		var buildingNow = $building.get().length;
		if (buildingNow>0) {
			tmp += '建築中: '+buildingNow+'<BR />';
		}
		$('#mokotool').append('<DIV>'+tmp+'</DIV>');
	}
});////}}}

//******************************************************************************
/** 内政：復活ボタン非表示 */
//------------------------------------------------------------------------------
Moko.HideReviveButton = FeatureInit({////{{{
	name: 'HideReviveButton',
	config: 'non_back',
	group: 'faci',
	caption: '復活するボタンを非表示',
	condition: function () { return LPath.village },
	//------------------------------------------------------------------------------
	run: function () {
		//$('div#back_bottom').remove();
		$('div#back_bottom').hide();
	}
});////}}}

//******************************************************************************
/** 内政：右クリックツール */
//------------------------------------------------------------------------------
//function facility_tool()
Moko.FacilityTool = FeatureInit({////{{{
	name: 'FacilityTool',
	config: 'facility_tool',
	caption: '右クリックで施設操作ツールを表示',
	group: 'faci',
	options: {useDoubleUp: 'facility_tool_WUP'},
	configSettings: {
		facility_tool_WUP: { caption: '施設操作ツールにダブルアップ操作を追加', }
	},
	condition: function () { return LPath.village },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var tmp = '<div id="moko-cmenu" class="moko-cmenu-panel"><ul id="facilityUnit" style="text-align:left;"></ul></div>';
		$(document.body).append(tmp);
		$("#moko-cmenu").hide();
		$("#mapOverlayMap area[href]").bind(
			"contextmenu",
			function(e){
				self.openTool(this, e.pageX, e.pageY);
				e.preventDefault();
				return false;
			}
		);
	},

	openTool: function (target, x, y) {
		var self = this;
		var $cMenu = $('#moko-cmenu');
		$cMenu.css({ left: x + "px", top: y + "px"}).show();

		var adjustCMenuPosition = function() {
			let $window = $(window);
			let topLimit = $window.scrollTop();
			let bottomLimit = topLimit + $window.height();
			let cMenuBottom = $cMenu.offset().top + $cMenu.outerHeight();
			if(bottomLimit < cMenuBottom){
				let visiblyTop = bottomLimit - $cMenu.outerHeight();
				if( visiblyTop < topLimit ) visiblyTop = topLimit;
				$cMenu.css({top: visiblyTop })
			}
			else{
				if( TEST_07_326 == 2 )
					$cMenu.css({top: $cMenu.offset().top })
			}
		}

		$(document).unbind("click").one("click", function(){$("#moko-cmenu").hide();});
		$("#facilityUnit").text("").append("<li style='padding:0px 10px'><img src='"+IMAGES.wait+"' style='opacity: 0.6' /></li>");
		$.post('/'+$(target).attr('href'))
		.done(function (html){
			var unit_list=[];
			$(html).find('h3').each(function(){
				if($(this).find('a').text()!=''){
					var unit = $(this).find('a').text();
					var lvup = $(this).parent().parent().parent().find('img[alt="この施設をレベルアップする"]').attr('alt');
					var url = $(this).parent().parent().parent().find('a[href^="build.php"]').attr('href');
					url=url.replace('&mode=cp','');
					if(lvup==undefined) {
						unit_list.push({mod:'c',unit:unit,url:url});
					} else {
						unit_list.push({mod:'u',unit:unit,url:url});
					}
				}
			});
			if(unit_list==undefined) {
				$("#moko-cmenu").hide();
				return;
			} else {
				self.addUnit(unit_list);
				if( !TEST_07_326 ) adjustCMenuPosition();
				if( TEST_07_326 >= 2 ) adjustCMenuPosition();
				return;
			}

		})
		.fail(function (XMLHttpRequest, textStatus, errorThrown) {
			$("#moko-cmenu").hide();
		});
	},

	addUnit: function (unit_list){
		var self = this;
		$("#facilityUnit").text("");
		for(i=0;i<unit_list.length;i++) {
			var mod = unit_list[i].mod=='c' ? '建設':'LvUP';
			$('#facilityUnit').append('<li id="fUnit'+i+'" url="'+unit_list[i].url+'" class="moko-cmenu-item">'+mod+'['+unit_list[i].unit+']</li>');

			$('#fUnit'+i)
			.click(function(e) {
				location.href="/facility/"+$(this).attr('url');
			});
			if( self.useDoubleUp ) {
				mod = unit_list[i].mod=='c' ? '建設['+unit_list[i].unit+']＋LvUP':'LvUP['+unit_list[i].unit+']×2';
				$('#facilityUnit').append('<li id="fUnit_opt'+i+'" url="'+unit_list[i].url+'" mod="'+unit_list[i].mod+'"class="moko-cmenu-item">'+mod+'</li>');
				$('#fUnit_opt'+i)
				.click(function(e) {
					nowLoading();
					$.ajax({
						type: "POST",
						url: "/facility/"+$(this).attr('url'),
						context:$(this),
						cache: false,
						success: function (html){
							if($(this).attr('mod')=='c') {
								var tmp = $(this).attr('url');
								tmp=tmp.substring(tmp.indexOf('x='),tmp.length);
								location.href="/facility/build.php?"+tmp;
							} else {
								location.href="/facility/"+$(this).attr('url');
							}
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
						}
					});
				});
			}
		}
	}
});////}}}

//******************************************************************************
/** 内政：待機兵士一覧 */
//------------------------------------------------------------------------------
Moko.StandbyListDialog = FeatureInit({////{{{
	name: 'StandbyListDialog',
	config: 'standby_list_dialog',
	caption: '待機兵一覧をポップアップ表示',
	group: 'all',
	condition: function () { return LPath.ingame },
	ready: function () { this.setLink() },
	//------------------------------------------------------------------------------
	setLink: function () {
		var self = this;
		//$('a[href="/facility/unit_list.php"]').click( function () { self.showDialog(); return false } )
		$('#ixamoko_toolbar_standby').click( function () { self.showDialog(); return false } )
		$('.ixamoko-popup-standbysoldier').click( function () { self.showDialog(); return false } )
	},
	getURL: function () { return 'http://'+ location.hostname + '/facility/unit_list.php' },
	showDialog: function () {
		//$('<link rel="stylesheet" href="'+FABRIC_BASE_URL+'/css/ig_fightlist.css" />').appendTo('head');
		//$('<link rel="stylesheet" href="'+FABRIC_BASE_URL+'/css/ig_deck.css">').appendTo('head');
		$.get(
			this.getURL(),
			function(unitListHTML){
				var $head = $('head');
				var $dialog = $('<div>');
				var $list = $('.ig_decksection_mid', unitListHTML);
				$list.css({background: 'black'});
				$list.appendTo($dialog);

				//スタイルシート追加
				//$('link[href$="/ig_deck.css"]', unitListHTML) が機能しない...
				if( $('link[href$="/ig_deck.css"], link[href$="/ig_fightlist.css"]').length < 2 ){
					var linkCssStrs = unitListHTML.match(/(<link[^>]*href="[^"]*\/(?:ig_deck|ig_fightlist).css"[^>]*>)/g);
					if( linkCssStrs ){
						linkCssStrs.each(function(v, idx, a){
							$head.append(v)
						});
					}
				}

				Moko_showMaskWithDialog($dialog, { hideWithRemove: true } );
			},'html'
		);
	}
});////}}}

//******************************************************************************
/** 内政：生産施設のリンク */
//------------------------------------------------------------------------------
//function facility_selecter()
Moko.Barrack_Link = FeatureInit({////{{{
	name: 'Barrack_Link',
	config: 'facility_selecter',
	group: 'faci',
	caption: '訓練施設内に他訓練施設リンクを設置',
	condition: function () { return LPath['兵舎'] },
	//------------------------------------------------------------------------------
	run: function () {
		$.ajax({
			type: "POST", url: '/village.php', cache: false,
			success: function (html){
				var $mapArea = $(html).find('map#mapOverlayMap');

				var link = ['厩舎','足軽兵舎','弓兵舎','兵器鍛冶'].map(function(v, idx){
					var $area = $mapArea.find('area[title^="'+v+'"]');
					if(!$area) return;
					var href = '/'+$area.attr('href');
					return '[<a href="'+href+'">'+v+'</a>]';
				}).filter(function(v){return v}).join('');

				var h3link = '<h3><span>施設</span>:'+link+'</h3>';
				$('div.ig_tilesection_mid').eq(0).find('div.ig_tilesection_detailarea').find('h3').replaceWith(h3link);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log(textStatus);
			}
		});
	}
});////}}}

//******************************************************************************
/** 内政：レベルアップ後の施設の効果に差分を表示 */
//------------------------------------------------------------------------------
Moko.FacilityEffectDeltaIndication = FeatureInit({////{{{
    name: 'FacilityEffectDeltaIndication',
	config: 'facility_effect_delta_indication',
	caption: 'レベルアップ後の施設の効果に差分を表示',
	group: 'faci',
    condition: function () { return LPath.facility },
    //------------------------------------------------------------------------------
    run: function () {
		var $row = $('tr:has(img[alt="施設の効果"])');
		var delta = $row.children().eq(2).text().toInt() - $row.children().eq(1).text().toInt();
		$row.find('td:last-child .icon_lvup')
			.append('<span class="ixamoko-facility-effect-diff">（＋'+delta+'）</span>')
	}
});////}}}

function numberSort(isDescending){
	return isDescending
		? function (a, b){ return a - b }
		: function (a, b){ return b - a }
}

//******************************************************************************
/** 内政：不足資材のツールチップ表示 */
//------------------------------------------------------------------------------
Moko.ShorageResouceTooltip = FeatureInit({////{{{
    name: 'ShorageResouceTooltip',
	group: 'faci',
	config: 'shortage_resource_tooltip',
	caption: '不足資材を表示する。',
    condition: function () { return LPath.facility || LPath.castle || LPath.camp_proc },
    //------------------------------------------------------------------------------
    run: function () {
		$('tr:has(img[alt="必要資材"]), tr:has(img[alt="研究に必要な資源"])').each(function(){
			var $row = $(this);
			var modeText = ( $row.find('>th:eq(0) img').attr('alt') == '研究に必要な資源') ? '研究' : '建設' ;
			var $new = $row.clone().insertAfter($row);

			var $header = $new.children('th:eq(0)');
			$header.empty().append('<span>不足／余剰資源</span>');

			$new.attr('id','moko-shortage-resource');
			var $td = $new.children('td:eq(0)');
			var dic={wood:'wood',stone:'cotton',iron:'iron',rice:'food'};
			var diff = {};

			['wood','stone','iron','rice'].each(function(key){
				var $rsc = $td.children('.icon_'+dic[key]);
				var t=$rsc.text().replace(/\D+(\d+)/,
					function(str,c1){
						diff[dic[key]] = $('#'+key).text().toInt() - c1.toInt()
						return diff[dic[key]];
					});
				var color = '#4A4';
				if( t < 0 ){ color = 'red'; t = t;}
				else{t= '+'+t;}
				$rsc.empty().css({color:color}).text(t)
			});

			// 交換可能かどうか
			var marketInfo = mokoStorage.getItem('AnytimeMarket');
			if( $O.getLength(marketInfo) ){
				var shortage = $O.values(diff).filter(function(v){ return v < 0 }).sum();
				var exceed = $O.values(diff).filter(function(v){ return v > 0 }).sum();
				if( shortage && shortage.abs() <= exceed * marketInfo.marketRate ){
					$('<span title="取引により補填可能">補填可</span>')
					.css({fontWeight:'normal', marginLeft:0, color:'#C7C7C7'})
					.appendTo( $header );
				}
			}

			//if( !$row.closest('.ig_tilesection_innermid2').find('.ig_tilesection_btnarea_left:contains("資源が不足しています")').length ){ return ; }
			if( $O.values(diff).every(function(v){return v >= 0}) ) return ;

			var rsc = {}, messages = [];
			rsc.wood   = $('#wood').toNum() - $('tr:has(img[alt="必要資材"]) .icon_wood'  ).text().fetchNum() ;
			rsc.cotton = $('#stone').toNum()- $('tr:has(img[alt="必要資材"]) .icon_cotton').text().fetchNum();
			rsc.iron   = $('#iron').toNum() - $('tr:has(img[alt="必要資材"]) .icon_iron'  ).text().fetchNum() ;
			rsc.food   = $('#rice').toNum() - $('tr:has(img[alt="必要資材"]) .icon_food'  ).text().fetchNum() ;
			
			Object.each(rsc, function( num, rscName ){
				if( num < 0 ) messages.push( EN2JA[rscName] +'：'+ (num.abs()) );
			});
			
			if( messages.length ){
				var message = '【不足している資材】' + messages.join('、');
				$('tr:has(img[alt="必要資材"])').attr('title', message);
			}

			var pow = IXA_getProductionPower();
			//GM_log( diff, pow);
			var wanttedTime = RESOURCE_ORDER.map(function(rscKey){
				var d = diff[rscKey];
				if(d < 0){
					var pps = pow[rscKey]/60/60; // Production-power per seconds
					return d.abs() / pps;
				}
				return 0;
			}).max().round();
			;
			if( wanttedTime > 0 ){
				$new.clone()
				.children(':eq(0)').empty().append( modeText + '可能まで' )
				.end()
				.children(':eq(1)').empty().append( $('<span>').text( wanttedTime.secondsToDateTime() ) )
				.end()
				.insertAfter( $new )

			}

		});

	}
});////}}}

//******************************************************************************
/** 内政：練兵パネルボタン */
//------------------------------------------------------------------------------
Moko.GeneralDrillYardButton = FeatureInit({////{{{
    name: 'GeneralDrillYardButton',
	config: function(cfg){ return cfg['general_drill_yard'] },
    condition: function () { return LPath.ingame },
	style: sprintf(''+<><![CDATA[
		#ixamoko-generall-drill-btn {
			width: 60px; height: 60px; -moz-border-radius: 8px; border: solid 2px #ca7;
			background: url("%(fabric)s/img/panel/villagepanel.png");
			background-position: -400px -700px; cursor: pointer; z-index: 1000;
			background-color: white;
			top: 153px; left: 300px; position: absolute;
		}
	]]></>,{fabric: FABRIC_BASE_URL}),
    //------------------------------------------------------------------------------
	run: function(){
		var self = this;

		// // 内政
		// if(LPath.village){
		// 	var btn = ''+<><![CDATA[
		// 		<div id="ixamoko-generall-drill-btn" class="ixamoko-yard-goto-drill-yard"></div>
		// 	]]></>;
		// 	$(btn).appendTo( Moko.Layouter )
		// }

		$('#status_left span:has(a#ixamoko_toolbar_standby)').after(
			'<span class="sep"> | </span>'
			+'<span class="normal">'
			+'<a href="#" class="ixamoko-yard-goto-drill-yard">練兵</a></span>'
		);

		$('.ixamoko-yard-goto-drill-yard').each(function(){
			$(this).click(self.gotoDrillYard);
		});
	},
	gotoDrillYard: function( e, jackedPage ){
		mokoStorage.getItem('Status').openGeneralDrillYard = true;
		mokoStorage.flush();
		location.href = jackedPage || '/user/kosho_change.php';
		return false;
	},
});////}}}
	
//******************************************************************************
/** 内政：総合練兵所 */
//------------------------------------------------------------------------------
////{{{
// TODO
Moko.GeneralDrillYard = FeatureInit({
	//enable: false,
    name: 'GeneralDrillYard',
	config: 'general_drill_yard',
	caption: '総合練兵所を使う',
	detail: '全所領の兵舎に分散し、100名づつ練兵する。内政のボタンをクリックすると小姓選択に移動しパネルが開く。訓練可能な兵種は「内政→デフォルトの兵種」で設定している兵種のみ。',
	group: 'sol',
	options: {
		defaultSoldierKind: 'def_kind_soldier',
		useAnytimeMarket: 'anytime_market',
		nibbleSoldierNibbleNum: 'general_drill_yard_nibble_num',
	},
	configSettings: {
		general_drill_yard_nibble_num: {
			type: 'textInput',
			caption: '総合練兵所で分割時の最低訓練単位を設定（100以上・初期値100）',
			detail: '指定の兵数ごとに訓練し、余った訓練数が100以上なら新たに訓練、100未満なら最後の訓練に追加する。',
			default_value: 200,
		},
	},
    condition: function () { return LPath.kosho_change },
	style: sprintf(////{{{
		''+<><![CDATA[
		#ixamoko-yard-init-progress{
			position:absolute; width: 500px; height: 120px; top: 250px; left: 150px;
			/*border: solid 1px #000;*/
		}
		div[id^="ixamoko-yard-init-progress-image-"] {
			position: absolute;
			width: 100px; height: 100px;
			background: url("%(fabric)s/img/panel/villagepanel.png");
			background-position: 0 0;
		}
		div[id^="ixamoko-yard-init-progress-image-"][id$="-1"]{ top:-10px; left:  60px; }
		div[id^="ixamoko-yard-init-progress-image-"][id$="-2"]{ top:  5px; left:  10px; }
		div[id^="ixamoko-yard-init-progress-image-"][id$="-3"]{ top:  5px; left: 110px; }
		div[id^="ixamoko-yard-init-progress-image-"][id$="-4"]{ top: 20px; left:  60px; }
		#ixamoko-yard-init-progress-image-yard-1{ background-position: 0 -1400px; }
		#ixamoko-yard-init-progress-image-yard-2{ background-position: 0 -1200px; }
		#ixamoko-yard-init-progress-image-yard-3{ background-position: 0 -1300px; }
		#ixamoko-yard-init-progress-image-yard-4{ background-position: 0  -700px; }
		#ixamoko-yard-init-progress-image-yard-1.moko-phase-2 { background-position: -100px -1400px; }
		#ixamoko-yard-init-progress-image-yard-2.moko-phase-2 { background-position: -100px -1200px; }
		#ixamoko-yard-init-progress-image-yard-3.moko-phase-2 { background-position: -100px -1300px; }
		#ixamoko-yard-init-progress-image-yard-4.moko-phase-2 { background-position: -100px  -700px; }
		#ixamoko-yard-init-progress-image-yard-1.moko-phase-3 { background-position: -200px -1400px; }
		#ixamoko-yard-init-progress-image-yard-2.moko-phase-3 { background-position: -200px -1200px; }
		#ixamoko-yard-init-progress-image-yard-3.moko-phase-3 { background-position: -200px -1300px; }
		#ixamoko-yard-init-progress-image-yard-4.moko-phase-3 { background-position: -200px  -700px; }
		#ixamoko-yard-init-progress-image-yard-1.moko-phase-4 { background-position: -200px -1400px; }
		#ixamoko-yard-init-progress-image-yard-2.moko-phase-4 { background-position: -200px -1200px; }
		#ixamoko-yard-init-progress-image-yard-3.moko-phase-4 { background-position: -200px -1300px; }
		#ixamoko-yard-init-progress-image-yard-4.moko-phase-4 { background-position: -200px  -700px; }
		div[id^="ixamoko-yard-init-progress-image-atwork-"] {
			background-position: -600px -800px;
		}
		div[id^="ixamoko-yard-init-progress-image-atwork-"].moko-phase-4 {
			background-image: none;
		}
		#ixamoko-yard-init-progress-image-atwork-1{}
		#ixamoko-yard-init-progress-image-atwork-2{}
		#ixamoko-yard-init-progress-image-atwork-3{}
		#ixamoko-yard-init-progress-image-atwork-4{}
		#ixamoko-yard-init-progress-message{
			position: absolute; top: 50px; left: 220px;
			width: 260px; height: 40px;
			font-size: 24px;
			font-weight: bold;
			text-align: center;
			/*border: solid 1px #000;*/
		}
		#ixamoko-general-yard-panel {
			background: #F5F2E5;
			position: absolute; top: 150px; left: 10px; z-index: 50;
			-moz-box-sizing: border-box;
			-moz-border-radius: 8px; border: solid 4px #ca7;
			padding: 20px;
			min-width: 780px;
		}
		#ixamoko-general-yard-panel h3 {
			font-size: 24px; font-weight: bold;
			background: #ca7;
			margin-bottom: 10px;
			color: white;
			padding: 4px;
		}
		#ixamoko-yard-control {
			position: relative;
			font-size: 24px; font-weight: bold;
			-moz-border-radius: 4px;
			-moz-box-sizing: border-box;
			height: 40px;
			margin: 0 200px;
			margin-top: 10px;
			text-align: center;
			background: #ca7;
			color: white;
			padding: 4px;
		}
		.ixamoko-yard-capable-num {
			color: #6A6;
			text-decoration: underline;
			cursor: pointer;
		}
		#ixamoko-yard-control input[type="button"] {
			height: 100%%;
			-moz-box-sizing: border-box;
		}
		.ixamoko-yard-icon {
			width: 100px; height: 100px;
			background: url("%(fabric)s/img/panel/villagepanel.png");
			background-position: -400px -700px;
		}
		#ixamoko-yard-icon-1 {
			background-position: -400px -700px;
			top: -10px; right: 30px; position: absolute;
		}
		#ixamoko-yard-icon-2 {
			background-position: -500px -800px;
			top: 0px; right: 90px; position: absolute;
		}
		#ixamoko-yard-icon-3 {
			background-position: -600px -900px;
			top: 0px; right: -10px; position: absolute;
		}
		#ixamoko-yard-icon-4 {
			background-position: -400px -910px;
			bottom: -20px; left: 50%%; position: absolute;
			margin-left: -180px;
		}
		*[ixamoko-help] {
			display:inline-block;
			vertical-align: bottom;
			padding: 2px 4px;
			font-size: 10px;
			line-height: 100%%;
			background: #A97;
			color: #dca;
			-moz-user-select: none;
			cursor: pointer;
			-moz-border-radius: 3px;
		}
		.ixamoko-resource-icon { vertical-align: bottom; margin-right: 4px; }
		.ixamoko-yard-resource{ font-size: 14px; }
		.ixamoko-yard-resource-cell { width: 80px; text-align: left !important; }
		#ixamoko-yard-table { width: 100%% }
		#ixamoko-yard-capacity {
			position: absolute; top: 23px; left: 200px;
		}
		table#ixamoko-yard-capacity {
			background: white;
			border-collapse: collapse;
		}
		#ixamoko-yard-capacity th, #ixamoko-yard-capacity td { padding: 6px 8px;
			/* border:solid 1px #632; */
		}
		#ixamoko-yard-capacity th { font-weight: bold; background: #a85; color: white; }
		#ixamoko-yard-capacity td { background: #fffdf0;}

		.ixamoko-yard-shortage { color: #c54;}

		table.ixamoko-table {
			background: white;
			border-collapse: collapse;
			margin-bottom: 10px;
		}
		.ixamoko-table th, .ixamoko-table td {
			padding: 6px 8px;
			border:solid 1px #632;
			border-color: #765 #654;
		}
		.ixamoko-table th {
			text-align: center; font-weight: bold;
			background: #a85;
			background: #dca;
			color: #321;
		}
		.ixamoko-table td {
			background: #fffdf0;
			text-align: center;
		}
		.ixamoko-yard-inc-1000, .ixamoko-yard-inc-100,
		.ixamoko-yard-dec-1000, .ixamoko-yard-dec-100
		{
			display: inline-block;
			text-align: center;
			margin-top: 1px;
			margin-bottom: 1px;
			padding: 3px 4px;
			font-size: 10px;
			font-weight: bold;
			-moz-border-radius: 3px;
			margin-right: 1.5px;
			margin-left: 1.5px;
			cursor: pointer;
			background: #7B8;
			color: #EEB;
			-moz-user-select: none;
		}
		.ixamoko-yard-inc-1000, .ixamoko-yard-inc-100 {
			background: #7B8;
			color: white;
		}
		.ixamoko-yard-dec-1000, .ixamoko-yard-dec-100 {
			background: #CB9;
			color: white;
		}
		#ixamoko-yard-table th,
		#ixamoko-yard-table td { vertical-align: middle }
		#ixamoko-yard-table th.ixamoko-yard-yardcell {
			padding: 0;
			padding-top: 4px;
		}
		#ixamoko-yard-table th.ixamoko-yard-yardcell div.ixamoko-yard-yardImage {
			background-image: url("%(fabric)s/img/panel/villagepanel.png");
			width: 90px; height: 60px;
		}
		#ixamoko-yard-table th[yardName="足軽兵舎"] div.ixamoko-yard-yardImage {
			background-position: -205px -730px;
		}
		#ixamoko-yard-table th[yardName="弓兵舎"] div.ixamoko-yard-yardImage {
			background-position: -205px -1230px;
		}
		#ixamoko-yard-table th[yardName="厩舎"] div.ixamoko-yard-yardImage {
			background-position: -205px -1330px;
		}
		#ixamoko-yard-table th[yardName="兵器鍛冶"] div.ixamoko-yard-yardImage {
			height: 75px;
			background-position: -205px -1415px;
		}
		.ixamoko-yard-confirm-ok, .ixamoko-yard-confirm-cancel {
			height: 30px;
			font-weight: bold;
			font-size: 16px;
		}
		.ixamoko-soldier-icon-full {
			width: 100px; height: 100px;
			background: url("%(fabric)s/img/panel/villagepanel.png");
			background-position: -400px -700px;
		}
		.ixamoko-soldier-icon-full[soldier="攻城櫓"  ] { background-position: -400px -600px ;}
		.ixamoko-soldier-icon-full[soldier="大筒"    ] { background-position: -500px -600px ;}
		.ixamoko-soldier-icon-full[soldier="騎馬鉄砲"] { background-position: -600px -600px ;}
		.ixamoko-soldier-icon-full[soldier="雑賀衆"  ] { background-position: -700px -600px ;}
		.ixamoko-soldier-icon-full[soldier="精鋭騎馬"] { background-position: -400px -700px ;}
		.ixamoko-soldier-icon-full[soldier="赤備え"  ] { background-position: -500px -700px ;}
		.ixamoko-soldier-icon-full[soldier="騎馬兵"  ] { background-position: -600px -700px ;}
		.ixamoko-soldier-icon-full[soldier="海賊衆"  ] { background-position: -700px -700px ;}
		.ixamoko-soldier-icon-full[soldier="長弓兵"  ] { background-position: -500px -800px ;}
		.ixamoko-soldier-icon-full[soldier="弓騎馬"  ] { background-position: -700px -800px ;}
		.ixamoko-soldier-icon-full[soldier="足軽"    ] { background-position: -000px -900px ;}
		.ixamoko-soldier-icon-full[soldier="弓足軽"  ] { background-position: -100px -900px ;}
		.ixamoko-soldier-icon-full[soldier="騎馬兵"  ] { background-position: -200px -900px ;}
		.ixamoko-soldier-icon-full[soldier="破城鎚"  ] { background-position: -300px -900px ;}
		.ixamoko-soldier-icon-full[soldier="鉄砲足軽"] { background-position: -400px -900px ;}
		.ixamoko-soldier-icon-full[soldier="長槍足軽"] { background-position: -500px -900px ;}
		.ixamoko-soldier-icon-full[soldier="武士"    ] { background-position: -600px -900px ;}
		.ixamoko-soldier-icon-full[soldier="国人衆"  ] { background-position: -700px -900px ;}
		.ixamoko-yard-message-area {
			padding-left: 110px;
			margin-tom: 10px; margin-bottom: 10px;
		}
		.ixamoko-yard-message-area .ixamoko-soldier-icon-full {
			float: left;
			margin-left: -110px;
		}
		.ixamoko-yard-message {
			font-size: 14px;
			line-height: 24px;
		}
		.ixamoko-yard-progress {
			font-size: 24px;
			font-weight: bold;
			text-align: center;
		}
		.ixamoko-control {
			position: relative;
			font-size: 24px; font-weight: bold;
			-moz-border-radius: 4px;
			-moz-box-sizing: border-box;
			height: 40px;
			text-align: center;
			background: #ca7;
			color: white;
			padding: 4px;
		}
		.ixamoko-control input[type="button"] {
			height: 100%%;
			-moz-box-sizing: border-box;
		}
		.ixamoko-clearfix:after {
		  content: "";
		  display: block;
		  clear: both;
		  height: 0; }
		.ixamoko-clearfix { display: inline-block; }
		.ixamoko-clearfix { display: block; }
		#moko-yard-nibblenum-area {
			font-weight: normal;
		}
		#moko-yard-nibblenum {
			width: 2.5em;
			text-align: center;
			background: #F3E9D8;
			border: solid 1px #C3B090;
			-moz-border-radius: 2px;
		}
		.moko-yard-hd-dec-inc {
			min-width: 2.5em;
		}
	]]></>,
	{fabric: FABRIC_BASE_URL }
	),////}}}
	DEV_IGNORE_RESTRICTION: false,
    ready: function () {
		//this.readyYard();
		if( mokoStorage.getItem('Status').openGeneralDrillYard ){
			mokoStorage.getItem('Status').openGeneralDrillYard = false;
			mokoStorage.flush();
			$('#ig_mainareaboxInner').remove();
			setTimeout( this.readyYard.bind(this), 0 );
		}
	},
    //------------------------------------------------------------------------------
	generateYardPanel: function(allYardList, validSoldierTypes){////{{{
		var self = this;
		var tmpl = ''////{{{
		+<><![CDATA[
			<div id="ixamoko-general-yard-panel">
			<div class="ixamoko-yard-icon" id="ixamoko-yard-icon-1"></div>
			<div class="ixamoko-yard-icon" id="ixamoko-yard-icon-2"></div>
			<div class="ixamoko-yard-icon" id="ixamoko-yard-icon-3"></div>

			<h3>総合練兵所</h3>

			<table id="ixamoko-yard-capacity">
				<tr>
				<th>待機兵数</th>   <td id="ixamoko-yard-standby-num">${standbyNum}</td>
				<th>陣屋最大値</th> <td id="ixamoko-yard-capacity-max">${capacityNum}</td>
				<th>訓練数</th>     <td id="ixamoko-yard-drill-total">0</td>
				</tr>
			</table>

			<table id="ixamoko-yard-rcs" class="ixamoko-table">
				<tr>
				<th title="各兵種最適値の必要資源">必要資源</th>
				<td class="ixamoko-yard-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.wood}"  /></span><span class="ixamoko-yard-resource" id="ixamoko-yard-wood"  >0</span></td>
				<td class="ixamoko-yard-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.cotton}"/></span><span class="ixamoko-yard-resource" id="ixamoko-yard-cotton">0</span></td>
				<td class="ixamoko-yard-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.iron}"  /></span><span class="ixamoko-yard-resource" id="ixamoko-yard-iron"  >0</span></td>
				<td class="ixamoko-yard-resource-cell"><span><img class="ixamoko-resource-icon" src="${img.food}"  /></span><span class="ixamoko-yard-resource" id="ixamoko-yard-food"  >0</span></td>
				</tr>
			</table>

			<table class="ixamoko-table" id="ixamoko-yard-table">
			<thead>
			<tr>
				<th colspan="2" class="moko-market-btn-placehlder"></th>
				<th colspan="5">訓練
				<span id="moko-yard-nibblenum-area">（訓練単位：<input id="moko-yard-nibblenum" type="text" />）</span>
				<span ixamoko-help="nibble-value">?</span>
				</th>
				{{each villages}}
				<th colspan="3">${$value.name} <span ixamoko-help="divide">?</span></th>
				{{/each}}
			</tr>

			<tr>
				<th colspan="2">兵種</th>
				<th>待機</th>
				<th>訓練</th>
				<th>可能</th>
				<th>訓練数</th>
				<th class="moko-yard-hd-dec-inc">＋－</th>

				{{each yardList}}
				<th>Lv</th>
				<th>人数</th>
				<th>時間</th>
				{{/each}}
			</tr>

			</thead>

			{{each(yardName, types) yardGroup}}
			<tbody>
				{{each(idx, type) types}}
				<tr soldierType="${type}" soldierTypeno="${soldiers[type].typeno}">
					{{if idx==0}}<th rowspan="${types.length}" class="ixamoko-yard-yardcell" yardName="${yardName}">
					<div class="ixamoko-yard-yardName">${yardName}</div>
					<div class="ixamoko-yard-yardImage"></div>
					</th>{{/if}}
					<th class="ixamoko-yard-soldier-type">${type}</th>
					<td class="">${$item.standby[type]}</td>
					<td class="">${$item.training[type]}</td>
					<td><span class="ixamoko-yard-capable-num">${maxSoldierNums[type]}</span></td>
					<td class=""><input type="text" typeno="${soldiers[type].typeno}" style="width:3em" class="ixamoko-yard-num" ></td>
					<td class=""><span class="ixamoko-yard-inc-1000">千</span><span class="ixamoko-yard-inc-100">百</span><span class="ixamoko-yard-dec-100">百</span><span class="ixamoko-yard-dec-1000">千</span></td>

					{{each $data.yardList}}
					<td class="ixamoko-yard-per-level{{if $value[yardName]}} ok{{/if}}" villageID="${$index}">{{if $value[yardName]}}${$value[yardName].yardLevel}{{else}}--{{/if}}</td>
					<td class="ixamoko-yard-per-num{{if   $value[yardName]}} ok{{/if}}" villageID="${$index}">{{if $value[yardName]}}0{{else}}--{{/if}}</td>
					<td class="ixamoko-yard-per-time{{if  $value[yardName]}} ok{{/if}}" villageID="${$index}">{{if $value[yardName]}}00:00:00{{else}}--{{/if}}</td>
					{{/each}}
				</tr>
				{{/each}}
			</tbody>
			{{/each}}
			</table>
			<div id="ixamoko-yard-control">
				<input id="ixamoko-yard-all-drill" type="button" value="上記内容で練兵する" disabled="disabled" />
			</div>
			<div class="ixamoko-yard-icon" id="ixamoko-yard-icon-4"></div>
			</div>
		]]></>;////}}}
		var header = [ '兵種','待機','訓練','可能','訓練数','＋－' ];
		
		var standby = {}, training = {} ;
		var soldierNames = ["足軽", "長槍足軽", "武士", "国人衆",
			"弓足軽", "長弓兵", "弓騎馬", "海賊衆",
			"騎馬兵", "精鋭騎馬", "赤備え", "母衣衆",
			"破城鎚", "攻城櫓", "大筒兵", "鉄砲足軽", "騎馬鉄砲", "雑賀衆"];

		var yardGroup = {
			'足軽兵舎': ["足軽", "長槍足軽", "武士"],
			'弓兵舎'  : ["弓足軽", "長弓兵", "弓騎馬"],
			'厩舎'    : ["騎馬兵", "精鋭騎馬", "赤備え"],
			'兵器鍛冶': ["破城鎚", "攻城櫓", "大筒兵", "鉄砲足軽", "騎馬鉄砲"],
		};

		var validKinds = self.defaultSoldierKind;
		validKinds = validKinds.filter(function(kind){ return validSoldierTypes.contains(kind) });
		//GM_log(validSoldierTypes);
		$O.each(yardGroup, function(kinds,k,o){
			o[k] = kinds.filter(function(v){ return validKinds.indexOf(v) >= 0 });
		});


		var rcs  = IXA.getResourceCountAll();
		var maxSoldierNums = {};
		validKinds.each(function(typeName){
			var data = SOLDIER_DATA[typeName];
			var maxsol = Math.min.apply(null, [
				150000,
				(rcs.wood  /data['wood'  ]),
				(rcs.cotton/data['cotton']),
				(rcs.iron  /data['iron'  ]),
				(rcs.food  /data['food'  ])
			]).toInt();
			maxSoldierNums[typeName] = maxsol;
		});
		
		var currentSoldierNum = 0 ;
		var soldierCapacity   = 0 ;
		// 待機兵一覧から現在の待機兵、訓練状況を取得
		$.ajax(Object.merge({}, AJAX_NOASYNC_NOCACHE_GET,{
			url: '/facility/unit_list.php',
			success: function(html){
				var $html = $(html);
				var curr_capa = $html.find('.ig_solder_commentarea').text().match(/(\d+)\D+(\d+)/);
				currentSoldierNum = curr_capa[1].toInt();
				soldierCapacity = curr_capa[2].toInt();
				var $standbyTbl = $html.find('.ig_fight_statusarea:has(h3:contains("待機中の兵士")) .table_fightlist2');
				var $trainingTbls = $html.find('.ig_fight_statusarea:has(h3:contains("訓練中の兵士")) .table_fightlist2');
				// 待機兵取得
				soldierNames.each(function(name){
					var $td = $standbyTbl.find('th:contains("'+name+'")+td:eq(0)');
					standby[name] = $td.toNum();
				});
				// 訓練兵
				soldierNames.each(function(name){
					var num = $trainingTbls
						.find(sprintf('td:has(img[alt="%s"])+td',name))
						.map(function(){ return $(this).toNum(); })
						.toArray()
						.sum()
					;
					training[name] = num;
				});
			}
		}));

		// アイコン画像
		var img = {
			wood  : $('img[alt="木"]').attr('src'),
			cotton: $('img[alt="綿"]').attr('src'),
			iron  : $('img[alt="鉄"]').attr('src'),
			food  : $('img[alt="糧"]').attr('src'),
		};
		
		// テンプレートを処理
		var $panel = $.tmpl(
			tmpl,
			/* $data */ {
				header: header,
				standbyNum:  currentSoldierNum ,
				capacityNum: soldierCapacity   ,
				maxSoldierNums: maxSoldierNums,
				soldiers: Object.filter(SOLDIER_DATA, function(v){return v.drill}),
				yardGroup: yardGroup,
				yardList: allYardList,
				villages: $O.values(allYardList).map(function(v){
					return {name: $O.values(v)[0].villageName, ID:$O.values(v)[0].villageID}
				}),
				img: img,
			},
			/* $item */ { standby: standby, training: training }
		);

		if( this.useAnytimeMarket ){
			//GM_log('use am');
			var $marketBtn = Moko_createFacilityButton(true);
			$marketBtn
			.addClass('moko-call-antytime-market')
			.text('何処でも市場');
			$panel.find('.moko-market-btn-placehlder').prepend( $marketBtn );
			$marketBtn.data('afterOpenMarket',function(market){
				var want = {};
				RESOURCE_ORDER.each(function(rscKey){
					want[rscKey] = $('#ixamoko-yard-'+rscKey ).text().fetchNum();
				});
				market.setWanttedResource(want);
			});
		}


		$panel.appendTo(Moko.Layouter);
		return $panel;
	},////}}}
	
	readyYard: function(){////{{{
		
		var self = this;
		this.displayInitProgress();

		this.getYardInfo()
		.done(function(yardInfos){
			var allYardList         = yardInfos.allYardList;
			var validSoldierTypes = yardInfos.validSoldierTypes;
			//GM_log(allYardList);
			var $panel = self.generateYardPanel(allYardList, validSoldierTypes);
			self.$panel = $panel;
			self.allYardList = allYardList;
			
			self.removeInitProgress();

			$panel.find('*[ixamoko-help="divide"]').attr("title",'訓練速度を考慮しおおよそ同じ時間に訓練が完了するように分担するが、分割の結果100人未満の施設がでる場合は単純に等分して分担する。等分した結果も100人未満になるようであれば分割を行わず、先頭にある所領で訓練する。現在訓練中の待機兵は考慮しないので注意。');
			$panel.find('*[ixamoko-help="drill-value"]').attr("title",'100人以上から。各施設で分担する場合は施設数×100人以上。');
			$panel.find('*[ixamoko-help="nibble-value"]').attr("title",'100人以上。設定の値より優先される。');

			// 訓練数が変わった時に時間、資源を書き換える
			$('.ixamoko-yard-num').live( 'change', function(e){
				self.updateDrillRequirements(this, e)
			});

			// 最大リンク
			$('.ixamoko-yard-capable-num').live('click',function(){
				var $this = $(this);
				var $input = $this.closest('td').next().find(':input:text');
				$input.val( $this.text() );
				self.updateDrillRequirements($input.get(0));
			});

			// 増減ボタン
			$('.ixamoko-yard-inc-1000, .ixamoko-yard-inc-100,'
			  +'.ixamoko-yard-dec-100, .ixamoko-yard-dec-1000').live('click', function(){
				var $tr = $(this).closest('tr');
				var $input = $tr.find('input:text');
				var currVal = $input.val().fetchNum() || 0;
				var mat = $(this).attr('class').match(/\b(?:(inc)|(dec))-(\d+)/);
				var adjast = mat[3].toInt();
				if( mat[2] ) adjast *= -1;
				currVal += adjast;
				if( currVal < 0 ) currVal = "";
				$input.val( currVal );
				//$input.fireEvent('change');
				self.updateDrillRequirements($input.get(0));
			});
			

			// 練兵実行ボタンイベント
			$panel.find('#ixamoko-yard-all-drill').bind('click', function(){
				var drillSettings = self.makeDrillSetting();
				self.confirmYardDrill( drillSettings );
			});
		});

	},////}}}

	/** 実際に訓練を行う前の確認 */
	confirmYardDrill: function( drillSettings ){////{{{
		var self = this;
		var drillQueue = [];
		var yardBase = {};
		$O.each(drillSettings, function(v, typeno){
			$O.each(v, function(setting, vID){
				if(!yardBase[setting.yardName])
					yardBase[setting.yardName] = {};
				if(!yardBase[setting.yardName][typeno])
					yardBase[setting.yardName][typeno] = []

				yardBase[setting.yardName][typeno].push( setting );
			});
		});

		$O.each( yardBase, function(v, yardName){
			var numIdx = 0;
			while(1){
				var loopContined = false;
				$O.each(v, function(settings, typeno){
					settings.each(function(sett, idx){
						if( sett.soldierNum[numIdx] ){
							var queueItem = $O.filter(sett, function(v,k){ return k != 'soldierNum' });
							queueItem.soldierNum = sett.soldierNum[numIdx];
							drillQueue.push( queueItem );
							loopContined = true;
						}
					});
				});
				if(!loopContined) break;
				++numIdx;
			}
		});

		drillQueue.sort(function(a,b){ return parseInt(a.villageID,10) - parseInt(b.villageID,10) })

		//GM_log( {queue: drillQueue} );

		var $panel = this.makeQueueConfirmationTable( drillQueue );
		var mask = Moko_showMaskWithDialog($panel, {hideWithRemove: true, clickHide: false })
		$panel.find('.ixamoko-yard-confirm-ok').bind('click',function(){
			mask.hideMask();
			self.doYardDrill( drillQueue );
		});
		$panel.find('.ixamoko-yard-confirm-cancel').bind('click',function(){ mask.hideMask() });

	},////}}}

	/** 訓練を実行する */
	doYardDrill: function( queue ){////{{{

		var $S = $.sub();

		$S.extend($S.fn, {
			countUp: function(){
				this.text(
					parseInt((this.text()||'0'),10) + 1
				);
			},
			incRowspan: function(){
				var span = parseInt( this.attr('rowspan') || 0, 10 );
				this.attr('rowspan', span+1);
			}
		});

		var $panel = $S(this.createProgressPanel());

		// カウントアップ
		$panel.countUpProgress = function(){
			this.find('#ixamoko-yard-progress-now').countUp();
		};

		$panel.find('#ixamoko-yard-progress-total').text( queue.length );

		var itemTmpl = ''+<><![CDATA[
			<tr village="${village}" yard="${yard}" soldier="${soldier}">
				<td class="village">${village}</td>
				<td class="yard"   >${yard}</td>
				<td class="soldier">${soldier}</td>
				<td class="num"    >${num}</td>
				<td class="time"   >1</td>
			</tr>
		]]></>;
		var times = 0;

		$panel.messageApplyItem = function(x,y, type, num, yard, village, vID){
			var $item = $panel.find(sprintf('tr[village="%s"][yard="%s"][soldier="%s"]', village, yard, type));
			//GM_log( sprintf('tr[village="%s"][yard="%s"][soldier="%s"]', village, yard, type) );
			if( !$item.length ){
				$item = $S.tmpl(itemTmpl,{village:village, yard:yard,soldier:type,num:num});
				var $preTr = $panel.find(sprintf(
					'tr[village="%(village)s"][yard="%(yard)s"], tr[village="%(village)s"]',
					{village: village, yard:yard}
				)).last()
				if($preTr.length){
					$preTr.after( $item );
				}
				else{ $panel.find('table#ixamoko-yard-progress-table').append($item) }
				times = 1;
			}
			else{
				var $numTd = $item.find('td.num');
				var currNum = $numTd.toNum();
				$numTd.text( currNum + num );
				var $timeTd = $item.find('td.time');
				var currTime = $timeTd.toNum();
				$timeTd.text( currTime + 1 );
				times = currTime + 1;
			}

			var $mesArea = $panel.find('.ixamoko-yard-message-area');
			var $icon = $mesArea.find('.ixamoko-soldier-icon-full');
			$icon.attr('soldier',type);
			var $mes = $mesArea.find('.ixamoko-yard-message');
			$mes.empty();
			$mes.append(sprintf(
				'<b>%(village)s：%(yard)s</b> にて<br>'
				+'<b>%(soldier)s</b> を <b>%(num)s人</b>練兵。<br>'
				+'（%(time)s回目）',
				{village: village, yard:yard, soldier: type, num: num, time: times }
			));

		};

		var mask = Moko_showMaskWithDialog( $panel,
			{ hideWithRemove: true, clickHide: false, positionTop: 100 });
		// 中止ボタン
		var breakFlag = false;
		var processCompleted = false;
		var $stopCompBtn = $panel.find('#ixamoko-yard-stop-progress');
		$stopCompBtn.click(function(){
			IXA_gobackCurrentVillage()
			.done(function(){
				if( processCompleted ){
					location.href = '/facility/unit_list.php' ;
				}
				else {
					breakFlag = true;
					mask.hideMask()
				}
			})
			;
		});


		var prevVillageID = null;

		var qIdx = 0;

		var proc = function( queueItem, idx ){

			var queueItem = queue[qIdx];

			if( breakFlag ) return false;

			var villageID = queueItem.villageID;

			if( prevVillageID == villageID ){
				villageID = null ;
			}
			//GM_log( [
			//	queueItem.coordX,
			//	queueItem.coordY,
			//	queueItem.soldierTypeno,
			//	queueItem.soldierNum,
			//	villageID,
			//]);

			// メッセージを表示
			$panel.messageApplyItem(
				queueItem.coordX,
				queueItem.coordY,
				queueItem.soldierType,
				queueItem.soldierNum,
				queueItem.yardName,
				queueItem.villageName,
				villageID
			);

			// 訓練する
			var ret = IXA_drillSoldier (
				queueItem.coordX,
				queueItem.coordY,
				queueItem.soldierTypeno,
				queueItem.soldierNum,
				villageID
			)
			prevVillageID = queueItem.villageID;

			if(!ret){
				throw(new Error('エラー：練兵失敗っぽい'));
			}

			$panel.countUpProgress();

			++qIdx;
			if( qIdx < queue.length ){
				setTimeout( proc , 1000 );
			}
			else {
				$stopCompBtn.val('完了！');
				processCompleted = true;
			}
		}
		setTimeout( proc , 1000 );

	},////}}}

	// 練兵キュー実行確認テーブルを作る
	createProgressPanel: function(){////{{{
		var tmpl = ''+<><![CDATA[
			<div id="ixamoko-yard-progress" class="ixamoko-message-panel" style="padding: 20px; background: #fff;">
				<div class="ixamoko-yard-progress">
					<span id="ixamoko-yard-progress-now"></span>
					/
					<span id="ixamoko-yard-progress-total"></span>
				</div>
				<table id="ixamoko-yard-progress-table" class="ixamoko-table" style="width:100%; margin-top:10px;">
					<thead>
						<th>拠点</th><th>兵舎</th><th>兵種</th><th>兵数</th><th>回数</th>
					</thead>
				</table>
				<div class="ixamoko-yard-message-area clearfix">
					<div class="ixamoko-soldier-icon-full" soldier=""></div>
					<div class="ixamoko-yard-message"></div>
				</div>
				<div class="ixamoko-control">
				<input id="ixamoko-yard-stop-progress" type="button" value="中止" style="width: 200px;"/>
				</div>
			</div>
		]]></>;
		return $(tmpl);
	},////}}}

	// 練兵キューの確認テーブルを作る
	makeQueueConfirmationTable: function( queue ){////{{{
		var tmpl = ''+<><![CDATA[
			<div style="padding: 20px; background: #fff;">
			<div class="ixamoko-control">
				<input class="ixamoko-yard-confirm-ok" type="button" value="練兵実行" style="width: 200px;"/>
				<input class="ixamoko-yard-confirm-cancel" type="button" value="キャンセル" style="width: 200px;"/>
			</div>
			<table class="ixamoko-table" style="width:100%; margin-top:10px;">
			<thead>
				<tr>
					<th>兵種</th>
					<th>施設</th>
					<th>拠点</th>
					<th>X</th>
					<th>Y</th>
					<th>訓練数</th>
				</tr>
			</thead>
			<tbody>
				{{each queue}}
				<tr>
					<td title="${$value.soldierTypeno}">${$value.soldierType}</td>
					<td title="${$value.yardLevel}">${$value.yardName}</td>
					<td title="${$value.villageID}">${$value.villageName}</td>
					<td>${$value.coordX}</td>
					<td>${$value.coordY}</td>
					<td>${$value.soldierNum}</td>
				</tr>
				{{/each}}
			</tbody>
			</table>
			<div class="ixamoko-control">
				<input class="ixamoko-yard-confirm-ok" type="button" value="練兵実行" style="width: 200px;"/>
				<input class="ixamoko-yard-confirm-cancel" type="button" value="キャンセル" style="width: 200px;"/>
			</div>
			</div>
		]]></>;
		return $.tmpl(tmpl, { queue: queue });
	},////}}}

	/** 初期化中のプログレス画面 */
	displayInitProgress : function(){////{{{
		var tmpl = ''+<><![CDATA[
			<div id="ixamoko-yard-init-progress">
				<div id="ixamoko-yard-init-progress-image-yard-1"></div>
				<div id="ixamoko-yard-init-progress-image-atwork-1"></div>
				<div id="ixamoko-yard-init-progress-image-yard-2"></div>
				<div id="ixamoko-yard-init-progress-image-atwork-2"></div>
				<div id="ixamoko-yard-init-progress-image-yard-3"></div>
				<div id="ixamoko-yard-init-progress-image-atwork-3"></div>
				<div id="ixamoko-yard-init-progress-image-yard-4"></div>
				<div id="ixamoko-yard-init-progress-image-atwork-4"></div>
				<div id="ixamoko-yard-init-progress-message">しばらくお待ちください</div>
			</div>
		]]></>;
		$(tmpl)
		.appendTo( Moko.Layouter );
	},////}}}

	/** 初期化処理のプログレス進行 */
	proceedInitProgress: function( inc ){////{{{
		var cnt = arguments.callee.cnt || 0;
		//GM_log(cnt);
		cnt += inc;
		intCnt = cnt.floor();
		if( intCnt > 4 ) intCnt = 4;
		$('#ixamoko-yard-init-progress div[id^="ixamoko-yard-init-progress-image-"]')
		.removeClass('moko-phase-'+(intCnt-1))
		.addClass('moko-phase-'+intCnt);
		if(!inc) cnt += 1;
		if( cnt > 4 ) cnt = 4;
		arguments.callee.cnt = cnt;
	},////}}}

	/** プログレス画面削除 */
	removeInitProgress: function(){////{{{
		$('#ixamoko-yard-init-progress').remove();
	},////}}}

	/** 兵舎の情報を集める */
	getYardInfo: function(){////{{{
		var self = this;
		//var nationInfo = IXA_nationInfo();

		var dfd = $.Deferred();

		IXA_getNationInfo(true)
		.done(function(nationInfo){
			var info = Object.filter(nationInfo, function(v,k){return v.isVillage});

			var villageIDs = Object.keys(info).filter(function(vID){return info[vID].isVillage });
			var allYardList = {}; // { <villageID>: { '<兵舎名>': [<x>, <y>] } }

			IXA_patrolPages( villageIDs, '/village.php', function(html, villageID ){
				var yards = IXA_makeYardList(html, villageID);
				allYardList[villageID] = yards;
				var $labo;
				self.proceedInitProgress( 2.5 / villageIDs.length );
			}, true)
			.done(function(){
				//
				// 各兵舎から訓練可能な兵種一覧を作る

				var optList = []; // IXA_villageChange の引数リスト
				$O.keys(allYardList).each(function(vID){
					$O.each(allYardList[vID], function(yInfo, yardName){
						var yardURL = IXA_makeFacilityURL( yInfo.coordX, yInfo.coordY )
						optList.push({villageID: vID, yardURL: yardURL, yardName: yardName});
					});
				});

				var validSoldierTypes = []; // 訓練可能な兵種リスト
				var checkedYards = {}; // 確認済み兵舎

				var dfd2 = $.Deferred();
				(function(){
					var onemore = arguments.callee;
					var opt = optList.shift();
					if(!opt){
						//GM_log('dfd2 解決');
						dfd2.resolve();
						return;
					}
					if( checkedYards[opt.yardName] ){
						onemore();
						return;
					}

					IXA_villageChange(opt.villageID, opt.yardURL, true)
					.done(function(yardHtml){
						let soldiers = $(yardHtml).find('.ig_tilesection_mid:has(img[alt="訓練する人数"]) h3')
							.map(function(){return $(this).text().trim().replace(/^\[|\]$/g,'')})
							.toArray()
						;
						validSoldierTypes.append(soldiers);
						checkedYards[opt.yardName] = true;
						self.proceedInitProgress(0.4);
						onemore();
					})
					return dfd2.promise();
				})()
				.done(function(){
					// もとに戻る
					//GM_log(nationInfo);
					IXA_gobackCurrentVillage()
					.done(function(){
						self.proceedInitProgress();
						allYardList = $O.filter(allYardList, function(v){
							return $O.getLength(v);
						});
						dfd.resolve({ allYardList: allYardList, validSoldierTypes: validSoldierTypes});
					});

				});

			})
			
		});

		return dfd.promise();
	},////}}}

	/** 全所領の兵舎情報をもとに、練兵構成を作り直す */
	generateMultiVillageDrillSetting: function( drillSettings ){////{{{

		var allYardList = this.allYardList;
		
		// 兵種ごと
		Object.each( drillSettings, function(settings, typeCode, o){

			var yardName    /*兵舎名*/ = SOLDIER_DATA_BY_TYPENO[typeCode].yard;
			var soldierName /*兵種名*/ = SOLDIER_DATA_BY_TYPENO[typeCode].name;
			//GM_log( '兵種', soldierName, '担当兵舎', yardName );

			// 訓練数を再集計（ほんとは、ここでは必要ない）
			var totalNum = Object.values(settings).map(function(v){ return v.soldierNum }).sum()
			totalNum = parseInt( totalNum, 10 );
			// ==> これでいい ==> var totalNum = settings[''].soldierNum;
			//GM_log( '訓練数', parseInt(totalNum,10) );
			
			// 全所領の練兵所情報から該当兵舎のみに絞り込む
			var itsYards = {};
			Object.each(allYardList, function( yardsInVillage, villageID ){
				var yardInfo;
				if( yardInfo = yardsInVillage[yardName] ){
					itsYards[villageID] = yardInfo;
				}
			});
			//GM_log('担当兵舎の一覧', itsYards);

			var yardNum = Object.getLength( itsYards );
			//GM_log('担当兵舎数', yardNum);
			
			// 訓練速度による分担ができるかどうか（最遅の訓練施設が100名以上担えるか）
			var canDivideByDrillAbility = false;;
			var allDrillAbilities = $O.keys(itsYards).map(function(vID){
				return (1.25).pow( itsYards[vID].yardLevel - 1 )
			});
			var minAbility = allDrillAbilities.min();
			var totalAbility = allDrillAbilities.sum();

			if( totalNum * ( minAbility/totalAbility ) >= 100 )
				canDivideByDrillAbility = true;
			//GM_log(
			//	'訓練速度レート:',yardName, allDrillAbilities,
			//	'最小', ( totalNum * ( minAbility/totalAbility ) ),
			//	'可否', canDivideByDrillAbility );
			
			// 訓練所が複数あり、分配可能なら
			// TODO レベル（訓練速度）による振り分け比重
			if( yardNum >= 2 && canDivideByDrillAbility ){
				// 一旦初期化
				drillSettings[typeCode] = {};
				let lastVillageID;

				// 最後に速い訓練施設に余りを付与するために遅い順に処理する
				let vIDOrder = $O.keys(itsYards).sort(function(vID_a, vID_b){
					return itsYards[vID_a].yardLevel - itsYards[vID_b].yardLevel
				});

				let procTotal = 0; // 担当済み総数。あとで丸目誤差分を補てんするため

				vIDOrder.each(function(villageID){
					yardInfo = itsYards[villageID];

					let abilityRate = (1.25).pow( yardInfo.yardLevel -1 ) / totalAbility;
					let perPlaceNum = ( totalNum * abilityRate ).floor();
					procTotal += perPlaceNum ;

					drillSettings[typeCode][villageID] =
						$O.merge({
						soldierNum : [perPlaceNum],
						soldierType: soldierName,
						soldierTypeno: typeCode
					}, yardInfo);
					lastVillageID = villageID;
				});
				let rest = totalNum - procTotal;
				drillSettings[typeCode][lastVillageID].soldierNum[0] += rest;
			}

			// 訓練所が複数あり、分配可能なら
			else if( yardNum >= 2 &&  (( totalNum / yardNum )  >= 100 ) ){
				var rest = totalNum % yardNum;
				var perPlaceNum = ( totalNum - rest ) / yardNum;
				// 一旦初期化
				drillSettings[typeCode] = {};
				var lastVillageID;
				Object.each( itsYards, function( yardInfo, villageID ){
					drillSettings[typeCode][villageID] =
						$O.merge({
						soldierNum : [perPlaceNum],
						soldierType: soldierName,
						soldierTypeno: typeCode
					}, yardInfo);
					lastVillageID = villageID;
				});
				drillSettings[typeCode][lastVillageID].soldierNum[0] += rest;
			}
		});
		return drillSettings;
	},////}}}
	
	/** 訓練の計画を立てる */
	makeDrillSetting: function(){////{{{
		
		var self = this;
		var drillSettings = {};
		// キー： 兵種コード
		// 値： villageID をキーとした、訓練数、兵舎の座標を含むオブジェクト
		//	drillSettings = {
		//		<typeno> : {
		//			<villageID>: {
		//				soldierNum: <num>, // 100名づつ分割する場合は配列にする
		//				coordX: <x>,
		//				coordY: <y>
		//			},
		//			<villageID>: { ... },
		//		}
		
		var allYardList = this.allYardList;
		// 現在の拠点を基準に練兵構成を構築
		this.$panel.find('.ixamoko-yard-num')
		.filter(function(){return !!$(this).val().fetchNum() })
		.each(function(){
			var $input = $(this);
			var soldierNum = $input.val().fetchNum() || 0;
			//GM_log(soldierNum);
			var soldierCode = $input.attr('typeno').toInt();
			var soldierName = SOLDIER_DATA_BY_TYPENO[soldierCode].name;
			var yardName = SOLDIER_DATA_BY_TYPENO[soldierCode].yard;

			var villageID;
			$O.keys(allYardList).some(function(vID){
				if( allYardList[vID][yardName] ){
					villageID = vID;
					return true;
				}
			});

			// 該当兵舎がなければ抜ける
			if( !villageID ){
				GM_log(sprintf(
					'国内に「%s」の兵舎「%s」が見つかりません。',
					soldierName, yardName
				));
				return true;
			}
			
			var yardList = allYardList[villageID][yardName];
			var drillSetting = Object.merge({},{
				soldierNum: [soldierNum],
				soldierType: soldierName,
				soldierTypeno: soldierCode
			}, allYardList[villageID][yardName]);

			//GM_log(drillSetting);

			drillSettings[soldierCode] = {}
			drillSettings[soldierCode][villageID] = drillSetting ;
		});
		
		// 複数の所領で訓練を分担する場合
		if( 1 || self.useMultiVillageYard ){
			//GM_log(drillSettings)
			drillSettings = self.generateMultiVillageDrillSetting( drillSettings );
		}

		// 訓練を100人単位で区切る場合
		if( 1 || self.useNibbleDrillYard ){
			var minimumNibbleNum = 100;
			var nibbleNum = self.nibbleSoldierNibbleNum || minimumNibbleNum;

			// ページ内のフォームから取得
			var nibbleNumByCustom = $('#moko-yard-nibblenum').val().toString().fetchNum() || 0;
			if( nibbleNumByCustom >= minimumNibbleNum ){
				nibbleNum = nibbleNumByCustom;
			}

			// 100名以下に設定してるなら100にする
			if( nibbleNum < minimumNibbleNum ) nibbleNum = minimumNibbleNum;

			$O.each(drillSettings, function(setting4Type, soldierTypeno ){
				$O.each(setting4Type, function(setting4Village, villageID){
					var currNibbleNum = nibbleNum;
					var canNibble = setting4Village.soldierNum / currNibbleNum >= 2;
					if(!canNibble && setting4Village.soldierNum / minimumNibbleNum >= 2){
						canNibble = true;
						currNibbleNum = minimumNibbleNum;
					}
					if(!canNibble) return;

					if( canNibble ){
						var rest = setting4Village.soldierNum % currNibbleNum;
						var partLength = (setting4Village.soldierNum / currNibbleNum).floor();
						var nums = $R(partLength).map(function(){return currNibbleNum});
						if( rest >= minimumNibbleNum ){
							nums.push(rest);
						}
						else {
							nums[ nums.length -1 ] += rest;
						}
						setting4Village.soldierNum = nums;
					}
				});
			});
		}
		return drillSettings;
	},////}}}
	
	/** 訓練数変更時に起こすイベント
	 * コンテキストは訓練数入力フィールド
	 */ 
	updateDrillRequirements: function(element, e){////{{{
		var self = this;
		var $num = $(element);
		var $row = $num.closest('tr');
		var soldierName = $row.find('th.ixamoko-yard-soldier-type').text();
		var num = $num.val().toInt() || 0;

		var soldierData = SOLDIER_DATA[soldierName];
		var targetYardName = soldierData.yard ;
		
		// 入力が100名に満たない場合、警告して無効にする
		if( num < 100 && num != 0 ){
			alert('練兵数は100以上から。');
			$num.val( $num.data('beforeEntry')||'' );
			return false;
		}
		
		// 次回呼び出し用に、値を登録
		$num.data('beforeEntry', num || '' );

		// $TR.dataに必要資源数を登録しておく
		$row.data({
			wood  : soldierData.wood * num,
			cotton: soldierData.cotton * num,
			iron  : soldierData.iron * num,
			food  : soldierData.food * num
		});
		
		// 訓練プランを作る
		var drillSettings = self.makeDrillSetting();
		//GM_log(drillSettings);

		var drillTotal = 0;
		$('#ixamoko-yard-table td.ixamoko-yard-per-num').text( 0 );
		$('#ixamoko-yard-table td.ixamoko-yard-per-time').text( '00:00:00' );
		$O.each(drillSettings, function(v, typeno){
			$O.each(v, function( sett, villageID){
				var $tr = $('tr[soldierType="'+sett.soldierType+'"]');

				var num = sett.soldierNum;
				if( Array.isArray(num) ) num = num.sum();

				drillTotal += num;

				var soldierData = SOLDIER_DATA_BY_TYPENO[typeno];
				var drillPeriod = ( soldierData.period * (0.8).pow(sett.yardLevel - 1) ).ceil();
				drillPeriod = drillPeriod * num
				drillPeriod = drillPeriod.secondsToDateTime();
				$tr.find('td[villageID="'+villageID+'"].ixamoko-yard-per-num').text( num );
				$tr.find('td[villageID="'+villageID+'"].ixamoko-yard-per-time').text( drillPeriod );
			});
		});

		$('#ixamoko-yard-drill-total').text( drillTotal );

		var standbyNum = $('#ixamoko-yard-standby-num').toNum();
		var capacity = $('#ixamoko-yard-capacity-max').toNum();

		var isDisable = false;

		if( capacity - standbyNum < drillTotal ){
			$('#ixamoko-yard-drill-total').addClass('ixamoko-yard-shortage')
			isDisable = true;
		}
		else { $('#ixamoko-yard-drill-total').removeClass('ixamoko-yard-shortage') }

		isDisable = self.updateResourceTotal() || isDisable;
		isDisable = !drillTotal || isDisable;
		if( isDisable && !self.DEV_IGNORE_RESTRICTION ){
			$('#ixamoko-yard-all-drill').prop('disabled', true );
		}

	},////}}}

	/** 総資源量を更新 */
	updateResourceTotal: function(){////{{{
		var rscCost = { wood: 0, cotton: 0, iron: 0, food: 0 };
		$('#ixamoko-yard-table tr').each(function(){
			var dt = $(this).data();
			['wood','cotton','iron','food'].each(function(v){
				rscCost[v] += dt[v]||0;
			});
		});
		var rsc = {}, rscDiff = {};
		rsc = IXA_getCurrentResources();
		var disable = false;
		$('#ixamoko-yard-all-drill').prop('disabled', false );

		// 必要資源量を更新
		Object.each(rscCost, function(v,k){
			var $needRsc = $('#ixamoko-yard-'+k);
			$needRsc.removeClass('ixamoko-yard-shortage');
			rscDiff[k] = rsc[k] - rscCost[k];
			if( rscDiff[k] < 0 ){
				disable = true;
				$needRsc.addClass('ixamoko-yard-shortage');
				$needRsc.attr('title', '不足：'+ rscDiff[k].commalize());
			}
			else {
				$needRsc.attr('title', '余剰：'+ rscDiff[k].commalize());
			}
			$needRsc.text(v.commalize());
		})

		var rate = 0.6;
		var mountain = $O.values(rscDiff).filter(function(v){return v > 0}).sum();
		var shortage = $O.values(rscDiff).filter(function(v){return v < 0}).sum();
		if( shortage.abs() <= mountain * rate ){
		}

		return disable;
	},////}}}

});
////}}}

//******************************************************************************
/** 内政：市：取引を上に */
//------------------------------------------------------------------------------
Moko.HoistTradePanel = FeatureInit({////{{{
	name: 'HoistTradePanel',
	config: 'market_desc',
	group: 'faci',
	caption: '取引を上部に表示',
	condition: function () { return LPath['市'] },
	//------------------------------------------------------------------------------
	run: function () {

		var before0 = $('DIV.ig_tilesection_mid:eq(0)').prev();
		var before1 = $('DIV.ig_tilesection_mid:eq(1)').prev();

		$('DIV.ig_tilesection_mid:eq(0)').insertAfter(before1);
		$('DIV.ig_tilesection_mid:eq(1)').insertAfter(before0);

		// 元ルーチン
		// var tmp1 = $('DIV.ig_tilesection_mid:eq(0)').clone();
		// var tmp2 = $('DIV.ig_tilesection_mid:eq(1)').clone();
		// $('DIV.ig_tilesection_mid:eq(0)').replaceWith(tmp2);
		// $('DIV.ig_tilesection_mid:eq(1)').replaceWith(tmp1);
	}
});////}}}

//******************************************************************************
/** 内政：市：市での取引後最大作成兵数表示 */
//------------------------------------------------------------------------------
Moko.TradeCapability = FeatureInit({////{{{
	name: 'TradeCapability',
	config: 'market_maxsoldier',
	group: 'faci',
	caption: '市での取引後最大作成兵数表示',
	options: {
		defaultSoldierKind: 'def_kind_soldier'
	},
	configSettings: {
		def_kind_soldier: {
			caption: 'デフォルトの兵種', type: 'comboCheckBox',
			optionList: ['足軽', '長槍足軽', '武士', '弓足軽', '長弓兵', '弓騎馬',
				'騎馬兵', '精鋭騎馬', '赤備え', '鉄砲足軽', '騎馬鉄砲', '破城鎚', '攻城櫓', '大筒兵'],
			default_value: ['長槍足軽', '長弓兵', '精鋭騎馬', '鉄砲足軽', '攻城櫓'],
			value: [],
		},
	},
	condition: function () { return LPath['市'] },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;

		var marketSolNames = self.defaultSoldierKind;
		var material  = IXA_getCurrentResources();

		var rate = parseInt($('DIV.ig_tilesection_detailarea IMG[alt="取引相場"]').parent().next().find('SPAN').text().substring(0, 2))/100;
		var all = Object.values( material );

		var tmpl = ''+<><![CDATA[
			<TABLE style="background-color:#F3F2DE;" class="common_table1 center" width="100%">
			<TR><TH>複合</TH><TH>兵士</TH><TH>不足</TH><TH>過剰</TH><TH>作成可能</TH></TR>
			{{each soldier}}
				<TR><TD><input type="checkbox" id="${$value.key}"></TD>
				<TD>${$value.key}</TD><TD>{{html $value.shortage}}</TD>
				<TD>{{html $value.excess}}</TD><TD>{{html $value.max}}</TD></TR>
			{{/each}}
			<TR><TD colspan=2><div id="merge">-</div></TD><TD id="shortage">-</TD><TD id="excess">-</TD><TD id="maxsoldier">-</TD></TR>
			</TABLE>
		]]></>;

		var capaTrade = marketSolNames.map(function(key, idx){
			var sol = SOLDIER_DATA[key];
			var capa = IXA_productionCapability(
				material.wood, material.cotton, material.iron, material.food,
				sol.wood, sol.cotton, sol.iron, sol.food,
				rate
			);

			var lt100 = (capa.maxsoldier<100);
			return (capa.maxsoldier<100)
				? { key: key, shortage: '-', excess: '-', max: '100未満' }
				: { key: key, shortage: capa.shortage, excess: capa.excess, max: capa.maxsoldier } ;
		});
		var tradeTable = $.tmpl( tmpl, { soldier: capaTrade } );

		$('IMG[alt="市での取引"]').after(tradeTable);

		marketSolNames.each(function(key, idx){
			$('input#'+key).click(function() {
				var tmp2 = '';
				var wood2 = 0;
				var stone2 = 0;
				var iron2 = 0;
				var rice2 = 0;
				var checker=0;

				marketSolNames.each(function(key, idx){
					if($('input#'+key).prop('checked')) {
						var sol = SOLDIER_DATA[key];
						checker++;
						tmp2+='<div>'+key+'</div>';
						wood2 += sol.wood;
						stone2+= sol.cotton;
						iron2 += sol.iron;
						rice2 += sol.food;
					}
				});

				var moko = IXA_productionCapability(material.wood, material.cotton, material.iron, material.food, wood2, stone2, iron2, rice2, rate);
				if(checker==0) {
					tmp2='-';
					moko.shortage = '-';
					moko.excess = '-';
					moko.maxsoldier = '-';
				}
				$('div#merge').replaceWith('<div id="merge">'+tmp2+'</div>');
				$('td#shortage').replaceWith('<TD id="shortage">'+moko.shortage+'</TD>');
				$('td#excess').replaceWith('<TD id="excess">'+moko.excess+'</TD>');
				$('td#maxsoldier').replaceWith('<TD id="maxsoldier">'+moko.maxsoldier+'</TD');
			});
		});

		$('SPAN.ixamoko_short')
		.live('click', function(e) {
			var $this = $(this);
			$('#select2').val($this.attr('type'));
			if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
		});

		$('SPAN.ixamoko_excess')
		.live('click', function(e) {
			var $this = $(this);
			$('#select').val($this.attr('type'));
			if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
		});

		//Moko.after_tohankaku();

	},

});////}}}

//******************************************************************************
/** 兵舎：上位兵を上に */
//------------------------------------------------------------------------------
//function desc_soldier()
Moko.HoistAdvancedSoldier = FeatureInit({////{{{
	name: 'HoistAdvancedSoldier',
	config: 'desc_soldier',
	group: 'sol',
	caption: '上位兵を上段に表示',
	condition: function () { return LPath['兵舎'] },
	//------------------------------------------------------------------------------
	run: function () {
		var line = new Array();
		var count = 0;
		var $targetLoop = $('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innermid');
		if ($targetLoop.get().length>0) {
			$targetLoop.each(function() {
				line[count++] = $(this);
			});

			$('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innertop').each(function() {
				$(this).after(line[--count]);
			});
		} else {
			$('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innermid2').each(function() {
				line[count++] = $(this);
			});

			$('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innertop2').each(function() {
				$(this).after(line[--count]);
			});
		}
	}
});////}}}

//******************************************************************************
/** 兵舎：下位兵種を非表示 */
//------------------------------------------------------------------------------
//function desc_soldier()
Moko.HideBasicSoldir = FeatureInit({////{{{
	name: 'HideBasicSoldir',
	config: 'hide_soldier',
	group: 'sol',
	caption: '下位兵種を非表示',
	configSettings: { hide_soldier: { default_value: false } },
	condition: function () { return LPath['兵舎'] },
	//------------------------------------------------------------------------------
	run: function () {
		var $solidierPanels = $('DIV.ig_tilesection_mid .ig_tilesection_innermid:has(.ig_tilesection_detailarea>h3)');
		var draftableSoldiers = $solidierPanels.find('.ig_tilesection_detailarea>h3')
			.map(function(){return $(this).text().trim().slice(1,-1) })
			.toArray()
			;
			
		$solidierPanels.each(function() {
			var $this = $(this);
			var soltype = $(this).find('.ig_tilesection_detailarea > H3').text().slice(1, -1);
			if( soltype == '騎馬兵' && draftableSoldiers.indexOf('精鋭騎馬') >= 0 ||
				soltype == '弓足軽' && draftableSoldiers.indexOf('長弓兵') >= 0 ||
				soltype == '足軽'   && draftableSoldiers.indexOf('長槍足軽') >= 0
			  ){
				//$(this).prev().remove();
				//$(this).next().remove();
				//$(this).remove();
				$.tmpl('<div class="ig_tilesection_innermid"><button>［${soltype}］を表示</button></div>',
					{soltype: soltype})
					.css({textAlign:'center'})
					.click(function(){ $this.show(); $(this).hide() })
					.insertAfter( $this );
				$this.hide();
			}
		});
	}
});////}}}

//******************************************************************************
/** 兵舎：いろいろ */
//------------------------------------------------------------------------------
Moko.AssistSoldierNum = FeatureInit({////{{{
	name: 'AssistSoldierNum',
	config: function(cfg){ return cfg['facility_maxsoldier'] || cfg['def_num_of_soldier'] },
	options: {
		useMaxSoldier: 'facility_maxsoldier',
		defaultSoldierNumber: 'def_num_of_soldier',
	},
	configSettings:{
		facility_maxsoldier: { caption: '各兵生産施設で最大作成可能兵数リンク設置' },
		def_num_of_soldier : {
			caption: 'デフォルトの訓練数', type: 'selectBox',
			optionList: [100,200,300,400,500,600,700,800,900,1000,1500,2000,2500,3000],
			default_value: 100
		},
	},
	group: 'sol',
	condition: function () { return LPath['兵舎'] },
	ready: function(){
		this.defaultSoldierNumber = this.defaultSoldierNumber.toInt();
		this.run();
	},
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var material  = IXA.getResourceCountAll();

		$('.ig_tilesection_detailarea:has(h3)').each(function(){
			var $this = $(this);
			var soltype = $this.find('h3').text().slice(1, -1);
			if (typeof(SOLDIER_DATA[soltype])!='undefined') {
				// 生産可能最大数を求める
				var maxsol = Math.min.apply(null, [
					150000,
					(material.wood  /SOLDIER_DATA[soltype]['wood'  ]),
					(material.cotton/SOLDIER_DATA[soltype]['cotton']),
					(material.iron  /SOLDIER_DATA[soltype]['iron'  ]),
					(material.food  /SOLDIER_DATA[soltype]['food'  ])
				]).toInt();

				if (maxsol>=100) {
					var $solNumInput = $this.find('INPUT[type="text"]');
					// 初期訓練数をセット
					if ( self.defaultSoldierNumber!='0') {
						if (parseInt( self.defaultSoldierNumber )>maxsol) {
							$solNumInput.val(''+maxsol);
						} else {
							$solNumInput.val( self.defaultSoldierNumber );
						}
					}
					//
					if ( self.useMaxSoldier ) {
						$this.find('INPUT[type="submit"]')
						.before('<SPAN value="'+maxsol+'" style="margin-left:-8px;cursor:pointer;" class="ixamoko_maxsol">('+maxsol+')</SPAN>');
						$('.ixamoko_maxsol').click(function(e) {
							$(this).parent().find('INPUT[type="text"]').val($(this).attr('value'));
						});
					}
				}
			}
		});
	}
});////}}}

//******************************************************************************
/** 兵舎：兵士100人ずつ訓練 */
//------------------------------------------------------------------------------
//function prod_with_smalllot()
Moko.prod_with_smalllot = FeatureInit({////{{{
    name: 'prod_with_smalllot',
	config: 'prod_with_smalllot',
	caption: '兵士を少量ずつ訓練する',
	group: 'sol',
	options: {prod_with_smalllot_num: 'prod_with_smalllot_num'},
	configSettings: {
		prod_with_smalllot: { default_value: false },
		prod_with_smalllot_num: {
			type: 'textInput', default_value: 100,
			caption: '訓練する最小単位。100人以上。',
			validation: function(value){ return ( /^\d+$/.test(value) && parseInt(value,10) >= 100 ) } ,
		}
	},
    condition: function () { return LPath.unit_confirm },
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;
		$('form#dataForm').find('div.ig_tilesection_btnarea').find('a').eq(0).removeAttr('onclick');
		$('form#dataForm')
		.find('div.ig_tilesection_btnarea').find('a')
		.live('click', function(event){
			if(event.target.alt != "訓練開始") return;	//eq(0)すると何故かliveできないので。
			var village_id = get_villageId();
			var undef;
			if(village_id === undef){
				GM_log('can\'t get villageid ><');
				return;
			};
			var x,y,unit_id,count;
			$('form#dataForm').find('input').each(function(){
				switch ($(this).attr('name')) {
					case 'x': x= $(this).attr('value');break;
					case 'y': y= $(this).attr('value');break;
					case 'unit_id':unit_id= $(this).attr('value');break;
					case 'count':count= $(this).attr('value');break;
				};
			});
			//var u =100;	// 一度に訓練する最低人数
			//if(unit_id == 322 ||unit_id == 326 ||unit_id == 330) u = 100;	// 中級兵3種を50単位にしたいときはここを変更します
			var u = parseInt(self.prod_with_smalllot_num,10) || 100 ;
			//GM_log(u);
			if( !/^\d+$/.test(u) ) u = 100;
			if( u < 100 ) u = 100;
			//GM_log(u);

			if( parseInt(count, 10) < u ){
			}
			
			var div = Math.floor(count / u);
			var mod = count % u;
			var i;
			nowLoading();
			var params = new Array;
			var len;

			if( div > 0 ){
				for(i=1;i<=div;i++){
					var param = new Object;
					param.x = x;
					param.y = y;
					param.unit_id = unit_id;
					param.village_id = village_id;
					if(i==div){
						param.finish = true;
						param.u      = u+mod;
					}else{
						param.finish = false;
						param.u      = u;
					};
					var json = JSON.stringify(param);
					params.push(json);
				};
			}
			else{
				var param = new Object;
				param.x = x;
				param.y = y;
				param.unit_id = unit_id;
				param.village_id = village_id;

				param.finish = true;
				param.u      = mod;

				var json = JSON.stringify(param);
				params.push(json);
			};
			
			for(i=0,len=params.length;i<len;i++){
				(function(param){
					setTimeout(function(){
						var obj = JSON.parse(param);
						// facility.phpへの空打ち
						var data='unit_value%5B'+obj.unit_id+'%5D='+obj.u+'&x='+obj.x+'&y='+obj.y+'&village_id='+obj.village_id+'&create%5B'+obj.unit_id+'%5D=1&send=%E7%A2%BA%E8%AA%8D';
						var sendurl = '/facility/facility.php?x=' + obj.x + '&y=' + obj.y;
						var confurl = '/facility/unit_confirm.php';
						$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, { url: confurl, data: data, }));
						// 応答を待ってから本番の生産依頼
						data='x='+obj.x+'&y='+obj.y+'&unit_id='+obj.unit_id+'&count='+obj.u+'&btnsend=true';
						$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, { url: sendurl, data: data, }));
						if(obj.finish){
							location.href= sendurl;	// 完了したら兵舎画面に戻す
						};
					}, i * 1000);
				})(params[i]);
			}
		});
	
		function request_production(x,y,unit_id,u,village_id,finish){
			//GM_log('called u: ' + u +' finish:' + finish);
			return;
			// 念のため空打ち
			var data='unit_value%5B'+unit_id+'%5D='+u+'&x='+x+'&y='+y+'&village_id='+village_id+'&create%5B'+unit_id+'%5D=1&send=%E7%A2%BA%E8%AA%8D';
			var sendurl = '/facility/facility.php?x=' + x + '&y=' + y;
			var confurl = '/facility/unit_confirm.php';
			$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, { url: confurl, data: data, }));
			// 応答を待ってから本番の生産依頼
			data='x='+x+'&y='+y+'&unit_id='+unit_id+'&count='+u+'&btnsend=true';
			$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, { url: sendurl, data: data, }));
			if(finish){
				location.href= sendurl;	// 完了したら兵舎画面に戻す
			};
		}
		
		// 現在の拠点IDを取得
		function get_villageId(){
			// 現在の拠点名を取得
			var currentname = $('.sideBoxInner.basename')
				.find('span').eq(0)
				.text().replace(/^\s+|\s+$/g, '');
			var currentid;
			// 拠点名と拠点IDの対応表を作成
			$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, {
				url: '/user/', 
				success: function (html){
					$(html).find('.common_table1.center').find('.fs14').each(function() {
						var anc = $(this).find('td').eq(1).find('a');
						var village_name = anc.text().replace(/^\s+|\s+$/g, '');
						var village_id   = anc.attr('href').match(/village_change\.php\?village_id=(\d+)$/);
						if(currentname == village_name){
							currentid = village_id[1];
						}
					});
				},
			}));
			return currentid;
		}
	}
});////}}}

//******************************************************************************
/** 部隊全般：戻るボタン修正
* 戻るボタンがフェードするように修正 */
//------------------------------------------------------------------------------
// function fade_button_check()
Moko.DeckGoBackButtonModifier = FeatureInit({////{{{
	name: 'DeckGoBackButtonModifier',
	condition: function () { return LPath('set_unit_list', 'unit_list', 'deck_card_delete') },
	//------------------------------------------------------------------------------
	run: function () {
		$('IMG[alt="戻る"]').attr('style','opacity: 1;').attr('class','fade');
	}
});////}}}

//******************************************************************************
/** 部隊選択のリンクを通常のリンクに変更【テスト中】 */
//------------------------------------------------------------------------------
Moko.DeckUnitSelectLinkToHREF = FeatureInit({
	//enable: DEV_MODE,
    name: 'DeckUnitSelectLinkToHREF',
	config: 'deck_unit_select_link_to_href',
	caption: '部隊選択のリンクを通常のリンクに変更【テスト中】',
	configSettings: {
		deck_unit_select_link_to_href: { default_value: false }
	},
	group: 'deck',
    condition: function () { return LPath.deck },
    //------------------------------------------------------------------------------
    run: function () {
		$('#ig_unitchoice li:lt(5)').each(function(idx){
			$(this).children('a:eq(0)')
			.click(function(){
				var p = $('#assign_form #p').val() || 1 ;
				location.href = sprintf('/card/deck.php?ano=%s&p=%s',idx,p);
				return false;
			})
		})
	}
});

//******************************************************************************
/** 部隊全般：簡易兵士編成リンクを100件に（TODO） */
//------------------------------------------------------------------------------
//function set_unit_default_check()
Moko.OrganizerMaxDeal = FeatureInit({////{{{
	name: 'OrganizerMaxDeal',
	condition: function () { return LPath('deck', 'unit_list', 'deck_card_delete', 'unit_status') },
	//------------------------------------------------------------------------------
	run: function () {
		//$('A[href="/facility/set_unit_list.php"]').attr('href','/facility/set_unit_list.php?show_num=100');
	}
});////}}}

//******************************************************************************
/** 部隊編成：出品中を暗色表示 */
//------------------------------------------------------------------------------
Moko.DarkColorizeUndertradingCaptain = FeatureInit({
    name: 'DarkColorizeUndertradingCaptain',
	config: 'dark_colorize_undertrading_captain',
	caption: '出品中を暗色表示',
	group: 'deck',
    condition: function () { return LPath.deck },
	ready: function(){
		$(document).bind('MokoEvent_PagerPaged', this.update.bind(this) )
		this.update();
	},
    //------------------------------------------------------------------------------
    update: function () {
		$('.ig_deck_smallcardarea:contains("出品中は兵編成できません")').css({opacity:0.5})
	}
});

//******************************************************************************
/** 部隊編成：兵編成：兵編成支援 */
//------------------------------------------------------------------------------
Moko.UnitOrganizerAssistant = FeatureInit({
	name: 'UnitOrganizerAssistant',
	config: 'unit_organizer_assistant',
    caption: '部隊編成の兵編成支援',
	group: 'deck',
    condition: function () { return LPath.set_unit },
    //------------------------------------------------------------------------------
    run: function () {
		var $setOneSoldierAll = $('<input type="button" value="全兵1">')
		.click(function(){
			$('#team_cntchange :input[id^="unit_count_arr["]').val(1);
			return false;
		})
		.insertAfter('.ig_soldier_runbtn a:last');

		var $setSameSoldierTypeAll = $('<input type="button" value="同兵種">')
		.click(function(){
			var solTypeno = $('#team_job [id="unit_id_arr[0]"]').val();
			$('#team_job :input[id^="unit_id_arr["]').val(solTypeno);
			return false;
		})
		.insertAfter('.ig_soldier_runbtn a:last')
	}
});

//******************************************************************************
/** 部隊編成：レベルアップ：極振り支援 */
//------------------------------------------------------------------------------
Moko.ConvergedStatusUpgrade = FeatureInit({////{{{
    name: 'ConvergedStatusUpgrade',
	group: 'deck',
	config: 'converged_status_upgrade',
	caption: 'ステータス上昇時の極振り支援',
    condition: function () { return LPath.status_info },
    //------------------------------------------------------------------------------
	STATUS_NAMES: [ '攻撃', '防御', '兵法' ],
    run: function () {
		var self = this;
		var $statusTbl = $('#status_table');
		var $upgradeHeader = $statusTbl.find('tr:eq(0) th:contains("ステータスポイント")');
		var $pointRows = $statusTbl.find('tr:gt(1)');
		$upgradeHeader.attr('colspan', function(idx, span){return span.toInt() + 1});
		var $restPoint = $('.common_table2 td:contains("未使用ステータスポイント")+td');
		$statusTbl.find('tr:eq(1)').append('<th>極振り</th>');
		var isAllZero = !$pointRows
		.filter(function(){ return $(this).find('td:last').text().toInt()})
		.size();

		// 極振りボタンを追加
		$pointRows.each(function(idx){
			var $row = $(this);
			var $upgradePoint = $row.find('td:last');
			var $td = $('<td>');
			var $btn = $('<input>',{type:'button', value: self.STATUS_NAMES[idx]+'極',disabled:true});
			if( isAllZero || $row.find('td:last').text().toInt() ){
				$btn.prop('disabled', false);
			}
			$btn.appendTo($td);
			$td.appendTo($row);

			// 極振りボタンのイベント
			$btn.click(function(){
				var $upgradeBtn = $btn.closest('td').prev().prev().prev().find(':button');
				var beforeRestPoint;
				// ポイントを使い切るまでボタンを押す
				(function(){ var onemore = arguments.callee;
					beforeRestPoint = $restPoint.text();
					$upgradeBtn.fireEvent('click');
					setTimeout(function(){
						// 何等かの原因で値が変更していないときは強制離脱
						if( beforeRestPoint == $restPoint.text() )
							return;
						if( $restPoint.text().toInt() )
							onemore();
					}, 100 );
				})();
			});
		});
	}
});////}}}

//******************************************************************************
/** 部隊編成：待機武将一覧ワイド表示 */
//------------------------------------------------------------------------------
Moko.WideDeckDisplay = FeatureInit({////{{{
    name: 'WideDeckDisplay',
	config: 'wide_deck_display',
	caption: '待機武将一覧ワイド表示',
	detail: '枠を外して画面いっぱいまで表示する。HDなら7枚くらい',
	group: 'deck',
	options: { useAjaxPager: 'pager_ajax' },
	configSettings: {
		wide_deck_display: { default_value: false }
	},
	//priority: PRIO_LATE,
    condition: function () { return LPath.deck || LPath.union_levelup },
    //------------------------------------------------------------------------------
    run: function () {
		GM_addStyle(''+<><![CDATA[
		#ig_decksection3 {
			position:absolute;
			width:100%;
			left:0;
			background:#000;
			-moz-box-sizing:border-box;
			border:solid 2px #cac0b0;
		}
		#ig_decksection3 .ig_decksection_top {
			background:#000;
		}
		#ig_decksection3 #ig_deck_cardlistmenu {
			margin:0 0 8px 16px !important;
			display: inline-block !important;
			vertical-align:top;
		}
		#ig_decksection3 #favoritebox {
			display: inline-block !important;
			margin: 0 0 8px 16px !important;
			vertical-align:top;
		}
		#ig_decksection3 .cardstockchange {
			margin:0;
			margin-left:15px;
		}
		#ig_decksection3 .ig_imgtop { display: none }
		#ig_decksection3 .pager.cardstock { padding-left:0;padding-right:0;width:440px; }
		]]></>);

		if( this.useAjaxPager ){
			this.replaceDeckPager();
			$(document).bind('MokoEvent_PagerPaged', this.replaceDeckPager );
		}
	},

	replaceDeckPager: function(){
		var $pagerList = $('div.cardstockchange ul.pager:eq(0)').clone().empty();
		var currPage = $('#p').val().fetchNum();
		var lastNum = IXA_getDeckPagerLastPage();
		$R(1,lastNum).each(function(page){
			var $li = $('<li>');
			if( currPage == page ){
				$li.append($('<span>',{text:' '+page}));
			}
			else {
				$('<a href="javascript:void(0)" class="ixamoko_deckpager">').attr('page',page).text(' '+page).appendTo($li);
			}
			$pagerList.append($li);
		});
		$pagerList.replaceAll('div.cardstockchange ul.pager');
	}
});////}}}

//******************************************************************************
/** 部隊編成：全部隊解散 */
//------------------------------------------------------------------------------
//function all_dissolution()
Moko.UnitDeck_AllDissolution = FeatureInit({////{{{
	name: 'UnitDeck_AllDissolution',
	config: 'all_dissolution',
	group: 'deck',
	caption: '全部隊解散',
	priority: PRIO_LATE,
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var tmp = '<li><a href="javascript:void(0);" onclick="return false;" id="deck_dissolution">'
		+'<img src="'+IMAGES.btn_all_breakup+'" alt="全部隊解散" style="position: relative; top: -4px; "></a></li>';
		$('ul#ig_unitchoice').find('li:last').before(tmp);
		$('#deck_dissolution').live('click',function() {
			if(!confirm("全部隊を解散しますか？\n(解散すると武将は、HPが減った状態で待機へ戻されます)")) return;
			var butaiNum = jQuery('#ig_unitchoice li a[onclick^="selectAssignNo"]')
				.filter(function(v){ return jQuery(this).text() != '[---新規部隊を作成---]' })
				.add('#ig_unitchoice li.now')
				.length
			;
			nowLoading( butaiNum );
			var p = $('#p').attr('value');
			self.deck_dissolution(butaiNum-1,'','',p);
		});
	},

	deck_dissolution: function (select_assign_no,unit_assign_id,unset_unit_squad_id,p) {
		var self = this;
		if(select_assign_no>4 || select_assign_no < 0) {
			location.href='/card/deck.php';
			return;
		}
		var work_id='';
		var w_null='';
		var data = {
			select_assign_no      : select_assign_no,
			unit_assign_id        : unit_assign_id,
			unset_unit_squad_id   : unset_unit_squad_id,
			change_unit_squad_id  : w_null,
			dungeon_unit_squad_id : w_null,
			dungeon_card_id       : w_null,
			dungeon_select        : w_null,
			deck_mode             : 'nomal',
			p                     : p
		};

		$.post('/card/deck.php', data)
		.done(function (html){
			if($(html).find('img[alt^="解散"]').attr('alt')==undefined) {
				select_assign_no--;
				self.deck_dissolution(select_assign_no,unit_assign_id,unset_unit_squad_id,p);
				return;
			} else {
				work_id = $(html).find('img[alt^="解散"]').parent().attr('onclick').toString().split(',');
			}
			unit_assign_id = work_id[0];
			unit_assign_id=unit_assign_id.replace("function onclick(event) {\n",'');
			unit_assign_id=unit_assign_id.replace('confirmUnregist\(','');
			unit_assign_id=unit_assign_id.replace(/\s|'|"/g,'');
			unset_unit_squad_id=work_id[1].replace(/'|"/g,'');
			countUpProgress();
			self.deck_dissolution(select_assign_no,unit_assign_id,unset_unit_squad_id,p);
		});
	}
});////}}}

//******************************************************************************
/** 部隊編成：全部隊配置 */
//------------------------------------------------------------------------------
Moko.AssignAllUnit = FeatureInit({////{{{
	name: 'AssignAllUnit',
	config:'all_deck_setting',
	group: 'deck',
	caption: '全部隊配置',
	priority: PRIO_LATE,
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	ready: function () {
		var self = this;
		var tmp = '<li><a href="javascript:void(0);" onclick="return false;" id="all_set">'
			+'<img src="'+IMAGES.btn_all_setting+'" alt="全部隊配置" style="position: relative; top: -4px; ">'
			+'</a></li>';

		$('ul#ig_unitchoice').find('li:last').before(tmp);

		$('#all_set').live('click',function() {

			if(!confirm("全部隊を配置しますか？\n(現在のソート順で配置可能な武将から順次配置されます)")) return;
			nowLoading();

			var villageID = $('#assign_form #select_village option:selected').attr('value');

			self.assignUnit($("body#deck"), /**unitNo*/0, villageID);
		});
	},
	//------------------------------------------------------------------------------

	/** 部隊1から順に、配置可能なカードを検索しながら、配置できなくなるまですべて配置する
	* @param {jQueryElement} html   デッキのエレメント
	* @param {Int}           unitNo 配置する部隊番号（0から始まる）
	*/
	assignUnit: function (html, unitNo, villageID) {
		var self = this;

		if(unitNo > 4){
			location.href='/card/deck.php';
			return;
		}

		//console.log('部隊# '+ unitNo + ' のページを取得' );

		// 配置先部隊のページを取得するためのフォームデータ
		var formData = {} ;
		$('form#select_assign_form input[type="hidden"]', html).each(function(){
			formData[$(this).attr('id')] = $(this).val();
		});
		$.extend(formData, {
			select_assign_no: unitNo ,
			deck_mode: "nomal"
		});

		$.ajax({
			type: "POST", url: '/card/deck.php', data:formData, cache: false,

			success: function (responceHtml){

				//console.log('取得成功');

				// 配置済み武将を確認
				var assignedSlotNum = $('.ig_deck_maincardarea > div.battlegage', responceHtml ).length ? 1 : 0;
				if( assignedSlotNum ){
					assignedSlotNum += $('.ig_deck_subcardarea > div.battlegage', responceHtml ).length;
				}

				//console.log('部隊# '+ unitNo +' の武将は '+ assignedSlotNum +' 人');

				// 武将数が4を超えたらこの部隊はこれ以上配置できないので次の部隊へ
				if( assignedSlotNum >= 4 ){
					//console.log( assignedSlotNum+ ' 人 なので次の、部隊# '+ ( unitNo + 1 ) +' に');
					self.assignUnit( responceHtml, unitNo + 1, villageID )
					return;
				}
				// 配置武将が 1 つ以上あるが、「解散」ボタンがない場合は何らかの理由で配置できない
				else if( assignedSlotNum > 0 && $('img[alt="解散"]', responceHtml).length == 0 ){
					//console.log( assignedSlotNum+ ' 人 だけど、解散ボタンがないので次の '+ ( unitNo + 1 ) +' に');
					self.assignUnit( responceHtml, unitNo + 1, villageID )
					return;
				}

				// 部隊一つを構築
				self.registSquad(responceHtml, /*startSlot*/assignedSlotNum+1, /*pageIndex*/1, unitNo, villageID);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log('取得失敗…');
				////console.log(textStatus);
			}
		});
	},

	/** 一部隊構築
	* @param {jQuery} html              HTML DOM
	* @param {Int}    startSlot         配置を開始するスロット番号（1～4）
	* @param {Int}    pageIndex         表示中のページ
	* @param {Int}    s_assign_no       配置先の部隊番号（0～4）
	*/
	registSquad: function (html, startSlot, pageIndex, unitAssignNo, villageID) {

		var self = this;

		// 4人登録したら次へ
		if( startSlot > 4 ){
			//console.log( '部隊番号 '+ unitAssignNo+ ' は ' + startSlot +' 人目なので次の部隊に' );
			self.assignUnit( html, unitAssignNo + 1, villageID);
			return;
		}

		//console.log( pageIndex+ 'ページの武将を探して、部隊番号 '+ unitAssignNo+ ' の ' + startSlot +' 番目のスロットに追加します' );

		// 部隊ID
		var set_squad_id = '';
		// 配置番号
		var set_assign_id = '';

		var w_null='';

		// カードページの最後のページ
		//↓取り方が悪かった。
		//var pageNumbers =
		//	$('.cardstockchange.clearfix ul.pager.cardstock:eq(0) > li' )
		//		.filter(function(){ return /^\d+$/.test( $.trim( $(this).text() ) ) })
		//		.map(function(){ return $(this).text().trim().toInt() })
		//;
		//pageNumbers.push(1);
		//var maxPageNumber = pageNumbers.length ? Math.max.apply( null, pageNumbers ) : 1 ;
		var maxPageNumber = IXA_getDeckPagerLastPage();

		//console.log('最終ページ：'+maxPageNumber );

		var canAdding = false ;

		$('.ig_deck_smallcardarea img[title="選択中の部隊へ"]', html).each(function(){
			var unit_button_img = $(this);
			if(unit_button_img.attr('src')!=undefined) {
				var onclickString = unit_button_img.parent().attr('onclick').toString();
				var work_id = onclickString.replace(/^\s*\w+\s*\(\s*|\).*$/g,'').split(',');
				/*
					onclick="confirmRegist('3333333', '5555555', 1, 4);"
					0: 配置先部隊ID。部隊が空の場合は '' 。
					1: この武将の固有ID
					2: 配置先のスロット番号。（部隊長は '0' ）
					3: 不明。常に4？
				*/
				set_squad_id  = $.trim(work_id[1]).replace(/\'|\"/g,'');
				set_assign_id = $.trim(work_id[0]).replace(/\'|\"/g,''); //配属先IDの元
				//console.log( '"'+set_squad_id+'"', '"'+set_assign_id+'"' );
				canAdding = true;
				return false;
			}
		});

		// 配置可能なカードが見つかった場合
		if(canAdding) {

			//console.log('配置先ID: '+ set_assign_id );

			var formData = {} ;
			$('form#deck_file input[type="hidden"]', html).each(function(){
				formData[$(this).attr('id')] = $(this).val();
			});
			$.extend(formData, {
				mode             : 'assign_insert',
				set_assign_id    : set_assign_id,
				set_squad_id     : set_squad_id,
			});

			if( $('#assign_form #select_village', html).length && !formData['set_village_id'] ){
				// 配置先の拠点を現在表示中のページから取得
				villageID = villageID || $.trim( $('#select_village option:selected', html).attr('value') );
				// 未選択は現在の所領
				if( !villageID ){
					var villageName = $.trim($('.sideBoxInner.basename ul li.on', html ).text());
					villageID = $('#select_village > option', html).first(function(){return $(this).text() == villageName }).attr('value');
					// それでもなければ本領
					if( !villageID ){
						villageID = $('#select_village > option', html).eq(1).attr('value');
					}
				}
				formData['set_village_id'] = villageID;

				if( !formData['set_village_id'] )
					throw( new Error('拠点IDを取得できません') );
			}

			//console.log('カードを登録中');

			$.ajax({
				type: "POST", url: '/card/deck.php', data: formData, cache: false,
				success : function (responceHtml){
					//console.log('登録成功');
					self.registSquad(responceHtml, startSlot + 1, pageIndex, unitAssignNo, villageID);
				},
				error   : function (XMLHttpRequest, textStatus, errorThrown) {
					//console.log('登録失敗');
					////console.log(textStatus);
				}
			});
		}
		// 配置可能なカードがなかった場合
		else{

			// 最終ページを超えたら配置可能な武将はいないので再帰を抜ける
			if( pageIndex + 1 > maxPageNumber ){
				//console.log('最終ページを超えたので処理を抜ける');
				location.href = '/card/deck.php';
				return;
			}

			// ページ番号を繰り上げて同じ処理を繰り返す
			//console.log('見つからなかったのでページ '+(pageIndex + 1)+' へ。');

			var pagerFormData = {} ;
			$('form#pager_fm input[type="hidden"]', html).each(function(){
				pagerFormData[$(this).attr('id')] = $(this).val();
			});
			$.extend(pagerFormData, {
				ano: unitAssignNo,
				dmo: 'nomal',
				p  : pageIndex + 1,
			});

			$.ajax($.extend({}, AJAX_ASYNC_NOCACHE_POST, {
				url: '/card/deck.php', data: pagerFormData,
				success : function (responceHtml){
					//console.log('ページ切り替え成功');
					//console.log($('.pager.cardstock:eq(0)>li>span', responceHtml).text());
					//console.log($('img[title="選択中の部隊へ"]', responceHtml).length);
					self.registSquad(responceHtml, startSlot, pageIndex + 1, unitAssignNo, villageID);
				},
				error   : function (XMLHttpRequest, textStatus, errorThrown) {
					//console.log('ページ切り替え失敗');
					////console.log(textStatus);
				}
			}));
		}

		return;
	}
});////}}}

//******************************************************************************
/** 部隊編成：部隊戦力表示 */
//------------------------------------------------------------------------------
Moko.UnitPowerView = FeatureInit({////{{{
	name: 'UnitPowerView',
	config: 'displayUnitPower',
	group: 'deck',
	caption: '部隊戦闘力を表示',
	condition: function () { return LPath.deck },
	style: ''+<><![CDATA[
		table.tablesorter.moko-unitpower th{padding:3px 6px;}
		table.tablesorter.moko-unitpower td{padding:1px 6px;}
	]]></>,
	//------------------------------------------------------------------------------
	run: function () {
		if(location.pathname != "/card/deck.php") return;

		var unitKey = SOLDIER_TYPE_KEY_TO_SOLDIER_NAME;
		var rank    = COMMAND_RANK_TO_RATE;

		var attack_power = 0, defense_power = 0, destruct_power = 0 ;
		var movements = [];
		var tactics = [];
		[1,2,3,4].each(function(val, idx){
			$('div[id^="ig_decksection"] #id_deck_card'+val+'_front .parameta_area').each(function(){
				var $this = $(this);
				// 武将ステータス
				var stats_att = $this.children('.ig_card_status_att').toNum();
				var stats_def = $this.children('.ig_card_status_def').toNum();
				var stats_int = $this.children('.ig_card_status_int').toNum();
				// 現在兵士数、兵種
				var sol_no    = $this.find('.commandsol_no span[id^="card_commandsol_cnt_"]').toNum();
				var sol_type  = $this.children('.ig_card_cardno + span[id^="card_commandsol_"]').attr('class');
				sol_type = sol_type.replace(/^commandsol_/,'');
				sol_type = unitKey[sol_type];
				var power_seeds = {
					attack  : stats_att, defence : stats_def, interi  : stats_int,
					sol_type: sol_type, sol_no  : sol_no
				};
				var rate = {};
				rate.t1 = rank[ $this.children('.yari').attr('class').replace(/^yari lv_/,"")  ];
				rate.t2 = rank[ $this.children('.kiba').attr('class').replace(/^kiba lv_/,"")  ];
				rate.t3 = rank[ $this.children('.yumi').attr('class').replace(/^yumi lv_/,"")  ];
				rate.t4 = rank[ $this.children('.heiki').attr('class').replace(/^heiki lv_/,"") ];
				var unit_data = SOLDIER_DATA[sol_type];
				var commandRate = ( rate[ unit_data.tp1 ] + rate[ unit_data.tp2 ] ) / 2;
				attack_power  += ( unit_data.off * sol_no + stats_att ) * commandRate ;
				defense_power += ( unit_data.def * sol_no + stats_def ) * commandRate ;
				destruct_power+= ( unit_data.des * sol_no ) ;
				movements.push( unit_data.mov );
				tactics.push( stats_int );
				//console.log( '#'+val +', '+  'R:'+commandRate +', '+  '兵:'+sol_no+'(x'+unit_data.off+'/'+unit_data.def+')' +', '+  '将:'+stats_att+'/'+stats_def );
			});
		});

		var movement = Math.min.apply( undefined, movements );
		
		tacticsPower = 0;
		new function(){
			tactics.sort(function(a,b){ return b - a });
			var tacticsMax = tactics.shift();
			tactics.each(function(v){ tacticsPower += v });
			tacticsPower = Math.floor( (tacticsPower/6 + tacticsMax ) / 10 );
			tacticsPower /= 10;
		}

		attack_power  = Math.floor(attack_power );
		defense_power = Math.floor(defense_power);
		var sec_per_sq = ( 3600 / movement );
		var sps_sec = sec_per_sq % 60 ;
		var sps_min = Math.floor( sec_per_sq / 60 );

		var tmpl = ''+<><![CDATA[
			<h5 style="margin-bottom:4px;">部隊戦力</h5>
			<table class="tablesorter moko-unitpower no_mb" style="width: 100%">
				<tr><th>攻撃</th><td>${attack}</td> <th>防御</th><td>${defense}</td></tr>
				<tr><th>破壊</th><td>${destruct}</td> <th>兵法</th><td>＋${tactics}<small> ％<small></td></tr>
				<tr><th>移動</th><td colspan="3">${movement} （${sps_min}分${sps_sec}秒/<small>マス</small>）</td></tr>
			</table>
		]]></>;
		var table = $.tmpl(tmpl, {
			attack:attack_power,
			defense: defense_power,
			destruct: destruct_power,
			tactics: tacticsPower,
			movement: movement,
			sps_min: sps_min,
			sps_sec: Math.floor(sps_sec)
		});
		var panel = $('<div id="ixamoko-unitpower">').append(table);
		panel.appendTo('#ig_bg_decksection1right')
			.css({position:'absolute',bottom:0,right:9,width:242, height:80})
			.css({
				position:'absolute',
				background: '#F5F9E5',
				height: 92, width: 242,
				right: 16, bottom: -8,
				padding: 6,
				'-moz-box-sizing':'border-box',
				borderRadius: '0 6px 6px 0',
			});
			;

	}
});////}}}

//******************************************************************************
/** 部隊編成：デッキでいろいろ
 *  配置拠点、本領をデフォルト
 *  出陣状況→全部隊
 *  「選択中の部隊へ」を上部に
 *///---------------------------------------------------------------------------
Moko.DeckMisc = FeatureInit({////{{{
	name: 'DeckMisc',
	options: {
		//useDefaultHomeSelection: 'def_honjou',
		//useDefaultCurrentSelection: 'deck_check',
		defaultVillageSelection: 'deck_default_village',
	},
	configSettings: {
		deck_default_village: {
			caption: '拠点選択の初期値を', type: 'selectBox',
			optionList: [ '指定しない', '本領', '現在の拠点'],
			caption_after: 'にする',
			default_value: '本領',
		},
	},
	group: 'deck',
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		// 配置拠点、本領をデフォルト
		if ( self.defaultVillageSelection == '本領' ) {
			var value = $('#select_village').children(':selected').attr('value'); // なぜ.val()で取れない2??
			if (value=='') $('#select_village > OPTION:eq(1)').attr('selected', true);
		}
		// 配置拠点、現在の拠点をデフォルト
		else if ( self.defaultVillageSelection == '現在の拠点' ) {
			var t=$('#lordSiteArea').text().replace("選択中の拠点:","");
			$('#select_village > option').each(function(){
				if($(this).text()==t){
					$(this).attr('selected',true);
					return false;
				}
			});
		}

		// 「出陣状況」のリンク先を「全部隊」に変更
		$('A[href="/facility/unit_status.php"]').attr('href', '/facility/unit_status.php?dmo=all');

		// 「選択中の部隊へ」を上部に
		var btnAddCurrUnitFirst = $('.ig_deck_smallcardarea a:has(>IMG[title="選択中の部隊へ"]):first');
		var card = btnAddCurrUnitFirst.clone();
		var bname = btnAddCurrUnitFirst.closest('.ig_deck_smallcardarea').find('.ig_deck_smallcard_cardname').text();

		card.children().css({position:'relative', top:'-7px'}).end().prepend('<SPAN style="position:relative;top:-18px;">'+bname+'</SPAN>');

		$('#ig_unitchoice').append('<LI id="add_this"><LI>');
		$('#add_this').append(card);
		
	   // 部隊スキル移動&変更
	   $('div[id="deck_skill_display"]').css('margin-top', '100px');
	   $('div[id="ig_deckunitdetail"]').css('height', '460px');        
	}
});////}}}

//******************************************************************************
/** 部隊編成（他）：ページャーをAJAX仕様のものに置き換える */
//------------------------------------------------------------------------------
//function desk_pager_replace()
Moko.CardAJAXPager = FeatureInit({////{{{
	name: 'CardAJAXPager',
	config: 'pager_ajax',
	caption: 'ページャーをAjaxに',
	group: 'all2',
	options: { usePagerDeckOnly: 'pager_deck_only_enable' },
	//configSettings: {
	//	pager_deck_only_enable: {
	//		caption: '部隊編成以外のページャを無効にする',
	//		default_value: false,
	//	},
	//},
	condition: LPath.pass(['deck','union_levelup','union_additional','union_remove']),
	ready: function () {

		// // 部隊編成以外のページャーを無効にする
		// if( this.usePagerDeckOnly && !LPath.deck ){
		// 	return;
		// }

		this.readyPager(); this.initPager()
	},
	//------------------------------------------------------------------------------
	//
	// btn_change_flg       : ""

	// add_flg              : 強化：追加した場合"1"、削除の場合 ""
	// base_cid             : 強化：基本の武将ID、スロット空の場合、項目なし
	// added_cid            : 強化：追加の武将ID
	// material_cid[]       : 強化：追加スロット1の武将ID
	// material_cid[]       : 強化：追加スロット2の武将ID
	// material_cid[]       : 強化：追加スロット3の武将ID
	// material_cid[]       : 強化：追加スロット4の武将ID
	// new_cid              : 強化：最後に追加した武将ID、削除時は"" ※1
	// remove_cid           : 強化：削除した武将ID、追加時は"" ※1
	// unset				: 追加：スロット2から削除した場合"1"

	// selected_cid         : 追加：基本スロット1の武将ID
	// unset				: 追加：武将がいないとき"0"、いるときは項目が無い

	// union_type           : 合成の種類 スキル強化"1"、スキル追加"2"、削除"3"、ランクアップ"4"

	// p                    : 1 // ページャのページ（1+）
	// show_deck_card_count : 15	// 表示条件
	// sort_order[]         : 1		// 表示条件
	// sort_order[]         : 0		// 表示条件
	// sort_order[]         : 0		// 表示条件
	// sort_order_type[]    : 0		// 表示条件
	// sort_order_type[]    : 0		// 表示条件
	// sort_order_type[]    : 0		// 表示条件
	//
	// ※1 new_cid と remove_cid は排他
	readyPager: function () {

		$('UL.pager.cardstock').find('A').each(function() {
			// 1つ前へ
			if($(this).attr('title')==''&&$(this).parent().attr('class')!='last') {
				var page = parseInt($('UL.pager.cardstock:eq(0)').find('span').text())-1;
				var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);"><</A>';
				$(this).replaceWith(npage);
			}
			// 最初のページへ
			else if($(this).attr('title')=='first page') {
				var npage = '<A class="ixamoko_deckpager" page="1" href="javascript:void(0);"><<</A>';
				$(this).replaceWith(npage);
			}
			// 各ページへ
			else {
				try {
					var $this = $(this);
					var page = parseInt($this.attr('title').substring(1));
					if (page>0) {
						var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);"> '+page+'</A>';
						$this.replaceWith(npage);
					}
				} catch(e) {}
			}
		});
		$('UL.pager.cardstock').find('li.last').find('a').each(function() {
			// 次へ
			if($(this).attr('title')=='') {
				var page = parseInt($('UL.pager.cardstock:eq(0)').find('span').text())+1;
				var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);">></A>';
				$(this).replaceWith(npage);
			}
			// 最後へ
			else if($(this).attr('title')=='last page') {
				//var script = $(this).attr('onclick').toString();
				var script = this.getAttribute('onclick').toString();
				script = script.substring(script.indexOf('"p"'),script.length);
				script = script.split('=');
				script = script[1].split(';');
				script = script[0].replace(/\s|"/g,'');
				//"p"; input.value = "5"; form.appendChild(input); form.submit(); return false;
				var npage = '<A class="ixamoko_deckpager" page="'+script+'" href="javascript:void(0);" id="lastpage">>></A>';
				$(this).replaceWith(npage);
			}
		});
	},

	initPager: function (initFlag) {
		var self = this;
		if (typeof(this.ajflag)=='undefined') {
			this.ajflag = false;
		}

		var village_option_tag = 'ixamoko_village_opt';

		var data = '';var ano='';var dmo ='';
		var base_cid ='';
		var added_cid ='';
		var union_type='';
		// 部隊編成
		if( LPath.deck ){
			ano = $('#assign_form INPUT[name="select_assign_no"]').val();
			dmo = $('#assign_form INPUT[name="deck_mode"]').val();
		}
		// 合成
		else {
			base_cid = $('#base_cid').val();
			added_cid = $('#added_cid').val();
			union_type = $("*[name=union_type]").val();
		}

		$('A.ixamoko_deckpager').live('click', function(e) {
			if (self.ajflag) return;
			self.ajflag = true;
			var page = $(this).attr('page');
			if(location.pathname == "/card/deck.php"){
				data = {ano:ano, dmo:dmo, myselect:'', p:page};
			} else {
				data = {
					base_cid  :base_cid,
					added_cid :added_cid,
					union_type:union_type,
					p:page
				};
				// スキル追加時の処理
				// 6スレ >>500 の情報
				// ・#base_cid, #added_cidの値を記憶する。
				// ・[name='material_cid[]']って奴の値を記憶する。
				// 　こいつに今追加スロットセットされてる情報が入ってる。複数あり。
				// ・material_cidが一つ以上ある場合、new_cidってのをmaterial_cid[]の最後から取得する。
				//   あった場合はadd_flg=1に。
				// ・[name=union_type]って奴の値を記憶する。
				// ・postするときに、base_cid,added_cid, new_cid, add_flg, union_type, p, material_cid[]を投げる。
				// material_cidは全部じゃなく尻は省いておいてな。尻はnew_cidにいれとくから。
				var material_cids = $('[name="material_cid[]"]').map(function(){
					return $(this).val();
				}).toArray();
				if( material_cids.length ){
					data.material_cid = material_cids;
					// とりあえず、material_cid[] を全部突っ込んどくと問題ない様子
					// 500のいうように追加時に厳密に処理するなら↓
					// data.add_flg = 1;
					// let new_cid = material_cids.pop();
					// data.new_cid = new_cid;
					// data.material_cid = material_cids;
				}
			}
			$.ajax({
				type: "POST", url: location.pathname,
				data:data, cache: false, page: page, dataType: "text",
				success: function(html){
					self.doPaging( html, page )
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					self.ajflag = false;
					//console.log(textStatus);
				}
			});
			return false;
		});
	},
	doPaging: function (html, page){
		var self = this;
		var $new_deck = $(html).find('#ig_deckboxInner #deck_file');
		$('#deck_file').find('#ig_decksection3').replaceWith($new_deck.find('#ig_decksection3'));
		$('DIV[id^="cardWindow_"]').each(function() {
			$(this).remove();
		});
		$(html).find('DIV[id^="cardWindow_"]').each(function() {
			$('div#sidebar').after($(this));
		});
		tb_init('a.thickbox');
		self.readyPager();
		$('INPUT[name="p"]').val(page);
		delete html;
		delete $new_deck;
		self.ajflag = false;
		//disp_ToubatsuRestTime(false);
		// page loaded

		$(document).trigger('MokoEvent_PagerPaged');
	},
});////}}}

//******************************************************************************
/** 部隊編成：部隊の討伐ゲージ回復時間 */
//------------------------------------------------------------------------------
Moko.UnitBGageRestoreTime = FeatureInit({////{{{
	name   : 'UnitBGageRestoreTime',
	config: 'toubatsu',
	group: 'deck',
	caption: '討伐ゲージ時間表示',
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		$('.ig_deck_maincardarea, .ig_deck_subcardarea').find('DIV.battlegage').each(function() {
			var $this = $(this);
			var battlegage = $this.find('SPAN.ig_deck_battlepoint').text();

			if (battlegage=='') return;

			var bg_value = parseInt(battlegage); //無駄

			var passage = (bg_value<300) ? 300
				: (bg_value < 400 ) ? 400 : 500;

			var rest_point = passage - bg_value;
			var timeText = IXA.getLackBGageRestoreTime( rest_point );
			var dayText = caddDate(new Date(), timeText);
			var txt = "<DIV style='position:relative;top:-10px;opacity:0.9;z-index:1000;background-color:#fff;color:#000;'>"
				+passage+"まで" + timeText + "後(" + dayText + "完了)</DIV>";
			$this.prepend(txt);
		});
	}

});////}}}

//******************************************************************************
/** 部隊編成：待機武将の討伐ゲージ回復時間表示 */
//------------------------------------------------------------------------------
Moko.CardBGageRestoreTime = FeatureInit({////{{{
	name : 'CardBGageRestoreTime',
	config: function(cfg){ return cfg['toubatsu'] },
	group: 'deck',
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		$(document).bind('MokoEvent_PagerPaged', this.update.bind(this) )
		
		this.update();
	},
	update: function () {
		// 待機武将の一覧のループ
		$('#ig_deck_smallcardarea_out DIV.ig_deck_smallcardarea').each(function() {
			var $this = $(this);
			var battlegage = $this.find('SPAN.ig_deck_battlepoint2').text();
			if (battlegage=='') return;
			var tb = 300 - parseInt(battlegage);

			if( tb != 0 ) {
				var timeText = IXA.getLackBGageRestoreTime( tb );
				var dayText = caddDate(new Date(), timeText);
				var txt = "<DIV>300まで" + timeText + "後(" + dayText + "完了)</DIV>";

				$this.children(':eq(2)').prepend(txt);
			}
		});

	}
});////}}}

//******************************************************************************
/** 部隊編成：待機武将のHP回復時間表示 */
//------------------------------------------------------------------------------
Moko.CardHPRestoreTime = FeatureInit({////{{{
	name : 'CardHPRestoreTime',
	caption: 'HP回復時間表示',
	config: 'refillhp',
	group: 'deck',
	options: {
		useHideUnsetNotice: 'deck_hide_unset_notice',
		useInjuredBacklight: 'deck_injured_hp_backlight',
	},
	configSettings: {
		deck_hide_unset_notice: { caption: 'HP全回復まで...を非表示【テスト中】', default_value: false },
		deck_injured_hp_backlight: { caption: '負傷武将のHP欄を強調【テスト中】', default_value: false },
	},
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		$(document).bind('MokoEvent_PagerPaged', this.update.bind(this) )
		this.update();
	},
	update: function () {
		var self = this;
		// 待機武将の一覧のループ
		$('#ig_deck_smallcardarea_out').find('DIV.ig_deck_smallcardarea').each(function() {
			var $this = $(this);

			var $hpRow = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(2)');
			var currentHPrate = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(2) TD').text();
			var currentHP = parseInt(currentHPrate.substring(0, currentHPrate.indexOf('/')));

			if (currentHP<100) {
				var ranklvl = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(1) TD').text();
				var rank = parseInt(ranklvl.substring(1, 2));
				var lvl = parseInt(ranklvl.substring(3));
				var timeText = IXA.getMaxHPRestoreTime(currentHP, rank, lvl);
				var dayText = caddDate(new Date(), timeText);
				var txt = "HP100まで" + timeText + "後(" + dayText + ")";

				//HP全回復まで... を非表示
				if( self.useHideUnsetNotice ){
					$this.children(':eq(2)').textNodes().each(function(){
						if( /\(HP全回復まで/.test($(this).text()) ){
							$(this).remove();
						}
					});
				}

				// 負傷武将のHP背景色変更
				if( self.useInjuredBacklight ){
					$hpRow.css({ background: '#800' });
				}

				$hpRow.attr('title', 'あと '+timeText.replace(/^0+:/,'') );
				$this.children(':eq(2)').prepend($('<div>').text(txt));
				//alert(internal_lvl);
			}
		});

	}
});////}}}

//******************************************************************************
/** 部隊編成：お気に入り部隊 */
//------------------------------------------------------------------------------
Moko.FavoriteUnitPack = FeatureInit({////{{{
	name: 'FavoriteUnitPack',
	config: 'hold_butai',
	group: 'deck',
	caption: 'お気に入り部隊編成登録',
	condition: function () { return LPath.deck },
	ready: function () { return this.attachUnitPackUI() },
	//------------------------------------------------------------------------------

	// 複数の部隊リストを順次追加する
	beginSequencialUnitPackAssignment: function () {////{{{
		if($('#select_village2').children(':selected').attr('value')==''){
			alert('部隊の所属が未設定です');
			return;
		}

		// 部隊リスト読み込み
		var packList = {};
		if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
			packList = mokoStorage.getJSON("ixakaizou_butai_list_id");
		}

		// var packs = [];
		// $('#ixamoko-unitpack-table tbody td:first-child :checkbox:checked').each(function(){
		// 	var $checked = $(this);
		// 	var packName = $checked.val();
		// 	var packConfig = packList[packName];

		// 	// 部隊タイプ使わないので削除
		// 	packConfig.replace(/^\d,/, '');

		// 	var squadList = packConfig.split(',');
		// 	var squadIDs = [];
		// 	squadList.each(function(v){
		// 		var t;
		// 		if( t = v.split(':') ){
		// 			if( !/^\d+$/.test(t[1]) )
		// 				throw(new Error('Invalid ID: '+t[1]));
		// 			squadIDs.push(t[1]);
		// 		}
		// 	})
		// 	if( squadIDs.length){
		// 		packs.push(squadIDs);
		// 	}
		// });

		// // チェック外す
		// $('#ixamoko-unitpack-table tbody td:first-child :checkbox:checked')
		// .prop('checked',false);

		// if(packs.length) {
		// 	alert('部隊が選択されていません');
		// 	return;
		// }

		// var assignNum=1;
		// $('a[onclick^="selectAssignNo"]').each(function(){
		// 	if($(this).text()=='[---新規部隊を作成---]') assignNum++;
		// });
		// assignNum = 5 - assignNum;

		// nowLoading();
		// this.assignSeqUnitPack(assignNum,true);

		// // ---- 旧ルーチン ---
		var j=0;
		var c=0;
		for(i in packList) {
			if( $('#d'+c).prop('checked') ) {
				j++;
			}
			c++;
		}
		if(j==0) {
			alert('部隊が選択されていません');
			return;
		}
		c=0;
		for(i in packList) {
			$('#d'+c).attr("disabled","disabled");
			c++;
		}
		var assignNum=1;
		$('a[onclick^="selectAssignNo"]').each(function(){
			if($(this).text()=='[---新規部隊を作成---]') assignNum++;
		});
		assignNum = 5 - assignNum;
		$('#butai_all_set').attr("disabled","disabled");
		nowLoading();
		this.assignSeqUnitPack(assignNum,true);
	},////}}}

	// 武将ID のリストから部隊に配置
	assignUnitPack: function (////{{{
		list, // 武将ID のリスト
		squadNum, // 小隊番号？
		curPage, // 現在のページ
		maxPageNumber, // ページャーの最終ページ
		s_assign_no, // 部隊番号
		w_select_village, // 拠点ID
		isSequent
	){
		var self = this;
		var set_squad_id = '', set_assign_id = '';
		var w_deck_mode = $('#deck_mode').attr('value');
		var w_null='';

		//console.log( list, squadNum, curPage, maxPageNumber );

		// 配置できない場合、該当部隊を表示 【？】
		if(
			squadNum > 4
			|| !list[squadNum]
			|| curPage > maxPageNumber
		){
			if( !isSequent ) {
				var w_null = '';
				var data2 = {
					select_assign_no      : s_assign_no,
					unit_assign_id        : w_null,
					unset_unit_squad_id   : w_null,
					change_unit_squad_id  : w_null,
					dungeon_unit_squad_id : w_null,
					dungeon_card_id       : w_null,
					dungeon_select        : w_null,
					deck_mode             : 'nomal',
					p                     : '1'
				};
				$.form({
					type: 'post',
					url: '/card/deck.php',
					data: data2
				});
				return;
			}
			// isSequent が立っているなら assignSeqUnitPack
			else {
				s_assign_no++;
				this.assignSeqUnitPack(s_assign_no,isSequent);
				return;
			}
		}

		var data = {
			select_assign_no      : s_assign_no,
			unit_assign_id        : w_null,
			unset_unit_squad_id   : w_null,
			change_unit_squad_id  : w_null,
			dungeon_unit_squad_id : w_null,
			dungeon_card_id       : w_null,
			dungeon_select        : w_null,
			deck_mode             : 'nomal',
			p                     : curPage
		};

		// 該当部隊のページを取得
		$.ajax({
			type: "POST", url: '/card/deck.php', data:data, cache: false,
			success: function (html){
				// 配置可能な武将を見つける
				$(html).find('#ig_decksection3 .ig_deck_smallcardarea').each(function() {
					var $smallCardArea = $(this);
					var id=$smallCardArea.find('a[href^="#TB_inline"]').attr('href');
					id = id.replace(/^.*=cardWindow_|\D.*$/g,'');
					//id=id.split('=');
					//id=id[3].replace('cardWindow_','');
					if( id==list[squadNum]
						&& $smallCardArea.find('img[title^="選択中の部隊へ"]').attr('src')
					){
						var work_id = $(this).find('a[onclick^="confirmRegist"]').attr('onclick').toString().split(',');
						set_squad_id = work_id[1].replace(/'/g,'').trim();
						set_squad_id
						set_assign_id = work_id[0];
						return false;
					} else {
						set_squad_id='';
					}
				});
				// 見つかったなら
				if(set_squad_id.length) {
					//set_assign_id=set_assign_id.replace("function onclick(event) {\n",'');
					set_assign_id = set_assign_id
						.replace(/^\s*confirmRegist\s*\(\s*'([^']*)'.*/,'$1')
					;
					//set_assign_id=set_assign_id.replace(' ','');
					//set_assign_id = set_assign_id.replace('\'','');
					var data2 = {
						target_card      : w_null,
						select_assign_no : s_assign_no,
						mode             : 'assign_insert',
						btn_change_flg   : w_null,
						set_village_id   : w_select_village,
						set_assign_id    : set_assign_id,
						set_squad_id     : set_squad_id,
						deck_mode        : 'nomal',
						p                : curPage
					};
					$.ajax({
						type: "POST", url: '/card/deck.php', data:data2, cache: false,
						success: function (html){
							squadNum++;
							curPage=1;
							self.assignUnitPack(list,squadNum,curPage,maxPageNumber,s_assign_no,w_select_village,isSequent);
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							//console.log(textStatus);
						}
					});
				}else{
					curPage++;
					self.assignUnitPack(list,squadNum,curPage,maxPageNumber,s_assign_no,w_select_village,isSequent);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log(textStatus);
			}
		});
	},////}}}

	// お気に入りのリストの上から配置する
	assignSeqUnitPack: function (assignNum, isSequent) {////{{{
		if(assignNum >= 4) {
			isSequent = false;
		}
		var select_assign_no = assignNum;
		var w_select_village = $('#select_village2').children(':selected').attr('value');
		var maxPageNumber = IXA_getDeckPagerLastPage();
		var butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
		var j = 0;
		var card_key = '';
		// 最初のチェックされた部隊のキーを取得し、チェックを外す
		for (i in butai_list) {
			if($('#d'+j).prop('checked')) {
				card_key = $('#d'+j).attr('value');
				$('#d'+j).prop('checked',false);
				break;
			}
			j++;
		}
		// チェックがなければ抜ける
		if(card_key=='') {
			location.href='/card/deck.php';
			return;
		}
		var t=butai_list[card_key].split(',');
		var param_list=new Array();
		for(i=1;i<t.length;i++) {
			var tmp=t[i].split(':');
			param_list.push(tmp[1]);
		}
		this.assignUnitPack(param_list,0,1,maxPageNumber,select_assign_no,w_select_village, isSequent);
	},////}}}

	// お気に入り部隊用のUIを構築
	attachUnitPackUI: function () {////{{{
		var self = this;

		if($('#ig_deck_unititle p:eq(0)').text()=='[------]部隊') {
			// 登録部隊選択UI
			this.attachFavoriteUnitSelecter();
		}
		else {
			// 部隊を登録
			this.attachFavoriteUnitRegister();
		}

		// IXAツールボックスにお気に入り部隊のリンクを追加
		var style = 'margin-left: 6px;padding-bottom: 6px; padding-left: 8px;'
			+'background: url("/img/common/sidebar/icon_off.gif") no-repeat 0 2px;';
		var href = '#TB_inline?height=340&amp;width=665&amp;inlineId=allMapThicbox';
		$.tmpl(
			''+<><![CDATA[
				<li style="{{html style}}">
					<a href="{{html href}}" class="thickbox" title="お気に入り部隊" onclick="return false;">お気に入り部隊</a>
				</li>]]></>,
			{ style: style, href: href }
		).appendTo('#toollist')
		;
		// お気に入り部隊一覧表示
		$("a.thickbox").live("mousedown",function() {
			tb_init('a.thickbox');
			self.structUnitPackList();
		});

	},////}}}

	// お気に入り部隊の一覧を thickbox 内に描画
	////{{{
	tmpl_unitPackList: ''+<><![CDATA[
	<span id="all_map"><p id="b_head"></p>
	<table width="100%" class="common_table1 center" id="ixamoko-unitpack-table">
	<thead>
	<tr>
		<th>選択</th>
		<th>タイプ</th> <th>部隊名</th>
		<th>部隊長</th> <th>小隊長</th> <th>小隊長</th> <th>小隊長</th>
		<th></th>
	</tr>
	</thead>
	<tbody>
	{{if unitPacks.length}}
	{{each unitPacks}}<tr>
		<td><input type="checkbox" value="${$value.unitName}" id="${$value.checkID}"></td>
		<td>${$value.unitType}</td> <td>${$value.unitName}</td>
		<td>${$value.squads[0]}</td> <td>${$value.squads[1]}</td> <td>${$value.squads[2]}</td> <td>${$value.squads[3]}</td>
		<td><input type="button" id="${$value.unitName}" value="消去" class="del_butai"></td>
	</tr>{{/each}}
	{{/if}}
	<tr id="ixamoko-pack-nonentry" style="{{if unitPacks.length}}display:none;{{else}}{{/if}}">
		<td colspan=8>お気に入り部隊は登録されていません</td>
	</tr>
	</tbody>
	</table></span>
	]]></>,
	////}}}

	// お気に入り部隊一覧を作成する
	structUnitPackList: function () {////{{{
		var self = this;
		var butai_list = {};
		var c=0;
		var unitPacks = [];
		if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {

			butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
			Object.each( butai_list, function( unit, key, o ){
				var b_type = '';
				var unitType = '';
				switch(unit[0]){
					case '0': unitType = '攻撃部隊'; break;
					case '1': unitType = '防御部隊'; break;
					case '3': unitType = '秘境部隊'; break;
					default : unitType = '両用部隊'; break;
				}
				var checkID = 'd'+ c ;
				var squads = unit.split(',').slice(1).map(function(v, idx){ return v.replace(/:.*/,'') });
				unitPacks.push({
					unitName: key, checkID: checkID, squads: squads, unitType: unitType
				});
				c++;
			});

		}
		$('#all_map').replaceWith( $.tmpl(this.tmpl_unitPackList, { unitPacks: unitPacks }) );

		// 所属選択を画面からクローンして配置
		var villageSelecter = $('.ig_deck_unitdata_assign.deck_wide_select:has(#select_village)').clone();
		if(villageSelecter.length){
			villageSelecter.find('#select_village')
				.attr('name','select_village2')
				.attr('id','select_village2');
			$('#b_head')
				.append(villageSelecter)
				.append('<input type=button value="選択部隊をデッキへセット" id="butai_all_set">');
			$('#butai_all_set').live("click",function() {
				self.beginSequencialUnitPackAssignment();
			});
		}

		// 削除ボタンのアクション
		$('.del_butai').live("click",function() {
			var butai_list = {};
			var $this = $(this);
			var deletedID = $this.attr('id');
			butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
			delete butai_list[deletedID];
			$this.parents('tr:eq(0)').remove();
			localStorage.setItem('ixakaizou_butai_list_id', JSON.stringify(butai_list));
			if( !Object.getLength(butai_list) )
				$('#ixamoko-pack-nonentry').show();
		});
	},////}}}

	// 部隊登録ボタン
	attachFavoriteUnitRegister: function (){////{{{
		var self = this;
		
		var butai_nm = $('#ig_deck_unititle').find('p:eq(0)').text().replace('[','');
		butai_nm = butai_nm.replace(/]部隊$/,'部隊');
		var tmp = ''+<><![CDATA[
		<div>
			<span style="color:#000">部隊名:</style><input type=text value="${unitName}" maxlength=8 size=15 id="b_name"><select id="b_type">
				<option value=0>攻撃</option><option value=1>防衛</option>
				<option value=2>両用</option><option value=3>秘境</option>
			</select>
			<a href="javascript:void(0)" onclick="return false;" id="butai_save"><img src="${saveButton}"></a>
		</div>
		]]></>;
		var entryArea = $.tmpl(tmp, { unitName: butai_nm, saveButton: IMAGES.btn_butai_save } );
		//$('#ig_bg_decksection1right.clearfix').find('#ig_deckunitdetail').find('img:last').after(entryArea);
		entryArea.appendTo('#ig_bg_decksection1right')
		entryArea
			.css({
				position:'absolute',
				background: '#F5F9E5',
				height: 92, width: 242,
				left: 9, bottom: -8,
				padding: 6,
				'-moz-box-sizing':'border-box',
				color: '#000',
				borderRadius: '6px 0 0 6px',
			});
		$('#butai_save').click(function(){
			//var tmp=$('a[href^="/facility/set_unit.php?unit_assign_id"]').attr('href').split('&');
			//tmp = tmp[0].split('=');
			//GM_log(tmp);
			//self.saveFavoriteUnit(tmp[1]);
			self.saveFavoriteUnit();
		});
	},////}}}

	// 部隊選択UI
	attachFavoriteUnitSelecter: function (){////{{{
		var self = this;
		var butai_list = {};
		if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
			//butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
			butai_list = JSON.parse(localStorage.getItem("ixakaizou_butai_list_id"));
		}
		else { return; }

		$('#ig_deck_unititle').css({height: '95px', fontSize: '12px'});
		$('.deck_navi').css('height','1px');

		var selects = [];
		var tmpl = ''+<><![CDATA[
		  <p style="padding:0" style="padding-top: 5px;">${kind}部隊:<select id="s_${idx}" style="font-size:12px">
			<option>-----選択-----</option>
			{{each unitNames}}
			<option value="${$value}">${$value}</option>
			{{/each}}
		  </select><input type=button value="セット" style="font-size: 12px;" id="set_${idx}"></p>]]></>;
		['攻撃', '防衛', '両用', '秘境'].each(function(kind, idx){
			var names = Object.keys(butai_list).filter(function(name, i){ return butai_list[name][0] == idx });
			selects.push( $.tmpl(tmpl, { kind: kind, idx: idx, unitNames: names } ) );
		});
		$('#ig_deck_unititle.clearfix p:eq(0)').replaceWith( $(selects.map(function(v){return v.get(0)})) );
		
		$('#set_0, #set_1, #set_2, #set_3').live("click",function(){
			var s_val = $(this).prev().children(':selected').val();
			//GM_log(s_val);
			if(s_val=='-----選択-----') return;
			self.loadFavoriteUnit(s_val);
		});
	},////}}}

	// 選択した部隊を配置
	loadFavoriteUnit: function (card_key) {////{{{
		var select_assign_no = $('#select_assign_no').attr('value');
		var set_assign_id=$('#set_assign_id').attr('value');
		var w_select_village = $('#select_village').children(':selected').attr('value');

		// カードページの最後のページ
		var maxPageNumber = IXA_getDeckPagerLastPage();
		//GM_log('maxPageNumber', maxPageNumber);

		var butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
		var unitConf = butai_list[card_key];
		var t = unitConf.split(/,/);
		var param_list = [];
		for(i=1;i<t.length;i++) {
			var tmp=t[i].split(':');
			param_list.push(tmp[1]);
		}
		nowLoading();
		this.assignUnitPack(
			param_list, // 武将ID のリスト
			0, // 部隊番号？
			1,
			maxPageNumber, // ページャーの最終ページ
			select_assign_no, // 部隊番号
			w_select_village, // 拠点ID
			false
		);
	},////}}}

	// 現在の部隊をお気に入り部隊に保存
	saveFavoriteUnit: function (/* いらなくなってた unit_assign_id*/) {////{{{
		/*
		* 20111003
		*	+ カード情報の取得方法を兵編成画面ではなく、現在画面のカード情報を集めるように変更
		*/
		var packList = {};
		var unitType = '';
		var b_array = new Array();
		if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
			packList = JSON.parse(localStorage.getItem("ixakaizou_butai_list_id"));
		}

		// 部隊タイプ
		unitType = $('#b_type').children(':selected').val();
		// 部隊名
		var packName = $('#b_name').val().trim();
		if(!packName){
			packName = $('#ig_deck_unititle').find('p:eq(0)').text();
			packName = packName.replace(/\[/,'').replace(/\]部隊$/,'部隊');
		}


		var packIDs = [];
		$R(1,4).each(function(no){
			var $card = $('#id_deck_card'+no);
			if( $card.length && $card.children().length ){
				var $name = $card.find('.ig_card_name');
				var name = $name.text().trim();

				var $n = $card.find('span[id^="card_commandsol_cnt_"]')
				var id = $n.attr('id').replace(/^card_commandsol_cnt_/,'').toInt();
				packIDs.push(name+':'+id);
			}
		});

		packList[packName] = [unitType].concat(packIDs).join(',');
		localStorage.setItem('ixakaizou_butai_list_id', JSON.stringify(packList));
		alert('この部隊を記録しました。');

	},////}}}
});////}}}

//******************************************************************************
/** 部隊編成、他：お気に入りソート */
//------------------------------------------------------------------------------
//function favoriteSort()
Moko.FavoriteSort = FeatureInit({////{{{
	name: 'FavoriteSort',
	config: 'favoriteSort',
	group: 'deck',
	caption: 'お気に入りソート登録',
	condition: function () { return LPath('deck','set_unit_list','union_levelup', 'union_additional') },
	ready: function(){
		this.convertOldRecord();
		this.run();
		$(document).bind('MokoEvent_PagerPaged', this.run.bind(this) );
	},
	convertOldRecord: function(){
		//mokoStorage.clearItem("CardSortOrder");
		if($O.getLength(mokoStorage.getItem("CardSortOrder")) ){
			var listData = mokoStorage.getItem("CardSortOrder").listData;
			if( listData && $O.getLength(listData) ){
				return;
			}
		}
		if(localStorage.getItem("ixakaizou_favorite_list")==null) return;

		var favorite_list = JSON.parse(localStorage.getItem("ixakaizou_favorite_list"));
		var newSetting = {};
		$O.each(favorite_list, function(v, key){
			var newKey = key
			.replace(/:降順/g, ':?')
			.replace(/:昇順/g, ':?')
			.replace(/　/g, ' ')
			.replace(/未設定:./g,'')
			.replace(/ {2,}/g, ' ')
			.trim()
			;
			var newVal = v.split(/\//);
			newSetting[newKey] = { optionValue: newVal };
		});

		mokoStorage.setItem('CardSortOrder', {listData: newSetting} );
		mokoStorage.flush();

		GM_log('CardSortOrder config converted.');
	},
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var favorite ='';
		if(LPath.set_unit_list) {
			favorite = $('<div id="favoritebox" class="clearfix">');
			$('#deck_file').after(favorite);
			favorite = $('<div id="favoritearea">');
		} else {
			favorite = $('<div id="favoritebox">').css({
				background:'url(/img/deck/box04_title.png) no-repeat left top',
				width: 729, height: 34,
				padding: '4px 9px 0px 9px',
				marginBottom: 8,
				marginLeft: 12
			});
			if(location.pathname == "/union/levelup.php"||location.pathname == "/union/additional.php") {
				$('#ig_deck_cardlistmenu.clearfix').after(favorite);
			} else {
				$('#ig_deck_cardlistmenu.clearfix.deck_card_menu').after(favorite);
			}
			favorite = $('<div id="favoritearea">').css({'float':'left','width':'729px','padding-top':'6px'});
		}
		$('#favoritebox').append(favorite);
		favorite = ''+<><![CDATA[
			<div id="favoriteselect-area" style="float:left">
				<select id="favoriteselect"></select>
				<input type=button value="変更する" id="favoriteupdate">
			</div>
			<div style="float:right">
				設定名：<input type="text" value="" id="moko-card-order-name" style="width: 6em">
				<input type=button value="保存" id="favoritesave">
				<input type=button value="削除" id="favoritedelete">
			</div>
		]]></>;
		$('#favoritearea').append(favorite);
		$('#favoritesave'  ).click( self.favoriteSave.bind(self) );
		$('#favoritedelete').click( self.favoriteDelete.bind(self) );
		$('#favoriteupdate').click( self.favoriteUpdate.bind(self) );
		$('#favoriteselect').on('change', function(){
			var $sel = $(this);
			var selectedName = $sel.children(':selected').text();
			var mat, orderName = "";
			var $orderName = $('#moko-card-order-name');
			if( mat = selectedName.match(/【([^】]+)】/) ){
				orderName = mat[1];
				$orderName.val(orderName);
			}
			else{
				$orderName.val("");
			}
		});

		// 同じ並び替えキーを設定したときに他のキーを未設定にする
		$(document).on('change', '.sortGenre', function(){
			var $sel = $(this);
			var val = $sel.val();
			var hereID = $sel.attr('id');
			$('.sortGenre').filter(function(){
				var $genreSel = $(this);
				return $genreSel.attr('id') != hereID && $genreSel.val() == val;
			})
			.each(function(){
				$(this).val("0");
			});
		});

		this.favoriteView();
	},

	favoriteView: function () {
		var self = this;
		var favorite_list = {};

		var cardSortOrder = mokoStorage.getItem('CardSortOrder');

		$('#favoriteselect').children().remove();
		$('#favoriteselect').append('<option>----お気に入りソート選択----</option>');
		$O.each( cardSortOrder.listData, function(sett, name){
			var val = JSON.stringify( sett.optionValue );
			var optionName = name.split(/ /).map(function(flag){return '*'+flag}).join(' ');
			if( sett.orderName ){
				optionName = optionName.replace(/^/, '【'+sett.orderName+'】');
			}
			$.tmpl('<option value="${val}">${name}</option>', {val: val, name: optionName} )
			.appendTo('#favoriteselect')
		});
	},

	favoriteSave: function () {
		var favorite_list = {};
		var l_key = '';
		var l_val = new Array();

		var cardSortOrder = mokoStorage.getItem('CardSortOrder');

		var saveKeys = [], saveVals = [];
		$R(3).each(function(v, idx){
			var sortKeyText = $('#sort_order_'+idx).children(':selected').text();
			var orderText = $('#sort_order_type_'+idx).children(':selected').text();
			var orderArrow = orderText == '降順'? '?' : '?' ;
			if( sortKeyText != '未設定' )
				saveKeys.push( sortKeyText+':'+orderArrow );

			saveVals.push( $('#sort_order_'+idx).val() );
			saveVals.push( $('#sort_order_type_'+idx).val() );
		});

		var saveKeyText = saveKeys.join(' ');
		cardSortOrder.listData[saveKeyText] = { optionValue: saveVals };
		var orderName = $('#moko-card-order-name').val();
		if(orderName){
			cardSortOrder.listData[saveKeyText].orderName = orderName ;
		}
		mokoStorage.flush();
		this.favoriteView();
	},

	favoriteDelete: function () {
		var favorite_list = {};
		var favorite_list_new = {};

		var cardSortOrder = mokoStorage.getItem('CardSortOrder');

		var val = $('#favoriteselect').val();
		if(!val) return;

		var deletingKeys = [];
		$O.each(cardSortOrder.listData, function(v, key){
			if( JSON.parse(val).every(function(s,i){return v.optionValue[i] == s}) ){
				deletingKeys.push(key);
			}
		});
		if(!deletingKeys.length) return;

		deletingKeys.each(function(key){
			delete cardSortOrder.listData[key];
		});

		mokoStorage.flush();

		this.favoriteView();
	},

	favoriteUpdate: function () {
		var target=$('#favoriteselect').val();
		if(!target) return;

		target = JSON.parse(target);
		$('#sort_order_0').val(target[0]);
		$('#sort_order_type_0').val(target[1]);
		$('#sort_order_1').val(target[2]);
		$('#sort_order_type_1').val(target[3]);
		$('#sort_order_2').val(target[4]);
		$('#sort_order_type_2').val(target[5]);
		$('input.sortSubmit').fireEvent('click');
	}
});////}}}

//******************************************************************************
/** 部隊編成、他：CP表示 */
//------------------------------------------------------------------------------
Moko.CPDisp = FeatureInit({////{{{
    name: 'CPDisp',
	config: 'cp_display',
	caption: 'コスト比表示（最適値。指揮兵種版は切って使う）',
	detail: '最も高い統率率によるコスト比。（最大指揮兵士数×統率）÷コスト',
	group: 'deck',
	condition: function () { return LPath('deck','set_unit_list','union_levelup', 'union_additional') },
	ready: function(){
		$(document).bind('MokoEvent_PagerPaged', this.run.bind(this) );
		this.run();
	},
    //------------------------------------------------------------------------------
    run: function () {
		$('#ig_deck_smallcardarea_out').find('.ig_deck_smallcardarea.clearfix').each(function(){
			var $this = $(this);
			$this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(1) TH:eq(1)').text('CP');	// CP項目
			//var name = $this.find('span.ig_deck_smallcard_cardname').text();
			var cost = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(0) TD').text();
			var leading = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(3) TD').text().match(/\/(\d+)/)[1];
			var abi = new Array(4);
			abi[0] = $this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(2) TD:eq(0)').text();	// 槍適性
			abi[1] = $this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(2) TD:eq(1)').text();	// 馬適性
			abi[2] = $this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(3) TD:eq(0)').text();	// 弓適性
			abi[3] = $this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(3) TD:eq(1)').text();	// 器適性
			for(var i=0;i<4;i++){
				switch(abi[i]){
					case 'SSS':	abi[i] = 1.2; break;
					case 'SS':	abi[i] = 1.15; break;
					case 'S':	abi[i] = 1.1; break;
					case 'A':	abi[i] = 1.05; break;
					case 'B':	abi[i] = 1.0; break;
					case 'C':	abi[i] = 0.95; break;
					case 'D':	abi[i] = 0.9; break;
					case 'E':	abi[i] = 0.85; break;
					default:	abi[i] = 0.8; break;
				}
			}
			
			/* とりあえず使わない
			abi[4] = (abi[0] + abi[2]) / 2;	// 武士    適性(槍弓)
			abi[5] = (abi[0] + abi[1]) / 2;	// 赤備え  適性(槍馬)
			abi[6] = (abi[1] + abi[2]) / 2;	// 弓騎馬  適性(馬弓)
			abi[7] = (abi[0] + abi[3]) / 2;	// 鉄砲足軽適性(槍器)
			abi[8] = (abi[0] + abi[2]) / 2;	// 鉄砲騎馬適性(馬器)
			*/
			
			abi.sort(function(a,b){
				return (a < b) ? 1: -1;
			});
			var cp = Math.round(leading * abi[0] / cost);
			$this.find('TABLE.ig_deck_smallcarddata:eq(1) TR:eq(1) TD:eq(1)').text(cp);	// CP値
		});
	}
});////}}}

//******************************************************************************
/** 部隊編成、他：CP表示強化版 */
//------------------------------------------------------------------------------
Moko.CPSmartDisplay = FeatureInit({////{{{
    name: 'CPSmartDisplay',
	config: 'cp_smart_display',
	caption: 'コスト比表示（指揮兵種による。最適値版は切って使う）',
	detail: '現在率いている兵種によるコスト比。いない場合は最適値。',
	group: 'deck',
	configSettings: {
		cp_smart_display: { default_value: false }
	},
	condition: function () { return LPath('deck','set_unit_list','union_levelup', 'union_additional') },
	ready: function(){
		$(document).bind('MokoEvent_PagerPaged', this.run.bind(this) );
		this.run();
	},
    //------------------------------------------------------------------------------
    run: function () {
		$('#ig_deck_smallcardarea_out').find('.ig_deck_smallcardarea.clearfix').each(function(){
			var $this = $(this);

			var $tblPow = $this.find('TABLE.ig_deck_smallcarddata:eq(0)');
			var soldierType = $tblPow.find('tr:eq(4) td:eq(0)').text();
			var $tblDat = $this.find('TABLE.ig_deck_smallcarddata:eq(1)');
			$tblDat.find('TR:eq(1) TH:eq(1)').text('CP');	// CP項目

			//var name = $this.find('span.ig_deck_smallcard_cardname').text();
			var cost = $tblPow.find('TR:eq(0) TD').text(); // コスト
			var leading = $tblPow.find('TR:eq(3) TD').text().match(/\/(\d+)/)[1]; // 最大指揮数
			var abi = {}
			abi.yari = $tblDat.find('TR:eq(2) TD:eq(0)').text();	// 槍適性
			abi.kiba = $tblDat.find('TR:eq(2) TD:eq(1)').text();	// 馬適性
			abi.yumi = $tblDat.find('TR:eq(3) TD:eq(0)').text();	// 弓適性
			abi.heiki= $tblDat.find('TR:eq(3) TD:eq(1)').text();	// 器適性

			$O.each(abi, function(v, k, o){
				o[k] = COMMAND_RANK_TO_RATE[v] || 0;
			});
			
			var power;

			if( $O.keys(SOLDIER_DATA).contains(soldierType) ){
				var data = SOLDIER_DATA[soldierType];
				power = (abi[data.cmd1] + abi[data.cmd2]) / 2;
			}
			else{
				power = $O.values(abi).max();
			}

			var cp = Math.round(leading * power / cost);
			$tblDat.find('TR:eq(1) TD:eq(1)').text(cp);	// CP値
		});
	}
});////}}}

//******************************************************************************
/** 部隊編成：待機武将一覧をポップアップ表示 */
//-----------------------------------------------------------------------------
//function unitListDialog()
Moko.UnitListDialog = FeatureInit({////{{{
	name: 'UnitListDialog',
	config: 'unitListDialog',
	group: 'deck',
	caption: '待機武将一覧をポップ表示',
	style: ''+<><![CDATA[
		#moko-squad-floatlist-power {
			margin-left: 8px;
		}
	]]></>,
	condition: function () { return LPath.deck },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		jQuery.event.special.ready.setup();
		var listdialog = $(''+<><![CDATA[
			<div id="unitlistdialog" style="display:none;">
			<table id="tb_unit" class="tablesorter" width=100%>
			<thead><tr>
				<th>選択</th> <th>No</th> <th>ﾚｱ</th> <th>名前</th>
				<th>ｺｽﾄ</th> <th>Lv</th> <th>HP</th>
				<th>指揮兵</th> <th>兵種</th> <th>攻撃</th> <th>防御</th> <th>兵法</th>
				<th>槍</th> <th>馬</th> <th>弓</th> <th>器</th>
			</tr></thead>
			<tbody id="tb_unitlist"></tbody>
			</table>
		]]></>);
		var sidemenulink = $(
			'<li style="margin-left: 6px;padding-bottom: 6px;padding-left: 8px;background: url("/img/common/sidebar/icon_off.gif") no-repeat 0 2px;">'
			+'<a href="#TB_inline?height=440&amp;width=800&amp;inlineId=unitlistdialog" class="thickbox moko-thickbox-squadslist" title="待機武将一覧" onclick="return false;">'
			+'待機武将一覧</a></li>'
		);
		$('#ig_boxInner.clearfix').append(listdialog);

		$('#toollist').append(sidemenulink);
		$('a.moko-thickbox-squadslist').live('mousedown',function() {
			$('#tb_unitlist').children().remove();

			var maxPageNumber = IXA_getDeckPagerLastPage();
			self.createUnitList(1, maxPageNumber );

			tb_init('a.thickbox');
			var currSquadsNum = IXA_getCurrentUnitSquadsNum();
			var select_name = "";
			if( $('#ig_deck_unititle.clearfix:eq(0) p').length == 1 ){
				select_name = $('#ig_deck_unititle.clearfix:eq(0) p').text().trim();
			}

			var tmpl = ''+<><![CDATA[
				<p id="v_head" moko-assign-capacity="${assignCapacity}">
					{{if canAssign}}
					{{if canAssign}}{{if unitName}}部隊名:${unitName}{{/if}}
						<input type=button value="現在の部隊へ配置" id="set_unitlist">{{/if}}
					<input type="hidden" id="maxpage" value="${maxPageNumber}">
					<input type="hidden" id="select_deck" value="${assignNo}">
					{{/if}}
					<input type=button value="総攻防力" id="energy"><span id="moko-squad-floatlist-power"></span>
				</p>
			]]></>;

			$('#v_head').remove();
			$.tmpl(tmpl, {
				canAssign: currSquadsNum < 4,
				assignCapacity: 4 - currSquadsNum,
				maxPageNumber: maxPageNumber,
				unitName: select_name,
				assignNo: IXA_getCurrentUnitAssignNo()
			})
			.insertBefore('#tb_unit');
			//$('#tb_unit').before(tmp);
			$('#set_unitlist').live('click',function(){
				self.unit_set();
			});
			$('#energy').live('click',function() {
				self.calcUnitPower();
			});
			$('#tb_unitlist input[name^="id"]').live('click',function() {
				self.calcUnitPower();
			});
		});
	},
	calcUnitPower: function () {
		var self = this;
		var rank={SSS:1.20,SS:1.15,S:1.10,A:1.05,B:1,C:0.95,D:0.9,E:0.85,F:0.80};
		var check_list=[];
		$('#tb_unitlist input[name^="id"]:checked').each(function(){
			var $row = $(this).closest('tr');
			var unit=$row.children().eq( 8).text();
			var off =$row.children().eq( 9).text();
			var def =$row.children().eq(10).text();
			var num =$row.children().eq( 7).text();
			var t1  =$row.children().eq(12).text();
			var t2  =$row.children().eq(13).text();
			var t3  =$row.children().eq(14).text();
			var t4  =$row.children().eq(15).text();
			num = num.substring(0,num.indexOf('/'));
			//t1:槍,t2:馬,t3:弓,t4:器
			check_list.push({unit:unit,off:off,def:def,num:num,t1:t1,t2:t2,t3:t3,t4:t4});
		});
		//if(check_list.length==0) {alert('選択されてません');return;}
		if(check_list.length>4) {alert('選択可能数を超えています(最大4つまで)');return;}
		var o_power=0;
		var d_power=0;
		for(var i=0;i<check_list.length;i++) {
			var r1=rank[(check_list[i])[SOLDIER_DATA[check_list[i].unit].tp1]];
			var r2=rank[(check_list[i])[SOLDIER_DATA[check_list[i].unit].tp2]];
			o_power+=(parseInt(check_list[i].num*SOLDIER_DATA[check_list[i].unit].off)+parseInt(check_list[i].off))*((r1+r2)/2);
			d_power+=(parseInt(check_list[i].num*SOLDIER_DATA[check_list[i].unit].def)+parseInt(check_list[i].def))*((r1+r2)/2);
		}
		var tmpl = ''+<><![CDATA[
			<strong>攻撃力</strong> <span>${attack}</span> ／
			<strong>防御力</strong> <span>${defense}</span>
		]]></>;
		$.tmpl(tmpl, {attack: o_power.floor().commalize(), defense: d_power.floor().commalize()})
		.appendTo($('#moko-squad-floatlist-power').empty())
		;
	},

	unit_set: function (){
		var self = this;
		var squadIDs=[];
		var assignCapacity = $('#v_head').attr('moko-assign-capacity').fetchNum();
		$('input[name^="id"]:checked').each(function(){
			squadIDs.push($(this).attr('value'));
		});
		if(squadIDs.length==0) {
			alert('選択されてません');
			return;
		}
		else if( squadIDs.length > assignCapacity ) {
			alert('選択可能数を超えています('+assignCapacity+'つまで)');
			return;
		}

		var assignNo=$('#select_assign_no').attr('value');
		var villageID = $('#select_village').val() || "";

		nowLoading(squadIDs.length);
		setTimeout(function(){
			squadIDs.each(function(squadID, idx){
				var ret = IXA_assignSquad (squadID, assignNo, villageID );
				if(!ret){
					throw(new Error( squadID + ' の武将の配置に失敗しました'));
				}
				countUpProgress();
			});
			location.href="/card/deck.php?ano="+ assignNo;
		},500);

		//var assignNo=$('#select_assign_no').attr('value');
		//var maxpage=$('#maxpage').attr('value');
		//nowLoading();
		//self.setDeck_Id(squadIDs, 0, assignNo, 1, maxpage);
	},


	setDeck_Id: function (squadIDs, list_index, assignNo, page_index,maxpage) {
		var self = this;
		if( !squadIDs[list_index] ||  page_index > maxpage ) {
			location.href="/card/deck.php";
			return;
		}
		var w_null='';
		var data = {
			select_assign_no      : assignNo,
			unit_assign_id        : w_null,
			unset_unit_squad_id   : w_null,
			change_unit_squad_id  : w_null,
			dungeon_unit_squad_id : w_null,
			dungeon_card_id       : w_null,
			dungeon_select        : w_null,
			deck_mode             : 'nomal',
			p                     : page_index
		};

		$.ajax({
			type: "POST",
			url: '/card/deck.php',
			data:data,
			cache: false,
			success: function (html){
				var $targetSquad = $(html)
				.find('#ig_deck_smallcardarea_out') // 待機武将カードの親
				.find('.ig_deck_smallcardarea:has(a>img[alt="選択中の部隊へ"]):has(.thickbox[href$="cardWindow_'+squadIDs[list_index]+'"])');

				var set_assign_id = $(html).find('#set_assign_id').attr('value') || "";
				var set_squad_id = "";
				if($targetSquad.length) {
					var onclick = $targetSquad.find('a:has(>img[alt="選択中の部隊へ"])')
					.attr('onclick');
					var onclickOpts = onclick.match(/'[^']*'|"[^"]"/g).map(function(v){return v.replace(/^['"]|['"]$/g,'')});
					//set_assign_id = onclickOpts[0];
					set_squad_id  = onclickOpts[1] || "";
				}

				if(set_squad_id) {

					var selectVillageID = $('#select_village').val() || "";

					var data2 = {
						target_card      : w_null,
						select_assign_no : assignNo, // 配置先部隊No、 0 ～ 4
						mode             : 'assign_insert',
						btn_change_flg   : w_null,
						set_assign_id    : set_assign_id, // 配置用のID、新規の時は ""
						set_squad_id     : set_squad_id,  // 小隊ID、 squadID とは違う
						set_village_id   : selectVillageID, // 配置先拠点、追加の時は ""
						deck_mode        : 'nomal',
						p                : page_index
					};
					$.ajax({
						type: "POST",
						url: '/card/deck.php',
						data:data2,
						cache: false,
						success: function (html){
							list_index++; // 次の ID を選ぶ
							page_index=1; // 1ページ目に戻る
							self.setDeck_Id(squadIDs, list_index, assignNo, page_index, maxpage);
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							//console.log(textStatus);
						}
					});
				}else{
					page_index++;
					self.setDeck_Id(squadIDs, list_index, assignNo ,page_index, maxpage);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log(textStatus);
			}
		});
	},
	createUnitList: function (p,max) {
		var self = this;
		var null_w='';
		var data={myselect:null_w,ano:0,dmo:'nomal',p:p};
		$.ajax({
			type: "POST",
			url: '/card/deck.php',
			data:data,
			cache: false,
			success: function (html){
			$(html).find('.ig_deck_smallcardarea.clearfix').each(function(){
				if($(this).find('a[href^="/facility/set_unit.php"]').attr('href')==undefined) return true;
				var no=$(this).find('span.ig_deck_smallcard_cardnumber').text().replace('No.','');
				var r=$(this).find('span.ig_deck_smallcard_cardrarety').text();
				var nm=$(this).find('span.ig_deck_smallcard_cardname').text();
				var c=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(0)').text();
				var lv=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(1)').text();
				var hp=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(2)').text();
				var ucnt=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(3)').text();
				var hs=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(4)').text();
				var hs=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(4)').text();
				var at=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(0)').text();
				var df=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(2)').text();
				var hy=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(1)').text();
				var ya=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(4)').text();
				var um=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(5)').text();
				var yu=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(6)').text();
				var ki=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(7)').text();
				var id=$(this).find('a[href^="/facility/set_unit.php"]').attr('href').split('=');
				id=id[1].replace('&ano','');
				var tmp='<tr><td><input type=checkbox name="id" value="'+id+'"></td><td>'+no+'</td><td>'+r+'</td><td>'+nm+'</td><td>'+c+'</td><td>'+lv+'</td><td>'+hp+'</td><td>'+ucnt+'</td><td>'+hs+'</td><td>'+at+'</td><td>'+df+'</td><td>'+hy+'</td><td>'+ya+'</td><td>'+um+'</td><td>'+yu+'</td><td>'+ki+'</td></tr>';
				$('#tb_unitlist').append(tmp);
			});
			p++;
			if(p>max) {
				$('#tb_unit').ready(function(){
	//                    $('#tb_unit').tablesorter();
				});
				return;
			}else{self.createUnitList(p,max);}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//console.log(textStatus);
		}
		});
	}
});////}}}

//******************************************************************************
/** 部隊編成：待機武将一覧にグループアイコン表示 */
//------------------------------------------------------------------------------
//function deckGroupImgView()
Moko.GroupIconedCardList = FeatureInit({////{{{
	name: 'GroupIconedCardList',
	config: 'deckGroupImgView',
	group: 'deck',
	options: { groupConfigs: 'groupConfigs' },
	caption: '待機武将一覧にグループアイコン表示',
	condition: function () { return LPath.deck || LPath.union_levelup },
	ready: function () {
		this.run();
		$(document).bind('MokoEvent_PagerPaged', this.run.bind(this) );
	},
	//------------------------------------------------------------------------------
	run: function () {
		//var group_id = mokoStorage.getJSON("ixamoko_group_set");
		//if( !Object.getLength( group_id ) ) return;
		
		var groupConfigs = this.groupConfigs;
		var squadConfig = mokoStorage.getItem('Squads');
		
		if( !groupConfigs || !Object.getLength( groupConfigs ) ) return;
		if( !squadConfig || !Object.getLength( squadConfig ) ) return;

		$('.ig_deck_smallcardarea:not(:has(.ixamoko-group-icon))').each(function(){
			var squadID=$(this).find('a[href^="#TB_inline"]').attr('href');
			squadID=squadID.substring(squadID.indexOf("cardWindow_"),squadID.length).replace("cardWindow_",'');

			if( squadConfig[squadID] === undefined ) return true;
			var groupID = squadConfig[squadID].groupID;
			if( groupConfigs[groupID] === undefined ) return true;
			var iconSrc = groupConfigs[groupID].src;
			
			var groupIcon= ''
				+'<div style="position: absolute;z-index:4;" class="ixamoko-group-icon">'
				+'<img src="'+ iconSrc +'"></div>';
			$(this).find('.ig_deck_smallcardimage').prepend(groupIcon);
		});
	}
});////}}}

//******************************************************************************
/** 一括削除：いつも100件 */
//------------------------------------------------------------------------------
Moko.CardDelete100NumViewPost = FeatureInit({////{{{
    name: 'CardDelete100NumViewPost',
	config: 'card_delete_100num_view',
	caption: 'カード一括削除を100件表示',
	priority: PRIO_ERALY,
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    ready: function () {
		$('[href="/card/deck_card_delete.php"]')
		.live('click', function(){
			$.form({
				type: 'post',
				url: '/card/deck_card_delete.php',
				data: { show_num: 100 }
			});
			return false;
		});
	},
    //------------------------------------------------------------------------------
})////}}}

//******************************************************************************
/** 出陣状況： 陣張り部隊の行動内容を「陣張」に差し替える */
//------------------------------------------------------------------------------
//function fightlist()
Moko.UnitStatus_ClearKind = FeatureInit({////{{{
	name: 'UnitStatus_ClearKind',
	condition: function () { return LPath.unit_status },
	//------------------------------------------------------------------------------
	run: function () {
		$('div.ig_decksection_mid').find('table.paneltable.table_fightlist').each(function() {
			var $img, img_src, $this = $(this);

			// 攻撃時は合流が 0 、陣張時は "-"になることを利用して画像を差し換える
			$img = $this.find('IMG:eq(3)');
			img_src = $img.attr('src');
			if( $.type(img_src) === 'string' && img_src.length > 0 ) {
				if((img_src.indexOf('icon_attack.png')!=-1)||(img_src.indexOf('mode_attack.png')!=-1)) {
					if($this.find('TD:eq(2)').find('span').text()=='-'){
						$img.attr('src',IMAGES.mode_jinhari_yellow);
					}
				}
			}

			$img = $this.find('IMG:eq(4)');
			img_src = $img.attr('src');
			if( $.type(img_src) === 'string' && img_src.length > 0 ) {
				if((img_src.indexOf('icon_attack.png')!=-1)||(img_src.indexOf('mode_attack.png')!=-1)) {
					if($this.find('TD:eq(2)').find('span').text()=='-'){
						$img.attr('src',IMAGES.mode_jinhari_yellow);
					}
				}
			}
		});
	}
});////}}}

//******************************************************************************
/** 簡易編成：下準備 */
//------------------------------------------------------------------------------
Moko.ReadyOrganizerCustomize = FeatureInit({////{{{
    name: 'ReadyOrganizerCustomize',
	//config: function(cfg){
	//	return ( !!cfg['unit_list_hikyou'] && !!cfg['hold_butai'] )
	//		|| ( !!cfg['unit_list_allset'] && !!cfg['hold_butai'] )
	//},
	priority: PRIO_MORE_ERALY,
	condition: function () { return LPath.set_unit_list },
    //------------------------------------------------------------------------------
    run: function () {
		$('.common_table1.center.mt10')
			.before('<div id="ixamoko-organizer-forms" class="clearfix">')
			.before('<div id="ixamoko-organizer-forms-bottom" class="clearfix">')
		;
		$('<button class="ixamoko-popup-standbysoldier">待機兵一覧</button>')
		.css({float: 'right'})
		.appendTo('#ixamoko-organizer-forms-bottom')
		;
		var viewNumForm = $('.center.black:eq(0)');
		viewNumForm.find('form').css({display:'inline'});
		viewNumForm.css({
			display:'inline',
			float:'right',
			marginRight: 20,
			fontWeight:'normal',
			textAlign:'left'
		})
		.appendTo('.ig_solder_commentarea');
		$('.ig_decksection_innermid>div+br').remove();
	}
});////}}}

//******************************************************************************
/** 簡易編成：全編成 */
//------------------------------------------------------------------------------
Moko.UnitList_Misc = FeatureInit({////{{{
	name: 'UnitList_Misc',
	options: {
		useQuickSort          : 'organizer_quicksort',
		useRecommendedDescendingSort: 'organizer_quicksort_recommended',
		useOverloadAlwaysPost : 'organizer_quicksort_overlord_always_post',

		useUnitList200        : 'unit_list_200',
		useUnitListHp         : 'unit_list_hp',
		useUnitListHpBgc      : 'unit_list_hp_bgc',
		useUnitListTotal      : 'unit_list_total',
		useUnitListGroup      : 'unit_list_group',
		useUnitListIcon       : 'unit_list_icon',
		useUnitListSortDefGrp : 'unit_list_sort_def_grp',
		useUnitListMax        : 'unit_list_max',

		groupConfigs: 'groupConfigs',
	},
	configSettings: {
		organizer_quicksort: { caption: 'クイックソートを使う' },
		organizer_quicksort_recommended: { caption: 'クイックソートで降順が良さげなものは降順にする' },
		organizer_quicksort_overlord_always_post: { caption: 'クイックソートで大殿の饗宴を常に最後尾にする' },

		unit_list_200          : { caption : '簡易編成のカード表示を200枚まで表示(※100枚表示不可)' },
		unit_list_hp           : { caption : '武将HP表示' },
		unit_list_hp_bgc       : { caption : '武将のHPが100でない場合は色づけ' },
		unit_list_total        : { caption : '総兵数表示' },
		unit_list_group        : { caption : 'グループ機能を使う' },
		unit_list_icon         : { caption : 'グループ機能使用時にアイコン表示' },
		unit_list_sort_def_grp : { caption : '強制グループ単位ソート' },
		unit_list_max          : { caption : '簡易編成の補充リンク押下で最大補充' },
	},
	group: 'unit',
	priority: PRIO_MORE_ERALY,
	style: $F(<><![CDATA[
		.moko-group-icon {
			height: 30px;
			width: 30px;
			-moz-box-sizing: border-box;
			border: solid 1px black;
			border-radius: 4px;
			cursor: pointer;
			background: orange;
		}
		td > .moko-group-icon {
			float: left;
			margin-right: 4px;
		}
		.moko-group-icon[groupID="0"]{
			background: no-repeat url();
			background-position: 0 0;
		}
		.moko-sort-switch-band {
			height:18px;
			border-top: solid 1px #663;
			margin: 4px -8px -5px -8px;
		}
		.moko-sort-switch-band>span {
			display: inline-block;
			height: 18px;
			font-size: 12px;
			font-weight: normal;
			background: #888;
			color: #ccc;
			text-align: center;
			vertical-align: bottom ;
			-moz-box-sizing: border-box;
			overflow: hidden;
			padding-top: 1px;
			border-right: solid 1px #bbb;
			border-bottom: solid 2px #888; 
			border-top   : solid 2px #888; 
			cursor: pointer;
		}
		.moko-sort-switch-band>span:last-child {
			border-right: none;
		}
		.moko-sort-switch-band>span:hover {
			background: #aaa;
		}
		.moko-sort-switch-band[moko-member-length="1"]>span { width:100%%; }
		.moko-sort-switch-band[moko-member-length="2"]>span { width: 50%%; }
		.moko-sort-switch-band[moko-member-length="3"]>span { width: 33%%; }
		.moko-sort-switch-band[moko-member-length="3"]>span:first-child { width: 34%%; }
		.moko-sort-switch-band[moko-member-length="4"]>span { width: 25%%; }
		.moko-sort-switch-band[moko-member-length="5"]>span { width: 20%%; }
		.moko-sort-ascending  { border-top   : solid 2px #c88 !important; border-bottom: solid 2px #888; }
		.moko-sort-descending { border-bottom: solid 2px #c88 !important; border-top   : solid 2px #888; }
	]]></>, { icon: defaultGroupIcons } ),
	condition: function () { return LPath.set_unit_list },
	ready: function(){
		GM_addStyle('.common_table1.center.mt10 { display: none }');
		if(
			!this.useUnitList200
			|| $('SELECT[name="show_num"]').val()!=100
			|| $('a[href^="/facility/set_unit_list.php?show_num=100&p=2"]').text()==''
		){
			this.unitList_check();
		}
		else {
			this.unitList200();
		}
	},
	//------------------------------------------------------------------------------
	// 統合後の200件表示
	unitList200: function (){
		var self = this;
		$('ul.pager').remove();
		$.ajax({
			type: "POST",
			url: '/facility/set_unit_list.php?show_num=100&p=2',
			cache: false,
			success: function (html){
				var num=0;
				// 小隊詳細データを持ってくる
				$(html).find('div[id^="cardWindow"]').each(function() {
					var tmp = $(this).clone();
					$('#sidebar').before(tmp);
				});
				// TR を持ってくる
				$(html).find('table.common_table1.center.mt10').find('tr').each(function() {
					if(num==0){num++;return true;}
					var tmp = $(this).clone();
					$('table.common_table1.center.mt10').find('tr:last').after(tmp);
				});
				// 小隊ポップアップのイベントを張りなおす。
				$('a.thickbox').live('mousedown',function() {
					tb_init('a.thickbox');
				});
				Moko.after_tohankaku();
				// 全編成を呼ぶ
				self.unitList_check();
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log(textStatus);
			}
		});
	},

	getDataRows: function(){
		var self = this;
		return self.$table.find('>tbody>tr:gt(0)');
	},

	unitList_check: function () {
		var self = this;
		var snum = parseInt($('SELECT[name="show_num"]').val());

		$('<a href="#">')
		.css({color:'#060', float:'right'})
		.text('一番上に戻る')
		.click(function(){ $(document).scrollTop(0); return false; })
		.prependTo('.center.black:last')

		// 配備兵士総数用の変数
		var deployedSoldiers = {};
		
		var squadConfig = mokoStorage.getItem('Squads');
		var groupConfigs = this.groupConfigs ;
		var $mainTable = $('table.common_table1:eq(0)');// tr:gt(0)
		this.$table = $mainTable;
		this.$headRow = $mainTable.find('tr:eq(0)');
		var $mainRows = self.getDataRows();

		var squadDic = {};
		var squadList = [];

		this.squadDic = squadDic;
		this.squadList = squadList;

		//var squadConfig = {};
		// squadConfig : {
		//      <squadID> : {
		//          cardNumber  : '<カード番号>',
		//          cardName    : '<武将名>',
		//          order       : <並び順>,
		//          groupID     : <所属グループID>
		//  }};


		//==============================================================================

		$mainRows.each(function(){
			var $row = $(this);
			var squadID = $row.find('input[id^="card_id_arr_"]').val().trim();
			var $squadCard = $('#cardWindow_'+squadID);

			// カードから情報を得る
			var captain = new CaptainData(squadID);

			// 武将設定
			var squad = squadConfig[squadID] = squadConfig[squadID] || {} ;
			captain.squadInfo = squad;
			captain.$row = $row;

			// めんどくさいので $TR.data にいろいろくっつけておく
			$row.data({
				squadID: squadID,
				//info: info,
				captain: captain,
				squad: squad
			});

			// この機能で使うデータ
			squadDic[squadID] = captain;

			//==============================================================================

			//var $curSoldierNum = $row.find('SPAN[id^="now_unit_cnt_"]');
			//var soldierCur = parseInt($curSoldierNum.text());
			//var soldierMax = $row.find('span[id^="lead_unit_"]').text().toInt();
			var soldierCur = captain.soldierNum;
			var soldierMax = captain.commandPow;

			//最大指揮兵数
			// 現在の指揮兵数
			//var type = $row.find('img[id^="now_unit_img_"]').attr('alt');
			var type = captain.soldierType;

			if (soldierCur > 0) {
				if(!deployedSoldiers[type]) deployedSoldiers[type] = 0;
				deployedSoldiers[type] += soldierCur;
			}

			// HP状態を武将名の下に追加
			self.displayUnitListHP($row, captain);

			// 兵が満載なら
			if ( captain.commandPow == captain.soldierNum ) {
				$row.find('TD:eq(5) INPUT').css({backgroundColor:'#fbb'});
			}

			// グループ機能
			if( !(self.useUnitListGroup && (snum==100)) ) return ;
				self.displayGroupInfoOnCells($row, squad, captain);
		});
		// 保存データを更新
		mokoStorage.flush();

		$mainTable.show();
		squadList.append( $O.values(squadDic) );

		//==============================================================================
		
		// サイドボックスに総兵数表示
		self.displayTotalSoldierNum(deployedSoldiers);

		//==============================================================================

		// クイックソート
		if( self.useQuickSort ){
			self.readyQuickSort();
			self.bindQuickSortSwitches();
		}
		
		// グループ機能
		if (self.useUnitListGroup && (snum==100)) {
			
			// 覚えなおすボタン
			var szMainTable = 'DIV.ig_decksection_innermid > TABLE.common_table1';
			$('#ixamoko-organizer-forms-bottom').append(
				'<INPUT type="button" id="ixamoko_reset_grp" value="グループを表示順に覚えなおす" />'
				+'<SPAN id="ixamoko_reset_grp_result"></SPAN>'
			);

			//------------------------------------------------------------------------------

			// GRPボタン追加
			var $trth = self.$headRow ;
			self.$headRow.find('TH:eq(6)').append('<INPUT type="button" value="GRP" id="ixamoko_grp" />');

			//------------------------------------------------------------------------------

			// 覚えなおすボタンのイベント
			// データの並びが表示通りに入れ替わる
			$('#ixamoko_reset_grp').click(function(e){
				self.clickHdl_reorderSquadsOrder(e, $mainTable)
			})

			//------------------------------------------------------------------------------

			// グループ変更（アイコンの右左クリック）イベント
			$('.ixamoko_grp')
			.live('click', self.clickHdl_groupIconChange.bind(self) )
			.live('contextmenu', self.clickHdl_groupIconChange.bind(self) );

			//------------------------------------------------------------------------------

			// GRPボタンクリックイベント
			//      グループ順に並べ替える
			$('#ixamoko_grp').click(function(){ self.reorderByGroup() });

			//------------------------------------------------------------------------------

			// ページロード時に強制並べ替え ↑と一緒の処理
			if (self.useUnitListSortDefGrp)
				self.reorderByGroup();
		}

		// 最大数配置のイベント登録
		this.unit_list_max();
	},

	readyQuickSort: function(squadInfos){
		var self = this;
		var $ths = self.$headRow.find('th');

		var sortSwitchTmpl = ''+<><![CDATA[
			<div class="moko-sort-switch-band" moko-member-length="${Object.getLength(sortKeys)}">
				{{each(key, label) sortKeys}}<span moko-sort-key="${key}" title="${label.tooltip}">${label.caption}</span>{{/each}}
			</div>
		]]></>;

		var tmplSeeds = [
			{sortKeys: {
				groupID : { caption: 'GRP' , tooltip: 'グループID' },
				cardID  : { caption: 'No'  , tooltip: 'カードNo' },
				kana    : { caption: '名前', tooltip: '名前（かな）' },
				hp      : { caption: 'HP'  , tooltip: 'HP' },
			}},

			{sortKeys: {
				rank  : { caption: '★', tooltip: 'ランク' },
				level : { caption: 'LV', tooltip: 'レベル' },
				cost  : { caption: 'C' , tooltip: 'コスト' },
			}},

			{sortKeys: {
				yari  : { caption: '槍', tooltip: '槍統率' },
				yumi  : { caption: '弓', tooltip: '弓統率' },
				kiba  : { caption: '馬', tooltip: '騎馬統率' },
				heiki : { caption: '器', tooltip: '兵器統率' },
			}},

			{sortKeys: {
				soldierNum: { caption: '兵数', tooltip: '現在兵数' },
				commandPow: { caption: '最大', tooltip: '最大兵数' },
			}},

			{sortKeys: {
				attackPow     : { caption: '攻撃', tooltip: '武将攻撃力' },
				defensePow    : { caption: '防御', tooltip: '武将防御力' },
				tacticsPow    : { caption: '兵法', tooltip: '武将兵法' },
				soldierTypeno : { caption: '兵種', tooltip: '指揮中の兵種' },
			}},

			{sortKeys: {
				defaultSoldierType: { caption: '基本兵種', tooltip: '基本兵種' },
			}},

		];

		tmplSeeds.each(function(settgrp){
			$O.each(settgrp.sortKeys, function( sett, key ){
				if( self.useRecommendedDescendingSort
					&& self.SQUAD_SORT_SETTING[key].descending ){
					sett.tooltip = sett.tooltip + self.MESSAGE_DESCENDING_BYLEFT;
				}
				else {
					sett.tooltip = sett.tooltip + self.MESSAGE_ASCENDING_BYLEFT;
				}
			});
		});

		var $switchBands = $.tmpl(sortSwitchTmpl, tmplSeeds);

		$R($switchBands.length).each(function(idx){
			$switchBands.eq(idx).appendTo( $ths.eq(idx) );
		});

	},

	MESSAGE_ASCENDING_BYLEFT : ' -- 左:昇順? / 右:降順?',
	MESSAGE_DESCENDING_BYLEFT: ' -- 左:降順? / 右:昇順?',

	bindQuickSortSwitches: function(){
		var self = this;

		var sortHandler = function(e, isReverse){
			var $swit = $(e.target);
			var sortKey = $swit.attr('moko-sort-key')
			var sortSetting = self.SQUAD_SORT_SETTING[sortKey];
			if(!sortSetting) throw(new Error('bindQuickSortSwitches(): 不正なソート種別：'+sortKey));

			var descending = 1;
			if( self.useRecommendedDescendingSort ){
				descending = sortSetting.descending ? -1 : 1 ;
			}
			if( isReverse ) descending *= -1;

			// squad から引き継ぐ
			if( sortSetting.squad ){
				self.squadList.each(function(v){
					v[sortKey] = v.squad[sortKey];
				});
			}

			// 行内の要素から引き継ぐ
			if( sortSetting.update ){
				self.getDataRows().each(function(){
					self.squadDic[$(this).data('squadID')][sortKey] = sortSetting.update.call(this);
				});
			}

			// 文字列ソート
			if( sortSetting.type == 'str'){
				self.squadList.sort(function(a, b){
					return ( a[sortKey] < b[sortKey] ? - 1 : a[sortKey] == b[sortKey] ? 0 : 1) * descending;
				});
			}
			// 文字列ソート、ただし偽値は最後尾
			else if( sortSetting.type == 'strPostNil'){
				self.squadList.sort(function(a, b){
					return (
						!a[sortKey] ? 1 : !b[sortKey] ? -1
						: ( a[sortKey] < b[sortKey] ? - 1 : a[sortKey] == b[sortKey] ? 0 : 1) * descending
					);
				});
			}
			// 数値ソート、ただし偽値は最後尾
			else if( sortSetting.type == 'numPostNil'){
				self.squadList.sort(function(a, b){
					return (
						!a[sortKey] ? 1 : !b[sortKey] ? -1
						: ( a[sortKey] - b[sortKey] ) * descending
					);
				});
			}
			// 数値ソート
			else {
				self.squadList.sort(function(a, b){ return ( a[sortKey] - b[sortKey] ) * descending });
			}

			// 大殿の饗宴は最後尾
			if( self.useOverloadAlwaysPost ){
				var overlordItems = self.squadList.filter(function(v){ return v.cardID == 1930 });
				if( overlordItems.length ){
					overlordItems.each(function(overlord){
						var overlordIdx = self.squadList.indexOf(overlord);
						self.squadList.splice( overlordIdx, 1 );
						self.squadList.push( overlord );
					});
				}
			}

			//alert(self.squadList.map(function(v){return v.kana }).join("\n"));
			self.reorderBySquadList();

			// 表示調整
			$('.moko-sort-switch-band>span')
				.removeClass('moko-sort-ascending')
				.removeClass('moko-sort-descending');
			if( descending < 0 ){
				$swit.addClass('moko-sort-descending'); }
			else{
				$swit.addClass('moko-sort-ascending'); }


			return false;
		};

		$('.moko-sort-switch-band>span')
		.live('click', function(e){ return sortHandler(e) } )
		.live('contextmenu', function(e){ return sortHandler( e, true ) } )
		;
	},

	reorderBySquadList: function(){
		var self = this;
		var $table = self.$table;
		self.squadList.each(function(squadInfo){
			squadInfo.$row.appendTo( $table );
		});
	},

	SQUAD_SORT_SETTING: {
		groupID             : { type: 'numPostNil', descending: false, },
		squadID             : { type: 'num'       , descending: false, },
		squadName           : { type: 'str'       , descending: false, },
		kana                : { type: 'str'       , descending: false, },
		cardID              : { type: 'str'       , descending: false, },
		soldierTypeno       : { type: 'str'       , descending: false, update: function(){return $(this).find(':input[id^="unit_id_select_"]').val().fetchNum() } },
		soldierType         : { type: 'str'       , descending: false, update: function(){return $(this).find('img[id^="now_unit_img_"]').attr("alt")} },
		rarerity            : { type: 'num'       , descending: true , },
		rank                : { type: 'num'       , descending: true , },
		level               : { type: 'num'       , descending: true , },
		hp                  : { type: 'num'       , descending: true , },
		cmdRankYari         : { type: 'str'       , descending: false, },
		cmdRankYumi         : { type: 'str'       , descending: false, },
		cmdRankKiba         : { type: 'str'       , descending: false, },
		cmdRankHeiki        : { type: 'str'       , descending: false, },
		yari                : { type: 'num'       , descending: true , },
		yumi                : { type: 'num'       , descending: true , },
		kiba                : { type: 'num'       , descending: true , },
		heiki               : { type: 'num'       , descending: true , },
		cost                : { type: 'num'       , descending: false, },
		soldierNum          : { type: 'num'       , descending: true , update: function(){return $(this).find(':input[id^="unit_cnt_text_"]').val().fetchNum() || 0 } },
		commandPow          : { type: 'num'       , descending: true , },
		attackPow           : { type: 'num'       , descending: true , },
		defensePow          : { type: 'num'       , descending: true , },
		tacticsPow          : { type: 'num'       , descending: true , },
		skillNum            : { type: 'num'       , descending: true , },
		squadAttack         : { type: 'num'       , descending: true , },
		squadDefense        : { type: 'num'       , descending: true , },
		squadDestruct       : { type: 'num'       , descending: true , },
		squadMovement       : { type: 'num'       , descending: true , },
		defaultSoldierType  : { type: 'strPostNil', descending: false, },
	},

	reorderByGroup: function() {
		var self = this;
		var squadConfig = mokoStorage.getItem('Squads');

		$R( 1, self.groupConfigs.length - 1 ).reverse().each(function(groupID){

			$O.keys( squadConfig ).reverse().each(function( squadID ){
				var squad = squadConfig[squadID];
				if ( squad.groupID == groupID ){
					// マッチしたグループ名を持つTRを TRごと、ヘッダの後に挿入
					self.$headRow.after($('tr[moko-squadID="'+squadID+'"]'));
				}
			});
		});

	},

	/** サイドボックスに総兵数表示 */
	displayTotalSoldierNum: function(deployedSoldiers){
		var self = this;
		if (self.useUnitListTotal) {
			var total = 0;
			var tmpl = ''+<><![CDATA[
				<TABLE style="background-color:#F3F2DE;" class="common_table1 center">
				    {{each soldiers}}{{if $value}}
				    <TR><TH>${$index}</TH><TD>${$value.commalize()}</TD></TR>
				    {{/if}}{{/each}}
				    <TR><TH>合計</TH><TD>${total.commalize()}</TD></TR>
				</TABLE>
			]]></>;
			Object.each( deployedSoldiers, function(num, type){ total += num });
			GM_log(deployedSoldiers);
			var sortedKeys = $O.keys(deployedSoldiers)
				.map(function(typeName){return SOLDIER_DATA[typeName].typeno })
				.sort() // "321" など兵種コードでソート
				.map(function(typeno){ return SOLDIER_DATA_BY_TYPENO[typeno].name})
			;
			var sortedDeployedSoldiers = Object.subset( deployedSoldiers, sortedKeys );
			GM_log(sortedKeys, sortedDeployedSoldiers);
			$.tmpl(tmpl,{ total: total, soldiers: sortedDeployedSoldiers }).appendTo('#mokotool');
		}
	},

	/** 表示順に並び替えるボタンのイベントハンドラ */
	clickHdl_reorderSquadsOrder: function(e, $mainTable) {
		var self = this;
		var squadConfig = mokoStorage.getItem('Squads');
		var tmp_squadConfig = {};
		var tmp_abscence_squadConfig = {};
		//var ngroup_index = [];
		// 現在の並びを保存
		self.getDataRows().each(function() {
			var squadID = $(this).data('squadID');
			//console.log( $(this).find('td:eq(0) a').text() )
			tmp_squadConfig[squadID] = squadConfig[squadID];
			//ngroup_index.push(squadID);
		});
		// 参照を維持するため、一旦空にして、同じオブジェクトに追加しなおす。
		Object.keys(squadConfig).each(function(key){
			// このリストにいない部隊配置済み武将が消えるので一旦避難
			if( !tmp_squadConfig[key] ){
				tmp_abscence_squadConfig[key] = squadConfig[key];
			}
			delete squadConfig[key]
		});
		Object.merge(squadConfig, tmp_squadConfig);
		// 避難してたやつを最大100件まで戻す。それ以降はしらね
		let limit = 0;
		Object.keys(tmp_abscence_squadConfig).every(function(key){
			squadConfig[key] = tmp_abscence_squadConfig[key];
			return ++limit <= 100;
		});
		mokoStorage.flush();
		$('#ixamoko_reset_grp_result').html('<SPAN style="color:#000;">Done.</SPAN>');
	},

	/** グループアイコンクリック時のイベントハンドラ
	* コンテキスト：self
	*/
	clickHdl_groupIconChange: function(e) {
		var self = this;
		var $this = $(e.target);
		
		var $row = $this.closest('tr');
		var $data = $row.data();
		var squadID = $data.squadID;
		
		squad = $data.squad ;

		switch( e.which ){
			// 左クリック
			case 1 :
				++squad.groupID;
				if (squad.groupID >= self.groupConfigs.length )
					squad.groupID = 0;
			break;
			// 右クリック
			case 3 :
				--squad.groupID;
				if (squad.groupID < 0)
					squad.groupID = self.groupConfigs.length -1;
			break;
			default:
				return false;
		}

		$row.attr('moko-groupID', squad.groupID)
		var marker = self.groupConfigs[ squad.groupID ];

		// 変更したグループに合わせて表示とデータ更新
		// 色 // HPステータスがあり、負傷中なら負傷色
		var rowColor = marker ? marker.colors.normal : '' ;
		if ( self.useUnitListHpBgc && $data.captain.hp < 100) {
			rowColor = marker.colors.wounded;
		}
		$row.css({backgroundColor: rowColor});
		
		// アイコン
		if (self.useUnitListIcon) $this.attr('src', marker.src );

		// 新しい設定を保存
		mokoStorage.flush();
		return false;
	},

	/** 武将のグループ状態を表示 */
	displayGroupInfoOnCells: function($row, squad, captain){
		var self = this;

		var groupConfigs = self.groupConfigs ;

		// 未設定の場合、0番目（無）のグループに配属
		if( typeof squad.groupID === 'undefined' ){ squad.groupID = 0 }
		
		// 武将名
		squad.cardName = $row.find('td:eq(0) a').text().trim();
		
		var marker = groupConfigs[ squad.groupID ];
		if( marker === undefined ){
			//console.log( squad.groupID, groupConfigs );
		}
		
		// HPステータスがあり、負傷中なら負傷色
		var rowColor = marker ? marker.colors.normal : '' ;
		if ( self.useUnitListHpBgc && captain.hp < 100) {
			rowColor = marker.colors.wounded;
		}
		$row.css({backgroundColor: rowColor});
		$row.attr('moko-groupID', squad.groupID);
		$row.attr('moko-squadID', captain.squadID);
		
		var $icon = $row.find('IMG:eq(0)')
		.attr('cardid', captain.squadID);

		// アイコンを使うなら画像を変更
		if (self.useUnitListIcon){
			$row.find('IMG:eq(0)')
				.addClass('ixamoko_grp')
				.css({cursor:'pointer'})
				.attr({src: marker.src, alt: marker.alt, title: marker.alt })
			// var $span = $('<span>',{class:'moko-group-icon'});
			// $icon.replaceWith($span);
		}

	},

	displayUnitListHP: function($row, captain){
		var self = this;
		// HP状態を武将名の下に追加
		if (self.useUnitListHp) {
			if ( captain.hp ) {
				$row.find('IMG:eq(0)').attr("ALIGN","left");
				$row.find('A:eq(0) ')
				.after($F(<><![CDATA[
					<DIV style="margin-top: 5px;width:90px;">
						<span style="color: #e02020;margin-right: 1px;">&hearts;</span>
						<span style="font-size: 11px; ">%s/100</span></DIV>
				]]></>, captain.hp));

				if (self.useUnitListHpBgc && ( captain.hp < 100 )) {
					$row.css({backgroundColor:'#aaa'});
				}
			} else {
				// $row.find('TD:eq(2)').after('<TD>-</TD>');
			}
		}
	},


	unit_list_max: function () {
		if(!this.useUnitListMax) return;
		$('td > span[id^="unit_set_link"]').live('click',function(){
			var idx = $(this).attr('id').replace(/^unit_set_link/,'');
			$('#btn_change_'+idx).fireEvent("click");
		});
		/* NOTE 改造さん：2-18 */
		$('select[id^="unit_id_select_"]').live('change',function(){
			var idx = $(this).attr('id').replace(/^unit_id_select_/,'');
			if( $('#unit_id_select_'+idx).val()!='' && $('#unit_cnt_text_'+idx).val()=='0' ){
				$('#unit_cnt_text_'+idx).attr('value','1');
				$('#btn_change_'+idx).fireEvent("click");
			}
			else if($('#unit_id_select_'+idx).val()==''){
				$('#unit_cnt_text_'+idx).attr('value','0');
				$('#btn_change_'+idx).fireEvent("click");
			}
		});
	}
});////}}}

//******************************************************************************
/** 簡易編成：兵0・1を設定 */
//------------------------------------------------------------------------------
// function unit_list_hikyou ()
Moko.SoldierDeployment = FeatureInit({////{{{
	name: 'SoldierDeployment',
	config: function(cfg){ return cfg['unit_list_hikyou'] && cfg['hold_butai'] },
	configSettings: {
		 unit_list_hikyou: { caption: '秘境部隊に兵士1セット', },
	},
	group: 'unit',
	condition: function () { return LPath.set_unit_list },
	style: '#ixamoko-deployment-all{ background: #BB9; padding: 3px; margin:2px 0; color: black; }',
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var tmp=''+<><![CDATA[
			<div id="ixamoko-deployment-all" class="clearfix">
				<input type=radio name=set_type id=ro1 value=0 checked>
				<label for=ro1>兵士0武将</label>
				<input type=radio name=set_type id=ro2 value=1>
				<label for=ro2>秘境部隊</label>
				<input type=button value="兵士1セット" onclick="return false;" id="hikyou_butai">
				<input type=button value="全部隊兵士0セット" onclick="return false;" id="zero_butai">
			</div>
		]]></>;
		$('#ixamoko-organizer-forms').append(tmp);
		$('#hikyou_butai').live('click',function(){
			var butai_list = {};
			var card_array = new Array();
			var zeroSolCardIDs = $('tr:has(>td>input[id^="card_id_arr_"])')
					.filter(function(){ return $(this).find('>td>input[id^="unit_cnt_text_"]').val() == 0 })
					.find('>td:eq(0)>input[id^=card_id_arr_]')
					.map(function(){return $(this).val()})
					.toArray();

			if($('input[name=set_type]:checked').val()=='1'){
				butai_list = mokoStorage.getJSON("ixakaizou_butai_list_id");
				if( !Object.getLength(butai_list) ) {
					alert('お気に入り部隊が登録されていません');
					return;
				}

				var dungeonUnits = [];
				Object.each(butai_list, function( butai, name ){
					if( butai[0]==3) {
						butai.split(',').slice(1).each(function(squad){
							dungeonUnits.push( squad.split(':')[1] );
						});
					}
				});

				if(dungeonUnits.length==0) {
					alert('秘境部隊が登録されていません');
					return;
				}

				zeroSolCardIDs = zeroSolCardIDs.filter(function(cardID){
					return dungeonUnits.indexOf( cardID ) >= 0;
				});
			}

			var unit_type = '';
			var max_unit = 0;
			$('select[name^="unit_id_select"]').each(function(){
				$(this).children('option').each(function() {
					if($(this).text()=='なし') return true;
					var num = $(this).text().substring($(this).text().indexOf("(")+1,$(this).text().indexOf(")"));
					if(num=='0') return true;
					if(num > max_unit) {
						max_unit=num;
						unit_type=$(this).val();
					}
				});
				return false;
			});
			if(unit_type=='') {
				alert('待機兵がいません');
				return;
			}
			if(max_unit < zeroSolCardIDs.length) {
				alert('待機兵が足りません');
				return;
			}
			$('input[onclick^="postSetUnit"]').each(function(){
				$(this).attr("disabled","disabled");
			});
			$('#hikyou_butai').attr("disabled","disabled");
			nowLoading(zeroSolCardIDs.length);
			self.deploySoldier(zeroSolCardIDs, unit_type, 1);
		});
		// NOTE 1.8.6+2-19
		$('#zero_butai').live('click',function(){
			if( confirm('全部隊の兵士が「0」になります。構いませんか？') ){
				var squadIDs = $('.common_table1.center.mt10 tr:gt(0)').map(function(){
					var $row = $(this);
					return $(this).data('squadID');
				}).toArray();
				nowLoading(squadIDs.length);
				self.deploySoldier(squadIDs, "", 0);
			}
		});
	},

	// unit_list_set
	deploySoldier: function (cardIDs, unitTypeno, soldierNum ) {
		var self = this;
		if(!cardIDs.length) {
			location.href='/facility/set_unit_list.php?show_num=100';
			return;
		}

		var captainID = cardIDs.shift();
		IXA_deploySoldier(
			captainID, unitTypeno, soldierNum,
			function(){
				self.deploySoldier(cardIDs, unitTypeno, soldierNum);
			}
		)
	},
	
});////}}}

//******************************************************************************
/** 簡易編成：一括編成・豪華版 */
//------------------------------------------------------------------------------
// function unit_list_allset()
Moko.SoldierDeploymentSpecial = FeatureInit({////{{{
	//enable: false,
    name: 'SoldierDeploymentSpecial',
	config: function(cfg){ return !!cfg['unit_list_allset'] && !!cfg['hold_butai'] },
	group: 'unit',
	options: {
		useDefaultSoldierTypeSelection: 'unit_list_default',
		groupConfigs: 'groupConfigs',
		defaultSoldierTypeSelectionAsHide: 'unit_list_default_hide',
	},
	configSettings: {
		 unit_list_allset: { caption: 'いろんなパターンで一括編成', },
		 unit_list_default: { caption: '基本兵種のインターフェイスを表示する', },
		 unit_list_default_hide: { caption: '各武将の基本兵種の選択欄を非表示にする',
			 default_value: false,
		 },
	},
	condition: function () { return LPath.set_unit_list },
	style: ''+<><![CDATA[
		#moko-deployment-special{ background: #BB9; padding: 3px; margin: 2px 0; color: black; }
		#moko-default-soldier-ui {color: black; border: solid 1px #BB9; padding:4px; -moz-border-radius: 4px; }
		#moko-organizer-sp-message { padding: 3px; color: #333; }
	]]></>,
	ready: function(){
		if( this.useDefaultSoldierTypeSelection ){
			this.unitListDefaultView();
		}
		this.run();
	},
    //------------------------------------------------------------------------------
    run: function () {////{{{
		var self = this;
		var default_unit={};
		var squadConfig = mokoStorage.getItem('Squads');
		// TODO
		//if (localStorage.getItem("ixamoko_default_unit")!=null) {
		//	default_unit = secureEvalJSON(localStorage.getItem("ixamoko_default_unit"));
		//}
		var panelTemplate =''+<><![CDATA[
			<div id="moko-deployment-special">
				兵数
				<select id="select_butai_heisuu">
					<option value="0">0</option>
					<option value="1">1</option>
					<option value="2+">2以上</option>
					<option value="ALL">0以上</option>
				</select>
				の
				<select id="select_butai_heisyu">
					<option value="all">全て</option>
					{{each soldierMap}}<option value="${$index}">${$value}</option>{{/each}}
				</select>
				の武将に
				<select id="set_butai_heisyu">
					<option value="nochange">現状兵種</option>
					<option value="default">基本兵種</option>
					<option value="zanhei">余り兵種</option>
					{{each soldierMap}}<option value="${$index}">${$value}</option>{{/each}}
				</select>
				で兵数
				<select id="set_butai_heisuu">
					<option value="max">最大</option>
					<option value="0">0</option>
					<option value="1">1</option>
				</select>
				を
				<input type=button id="heisi_set" value="一括セット">
				<span id="moko-organizer-sp-message"></span>
				<div style="display:inline-block; float: right;">
					<span>全武将：</span>
					<input id="moko-organizer-sp-min-soldier" type="button" value="兵1" title="現状兵種で兵1（兵0を除く）" />
					<input id="moko-organizer-sp-max-soldier" type="button" value="最大" title="現状兵種で最大化（兵0を除く）" />
				</div>
			</div>
		]]></>;

		var soldierMap = {
			321:'足軽'     , 322:'長槍足軽' , 323:'武士'   , 324:'国人衆' , 
			325:'弓足軽'   , 326:'長弓兵'   , 327:'弓騎馬' , 328:'海賊衆' , 
			329:'騎馬兵'   , 330:'精鋭騎馬' , 331:'赤備え' , 332:'母衣衆' , 
			333:'破城鎚'   , 334:'攻城櫓'   , 335:'大筒兵' , 
			336:'鉄砲足軽' , 337:'騎馬鉄砲' , 338:'雑賀衆' , 
		};
		
		var panel = $.tmpl(panelTemplate, {soldierMap: soldierMap} );
		
		$('#ixamoko-organizer-forms').append( panel );

		// 全兵最大実行
		$('#moko-organizer-sp-max-soldier').click(function(){
			if(confirm('指揮兵を持つすべての武将の兵数を「最大」に設定します。よろしいですか？')){
				// フォームをセット
				$('#select_butai_heisuu').val('ALL');
				$('#select_butai_heisyu').val('all');
				$('#set_butai_heisyu').val('nochange');
				$('#set_butai_heisuu').val('max');
				// クリックイベントを発生させて実行
				$('#heisi_set').fireEvent('click');
			}
		});

		// 全兵1実行
		$('#moko-organizer-sp-min-soldier').click(function(){
			if(confirm('指揮兵を持つすべての武将の兵数を「1」に設定します。よろしいですか？')){
				// フォームをセット
				$('#select_butai_heisuu').val('2+');
				$('#select_butai_heisyu').val('all');
				$('#set_butai_heisyu').val('nochange');
				$('#set_butai_heisuu').val('1');
				// クリックイベントを発生させて実行
				$('#heisi_set').fireEvent('click');
			}
		});

		// 編成実行
		$('#heisi_set').live('click',function(){
			//nowLoading();

			var card_array = new Array();
			
			// フォームの状態
			// 条件
			var conditionSoldierNum = $('select#select_butai_heisuu option:selected').val();
			var conditionSoldierType = $('select#select_butai_heisyu option:selected').val();
			// 設定する値
			var settingSoldierType = $('#set_butai_heisyu option:selected').val();
			var settingSoldierNum = $('#set_butai_heisuu option:selected').val();
			
			// 余り兵カウント用
			var soldierCounts = {};
			$('select[id^="unit_id_select_"]:first option').each(function(){
				var $this = $(this);
				var solKey = $this.val();
				var num = $this.text().replace(/^.*\(/,'').fetchNum();
				if( solKey && num ){
					soldierCounts[solKey] = num;
				}
			})
			
			// //
			// // XXX 兵がなくても解除はできる
			// //
			// var isNotRestSoldier = !Object.getLength(soldierCounts);
			// if(isNotRestSoldier) return ;

			// 条件のフィルターをかけた $(TR[]) を取得
			var $rows = self.filterRows();

			if(!$rows.length){
				self.displayMessage('該当武将なし');
			}

			// 各 $TR に値をセットし、処理の必要のないものは取り除く
			//var procFormReady = function(_row){
			//	var $row = $(_row);
			$rows.each(function(idx){

				//
				//NOTE 10件でテスト
				//
				//if( idx > 10 ) return false;

				var $row = $(this);
				var squadID = $row.data('squadID');
				var no = $row.find('input:eq(0)').val();
				/*割当数*/   var nowSoldierNum  = $row.find(':input[id^="unit_cnt_text_"]').val().fetchNum();
				/*割当兵種*/ var nowSoldierType = $row.find(':input[id^="unit_id_select_"]').val();
				//GM_log('現在：', nowSoldierType, nowSoldierNum );
				var now_default = "";
				if( squadConfig[squadID] && squadConfig[squadID].defaultSoldierType ){
					now_default = squadConfig[squadID].defaultSoldierType;
				}

				// 割り当てるのに、兵がなくなったら処理を終わる
				if( settingSoldierNum != 0 && !Object.getLength(soldierCounts) ){
					self.displayMessage('兵がいません');
					return false;
				}
				
				var soldierType = '';
				var soldierNum = 0;
				if( settingSoldierNum != 0 ){
					//-----------------------------------------------------------
					// 兵種決定
					//-----------------------------------------------------------
					// 基本兵種（小隊ごとに別途記憶させる値）
					if( settingSoldierType =='default'){
						if( !now_default ) return; // 基本兵種決まってない
						soldierType = now_default ;
					}
					// 余り兵
					else if( settingSoldierType=='zanhei'){
						//GM_log(soldierCounts);
						let solKeys = $O.keys(soldierCounts);
						if(nowSoldierType) solKeys.append([nowSoldierType]);
						soldierType = solKeys.sort()[0];
					}
					// 現状「ではない」（上部のフォーム選択した兵種を配置）
					else if( settingSoldierType !='nochange'){
						soldierType = settingSoldierType;
					}
					// 現状の兵種
					else {
						soldierType = $('#unit_id_select_'+no).val();
					}

					//GM_log('割り当て兵種：', soldierType+(soldierType?(':'+SOLDIER_DATA_BY_TYPENO[soldierType].name):'') );
					
					// 兵種をフォームにセット
					$('#unit_id_select_'+no).val( soldierType );
					
					//GM_log('soldierTYpe', soldierType);
				
					//-----------------------------------------------------------
					// 割り当てる兵数決定
					//-----------------------------------------------------------

					// 割当可能数
					let capableSolNum = soldierCounts[soldierType] || 0;
					// 割当兵種と現在の兵種が同じ場合は割当可能数に加える
					if( soldierType == nowSoldierType && nowSoldierNum ){
						capableSolNum += nowSoldierNum;
					}
					// 最大指揮力
					let maxSolNum = $('#lead_unit_'+no).toNum();
					
					// 最大でない→指定数を入力
					if( settingSoldierNum !='max'){
						// 割り当て可能数より、割り当て数が多ければ抜ける
						if( settingSoldierNum > capableSolNum )
							return;
						soldierNum = settingSoldierNum;
					}
					// 最大
					else {
						// 選択兵種と指揮力最大値を比較し、配属可能な最大値を得る
						soldierNum = Math.min( capableSolNum, maxSolNum );
						//GM_log('割り当て数（最大）：', soldierNum);
					}
					
					// 
					// 兵種が選択されていない場合、兵数をゼロにする
					//
					if( soldierType =='') { soldierNum = 0; }
				}
				
				//
				// フォームに兵士数をセット
				//
				$('#unit_cnt_text_'+no).val( soldierNum );
				//GM_log( 'soldierNum', soldierNum );

				//
				// 元の兵種と兵数ともに変更がない場合は抜ける
				//
				if(
					( nowSoldierNum == soldierNum )
					&& ( nowSoldierType == soldierType )
				){
					//GM_log('変更なし');
					return true;
				}
				
				//-----------------------------------------------------------
				// 余り兵チェック
				//-----------------------------------------------------------

				// 現状の兵種の数をいったん管理用オブジェクトに加える
				if(nowSoldierType && nowSoldierNum){
					if(!soldierCounts[nowSoldierType])
						soldierCounts[nowSoldierType] = 0;
					soldierCounts[nowSoldierType] += nowSoldierNum;
				}

				// そんでもって配備する兵を引く
				if(soldierType && soldierNum ){
					soldierCounts[soldierType] -= soldierNum;
					// なんかの間違いでマイナスになったなら明らかに異常なので処理を中止する
					if( soldierCounts[soldierType] < 0 ){ return false; }
				}

				// ゼロになったら、もう配備できないのでキーを消す
				$O.each(soldierCounts, function(v, k, o){
					if(!v) delete o[k];
				});

				//GM_log(soldierCounts);
				//let testSolCnts = {};
				//$O.each(soldierCounts, function(v, k){
				//	testSolCnts[ k +':'+ SOLDIER_DATA_BY_TYPENO[k].name ] = v;
				//});
				//GM_log(testSolCnts);

				//-----------------------------------------------------------
				
				//-----------------------------------------------------------
				// 配属用オブジェクトを作り、配列に加える
				//-----------------------------------------------------------
				var deployment = {
					//squadID: $row.data('squadID'),
					squadName:   squadConfig[squadID].cardName,
					squadID:     $('#card_id_arr_'+no).attr('value'),
					soldierType: soldierType,
					soldierNum:  soldierNum
				};
				//GM_log( deployment );
				
				card_array.push( deployment );
			});
			
			if( card_array.length ){
				self.deploySoldierSequential(card_array);
			}
		});
	},////}}}

	displayMessage: function(message){
		$('#moko-organizer-sp-message').text( message );
	},

	/** 条件に従い、フィルターされた $(TR[]) を返す */
	filterRows: function(beTranslution){////{{{
		var card_array = new Array();
		
		// フォームの状態
		// 条件
		var conditionSoldierNum = $('select#select_butai_heisuu option:selected').val();
		var conditionSoldierType = $('select#select_butai_heisyu option:selected').val();
		// 設定する値
		var settingSoldierType = $('#set_butai_heisyu option:selected').val();
		var settingSoldierNum = $('#set_butai_heisuu option:selected').val();

		// 小隊 TR のループ
		//$('.common_table1.center.mt10').find('tr').each(function() {
		var $rows = $('.common_table1.center.mt10 tr:gt(0)');

		// テスト
		$rows = $rows.filter(function(){
			var $row = $(this);
			var no = $row.find('input:eq(0)').val();
			var now_heisu = $('#unit_cnt_text_'+no).val();
			if(
				// 「兵数」と同じ小隊のみに絞る
				/*2以上*/( (conditionSoldierNum == '2+' ) && (now_heisu>=2) )
				||
				/*0、1*/ (  conditionSoldierNum == now_heisu)
				||
				/*0以上*/(  conditionSoldierNum == 'ALL')
			){
				$row.fadeTo(0,1);
				return true;
			}
			else{
				if( beTranslution )
					$row.fadeTo(0,0.5);
			}
		});
		
		//GM_log('兵数フィルター後', $rows.length);
		
		$rows = $rows.filter(function(){
			var $row = $(this);
			var no = $row.find('input:eq(0)').val();
			/*割当兵種*/ var now_unit = $('#unit_id_select_'+no).val();
			if(
				( conditionSoldierType == 'all' )
				// 「兵種」と同じ兵種を指揮中の小隊のみに絞る
				|| ( conditionSoldierType == now_unit)
			){
				$row.fadeTo(0,1);
				return true;
			}
			else{
				if( beTranslution )
					$row.fadeTo(0,0.5);
			}
		});
		
		//GM_log('兵種フィルター後', $rows.length);
		return $rows;
	},////}}}
	
	deploySoldierSequential: function ( deploymentSettings ) {////{{{
		if( deploymentSettings.length <= 0) {
			location.href='/facility/set_unit_list.php?show_num=100';
		}
		
		nowLoading( deploymentSettings.length );
		
		(function(){
			var deployment = deploymentSettings.shift();
			// 要素がなければ抜ける
			if(!deployment){
				location.reload();
				return;
			}

			var hereArgs = arguments;

			IXA_deploySoldier(
				deployment.squadID,
				deployment.soldierType,
				deployment.soldierNum,
				function(){
					countUpProgress();
					//==================================================
					 hereArgs.callee() // 再帰
					//==================================================
				}
			);
		})();

	},////}}}
	
	//deploySoldier: function (cardIDs, soldierType, soldierNum) {
	//	var self = this;
	//	var data = {card_id:card_id, unit_type:soldierType, unit_count:soldierNum};
	//	$.ajax($.extend({},AJAX_NOASYNC_NOCACHE_POST,{
	//		url: '/facility/set_unit_list_if.php',
	//		data:data,
	//		success: function (html){ },
	//		error: function (XMLHttpRequest, textStatus, errorThrown) {
	//			//console.log(textStatus);
	//		}
	//	}));
	//},

	// unitListDefaultView
	unitListDefaultView: function (){////{{{
		var self = this;
		var squadConfig = mokoStorage.getItem('Squads');

		$('<span id="moko-default-soldier-ui"><b>基本兵種：</b></span>')
			.appendTo('#ixamoko-organizer-forms-bottom')
		;//$end

		$(sprintf('<button id="default_unit_set">%s</button>', self.defaultSoldierTypeSelectionAsHide ? '表示' : '非表示' ))
			.click(function(){
				if( self.defaultSoldierTypeSelectorAsInitialized ){
					$('.moko-default-soldier-type').toggle();
				}
				else{
					self.addDefaultSoldierTypeSelector();
				}
				var $btn = $(this);
				if( $btn.text() == '非表示' ){ $btn.text('表示') }
				else{ $btn.text('非表示') }
			})
			.appendTo('#moko-default-soldier-ui')
		;//$end

		$('<button id="default_soldier_into_group">グループ設定に従う</button>')
			.click(function(){
				if( confirm('基本兵種未設定の武将をグループ設定に従い初期化します。') ){
					var groupConfigs = self.groupConfigs ;
					$('.common_table1.center.mt10 tr:gt(0)').each(function(){
						var $row=$(this);
						var groupID = ($row.data('squad')||{}).groupID;
						var soldierType = (groupConfigs[groupID]||{}).soldierType;
						if(soldierType){
							var select = $row.find('.moko-default-soldier-type');
							if( !select.val() ){
								select.val( soldierType );
							}
							select.fireEvent('change');
						}
					})
				}
			})
			.appendTo('#moko-default-soldier-ui')
		;
		$('<button id="default_soldier_clear">クリア</button>')
			.click(function(){
				if( confirm('設定している基本兵種をすべてクリアします。') ){
					var groupConfigs = self.groupConfigs ;
					$('.common_table1.center.mt10 tr:gt(0)').each(function(){
						$(this).find('.moko-default-soldier-type').val("").fireEvent('change');
					})
				}
			})
			.appendTo('#moko-default-soldier-ui')
		;

		//$('.common_table1.center.mt10').find('th:eq(5)').replaceWith('<th>基本兵種/兵数</th>');
		$('.common_table1.center.mt10').find('th:eq(5)').prepend('基本兵種/');
		if( !self.defaultSoldierTypeSelectionAsHide ){
			self.addDefaultSoldierTypeSelector();
		}

		//// 基本兵種を覚えるボタンイベント
		//$('#default_unit_set').live('click',function(){
		//		var default_unit = {};
		//		$('SPAN[id^="now_unit_cnt_"]').each(function() {
		//			var id_num = $(this).attr('id').substring(13);
		//			var card_id = $('#card_id_arr_'+id_num).val();
		//			var unit = $('#unit_default_select_'+id_num+' option:selected').val();
		//			default_unit[card_id] = unit;
		//		});
		//		localStorage.setItem('ixamoko_default_unit', toJSON(default_unit));
		//		alert('基本兵種を保存しました。');
		//});
	},////}}}

	defaultSoldierTypeSelectorAsInitialized: false,
	addDefaultSoldierTypeSelector: function(){
		var self = this;
		var squadConfig = mokoStorage.getItem('Squads');
		var tmplSoldierSelect = $(''+<><![CDATA[
			<div><select id="unit_default_select_${no}" class="moko-default-soldier-type" style="display:block;">
				<option value="">なし</option>
				<option value="321">足軽</option>
				<option value="322">長槍足軽</option>
				<option value="323">武士</option>
				<option value="324">国人衆</option>
				<option value="325">弓足軽</option>
				<option value="326">長弓兵</option>
				<option value="327">弓騎馬</option>
				<option value="328">海賊衆</option>
				<option value="329">騎馬兵</option>
				<option value="330">精鋭騎馬</option>
				<option value="331">赤備え</option>
				<option value="332">母衣衆</option>
				<option value="333">破城鎚</option>
				<option value="334">攻城櫓</option>
				<option value="335">大筒兵</option>
				<option value="336">鉄砲足軽</option>
				<option value="337">騎馬鉄砲</option>
				<option value="338">雑賀衆</option>
			</select></div>
		]]></>);

		$('.common_table1.center.mt10').find('tr:gt(0)').each(function() {
			var $row = $(this);
			var squadID = $row.data('squadID');
			var no = $(this).find('input:eq(0)').val();

			var $soldierSel = tmplSoldierSelect.tmpl({no: no });
			$soldierSel.insertBefore('#unit_cnt_text_'+no);
			
			// 保存済みの兵種を初期値として設定
			if( squadConfig[squadID].defaultSoldierType ){
				$('#unit_default_select_'+no).val(squadConfig[squadID].defaultSoldierType);
			}
		});

		// 基本兵種を覚えるボタンイベント
		$(document).on('change', '.moko-default-soldier-type',function(){
			var $this = $(this);
			var $row = $this.closest('tr');
			var squadID = $row.data('squadID');
			
			if( squadConfig[squadID] ){
				squadConfig[squadID].defaultSoldierType = $this.val();
				mokoStorage.flush();
			}
		});

		self.defaultSoldierTypeSelectorAsInitialized = true;

	},

});////}}}

//******************************************************************************
/** 一括削除：ランク一定以上の非活性、全選択ボタンの追加 */
//------------------------------------------------------------------------------
//function delList_check()
Moko.CardDeleteMisc = FeatureInit({////{{{
	name: 'CardDeleteMisc',
	options: { lockedRank: 'rank_lock' },
	group: 'deck',
	configSettings: {
		rank_lock: {
			caption: '一括削除の非活性化', type: 'selectBox',
			optionMap: { 0: '非活性化しない', 1: '上以上非活性', 2: '特以上非活性', 3: '極以上非活性', 4: '天のみ非活性'},
			default_value: 2
		}
	},
	condition: function () { return LPath.deck_card_delete },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		//checkboxが有効な場合、特以上は非活性に、また一括選択ボタンを追加
		if ($('DIV.ig_decksection_innermid').find('INPUT[name="delete_card_arr[]"]:eq(0)').attr("type") == "checkbox") {

			$('DIV.ig_decksection_innermid').find('tr').each(function() {
				var a = $(this).find('img').attr('alt');

				// 天・極持ってないからSR・URは未確認
				if ( self.lockedRank != 0
						&& ( ( a == "UC" && self.lockedRank <= 1 )
							   || ( a == "R"  && self.lockedRank <= 2 )
							   || ( a == "SR" && self.lockedRank <= 3 )
							   || ( a == "UR" && self.lockedRank <= 4 ) ) ) {

					$(this).find('INPUT[name="delete_card_arr[]"]').attr("disabled","disabled");
				}
			});

			var trth = $('DIV.ig_decksection_innermid').find('TABLE');
			trth.before(''+<><![CDATA[
				<DIV id="moko-card-delete-ui" class="left" style="width:640px; margin-left:auto; margin-right:auto;">
					<INPUT type="button" value="全選択" id="moko-all-select"/>
					<INPUT type="button" value="全解除" id="unsel_check"/>
				</DIV>
			]]></>);

			$('#moko-all-select').click(function() {
				$('DIV.ig_decksection_innermid')
				.find(':checkbox[name="delete_card_arr[]"]:enabled:visible')
				.each(function() {
					$(this).prop("checked", true);
				});
			});

			$('#unsel_check').click(function() {
				$('DIV.ig_decksection_innermid')
				.find(':checkbox[name="delete_card_arr[]"]:checked').each(function() {
					$(this).prop("checked", false);
				});
			});
		}
	}
});////}}}

//******************************************************************************
/** 地図：地図共通 */
//------------------------------------------------------------------------------
Moko.MapCommon = FeatureInit({////{{{
    name: 'MapCommon',
	priority: PRIO_MORE_ERALY,
    condition: function () { return LPath.map },
	style: sprintf(''+<><![CDATA[
		/* 上部UIパネルの枠 */
		#moko-map-ui-panel {
			position: absolute;
			top: 100px;
			left: 10px;
			width: 596px;
			text-align: right;
			z-index: %(ZIDX_CONTENT)s;
		}
		/* ボタンの基本デザイン */
		#moko-map-ui-panel a {
			display: inline-block;
			font-size: 12px;
			font-weight: bold;
			-moz-box-sizing: border-box;
			height: 20px;
			margin: 0 0 0 4px;
			padding: 2px 4px;
			text-align: center;
			vertical-align: middle;
			border: solid 1.3px #FFF;
			-moz-border-radius: 2px;
			-moz-box-shadow: 0 0 0 1px #000, 0 0 2px #000 ;
			text-shadow: 0 0 2px #000, 0 0 2px #000;
			cursor: pointer;
			-moz-user-select: none;
			overflow: hidden;
			text-decoration: none;
		}
	]]></>,{ZIDX_CONTENT: ZIDX_CONTENT }),
    //------------------------------------------------------------------------------
    run: function () {
		// 国番号、中心座標を取得しておく
		this.common.nationID = $('#location_form div input[name="c"]').val().fetchNum() || 0 ;
		var centerHREF = $('#ig_map_movepanel>ul>li>a').attr('href');
		this.common.centerX = centerHREF.match(/x=(-?\d+)/)[1].fetchNum();
		this.common.centerY = centerHREF.match(/y=(-?\d+)/)[1].fetchNum();

		// 上部UI用の枠のみ
		var $mapBox = $('#ig_mapbox');
		var mapScaleButtons = $('#ig_map_movepanel > ul > li > a[href]')
		var $mapUIPlatge = $('<div>', {id:'moko-map-ui-panel'})
		.appendTo( $mapBox );
	}
});////}}}

//******************************************************************************
/** 地図：移動、表示スケールなどを上に */
//------------------------------------------------------------------------------
Moko.MapRefinedUI = FeatureInit({////{{{
    name: 'MapRefinedUI',
	config: 'map_refined_ui',
	caption: '地図移動フォームを上にも',
	//group: 'map',
	group: 'alpha',
	configSettings: {
		map_refined_ui: { default_value: false },
	},
	priority: PRIO_ERALY,
    condition: function () { return LPath.map },
	style: sprintf(''+<><![CDATA[
		#moko-map-ui-panel .moko-map-change-scale {
			background: #B0C457 ;
		}
		#moko-map-ui-panel [id^=moko-map-move-coord-] {
			-moz-box-sizing: border-box;
			vertical-align: middle;
			height: 18px;
			width: 3em;
			font-size: 12px;
			background: none repeat scroll 0 0 #fff;
			text-align: center;
			border: solid 1.3px #FFF;
			margin: 0 0 0 4px;
			-moz-border-radius: 2px;
			-moz-box-shadow: 0 0 0 1px #000, 0 0 2px #000 ;
		}
		#moko-map-ui-panel #moko-map-move-coord-x {
			margin-left: 8px;
		}
		#moko-map-ui-panel [id^=moko-map-ignit-] {
			width: 4em;
			background: none repeat scroll 0 0 #ddd;
			color: white;
		}
		#moko-map-ui-panel #moko-map-ignit-move {
			background: #2C6211;
		}
		#moko-map-ui-panel #moko-map-ignit-attack {
			background: #B01F1F;
		}
	]]></>,{ZIDX_CONTENT: ZIDX_CONTENT }),
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;

		var mapScaleButtons = $('#ig_map_movepanel > ul > li > a[href]')
		var $mapUIPlatge = $('#moko-map-ui-panel');

		var scaleName = {1:'11×11', 2:'15×15', 3:'20×20' };
		$R(1,3).map(function(scale){
			return sprintf(
				'<a href="/map.php?x=%s&y=%s&type=%s&c=%s" class="moko-map-change-scale">%s</a>',
				self.common.centerX,
				self.common.centerY,
				scale,
				self.common.nationID,
				scaleName[scale]
			);
		})
		.each(function(scaleAnc){
			$mapUIPlatge.append(scaleAnc);
		})
		;

		$.tmpl(''+<><![CDATA[
			<input type="text" id="moko-map-move-coord-x" /><input
				type="text" id="moko-map-move-coord-y" /><a
				id="moko-map-ignit-move">移動</a><a
				id="moko-map-ignit-attack">出陣</a>
		]]></>).appendTo( $mapUIPlatge );

		$('#moko-map-ignit-move').click(function(){
			var movingHREF = sprintf(
				'/map.php?x=%s&y=%s&c=%s',
				$('#moko-map-move-coord-x').val().fetchNum() || 0,
				$('#moko-map-move-coord-y').val().fetchNum() || 0,
				self.common.nationID
			);
			location.href = movingHREF ;
			return;
		});

		$('#moko-map-ignit-attack').click(function(){
			var movingHREF = sprintf(
				'/facility/send_troop.php?x=%s&y=%s&c=%s',
				$('#moko-map-move-coord-x').val().fetchNum() || 0,
				$('#moko-map-move-coord-y').val().fetchNum() || 0,
				self.common.nationID
			);
			location.href = movingHREF ;
			return;
		});
	}
});////}}}

//******************************************************************************
/** 地図：地図一覧を表示 */
//------------------------------------------------------------------------------
Moko.LandBookmark = FeatureInit({////{{{
	name: 'LnadBookmark',
	config: 'map_reg',
	group: 'map',
	priority: PRIO_ERALY,
	caption: '座標記録リスト表示',
	style: sprintf(''+<><![CDATA[
		#moko-map-locations-list{
			position: absolute;
			left: 620px;
			top: 400px;
			font-size: 10px;
			z-index: %(ZIDX_CONTENT_TOP)s;
			overflow-y: scroll;
			width: 165px; height: 110px;
			border: solid 1px #8C815E;
			-moz-border-radius: 4px;
			background: #F4F3E2;
		}
		#moko-map-locations-list > div {
			cursor:pointer;
			padding:2px;
			margin:1px;
		}
		#moko-map-locations-list > div:hover {
			background: #D5D0B9;
		}
		.moko-locations-list-dist {
			display: inline-block;
			font-size: 10px;
			background: #DDD9C2;
			padding: 2px;
			-moz-border-radius: 2px;
		}
		.moko-locations-list-dist span {
			display: inline-block;
			vertical-align: middle;
			font-size: 9px;
		}
	]]></>, {ZIDX_CONTENT_TOP: ZIDX_CONTENT_TOP}),
	condition: function () { return LPath.map },

	//------------------------------------------------------------------------------
	run: function () {
		//座標ブックマークパネルを表示
		var maplist_box = $('<DIV id="moko-map-locations-list">');
		$('#ig_mapbox').prepend(maplist_box);
		//座標ブックマーク構築
		this.structLandBookmarkList();
	},

	/** 座標ブックマークの一覧を構築 */
	structLandBookmarkList: function () {
		var currHold = IXA.Footholds.current();

		var $maplist_box = $('#moko-map-locations-list');
		$maplist_box.empty();
		var map_list = {};
		if (localStorage.getItem("map_list")) {
			map_list = JSON.parse(localStorage.getItem("map_list"));
		}

		$O.each(map_list, function(v, key){

			var tmp = key.match(/(-?\d+),(-?\d+)/);

			if (tmp===null) {
				//console.log('tmp null1');
				return;
			}

			var dist = IXA_getDistance(tmp[1], tmp[2], currHold.x, currHold.y);
			//var dist = Math.sqrt(Math.pow(parseInt(tmp[1])-currHold.x, 2)+Math.pow(parseInt(tmp[2])-currHold.y, 2));
			//dist = Math.floor(dist*10)/10;

			$(sprintf(
				'<DIV cood="%(key)s"><span class="moko-locations-list-dist"><span>距</span> %(dist)s</span> <strong>%(map_list_key)s</strong> %(key)s</DIV>',
				{key:key, dist:dist, map_list_key: map_list[key]}
			))
			.click(function(e) {
				var tmp = $(this).attr('cood').match(/(-?\d+),(-?\d+)/);
				if (tmp===null) {
					//console.log('tmp null2');
					return;
				}
				location.href = '/map.php?x='+tmp[1]+'&y='+tmp[2];
			})
			.appendTo($maplist_box);
		})
	}

});////}}}

//******************************************************************************
/** 地図：拡大 */
//------------------------------------------------------------------------------
Moko.MapHugeSacaling = FeatureInit({////{{{
    name: 'MapHugeSacaling',
	config: 'map_huge_scaling',
	caption: '地図を拡大可能にする',
	//group: 'map',
	group: 'alpha',
	configSettings: {
		map_huge_scaling: { default_value: false },
	},
	priority: PRIO_ERALY,
    condition: function () { return LPath.map },
	style: sprintf(''+<><![CDATA[
		#moko-map-ui-panel .moko-map-scale {
			width: 2.5em;
			background: none repeat scroll 0 0 #ddd;
			color: black;
			text-shadow: none;
		}
		#moko-map-ui-panel #moko-map-foothold {
			background: #000;
			color: white;
		}
		#moko-map-foothold-list {
			min-width: 120px;
			min-height: 15px;
			color: white;
			border: solid 1px #bbb;
			-moz-border-radius: 4px;
			-moz-box-shadow: 0 2px 3px -1px #000;
			position: absolute;
			z-index: %(ZIDX_CMENU)s;
			top: 270px;
			left: 550px;
			background: #000;
			padding: 8px 8px 12px 8px;
		}
		#moko-map-foothold-list li {
			margin-top: 8px;
		}
		#moko-map-foothold-list li.on {
			color: yellow
		}
		#ig_mapbox[moko-map-scale="2"]   #ig_cur04_w { left: 220px; top: 10px; }
		#ig_mapbox[moko-map-scale="2"]   #ig_cur04   { left: 250px; top: 30px; }
		#ig_mapbox[moko-map-scale="1.5"] #ig_cur04_w { left: 190px; top: 15px; }
		#ig_mapbox[moko-map-scale="1.5"] #ig_cur04   { left: 220px; top: 35px; }
		#ig_mapbox[moko-map-scale="1.5"] .moko-map-eswn-W { left: 80px; top:57px; }

		#ig_mapbox[moko-map-scale="2"]   #ig_mapbox_container {
			-moz-transform-origin : 40.5%% 0;
			-moz-transform        : scale(2);
			z-index               : %(ZIDX_CONTENT)s;
		}

		#ig_mapbox[moko-map-scale="1.5"]   #ig_mapbox_container {
			-moz-transform-origin : 40.5%% 0;
			-moz-transform        : scale(1.5);
			z-index               : %(ZIDX_CONTENT)s;
		}

	]]></>, {ZIDX_CMENU: ZIDX_CMENU, ZIDX_CONTENT: ZIDX_CONTENT} ),
    //------------------------------------------------------------------------------
    run: function () {

		var self = this;

		$.tmpl(''+<><![CDATA[
			<a class="moko-map-scale" scale="0">x1</a><a
				class="moko-map-scale" value="x1.5" scale="1.5">x1.5</a><a
				class="moko-map-scale" value="x2" scale="2">x2</a><a
				id="moko-map-foothold">拠点</a>
		]]></>).appendTo('#moko-map-ui-panel');

		//var rulePlane = '#ig_mapbox_container {}';

		//// 地図拡大用のCSSルール定義の場所を作り確保しておく
		//// $().css() ではAjax移動時に再々書き直す必要があるのでスタイルに直接登録する
		//MOKO_CSS.insertRule(rulePlane, 0);
		////GM_log( MOKO_CSS.cssRules[0] );
		//this.mapStyle = MOKO_CSS.cssRules[0].style;

		// 保存済みの拡大率を適用
		var stateScale;
		if( stateScale = mokoStorage.getItem('Status')[self.name] ){
			self.changeMapScale( stateScale );
		}

		// 拡大ボタンを押したときのイベント
		$('.moko-map-scale')
		.live('click', function(){
			var $btn = $(this);
			var scale = $btn.attr('scale').fetchNum();
			var mokoStatus = mokoStorage.getItem('Status');
			mokoStatus[self.name] = scale;
			mokoStorage.flush();

			self.changeMapScale( scale );
		});

		// 拡大時、右サイドメニューはほとんど使い物にならないので
		// 拠点リストのみボタンで呼び出せるようにしておく
		$('#moko-map-foothold')
		.live('click', function(){
			var $btn = $(this.target);
			var $footholdPanel = $('#moko-map-foothold-list');
			if( !$footholdPanel.length ){
				$('<div>', {id:'moko-map-foothold-list'})
				.append(
					$('.sideBox:has(.sideBoxHead>h3>img[alt="表示拠点選択"])')
					.clone().children()
				)
				.appendTo(Moko.Layouter)
			}
			else {
				$footholdPanel.toggle()
			}
		});
	},

	/** スタイルシートオブジェクトを直接書き換える */
	changeMapScale: function(scale){
		var self = this;
		//self.mapStyle.MozTransformOrigin = scale ? '40.5% 0'           : "" ;
		//self.mapStyle.MozTransform       = scale ? 'scale('+scale+')': "" ;
		//self.mapStyle.zIndex             = scale ? ZIDX_CONTENT      : "" ;

		var mapLocListTopDic = { 1: 400, 1.5:500, 2: 600 };
		var mapLocListTop = mapLocListTopDic[scale] || 400;

		$('#moko-map-locations-list').css({top: mapLocListTop });

		if(scale == 2){
			$('#ig_mapbox').attr('moko-map-scale', 2)
		}
		else if(scale == 1.5){
			$('#ig_mapbox').attr('moko-map-scale', 1.5)
		}
		else {
			$('#ig_mapbox').removeAttr('moko-map-scale')
		}
	},
});////}}}

//******************************************************************************
/** 地図：マップに座標を表示 */
//------------------------------------------------------------------------------
Moko.MapCoordinates = FeatureInit({////{{{
	name: 'MapCoordinates',
	config: 'map_coordinates',
	group: 'map',
	caption: 'マップに座標を表示',
	style: ''+<><![CDATA[
		.ixamoko-map-coordinates{
			font-size: 10px; /*font-weight: bold;*/ z-index: 99; position: absolute;
			width: 20px; text-align: center; color: #709033
		}
	]]></>,
	condition: function () { return LPath.map },
	ready: function(){
		this.run();
		$('body').bind('MokoEvent_MapMoved', this.run );
	},
	//------------------------------------------------------------------------------
	run: function () {
		var size;
		var aX = 1, aY = 2;
		var a1, a2, a3, a4;
		var originX, originY;

		// 移動ボタンの指す座標を取得
		a1 = (new URI($('#ig_cur01_w').attr('href'))).get('query').parseQueryString();
		a2 = (new URI($('#ig_cur02_w').attr('href'))).get('query').parseQueryString();
		a3 = (new URI($('#ig_cur03_w').attr('href'))).get('query').parseQueryString();
		a4 = (new URI($('#ig_cur04_w').attr('href'))).get('query').parseQueryString();
		//a1 = $('#ig_cur01_w').attr('href').match(/x=(-?\d+)&y=(-?\d+)/).map(function(v){return v.toInt() });
		//a2 = $('#ig_cur02_w').attr('href').match(/x=(-?\d+)&y=(-?\d+)/).map(function(v){return v.toInt() });
		//a3 = $('#ig_cur03_w').attr('href').match(/x=(-?\d+)&y=(-?\d+)/).map(function(v){return v.toInt() });
		//a4 = $('#ig_cur04_w').attr('href').match(/x=(-?\d+)&y=(-?\d+)/).map(function(v){return v.toInt() });

		// 北、東のボタンからマップサイズを取得
		size = Math.abs( Math.max(a1.x, a2.x) - Math.min(a1.x, a2.x) );
		// 算出用の起点（南西（北を上として左下））を矢印の座標から
		originX = a4.x.toInt() + ( size / 2 ).ceil() + ( size == 20 ? 1 : 0 ) ;
		originY = a3.y.toInt() + ( size / 2 ).ceil();

		var conf = {
			11: { xRate: 30  , yRate:  10, baseX: 65, baseY: 405, baseXb: 423, baseYb: 505, size: 11, type: 1 },
			15: { xRate: 21.5, yRate:   7, baseX: 65, baseY: 403, baseXb: 419, baseYb: 501, size: 15, type: 2 },
			20: { xRate: 16  , yRate: 5.1, baseX: 72, baseY: 402, baseXb: 414, baseYb: 499, size: 20, type: 3 },
		};
		
		$('.ixamoko-map-coordinates').remove();

		var yAdj = 268;
		var xAdj = 20;

		with( conf[size] ){
			var x = 0, y = 0;

			// X軸
			var i = 0;
			for(i=0; i < size; i++, x++, y++){
				$('<span>').text( originX + i)
				.addClass('ixamoko-map-coordinates')
				.css({ 'top' : baseY - yAdj + yRate * y, 'left': baseX - xAdj + xRate * x, })
				//.appendTo(Moko.Layouter)
				.appendTo('#ig_mapbox_container');
				;
			}

			// Y軸
			baseX = 355 + 68, baseY = 505;
			x = 0, y = 0;
			for(i=0; i<size; i++, x++, y++){
				$('<span>').text( originY + i)
				.addClass('ixamoko-map-coordinates')
				.css({ 'top' : baseYb - yAdj - yRate * y, 'left': baseXb - xAdj + xRate * x, })
				//.appendTo(Moko.Layouter)
				.appendTo('#ig_mapbox_container');
				;
			}
		}
	}
});////}}}


function IXA_getMapProperty() {
	var size;
	var a1, a2, a3, a4;
	var originX, originY;
	var prop = {};

	// 移動ボタンの指す座標を取得
	a1 = (new URI($('#ig_cur01_w').attr('href'))).get('query').parseQueryString();
	a2 = (new URI($('#ig_cur02_w').attr('href'))).get('query').parseQueryString();
	a3 = (new URI($('#ig_cur03_w').attr('href'))).get('query').parseQueryString();
	a4 = (new URI($('#ig_cur04_w').attr('href'))).get('query').parseQueryString();

	// 北、東のボタンからマップサイズを取得
	prop.size = Math.abs( Math.max(a1.x, a2.x) - Math.min(a1.x, a2.x) );
	prop.centerX = a1.x;
	prop.centerY = a2.y;

	// 算出用の起点（南西（北を上として左下））を矢印の座標から
	prop.left   = a4.x.toInt() + ( prop.size / 2 ).ceil() + ( prop.size == 20 ? 1 : 0 ) ;
	prop.bottom = a3.y.toInt() + ( prop.size / 2 ).ceil();
	prop.right = prop.left + prop.size - 1;
	prop.top = prop.bottom + prop.size - 1;

	return prop;
}

//******************************************************************************
/** 地図：マップに東西南北を表示 */
//------------------------------------------------------------------------------
Moko.MapQuarters = FeatureInit({////{{{
	name: 'MapQuarters',
	config: 'map_quarters',
	group: 'map',
	caption: 'マップに東西南北を表示',
	condition: function () { return LPath.map },
	ready: function(){
		this.run();
		$('body').bind('MokoEvent_MapMoved', this.run );
	},
	//------------------------------------------------------------------------------
	run: function () {
		$('<div class="moko-map-eswn moko-map-eswn-E">').appendTo('#ig_mapbox_container');
		$('<div class="moko-map-eswn moko-map-eswn-S">').appendTo('#ig_mapbox_container');
		$('<div class="moko-map-eswn moko-map-eswn-W">').appendTo('#ig_mapbox_container');
		$('<div class="moko-map-eswn moko-map-eswn-N">').appendTo('#ig_mapbox_container');
	}
});////}}}

//******************************************************************************
/** 地図：マップ登録関連ツール */
//------------------------------------------------------------------------------
////{{{
function isMapRegistered ( coord ){
	var map_list = loadMapList();
	return $.type(map_list[coord]) !== 'undefined' ;
}

function loadMapList () {
	if(MAP_LIST_CACHE) return MAP_LIST_CACHE;
	var map_list = {};
	if (localStorage.getItem("map_list")) {
		map_list = JSON.parse(localStorage.getItem("map_list"));
	}
	MAP_LIST_CACHE = map_list ;
	return map_list;
}

function setMapList ( coord, mname ) {
	var map_list = loadMapList();
	map_list[coord] = mname;
	localStorage.setItem("map_list", JSON.stringify(map_list));
}

function registMapCoordinate( coord, mname ) {
	if (confirm(mname + '（'+coord+'）' + 'を登録します。よいですか')) {
		var $this = $(this);
		setMapList( coord, mname );
	}
}

function removeMapCoordinate( coord, mname ) {
	if (confirm( ( mname ? mname + '（'+ coord + '）を削除します。\n' : '' ) + '本当に削除してよいですか')) {
		if (localStorage.getItem("map_list")) {
			var map_list = loadMapList();
			if (typeof(map_list[coord])!='undefined') {
				delete map_list[coord];
				localStorage.setItem("map_list", JSON.stringify(map_list));
			}
		}
	}
}

function clearAllMapCoordinates(){
	if ( confirm('記録した座標をすべて削除します。\n本当に削除してよいですか') ) {
		localStorage.removeItem('map_list');
	}
}

////}}}

// 2座標間の距離を求める
function IXA_getDistance( orgX, orgY, destX, destY ){
	//var dist = Math.sqrt(Math.pow(parseInt(tmp[1])-currHold.x, 2)+Math.pow(parseInt(tmp[2])-currHold.y, 2));
	//dist = Math.floor(dist*10)/10;
	orgX  = parseInt(orgX , 10);
	orgY  = parseInt(orgY , 10);
	destX = parseInt(destX, 10);
	destY = parseInt(destY, 10);
	var dist = ( ( orgX - destX ).pow(2) + ( orgY - destY ).pow(2) ).sqrt();
	dist = (dist*10).floor() / 10;
	return dist;
}

//******************************************************************************
/** 地図：空き地一覧を表示 */
//------------------------------------------------------------------------------
//map_list2(base_x, base_y, base_name)
Moko.LandList = FeatureInit({////{{{
	name: 'LnadList',
	config: 'map_starx',
	group: 'map',
	caption: '☆リスト表示',
	options: {
		targetNumber: 'map_starx',
		ixaSeason: 'season_list',
	},
	configSettings: {
		map_starx: { type: 'selectBox',
			optionMap: { 0:'表示しない', 1:'★1表示', 2:'★2まで表示', 3:'★3まで表示', 7:'★7を表示（三章7まで）', 8:'★8を表示'},
			default_value: 3
		}
	},
	condition: function () { return LPath.map },

	//------------------------------------------------------------------------------
	run: function () {
		//空き地一覧パネルを表示
		var status_box = $('<DIV id="ixamoko_maplist2">');
		$('#ig_mapbox').prepend(status_box);

		this.structLandList();
		$('.ixamoko_regmap')
		.live('click', function(e) {
			location.href = $(this).attr('url');
		})
		.live('mouseover', function(e) {
			//unsafeWindow.jQuery('AREA[alt="'+$(this).attr('alt')+'"]').trigger('mouseover');
			$('AREA[alt="'+$(this).attr('alt')+'"]').fireEvent('mouseover');
		});
		$('body').bind('MokoEvent_MapMoved', this.structLandList.bind(this) );
	},

	/** 座標ブックマークの一覧を構築 */
	structLandList: function () {
		var self = this;
		var currHold = IXA.Footholds.current();

		var $status_box = $('#ixamoko_maplist2');
		$status_box.empty();

		$status_box.append('<DIV style="background-color:#faf;margin-top:3px;font-weight:bold;">[選択拠点: '+currHold.fullname+']</DIV>');

		var hoshi_set = [];
		
		hoshi_set = $R(1, this.targetNumber );
		if( this.ixaSeason >= 3 ){
			if( this.targetNumber == 8 )
				hoshi_set = [8];
		}
		else {
			if( this.targetNumber >= 7 )
				hoshi_set = [7];
		}

		function Tochi(name, dist, url, alt) {
			this.name = name;
			this.dist = dist;
			this.url = url;
			this.alt = alt;
		}
		function cmp_dist(a, b) {
			return a.dist - b.dist;
		}
		//for(var i=0;i<HOSHI_SET.length;++i) {
		hoshi_set.each(function( hoshiNum, idx ){
			//var hoshiNum = HOSHI_SET[i];
			var hoshiStr = $R(hoshiNum).map(function(){ return '★' }).join('');;
			var count = 0;
			var tmp2='';
			var Tochis = new Array();
			$('AREA[onmouseover*=", \''+hoshiStr+'\',"]').each(function() {
				var $this = $(this);
				var tmp = $this.attr('alt').match(/^([^(]+) (-?\d+),(-?\d+)$/);
				if (tmp===null) {
					//console.log('tmp null3');
					return;
				}
				var dist = Math.sqrt(Math.pow(parseInt(tmp[2])-currHold.x, 2)+Math.pow(parseInt(tmp[3])-currHold.y, 2));
				dist = Math.floor(dist*10)/10;
				if(hoshiNum == ( self.ixaSeason >= 3 ? 8 : 7 )) {
					tmp2='';
					tmp2=$this.attr("onmouseover").toString();
					let re = /('[^']*'|"[^"]*"|\b\w+,|\b\d\.\d,)/g;
					let match;
					let opts = [];
					while( (match= re.exec(tmp2)) != null ){
						opts = opts.concat( match.length == 1 ? [match[0]] : match.slice(1) );
					}
					opts = opts.map(function(v){ return v.replace(/^["']|["',]$/g,'') });
					//           0     1     2     3            4     5                 6      7    8    9    10  11   12
					// rewrite('　', '　', '　', '(-93,-178)', '　', '★★★★★★★', '6.4', '4', '4', '5', '0', '3', ''); overOperation('rollover', '270px', '190px')
					tmp2 = ( '('+ opts.slice(7,12).join('') +')' );
					tmp[0] = tmp2 + tmp[0];
				}
				Tochis[count++] = new Tochi(tmp[0], dist, $this.attr('href'), $this.attr('alt'));
			});

			Tochis.sort(cmp_dist);
			for(var j=0;j<Tochis.length;++j) {
				if(hoshiNum >= 4) hoshiStr = '★'+hoshiNum;
				var $hosiarea = $(
					'<DIV class="ixamoko_regmap" style="cursor:pointer;padding:2px;margin:1px;">'
					+hoshiStr+' [距: '+Tochis[j].dist+'] '+Tochis[j].name+'</DIV>'
				)
				.attr({'url': Tochis[j].url, 'alt': Tochis[j].alt})
				.hover(
					function(e) { $(this).css({backgroundColor:'#aaf'});},
					function(e) { $(this).css({backgroundColor:''}); }
				)
				.appendTo($status_box);
			}
		});
	}
});////}}}

//******************************************************************************
/** 地図：右クリックで移動 */
//------------------------------------------------------------------------------
Moko.MoveMapByAJAX = FeatureInit({////{{{
	name: 'MoveMapByAJAX',
	config: 'move_map_by_ajax',
	options: {
		useRightClickMove: 'map_rightclick',
		useImprovedMapMove: 'map_improved_map_move',
	},
	group: 'map',
	caption: 'AJAXで地図移動',
	configSettings: {
		map_improved_map_move: { caption: 'AJAX地図移動を進む／戻るに対応' },
		map_rightclick: { caption: '右クリックで地図移動' },
	},
	condition: function () { return LPath.map },

	//------------------------------------------------------------------------------
	run: function () {
		var self = this;

		//右クリックで移動
		if( self.useRightClickMove ){
			$('area[href^="/land.php"]').live('contextmenu', function(e){ return self.clickHdl_moveMap(e) } );
		}

		// 端の矢印で移動
		$('a[href^="/map.php"]').live('click', function(e){ return self.clickHdl_moveMap(e) } );

		// 履歴を進む／戻るしたとき
		if( self.useImprovedMapMove){
			window.addEventListener('popstate', function(event) {
				IXA_moveMap( location.pathname + (location.search || '' ) );
			},false );
		}
	},

	clickHdl_moveMap: function(e) {
		var self = this;

		var $t = $(e.target);
		if( !$t.attr('href') ) $t = $t.closest('a');
		var tmp = $t.attr('href').match(/(?:land|map)\.php\?(x=-?\d+&y=-?\d+(?:&c=\d+)?)$/);
		if (!tmp) {
			return true;
		}

		var url = '/map.php?'+tmp[1];

		IXA_moveMap(url, self.useImprovedMapMove );

		return false;
	},

});////}}}

//******************************************************************************
/** 地図：戦況マップ */
//------------------------------------------------------------------------------
//function all_map_status()
Moko.AllMapStatus = FeatureInit({////{{{
	name: 'AllMapStatus',
	config: 'all_map_status',
	group: 'map',
	caption: '戦況マップを表示',
	condition: function () { return LPath.map },
	ready: function(){
		this.showAllMapStatus();
	},

	//------------------------------------------------------------------------------
	/** 戦況マップを表示 */
	showAllMapStatus: function () {
		var self = this;
		$('#mokotool').append('<a href="#TB_inline?height=340&amp;width=265&amp;inlineId=allMapThicbox" class="thickbox" title="戦況マップ" onclick="return false;">戦況マップ</a>');
		$("a.thickbox").live("mousedown",function() {
			tb_init('a.thickbox');
			var tmp = '<div class="map_status" style="top:17px;right:0px;position: absolute;border-collapse: collapse;"><table id="act_battle_data"><tbody>';
			tmp+='<tr><td colspan=14><select id="target"><option value="1">織田</option><option value="2">足利</option><option value="3">武田</option><option value="4">上杉</option><option value="5">徳川</option><option value="6">毛利</option><option value="7">伊達</option><option value="8">北条</option><option value="9">長宗</option><option value="10">島津</option><option value="11">豊臣</option><option value="12">最上</option></select>&nbsp;<span id="lastmodify"></span></td></tr>';
			var x = new Array(7);
			x[0] = new Array('',2,5,9,14,20,27);
			x[1] = new Array(1,4,8,13,19,26,33);
			x[2] = new Array(3,7,12,18,25,32,38);
			x[3] = new Array(6,11,17,24,31,37,42);
			x[4] = new Array(10,16,23,30,36,41,45);
			x[5] = new Array(15,22,29,35,40,44,47);
			x[6] = new Array(21,28,34,39,43,46,48);
			tmp+='<tr><th colspan=7>北西</th><th colspan=7>北東</th></tr>';
			for(i=6;i>=0;i--){
				tmp+='<tr>';
				for(j=6;j>=0;j--) {
					tmp+='<td id="hs'+x[i][j]+'">'+x[i][j]+'</td>';
				}
				for(j=0;j<7;j++){
					tmp+='<td id="ht'+x[i][j]+'">'+x[i][j]+'</td>';
				}
				tmp+='</tr>';
			}
			tmp+='<tr><th colspan=7>南西</th><th colspan=7>南東</th></tr>';
			for(i=0;i<7;i++){
				tmp+='<tr>';
				for(j=6;j>=0;j--) {
					tmp+='<td id="ns'+x[i][j]+'">'+x[i][j]+'</td>';
				}
				for(j=0;j<7;j++){
					tmp+='<td id="nt'+x[i][j]+'">'+x[i][j]+'</td>';
				}
				tmp+='</tr>';
			}
			tmp+='<tr><td colspan=14>【消沈<<<<font color="#ff4c4c">激戦</font>】<input id="update_map" type=button value="　　現在の戦況を確認する　　"></td></tr></tbody></table></div>';
			$('span#all_map').append(tmp);
			if( mokoStorage.getItem('Status').map_status ){
				var act_battle_data = mokoStorage.getItem('Status').map_status;
				$('.map_status').find('#act_battle_data:eq(0)').html(act_battle_data);
			}
			var movepanelurl = $('div#ig_map_movepanel').find("a").attr("href");
			$('select#target').val(movepanelurl.substr(movepanelurl.indexOf("c=")+2));
			$("input#update_map").live("click",function() {
				$("input#update_map").attr("disabled","disabled");
				self.get_map_status(0,0,12,28);
			});
			$("td").live("dblclick",function(event) {
				var mp = new Array(12,28,28,12,12,52,36,36,52,12,12,76,36,60,60,36,76,12,12,100,36,84,60,60,84,36,100,12,12,124,36,108,60,84,84,60,108,36,124,12,12,148,36,132,60,108,84,84,108,60,132,36,148,12,36,156,60,132,84,108,108,84,132,60,156,36,60,156,84,132,108,108,132,84,156,60,84,156,108,132,132,108,156,84,108,156,132,132,156,108,132,156,156,132,156,156);
				var t = $('select#target option:selected').val();
				var fortname = event.target.id;
				var area    = fortname.substr(0,2);
				var fortnum = fortname.substr(2);
				if(isNaN(t)){return};
				if(isNaN(fortnum)){return};
				if(fortnum < 1 || fortnum > 48){return};
				var x,y;
				if(area == 'ht'){
					x = mp[(fortnum-1)*2  ];
					y = mp[(fortnum-1)*2+1];
				}else if(area == 'hs'){
					x = mp[(fortnum-1)*2  ] * -1;
					y = mp[(fortnum-1)*2+1];
				}else if(area == 'ns'){
					x = mp[(fortnum-1)*2  ] * -1;
					y = mp[(fortnum-1)*2+1] * -1;
				}else if(area == 'nt'){
					x = mp[(fortnum-1)*2  ];
					y = mp[(fortnum-1)*2+1] * -1;
				}else{return};
				var url = '/map.php?x=' + x + '&y=' + y + '&c=' + t;
				//alert('redirect to:' + url);
				location.href = url;
			});
		});
	},

	/** 戦況マップ：戦況を取得 */
	get_map_status: function (k,i,x,y) {
		var self = this;
		var mp = new Array(48);
		mp[ 0] = new Array ( 12,  28); mp[ 1] = new Array ( 28,  12); mp[ 2] = new Array ( 12,  52); mp[ 3] = new Array ( 36,  36); mp[ 4] = new Array ( 52,  12); mp[ 5] = new Array ( 12,  76); 
		mp[ 6] = new Array ( 36,  60); mp[ 7] = new Array ( 60,  36); mp[ 8] = new Array ( 76,  12); mp[ 9] = new Array ( 12, 100); mp[10] = new Array ( 36,  84); mp[11] = new Array ( 60,  60); 
		mp[12] = new Array ( 84,  36); mp[13] = new Array (100,  12); mp[14] = new Array ( 12, 124); mp[15] = new Array ( 36, 108); mp[16] = new Array ( 60,  84); mp[17] = new Array ( 84,  60); 
		mp[18] = new Array (108,  36); mp[19] = new Array (124,  12); mp[20] = new Array ( 12, 148); mp[21] = new Array ( 36, 132); mp[22] = new Array ( 60, 108); mp[23] = new Array ( 84,  84); 
		mp[24] = new Array (108,  60); mp[25] = new Array (132,  36); mp[26] = new Array (148,  12); mp[27] = new Array ( 36, 156); mp[28] = new Array ( 60, 132); mp[29] = new Array ( 84, 108); 
		mp[30] = new Array (108,  84); mp[31] = new Array (132,  60); mp[32] = new Array (156,  36); mp[33] = new Array ( 60, 156); mp[34] = new Array ( 84, 132); mp[35] = new Array (108, 108); 
		mp[36] = new Array (132,  84); mp[37] = new Array (156,  60); mp[38] = new Array ( 84, 156); mp[39] = new Array (108, 132); mp[40] = new Array (132, 108); mp[41] = new Array (156,  84); 
		mp[42] = new Array (108, 156); mp[43] = new Array (132, 132); mp[44] = new Array (156, 108); mp[45] = new Array (132, 156); mp[46] = new Array (156, 132); mp[47] = new Array (156, 156); 

		var p = new Array('hs','ht','ns','nt');
		var j=i;
		var c = k;
		var minus_x = '1';
		var minus_y = '1';
		if(p[c]=='hs') {
			minus_x = '-1';
			minus_y = '1';
		} else if(p[c]=='ht') {
			minus_x = '1';
			minus_y = '1';
		} else if(p[c]=='ns') {
			minus_x = '-1';
			minus_y = '-1';
		} else {
			minus_x = '1';
			minus_y = '-1';
		}
		var t = $('select#target option:selected').val();
		$.ajax({
			url: '/map.php?x='+(x*minus_x)+'&y='+(y*minus_y)+'&type=1&c='+t, cache: false, dataType: "text",
			success: function (html){
				var num = 0;
				$(html).find('div#ig_mapsAll').find('img').each(function() {
					var $this = $(this);
					var img = $this.get()[0].src;
					if(img.indexOf("stronghold_r_l.png")>0) {num++;}
					if(img.indexOf("stronghold_r_m.png")>0) {num++;}
					if(img.indexOf("stronghold_r_s.png")>0) {num++;}
					if(img.indexOf("stronghold_g_l.png")>0) {num++;}
					if(img.indexOf("stronghold_g_m.png")>0) {num++;}
					if(img.indexOf("stronghold_g_s.png")>0) {num++;}
					if(img.indexOf("stronghold_ga_l.png")>0) {num++;}
					if(img.indexOf("stronghold_ga_m.png")>0) {num++;}
					if(img.indexOf("stronghold_ga_s.png")>0) {num++;}
				});
				j++;
				if(num==0) {
					$('table#act_battle_data').find('td#'+p[c]+j).css('color','#ffffff');
				}else if(num<=4) {
					$('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff9999');
				}else if(num<=9) {
					$('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff6666');
				}else if(num<=14) {
					$('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff4c4c');
				}else{
					$('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff0000');
				}
				if(j>47){j=0;c++;}
				// NOTE 1.8.6+02-23 追加
				if(c>3){
					$("input#update_map").attr("disabled",false);
					var Dt = new Date() ;
					var now = Dt.getFullYear()+'/'+(Dt.getMonth()+1)+'/'+Dt.getDate()+'/ '+ Dt.getHours()+':'+Dt.getMinutes()+':'+Dt.getSeconds();
					$("#lastmodify").text('最終更新 '+now);
					var map_status = $('.map_status').find('#act_battle_data:eq(0)').html();
					mokoStorage.getItem('Status').map_status = map_status;
					mokoStorage.flush();
					//localStorage.setItem('ixakaizou_map_status', map_status);
					return;
				} // NOTE ここまで
				self.get_map_status(c,j,(mp[j][0]),(mp[j][1]));
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				return false;
			}
		});
	}
});////}}}

//******************************************************************************
/** 部隊状況系の機能でキャッシュを使う */
//------------------------------------------------------------------------------
Moko.UsingUnitStatusCache = FeatureInit({
    name: 'UsingUnitStatusCache',
	config: 'unit_status_cache',
	caption: '部隊状況系の機能でキャッシュを使う【テスト中】',
	group: 'alpha',
	//group: 'other',
	detail: '地図の部隊状況表示と攻撃目標マーク表示',
	configSettings: {
		unit_status_cache: { default_value: false, },
	},
    condition: function () { return LPath.ingame },
    //------------------------------------------------------------------------------
    run: function () {}
});

//******************************************************************************
/** 地図：出陣状況表示 */
//------------------------------------------------------------------------------
//function map_butai_status()
Moko.UnitStatus = FeatureInit({////{{{
	name: 'UnitStatus',
	config: 'map_butai_status',
	group: 'map',
	caption: '部隊行動状況を表示',
	options: { useUnitStatusCache: 'unit_status_cache' },
	condition: function () { return LPath.map },
	ready: function(){
		if(!$('#act_battle_data').length){
			$('.ig_mappanel_maindataarea').after(
			''+<><![CDATA[<table id="act_battle_data">
					<thead>
						<tr>
							<th>部隊名</th><th>&nbsp;&nbsp;&nbsp;&nbsp;状況&nbsp;&nbsp;&nbsp;&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						<tr><th></th><td></td></tr>
						<tr><th></th><td></td></tr>
						<tr><th></th><td></td></tr>
						<tr><th></th><td></td></tr>
					</tbody>
				</table>]]></>
			);
		}
		try{
		this.showUnitStatus();
		}
		catch(e){
			console.warn(e);
		}
	},

	//------------------------------------------------------------------------------
	showUnitStatus: function () {
		if (typeof(this.ajflag)=='undeifned') {
			this.ajflag = true;
		}
		var btimer = new Array(5);
		var wtime  = new Array(5);

		// 表を差し換える
		var $table = $('#act_battle_data');
		$table.find('tbody').find('td, th').empty();
		$table.find('th')
		.eq(0).css({minWidth:'4em'}).empty().append('部隊名')
		.end()
		.eq(1).css({minWidth:'5em'}).text('状況');

		$('#act_battle_data tbody').find('tr').eq(3).after('<tr><th></th><td></td></tr>');

		var $rows = $('#act_battle_data tbody tr');

		var setUnitStatus = function(unitStatus){
			unitStatus.each(function(stats, idx){
				var $nameCell = $rows.eq(idx).children('th:eq(0)');
				var $timeCell = $rows.eq(idx).children('td:eq(0)');
				GM_log(stats.unitName);
				$nameCell.text( stats.unitName.replace(/部隊$/, ''));

				var restSec = 0;
				if( stats.completeTime )
					restSec = ( ( stats.completeTime.toDate() - IXA_getIXATime() ) / 1000 );
				if( restSec < 0 ) restSec = 0;
				var $timeText = $('<span class="moko-squad-rest-time">');
				$timeText.text( restSec.secondsToDateTime() );
				$timeCell.empty();
				if( stats.actMode == '待機' || stats.actMode == '加勢待機' ){
					$timeCell.append( stats.actMode );
				}
				else {
					$timeCell.append( stats.actMode.replace(/^(..).*/,'$1') + '（', $timeText, '）' );
				}
				$timeCell.data('restSec', restSec);

				//GM_log(stats)
			});
		}

		var countDownEvent = function(){
			var self = this;

			//if( !arguments.callee.state ) arguments.callee.state = {};
			//var state = arguments.callee.state;

			//GM_log('cntdn');
			//var beRebind = false;
			$rows.find('td').each(function(){

				var $cell = $(this);
				var restSec = $cell.data('restSec');
				if( restSec < 0 ) return;

				var border = 0;

				if( restSec > border ){
					--restSec;
					$cell
					.find('.moko-squad-rest-time')
					.text( restSec.secondsToDateTime() );
					$cell.data('restSec', restSec);
				}
				else if( restSec <= border ){
					//GM_log('stopEvent');
					//if( !state.stopRebind )
					//	beRebind = true;
					//state.stopRebind = true;
					$cell.data('restSec', -1);
				}
			});

			// 再登録…読み込み過多になりそうなので保留
			//if( beRebind ){
			//	GM_log('REBIND');
			//	$(document).unbind('MokoEvent_SecondHand', countDownEvent);
			//	IXA_getUnitStatus()
			//	.done( setUnitStatus )
			//	.done( bindCountDownEvent )
			//}
		}

		var bindCountDownEvent = function(){
			$(document).bind('MokoEvent_SecondHand', countDownEvent )
		}

		IXA_getUnitStatus( self.useUnitStatusCache ? true : false )
		.done( setUnitStatus )
		.done( bindCountDownEvent )
		;
		return;
	}
});////}}}

//******************************************************************************
/** 地図：攻撃目標をマーク表示  */
//------------------------------------------------------------------------------
//function panelAttack()
Moko.AttackConfirmation = FeatureInit({////{{{
	name: 'AttackConfirmation',
	config: 'panelAttack',
	group: 'map',
	caption: '攻撃目標をマーク表示',
	options: { useUnitStatusCache: 'unit_status_cache' },
	condition: function () { return LPath.map },
	ready: function(){
		this.update();
		$('body').bind('MokoEvent_MapMoved', this.update.bind( this ) ) ;
	},
	//------------------------------------------------------------------------------
	update: function () {
		var self = this;
		IXA_getUnitStatus(self.useUnitStatusCache? true: false )
		.done(function (stats){
			stats.each(function(stat, idx){
				if(
					!( stat.isAttack
					|| stat.isPitchCamp
					|| stat.isConfluence
					|| stat.isBackup
					)
				) return;

				var img =
				/*攻撃*/ stat.isAttack     ? IMAGES.panel_attack  : 
				/*陣張*/ stat.isPitchCamp  ? IMAGES.panel_jinhari : 
				/*合流*/ stat.isConfluence ? IMAGES.panel_meeting : 
				/*加勢*/ stat.isBackup     ? IMAGES.panel_backup  : "" ;
				if(img){
					var href = stat.toLandPath;
					self.overOperation3(href, img);
				}
			});
		});
	},

	overOperation3: function (url, img){
		if($('area[href="'+url+'"]').attr('alt')!=undefined) {
			var w_script=$('area[href="'+url+'"]').attr('onmouseover').toString();
			// rewrite('　', '　', '　', '(-33,53)', '　', '★★★', '10', '1', '1', '1', '0', '0', '');
			// overOperation('rollover', '330px', '110px');
			//                            ^^^^^    ^^^^^ ここを抜き出す
			var coords = /\boverOperation\s*\(\s*[^,]*,\s*'(\d+px)'\s*,\s*'(\d+px)'/.exec(w_script);
			coords.shift();
			//w_script = w_script
			//	.substring( w_script.indexOf('overOperation'), w_script.length-2 );
			//w_script = w_script
			//	.replace("overOperation(","")
			//	.replace(");","")
			//	.replace(/'/g,"")
			//	.replace(/\s/g,"")
			//	.split(',');
			var $tmp = $('img#rollover')
				.clone()
				.attr({src: img, id: '' })
				.css({ left: coords[0], top: coords[1] })
				.insertAfter('map#mapOverlayMap')
			;
		}
	}
});////}}}

//******************************************************************************
/** 地図：よく使う座標を登録して地図に表示 */
//------------------------------------------------------------------------------
Moko.LandRegisterButton = FeatureInit({////{{{
	name: 'LandRegisterButton',
	condition: function () { return LPath('user','land','fight_history','facility') },
	//------------------------------------------------------------------------------
	run: function () {
		var map_list = {};
		if (localStorage.getItem("map_list")) {
			map_list = JSON.parse(localStorage.getItem("map_list"));
		}
		if (LPath.user) {
			$('DIV.common_box3bottom > TABLE').find('TR.fs14').find('A:eq(1)').each(function() {
				var $this = $(this);
				var mname = $this.parent().parent().find('A:eq(0)').text();
				if (typeof(map_list[$this.text()])=='undefined') {
					$this.attr('href',$this.attr('href').replace('land.php','map.php'));
					$this.after('&nbsp;<INPUT mname="'+mname+'" cood="'+$this.text()+'" class="reg_map" type="button" value="ここを記憶" />');
				} else {
					$this.after('&nbsp;<INPUT mname="'+mname+'" cood="'+$this.text()+'" class="remove_map" type="button" value="ここを忘れる" />');
				}
			});
		}
		else if (LPath.land) {
			var mname=$('h3:eq(0)').text();
			var code=location.search.replace('?','');
			code=code.split("&");
			code=code[0].replace('x=','')+','+code[1].replace('y=','');
			if (typeof(map_list[code])=='undefined') {
				$('.ig_mappanel_maindataarea').find('h3').append('&nbsp;<INPUT mname="'+mname+'" cood="'+code+'" class="reg_map" type="button" value="ここを記憶" />');
			} else {
				$('.ig_mappanel_maindataarea').find('h3').append('&nbsp;<INPUT mname="'+mname+'" cood="'+code+'" class="remove_map" type="button" value="ここを忘れる" />');
			}
		}
		else if(LPath.fight_history) {
			var cnt=0;
			$('.ig_battle_table').find('tr').each(function(){
				if(cnt==0){
					$(this).find('th:eq(3)').after('<th>記憶</th>');
					cnt++;
				} else {
					var tmp=$(this).find('td:eq(3)').text();
					var mname=tmp.substring(0,tmp.indexOf("　("));
					var code=tmp.substring(tmp.indexOf("　("),tmp.indexOf(")"));
					code=code.replace("　(",'');
					if (typeof(map_list[code])=='undefined') {
						$(this).find('td:eq(3)').after('<td><INPUT mname="'+mname+'" cood="'+code+'" class="reg_map" type="button" value="ここを記憶" /></td>');
					} else {
						$(this).find('td:eq(3)').after('<td><INPUT mname="'+mname+'" cood="'+code+'" class="remove_map" type="button" value="ここを忘れる" /></td>');
					}
					cnt++;
				}
			});
		}
		$('INPUT.reg_map').click(function(e) {
			var $this = $(this);
			var coord = $this.attr('cood');
			var mname = $this.attr('mname');
			registMapCoordinate( coord, mname );
		});
		$('INPUT.remove_map').click(function(e) {
			var $this = $(this);
			var cood = $this.attr('cood');
			var mname = $this.attr('mname');
			removeMapCoordinate( cood, mname );
		});
	}
});////}}}

//******************************************************************************
/** 地図：右クリックツール */
//------------------------------------------------------------------------------
//function map_tool()
Moko.MapTool = FeatureInit({////{{{
	name: 'MapTool',
	config: function(cfg){ return cfg['map_tool'] && !cfg['map_rightclick'] },
	group: 'map',
	options: {
		useAttackFromNearby: 'nearby_tool',
		useImprovedMapMove: 'map_improved_map_move',
		userMapRegisterMenuLowPosition: 'map_register_low_position',
	},
	configSettings: {
		map_tool: {
			caption: '右クリックでツールチップ表示',
			detail: '地図：右クリック移動と排他利用（右クリック優先）',
		},
		nearby_tool: {
			caption: 'マップツールチップに最寄陣から出撃表示',
		},
		map_register_low_position: {
			caption: '座標の記憶／削除の位置を低く',
		},
	},
	condition: function () { return LPath.map },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		if (typeof(this.ajflag)=='undeifned') {
			this.ajflag = true;
		}
		var tmp = '<div id="tooltip" class="moko-cmenu-panel"><ul id="mapUnit"></ul></div>';
		$(document.body).append(tmp);
		$("#tooltip").hide();
		$("#mapOverlayMap area[href]")
		.live(
			"contextmenu",
			function(e){
				self.openToolMap(this, e.pageX, e.pageY);
				e.preventDefault();
				return false;
			}
		);
		self.ajflag = false;
	},

	openToolMap: function (target,x,y) {
		var self = this;
		$("#tooltip").css({ left: x + "px", top: y + "px"}).show();

		$(document)
		//.unbind('click') // ダブルクリックで書状開くが使えなくなるので。
		.one("click", function(){$("#tooltip").hide();});

		$("#mapUnit")
		.text("")
		.append("<li style='padding:0px 10px'><img src='"+IMAGES.wait+"' style='opacity: 0.6' /></li>");
		// 改造版: tmp
		var targetLandPath, targetLandCoordStr, urlparam_land_coord;
		if( urlparam_land_coord = $(target).attr('href').match(/land\.php\?(.+)$/) ){
			targetLandPath = urlparam_land_coord[0];
			targetLandCoordStr = urlparam_land_coord[1];
		}

		// パネルクリック時で移動するはずのページを取得
		$.ajax({
			type: "POST",
			url: $(target).attr('href'),
			cache: false,
			success: function (html, textStatus, jqXHR){
				var tool_list=[];
				var tools = {};


				var $mapInfoArea = $(html).find('.ig_mappanel_dataarea');

				// 城主プロフィールURL
				$mapInfoArea.find('a:eq(0)').each(function(){
					tool_list.push( $(this).attr('href') );
					tools.lordProfilePath = $(this).attr('href');
				});
				// 同盟情報URL
				$mapInfoArea.find('a:eq(1)').each(function(){
					tool_list.push( $(this).attr('href') );
					tools.allianceInfoPath = $(this).attr('href');
				});

				// 城主名
				var lordName = $mapInfoArea.find('a:eq(0)').text();
				// 自陣だったら
				if($(html).find('#lordName').text() == lordName || $(html).find('#basepointBottom').length ){
					tool_list.push(targetLandPath);
					tools.ownHoldPath = targetLandPath;
				}

				self.addToolMap(urlparam_land_coord, tools, tool_list, target);
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				$("#tooltip").hide();
			}
		});
	},

	addToolMap: function (/*改造版では tmp */urlparam_land_coord, tools, tool_list, targetElement){
		var self = this;
		var targetLandPath, targetLandCoordStr;
		if( urlparam_land_coord ){
			targetLandPath = urlparam_land_coord[0];
			targetLandCoordStr = urlparam_land_coord[1];
		}

		$('#mapUnit').empty();

		// 地図移動
		$('<li id="mapMove" class="moko-cmenu-item">ここを中心に地図表示</li>')
		.appendTo('#mapUnit');

		// 位置記憶／削除
		if( isMapRegistered( fetchMapInfo(targetElement).coordinate ) ) {
			$('<li id="mapRemove" class="moko-cmenu-item">ここを忘れる</li>')
			.appendTo('#mapUnit');
		}
		else {
			$('<li id="mapRegist" class="moko-cmenu-item">ここを記憶する</li>')
			.appendTo('#mapUnit');
		}

		// 位置記憶／削除イベント
		$('#mapRegist').click(function(e) {
			var info = fetchMapInfo($(targetElement));
			registMapCoordinate( info.coordinate, info.map_name );
		});
		$('#mapRemove').click(function(e) {
			var info = fetchMapInfo($(targetElement));
			removeMapCoordinate( info.coordinate, info.map_name );
		});

		// 地図移動イベント
		$('#mapMove').click(function(e) {
			if( !targetLandPath ) {
				return true;
			}

			IXA_moveMap(
				'/map.php?'+targetLandCoordStr,
				self.useImprovedMapMove,
				{ success: function(){ $("#tooltip").hide() } }
			);

			return false;
		});

		// 対象の位置に部隊出陣
		$('<li id="mapAttack" url="'+targetLandCoordStr+'" class="moko-cmenu-item">ここへ部隊出陣</li>')
		.appendTo('#mapUnit')
		.click(function(e){
			location.href='/facility/send_troop.php?'+targetLandCoordStr;
			$("#tooltip").hide();
		});

		// 城主プロフィール
		if( tools.lordProfilePath ){
			$('<li id="mapProfile" class="moko-cmenu-item">プロフィール</li>')
			.appendTo('#mapUnit')
			.click(function(e) {
				location.href = tools.lordProfilePath
				$("#tooltip").hide();
			});
		}

		// 同盟情報
		if( tools.allianceInfoPath ){
			$('<li id="mapAlliance" class="moko-cmenu-item">同盟情報</li>')
			.appendTo('#mapUnit')
			.click(function(e) {
				location.href = tools.allianceInfoPath;
				$("#tooltip").hide();
			});
		}

		// 名称変更
		if( tools.ownHoldPath ){
			$('<li id="mapRename" class="moko-cmenu-item">名称変更</li>')
			.appendTo('#mapUnit')
			.click(function(e) {
				IXA_renameFootholdPrompt('coordPath', tools.ownHoldPath );
			});
		}

		// XXX ちょっとムリクリすぎなので整理すること
		if( self.userMapRegisterMenuLowPosition ){
			$('#mapRegist, #mapRemove').appendTo('#mapUnit');
		}

		// 改造さん 2-18++ で追加
		// 最寄りの陣から出陣
		if(self.useAttackFromNearby){
			$.ajax({
				type: "POST", url: '/user/', cache: false,

				success: function (html){
					tmp2 = targetLandCoordStr.split('&');
					base = targetLandCoordStr.match(/(-?\d+)/g);
					var m_nm;
					var m_dist=9999;
					var foword = targetLandCoordStr;

					$(html).find('.common_box3bottom').find('a').each(function(){
						if($(this).attr('href').indexOf(tmp2[2],'0')>0){
							if($(this).parent().parent().find('td').eq(0).text() == '領地'){return};
							var tmp3 = $(this).text().match(/(-?\d+),(-?\d+)/);
							var dist = Math.sqrt(Math.pow(parseInt(tmp3[1])-base[0], 2)+Math.pow(parseInt(tmp3[2])-base[1], 2));
							dist = Math.floor(dist*10)/10;
							if(m_dist>dist && dist > 0){
								m_dist=dist;
								m_nm=$(this).parent().parent().find('a:eq(0)').text().replace(/(^\s+)|(\s+$)/g, "");
								m_url=$(this).parent().parent().find('a:eq(0)').attr('href');
							}
						}
					});

					$('<li id="nearby" class="moko-cmenu-item">ここへ['+m_nm+']から部隊出陣</li>')
					.appendTo('#mapUnit');

					// XXX ちょっとムリクリすぎなので整理すること
					if( self.userMapRegisterMenuLowPosition ){
						$('#mapRegist, #mapRemove').appendTo('#mapUnit');
					}

					$('#nearby')
					.click(function(e) {
						$.post(m_url)
						.done(function (html){
							$("#tooltip").hide();
							location.href="/facility/send_troop.php?"+foword;
						})
						.fail(function (XMLHttpRequest, textStatus, errorThrown) {
							$("#tooltip").hide();
						})
						;
					});
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {}
			});
		}

	},

});////}}}

//******************************************************************************
/** 地図：土地を右クリック、またはダブルクリックした場合の動作 */
//------------------------------------------------------------------------------
Moko.ClickLandTile = FeatureInit({////{{{
	name: 'ClickLandTile',
	config:'map_rightdblclick',
	group: 'map',
	caption: 'ダブルクリックで対象の合戦報告書を表示',
	condition: function () { return LPath.map },

	//------------------------------------------------------------------------------
	run: function () {
		var g_click='1';
		var target_html;
		$('AREA[href^="/land.php"]')
		.live('dblclick', function(e) {
			g_click='2';
			target_html = $(this);
		})
		.live('click', function(){
			g_click='1';
			target_html = $(this);
			setTimeout(function() {
				if(g_click=='1') {
					var tmp = target_html.attr('href').match(/land\.php\?(.+)$/);
					location.href='/land.php?'+tmp[1];
				}
				else if(g_click == '2') {
					var lord_name = fetchMapInfo( target_html ).lord_name ;
					location.href='/war/list.php?m=&s=1&name=lord&word='+lord_name+'&coord=map&x=&y=';
					g_click = 3;
				}
			},300);
			return false;
		});
	}
});////}}}

//******************************************************************************
/** 地図：豪族砦周辺をオーバーレイ表示 */
//------------------------------------------------------------------------------
//function prohibitionArea()
Moko.ProhibitOveray = FeatureInit({////{{{
	//enable:false,
	name: 'ProhibitOveray',
	config: 'prohibitionArea',
	group: 'map',
	caption: '陣取り禁止区域表示（旧）',
	condition: function () { return LPath.map },
	ready: function () {
		this.update();
		$('body').bind('MokoEvent_MapMoved', this.update.bind(this));
	},
	//------------------------------------------------------------------------------
	update: function () {
		var self = this;
		base_area = [
			[ 12, 28],[ 28, 12],[ 12, 52],[ 36, 36],[ 52, 12],[ 12, 76],[ 36, 60],[ 60, 36],[ 76, 12],[ 12,100],
			[ 36, 84],[ 60, 60],[ 84, 36],[100, 12],[ 12,124],[ 36,108],[ 60, 84],[ 84, 60],[108, 36],[124, 12],
			[ 12,148],[ 36,132],[ 60,108],[ 84, 84],[108, 60],[132, 36],[148, 12],[ 36,156],[ 60,132],[ 84,108],
			[108, 84],[132, 60],[156, 36],[ 60,156],[ 84,132],[108,108],[132, 84],[156, 60],[ 84,156],[108,132],
			[132,108],[156, 84],[108,156],[132,132],[156,108],[132,156],[156,132],[156,156]
		];
		var c = $('#ig_mapbox_container a:eq(0)').attr('href').match(/c=\d+$/);
		for(var i=0; i < 4; ++i){
			var x,y;
			switch (i) {
			case 0: x= 1; y= 1; break;
			case 1: x= 1; y=-1; break;
			case 2: x=-1; y=-1; break;
			case 3: x=-1; y= 1; break;
			}
			for(var j=0; j < base_area.length; ++j){
				var url="/land.php?x="+base_area[j][0]*x+"&y="+base_area[j][1]*y+"&"+c;
				if($('area[href="'+url+'"]').attr('alt')!=undefined) {
					self.area_loop(base_area[j][0],base_area[j][1],x,y,c);
					return;
				}
			}
		}
	},
	area_loop: function (a,b,x,y,c) {
		var self = this;
		for(var z=1;z<4;z++) {
			var xx = new Number(a);
			var yy = new Number(b);
			xx = (xx+z)*x;
			yy = (yy)*y;
			var url="/land.php?x="+xx+"&y="+yy+"&"+c;
			self.overOperation2(url);
			for(s=1;s<4;s++) {
				var ss=yy+s;
				var url="/land.php?x="+xx+"&y="+ss+"&"+c;
				self.overOperation2(url);
				ss=yy-s;
				var url="/land.php?x="+xx+"&y="+ss+"&"+c;
				self.overOperation2(url);
			}
		}
		for(var z=1;z<4;z++) {
			var xx = new Number(a);
			var yy = new Number(b);
			xx = (xx-z)*x;
			yy = (yy)*y;
			var url="/land.php?x="+xx+"&y="+yy+"&"+c;
			self.overOperation2(url);
			for(s=1;s<4;s++) {
				var ss=yy+s;
				var url="/land.php?x="+xx+"&y="+ss+"&"+c;
				self.overOperation2(url);
				ss=yy-s;
				var url="/land.php?x="+xx+"&y="+ss+"&"+c;
				self.overOperation2(url);
			}
		}
		for(var z=1;z<4;z++) {
			var xx = new Number(a);
			var yy = new Number(b);
			xx = (xx)*x;
			yy = (yy+z)*y;
			var url="/land.php?x="+xx+"&y="+yy+"&"+c;
			self.overOperation2(url);
		}
		for(var z=1;z<4;z++) {
			var xx = new Number(a);
			var yy = new Number(b);
			xx = (xx)*x;
			yy = (yy-z)*y;
			var url="/land.php?x="+xx+"&y="+yy+"&"+c;
			self.overOperation2(url);
		}
	},

	overOperation2: function (url){
		var self = this;
		if($('area[href="'+url+'"]').attr('alt')!=undefined) {
			var w_script=$('area[href="'+url+'"]').attr('onmouseover').toString();
			w_script = w_script.substring(w_script.indexOf('overOperation'),w_script.length-2);
			w_script=w_script.replace("overOperation(","");
			w_script=w_script.replace(");","");
			w_script=w_script.replace(/'|"/g,"");
					w_script=w_script.replace(/\s/g,"");
			w_script=w_script.split(',');
			var tmp=$('img#rollover').clone();
			tmp.attr('src',IMAGES.panel_rollover_pink);
			tmp.attr('id','');
			tmp.css('left',w_script[1]);
			tmp.css('top',w_script[2]);
			$('map#mapOverlayMap').after(tmp);
		}
	}
});////}}}

//******************************************************************************
/** 地図：豪族砦周辺をオーバーレイ表示 */
//------------------------------------------------------------------------------
//function prohibitionArea()
Moko.ClanDominationDisplay = FeatureInit({////{{{
	//enable: true,
	//enable: DEV_MODE,
	name: 'ClanDominationDisplay',
	config: 'clan_domination_display',
	group: 'map',
	caption: '陣取り禁止区域表示（新）',
	condition: function () { return LPath.map },
	ready: function () {
		this.update();
		$('body').bind('MokoEvent_MapMoved', this.update.bind(this));
	},
	//------------------------------------------------------------------------------
	update: function () {
		var self = this;

		var mapProp = IXA_getMapProperty();
		var X = 0; var Y = 1;

		// 砦座標
		var CLAN_FORTRESS_COORDS = [
			[ 12, 28],[ 28, 12],[ 12, 52],[ 36, 36],[ 52, 12],[ 12, 76],[ 36, 60],[ 60, 36],[ 76, 12],[ 12,100],
			[ 36, 84],[ 60, 60],[ 84, 36],[100, 12],[ 12,124],[ 36,108],[ 60, 84],[ 84, 60],[108, 36],[124, 12],
			[ 12,148],[ 36,132],[ 60,108],[ 84, 84],[108, 60],[132, 36],[148, 12],[ 36,156],[ 60,132],[ 84,108],
			[108, 84],[132, 60],[156, 36],[ 60,156],[ 84,132],[108,108],[132, 84],[156, 60],[ 84,156],[108,132],
			[132,108],[156, 84],[108,156],[132,132],[156,108],[132,156],[156,132],[156,156]
		];

		$('#mapOverlayMap area[href]').each(function(){
			var $area = $(this);

			var href = $('#ig_mapbox_container a:eq(0)').attr('href');
			var queryStr = (new URI($area.attr('href'))).get('query');
			var q = queryStr.parseQueryString();
			q.x = q.x.toInt(); q.y = q.y.toInt();
			var absX = q.x.abs();
			var absY = q.y.abs();

			//GM_log(q, queryStr);

			CLAN_FORTRESS_COORDS.each(function(coords, idx){
				var eastEnd, northEnd, westEnd, southEnd ;
				westEnd = coords[X] - 3; eastEnd = westEnd + 6;
				southEnd = coords[Y] - 3; northEnd = southEnd + 6;

				var absCoords = {};

				if(
					( ( absX == eastEnd || absX == westEnd ) && absY >= southEnd && absY <= northEnd )
					|| ( ( absY == northEnd || absY == southEnd ) && absX >= westEnd && absX <= eastEnd )
				){
					// 柵の方向を構成
					var fenceEdge = {};
					fenceEdge[q.x < 0 ? 'west' : 'east'] = absX == eastEnd;
					fenceEdge[q.x < 0 ? 'east' : 'west'] = absX == westEnd;
					fenceEdge[q.y < 0 ? 'south' : 'north'] = absY == northEnd;
					fenceEdge[q.y < 0 ? 'north' : 'south'] = absY == southEnd;

					var relY = ( mapProp.size - 1) - (q.y - mapProp.bottom).abs();
					var relX = (q.x - mapProp.left).abs();
					var relPos = relX * mapProp.size + relY + 1;
					GM_log(fenceEdge);

					//GM_log( q.x, q.y, '/land.php?'+ queryStr );
					self.overOperation2( '/land.php?'+ queryStr, fenceEdge, relPos );
				}
			});
		});
	},

	overOperation2: function (url, fenceSetting, imgPos){
		var self = this;

		var imgSizz = sprintf('.mapAll%02d', imgPos);
		var $baseImg = $(imgSizz);

		var fenceCSS = {
			position: 'absolute',
			top: $baseImg.position().top,
			left: $baseImg.position().left,
			width: $baseImg.width(),
			height: $baseImg.height(),
			zIndex: imgPos,
		};

		if( fenceSetting.west ){
			var $fenceW = $.tmpl('<img src="${src}">', {src: IMAGES.fenceYellowW })
			.css(fenceCSS);
			$fenceW.insertBefore($baseImg);
		}
		if( fenceSetting.north ){
			var $fenceN = $.tmpl('<img src="${src}">', {src: IMAGES.fenceYellowN })
			.css(fenceCSS);
			$fenceN.insertBefore($baseImg);
		}
		
		if( fenceSetting.east ){
			var $fenceE = $.tmpl('<img src="${src}">', {src: IMAGES.fenceYellowE })
			.css(fenceCSS);
			$fenceE.insertAfter($baseImg);
		}
		if( fenceSetting.south ){
			var $fenceS = $.tmpl('<img src="${src}">', {src: IMAGES.fenceYellowS })
			.css(fenceCSS);
			$fenceS.insertAfter($baseImg);
		}

		//if($('area[href="'+url+'"]').attr('alt')!=undefined) {
		//	var w_script=$('area[href="'+url+'"]').attr('onmouseover').toString();
		//	w_script = w_script.substring(w_script.indexOf('overOperation'),w_script.length-2);
		//	w_script=w_script.replace("overOperation(","");
		//	w_script=w_script.replace(");","");
		//	w_script=w_script.replace(/'|"/g,"");
		//			w_script=w_script.replace(/\s/g,"");
		//	w_script=w_script.split(',');
		//	var tmp=$('img#rollover').clone();
		//	tmp.attr('src',IMAGES.panel_rollover_pink);
		//	tmp.attr('id','');
		//	tmp.css('left',w_script[1]);
		//	tmp.css('top',w_script[2]);
		//	$('map#mapOverlayMap').after(tmp);
		//}
	}
});////}}}

//******************************************************************************
/** 地図：地形を拡大表示 */
//------------------------------------------------------------------------------
//function zoomMap()
Moko.LandConfirmation = FeatureInit({////{{{
	name: 'LandConfirmation',
	config: 'zoomMap',
	group: 'map',
	caption: 'カーソル選択対象を拡大表示',
	condition: function () { return LPath.map },
	ready: function(){
		$('#zoombox').remove();
		var zoom_box = $('<div id="zoombox">').css({fontSize:'10px',zIndex:1000, width:'136px', height:'75px', position:'absolute', top:'100px', left:'10px', padding:'0 0 11px 0'});
		$('#ig_mapbox').prepend(zoom_box);
		zoom_box = $('<div id="zoomboxInner">').css({padding:'5px 7px'});
		$('#zoombox').prepend(zoom_box);
		zoom_box = '<ui><li id="zoomImg"><img src="/img/common/dummy.gif" id="timg"></li></ui>';
		$('#zoomboxInner').prepend(zoom_box);
		this.run();
	},
	//------------------------------------------------------------------------------
	run: function () {
		$('map#mapOverlayMap>area:not([alt^="空き地"])').live({
			mouseover: function(){
				var left = $('img#rollover').css('left');
				var top = $('img#rollover').css('top');
				$('img[class^="mapAll"]').each(function(){
					var t_left = $(this).css('left');
					var t_top = $(this).css('top');
					var w_top = new Number(t_top.replace('px',''));
					w_top=w_top-2;
					w_top=w_top+'px';
					if(((left==t_left)&&(top==t_top))||((left==t_left)&&(top==w_top))) {
						$('#timg').attr('src',$(this).attr('src'));
						$('#timg').css('width','105%');
						return false;
					}
				});
			},
			mouseout: function(){
				$('#timg').attr('src','/img/common/dummy.gif');
				$('#timg').css('width','1px');
			}
		});
	}
});////}}}

//******************************************************************************
/** 取引：カードナンバー順に */
//------------------------------------------------------------------------------
Moko.CardTradeOrderByCardnumber = FeatureInit({////{{{
	name: 'CardTradeOrderByCardnumber',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		$('A[href="/card/trade.php"]').attr('href','/card/trade.php?t=name&k=&s=no&o=a');
	}
});////}}}

//******************************************************************************
/** 出陣：空き地戦力 */
//------------------------------------------------------------------------------
//map_potential
Moko.VacancyPotential = FeatureInit({////{{{
	name: 'VacancyPotential',
	config: 'map_potential',
	options: { ixaSeason: 'season_list' },
	group: 'faci',
	caption: '空き地戦力を表示',
	condition: function () { return ( LPath.send_troop || LPath.land ) },
	style: ''+<><![CDATA[
		#mokotool > div > div{
			padding: 1px 0;
			margin: 1px 0;
		}
		#mokotool > div > h4 {
			font-weight: bold;
			font-size: 12px;
			margin-bottom: 3px;
			background: #555;
			padding: 2px;
		}
		#mokotool .moko-sidebox-table {
		}
		#mokotool table { border-collapse: collapse; }
		#mokotool td { padding: 1px 1px; }
		#mokotool td:first-child { padding-left: 0; }
		#mokotool tr.moko-vacancy-force-recommended {
			color: yellow;
		}
	]]></>,
	//------------------------------------------------------------------------------
	run: function () {
		var tmp = location.search.match(/x=([-]*\d+).*y=([-]*\d+).*c=(\d+)/);
		var param = location.search.parseQueryString();
		if(tmp == null){
			var x = $("*[name=village_x_value]").val();
			var y = $("*[name=village_y_value]").val();
			var c = $('#ixamoko-kyoten-url').val();
			tmp = [,x,y];
			if(typeof(c)!='undefined'){
				c = c.match(/x=([-]*\d+).*y=([-]*\d+).*c=(\d+)/);
				c=c[3];
				//tmp = [,x,y,c];
				tmp.push(c);
			}
		}

		if (tmp!=null) {

			var vacancyForces = VACANCY_FORCE_DATA[ this.ixaSeason || 2 ] ;

			var tiles ={
				'森林'  : '0',
				'綿花'  : '0',
				'鉄鉱山': '0',
				'畑'    : '0',
				'池'    : '0'
			};
			
			var successHdl = function (html) {
				$(html).find('div[class^="ig_mappanel_tilelist_"]')
				.each(function() {
					var mat;
					if( mat = $(this).text().match(/\s*(\D+)(\d+)/) ){
						var tileName = mat[1].trim();
						var tileNum = mat[2];
						tiles[tileName] = tileNum;
					}
				});
				var tileCode = $O.values($O.subset(tiles, ['森林', '綿花', '鉄鉱山', '畑', '池'])).join("");
				if( tileCode in vacancyForces ){
					var force = $O.clone(vacancyForces[tileCode]);
					var minPower = force.list.map(function(v){return v.power}).min();
					force.list.each(function(v, idx){
						v.min = v.power == minPower ;
						v.minSign = v.min ? '◎' : '×' ;
					});
					$.tmpl(''+<><![CDATA[
						<div id="moko-vacancy-force">
							<h4>必要攻撃力</h4>
							<div>★${vacancy.rank} [${vacancy.tile} ${vacancy.code}]</div>
							<table>
							{{each vacancy.list}}
							<tr class="{{if $value.min}}moko-vacancy-force-recommended{{/if}}">
							<td>
								${$value.minSign}${$value.type}
							</td>
							<td style="text-align:right;">
								${$value.power.commalize()}
							</td>
							{{/each}}
							</table>
						</div>
					]]></>, {vacancy: force } )
					.appendTo('#mokotool');
				}
			};

			if( LPath.land ){
				successHdl( document );
			}
			else {
				$.get('/land.php?x='+tmp[1]+'&y='+tmp[2]+(tmp[3]? '&c='+tmp[3]: ''))
				.done( successHdl );
			}
		}
	}
});////}}}

//******************************************************************************
/** 出陣：出陣ボタンを上部にも  */
//------------------------------------------------------------------------------
Moko.SendTroopButtonUpside = FeatureInit({////{{{
	name: 'SendTroopButtonUpside',
	condition: function () { return LPath.land },
	//------------------------------------------------------------------------------
	run: function () {
		if(location.pathname != "/land.php") return;
		tmp=$('a[href^="facility/send_troop.php?x"]').clone();
		$('.ig_mappanel_maindataarea').find('h3').append(tmp);
	}
});////}}}

//******************************************************************************
/** 出陣：出陣時の表示調整【？】 */
//------------------------------------------------------------------------------
Moko.ptop_check = FeatureInit({////{{{
	name: 'ptop_check',
	condition: function () { return LPath.send_troop || LPath.confluence_confirm },
	//------------------------------------------------------------------------------
	run: function () {
		var tmp = $('.btnarea:eq(0)').clone();
		$('#ig_deckheadmenubox').after(tmp);
		$('.btnarea').css('margin-bottom','1px');
		$('INPUT[name="unit_select"]:first').attr('checked', true); 
	}
});////}}}

//******************************************************************************
/** 出陣：合流攻撃 */
//------------------------------------------------------------------------------
//function merge_fight_info()
Moko.SendTroop_MergeConfluence = FeatureInit({////{{{
	name: 'SendTroop_MergeConfluence',
	config: 'merge_fight_info',
	group: 'battle',
	caption: '合流攻撃検索に出陣確認情報表示',
	condition: function () { return LPath.send_troop || LPath.confluence_list },
	ready: function(){
		if( LPath.send_troop ){
			this.readyConfluenceButton();
		}
		else if( LPath.confluence_list ){
			this.mergeConfluenceList();
		}
	},
	//------------------------------------------------------------------------------
	// 合流ボタンを変更
	readyConfluenceButton: function () {
		$('div#ig_gofightboxtitle').find('img').each(function() {
			if($(this).attr('src').indexOf('hd_joinattack.gif')!=-1) {
				$(this).attr('src', IMAGES.hd_joinattack);
				$(this).attr('width','160');
				$(this).attr('height','15');
				$(this).attr('alt','攻撃か付近の攻撃に合流');
				return;
			}
		});
	},
	// 合流攻撃検索
	mergeConfluenceList: function () {
		var vx_value = $('input#village_x_value').attr('value');
		var vy_value = $('input#village_y_value').attr('value');
		var u_select = $('input#unit_select').attr('value');
		var data = {village_x_value:vx_value, village_y_value:vy_value,radio_move_type:302,unit_select:u_select,btn_preview:true};
		var data2 = {village_x_value:vx_value, village_y_value:vy_value,radio_move_type:307,unit_select:u_select,btn_preview:true};
		$.ajax({
			type: "POST", url: '/facility/send_troop.php', data:data, cache: false,
			success: function (html){
				var t_dom = $(html).find('div#ig_gofightconfirmboxtitle').clone();
				$('div#ig_deck_search_box_top.center').before(t_dom);
				var $table = $('table.paneltable.table_gofight_conftitle');
				$table.css({marginLeft:'auto', marginRight:'auto'});
				var wth = $table.find('th:eq(2)').clone();
				var wtd = $table.find('td:eq(2)').clone();
				$table.find('tr.noborder').remove();
				$table.find('td:eq(1)').after(wth);
				$table.find('th:eq(2)').after(wtd);
				$table.find('td:last').after('<td><a href="javascript:void(0)" onclick="return false;" id="attack"><img src="/img/localmap/btn_gofighthere.png"></a></td>');
				$table.find('td:last').after('<td><a href="javascript:void(0)" onclick="return false;" id="jinhari"><img src="'+IMAGES.btn_gojinhere+'"></a></td>');
				$('#attack').click(function() {
					$.form({
						type: 'post',
						url: '/facility/send_troop.php',
						data: data
					});
				});
				$('#jinhari').click(function() {
					$.form({
						type: 'post',
						url: '/facility/send_troop.php',
						data: data2
					});
				});
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				//console.log(textStatus);
			}
		});
		//$.form = function(s){
		//    var def = {
		//            type: 'get',
		//            url: location.href,
		//            data: {}
		//    };
		//    s = jQuery.extend(true, s, jQuery.extend(true, {}, def, s));
		//    var form = $('<form>').attr({'method': s.type,'action': s.url}).appendTo(document.body);
		//    for (var a in s.data) {
		//        $('<input>').attr({'name': a,'value': s.data[a]}).appendTo(form[0]);
		//    };
		//    form[0].submit();
		//}
	}
});////}}}

//******************************************************************************
/** 出陣：空き地、敵地での機能選択を押しボタン表示 */
//------------------------------------------------------------------------------
//function panel_func_change()
Moko.AlterPanelFunc = FeatureInit({////{{{
	name: 'AlterPanelFunc',
	config: 'panel_func_change',
	group: 'faci',
	caption: '機能選択を押しボタン表示',
	condition: function () { return LPath.land },
	//------------------------------------------------------------------------------
	run: function () {
		var func_list={};
		$('.ig_mappanel_function_mid').find('br').each(function(){
			$(this).remove();
		});
		$('.ig_mappanel_function_mid').find('img').each(function(){
			func_list[$(this).attr('alt')]=$(this).parent().attr('href');
			$(this).parent().remove();
		});
		var id_num=0;
		for(i in func_list) {
			var obj='<input type="button" id="btn_'+id_num+'" value="'+i+'">';
			$('.ig_mappanel_function_mid').append(obj);
			if((i=='陣を破棄する')||(i=='領地を破棄する')){
				$('#btn_'+id_num).click(function(e){
					return function() {
						if(confirm('ここを破棄し、空き地に戻しますか？')){
							location.href=e.value;
						}
					}}({value:func_list[i]})); 
			} else if(i=='破棄を中止する'){
				$('#btn_'+id_num).click(function(e){
					return function() {
						if(confirm('破棄を中止しますか？')){
							location.href=e.value;
						}
					}}({value:func_list[i]})); 
			} else {
				$('#btn_'+id_num).click(function(e){
					return function() {
						location.href=e.value;
					}}({value:func_list[i]})); 
			}
			id_num++;
		}
	}
});////}}}

//******************************************************************************
/** 秘境探索：部隊がいないときに、部隊のいる所領の秘境に飛ぶ */
//------------------------------------------------------------------------------
Moko.MoveTourableDungeon = FeatureInit({////{{{
    name: 'MoveTourableDungeon',
	config: 'move_to_torable_dungeon',
	caption: '部隊がいないとき、部隊のいる所領の秘境に飛ぶ',
	group: 'dungeon',
	configSettings: {
		move_to_torable_dungeon: { default_value: false, },
	},
    condition: function () { return LPath['秘境'] },
    //------------------------------------------------------------------------------
	ready: function(){
		// 部隊がいるなら終了
		if(!$('.dungeon_boxbottom:contains("※この拠点に所属する部隊が存在しません。")').length){
			return;
		}
		this.run();
	},
    //------------------------------------------------------------------------------
    run: function () {
		IXA_getUnitStatus()
		.done(function(unitStatus){
			var standbyUnitFirst;
			unitStatus.some(function(v){
				if(v.isStandby){
					standbyUnitFirst = v;
					return true;
				}
			})
			if(standbyUnitFirst){
				var tourableURL = IXA_makeVillageChangeURL(standbyUnitFirst.villageID, '/facility/dungeon.php');
				location.href = tourableURL;
			}
		});
	}
});////}}}

//******************************************************************************
/** 秘境探索：デフォでチェックが入っている、出発ボタンを上にも */
//------------------------------------------------------------------------------
Moko.DungeonUI = FeatureInit({////{{{
	name: 'DungeonUI',
	options: {
		isSendAllToDungeon: 'hikyou_all',
		useUnitAutoSelection: 'hikyou',
	},
	configSettings: {
		hikyou_all: { caption: '全部隊秘境送り' },
		hikyou    : { caption: '部隊の自動選択' },
	},
	group: 'dungeon',
	condition: function () { return LPath['秘境'] },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;

		if ( this.useUnitAutoSelection ) {
			var tmp = $('INPUT[name="unit_select"]:first').prop('checked', true);
			if (tmp.get().length>0) {
				var dungeon_btn = $('IMG[alt="出発"]').parent().clone().wrap($('<DIV class="center">')).parent();
				$('#dungeon_list_body').after(dungeon_btn);
			}
		}
		var idx = localStorage.getItem(location.hostname + 'dungeon_idx');

		if (idx) {
			$('INPUT[name="dungeon_select"][value="'+idx+'"]').prop('checked', true);
		}

		$('INPUT[name="dungeon_select"]').live('change', function() {
			localStorage.setItem(location.hostname + 'dungeon_idx', $('INPUT[name="dungeon_select"]:checked').val());
		}, false);
		//unsafeWindow.jQuery('INPUT[name="dungeon_select"]').change(function() {
		//    localStorage.setItem(location.hostname + 'dungeon_idx', $('INPUT[name="dungeon_select"]:checked').val());
		//}, false);

		if ( this.isSendAllToDungeon ) {
			var tmp = '<a href="javascript:void(0)" onclick="return false;" id="send_all"><img src="'+IMAGES.btn_all_departure+'" alt="全部隊出発"></a>';
			$('a[onclick^="submitDungeonForm"]').after(tmp);
			$('#send_all').live('click',function(){
				if(!confirm("選択した内容で秘境探索に全部隊を出陣させます。\nよろしいですか？"))return;
				var unit_array = new Array();
				var i=0;
				$('.ig_decksection_innermid').find('input[name^="unit_select"]').each(function(){
					unit_array[i] = $(this).attr('value');
					i++;
				});
				nowLoading();
				self.send_all_hikyo(unit_array,0,$('INPUT[name="dungeon_select"]:checked').val());
				$('.btnarea').remove();
				$('.center').remove();
			});
		}

		// 新秘境情報を下に
		if(location.pathname =="/facility/dungeon02.php" ){
			$('.dungeon_info')
				.appendTo( $('.ig_decksection_innermid') )
				.css({marginBottom: -20, marginTop: 20})
			;
		}
	},
	send_all_hikyo: function (unit_array,i,d_select) {
		var self = this;
		if(unit_array.length <= i) {
			location.href='/facility/dungeon.php';
			return;
		}

		var hikyou_post_url;
		switch ( parseInt( d_select ) ) {
			case 1 : case 2 : case 3 : case 4 :
				hikyou_post_url = '/facility/dungeon.php';
			break;
			case 100 : case 200 :
				hikyou_post_url = '/facility/dungeon02.php';
			break;
			default :
				//console.log( 'Invarid HIKYOU number: ' + d_select );
				location.href='/facility/dungeon.php';
				return;
			break;
		}

		var dungeon_select = d_select
		var unit_select = unit_array[i];
		var data = {dungeon_select:dungeon_select,unit_select:unit_select,btn_send:true};
		//console.log( 'Dungeon Number:' + dungeon_select, 'Post URL:'+ hikyou_post_url );
		$.ajax({
			type: "POST", url: hikyou_post_url, data: data, cache: false,
			success: function (html){
			i++;
			self.send_all_hikyo(unit_array,i,d_select);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//console.log(textStatus);
		}
		});
	}
});////}}}

//******************************************************************************
/** 書状：ナビを上部に */
//------------------------------------------------------------------------------
//function message_check()
Moko.HoistMessageNavi = FeatureInit({////{{{
	name: 'HoistMessageNavi',
	caption: '書状：ナビを上部に',
	condition: LPath.pass('message_detail'),
	//------------------------------------------------------------------------------
	run: function () {
		var navi = $('.message_footernavi').clone();
		$('.common_box3bottom').prepend(navi);
	}
});////}}}

//******************************************************************************
/** 書状：全件既読 */
//------------------------------------------------------------------------------
//function all_check_inbox()
Moko.ImproveMessageInbox = FeatureInit({////{{{
	name: 'ImproveMessageInbox',
	condition: function () { return LPath.message_inbox },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		$('p.mt10.mb5').prepend('<input type=button value="このページを全件既読にする" id="all_check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		var tmp='<th width="32" class="w30"><input type=button value="選択" id="select_check"></th>';
		$('.common_table1.center:eq(0)').find('th.w30:eq(0)').replaceWith(tmp);
		$('#all_check').click(function() {
			$("#all_check").prop("disabled",true);
			var list = new Array();
			$('td.left.comment_wbr').find('a').each(function() {
				var tmp = new Array();
				tmp[0] = $(this).attr("href");
				list = list.concat(tmp);
			});
			nowLoading();
			self.all_read(list,0);
		});
		$('#select_check').click(function() {
			$('input[name="chk[]"]').prop('checked',true);
		});
	},
	all_read: function (list,i) {
		var self = this;
		if((list.length < i-1)||(list[i] == undefined)) {
			location.href='inbox.php';
		}
		else {
			$.ajax({
				type: "POST", url: '/message/'+list[i], cache: false, dataType: "text",
				success: function (html){
					self.all_read(list,i+1);
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					//console.log(textStatus);
				}
			});
		}
	}
});////}}}

//******************************************************************************
/** 書状：合成結果選択 */
//------------------------------------------------------------------------------
//function all_check_inbox()
Moko.MessageInboxSelectSkillCompositeResult = FeatureInit({////{{{
	name: 'MessageInboxSelectSkillCompositeResult',
	condition: function () { return LPath.message_inbox },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		//$('tr :checkbox').live('change', function(){
		//	var $cb = $(this);
		//	if( $cb.prop('checked') ){
		//		$cb.closest('tr').css({ background: '#ddb'});
		//	}
		//	else {
		//		$cb.closest('tr').css({ background: 'transparent' });
		//	}
		//});
		$sels = $('<span class="ixamoko-inline-ui-area" id="ixamoko-mes-selections">')
			.insertAfter('label:has(input[value="選択を削除"])')
		;//$end
		$('<input type="button" value="合成結果">')
			.appendTo($sels)
			.bind('click',function(){
				$('tr :checkbox').prop('checked', false );
				$('tr:has(td :checkbox):has(td:contains("の合成結果")):has(td:contains("戦国IXA運営チーム")) :checkbox')
				.prop('checked',true)
				.fireEvent('change')
				;
				return false;
			})
		;//$end
		$('<input type="button" value="落札">')
			.appendTo($sels)
			.bind('click',function(){
				$('tr :checkbox').prop('checked', false );
				$('tr:has(td :checkbox):has(td:contains("出品したカードが落札されました"), td:contains("カードを落札しました")):has(td:contains("戦国IXA運営チーム")) :checkbox')
				.prop('checked',true)
				.fireEvent('change');
				return false;
			})
		;//$end
		$('<input type="button" value="IXA運営">')
			.appendTo($sels)
			.bind('click',function(){
				$('tr :checkbox').prop('checked', false );
				$('tr:has(td :checkbox):has(td:contains("戦国IXA運営チーム")) :checkbox')
				.prop('checked',true)
				.fireEvent('change');
				return false;
			})
		;//$end
		$sels.append('<span>を選択</span>');
	}
});////}}}

//******************************************************************************
/** 報告書：戦闘報告：兵の損害表示 */
//------------------------------------------------------------------------------
Moko.ReportDeatilLostedSoldierDisplay = FeatureInit({////{{{
    name: 'ReportDeatilLostedSoldierDisplay',
	config: 'report_detail_losted_soldier_display',
	caption: '報告書の戦闘報告で失った兵士数を表示',
	group: 'other',
	condition: function () { return LPath['戦闘報告'] },
	ready: function(){
		try{ this.run(); }
		catch(e){
			console.warn(e);
		}
	},
    //------------------------------------------------------------------------------
	run: function(){
		$('.commontable_fight, .commontable_defense')
		.find('.layouttable>tbody>tr:has(table)')
		.each(function(){
			var preFight  = $(this).find('table:eq(0)');
			var postFight = $(this).find('table:eq(1)');
			var prePos  = preFight.find('th:has(img[src$="/hd_heisu.gif"])').index();
			var postPos = postFight.find('th:has(img[src$="/hd_heisu.gif"])').index();

			if( prePos >=0 && postPos >=0 ){

				postFight.find('tbody>tr:eq(0)>th').attr('colspan',function(i,val){return val.fetchNum() + 1 });
				postFight.find('tbody>tr:eq(1)>th:eq(0)').after('<th>損害</th>');

				preFight.find('tr:gt(1)').each(function(idx){
					var preNum = $(this).children().eq(prePos).text().fetchNum();
					var postNum;
					postFight
					.find('>tbody>tr:gt(1)').eq(idx).children().eq(postPos)
					.each(function(){
						postNum = $(this).text().fetchNum();
						var diffNum = preNum - postNum;
						$('<td>',{
							text: sprintf('-%s',diffNum.commalize()),
							//css: {color:'red'}
						}).insertAfter($(this));
					});
				})
			}
		})
	},
});////}}}

//******************************************************************************
/** 報告書の戦闘報告の経験値合計／城主経験値表示 */
//------------------------------------------------------------------------------
Moko.ReportDetailTotalExpDisplay = FeatureInit({////{{{
    name: 'ReportDetailTotalExpDisplay',
	config: 'report_detail_total_exp_display',
	caption: '報告書の戦闘報告の経験値合計／城主経験値表示',
	group: 'other',
	condition: function () { return LPath['戦闘報告'] },
	ready: function(){
		try{ this.run(); }
		catch(e){
			console.warn(e);
		}
	},
    //------------------------------------------------------------------------------
    run: function () {
		$('p.log3').each(function(){
			var exp = ($(this).text().match(/獲得経験値「\d+」/g)||[])
			.map(function(v){return v.fetchNum()}).sum() || 0;

			var lordExp = ($(this).text().match(/レベルアップ「\d+→\d+」/g)||[])
				.map(function(v){
					var nums = v.match(/\d+/g).map(function(d){return d.fetchNum()});
					return nums[1] - nums[0];
				}).sum() || 0;

			if( !exp && !lordExp ) return;

			$.tmpl(''+<><![CDATA[
				<p>
					経験値合計：<strong>${exp}</strong>
					城主経験値：<strong>${lordExp}</strong>
				</p>
			]]></>, {exp: exp, lordExp: lordExp})
			.css({marginBottom:'1em'})
			.insertAfter('.log3');
		});
	}
});////}}}

//******************************************************************************
/** 報告書：ナビを上部に */
//------------------------------------------------------------------------------
//function report_check()
Moko.HoistReportNavi = FeatureInit({////{{{
	name: 'HoistReportNavi',
	condition: function () { return LPath.report_detail },
	//------------------------------------------------------------------------------
	run: function () {
		$('li.gnavi05.iepngfix').find('a').eq(0).replaceWith('<a href="/war/war_situation.php">合戦</a>');
		if (location.pathname!="/report/detail.php") return;
		var navi = $('.report_navi').clone();
		$('.ig_decksection_innermid').prepend(navi);
	}
});////}}}

//******************************************************************************
/** 報告書：秘境探索の総収入を表示 */
//------------------------------------------------------------------------------
Moko.DungeonReport = FeatureInit({////{{{
    name: 'DungeonReport',
	group: 'other',
	config: 'dungeon_report',
	caption: '秘境探索の総収入を表示（全て：未読のみ、他：表示中全件を集計）',
    condition: function () { return LPath.report_list },
	ready: function(){
		if( !location.search || /\bm=dungeon\b/.test( location.search ) ){
			$('<li><a href="#">秘境収入</a></li>')
				.appendTo('ul.statMenu:eq(0)')
				.addClass('last')
				.click( this.run.bind(this) )
				.prev().removeClass('last')
			;
		}
	},
    //------------------------------------------------------------------------------
    run: function () {
		var list;
		if( /\bm=dungeon\b/.test( location.search ) ){
			list =$('.paneltable.p_report tr:gt(0) img[alt="秘境探索"]+a');
		}
		else {
			list =$('.paneltable.p_report tr.noread img[alt="秘境探索"]+a');
		}
		list = list.map(function(){ return $(this).attr('href') }).toArray() ;
		
		nowLoading(list.length);
		var $container= $('<div>');
		
		var _getlog = function(){
			countUpProgress();
			$.get(list.shift(),function(html){
				var $html=$(html);
				var $log = $html.find('.commontable>tbody:has(>tr>th:contains("ログ")) tr:eq(1)');
				$container.append($log.find('.log3, .gettreger'))
				if(list.length){ _getlog();}
				else{ _showTreasure() }
			},'text')
		};

		var tre = {'城主経験値':0,'レベルアップ':0, '木材':0, '綿':0,'鉄':0,'糧':0,'銅銭':0};
		var _showTreasure = function(){
			$container.children('.gettreger').each(
				function(){
				var text = $(this).text(),
					match,
					re = /(木材|綿|鉄|糧|銅銭)(\d+)/g
				;
				while( (match = re.exec(text)) != null ){
					tre[match[1]] += match[2].toInt()
				}
			});

			$container.children('.log3').each(
				function(){
					var text = $(this).text();
					var mat;
					if( (mat=/獲得城主経験値「\D*(\d+)\D*」/.exec(text))!=null ){
						tre['城主経験値'] += mat[1].toInt();
					}
					var mat2;
					var re=/レベルアップ「\s*(\d+)\s*→\s*(\d+)\s*」/g;
					while( (mat2=re.exec(text)) != null ){
						var up = mat2[2].toInt() - mat2[1].toInt();
						tre['レベルアップ'] += up;
					}
			});

			//GM_log(tre)
			Moko_simpleTable(tre, '項目', '収入');
			nowLoading.removeDialog()
		};
		_getlog()
	}
})////}}}

//******************************************************************************
/** 合戦報告書：ナビ */
//------------------------------------------------------------------------------
Moko.WarDetailNavi = FeatureInit({////{{{
	name: 'WarDetailNavi',
	condition: function () { return LPath.war_detail },
	//------------------------------------------------------------------------------
	run: function () {
		var self = this;
		var target_query = location.search.substr(1,location.search.length-1).split("&");
		target_query = target_query[0];
		var back_query = $('a[href^="list.php"]').attr('href');
		$.ajax({
			type: "POST",
			url: '/war/'+back_query,
			cache: false,
			success: function (html){
				var before_query='';
				var after_query='';
				var target_row=0;
				var i=0;
				var max_row=0;
				$(html).find('a[href^="detail.php"]').each(function() {
					if($(this).attr('href').indexOf(target_query)>=0) {
						target_row=i;
					}
					i++;
					max_row++;
				});
				i=0;
				$(html).find('a[href^="detail.php"]').each(function() {
					if((i==target_row-1)&&(target_row!=0)) {
						after_query=$(this).attr('href');
					}
					if((i==target_row+1)&&(target_row!=max_row)) {
						before_query=$(this).attr('href');
						return false;
					}
					i++;
				});
				self.war_detail_navi_link(html,before_query,after_query);
				return;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	},

	war_detail_navi_link: function (argHtml,before_query,after_query) {
		var self = this;
		var target_href='';
		var t_num = $(argHtml).find('.ig_battle_pagelist').find('span:eq(0)').text();
		if(before_query==''){
			if(t_num!=''){
				t_num++;
				$(argHtml).find('.ig_battle_pagelist').find('a[href^="/war/list.php"]').each(function(){
					if($(this).text()==t_num) {
						target_href=$(this).attr('href');
						return false;
					}
				});
			}
		} else if(after_query=='') {
			if(t_num!=''){
				t_num--;
				$(argHtml).find('.ig_battle_pagelist').find('a[href^="/war/list.php"]').each(function(){
					if($(this).text()==t_num) {
						target_href=$(this).attr('href');
						return false;
					}
				});
			}
		} else {
			self.make_navi(before_query,after_query);
			return;
		}
		if(target_href!=''){
			$.ajax({
				type: "POST",
				url: target_href,
				cache: false,
				success: function (html){
				if(before_query==''){
					$(html).find('a[href^="detail.php"]').each(function() {
						before_query=$(this).attr('href');
						return false;
					});
				}
				if(after_query==''){
					$(html).find('a[href^="detail.php"]').each(function() {
						after_query=$(this).attr('href');
					});
				}
				self.make_navi(before_query,after_query);
				return;
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
			}
			});
		}else{
			self.make_navi(before_query,after_query);
			return;
		}
	},

	make_navi: function (before_query,after_query) {
		var a_query_page = after_query.substr(1,location.search.length-1).split("&");
		a_query_page=a_query_page[2];
		if((a_query_page==undefined)||(a_query_page=='p=0')) {after_query='';}
		var tmp='<div class="report_navi clearfix">';
		if(before_query==''){tmp+='<div class="leftF"></div>';}else{tmp+='<div class="leftF"><a href="'+before_query+'" style="color: #060;">前の報告書へ</a></div>'}
		if(after_query==''){tmp+='<div class="rightF"></div>';}else{tmp+='<div class="rightF"><a href="'+after_query+'" style="color: #060;">次の報告書へ</a></div>'}
		$('.ig_battle_table').before(tmp);
	}
});////}}}

//******************************************************************************
/** 合戦報告書リンク：ユーザー */
//------------------------------------------------------------------------------
Moko.WarReportLinkUser = FeatureInit({////{{{
	name: 'WarReportLink',
	condition: function () { return LPath.user },
	//------------------------------------------------------------------------------
	run: function () {
		$('DIV.common_box3bottom > TABLE').find('a[href^="/message/new.php?user_id="]').eq(0).each(function() {
			var $this = $(this);
			var name = $this.parent().text();
			$this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>'); 
		});
		//$('DIV.common_box3bottom > TABLE').find('strong').find('A:eq(0)').each(function() {
		//    var $this = $(this);
		//    var name = $this.parent().text();
		//    $this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>'); 
		//});
		$('DIV.common_box3bottom > TABLE').find('DIV.pro4').find('A:eq(0)').each(function() {
			var $this = $(this);
			var name = $this.parent().text();
			$this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=alliance&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>');
		});
	},
});////}}}

//******************************************************************************
/** 合戦報告書リンク：土地 */
//------------------------------------------------------------------------------
Moko.WarReportLinkLand = FeatureInit({////{{{
	name: 'WarReportLinkLand',
	condition: function () { return LPath.land },
	//------------------------------------------------------------------------------
	run: function () {
		//if (location.pathname!="/land.php") return;
		$('DIV.ig_mappanel_dataarea').find('A[href^="/user/"]').each(function() {
			var $this = $(this);
			var name = $this.text();
			$this.after('&nbsp<a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[報]</a>'); 
		});
		$('DIV.ig_mappanel_dataarea').find('A[href^="/alliance/"]').each(function() {
			var $this = $(this);
			var name = $this.text();
			$this.after('&nbsp<a href="/war/list.php?m=&s=1&name=alliance&word='+name+'&coord=map&x=&y=">[報]</a>'); 
		});
	}
});////}}}

//******************************************************************************
/** 同盟掲示板：戻るボタン追加 */
//------------------------------------------------------------------------------
// function bbs_check()
Moko.BBSGoBackButton = FeatureInit({////{{{
	name: 'BBSGoBackButton',
	condition: function () { return LPath.bbs_res_view },
	//------------------------------------------------------------------------------
	run: function () {
		var tmp = '<div align="center" style="margin-top:15px; margin-bottom: 15px;"><a href="/bbs/topic_view.php"><img style="opacity: 1;" src="/img/common/btn_back.gif" class="fade" alt="戻る" title="戻る"></a></div>';
		$('DIV[class="common_box3"]').after(tmp);
	}
});////}}}

//******************************************************************************
/** チャット履歴：ボタンのリンク先修正（直接履歴へ飛ぶように）  */
//------------------------------------------------------------------------------
Moko.ModifyHeadChatButtonDestination = FeatureInit({////{{{
	name: 'ModifyHeadChatButtonDestination',
	config: 'chat_linkchg',
	group: 'chat',
	caption: '「チャット履歴」のリンク先修正',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		$('DIV[class="commentbtn2"] > A:eq(1)').attr('href', '/alliance/chat_view.php');
	}
});////}}}

//******************************************************************************
/** チャット：はじめからを100件に */
//------------------------------------------------------------------------------
Moko.ChatHistoryLink100 = FeatureInit({////{{{
	name: 'ChatHistoryLink100',
	config: 'chat_history_link100',
	caption: 'チャット：はじめから100件に',
	group: 'chat',
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
		$('a[href="/alliance/chat_view.php"]').attr('href','/alliance/chat_view.php?pager_select=100');
	}
})////}}}

//******************************************************************************
/** チャット履歴、掲示板レス：同盟掲示板へのリンクをつける */
//------------------------------------------------------------------------------
Moko.AddBBSLink = FeatureInit({////{{{
	name: 'AddBBSLink',
	condition: function () { return LPath('bbs_res_view','chat_view') },
	//------------------------------------------------------------------------------
	run: function () {
		$('UL[class="clearfix"] > LI:eq(2)').wrap('<a href="/bbs/topic_view.php" style="color: #006600;text-decoration: underline;"></a>');
	}
})////}}}

//******************************************************************************
/** 城主：自国情報をクリアする */
//------------------------------------------------------------------------------
Moko.NationInfoClearer = FeatureInit({////{{{
	name: 'NationInfoClearer',
	options: { useNationInfoCache: 'nation_info_cache' },
	priority: PRIO_MORE_ERALY,
	condition: function () { return LPath.user && !location.search },
	//------------------------------------------------------------------------------
	run: function () {
		if( this.useNationInfoCache ){
			mokoStorage.setItem('NationInfo',{});
		}
	}
});////}}}}

//******************************************************************************
/** 城主：自分以外の陥落判定 */
//------------------------------------------------------------------------------
Moko.fall_check = FeatureInit({////{{{
	name: 'fall_check',
	config: 'fall_check',
	group: 'all2',
	caption: '他人の城主プロフィールに陥落中表示',
	condition: function () { return LPath.user },
	//------------------------------------------------------------------------------
	run: function () {

		// 自分はいらない
		if( !location.search ) return;

		// 陥落列を追加
		$('.common_table1.center').eq(0).find('th:last').after('<th>-</th>');

		var villageNames=[];
		var tmp=[];
		var ins_point=[];
		$('table.common_table1.center:eq(0) tr.fs14').each(function() {
			var $row = $(this);

			var kind = $row.find('td:eq(0)').text();
			if(!/^(?:本領|所領|出城)$/.test( kind ))
				return true;

			var name = $row.find('a:eq(0)').text().replace(/^\s+|\s+$/g, "");
			villageNames.push(name);
			var t = $row.find('a:eq(1)').attr('href').match(/\.php\?(.+)$/);
			//GM_log(name, t);
			tmp.push(t[1]);
			ins_point.push($row.find('td:last'));
		});

		this.fall_write(villageNames, tmp, ins_point);
	},

	fall_write: function (villageNames, tmp, ins_point) {
		var self = this;
		if( !villageNames.length ) return;

		var vName = villageNames.shift();
		var param = tmp.shift();
		var $ins   = ins_point.shift();

		if( typeOf( param ) === 'undefined' ) return;

		$.ajax($.extend({}, AJAX_ASYNC_NOCACHE_GET, {
			url: '/map.php?'+ param, 
			success: function (html){
				var areas = $(html).find('map#mapOverlayMap > area');
				var imgs = $(html).find('div#ig_mapsAll > img')
					.filter(function(){if($(this).attr('src').indexOf('outside')<0)return $(this);});
				var index = areas.index(areas.filter('[title="' + vName + '"]'));
				if (index >= 0 && imgs.eq(index).attr('src').indexOf('fall_capital') > 0) {
					$($ins).after("<td><span class='red'>陥落中</span></td>");
				} else {
					$($ins).after("<td>&nbsp;</td>");
				}
				self.fall_write(villageNames,tmp,ins_point);
			},
		}));
	}
})////}}}

//******************************************************************************
/** 城主：拠点レベルを表示 */
//------------------------------------------------------------------------------
Moko.FootholdsLevel = FeatureInit({////{{{
    name: 'FootholdsLevel',
	config: 'lv_check',
	caption: '拠点レベル表示',
	group: 'all2',
    condition: function () { return LPath.user },
	ready: function(){
		this.lv_check();
	},
    //------------------------------------------------------------------------------
		//拠点LV（一括Lvアップの伏線）
	lv_check: function (){
		var lastSelect = $(".sideBoxInner.basename").find(".on").text();
		$('.common_table1.center').eq(0).find('th:last').after('<th>Lv</th>');
		$('.common_table1.center').eq(1).find('th:last').after('<th>Lv</th>');
		var nm=[];
		var url=[];
		var tmp=[];
		var ins_point=[];
		$('.common_table1.center').find('.fs14').each(function() {
			var t = $(this).find('a:eq(1)').attr('href').match(/map\.php\?(.+)$/);
			url.push(t[1]);
			nm.push($(this).find('td:eq(0)').text());
			tmp.push($(this).find('a:eq(0)').attr('href'));
			ins_point.push($(this).find('td:last'));
		});
		this.lv_write(nm,url,tmp,ins_point,0,lastSelect);
	},

	//拠点LV表示
	lv_write: function (nm,url,tmp,ins_point,cnt,lastSelect) {
		var self = this;
		if(cnt>=tmp.length){
			$.ajax($.extend({},AJAX_ASYNC_NOCACHE_GET,{
				url: '/user/', 
				success: function (html){
					$(html).find('.common_table1.center').find('.fs14').each(function() {
						if($(this).find('a:eq(0)').text().replace(/^\s+|\s+$/g, "")==lastSelect){
							var href= $(this).find('a:eq(0)').attr('href');
							$.ajax({
								url: href, 
								cache: false,
								dataType: "text",
								success: function (html){
									return;
								},
								error: function (XMLHttpRequest, textStatus, errorThrown) {
								}
							});
						}
					});
				},
			}));
			return;
		}

		$.ajax($.extend({},AJAX_ASYNC_NOCACHE_GET,{
			url: tmp[cnt], 
			success: function (html){
				if((nm[cnt]=='本領')||(nm[cnt]=='所領')) {
					var lv = $(html).find('#mapOverlayMap').find('area[title^="本丸 "]').attr('title');
					if(lv==undefined){ lv=$(html).find('#mapOverlayMap').find('area[title^="村落 "]').attr('title');}
					if(lv==undefined){ lv=$(html).find('#mapOverlayMap').find('area[title^="砦 "]').attr('title');}
					if(lv==undefined){lv='-';}
					if(lv!='-'){
						lv=lv.match(/\d/g).join('');
					}
					$(ins_point[cnt]).after("<td>"+lv+"</td>");
					cnt++;
					self.lv_write(nm,url,tmp,ins_point,cnt,lastSelect);
				} else {
					$.ajax({
						url: '/facility/camp_proc.php?'+url[cnt], 
						cache: false, 
						dataType: "text",
						success: function (html){
							var key = $(html).find('.ig_decksection_top').text();
							if(key!=''){
								key=key.match(/\d/g).join('');
							}
							$(ins_point[cnt]).after("<td>"+key+"</td>");
							cnt++;
							self.lv_write(nm,url,tmp,ins_point,cnt,lastSelect);
						},
						error: function (XMLHttpRequest, textStatus, errorThrown) {
							//console.log(textStatus);
						}
					});
				}
			},
		}));
	}
});////}}}

//******************************************************************************
/** 一括削除：新規武将に係るインターフェース */
// 新規武将＝くじを引いて10分以内／入手後全編成を開いていない武将
//------------------------------------------------------------------------------
Moko.MarkingRookie = FeatureInit({////{{{
	//enable: DEV_MODE,
    name: 'MarkingRookie',
    condition: function () { return LPath.deck_card_delete },
	style: ''+<><![CDATA[
		.moko-lotting-rookie { background: #eef4ff; }
		input[type="button"], input[type="submit"], input[type="reset"], button
		{ font-family: sunserif }
	]]></>,
	confRookiedTime: 10 * 60*1000,
    //------------------------------------------------------------------------------
    run: function () {
		var self = this;
		var rem = mokoStorage.getItem('DrawedCardReminder');
		if(!rem.record) rem.record = {};
		var rec = rem.record;

		// 10分以内のに絞る
		var rookie = $O.filter(rec, function(v, k){return v.date.toDate() - 0 + self.confRookiedTime > IXA_getIXATime() });
		rem.record = rookie;
		mokoStorage.flush();

		var $btnHideVeteran = $('<input type="button" id="moko-card-delete-ui-hide-veteran" value="古参表示／非表示">');
		var $btnCheckRookie = $('<input type="button" id="moko-card-delete-ui-check-rookie" value="新人を?">');

		$('#moko-card-delete-ui').append(
			$btnHideVeteran, $btnCheckRookie
		);
		var squadConfig = mokoStorage.getItem('Squads');

		var $chkRookie = $('input[name="delete_card_arr[]"]')
		.filter(function(){
			return rookie[$(this).val()] || !squadConfig[$(this).val()];
		});

		$btnCheckRookie.val('新人（'+$chkRookie.size()+'人）を?');

		$chkRookie.each(function(){
			$(this).closest('tr').addClass('moko-lotting-rookie')
		})

		$btnHideVeteran
		.click(function(){
			$('.common_table1.center.mt10 tr:gt(0):not(.moko-lotting-rookie)')
			.toggle();
		});
		
		$btnCheckRookie
		.click(function(){
			$('.moko-lotting-rookie :checkbox:enabled:visible').prop('checked',true);
		});

	}
});////}}}

//******************************************************************************
/** くじ：引いた武将を一定期間保存 */
//------------------------------------------------------------------------------
Moko.DrawedCardReminder = FeatureInit({
	//enable: DEV_MODE,
    name: 'DrawedCardReminder',
    condition: function () { return LPath.senkuji_result },
    //------------------------------------------------------------------------------
    run: function () {
		var ixaTime = IXA_getIXATime();
		var param = location.search.replace(/^\?/,'').parseQueryString();
		var captainID = param.card;
		var lotType = param.got_type; // くじの種類？
		var rem = mokoStorage.getItem('DrawedCardReminder');
		if(!rem.record) rem.record = {};
		rem.record[captainID] = { captainID: captainID, date: ixaTime.formatFullDate() };
		GM_log(rem.record);
		// 10分以内のに絞る
		var rookie = $O.filter(rem.record, function(v, k){return v.date.toDate() - 0 + 10*60*1000 > IXA_getIXATime() });
		rem.record = rookie;
		mokoStorage.flush();
	}
});

//******************************************************************************
/** 設定：グループ設定 */
//------------------------------------------------------------------------------
Moko.GroupIcon = FeatureInit({////{{{
	name: 'GroupIcon',
	group: 'grp',
	configSettings: {
		groupConfigs: {
			caption: 'グループ設定', type: 'markerIcon',
			default_value: defaultGroupConfigs,
		},
	},
	condition: function () { return LPath.ingame },
	//------------------------------------------------------------------------------
	run: function () {
	}
});////}}}

//******************************************************************************
/** 設定：その他 */
//------------------------------------------------------------------------------
Moko.OtherConfig = FeatureInit({////{{{
	name: 'OtherConfig',
	group: 'other',
	configSettings: {
		season_list: {
			caption: '章の選択', type: 'selectBox',
			optionMap: { 2: '二章', 3: '三章' }, default_value: 2,
		},
		clear_favorite_map_list: {
			caption: '記憶した地図を削除', type: 'functionableButton',
			function: clearAllMapCoordinates
		},
		clear_all_squad_configs: {
			caption: '設定したグループを破棄', type: 'functionableButton',
			function: function (){
				if ( confirm('武将のグループ設定をすべて削除します。\n本当に削除してよいですか') ) {
					mokoStorage.setItem('Squads', {} );
					mokoStorage.flush();
				}
			}
		},
		clear_all_favorite_facility: {
			caption: 'お気に入り施設を破棄', type: 'functionableButton',
			function: function (){
				if ( confirm('お気に入り施設をすべて削除します。\n本当に削除してよいですか') ) {
					mokoStorage.setItem('FavoriteFacilities', {} );
					mokoStorage.flush();
				}
			}
		},
		clear_moko_config: {
			caption: 'Moko設定を初期化', type: 'functionableButton',
			function: function (){
				if ( confirm('Moko設定を削除します。\n本当に削除してよいですか') ) {
					mokoStorage.clearItem('Config');
				}
			}
		},
	},
	run: function () {}
});////}}}

//******************************************************************************
/** 開発用：テストツールバー表示（通常OFF） */
//------------------------------------------------------------------------------
Moko.DEV_Toolbar = FeatureInit({////{{{
	//enable: DEV_MODE,
	enable: false,
	name: 'DEV_Toolbar',
	//config: '_dev_show_dev_toolbar',
	group: 'other',
	caption: 'テスト用のツールバー表示',
	style: ''+<><![CDATA[
		#ixamoko-dev-toolbar{
			position:fixed;
			bottom:0;
			right:0;
			height:22px;
			width:60%;
			padding:2px 2px 0 2px;
			background:#eeeecc;
			border-top:soid 1px #aaaa88;
			z-index:10000
		}
		#ixamoko-dev-toolbar a{
			color: black;
			margin: 0 4px;
		}
	]]></>,
	condition: function () { return LPath.ALWAYS },
	//------------------------------------------------------------------------------
	run: function () {
		var toolbar = $('<div id="ixamoko-dev-toolbar">');
		toolbar.appendTo('body');
		$('<a href="#">localStorage</a>')
			.click( this.showLocalStorage )
			.appendTo(toolbar);
		$('<a href="#">MokoCfg</a>')
			.click( this.showConfig )
			.appendTo(toolbar);
		$('<a href="#">_CACHE</a>')
			.click( this.showMokoStorageCACHE )
			.appendTo(toolbar);
		$('<a href="#">ストレージ消す</a>')
			.click( this.clearStorage )
			.appendTo(toolbar);
		$('<a href="#">バックアップ</a>')
			.click( function(){ mokoStorage.backup() } )
			.appendTo(toolbar);
		$('<a href="#">リストア</a>')
			.click( function(){ mokoStorage.restore() } )
			.appendTo(toolbar);
		$('<a href="#">EVAL</a>')
			.click( EVAL_WINDOW )
			.appendTo(toolbar);
	},
	
	clearStorage: function (){
		if(localStorage.ixmk_state){
			localStorage.ixmk_tmp = localStorage.ixmk_state;
			localStorage.removeItem('ixmk_state');
			GM_log( 'localStorage.ixmk_state を消しました' );
		}
		return false;
	},
	
	showMokoStorageCACHE : function (){
		GM_log( mokoStorage._CACHE );
		return false;
	},
	showOldConfig : function (){
		GM_log( MokoCfg );
		return false;
	},
	showConfig : function (){
		GM_log( Moko.Config );
		return false;
	},
	showLocalStorage : function (){
		GM_log( localStorage );
		return false;
	},
});////}}}

//******************************************************************************
/**                               機能ここまで                                */
//******************************************************************************

//******************************************************************************
// UI
//------------------------------------------------------------------------------

/** サイドボックス初期化 */
Moko.InitSideBox = function (){
	var sideBoxHTML = ''+<><![CDATA[
		<DIV class="sideBox">
		<DIV class="sideBoxHead">
		<H3 style="padding:5px;">${toolName}</H3></DIV><DIV class="sideBoxInner" id="mokotool">
		</DIV></DIV>
	]]></>;
	$.tmpl(sideBoxHTML, {toolName: TOOL_NAME})
		.find('#mokotool')
		.append('<ul id="toollist"></ul><div id="allMapThicbox" style="display:none;"><span id="all_map"></span></div>')
		.end()
		.prependTo('#sideboxTop');
}

/** GM_xmlhttpRequest の $.get 風ラッパー */
function Moko_get(url, data){
	return Moko_ajax.apply(null, ['GET'].concat(Array.slice(arguments)) );
}

function Moko_post(url, data){
	return Moko_ajax.apply(null, ['POST'].concat(Array.slice(arguments)) );
}

function Moko_ajax(method, url, data){
	GM_log(url);
	var dfd = $.Deferred();
	var setting = {
		method: method || 'GET',
		url: url,
		headers: { "If-Modified-Since": "Thu, 01 Jun 1970 00:00:00 GMT", },
		onload: function(res){
			dfd.resolve(res.responseText, res.statusText, res);
		},
		onerror: function(res){
			dfd.reject(res, res.statusText);
		},
	};
	if( data ){ setting.data = data; }
	var gmXHR = GM_xmlhttpRequest(setting)
	var promise = dfd.promise();
	promise.abort = function(){ return gmXHR.abort() };
	return promise;
}

/** マスクとダイアログ表示 */
// 現状、設定ダイアログのみで使用
function Moko_showMask ( $dialog ) {////{{{
	var $mask = $('<DIV id="ixamoko_mask" class="ixamoko_mask"></DIV>').prependTo('body');
	$mask.css({'width':'100%','height':'100%', position: 'fixed'}).fadeTo(500 ,0.5).show();
	var winH = $('body').outerHeight();
	var winW = $('body').width();
	$mask.click(function(e) {
		$(this).remove();
		$dialog.hide();
	});
	return $mask;
}////}}}

/** マスクとダイアログ表示 */
function Moko_showMaskWithDialog ( /**セレクタ、jQuery、DOM要素、HTML*/_dialog, _option ) {////{{{

	var defaultOption = {
		hideWithRemove: false,
		clickHide: true,
		positionTop: null,
	}

	var $dialog = $(_dialog);
	var opt = $.extend({}, defaultOption, ( _option|| {} ));
	var $mask = $('<DIV id="ixamoko_mask" class="ixamoko_mask"></DIV>').prependTo('body');
	$mask.css({'width':'100%','height':'100%', position: 'fixed'}).fadeTo(500 ,0.5).show();
	var winH = $('body').outerHeight();
	var winW = $('body').width();
	$dialog.css({
		position: 'absolute', zIndex: 9001,
		top: 200,left:'50%',
		marginLeft: -0.5*$dialog.width(),
		marginTop: -0.5*$dialog.height(),
	})

	$dialog.hide();

	$('#ixamoko_layouter').append($dialog);
	$dialog.fadeIn(500);
	var marginTop = -0.5*$dialog.height()
	if( marginTop.abs() > $(window).height()/2 ) marginTop = -1 * ( $(window).height()/2 - 10 );

	$dialog.css({
		position: 'absolute', zIndex: 9001,
		top: $(window).height()/2, left:'50%',
		marginLeft: -0.5*$dialog.width(),
		marginTop: marginTop
	});
	if( opt.positionTop != null ){
		$dialog.css({
			top: opt.positionTop,
			marginTop: 0
		});
	}

	var mask = {
		'$mask': $mask,
		hideMask: function() {
			$mask.remove();
			$('#ixamoko_dialog').hide();

			if( opt.hideWithRemove ){
				$dialog.remove();
			}
			else {
				$dialog.hide();
			}
		}
	}

	// マスクをクリックでマスクとダイアログ非表示
	if( opt.clickHide ){
		$mask.click( mask.hideMask );
	}

	return mask;
	//return $dialog;
}////}}}

/** 単純なテーブルを表示するダイアログ */
Moko_simpleTable = function(obj, hd_key, hd_value){////{{{
	var tmpl = ''+<><![CDATA[
		<table class="tablesorter no_mb">
		{{if hd_key}}<tr><th>${hd_key}</th><th>${hd_value}</th></tr>{{/if}}
		{{each tbodies}}
		<tr><td>${$index}</td><td>${$value}</td></tr>
		{{/each}}
		</table>
	]]></>;
	var tbl = $.tmpl(tmpl,{ hd_key: hd_key, hd_value: hd_value, tbodies: obj });
	var div = $('<div>').css({background: 'white', padding: 10});
	div.append(tbl);
	Moko_showMaskWithDialog(div, {hideWithRemove: true});
}////}}}

/** ローディング・ダイアログ */
function nowLoading( _initCount ) {

	var id = '#moko-progress-panel';

	// ローディングダイアログ追加
	if( !$(id).length ){
		var loadingDialog = $.tmpl(''+<><![CDATA[
			<div id="moko-progress-panel" class="window">
				<h4 id="moko-progress-header">
					<span id="moko-progress-title">しばらくお待ちください</span>
					<span id="moko-progress-count"></span></h4>
				<div id="moko-progress-bar-area"><img src="${progressBarSrc}"></div>
				<div id="moko-progress-message"></div>
			</div>
		]]></>,{ progressBarSrc: IMAGES.rel_interstitial_loading });
		$('BODY').prepend(loadingDialog);
	}

	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	$('#loading_mask').css({'width':maskWidth,'height':maskHeight}).fadeTo(0 ,0.8).show();
	var winH = $(window).height();
	var winW = $(window).width();

	if( _initCount > 0 ){
		$(id).data('progressCount', 0 );
		$(id).find('#moko-progress-count').append( '（', $('<span>0<span>'), '/'+ _initCount +'）') ;
	}

	$(id).css('top',  winH/2-$(id).height()/2).css('left', winW/2-$(id).width()/2).fadeIn(500);
	return false;
}

nowLoading.dialogID = 'moko-progress-panel';
nowLoading.maskID = 'loading_mask';

nowLoading.removeDialog = function(){
	$progressPanel = $('#'+nowLoading.dialogID);
	$progressPanel.remove();
	$('#'+nowLoading.maskID).hide();
}

function countUpProgress( message ){
	var $progressDiag = $('#moko-progress-panel');
	var cnt = $progressDiag.data('progressCount');
	$progressDiag.data('progressCount',cnt+1);
	$progressDiag.find('#moko-progress-count > span').text( cnt );

	if( message !== undefined ){
		$progressDiag.find('#moko-progress-message').empty().append(message);
	}
}

//******************************************************************************
/** ゲーム情報取得 */
//------------------------------------------------------------------------------

/** 内部的な現在の拠点を表示中の拠点に合わせる */
function IXA_gobackCurrentVillage (){////{{{
	return IXA_getNationInfo(true)
	.pipe(function(nationInfo){
		var current = Object.values(nationInfo).filter(function(v){ return v.current });
		if( current.length ){
			return IXA_villageChange( current[0].villageID, null, true );
		}
		else {
			console.warn('現在地不明。拠点を戻す処理に失敗。');
			var dfd = $.Deferred();
			dfd.resoleve();
			return dfd.promise();
		}
	})
}////}}}

/** 武将カードのHTML（簡易編成画面のものから） */
////{{{
// 武将のカード
//<div style="display:none;" id="cardWindow_{squadID}">
//  <div class="m_no mt10">
//    <div class="cardfront">
//      <div class="ig_card_cardStatusFront" id="id_deck_card_front">
//        <img class="ig_card_back" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/background/3013_1d2Pfzel.png">
//        <img class="ig_card_frame" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/flame/lv3.png">
//        <img class="ig_card_chara" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/chara/3013_1d2Pfzel.png">
//        <img class="ig_card_parameta" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/parameta_base.png">
//        <div class="parameta_area">
//          <span class="rarerity_{rarerityNum}"></span>
//          <span class="ig_card_cost">2.5</span>
//          <span class="level_star"><img width="0%" height="10" class="bg_star" src="http://cache.sengokuixa.jp/world/20110913-05/img/common/blank.gif"></span>   <span class="ig_card_level">10</span>
//          <span title="きっかわもとはる" class="ig_card_name">吉<br>川<br>元<br>春</span>
//          <span class="yari lv_b"></span>
//          <span class="kiba lv_a"></span>
//          <span class="yumi lv_b"></span>
//          <span class="heiki lv_b"></span>
//          <span class="ig_card_status_hp">100/100</span>
//          <span class="ig_card_status_hp_bar"><img width="0%" height="6" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/icon/parameta1.png"></span>  <span class="ig_card_status_att">1400</span>  <span class="ig_card_status_def">690</span>
//          <span class="ig_card_status_int">350.0</span>
//          <span class="ig_card_cardno">3013</span>
//          <span id="card_commandsol_{squadID}" class="commandsol_kiba2"></span>
//          <span class="commandsol_no"><span id="card_commandsol_cnt_{squadID}">1983</span>/2290</span>
//        </div>
//      </div>
//    </div>  
//    <div class="cardback">
//      <div class="ig_card_cardStatusBack visible" id="id_deck_card_back">
//        <img class="ig_card_back" alt="" src="http://cache.sengokuixa.jp/world/20110913-05/img/card/background/back.jpg">
//        <div class="parameta_area_back">
//          <span class="jobtype_1"></span>
//          <span class="ig_card_hiragana">きっかわもとはる</span>
//          <span class="ig_card_exp">3832</span>
//          <span class="ig_card_nextexp">314</span>
//          <div class="skill1">
//            <span class="ig_skill_name">騎馬隊剛撃LV3</span>
//            <span class="ig_skill_desc">確率：+26%　/　対象　<font color="#69821b">馬</font><br>馬攻：11%上昇</span>
//          </div>
//          <div class="skill2">
//            <span class="ig_skill_name">騎馬隊奇襲LV2</span>
//            <span class="ig_skill_desc">確率：+20.5%　/　対象　<font color="#69821b">馬</font><br>馬攻：5.5%上昇</span>
//          </div>
//          <div class="skill3">
//            <span class="ig_skill_name">騎馬隊挟撃LV2</span>
//            <span class="ig_skill_desc">確率：+15.5%　/　対象　<font color="#69821b">馬</font><br>馬攻：9%上昇</span>
//          </div>
//          <span class="ig_illustrator">日暮央</span>
//        </div>
//      </div>
//    </div>
//  </div>
//</div>
	// .find('.level_star img[width]').attr('width').fetchNum() / 5
	// (.ig_card_level').text() //レベル
// .find('.ig_card_name').attr('title') // ひらがな
// .find('.ig_card_name').text().trim() // 名前
// .find('.yari').attr('class').match(/lv_(\w+)/)[1] // 槍適正
// .find('.ig_card_cost').text() // コスト
//          <span id="card_commandsol_{squadID}" class="commandsol_kiba2"></span>
// .find('[id^="card_commandsol_"][class^="commandsol_"]').attr('class').replace(/^commandsol_/,'') // 兵種
// .find('.commandsol_no span:eq(0)').text() // 現在の指揮数
// .find('.commandsol_no').text().replace(/^[^\/]*\//,'') // 最大指揮数
////}}}

/** カードのHTMLから各種情報を取得 */
function IXA_fetchCardInfo( card ){////{{{
	var $card = $(card);
	var info ={
		squadID      : $card.attr('id').replace(/^cardWindow_/,'')                 , // 武将ID
		squadName    : $card.find('.ig_card_name').text().trim()                   , // 名前
		kana         : $card.find('.ig_card_name').attr('title')                   , // ひらがな
		cardID       : $card.find('.ig_card_cardno').text()                        , // カードNo
		soldierType  : $card.find('[id^="card_commandsol_"][class^="commandsol_"]').attr('class').replace(/^commandsol_/,''), // 兵種
		rarerity     : $card.find('[class^="rarerity_"]').attr('class').replace(/^rarerity_/,'').fetchNum(),
		rank         : ( $card.find('.level_star img[width]').attr('width').fetchNum() / 5 ).round(),// ランク
		level        : $card.find('.ig_card_level').text().toInt()                 , //レベル
		hp           : $card.find('.ig_card_status_hp').text().fetchNum()          , // HP
		cmdRankYari  : $card.find('.yari').attr('class').match(/lv_(\w+)/)[1]      , // 槍適正
		cmdRankYumi  : $card.find('.yumi').attr('class').match(/lv_(\w+)/)[1]      , // 弓適正
		cmdRankKiba  : $card.find('.kiba').attr('class').match(/lv_(\w+)/)[1]      , // 騎馬適正
		cmdRankHeiki : $card.find('.heiki').attr('class').match(/lv_(\w+)/)[1]     , // 兵器適正
		// yari, yumi, kiba, heiki は後で換算
		cost         : $card.find('.ig_card_cost, .ig_card_cost_over').text().fetchNum()               , // コスト
		soldierNum   : $card.find('.commandsol_no span:eq(0), .commandsol_no_over span:eq(0)').text().fetchNum()   , // 現在の指揮数
		commandPow   : $card.find('.commandsol_no, .commandsol_no_over').text().replace(/^[^\/]*\// ,'').fetchNum(), // 最大指揮数
		attackPow    : $card.find('.ig_card_status_att').toNum(),
		defensePow   : $card.find('.ig_card_status_def').toNum(),
		tacticsPow   : $card.find('.ig_card_status_int').toNum(),
		// skills: [{ skill: "<スキル名>", level: <スキルLV>, prob: "<発動率>", desc: "<対象／効果>" }, /* ... */ ],
		skills       : $card.find('.ig_skill_name').map(function(){
			var skill = $(this).text().trim().split('LV');
			var desc = $(this).next().text().trim().split('　/　');
			return { skill: skill[0], level: skill[1], prob: desc[0], desc: desc[1] }
		}).toArray(),
		squadAttack  : 0,
		squadDefense : 0,
		squadDestruct: 0,
		squadMovement: 0,

	};

	info.yari  = COMMAND_RANK_TO_RATE[info.cmdRankYari ] ;
	info.yumi  = COMMAND_RANK_TO_RATE[info.cmdRankYumi ] ;
	info.kiba  = COMMAND_RANK_TO_RATE[info.cmdRankKiba ] ;
	info.heiki = COMMAND_RANK_TO_RATE[info.cmdRankHeiki] ;

	info.vlevel = info.rank * 100 + info.level;

	if(info.soldierType){
		info.soldierType = SOLDIER_TYPE_KEY_TO_SOLDIER_NAME[info.soldierType];
		info.soldierTypeno = SOLDIER_DATA[info.soldierType].typeno;
		var solData = SOLDIER_DATA[info.soldierType];
		var commandRate = ( info[ solData.cmd1 ] + info[ solData.cmd2 ] ) / 2;
		info.squadAttack   = ( solData.off * info.soldierNum + info.attackPow ) * commandRate ;
		info.squadDefense  = ( solData.def * info.soldierNum + info.defensePow ) * commandRate ;
		info.squadDestruct = ( solData.des * info.soldierNum ) ;
		info.squadMovement = solData.mov ;
	}
	return info;
};////}}}

/** 武将カード情報クラス
 * @class CaptainData
 * @param {String|DOMElement|jQuery} captainID 武将IDまたは該当カード要素
*/
//	//全部隊情報と全編成（100件）から情報を得るサンプル
//	var allCaptains = [];
//	$.get('/facility/unit_status.php?dmo=all')
//	.pipe(function(html){
//		var caps = $(html).find('[id^="cardWindow_"]').map(function(){
//			return new CaptainData(this);
//		}).toArray();
//		allCaptains.append(caps);
//		return $.get('/facility/set_unit_list.php?show_num=100')
//	})
//	.done(function(html){
//		var caps = $(html).find('[id^="cardWindow_"]').map(function(){
//			return new CaptainData(this);
//		}).toArray();
//		allCaptains.append(caps);
//		GM_log(allCaptains[34].squadName);
//	})
//
//	function IXA_getCaptainData (doc) {
//		var caps = $(doc||document).find('[id^="cardWindow_"]')
//		.map(function(){
//			return new CaptainData(this);
//		}).toArray();
//		return caps;
//	}
function CaptainData( captainID ){

	// $card 初期化
	if( typeOf(captainID) == 'string' || typeOf(captainID) == 'number' ){
		let cardID = 'cardWindow_'+captainID;
		this.$card = $('#'+cardID);
	}
	else if ( typeOf(captainID) == 'element' || captainID.jquery ) {
		this.$card = $(captainID);
	}

	this.dt = {
		squadID      : null,
		squadName    : null,
		kana         : null,
		cardID       : null,
		soldierType  : null,
		rarerity     : null,
		rank         : null,
		level        : null,
		hp           : null,
		cmdRankYari  : null,
		cmdRankYumi  : null,
		cmdRankKiba  : null,
		cmdRankHeiki : null,
		cost         : null,
		soldierNum   : null,
		commandPow   : null,
		attackPow    : null,
		defensePow   : null,
		tacticsPow   : null,
		skills       : null,
		yari  : null,
		yumi  : null,
		kiba  : null,
		heiki : null,
	};

	var squadConfig = mokoStorage.getItem('Squads');
	var squadInfo = squadConfig[this.squadID] = squadConfig[this.squadID] || {} ;
	this.squadInfo = squadInfo;

}

CaptainData.prototype = {
	get groupID      (){ return this.squadInfo.groupID },
	set groupID      (groupID){ this.squadInfo.groupID = groupID },
	get defaultSoldierType (){ return this.squadInfo.defaultSoldierType },
	set defaultSoldierType (type){ this.squadInfo.defaultSoldierType = type },
	get squadID      (){ with(this){ return dt.squadID      !== null? dt.squadID      : dt.squadID      = $card.attr('id').replace(/^cardWindow_/,'')                 } }, // 武将ID
	get squadName    (){ with(this){ return dt.squadName    !== null? dt.squadName    : dt.squadName    = $card.find('.ig_card_name').text().trim()                   } }, // 名前
	get kana         (){ with(this){ return dt.kana         !== null? dt.kana         : dt.kana         = $card.find('.ig_card_name').attr('title')                   } }, // ひらがな
	get cardID       (){ with(this){ return dt.cardID       !== null? dt.cardID       : dt.cardID       = $card.find('.ig_card_cardno').text()                        } }, // カードNo
	get rarerity     (){ with(this){ return dt.rarerity     !== null? dt.rarerity     : dt.rarerity     = $card.find('[class^="rarerity_"]').attr('class').replace(/^rarerity_/,'').fetchNum() } },
	get rank         (){ with(this){ return dt.rank         !== null? dt.rank         : dt.rank         = ( $card.find('.level_star img[width]').attr('width').fetchNum() / 5 ).round() } },// ランク
	get level        (){ with(this){ return dt.level        !== null? dt.level        : dt.level        = $card.find('.ig_card_level').text().toInt()                 } }, //レベル
	get hp           (){ with(this){ return dt.hp           !== null? dt.hp           : dt.hp           = $card.find('.ig_card_status_hp').text().fetchNum()          } }, // HP
	get cmdRankYari  (){ with(this){ return dt.cmdRankYari  !== null? dt.cmdRankYari  : dt.cmdRankYari  = $card.find('.yari').attr('class').match(/lv_(\w+)/)[1]      } }, // 槍適正
	get cmdRankYumi  (){ with(this){ return dt.cmdRankYumi  !== null? dt.cmdRankYumi  : dt.cmdRankYumi  = $card.find('.yumi').attr('class').match(/lv_(\w+)/)[1]      } }, // 弓適正
	get cmdRankKiba  (){ with(this){ return dt.cmdRankKiba  !== null? dt.cmdRankKiba  : dt.cmdRankKiba  = $card.find('.kiba').attr('class').match(/lv_(\w+)/)[1]      } }, // 騎馬適正
	get cmdRankHeiki (){ with(this){ return dt.cmdRankHeiki !== null? dt.cmdRankHeiki : dt.cmdRankHeiki = $card.find('.heiki').attr('class').match(/lv_(\w+)/)[1]     } }, // 兵器適正
	get cost         (){ with(this){ return dt.cost         !== null? dt.cost         : dt.cost         = $card.find('.ig_card_cost, .ig_card_cost_over').text().fetchNum() } }, // コスト
	get commandPow   (){ with(this){ return dt.commandPow   !== null? dt.commandPow   : dt.commandPow   = $card.find('.commandsol_no, .commandsol_no_over').text().replace(/^[^\/]*\// ,'').fetchNum() } }, // 最大指揮数
	get attackPow    (){ with(this){ return dt.attackPow    !== null? dt.attackPow    : dt.attackPow    = $card.find('.ig_card_status_att').toNum() } },
	get defensePow   (){ with(this){ return dt.defensePow   !== null? dt.defensePow   : dt.defensePow   = $card.find('.ig_card_status_def').toNum() } },
	get tacticsPow   (){ with(this){ return dt.tacticsPow   !== null? dt.tacticsPow   : dt.tacticsPow   = $card.find('.ig_card_status_int').toNum() } },
	get skills       (){
		with(this){
			return dt.skills !== null
			? dt.skills
			: dt.skills = $card.find('.ig_skill_name').map(function(){
				var skill = $(this).text().trim().split('LV');
				var desc = $(this).next().text().trim().split('　/　');
				return { skill: skill[0], level: skill[1], prob: desc[0], desc: desc[1] }
			}).toArray()
		}
	},
	get yari  (){ with(this){ return dt.yari  !== null? dt.yari  : dt.yari  = COMMAND_RANK_TO_RATE[this.cmdRankYari ] } },
	get yumi  (){ with(this){ return dt.yumi  !== null? dt.yumi  : dt.yumi  = COMMAND_RANK_TO_RATE[this.cmdRankYumi ] } },
	get kiba  (){ with(this){ return dt.kiba  !== null? dt.kiba  : dt.kiba  = COMMAND_RANK_TO_RATE[this.cmdRankKiba ] } },
	get heiki (){ with(this){ return dt.heiki !== null? dt.heiki : dt.heiki = COMMAND_RANK_TO_RATE[this.cmdRankHeiki] } },
	// 動的データ
	get soldierType  (){ with(this){ return dt.soldierType  !== null? dt.soldierType  : dt.soldierType  = SOLDIER_TYPE_KEY_TO_SOLDIER_NAME[ $card.find('[id^="card_commandsol_"][class^="commandsol_"]').attr('class').replace(/^commandsol_/,'') ] || "" } }, // 兵種
	set soldierType  ( soldierType ){ this.dt.soldierType = soldierType || ""; this.dt.soldierTypeno = SOLDIER_DATA[soldierType].typeno || "" },
	set soldierTypeno( soldierTypeno ){ this.dt.soldierType = (SOLDIER_DATA_BY_TYPENO[soldierTypeno]||{}).name || "" },
	get soldierNum   (){ with(this){ return dt.soldierNum   !== null? dt.soldierNum   : dt.soldierNum   = $card.find('.commandsol_no span:eq(0), .commandsol_no_over span:eq(0)').text().fetchNum() } }, // 現在の指揮数
	set soldierNum   ( soldierNum ){ this.dt.soldierNum = soldierNum || 0 },
	// 動的データ
	get soldierData (){ return SOLDIER_DATA[this.soldierType] || {} },
	get soldierTypeno (){ return this.soldierData.typeno || "" },
	get commandRate   (){ return !this.soldierType? 0: ( this[ this.soldierData.cmd1 ] || 0 + this[ this.soldierData.cmd2 ] || 0 ) / 2 },
	get squadAttack   (){ return !this.soldierType? 0: ( this.soldierData.off * this.soldierNum + this.attackPow ) * this.commandRate },
	get squadDefense  (){ return !this.soldierType? 0: ( this.soldierData.def * this.soldierNum + this.defensePow ) * this.commandRate },
	get squadDestruct (){ return !this.soldierType? 0: ( this.soldierData.des * this.soldierNum ) },
	get squadMovement (){ return !this.soldierType? 0: this.soldierData.mov },
};

/** プロンプトを出して拠点の名称変更。対象は座標パラメーター文字列か名称で検索する。 */
function IXA_renameFootholdPrompt ( searchMode, ownHoldPath ){////{{{

	if( !/^(name|coordPath)$/.test(searchMode) )
		throw(new Error('検索モードは"name"か"coordPath"を指定'));

	var matchFuncDic = {
		name: function(searchText){ return ($(this).find('input[type="text"]').val()||"").trim() == searchText },
		coordPath: function(searchText){return $(this).find('a[href]') && $(this).find('a[href]').attr('href') == '/'+searchText }
	};
	matchFunc = matchFuncDic[searchMode];

	var req_data={};
	$.post('/user/change/change.php')
	.pipe(function (html){
		var new_name = null;
		var keys = null;
		req_data['comment']=$(html).find('.profile_edit').val();

		$(html).find('.common_box3bottom td').each(function(){
			if( matchFunc.call(this, ownHoldPath) ){

				var $row = $(this).closest('tr');

				// プロンプトを表示して新しい名称を取得
				var currName = $row.find('input:eq(0)').val();
				new_name = prompt(currName, "");

				keys = $row.find('input:eq(0)').attr('name');
				return false;
			}
		});

		if(!new_name){
			//GM_log('no name');
			return false;
		}
		$(html).find('.common_box3bottom').find('input').each(function(){
			req_data[$(this).attr('name')]=$(this).val();
		});
		req_data[keys]=new_name;
		req_data['btn_preview']='確認';

		return $.post('/user/change/change.php#ptop', req_data);

	})
	.pipe(function (html){

		if(!html){ return false }

		delete req_data.btn_preview;
		req_data['btn_send']='更新';
		req_data['ssid']=$(html).find('*[name="ssid"]').val();

		return $.post('/user/change/change.php#ptop', req_data);
	})
	.done(function(html){
		if(html)
			location.reload();
	})
	;
}////}}}

/** 現在の部隊の状況を取得 */
function IXA_clearUnitStatusCache(){
	mokoStorage.getItem('UnitStatus').cache = null;
	mokoStorage.flush;
}
function IXA_getUnitStatus( useCache ){////{{{

	var dfd = $.Deferred();
	var nationInfo;

	var unitStatusStore = mokoStorage.getItem('UnitStatus');

	//GM_log('cache flag', useCache,
	//	   'has cache?', !!unitStatusStore.cache,
	//		'expire', unitStatusStore.expire,
	//		'ixa time', IXA_getIXATime().formatFullDate()
	//	  );

	if( useCache
		&& unitStatusStore.cache
		&& unitStatusStore.expire > IXA_getIXATime().formatFullDate()
	  ){
		//GM_log('IXA_getUnitStatus: USE CACHE');
		let stats = unitStatusStore.cache;
		var villageName = IXA_getVillageName();
		dfd.resolve(stats);
	}
	else {
		//GM_log('IXA_getUnitStatus: NOT USE CACHE');
		IXA_getNationInfo(true)
		.pipe(function(_nationInfo){
			nationInfo = _nationInfo;
			return $.get('/facility/unit_status.php?dmo=all')
		})
		.done(function(_html){
			var $html = $(_html);
			var stats =
			$html.find('.ig_fight_statusarea').map(function(){
				var $unit = $(this);
				var $statsTbl, completeTime, confluence, isDugeon,
					affiliation, destination,
					$fromLand, fromLandPath, fromLandName,
					$toLand, toLandPath, toLandName,
					unitName, actMode
				;
				unitName = $unit.find('h3:eq(0)').textNodes().eq(0).text().trim();
				$statsTbl    = $unit.find('.table_fightlist');
				completeTime = ($statsTbl.find('td:eq(0)').text().match(/\d+-\d+-\d+ \d+:\d+:\d+/)||[0])[0];
				//if(completeTime) completeTime = completeTime.toDate();
				//if(completeTime) completeTime = completeTime.toSec();
				confluence   = $statsTbl.find('th:has(img[alt="合流"])+td').text().trim();
				var confluenceNum = confluence.replace(/^-$/,'0').toInt();
				isDugeon     = !!$statsTbl.find('th:has(img[alt="探索"])').length;

				var $tr1 = $statsTbl.find('tr:eq(1)');
				// 行動状況取得
				let actModeSrc = $tr1.find('td[rowspan="2"] img').attr('src');
				if( actModeSrc ){
					let actModeFile = (/((?:mode|icon)_\w+).png$/.exec(actModeSrc)||[])[1];

					switch( actModeFile){
						case "mode_wait"   : actMode = '待機'; break;
						case "mode_return" : actMode = '帰還'; break;
						case "mode_meeting": actMode = '合流'; break;
						case "icon_backup" : actMode = '加勢'; break;
						case "mode_develop": actMode = '開拓'; break;
						case "mode_move"   : actMode = '国移動'; break;
						case "mode_attack" :
							actMode = '攻撃';
							if(confluence == "-") actMode = "陣張";
						break;
						case "icon_dungeon": actMode = '探索'; break;
						default: actMode = ''; break;
					}
				}
				else {
					if(
						$tr1.find('td[rowspan="2"] div.ig_fight_status_goback2:eq(0):contains("帰還する")').length
					){
						actMode = '加勢待機';
					}
				}

				affiliation  = $statsTbl.find('th:has(img[alt="所属"])+td').text().trim();
				destination  = $statsTbl.find('th:has(img[alt="目的地"])+td').text().trim();
				$fromLand    = $statsTbl.find('tr:eq(2) td.td_bggray a[href*="land.php"]:eq(0)');
				if($fromLand.length){
					fromLandPath = $fromLand.attr('href').replace(/^\.\./,'');
					fromLandName = $fromLand.text().trim();
				}
				$toLand      = $statsTbl.find('tr:eq(2) td.td_bggray a[href*="land.php"]:eq(1)');
				if($toLand.length){
					toLandPath   = $toLand.attr('href').replace(/^\.\./,'');
					toLandName   = $toLand.text().trim();
				}
				var captains =
				$unit.find('.ig_fightsituation_standby .ig_fight_waitingunit .waitingleader a.thickbox')
				.map(function(){
					let captainName = $(this).text().trim();
					let captainID = (/cardWindow_(\d+)/.exec( $(this).attr('href') ))[1];
					let $card = $('#cardWindow_'+captainID, $html);
					return {name: captainName, id: captainID, $card: $card };
				}).toArray()
				;

				var fromVillageID;
				if(fromLandName){
					var village = $O.values(nationInfo)
					.filter(function(v){return v.name == fromLandName })
					if( village.length ){
						fromVillageID = village[0].villageID;
					}
				}

				return {
					unitName	 : unitName,
					actMode		 : actMode,
					completeTime : completeTime,
					confluenceNum: confluenceNum,
					isDugeon	 : isDugeon,
					isAttack	 : actMode == '攻撃',
					isStandby	 : actMode == '待機',
					isConfluence : actMode == '合流',
					isBackup	 : actMode == '加勢',
					isPioneer	 : actMode == '開拓',
					isCrossBorder: actMode == '国移動',
					isInBackup	 : actMode == '加勢待機',
					isPitchCamp	 : actMode == '陣張',
					affiliation	 : affiliation,
					destination	 : destination,
					villageID	 : fromVillageID,
					fromLandPath : fromLandPath,
					fromLandName : fromLandName,
					toLandPath	 : toLandPath,
					toLandName	 : toLandName,
					captains	 : captains,
				};

			}).toArray();

			var ixaTime = IXA_getIXATime().formatFullDate();
			var completeTimes = stats
			.map(function(v){ return v.completeTime })
			.filter(function(dt){ return dt && dt > ixaTime }).sort();

			var expire = 'INFINITY';
			if( completeTimes.length ){
				expire = completeTimes[0];
			}

			//GM_log('EXPIRE: ',expire);

			unitStatusStore.cache = stats;
			unitStatusStore.expire = expire;
			mokoStorage.flush();

			//GM_log('stats?',stats);
			dfd.resolve(stats);
		});
	}
	return dfd.promise();
}////}}}

/** 地図を AJAX で移動 */
function IXA_moveMap (url, useHistory, _setting){////{{{
	var setting = (_setting||{});
	here = arguments;

	if( here.callee.busy ){
		console.warn( 'IXA_moveMap() : avoid map meving cause busy now' );
		return;
	}

	here.callee.busy = true;
	// AJAX で移動
	$.ajax($.extend({}, AJAX_ASYNC_NOCACHE_GET, {
		url: url,
		success: function (html){
			// 読み込んだHTMLで入れ替える
			var $new_map = $(html).find('#ig_mapbox_container');
			$('#ig_mapbox_container').replaceWith($new_map);

			delete html;
			delete $new_map;

			// イベント起動
			//***************************************************//
			$('body').trigger('MokoEvent_MapMoved');

			if( useHistory ){
				history.pushState('','',url);
			}
			if(setting.success) setting.success.apply(this, arguments)
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			//console.log(textStatus);
			if(setting.error) setting.error.apply(this, arguments)
		},
		complete: function(){
			here.callee.busy = false;
		}
	}));
}////}}}

/** moko 開始からのミリ秒を取得 */
function Moko_pastTime (){////{{{
	return (new Date) - arguments.callee.beginingTime;
}////}}}

/** moko 開始時間を記録 */
Moko_pastTime.begin = function(){////{{{
	this.beginingTime = new Date;
}////}}}

/** IXA 時間を Date として取得 */
function IXA_getIXATime (){////{{{
	return $('#server_time').text().trim().toDate();
}////}}}

/** 1秒ごとに、 MokoEvent_SecondHand イベントを起こす */
function Moko_ignitSecondHand () {////{{{
	$(document).trigger('MokoEvent_SecondHand')
}////}}}

/** IXA時間の秒の変わり目を狙って MokoEvent_SecondHand を開始する（精度0.01秒） */
function Moko_startSecondHand (){////{{{
	var ixaTime = $('#server_time').text();
	var timer = function(){
		if( ixaTime != $('#server_time').text() ){
			clearInterval(timer);
			Moko_ignitSecondHand.periodical(1000);
		}
	}.periodical(10);
}////}}}

/** 兵士を割り当て */
function IXA_deploySoldier (captainID, unitTypeno, soldierNum, successHdl ) {////{{{
	var paramData = {
		card_id   : captainID,
		unit_type : unitTypeno,
		unit_count: soldierNum
	};

	$.ajax($.extend({}, AJAX_ASYNC_NOCACHE_POST, {
		url: '/facility/set_unit_list_if.php',
		data: paramData, dataType: 'json',
		success: function ( responseJSON ){
			if( successHdl )
				successHdl();
		},
	}));
}////}}}

/** 同じ設定で複数の兵士を割り当て */
function IXA_multiDeploySoldie (////{{{
	cardIDs, unitTypeno, soldierNum,
	successHdl, endHdl ) {

	var here = arguments;

	var captainID = cardIDs.shift();
	IXA_deploySoldier(
		captainID, unitTypeno, soldierNum,
		function(){
			if( successHdl ) successHdl();
			if( captainID = cardIDs.shift() ){
				here.callee.apply( null, here );
			}
			else {
				if( endHdl ) endHdl();
			}
			return;
		}
	)
}////}}}

/** 武将ID と 配置番号 をもとに、武将を探して配置する */
function IXA_assignSquad (squadID, assignNo, villageID, startPageNum){////{{{

	var selectVillageID = villageID;
	var unitAssignNo = IXA_getCurrentUnitAssignNo();

	var lastPageNum;
	var pageNum = startPageNum || 1;
	var breakLoop = false;
	var beAssigned = false ;

	while(!breakLoop){
		$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_GET, {
			url: '/card/deck.php',
			data: { p: pageNum, ano: unitAssignNo },
			success: function(_html){

				var $targetSquad = $(_html)
				.find('#ig_deck_smallcardarea_out') // 待機武将カードの親
				.find('.ig_deck_smallcardarea:has(a>img[alt="選択中の部隊へ"]):has(.thickbox[href$="cardWindow_'+squadID+'"])');

				var set_assign_id = $(_html).find('#set_assign_id').attr('value') || "";
				var set_squad_id = "";
				if($targetSquad.length) {
					var onclick = $targetSquad.find('a:has(>img[alt="選択中の部隊へ"])')
					.attr('onclick');
					var onclickOpts = onclick.match(/'[^']*'|"[^"]"/g).map(function(v){return v.replace(/^['"]|['"]$/g,'')});
					//set_assign_id = onclickOpts[0];
					set_squad_id  = onclickOpts[1] || "";
				}

				if(set_squad_id) {
					beAssigned = IXA_postAssignSquad(assignNo, set_assign_id, set_squad_id, squadID, selectVillageID, pageNum);
					breakLoop = true;
				}else{
					if( ++pageNum > IXA_getDeckPagerLastPage(_html)||0 ){ breakLoop = true }
				}
			},
			error: function(){ throw(new Error('/card/deck.php の読み込みに失敗')); }
		}));
	}

	return beAssigned;

}////}}}

function IXA_postAssignSquad(assignNo, assignID, setSquadID, squadID, selectVillageID, pageNo ){
	var data = {
		target_card      : "",
		select_assign_no : assignNo, // 配置先部隊No、 0 ～ 4
		mode             : 'assign_insert',
		btn_change_flg   : "",
		set_assign_id    : assignID, // 配置用のID、新規の時は ""
		set_squad_id     : setSquadID,  // 小隊ID、 squadID とは違う
		set_village_id   : selectVillageID, // 配置先拠点、追加の時は ""
		deck_mode        : 'nomal',
		p                : pageNo || 1
	};
	var beAssigned;
	$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST, {
		url: '/card/deck.php',
		data:data,
		success: function (html){
			beAssigned = !!$(html).find('#card_commandsol_'+squadID).length;
		},
		error: function(){ throw(new Error('武将配置のリクエストに失敗')); }
	}));
	return beAssigned;
}

/** 部隊編成：現在の部隊の構成小隊数を返す */
function IXA_getCurrentUnitSquadsNum ( _doc ) {////{{{
	return $(_doc||document)
	.find('#ig_deck_unitdetailbox')
	.find('.ig_deck_unitdata_leader, .ig_deck_unitdata_subleader')
	.map(function(){ return $(this).textNodes().eq(0) })
	.filter(function(){ return !/^-+$/.test( $(this).text().trim() ) })
	.length
}////}}}

/** 現在の部隊の配置番号（ゼロ始まりで、上からいくつめか）*/
function IXA_getCurrentUnitAssignNo ( _doc ){////{{{
	var $doc = $(_doc||document);
	var $unitSelectionTab = $doc.find('#ig_unitchoice');
	return $unitSelectionTab
	.find('>li')
	.index($unitSelectionTab.find('>li.now'))
}////}}}

function IXA_calcComplexDrillCapability ( soldierNames, rate ){

	if( !rate )
		rate = mokoStorage.getItem('AnytimeMarket').rate;
	if( !rate ) rate = 0.4 ;
	
	var totalWant = { wood: 0, cotton: 0, iron: 0, food: 0 };
	soldierNames.each(function(soldierName){
		var solData = SOLDIER_DATA[soldierName];
		RESOURCE_ORDER.each(function(rscKey){
			totalWant[rscKey] += solData[rscKey];
		});
	});

	var resource  = IXA_getCurrentResources();
	var rcsKeys = RESOURCE_ORDER;

	var options = [
		$O.values($O.subset(resource, rcsKeys)),
		$O.values( totalWant ),
		rate
	].flatten();
	return IXA_productionCapability.apply(null, options);
}
function IXA_calcDrillCapability ( soldierName, rate ){

	if( !rate )
		rate = mokoStorage.getItem('AnytimeMarket').rate;
	if( !rate ) rate = 0.4 ;
	
	var solData = SOLDIER_DATA[soldierName];
	var resource  = IXA_getCurrentResources();
	var rcsKeys = RESOURCE_ORDER;
	var options = [
		$O.values($O.subset(resource, rcsKeys)),
		$O.values($O.subset(solData, rcsKeys)),
		rate
	].flatten();
	return IXA_productionCapability.apply(null, options);
}

function IXA_getProductionPower(doc) {
	var $list = $(doc||document).find('.side_make');
	var pow = {};
	$list.children().each(function(idx){
		pow[RESOURCE_ORDER[idx]] = $(this).text().match(/\d+/g).map(function(v){return v.toInt()}).sum();
	});
	return pow;
}

/** 現在の残資源から訓練し得る兵士数の最大値を求める */
function IXA_productionCapability (////{{{
	/**木*/wood, /**綿*/cotton, /**鉄*/iron, /**糧*/food,
	/**要木*/cost_wood, /**要綿*/cost_cotton, /**要鉄*/cost_iron, /**要糧*/cost_food,
	/**相場*/rate) {
	var cmax = Math.min.apply(null, [
		1500000,
		( wood  /cost_wood  ),
		( cotton/cost_cotton),
		( iron  /cost_iron  ),
		( food  /cost_food  )
	]).toInt();

	var i;
	for(i=(cmax+1);i<15000;++i) {
		var shortage = 0;
		var excess = 0;
		if ((i*cost_wood)>wood) {
			shortage += i*cost_wood-wood;
		} else {
			excess += wood-i*cost_wood;
		}
		if ((i*cost_cotton)>cotton) {
			shortage += i*cost_cotton-cotton;
		} else {
			excess += cotton-i*cost_cotton;
		}
		if ((i*cost_iron)>iron) {
			shortage += i*cost_iron-iron;
		} else {
			excess += iron-i*cost_iron;
		}
		if ((i*cost_food)>food) {
			shortage += i*cost_food-food;
		} else {
			excess += food-i*cost_food;
		}
		if (excess*rate<shortage) break;
	}
	--i;
	var tmp1 = '[必要 ';
	var tmp1c = 0;
	var tmp1t = null;
	var tmp2 = '[余剰 ';
	if ((i*cost_wood)<wood) {
		var tmpx = (wood-i*cost_wood);
		tmp2 += ' <SPAN class="ixamoko_excess" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>';
	} else {
		var tmpx = Math.ceil((i*cost_wood-wood)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>'
		++tmp1c;
		tmp1t = 101;
	}
	if ((i*cost_cotton)<cotton) {
		var tmpx = (cotton-i*cost_cotton);
		tmp2 += ' <SPAN class="ixamoko_excess" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
	} else {
		var tmpx = Math.ceil((i*cost_cotton-cotton)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
		++tmp1c;
		tmp1t = 102;
	}
	if ((i*cost_iron)<iron) {
		var tmpx = (iron-i*cost_iron);
		tmp2 += ' <SPAN class="ixamoko_excess" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
	} else {
		var tmpx = Math.ceil((i*cost_iron-iron)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
		++tmp1c;
		tmp1t = 103;
	}
	if ((i*cost_food)<food) {
		var tmpx = (food-i*cost_food);
		tmp2 += ' <SPAN class="ixamoko_excess" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
	} else {
		var tmpx = Math.ceil((i*cost_food-food)/rate);
		tmp1 += ' <SPAN class="ixamoko_short" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
		++tmp1c;
		tmp1t = 104;
	}
	tmp1 += ']';
	tmp2 += ']';
	var num = i;
	var moko = {
		shortage: tmp1, // [不足～ のHTML
		excess  : tmp2, // [余剰～ のHTML
		shortc: tmp1c,
		shortt: tmp1t,
		maxsoldier: num,
		want: {
			wood  : cost_wood * num,
			cotton: cost_cotton * num,
			iron  : cost_iron * num,
			food  : cost_food * num
		}
	}
	return moko;
}////}}}

function IXA_extractFacilityInfo( doc ){
	var $doc = $(doc||document);
	var header = $doc.find('.ig_decksection_top:eq(0)').text();
	var facilityName = header.replace(/\sレベル.*/,'');
	var facilityLevel = header.replace(/^.*レベル/,'').fetchNum();

	return {
		facilityName: facilityName,
		facilityLevel: facilityLevel,
	}
}

function IXA_getCurrentFacilityInfo(async, callback){
	if(!async){
		var vName = IXA_getVillageName();
		var vID = IXA_getVillageID();
		var mat;
		if( !( mat = /x=(\d+)&y=(\d+)/.exec( location.search ) ) )
			return false;
		var x = mat[1]; y = mat[2];

		var facility = IXA_extractFacilityInfo();
		return $O.merge( facility, { villageID: vID, villageName: vName, x: x, y: y } );
	}

	else {
		IXA_getVillageID(null, true)
		.done(function( vID ){
			var facilityName = $('.ig_decksection_top:eq(0)').text().replace(/\sレベル.*/,'');
			var mat;
			if( !( mat = /x=(\d+)&y=(\d+)/.exec( location.search ) ) )
				return false;
			var x = mat[1]; y = mat[2];

			var facility = IXA_extractFacilityInfo();
			$O.merge( facility, { villageID: vID, villageName: vName, x: x, y: y } );
			(async||callback)(facility);
		});
	}
}

// 現在の拠点名取得
function IXA_getVillageName(){
	var villageName = $('#lordSiteArea').text().trim().replace(/^選択中の拠点:/,'')
	return villageName;
}

// 現在の拠点ID取得
function IXA_getVillageID(villageName, async){

	// villageName 省略時してコールバック渡した場合の前処理
	if( typeOf(villageName) == 'function' ){
		asyncCallback = villageName;
		villageName = null;
	}

	// villageName がなければ、現在ページから取得
	var villageName = villageName || IXA_getVillageName();

	if( async ){
		var dfd = $.Deferred();
		IXA_getNationInfo(true)
		.done(function(nationInfo){
			var vID = $O.values(nationInfo)
			.filter(function(v){ return v.current })[0]
			.villageID ;
			dfd.resolve(vID);
		});
		return dfd.promise();
	}

	var nationInfo = IXA_nationInfo(null, true);
	return $O.values(nationInfo)
	.filter(function(v){ return v.current })[0]
	.villageID ;
}

/** 施設URL作成 */
function IXA_makeFacilityURL (x, y, optionString){////{{{
	let url = sprintf(
		'/facility/facility.php?x=%(x)s&y=%(y)s',
		{x: x, y: y }
	);
	if( optionString ){
		url = [url, optionString].join('&');
	}
	return url;
}////}}}

/** 現在の資源リストを得る */
function IXA_getCurrentResources (){////{{{
	var rsc = {}, rscDiff = {};
	rsc.wood   = $('#wood').toNum()  ;
	rsc.cotton = $('#stone').toNum() ;
	rsc.iron   = $('#iron').toNum()  ;
	rsc.food   = $('#rice').toNum()  ;
	return rsc;
}////}}}

function IXA_getCurrentMaxResources (){////{{{
	var rsc_max = {}, rscDiff = {};
	rsc_max.wood   = $('#wood_max').toNum()  ;
	rsc_max.cotton = $('#stone_max').toNum() ;
	rsc_max.iron   = $('#iron_max').toNum()  ;
	rsc_max.food   = $('#rice_max').toNum()  ;
	return rsc_max;
}////}}}

/** 指定した拠点IDリストの指定したページを巡回し、指定した処理を行う
 * 戻り値は handler の返したもののリスト
 */
function IXA_patrolPages(////{{{
	villageIDs/*Array*/,
	page,
	handler/* fn(responsHTML, villageID )*/,
	useAsync
){
	var ret = [];

	if(!useAsync){
		villageIDs.each(function( villageID, idx ){
			var html = IXA_villageChange(villageID, page );
			ret.push( handler(html, villageID ) );
			if( progressHdl ) progressHdl(idx);
		});
		return ret;
	}

	var dfd = $.Deferred();

	(function(){ var here = arguments.callee;

		var villageID = villageIDs.shift();
		IXA_villageChange(villageID, page, true)
		.done(function(html){
			ret.push( handler(html, villageID ) );

			if(villageIDs.length){
				here();
			}
			else {
				dfd.resolve(ret);
			}
		});
	})()

	return dfd.promise();

}////}}}

/** 城主プロフィールから国の情報を得る
* handler を指定した場合、通常の処理を行わず、handler に html を投げる
*/

/** 国情報を収集 */
function IXA_nationInfo (asyncCallback, useCache ){////{{{
	
	//var html = arguments.callee.html;
	var html;

	if( useCache && mokoStorage.getItem('NationInfo').cache ){
		let info = mokoStorage.getItem('NationInfo').cache;
		var villageName = IXA_getVillageName();
		$O.values(info).each(function(v){
			v.current = false;
			if( v.name == villageName ){
				v.current = true;
			}
		});

		if( asyncCallback ){
			asyncCallback(info);
			return;
		}
		else {
			return info;
		}
	}

	//------------------------------------------------------------------------------
	// ASYNC の場合
	//------------------------------------------------------------------------------
	if(asyncCallback){
		$.ajax($.extend({},AJAX_ASYNC_NOCACHE_POST, {
			url: '/user/',
			success: function(html){
				var info = IXA_nationInfoHandler(html);
				asyncCallback( info );
			}
		}));
		return;
	}
	//------------------------------------------------------------------------------
	//------------------------------------------------------------------------------
	
	if(!html){
		$.ajax($.extend({},AJAX_NOASYNC_NOCACHE_POST, {
			url: '/user/',
			success: function (_html){ html = _html; },
		}));
		if( !html ) throw(new Error('/user/ ページの取得に失敗。')) ;

		// 自分自身にキャッシュしておく
		arguments.callee.html = html;
	}

	// ハンドラを評価して、ハンドラの戻り値を返す
	return IXA_nationInfoHandler(html);
}////}}}

// jQuery Deferred で書き直し
function IXA_getNationInfo (useCache){////{{{
	var dfd = $.Deferred();

	if( useCache && mokoStorage.getItem('NationInfo').cache ){
		let info = mokoStorage.getItem('NationInfo').cache;
		var villageName = IXA_getVillageName();
		$O.values(info).each(function(v){
			v.current = false;
			if( v.name == villageName ){
				v.current = true;
			}
		});

		dfd.resolve(info);
	}
	else {
		$.post('/user/')
		.success(function(html){
			var info = IXA_nationInfoHandler(html);
			dfd.resolve(info);
		});
	}

	return dfd.promise();

}////}}}

/** 城主プロフィールのHTMLから国情報を収集 */
function IXA_nationInfoHandler(html){////{{{
	var $html = $(html);
	// 領地情報取得
	var currentVillageName = IXA_getVillageName();
	var mapHdl = function() {
		
		var $row = $(this);
		var kind = $row.find('td:eq(0)').text().trim() ; // 領地種類
		//if( kind =='領地') return true;
		var nm      = $row.find('a:eq(0)').text().trim();
		var xy      = $row.find('a:eq(1)').text().trim();
		var url     = $row.find('a:eq(0)').attr('href');
		var mapURL = $row.find('a:eq(1)').attr('href');
		
		var isVillage = false;
		var isFoothold = false;
		
		if( kind == '所領' || kind == '本領' ){
			isVillage = true;
		}
		
		if( /^(本領|所領|出城|陣)$/.test(kind) ){
			isFoothold = true;
		}

		var vID = (url.match(/village_id=(\d+)/)||[])[1] || "" ;

		var nationID = (/c=(\d+)/.exec( mapURL )||[])[1] || "" ;

		var tmpObject = {};
		tmpObject[vID] = {
			villageID : vID,
			name      : nm,
			url       : url,
			coord     : xy,
			mapURL    : mapURL,
			current   : (nm == currentVillageName ),
			kind      : kind,
			isVillage : isVillage,
			isFoothold: isFoothold,
			nationID  : nationID,
		};
		return tmpObject;
	};

	var own   = $(html).find('.common_table1:eq(0) tr.fs14').map(mapHdl).toArray();
	var other = $(html).find('.common_table1:eq(1) tr.fs14').map(mapHdl).toArray();

	// 配列になってるので villageID をキーとしたオブジェクトに変換
	// [ {0:{}}, {1:{}} ] ==> {0:{}, 1:{}}
	own = Object.merge.apply(null, own );
	other = Object.merge.apply(null, other );

	if( $O.every(other, function(v){ return v.kind != '出城' }) ){
		//GM_log('出城なし');
		$O.merge( own, other );
		other = {};
	}

	// 自国・他国フラグ追加
	Object.each( own  , function(v){ v.own = true; v.other = false });
	Object.each( other, function(v){ v.own = false; v.other = true });
	
	var infos = Object.merge(own, other);

	var nationInfoStore = mokoStorage.getItem('NationInfo')
	nationInfoStore.cache = infos;
	mokoStorage.flush();

	return infos;
}////}}}

/** 拠点変更のURLを作成する */
function IXA_makeVillageChangeURL ( villageID, _page ) {////{{{
	var page = encodeURIComponent( _page || '/village.php' );
	var url = sprintf(
		'/village_change.php?village_id=%(villageID)s&from=menu&page=%(page)s',
		{villageID: villageID, page: page}
	);
	return url;
}////}}}

/** 拠点変更
* 指定拠点の指定ページを読み込んで、HTMLを返す。
*/
function IXA_villageChange (villageID, _page, async){////{{{
	if(!villageID) throw 'Need villageID string.';
	var page = encodeURIComponent( _page || '/village.php' );
	var url = sprintf(
		'/village_change.php?village_id=%(villageID)s&from=menu&page=%(page)s',
		{villageID: villageID, page: page}
	);

	if( async ){
		return $.ajax($.extend({}, AJAX_ASYNC_NOCACHE_GET, {
			url: url,
		}));
	}

	var ret = false, html = '';
	$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_GET, {
		url: url,
		success: function(_html){ html = _html; ret = true }
	}));
	return html;
}////}}}

/** 練兵する（確認なし）
* 指定した兵種を指定数訓練する。確認はしない。
*/
function IXA_drillSoldier (x, y, soldierTypeno, soldierNum, villageID){////{{{
	
	// villageID の指定がある場合、拠点変更のためアクセス
	if( villageID ){
		var html = IXA_villageChange(villageID)
	}
	
	var sendUrl = sprintf('/facility/facility.php?x=%(x)s&y=%(y)s#ptop',{x:x,y:y})
	var data = {
		x: x, // 兵舎の座標
		y: y,
		unit_id: soldierTypeno, // 兵種ID
		count: soldierNum // 訓練数
	};

	//GM_log('IXA_drillSoldier(', x, y, soldierTypeno, soldierNum, villageID, ')' );
	//return;
	
	//GM_log( sendUrl );
	//return true;
	var ret = false;
	$.ajax($.extend({}, AJAX_NOASYNC_NOCACHE_POST,{
		url: sendUrl,
		data: data,
		success: function(){ ret = true },
	}));
	return ret;
}////}}}

/** village.php から、兵舎のリストを得る
* 戻り値 == { '<兵舎名>' : { coordX: <x座標>, coordY: <y座標>, yardName: '<兵舎名>' }, ... }
*/
function IXA_makeYardList (doc, villageID){////{{{
	var yards = {};
	var $doc = $(doc||document);
	var villageName = $doc.find('#lordSiteArea').text().replace("選択中の拠点:","");
	$doc.find('#mapOverlayMap area[href]').each(function(){
		var $area = $(this);
		var mat, matCoords;
		var reDrill = /^((?:足軽|弓)兵舎|厩舎|兵器鍛冶) LV\.([1-9]\d*)/;
		if( mat = $area.attr('title').match(reDrill) ){
			let yardName = mat[1];
			let yardLevel = mat[2].toInt();
			if( matCoords = $area.attr('href').match(/x=(\d+)&y=(\d+)/) ){
				var x = matCoords[1], y = matCoords[2] ;
				yards[yardName] = {
					villageName: villageName,
					yardName: yardName,
					yardLevel: yardLevel,
					coordX: x, coordY: y,
				} ;
				if(villageID){
					yards[yardName].villageID = villageID;
				}
			}
		}
	});
	return yards;
}////}}}

var IXA = {////{{{
	getResourceCount: function( type ){
		var type2id = {
			// 基本名。便宜上、この4つを標準とする。
			wood: 'wood', cotton: 'stone', iron: 'iron', food:'rice',
			// その他
			wool: 'stone', ingot: 'iron', rice:'rice', grain: 'rice',
		};
		var id = type2id[type];
		if(!id) throw( new Error('「'+type+'」は無効な資源タイプ。'));
		return parseInt( $('#'+id).text(), 10 );
	},
	getResourceCountAll: function() {
		return {
			wood  : IXA.getResourceCount('wood'),
			cotton: IXA.getResourceCount('cotton'),
			iron  : IXA.getResourceCount('iron'),
			food  : IXA.getResourceCount('food')
		};
	},
	getLocationURL: function( dest ){
		var key2path = {
			'内政': '/village.php', village: '/village.php',
			'部隊': '/card/deck.php', deck: '/card/deck.php',
			'地図': '/map.php', map: '/map.php',
			'秘境': '/facility/dungeon.php', dungeon: '/facility/dungeon.php',
			'新秘境': '/facility/dungeon02.php', dungeon02: '/facility/dungeon02.php',
		};
		var pathname = key2path[dest] ;
		if(!pathname) throw( new Error('「'+type+'」は無効な行き先。'));
		return 'http://'+ location.hostname + pathname ;
	},
	// 各パネルのデータを取得
	analizeFacilities: function () {
		var x = 7, y = 7, village = {}, facility = {};
		// 各タイルの施設名とレベルを収集
		$('area').each(function(){
			var $this = $(this);
			var title = $this.attr('title');
			var href = $this.attr('href');
			//var t = /\?x=(\d+).*;y=(\d+)/g.exec( href );
			//var coordX = t[1];
			//var coordY = t[2];
			var facName = title.replace(/ LV\.\d+$/,'');
			var facLevel ;
			if( /LV\.(\d+)/.test( title ) ){
				facLevel = parseInt( /LV\.(\d+)/g.exec( title )[1], 10 );
			}

			village[x+''+y] = {
				x: x, y: y,
				name: facName,
				level: ( facLevel || null )
			};

			if( !facility[facName] ) facility[facName] = 0;
			facility[facName] += 1;

			//console.log( x, y--, facName, facLevel )
			--y;
			if( y < 0 ){
				y = 7; --x;
			}
		});

		var production = {
			bonus: 0,
			'bonus-wood': 0,
			'bonus-cotton': 0,
			'bonus-iron': 0,
			'bonus-food': 0,
		};
		$.each( village, function( idx, v ){
			var fac, facLv;
			if( fac = FACILITY[v.name] ){
				facLv = fac[v.level];
				if( fac['product'] ){
					if( !production[fac.product] ) production[fac.product] = 0;
					production[fac.product] += ( fac.crop || ( facLv && facLv.crop ) || 0 );
					// TODO 暫定対応施設
					if( fac._TENTATIVE && fac._TENTATIVE_REF_MAX_LEVEL ){
						production[fac.product] += ( fac[ fac._TENTATIVE_REF_MAX_LEVEL ].crop || 0 );
					}
				}
			}
		});

		// 村落のボーナス
		$.each(village, function(idx, v){
			if( v.name == '村落' ){
				production['bonus'] += v.level / 100;
			}
		});
		
		// ボーナス施設のボーナス（暫定＆未検証）
		var bonusRate  = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 7, 7: 9, 8: 11, 9: 13, 10: 15 };
		// TODO 9レベル以降はわからないので8レベルの数値を入れておく
		var _TENTATIVE_BONUS_RATE = 15;
		// 陥落中でないなら
		if( !$('div#back_bottom').length ){
			$.each(village, function(idx, v){
				if( !v.level ){ return; }

				switch( v.name ){
					case '山林奉行所' : production['bonus-wood']   += ((v.level <= 10) ? bonusRate[v.level] : _TENTATIVE_BONUS_RATE ) / 100; break;
					case '大舎人座'   : production['bonus-cotton'] += ((v.level <= 10) ? bonusRate[v.level] : _TENTATIVE_BONUS_RATE ) / 100; break;
					case '鉄穴流し'   : production['bonus-iron']   += ((v.level <= 10) ? bonusRate[v.level] : _TENTATIVE_BONUS_RATE ) / 100; break;
					case '水車'       : production['bonus-food']   += v.level / 100 ; break;
				}
			});
		}
		
		// 人口
		var population = ($('#basepointBottom .status').text().match(/\d+/)||[0])[0];

		var report = {
			production: production,
			facility: village,
			population: population
		};

		return report;
	},
	
	// 討伐ゲージの回復時間
	// XXX 100 までと、それ以降で時間が違ったような…
	getLackBGageRestoreTime: function (/*回復したい討伐*/toubatsu) {
		var tmp = toubatsu * 163;
		var h = Math.floor(tmp / 3600);
		var m = Math.floor((tmp - h*3600 ) / 60 );
		var s = Math.floor(tmp - h*3600 - m*60 );
		var tim = h + ":" +
		(m+100).toString().substr(-2)  + ":" +
		(s+100).toString().substr(-2);
		return tim;
	},
	// ヒットポイントの回復時間（カードリスト内）
	getMaxHPRestoreTime: function (currentHP, rank, lv) {
		// 適当
		var rate = 0;
		if (rank>0) {
			rate = (rank-1)*72+HPres1[lv];
		} else {
			rate = HPres0[lv];
		}
		var tmp = rate*(100-currentHP);
		var h = Math.floor(tmp / 3600);
		var m = Math.floor((tmp - h*3600 ) / 60 );
		var s = Math.floor(tmp - h*3600 - m*60 );
		var tim = h + ":" +
		(m+100).toString().substr(-2)  + ":" +
		(s+100).toString().substr(-2);
		return tim;
	},

	Footholds: _fetchFootholdsInfo()
}////}}}

// 拠点一覧
// サイドバーの一覧から拠点の一覧オブジェクトを得る。
// ret.data = 拠点一覧オブジェクト。キーは座標文字列 "x,y"。
// ret.current() = 現在の拠点データ
function _fetchFootholdsInfo() {////{{{
	var $bases = $('.basename li a[title], .basename li.on span[title]')
	var footholds = Object.merge.apply(null, $bases.map(function(){
		$this = $(this);
		var fullname = $this.attr('title');
		var fhName = fullname.replace(/\s*\((-?\d+),(-?\d+)\)$/,'');
		var coords = fullname.match(/\((-?\d+),(-?\d+)\)$/);
		// 拠点オブジェクト
		var foothold = {
			current: false,
			fullname: fullname,
			name: fhName,
			x: coords[1].toInt(), y: coords[2].toInt()
		};
		if( $this.parent().hasClass('on') ){
			foothold.current = true ;
		}
		var key = foothold.x + ',' + foothold.y ;
		var ret = {};
		ret[key] = foothold;
		return ret;
	}).toArray() );

	var fhObj = {};
	fhObj.data = footholds;
	fhObj.current = function(){
		var _cur;
		Object.each( this.data, function(v){
			if(v.current){
				_cur = v;
				return false;
			}
		})
		return _cur;
	};

	return fhObj;
}////}}}

// 地図の onmouseover から土地の情報取得
function fetchMapInfo(target_element) {////{{{
	var str = $(target_element).attr('onmouseover').toString();
	str = str.replace(/^\s*\w+\s*\(\s*/,'').replace(/\);.*/,'');
	var tmp_info = str.match(/'(?:[^'\\]+|\\.)*'|"(?:[^"\\]+|\\.)*"/g) ;
	tmp_info.forEach(function(v, idx){
		tmp_info[idx] = v.replace(/^.|.$/g,'');
	});
	var info = {};
	info['map_name']   = tmp_info[0];  // 地名
	info['lord_name']  = tmp_info[1];  // 持ち主
	info['population'] = parseInt( tmp_info[2], 10 );  // 人口
	info['coordinate'] = tmp_info[3].replace(/^\(|\)$/g,'');  // 座標
	info['union']      = tmp_info[4];  // 同盟
	info['land_lank']  = tmp_info[5].length ;  // 土地レベル
	info['distance']   = parseFloat( tmp_info[6]) ;  // 距離
	info['wood']       = parseInt( tmp_info[7] , 10);  // 木
	info['wool']       = parseInt( tmp_info[8] , 10);  // 綿
	info['ingot']      = parseInt( tmp_info[9] , 10);  // 鉄
	info['grain']      = parseInt( tmp_info[10], 10); // 糧
	info['npc']        = !!tmp_info[11]; // 豪族砦、大殿の城
	return info;
}////}}}

//******************************************************************************
/** カードページの最後のページ */
//------------------------------------------------------------------------------
function IXA_getDeckPagerLastPage () {////{{{
	var re = /input\.name\s*=\s*(?:&quot;|["'])p(?:&quot;|["']);\s*input\.value\s*=\s*(?:&quot;|["'])(\d+)(?:&quot;|["'])/;
	// /input\.name\s*=\s*&quot;p&quot;;\s*input\.value\s*=\s*&quot;(\d+)&quot;/;
	// /input\.name\s*=\s*"p";\s*input\.value\s*=\s*"(\d+)"/
	var maxPageNumber;

	var $goLastPage = $('.cardstockchange ul.pager.cardstock:eq(0) > li > a:contains(">>")' );
	if( $goLastPage.length ){
		if( $goLastPage.attr('page') ){
			maxPageNumber = $goLastPage.attr('page').toInt();
		}
		else {
			var last = $goLastPage.attr('onclick').match(re);
			if( last ){
				maxPageNumber = last[1].toInt();
			}
		}
	}
	else {
		var pageNumbers =
			$('.cardstockchange ul.pager.cardstock:eq(0) > li' )
				.filter(function(){ return /^\d+$/.test( $(this).text().trim() ) })
				.map(function(){ return $(this).text().trim().toInt() })
				.toArray().concat([1])
		;
		maxPageNumber = Math.max.apply( null, pageNumbers ) ;
	}

	if(!maxPageNumber || maxPageNumber < 1 ) maxPageNumber=1;
	return maxPageNumber;
}////}}}

//******************************************************************************
/** JSON 格納型の localStorage から値を得る */
//------------------------------------------------------------------------------
var mokoStorage = {////{{{
	_CACHE: null,
	_keyType: {
		// 'タイプ名': タイプ定義 // Object, Array, function(){return { /*デフォルトの構造*/ }}
		Config: Object,
		Squads: Object,
		Status: Object,
		FavoriteFacilities: Array,
		AnytimeMarket: Object,
		NationInfo: Object,
		UnitStatus: Object,
		DrawedCardReminder: Object,
		CardSortOrder: function(){return {
			listData: {},
		}},
	},
	storageKey: 'ixmk_state',
	_backupKey: 'ixmk_state_backup',

	_remainCompatibility: function(){
		if( typeOf( this._CACHE['FavoriteFacilities'] ) == 'object' ){
			if( this._CACHE['FavoriteFacilities'].list ){
				this._CACHE.FavoriteFacilities = this._CACHE.FavoriteFacilities.list;
			}
			else {
				this._CACHE.FavoriteFacilities = new Array;
			}
		}
	},

	// キャッシュがなければキャッシュに読み込む
	_setup: function() {
		if( !this._CACHE ){
			var state = localStorage.getItem( this.storageKey );
			this._CACHE = ( state ? JSON.parse(state) : {} );
		}
		else {
			this._remainCompatibility();
		}
	},
	_save: function() {
		if( !this._CACHE ) return;
		//console.log('saved');
		localStorage.setItem( this.storageKey, JSON.stringify(this._CACHE) );
	},
	
	_keyCheck: function (key){
		if( typeof(this._keyType[key]) === 'undefined' ){
			throw(new Error( key + ' は不正なキーです（at mokoStorage）' ))
		}
	},

	getItem: function(key){
		if(!arguments.length == 1)
			throw(new Error('missing arguments count.'));
		this._keyCheck(key);
		this._setup();

		// キーがない場合、デフォルトに従い初期値を作る
		if(!this._CACHE[key]){
			this._CACHE[key] = new this._keyType[key] ;
		}

		return this._CACHE[key];
	},

	// NOTE セットするときに使った変数とは参照が切れているので
	//		戻り値で値を受けて、それを使うこと!!!
	setItem: function(key, value){
		if(!arguments.length == 2)
			throw(new Error('missing arguments count.'));
		try{
		if( typeof(value) !== 'object' ){
			throw(new Error('setting value must be Object: '+ typeof(value) +'.' ));
		}
		}catch(e){ GM_log(e.stack)}

		this._keyCheck(key);
		this._setup();

		if( this._CACHE[key] ){
			// 参照を維持するため、中身だけ消す
			if( Array.isArray(this._CACHE[key]) ){
				this._CACHE[key].splice(0)
			}
			else {
				Object.clearAll( this._CACHE[key] );
			}
		}
		else {
			this._CACHE[key] = new this._keyType[key] ;
		}


		if( Array.isArray(this._CACHE[key]) ){
			this._CACHE[key].append(value);
		}
		else {
			Object.merge( this._CACHE[key], value ); 
			//Object.each( value, function( v, k, o ){
			//	this._CACHE[key][k] = v;
			//},this);
		}

		this._save();

		// 参照維持するために設定した値を返す
		return this._CACHE[key];
	},

	clearItem: function(key){
		if(!arguments.length == 1)
			throw(new Error('missing arguments count.'));
		this._keyCheck(key);
		this._setup();

		// キーがない場合、デフォルトに従い初期値を作る
		if(!this._CACHE[key]){
			this._CACHE[key] = new this._keyType[key] ;
		}
		$O.clearAll(this._CACHE[key]);

		this.flush();
	},

	flush: function(){
		this._setup();
		this._save();
	},
	
	backup: function(){
		if ( confirm('設定をバックアップしますか？') ) {
			localStorage.setItem(
				this._backupKey,
				localStorage.getItem( this.storageKey )
			);
			alert('設定をバックアップしました');
		}
	},
	restore: function(){
		if ( confirm('設定を復元しますか？') ) {
			localStorage.setItem(
				this.storageKey,
				localStorage.getItem( this._backupKey )
			);
			alert('設定を復元しました');
		}
	},

	// ======== TOO OLD =========
	getJSON: function (key) {
		var json = localStorage.getItem(key);
		return json ? JSON.parse(json) : {} ;
	},
	setJSON: function (key, obj) {
		var json = JSON.stringify(obj) ;
		localStorage.setItem(key, json );
	},
};////}}}

/** 時分秒を追加した日時テキストを取得
 * @return {String} M/D hh:mm:ss
 */
function caddDate(/**Date*/baseDate, /**String*/timetxt, /**Bool*/omitDate) {
	var tim = timetxt.match(/^(\d+):(\d+):(\d+)/);
	if( !tim ) return "";

	var dt = new Date(baseDate.getFullYear(),
			baseDate.getMonth(),
			baseDate.getDate(),
			baseDate.getHours() + parseInt(tim[1],10),
			baseDate.getMinutes() + parseInt(tim[2],10),
			baseDate.getSeconds() + parseInt(tim[3],10) );

	var dateTime = "" ;

	if( !omitDate )
		dateTime = (dt.getMonth()+1) + "/" + dt.getDate() + " " ;

	dateTime += ''
	+ (dt.getHours()+100  ).toString().substr(-2)
	+ ':' + (dt.getMinutes()+100).toString().substr(-2)
	+ ':' + (dt.getSeconds()+100).toString().substr(-2);

	return dateTime ;
}

/** 時分秒を追加した時刻テキストを取得
 * @return {String} hh:mm:ss
 */
function caddDate2(baseDate, timetxt) { return caddDate(baseDate, timetxt, true) }

/** 秒数を 0:00:00 の形に成形 */
function formatTime(sec) {
	var h = Math.floor(sec / 3600);
	var m = Math.floor((sec - h*3600 ) / 60 );
	var s = Math.floor(sec - h*3600 - m*60 );
	var tim = h + ":" +
	(m+100).toString().substr(-2)  + ":" +
	(s+100).toString().substr(-2);
	return tim;
}

/** 0:00:00 を秒数に変換 **/
function timeToSeconds ( formatted ){
	var times = formatted.split(':').reverse().map(function(v){ return parseInt( v, 10) || 0 });
	return times[0] + (times[1]||0) * 60 + (times[2]||0) * 3600 ;
}

function propSort(arrayOfObj, key, des){
	var ok = 1, not = -1;
	if( des ){ ok = -1, not = 1; }
	arrayOfObj.sort ( function (b1, b2) { return b1[key] > b2[key] ? ok : not; } );
	return arrayOfObj;
}

function dsort(hash,key){
	hash.sort ( function (b1, b2) { return b1[key] > b2[key] ? -1 : 1; } );
	return hash;
}

/** UNIXスタイルのEPOC秒 */
function getUnixTime() {
	return ~~(new Date/1000);
}

Moko.after_tohankaku = function () {
	var self = this;
	$('INPUT[type="text"]').change(function(e) {
		var $this = $(this);
		$this.val( self.toHankaku($this.val()));
	});
},
Moko.toHankaku =function (str) {
	str = str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0)-65248);});
	str = str.replace(/[ー|－](\d+)/g, '-$1');
	return str;
}

//******************************************************************************
// 設定ダイアログ
//------------------------------------------------------------------------------
Moko.ConfigDialog = {
	groups : [],
	groupNameDic : {
		all: '全般1',all2: '全般2',chat: 'チャット',deck: '部隊',
		dungeon: '秘境',map: '地図', faci: '内政',unit: '簡易編成',
		sol: '兵舎',grp: 'グループ',battle: '出陣', other: 'その他',
		alpha: '試験中',
	},
	optionItems : {},
	groupTags: [],
	groupPanelss: [],

	Build: function(){
		var features = Object.filter( Moko, function(v, k, o){ return v['exec'] });

		Object.each(features, function(feat, name){
			if( feat.config || feat.configSettings ){
				if( !this.optionItems[ feat.group ] ){
					this.optionItems[ feat.group ] = [];
					this.groups.push( feat.group );
				}
				//this.optionItems[ feat.group ].append( feat.structUserOption() );
				this.optionItems[ feat.group ].append( Moko.structUserOption.call(feat) );
			}
		}, this);
		//console.log( 'グループ数：', Object.getLength( this.optionItems ) );
		//console.log( '設定数　　：', Object.values( this.optionItems ).map(function(v){return v}).flatten().length );
		//console.log( optionItems.filter(function(v){return v}) );
		
		this.buildFlame();
		this.attachDialogAction();
		
		this.dialogFrame.data('self', this );
		
		//console.log( this.dialogFrame );

	},
	
	saveToConfig: function () {
		tmpConfig = {};
		Object.each(this.optionItems, function(group, grpName){
			group.each( function($item){
				var itemTool = $item.data();
				if( !itemTool.isNotConfig ){
					var val = itemTool.valueGetter($item);
					tmpConfig[itemTool.configKey] = val;
				}
			});
		});
		//console.log( tmpConfig );
		mokoStorage.setItem('Config', tmpConfig );
	},
	
	attachDialogAction: function(){
		var self = this;
		var dialog = this.dialogFrame;

		dialog.find('#ixamoko-cfg-tabs li')
			.click( this.Actions.selectGroup );
			
		dialog.find('#ixamoko-cfg-close')
			.click( this.Actions.closeDialog );
			
		dialog.find('#ixamoko-cfg-apply')
			.click( this.Actions.applyAndClose );
	},
	
	Actions: {
		selectGroup: function () {
			var $this = $(this);
			var dialog = $this.parents('#ixamoko-cfg-dialog');

			var selectedClass = 'ixamoko-cfg-groupselected';
			var panelID = $this.attr('relation');
			$this.siblings().removeClass( selectedClass );
			$this.addClass( selectedClass );
			dialog.find('#ixamoko-cfg-panels>div').hide();
			dialog.find('#'+panelID).show();
		},
		
		closeDialog: function() {
			var $this = $(this);
			$this.parents('#ixamoko-cfg-dialog').hide();
			$('#ixamoko_mask').remove();
		},
		
		applyAndClose: function() {
			var $this = $(this);
			var dialog = $this.parents('#ixamoko-cfg-dialog');
			var self = dialog.data('self');
			self.saveToConfig();
			dialog.hide();
			$('#ixamoko_mask').remove();
		}
	},
	
	readyDev: function(){
		var self = this;
		$('#ixamoko-dev-toolbar').append('<a href="#" id="dev-dialog-open">ダイアログ開く</a>');
		$('#dev-dialog-open').click(function(){
			self.openDialog();
			return false;
		});
	},
	
	openDialog: function(){
		if(!this.dialogFrame){
			this.Build();
			Moko.Layouter.append( this.dialogFrame.hide() );
			this.dialogFrame.fadeIn(300);
			Moko_showMask( this.dialogFrame );
			this.dialogFrame.find('li:eq(0)').fireEvent('click');
		}
		else {
			this.dialogFrame.fadeIn(400);
			Moko_showMask( this.dialogFrame );
		}
		return false;
	},
	
	buildFlame: function () {
		var self = this;
		var frame, groupTabs, groupPanels, header, footer ;
		frame = $('<div id="ixamoko-cfg-dialog">');
		tabPane = $('<ul id="ixamoko-cfg-tabs">').appendTo(frame);
		panelPane = $('<div id="ixamoko-cfg-panels">').appendTo(frame);
		headerPane = $('<div id="ixamoko-cfg-header"><h4>IXA Moko 設定</h4><span id="ixamoko-cfg-close">閉じる</span></div>').appendTo(frame);
		footerPane = $('<div id="ixamoko-cfg-footer"><input type="button" id="ixamoko-cfg-apply" value="適用"/></div>').appendTo(frame);
		
		this.dialogFrame = frame ;
		this.tabPane     = tabPane ;
		this.panelPane   = panelPane ;
		this.headerPane  = headerPane ;
		this.footerPane  = footerPane ;
		
		Object.each( this.groupNameDic, function(groupName, groupKey){
			var tab, panel ;
			var groupName = self.groupNameDic[ groupKey ];
			tab = $('<li class="ixamoko-cfg-tab" id="ixamoko-cfg-tab-'+groupKey+'">')
				.attr('relation', 'ixamoko-cfg-panel-'+groupKey)
				.appendTo(tabPane)
				.text(groupName)
			;
			panel = $('<div class="ixamoko-cfg-panel" id="ixamoko-cfg-panel-'+groupKey+'">')
				.appendTo(panelPane)
				.each(function(){
					var $panel = $(this);
					if( self.optionItems[groupKey] ){
						self.optionItems[groupKey].each(function($item){
							$panel.append($item);
						})
					}
				})
			;
		});
	}
};


//******************************************************************************
// 旧設定
//------------------------------------------------------------------------------

function oldMoKoConfig () {////{{{
	// IXA MOKO ツール設定

	var OPTION_TAG = 'ixa_moko_options';
	// 保存済みの設定読み込み
	var oldConfig = localStorage.getItem(OPTION_TAG);
	if ( !oldConfig )  return;
	
	oldConfig = JSON.parse(localStorage.getItem(OPTION_TAG));

	Object.each(oldConfig, function(val, key){
		if( key == 'def_kind_soldier' ){new function(){
			var idx_to_name = ['','足軽','長槍足軽','武士','弓足軽','長弓兵','弓騎馬',
				'騎馬兵','精鋭騎馬','赤備え','鉄砲足軽','騎馬鉄砲','破城鎚','攻城櫓','大筒兵']
			var newKinds = [];
			Object.each( val, function(v, k){
				if( v === true ){
					//console.log(v, k);
					newKinds.push(idx_to_name[k]);
				}
			});
			//console.log(newKinds);
			oldConfig[key] = newKinds;
		}}//#rexical
	});

	var oldGroupConfigs = [];
	var oldSquadConfig = {};
	new function(){
		// グループ設定の宣言
		// カードの並び順
		var groups     = $R(16).map(function(){ return '' });
		var groups_img = defaultGroupIcons ;

		// グループ色の設定
		if (localStorage.getItem('ixamoko_init_groups'))
			groups = JSON.parse(localStorage.getItem('ixamoko_init_groups'));

		if (localStorage.getItem('ixamoko_init_groups_img'))
			groups_img = JSON.parse(localStorage.getItem('ixamoko_init_groups_img'));

		groups.each(function(color, idx){
			oldGroupConfigs[idx] = {
				src   : groups_img[idx],
				colors: { normal: color || '', wounded: '#AAA' },
				alt   : '',
			}
		});
		
		//  squadConfig : {
		//      <cardID> : {
		//          cardNumber  : '<カード番号>',
		//          cardName    : '<武将名>',
		//          groupID     : <所属グループID>
		//  }};
		// 
		var group_setting = {}; // カードごとの設定 { cardID: markerID }
		var cardname_setting = {}; // カードIDと武将名 { cardID: '武将名' }
		if (localStorage.getItem("ixamoko_group_set")!=null)
			group_setting = JSON.parse(localStorage.getItem("ixamoko_group_set"));
		if (localStorage.getItem("ixamoko_card_name")!=null)
			cardname_setting = JSON.parse(localStorage.getItem("ixamoko_card_name"));

		Object.each( group_setting, function( groupID, squadID){
			oldSquadConfig[squadID] = {
				cardName: cardname_setting[squadID],
				groupID : groupID,
			};
		});
	};
	
	oldConfig.groupConfigs = oldGroupConfigs ;

	return { Config: oldConfig, Squads: oldSquadConfig } ;
}////}}}

function defaultConfig (){////{{{
	return {
		raid                   : true ,
		inside_attack_view     : true ,
		tohankaku              : true ,
		sidebox_change         : true ,
		timeout_countdown      : true ,
		pulldown_menu          : false,
		toride_count           : true ,
		impact_count           : true ,
		new_war           	   : true ,
		menu_reversal          : true ,
		non_cardview           : true ,
		sort_village           : true ,
		place_skip             : true ,
		place_skip_str         : ''   ,
		pager_ajax             : true ,
		ad_sort                : true ,
		fall_check             : true ,
		disableBattleMenuBlinck: true ,
		chat_mapcood           : true ,
		chat_mikire            : true ,
		chat_linkchg           : true ,
		commentListEnemy       : true ,
		toubatsu               : true ,
		refillhp               : true ,
		def_honjou             : true ,
		deck_check             : true ,
		rank_lock              : 2    ,
		hold_butai             : true ,
		favoriteSort           : true ,
		all_dissolution        : true ,
		all_deck_setting       : true ,
		unitListDialog         : true ,
		deckGroupImgView       : true ,
		displayUnitPower       : true ,
		hikyou                 : true ,
		hikyou_all             : true ,
		map_starx              : 2    ,
		map_reg                : true ,
		map_rightclick         : true ,
		map_tool               : true ,
		map_butai_status       : true ,
		all_map_status         : true ,
		map_rightdblclick      : true ,
		prohibitionArea        : true ,
		zoomMap                : true ,
		panelAttack            : true ,
		map_coordinates        : true ,
		map_quarters           : true ,
		faci_list              : true ,
		unit_list_hp           : true ,
		unit_list_hp_bgc       : true ,
		unit_list_total        : true ,
		unit_list_group        : true ,
		unit_list_icon         : true ,
		unit_list_sort_def_grp : true ,
		unit_list_hikyou       : true ,
		unit_list_200          : true ,
		unit_list_max          : true ,
		market_maxsoldier      : true ,
		market_desc            : true ,
		non_back               : true ,
		map_potential          : true ,
		facility_selecter      : true ,
		facility_tool          : true ,
		facility_tool_WUP      : true ,
		panel_func_change      : true ,
		villageListView        : true ,
		production_panel       : true ,
		facility_maxsoldier    : true ,
		desc_soldier           : true ,
		def_num_of_soldier     : 100  ,
		def_kind_soldier       : ['長槍足軽', '長弓兵', '精鋭騎馬', '鉄砲足軽', '攻城櫓'],
		merge_fight_info       : true ,
		_dev_show_dev_toolbar  : false,
	};
}////}}}

//******************************************************************************
// スタイル追加
//------------------------------------------------------------------------------
function attachMokoCss (){////{{{
	//$('head').append('<style>\n' + ixaKaizou2Css() + '\n</style>');
	var ext_style = '';
	Object.each(Moko, function(v, key){
		if( v.style ) ext_style += v.style;
	});
	var identifier = '#moko-identifier{}';
	GM_addStyle( identifier + ixaKaizou2Css() + ext_style );

	// Greasemonkey で追加した StyleSheet オブジェクトを取得
	var ssNum = document.styleSheets.length;
	var gmSS = null;
	$R(0, ssNum-1)
	.reverse() // 後の方にあるはずなので逆さまから
	.some(function(idx){
		var ss, founded = false;
		if(ss =document.styleSheets[idx]){
			try{ // 元のCSSRulesにアクセスするとセキュリティエラーが出るのでtryで受ける
				if( ss.cssRules[0].selectorText == '#moko-identifier' ){
					founded = true;
					gmSS = ss;
					//GM_log(ss);
				}
			}
			catch(e){}
		}
		return founded;
	})

	MOKO_CSS = gmSS;

}
function ixaKaizou2Css (){
	//^NOHL
	return '/*ixa-kaizou2.css*/'
	+'table.tablesorter{border-collapse:collapse;border-spacing:none;padding:0;line-height:1.0;margin-bottom:10px;border-top:1px solid #76601d;border-bottom:1px solid #76601d;border-right:1px solid #76601d;}'
	+'table.tablesorter.no_br{border-right:none;border-bottom:none;}'
	+'table.tablesorter.no_mb{margin-bottom:0;}'
	+'table.tablesorter.w400{width:400px;}'
	+'table.tablesorter th{border-left:1px solid #76601d;border-bottom:1px dotted #76601d;padding:5px 8px;color:#300;text-align:center;background-color:#e0dcc1;font-weight:bold;}'
	+'table.tablesorter td{border-left:1px solid #76601d;border-bottom:1px dotted #76601d;padding:4px 8px;text-align:center;color:#300;line-height:1.5;vertical-align:middle;}'
	+'table.tablesorter td.no_bl{border-left:none;}'
	+'table.tablesorter.no_mb{margin-bottom:none;}'
	+'table.tablesorter td.no_padding{padding:0;}'
	+'table.tablesorter th a,table.tablesorter td a{color:#060;padding:0;margin:0;vertical-align:middle;}'
	+'table.tablesorter tr.choose td{background:#C6FF66;vertical-align:middle;}'
	+'table.tablesorter tr.now td{font-weight:bold;background:#F9DEA1;vertical-align:middle;}'
	+'table.tablesorter tr.unread td{font-weight:bold;background:#FF9;vertical-align:middle;}'
	+'table.tablesorter tr td.rock{background:#F46666;}'
	+'table.tablesorter tr.now td span.rank{background:url("/img/common/icon_ranknow.jpg") no-repeat 0 0;padding-left:12px;padding-top:2px;margin-top:4px;}'
	+'table.tablesorter th.middle,table.tablesorter td.middle{vertical-align:middle;}'
	+'table.tablesorter td.left{text-align:left;}'
	+'table.tablesorter td.abb{position:relative;}'
	+'#commentBox #commentNavi li,#commentBox #commentNavi li a{width:47px;'
	+'background:url("'
	+'data:image/png;base64,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'
	+'") no-repeat;text-indent:-9999px;overflow:hidden;font-size:0;}'
	//$NOHL
	//^NOHL
	+'#commentBox #commentNavi li#comBtnEnemy {height: 23px;background-position: -47px -48px;}'
	+'#commentBox #commentNavi li#comBtnEnemy a{height:23px;background-position:0 -48px;}'
	+'#commentBox #commentNavi li#comBtnEnemy a:hover{background-position:-47px -48px;}'
	+'#commentBox #commentListEnemy{height:65px;padding:4px 2px 2px;'
	//$NOHL
	//^NOHL
	+'background:url("'
	+'data:image/png;base64,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'
	+'") no-repeat;}'
	+'#commentBox #commentListEnemy{background-position:left top;display:none;}'
	//$NOHL


	//^NOHL
	// ↓から追加分
	+sprintf(''
	+'#moko-progress-panel{ position:absolute;width:280px;height:40px;display:none;z-index:9999;padding:20px;background-color:#fff;border:3px solid #f00;-moz-border-radius:5px;-webkit-border-radius:5px;}'
	+'.ixamoko_mask{position:absolute;z-index:9000;background-color:#000;display:none;}'
	+'.ixamoko_dialog{position:absolute;z-index:9001;}'
	+'#ixamoko_raid{width:100%%;position:fixed;padding:2px;background-color:#f00;z-index:9999;}'
	+'#ixamoko_dialog{position:absolute;width:400px;height:360px;display:none;z-index:9999;padding:20px;background-color:#fff;border:3px solid #f00;-moz-border-radius:5px;-webkit-border-radius:5px;}'
	+'.ixamoko_dialog_group_button {cursor:pointer;text-align:center;width:50px;padding:5px;margin:2px;float:left;border:1px solid #000;-moz-border-radius:5px;-webkit-border-radius:5px;}'
	+'#ixamoko_maplist2{font-size: 10px; z-index: 1000; overflow-y: scroll; width: 165px; height: 110px; position: absolute; top: 10px; left: 620px; background-color: rgb(255, 255, 255); border: 1px solid rgb(0, 0, 0);}'
	+'span.ixamoko_short:hover {background-color:#afa;text-decoration:underline;}'
	+'span.ixamoko_excess:hover {background-color:#afa;text-decoration:underline;}'
	+'.ixamoko_recommendSoldier {font-weight: bold;}'
	//$NOHL
	//^NOHL
	+'.moko-map-eswn {background-color:black; z-index: 99; position: absolute; width: 40px; height: 40px; background: url("'
	+'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAMAAABO8gGqAAAAaVBMVEUAAABeTkJeTkJeTkJeTkKogGBeTkJeTkJeTkKDZ1FeTkJeTkJeTk'
	+'JeTkJeTkJeTkJeTkJeTkL////r4NjDo4rNsp2+m4DSuqfXwrGwhWO5lHa0jGz69/Xw6OHm2M7h0cT17+vIq5Pcybr64FZpAAAAEnRSTlMAAhRQAfQHDhOvS1U8TyELOy'
	+'DUhKRQAAAClUlEQVR4Xu2Y2W7bMBRE60Res8+9XBdt//+RNYkodgCTVBGjUoHOg+GHA/JYQ8HS/fVPpGk2hTTN0txmtz88ZHPY7zYLc28f76eXx0xeTu8fb5sluWb3+n'
	+'Tcmmy2x6fXXbMUFwX3z0dTzPF53yzFxUYOp20Z3J4Om6W4KPjwaCp5fNgsxP2bgkTU2hmCI3W6yl1HuzwnmGX6tDMEAZ2A7mrBEsfzBBU8ZzkCyBkA43zBEZ7nCGqMtw'
	+'Qdp2itWGg9MNM5Q0FQmyjIWUHLnwlAx8wDnSMnMM8pAEFmKwbI6Mu+dcHZFcd+6xVPuaOgGLKCStsvlr2YKehmCrp5gs6DbEZQA+NUXQ+0mZtEaXslKD2bDMffBNsg5w'
	+'jqdGSygjSxBPQ3F5x+B3dEOh1FjLc5Qi8YCNwBijXgVfZmCpOgAnqRqLogmawgOVLOmDByAl1GEHypmAHIesU+6hUEw1RxKAuaFr1zkU9LzxScUbGKwB2uYGQHBrEpCz'
	+'pA/5Eg30tQUmdUN0KVBRkYkiDrvyvIzF06ChyKggI+rRt8uJMgIUalfQuCkY6Eq1TcYTBGIOYOgqITjJjOD5KdqQuqIIuCg+9SNUTtWBCUQ38taDn7V+d6xOgRFKFqxS'
	+'21fUkwKDOFM4JMASkXwTEr6AIQeR2/9FrWKzbligdTFbQAoL5V3OcEXcISKz0AeP1DQa4LmhaeL2ew1bpF624KugCy046yB6BqV5BboCSo+CsqJ8jBTZsGfEbdEmTfye'
	+'vHrRGhWnGiIX90BY372lQgBd7eEJTCTev2QxKxnBNMgCBto2YYTEYwVTVFEomb3MTKCCl9jrDFB1YpK29h1l4B9v9r57oFVz/6WP3waPXjt7UPMFc/Al7/EH39+Q3KUo'
	+'9sln1dZAAAAABJRU5ErkJggg=='
	+'") no-repeat;}'
	+'.moko-map-eswn-E { top: 182px; left: 620px; background-position: 0;}'
	+'.moko-map-eswn-S { top: 215px; left: 222px; background-position: -40px 0;}'
	+'.moko-map-eswn-W { top:  47px; left: 110px; background-position: -80px 0;}'
	+'.moko-map-eswn-N { top:   7px; left: 500px; background-position: -120px 0;}'
	+''+<><![CDATA[
/*div { border: solid 1px #000 }*/
#ixamoko-cfg-dialog {
	top: 100px; left: 50%%;
	border: solid 4px black;
	position: absolute;
	width: 500px; height: 500px;
	margin-left: -250px;
	background-color: white;
	-moz-box-sizing: content-box;
	-moz-border-radius: 15px;
	z-index: 10000;
}

#ixamoko-cfg-footer {
	padding: 0px;
	text-align: center;
}
#ixamoko-cfg-footer input[type="button"] {
	font-size:16px;
	width: 200px;
}

#ixamoko-cfg-dialog div,
#ixamoko-cfg-dialog ul
{
	-moz-box-sizing: border-box;
}

#ixamoko-cfg-dialog ul#ixamoko-cfg-tabs {
	padding: 0; margin: 0;
	position: absolute;
	top: 30px; left: 0;
	width: 100px;
	height: 440px;
	/*border: solid 2px red;*/
	padding: 6px;
}
#ixamoko-cfg-dialog ul#ixamoko-cfg-tabs li {
	text-align: center;
	list-style: none;
	width: auto;
	padding: 4px;
	margin-bottom: 5px;
	border-radius: 4px;
	border: solid 1px gray;
	font-size: 16px;
	font-weight: bold;
	-moz-user-select: none;
	color: #444;
}

#ixamoko-cfg-dialog ul#ixamoko-cfg-tabs li.ixamoko-cfg-groupselected {
	background-color: #eee;
}

#ixamoko-cfg-dialog ul#ixamoko-cfg-tabs li:hover {
	background: #EEE;
	cursor: pointer;
}

#ixamoko-cfg-dialog #ixamoko-cfg-header {
	position: absolute;
	height: 30px; width: 100%%;
	top: 0; left: 0;
	/*border: solid 2px green;*/
	background: darkgray;
	border-radius: 10px 10px 0 0;
}
#ixamoko-cfg-dialog #ixamoko-cfg-header h4 {
	padding: 0; margin: 0;
	padding-top: 4px;
	padding-left: 12px;
	font-size: 16px;
	font-weight: bold;
}
#ixamoko-cfg-dialog #ixamoko-cfg-header #ixamoko-cfg-close {
	padding: 2px; margin: 0;
	position: absolute;
	top: 6px ; right: 6px;
	width: 50px; height: 14px;
	border-radius: 4px;
	text-align: center;
	background: #ccc;
	color: #444;
	cursor: pointer;
}
#ixamoko-cfg-dialog #ixamoko-cfg-header #ixamoko-cfg-close:hover {
	background: #DDD;
}

#ixamoko-cfg-dialog #ixamoko-cfg-footer {
	position: absolute;
	height: 30px; width: 100%%;
	bottom: 0; left: 0;
	/*border: solid 2px green;*/
	background: darkgray;
	border-radius: 0 0 10px 10px ;
}

#ixamoko-cfg-dialog #ixamoko-cfg-panels {
	position: absolute;
	top: 30px; left: 100px;
	width: 400px; height: 440px;
	margin: 30px 0 30px 100px;
	margin: 0;
	/*border: solid 4px orange;*/
}

#ixamoko-cfg-dialog #ixamoko-cfg-panels .ixamoko-cfg-panel {
	position: absolute;
	top: 0; left: 0;
	width: 100%%; height: 100%%;
	/*border: solid 5px pink;*/
	background-color: white;
	padding: 15px;
	overflow-y: auto;
}
.ixamoko-cfg-item {
	margin-bottom: 12px;
}
.ixamoko-cfg-simplecheckbox {
}
.ixamoko-cfg-selectbox-area {
}
.ixamoko-cfg-combocheckbox {
}
.ixamoko-cfg-item-title {
	font-weight: bold;
}
.ixamoko-cfg-item-combobox {
	padding: 4px;
	height: 100px; overflow-y: scroll; border: solid 1px #CCC;
	-moz-column-count: 3;
}
.ixamoko-cfg-item-markericon-entrybond { padding-left: 40px; padding: 8px 4px 8px 40px; border-bottom: solid 1px #999; line-height: 1.2em; }
.ixamoko-cfg-item-markericon-entrybond img { float: left; margin-left: -40px }
.ixamoko-cfg-markericon-field-color { width: 4em }
.ixamoko-cfg-markericon-field-alt { width: 4em }
.ixamoko-cfg-markericon-field-soldierType { }
.ixamoko-cfg-validation-fail { border: solid 1px #c44; background: #FCC; -moz-border-radius: 4px; }
.ixamoko-cfg-validation-fail:before {
	content: "!";
	display: inline;
	padding: 1px 5px;
	background: #A33;
	font-weight: bold;
	color: white;
	-moz-border-radius: 2px;
}
table.moko-gen-table{border-collapse:collapse;border-spacing:none;padding:0;line-height:1.0;margin-bottom:10px;border-top:1px solid #76601d;border-bottom:1px solid #76601d;border-right:1px solid #76601d;}
table.moko-gen-table.no_br{border-right:none;border-bottom:none;}
table.moko-gen-table.no_mb{margin-bottom:0;}
table.moko-gen-table.w400{width:400px;}
table.moko-gen-table th{border-left:1px solid #76601d;border-bottom:1px dotted #76601d;padding:3px 6px;color:#300;text-align:center;background-color:#e0dcc1;font-weight:bold;}
table.moko-gen-table td{border-left:1px solid #76601d;border-bottom:1px dotted #76601d;padding:1px 6px;text-align:center;color:#300;line-height:1.5;vertical-align:middle;}
table.moko-gen-table td.no_bl{border-left:none;}
table.moko-gen-table.no_mb{margin-bottom:none;}
table.moko-gen-table td.no_padding{padding:0;}
table.moko-gen-table th a,table.tablesorter td a{color:#060;padding:0;margin:0;vertical-align:middle;}
table.moko-gen-table tr.choose td{background:#C6FF66;vertical-align:middle;}
table.moko-gen-table tr.now td{font-weight:bold;background:#F9DEA1;vertical-align:middle;}
table.moko-gen-table tr.unread td{font-weight:bold;background:#FF9;vertical-align:middle;}
table.moko-gen-table tr td.rock{background:#F46666;}
table.moko-gen-table tr.now td span.rank{background:url("/img/common/icon_ranknow.jpg") no-repeat 0 0;padding-left:12px;padding-top:2px;margin-top:4px;}
table.moko-gen-table th.middle,table.tablesorter td.middle{vertical-align:middle;}
table.moko-gen-table td.left{text-align:left;}
table.moko-gen-table td.abb{position:relative;}

.ixamoko-inline-ui-area {color: black; border: solid 1px #BB9; padding:4px; -moz-border-radius: 4px; }
.ixamoko-inline-ui-area input+input { margin-left: 4px; }
.ixamoko-inline-ui-area input+span { margin-left: 4px; }
/* Moko ボタン用調整 */
#moko-config-btn{
	display: block;
	position:absolute;
	width:62px; height:14px;
	top: 61px; right: 6px;
	background: no-epeat;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAOCAMAAABAZV/bAAAAPFBMVEX///////8AAAC/v7////+fn5/v7+9gYGCvr69AQECAgIDPz88wMDBwcHDf39+Pj48QEBAgICBQUFAAAAC6ZuGEAAAAA3RSTlMAQAAKD4vbAAAA9ElEQVR4XqXSyWrEQAxFUSfvaazR7v//1zjdxqYhEBLfVW0OAqmWD97oc+Gtvvnj7N982C+8I30g9fke+s5nob24RCG5tafRAM/UA+FUwahA6sXnt39xTiMxD3ZxQFA1BNW516OffJR5cZvKDBAtCwNuXTMHO0QGM7wDYhiFJzeWQhw8N9ER0MoeDG/KFBo6GhzDSAiC4MV3T1AO7lU0gCAfjG1VBpgJH8UZg2yC+jb9mdBenGtjoFfqysDWaL6TzGxqlWRNxA93t2PzPR2rMZt5X7NP6VtuTLPULZwiZV0zs/zp26RgOL0WkOo758HvtNzyyxcu4Ran3Hv/5AAAAABJRU5ErkJggg==");
	color: black;
	font-size:10px;
	text-decoration: none;
	font-weight: bold;
	vertical-align: middle;
	line-height: 13px;
}
#moko-config-btn>span {margin-left:-100%%;}
.navi01_01{position:relative;top:-1px}
.navi01_02{position:relative;top:-6px}
.navi01_03{position:relative;top:-10px}
/* Moko用コンテキストメニュー */
/*
7スレ >>613
>>266
+ 内政・地図のコンテキストメニュー調整
「右クリックしてもコンテキストメニューがロックされない」件の原因が判明しました。
/  Moko用コンテキストメニュー  / のCSS
-moz-border-radius: 4px; をコメントアウトしたら改善されましたので報告まで
ラウンドされた部分が空白になるので、カーソルが外れた状態になりロックされなかったようです。
ちなみに狐は最新Ver/Macです。 
*/
.moko-cmenu-panel {
	position: absolute;
	background-color: white;
	border: solid 1px darkgray;
	padding: 3px;
	z-index: %(ZIDX_CMENU)s;
	-moz-box-shadow: 0 2px 4px -1px black;
	border-radius: 4px;
}
.moko-cmenu-item { font-family: menu; color: #333; padding: 3px 6px; cursor: pointer; }
.moko-cmenu-item:hover { background-color: #E7E9EA; }
#TB_overlay { z-index: %(ZIDX_DIALOG_MASK)s; }
#TB_window { z-index: %(ZIDX_DIALOG)s; }
	]]></>,
	{ ZIDX_CMENU: ZIDX_CMENU, ZIDX_DIALOG: ZIDX_DIALOG, ZIDX_DIALOG_MASK: ZIDX_DIALOG_MASK }
	);
	//$NOHL
}////}}}

//##############################################################################
/** 未整理機能 */
//##############################################################################


//////////////////////
//犬 NOTE 使われてない
//////////////////////
function dog_balloon(x, y, n, c, target) {  //x座標, y座標, 画像(1-5), セリフ, afterする対象
	var tmp = '<div style="left: '+(x+210)+'px; top: '+y+'px; position: absolute; z-index: 112;"><img src="./img/lot/img_ixadog0'+n+'.png" width="70%"></div>';
	tmp += '<div style="left: '+(x+203)+'px; top: '+(y+18)+'px; position: absolute; z-index: 110;"><img src="img/common/facility_rollover.png"></div>';
	tmp += '<div style="left: '+(x+10)+'px; top: '+(y+10)+'px; position: absolute; z-index: 112;"><img src="./img/lot/img_ixadog_balloon.png" width="70%"></div>';
	tmp += '<div style="left: '+(x+20)+'px; top: '+(y+20)+'px; position: absolute; z-index: 113; font-weight: bold; padding: 1px; width: 170px; height: 46px; overflow: hidden;">'+c+'</div>';
	$(target).after(tmp);
}

/** 未整理機能ここまで */
//##############################################################################
//##############################################################################
//##############################################################################

//******************************************************************************
/** テスト用EVALウィンドウ */
//------------------------------------------------------------------------------
function EVAL_WINDOW (){
	if( !DEV_MODE ) return false;
	if( $('#IXAMOKO_EVAL_WINDOW').length ){
		$('#IXAMOKO_EVAL_WINDOW').remove();
		return ;
	}
	var $textarea = $('<textarea id="IXAMOKO_EVAL">').css({
		width:500,height:250,display:'block',
		fontFamily:'MeiryoKe_Gothic', fontSize: 12,
		MozTabSize: '4'
	});
	$textarea.val( GM_getValue('previousEvalWindowScript')||'' );
	$('<div id="IXAMOKO_EVAL_WINDOW">')
	.css({ background:'black',position:'fixed',bottom:0,left:0,padding:10,zIndex:99999})
	.append(
		$textarea,
		$('<input type="button" value="実行">').css({width:80}).click(function(){
			var src = $('#IXAMOKO_EVAL').val();
			var EVAL_WINDOW_RESULT;
			src = 'EVAL_WINDOW_RESULT = (function(){ '+src+' })()';
			eval( src )
			GM_log( EVAL_WINDOW_RESULT );
			GM_setValue('previousEvalWindowScript', $textarea.val());
		}),
		$('<input type="button" value="閉じる">').css({width:80}).click(function(){
			GM_setValue('previousEvalWindowScript', $textarea.val());
			$('#IXAMOKO_EVAL_WINDOW').remove();
		})
	).appendTo('body');
	return false;
}

/** このスクリプトを実行 */
Moko_addJQuery(MokoMain);

//==============================================================================
/** スクリプト終了 */
//==============================================================================

//******************************************************************************
/** 外部ライブラリライセンス表記 */
//------------------------------------------------------------------------------

/** sprintf() for JavaScript 0.7-beta1 */
//^NOHL //{{{
/**
sprintf() for JavaScript 0.7-beta1 http://www.diveintojavascript.com/projects/javascript-sprintf
Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com> All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of sprintf() for JavaScript nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
//$NOHL //}}}

/** スクリプトメモ

部隊編成
	現在の部隊情報を得る
		#assig_form 以下
	現在のデッキコストも含めるなら
		#ig_deckcost
	部隊の小隊数
		// .ig_deck_unitdata_leader, .ig_deck_unitdata_subleader の最初の
		// テキストノードが '------' でないものの数
		$('.ig_deck_unitdata_leader, .ig_deck_unitdata_subleader')
		.map(function(){return $(this).textNodes().eq(0) )
		.filter(function(){ return !/^-+$/.test( $(this).text().trim() ) })
		.length



 */

// 未実装のスクリプトの断片

//	//send_troop で総攻撃力をコンマ区切り
//	$('span:has(>img[src$="/icon_result-attack.png"])')
//	.textNodes().each(function(){
//		GM_log(this);
//		var text = $(this).text()
//		text = text.replace(/\d+/,function(v){return v.fetchNum().commalize()});
//		$(this).text(text);
//	})
