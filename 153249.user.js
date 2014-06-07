// ==UserScript==
// @name        jc_Load_Next_Page
// @namespace   http://localhost/jc/
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.min.js
// @include     http://www.piring.com/bbs/tcn/forumdisplay*
// @include     http://www.biquge.com/*/*.html
// @include     http://www.ranwen.net/files/article/*.html
// @include     http://*/Html/Book/*/*/*.html
// @exclude     http://www.8jzw.com/*
// @grant       GM_addStyle
// @grant       GM_log
// @version     2013.08.03.00h:00m
// ==/UserScript==


jQuery.noConflict();
(function($) {
	$(function() {


GM_addStyle(".jcLoadNextPageMark {position:fixed; bottom:3px; right:20px; border:1px solid black; color:white; background-color:green; padding:5px; padding-left:35px; padding-right:35px; font-size:12px; width:auto; z-index:10000; }");
GM_addStyle(".jcLoadNextPageNumLine {background-color:#4CC3FF; width:auto; margin-left:auto; margin-right:auto; font-size:0.6cm; line-height:150%; }");
GM_addStyle(".jcLoadNextPageNumLine a {border-radius:8px; border:3px double #556677; padding:5px; width:120px; background-color:#7711aa; }");
GM_addStyle(".jcLoadNextPageClear {display:block; width:80%; height:1cm; margin-left:auto; margin-right:auto; }" );

var jcLoadNextPageNum = 2;	// 第幾頁
var jcLoadNextPageLoading = false;
var jcLoadNextPageLastLoadTime = new Date();	// 上次載入時間

$(document).ready(function() {

	if (1 != window.sessionStorage["flag1_" + location.href]) {
		window.sessionStorage["flag1_" + location.href] = 1;
		
		$('body').append('<span class="jcLoadNextPageMark" style="display:none;"><strong>jc Load Next Page...</strong></span>');

		if (0 == $('#jcLoadNextPageFlag1').length) {
			$('body').append('<div id="jcLoadNextPageFlag1"></div>');

			window.setInterval(function() {
			//window.setTimeout(function() {
				
				// ...載入下一頁
				var docTop = parseInt($(window).scrollTop() , 10);
				var docH = parseInt($(document).height() , 10);
				var winH = parseInt($(window).height() , 10);
				var aPageHeight = parseInt(Math.max($(window).height() , $(window).width()))*2;
				if ((docH - docTop - winH) <= aPageHeight) {
					jcGetNextLinkContent();
				}
				
			} , 8000);
			
			//jcGetNextLinkContent();
			
		}
		
		window.sessionStorage["flag1_" + location.href] = 0;
	}
	
});

function getJcPos(obj) {
	// 取得位置
	return obj.position();
	//return obj.offset();
}

function jcGetNextLinkContent() {
	//
	// Get Next Link's Content
	//
	
	
	if (jcLoadNextPageLoading) {	// is Loading , so return
		return false;
	}
	
	
	var strNextLinks = 'a.next';		// Next Link
	if (location.href.indexOf('piring.com') != -1) {
		// 如果是 piring.com , 則將 strNextLinks 改成...
		strNextLinks = 'a.next';
	}
	var nextLinks = $(strNextLinks);	// 下一頁連結
	
	
	if (nextLinks.length == 0) {
		nextLinks = $('a').filter(function(index) { 
			return ( ($(this).text() == "下一页") || ($(this).text() == "下一頁") || ($(this).text() == "下一章") || ($(this).text().indexOf("下一章")>=0) );
		});
	}
	
	if (nextLinks.length > 0) {
		var nextUrl = '';
		nextLinks.each(function() {
			if (!$(this).attr('jcOldPage')) {
				nextUrl = $(this).attr('href');
				$(this).attr('jcOldPage' , true);
			}
		});
		
		if ('' != nextUrl) {
			$('body').append('<div id="divNextContainer"></div>');
			//alert('Load : ' + nextUrl);
			var charset = document.characterSet;
			if ('' == charset) {
				charset = 'UTF-8';
			}
			$.ajaxSetup({
					'beforeSend' : function(xhr) {
							xhr.overrideMimeType('text/html; charset=' + charset);
					},
			});
			$('.jcLoadNextPageMark').show();
			//$('#divNextContainer').load(nextUrl + ' body' , function(response, status, xhr) {
			jcLoadNextPageLoading = true;
			jcLoadNextPageLastLoadTime = new Date();
			$.get(nextUrl , function(response, status, xhr) {
			
					if ('success' == status) {
						var contentAreas = 'body';		// 要插入的內容區域
						if (location.href.indexOf('piring.com') != -1) {
							// 如果是 piring.com , 則將 contentAreas 改成...
							contentAreas = '.mainbox,.pages_btns,#optiontypes';
						} else if (location.href.indexOf('ranwen.net') != -1) {
							// 如果是 ... , 則將 contentAreas 改成...
							contentAreas = 'h1,#content,td.link_14';
						} else if (location.href.indexOf('biquge.com') != -1) {
							// 如果是 ... , 則將 contentAreas 改成...
							contentAreas = '#box_con';
						}
				
						var nowScrollTop = $(window).scrollTop();
						$('#divNextContainer').html('');
						$('#divNextContainer').append( '<div align="center" class="jcLoadNextPageClear">&nbsp;</div>' );		// 空白
						$('#divNextContainer').append( '<div align="center" class="jcLoadNextPageNumLine">----- <a href="' + nextUrl + '">Page ' + jcLoadNextPageNum + ' START</a> -----</div>' );		// 第幾頁 START
						
						//alert($().jquery);
						//alert(contentAreas);
						//alert($(response).find(contentAreas).length);
						//alert(response);
						GM_log('jcLoadNextPage: contentAreas = ' + contentAreas + ' , find count = ' + $(response).find(contentAreas).length);
						
						if ('' == contentAreas) {
							$('#divNextContainer').append( response );		// 插入內容
						} else {
							if (0 == $(response).find(contentAreas).length) {
								contentAreas = '*';
							}
							$('#divNextContainer').append( $(response).find(contentAreas) );		// 插入內容
						}
						//$('#divNextContainer').append( '<div align="center" class="jcLoadNextPageNumLine">----- <a href="' + nextUrl + '">Page ' + jcLoadNextPageNum + ' END</a> -----</div>' );		// 第幾頁 END
						//var divTop = getJcPos($('#divNextContainer')).top;
						$(window).scrollTop( nowScrollTop );
						$('#divNextContainer').removeAttr('id');
						//alert(response);
						
						if (location.href.indexOf('piring.com') != -1) {
							// 如果是 piring.com , 則執行 script...
							ext_script_piring();
						} else if (location.href.indexOf('biquge.com') != -1) {
							// 如果是 ... , 則執行 script...
							ext_script_biquge();
						} 
						
						$('.jcLoadNextPageMark').hide();
						jcLoadNextPageNum++;
						jcLoadNextPageLoading = false;
					}
					
			});
			
			
		}
	}
}

function ext_script_biquge() {
	// site biquge.com only script
	(function() {
		//alert('test');
		$('img[src*="img.biquge"]').each(function() {
				var url1 = $(this).attr('src');
				var url2 = url1.replace("img.biquge.","pic.biquge.");
				if (url2 != url1) {
					$(this).attr('src' , url2);
				}
				url2 = null;
				url1 = null;
		});
	}).call(this);
}


function ext_script_piring() {
	// site piring.com only script
	var count = document.links.length;

	var re_w1 = new RegExp('(http(.*?)thread(.*?)\.htm(l|)$)', "g");
	var re_w2 = new RegExp('((http(.*?)(view|show)thread\.php.(tid|t)=[^>]*?)(\&(.*?)$|$))', "g");
	var mat = new RegExp('(^<img(.*?)gif\"([^>]*?)>$)', "g");
	var mat2 = new RegExp('(.{3,200})', "g");
	var tt2 = '$2';

	// http://www.akiba-online.com/forum/showthread.php?t=6761
	// http://www.tw-p2p.com/D-C-P2P/thread-617433-1-1.html
	// http://www.eyny.com/thread-1650531-1-5.html
	// http://www.piring.com/bbs/tcn/viewthread.php?tid=509227&highlight=%2Blaingg

	for (i = 0; i < count; i++) {
		var link = document.links.item(i);
		var ihtml = link.innerHTML;
		var href = link.href;
		var txt = link.innerText;

		
		if (link.href.match(re_w1) || link.href.match(re_w2)) {
			//GM_log(link.innerHTML);
			if (!ihtml.match(mat)) {
				if (ihtml.match(mat2)) {
					link.href = link.href.replace(re_w2, tt2);
					
					
					//alert(href);
					link.href = link.href.replace(/((http.*?thread\-\d+\-\d+)\-(\d+)(\.htm(l|)$))/g, "$2-1$4");	
					
					// http://www.spring4u.info/viewthread.php?tid=19798&extra=page%3D3%26filter%3D0%26orderby%3Ddateline
					link.href = link.href.replace(/page%3D\d+%26/g, "page=1&");
					
					// http://www.soumo.info/viewthread.php?tid=748&extra=page%3D2
					link.href = link.href.replace(/page%3D\d+/g, "page=1");
					
					// http://twavtv.com/viewthread.php?tid=708&extra=page=1
					link.href = link.href.replace(/&entry=\d+/g, "");
					link.href = link.href.replace(/%26entry%3D\d+/g, "");
					link.href = link.href.replace(/&extra=page.\d+/g, "");
					
					// http://www.jkforum.net/viewthread.php?tid=637375%26amp%3Borderby%3Ddateline
					link.href = link.href.replace(/%26amp%3Borderby%3Ddateline/g, "");
					http://www.jkforum.net/viewthread.php?tid=1058092&highlight=%AE%5D%AA%E5%AA%E5
					link.href = link.href.replace(/&highlight=.*?&/g, "&");
					link.href = link.href.replace(/&highlight=.*?$/g, "");
					
					link.href = link.href.replace(/(.*?viewthread.php\?tid=\d+).*$/g , "$1");
										
					
					if ( (txt) && (txt.length > 3) && (!txt.match(/\(o6\)/)) ) {
						link.innerHTML = link.innerHTML + ' [URL2]';
					}
					link.target = '_blank';
				}
			}
		}
	}

}





});
})(jQuery);
