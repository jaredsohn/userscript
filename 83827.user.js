// ==UserScript==
// @name           Mabinogi Browse Helper
// @namespace      http://www20.atpages.jp/mabibrowsehelper
// @description    マビノギ公式サイトの閲覧・書込みをしやすくする。
// @include        http://mabinogi.nexon.co.jp/6th/community/*
// @include        http://mabinogi.nexon.co.jp/6th/personal/*
// @include        http://mabinogi.nexon.co.jp/6th/board/*
// @include        http://mabinogi.nexon.co.jp/6th/notice/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @compatibilityBrowser Firefox 20.01
// @compatibilityOfficialSiteVer 6th
// @version 2013.04.26
// ==/UserScript==
(function(){


//コメント制限時間は確実性を考えて90秒を設定
//バージョン情報の設定--------------------------------必ず設定すること！！！
var version = "2013.04.26";

//フレーム解除
function Frame_Release(){
	top.location.href=location.href;
}
//フレーム判定及びフレーム解除呼び出し
if(window.parent != window && GM_getValue('funccheck6',true) == true){
Frame_Release();
}

//セレクトボタンをvalue値で選択する
function sbtn_selected(tID,tval) {
var s_bt = document.getElementById(tID);
	for(var i = 0; i < s_bt.length; i++) {
		if(s_bt[i].value == tval){
			s_bt.selectedIndex = i;
			return true;
		}
	}
}

//スタイルシート追加関数
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if(!head){ return; }
	style		= document.createElement('style');
	style.type	='text/css';
	style.innerHTML	= css;
	head.appendChild(style);
}

//空白,改行等の除去関数
function trim(str) {
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//GM_xmlhttpRequestした内容をDOMにして取得する関数
function htmlParser(aHTMLString){
	var range = document.createRange();
	range.selectNodeContents(document.body);
	return range.createContextualFragment(aHTMLString);
}

//タイトル変更関数
function Title_Change(){
	var article = document.evaluate("//td[contains(@class, 'detail-title-txt')]",
					document,
					null,
					XPathResult.FIRST_ORDERED_NODE_TYPE,
					null).singleNodeValue;
	if(article){
	document.title = article.textContent;
	}
}
//タイトルを変更関数呼び出し
if(GM_getValue('funccheck7',true) == true){
Title_Change();
}

//NG適用関数
function NG_Name_Word() {
	//funccheck0がfalseなら終了処理
	if(GM_getValue('funccheck0',true) == false)return false;

	var NGName, NGWord, NGView;
	//NGName読み込み
	NGName = GM_getValue('NGName','');
	NGName = NGName.split("|-|");
	//NGWord読み込み
	NGWord = GM_getValue('NGWord','');
	NGWord = NGWord.split("|-|");
	//NGView読み込み
	NGView = GM_getValue('NGView','1');
	//ファンアート(fanartBoardList)、SS掲示板(ssBoardList)のNG処理
	if(window.location.href.search("fanartBoardList|ssBoardList") != -1) {
		//名前検索
		if(NGName[0] != ''){
		 	var allas, thisa, datea, i, n;
			allas=document.evaluate(
				"//a[contains(@onMouseDown, 'mabi_layerAction')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(i = 0; i < allas.snapshotLength; i++) {
				thisa = allas.snapshotItem(i);
				datea = thisa.innerText || thisa.innerHTML;
				thisa = thisa.parentNode;
				for(n = 0; n < NGName.length; n++) {
					//名前が一致するか、親要素があるか
					if (NGName[n] != '' && datea == NGName[n] && thisa.parentNode){
						//NG表示設定0=透明,1=あぼーん
						if(NGView == 0){
							//該当要素が記事欄
							//親の親の親の親の親の要素を取得
							//'<td class="item-detail-body">'→'<div class="fanart-item">'
							thisa	= thisa.parentNode.parentNode.parentNode.parentNode.parentNode;
							thisa.parentNode.removeChild(thisa);
						} else {
							thisa	= thisa.parentNode.parentNode.parentNode.parentNode;
							//該当要素が記事欄
							thisa.innerHTML = ' ' + '<table border="0" height="320px" width="206px"><tr><td align="center">＊あぼーん</td></tr></table>' + '';
						}
					}
				}
			}
		}

		//ワード検索
		if(NGWord[0] != ''){
			allas=document.evaluate(
				"//a[contains(@href, 'fanartBoardContent') or contains(@href, 'ssBoardContent')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(i = 0; i < allas.snapshotLength; i++) {
				thisa = allas.snapshotItem(i);
				datea = thisa.innerText || thisa.innerHTML;
				thisa = thisa.parentNode;
				for(n = 0; n < NGWord.length; n++) {
					if (NGWord[n] != '' && datea.indexOf(NGWord[n])>=0){
						//NG表示設定0=透明,1=あぼーん
						if(NGView == 0){
							//該当要素が記事欄
							//親の親の親の要素を取得
							//'<div class="thumb-bd"><h3>'→'<div class="fanart-item">'
							thisa	= thisa.parentNode.parentNode.parentNode;
							thisa.parentNode.removeChild(thisa);
						} else {
							thisa	= thisa.parentNode.parentNode;
							//該当要素が記事欄
							thisa.innerHTML = ' ' + '<table border="0" height="320px" width="206px"><tr><td align="center">＊あぼーん</td></tr></table>' + '';
						}
					}
				}
			}
		}
	}

	//それ以外
	else {
		//名前検索
		if(NGName[0] != ''){
		 	var alltds, thistd, nametd, i, n;
			alltds=document.evaluate(
				"//td[contains(@class, 'name')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(i = 0; i < alltds.snapshotLength; i++) {
				thistd = alltds.snapshotItem(i);
				datetd = thistd.innerText || thistd.innerHTML;
				thistd = thistd.parentNode;
				datetd = datetd.replace(/<\/?[^>]+>/gi,"");//タグを削除
				datetd = trim(datetd);//名前の前後のスペースや改行を削除
				for(n = 0; n < NGName.length; n++) {
					//名前が一致するか、親要素があるか
					if (NGName[n] != '' && datetd == NGName[n] && thistd.parentNode){
						//NG表示設定0=透明,1=あぼーん
						if(NGView == 0){
							if(thistd.parentNode.parentNode.parentNode.className.indexOf("answer-comment")>=0){
							//該当要素がコメント欄
							//親の親の親の要素を取得'<tr>'→'<div class="answer-comment">'
							thistd = thistd.parentNode.parentNode.parentNode;
							thistd.parentNode.removeChild(thistd);
							} else {
							//該当要素が記事欄
							thistd.parentNode.removeChild(thistd);
							}
						} else {
							if(thistd.parentNode.parentNode.parentNode.className.indexOf("answer-comment")>=0){							//該当要素がコメント欄
							//該当要素がコメント欄
							thistd.innerHTML = ' ' + '<td class="answer-comment-res-icn"></td>あぼーん' + '';
							} else {
							//該当要素が記事欄
							thistd.innerHTML = ' ' + '<td class="list-icn"></td>' +
							'<td class="list-title"><p>※あぼーん</p></td>' +
							'<td class="list-server">&nbsp;</td>' +
							'<td class="list-name">&nbsp;</td>' +
							'<td class="list-date">&nbsp;</td>' +
							'<td class="list-view">&nbsp;</td>' + '';
							}
						}
					}
				}
			}
		}

		//ワード検索
		if(NGWord[0] != ''){
			alltds=document.evaluate(
				"//td[@class='list-title' or @class='answer-comment-txt']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			for(i = 0; i < alltds.snapshotLength; i++) {
				thistd = alltds.snapshotItem(i);
				datetd = thistd.innerText || thistd.innerHTML;
				thistd = thistd.parentNode;
				for(n = 0; n < NGWord.length; n++) {
					if (NGWord[n] != '' && datetd.indexOf(NGWord[n])>=0){
						//NG表示設定0=透明,1=あぼーん
						if(NGView == 0){
							if(thistd.parentNode.parentNode.parentNode.className.indexOf("answer-comment")>=0){
							//該当要素がコメント欄
							//親の親の親の要素を取得'<tr>'→'<div class="answer-comment">'
							thistd = thistd.parentNode.parentNode.parentNode;
							thistd.parentNode.removeChild(thistd);
							} else {
							//該当要素が記事欄
							thistd.parentNode.removeChild(thistd);
							}
						} else {
							if(thistd.parentNode.parentNode.parentNode.className.indexOf("answer-comment")>=0){
							//該当要素がコメント欄
							thistd.innerHTML = ' ' + '<td class="answer-comment-res-icn"></td>あぼーん' + '';
							} else {
							//該当要素が記事欄
							thistd.innerHTML = ' ' + '<td class="list-icn"></td>' +
							'<td class="list-title"><p>※あぼーん</p></td>' +
							'<td class="list-server">&nbsp;</td>' +
							'<td class="list-name">&nbsp;</td>' +
							'<td class="list-date">&nbsp;</td>' +
							'<td class="list-view">&nbsp;</td>' + '';
							}
						}
					}
				}
			}
		}
	}
}
//NG適用関数呼び出し
NG_Name_Word();

//コメントを全部表示ボタンクリック時にNG関数及びURLリンク再呼び出し
function all_comment_button_click() {
	var allcomment = document.evaluate(
				"//a[@onclick='displayComment(); return false;']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	if(allcomment.snapshotLength){
		var allcommentEle = allcomment.snapshotItem(0);
		allcommentEle.addEventListener('click',function(){
		NG_Name_Word();
		url_link();
		}
		, false);
	}
}

//上記関数呼び出し
all_comment_button_click();


//レイヤーにNG追加ボタン、メモ送信ボタンを追加
function NG__Layer() {
	//サーバー名を抽出する関数
	function return_sv(sv_url) {
		var r_sv = sv_url.match('icn_(..).*gif')[1];
		if(r_sv=='ci'){
		r_sv = 'ki'
		}else if(r_sv=='tr'){
		r_sv = 'to'
		}
		return r_sv;
	}
	var layer, layerElem, i, addlayer, TD, Name, svElem, svName, bdNum;
	//レイヤーに各種ボタンを追加
	layer = document.evaluate(
				"//tr[contains(@onmousedown, 'searchUser')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	//各レイヤーキャラクターのサーバー画像URLを列挙
	bdNum = 0;
	svElem = document.evaluate(
				"//td[contains(@class, 'list-server')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	//画像掲示板用のサーバー画像URL列挙
	if(svElem.snapshotLength == 0){
	bdNum = 1;
	svElem = document.evaluate(
				"//td[contains(@class, 'item-detail-body')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
	}
	for(i = 0; i < layer.snapshotLength; i++) {
		layerElem = layer.snapshotItem(i);
		//メモ送信ボタンを追加
		Name 	= layerElem.getAttribute('onmousedown');
		Name	= Name.match(",'(.*)',");
		if (svElem.snapshotItem(i).childNodes[1 + bdNum] != null) {
			svName	= svElem.snapshotItem(i).childNodes[1 + bdNum].getAttribute('src');
			svName  = return_sv(svName);
			addlayer = document.createElement('tr');
			addlayer.setAttribute("onmouseover","this.style.backgroundColor='#58A1CA';");
			addlayer.setAttribute("onmouseout","this.style.backgroundColor='';");
			addlayer.style.cursor ='pointer';
			addlayer.title	= Name[1];
			addlayer.setAttribute("class",svName);
			TD = document.createElement('td');
			TD.style.height = '20px';
			TD.style.whiteSpace = "nowrap";
			TD.innerHTML = ' ' + '&nbsp;&nbsp;<font color="#ffffff">メモを送信</font>&nbsp;&nbsp;' + '';
			addlayer.appendChild(TD);
			layerElem.parentNode.insertBefore(addlayer,layerElem.nextSibling);
			//メモ送信ボタンがクリックされたらメモ送信関数呼び出し
			addlayer.addEventListener('mousedown',function(event){memo_dialog(this.title,this.getAttribute('class'))}, false);
		}
		//NGボタンを追加
		addlayer = document.createElement('tr');
		addlayer.setAttribute("onmouseover","this.style.backgroundColor='#58A1CA';");
		addlayer.setAttribute("onmouseout","this.style.backgroundColor='';");
		addlayer.style.cursor ='pointer';
		addlayer.title	= Name[1];
		TD = document.createElement('td');
		TD.style.height = '20px';
		TD.style.whiteSpace = "nowrap";
		TD.innerHTML = ' ' + '&nbsp;&nbsp;<font color="#ffffff">NGNameに追加</font>&nbsp;&nbsp;' + '';
		addlayer.appendChild(TD);
		layerElem.parentNode.insertBefore(addlayer,layerElem.nextSibling);
		//NGボタンがクリックされたら
		addlayer.addEventListener('mousedown',function(event){
			if(confirm("投稿者をNGNameに追加します。よろしいですか？")){
				var NGName;
				NGName = GM_getValue('NGName','');
				if(NGName.length != 0)NGName += "|-|";
				NGName += this.title;
				GM_setValue('NGName',NGName);
				location.reload();
			}
		}, false);
	}
}
//上記関数呼び出し
NG__Layer();

//コメントのテキストとコメント投稿時間の一時保存


//ページのコメントチェックスクリプトに上書き
	//クッキー読み込み関数を追加
	unsafeWindow.getcookie = function(key){
		var patGet = /([^=]+)=([^=]+)/;
		var cookies = document.cookie.split("; ");
			for (var i = 0; i < cookies.length; i++) {
			var match = cookies[i].match(patGet);
				if(match && key == decodeURIComponent(match[1])){
					return decodeURIComponent(match[2]);
				}
			}
		return "";
	};

	//クッキー書込み関数を追加	//有効期限1日
	unsafeWindow.setcookie = function(key,val){
	var date = new Date();
		date.setTime(date.getTime() + (1*24*60*60*1000));
		var expires = 'expires=' + date.toGMTString();
		document.cookie = encodeURIComponent(key) + '=' +
		encodeURIComponent(val) + "; " +
		expires + '; path=/';
	};


	//checkFrmCommentにコメント可能時間チェックと
	//クッキーにコメント日時とコメントを保存する処理を追加
	unsafeWindow.checkFrmComment = function(){
			var now = new Date();
			var timevalue = getcookie('timecomment');
			if(timevalue ==''){timevalue = now.getTime() - 90000;}

			if (parseInt((now.getTime() - timevalue)) < 90000){
				if(window.confirm('連続投稿エラーになる可能性がありますが、よろしいですか？')){}else{
					return false;
				}
			}
			if(document.getElementById('boardComment').value==""){

				
alert("コメントを入力して下さい。");
				document.getElementById('boardComment').focus();
				return false;
			}
			if(document.getElementById('boardComment').value.length > 1000){
				
				alert("コメントは1000文字まで登録可能です。");
				document.getElementById('boardComment').focus();
				return false;
			}
			if(4 >= 300){
				
				alert("コメントは300件まで登録できます。");
				document.getElementById('boardComment').focus();
				return false;
			}
			setcookie('textcomment',document.getElementById('boardComment').value);
			setcookie('timecomment',now.getTime());
			document.getElementById('frmComment').submit();
	};

	//checkFrmComment2(id)にコメント可能時間チェックと
	//クッキーにコメント日時とコメントを保存する処理を追加
	unsafeWindow.checkFrmComment2 = function(id){
			var now = new Date();
			var timevalue = getcookie('timecomment');
			if(timevalue ==''){timevalue = now.getTime() - 90000;}

			if (parseInt((now.getTime() - timevalue)) < 90000){
				if(window.confirm('連続投稿エラーになる可能性がありますが、よろしいですか？')){}else{
					return false;
				}
			}
			if(document.getElementById('boardComment'+id).value==""){
				alert("コメントを入力して下さい。");
				document.getElementById('boardComment'+id).focus();
				return false;
			}

			if(document.getElementById('boardComment'+id).value.length > 1000){
				
				alert("コメントは1000文字まで登録可能です。");
				document.getElementById('boardComment'+id).focus();
				return false;
			}

			if(3 >= 300){
				
				alert("コメントは300件まで登録できます。");
				document.getElementById('boardComment'+id).focus();
				return false;
			}

			var cixElement = document.getElementById('cx');
			var cmoElement = document.getElementById('mo');
			var BoardComment = document.getElementById('boardComment');
				cixElement.value=id;
				cmoElement.value="r";
				BoardComment.value = document.getElementById('boardComment'+id).value
			setcookie('textcomment',document.getElementById('boardComment'+id).value);
			setcookie('timecomment',now.getTime());
			document.getElementById('frmComment'+id).submit();
		};

//投稿者名クリック時のスクリプトエラーの修正
	//レイヤースクリプトの修正
	unsafeWindow.mabi_layerAction = function(name,status){
		var obj = document.getElementById(name);
		var _tmpx,_tmpy, _marginx, _marginy;
		var e = null;
		var caller = arguments.callee.caller;
		while(caller){
			var ob = caller.arguments[0];
			if(ob && ob.constructor.toString() == MouseEvent){
				e = ob;
				break ;
			} else{
				caller = caller.caller;
			}
		}
		_tmpx = e.clientX + parseInt(obj.offsetWidth);
		_tmpy = e.clientY + parseInt(obj.offsetHeight);
		_marginx = document.body.clientWidth - _tmpx;
		_marginy = document.body.clientHeight - _tmpy ;
		if(_marginx < 0)
			_tmpx = e.clientX + document.documentElement.scrollLeft + _marginx ;
		else
			_tmpx = e.clientX + document.documentElement.scrollLeft ;
		if(_marginy < 0)
			_tmpy = e.clientY + document.documentElement.scrollTop + _marginy +20;
		else
			_tmpy = e.clientY + document.documentElement.scrollTop ;
		obj.style.left=_tmpx-13+'px';
		obj.style.top =_tmpy-12+'px';
		if(status=='visible') {
			if(unsafeWindow.select_obj) {
				unsafeWindow.select_obj.style.visibility='hidden';
				unsafeWindow.select_obj=null;
			}
			unsafeWindow.select_obj=obj;
		}else{
			unsafeWindow.select_obj=null;
		}
		obj.style.visibility=status;
	};

	//カラーコードの修正	
	//fontのカラーコード修正
function Repair_Colr() {
	var　allFonts,　thisFonts;
	allFonts=document.evaluate(
		"//font[@color='ffffff']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(i = 0; i < allFonts.snapshotLength; i++) {
		thisFont=allFonts.snapshotItem(i);
		thisFont.color = '#ffffff';
	}
	//tableのカラーコード修正
 	//ffffffの修正
 	var　allTables,　thisTable;
	allTables=document.evaluate(
		"//table[@bgcolor='ffffff']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(i = 0; i < allTables.snapshotLength; i++) {
		thisTable=allTables.snapshotItem(i);
		thisTable.bgColor = '#ffffff';
	} 
	//9BC7DFの修正
	allTables=document.evaluate(
		"//table[@bgcolor='9BC7DF']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(i = 0; i < allTables.snapshotLength; i++) {
		thisTable=allTables.snapshotItem(i);
		thisTable.bgColor = '#9BC7DF';
	}
	//マウスポインタの修正
	//名前リンクの修正
	alllinks=document.evaluate(
		'//a[@style]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(i = 0; i < alllinks.snapshotLength; i++) {
		thislink=alllinks.snapshotItem(i);
		thislink.style.cursor = 'pointer';
	}
	//書き込みを見るの修正
 	var　alltr,　thistr;
	alltrs=document.evaluate(
		'//tr[@onMouseOver]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(i = 0; i < alltrs.snapshotLength; i++) {
		thistr=alltrs.snapshotItem(i);
		thistr.style.cursor = 'pointer';
	}
}

//カラーコードの修正関数の呼び出し
Repair_Colr();

//コメント制限時間表示

//クッキー読み込み関数
function getcookie(key){
	var patGet = /([^=]+)=([^=]+)/;
	var cookies = document.cookie.split('; ');
	for (var i = 0; i < cookies.length; i++) {
	    var match = cookies[i].match(patGet);
	    if(match && key == decodeURIComponent(match[1])){
	        return decodeURIComponent(match[2]);
	    }
	}
	return '';
}


//クッキー書込み関数
function setcookie(key,val){
	var date = new Date();
	date.setTime(date.getTime() + (1*24*60*60*1000));	//有効期限1日
	var expires = 'expires=' + date.toGMTString();
	document.cookie = encodeURIComponent(key) + '=' +
	    encodeURIComponent(val) + "; " +
	    expires + '; path=/';
}

//コメント制限時間表示関数
function time_limit_count() {
	//コメント制限時間表示位置
	var cmttime = document.evaluate(
			"//a[@onclick='displayCommentInput();return false;']",
			 document,
			 null,
			 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			 null);
	if(cmttime.snapshotLength){
	    var span = document.createElement('span');
		span.id= 'timetextcomment';
		span.style.marginLeft= '2em';
	    var cmttimeElem = cmttime.snapshotItem(0);
		cmttimeElem.parentNode.insertBefore(span,cmttime.nextSibling);
	}
	//制限時間カウント
	var ctimer = window.setInterval(function(){
		var span, sctime, now, esec;

		//経過時間
		now = new Date();
		sctime = getcookie('timecomment');
		esec = parseInt((now.getTime() - sctime) / 1000);
		//制限時間表示位置の要素取得
		span = document.getElementById('timetextcomment');
		if(span){
			if(esec < 90){
			span.style.color= 'red';
			span.innerHTML= 'あと' + (90-esec) + '秒で書き込めます。';
			}
			//制限時間を越えたのでタイマー終了
			else{
			span.style.color= 'green';
			span.innerHTML= 'コメントの書き込みが可能です。';
			window.clearInterval(ctimer);}
		}
		//要素が見つからないのでタイマー終了
		else{window.clearInterval(ctimer);}
	}, 1000);
}

//コメント制限時間表示関数呼び出し
time_limit_count();

//コメントボタン追加関数
function load_comment() {
	//drawComment関数にコメントボタン作成機能を追加
	unsafeWindow.drawCommentForm = function(id){
		var commentForm = document.getElementById('divComment'+id);
		if (commentForm.style.display == "none"){
			commentForm.style.display = "block";
		}else{
			commentForm.style.display = "none";
		}
		if (document.getElementById('loadComB'+id) == null){
			var frmElem	= document.getElementById('frmComment'+id);
			var LoadComB	= document.createElement('a');
			var func	= "load_comment(" + id + ");return false;";
			LoadComB.id	= 'loadComB'+id;
			LoadComB.href	= '#';
			LoadComB.setAttribute("onclick",func);
			LoadComB.innerHTML = ' ' + '-投稿したコメントを読み込む' + '';
			frmElem.parentNode.insertBefore(LoadComB,frmElem);
			var LoadIComB	= document.createElement('a');
			var func2	= "load_input_comment(" + id + ");return false;";
			LoadIComB.id	= 'loadIComB';
			LoadIComB.href	= '#';
			LoadIComB.style.marginLeft = '5px';
			LoadIComB.setAttribute("onclick",func2);
			LoadIComB.innerHTML = ' ' + '-入力したコメントを読み込む' + '';
			LoadComB.parentNode.insertBefore(LoadIComB,LoadComB.nextSibling);
			var SelectComB	= document.createElement('a');
			var func3	= "select_comment(" + id + ");return false;";
			SelectComB.id	= 'SelectComB';
			SelectComB.href	= '#';
			SelectComB.style.marginLeft = '5px';
			SelectComB.setAttribute("onclick",func3);
			SelectComB.innerHTML = ' ' + '-コメントを選択状態にする' + '';
			LoadIComB.parentNode.insertBefore(SelectComB,LoadIComB.nextSibling);
			var TextElem = document.getElementById("boardComment" + id);
			var x, elm = TextElem;
			elm = elm.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			x = elm.className.slice(-2);
			if(isNaN(x))x = 0;
			var ResizeElem	= document.createElement('div');
			var func4	= "resize_comment(event,this," + id + ",event.type)";
			ResizeElem.className	= 'res_icon';
			ResizeElem.style.left	= 15 + (-8 * x) + 'px';
			ResizeElem.style.top	= '44px';
			ResizeElem.defpset	= ResizeElem.style.left + ResizeElem.style.top;
			ResizeElem.defwidth	= TextElem.offsetWidth;
			ResizeElem.setAttribute("ondblclick",func4);
			ResizeElem.setAttribute("onmousedown",func4);
			SelectComB.parentNode.insertBefore(ResizeElem,SelectComB.nextSibling);
		}};
	//displayCommentInput関数にコメント復元ボタンを作成する機能を追加
	unsafeWindow.displayCommentInput = function(){
		var commentInputElement = document.getElementById('divComment');

		if(commentInputElement.style.display == "block"){
			commentInputElement.style.display = "none";
		}else{
			commentInputElement.style.display = "block";

			document.getElementById('boardComment').focus();
		}

		if (document.getElementById('loadComB') == null){
			var frmElem	= document.getElementById('frmComment');
			var LoadComB	= document.createElement('a');
			LoadComB.id	= 'loadComB';
			LoadComB.href	= '#';
			LoadComB.setAttribute("onclick","load_comment('');return false;");
			LoadComB.innerHTML = ' ' + '-投稿したコメントを読み込む' + '';
			frmElem.parentNode.parentNode.insertBefore(LoadComB,frmElem.parentNode);
			var LoadIComB	= document.createElement('a');
			LoadIComB.id	= 'loadIComB';
			LoadIComB.href	= '#';
			LoadIComB.style.marginLeft = '5px';
			LoadIComB.setAttribute("onclick","load_input_comment('');return false;");
			LoadIComB.innerHTML = ' ' + '-入力したコメントを読み込む' + '';
			LoadComB.parentNode.insertBefore(LoadIComB,LoadComB.nextSibling);
			var SelectComB	= document.createElement('a');
			SelectComB.id	= 'SelectComB';
			SelectComB.href	= '#';
			SelectComB.style.marginLeft = '5px';
			SelectComB.setAttribute("onclick","select_comment('');return false;");
			SelectComB.innerHTML = ' ' + '-コメントを選択状態にする' + '';
			LoadIComB.parentNode.insertBefore(SelectComB,LoadIComB.nextSibling);
		}
		};

	//load_comment関数を追加
	unsafeWindow.load_comment = function(id){
		var textElem	= document.getElementById('boardComment'+id);
		textElem.value	= getcookie('textcomment');
		textElem.focus();
		};
	//load_input_comment関数を追加
	unsafeWindow.load_input_comment = function(id){
		var textElem	= document.getElementById('boardComment'+id);
		textElem.value	= getcookie('inputcomment');
		textElem.focus();
		};
	//select_comment関数を追加
	unsafeWindow.select_comment = function(id){
		var textElem	= document.getElementById('boardComment'+id);
		textElem.focus();
		textElem.select();
		};
	//下部コメント欄の位置及び、divの修正
	addGlobalStyle('.input-comment .input-comment-cnt {padding:5px 0 0 25px;}#divComment .input-comment-cnt div {position: absolute; z-index: 9999;}');

}
//上記関数の呼び出し
load_comment();



//記事内容復元ボタン追加関数
function load_board() {

	var frmElem	= document.getElementById('boardTitle');
	if(frmElem != null){
		//入力したとき保存した記事内容を読み込むボタン作成
		var LoadIBoardB	= document.createElement('a');
		LoadIBoardB.id	= 'loadIBoardB';
		LoadIBoardB.href	= '#';
		LoadIBoardB.style.marginLeft = '5px';
		LoadIBoardB.setAttribute("onclick","load_input_board();return false;");
		LoadIBoardB.innerHTML = ' ' + '編集の復元' + '';
		frmElem.parentNode.insertBefore(LoadIBoardB,frmElem.nextSibling.nextSibling);

		//load_input_board関数を追加
		unsafeWindow.load_input_board = function(){
			/* タイトルの復元 */
			var textElem	= document.getElementById('boardTitle');
			textElem.value	= getcookie('inputtitle');
			/* 内容の復元 */
			textElem	= document.getElementById('boardContent');
			textElem.value	= getcookie('inputcontent');
			textElem.focus();
			};
	}

}
//上記関数の呼び出し
load_board();


//コメントや記事内容の入力時に一時保存
function input_save() {
	document.addEventListener('keyup',function(event){
		var TextElem, ElemID = document.activeElement.id;
		//フォーカスを持っているエレメントがコメント欄
		if(ElemID.toLowerCase().indexOf('comment')>=0){
			TextElem = document.activeElement.value;
			setcookie('inputcomment',TextElem);
		}
		//フォーカスを持っているエレメントがタイトル欄
		if(ElemID.toLowerCase().indexOf('boardtitle')>=0){
			TextElem = document.activeElement.value;
			setcookie('inputtitle',TextElem);
		}
		//フォーカスを持っているエレメントが記事内容
		if(ElemID.toLowerCase().indexOf('boardcontent')>=0){
			TextElem = document.activeElement.value;
			setcookie('inputcontent',TextElem);
		}
	}, false);
}
//funccheck2がtrueなら上記関数の呼び出し
if(GM_getValue('funccheck2',true) == true){
input_save();
}



//公式簡素化関数
function simple_site() {
	//スクロール毎の処理andリサイズ毎の処理を停止
	unsafeWindow.onresize = '';
	unsafeWindow.onscroll = '';
	//右メニューの削除
 	var alldivs, thisdiv, i, mabilink;
	alldivs=document.evaluate(
		"//div[@id='right']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	thisdiv = alldivs.snapshotItem(0);
	thisdiv.parentNode.removeChild(thisdiv);
	//ホットキー機能を呼び出さないようにする
	unsafeWindow.getKey = function(keyStroke){};
	//上部広告を削除
	var bannerElem;
	bannerElem = document.getElementById('gnb-banner');
	if(bannerElem) {
	bannerElem.parentNode.removeChild(bannerElem);
	}
	bannerElem = document.getElementById('gnb-text-link');
	if(bannerElem) {
	bannerElem.parentNode.removeChild(bannerElem);
	}
}
//funccheck1がtrueなら公式簡素化関数呼び出し
if(GM_getValue('funccheck1',true) == true){
simple_site();
}


//URLのリンク化
function url_link(){
	//funccheck3がfalseなら終了処理
	if(GM_getValue('funccheck3',true) == false)return false;

	//画像のポップアップ表示関数の追加
	//funccheck5がtrueなら画像ポップアップ
	if(GM_getValue('funccheck5',true) == true){
		unsafeWindow.pic_popup = function(url,id,elm,e){
				/* 既に要素がある場合は表示処理 */
				if(document.getElementById(id)){
					if(e == "mouseover"){
						document.getElementById(id).style.visibility = 'visible	';
					} else {
						document.getElementById(id).style.visibility = 'hidden';
					}
				return false;
				}
				/* 画像拡張子でない場合は終了 */
				if(url.search(/.(png|gif|bmp|jpg|jpe|jpeg)$/i) == -1)return false;
				var x = 0, y = 0;
				while( elm && elm != document.body ) {
					x += elm.offsetLeft;
					y += elm.offsetTop;
					elm	= elm.offsetParent;
				}
				var picdiv = document.createElement('div');
				picdiv.id		= id;
				picdiv.style.top	= y + 13 + 'px';
				picdiv.style.left	= x + 'px';
				picdiv.style.position	= "absolute";
				picdiv.style.zIndex	= "8888";
				picdiv.style.visibility = 'visible';
				picdiv.style.cursor	= 'pointer';
				picdiv.title	= url;
				picdiv.setAttribute("onmouseover","pic_popup('',this.id,'',event.type);");
				picdiv.setAttribute("onmouseout","pic_popup('',this.id,'',event.type);");
				picdiv.setAttribute("onclick","pic_expand(this);return false;");
				picdiv.innerHTML	= ' ' + '<img src="' + url + '" style="height:200px; width:200px;">' + '';
				document.getElementsByTagName('body')[0].appendChild(picdiv);
				return false;
			};
	} else{
		//空の画像ポップアップ関数
		unsafeWindow.pic_popup = function(url,id,elm,e){
				return false;
			};
	}

	//URLオープン関数の追加
	//funccheck4がtrueなら新規タブで開く
	if(GM_getValue('funccheck4',true) == true){
		unsafeWindow.url_open = function(via,url,e){
				if(e.ctrlKey){
					window.open('data:text/html,<script type="text/javascript">location.replace("' + url + '");</script>');
				} else{
					window.open('data:text/html,<script type="text/javascript">location.replace("' + via + url + '");</script>');
				}
				return false;
			};
	} else{
		//通常通り開く
		unsafeWindow.url_open = function(via,url,e){
				if(e.ctrlKey){
					document.write('<meta http-equiv="refresh" content="0;url=' + url + '">');
					document.close();
				} else{
					document.write('<meta http-equiv="refresh" content="0;url=' + via + url + '">');
					document.close();
				}
				return false;
			};
	}

	//経由サイトの情報
	var via_site_date = GM_getValue('viasite','0');
	via_site_date = via_site_date.substr(1,via_site_date.length);

	//全てのテキストノードを取得し、URLを識別
	var all_texts=document.evaluate(
		"descendant::text()[contains(self::text(),'.') and not(ancestor::a) and not(ancestor::textarea) and not(ancestor::script) and not(ancestor::style)]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(var i = 0; i < all_texts.snapshotLength; i++) {
		var textElem = all_texts.snapshotItem(i),
		text = textElem.nodeValue
		id = text.length + 'a' + i;
		var range = document.createRange(),
		newtext = text.replace(/h?t?t?p?(s)?:?\/?\/?([-_.!~*¥a-zA-Z0-9;¥?:¥@&=+¥$,%#]*\w+\.\w+[-_.!~*¥a-zA-Z0-9;¥/?:¥@&=+¥$,%#]*)/g, function($0,$1,$2) {
			return '<a title = "' + via_site_date + '" href="http' + $1 + '://' + $2 + '" name="' + id + "p" +
			 '" onclick="url_open(this.title,this.href,event);return false;" style="color: #0009FF;"  onmouseover="pic_popup(this.href,this.name,this,event.type);" onmouseout="pic_popup(this.href,this.name,this,event.type);">' + $0 + '</a>';
		});
		range.selectNode(textElem);
		df = range.createContextualFragment(newtext);
		textElem.parentNode.replaceChild(df, textElem);
		range.detach();
	}

}
//上記関数の呼び出し
url_link();



//プレイヤー、取引掲示板メインサーバー表示
function server_view(){
	var mainserver = GM_getValue('mainserver','no0');
	if(mainserver != 'no0'){
		var alink = document.evaluate(
		"//a[@href='/6th/community/playerBoardList.asp?sv=ma' or @href='/6th/community/tradeBoardList.asp?sv=ma' or @href='http://mabinogi.nexon.co.jp/6th/community/playerBoardList.asp' or @href='http://mabinogi.nexon.co.jp/6th/community/tradeBoardList.asp']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for(var i = 0; i < alink.snapshotLength; i++) {
		var alinkElem = alink.snapshotItem(i);
		alinkElem.href = alinkElem.href.match(".*.asp") + "?sv=" + mainserver.substr(0,2);
		}
	}
}
//上記関数の呼び出し
server_view();



//メモテキスト呼び出し処理
function memo_text(){
//メモテキスト
	//呼び出し2回目以降はテキストを生成しないで表示のみ
	var startElem = document.getElementById('memotext')
	if(startElem){
	startElem.value = GM_getValue('memotext0','');
	startElem.style.visibility = 'visible';
	startElem.focus();
	return ;
	}
	//メモテキストのスタイルシート情報
	var memo_css_date =
	['',
'	textarea.memotext {',
'	 position: fixed; ',
'	 width: 90%; ',
'	 height: 90%; ',
'	 visibility: visible; ',
'	 left: 5%; top: 5%; ',
'	 z-Index: 999997; ',
'	}',
'	'].join("\n");
	//メモテキストのスタイルシート追加
	addGlobalStyle(memo_css_date);
	var memotext = document.createElement('textarea');
	memotext.id	= 'memotext';
	memotext.className= 'memotext';
	memotext.value = GM_getValue('memotext0','');
	//設定ボタン追加
	document.getElementsByTagName('body')[0].appendChild(memotext);
	memotext.focus();
	//ページがアンロードされたら閉じる処理
	window.addEventListener('unload', function(event){
		//フォーカスをロストさせてイベントリスナーを発動させる
		document.getElementById('memotext').blur()
	}, false);
	
	//メモ帳がフォーカスを失ったら閉じる処理
	memotext.addEventListener('blur',function(event){
		//内容が変更されているなら変更確認
		if(this.value != GM_getValue('memotext0','')){
			if(confirm("変更内容を保存しますか？"))GM_setValue('memotext0',this.value);
		}
		this.style.visibility='hidden';
		//アンロード時のイベントリスナーを削除
		window.removeEventListener('unload', arguments.callee, false);
	}, false);
}


//エンターでログインボタンの処理が出来るようにする関数
function login_enter() {
	var login_txtbx = document.evaluate(
		"//input[@type='password']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	login_txtbx = login_txtbx.snapshotItem(0);
	if(login_txtbx){
		login_txtbx.setAttribute("onkeypress","if(event.keyCode==13) checkFrmLogin();");
	}
}
//上記関数の呼び出し
login_enter();

//画像を拡大する関数
function pic_expanded() {
	//大きい画像のスタイルシート情報
	var pic_css_date =
	['',
'	iframe.bigpic { ',
'	 position: fixed; ',
'	 top: 3%; ',
'	 left: 3%;',
'	 height: 94%;',
'	 width: 94%;',
'	 background-color: #FFFFFF;',
'	 text-align: center;',
'	 visibility: hidden; ',
'	 z-Index: 999999; ',
'	}',
'	'].join("\n");
	//大きい画像のスタイルシート追加
	addGlobalStyle(pic_css_date);

	//画像拡大関数追加
	unsafeWindow.pic_expand = function(elm){
				/* 大きい画像を作成してないなら作成 */
				if(elm.title != ''){
					var bigpic	= document.createElement('iframe');
					bigpic.src	= elm.title;
					bigpic.className= 'bigpic';
					bigpic.id	= 'bigpic' + elm.id;
					document.getElementsByTagName('body')[0].appendChild(bigpic);
					elm.title	= '';
				}
				/* バック画面を表示 */
				var backscreen = document.getElementById('dialog-background');
				backscreen.style.visibility = 'visible';
				backscreen.picid	    = elm.id;
				/* 画像を表示 */
				document.getElementById('bigpic' + elm.id).style.visibility = 'visible';
				/* バック画面がクリックされたら非表示にする */
				backscreen.addEventListener('mouseover',function(event){
					/* バック画面を非表示 */
					document.getElementById('dialog-background').style.visibility = 'hidden';
					/* 画像を非表示 */
					document.getElementById('bigpic' + this.picid).style.visibility = 'hidden';
					/* バック画面のイベントリスナーを削除 */
					this.removeEventListener('click', arguments.callee, false);
				}, false);
		};
	//ファンアート、SS掲示板、取引掲示板の画像クリック時での処理
	if(location.href.indexOf('fanartBoardContent')>=0 || location.href.indexOf('ssBoardContent')>='0' || location.href.indexOf('tradeBoardContent')>='0'){
		var piclink, piclinkElem, picurl;
		//画像のリンク要素を取得
		piclink = document.evaluate(
		"//a[contains(@onclick, 'imageViewer')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		piclinkElem	= piclink.snapshotItem(0);
		if(piclinkElem != null){
			picurl		= piclinkElem.getAttribute('onclick');
			picurl		= picurl.match("'(.*)'");
			piclinkElem.title	= picurl[1];
			piclinkElem.setAttribute("onclick","pic_expand(this);return false;");
		}
	}
}
//表示ページがファンアートとSS掲示板と取引掲示板のコンテンツページ
pic_expanded();


//１分毎にメモ一覧をチェック
function memo_check(){
memo_timer = window.setInterval(function() {
	var targetURL = "http://mabinogi.nexon.co.jp/6th/personal/memoBoxRcvList.asp";
	GM_xmlhttpRequest({
		method: "GET",
		url: targetURL,
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(response){
			if(response.responseText.match(/<span>\[未読\] <\/span>/)){
				var memo_icon_data = 'data:image/gif;base64,'+
				    'R0lGODlhHgAUAKIAANLS0sjIyKysrJubm2FhYT8/P////wAAACH5BAEAAAYALAAAAAAeABQAAAN0'+
				    'aLXc/lAVQKu9+LJBgv9gKH7EsAzcqI6lWQxBus5lfHryLNb2++U6D68H+3WCgSExBFQpl8yjswhy'+
				    'UUlNrPR3Ax2zvC1UWCWYz9etlSRCua9kXFeMjK/pdbIVnxe6CAKBgoOEhYQEJ2+Ki4yKBRIQkZIL'+
				    'BgkAOw==';
				var memoLink = document.createElement('a');
				memoLink.setAttribute('href', targetURL);
				memoLink.className= 'memo';
				memoLink.innerHTML = ' ' + '<img src="' + memo_icon_data + '" alt="メモが着ています"' + '';
				document.getElementsByTagName('body')[0].appendChild(memoLink);
				//funccheck9がtrueならポップアップメッセージで知らせる
				if(GM_getValue('funccheck9',true) == true){
				if(confirm("メモが着ています。メモを確認しますか？"))location.href=targetURL;
				}
				clearInterval(memo_timer);
			}
			if(response.responseText.match(/ご指定のサービスはログインが必要です。/)){
				clearInterval(memo_timer);
			}
		}
	})
},60000);
}
//funccheck8がtrueならメモチェック呼び出し
if(GM_getValue('funccheck8',true) == true){
memo_check();
}


//RSSを取得して新着記事お知らせ



//オプション設定に関する処理

//設定ダイアログの処理関数
function setting_process(){
	//設定ダイアログに保存した値を反映させる処理
	function set_date(){
		//チェックボックスの設定
		for(var i=0;i<11;i++){
		document.getElementById('funccheck'+i).checked = GM_getValue('funccheck'+i,'true');
		}
		//ラジオボタンの設定
		document.getElementById('funcradio'+GM_getValue('NGView','1')).checked = 'true';
		//サーバーセレクトボタンの設定
		document.getElementById('mainserver').selectedIndex = GM_getValue('mainserver','no0').substr(2,1);
		//経由サイトセレクトボタンの設定
		document.getElementById('viasite').selectedIndex = GM_getValue('viasite','0').substr(0,1);
		//NGNameの設定
		document.getElementById('ngnametext').value = GM_getValue('NGName','');
		//NGWordの設定
		document.getElementById('ngwordtext').value = GM_getValue('NGWord','');
		//魚拓履歴の設定
		document.getElementById('fishlog').value = GM_getValue('fishlog','');
		//登録キャラの設定
		document.getElementById('cctext').value = GM_getValue('CCDate','');
		//登録アイテムの設定
		document.getElementById('itemtext').value = GM_getValue('ItemDate','');
	}
	//設定値呼び出し
	set_date();
	//設定ダイアログを閉じる処理
	document.getElementById('maincancell').addEventListener('click',
	function(event){
		//設定した値を保存した値に戻す
		set_date();
		//ダイアログを閉じる処理
		document.getElementById('optionframe').style.display = 'none';
		document.getElementById('dialog-background').style.visibility = 'hidden';
	}, false);
	//設定を反映し、ダイアログを閉じる処理
	document.getElementById('mainok').addEventListener('click',
	function(event){
		//設定ダイアログの設定値を保存する処理
		//チェックボックスの設定
		for(var i=0;i<11;i++){
		GM_setValue('funccheck'+i,document.getElementById('funccheck'+i).checked);
		}
		//ラジオボタンの設定
		for(i=0;i<2;i++){
		if(document.getElementById('funcradio'+i).checked)GM_setValue('NGView',i);
		}
		//サーバーセレクトボタンの設定
		var svElem = document.getElementById('mainserver');
		GM_setValue('mainserver',svElem.value + svElem.selectedIndex);
		//経由サイトセレクトボタンの設定
		var vsElem = document.getElementById('viasite');
		GM_setValue('viasite',vsElem.selectedIndex + vsElem.value);
		var TextDate;
		//NGNameの設定
		TextDate = trim(document.getElementById('ngnametext').value);
		GM_setValue('NGName',TextDate);
		//NGWordの設定
		TextDate = trim(document.getElementById('ngwordtext').value);
		GM_setValue('NGWord',TextDate);
		//魚拓履歴の設定
		TextDate = trim(document.getElementById('fishlog').value);
		GM_setValue('fishlog',TextDate);
		//登録キャラの設定
		TextDate = trim(document.getElementById('cctext').value);
		GM_setValue('CCDate',TextDate);
		//登録アイテムの設定
		TextDate = trim(document.getElementById('itemtext').value);
		GM_setValue('ItemDate',TextDate);
		//ダイアログを閉じる処理
		document.getElementById('optionframe').style.display = 'none';
		document.getElementById('dialog-background').style.visibility = 'hidden';
	}, false);

}

//設定ダイアログ作成関数
function setting_dialog(){
	//呼び出し2回目以降はフレームを生成しないで表示のみ
	var startElem = document.getElementById('optionframe')
	if(startElem){
	startElem.style.display = 'block';
	document.getElementById('dialog-background').style.visibility = 'visible'
	return ;
	}
	//ダイアログのbody情報
	var body_date=['',
'	<div id="optionframe" class="optionframe">',
'	<div id="frametop">',
'	<ul class="topframe">',
'	<li id="topbtn0" class="toolbtn activebtn" onclick="change_contents(0);return false;">基本設定</li>',
'	<li id="topbtn1" class="toolbtn" onclick="change_contents(1);return false;">NGName</li>',
'	<li id="topbtn2" class="toolbtn" onclick="change_contents(2);return false;">NGWord</li>',
'	<li id="topbtn3" class="toolbtn" onclick="change_contents(3);return false;">魚拓履歴</li>',
'	<li id="topbtn4" class="toolbtn" onclick="change_contents(4);return false;">登録キャラ</li>',
'	<li id="topbtn5" class="toolbtn" onclick="change_contents(5);return false;">登録取引</li>',
'	</ul>',
'	</div>',
'	<div id="contents0" class="viewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="a">基本設定</legend>',
'	<ul>',
'			<li><input type="checkbox" id="funccheck0" name="NGEnable" value="" tabindex="1" accesskey="b"/><label for="funccheck0">NG設定を有効にする</label></li>',
'			<li>',
'				<fieldset class="ng"><legend accesskey="c">NG表示方法</legend>',
'				<ul>',
'				<li><input type="radio" id="funcradio0" name="NGView" value="" tabindex="2" accesskey="d"/><label for="funcradio0">透明NG</label></li>',
'				<li><input type="radio" id="funcradio1" name="NGView" value="" tabindex="3" accesskey="e"/><label for="funcradio1">あぼーんNG</label></li>',
'				</ul>',
'				</fieldset>',
'			</li>',
'			<li><input type="checkbox" id="funccheck1" name="SimpleEnable" value="" tabindex="4" accesskey="f"/><label for="funccheck1">公式簡素化を有効にする</label></li>',
'			<li><input type="checkbox" id="funccheck2" name="CommentSaveEnable" value="" tabindex="5" accesskey="g" /><label for="funccheck2">入力中のコメントや記事の内容の保存を有効にする</label></li>',
'			<li><input type="checkbox" id="funccheck3" name="TextLink" value="" tabindex="9" accesskey="l" /><label for="funccheck3">URLのリンク化</label></li>',
'			<li class="child"><input type="checkbox" id="funccheck4" name="TabLink" value="" tabindex="10" accesskey="m" /><label for="funccheck4">リンク化したリンクを新規タブで開く</label></li>',
'			<li class="child"><input type="checkbox" id="funccheck5" name="PicPopup" value="" tabindex="11" accesskey="n" /><label for="funccheck5">画像URLのポップアップ表示</label></li>',
'			<li class="child">リンク先に飛ぶとき経由するサイト',
'			<select id="viasite" name="site" tabindex="12">',
'			<option value="" selected="selected">経由サイト無し</option>',
'			<option value="http://www.aguse.jp/?m=w&amp;url=">aguse.jp</option>',
'			<option value="http://tor-proxy.net/proxy/express/browse.php?u=">tor-proxy.net</option>',
'			</select>',
'			</li>',
'			<li class="child"><label for="viasite">※Ctrlキーを押しながらクリックで経由サイト無しで飛ぶことも可能</label></li>',
'			<li>プレイヤー＆取引掲示板でよく使用するサーバー',
'			<select id="mainserver" name="server" tabindex="13">',
'			<option value="no" selected="selected">サーバー選択無し</option>',
'			<option value="ma">マリー</option>',
'			<option value="ru">ルエリ</option>',
'			<option value="ta">タルラーク</option>',
'			<option value="mo">モリアン</option>',
'			<option value="ki">キホール</option>',
'			<option value="to">トリアナ</option>',
'			</select>',
'			</li>',
'			<li><input type="checkbox" id="funccheck6" name="FrameRelease" value="" tabindex="14" accesskey="o" /><label for="funccheck6">公式TOPのフレーム解除</label></li>',
'			<li><input type="checkbox" id="funccheck7" name="TitleChange" value="" tabindex="15" accesskey="p" /><label for="funccheck7">ページタイトルの変更</label></li>',
'			<li><input type="checkbox" id="funccheck8" name="MemoCheck" value="" tabindex="16" accesskey="q" /><label for="funccheck8">公式サイトにログイン中メモを定期的にチェック</label></li>',
'			<li class="child"><input type="checkbox" id="funccheck9" name="MemoCheckPop" value="" tabindex="17" accesskey="r" /><label for="funccheck9">新着を確認したらポップアップメッセージで通知</label></li>',
'			<li><input type="checkbox" id="funccheck10" name="UpdateCheck" value="" tabindex="17" accesskey="r" /><label for="funccheck10">Mabinogi Browse Helperの更新を定期的にチェックする</label></li>',
'	</ul>',
'	</fieldset>',
'	</div>',
'	<div id="contents1" class="noviewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="h">NGName設定</legend>',
'		<p>NGNameの編集ができます。名前毎に「|-|」で区切って入力してください。',
'		例：名前１|-|名前２</p>',
'		<a href="#" class="textbtn" onclick="text_add(\'ngnametext\',\'|-|\');return false;" ',
'		 onkeypress="text_add(\'ngnametext\',\'|-|\');return false;">「|-|」を追加</a>',
'		<a href="#" class="textbtn" onclick="text_clear(\'ngnametext\');return false;"',
'		 onkeypress="text_clear(\'ngnametext\');return false;">Clear</a>',
'		<textarea rows="5" cols="56" id="ngnametext" tabindex="8" accesskey="i">TEXT</textarea>',
'	</fieldset>',
'	</div>',
'	<div id="contents2" class="noviewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="j">NGWord設定</legend>',
'		<p>NGWordの編集ができます。Word毎に「|-|」で区切って入力してください。',
'		例：単語１|-|単語２</p>',
'		<a href="#" class="textbtn" onclick="text_add(\'ngwordtext\',\'|-|\');return false;"',
'		 onkeypress="text_add(\'ngwordtext\',\'|-|\');return false;">「|-|」を追加</a>',
'		<a href="#" class="textbtn" onclick="text_clear(\'ngwordtext\');return false;"',
'		 onkeypress="text_clear(\'ngwordtext\');return false;">Clear</a>',
'		<textarea rows="5" cols="56" id="ngwordtext" tabindex="8" accesskey="k">TEXT</textarea>',
'	</fieldset>',
'	</div>',
'	<div id="contents3" class="noviewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="l">魚拓履歴</legend>',
'		<p>魚拓ボタンを押した履歴一覧です。</p>',
'		<a href="#" class="textbtn" onclick="text_clear(\'fishlog\');return false;"',
'		 onkeypress="text_clear(\'fishlog\');return false;">Clear</a>',
'		<textarea wrap="off" rows="5" cols="56" id="fishlog" tabindex="8" accesskey="m">TEXT</textarea>',
'	</fieldset>',
'	</div>',
'	<div id="contents4" class="noviewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="l">登録キャラ</legend>',
'		<p>登録したキャラクターの編集ができます。<br/>',
'		キャラクター情報毎に「|-|」で区切って入力してください。<br/>',
'		キャラクター情報はキャラ名,アバター番号,マビノギIDインデックス番号<br/>',
'		で構成されています。※キャラ情報の追加よりは削除のみにするのを推奨<br/>',
'		例：キャラ１|-|キャラ２</p>',
'		<a href="#" class="textbtn" onclick="text_clear(\'cctext\');return false;"',
'		 onkeypress="text_clear(\'fishlog\');return false;">Clear</a>',
'		<textarea wrap="off" rows="5" cols="56" id="cctext" tabindex="8" accesskey="m">TEXT</textarea>',
'	</fieldset>',
'	</div>',
'	<div id="contents5" class="noviewcontents">',
'	<fieldset class="optionfeild"><legend accesskey="l">登録取り引きアイテム</legend>',
'		<p>取引板でチェックするアイテムの編集ができます。<br/>',
'		検索する単語毎に「|-|」で区切って入力してください。<br/>',
'		(全角カナで入力すると半角カナでも検索されます。)<br/>',
'		基本設定のよく使用するサーバーをチェックします。<br/>',
'		例：クレシダ|-|IS1P</p>',
'		<a href="#" class="textbtn" onclick="text_clear(\'itemtext\');return false;"',
'		 onkeypress="text_clear(\'fishlog\');return false;">Clear</a>',
'		<textarea wrap="off" rows="5" cols="56" id="itemtext" tabindex="8" accesskey="m">TEXT</textarea>',
'	</fieldset>',
'	</div>',
'	<p style="text-align: right;">',
'	<input id="mainok" class="endbtn" type="submit" value="OK" onclick="return false;" onkeypress="return false;" tabindex="99" accesskey="h"/>',
'	<input id="maincancell" class="endbtn" type="button" value="キャンセル" onclick="return false;" onkeypress="return false;" tabindex="100" accesskey="i"/>',
'	</p>',
'	</div>'].join("\n");

	//ダイアログのスタイルシート情報
	var body_css_date =
	['',
'	 div.optionframe {',
'	 position: fixed; ',
'	 width: 512px; ',
'	 visibility: visible; ',
'	 display: block; ',
'	 left: 453.5px; ',
'	 top: 46px; ',
'	 z-Index: 999999; ',
'	 display: block; ',
'	 border: solid 1px #000000; ',
'	 background-color: #F0F0F0;',
'	 text-align:center;',
'	}',
'	div.optionframe ul{',
'	 list-style-image:none;',
'	 list-style-position:outside;',
'	 list-style-type:none;',
'	 margin: 0px;',
'	 padding: 2px;',
'	}',
'	div.optionframe input {',
'	 font-family:use-system-font;',
'	 font-size:use-system-font;',
'	 font-size-adjust:use-system-font;',
'	 font-stretch:-moz-use-system-font;',
'	 font-style:-moz-use-system-font;',
'	 font-variant:-moz-use-system-font;',
'	 font-weight:-moz-use-system-font;',
'	 line-height:-moz-use-system-font;',
'	}',
'	div.optionframe label {',
'	 color: #000000;',
'	}',
'	div.optionframe p {',
'	 color: #000000;',
'	}',
'	div.optionframe a {',
'	 color: #000000;',
'	}',
'	div.viewcontents{',
'	 display: block;',
'	 clear: both;',
'	}',
'	div.noviewcontents{',
'	 display: none;',
'	 clear: both;',
'	}',
'	fieldset.optionfeild {',
'	 border-radius:4px;',
'	 border:1px solid threedshadow;',
'	 text-align:left;',
'	 margin:1em;',
'	 color: #000000;',
'	}',
'	fieldset.optionfeild li{',
' 	 color: #000000;',
'	}',
'	fieldset.ng {',
'	 margin-top: 0px;',
'	 margin-bottom: 0px;',
'	 width: 120px;',
'	 color: #000000;',
'	}',
'	ul.ng {',
'	 margin-left: 2em;',
'	}',
'	ul.topframe {',
'	 border-bottom: solid 1px #000000;',
'	 height: 25px;',
'	}',
'	li.toolbtn {',
'	 display:block;',
'	 float:left;',
'	 background-color: #D7D7D7;',
'	 border: solid 1px;',
'	 width:75px;',
'	 height:26px;',
'	 margin-right:5px;',
'	 text-align:center;',
'	 cursor: default;',
'	 color: #000000;',
'	}',
'	li.activebtn {',
'	 background-color: #F0F0F0; ',
'	 border-bottom-color: #F0F0F0;',
'	}',
'	li.child{',
'	 margin-left: 20px;',
'	}',
'	input.endbtn {',
'	 margin-right:1em;',
'	 padding:2px;',
'	 width:8em',
'	}',
'	a.textbtn {',
'	 margin-left: 30px;',
'	}',
'	'].join("\n");
	//ダイアログのスタイルシート追加
	addGlobalStyle(body_css_date);
	//バック画面を表示
	document.getElementById('dialog-background').style.visibility = 'visible'
	//設定ダイアログのフレーム
	var frame = document.createElement('div');
	frame.id	= 'optionframe'
	frame.setAttribute('class', 'optionframe');
	//ダイアログを追加
	frame.innerHTML	= body_date;
	document.getElementsByTagName('body')[0].appendChild(frame);
	//ダイアログのスクリプト
	unsafeWindow.text_clear = function(id){
			if(confirm("テキストエリアの内容を消してよろしいですか？")){
			document.getElementById(id).value=''
			}
		};
	unsafeWindow.text_add = function(id,word){
		var	text = document.getElementById(id).value;
		text = text + word;
		document.getElementById(id).value = text;
		};
	unsafeWindow.change_contents = function(number){
		for(var i=0;i<6;i++){
			document.getElementById("contents" + i).className = "noviewcontents";
			document.getElementById("topbtn" + i).className = "toolbtn";
		}
		document.getElementById("contents" + number).className = "viewcontents";
		document.getElementById("topbtn" + number).className = "toolbtn activebtn";
		};
	//ダイアログの処理に関する関数を呼び出し
	setting_process();
}

//NG追加処理関数
function NG_add_btn(){
	var ngtext = window.getSelection();
	ngtext = ngtext.toString();
	//選択範囲が空の場合
	if(ngtext == ''){
		alert('NGしたい名前や単語を選択した状態でクリックしてください。(＊20文字まで)');
	}
	else {
			if(confirm("選択した値を" + this.title + "に追加します。よろしいですか？")){
			var NGDate;
			NGDate = GM_getValue(this.title,'');
			if(NGDate.length != 0)NGDate += "|-|";
			NGDate += trim(ngtext).substr(0,20);
			GM_setValue(this.title,NGDate);
			location.reload();
		}
	}
}



//キャラロード処理関数
function cc_load(charc){
	var personalURL = "http://mabinogi.nexon.co.jp/6th/personal/personal.asp";
	var charaChangeURL = "https://www.mabinogi.jp/6th/personal/module/_personal_chara.asp";
	var idChangeURL = "https://www.mabinogi.jp/6th/personal/module/_personal_id.asp";
	GM_xmlhttpRequest({
		method: "GET",
		url: personalURL,
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(response){
			//公式にログインしていない場合
			if(response.responseText.match(/ご指定のサービスはログインが必要です。/)){
				alert('公式にログインしていません。');
				return false;
			}
			//公式にログインしている場合
			if(confirm("キャラクターを" + charc +  "に変更しますか？")){
				CCDate = GM_getValue('CCDate','');
				//キャラクターのアバターIDとマビノギIDインデックス番号を取得
				charc	= charc.replace("(","\\(");
				charc	= charc.replace(")","\\)");
				var reg = new RegExp(charc + ',([0-9]+),([0-9]+)');
				avtData = CCDate.match(reg);
				var avtID = avtData[1];
				var mabiIDidx = avtData[2];
				//マビノギIDインデックス番号からマビノギIDを取得
				var resDom = htmlParser(response.responseText);
				var selectItem = document.evaluate("//select[@id='avtID']", resDom.firstChild, null, 7, null);//参考サイトはキャラロード登録に
				var mabiID = selectItem.snapshotItem(0)[mabiIDidx].value;
				//ID変更のデータ送信
				GM_xmlhttpRequest({
					method: "POST",
					url: idChangeURL,
					headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
						'Content-type': 'application/x-www-form-urlencoded'},
					data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
					onload: function(response) {
						if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
							alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
							return false;
						}
						//キャラクター変更のデータ送信
						GM_xmlhttpRequest({
							method: "POST",
							url: charaChangeURL,
							headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
								'Content-type': 'application/x-www-form-urlencoded'},
							data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
							onload: function(response) {
								if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
									alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
									return false;
								}
								location.href=location.href;
							}
						})
					}
				})
			}
		}
	})
}

//キャラ登録処理関数
function cc_add_btn(){
	var targetURL = "http://mabinogi.nexon.co.jp/6th/personal/personal.asp";
	GM_xmlhttpRequest({
		method: "GET",
		url: targetURL,
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(response){
			//公式にログインしていない場合
			if(response.responseText.match(/ご指定のサービスはログインが必要です。/)){
				alert('公式にログインしていません。');
				return false;
			}
			//公式にログインしている場合
			if(confirm("現在選択中のキャラクターを登録しますか？")){
					var resDom = htmlParser(response.responseText);
					//firefoxの仕様？のせいでdocument.evaluateするのに苦労したので下に参考サイト
					//http://javascript.g.hatena.ne.jp/edvakf/20090223
					var selectItem = document.evaluate("//select[@id='avtID' or @id='avtChara']", resDom.firstChild, null, 7, null);
					//現在使用しているマビノギIDを取得
					var avtID = selectItem.snapshotItem(0).selectedIndex;
					//現在使用しているアバターキャラクターIDとキャラクター名を取得
					var avtElm = selectItem.snapshotItem(1);
					var avtidx = avtElm.selectedIndex;
			        	var avtVal = avtElm[avtidx].value;
			        	var avtName = avtElm[avtidx].text;
					var CCDate;
					CCDate = GM_getValue('CCDate','');
					if(CCDate.length != 0)CCDate += "|-|";
					CCDate += avtName + ',' + avtVal + ',' + avtID ;
					GM_setValue('CCDate',CCDate);
					location.reload();
			}
		}
	})
}



//アイテム削除処理関数
function item_del(charc){
	if(confirm("このアイテムを削除しますか？")){
		var ItemDate, ItemDate2;
		ItemDate2 = "";
		ItemDate = GM_getValue('ItemDate','');
		ItemDate = ItemDate.split("|-|");
		for(n = 0; n < ItemDate.length; n++) {
			//押されたボタンのアイテム以外を再登録
			if(ItemDate[n] != charc){
				if(ItemDate2.length != 0)ItemDate2 += "|-|";
				//現在使用しているキャラクターを取得
				ItemDate2 += ItemDate[n];
			}
		}
		GM_setValue('ItemDate',ItemDate2);
		location.reload();
	}
}

//アイテム登録処理関数
function item_add_btn(){
	var ItemDate, ItemName;
	ItemName = window.prompt("アイテム名を入力してください。例:クレシダ", "");
	if(ItemName != "" && ItemName != null){
		ItemDate = GM_getValue('ItemDate','');
		if(ItemDate.length != 0)ItemDate += "|-|";
		//アイテムデータに入力されたアイテムをセット
		ItemDate += ItemName;
		GM_setValue('ItemDate',ItemDate);
		if(GM_getValue('mainserver','no0') == "no0"){
			alert("オプションの基本設定で選択したサーバーがチェックされます。設定してください。");
		}
		location.reload();
	}else{
		alert('登録がキャンセルされました。');
	}
}

function check_item_click(href,id){
	var tmpDate =GM_getValue('CheckItemDate','');
	tmpDate = tmpDate.split("|-|");
	tmpDate.splice(id.substr(id.length-1),2);
	GM_setValue('CheckItemDate',tmpDate.join("|-|"));
	location.href=href;
}

function del_item_click(){
	if(confirm("全て削除しますか？")){
		GM_setValue('CheckItemDate','');
		location.reload();
	}
}

//取引板チェック処理関数
function item_check(){
//アラートチェックの初期化
GM_setValue('AlertCheck','True')
//5分毎にチェック
item_timer = window.setInterval(function() {
	var sv = GM_getValue('mainserver','no0').substr(0,2);
	//サーバーが選択されてない場合チェックしない
	if(sv == "no"){
		//clearInterval(item_timer);
		return false;
	}
	var ItemDate, ItemDate2, PreTitle;
	var n = 0;
	var wait = false;
	var ReLoad= false;
	ItemDate = GM_getValue('ItemDate','');
	//アイテムが登録されてない場合チェックしない
	if(ItemDate == ""){
		//clearInterval(item_timer);
		return false;
	}
	//アイテムデータの変更を確認
	ItemDate2 = GM_getValue('ItemDate2','');
	PreTitle = GM_getValue('PreTitle','')
	if(ItemDate != ItemDate2){
		//前アイテムデータを初期化
		GM_setValue('ItemDate2','');
		ReLoad = true;
	}
	//時間経過のチェック
	var start = GM_getValue('CheckTimeDate','No Date');
	now = new Date();
	if(start == 'No Date'){
		//データがない場合作成
		start = "" + now.getTime();
		GM_setValue('CheckTimeDate',start);
	}
	start = eval(start);
	start = parseInt((now.getTime() - start) / 1000);
	//0分以上5分未満の場合チェックしない
	if((0 <= parseInt(start / 60)) && (parseInt(start / 60) < 5)){
		//clearInterval(item_timer);
		return false;
	}
	GM_setValue('CheckTimeDate',"" + now.getTime());
	//アラートチェック
	if(GM_getValue('AlertCheck','True') == 'False'){
		//clearInterval(item_timer);
		return false;
	}
	ItemDate = ItemDate.split("|-|");
	PreTitle = PreTitle.split("|-|");
	//前タイトルデータを初期化
	GM_setValue('PreTitle','');
	//取引板でアイテムをチェックする関数
	function func1(){
		var targetURL = "http://mabinogi.nexon.co.jp/6th/community/tradeBoardList.asp?st=t&se=" + ItemDate[n] + "&sv=" + sv;
		GM_xmlhttpRequest({
			method: "GET",
			url: targetURL,
			headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
				'Content-type': 'application/x-www-form-urlencoded'},
			onload:function(resp){
				var restext = resp.responseText;
				var find = false;
				//一番上にある記事のタイトルを取得
				restext = restext.match(/<a href="(.*tradeBoardContent.*)">([\s\S]*?)<\/a>/);
				var CheckItemDate=restext[1] + "|-|";
				restext	= trim(restext[2]);
				while(restext.indexOf("<")>=0){
				restext = restext.match(/(.*)<.*>(.*)<\/.*>(.*)/);
				restext = restext[1] + restext[2] + restext[3];
				restext == restext[0]
				}
				CheckItemDate += restext;
				if(ReLoad == false){
				//ReLoadがfalseならタイトル比較
					//前回取得のタイトルと取得タイトルを比較
					if(restext != PreTitle[n]){
						//新しい記事を発見
						find = true;
						var CheckItemDates = GM_getValue('CheckItemDate','');
						if(CheckItemDates.length != 0)CheckItemDates += "|-|";
						CheckItemDates += CheckItemDate;
						GM_setValue('CheckItemDate',CheckItemDates);
						//新着取り引き記事更新
						document.getElementById('checkitembutton').parentNode.removeChild(document.getElementById('checkitembutton'));
						//チェックアイテムボタン作成
						var checkitembutton = document.createElement('div');
						checkitembutton.id	= 'checkitembutton';
						checkitembutton.className= 'setbtn';
						checkitembutton.setAttribute("onclick","return false;");
						checkitembutton.setAttribute("onmouseover","this.style.borderColor='#A3A3A3'");
						checkitembutton.setAttribute("onmouseout","this.style.borderColor='#CCCCCC'");
						checkitembutton.innerHTML = '<div id="itemview">　新着取り引き記事　</div>';
						document.getElementsByTagName('body')[0].appendChild(checkitembutton);
						//チェックアイテムのリンク作成
						var CheckItemDate;
						CheckItemDate = GM_getValue('CheckItemDate','');
						CheckItemDate = CheckItemDate.split("|-|");
						for(var q = 0; q < CheckItemDate.length; q+=2) {
							if(CheckItemDate[q+1] == null)break;
							var itemlinkbutton = document.createElement('div');
							itemlinkbutton.setAttribute("id","CheckItemDate" + q);
							itemlinkbutton.setAttribute("title",CheckItemDate[q]);
							itemlinkbutton.setAttribute("onclick","return false;");
							itemlinkbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';");
							itemlinkbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';");
							itemlinkbutton.innerHTML	=	CheckItemDate[q+1];
							document.getElementById('checkitembutton').appendChild(itemlinkbutton);
							document.getElementById("CheckItemDate" + q).addEventListener('click',function(e){check_item_click(this.title,this.id)}, false);
						}
					}
				}else{
				//trueならタイトル比較せず前アイテムデータ更新
					//前アイテムデータ更新
					var ItemDatetmp = GM_getValue('ItemDate2','');
					if(ItemDatetmp.length != 0)ItemDatetmp += "|-|";
					ItemDatetmp += ItemDate[n];
					GM_setValue('ItemDate2',ItemDatetmp);
				}
				//前タイトルデータ更新
				var GetTitle = GM_getValue('PreTitle','');
				if(GetTitle.length != 0)GetTitle += "|-|";
				GetTitle += restext;
				GM_setValue('PreTitle',GetTitle);

				//新着があったらアラート
				if(find == true){
				GM_setValue('AlertCheck','False')
				alert("新しい記事:" + restext + "を発見");
				GM_setValue('AlertCheck','True')
				}

				//次の処理に進む
				n++;
				//処理終了判定
	                        if(n >= ItemDate.length){
					clearInterval(timerID);
					timerID = null;
	                        }
				wait = false;
			}
		})
	}
	//同期しながらアイテムチェックの処理をする
	timerID = setInterval( function(){
	                         if(wait == false)func1();
				 wait = true;
	                        },500);
},300000);
}
item_check();

//メモ送信の処理に関する関数
function memo_process() {

//各種チェック
if(document.getElementById('ToCharName').value==""){
alert('相手の名前を入力して下さい。');
document.getElementById('ToCharName').focus();
return false;
}
if(document.getElementById('ToMessage').value==""){
alert('メモを入力して下さい。');
document.getElementById('ToMessage').focus();
return false;
}
if(document.getElementById('ToMessage').value.length>=500){
alert('メモは500文字まで入力できます。');
document.getElementById('ToMessage').focus();
return false;
}


if(confirm("メモを送信しますか？")){
	var change_char = document.getElementById('FromChar').value;
	var sv_num = document.getElementById('ToServer').selectedIndex + 1;
	var t_name = document.getElementById('ToCharName').value;
	var s_txt  = document.getElementById('ToMessage').value;
	var now_char;
	var personalURL = "http://mabinogi.nexon.co.jp/6th/personal/personal.asp";
	var charaChangeURL = "https://www.mabinogi.jp/6th/personal/module/_personal_chara.asp";
	var idChangeURL = "https://www.mabinogi.jp/6th/personal/module/_personal_id.asp";
	var memoURL = "http://mabinogi.nexon.co.jp/6th/personal/memoBoxSnd.asp";
	//現在使用しているキャラ以外で送信
	if(change_char != ""){
		GM_xmlhttpRequest({
		method: "GET",
		url: personalURL,
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(response){
			//公式にログインしていない場合
			if(response.responseText.match(/ご指定のサービスはログインが必要です。/)){
				alert('公式にログインしていません。');
				return false;
			}
			//公式にログインしている場合
			var resDom = htmlParser(response.responseText);
			var selectItem = document.evaluate("//select[@id='avtID' or @id='avtChara']", resDom.firstChild, null, 7, null);//参考サイトはキャラロード登録に
			//元のキャラクターに戻るために現在使用しているキャラクター名を取得する。
			var avtElm = selectItem.snapshotItem(1);
			var avtidx = avtElm.selectedIndex;
			now_char = avtElm[avtidx].text;

			//キャラクターのアバターIDとマビノギIDインデックス番号を取得
			CCDate = GM_getValue('CCDate','');
			change_char = change_char.replace("(","\\(");
			change_char = change_char.replace(")","\\)");
			var reg = new RegExp(change_char + ',([0-9]+),([0-9]+)');
			avtData = CCDate.match(reg);
			var avtID = avtData[1];
			var mabiIDidx = avtData[2];
			//マビノギIDインデックス番号からマビノギIDを取得
			var IDElm = selectItem.snapshotItem(0);
			var mabiID = IDElm[mabiIDidx].value;
			//ID変更のデータ送信
			GM_xmlhttpRequest({
			method: "POST",
			url: idChangeURL,
			headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
				'Content-type': 'application/x-www-form-urlencoded'},
			data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
			onload: function(response) {
				if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
					alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
					return false;
				}
				//キャラクター変更のデータ送信
				GM_xmlhttpRequest({
				method: "POST",
				url: charaChangeURL,
				headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
					'Content-type': 'application/x-www-form-urlencoded'},
				data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
				onload: function(response) {
					if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
						alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
						return false;
					}
					//メモを送信
					GM_xmlhttpRequest({
					method: "POST",
					url: memoURL,
					headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
						'Content-type': 'application/x-www-form-urlencoded'},
					data: 'toServer=mabijp' + sv_num + '&toCharName=' + t_name + '&toMessage=' + s_txt,
					onload: function(response) {
						//元のキャラクターに変更する
						GM_xmlhttpRequest({
						method: "GET",
						url: personalURL,
						headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
							'Content-type': 'application/x-www-form-urlencoded'},
						onload:function(response){
							CCDate = GM_getValue('CCDate','');
							//キャラクターのアバターIDとマビノギIDインデックス番号を取得
							now_char	= now_char.replace("(","\\(");
							now_char	= now_char.replace(")","\\)");
							var reg = new RegExp(now_char + ',([0-9]+),([0-9]+)');
							avtData = CCDate.match(reg);
							var avtID = avtData[1];
							var mabiIDidx = avtData[2];
							//マビノギIDインデックス番号からマビノギIDを取得
							var resDom = htmlParser(response.responseText);
							var selectItem = document.evaluate("//select[@id='avtID']", resDom.firstChild, null, 7, null);//参考サイトはキャラロード登録に
							var mabiID = selectItem.snapshotItem(0)[mabiIDidx].value;
							GM_xmlhttpRequest({//ID変更のデータ送信
							method: "POST",
							url: idChangeURL,
							headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
								'Content-type': 'application/x-www-form-urlencoded'},
							data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
							onload: function(response) {
								if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
									alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
									return false;
								}
								GM_xmlhttpRequest({//キャラクター変更のデータ送信
								method: "POST",
								url: charaChangeURL,
								headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
									'Content-type': 'application/x-www-form-urlencoded'},
								data: 'act=&avtID=' + mabiID + '&avtChara=' + avtID,
								onload: function(response) {
									if(response.responseText.match(/ご指定のURLはアクセスできません。/)){
										alert('キャラクターが存在しないか、キャラクター情報が間違っています。\n別のネクソンIDでログインするか、再度キャラクターを登録してください。');
										return false;
									}
									alert('メモを送信しました。');
								}})
							}})
						}})
					}})
				}})
			}})
		}})
	}else{
		//現在のキャラクターで送信
		//ログイン確認のためのRequest
		GM_xmlhttpRequest({
		method: "GET",
		url: personalURL,
		headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
			'Content-type': 'application/x-www-form-urlencoded'},
		onload:function(response){
			//公式にログインしていない場合
			if(response.responseText.match(/ご指定のサービスはログインが必要です。/)){
				alert('公式にログインしていません。');
				return false;
			}
			//メモを送信
			GM_xmlhttpRequest({
			method: "POST",
			url: memoURL,
			headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
				'Content-type': 'application/x-www-form-urlencoded'},
			data: 'toServer=mabijp' + sv_num + '&toCharName=' + t_name + '&toMessage=' + s_txt,
			onload: function(response) {
				alert('メモを送信しました。');
			}
			})
		}
		})
	}
		//ダイアログを閉じる処理
		document.getElementById('memoframe').style.display = 'none';
		document.getElementById('dialog-background').style.visibility = 'hidden';
}
}

