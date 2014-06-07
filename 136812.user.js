// ==UserScript==
// @name		Nicovideo Controller for Qwatch
// @author		gwin
// @namespace	https://github.com/naokigwin
// @include		http://www.nicovideo.jp/watch/*
// @version		4.0.1
// @installURL 		https://userscripts.org/scripts/source/136812.user.js
// @downloadURL	https://userscripts.org/scripts/source/136812.user.js
// @updateURL	https://userscripts.org/scripts/source/136812.user.js
// @description	Qwatchをキーボードで操作するGreaseMonkeyスクリプト
// ==/UserScript==

/*【更新履歴】
ver 4.0.1 (2012/10/31更新)
　巻き戻し/早送り時、0秒未満や総時間以上に移動しようとしてブラウザが固まる不具合を修正。
ver 4.0 (2012/10/29更新)
　「動画再生プレーヤー」フォーカス強制解除モードのON("B"キー)/OFF("N"キー)機能を追加。
　　→コメントを入力する場合は、"N"キーでフォーカス強制解除モードをOFFにしてください。
　　　フォーカス強制解除モードをONにする場合は、「動画再生プレーヤー」外をクリックして手動でフォーカスを外してから"B"キーを押して下さい。
　ショートカットキーを押した時の説明を左上に表示するようにした。
　巻き戻し/早送り(←/→)時、移動可能な秒数まで移動先をずらすように機能を変更。
　「動画再生プレーヤー」スクロール基準要素の初期値変更（QWatchへの対応。"playerContainerWrapper"）
ver.3.0 （2012/10/22更新)
　ニコニコQ(Qwatch)への対応
　コメント入力欄がswf要素になった(Qwatchでの仕様変更)ため、swfからの自動フォーカス解除機能をoffに変更(これをしないとコメントが入力できなくなる)。
　　→コメント入力やクリックでの動画プレイヤー操作後、ショートカットキーを有効にするためには動画プレーヤー(swf)外をクリックしてswfからフォーカスを外してください。
　動画情報(i)機能のデザイン崩れを修正。
　ショートカットキー[ctrl+PageUp/PageDown]でブラウザ側でのタブ移動を行った時にでも動画移動が発生していた不具合を修正。
ver.2.1　(2012/07/01更新)
　「もっと動画を見る」へスクロールする機能を追加(キー割り当てを変更(S)(D))。
　「動画再生プレーヤー」へスクロールする機能の不具合を修正。
　「動画再生プレーヤー」への自動スクロールコール部分に起因する不具合を修正。
ver.2.0　(2012/07/01更新)
　オプション設定画面、ヘルプ画面を追加。
ver.1.5　(2012/06/29更新)
　Chrome対応　(イベントの変更：DOMNodeInserted→DOMSubtreeModified、keypress→keydown。
　　　　　　　　スクリプトの挿入先の変更：location.href→<script>タグ)
ver.1.4.2　(2012/06/28更新)
プレイリスト上の動画移動時、チャンネル動画をまたぐと、動画情報(i)にユーザーお気に入りボタンが表示される問題を修正(スタイルシートに"!important"を追加)
次の動画、前の動画、でNicoPlayerConnectorまたはPlayerConfigが取得ができていない状態のときに、何もしないように変更。
ver.1.4.1　(2012/06/27更新)
　ページ更新を伴わない動画読み込み時の関数多重コールを防ぐための修正。
　namespaceの変更。
ver.1.4　(2012/06/26更新)
　ページ更新を伴わない動画読み込み時にも動画情報の内容が更新されるようにした。
　最初から動画情報を表示する機能を追加(SHOW_vInfo_ONLOAD　true:有効、false:無効)
　動画プレーヤの位置を基準にスクロールする機能(s)の実装
　ページ読み込み時や動画読み込み時に動画プレーヤの位置を基準に自動スクロールする機能を追加。
　　(AUTO_SCROLL true:有効、false:無効 SCROLL_VALUE:動画プレーヤより上に確保するスペースのピクセル数)
　ページ更新を伴わない動画読み込み時にも動画情報の内容が更新されるようにした。
　コメント表示非表示の切り替え(新方式)のキー割り当て(f)を削除
ver.1.3　(2012/06/25更新)
　画面左上にサムネイル、投稿日、再生コメントマイリスト数、投稿者名(チャンネル動画の場合はチャンネル名)を表示する機能の実装(i)
ver.1.2　(2012/06/24更新)
　ZeroWatch側の機能(c:コメント入力欄へのカーソル移動)に上書きされていた、コメントの表示非表示切り替え機能(旧方式)のキー割り当てを変更(v)
　コメントの表示非表示切り替え機能(新方式)の実装(f)
　スクリプト終了機能(q)の実装
ver.1.1　(2012/06/24更新)
　処理待ち、イベントリスナ登録の方法を変更。エラー強制終了時にイベントリスナを全て解除。
ver.1.0.3　(2012/06/23更新)
　ニコ生、Nsenで動作しないように@include文を修正。
ver.1.0.2　(2012/06/23更新)
　"text"タイプ以外の"INPUT"要素にフォーカスが当たっている場合でも、キーボード操作が無効になっていた不具合を修正。
vers.1.0.1(2012/06/23更新)
　flashplayerのフォーカスが外れない不具合を修正。
ver.1.0(2012/06/23更新) 
*/

