// ==UserScript==
// @name           YourfilehostFlvAndThumbGetter
// @namespace      http://d.hatena.ne.jp/kasei_san/
// @include        http://b.hatena.ne.jp/*
// @include        http://del.icio.us/*
// ==/UserScript==
//
/*
   LICENSE : NYSL ( http://www.kmonos.net/nysl/NYSL.TXT )
*/


(function(){

	// AutoPagerize対応
	if( window.AutoPagerize ) 
	{
		// AutoPagerizeにて読み込み完了時に、引数のメソッドが呼ばれる
		window.AutoPagerize.addFilter( 
			function( doms )
			{
				for( var i=0; i<doms.length; i++ )
				{
					setFlvAndThumbLinks( doms[i] );
				}
			}
		 )
	}

	// 対象のDOM上のYourFileHostリンクに、サムネイルとダウンロード用リンクを設定
	function setFlvAndThumbLinks( dom )
	{
		var as = $T( dom, "a" );
		for( var i=0; i<as.length; i++ )
		{
			if( as[i].href.match( "^http:\/\/www\.yourfilehost\.com\/" ) )
			{
				setFlvAndThumbLink( as[i] );
			}
		}
	}

	// 対象のAタグの直前にFLVとサムネイルのURLを追加
	function setFlvAndThumbLink( a )
	{

		// domの先頭にサムネイルとDL用リンク用のDIVを追加
		var divThumb = document.createElement("div");
		var imgWait  = document.createElement("img");

		imgWait.src  = loadingImg;
		divThumb.appendChild( imgWait );
		a.parentNode.insertBefore( divThumb, a );

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
					imgWait.src = noImg;
					return;
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

								var flvUrl		= false;
								var photoUrl	= false;

								if( res.responseText.match( /video_id=([^\n&]+)/mg ))
								{
									flvUrl = decodeURIComponent( RegExp.$1 );
								}

								if( res.responseText.match( /photo=([^\n&]+)/mg ))
								{
									photoUrl = decodeURIComponent( RegExp.$1 );
								}
	

								// サムネイル
								if( photoUrl )
								{
									var imgThumb	= document.createElement("img");
									imgThumb.src	= photoUrl;

									// サムネイルからのリンク
									var aThumb		= document.createElement("a");
									aThumb.href		= a.href;
									aThumb.target	= "_blank";
									aThumb.appendChild( imgThumb );

									divThumb.appendChild( aThumb );
								}

								// DL用リンク
								if( flvUrl )
								{
									var aFlv = document.createElement("a");
									aFlv.href = flvUrl;
									aFlv.innerHTML = "[DOWNLOAD]"

									divThumb.appendChild( aFlv );
								}

								imgWait.src = noImg;
							}
					}

					window.setTimeout(
						function() {
								GM_xmlhttpRequest(opt)
							,	0
						}
					);
				}
				else
				{
					imgWait.src = noImg;
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

	setFlvAndThumbLinks( document );

})();

