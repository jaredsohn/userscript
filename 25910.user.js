// ==UserScript==
// @name           getYourAVHost
// @namespace      http://d.hatena.ne.jp/kasei_san/
// @include        http://youravhost.net/*
// ==/UserScript==
//
/*
   LICENSE : NYSL ( http://www.kmonos.net/nysl/NYSL.TXT )
*/


(function(){

	// entry毎の通し番号
	var entryId = -1;
	
	init( document );

	// AutoPagerize対応
	if( window.AutoPagerize ) 
	{
		// AutoPagerizeにて読み込み完了時に、引数のメソッドが呼ばれる
		window.AutoPagerize.addFilter( 
			function( doms )
			{
				for( var i=0; i<doms.length; i++ )
				{
					init( doms[i] );
				}
			}
		 )
	}

	// FLVのリンク一覧取得用のリンク生成
	function init( dom )
	{
		var divs = $C( dom, "entry hentry" );
		for( var i=0; i<divs.length; i++ )
		{
			entryId++;

			var a  = document.createElement("a");
			a.innerHTML	= "[get FLV links]";
			a.href		= "javascript:void(0);";
			a.id		= "getFlv_" + entryId;

			divs[i].id = "entry_hentry" + entryId;

			var listener = function(e)
			{
				if( e.target.id.match( /_(\d+)/ ) )
				{
					var id = RegExp.$1 - 0;
					getFlvLinks( "entry_hentry" + id );
				}
			}

			a.addEventListener(
					'click'
				,	listener
				,	true
			);

			$T( divs[i], "h3" )[0].appendChild( a );
		}
	}

	function getFlvLinks( id )
	{
		var div = $(id);

		// FLV一覧表示用領域生成
		var h = $T( div, "h3" )[0].appendChild( makeFlvList() );

		// DOM上のYourFileHostのリンクを全て取得
		var urls = getYourFileHostUrls( div );
		var i = -1;

		getNext();

		// 次のURLからFLVのリンクを生成
		function getNext()
		{
			i++;
			if( i >= urls.length )
			{
				// 終了処理
				$( "loadingImg_" + id ).src = noImg;
				return;
			}

			// 対象のaタグからFLVのリンクを生成
			getFlvLink( 
					urls[i]

					// URL取得後の処理を分ける事でYourFileHostの仕様変更に対応
				,	function( url )
					{
						appendUrlFlvList( url, urls[i].innerHTML );
					}

 			);
		}

		// URLを追加
		function appendUrlFlvList( url, name )
		{
			var div = $( "flvList_" + id );
			div.innerHTML = [ div.innerHTML, "<div><a href=" + url + ">[DOWNLOAD]" + name + "</a></div>" ].join("");
		}


		// FLV一覧表示用領域生成
		function makeFlvList()
		{
			var div = document.createElement("div");
		
			var div2 = document.createElement("div");
			div2.id	= "flvList_" + id;

			var img = document.createElement("img");
			img.src = loadingImg;
			img.id = "loadingImg_" + id;

			div.appendChild( div2 );
			div.appendChild( img );

			return div;
		}

		// DOM上のYourFileHostのリンクを全て取得
		function getYourFileHostUrls( dom )
		{
			var a = $T( dom, "a" );
			var aLen = a.length;
			var urls = [];
			for( var i=0; i<aLen; i++ )
			{
				if( a[i].href.match( "http:\/\/www\.yourfilehost\.com\/" ) &&
					!a[i].innerHTML.match( "^<img" ) )
				{
					urls.push( a[i] );
				}
			}
			return urls;
		}

		// 対象のaタグからFLVのリンクを生成
		function getFlvLink( a, func )
		{
			var opt = 
			{
				method 	: 'GET'
			,	url		: a.href
			,	onerror	: function(res)
				{
					alert( "GM_xmlhttpRequest Err!" );
				}
				// リンク先のYourFileHostから隠しAPIへのアドレスを取得
			,	onload	: function(res)
				{
					if ( res.status != 200 )
					{
						alert( "Status Code is " + res.status );
					}

					if( res.responseText.match( /<param\sname=\"movie\"[^\n]+video=([^&\n]+)/mg ))
					// "
					{
						var url = decodeURIComponent( RegExp.$1 );
						var opt = 
						{
								method 	: 'GET'
							,	url		: url
							,	onerror	: function(res)
								{
									alert( "GM_xmlhttpRequest Err!" );
								}

								// アドレスが取得できたら、そこからFLVのURLを取得
							,	onload	: function(res)
								{
									if ( res.status != 200 )
									{
										alert( "Status Code is " + res.status );
									}

									if( res.responseText.match( /video_id=([^\n&]+)/mg ))
									{
										var url = decodeURIComponent( RegExp.$1 );
										func( url );
										getNext();
									}
								}
						}

						window.setTimeout(
							function() {
									GM_xmlhttpRequest(opt)
								,	0
							}
						);
					}
				}
			}

			window.setTimeout(
				function() {
						GM_xmlhttpRequest(opt)
					,	0
				}
			);
		}
	}

	function convertToHTMLDocument(html) {
		var xsl = (new DOMParser()).parseFromString(
		'<?xml version="1.0"?>\
			<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
			<output method="html"/>\
		 </stylesheet>', "text/xml");

		var xsltp = new XSLTProcessor();
		xsltp.importStylesheet(xsl);

		var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
		doc.appendChild(doc.createElement("html"));

		var range = doc.createRange();
		range.selectNodeContents(doc.documentElement);
		doc.documentElement.appendChild(range.createContextualFragment(html));

		return doc;
	}

	function $(id)
	{
		return document.getElementById(id);
	}

	function $T(dom, tab)
	{
		if( !tab )
		{
			$T( document, dom );
		}
		return dom.getElementsByTagName(tab);
	}

	function $C(dom, class)
	{
		if( !class )
		{
			$C( document, dom );
		}

		var retnode = [];
		var myclass = new RegExp('\\b'+class+'\\b');
		var elem = dom.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	}
	
	var loadingImg = 
		'data:image/gif;base64,'+
		'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH5BAAKAAAAIf4VTWFkZSBieSBB'+
		'amF4TG9hZC5pbmZvACH/C05FVFNDQVBFMi4wAwEAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoI'+
		'GZwHTphmCUWxMcK6FJnBti5gxMJx0C1bGDndpgc5GAwHSmvnSAAAIfkEAAoAAAAsAAAAABAAEAAA'+
		'AzQIutz+TowhIBuEDLuw5opEcUJRVGAxGSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5'+
		'BAAKAAAALAAAAAAQABAAAAM2CLoyIyvKQciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsC'+
		'We0X/AGDww8yqWQan78EACH5BAAKAAAALAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwE'+
		'MUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqPyKRyOUwAACH5BAAKAAAALAAAAAAQABAAAAMyCLpyJytK'+
		'52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlCKc/KQBADHuk8H8MmLBqPyKRSkgAAIfkEAAoAAAAsAAAA'+
		'ABAAEAAAAzMIuiDCkDkX43TnvNqeMBnHHOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20p'+
		'SgAAIfkEAAoAAAAsAAAAABAAEAAAAzIIutz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBg'+
		'm7YBDQTCQBCbMYDC1s6RAAAh+QQACgAAACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCO'+
		'x3EOBDEwqcqwrlAYwmEYB1bapQIgdWIYgp5bEZAAADs=';

	var noImg = 'data:image/gif;base64,'+
		'R0lGODlhAQABAPcAALGVfrGVfgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAEALAAAAAABAAEA'+
		'AAgEAAMEBAA7';

})();

