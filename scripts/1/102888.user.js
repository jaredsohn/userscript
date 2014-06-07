// ==UserScript==
// @name	pixiv-tag-suggest
// @description	pixivでイラストをブックマークするときに，関連してそうなタグを上方に表示
// @version	2.4
// @namespace    http://www1.icnet.ne.jp/a7v83w2r/
// @include	http://www.pixiv.net/*bookmark_add.php?*
// @match	http://www.pixiv.net/*bookmark_add.php?*
// ==/UserScript==

(function(){

//パラメータ
var limit = 10;//サジェストするタグの最大数
//類似文字列判定用パラメータ
var minTag = 1;//処理対象にする画像と他の人のタグの長さの下限
var minOuter = 2;//対象とする他の人がブックマークしているタグの頻度の下限
var maxIncludeTagRate = 8;//短い側のタグが含まれている長い側のタグの文字数が短い側の何倍かの上限
//LCS用パラメータ
var minLCS = 3;//最長共通部分文字列(LCS)の下限
var minLCSRateLong = 0.7;//長い側のタグに占める共通部分文字列の割合の下限
var minLCSRateShort = 0.7;//短い側のタグに占める共通部分文字列の割合の下限
var maxLCSTagRateLong = 6;//LCSが含まれている長い側のタグの文字数がLCSの何倍かの上限
var maxLCSTagRateShort = 2;//LCSが含まれている短い側のタグの文字数がLCSの何倍かの上限


//自分のブックマークタグ
myTagLink = {}
var tagCloud = document.getElementsByClassName("tagCloud")[0];
if(tagCloud == undefined) {
	return;
}

var myTagSrc = tagCloud.getElementsByTagName("a");
var myTagList = {};
for(var i = 0; i < myTagSrc.length; i++) {
	var tagName = myTagSrc[i].childNodes[0].textContent
	myTagList[tagName] = true;
	myTagLink[tagName] = myTagSrc[i];
}
//画像のタグ
var imgTagTable = document.getElementsByClassName("bookmark_recommend_tag")[0];
var imgTagSrc = imgTagTable.getElementsByTagName("a");
var imgTagList = {};
var imgTagLink = {};
for(var i = 0; i < imgTagSrc.length; i++) {
	imgTagList[imgTagSrc[i].text] = true;
	imgTagLink[imgTagSrc[i].text] = imgTagSrc[i];
}
//現在ブックマークしているタグ
var onTagSrc = document.getElementById("input_tag").getAttribute("value").split(/\s+|　+/);
var onTagList = {};
//onTagSrcは空白を含む
for(var i = 0; i < onTagSrc.length - 1; i++) {
	onTagList[onTagSrc[i]] = true;
}

var suggestedTag = {};
var auto = "";
var autoTag = {};

function addScore(hash, key, weight) {
	if(key in hash) {
		hash[key] += weight;
	} else {
		hash[key] = 1;
	}
}
if(onTagSrc.length < 2) {
//完全一致
	for(var it in imgTagList) {
		for(var mt in myTagList){
			if(it == mt){
				if(!(it in onTagList)) {
					auto += "pixiv.tag.toggle('" + encodeURI(mt) + "');";
				}
				autoTag[mt] = true;
			}
		}
	}
} else {
//現在ブックマークしているタグを推薦（イラストのタグを除く）
	for(var ot in onTagList) {
		if(!(ot in imgTagList)) {
			addScore(suggestedTag, ot, 1);
			addScore(suggestedTag, ot, 1);
		}
	}
}

//画像がブックマークされているタグ
function textToDoc(html) {
//ほぼコピペ: http://d.hatena.ne.jp/furyu-tei/20100612/1276275088
	if (document.implementation&&document.implementation.createHTMLDocument) {
	    var htmlDoc = document.implementation.createHTMLDocument('');
	} else {
		var proc=new XSLTProcessor();
		var xsltStyleSheet=new DOMParser().parseFromString([
		'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">'
		,	'<xsl:output method="html" />'
		,	'<xsl:template match="/">'
		,		'<html><head><title></title></head><body></body></html>'
		,	'</xsl:template>'
		,'</xsl:stylesheet>'
		].join(''),'application/xml');
		proc.importStylesheet(xsltStyleSheet);
		var htmlDoc=proc.transformToDocument(xsltStyleSheet);
	}
	var range=htmlDoc.createRange();

	html=html.match(/<html[^>]*>([\s\S]*)<\/html/i)[1];
	range.selectNodeContents(htmlDoc.documentElement);
	range.deleteContents();

	htmlDoc.documentElement.appendChild(range.createContextualFragment(html));
	return htmlDoc;
}

var xhr = new XMLHttpRequest();
if(document.URL.match("illust")) {
	xhr.open("GET", "http://www.pixiv.net/bookmark_detail.php?illust_id=" + document.URL.match("illust_id=([0-9]+)")[1], false);
} else {
	xhr.open("GET", "http://www.pixiv.net/novel/bookmark_detail.php?id=" + document.URL.match("id=([0-9]+)")[1], false);
}
xhr.send(null);
var html = textToDoc(xhr.responseText);
var outerTagSrc = html.getElementsByClassName("link_purple linkStyle");
var outerTagList = {};
for(var i = 0; i < outerTagSrc.length; i++) {
	var ot = outerTagSrc[i].getElementsByTagName("a")[0].text;
	if(ot != "B" && ot != "pixivTouch") {
		addScore(outerTagList, ot, 1);
	}
}

for(var ot in outerTagList) {
	if(outerTagList[ot] >= minOuter) {
		imgTagList[ot] = true;
	}
}

//タイトルも類似判定用のタグとして追加
imgTagList[document.getElementsByTagName("h3")[0].getElementsByTagName("a")[0].text] = true;

//Longest Common SubSequence
function LCS(a, b) {
	var sizea = a.length + 1;
	var sizeb = b.length + 1;
	var table = new Array(sizea);
	for(var i = 0; i < sizea; i++) {
		table[i] = new Array(sizeb);
	}
	for(var i = 0; i < sizea; i++) {
		for(var j = 0; j < sizeb; j++) {
			table[i][j] = 0;
		}
	}

	for(var i = 1; i < sizea; i++) {
		for(var j = 1; j < sizeb; j++) {
			match = a[i - 1] == b[j - 1] ? 1 : 0;
			table[i][j] = Math.max(table[i - 1][j - 1] + match, table[i - 1][j], table[i][j - 1]);
		}
	}
	
	return table[a.length][b.length];
}

tagLCS = {}
for(var mt in myTagList){
	addScore(tagLCS, mt, 1);
}
//部分一致
for(var it in imgTagList) {
	for(var mt in myTagList){
		if(!(mt in autoTag)) {

			var minlen = Math.min(mt.length, it.length);
			var maxlen = Math.max(mt.length, it.length);
			if(it.length < minTag) {
				continue;
			}

			var match = false;
			if(it.length < mt.length) {
//エスケープ．参考: http://subtech.g.hatena.ne.jp/cho45/20090513/1242199703
				match = mt.match(new RegExp(it.replace(/\W/g,'\\$&'), "i"));
			} else {
				match = it.match(new RegExp(mt.replace(/\W/g,'\\$&'), "i"));
			}
			if(match && maxIncludeTagRate * minlen >= maxlen) {
				addScore(suggestedTag, mt, 2);
			} else {
				var lcs = LCS(mt, it);
				if(lcs >= minLCS && lcs >= minLCSRateShort * minlen && lcs >= minLCSRateLong * maxlen){
					addScore(suggestedTag, mt, 1);
				} else if(lcs > 0 && maxLCSTagRateShort * lcs >= minlen && maxLCSTagRateLong * lcs >= maxlen){
					addScore(tagLCS, mt, lcs);
				}
			}
		}
	}
}

//ページのスクリプトの関数を実行するため．
location.href = "javascript:void(function(){" + auto + "})();";

var resultTag = new Array();
for(var t in suggestedTag) {
	resultTag.push({key: t, count: suggestedTag[t]});

}

//文字列比較
function strcmp(a, b) {
	if ( a.key < b.key ) {
		return -1;
	}
	if ( a.key > b.key ) {
		return 1;
	}
	return 0;
}

if(resultTag.length >= 1) {
	resultTag.sort(function(a, b) {
		if(a.count != b.count) {
			return b.count - a.count;
		} else if(tagLCS[a.key] != tagLCS[b.key]) {
			return tagLCS[b.key] - tagLCS[a.key];
		} else {
			return strcmp(a, b);
		}
	});
	
	var div = document.createElement("div");
	div.setAttribute("class", "bookmark_recommend_tag");
	var suggest = document.createElement("ul");
	suggest.setAttribute("class", "tagCloud");
	var text = document.createElement("span");
	text.appendChild(document.createTextNode("もしかして"));
	div.appendChild(text);
	div.appendChild(document.createElement("br"));

	for(var i = 0; i < resultTag.length; i++) {
		if(limit <= 0) {
			break;
		}
		limit--;
		
		var rt = resultTag[i].key;
		var li = document.createElement("li");
		var a = document.createElement("a");
		li.setAttribute("class", "level" + Math.max(7 - resultTag[i].count, 1));
		
		a.setAttribute("href", "javascript:void(0);");
		if(rt in onTagList) {
			a.setAttribute("class", "tag on");
		}

		var click = function (tag){
			a.addEventListener("click", function(){
				if(this.getAttribute("class") != "tag on") {
					this.setAttribute("class", "tag on");
				} else {
					this.setAttribute("class", "tag");
				}
				location.href = "javascript:void(function(){pixiv.tag.toggle('" + encodeURI(tag) + "')})();";
			},false)
		};

		click(rt);
		a.appendChild(document.createTextNode(rt));
		li.appendChild(a);
		suggest.appendChild(li);

		var click2 = function (a){
			myTagLink[resultTag[i].key].addEventListener("click", function(){
				if(a.getAttribute("class") != "tag on") {
					a.setAttribute("class", "tag on");
				} else {
					a.setAttribute("class", "tag");
				}
			}, false);
		};
		
		click2(a);

		var click3 = function (a){
			imgTagLink[resultTag[i].key].addEventListener("click", function(){
				if(a.getAttribute("class") != "tag on") {
					a.setAttribute("class", "tag on");
				} else {
					a.setAttribute("class", "tag");
				}
			}, false);
		};
		if(rt in onTagList) {
			click3(a);
		}
	}

	div.appendChild(suggest);
	imgTagTable.parentNode.insertBefore(div, imgTagTable.nextSibling);
}
})();


