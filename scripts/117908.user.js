// ==UserScript==
// @id             Change_search_result_for_Google@noi
// @name           Change search result for Google
// @version        1.9
// @copyright      Noi & Noisys & NoiSystem & NoiProject
// @license        https://creativecommons.org/licenses/by-nc-sa/3.0/
// @author         noi
// @description    googlの検索結果を消したり変えたりする
// @include        http*.google.*
// @namespace      http://www.userscripts.org/scripts/show/117908
// @require        http://userscripts.org/scripts/source/49700.user.js
// @updateURL      http://userscripts.org/scripts/source/117908.user.js
// @run-at         document-end
// ==/UserScript==

/*=====================================================================================================================
*************************************************************************
***注意:文字コードはUFT-8で保存してくださいNotice for 2byte Charactor ***
*************************************************************************

===解説(Read me)===

・Googleの検索結果を非表示にする機能(Hide the search result by google)
・Googleの検索結果のURLを変更する機能(Change the search result's URL by google)


[非表示について(about to hide)]-----------------------------------------------------------------------------
===例文For example===
ex)"hogehoge"と"wiki"が両方共あって、"jp"か"com"のどちらともなかったら検索結果を消す
   (Hit "hogehoge" and "wiki" ,And still "jp" or "com" are not included.Hide result)

		{ NGword : ["hogehoge","wiki"], ignore : ["jp","com"]},

===ヒント(hint)===
・項目は複数指定が可能(Items can be increased)
・NGwordはand条件です("NGword" is AND condition)
・ignoreはor条件です("ignore" is OR condition)
・""のように文字を指定しない場合は無視されます("" is ignored)
・日本語で検索できるので嫌いな単語が含まれたら消すことが出来ます。
  (Can search for Japanese)


[URL置換について(about to change URL)]----------------------------------------------------------------------
===例文For example===
ex)"www.hogehoge.com"を"hogehoge.com"にする
   (Change "www.hogehoge.com" to "hogehoge.com")
		{ before : "www.hogehoge.com", after : "hogehoge.com" },

ex)"hogehoge"を消す
   (Delete "hogehoge")
		{ before : "hogehoge", after : "" },

ex)"ぬるぽ"を"ガッ"にする
   (Change "ぬるぽ" to "ガッ". for 2byte charactor.)
		{ before : "ぬるぽ", after : "ガッ" },

===ヒント(hint)===
・項目は1つだけなので増やせません(Only one item. Can not be added)
・beforeは検索用のURLです("before" is search URL)
・afterは変換後のURLです("after" is changed URL)
・beforeで""のように文字を指定しない場合は無視されます("" is ignored in before)
・どちらも日本語で指定するとURL表記に変更されます。※パーセントエンコードします
  (2byte charactor is changed to the URL notation.for Japanese)
・もし検索条件を追加したいなら(If you would like to add a search condition.)
ex:add ie=utf-8 @Google"http://www.google.com/search?")
		{ before : "search?", after : "search?&ie=utf-8&" }, 


===注意事項(notice)===
*************************************************************************
一番最後のカンマ(,)を忘れないこと(Do not forget the last comma)
・同じ単語を指定すると干渉する場合があります
  (If you specify the same word,May interfere)
*************************************************************************

=====================================================================================================================*/

