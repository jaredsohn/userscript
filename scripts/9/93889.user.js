// ==UserScript==
// @name           ふわっと関連レファレンスを表示:
// @namespace      http://masao.jpn.org
// @description    レファレンス協同データベースに登録されているレファレンス記録詳細画面内に関連レファレンスの一覧を表示する:
// @include        http://crd.ndl.go.jp/GENERAL/servlet/detail.reference?id=*
// ==/UserScript==
(function(){
	//Fetch the table element.
	var foot = document.getElementById( "dataFoot" );
	//Process if the table is available.
	if(foot){
		//Create HTML elements.
		var trHTML = '<tr>';
		trHTML += '<td valign="top" width="1%" id="dataFootLeft">';
		trHTML += '<a title="ふわっと関連検索の結果">関連レファレンス</a><br/>';
		trHTML += '<img src=\"/GENERAL/images/spacer.gif\" width="130px" height="1px"/><br/>';
		trHTML += '</td>';
		trHTML += '<td valign="top" id="dataFootLeft" width="99%" colspan="5">';
		trHTML += '<ul id="fuwattoResult">関連レファレンスを検索しています...<img src="http://fuwat.to/ajax-loader.gif"/></ul></td></tr>';
		var trElement = document.createElement('tr');
		foot.innerHTML += trHTML;
		GM_addStyle( ".solved {font-size:smaller;color:#77f;} .unsolved { font-size:smaller;color:#f77;} " );
		//Load Fuwatto API.
		GM_xmlhttpRequest({
			method: "get",
			url: "http://fuwat.to/crd?format=json&url=" + document.location,
			onload: function(response) {
				//alert( response.responseText );
				var fuwatto = JSON.parse(response.responseText);
				var resultlist = document.getElementById("fuwattoResult");
				resultlist.innerHTML = '';
				var displayed = 0;
				for (var i=0, entry; entry = fuwatto.entries[i]; i++) {
					if (entry.url == document.location)
						continue;
					var title = entry.title;
					if ( title.length > 140 ) {
						title = title.substring( 0, 140 ) + "...";
					}
					solution = "";
					if ( entry.solution == "解決" )
						solution = '<span class="solved">[解決]</span>';
					else if ( entry.solution == "未解決" )
						solution = '<span class="unsolved">[未解決]</span>';
					resultlist.innerHTML += '<li>' + solution + ' <a href="'+ entry.url + '">' + title + '</a>';
					displayed += 1;
					if (displayed >= 5)
						break;
				}
				resultlist.innerHTML += '<div style="text-align:right">Powered by <a href="http://fuwat.to/crd?url=' + encodeURIComponent(document.location) +'">ふわっと関連検索</a></div>';
			},
		});
	}
})();

