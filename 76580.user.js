// ==UserScript==
// @name			AsgDownloadHelper
// @namespace		org.fukata.ff.us.asgdownloadhelper
// @description		Helper download movie in asg.to
// @author			@fukata
// @include			http://asg.to/*
// @include			https://asg.to/*
// @include			http://search.asg.to/*
// @include			https://search.asg.to/*
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.2.js
// ==/UserScript==
// ver 
// 1.0 初回リリース
// 1.1 コメント文言修正
// 1.1.1 動画詳細ページにてDLリンク押下時にキャッシュ解決に時間がかかっていたバグを修正
// 1.2.0 サイトの仕様変更に対応 
// 1.3.0 プロンプトに表示する際にファイル名の先頭に付与する文字列を設定できるオプションを追加 
// 1.4.0 AutoPagerに対応 

// ==============================================
// 設定値
// ==============================================
var G_OPTIONS = {
	// ダウンロード時にプロンプト画面を表示するか
	// boolean: true or false
	"is_copy_clipboard": true,
	// プロンプト画面に動画タイトルを表示する際にファイルの拡張子を付与するか
	// boolean: true or false
	"is_add_extension": true,
	// プロンプト画面に動画タイトルを表示する際にファイル名の先頭に付与する文字列
	// 保存先フォルダのパス等（例：C:\downloads\xxx\）
	// String: 
	"filename_prefix": ''
};
// ==============================================

// 動画詳細ページへのリンクの正規表現
var G_RE = new RegExp("");
G_RE.compile("^(https?:\/\/asg\.to)?\/contentsPage\.html[?]mcd=[0-9|a-z|A-Z]+$");

// ページロード時に初期化
$(document.body).ready(init);

// 初期化
function init() {
	var body = $('body')[0];
	attachAghElements(body);
	// 新規にDOMが挿入された場合の処理
	body.addEventListener('DOMNodeInserted', function(event){
		attachAghElements(event.target);
	});
}

function attachAghElements(rootNode) {
	if (window.location.href.match(G_RE)) {
		$("#movie_info",rootNode).prepend(createDlElement(window.location.href));
		
		$("#nextback",rootNode).find("a").each(function() {
			var url = $(this).attr('href');
			// 動画詳細ページへのリンクかつ、imgタグに対するリンクではない場合
			if (url.match(G_RE)) {
				$(this).after(createDlElement(url));
			}
		});
		
		$("#recommended_in_category",rootNode).find("a").each(function() {
			var url = $(this).attr('href');
			// 動画詳細ページへのリンクかつ、imgタグに対するリンクではない場合
			if (url.match(G_RE) && $(this).find('img').length==0) {
				$(this).after(createDlElement(url));
			}
		});
		
		$("#leftarea",rootNode).find("a").each(function() {
			var url = $(this).attr('href');
			// 動画詳細ページへのリンクかつ、imgタグに対するリンクではない場合
			if (url.match(G_RE) && $(this).find('img').length==0) {
				$(this).after(createDlElement(url));
			}
		});
	} else {
		$("a",rootNode).each(function() {
			var url = $(this).attr('href');
			// 動画詳細ページへのリンクかつ、imgタグに対するリンクではない場合
			if (url.match(G_RE) && $(this).find('img').length==0) {
				$(this).after(createDlElement(url));
			}
		});
	}
}


// ダウンロード処理を行う
function doDownload(event) {
	var params = loadFlv(event.data.url);
	if (params.success) {
		//XXX firefoxでは、クリップボードにJSから直接コピーすることができないため、代用。
		if (G_OPTIONS.is_copy_clipboard) {
			if (window.prompt('', G_OPTIONS.filename_prefix+params.filename)!=null) {
				fowardUrl(params.flv);
			}
			//copyToClipboard(params.filename);
		} else {
			fowardUrl(params.flv);
		}
	} else {
	}
}

// URLに遷移する。
function fowardUrl(url) {
	// キャッシュ解決のため、ハッシュコードをURLに追加
	var now = new Date();
	var hash = "adh_hash=" + now.getTime() + now.getMilliseconds();
	url += url.indexOf('?') == -1 ? '?' : '&';
	window.location.href = url + hash;
}

