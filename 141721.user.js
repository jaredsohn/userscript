// ==UserScript==
// @name        jc_tumblr
// @namespace   http://localhost/jc/
// @require    http://192.168.10.15/files/jquery-1.7.2.min.js
// @include     http://*.tumblr.com/*
// @downloadURL https://userscripts.org/scripts/source/141721.user.js 
// @updateURL  https://userscripts.org/scripts/source/141721.meta.js
// @grant       GM_addStyle
// @grant       GM_log
// @version     2012.09.14.19h:00m
// ==/UserScript==


// https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js

// click this to remove
GM_addStyle(".jcTumblrClickToRemoveThisArticle {border:1px #aabbcc solid; background-color: #889988; opacity:0.35; cursor:pointer; height:23px; width:85%; }");
GM_addStyle(".jcTumblrClickToRemoveThisArticle .jcTumblrHideClickRemoveArea {text-align:center; min-width:30px; background-color:yellow; border-right:1px solid blue; border-left:1px solid blue; float:right;  }");
GM_addStyle("#restoreRemoveArticle {position:fixed; right:5px; top:80px; cursor:pointer; background-color:yellow; z-index:10; font-size:13px; border:1px solid blue;}");
GM_addStyle("#resizeAvator128B {position:fixed; right:5px; top:100px; cursor:pointer; color:black; background-color:yellow; z-index:10; font-size:13px; border:1px solid blue;}");
GM_addStyle("#resizeAvator128A {position:fixed; right:40px; top:100px; cursor:pointer; color:black; background-color:yellow; z-index:10; font-size:13px; border:1px solid blue;}");
GM_addStyle(".jcTumblrArchiveLink {position:fixed; left:5px; top:25px; font-size: 13px; display:block; height:25px; width:30px; z-index:99997;}");
GM_addStyle("#jcTumblrBtnPageDown {z-index:99998;}");

var jc_tumblr_run_time = new Date();
var jc_tumblr_click_time = new Date();
var jc_tumblr_disable_click_area = false;		// 停止產生 div.jcTumblrClickToRemoveThisArticle

var jc_article_selector_str = 'article,div.post,div.Post,div.item,div.bottom,div.column div.imgdiv';

var jc_tumblr_archive_idx = 0;

var jc_tumblr_archive_flag = 0;

var mouse_over_event_str = "mouseenter";
//var mouse_over_event_str = "mouseover";

$(document).ready(function() {		// 動態載入，也會觸發 document ready 事件

	console.log('document ready event!');
	
	jcTumblrEvents();
	
	// 滑鼠移往連結上，強制觸發 jc_tumblr_main()
	$('a').live(mouse_over_event_str , function() {
		jc_tumblr_main();
	});
	
	$(window).load(function() {
		//console.log('window load event!');
		jc_tumblr_main();
	})
	.on("pageshow", function(event){
		//console.log('window pageshow event!');
		jc_tumblr_main();
	});
	
	jc_tumblr_main();
	
	if (-1 != location.href.indexOf('/archive')) {
		jcTumblrAddAssetsIframe();
	}
	
});

