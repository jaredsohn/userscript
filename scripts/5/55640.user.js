// ==UserScript==
// @name         mixi Home Ashiato
// @namespace    http://20pct.net/blog/
// @description  this is a sample script
// @include      http://mixi.jp/
// @include      http://mixi.jp/home.pl*
// @exclude      
// ==/UserScript==

// divのエレメントをつくる
var div = document.createElement('div');
div.id = 'homeAshiato';

// 基本レイアウトをつくる
var ashiatoBox;
ashiatoBox = '<div id=\"mixiNews\" class=\"bodySubSection\">\n';
ashiatoBox += '<div class=\"heading01\"><h2><a href=\"http://mixi.jp/show_log.pl\">足あと</a></h2></div>\n';
ashiatoBox += '<div class=\"contents\">\n';
ashiatoBox += '<ul id=\"ashiatoLists\" style=\"padding:4px;\"></ul>\n';
ashiatoBox += '<p class=\"moreLink01\" style=\"padding:4px;\"><a href=\"http://mixi.jp/show_log.pl\">一覧へ</a></p>\n';
ashiatoBox += '</div>\n';
ashiatoBox += '</div>\n';

// divのエレメントを指定したHTMLに書き換え
div.innerHTML = ashiatoBox;

// divを指定した場所に挿入
var bodySubNode = document.getElementById('bodySub');
var mixiNewsAreaNode = document.getElementById('mixiNewsArea');
bodySubNode.insertBefore(div, mixiNewsAreaNode);

//ローディング表示
document.getElementById("ashiatoLists").innerHTML = '<img src="http://img.mixi.jp/img/basic/list_friend/loading001.gif" width="18" height="18" alt="" stlye=\"vertical-align:middle;\" /><span style=\"font-size:80%;\">足あとを読み込み中...</span>';

GM_xmlhttpRequest({
	method: "Get",
	url: "http://mixi.jp/show_log.pl",
	onload: function(res){

         if (res.status != 200 || res.responseText.indexOf('logout.pl') == -1) {
             return;
         }

		var i;
	
		var html = document.createElement('div');
		html.innerHTML = res.responseText;
		
		var result = document.evaluate(
			'//ul[@class="logList01"]//li', html, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
		);

		var resultLength = result.snapshotLength;
		if(resultLength >= 5){
			resultLength = 5;
		}
		else if(!resultLength){
			document.getElementById("ashiatoLists").innerHTML = '足あとはまだありません。';
			return;
		}

		var ashiato = '';
		for(i= 0; i < resultLength; i++){
			var date = result.snapshotItem(i).childNodes.item(0).firstChild.nodeValue;
			var name = result.snapshotItem(i).childNodes.item(1).firstChild.firstChild.nodeValue;
			var url = result.snapshotItem(i).childNodes.item(1).firstChild.href;
			var icon = result.snapshotItem(i).childNodes.item(1).lastChild.src;
			ashiato += '<li><a href=\"' + url + '\">' + name + '</a>';
			if(icon){
				ashiato += ' <img src=\"'+ icon +'\" />\n';
			}
			ashiato += '<br />';
			ashiato += '<span style=\"font-size:80%;\">' + date + '</span></li>\n';
		}

		document.getElementById("ashiatoLists").innerHTML = ashiato;
	}
});