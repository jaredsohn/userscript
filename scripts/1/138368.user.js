// ==UserScript==
// @author         shyangs
// @name           第一中文網圖片替代為文字
// @description    第一中文網圖片替代為文字
// @namespace      http://wiki.moztw.org/%E4%BD%BF%E7%94%A8%E8%80%85:Shyangs#dyzww
// @version        0.2
// @include        http://www.dyzww.com/*
// @license        MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==

//工具
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function GM_sV(obj, name, value){
	obj[name]=value;
	var jStr=JSON.stringify(obj);
	GM_setValue("jStr",jStr);
}

function GM_gV(obj, name){
	var jStr=GM_getValue("jStr");
	obj=JSON.parse(jStr);
	if(!obj[name]){
		return null;
	}
	return obj[name];
}

	/***************全域變數***************/
var gObj={};


//第一次使用此腳本：
function isFirstUse(){
	var Obj={
		"rou":"肉",
		"xing":"性",
		"mei":"美",
		"jing":"精",
		"dong":"洞",
		"nv":"女",
		"se":"色",
		"qiang":"枪",
		"hun":"魂",
		"hua":"花",
		"men":"门",
		"zou":"走",
		"jie":"解",
		"huo":"惑",
		"lu":"露",
		"yin":"阴",
		"mi":"迷",
		"bo":"波",
		"mo":"魔",
		"xiong":"胸",
		"yu":"欲",
		"nong":"弄",
		"gong":"弓",
		"nu":"弩",
		"tui":"腿",
		"mao":"毛",
		"chun":"唇",
		"you":"诱",
		"xue":"穴",
		"meng":"蒙",
		"shi":"侍",
		"yao":"药",
		"ru":"乳",
		"bi":"逼",
		"ying":"鹰",
		"luo":"裸",
		"jian":"奸",
		"fu":"府",
		"shen":"肾"
	};
	if(GM_getValue("jStr")==undefined){				//如果，GM 的 "jStr" key 值 未定義(i.e.不存在)
		GM_setValue("jStr",JSON.stringify(Obj));	//存預設值進去，使之存在
	}
	else{											//如果 key值存在
		var jStr=GM_getValue("jStr");
		gObj=JSON.parse(jStr);					//讀入既有資料到gObj
	}
}


function main(){
	isFirstUse();

	var a=document.images;
	var n=a.length;//圖片計數
	var regex=/http:\/\/www\.dyzww\.com\/images\/(\w+?)\.gif/;
	for(var i=0;i<n;i++){
		var value="";
		if(a[i].getAttribute("ait")){
			var word=a[i].getAttribute("ait");
			var name="";
			if( regex.test(a[i].src) && !(GM_gV( gObj, name=a[i].src.match(regex)[1] )) ){
				GM_sV(gObj, name, word)
			}
			insertAfter(document.createTextNode(word), a[i]);
			a[i].parentNode.removeChild(a[i]);
			i--;n--;
		}else if(regex.test(a[i].src)&& (value=GM_gV( gObj, a[i].src.match(regex)[1])) ){
			insertAfter(document.createTextNode(value),a[i]);
			a[i].parentNode.removeChild(a[i]);
			i--;n--;
		}
	}
}

main();