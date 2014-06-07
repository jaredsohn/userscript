// ==UserScript==
// @name           Redirect mixi News Source
// @namespace      http://gigi-net.net
// @include        http://news.mixi.jp/view_news.pl?*
// ==/UserScript==
(function(){
var baseurl = "http://www.google.co.jp/search?hl=ja&q=";
//記事タイトルを取得
var title=document.getElementsByTagName("h2")[1].textContent;
// ドメイン取得
var domain = "";
var imgs = document.getElementsByTagName("img");
var news_img_src_start = "http://img.mixi.jp/img/news_media";
for(var i=0;i<imgs.length;i++){
	var imgs_i = imgs[i];
	var img_src=imgs_i.src;
	if(img_src.indexOf(news_img_src_start) === 0)
	{
		domain = imgs_i.parentNode.href.split('/')[2]
		break;
	}
}
//クエリーを作成
var query = title + " site:" + domain;
var url = baseurl+encodeURIComponent(query);

//I'm feeling Lucky!
//元の記事を読むアイコンの表示
var diaryUtility = document.getElementsByClassName("diaryUtility");
var link=document.createElement("li");
var a=document.createElement("a");
a.href=url;
a.innerHTML="元のソースを検索";
link.appendChild(a);
diaryUtility[0].appendChild(link);
})();