function jcTumblrEvents() {
	//	事件附加區
	//
	
	// 隱藏 移除文章區
	$('.jcTumblrHideClickRemoveArea').live('click' , function(e) {
		$('.jcTumblrClickToRemoveThisArticle').remove();
		$(jc_article_selector_str).removeAttr('data-jc-func-remove');
		jc_tumblr_disable_click_area = true;
		e.stopPropagation();
    e.preventDefault();
	});
	
	// 移除以上的文章
	$('.jcTumblrClickToRemoveThisArticle').live('click' , function(e) {
			jcTumblrRemoveArticle(e);
			e.stopPropagation();
			e.preventDefault();
	});
	

	// Page Scroll Down
	$('html,body').live('click' , function(e) {
			
			if ('' != window.getSelection()) {
				return;
			}
			
			var runnext = true;
			var eTagName = e.target.tagName;
			if ( ('DIV' == eTagName) && ($(e.target).attr('sap-media')) ) {
				runnext = false;
			}
			//console.log('click element == ' + $( e.target ).prop('tagName') );
			if( ('A' == eTagName) || ('LINK' == eTagName) || ( "BLOCKQUOTE" == eTagName) || ("P" == eTagName) || ("TEXTAREA" == eTagName ) || ( "INPUT" == eTagName ) || 
					('BUTTON' == eTagName) || ( "IMG" == eTagName ) || ("EMBED" == eTagName ) || ("OBJECT" == eTagName ) || ( "VIDEO" == eTagName ) ) {
				runnext = false;
			}
			
			/*
			if (runnext) {
				if ( ($(e.target).width() <= 50) || ($(e.target).height() <= 50) ) {
					runnext = false;
				}
			}
			*/
			
			if (runnext) {
				if (0 == $('#jcTumblrBtnPageDown').length) {
					$('body').append('<button type="button" id="jcTumblrBtnPageDown" title="Page Scroll Down">Page Down</button>');
					$('#jcTumblrBtnPageDown').click(function(e) {
							jcTumblrPageScrollDown(e);
							//e.stopPropagation();
							//e.preventDefault();
					});
				}
				
				var x = e.pageX - this.offsetLeft - 45;
				var y = e.pageY - this.offsetTop - $(window).scrollTop() - 10;
				
				if ((x>0) && (y>0)) {
					$('#jcTumblrBtnPageDown').css('position' , 'fixed')
													.css('left' , x + 'px')
													.css('top' , y + 'px');
				}
				//e.stopPropagation();
				//e.preventDefault();
			}
			
	});
	
	

	// 恢復移除文章區
	$('span#restoreRemoveArticle').live('click' , function(e) {
			jc_tumblr_disable_click_area = false;
			jc_tumblr_main();
			e.stopPropagation();
			e.preventDefault();
	});	
	
	// 放大 following avatar icon size
	$('span#resizeAvator128B').live('click' , function(e) {
			resize_avatar(128);
			e.stopPropagation();
			e.preventDefault();
	});
	
	$('span#resizeAvator128A').live('click' , function(e) {
			resize_avatar_V2(128);
			e.stopPropagation();
			e.preventDefault();
	});
	
	
	// 移除文章區 for archive
	$('.jcTumblrRemoveArchive').live('click' , function() {
		var idx3 = parseInt($(this).attr('data-jc-tumblr-archive-idx'));
		$('#content a').each(function() {
			var idx2 = parseInt($(this).attr('data-jc-tumblr-archive-idx'));
			if (idx2 < idx3) {
				$(this).remove();
			}
		});
		$('.jcTumblrRemoveArchive').each(function() {
			var idx2 = parseInt($(this).attr('data-jc-tumblr-archive-idx'));
			if (idx2 < idx3) {
				$(this).remove();
			}
		});
	});
	
	// 移除文章區 for archive V2
	$('.jcTumblrRemoveArchiveV2').live('click' , function() {
		var domThisA = $(this).next().get(0);
		var domThisDiv = this;
		$('#content a').each(function() {
			if (this == domThisA) {
				return false;
			} 
			$(this).remove();
		});
		$('.jcTumblrRemoveArchiveV2').each(function() {
			if (this == domThisDiv) {
				return false;
			} 
			$(this).remove();
		});
	});
	
	// 增加移除文章按鈕 for archive
	if (-1 != location.href.indexOf('/archive'))  {
		$('#content a').live(mouse_over_event_str , function() {
			jcDoTumblrRemoveArchive(this);
		});
		
		$('#content a .overlay,#content a .overlay .inner,#content a .overlay .inner .date,#content a .overlay .inner .notes').live(mouse_over_event_str , function() {
			var domA = $(this).parents('a').get(0);
			jcDoTumblrRemoveArchive(domA);
		});
	}
					
	
}

function jcDoTumblrRemoveArchive(e) {
	// 移除之前的文章 partII for archive

	var time3 = new Date();
	if ((time3 - jc_tumblr_archive_flag) < 500) {
		return;
	}
	
	if (!$(e).attr('data-jc-tumblr-remove-archive-v2')) {
		var obj = $('<div class="jcTumblrRemoveArchiveV2" style="position:absolute; z-index:10000; border:1px solid yellow; cursor:pointer; left:' + $(e).css('left') + '; top:' + $(e).css('top') + ';">R</div>');
			
		$(e).before(obj);
		$(e).attr('data-jc-tumblr-remove-archive-v2',1);
		
		jc_tumblr_archive_flag = new Date();
	}

}

function getJcPos(obj) {
	// 取得位置
	//return obj.position();
	return obj.offset();
}

