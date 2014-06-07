// ==UserScript==
// @name           Mouseover Translate English-Japanese
// @version        1.03
// @include        *
// ==/UserScript==

(function(){
/**************************************ユーザー設定**********************************************/
const SEARCH_SITE = "Eijiro"            // 翻訳サイト (英辞郎(goo)："Eijiro")
const LEVEL = 2;                        // ここで指定するレベル以上の単語を翻訳 (英辞郎でのみ有効)
const DELAY = 500;                      // ポップアップするまでの時間[ms] (デフォルト：500)
const BACKGROUND_COLOR = "cornsilk";	// 背景色 (デフォルト：cornsilk)
const FONT_COLOR = "black";             // 文字色 (デフォルト：black)
const FONT_SIZE = "10pt";               // 文字サイズ (デフォルト：10pt)
const CLEAR = "0.92";                   // 透明度 (デフォルト：0.92)
/************************************************************************************************/

// ここで他のサイトを追加できる。
// GM_xmlhttprequestに渡すデータ。
// formatResultは、ポップアップ表示のためにhtmlを整形する関数。
// 文字列としてhtmlを受け取り文字列としてhtmlを返す。整形結果が存在しない場合は空文字列を返す。
var SITEINFO = {
	Eijiro: {
		url: function(word){ return "http://dictionary.goo.ne.jp/api/searchEjOutput.php?SE=" + word + "&mode=1&cond=leaf"; },
		encode: "UTF-8",
		formatResult: function(originalhtml){
			var formathtml = "";
			var wordlevel = 0;
			if(/<span.*?>\u30EC\u30D9\u30EB<\/span>(\d{1,2})/.test(originalhtml)) wordlevel = RegExp.$1;  // 「レベル」
			if(wordlevel == 0 || wordlevel >= LEVEL){
				if(/<div class="wordDefArea".*?>((?:.|\s)*?)<\/div>/.test(originalhtml)){
					formathtml = RegExp.$1;
					formathtml = formathtml.replace(/<br>&nbsp;.*/g, "");
					formathtml = formathtml.replace(/<span class='yomi'.*?>.*?<\/span>/g, "");
					formathtml = formathtml.replace(/<span class='hinshi'.*?>(.*)<\/span>/g, "<B>[$1]</B>");
					formathtml = formathtml.replace(/<ul>/g, "");
					formathtml = formathtml.replace(/<li>/, "");
					formathtml = formathtml.replace(/<li>/g, "<br>");
					formathtml = formathtml.replace(/<\/ul>|<\/li>/g, "");
					formathtml = formathtml.replace(/<span.*?>((?:.|\s)*?)<\/span>/g, "$1");
				}
			}
			return formathtml;
		}
	}
}

// マウスオーバーされた単語を取得
// マウスオーバーされたノードをEvent.rangeParentで取得し、その中のマウスの位置をEvent.rangeOffsetで取得。
// rangeParentの仕様なのか、文字から離れた部分でも文字と認識してしまうことがあるので、elementFromPointで調整。
// そこにある文字がアルファベットだった場合に、文字の前後を一文字ずつ探索していって、
// アルファベット以外の文字に辿り着いたら探索終了。探索された範囲が単語となる。
// 単語が存在しなかった場合は空文字列を返す。
function catchMouseoverWord(event){
	var onmousenode, onmousetext, mouseoffset, startoffset, endoffset, i;
	var word = "";
	onmousenode = event.rangeParent;
	if(onmousenode.nodeType == 3 && onmousenode.parentNode == document.elementFromPoint(event.clientX, event.clientY)){
		onmousetext = onmousenode.nodeValue;
		mouseoffset = event.rangeOffset;
		if(mouseoffset < onmousetext.length && /[a-zA-Z]/.test(onmousetext[mouseoffset])){
			for(startoffset=mouseoffset; startoffset>0; startoffset--){
				if(/[^a-zA-Z]/.test(onmousetext[startoffset - 1])) break;
			}
			for(endoffset=mouseoffset; endoffset<onmousetext.length-1; endoffset++){
				if(/[^a-zA-Z]/.test(onmousetext[endoffset + 1])) break;
			}
			for(i=startoffset; i<=endoffset; i++) word += onmousetext[i];
		}
	}
	return word;
}

// 翻訳する単語を整形
// 複数形を単数形にしたり、過去形を現在形にしたりする。単語が変化する傾向に応じて条件を変える。
// 例えばtedで終わる単語は、現在形にするためにはedを消すよりもdのみを消した方が正しい可能性が高い。
function fixWordFormat(word){
	var fixword = word.toLowerCase();
	if(/(.*)ies$/.test(fixword)) fixword = RegExp.$1 + "y";
	if(/(.*)ied$/.test(fixword)) fixword = RegExp.$1 + "y";
	if(/(.*ss)es$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*ss)ed$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[cgstvz]e)s$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[cgstvz]e)d$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*)es$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*)ed$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[^aiuos])s$/.test(fixword)) fixword = RegExp.$1;
	return fixword;
}

