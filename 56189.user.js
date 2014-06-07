// ==UserScript==
// @name           TwitterPhotoShow
// @namespace      http://userscripts.org/users/105016
// @description    This script enables displaying images from links directly on twitter.com or other web-based twitter clients.
// @copyright      2009, darasion (https://twitter.com/darasion)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        http://itweet.net/*
// @include        http://hootsuite.com/*
// @include        http://www.twitzap.com/*
// @include        http://twitzap.com/*
// @include        http://seesmic.com/web/*
// @include        http://www.twitscoop.com/*
// @include        http://twitese.appspot.com/*
// @include        https://twitese.appspot.com/*
// @include        http://my.peoplebrowsr.com/*
// @include        http://twithive.com/*
// @include        http://splitweet.com/*
// @include        http://www.twittergadget.com/*
// @include        https://*twittergadget.appspot.com*
// @include        http://*twittergadget.appspot.com*
// @include        http://hahlo.com/*
// @include        http://www.twitiq.com/*
// @include        http://cotweet.com/*
// @include        http://twitterkr.com/*
// @include        https://oauth.filttr.com/*
// @include        http://oauth.filttr.com/*
// @include        https://filttr.com/*
// @include        http://filttr.com/*
// @include        http://sayabit.com/*
// @exclude        http://tweetsh.com/*
// @exclude        http://tweetsort.com/*
// @exclude        http://brizzly.com/*
// ==/UserScript==

/*

Change log in Chinese:

/---- v2009.10.13 ---
1、引入了 jQuery 库，希望可以为今后扩充功能和减少 Bug 奠定基础。
2、进一步改进代码。
3、加入对后缀为 .jpg、.gif、.png、.jpeg 等图片网址显示支持。
4、暂时去掉了对 tweetsh.com 的支持(命令行的网页)。

注：虽说是改进代码，但未必合理。所以，如果有什么改进意见一定要对我讲啊。
\--------------------


/---- v2009.10.14 ---
1、增加短址展开功能(暂时可免翻墙)：
	* bit.ly
	* j.mp
	* htxt.it
2、增加支持的客户端网站：
	http://hahlo.com
	http://www.twitiq.com
\--------------------


/---- v2009.10.15 ---
小改，增加短址展开：http://ff.im
\--------------------


/---- v2009.10.22 ---
增加对客户端网站：http://cotweet.com/ 的支持。
\--------------------


/---- v2009.10.28 ---
1、引入 developer key 的配置，改进了 mobypicture.com 和 moby.to 的显示效果；
2、增加对 flickr 图片缩略图的支持(需要设置 API key)；
3、加入了 ow.ly/i 和 img.ly 的缩略图显示；
4、加入了对客户端网站 twitterkr.com 的支持。


☞ 关于 developer/API key 的使用帮助：

一、首先
1、申请 Mobypicture developer key: http://www.mobypicture.com/apps
2、申请 Flickr API key: http://www.flickr.com/services/api/keys/apply/

二、其次，设置 key 的方式有两种：
1、点击写有【点击设置Flickr API key】或【点击设置Mobypicture developer key】字样的图片。
弹出对话框，将申请到的相应 key 填入，按确定。
2、右键点击右下角猴子图标，选择菜单【用户脚本命令】->【Set Mobypictrue developer key.】/【Set Flickr API key.】。
弹出对话框，将申请到的相应 key 填入，按确定。

三、最后，注意事项。
1、按下确定时，页面会有一个刷新的过程，刷新后才能正确显示；
2、你必须设置正确的 developer/API key ，否则图片不会正确显示；
3、如果你设置了错误的 developer/API key ，可以采用上边介绍的第 2 种方式重新输入。

\--------------------


/---- v2009.10.31 ---
1、剥离短地址展开功能。剥离后的短地址展开功能被做成了另外一个脚本 TinyWall ，详见：
http://userscripts.org/scripts/show/60915

这样做是基于如下考虑：
1、这样感觉会比较模块化，脚本可以按需安装。
2、可将短址展开扩展到所有网站，不仅限于 Twitter。

\--------------------

/---- v2009.11.03 ---
1、增加对客户端网站 http://oauth.filttr.com 的支持。
2、增加对图片网站 http://movapic.com 的缩略图显示支持。
3、改进部分代码。

\--------------------

/---- v2009.11.06 ---
最近 GFWTube 似乎被干了。
因此更改一下 GFWTube 的域名。

不能访问 appspot.com 的同学请自行搜索相关 hosts IP。
这里就不提供了，免得继续被干。

\--------------------

/---- v2010.03.04 ---1、根据：http://tinymsg.appspot.com/Deq所提到的进行了修改。
2、还原Youtube链接。

\--------------------
*/