function main() {
	(function (unsafeWindow) {
//		alert(window.location.host+":"+window.location.href);
		if (!window.location.host.match(/nicovideo.jp/)) {
//			alert("invalidhost");
			return;
		}

		var $ = function(name) { return document.querySelector(name); };


		// FLASHPlayer要素のElementID
		const FLVPLAYER_ID='external_nicoplayer'
		//動画プレーヤーにフォーカスされない機能のON/OFF(false:ON,true:OFF)
		const disable_blur = true; 

		const KEYCODE_EVENT = [
		{ f:play_pause, 	k:32 }, 		// space 一時停止/再生
		{ f:seekright,   	k:39 },			// Right 早送り
		{ f:seekleft,     	k:37 },			// Left 巻き戻し
		{ f:nextmovie, 	k:34 },			// PageDown 次の動画へ
		{ f:prevmovie, 	k:33 },			// PageUp 前の動画へ
		{ f:volumeup,   	k:38 },			// Up ボリュームを上げる
		{ f:volumedown, 	k:40 },			// Down ボリュームを下げる
		{ f:fullscreen,  	 	k:88 },			// x フルスクリーンモード/通常再生
		{ f:repeat,       	k:82 },			// r リピートON/OFF
								// c コメント入力欄へのカーソル移動(ZeroWatch側の機能)
		{ f:comment_visible_old,k:86 },		// v コメント表示非表示の切り替え(旧方式)
//		{ f:comment_visible,	k:70 },			// f コメント表示非表示の切り替え(新方式)
		{ f:mute,          	k:77 },			// m ミュートON/OFF
		{ f:time,           	k:84 },			// t 指定時間に移動
		{ f:function(){show_videoInfo.toggle_vInfo();},k:73 },
								// i 動画情報を左上に表示
		{ f:function(){autoScroll(false);},k:68 },	// d 「動画再生プレーヤー」にスクロールする
		{ f:function(){moremovieScroll();},k:83 },	// s 「もっと動画を見る」にスクロールする
		{ f:function(){NCfZ_OS_lS.setOptionSetting_toggle();},     	k:79 }, 
								// o オプション設定画面を開く
		{ f:function(){NCfZ_Hlp.toggle();},k:72 },	// h ヘルプを表示
		{ f:errorexit,     	k:81 }, 		// q イベントリスナを解除してスクリプトを強制終了
		{ f:auto_blur_on,     	k:66 }, 		// b 「動画再生プレーヤー」強制フォーカス機能を有効にする
		{ f:auto_blur_off,     	k:78 }, 		// n 「動画再生プレーヤー」強制フォーカス機能を有効にする
		];
		const CHARCODE_EVENT = [
		];
		const ESC_KeyCode = 27; 			// ESC 要素(コメント入力欄や検索入力欄など)からフォーカスを外すキー
		
//イベントリスナ登録用のクラス設定		
		function addedEvL(target, type,listener,useCapture) {
			this.target = target;
			this.type = type;
			this.listener = listener;
			this.useCapture = useCapture;
			
			this.removeEvL = function() {
				this.target.removeEventListener(this.type,this.listener,this.useCapture);
//				mes = this+"";
//				alert("removeEvL:"+mes);
			}
			this.toString = function() {
				return (this.target + " / " + this.type + "\n" + this.listener);
			}

			this.target.addEventListener(this.type,this.listener,this.useCapture);
			
		}
		
//		for(i in addedEvLs) {addedEvLs[i].removeEvL();}
		var addedEvLs = new Array();
//終端：イベントリスナ登録用のクラス設定

//オプション画面設定		
		const OptionSetting_List =[
			{
				key			:"NCfZ_NormalMove",
				default_value		:"10",
				name			:"←→で移動する秒数",
				detail			:"早送り・巻き戻しで移動する秒数。",
			},
			{
				key			:"NCfZ_CtrlMove",
				default_value		:"5",
				name			:"Ctrl+←→で移動する秒数",
				detail			:"〃",
			},
			{
				key			:"NCfZ_ShfitMove",
				default_value		:"30",
				name			:"Shift+←→で移動する秒数",
				detail			:"〃",
			},
			{
				key			:"NCfZ_SHOW_vInfo_ONLOAD",
				default_value		:"0",
				name			:"動画情報自動表示",
				detail			:"動画情報をページ更新時に自動的に表示する(有効：1、無効：0)。",
			},
			{
				key			:"NCfZ_vInfo_top_offset",
				default_value		:"36",
				name			:"動画情報位置(top)",
				detail			:"動画情報を表示するウインドウ上端からの位置(ピクセル)。",
			},
			{
				key			:"NCfZ_vInfo_left_offset",
				default_value		:"10",
				name			:"動画情報位置(left)",
				detail			:"動画情報を表示するウインドウ左端からの位置(ピクセル)。",
			},
			{
				key			:"NCfZ_AUTO_SCROLL",
				default_value		:"0",
				name			:"「動画再生プレーヤー」へ自動スクロール",
				detail			:"ページ更新時や動画読み込み時、「動画再生プレーヤー」の位置に自動的にスクロールします(有効：1、無効：0)。",
			},
			{
				key			:"NCfZ_PLAYERELEMENTID",
				default_value		:"playerContainerWrapper",
				name			:"「動画再生プレーヤー」スクロール基準要素",
				detail			:"「動画再生プレーヤー」スクロール時に基準となる要素をIDで指定。",
			},
			{
				key			:"NCfZ_SCROLL_VALUE",
				default_value		:"180",
				name			:"「動画再生プレーヤー」スクロール時のスペース",
				detail			:"「動画再生プレーヤー」スクロール時に基準要素の上に確保するスペースのピクセル数。",
			},
			{
				key			:"NCfZ_MoreMovie_ElementID",
				default_value		:"searchResultExplorer",
				name			:"「動画をもっと見る」スクロール基準要素",
				detail			:"「動画をもっと見る」スクロール時に基準となる要素をIDで指定。",
			},
			{
				key			:"NCfZ_MoreMovie_SCROLL_VALUE",
				default_value		:"196",
				name			:"「動画をもっと見る」スクロール時のスペース",
				detail			:"「動画をもっと見る」スクロール時に基準要素の上に確保するスペースのピクセル数。",
			},
			{
				key			:"NCfZ_FLVPLAYER_blur",
				default_value		:"1",
				name			:"「動画再生プレーヤー」のフォーカスを強制解除(有効の場合、コメント入力ができなくなります)",
				detail			:"ショートカットキーを機能させるため「動画再生プレーヤー」のフォーカスを強制的に解除します(有効：1、無効：0)。",
			},

/*
			{
				key			:"",
				default_value		:"",
				name			:"",
				detail			:"",
			},
*/			
		]
/*
		for (var i = 0; i < OptionSetting_List.length; i++) {
			alert("key:"+OptionSetting_List[i].key+"\ndefault_value:"+OptionSetting_List[i].default_value+"\nname:"+OptionSetting_List[i].name+"\ndetail:"+OptionSetting_List[i].detail);
		};
*/		

		const  OSp_additional_SS_rulelist = [
			"#NCfZ_OptionSetting_panel"
				+"{width:auto;height:auto;padding:5px;background-color:white;color:black;font-size:16px;"
				+"border:1px solid #888888;position:fixed;top:120px;left:10px;z-index:10002;opacity:1.0;}",
			"#NCfZ_OptionSetting_panel,.NCfZ_OptionSetting_line"
				+"{display:block;margin:5px;}",
			" .NCfZ_OptionSetting_line *"
				+"{display:inline-block;margin:5px;vertical-align:top;font-size:13px;}",
			" .NCfZ_OptionSetting_name"
				+"{width:180px;}",
			" .NCfZ_OptionSetting_value"
				+"{width:120px;}",
			" .NCfZ_OptionSetting_detail"
				+"{width:550px;}",

		]
//		alert (OSp_additional_SS_rulelist);
		var NCfZ_OS_lS = new OptionSetting_localStorage();
		function OptionSetting_localStorage(){
			this.elm_OptionSetting_panel = null;
			//メソッド定義
			this.setValue = function(key,value){
				localStorage.setItem(key,value);
			};
			this.getValue = function(key){
				return localStorage.getItem(key);
			};
			this.setDefaultSetting = function (){
				for (var i = 0; i < OptionSetting_List.length; i++) {
					var key = OptionSetting_List[i].key;
					var default_value = OptionSetting_List[i].default_value;
					var ls_value = this.getValue(key);
//					alert ("key:"+key+" localStoragevalue:"+ls_value);
					if (ls_value==null) {
//						alert("defaultset "+key);
						this.setValue(key, default_value); 
					}
					
				}
			};			
			this.clearSetting = function(){
				for (var i = 0; i < OptionSetting_List.length; i++) {
					localStorage.removeItem(OptionSetting_List[i].key);
				}
			};
			this.setOptionSetting_toggle = function(){
				if(this.elm_OptionSetting_panel==null) {
					this.setOptionSetting_show();
				}else{
					this.setOptionSetting_cancel();
				} 

			};
			this.setOptionSetting_show = function(){
				if(this.elm_OptionSetting_panel!=null) return;
				this.elm_OptionSetting_panel = document.createElement("div");
					this.elm_OptionSetting_panel.id = "NCfZ_OptionSetting_panel"
					this.elm_OptionSetting_panel.innerHTML = "Nicovideo Controller for Zero : オプション設定";

				for (var i = 0; i < OptionSetting_List.length; i++) {
					var elm_OptionSetting_line = document.createElement("dev");
						elm_OptionSetting_line.className = "NCfZ_OptionSetting_line";
					var elm_OptionSetting_name = document.createElement("dev");
						elm_OptionSetting_name.className = "NCfZ_OptionSetting_name";
						elm_OptionSetting_name.innerHTML = OptionSetting_List[i].name;
					var elm_OptionSetting_value = document.createElement("input");
						elm_OptionSetting_value.className = "NCfZ_OptionSetting_value";
						elm_OptionSetting_value.type = "text";
						elm_OptionSetting_value.id ="NCfZ_OptionSetting_key_"+OptionSetting_List[i].key;
						elm_OptionSetting_value.defaultValue = this.getValue(OptionSetting_List[i].key)
					var elm_OptionSetting_detail = document.createElement("dev");
						elm_OptionSetting_detail.className = "NCfZ_OptionSetting_detail";
						elm_OptionSetting_detail.innerHTML = ":"+OptionSetting_List[i].detail;
					
					elm_OptionSetting_line.appendChild(elm_OptionSetting_name);
					elm_OptionSetting_line.appendChild(elm_OptionSetting_value);
					elm_OptionSetting_line.appendChild(elm_OptionSetting_detail);
					this.elm_OptionSetting_panel.appendChild(elm_OptionSetting_line);
				}
				var elm_OptionSetting_button_save = document.createElement("input");
					elm_OptionSetting_button_save.type="button";
					elm_OptionSetting_button_save.value="設定保存";
					addedEvLs.push(new addedEvL(elm_OptionSetting_button_save,'click',function (){NCfZ_OS_lS.setOptionSetting_save();}, false));

				var elm_OptionSetting_button_cancel = document.createElement("input");
					elm_OptionSetting_button_cancel.type="button";
					elm_OptionSetting_button_cancel.value="キャンセル";
					addedEvLs.push(new addedEvL(elm_OptionSetting_button_cancel,'click',function (){NCfZ_OS_lS.setOptionSetting_cancel();}, false));

				var elm_OptionSetting_button_setdefault = document.createElement("input");
					elm_OptionSetting_button_setdefault.type="button";
					elm_OptionSetting_button_setdefault.value="設定初期化";
					addedEvLs.push(new addedEvL(elm_OptionSetting_button_setdefault,'click',function (){NCfZ_OS_lS.setOptionSetting_setdefault();}, false));

				this.elm_OptionSetting_panel.appendChild(elm_OptionSetting_button_save);
				this.elm_OptionSetting_panel.appendChild(elm_OptionSetting_button_cancel);
				this.elm_OptionSetting_panel.appendChild(elm_OptionSetting_button_setdefault);
				$('#content').parentNode.appendChild(this.elm_OptionSetting_panel);

			};
			this.setOptionSetting_save = function(){
//				alert("setOptionSetting_save");
				for (var i = 0; i < OptionSetting_List.length; i++) {
					var key = OptionSetting_List[i].key;
					var value_to_set = $('#'+"NCfZ_OptionSetting_key_"+key).value;
					this.setValue(key, value_to_set); 
				}

				this.elm_OptionSetting_panel.parentNode.removeChild(this.elm_OptionSetting_panel);
				this.elm_OptionSetting_panel=null;
//				alert("設定を保存しました。一部の設定はページ更新後に有効になります。");
				show_message("設定を保存しました。一部の設定はページ更新後に有効になります。","3000");

			};
			this.setOptionSetting_cancel = function(){
//				alert("setOptionSetting_cancel");
				this.elm_OptionSetting_panel.parentNode.removeChild(this.elm_OptionSetting_panel);
				this.elm_OptionSetting_panel=null;
			};
			this.setOptionSetting_setdefault = function(){
				this.clearSetting();
				this.setDefaultSetting();
				this.elm_OptionSetting_panel.parentNode.removeChild(this.elm_OptionSetting_panel);
				this.elm_OptionSetting_panel=null;
//				alert("設定を初期化しました。一部の設定はページ更新後に有効になります。");
				show_message("設定を初期化しました。一部の設定はページ更新後に有効になります。","3000");
			};

			//コンストラクタ
			this.setDefaultSetting();
//			alert("コンストラクタ　OSp_additional_SS_rulelist:"+OSp_additional_SS_rulelist);
			var OSp_add_SS = new additional_SS(OSp_additional_SS_rulelist);
			OSp_add_SS.add_rules();

		}
//終端：オプション画面設定		

//ヘルプ画面設定
		const NCfZ_Help_List =[
			{
				shortcut_key		:"[space]",
				detail			:"一時停止/再生",
			},
			{
				shortcut_key		:"[Left] / [Right]",
				detail			:"巻き戻し / 早送り ([Ctrl]+ [Shift]+ 、移動する秒数はオプションで設定。)",
			},
			{
				shortcut_key		:"[Alt]+　　　[Left] / [Right]",
				detail			:"動画の最初へ移動 / 最後へ移動",
			},
			{
				shortcut_key		:"[PageUp] / [PageDown]",
				detail			:"前の動画へ / 次の動画へ",
			},
			{
				shortcut_key		:"[Up] / [Down]",
				detail			:"ボリュームを上げる / ボリュームを下げる",
			},
			{
				shortcut_key		:"X",
				detail			:"フルスクリーンモード/通常モードの切替",
			},
			{
				shortcut_key		:"R",
				detail			:"リピートON/OFFの切替",
			},
/*			{
				shortcut_key		:"C",
				detail			:"コメント入力欄へのカーソル移動(ZeroWatch側の標準機能)",
			},
*/			{
				shortcut_key		:"V",
				detail			:"コメント表示/非表示の切替",
			},
			{
				shortcut_key		:"M",
				detail			:"ミュートON/OFFの切替",
			},
			{
				shortcut_key		:"T",
				detail			:"指定時間に移動する",
			},
			{
				shortcut_key		:"I",
				detail			:"動画情報を左上に表示(表示位置の調整はオプションで設定)",
			},
			{
				shortcut_key		:"D",
				detail			:"「動画再生プレーヤー」へスクロール(スクロールする位置はオプションで設定)",
			},
			{
				shortcut_key		:"S",
				detail			:"「もっと動画を見る」へスクロール(スクロールする位置はオプションで設定)",
			},
			{
				shortcut_key		:"O",
				detail			:"オプション設定画面を開く",
			},
			{
				shortcut_key		:"H",
				detail			:"ヘルプ表示/非表示の切替",
			},
			{
				shortcut_key		:"[ESC]",
				detail			:"(検索入力欄などの)ショートカットキーが効かなくなる要素からフォーカスを外す",
			},
			{
				shortcut_key		:"Q",
				detail			:"Nicovideo Controller for Zeroスクリプトを終了する",
			},
			{
				shortcut_key		:"B",
				detail			:"「動画再生プレーヤー」強制フォーカス機能を有効にする(コメント入力ができなくなります)",
			},
			{
				shortcut_key		:"N",
				detail			:"「動画再生プレーヤー」強制フォーカス機能を有効にする(コメント入力が可能になりますが、ショートカットキーを使う場合はプレーヤー外クリックでフォーカスを外す必要があります)",
			},
/*
			{
				shortcut_key		:"",
				detail			:"",
			},
*/
		]

		const  NCfZ_Help_additional_SS_rulelist = [
			"#NCfZ_Help_panel"
				+"{width:auto;height:auto;padding:5px;background-color:white;color:black;font-size:16px;"
				+"border:1px solid #888888;position:fixed;top:120px;left:10px;z-index:10003;opacity:1.0;}",
			"#NCfZ_Help_panel,.NCfZ_Help_line"
				+"{display:block;margin:5px;}",
			" .NCfZ_Help_line *"
				+"{display:inline-block;margin:5px;vertical-align:top;font-size:13px;}",
			" .NCfZ_Help_shortcut_key"
				+"{width:100px;}",
			" .NCfZ_Help_detail"
				+"{width:550px;}",

		]

		var NCfZ_Hlp = new NCfZ_Help();
		function NCfZ_Help(){
			this.elm_Help_panel = null;
			//メソッド定義
			this.toggle =function (){
				if(this.elm_Help_panel==null){
					this.show();
				}else{
					this.hide();
				}
			};

			this.show = function(){
				if(this.elm_Help_panel!=null) return;
				this.elm_Help_panel = document.createElement("div");
					this.elm_Help_panel.id = "NCfZ_Help_panel"
					this.elm_Help_panel.innerHTML = "Nicovideo Controller for Zero : ヘルプ (\"H\"キーで閉じます)";

				for (var i = 0; i < NCfZ_Help_List.length; i++) {
					var elm_Help_line = document.createElement("dev");
						elm_Help_line.className = "NCfZ_Help_line";
					var elm_Help_shortcut_key = document.createElement("dev");
						elm_Help_shortcut_key.className = "NCfZ_Help_shortcut_key";
						elm_Help_shortcut_key.innerHTML = NCfZ_Help_List[i].shortcut_key;
					var elm_Help_detail = document.createElement("dev");
						elm_Help_detail.className = "NCfZ_Help_detail";
						elm_Help_detail.innerHTML = ":"+NCfZ_Help_List[i].detail;
					
					elm_Help_line.appendChild(elm_Help_shortcut_key);
					elm_Help_line.appendChild(elm_Help_detail);
					this.elm_Help_panel.appendChild(elm_Help_line);
				}

				$('#content').parentNode.appendChild(this.elm_Help_panel);

			};
			this.hide = function(){
//				alert("setHelp_cancel");
				this.elm_Help_panel.parentNode.removeChild(this.elm_Help_panel);
				this.elm_Help_panel=null;
			};

			//コンストラクタ
//			alert("コンストラクタ　NCfZ_Help_additional_SS_rulelist:"+NCfZ_Help_additional_SS_rulelist);
			var NCfZ_Help_add_SS = new additional_SS(NCfZ_Help_additional_SS_rulelist);
			NCfZ_Help_add_SS.add_rules();
		}
//終端：ヘルプ画面設定
		
		
		
//		alert("flg_errorexit="+flg_errorexit);
//		alert("add_lsn_load実行")

		var titleArea = $('#outline #videoInfo #videoInfoHead .videoInformation #videoTitle');

		addedEvLs.push(new addedEvL(window,'load',function (){lsn_load()}, false));
//		alert("addedEvLs[0]:"+addedEvLs[0])
		addedEvLs.push(new addedEvL(window,'unload',function (){lsn_unload()}, false));

		// ページ更新を伴わない動画読み込み時のイベント処理　下部の動画タイトルエリアの要素追加イベントによって動画読み込みを感知

		var func_in_queue_tA_DOMNI = false; //DOMNodeInsertedイベント多発による関数重複コールを防ぐフラグ
		var moive_title = ""　 //最初のページ読み込み時はlsn_load() でセットする。
		addedEvLs.push(new addedEvL(titleArea, 'DOMSubtreeModified', function () {

			if (func_in_queue_tA_DOMNI) return;
			func_in_queue_tA_DOMNI = setTimeout(
				function wait_titleloaded() {
					// 実際に新しい動画のタイトルがセットされるまで待機
					if (titleArea.innerHTML && titleArea.innerHTML != moive_title) {
						moive_title = titleArea.innerHTML;
						setTimeout(on_ChangeMovie, 0);
						func_in_queue_tA_DOMNI = false;
					} else {
						setTimeout(wait_titleloaded, 500);
						func_in_queue_tA_DOMNI = true;
					}
				}
			, 500);
		}, true));


		//		alert("addedEvLs[0]:"+addedEvLs[0])

		function lsn_load() {
//			alert(window.location.host);
			moive_title = titleArea.innerHTML;
			add_lsn_keypress();
			add_lsn_keydown();
			lsn_FLVLoaded();
//			alert("parseInt(NCfZ_OS_lS.getValue(\"NCfZ_SHOW_vInfo_ONLOAD\")):"+parseInt(NCfZ_OS_lS.getValue("NCfZ_SHOW_vInfo_ONLOAD")));
			if (parseInt(NCfZ_OS_lS.getValue("NCfZ_SHOW_vInfo_ONLOAD"))) {
//				alert("show_videoInfo.show_vInfo();");
				show_videoInfo.show_vInfo();
			}
		}

		function add_lsn_keypress() {
			addedEvLs.push(new addedEvL(document, 'keypress', function (e) {
				ls_keypress(e)
			}, false));

			function ls_keypress(e) {
				return
			};
		};

		function add_lsn_keydown() {
			addedEvLs.push(new addedEvL(document, 'keydown', function (e) {
				ls_keydown(e)
			}, false));
			//				document.addEventListener('keypress', function (e){ls_keypress(e)}, false);

			function ls_keydown(e) {
				//			alert("ls_keypress_start");
				var keyCode = e.keyCode;
				var charCode = e.charCode;
//				alert("keyCode:"+keyCode+"\ncharCode:"+charCode);    //KeyCodeを調べるときはこの行のコメントアウトを外してチェック
				// 入力されたキーがESC_KeyCodeだった場合は、アクティブエレメントのフォーカスを外して終了。
				var element = (document.activeElement || window.getSelection().focusNode);
				if (keyCode == ESC_KeyCode || charCode == ESC_KeyCode) {
					element.blur();
					show_message("文字入力欄のフォーカスを解除しました。","1000");
					return;
				}
				// INPUTタグにフォーカスが当たっている場合は終了。
				var tag = element.tagName;
				var type = element.type;
				if (tag == "INPUT" && type == "text") return;

				for (var i = 0; i < KEYCODE_EVENT.length; i++) {
					if (keyCode == KEYCODE_EVENT[i].k) {
						KEYCODE_EVENT[i].f(e);
						e.preventDefault();
						e.stopPropagation();
						break;
					}
				}

				for (i = 0; i < CHARCODE_EVENT.length; i++) {
					if (charCode == CHARCODE_EVENT[i].k) {
						CHARCODE_EVENT[i].f(e);
						e.preventDefault();
						e.stopPropagation();
						break;
					}
				}

			}

		}

		function lsn_FLVLoaded() {
			//					autoPlay();
			//					alert("FLVload!");
			// FLVPLAYER取得
			getFlvplayer();
//			alert("after:getFlvplayer() FLVPLAYER:"+FLVPLAYER);
			// flashplayerにフォーカスが合わないようにする。
//			alert("bf_addEvLs_focus")
			wait_FlvPloaded(function () {
				addedEvLs.push(new addedEvL(FLVPLAYER, 'focus', function () {
					blur_FLVP();
				}, true));
			}, 500);

			function blur_FLVP() {
				if (parseInt(NCfZ_OS_lS.getValue("NCfZ_FLVPLAYER_blur"))) setTimeout(function () {
					FLVPLAYER.blur();
					show_message("「動画再生プレーヤー」のフォーカスを解除しました。コメント入力を入力する場合は\"N\"でこの機能を無効にして下さい。","1000");
//					alert("FLVPLAYER.blur!");
				}, 500);

			}

			//_NicoPlayerConnector, _PlayerConfig取得
			getNPConnector();
//			alert("after:getNPConnector()\n _NicoPlayerConnector:"+_NicoPlayerConnector+"\n _PlayerConfig:"+_PlayerConfig);
			setTimeout(function(){autoScroll(true);}, 0);
//			alert("lsn_FLVLoaded() end");

		}
			
		function on_ChangeMovie()
		{
//			alert("on_ChangeMovie()");
			show_videoInfo.refresh_vInfo();
			setTimeout(function(){autoScroll(true);}, 0);
		}

			

		function nextmovie(e)
		{
			if(e.ctrlKey|e.altKey|e.shiftKey) return;
			if(!getNPConnector()) return;
			_NicoPlayerConnector.playNextVideo();
			show_message("次の動画へ移動します。","1000");

		}
		function prevmovie(e)
		{
			if(e.ctrlKey|e.altKey|e.shiftKey) return;
			if(!getNPConnector()) return;
			_NicoPlayerConnector.playPreviousVideo();
			show_message("前の動画へ移動します。","1000");
		}

		function autoScroll(isAUTO)
		{
			if(isAUTO && !parseInt(NCfZ_OS_lS.getValue("NCfZ_AUTO_SCROLL"))) return;
//			alert(" autoScroll() ");
			do_scroll(parseInt(NCfZ_OS_lS.getValue("NCfZ_SCROLL_VALUE")));
		
		}
		function do_scroll(offsetpx){
//				alert(" do_scroll() "+"offsetTop:"+offsetTop+" offsetpx:"+offsetpx);
				var offsetTop = document.getElementById(NCfZ_OS_lS.getValue("NCfZ_PLAYERELEMENTID")).offsetTop
				window.scrollTo(0,offsetTop - offsetpx);
				show_message("「動画再生プレーヤー」へスクロールしました。","1000");


		}

		function moremovieScroll()
		{
				var offsetTop = document.getElementById(NCfZ_OS_lS.getValue("NCfZ_MoreMovie_ElementID")).offsetTop;
				var offsetpx =	parseInt(NCfZ_OS_lS.getValue("NCfZ_MoreMovie_SCROLL_VALUE"));
//				alert(" moremovieScroll "+"offsetTop:"+offsetTop+" offsetpx:"+offsetpx);
				window.scrollTo(0,offsetTop - offsetpx);
				show_message("「動画をもっと見る」へスクロールしました。","1000");
		}
		
/*
		function autoPlay()
		{
			if(!getFlvplayer()) return;
//			alert(FLVPLAYER);
//			alert("bf_autoplay");
			if(AUTO_PLAY)
			{
//				alert("auto_play");
				setTimeout(function play()
				{
					var status = FLVPLAYER.ext_getStatus();
//					alert(status);
					if(status == "paused" || status == "stopped" || status == "end"){
						FLVPLAYER.ext_play(1);
						if(status == "playing")
							return;
						else setTimeout(play, 500);
					}else if(status == "playing")
						return;
					else
						setTimeout(play, 500);
				},500);
			}
		}
*/		

			function play_pause(e)
		{
			if(!getFlvplayer()) return;

			var status = FLVPLAYER.ext_getStatus();
			
			if(status == "paused" || status == "stopped" || status == "end"){
				FLVPLAYER.ext_play(1);
				show_message("再生","1000");
			}else if(status == "playing"){
				FLVPLAYER.ext_play(0);
				show_message("一時停止","1000");
			}
		}
		
		function volumeup(e)
		{
			if(!getFlvplayer()) return;
			FLVPLAYER.ext_setVolume(volume(FLVPLAYER.ext_getVolume() + 5));
			show_message("ボリュームを上げる","1000");
		}
		
		function volumedown(e)
		{
			if(!getFlvplayer()) return;
			FLVPLAYER.ext_setVolume(volume(FLVPLAYER.ext_getVolume() - 5));
			show_message("ボリュームを下げる","1000");
		}
		
		function volume(v)
		{
			if(v > 100) 
				return 100;
			else if(v < 0) 
				return 0;
			else 
				return v;
		}
		
		function seekright(e)
		{
			if(!getFlvplayer()) return;

			var time_to_set = null;
			var base_time = FLVPLAYER.ext_getPlayheadTime()
			var total_time = FLVPLAYER.ext_getTotalTime();
			if(e.altKey)
				time_to_set=total_time;
			else if(e.shiftKey)
				time_to_set=seek(base_time + parseInt(NCfZ_OS_lS.getValue("NCfZ_ShfitMove")), total_time);
			else if(e.ctrlKey)
				time_to_set=seek(base_time + parseInt(NCfZ_OS_lS.getValue("NCfZ_CtrlMove")), total_time);
			else
				time_to_set=seek(base_time + parseInt(NCfZ_OS_lS.getValue("NCfZ_NormalMove")), total_time);
			
			var plus_time = 0;
			var time_to_set_act
			while(true){
				time_to_set_act = time_to_set+plus_time;
				FLVPLAYER.ext_setPlayheadTime(time_to_set_act);
				show_message("移動先："+time_format(time_to_set_act,0)
//						+" 実際の移動先："+time_format(FLVPLAYER.ext_getPlayheadTime(),0)
//						+" 判定基準："+time_format((time_to_set+base_time)/2,0)	
					,1000);
				if (FLVPLAYER.ext_getPlayheadTime()>(time_to_set+base_time)/2|time_to_set_act<=0|time_to_set_act>=total_time) break;
//				show_message("設定時間："+(time_to_set+plus_time)+" plus_time:"+plus_time,1000);
				plus_time=plus_time+2;
			}
			
		}
		
		function seekleft(e)
		{
			if(!getFlvplayer()) return;
			
			var time_to_set = null;
			var base_time = FLVPLAYER.ext_getPlayheadTime()
			var total_time = FLVPLAYER.ext_getTotalTime();
			if(e.altKey)
				time_to_set=0;
			else if(e.shiftKey)
				time_to_set=seek(base_time - parseInt(NCfZ_OS_lS.getValue("NCfZ_ShfitMove")), total_time);
			else if(e.ctrlKey)
				time_to_set=seek(base_time - parseInt(NCfZ_OS_lS.getValue("NCfZ_CtrlMove")), total_time);
			else
				time_to_set=seek(base_time - parseInt(NCfZ_OS_lS.getValue("NCfZ_NormalMove")), total_time);
			
			var plus_time = 0;
			var time_to_set_act;			
			while(true){
				time_to_set_act = time_to_set-plus_time;
				FLVPLAYER.ext_setPlayheadTime(time_to_set_act);
				show_message("移動先："+time_format(time_to_set_act,0)
//						+" 実際の移動先："+time_format(FLVPLAYER.ext_getPlayheadTime(),0)
//						+" 判定基準："+time_format((time_to_set+base_time)/2,0)
					,1000);
				if (FLVPLAYER.ext_getPlayheadTime()<(time_to_set+base_time)/2|time_to_set_act<=0|time_to_set_act>=total_time) break;
//				show_message("設定時間："+(time_to_set+plus_time)+" plus_time:"+plus_time,1000);
				plus_time=plus_time+2;
			}
		}
		
		function seek(cur, total)
		{
			if(cur > total )
				return total;
			else if(cur < 0)
				return 0;
			else
				return cur;
		}
		
		function fullscreen(e)
		{
			if(!getFlvplayer()) return;
			
			if(FLVPLAYER.ext_getVideoSize() == "fit")
			{
				FLVPLAYER.ext_setVideoSize("normal");
				show_message("フルスクリーンモードを解除","1000");
			}
			else if(FLVPLAYER.ext_getVideoSize() == "normal")
			{
				FLVPLAYER.ext_setVideoSize("fit");
				show_message("フルスクリーンモードへ移行","1000");
			}
		}
		
		function repeat(e)
		{
			if(!getFlvplayer()) return;
			
			if(FLVPLAYER.ext_isRepeat() == true)
			{
				FLVPLAYER.ext_setRepeat(false);
				show_message("リピート再生を無効にしました。","1000");
			}
			else if(FLVPLAYER.ext_isRepeat() == false)
			{
				FLVPLAYER.ext_setRepeat(true);
				show_message("リピート再生を有効にしました。","1000");
			}

		}
		
		function comment_visible_old(e)
		{
//			alert("comment_visible_old");
			if(!getFlvplayer()) return;
			
			if(FLVPLAYER.ext_isCommentVisible() == true)
			{
				FLVPLAYER.ext_setCommentVisible(false);
				show_message("コメント表示OFF","1000");
			}
			else if(FLVPLAYER.ext_isCommentVisible() == false)
			{
				FLVPLAYER.ext_setCommentVisible(true);
				show_message("コメント表示ON","1000");
			}
		}

		function comment_visible(e)
		{
//			alert("comment_visible");
			if(!getNPConnector()) return;
			if(_PlayerConfig.commentVisible==true){
				_PlayerConfig.commentVisible=false;
				show_message("コメント表示OFF","1000");
				//e.target.setAttribute("on","on");
			}else{
				_PlayerConfig.commentVisible=true;
				show_message("コメント表示ON","1000");
				//e.target.removeAttribute("on");
			}
			_NicoPlayerConnector.updatePlayerConfig(_PlayerConfig);
		}

		function mute(e)
		{
			if(!getFlvplayer()) return;
			
			if(FLVPLAYER.ext_isMute() == true)
			{
				FLVPLAYER.ext_setMute(false);
				show_message("ミュートを解除しました。","1000");
			}
			else if(FLVPLAYER.ext_isMute() == false)
			{
				FLVPLAYER.ext_setMute(true);
				show_message("ミュートにしました。","1000");
			}
		}
		
		function time(e)
		{
			if(!getFlvplayer()) return;
			
			var now_time_sec = FLVPLAYER.ext_getPlayheadTime();
			var now_time_ms = Math.floor(now_time_sec / 60) + ":" + Math.floor(now_time_sec % 60);
			while(true){
				var input_time = window.prompt("移動先の時間を入力(形式 m:s)" , now_time_ms);
				if (input_time==null) {
					return;
				}
				if (input_time.match(/[0-9]+:[0-9]+/)){
					break;
				}else {
					alert("入力された形式が正しくありません(形式 m:s)");
				}
				
			} 
			var input_time_array = input_time.split(":");
			FLVPLAYER.ext_setPlayheadTime(seek(Number(input_time_array[0])* 60 + Number(input_time_array[1]), FLVPLAYER.ext_getTotalTime()));
		}

		function auto_blur_on(e)
		{
			NCfZ_OS_lS.setValue("NCfZ_FLVPLAYER_blur","1");
			show_message("「動画再生プレーヤー」強制フォーカス機能を有効にしました。","3000");
		}
		
		function auto_blur_off(e)
		{
			NCfZ_OS_lS.setValue("NCfZ_FLVPLAYER_blur","0");
			show_message("「動画再生プレーヤー」強制フォーカス機能を無効にしました。","3000");
		}
		

		var vInfo = null;
		var vInfo_add_SS =null;
		
		var show_videoInfo = new show_videoInfo_func ();		
		function show_videoInfo_func (){
			this.toggle_vInfo=function (){
				if(vInfo==null){
					this.show_vInfo();
					show_message("「動画情報」表示ON","1000");

				}else{
					this.hide_vInfo();
					show_message("「動画情報」表示OFF","1000");
				}
			};
			this.refresh_vInfo=function (){
//				alert("refresh_vInfo");
				if(vInfo!=null){
					this.hide_vInfo();
//					alert("hide_vInfo");
					this.show_vInfo();
//					alert("show_vInfo");
				}
			};

					
			this.show_vInfo=function (){

			var  vInfo_additional_SS_rulelist=[
					"#vInfo"
						+"{position:fixed !important; top:"+parseInt(NCfZ_OS_lS.getValue("NCfZ_vInfo_top_offset"))+"px !important;left:"+parseInt(NCfZ_OS_lS.getValue("NCfZ_vInfo_left_offset"))+"px !important;width:680px !important;"
						+"margin:0px !important;padding:5px !important;border:1px solid #333333 !important;background-color:#DFDFDF !important;z-index:10001 !important;}",
					"#vInfo #videoInfoHead"
//						+"{width:450px !important;margin:0px !important;padding:0px !important;}",
						+"{max-width:450px !important;width:100% !important;margin:0px !important;padding:0px !important;}",
					"#vInfo #videoTitle,#vInfo .videoThumb,#vInfo .videoInformation"
						+"{display:block !important;}",
					"#vInfo .videoInformation"
						+"{max-width:350px}",
					"#vInfo .videoInformation > span,#vInfo .videoEditMenu,#vInfo #hiddenUserProfile,#vInfo .dicIcon"
						+"{display : none !important;}",
					"#vInfo .videoThumb #videoThumbnailImage"
						+"{height:60px !important;width:80px !important;margin:5px !important;}",
					"#vInfo #videoTitle"
						+"{font-size:100% !important;max-width:350px !important;width:auto !important;}",
					"#vInfo #videoInfoHead,#vInfo .videoThumb,#vInfo .videoInformation,#vInfo .videoInformation #videoStats li"
						+"{float:left !important;}",
					"#vInfo .videoInformation #videoStats li"
						+"{margin:5px 5px !important;}",

//					"#vInfo #videoInfoHead, #vInfo #userProfile,#vInfo .ch_prof"
//						+"{display:inline-block;}",

					"#vInfo #userProfile,#vInfo .ch_prof"
						+"{width:auto !important;float:left !important;}",
					"#vInfo .userIconContainer,#vInfo .profile"
						+"{float:left !important;}",
					"#vInfo #userProfile .profile .favVideoOwner,#vInfo #userProfile .profile p"
						+"{display : none !important ;}",
					"#vInfo .userIconContainer"
						+"{margin:5px !important;}",
					"#vInfo #userProfile .profile,#vInfo .ch_prof .info"
						+"{max-width:145px !important;width:145px !important;}",
					"#vInfo #userProfile .profile .userName,#vInfo .ch_prof .info *"
						+"{color:#099EF9 !important;}"
			]

				vInfo_add_SS = new additional_SS(vInfo_additional_SS_rulelist);
				vInfo_add_SS.add_rules();

				vInfo = document.createElement("div");
				vInfo.id = 'vInfo';
				$('#content').parentNode.appendChild(vInfo);
//				alert("ap_vInfo");
				
				if($('#outline #videoInfoHead'))vInfo.appendChild($('#outline #videoInfoHead').cloneNode(true));
				$('#vInfo #videoInfoHead').insertBefore($('#vInfo .videoThumb'), $('#vInfo #videoInfoHead').firstChild);
//				alert("vInfo_vh_set");

				if($('#outline #userProfile'))vInfo.appendChild($('#outline #userProfile').cloneNode(true));
				if($('#outline .ch_prof'))vInfo.appendChild($('#outline .ch_prof').cloneNode(true));
				
//				vInfo.appendChild($('#content #videoMenuTopList').cloneNode(true));
			};
			this.hide_vInfo=function (){
				vInfo.parentNode.removeChild(vInfo);
				vInfo = null;
				vInfo_add_SS.remove_rules();
			};
		}

		function additional_SS( style_rulelist ){
			this.style_rulelist=style_rulelist;
//			alert(this.style_rulelist);
//			if (isMSIE) {  // for IE8, Sleipnir
//			      this.stylesheet = document.createStyleSheet();
//			} else {  // for FireFox, Opera, Safari, Crome
			      var head = document.getElementsByTagName('head')[0];
//			      if (head == null) { return()};
			      this.style = document.createElement('style');
			      head.appendChild(this.style);
			      this.stylesheet = this.style.sheet;
//			}
//			alert("this.stylesheet"+this.stylesheet)

			this.add_rules=function (){
				for (i in this.style_rulelist){
//					alert("for count:"+i);
					this.stylesheet.insertRule(style_rulelist[i], this.stylesheet.cssRules.length); 
//					alert(this.stylesheet.cssRules[i].cssText);
				}
			};
			this.remove_rules=function (){
				this.style.parentNode.removeChild(this.style);
			};
		}
		

		function show_message(msg,msec)
		{
			var show_msg_additional_SS_rulelist=[
				"#show_msg"
					+"{font-size:14px !important; position:fixed !important; top:0px !important;left:0px !important;width:auto !important;"
					+"margin:0px !important;padding:5px !important;border:1px solid #333333 !important;background-color:#DFDFDF !important;z-index:10005 !important;}"
			];

			var elm_msg = document.createElement("div");
			elm_msg.id = 'show_msg';
			
			show_msg_add_SS = new additional_SS(show_msg_additional_SS_rulelist);
			show_msg_add_SS.add_rules();
			elm_msg.innerHTML = msg;

			$('#content').parentNode.appendChild(elm_msg);
			
			setTimeout(function (){
				elm_msg.parentNode.removeChild(elm_msg);
				elm_msg = null;
				show_msg_add_SS.remove_rules();
				},msec);
//			alert("show_msg");
		}

		function time_format(sec,fix) {
			//sec=秒数 fix=小数桁数
			var ts = sec.toFixed(fix); //小数点以下の調整 
			var tm = Math.floor(ts / 60); //秒数切り捨て 
			ts = ts % 60; //60秒未満の秒数 
//			var th = Math.floor(tm / 60); //分の切り捨て 
//			tm = tm % 60; //60分未満の分数 
			//表示の整形 (*6)
			if (ts < 10) ts = "0" + ts;
//			if (tm < 10) tm = "0" + tm;
//			if (th < 10) th = "0" + th;
//			return th + ":" + tm + ":" + ts; //文字列を返す 
			return tm + ":" + ts; //文字列を返す 
		}

		var FLVPLAYER = null;
		function getFlvplayer()
		{
			if (flg_errorexit) return false;
			if(FLVPLAYER==null || FLVPLAYER.id!=FLVPLAYER_ID)
			{
				return getFlvp(0,200);
			}else{
//				alert("elseok");
				return true;
			}
		
				function getFlvp (count,msec) {
					if (flg_errorexit) return false;
					count++;
					try{
						FLVPLAYER = unsafeWindow.document.getElementById(FLVPLAYER_ID);
//						FLVPLAYER = unsafeWindow.document.getElementById("errortest");
//						alert("FLVPLAYER.id:"+FLVPLAYER.id);

						if (FLVPLAYER!=null && FLVPLAYER.id==FLVPLAYER_ID){
//							alert("flvok" + count + "回目");
							return true;
						}else{
							throw "notget"
						}

					}catch(e){
//						alert("getFlvp_error:"+e);
//						alert("getFlvp:" + count + "回目終了");
						if(!(count<5)){
//							alert("flvng:"+ count + "回試行");
							alert("Flashplayerの要素(ID:" + FLVPLAYER_ID + ")が取得できませんでした。\nスクリプトを終了します。");
							errorexit();
							return false;
						}
						setTimeout(function (){getFlvp(count,msec)},msec);
						return false;
					}
				}
		}

		var _NicoPlayerConnector = null; //WatchApp.namespace.model.player.NicoPlayerConnector
		var _PlayerConfig = null;              //WatchApp.namespace.model.player.NicoPlayerConnector.getPlayerConfig()
		function getNPConnector(){
				if (flg_errorexit) return false;
				return getNPC(0,500);
		
				function getNPC (count,msec) {
					if (flg_errorexit) return false;
					count++;
//					alert("getNPC");
					try{
						_NicoPlayerConnector = WatchApp.namespace.model.player.NicoPlayerConnector;
//						alert("_NicoPlayerConnector:"+_NicoPlayerConnector);
//						alert( " _NicoPlayerConnector.getPlayerConfig:"+_NicoPlayerConnector.getPlayerConfig);
						_PlayerConfig = _NicoPlayerConnector.getPlayerConfig(); 
//						alert("_PlayerConfig:"+_PlayerConfig);

						if (_NicoPlayerConnector!=null && _PlayerConfig!==null){
//							alert("npcok" + count + "回目");
							return true;
						}else{
							throw "notget"
						}
					}catch(e){
//						alert("getNPC_error:"+e);
//						alert("getNPC:" + count + "回目終了");
						if(!(count<10)){
//							alert("npcng"+ count + "回試行");
							alert("NicoPlayerConnectorまたはPlayerConfigが取得できませんでした。\nスクリプトを終了します。");
							errorexit();
							return false;
						}
					
						setTimeout(function (){getNPC(count,msec)},msec);
						return false;
					}
				}
		}

		function wait_readyState(func,msec){
			if (flg_errorexit) return false;
//			alert(document.readyState);
//			if (document.readyState.match(/complete|interactive/i)){
			if (document.readyState.match(/complete/i)){
//				alert("load_complete:" + "func実行");
//				alert("load_"+document.readyState+":" + func.toString() + "実行");
				func();
				return true;
			}else{
//				alert("notcompleted");
//				alert("load_"+document.readyState+":wait_readyState再実行");
				setTimeout(function (){wait_readyState(func)},msec);
				return false;
			}
		}
		function wait_FlvPloaded(func,msec){
			if (flg_errorexit) return false;
//			alert("wait_FlvPloaded,msec="+msec);
			if (getFlvplayer()){
//				alert("getFlvplayer()=true:" + "func実行");
				func();
				return true;
			}else{
//				alert("getFlvplayer()=false:wait_FlvPloaded再実行");
				setTimeout(function (){wait_FlvPloaded(func)},msec);
				return false;
			}
		}


		function _sleep(time){
			var d1 = new Date().getTime();
			var d2 = new Date().getTime();
			while( d2 < d1 + time ){
				d2=new Date().getTime();
			}
		}
		
		function lsn_unload(){
//			alert("lsn_unload() start\naddedEvLs: "+addedEvLs); 
			for(i in addedEvLs) {addedEvLs[i].removeEvL();}
			addedEvLs=null;
//			alert("lsn_unload() end\naddedEvLs: "+addedEvLs); 
		}
		
		var flg_errorexit = false;
		function errorexit(){
//			alert("error_exit");
			for(i in addedEvLs) {addedEvLs[i].removeEvL();}
			addedEvLs=null;
			flg_errorexit =true;
			alert("イベントリスナを全て解除して\nNicovideo Controller for Zeroスクリプトを終了しました。");

			throw "exit";
		}

	})(this.unsafeWindow || window)
}; 
var script = window.document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
script.charset="utf-8";
window.document.body.appendChild(script);