// ポップアップを作成
// 生成したエレメントに受け取ったhtmlを挿入。style属性で見た目を指定。
// 基本的に右下に表示するが、ウィンドウからはみ出てしまう場合は上や左に移動。
function makePopup(popuphtml, basispositionx, basispositiony){
	var popup = document.createElement("div");
	popup.id = "motejpopup";
	var horizontalspace = 20;
	var verticalspace = 15;
	with(popup.style) {
		position = "absolute";
		left = basispositionx + horizontalspace + "px";
		top = basispositiony + verticalspace + "px";
		zIndex = "100";
		backgroundColor = BACKGROUND_COLOR;
		border = "1px solid black";
		width = "300px";
		fontSize = FONT_SIZE;
		color = FONT_COLOR;
		textAlign = "left";
		lineHeight = "140%";
		paddingLeft = "10px";
		paddingRight = "10px";
		opacity = CLEAR;
	}
	popup.innerHTML = popuphtml;
	popup = document.body.appendChild(popup);
	if(popup.offsetLeft + popup.offsetWidth - window.scrollX > window.innerWidth) popup.style.left = basispositionx - horizontalspace - popup.offsetWidth + "px";
	if(popup.offsetTop + popup.offsetHeight - window.scrollY > window.innerHeight) popup.style.top = basispositiony - verticalspace - popup.offsetHeight + "px";
	return popup;
}

// ポップアップを消去、もしくは翻訳処理をキャンセル
function deletePopup(){
	clearTimeout(popupTimerID);
	var popupnode = document.getElementById("motejpopup");
	if(popupnode != null) document.body.removeChild(popupnode);
}

//-------------------------------ここからメインの処理-------------------------------

var popupTimerID;
var previousword;
var previousexecdate = new Date;

// mousemoveは負荷が高いので、リアルタイムではなく50ミリ秒ごとに処理を行う。
// 同じ単語内でマウスが動くと何度も同じものを取得してしまうため、
// 取得した単語が一つ前のイベントで取得した単語と異なった場合のみ処理を続行。ここで単語は空文字列の可能性もある。
// 翻訳対象の単語はアルファベット3文字以上に限定。
// マウスが上を通っただけで翻訳処理に入ってしまうのを防ぐため、setTimeoutで遅延を設ける。
// 遅延時間中にマウスが別の場所に移動した場合は前回の翻訳処理をキャンセル。
window.addEventListener("mousemove", function(event){
	if((new Date) - previousexecdate < 50) return;
	var targetword = catchMouseoverWord(event);
	if(previousword != targetword){
		deletePopup();
		previousword = targetword;
		if(/^[a-zA-Z]{3,}$/.test(targetword)){
			popupTimerID = setTimeout(function(){
				targetword = fixWordFormat(targetword);
				GM_xmlhttpRequest({
					method: "get",
					url: SITEINFO[SEARCH_SITE].url(targetword),
					overrideMimeType: "text/html; charset=" + SITEINFO[SEARCH_SITE].encode,
					onload: function(response){
								var result = SITEINFO[SEARCH_SITE].formatResult(response.responseText);
								if(result != ""){
									result = targetword + ":<br>" + result;
									makePopup(result, event.pageX, event.pageY);
								}
							}
				});
			},DELAY);
		}
	}
	previousexecdate = new Date;
}, false);

// マウスをクリックするとポップアップを消去
window.addEventListener("click", deletePopup, false);

})();