(function(){

//ユーザー設定(User's settings)-------------------------------------------------------------------------------------

	//検索ボタンの横に設定ボタン追加(Add Config Button beside search button)
	var googleBtn = document.getElementsByName("btnG")[0];

	if(googleBtn != undefined){
		//FirefoxとChromeの表示方式対応(もしかしたら新仕様CSSと変更前の旧仕様CSSの違いかもしれない)
		if(document.getElementById("sblsbb") != null){
			//Firefox側(新仕様)
			googleBtn.insertAdjacentHTML('afterend','<img name="setBtn" id="setBtn" type="button" style="position:relative;top:-29px;left:45px;" '
			 + 'src="data:image/gif;base64,R0lGODlhCwALAIABAACZ/////yH5BAEAAAEALAAAAAALAAsAAAIaBHKha6j5TmrRIdqmkTLu7HHWVmlMZ5XLWgAAOw==" '
			 + 'title="Config - Change search result for Google">');
		}else{
			//Chrome側(旧仕様)
			googleBtn.insertAdjacentHTML('afterend','<img name="setBtn" id="setBtn" type="button" style="position:relative;top:2px;left:3px;" '
			 + 'src="data:image/gif;base64,R0lGODlhCwALAIABAACZ/////yH5BAEAAAEALAAAAAALAAsAAAIaBHKha6j5TmrRIdqmkTLu7HHWVmlMZ5XLWgAAOw==" '
			 + 'title="Config - Change search result for Google">');
		}

		//設定ボタンクリックで設定画面を呼び出す(Open Config Window,when click the Config Button)
		var setBtn = document.getElementById("setBtn");
		setBtn.addEventListener('click', function(){GM_config.open()}, true);
	}

	//設定画面(Config Window)
	GM_config.init('Config - Change search result for Google' /* Script title */,
	/* Settings object */ 
	{
		'hideList': // This would be accessed using GM_config.get('Name')
		{
        		'section': ['hideList'],
			'label': '{ NGword : ["word1","word2","word3","word...more"], ignore : ["word4","word5","word...more"] },', // Appears next to field
			'type': 'textarea', // Makes this setting a text field
		        cols: 120,
		        rows: 10,
			'default': '{ NGword : ["","","",""], ignore : ["",""] },\n'
				+ '{ NGword : ["",""], ignore : ["","",""] },\n'
				+ '{ NGword : [""], ignore : [""] },\n'
				+ '{ NGword : ["","",""], ignore : ["",""] },\n'
				+ '{ NGword : [""], ignore : ["","","","",""] },\n'  // Default value if user doesn't change it
		},
		'changeList': // This would be accessed using GM_config.get('Name')
		{
        		'section': ['changeList'],
			'label': '{ before : "beforeURL", after : "afterURL" },', // Appears next to field
			'type': 'textarea', // Makes this setting a text field
		        cols: 120,
		        rows: 10,
			'default': '{ before : "scribe.twitter.com", after : "twitter.com" },				//Twitterの表示されないURL(Delete scribe)\n'
				+ '{ before : "zxbtapi.appspot.com", after : "twitter.com" },			//appspot回避(Avoid appspot)\n'
				+ '{ before : "", after : "" },\n'
				+ '{ before : "", after : "" },\n'
				+ '{ before : "", after : "" },\n' // Default value if user doesn't change it
		}
	},
/* chrome非対応のため削除(Delete :this CSS do not work on Chrome)******************************************:
	'.section_header_holder{height:33%;width:80%;}' + //枠
	'#section_1{padding-top:50px;}' + //changeListの枠
	'.section_header.center{background:aliceblue!important;color:black;pointer-events: none;border:none;}' + //タイトル
	'#field_hideList{height:100%;width:100%;resize: none;}' + //hideListテキスト
	'#field_changeList{height:100%;width:100%;resize: none;}' + //changeListテキスト
	'#buttons_holder{width:20%;position:absolute;bottom:10%;right:10px;}', + //セーブ・キャンセル・リセットボタン
	
***************************************************************************************/
	{
	open: function() {
		
	        //config window
	        var cfg_Window = document.getElementById("GM_config");
		
		//リスト全部(list section)=================================================
		var cfg_hideSection = cfg_Window.contentDocument.getElementById("section_0");	//hideList
		var cfg_changeSection = cfg_Window.contentDocument.getElementById("section_1");	//changeList

	        cfg_hideSection.setAttribute("style", "height:33%;width:80%;");
	        cfg_changeSection.setAttribute("style", "height:33%;width:80%;padding-top:50px;");
		
		//section label============================================================
		var cfg_hideLabel = cfg_Window.contentDocument.getElementById("c_section_kids_0");	//hideList
		var cfg_changeLabel = cfg_Window.contentDocument.getElementById("c_section_kids_1");	//changeList
		
	        cfg_hideLabel.setAttribute("style", "background:aliceblue!important;color:black;pointer-events: none;border:none;");
	        cfg_changeLabel.setAttribute("style", "background:aliceblue!important;color:black;pointer-events: none;border:none;");

		//textarea=================================================================
	        var cfg_hideTxt = cfg_Window.contentDocument.getElementById("field_hideList");		//hideList
		var cfg_changeTxt = cfg_Window.contentDocument.getElementById("field_changeList");	//changeList

		//改行無効化
		cfg_hideTxt.setAttribute("wrap", "off");
		cfg_changeTxt.setAttribute("wrap", "off");

		//css
		cfg_hideTxt.setAttribute("style", "height:100%;width:100%;resize: none;");
		cfg_changeTxt.setAttribute("style", "height:100%;width:100%;resize: none;");

		//save cancel==============================================================
	        var cfg_buttonsHolder = cfg_Window.contentDocument.getElementById("buttons_holder");
		
		cfg_buttonsHolder.setAttribute("style", "width:20%;position:absolute;bottom:10%;right:10px;");
	}
	});


	GM_addStyle(
		'#GM_config{height:100%!important;width:100%!important;z-index:1000!important;}'
	);

	//GreaseMonkeyとScriptishのオプション追加(add Option)
	GM_registerMenuCommand("Config - Change search result for Google", GM_config.open);


	//変数取得(get variable)
	var hideListSaved = GM_config.get("hideList");
	var changeListSaved = GM_config.get("changeList");

//alert(GM_config.get("hideList"));
//alert(GM_config.get("changeList"));

	
	//最終カンマ削除(delete last comma)
	do{
		hideListSaved = hideListSaved.slice(0, -1);
//alert(hideListSaved.slice(-1));
	}while(hideListSaved.slice(-1) != '}');
	do{
		changeListSaved = changeListSaved.slice(0, -1);
//alert(changeListSaved.slice(-1));
	}while(changeListSaved.slice(-1) != '}');

//alert(hideListSaved);
//alert(changeListSaved);


	//[]で囲む(variable into [])
	hideListSaved = "[" + hideListSaved + "]";
	changeListSaved = "[" + changeListSaved + "]";

	//変数セット(set variable)
	var hideList = eval(hideListSaved);
	var changeList = eval(changeListSaved);

/*********************** GM_config以前の設定 ***************

	//非表示リスト(Hide result LIST)--------------------------------------------------------------------
	var hideList = [
		{ NGword : ["",""], ignore : ["",""]},

		//以下に追加(Add Location start)**********************************************************************

		{ NGword : ["","","",""], ignore : ["",""] },				//追加サンプル(sample)
		{ NGword : [""], ignore : ["","",""] },					//追加サンプル(sample)
		{ NGword : [""], ignore : [""] },					//追加サンプル(sample)
		{ NGword : ["",""], ignore : ["",""] },					//追加サンプル(sample)
		{ NGword : ["",""], ignore : ["",""] },					//追加サンプル(sample)

		//上に追加(Add Location end)**************************************************************************

		{ NGword : ["",""], ignore : ["",""]}
	];



	//変換リスト(Change URL LIST)----------------------------------------------------------------------
	var changeList = [
		{ before : "scribe.twitter.com", after : "twitter.com" },	//Twitterの表示されないURL(Delete scribe)

		//以下に追加(Add Location start)**********************************************************************

		{ before : "zxbtapi.appspot.com", after : "twitter.com" },	//appspot回避(Avoid appspot)
		{ before : "", after : "" },					//追加サンプル(sample)
		{ before : "", after : "" },					//追加サンプル(sample)
		{ before : "", after : "" },					//追加サンプル(sample)

		//上に追加(Add Location end)**************************************************************************
		{ before : "", after : "" }					//追加サンプル(sample)

	];


	//ユーザ設定から読み込み(Load user's settings)
	var hideListSaved = eval( GM_getValue("hideList"));
	var changeListSaved = eval( GM_getValue("changeList"));

	//ユーザー設定を保存(Save user's settings)
	if(hideList != hideListSaved){
		GM_setValue( "hideList", hideList.toSource() );
	}
	if(changeList != changeListSaved){
		GM_setValue( "changeList", changeList.toSource() );
	}
************************************************************/


//プログラム部Main PG==================================================================================================

//非表示処理(Hide result)--------------------------------------------------------------------------
	function handle(node){
		var result_Hide = document.getElementsByTagName('li');
		for (i = 0; i < result_Hide.length; i++){
			var strTag = result_Hide[i];					//検索結果のテキスト情報(Search result)
			var hideFlg = 0;					//非表示フラグ(Hide flag)
										//0:初期値(initial) 1:非表示(hide) 2:表示(visible)
			
			for (j = 0; j < hideList.length; j++){
				//非表示処理(Hide result)--------------------------------------------------
				for (k = 0; k < hideList[j].NGword.length; k++){
					if (hideList[j].NGword[k] == "" ){
						continue;
					}
					
					if (strTag.className == 'g' && strTag.innerHTML.indexOf(hideList[j].NGword[k]) != -1){
						hideFlg = 1;
						

					}else{
						hideFlg = 2;
					}
				}
				
				
				//例外判定(Exception)------------------------------------------------------
				for (k = 0; k < hideList[j].ignore.length; k++){
					if (hideList[j].ignore[k] == "" ){
						continue;
					}
					
					if (strTag.className == 'g' && strTag.innerHTML.indexOf(hideList[j].ignore[k]) != -1){
						hideFlg = 2;
//throw "test";//変数確認用
						
					}
				}
				
				
				//検索結果削除(Delete result)----------------------------------------------
				if (hideFlg == 1){
					strTag.innerHTML = '';
					hideFlg = 0;
					strTag.setAttribute('style', 'display:none;');
				}
			}
		}


//URL置換Change URL----------------------------------------------------------------------------------------
	
		var result_Ch = document.evaluate('.//Li[@class="g"]', node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (i = 0; i < result_Ch.snapshotLength; i++){
			for(j = 0; j < result_Ch.snapshotItem(i).getElementsByTagName('a').length; j++){
				var oldLink = result_Ch.snapshotItem(i).getElementsByTagName('a')[j].getAttribute('href');	//検索結果のURL(Original URL)

				for (k = 0; k < changeList.length; k++){
					if (changeList[k].before == ""){
						continue;
					}

					var newLink = oldLink.replace(encStr(changeList[k].before), encStr(changeList[k].after));
												//置換後のリンク(Changed URL)

					if (newLink != oldLink){

						result_Ch.snapshotItem(i).getElementsByTagName('a')[j].setAttribute('href', newLink);

					}
				}
			}
		}
	}

//共通プログラムCommon PG----------------------------------------------------------------------------------

	//日本語をパーセントエンコードする(For Japanese encode)
	function encStr( str ){

		var encodeString = encodeURI(str) ;
		
		return encodeString;
	}

	
	//For Chrome:Change "GM_setValue & GM_getValue" to WebStrage
	if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
		this.GM_getValue=function (key,def) {
			return window.localStorage.getItem(key);
		};
		this.GM_setValue=function (key,value) {
			return window.localStorage.setItem(key, value);
		};
	}
	//For Chrome:GM_addStyle
	if( typeof(this.GM_addStyle)=='undefined' ){
		this.GM_addStyle = function (styles){	
			var S = document.createElement('style');
			S.type = 'text/css';
			var T = ''+styles+'';
			T = document.createTextNode(T)
			S.appendChild(T);
			var head = document.getElementsByTagName('head');
			head = head[0]
			head.appendChild(S);
			return;
		}
	}

	//For AutoPagerize
	document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
		var node = evt.target;
		handle(node);
	}, false);
	//For AutoPager
	document.body.addEventListener('AutoPagerAfterInsert', function(evt){
		var node = evt.target;
		handle(node);
	}, false);
	//For AutoPatchWork
	document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function(evt){
		var node = evt.target;
		handle(node);
	}, false);

	handle(document);

})();
//=====================================================================================================================