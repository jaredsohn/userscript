// ==UserScript==
// @name           dailymotionFlvGetter
// @namespace      http://d.hatena.ne.jp/kasei_san/
// @include        http://www.dailymotion.com/*
// ==/UserScript==
//
/*
   LICENSE : NYSL ( http://www.kmonos.net/nysl/NYSL.TXT )
*/


(function() {
	//-------------------------------------------------------------------------
	// AutoPagerizeでループする部分(検索結果とか)の処理
	//-------------------------------------------------------------------------
	// AutoPagerize対応
	if( window.AutoPagerize ) {
		// AutoPagerizeにて読み込み完了時に、引数のメソッドが呼ばれる
		window.AutoPagerize.addFilter( 
			function( doms ) {
				for( var i=0; i<doms.length; i++ ) {
					loop( doms[i] );
				}
			}
		 )
	}
	
	// 初回処理
	loop( document );

	function loop( dom ) {
		// プレビューのdom
		makeGetFlvLink(dom, "dmpi_video_preview");
		// 次へ or 前へのdom
		makeGetFlvLink(dom, "dmpi_video_prevnext");
	}

	// 動画のサムネイルの上にget Flvのリンク生成
	function makeGetFlvLink( dom, class ) {

		dmpi_video_previews = $C(class, dom);
		for( var i=0,l=dmpi_video_previews.length; i<l; i++ ) {
			var a = $T("a", dmpi_video_previews[i]);
			if( a.length <= 0 ) continue;
			var url = a[0].href;

			var div = document.createElement("div");
			var a  = document.createElement("a");
			a.innerHTML	= "[get FLV]";
			a.href		= "javascript:void(0);"
			a.id		= url;

			a.addEventListener(
					"click"
				,	function(e) {
						this.innerHTML = "";
						var img = document.createElement("img");
						img.src = lodingImg;
						this.appendChild( img );
						var opt = {
									method 	: 'GET'
								,	url		: this.id
								,	onerror	: function(res) { 
										log( "GM_xmlhttpRequest Err!" );
										this.innerHTML	= "[get FLV]";
									}
								,	onload	: function(res) {
										if ( res.status != 200 ) {
											log( "Status Code is " + res.status );
										}
											
										var dom = convertToHTMLDocument(res.responseText);
										var link = $T("link", dom);
										for( var i=0,l=link.length; i<l; i++ ) {
											if( link[i].rel == "video_src" ) {
												var url = link[i].href;
												downloadFlv($(opt.url), url);
												return;
											}
										}
										this.innerHTML	= "[get FLV]";
									}
							}

						window.setTimeout(
							function() {
									GM_xmlhttpRequest(opt)
								,	0
							}
						);
				}
				,	true
			);
			div.appendChild( a );

			if( class == "dmpi_video_prevnext" ) {
				div.setAttribute("style", "height:1.2em;");
				a.setAttribute("style", "height:1.2em;border:0;");

				var a2 = $T("a", dmpi_video_previews[i])[0];
				a2.parentNode.insertBefore( div, a2 );
			}else{
				div.appendChild( a );
				dmpi_video_previews[i].parentNode.insertBefore( div, dmpi_video_previews[i] );
			}
		}
	}


	// 対象のurlからflvのダウンロードを実施
	function downloadFlv( dom, url )
	{
		// プレイヤーのURLからdailymotionの動画のページのURLを取得
		if( !url.match( /http:\/\/www.dailymotion.com\/swf\/([^\?]+)\?/ ) ) {
			return;
		}
		var movieId = RegExp.$1;
		var nextUrl = "http://www.dailymotion.com/video/" + movieId;

		// 動画ページからFLVのURLを取得
		var opt = {
				method 	: 'GET'
			,	url		: nextUrl
			,	onerror	: function(res) { 
					log( "GM_xmlhttpRequest Err!" );
				}
			,	onload	: function(res) {
				
					if ( res.status != 200 ) {
						log( "Status Code is " + res.status );
					}
					
					if( !res.responseText.match( /addVariable\("video", "([^\"]+)"/mg )) {
						return;
					}
					
					var video = decodeURIComponent( RegExp.$1 );
					if( !video.match( /^(.+)@@spark/ ) ) {
						return;
					}

					var url = "http://www.dailymotion.com" + RegExp.$1;
					// どっちが良い？
					// location.replace(url);
					window.open(url);
				}
		}
		dom.innerHTML = "[get flv]";

		window.setTimeout(
				function() {
						GM_xmlhttpRequest(opt)
				}
			,	0
		);
	}

	//-------------------------------------------------------------------------
	// プレイヤーがあったら、それのダウンロードリンクも生成
	//-------------------------------------------------------------------------
	// プレイヤーのオブジェクトを取得
	var videoPlayer = getVideoPlayerObject();
	if( videoPlayer )
	{
		var video = decodeURIComponent( videoPlayer.getVariable("video") );
		if( video.match( /^(.+)@@spark/ ) )
		{
			var url = "http://www.dailymotion.com" + RegExp.$1;
			
			// ダウンロードリンクをタイトル部分につける
			var a  = document.createElement("a");
			a.innerHTML	= "[get FLV]";
			a.href		= url;

			$T( "h1", document )[0].appendChild( a );
		}
	}

	// プレイヤーのオブジェクトを取得
	function getVideoPlayerObject()
	{
		var dom = $C( "dm_widget_videoplayer", document )
		if( !dom || dom.length == 0 )
		{
			return null;
		}
		var dm_widget_videoplayer = dom[0];
		var div = $T( "div", dm_widget_videoplayer )[0];
		var id  = div.getAttribute( "id" );
		if( id.match( /video_player_(\w+)$/ ) )
		{
			var videoPlayerId = RegExp.$1;
			return unsafeWindow["so" + videoPlayerId];
		}
		return null;
	}

	//-------------------------------------------------------------------------
	// 動画ページのタブ押下時の処理
	//-------------------------------------------------------------------------
	// FLV取得済みかフラグ
	var gotFlvFlg = {};

	if(location.href.match("/playlist/")) {
		checkUpRelated_list_box("list_playlist");
		if($("list_related")) {
			$("related").addEventListener(
					"click"
				,	function(e) {
						checkUpRelated_list_box("list_related");
					}
				,	true
			);
		}

	}else{
		checkUpRelated_list_box("list_related");
		if($("list_playlist")) {
			$("list_playlist").addEventListener(
					"click"
				,	function(e) {
						checkUpRelated_list_box("list_playlist");
					}
				,	true
			);
		}
	}
	
	// member タブをクリックしたら、中身のflvリンクを取りに行く
	if($("link_member")) {
		$("link_member").addEventListener(
				"click"
			,	function(e) {
					checkUpRelated_list_box("list_member");
				}
			,	true
		);
	}

	// playlistsも同じく
	if($("link_playlists")) {
		$("link_playlists").addEventListener(
				"click"
			,	function(e) {
					checkUpRelated_list_box("list_playlists");
				}
			,	true
		);
	}

	// list_boxの中身がlodingでなかったら、flvのリンクを取りに行く
	function checkUpRelated_list_box(listId) {
		if( gotFlvFlg[listId] ) {
			return;
		}
		gotFlvFlg[listId] = false;

		var div = $(listId);
		if(!div) {
			gotFlvFlg[listId] = true;
			return;
		}
		var lodingDiv = ($T("div", div)[0]);
		if( !lodingDiv ) {
			gotFlvFlg[listId] = true;
			return;
		}
		
		// ロード中ならば、n秒後に試行
		if(lodingDiv.className.match("loading_text")) {
			// log(listId + " : loading...");
			window.setTimeout(
					function() {
							checkUpRelated_list_box(listId)
					}
				,	1000
			);
			return;
		}
		// log(listId + " : loaded");
		// flvリンク取得
		makeGetFlvLink(
				div
			,	( listId == "list_playlists" ) ? "dmpi_playlist_preview" : "dmpi_video_preview"
		);
		gotFlvFlg[listId] = true;
	}

	//-------------------------------------------------------------------------
	// common
	//-------------------------------------------------------------------------
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

	function $(id) {
		return document.getElementById(id);
	}

	function $T(tab, dom) {
		if( !dom || dom == undefined ) {
			$T( tab, document );
		}
		return dom.getElementsByTagName(tab);
	}

	function $C(class, dom) {
		if( !dom || dom == undefined ) {
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
	
	function log( str ) {
		if( console ) {
			console.log( str );
		} else {
			alert( str );
		}
	}
	
	var lodingImg = 
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


})();