//メモ送信関数
function memo_dialog(tname, tsv){
	
	var startElem = document.getElementById('memoframe');
	if(startElem){
		//呼び出し2回目以降はフレームを生成しないで設定＆表示のみ
		startElem.style.display = 'block';
		document.getElementById('dialog-background').style.visibility = 'visible';
	}else{
		//初回呼び出し時はフレーム生成

		//メモ送信ダイアログのbody情報
		var body_date=['',
'		<div id="memoframe" class="memoframe">',
'		<table cellspacing="0" cellpadding="0" border="0">',
'		<tbody><tr>',
'		<td style="width: 130px;"><label for="FromChar" accesskey="f">送信者(F)</label></td>',
'		<td>',
'		<select id="FromChar" name="FromChar" tabindex="1">',
'		<option value="" selected="selected">現在のキャラクター</option>',
'		</select>',
'		<label for="FromChar">キャラ変更に登録したキャラ</label>',
'		</td>',
'		</tr>',
'		<tr>',
'		<td style="width: 130px;"><label for="ToServer" accesskey="t">相手の名前(T)</label></td>',
'		<td><select id="ToServer" name="ToServer" tabindex="2">',
'		<option value="ma" selected="selected">マリー</option>',
'		<option value="ru">ルエリ</option>',
'		<option value="ta">タルラーク</option>',
'		<option value="mo">モリアン</option>',
'		<option value="ki">キホール</option>',
'		<option value="to">トリアナ</option>',
'		</select>',
'		<input type="text" value="" name="ToCharName" id="ToCharName" tabindex="3"/>',
'		</td>',
'		</tr>',
'		</tbody></table>',
'		<textarea style="width: 450px;height: 100px;" name="ToMessage" id="ToMessage" tabindex="4">テキスト</textarea>',
'		<p style="text-align: right;">',
'		<input id="send_ok" class="endbtn" type="submit" value="送信" onclick="return false;" onkeypress="return false;" tabindex="99" accesskey="s"/>',
'		<input id="send_cancell" class="endbtn" type="button" value="キャンセル" onclick="return false;" onkeypress="return false;" tabindex="100" accesskey="c"/>',
'		</p>',
'		</div>'].join("\n");


		//メモ送信ダイアログのスタイルシート情報
		var body_css_date =
		['',
'		div.memoframe {',
'		 position: fixed; ',
'		 width: 457px; ',
'		 visibility: visible; ',
'		 display: block; ',
'		 left: 453.5px; ',
'		 top: 46px; ',
'		 z-Index: 999999; ',
'		 display: block; ',
'		 border: solid 1px #000000; ',
'		 background-color: #F0F0F0;',
'		 text-align:left;',
'		}',
'		'].join("\n");
		//メモ送信ダイアログのスタイルシート追加
		addGlobalStyle(body_css_date);
		//バック画面を表示
		document.getElementById('dialog-background').style.visibility = 'visible';
		//メモ送信ダイアログのフレーム
		var frame = document.createElement('div');
		frame.id	= 'memoframe';
		frame.setAttribute('class', 'memoframe');
		//メモ送信ダイアログを追加
		frame.innerHTML	= body_date;
		document.getElementsByTagName('body')[0].appendChild(frame);
		//登録したキャラをドロップボックスに追加
		var CCDate;
		CCDate = GM_getValue('CCDate','');
		CCDate = CCDate.split("|-|");
		var sbox = document.getElementById('FromChar');
		for(var n = 0; n < CCDate.length; n++) {
				sbox.length = sbox.length + 1;
	    			sbox.options[sbox.length-1].value = CCDate[n].split(",")[0];
	    			sbox.options[sbox.length-1].text = CCDate[n].split(",")[0];
		}
		//現在のキャラクターをセット

		//メモ送信ダイアログを閉じる処理
		document.getElementById('send_cancell').addEventListener('click',
		function(event){
			//メモ送信ダイアログを閉じる処理
			document.getElementById('memoframe').style.display = 'none';
			document.getElementById('dialog-background').style.visibility = 'hidden';
		}, false);
		//メモを送信する処理を呼び出すための処理
		document.getElementById('send_ok').addEventListener('click',
		function(event){memo_process();}, false);
	}
	//初期設定を反映させる

	//送信者情報のセレクトボタンの設定
	if(tsv != ''){
		//相手のサーバーセレクトボタンの設定
		sbtn_selected('ToServer',tsv);
		//相手の名前の設定
		document.getElementById('ToCharName').value = tname;
	}else{
		//相手のサーバーセレクトボタンの設定
		document.getElementById('ToServer').selectedIndex = 0;
		//相手の名前の設定
		document.getElementById('ToCharName').value = '';
	}
}


