// ==UserScript==
// @id             google_hover_zoom
// @name           Google+ Hover Zoom
// @description    Enlarge thumbnails & profile icons on mouse hover. Display pictures in comments directly.
// @author         AinSarange
// @website        http://tutorialgoogleplus.blogspot.com/
// @version        1.0.9.2
// @include        https://profiles.google.com/u/0/107562475880185062545
// ==/UserScript==

// CSS
GM_addStyle(
'#hoverzoom {position: fixed; padding: 5px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); z-index: 10002; height: auto; width: auto; top: 15px; display: none; min-width: 40px; min-height: 40px; background: #fff no-repeat center center url(https://lh6.googleusercontent.com/-jsVBH41t1_I/ThrqDM0Lq6I/AAAAAAAAAlo/rMdhmf-QV9E/ajax-loader.gif);}'+
'#hoverzoom small {display: block; text-align: center; line-height: 1; margin: 3px 0 2px;}'+
'#hoverzoom img {display: none;}'+
'#picbefore {position: fixed; width: 45px; height: 45px; box-shadow: 0 0 5px #666; right: 0; top: 40%; display: none; background: #2d2d2d no-repeat url(https://lh5.googleusercontent.com/-nq3Nv6EYb0M/ThylQUyr8PI/AAAAAAAAAmc/CFCkL7RXYTk/s800/document_image_down_32.png); background-position: 7px 7px; -moz-transition: width 0.2s; -webkit-transition: width 0.2s; border-radius: 10px 0 0 10px; outline: none;}'+
'#picbefore:hover {width: 50px; -moz-transition: width 0.2s; -webkit-transition: width 0.2s;}'+
'#hz_set_back {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.75); z-index: 10000; display: none;}'+
'.hz_settings {position: fixed; width: 550px; height: auto; top: 50%; left: 50%; margin-left: -285px; margin-top: -180px; background: #fff; border:1px solid #acacac; border-bottom: 1px solid #999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); z-index: 10001; padding: 10px; display: none;}'+
'.hz_settings input[type="text"] {border: 1px solid #d9d9d9; padding: 2px 5px; margin-right: 5px; width: 50px;}'+
'.hz_settings input[type="checkbox"] {margin: 0 5px 0 0;}'+
'.hz_settings label {line-height: 2; margin-right: 5px; display: inline-block; min-width: 120px;}'+
'#hz_set_save, #hz_set_cancel, #hz_his_clear, #hz_his_max_out {float: right; margin: 0 0 0 10px;}'+
'#hz_history {display: block;}'+
'#hz_his_max_out label {min-width: 0;}'+
'#hz_history_out {display: block; overflow-x: hidden; overflow-y: auto; margin-bottom: 10px;}'+
'#hz_history img {height: 150px;}'+
'#hoverzoom_fs {position: absolute; z-index: 10001; display: none; box-shadow: 0 4px 16px rgba(0,0,0,0.2);}'+
'#hoverzoom_info {position: fixed; top: 0; left: 0; width: 100%; height: auto; display: none; z-index: 10002;}'+
'#hoverzoom_info span {background: rgba(0,0,0,0.75); color: #fff; padding: 5px 10px; float: right; margin-left: 2px; cursor: pointer; position: relative;}'+
'#hoverzoom_info .right {position: absolute; top: 0; right: 0;}'+
'#hoverzoom_info a {color: #fff; outline: none;}'+
'#hoverzoom_info ul {display: block; right: 0; top: 0; list-style: none; position: absolute; padding: 0; white-space: nowrap; opacity: 0;}'+
'#hoverzoom_info li {margin-bottom: 2px; background: rgba(0,0,0,0.75); padding: 5px 10px 5px 10px;}'+
'#hoverzoom_info li:hover {background: #000;}'+
'#hoverzoom_info li.current {font-weight: bold;}'+
'.clearfix:after {content: "."; display: block; height: 0; clear: both; visibility: hidden;}'+
'.clearfix {display: inline-block;}'+
'* html .clearfix {height: 1%;}'+
'.clearfix {display: block;}'+
'.img-in-post {max-width: 100%; height: auto; margin: 3px 0; display: block;}'
);

