// ==UserScript==
// @name           dailymotionEmbedFlvgetter
// @namespace      http://d.hatena.ne.jp/kasei_san/
// @include        *
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
					makeDownloadLink( doms[i] );
				}
			}
		 )
	}
	
	makeDownloadLink( document );

	function makeDownloadLink( dom )
	{
		// プレイヤーのパラメータのオブジェクトを取得
		function getMovieParam( dom )
		{
			var rtnSts = [];
			var params = $T( "param", dom );
			for( var i in params )
			{
				if( "movie" == params[i].getAttribute("name") )
				{
					var url = params[i].getAttribute("value");
					if( url != "" && params[i].parentNode.parentNode )
					{
						rtnSts.push
						(
							{ 
									dom : params[i].parentNode.parentNode
								,	url : url
							}
						);
					}
				}
			}
			return rtnSts;
		}
		
		// パラメータからプレイヤーのURLとDOMを取得
		var params = getMovieParam( dom );
		if( 0 >= params.length )
		{
			return;
		}
		
		for( var i=0; i<params.length; i++ )
		{
			getDownloadUrl( params[i].url, params[i].dom );
		}
		
		
		// ダウンロード用のリンクを生成
		function getDownloadUrl( url, dom )
		{
		
			// プレイヤーのURLからdailymotionの動画のページのURLを取得
			if( !url.match( /http:\/\/www.dailymotion.com\/swf\/([^\&]+)\&/ ) )
			{
				return;
			}
			var movieId = RegExp.$1;
			var nextUrl = "http://www.dailymotion.com/video/" + movieId;

			// 動画ページからFLVのURLを取得
			var opt = 
				{
						method 	: 'GET'
					,	url		: nextUrl
					,	onerror	: function(res)
						{ 
							log( "GM_xmlhttpRequest Err!" );
						}
					,	onload	: function(res)
						{
						
							if ( res.status != 200 )
							{
								log( "Status Code is " + res.status );
							}
							
							if( !res.responseText.match( /addVariable\("video", "([^\"]+)"/mg ))
							{
								return;
							}
							
							var video = decodeURIComponent( RegExp.$1 );
							if( !video.match( /^(.+)@@spark/ ) )
							{
								return;
							}

							var url = "http://www.dailymotion.com" + RegExp.$1;

							// ダウンロードリンクをプレイヤーの隣につける
							var a  = document.createElement("a");
							a.innerHTML	= "[get FLV]";
							a.href		= url;
							dom.appendChild( a );
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

	function $(id)
	{
		return document.getElementById(id);
	}

	function $T(tab, dom)
	{
		if( !dom || dom == undefined )
		{
			$T( tab, document );
		}
		return dom.getElementsByTagName(tab);
	}

	function $C(class, dom)
	{
		if( !dom || dom == undefined )
		{
			$C( class, document );
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
	
	function log( str )
	{
		if( console )
		{
			console.log( str );
		}
		else
		{
			alert( str );
		}
	}

})();

