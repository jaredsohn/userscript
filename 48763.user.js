// ==UserScript==
// @name           Add Hatebu on NicoRank
// @namespace      http://gigi-net.net
// @description    ニコニコ動画のランキング上に被はてブ数を表示
// @include        http://www.nicovideo.jp/ranking/view/*
// @include        http://www.nicovideo.jp/ranking/res/*
// @include        http://www.nicovideo.jp/ranking/mylist/*
// ==/UserScript==
//Xpath取得関数
function GetXpath(query) {
    var results = document.evaluate(query, document, null, 7, null);
    var nodes = new Array();
    for(var i=0; i<results.snapshotLength; i++){
        nodes.push(results.snapshotItem(i));
    }
    return nodes;
}
var api_url ="http://b.hatena.ne.jp/entry/json/?url=";
var i=0;
//はてブ数出力関数
ShowHB = function(x){
	try{
		count = eval(x.responseText).count;
		url =eval(x.responseText).entry_url;
	}catch(e){
		count = 0;
		url ="";
	}
	xpath = "/html/body/div/div/div/div/table/tbody/tr/td[2]/p/a/strong";
	res = GetXpath(xpath);
	title = document.getElementsByTagName("h3");
	if(count>0){
		res[i].parentNode.parentNode.innerHTML +="　はてブ：<a href='"+url+"'>"+"<b>"+count+"</b></a>";
	}else{
		res[i].parentNode.parentNode.innerHTML +="　はてブ：<u><b>"+count+"</b></u>";
	}
	i++;
	if(i<res.length){
		LoadHB();
	}
};
var xpath = "/html/body/div/div/div/div/table/tbody/tr/td[2]/p/a/strong";
var res = document.evaluate(xpath, document, null, 7, null); 
var title = document.getElementsByTagName("h3");
//ブックマーク数ロード関数
function LoadHB(){
	var json_url = api_url + encodeURIComponent(title[i].firstChild.href);
	GM_xmlhttpRequest({
  		method:"GET", 
  		url:json_url,
  		onload:function(x){x.onload=ShowHB(x)}
	});
}
LoadHB();