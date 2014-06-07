// ==UserScript==
// @name           Redirect mixi News Source
// @namespace      http://gigi-net.net
// @include        http://news.mixi.jp/view_news.pl?*
// ==/UserScript==
(function(){

var baseurl = "http://www.google.co.jp/search?hl=ja&btnI=&q=";
//Xpath取得関数
function GetXpath(query) {
    var results = document.evaluate(query, document, null, 7, null);
    var nodes = new Array();
    for(var i=0; i<results.snapshotLength; i++){
        nodes.push(results.snapshotItem(i));
    }
    return nodes;
}
//記事タイトルを取得
var title=document.getElementsByTagName("h2")[1].textContent;
/*
//元記事の提供もとドメインを取得
var domain;
var p =document.getElementsByTagName("p");
for(var i=0;i<p.length;i++){
	if(p[i].getAttribute("class")=="mediaIcon"){
		var domain = p[i].getElementsByTagName("a")[0].getAttribute("href");
	}
}
domain =domain.replace(/http:\/\/www./,"http://*.");
domain =domain.replace(/http:\/\//,"");
domain =domain.replace(/\/$/,"");
*/
//提供元のページ取得
var source = document.getElementsByClassName("date")[0].textContent;
source = source.match(/^\（.* -/);
source +="";
source = source.replace(/（/,"");
source = source.replace(/ -$/,"");
//クエリーを作成
var query =title+" "+source
var url=baseurl+encodeURIComponent(query);

//I'm feeling Lucky!
//元の記事を読むアイコンの表示
var diaryUtility = document.getElementsByClassName("diaryUtility");
var link=document.createElement("li");
var a=document.createElement("a");
a.href=url;
a.innerHTML="元のソースを表示";
link.appendChild(a);

with(link.style){
	backgroundImage="url(http://gigi-net.net/script/images/MixiAppManager/newspaper.png)";
	backgroundRepeat="no-repeat";
	paddingLeft="23px";
	marginLeft="8px";
	borderLeft="1px solid #ffcd8f";
}
diaryUtility[0].appendChild(link);
})();