function jc_tumblr_main() {
	
	if ((-1 != location.href.indexOf('tumblr.com') ) && 
			(-1 == location.href.indexOf('iframe') ) ) {
			
				var time3 = new Date();
				if ((time3 - jc_tumblr_run_time) < 800) {
					return;
				}

				var jc_tumblr_doc_height = $(document).height();
				
				try {
					var host_self = document.domain;
				} catch (e) {
					console.log('EXCEPT 1: ' + e.message);
				}
		
				//////////////////////////////////////////////////////////////////////////
				// 連結前面出現 Host link , 以分辨是否看過了
				$('a[href*="post/"]').each(function() {
				
					if (!$(this).attr('data-jc-func-home')) {
						var url = $(this).attr('href');
						var flags   = '';
						try {
							// ex: http://johnnyadidas.tumblr.com/post/29408915027
							// ex: http://www.freeandhdporn.com/post/29925242163/abby-submissivecuckolds-screencaps-download
							var regex   = new RegExp('(http(s|)://(.*?)\.(tumblr.com)/)(post/)(.*$)' , flags);
							//var regex   = new RegExp('(http(s|)://(.*?)\.([^\/]*?)/)(post/)(.*$)' , flags);
							var matches = regex.exec(url);
						} catch (e) {
							console.log('EXCEPT 2: ' + e.message);
						}
						
						//console.log(matches.toString());
						if ((undefined != matches) && (matches.length > 3) && ('tumblr.com' == matches[4])) {
							var hosth = matches[1];
							var host = matches[3] + '.' + matches[4];
							var post_id = matches[6];
							
							$(this).attr('data-jc-func-home' , 1);
							//console.log( host + ' vs ' + host_self );
							if (host != host_self) {
								// remove pre url , ex: http://tmv.proto.jp/reblog.php?post_url=http://fuckmesenselessly.tumblr.com/
								if (-1 != hosth.indexOf('reblog.php')) {
									hosth = hosth.substr(hosth.indexOf('=')+1)
								}
								var hostArchive = hosth + 'archive';
								$(this).before('<a href="' + hosth + '" target="_blank">█H█</a>&nbsp;<a href="' + hostArchive + '" target="_blank">█A█</a>');
							}
							
						}
					}
					
				});
				
				//////////////////////////////////////////////////////////////////////////
				// 移除之前的文章
				if ( (-1 == location.href.indexOf('/post/')) && (-1 == location.href.indexOf('/archive')) ) {
				
					if (jc_tumblr_disable_click_area == false) {
						
						$(jc_article_selector_str).each(function() {
						
							if (!$(this).attr('data-jc-func-remove')) {
								$(this).attr('data-jc-func-remove' , 1);
								
								$(this).prepend('<div class="jcTumblrClickToRemoveThisArticle">jc Click to remove this and before. <span class="jcTumblrHideClickRemoveArea">-</span></div>');
							}
							
						});
					}
				}
				
				
				
				//////////////////////////////////////////////////////////////////////////
				// 恢復移除文章
				if ($('#restoreRemoveArticle').length == 0) {
					$('body').append('<span id="restoreRemoveArticle" title="恢復移除文章">+</span>');
				}
				
				
				//////////////////////////////////////////////////////////////////////////
				// 連結圖由 ?? 放大至 128 
				if ($('#resizeAvator128B').length == 0) {
					$('body').append('<span id="resizeAvator128A" title="放大 following Icon">128A</span>');
					$('body').append('<span id="resizeAvator128B" title="放大 following Icon">128B</span>');
				}
			
				
				//////////////////////////////////////////////////////////////////////////
				// 將 Page link 放大字型
				$('a[href*="page"]').css({'font-size':'0.6cm' , 'background-color':'yellow' , 'min-width':'50px' , 'min-height':'1cm' , 'margin-top':'20px' , 'display':'inline-block'});
				
				// 左上角多一個 Archive 連結
				if ($('.jcTumblrArchiveLink').length == 0) {
					var url = location.href;
					var flags = '';
					var regex = new RegExp('(http(s|)://((.*?)\.tumblr.com)/)(.*?$)', flags);
					var matches = regex.exec(url);
					
					var account = matches[4];	// ex: getwilder67
					var host = matches[3];		// ex: getwilder67.tumblr.com
					var urlNew = matches[1];	// ex: http://getwilder67.tumblr.com/
					
					$('body').append('<a href="' + urlNew + 'archive' + '" target="_blank" class="jcTumblrArchiveLink" title="archive">█A█</a>');
				}
				
				
				jc_tumblr_run_time = new Date();
				
	}
	
}


