// ==UserScript==
// @name           DameZettai
// @namespace      http://userscripts.org/scripts/show/79010
// @description    テスト環境などで、ページ内から絶対パスを探す。includeにテスト環境を指定する。※今入ってるのはダミーです
// @include        *testserver.jp*
// ==/UserScript==

//「|」区切りでテストサーバのホスト名やパスを追加できます
var urls = location.hostname + "|testserver.com";

//チェックの対象外とするページを正規表現で指定できます
if (location.href.match(/http:\/\/test.server.com\/$|http:\/\/test.server.com\/test/i)){
	return false;
}else{
	Check();
}

function Check(){
	var message = "";

	//<link>タグ内のhref属性をチェック
	var linkTags = document.getElementsByTagName("link");
	for (var i = 0; i < linkTags.length; i++){
		if (linkTags[i].getAttribute("href")){
			if (linkTags[i].getAttribute("href").match(urls)){
				message += "<LINK>タグに内部パス発見！\n" + linkTags[i].getAttribute("href") + "\n\n";
			}
		}
	}

	//<script>タグ内のsrc属性をチェック
	var sTags = document.getElementsByTagName("script");
	for (var i = 0; i < sTags.length; i++){
		if (sTags[i].getAttribute("src")){
			if (sTags[i].getAttribute("src").match(urls)){
				message += "<SCRIPT>タグに内部パス発見！\n" + sTags[i].getAttribute("src") + "\n\n";
			}
		}
	}

	//<a>タグ内のhref属性をチェック
	var aTags = document.getElementsByTagName("a");
	for (var i = 0; i < aTags.length; i++){
		if (aTags[i].getAttribute("href")){
			if (aTags[i].getAttribute("href").match(urls)){
				message += "<A>タグに内部パス発見！\n" + aTags[i].getAttribute("href") + "\n\n";
			}
		}
	}

	//<img>タグ内のsrc属性をチェック
	var imgTags = document.getElementsByTagName("img");
	for (var i = 0; i < imgTags.length; i++){
		if (imgTags[i].getAttribute("src")){
			if (imgTags[i].getAttribute("src").match(urls)){
				message += "<IMG>タグに内部パス発見！\n" + imgTags[i].getAttribute("src") + "\n\n";
			}
		}
	}

	if (message!=""){
		alert(message);
	}

}