//----------------------------------------------------------------------------------
// http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// Author: Ryan Greenberg (ryan@ischool.berkeley.edu)
// Date: September 3, 2009
// Version: $Id: gm_jq_xhr.js 94 2009-09-04 08:36:28Z ryan $

// This allows jQuery to make cross-domain XHR by providing
// a wrapper for GM_xmlhttpRequest. The difference between
// XMLHttpRequest and GM_xmlhttpRequest is that the Greasemonkey
// version fires immediately when passed options, whereas the standard
// XHR does not run until .send() is called. In order to allow jQuery
// to use the Greasemonkey version, we create a wrapper object, GM_XHR,
// that stores any parameters jQuery passes it and then calls GM_xmlhttprequest
// when jQuery calls GM_XHR.send().

// Tell jQuery to use the GM_XHR object instead of the standard browser XHR
$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});

function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;
    
    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };
    
    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };
        
    this.abort = function() {
        this.readyState = 0;
    };
    
    this.getResponseHeader = function(name) {
        return this.headers[name];
    };
    
    this.send = function(data) {
        this.data = data;
        var that = this;

		// For http://wiki.greasespot.net/0.7.20080121.0_compatibility reasion I add window.setTimeout() here.
		// By darasion.
		window.setTimeout(function(){
			GM_xmlhttpRequest({
				method: that.type,
				url: that.url,
				headers: that.headers,
				data: that.data,
				onload: function(rsp) {
					// Populate wrapper object with all data returned from GM_XMLHttpRequest
					for (k in rsp) {
						that[k] = rsp[k];
					}
				},
				onerror: function(rsp) {
					for (k in rsp) {
						that[k] = rsp[k];
					}
				},
				onreadystatechange: function(rsp) {
					for (k in rsp) {
						that[k] = rsp[k];
					}
				}
			});
		},0);
    };
};
//----------------------------------------------------------------------------------