function main(){
	// jQuery atteeeeention
	$.fn.atteeeeention=function(a){return this.each(function(){var k=$.extend({margin:12,hideLastRow:false},a),l=$(this),f=l.find("img"),e=k.margin,c=f.length,g=0,m=l.innerWidth(),n,h=[],d=0,b=1000,o=0,i=0,j=function(){var s=m-(d-n)+e,q=Math.floor(s/o),t=s-(q*o),r=0;$.each(h,function(w,x){var v=$(f[i]),u=v.parent();r=x+q;u.height(b);if(o===(w+1)){u.css("margin-right",0);v.width(r+t);}else{v.width(r);}i++;});},p=function(){var r=0,q=o;if(k.hideLastRow===true){for(;r<q;r++){$(f[i]).parent().hide();i++;}}else{for(;r<q;r++){$(f[i]).parent().height(b);i++;}}};l.addClass("clearfix");f.css({border:0,margin:0,padding:0}).parent().css({"float":"left",display:"inline","margin-top":0,"margin-right":e,"margin-bottom":e,"margin-left":0,overflow:"hidden","vertical-align":"top"});f.each(function(){var q=$(this),r=q.attr("src");q.attr("src","").load(function(){g++;if(g===c){f.each(function(u){var t=$(this),s=t.width(),v=t.height();n=s+e;d=d+n;if(v<b){b=v;}if(d>m){j();d=n;b=v;h=[s];o=1;}else{h.push(s);o++;}if((c-1)===u){p();}});}}).attr("src",r);});});};
	
	var $window = $(window),
		$content = $('#content'),
		wWidth = $window.width(),
		wHeight = $window.height();
	
	$content.append('<div id="hoverzoom"></div>');
	var $zoom = $('#hoverzoom');
	
	// Localization
	var locale = navigator.language,
		locale_db_1 = 'Download the picture hovered',
		locale_menu_1 = 'Disable Hover Zoom',
		locale_menu_2 = 'Enabele Hover Zoom',
		locale_fs_1 = 'Press full screen mode trigger or click here to exit fullscreen mode.',
		locale_fs_2 = 'Exit fullscreen',
		locale_fs_3 = 'Download',
		locale_fs_4 = 'Loading…',
		locale_fs_5 = 'View as',
		locale_fs_6 = 'Page Width',
		locale_fs_7 = 'Actual Size (100%)',
		locale_set_title = 'Hover Zoom Settings',
		locale_set_save = 'Save & Reload page',
		locale_set_history = 'Hover Zoom History',
		locale_set_clear = 'Clear',
		locale_set_close = 'Close',
		locale_set_1_1 = 'Delay:',
		locale_set_1_2 = 'ms',
		locale_set_2 = 'Opacity:',
		locale_set_3_1 = 'Max Width:',
		locale_set_3_2 = 'px (0: Unlimited)',
		locale_set_4 = 'Enable Download Button',
		locale_set_5 = 'Enable History',
		locale_set_6_1 = 'Max Records:',
		locale_set_6_2 = '(0: Unlimited)',
		locale_set_7_1 = 'Trigger:',
		locale_set_7_2 = 'None',
		locale_set_8 = 'Show Picture Links in Comments Directly, Max Width:',
		locale_set_9 = 'Show Resolution',
		locale_set_10 = 'Full Screen Mode:',
		locale_set_11 = 'Download Shortcut:',
		locale_set_12 = 'Show picture after loaded completely.';
	
	switch (locale)
	{
		case 'zh-TW':
		case 'zh-HK':
			locale_db_1 = '下載圖片',
			locale_menu_1 = '停用 Hover Zoom',
			locale_menu_2 = '啟用 Hover Zoom',
			locale_fs_1 = '輕按全螢幕觸發鍵，或點擊此處離開全螢幕模式。',
			locale_fs_2 = '離開全螢幕',
			locale_fs_3 = '下載',
			locale_fs_4 = '載入中...',
			locale_fs_5 = '顯示方式',
			locale_fs_6 = '符合頁面寬度',
			locale_fs_7 = '實際大小 (100%)',
			locale_set_title = 'Hover Zoom 設定',
			locale_set_save = '儲存並重載頁面',
			locale_set_history = 'Hover Zoom 記錄',
			locale_set_clear = '清除',
			locale_set_close = '關閉',
			locale_set_1_1 = '延遲：',
			locale_set_1_2 = '毫秒 (ms)',
			locale_set_2 = '透明度：',
			locale_set_3_1 = '最大寬度：',
			locale_set_3_2 = 'px (0：無限制)',
			locale_set_4 = '啟用下載按鈕',
			locale_set_5 = '啟用記錄',
			locale_set_6_1 = '最大記錄數：',
			locale_set_6_2 = '(0: 無限制)',
			locale_set_7_1 = '觸發鍵：',
			locale_set_7_2 = '無',
			locale_set_8 = '直接顯示留言內的圖片連結，最大寬度：',
			locale_set_9 = '顯示圖片解析度',
			locale_set_10 = '全螢幕模式：',
			locale_set_11 = '下載快捷鍵：',
			locale_set_12 = '完全載入後再顯示圖片';
			break;
		
		case 'zh-CN':
			locale_db_1 = '下载图片',
			locale_menu_1 = '停用 Hover Zoom',
			locale_menu_2 = '启用 Hover Zoom',
			locale_fs_1 = '轻按全屏触发键，或点击此处离开全屏模式。',
			locale_fs_2 = '离开全屏模式',
			locale_fs_3 = '下载',
			locale_fs_4 = '加载中...',
			locale_fs_5 = '显示方式',
			locale_fs_6 = '符合页面宽度',
			locale_fs_7 = '实际大小 (100%)',
			locale_set_title = 'Hover Zoom 设定',
			locale_set_save = '储存并重载页面',
			locale_set_history = 'Hover Zoom 记录',
			locale_set_clear = '清除',
			locale_set_close = '关闭',
			locale_set_1_1 = '延迟：',
			locale_set_1_2 = '毫秒 (ms)',
			locale_set_2 = '透明度：',
			locale_set_3_1 = '最大宽度：',
			locale_set_3_2 = 'px (0：无限制)',
			locale_set_4 = '启用下载按钮',
			locale_set_5 = '启用记录',
			locale_set_6_1 = '最大记录数：',
			locale_set_6_2 = '(0: 无限制)',
			locale_set_7_1 = '触发键：',
			locale_set_7_2 = '无',
			locale_set_8 = '直接显示评论内的图片连结，最大宽度：',
			locale_set_9 = '显示图片分辨率',
			locale_set_10 = '全屏模式',
			locale_set_11 = '下载快捷键：',
			locale_set_12 = '完全载入后再显示图片';
			break;
	}
	
	// Load settings
	var options = {
		'hz_delay': parseInt(localStorage['hz_delay']) || 500,
		'hz_opacity': parseInt(localStorage['hz_opacity']) || 100,
		'hz_maxwidth': parseInt(localStorage['hz_maxwidth']) || 0,
		'hz_download': localStorage['hz_download'] || 'false',
		'hz_his': localStorage['hz_his'] || 'false',
		'hz_his_max': parseInt(localStorage['hz_his_max']) || 100,
		'hz_trigger': parseInt(localStorage['hz_trigger']) || 0,
		'hz_direct': localStorage['hz_direct'] || 'true',
		'hz_direct_max': parseInt(localStorage['hz_direct_max']) || 0,
		'hz_resolution': localStorage['hz_resolution'] || 'false',
		'hz_fullscreen': parseInt(localStorage['hz_fullscreen']) || 0,
		'hz_dl_key': parseInt(localStorage['hz_dl_key']) || 0,
		'hz_complete': localStorage['hz_complete'] || 'true'
	};
	
	// Bind function
	enable();
	if ( options['hz_direct'] === 'true' )
		directPic();	
	
	$zoom.css('opacity', options['hz_opacity'] / 100);
	
	if ( options['hz_download'] === 'true' )
		$content.append('<a id="picbefore" title="'+locale_db_1+'"></a>');
		
	if ( options['hz_fullscreen'] > 0 )
		$content.append('<div id="hoverzoom_info"><div class="right"><span title="'+locale_fs_1+'" id="hoverzoom_fs_exit">'+locale_fs_2+'</span><span><a href="" target="_blank">'+locale_fs_3+'</a></span><span>'+locale_fs_5+'<div class="d-s-r"><div class="FI"></div></div><ul><li id="hoverzoom_fs_01" class="current">'+locale_fs_6+'</li><li id="hoverzoom_fs_02">'+locale_fs_7+'</li></ul></span><span></span></div></div>');
	
	function showImg(){
		url = $(this).attr('src');
		
		url = ( url.match(/\?sz|\/proxy/) ) ? $(this).attr('src').replace(/(.*)url=|&(.*)|\?sz=\d{2,3}/g, '') : $(this).attr('src').replace(/\/\w\d+(-\w\d*)*\/([^\/]+)$/,'/s0/$2');
		
		if ( url.match(/ytimg/) == null )
			trigger($(this));
	}
	
	function showLink(){
		url = $(this).attr('href');
		
		if ( url.match(/jpg|png|tiff|gif|jpeg|bmp/i) )
			trigger($(this));
	}
	
	function trigger(object){
		if ( options['hz_trigger'] > 0 ) {
			$(document).keydown(function(e){
				var code = e.keyCode || e.which;
				if ( code == options['hz_trigger'] )
					main(object);
			});
			
		} else {
			main(object);
		}
	}
	
	function main(object){
		var timer1;
		clearTimeout(timer1);
		timer1 = setTimeout(function(){
			$(document).unbind('keydown');
			$zoom.html('<img src="'+url+'" />');
			$zoom.fadeIn(300);
			object.mousemove(function(e){
				resize(e);
			});
			$('#picbefore').attr('href', url).show();
			var img = document.getElementById('hoverzoom').firstChild;
			
			if ( options['hz_complete'] === 'false' )
				img.style.display = 'block';
			
			img.addEventListener('load', function(){
				var nWidth = this.naturalWidth,
					nHeight = this.naturalHeight;
				
				if ( options['hz_resolution'] === 'true' ) {
					$zoom.children('small').remove();
					$zoom.append('<small>'+nWidth+' x '+nHeight+'</small>');
				}
				
				if ( nWidth != 0 || nHeight != 0) {
					if ( options['hz_complete'] === 'true' )
						this.style.display = 'block';
					
					if ( options['hz_his'] === 'true' && url != $('#hz_history').children().eq(0).attr('href') ) {
						var time = new Date(),
							month = time.getMonth() + 1,
							day = time.getDate(),
							hour = time.getHours(),
							minute = time.getMinutes(),
							second = time.getSeconds();
							if ( minute < 10 ) minute = '0' + minute;
							if ( second < 10 ) second = '0' + second;
						$('#hz_history').prepend('<a href="'+url+'" target="_blank" title="'+month+'/'+day+' '+hour+':'+minute+':'+second+'"><img src="'+url+'" /></a>');
						if ( $('#hz_history').children().length > options['hz_his_max'] && options['hz_his_max'] > 0 )
							$('#hz_history').children().eq(options['hz_his_max']).remove();
					}
				}
				
				if ( options['hz_fullscreen'] > 0 ) {
					$(document).bind('keydown', function(e){
						var code = e.keyCode || e.which;
						if ( code == options['hz_fullscreen'] )
							fullscreen(url, nWidth, nHeight);
					});
				}
				
				if ( options['hz_dl_key'] > 0 ) {
					$(document).bind('keydown', function(e){
						var code = e.keyCode || e.which;
						if ( code == options['hz_dl_key'] ) {
							open(url, 'imageWin');
						}
					});
				}
			}, false);
		}, options['hz_delay']);
	}
	
	function fullscreen(url, width, height){
		$(document).unbind('keydown');
		$(document).bind('keydown', function(e){
			var code = e.keyCode || e.which;
			if ( code == options['hz_fullscreen'] ) {
				fs_remove();
			}
			if ( code == options['hz_dl_key'] ) {
				open(url);
			}
		});
		
		$zoom.hide();
		$('#hoverzoom_fs').remove();
		$content.append('<img id="hoverzoom_fs" src="'+url+'"/>');
		
		$img = $('#hoverzoom_fs');
		
		var xScroll = $(window).scrollTop();
		
		$('#hoverzoom_info .right span:eq(3)').text(locale_fs_4);
		
		$img.bind('load', pageWidth);
		
		$('#hoverzoom_fs_01').click(function(){
			$img.unbind('load');
			$img.bind('load', pageWidth);
		});
		
		$('#hoverzoom_fs_02').click(function(){
			$img.unbind('load');
			$img.bind('load', actualSize);
		});
		
		$('#hoverzoom_info .right span:eq(2)').hover(function(){
			$(this).children('ul').stop().animate({top: 14, opacity: 1}, 300);
		}, function(){
			$(this).children('ul').stop().animate({top: 0, opacity: 0}, 300);
		});
		
		function pageWidth(){
			$img.attr('src', url).css('maxHeight', wHeight - 20).css('maxWidth', wWidth - 20);
			$img.offset({'top': xScroll + wHeight / 2 - $img.height() / 2, 'left': wWidth / 2 - $img.width() / 2});
			$img.fadeIn(300);
			$('#hoverzoom_fs_02').removeClass('current');
			$('#hoverzoom_fs_01').addClass('current');
			$('#hoverzoom_info .right span:eq(3)').text(width+' x '+height + ' ('+parseInt($img.width()/width*100)+'%)');
		}
		
		function actualSize(){
			$img.attr('src', url).css('maxHeight', height).css('maxWidth', width);
			
			if ( width > wWidth - 20 && height > wHeight - 20 ) {
				$img.offset({'top': xScroll, 'left': 0});
			} else {
				if ( width > wWidth - 20 )
					$img.offset('left', 0);
				if ( height > wHeight - 20 )
					$img.offset({'top': xScroll, 'left': wWidth / 2 - $img.width() / 2});
			}
			
			$img.fadeIn(300);
			$('#hoverzoom_fs_01').removeClass('current');
			$('#hoverzoom_fs_02').addClass('current');
			$('#hoverzoom_info .right span:eq(3)').text(width+' x '+height + ' (100%)');
		}
		
		$('#hoverzoom_info .right span:eq(1) a').attr('href', url);
			
		$('#hz_set_back, #hoverzoom_info').fadeIn(300);
		
		$('#hz_set_back, #hoverzoom_fs_exit').click(fs_remove);
		
		function fs_remove(){
			$('#hz_set_back, #hoverzoom_info, #hoverzoom_fs').fadeOut(300);
			$img.remove();
			$(document).unbind('keydown');
			$(window).scrollTop(xScroll);
		}
	}
	
	function hidePic(){
		var timer2;
		clearTimeout(timer2);
		timer2 = setTimeout(function(){
			$zoom.hide().empty();
		}, 100);
		
		return false;
	}
	
	function resize(e){
		$zoom.offset({'top': e.pageY + 20, 'left': e.pageX + 20});
		
		var picWidth = wWidth - e.pageX - 40;
		
		if ( options['hz_maxwidth'] > 0 && picWidth > options['hz_maxwidth'] )
			picWidth = options['hz_maxwidth'];
		
		$zoom.children('img').css('maxWidth', picWidth);
		( options['hz_resolution'] === 'true' ) ? $zoom.children('img').css('maxHeight', wHeight - 50) : $zoom.children('img').css('maxHeight', wHeight - 35);
		
		if ( e.pageY + $zoom.height() + 20 > $(document).scrollTop() + wHeight - 20)
			( $zoom.offset().top - $zoom.height() < $(document).scrollTop() + 20) ?	$zoom.offset({'top': $(document).scrollTop() + 10}) : $zoom.offset({'top': e.pageY - $zoom.height() - 20});
	}
	
	// Resize
	$(window).resize(function(){
		wWidth = $window.width(),
		wHeight = $window.height();
	});
	
	// Settings
	$('#gbd5 ol.gbmcc').append('<li class="gbmtc"><div class="gbmt gbmh"></div></li><li class="gbkp gbmtc"><a id="disable_hz" class="gbmt" href="javascript:void(0)">'+locale_menu_1+'</a></li><li class="gbkp gbmtc"><a id="hz_set_open" class="gbmt" href="javascript:void(0)">'+locale_set_title+'</a></li>');
	
	$content.append('<div id="hz_set_back"></div><div id="hz_set_page" class="hz_settings"><h3>'+locale_set_title+'</h3><div id="hz_set_close" class="om" title="'+locale_set_close+'"></div></div>');
	
	$('#hz_set_page').append(
	'<label for="hz_delay">'+locale_set_1_1+'</label><input id="hz_delay" type="text" maxlength="4"/><label for="hz_delay">'+locale_set_1_2+'</label><br />'+
	'<label for="hz_opacity">'+locale_set_2+'</label><input id="hz_opacity" type="text" maxlength="3"/><label for="hz_opacity">%</label><br />'+
	'<label for="hz_maxwidth">'+locale_set_3_1+'</label><input id="hz_maxwidth" type="text" maxlength="4"/><label for="hz_maxwidth">'+locale_set_3_2+'</label><br />'+
	'<label for="hz_trigger">'+locale_set_7_1+'</label><select id="hz_trigger"></select><br />'+
	'<label for="hz_dl_key">'+locale_set_11+'</label><select id="hz_dl_key"></select><br />'+
	'<label for="hz_fullscreen">'+locale_set_10+'</label><select id="hz_fullscreen"></select><br />'+
	'<input id="hz_download" type="checkbox"/><label for="hz_download">'+locale_set_4+'</label><br />'+
	'<input id="hz_complete" type="checkbox"/><label for="hz_complete">'+locale_set_12+'</label><br />'+
	'<input id="hz_direct" type="checkbox"/><label for="hz_direct">'+locale_set_8+'</label><input id="hz_direct_max" type="text" maxlength="4"/><label for="hz_direct_max">'+locale_set_3_2+'</label><br />'+
	'<input id="hz_resolution" type="checkbox"/><label for="hz_resolution">'+locale_set_9+'</label><br />'+
	'<input id="hz_his" type="checkbox"/><label for="hz_his">'+locale_set_5+'</label><br />'+
	'<div id="hz_set_save" class="tk3N6e-e-qc tk3N6e-e" title="'+locale_set_save+'">'+locale_set_save+'</div>'
	);
	
	$('#hz_trigger, #hz_fullscreen, #hz_dl_key').append('<option value="0">'+locale_set_7_2+'</option><option value="16">Shift</option><option value="17">Control</option>');
	
	(navigator.appVersion.indexOf('Macintosh') > -1) ? $('#hz_trigger, #hz_fullscreen, #hz_dl_key').append('<option value="18">Option</option><option value="13">Return</option>') : $('#hz_trigger, #hz_fullscreen, #hz_dl_key').append('<option value="18">Alt</option><option value="13">Enter</option>');
	
	for ( var i=65; i<91; i++ ) {
		$('#hz_trigger, #hz_fullscreen, #hz_dl_key').append('<option value="'+i+'">&#'+i+';</option>');
	}
	
	// History Page
	if ( options['hz_his'] === 'true' ) {
		$('#gbd5 ol.gbmcc').append('<li class="gbkp gbmtc"><a id="hz_history_open" class="gbmt" href="javascript:void(0)">'+locale_set_history+'</a></li>');
		$('#content').append('<div id="hz_history_page" class="hz_settings"><h3>'+locale_set_history+'</h3><div id="hz_set_close" class="om" title="'+locale_set_close+'"></div></div>');
		$('#hz_history_page').append(
		'<div id="hz_history_out"><div id="hz_history"></div></div>'+
		'<div id="hz_his_clear" class="tk3N6e-e-vj tk3N6e-e" title="'+locale_set_clear+'">'+locale_set_clear+'</div>'+
		'<div id="hz_his_max_out"><label for="hz_his_max">'+locale_set_6_1+'</label><input id="hz_his_max" type="text"/><label for="hz_his_max">'+locale_set_6_2+'</label></div>'
		);
		
		$('#hz_history_open').click(function(){
			$('#hz_set_back, #hz_history_page').fadeIn(300);
			
			$('#hz_history_page').css({'width': wWidth - 200, 'height': wHeight - 200, 'marginLeft': -(wWidth / 2 - 100), 'marginTop': -(wHeight / 2 - 100)});
			
			$('#hz_history, #hz_history_out').css('height', wHeight - $('#hz_history_page h3').height() - $('#hz_history_page #hz_his_clear').height() - 215);
			
			$('#hz_history').css('width', wWidth - 210);
			$('#hz_history_out').css('width', wWidth - 190);
			
			$('#hz_history').atteeeeention();
		});
		
		$('#hz_his_clear').click(function(){
			$('#hz_history').empty();
		});
	}
	
	$('#disable_hz').toggle(function(){
		disable();
		$(this).text(locale_menu_2);
	}, function(){
		enable();
		$(this).text(locale_menu_1);
	});
	
	$('#hz_set_open, #hz_history_open').click(function(){
		$('#hz_set_back, #hz_set_page').fadeIn(300);
		
		$('.hz_settings').find(':text').each(function(){
			$(this).val(options[$(this).attr('id')]);
		});
		
		$('.hz_settings').find('select').each(function(){
			$(this).children('option[value="'+options[$(this).attr('id')]+'"]').prop('selected', true);
		});
		
		$('.hz_settings').find(':checkbox').each(function(){
			if ( options[$(this).attr('id')] === 'true' )
				$(this).prop('checked', true);
		});
	});
	
	$('#hz_set_save').click(function(){
		$('#hz_set_page').find(':text').each(function(){
			localStorage[$(this).attr('id')] = $(this).val();
		});
		
		$('#hz_set_page').find('select').each(function(){
			localStorage[$(this).attr('id')] = $(this).find(':selected').val();
		});
		
		$('#hz_set_page').find(':checkbox').each(function(){
			localStorage[$(this).attr('id')] = $(this).prop('checked').toString();
		});
		
		location.reload();
	});
	
	$('#hz_set_close, #hz_set_back').click(function(){
		$('#hz_set_back, #hz_set_page, #hz_history_page').fadeOut(300);
	});
	
	function disable(){
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom').die('mouseenter', showImg);
		$('.ot-anchor').die('mouseenter', showLink);
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom, .ot-anchor').die('mouseleave', hidePic);
		$('#picbefore').hide();
	}
	
	function enable(){
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom').live('mouseenter', showImg);
		$('.ot-anchor').live('mouseenter', showLink);
		$('.a-b-f-i-oa img, .a-Wf-i-M img, #hoverzoom, .ot-anchor').live('mouseleave', hidePic);
	}
	
	function directPic(){
		var timer3;
		clearInterval(timer3);
		timer3 = setInterval(function(){
			$('.a-f-i-W-r .ot-anchor').each(function(I){
				uri = $(this).attr('href');
				if ( uri.match(/jpg|png|tiff|gif|jpeg|bmp/i) && !$(this).children().hasClass('img-in-post')) {
					this.innerHTML = '<img class="img-in-post" src="'+uri+'"/>';
					if ( options['hz_direct_max'] > 0 ) {
						$(this).children().css('maxWidth', options['hz_direct_max']);
					}
					$(this).next().remove();
				}
			});
		}, 2500);
	}
}

function addJQ(callback){
	var script = document.createElement('script');
	script.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
	script.addEventListener('load', function(){
		var script = document.createElement('script');
		script.textContent = '(' + callback.toString() + ')();';
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQ(main);