// クリップボードにテキストをコピーする
function copyToClipboard(text) {
	var input, success;
    input = document.createElement("input");
    input.style.position = "absolute";
    input.style.top = "-100px";
    input.value = text;
    input.hidden = true;
    document.body.appendChild(input);
    input.select();
    try {
    	success = document.execCommand("copy", false, null);
    } catch (ex) {
    	success = false;
    } finally {
    	document.body.removeChild(input);
    }
}

// flvファイルパスを取得する
function loadFlv(detailUrl) {
	var params = new Object();
	
	var splited = detailUrl.split('?');
	params.url = splited[0];
	var qstring = splited[1];
	var qstringSplited = qstring.split('=');
	params.mcd = qstringSplited[1];
	
	// xmlの取得
	res = getVideoDetail(detailUrl);
	if (res) {
		params.title = removeCharactersOfTitle(res['videoTitle0']);
		params.flv = res['videoUrl0'];
		params.filename = G_OPTIONS.is_add_extension ? params.title+".flv" : params.title;
		params.success = true;
		params.status = 200;
	} else {
		params.success = false;
		params.status = -1;
	}
	
	return params;
}

/**
 * 動画タイトルから不要な文字列を削除
 * @param title
 */
function removeCharactersOfTitle(title) {
    title = title.replace(" - アダルト動画 裏アゲサゲ−無料アダルト動画−", "");
    return title;
}

// 動画詳細ページURLをチェックし、整形して返す
function getUrl(url) {
	if (url.indexOf("http://asg.to")==0) {
		return url;
	} else {
		return "http://asg.to"+url;
	}
}

// ダウンロード用DOMエレメントを作成する
function createDlElement(url) {
	var spanEl = document.createElement('span');
	var aEl = document.createElement('a');
	$(spanEl).addClass("adh_download");
	$(aEl).attr('href', 'javascript:void(0)');
	$(aEl).bind('click', {"url":getUrl(url)}, doDownload);
	$(aEl).append("動画DL");
	$(spanEl).append("【").append(aEl).append("】");
	return spanEl;
}


// ====================================================================================
//
// UraAgesage.site.js
// 
// ====================================================================================
//==SiteScript==
//@siteName    裏アゲサゲ
//@siteUrl     http://www.jp-sex.com/index.html
//@author      DarkKnight
//@authorUrl   http://darkknightlabs.com/
//@scriptUrl   http://darkknightlabs.com/site-script/
//@description revise,distribute,by mayan, 2010/11/26
//@date        2008/09/25
//@version     0.4
//==/SiteScript==


function CravingSiteScript() {
 this._initialize();
}


