// ==UserScript==
// @name            douban music
// @include        http://music.douban.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @require        http://lite-ext.googlecode.com/svn/trunk/lite-ext/playground/zip/gbk.js
// ==/UserScript==




//非版权专辑页
if(window.location.href.indexOf('music.douban.com') != -1 && $('.play-track').length == 0){
	//准备整列播放按钮UI
	$('.song-item').wrapInner('<div class="song-inner-wrapper"/>');
	$('.song-inner-wrapper').prepend('<div class="col"><a class="play-track" href="javascript:;"></a></div>');
	$('body').append('<audio id="doupi-music" src="" autoplay></audio>');
	var ck = getParameter($('.nav-user-account .more-items table a:last').attr('href'), 'ck');
	
	//播放 
	$('.song-items').on('click', '.play-track', function(){
		//移除添加按钮样式和高亮
		$('.pause-track').removeClass('pause-track').addClass('play-track');
		$(this).removeClass('play-track').addClass('pause-track');
		$('.song-item.highlight').removeClass('highlight');
		$(this).closest('.song-item').addClass('highlight');
		
		//移除添加下载
		var $songDownloadLink = $('.song-name a');
		if($songDownloadLink.length != 0){
			var songName = $songDownloadLink.text();
			$songDownloadLink.parent().empty().html(songName);
		}	
		$(this).parent().parent().find('.song-name').wrapInner('<a class="doupi-music-download" href="javascript:;" target="_blank"></a>');
		
		//搜索条件
		var sid = $(this).closest('.song-item').attr('id');
		var ssid = $(this).closest('.song-item').attr('data-ssid');	
		var url = 'http://music.douban.com/j/songlist/get_song_url';
		$.post(url, {sid:sid,ssid:ssid,ck:ck},
			function(data){				
				$('#doupi-music').attr('src', data.r)[0].play();
				$('.doupi-music-download').attr('href', data.r);
			},'json');
	});
	
	//暂停
	$('.song-items').on('click', '.pause-track', function(){
		$(this).closest('.song-item').removeClass('highlight');
		$(this).removeClass('pause-track').addClass('play-track');
		$('#doupi-music')[0].pause();
	});
	
	//播放完成
	$('#doupi-music').on('ended', function(){
		var currList = $('.pause-track').closest('.song-item').next();
		$('.pause-track').closest('.song-item').removeClass('highlight');
		$('.pause-track').removeClass('pause-track').addClass('play-track');
		currList.find('.play-track').trigger('click');
	});
}

//获取query string中的参数
function getParameter(querystr,name){
	var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
	var matcher = pattern.exec(querystr);
	var items = null;
	if(null != matcher){
	items = decodeURIComponent(matcher[1]);
	}
	return items;
}