;(function($){

	
	var debug = false;


	/*  */
	var currentSite;


	/*  */
	var version = 'v2009.11.06';


	/* Remember the timestamp when loaded. */
	var loadTime = Number(new Date());


	/* Program will mark the parsed status element using this class name, so that the program will not parse this status again next time. */
	var photoShownClassName = 'tps-photo-shown-status-' + loadTime;


	/* Program will mark the photo element using this class name, and it will be add some styles on this class later on. */
	var photoClassName = 'tps-photo-' + loadTime;


	/* Global style */
	var styleString = <>
		.{photoClassName} <![CDATA[{
			padding:0.5em !important;
			clear:both !important;
			float:none !important;
			display:block !important;
			overflow:hidden !important;
		}]]>

		.{photoClassName} img<![CDATA[{
			border:1px dashed !important;
			width:auto;
			max-width:250px !important;
			max-height:500px !important;
			height:auto;
			clear:both !important;
		}]]>

		.{photoClassName} a<![CDATA[{
			border:none;margin-right:5px;
		}]]>

	</>.toString();


	/*
	*  The photo sites which are supported.
	*/
	var photoLinkProcessors = {
		"twitpic": {
			pattern: /^http:\/\/twitpic\.com\/([\d\w]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://twitpic.com/show/thumb/'+m[1]
				});
			}
		},
		"twitgoo": {
			pattern: /^http:\/\/twitgoo\.com\/([\d\w]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://twitgoo.com/show/thumb/'+m[1]
				});
			}
		},
		"yfrog": {
			pattern: /^http:\/\/yfrog\.([a-zA-Z.]{2,5})\/([0-9a-zA-Z]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://yfrog.'+m[1]+'/'+m[2]+'.th.jpg'
				});
			}
		},
		"twitxr": {
			pattern: /^http:\/\/twitxr\.com\/[^ ]+\/updates\/([\d]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://twitxr.com/image/'+m[1]+'/th/'
				});
			}
		},
		
		"f.hatena": {
		pattern: /http:\/\/(f\.hatena\.ne\.jp\/(([^\/])[^\/]+)\/(([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])[0-9]+))/gi, 
		adding: function(m){ 
				return imageTpl({
					link: m[0],
					src: 'http://img.f.hatena.ne.jp/images/fotolife/' + m[3] + '/' + m[2] + '/' + m[5] + '/' + m[4] + '_120.jpg'
				});
			}
		},
		
		"hellotxt": {
			pattern: /^http:\/\/hellotxt\.com\/i\/([\d\w]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://hellotxt.com/image/'+m[1]+'.s.jpg'
				});
			}
		},
		"mobypicture": {
			pattern: /^http:\/\/(?:(?:mobypicture\.com\/\?([\w\d]+))|(?:moby\.to\/([\w\d]+)))/gi,
			adding: function(m){
				if(MobyUtils.getKey()){
					function getLink($img, code){
						MobyUtils.getThumbUrl(code, 'small', 'json',function(data){
							$img.attr('src',data.url);
						});
					}

					var imgT = imageTpl({
						link: m[0]
						//,src: 'http://moby.to/'+( m[1] || m[2] )+':square'
						,alt: m[0]
					});
					getLink(imgT.find('img'), ( m[1] || m[2] ));

					return imgT;
				}else{
					return imageTpl({
						link: '#',
						alt: '点击设置 Developer Key'
					}).click(function(){
						MobyUtils.inputKey();
						return false;
					});
				}
			}
		},
		"flickr": {
			pattern: /^http:\/\/(?:(?:flic\.kr\/p\/(.+))|(?:www\.flickr\.com\/photos\/\w+\/(\d+)))/gi,
			adding: function(m){
				if(FlickrUtils.getKey()){

					function getLink($img, id){
						FlickrUtils.rest({
							method: 'flickr.photos.getInfo',
							api_key: FlickrUtils.getKey(),
							photo_id: id,
							format: 'json',
							nojsoncallback: 1
						},function(d){
							var imgsrc = 
								"http://farm"
								+ d.photo.farm 
								+ ".static.flickr.com/"
								+ d.photo.server 
								+ "/" + d.photo.id 
								+ "_" + d.photo.secret
								+ "_m.jpg";
							$img.attr('src',imgsrc);
						});
					}

					var imgT = imageTpl({
						link: m[0],
						alt: m[0]
					});
					getLink(imgT.find('img'), FlickrUtils.base58_decode( m[1] ) || m[2]);
					
					return imgT;
				}else{
					return imageTpl({
						link: '#',
						alt: '点击设置 Flickr API Key'
					}).click(function(){
						FlickrUtils.inputKey();
						return false;
					});
				}
			}
		},
		"movapic.com": {
			pattern: /^http:\/\/movapic\.com\/pic\/(\w+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://image.movapic.com/pic/s_'+ m[1] + '.jpeg',
					alt: '携帯百景(ケイタイヒャッケイ) ',
					title: 'movapic.com'
				});
			}
		},
		"youtube": {
			pattern: /^http:\/\/youtube\.com\/watch\?v=([_\-\d\w]+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: "http://i.ytimg.com/vi/"+m[1]+"/1.jpg",
					alt: 'Click to watch the video.'
				});
			}
		},
		/* 这个被作者私有，不再用了。
		"gfwtube": {
			pattern: /^http:\/\/(?:hloli\.appspot\.com\/gfwtube\/|apps\.hloli\.net\/gfwtube\/)([_\-\d\w]+)\//gi,
			adding: function(m){
				return imageTpl({
					link: 'http://hloli.appspot.com/gfwtube/' + m[1] + '/',
					src: "http://i.ytimg.com/vi/"+m[1]+"/1.jpg",
					alt: 'Click to watch the video.'
				});
			}
		},
		*/
		"ts1in": {
			pattern: /^http:\/\/ts1\.in\/(\d+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://ts1.in/mini/'+m[1]
				});
			}
		},
		"img.ly": {
			pattern: /^http:\/\/img\.ly\/(\w+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://img.ly/show/thumb/'+m[1]
				});
			}
		},
		"ow.ly/i": {
			pattern: /^http:\/\/ow\.ly\/i\/(\w+)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: 'http://static.ow.ly/photos/thumb/' + m[1] + '.jpg'
				});
			}
		},
		"others": {
			pattern: /^http:\/\/.*\/.+(\.jpg|\.gif|\.png|\.jpeg)/gi,
			adding: function(m){
				return imageTpl({
					link: m[0],
					src: m[0]
				});
			}
		}
	};


	/*
	* The twitter sites which are supported.
	*/
	var twitterSiteSelectors = {
		"twitter.com": {
			host:"twitter.com",
			getContents: function(elem){
				return $(".entry-content,#latest_text_full", elem);
			}
			//,excluding:['twitpic','yfrog'] //just for testing.
		},
		"itweet.net": {
			host:"itweet.net",
			getContents: function(elem){
				return $(".profileLastTweet,.twText", elem);
			}
		},
		"hootsuite.com": {
			host:"hootsuite.com",
			getContents: function(elem){
				return $(".tweetContent", elem);
			}
		},
		"seesmic.com": {
			host:"seesmic.com",
			getContents: function(elem){
				return $(".body", elem);
			}
		},
		"twitscoop.com": {
			host:"twitscoop.com",
			getContents: function(elem){
				return $(".search-results-twit-text", elem);
			},
			patch: function(){
				$("." + photoClassName + " img").css({"height":"auto","width":"auto"});
			}
		},
		"twitese.appspot.com": {
			host:"twitese.appspot.com",
			getContents: function(elem){
				return $(".status_word", elem);
			},
			excluding:['twitpic'] 
		},
		"my.peoplebrowsr.com": {
			host:"my.peoplebrowsr.com",
			getContents: function(elem){
				return $(".post_text",elem);
			}
		},
		"twithive.com": {
			host:"twithive.com",
			getContents: function(elem){
				return $(".timeline_status_text", elem);
			}
		},
		"splitweet.com": {
			host:"splitweet.com",
			getContents: function(elem){
				return $(".tweet_content", elem);
			}
		},
		"twittergadget.com": {
			host:"twittergadget.com",
			getContents: function(elem){
				return $(".tfall", elem);
			}
		},
		"twittergadget.appspot.com": {
			host:"twittergadget.appspot.com",
			getContents: function(elem){
				return $(".text", elem);
			}
		},
		"hahlo.com": {
			host:"hahlo.com",
			getContents: function(elem){
				return $(".text", elem);
			}
		},
		"www.twitiq.com": {
			host:"www.twitiq.com",
			getContents: function(elem){
				return $(".timeline_status_text,.iq_rt_user_text", elem);
			}
		},
		"cotweet.com": {
			host:"cotweet.com",
			getContents: function(elem){
				return $(".result_container dl dd p", elem);
			}
		},
		"twitterkr.com": {
			host:"twitterkr.com",
			getContents: function(elem){
				return $(".article", elem);
			},
			excluding:["twitpic","yfrog"]
		},
		"oauth.filttr.com": {
			host:"oauth.filttr.com",
			getContents: function(elem){
				return $(".tweet_text_new,.reply_text", elem);
			}
		},
		"sayabit.com": {
			host:"sayabit.com",
			getContents: function(elem){
				return $(".list_nxtliinner", elem);
			}
		},
		"twitzap.com": {
			host:"twitzap.com",
			getContents: function(elem){
				return $(".PlainContent", elem);
			},
			excluding:["twitpic"] 
		}
	};

	$.ajaxSetup({
		beforeSend: function(xhr){xhr.setRequestHeader('User-Agent','TwitterPhotoShow/' + version + ' (Greasemonkey)');}
	});


	/* function log */
	function log(t){if(debug)GM_log('\n' + t);}


	function isFunction ( obj ) {
		return typeof obj === "function";
	}


	function imageTpl(/* {src:'', link:'a href', alt:'', style:'', title:'' ... } */ opt){
		
		opt = opt || {};
		opt.alt = opt.alt || opt.link;
		var link = opt.link || '#';
		delete opt.link;

		var attrs = [];
		for(var n in opt){
			attrs.push( n + '="' + opt[n] + '"' );
		}
		return $("<a href='" + link + "' target='_blank'><img " + attrs.join(' ') + " /></a>");

	}


	function init(){

		for(id in twitterSiteSelectors){
			
			if(location.toString().indexOf(twitterSiteSelectors[id].host) != -1){ //#fix it: Planning to use regexp.test(string).
				currentSite = twitterSiteSelectors[id];
				if(currentSite["excluding"] instanceof Array){ //#fix it: It is not so good.
					for(i=0; i<currentSite["excluding"].length; i++){
						photoLinkProcessors[currentSite["excluding"][i]].off = true;
					}
				}

				$(document).bind( 'DOMNodeInserted', function ( e ) { 
					$(e.target)
						.showPhoto();
				});
				
				$(document).showPhoto();

				GM_registerMenuCommand( 'Set Mobypictrue developer key.', function(){MobyUtils.inputKey();});
				GM_registerMenuCommand( 'Set Flickr API key.', function(){FlickrUtils.inputKey();});

				GM_addStyle(styleString);
				log("进入 " + id + " ,脚本启动成功。");
				
				return;
				
			}

		}

		log( "进入 " + id + " ,脚本启动失败。");
	
	}

	FlickrUtils = {
		
		apiKeyCache: GM_getValue("flickr.api.key"),
		
		setKey:function(key){
			var that = this;
			window.setTimeout(function(){
				GM_setValue("flickr.api.key",key);
				that.apiKeyCache = key;
			},0);
		},
		
		getKey: function(){
			return this.apiKeyCache;
		},

		inputKey: function(){
			var key;
			if(key = prompt("Enter your flickr API key: \n"
							+ "(Get an API key: http://www.flickr.com/services/api/keys/apply/)",
								this.getKey() || '')){
				this.setKey(key);
				location.reload(true);
			}else{
				alert("You have cancelled entering the flickr API key, so the flickr's photo thumbnails will not be shown on the sites."
				+ "\nIf you want to see the thumbnails via TwitterPhotoShow, you must enter a valid flickr API key later.");
			}
		},
		
		base58_decode: function( snipcode ) {
			if( snipcode == null )return '';
            var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ' ;
            var num = snipcode.length ;
            var decoded = 0 ;
            var multi = 1 ;
            for ( var i = (num-1) ; i >= 0 ; i-- ) {
                decoded = decoded + multi * alphabet.indexOf( snipcode[i] ) ;
                multi = multi * alphabet.length ;
            }
            return decoded;
        },

		rest: function(opts, callback, debug){
			var url = 'http://api.flickr.com/services/rest/',tFormat = '';
			
			opts['format'] = opts['format'] || '';
			if(opts['format'].toLowerCase() != 'json'){
				tFormat = 'xml';
			}else if(debug){
				tFormat = 'text';
			}else{
				tFormat = 'json';
			}

			$.ajax({
				'url': url,
				'data': opts,
				'success': function(d,t){callback(d,t);},
				'dataType': tFormat
			});
		}

	};

	MobyUtils = {
		
		apiKeyCache: GM_getValue("mobypicture.developer.key"),
		
		setKey:function(key){
			var that = this;
			window.setTimeout(function(){
				GM_setValue("mobypicture.developer.key",key);
				that.apiKeyCache = key;
			},0);
		},
		
		getKey: function(){
			return this.apiKeyCache;
		},

		inputKey: function(){
			var key;
			if(key = prompt("Enter your mobypicture developer key: \n"
							+ "(Get a developer key: http://www.mobypicture.com/app)",
								this.getKey() || '')){
				this.setKey(key);
				location.reload(true);
			}else{
				alert("You have cancelled entering the mobypicture developer key, so the mobypicture's photo thumbnails will not be shown on the sites."
				+ "\nIf you want to see the thumbnails via TwitterPhotoShow, you must enter a valid mobypicture developer key later.");
			}
		},
		
		getThumbUrl: function(tinyUrlCode, size, format, callback){
			
			if('function' === typeof size){
				callback = size;
				size = null;
			}

			if('function' === typeof format){
				callback = format;
				format = null;
			}

			size = size || 'small';
			format = format || 'json';

			var url = 'http://api.mobypicture.com/?action=getThumbUrl'
			+ '&t=' + encodeURIComponent(tinyUrlCode)
			+ '&s=' + size
			+ '&k=' + encodeURIComponent(this.getKey())
			+ '&format=' + format;
			
			var tFormat = (format == 'plain')?'text':format;

			$.ajax({
				'url': url,
				'type': 'GET',
				'success': function(data, status){callback(data, status)},
				'dataType': tFormat
			});
			
		}
	};



/////////////////////////////////////////////////
	$.fn.extend({

		//
		showPhoto: function(){

			var $contents = currentSite.getContents(this).not("." + photoShownClassName);
			
			$contents.each(function(i) {
				$(this)
					.parsePhotoStatus()
					.addClass(photoShownClassName);
			});

			if(isFunction(currentSite["patch"])) {
				currentSite["patch"]();
			}

			return $(this);
		},
		
		//photo links
		parsePhotoStatus: function(){
			var $this = $(this);
			var $div = $('<div class="'+photoClassName+'"></div>');

			$this.find("a").each(function(){
				
				var href = $(this).attr("href") || $(this).text();
			
				$.each(photoLinkProcessors, function(i,site){
					if(site.off === true)return;
					
					while((m = site.pattern.exec(href)) != null){
						if(isFunction(site["adding"])) {
							$div.append(site["adding"](m));
						}
					}

				});

			});
			
			if( $div.html() !== '' ){
				$this.append($div);
			}

			return $this;
		},

	});

	$(function(){init();});

})(jQuery.noConflict(true));