CravingSiteScript.prototype = {
 _xhr: null,
 
 _initialize: function() {},
 
 _getXmlHttpRequest: function() {
     if ( this._xhr != null ) {
         return this._xhr;
     }
     
     var xhr = null;
     var these = [
           function() { return new XMLHttpRequest(); }
         , function() { return new ActiveXObject( "Msxml2.XMLHTTP" ); }
         , function() { return new ActiveXObject( "Microsoft.XMLHTTP" ); }
         , function() { return new ActiveXObject( "Msxml2.XMLHTTP.4.0" ); }
     ];
     
     for ( var i = 0, length = these.length; i < length; i++ ) {
         var func = these[ i ];
         try {
             xhr = func();
             break;
         }
         catch( e ) {}
     }
     this._xhr = xhr;
     
     return this._xhr;
 },
 
 _load: function( url, data, method ) {
     var req = this._getXmlHttpRequest();
     
     var mtd = ( method == null ) ? "GET" : "POST";
     
     req.open( mtd, url, false );
     
     if ( mtd == "POST" ) {
         req.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
     }
     
     req.send( data );
     
     return req.responseText;
 },
 
 getResponseText: function( url, data, method ) {
     return this._load( url, data, method );
 },
 
 getResponseJSON: function( url, data, method ) {
     var text = this._load( url, data, method );
     
     return eval( "("+text+")" );
 },
 
 getResponseBody: function() {
     if ( this._xhr ) {
         return this._xhr.responseBody;
     }
     else {
         return null;
     }
 },

 /// Math
 random: function( limit ) {
     return Math.floor( Math.random() * limit );
 },
 
 /// String
 decodeHtml: function( str ) {
     return str.replace( /&(quot|#34);/ig,    "\"" )
               .replace( /&(amp|#38);/ig,     "&"  )
               .replace( /&(apos|#39);/ig,    "'"  )
               .replace( /&(lt|#60);/ig,      "<"  )
               .replace( /&(gt|#62);/ig,      ">"  )
               .replace( /&(nbsp|#160);/ig,   " "  )
               .replace( /&(frasl|#8260);/ig, "/"  );
 }
}


function CharConv() {
 var _initialized = false;
 var _stream = null;
 var _result = "";
 
 this._initialize = function () {
     try {
         this._stream = new ActiveXObject( "ADODB.Stream" );
         this._initialized = true;
     }
     catch ( e ) {}
 }
 this._initialize();
 
 this.isInit = function() {
     return this._initialized;
 }
 
 this.convert = function ( bin, charset ) {
     this._stream.Open();
     try{
         this._stream.Type = 1;
         this._stream.Write( bin );
         
         this._stream.Position = 0;
         this._stream.Type = 2;
         this._stream.Charset = charset; 
         this._result = this._stream.ReadText();
     }
     catch( e ) {
         this._result = "";
     }
     this._stream.Close();
 }
 
 this.getResult = function() {
     return this._result;
 }
}


function isSiteUrl( url ) {
 if ( url.match( /http:\/\/asg\.to\/contentsPage\.html\?mcd=.+/ ) ) return true;
 return false;
}


function getVideoDetail( url ) {
 if ( !url.match( /http:\/\/asg\.to\/contentsPage\.html\?mcd=([^?&]+)/ ) ) return null;
 var mcd = RegExp.$1;
 
 var craving = new CravingSiteScript();
 var htmlText = craving.getResponseText( url );
 if ( !htmlText ) return null;
 
 if ( htmlText.match( /urauifla\(\s*("|')(.+?)\1/ ) 
      && RegExp.$2.match( /&pt=([^&]+)/ ) )
     var pt = RegExp.$1;
 else return null;
 
 var xmlurl = "http://asg.to/contentsPage.xml?mcd=" + mcd
            + "&pt=" + pt
            + "&st=" + getSt( mcd, pt );
 
 text = craving.getResponseText( xmlurl );
 if ( !text ) return null;
 
 var objConv = new CharConv();
 if ( objConv.isInit() ) {
 	objConv.convert( craving.getResponseBody(), "utf-8" );
     var result = objConv.getResult();
     if ( result != "" ) {
         text = result;
     }
 }
 
 if ( !text.match( /<movieurl>(.+?)<\/movieurl>/ ) ) return null;
 var realUrl = RegExp.$1;
 
 if ( htmlText.match( /<title>(.*?)<\/title>/ ) ) var title = RegExp.$1;
 if ( !title ) title = "uraagsg_" + mcd;
 title = title.replace(/ - アダルト動画 裏アゲサゲ－無料アダルト動画－/, '');
 title = title.replace(/[\\\/:*?"<>|]/g, "_");
 
 return { videoTitle0: title, videoUrl0: realUrl };
}


function getSt( mcd, pt ){
 var d = "---===XERrr3nmsdf8874nca===---";
 var strSeed = d + mcd + pt.substring( 0, 8 );
 return ( new clsMD5() ).getHash( strSeed );
}


/*************************************************************
* Dark Knight さんのサイトスクリプト 
* Jokeroo.site.js (var 0.4) より
* MD5 クラス
* new で object を作成した後、getHash(str) します。
*************************************************************/
function clsMD5(){
 var _MD5_T;
 var _MD5_round1;
 var _MD5_round2;
 var _MD5_round3;
 var _MD5_round4;
 var _MD5_round;
 
 this._initialize = function() {
     
     _MD5_T = new Array( 0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
                         0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
                         0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
                         0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
                         0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
                         0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
                         0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
                         0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
                         0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
                         0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
                         0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
                         0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
                         0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
                         0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
                         0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
                         0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
                         0xeb86d391
                       );
                       
     _MD5_round1 = new Array( new Array(  0,  7,  1 ), new Array(  1, 12,  2 ),
                              new Array(  2, 17,  3 ), new Array(  3, 22,  4 ),
                              new Array(  4,  7,  5 ), new Array(  5, 12,  6 ),
                              new Array(  6, 17,  7 ), new Array(  7, 22,  8 ),
                              new Array(  8,  7,  9 ), new Array(  9, 12, 10 ),
                              new Array( 10, 17, 11 ), new Array( 11, 22, 12 ),
                              new Array( 12,  7, 13 ), new Array( 13, 12, 14 ),
                              new Array( 14, 17, 15 ), new Array( 15, 22, 16 )
                            );
                            
     _MD5_round2 = new Array( new Array(  1,  5, 17 ), new Array(  6,  9, 18 ),
                              new Array( 11, 14, 19 ), new Array(  0, 20, 20 ),
                              new Array(  5,  5, 21 ), new Array( 10,  9, 22 ),
                              new Array( 15, 14, 23 ), new Array(  4, 20, 24 ),
                              new Array(  9,  5, 25 ), new Array( 14,  9, 26 ),
                              new Array(  3, 14, 27 ), new Array(  8, 20, 28 ),
                              new Array( 13,  5, 29 ), new Array(  2,  9, 30 ),
                              new Array(  7, 14, 31 ), new Array( 12, 20, 32 )
                            );
                            
     _MD5_round3 = new Array( new Array(  5,  4, 33 ), new Array(  8, 11, 34 ),
                              new Array( 11, 16, 35 ), new Array( 14, 23, 36 ),
                              new Array(  1,  4, 37 ), new Array(  4, 11, 38 ),
                              new Array(  7, 16, 39 ), new Array( 10, 23, 40 ),
                              new Array( 13,  4, 41 ), new Array(  0, 11, 42 ),
                              new Array(  3, 16, 43 ), new Array(  6, 23, 44 ),
                              new Array(  9,  4, 45 ), new Array( 12, 11, 46 ),
                              new Array( 15, 16, 47 ), new Array(  2, 23, 48 )
                            );
                            
     _MD5_round4 = new Array( new Array(  0,  6, 49 ), new Array(  7, 10, 50 ),
                              new Array( 14, 15, 51 ), new Array(  5, 21, 52 ),
                              new Array( 12,  6, 53 ), new Array(  3, 10, 54 ),
                              new Array( 10, 15, 55 ), new Array(  1, 21, 56 ),
                              new Array(  8,  6, 57 ), new Array( 15, 10, 58 ),
                              new Array(  6, 15, 59 ), new Array( 13, 21, 60 ),
                              new Array(  4,  6, 61 ), new Array( 11, 10, 62 ),
                              new Array(  2, 15, 63 ), new Array(  9, 21, 64 )
                            );
                            
     _MD5_round = new Array( new Array( this._MD5_F, _MD5_round1 ),
                             new Array( this._MD5_G, _MD5_round2 ),
                             new Array( this._MD5_H, _MD5_round3 ),
                             new Array( this._MD5_I, _MD5_round4 )
                            );
                            
 }
 
 this._MD5_F = function( x, y, z ) { return (x & y) | (~x & z); }
 
 this._MD5_G = function( x, y, z ) { return (x & z) | (y & ~z); }
 
 this._MD5_H = function( x, y, z ) { return x ^ y ^ z;          }
 
 this._MD5_I = function( x, y, z ) { return y ^ (x | ~z);       }
 
 this._MD5_pack = function ( n32 ) {
     return String.fromCharCode(   n32          & 0xff ) +
            String.fromCharCode( ( n32 >>> 8  ) & 0xff ) +
            String.fromCharCode( ( n32 >>> 16 ) & 0xff ) +
            String.fromCharCode( ( n32 >>> 24 ) & 0xff );
 }
 
 this._MD5_unpack = function( s4 ) {
     return  s4.charCodeAt( 0 )         |
           ( s4.charCodeAt( 1 ) <<  8 ) |
           ( s4.charCodeAt( 2 ) << 16 ) |
           ( s4.charCodeAt( 3 ) << 24 );
 }
 
 this._MD5_number = function( n ) {
     while ( n < 0 ) {
         n += 4294967296;
     }
     
     while ( n > 4294967295 ) {
         n -= 4294967296;
     }
     
     return n;
 }
 
 this._MD5_apply_round = function( x, s, f, abcd, r ) {
     var a, b, c, d;
     var kk, ss, ii;
     var t, u;
     
     a = abcd[ 0 ];
     b = abcd[ 1 ];
     c = abcd[ 2 ];
     d = abcd[ 3 ];
     kk = r[ 0 ];
     ss = r[ 1 ];
     ii = r[ 2 ];
     
     u = f( s[ b ], s[ c ], s[ d ] );
     t = s[ a ] + u + x[ kk ] + _MD5_T[ ii ];
     t = this._MD5_number( t );
     t = ( ( t << ss ) | ( t >>> ( 32 - ss ) ) );
     t += s[ b ];
     s[ a ] = this._MD5_number( t );
 }
 
 this._MD5_hash = function( data ) {
     var abcd, x, state, s;
     var len, index, padLen, f, r;
     var i, j, k;
     var tmp;
     
     state = new Array( 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476 );
     len = data.length;
     index = len & 0x3f;
     padLen = ( index < 56 ) ? ( 56 - index ) : ( 120 - index );
     
     if ( padLen > 0 ) {
         data += "\x80";
         for ( i = 0; i < padLen - 1; i++) {
             data += "\x00";
         }
     }
     
     data += this._MD5_pack( len * 8 );
     data += this._MD5_pack( 0 );
     len  += padLen + 8;
     abcd = new Array( 0, 1, 2, 3 );
     x    = new Array( 16 );
     s    = new Array( 4 );
     
     for ( k = 0; k < len; k += 64 ) {
         for( i = 0, j = k; i < 16; i++, j += 4 ) {
             x[ i ] = data.charCodeAt( j     )         |
                    ( data.charCodeAt( j + 1 ) <<  8 ) |
                    ( data.charCodeAt( j + 2 ) << 16 ) |
                    ( data.charCodeAt( j + 3 ) << 24 );
         }
         
         for ( i = 0; i < 4; i++ ) {
             s[ i ] = state[ i ];
         }
         
         for ( i = 0; i < 4; i++ ) {
             f = _MD5_round[ i ][ 0 ];
             r = _MD5_round[ i ][ 1 ];
             
             for ( j = 0; j < 16; j++ ) {
                 this._MD5_apply_round( x, s, f, abcd, r[ j ] );
                 tmp = abcd[ 0 ];
                 abcd[ 0 ] = abcd[ 3 ];
                 abcd[ 3 ] = abcd[ 2 ];
                 abcd[ 2 ] = abcd[ 1 ];
                 abcd[ 1 ] = tmp;
             }
         }
         
         for ( i = 0; i < 4; i++ ) {
             state[ i ] += s[ i ];
             state[ i ] = this._MD5_number( state[ i ] );
         }
     }
     
     return this._MD5_pack( state[ 0 ] ) +
            this._MD5_pack( state[ 1 ] ) +
            this._MD5_pack( state[ 2 ] ) +
            this._MD5_pack( state[ 3 ] );
 }
 
 this.getHash = function ( data ) {
     var result = "";
     var bit128 = this._MD5_hash(data);
     
     for ( var i = 0; i < 16; i++ ) {
         var c = bit128.charCodeAt( i );
         result += "0123456789abcdef".charAt( ( c >> 4 ) & 0xf );
         result += "0123456789abcdef".charAt( c & 0xf );
     }
     
     return result;
 }
 
 this._initialize();
 
}