function resize_avatar_V2(asize) {
	// 連結圖由 ?? 放大至 asize
	var wxh = asize;
	var avatarCount = $('img[src*="avatar"]').length;
	if (3 >= avatarCount) {
		return;
	}
	
	$('img[src*="avatar"]').each(function() {
			// 'http://25.media.tumblr.com/avatar_1d076a20460c_40.png'
			var url = $(this).attr('src');
			var flags   = '';
			var regex   = new RegExp('(http:\/\/.*?\/)(avatar\_.*?\_)([0-9]+)(\..*$)' , flags);
			var matches = regex.exec(url); // http://25.media.tumblr.com/,avatar_1d076a20460c_,40,.png
			if (undefined != matches) {
				//var w = parseInt(matches[3]);
				//console.log('w = ' + w);
				//if (w <wxh) {
					var new_url = matches[1] + matches[2] + wxh + matches[4];
					$(this).attr('src' , new_url)
							.attr('width' , wxh)
							.attr('height' , wxh)
							.css('margin-bottom' , '7px')
							.width(wxh)
							.height(wxh);
							
					if ($(this).parent().is('a')) {
						$(this).parent().attr('target' , '_blank');
					}
					
					$(this).parents('li').find('span').css('float' , 'none');
					
				//} 
			}
	}); // each
	
	$('li.note').css('border' , '2px dotted gray')
		.css('margin-bottom' , '3px');
		
	$('.note .avatar,.note .avatar-wrap,.note img').css('width' , 'auto')
		.css('height' , 'auto')
		.css('max-width' , 'none')
		.css('max-height' , 'none');
	
}

function resize_avatar(asize) {
	// 連結圖由 40 放大至 asize

	/*
	if (-1 != location.href.indexOf('/post/')) {
		return;
	}
	*/
	
	var wxh = asize;
	var flowing_w = 600;
	
	if (true) {
		
		var avatarCount = $('img[src*="avatar"]').length;
		if (3 >= avatarCount) {
			return;
		}

	
		if ($('#wrapper').width() < 900) {
			$('#wrapper').width(1300);
			$('#sidebar').css('width' , flowing_w + 'px');
		}
		if ($('#main').width() < 900) {
			$('#main').css('width' , '1300px');
			$('#sidebar').css('width' , flowing_w + 'px');
		}
		
		if ($('#following-avatars').width() < 260) {
			$('#following-avatars').width(flowing_w);
		}
		
		$('#sidebar').css('min-width' , flowing_w + 'px')
			.css({"position":"absolute" , "right":"80px" , "top":"150px"});
			
		var tmp = $('#sidebar').parent();
		var tmpLoop = 0;
		//console.log('tmpLoop == ' + tmpLoop + '  ,  tmp length : ' + (tmp.length) );
		
		// 將 #sidebar 之上的 position 都設成 static , 否則 #sidebar's position == absolute 會受到影響.
		while ((tmp != undefined) && (tmp.length > 0)) {
			//console.log('tmpLoop == ' + tmpLoop + '  ,  tmp tagName == ' + tmp.get(0).tagName);
			var tag = tmp.get(0).tagName;
			if ((tag == 'BODY') || (tag=='HTML') ) {
				break;
			}
			var tmpPosition = tmp.css('position');
			if (!(('' == tmpPosition) || (undefined == tmpPosition) || ('static' == tmpPosition))) {
				tmp.css('position' , 'static');
			}
			tmp = tmp.parent();
			tmpLoop++;
			if (tmpLoop > 10) {
				break;
			}
		} // while
		
		
		$('img[src*="avatar"]').eq(1).parents('div:first').width(flowing_w);
		$('img[src*="avatar"]').parents('li').width(wxh).height(wxh);
		
		$('img[src*="avatar"]').each(function() {
		
			// 'http://25.media.tumblr.com/avatar_1d076a20460c_40.png'
			var url = $(this).attr('src');
			var flags   = '';
			var regex   = new RegExp('(http:\/\/.*?\/)(avatar\_.*?\_)([0-9]+)(\..*$)' , flags);
			var matches = regex.exec(url); // http://25.media.tumblr.com/,avatar_1d076a20460c_,40,.png
			if (undefined != matches) {
				var w = parseInt(matches[3]);
				
				//console.log('w = ' + w);
				if (w <wxh) {
					var new_url = matches[1] + matches[2] + wxh + matches[4];
					$(this).attr('src' , new_url)
							.attr('width' , wxh)
							.attr('height' , wxh)
							.css('margin-bottom' , '7px')
							.width(wxh)
							.height(wxh);
							
					if ($(this).parent().is('a')) {
						$(this).parent().attr('target' , '_blank');
					}
					
				} 
			}
			
		}); // each
	
	
		
	}
}