//右上ボタンの表示関数
function setting_button() {

//設定ボタンとバック画面作成
	//メモボタンと設定ボタンとバック画面のスタイルシート情報
	var btn_css_date =
	['',
'	div.dialog-background { ',
'	 position: fixed; ',
'	 width: 100%; ',
'	 height: 100%; ',
'	 visibility: hidden; ',
'	 left: 0px; top: 0px; ',
'	 z-Index: 999998; ',
'	 opacity: 0.3; ',
'	 background-color: #000000;',
'	}',
'	div.setbtn {',
'	 -moz-user-select: none; /* クリック時に選択範囲を消さない */',
'	 -khtml-user-select: none; /* クリック時に選択範囲を消さない */',
'	 border-radius: 0px 0px 10px 10px;  /* 角丸 */',
'	 -webkit-border-bottom-left-radius: 10px;  /* 左下 */',
'	 -webkit-border-bottom-right-radius: 10px; /* 右下 */',
'	 border: 3px #D9D9D9 solid;     /* 枠線の装飾 */',
'	 background-color: #FFFFFF;   /* 背景色 */',
'	 padding: 3px;',
'	 font-weight: bold;',
'	 color: #CCCCCC;',
'	 cursor: pointer;',
'	 border-top: none;',
'	 position: fixed;',
'	 top: 0px;',
'	 z-Index: 999997;',
'	}',
'	a.memo {',
'	 bottom: 1%; ',
'	 right: 1%;',
'	 cursor: pointer;',
'	 position: fixed;',
'	 z-Index: 999997;',
'	}',
'	div#settingbutton {',
'	 right: 0px;',
'	}',
'	div#ngbutton {',
'	 right: 70px;',
'	 width: 50px;',
'	}',
'	div#memobutton {',
'	 right: 135px;',
'	}',
'	div#fishbutton {',
'	 right: 185px;',
'	}',
'	div#ccbutton {',
'	 right: 226px;',
'	 width: 156px;',
'	}',
'	div#itembutton {',
'	 right: 397px;',
'	}',
'	div#searchbutton {',
'	 right: 525px;',
'	}',
'	div#sendm {',
'	 right: 593px;',
'	}',
'	div#checkitembutton {',
'	 right: 700px;',
'	}',
'	div#eventbutton {',
'	 left: 5px;',
'	}',
'	div#ngaddview{color: #CCCCCC;}',
'	div#ngnamebtn{color: #CCCCCC;margin-top: 5px;}',
'	div#ngwordbtn{color: #CCCCCC;margin-top: 5px;}',
'	div#ccview{color: #CCCCCC;}',
'	div#itemview{color: #CCCCCC;}',
'	'].join("\n");
	addGlobalStyle(btn_css_date);
	//バック画面
	var backscreen = document.createElement('div');
	backscreen.id		= 'dialog-background'
	backscreen.setAttribute('class', 'dialog-background');
	document.getElementsByTagName('body')[0].appendChild(backscreen);
	//設定ボタン
	var button = document.createElement('div');
	button.id	= 'settingbutton';
	button.className= 'setbtn';
	button.setAttribute("onclick","return false;");
	button.setAttribute("onmouseover","this.style.color='#A3A3A3';this.style.borderColor='#A3A3A3';");
	button.setAttribute("onmouseout","this.style.color='#CCCCCC';this.style.borderColor='#CCCCCC';");
	button.innerHTML= 'オプション';
	document.getElementsByTagName('body')[0].appendChild(button);
	//クリック時にオプションダイアログ呼び出し
	button.addEventListener('click',setting_dialog, false);
//NG追加ボタン作成
	var ngbutton = document.createElement('div');
	ngbutton.id	= 'ngbutton';
	ngbutton.className= 'setbtn';
	ngbutton.setAttribute("onclick","return false;");
	ngbutton.setAttribute("onmouseover","this.style.borderColor='#A3A3A3';document.getElementById('ngaddbtn').style.display='block';document.getElementById('ngaddview').style.color='#A3A3A3';");
	ngbutton.setAttribute("onmouseout","this.style.borderColor='#CCCCCC';document.getElementById('ngaddbtn').style.display='none';document.getElementById('ngaddview').style.color='#CCCCCC';");
	document.getElementsByTagName('body')[0].appendChild(ngbutton);
	var ngbtn_date=['',
'	<span>',
'	<div id="ngaddview">NG追加</div>',
'	<div id="ngaddbtn" style="display:none;">',
'	<div id="ngnamebtn" title="NGName" onclick="return false;" onmouseover="this.style.color=\'#A3A3A3\';" onmouseout="this.style.color=\'#CCCCCC\';">',
'	NGName</div>',
'	<div id="ngwordbtn" title="NGWord" onclick="return false;" onmouseover="this.style.color=\'#A3A3A3\';" onmouseout="this.style.color=\'#CCCCCC\';">',
'	NGWord</div>',
'	</div>',
'	</span>'].join("\n");
	ngbutton.innerHTML= ngbtn_date;
	document.getElementsByTagName('body')[0].appendChild(ngbutton);
	//NGName,NGWordボタンクリック時にNG追加処理呼び出し
	document.getElementById('ngnamebtn').addEventListener('click',NG_add_btn, false);
	document.getElementById('ngwordbtn').addEventListener('click',NG_add_btn, false);
//メモボタン
	var memobutton = document.createElement('div');
	memobutton.id	= 'memobutton';
	memobutton.className= 'setbtn';
	memobutton.setAttribute("onclick","return false;");
	memobutton.setAttribute("onmouseover","this.style.color='#A3A3A3';this.style.borderColor='#A3A3A3';");
	memobutton.setAttribute("onmouseout","this.style.color='#CCCCCC';this.style.borderColor='#CCCCCC';");
	memobutton.innerHTML= 'メモ帳';
	document.getElementsByTagName('body')[0].appendChild(memobutton);
	//クリック時にメモテキスト処理呼び出し
	memobutton.addEventListener('click',memo_text, false);
//魚拓ボタン
	var fishbutton = document.createElement('div');
	fishbutton.id	= 'fishbutton';
	fishbutton.className= 'setbtn';
	fishbutton.setAttribute("onclick","return false;");
	fishbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';this.style.borderColor='#A3A3A3';");
	fishbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';this.style.borderColor='#CCCCCC';");
	fishbutton.innerHTML= '魚拓';
	document.getElementsByTagName('body')[0].appendChild(fishbutton);
	//クリック時に魚拓追加処理呼び出し
	fishbutton.addEventListener('click',function(){
							if(confirm("魚拓のサイトに移動します。よろしいですか？")){
								var fishlog = GM_getValue('fishlog','');
								if(fishlog.length != 0)fishlog += "\n";
								if(fishlog.indexOf(document.title + "　||　" + "http://megalodon.jp/?url=" + escape(location.href)) < 0){
								fishlog += document.title + "　||　" + "http://megalodon.jp/?url=" + escape(location.href);
								GM_setValue('fishlog',fishlog);
								}
								window.location='http://megalodon.jp/?url='+escape(location.href)
							}
							}, false);
//キャラ変更ボタン作成
	var ccbutton = document.createElement('div');
	ccbutton.id	= 'ccbutton';
	ccbutton.className= 'setbtn';
	ccbutton.setAttribute("onclick","return false;");
	ccbutton.setAttribute("onmouseover","this.style.borderColor='#A3A3A3';document.getElementById('ccbtn').style.display='block';document.getElementById('ccview').style.color='#A3A3A3';");
	ccbutton.setAttribute("onmouseout","this.style.borderColor='#CCCCCC';document.getElementById('ccbtn').style.display='none';document.getElementById('ccview').style.color='#CCCCCC';");
	var ccbtn_date=['',
'	<span id="ccspan">',
'	<div id="ccview">　キャラ変更　</div>',
'	<div id="ccbtn" style="display:none;">',
'	<div id="ccaddbtn" title="キャラ変更ボタンにキャラ登録" onclick="return false;" onmouseover="this.style.color=\'#A3A3A3\';" onmouseout="this.style.color=\'#CCCCCC\';">キャラ登録</div>',
'	</div>',
'	</span>'].join("\n");
	ccbutton.innerHTML= ccbtn_date;
	document.getElementsByTagName('body')[0].appendChild(ccbutton);
	//キャラ登録ボタンクリック時にキャラ登録処理呼び出し
	document.getElementById('ccaddbtn').addEventListener('click',cc_add_btn, false);

	//登録したキャラのボタン作成
	var CCDate;
	CCDate = GM_getValue('CCDate','');
	CCDate = CCDate.split("|-|");
	for(n = 0; n < CCDate.length; n++) {
		var ccaddbutton = document.createElement('div');
		ccaddbutton.setAttribute("id","NGDate" + n);
		ccaddbutton.setAttribute("title",CCDate[n].split(",")[0]);
		ccaddbutton.setAttribute("onclick","return false;");
		ccaddbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';");
		ccaddbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';");
		ccaddbutton.innerHTML	=	CCDate[n].split(",")[0];
		document.getElementById('ccbtn').appendChild(ccaddbutton);
		document.getElementById("NGDate" + n).addEventListener('click',function(e){cc_load(this.title)}, false);
	}
//取り引きアイテムボタン作成
	var itembutton = document.createElement('div');
	itembutton.id	= 'itembutton';
	itembutton.className= 'setbtn';
	itembutton.setAttribute("onclick","return false;");
	itembutton.setAttribute("onmouseover","this.style.borderColor='#A3A3A3';document.getElementById('itembtn').style.display='block';document.getElementById('itemview').style.color='#A3A3A3';");
	itembutton.setAttribute("onmouseout","this.style.borderColor='#CCCCCC';document.getElementById('itembtn').style.display='none';document.getElementById('itemview').style.color='#CCCCCC';");
	document.getElementsByTagName('body')[0].appendChild(itembutton);
	var itembtn_date=[' ',
'	<span id="itemspan">',
'	<div id="itemview">　取り引きアイテム　</div>',
'	<div id="itembtn" style="display:none;">',
'	<div id="itemaddbtn" title="アイテム登録" onclick="return false;" onmouseover="this.style.color=\'#A3A3A3\';" onmouseout="this.style.color=\'#CCCCCC\';">アイテム登録</div>',
'	</div>',
'	</span>'].join("\n");
	itembutton.innerHTML= itembtn_date;
	document.getElementsByTagName('body')[0].appendChild(itembutton);
	document.getElementById('itemaddbtn').addEventListener('click',item_add_btn, false);
	//登録したアイテムのボタン作成
	var ItemDate;
	ItemDate = GM_getValue('ItemDate','');
	ItemDate = ItemDate.split("|-|");
	for(n = 0; n < ItemDate.length; n++) {
		var itemaddbutton = document.createElement('div');
		itemaddbutton.setAttribute("id","ItemDate" + n);
		itemaddbutton.setAttribute("title",ItemDate[n]);
		itemaddbutton.setAttribute("onclick","return false;");
		itemaddbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';");
		itemaddbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';");
		itemaddbutton.innerHTML	=	ItemDate[n];
		document.getElementById('itembtn').appendChild(itemaddbutton);
		document.getElementById("ItemDate" + n).addEventListener('click',function(e){item_del(this.title)}, false);
	}
	//チェックアイテムボタン作成
	var checkitembutton = document.createElement('div');
	checkitembutton.id	= 'checkitembutton';
	checkitembutton.className= 'setbtn';
	checkitembutton.setAttribute("onclick","return false;");
	checkitembutton.setAttribute("onmouseover","this.style.borderColor='#A3A3A3'");
	checkitembutton.setAttribute("onmouseout","this.style.borderColor='#CCCCCC'");
	checkitembutton.innerHTML = '<div id="itemview">　新着取り引き記事　</div>';
	document.getElementsByTagName('body')[0].appendChild(checkitembutton);
	//チェックアイテムのリンク作成
	var CheckItemDate;
	CheckItemDate = GM_getValue('CheckItemDate','');
	CheckItemDate = CheckItemDate.split("|-|");
	for(n = 0; n < CheckItemDate.length; n+=2) {
		if(CheckItemDate[n+1] == null)break;

		//最初にアイテム削除ボタンを作成
		if(n==0){
			var itemdelbutton = document.createElement('div');
			itemdelbutton.setAttribute("id","DelItemDate");
			itemdelbutton.setAttribute("title",'新着取り引き記事全て削除');
			itemdelbutton.setAttribute("onclick","return false;");
			itemdelbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';");
			itemdelbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';");
			itemdelbutton.innerHTML	=	"新着全て削除";
			document.getElementById('checkitembutton').appendChild(itemdelbutton);
			document.getElementById("DelItemDate").addEventListener('click',del_item_click, false);
		}
		var itemlinkbutton = document.createElement('div');
		itemlinkbutton.setAttribute("id","CheckItemDate" + n);
		itemlinkbutton.setAttribute("title",CheckItemDate[n]);
		itemlinkbutton.setAttribute("onclick","return false;");
		itemlinkbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';");
		itemlinkbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';");
		itemlinkbutton.innerHTML	=	CheckItemDate[n+1];
		document.getElementById('checkitembutton').appendChild(itemlinkbutton);
		document.getElementById("CheckItemDate" + n).addEventListener('click',function(e){check_item_click(this.title,this.id)}, false);
	}
//取引検索ボタン
	var searchbutton = document.createElement('div');
	searchbutton.id	= 'searchbutton';
	searchbutton.className= 'setbtn';
	searchbutton.setAttribute("onclick","return false;");
	searchbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';this.style.borderColor='#A3A3A3';");
	searchbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';this.style.borderColor='#CCCCCC';");
	searchbutton.innerHTML= '取引検索';
	document.getElementsByTagName('body')[0].appendChild(searchbutton);
	//クリック時に入力ダイアログを出し検索
	searchbutton.addEventListener('click',function(){
	var ItemName = window.prompt("アイテム名を入力してください。例:サイプラス", "");
	if(ItemName != "" && ItemName != null){
		var sv = GM_getValue('mainserver','no0').substr(0,2);
		//サーバーが選択されてない場合検索しない
		if(sv == "no"){
			return false;
		}
		var targetURL = "http://mabinogi.nexon.co.jp/6th/community/tradeBoardList.asp?st=t&se=" + ItemName + "&sv=" + sv;
		window.location=targetURL;
	}
	}, false);
//メモ送信ボタン
	var sendmbutton = document.createElement('div');
	sendmbutton.id	= 'sendm';
	sendmbutton.className= 'setbtn';
	sendmbutton.setAttribute("onclick","return false;");
	sendmbutton.setAttribute("onmouseover","this.style.color='#A3A3A3';this.style.borderColor='#A3A3A3';");
	sendmbutton.setAttribute("onmouseout","this.style.color='#CCCCCC';this.style.borderColor='#CCCCCC';");
	sendmbutton.innerHTML= 'メモ送信';
	document.getElementsByTagName('body')[0].appendChild(sendmbutton);
	//クリック時にメモ送信ダイアログを表示
	sendmbutton.addEventListener('click',function(event){memo_dialog("","")}, false);
}
//上記関数呼び出し
setting_button();



