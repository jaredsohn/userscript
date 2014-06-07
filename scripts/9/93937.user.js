// ==UserScript==
// @name           レファ協書誌情報にリンクを追加
// @namespace      http://masao.jpn.org
// @description    レファ協のレファレンス事例の質問・回答文中に埋め込まれた書誌情報のタイトル等にリンクを追加する。
// @include        http://crd.ndl.go.jp/GENERAL/servlet/detail.reference?id=*
// ==/UserScript==

function make_links_html(anchor, title){
	var result = anchor;
	result += '<span class="ex-links">';
	var external_link = [ 
		{ "label" : "NDL Search",
		  "icon"  : "http://iss.ndl.go.jp/favicon.ico",
		  "baseurl":"http://iss.ndl.go.jp/books?any=",
		},
		{ "label" : "Webcat Plus",
		  "icon"  : "http://webcatplus.nii.ac.jp/externals/images/favicon.ico",
		  "baseurl":"http://webcatplus.nii.ac.jp/index.html?type=equals-book&title=",
		},
		{
		  "label" : "Amazon",
		  "icon"  : "http://www.amazon.co.jp/favicon.ico",
		  "baseurl":"http://www.amazon.co.jp/gp/search?ie=UTF8&index=books&keywords=",
		},
		{
		  "label" : "Google Books",
		  "icon"  : "http://www.google.com/favicon.ico",
		  "baseurl":"http://books.google.co.jp/books?q=",
		},
	];
	for (var i=0; i < external_link.length; i++) {
		link = external_link[i];
		result += '<a class="ex-link" href="'+ link["baseurl"] + encodeURIComponent( title ) + '" target="_blank" title="[' + link["label"] +']で「'+ title +'」を検索"><img src="'+ link["icon"] + '" width="16" height="16"/></a>';
	}
	result += '</span>';
	return result;
}
function insert_links( element ) {
	if ( element.getElementsByTagName( "a" ).length > 0 )
		return;
	if ( element.getElementsByTagName( "td" ).length > 0 ) {
		insert_links( element.getElementsByTagName( "td" )[0] );
		return;
	}
	var html = element.innerHTML;
	//alert( html );
	var span = document.createElement( "span" );
	var bibinfo = html.replace( /<[^>]+>/g, " " ).replace( /(\s|&nbsp;)+/ig, " " ).replace( /^\s+/, "" );
	if ( bibinfo.length == 0 )
		return;
	span.innerHTML = make_links_html( "&nbsp;", bibinfo );
	var br = element.getElementsByTagName( "br" )[0];
	element.insertBefore( span, br );
}

(function(){
	GM_addStyle( "a.ex-link:link, a.ex-link:visited { color: transparent; } a:hover { text-decoration:underline; } a.ex-link img { border: none; vertical-align: text-bottom; } span.ex-links { margin: 0 2px;" );
	tables = [ "dataHead", "dataContents" ];
	for (var i=0; i < tables.length; i++) {
		table = tables[i];
		//alert( table );
		datatable = document.getElementById( table );
		//alert( datatable.innerHTML );
		var html = datatable.innerHTML;
		html = html.replace( /『(.*?)』/g, make_links_html );
		datatable.innerHTML = html;
	};
	var table = document.getElementById( "dataContents" );
	var rows = table.getElementsByTagName( "tr" );
	for (var i = 0; i < rows.length; i++) {
		var cells = rows[i].getElementsByTagName( "td" );
		if ( cells[0].innerHTML.match( "参考資料" ) ) {
			rowspan = cells[0].getAttribute( "rowspan" );
			insert_links( cells[1] );
			for (var j = 1; j < rowspan; j++) {
				var cells = rows[i+j].getElementsByTagName( "td" );
				if (! (cells[0].getAttribute( "id" )) ) {
					rowspan++;
					continue;
				}
				insert_links( cells[0] );
			}
			break;
		}
	}
})();