function jcTumblrRemoveArticle(e) {
	// 移除以上的文章
	var time2 = new Date();
	if ((time2 - jc_tumblr_click_time) > 500) {
	
		var this_top = parseInt(getJcPos($(this)).top) - 30;
		var has_column = ($(this).parents('.column').length > 0);
		if (has_column) {
			var idx = $(this).parents(jc_article_selector_str).index();
			//console.log('has column , idx = ' + idx);
		} else {
			var idx = $("div.jcTumblrClickToRemoveThisArticle").index(this);
			//console.log('without column , idx = ' + idx);
		}
		
		if (idx >= 0) {
			//var len = $('div.jcTumblrClickToRemoveThisArticle').slice(0,idx).length;
			//console.log('idx = ' + idx + ' , len = ' + len);
			if (has_column) {
				
				var tmp_arr = [];
				$(jc_article_selector_str).each(function() {
					var this_top2 = getJcPos($(this)).top;
					//console.log( this_top + ' : ' + this_top2);
					if (this_top2 <= this_top) {
						//$(this).remove();
						tmp_arr.push(this);
					} else {
					}
					
				});
				
				for (var tmpi in tmp_arr) {
					$(tmp_arr[tmpi]).remove();
				} // for
				
			} else {
				$('div.jcTumblrClickToRemoveThisArticle').slice(0,idx).remove();
				$(jc_article_selector_str).slice(0,idx).remove();
			}
			
			$(window).scrollTop(0);
		}
		jc_tumblr_click_time = new Date();
		
	}
}

function getJcPos(obj) {
	// 取得位置
	//return obj.position();
	return obj.offset();
}

function jcTumblrGetNextScrollTop() {
	// 取得下一個 scroll down 
	//	如果有 jcTumblrClickToRemoveThisArticle ，則以其為準
	//	沒有則下捲 doc_top + win_h - 180
	var docTop = $(window).scrollTop();	// document scroll top
	var winH = $(window).height();				// window hieght
	var liTop = 0;
	
	//GM_log('len = ' + $('.jcTumblrClickToRemoveThisArticle').length);
	$('.jcTumblrClickToRemoveThisArticle').each(function() {
			//liTop = getJcPos($(this)).top - 40;
			liTop = getJcPos($(this)).top;
			
      if (liTop > (docTop + 110)) {
				$(window).scrollTop(liTop);
				//GM_log('1.scroll top to : ' + liTop);
        return false;
			}
	});
	
	// 如果沒有 .jcTumblrClickToRemoveThisArticle Class 存在，則下捲 (docTop + winH - 180)
	var docTop2 = $(window).scrollTop();
  if (docTop2 == docTop) {
		liTop = docTop + winH - 180;
		$(window).scrollTop(liTop);
		//GM_log('2.scroll top to : ' + liTop);
	}
	
	liTop = null;
	docTop2 = null;
	docTop = null;
	winH = null;
	
}


var jc_in_remove_dupe_image = false;	// 正在移除重複的圖中...

function jcTumblrPageScrollDown(e) {
	// Scroll Page Down
	
	var time2 = new Date();
	if ((time2 - jc_tumblr_click_time) > 350) {
		// 下一頁
		jcTumblrGetNextScrollTop();
		
		$('.jcTumblrArchiveLink').text( $('*').length );
		
		jc_tumblr_click_time = new Date();
		
		// 移除重複的圖
		if (false == jc_in_remove_dupe_image) {
			jc_in_remove_dupe_image = true;
			window.setTimeout(function() {
				$('img[src*="media.tumblr.com"]').each(function() {
					var img_src = $(this).attr('src');
					if (-1 == img_src.indexOf('avatar')) {
						var len = $('img[src="' + img_src + '"]').length;
						if (len > 1) {
							$('img[src="' + img_src + '"]').slice(1,len).remove();
						}
					}
				});
				jc_in_remove_dupe_image = false;
			} , 3000);
		}
		
	}


}


function jcTumblrAddAssetsIframe() {
	// http://assets.tumblr.com/iframe.html?10&src=http%3A%2F%2Fgetwilder67.tumblr.com%2F&lang=en_US&name=getwilder67
	//
	var url1 = 'http://assets.tumblr.com/iframe.html?10&src=';
	var url2 = '&lang=en_US&name=';

	//var url = 'http://getwilder67.tumblr.com/archive';
	var url = location.href;

	var flags = '';
	var regex = new RegExp('(http(s|)://((.*?)\.tumblr.com)/)(.*?$)', flags);
	var matches = regex.exec(url);
	
	var account = matches[4];	// ex: getwilder67
	var host = matches[3];		// ex: getwilder67.tumblr.com
	var urlNew = matches[1];	// ex: http://getwilder67.tumblr.com/
	
	var assetsLink = url1 + encodeURIComponent(urlNew) + url2 + encodeURIComponent(account);
	
	$('body').append('<iframe width="330" scrolling="no" height="25" frameborder="0" id="tumblr_controls" style="position:absolute; z-index:1337; top:0px; right:0px; border:0px; background-color:transparent; overflow:hidden;" src="' + assetsLink + '"></iframe>');
	
}