//2つの日付の差を求める関数
function compareDate(year1, month1, day1, year2, month2, day2) {
    var dt1 = new Date(year1, month1 - 1, day1);
    var dt2 = new Date(year2, month2 - 1, day2);
    var diff = dt1 - dt2;
    var diffDay = diff / 86400000;//1日は86400000ミリ秒
    return diffDay;
}



//Mabinogi Browse Helperの更新確認
function UpdateCheck() {
	var ndate, udate;
	udate = GM_getValue("UDate","2011-5-25");
	udate = udate.split("-");
	ndate = new Date();
	//1週間以上経過していたら確認
	if(compareDate(ndate.getFullYear(),ndate.getMonth() + 1,ndate.getDate(),udate[0],udate[1],udate[2]) > 7){
		var targetURL = "http://userscripts.org/scripts/show/83827";
		GM_xmlhttpRequest({
			method: "GET",
			url: targetURL,
			headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
				'Content-type': 'application/x-www-form-urlencoded'},
			onload:function(response){
				var restext = response.responseText;
				//バージョン情報の取得と差異チェック
				restext  = restext.match(/Version:<\/b>\n(\d{4}\.\d{1,2}\.\d{1,2})/);
				var vdate, rdate;
				vdate	 = version;
				vdate	 = vdate.split(".");
				rdate	 = restext[1];
				rdate	 = rdate.split(".");
				if(compareDate(rdate[0],rdate[1],rdate[2],vdate[0],vdate[1],vdate[2]) > 0){
					if(confirm("Mabinogi Browse Helperの更新があります。userscripts.orgに飛びますか？")){
						location.href = "http://userscripts.org/scripts/show/83827";
					}
				}
				//udateの更新
				udate = ndate.getFullYear() + "-" + (ndate.getMonth() + 1) + "-" + ndate.getDate();
				GM_setValue('UDate',udate);
			}
		})
	}
}
//funccheck10がtrueならアップデートチェック呼び出し
if(GM_getValue('funccheck10',true) == true){
UpdateCheck();
}







})();