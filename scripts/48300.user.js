// ==UserScript==
// @name           Popup Nico Dict
// @namespace      http://gigi-net.net
// @include        http://dic.nicovideo.jp/*
// @include        http://www.nicovideo.jp/*
// ==/UserScript==
(function(){
/////////////////////////////
//Version 3.0(20090601)
/////////////////////////////
/////////////////////////////
//CONFIG
/////////////////////////////
//※デフォルトから変更した場合の動作保証は致しません
//取得する記事の文字数
ARTICLE_LENGTH=1000;
//ポップアップの横の長さ（ピクセル）
POPUP_WIDTH=500;
//マウスオーバーからポップアップまでの時間（ミリ秒）
POPUPTIME=500;
//ポップアップの影を表示するかどうかのブーリアン。
SHOWSHADOW=true;

//詳しくはhttp://d.hatena.ne.jp/gigi-net/20090601/popupを参照してください。
///////////////////////////////
//SOURCE CODE
///////////////////////////////


//変数定義一覧
var xpos =0;
var ypos =0;
var flag=0;
var flag_fade =0;
var now_target_title="";
var fadeInIntervalID = null;
var fadeOutIntervalID = null;
var DelayTimeoutID = null;
var show ="";
var flag_Delay =0;
var TargetURL;


//リダイレクトされたかどうか判定する関数
function CheckRedirect(x){
	var redirect_url =x.responseText.match(/location.replace(.*);?/);
	//リダイレクトされてない
	if(redirect_url==null){
		GetDOM(x);
	//リダイレクトされた
	}else{
		var r_url =redirect_url[0].match(/http[^']*/)+"";		
		GM_xmlhttpRequest({
  			method:"GET", 
  			url:r_url,
  			onload:GetDOM
		});
	}
}
//ポップアップの表示を遅らせる
function DelayPopup(e){
	document.addEventListener('mousemove', setPos, false);
	var a = e.target+"";
	if(a.indexOf("http")!=-1){
		TargetURL =e.target;
	}else{
		TargetURL =e.target.parentNode.href;
	}
	flag_Delay =1;
	DelayTimeoutID = setInterval(onKeyword,POPUPTIME);
}

//ポップアップをフェードイン
function fadein(){
	popup = document.getElementById("ndtkeywordpopup");
	var op = parseFloat(popup.style.opacity);
	var newop =op+0.1;
	flag_fage =1;
	popup.style.opacity=newop;
	if(op>=1){
		flag_fade=0;
		clearInterval(fadeInIntervalID);
	}
}

//ポップアップをフェードアウト
function fadeout(){
	popup = document.getElementById("ndtkeywordpopup");
	var op = parseFloat(popup.style.opacity);
	var newop =op-0.1;
	flag_fade =1;
	popup.style.opacity=newop;
	if(op<0){
		clearInterval(fadeOutIntervalID);
		flag_fade =0;
		flag=0;
		document.getElementsByTagName("body")[0].removeChild(popup);
		shadow =document.getElementById("ndtkeywordpopup_shadow");
		document.getElementsByTagName("body")[0].removeChild(shadow);
	}
}

//ポップアップを生成する関数
function createPopup(text){
		if(flag==0){
		var popup = document.createElement('div');
		popup.id ="ndtkeywordpopup";
		with(popup.style) {
			visibility = 'visible';
			fontSize = '10pt';
			fontFamily = 'sans-serif';
			textAlign = 'left';
			lineHeight = '110%';
			color = '#333333';
			paddingLeft = '5px';
			paddingRight = '5px';
			backgroundColor = 'cornsilk';
			border = '1px solid #333333';
			opacity = '0';
			width = POPUP_WIDTH+'px';
		}
		//影を生成
		var shadow = document.createElement('div');
		shadow.id ="ndtkeywordpopup_shadow";
		with(shadow.style) {
			visibility = 'visible';
			fontFamily = 'sans-serif';
			fontSize = '10pt'
			textAlign = 'left';
			color = '#333';
			paddingLeft = '5px';
			paddingRight = '5px';
			lineHeight = '110%';
			backgroundColor = '#333';
			border = '1px solid #000';
			if(SHOWSHADOW){
				opacity = '0.5';
			}else{
				opacity ="0";
			}
			width = POPUP_WIDTH+'px';
		}
		//現在のページによって表示形式を変更
		if(location.href.indexOf("http://www.nicovideo.jp/watch")!=-1){
		//動画視聴ページの場合
			with(popup.style){
				position = 'fixed';
				overflow="auto";
				left = xpos+10-parseInt(pageXOffset)+"px";
				top = ypos+25-parseInt(pageYOffset)+"px";
			}
			with(shadow.style){
				position = 'fixed';
				overflow="auto";
				left = xpos+5+10-parseInt(pageXOffset)+"px";
				top = ypos+25+5-parseInt(pageYOffset)+"px";
			}
		}else{
		//それ以外の場合
			with(popup.style){
				position = 'absolute';
				left = xpos+10+"px";
				top = ypos+25+"px";
			}
			with(shadow.style){
				position = 'absolute';
				left = xpos+5+10+"px";
				top = ypos+25+5+"px";
			}
		}
		popup.innerHTML =text;
		shadow.innerHTML =text;
		flag =1;
		document.getElementsByTagName("body")[0].appendChild(shadow);
		document.getElementsByTagName("body")[0].appendChild(popup);
		//はみ出さないように処理する
		var scroll =parseInt(pageYOffset);
		var popup_height =parseInt(popup.offsetHeight);
		var popup_bottom =parseInt(popup.style.top)+parseInt(popup_height);
		if(popup_bottom-scroll>innerHeight){
			shadow.style.top =scroll+parseInt(innerHeight)-parseInt(popup.offsetHeight)+"px";
			popup.style.top =scroll+parseInt(innerHeight)-parseInt(popup.offsetHeight)+"px";
		}

		
		fadeInIntervalID =setInterval(fadein,30);
		}
}
//マウスがキーワードから外れたとき
function outKeyword(){
	if(flag_Delay==0){
		clearInterval(fadeInIntervalID);
		clearInterval(fadeOutIntervalID);
		flag_fade=0;
		shadow =document.getElementById("ndtkeywordpopup_shadow");
		shadow.style.opacity =0;
		fadeOutIntervalID =setInterval(fadeout,30);
	}else{
		flag_Delay =0;
		clearInterval(DelayTimeoutID);
	}
}


//記事を取得し、整形する関数
function GetDOM(x){
	var dict = x.responseText;
	//タイトルの取得
	var now_target_title =dict.match(/<h1>.*>/);
	now_target_title =now_target_title.toString();
	now_target_title =now_target_title.replace(/<.*?>/mg,"");
	//正規表現でarticle以降を取り出す。
	var start =dict.search(/<div class..article.* id..article.*>/);
	var end =dict.search("<hr>");
	var article =dict.substring(start,end);
	//置き換え用の適当な文字列生成
	var rand_st ="st"+(new Date()).getTime();
	var rand_ed ="ed"+(new Date()).getTime();
	//見出しを適当な文字に変換
	article =article.replace(/<h2.*?>/gm,rand_st);
	//article =article.replace(/<br.*><\/h2>/gm,"</h2>");
	article =article.replace(/<\/h2>/gm,rand_ed);
	//ページメニューを消去
	article =article.replace(/<div id..page-menu.>.*<.div>/,"");
	//タグを全消去
	article =article.replace(/<[^(br\/)].*?>/mg,"");
	//適当な文字を見出しに戻す
	article =article.replace(new RegExp(rand_st,"gm"),"<br>【");
	article =article.replace(new RegExp(rand_ed,"gm"),"】<br>");
	//空の見出しを削除
	//article =article.replace(/<br>【.*】<br>(\D+|\s+)<br>【/gm,"<br>【");
	//先頭から一定文字のみ抽出し、省略された場合は...をくわえる
	show =article.substring(0,ARTICLE_LENGTH-1);
	if(article.length>=ARTICLE_LENGTH){
		show +="..."
	}
	//タイトルを追加
	show ="<h1>"+now_target_title+"</h1>"+show;
	createPopup(show);
}
//アンカーをポップアップする関数
function PopupAnchor(x){
	TargetURL+="";
	var anchor = TargetURL.match(/\d+$/);
	var comment =x.responseText;
	comment = comment.match(eval("/<a.name=."+anchor+".*/gm"));
	}


//キーワードにマウスが乗ったときの関数
function onKeyword(){
	flag_Delay =0;
	clearInterval(DelayTimeoutID);
	var article_url =TargetURL+"";
	if(article_url.match(/\/b\/a\/.*#\d+/)!=null){
		GM_xmlhttpRequest({
  			method:"GET", 
  			url:article_url,
  			onload:PopupAnchor
		});
	}else{
		GM_xmlhttpRequest({
  			method:"GET", 
  			url:article_url,
  			onload:CheckRedirect
		});
	}
}

function SetEvent(){
//キーワードリンクを配列にまとめる
var links =document.getElementsByTagName("a");
var keywords =new Array;
var anchor =new Array;
var urls =new Array;

//現在のページがニコニコ大百科の場合
if(document.domain=="dic.nicovideo.jp"){
		for(var i=0;i<links.length;i++){
			if(links[i].getAttribute("class") =="auto"||"dic"){
				if(links[i].textContent.match(/>>\d+$/)!=null&&links[i].getAttribute("class") =="dic"){
					//コメント欄の安価も取得
					anchor.push(links[i]);
				}else{
					keywords.push(links[i]);
				}
			}else if(links[i].getAttribute("href")!=null){
				if(links[i].getAttribute("href").match(/(http:\/\/dic.nicovideo.jp|^)\/[avciu]\/.*/)!=null){
						keywords.push(links[i]);
				}
			}
		}
}else{
//現在のページがニコニコ動画の場合
	for(var j=0;j<links.length;j++){	
		if(links[j].getAttribute("href") !=null){
			if(links[j].getAttribute("href").match(/http:\/\/dic.nicovideo.jp\/[av]\/.+/)!=null){
				var dic =links[j].getElementsByTagName("img");
				links[j].removeAttribute("title");
				keywords.push(dic[0]);
			}
		}
	}
}

//キーワードにマウスが乗ったときのイベント追加
for(i=0;i<keywords.length;i++){
	keywords[i].addEventListener('mouseover',DelayPopup,false);
	keywords[i].addEventListener('mouseout', outKeyword, false);
}
for(i=0;i<anchor.length;i++){
	anchor[i].addEventListener('mouseover',DelayPopup,false);
	anchor[i].addEventListener('mouseout', outKeyword, false);
}
clearTimeout(timer);
}
var timer = setTimeout(SetEvent,1000);

//マウスカーソルの座標を同期
function setPos(e) {
		xpos = e.pageX;
		ypos = e.pageY;
}

})();