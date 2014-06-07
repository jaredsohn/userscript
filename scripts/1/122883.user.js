// ==UserScript==
// @name           Kanji Ratio Checker for Hatena
// @namespace      http://d.hatena.ne.jp/Koumei_S/
// @description    Calculates kanji ratio of your text at Hatena Diary & Blog
// @include        http://d.hatena.ne.jp/*
// ==/UserScript==

(function(){

//テキスト入力の場所
//Hatena
var inputarea = document.getElementById('textarea-edit');

//結果出力の場所
//Hatena
var resultarea = document.evaluate('id("sidebar")/ul/li', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

//結果の生成
//Hatena <div class="section"><h3>漢字比率</h3><p>結果</p></div>
function resultmake(result){
	return '<h3>\u6f22\u5b57\u6bd4\u7387</h3><p>' + result + '</p>';
}
var resulttext = document.createElement('div');
resulttext.setAttribute('class', 'section');

//結果の挿入
resultarea.parentNode.insertBefore(resulttext, resultarea.nextSibling);

inputarea.addEventListener('keyup',function(e){
	var keyword='';
	var hirc=0;
	var katc=0;
	var kanc=0;
	var suuc=0;
	var keyword = inputarea.value;
	var allletter=keyword.length;
	
	for(i=0;i<keyword.length;i++){
		p=keyword.charAt(i);
		if(p.match(/^[\u3041-\u3093]$/)){hirc++;}
		else if(p.match(/^[\u30a1-\u30f3\uff67-\uff9d\uff9e\uff9f]$/)){katc++;}
		else if(p.match(/^[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/)){kanc++;}
		else if(p.match(/^[\uff10-\uff19\d]/)){suuc++;}
		else{allletter--;}
	}
	
	if(kanc/allletter >= 0.5){message='\u6f22\u5b57\u306e\u6bd4\u7387\u304c50%\u4ee5\u4e0a\u3067\u3059\u3002\u786c\u3081\u306e\u6587\u7ae0\u3060\u3068\u601d\u308f\u308c\u307e\u3059\u3002';}
	else if(kanc/allletter <= 0.3){message='\u6f22\u5b57\u306e\u6bd4\u7387\u304c30%\u4ee5\u4e0b\u3067\u3059\u3002\u67d4\u3089\u304b\u3081\u306e\u6587\u7ae0\u3067\u3059\u3002';}
	else{message='\u6f22\u5b57\u306e\u6bd4\u7387\u304c\u9069\u5207\u306a\u6587\u7ae0\u3067\u3059\u3002';}

	if(hirc<katc){message='\u3072\u3089\u304c\u306a\u3088\u308a\u30ab\u30bf\u30ab\u30ca\u304c\u591a\u3044\u3067\u3059\u3002\u5c02\u9580\u7528\u8a9e\u304c\u591a\u3059\u304e\u308b\u304b\u3082\u3057\u308c\u307e\u305b\u3093\u3002';}
	
	if(keyword){
		result = '\u3072\u3089\u304c\u306a  '+(hirc/allletter*100).toFixed(2)
		+"%<br>"+'\u30ab\u30bf\u30ab\u30ca   '+(katc/allletter*100).toFixed(2)
		+"%<br>"+'\u6570\u5b57      '+(suuc/allletter*100).toFixed(2)
		+"%<br>"+'\u6f22\u5b57      '+(kanc/allletter*100).toFixed(2)
		+"%<br><br>"+message;
	}
	else{
		result = '\u307e\u3060\u4f55\u3082\u5165\u529b\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002';
	}
	
	resulttext.innerHTML = resultmake(result);
},false);

})();
