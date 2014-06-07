// ==UserScript==
// @name        SongTasteHelper
// @namespace   com.youngershen.songtaste
// @description 安装该插件之后会自动在songtaste的音乐播放页面显示获取歌曲链接的按钮，然后点击之，再然后，你懂的....
// @include     http://www.songtaste.com/song/*
// @version     2
// ==/UserScript==

/*
 * 更新之后不需要再点击下载按钮了，直接点击播放器下面的红色的下载歌曲链接就可以直接下载,请提出宝贵意见
 *
 */
window.getSongURL = function(){
	var song_id = /\d+/.exec(window.location.href)[0];
	console.log($("a")[75])
	var a_obj = $("a");
	var url_reg = /javascript:playmedia1.+/;
	var url_pos = 0;
	for(var i = 0 ; i < a_obj.length ; i++){
		if(url_reg.test(a_obj[i].href)){
			url_pos = i;
			break;
		}
	}
	var _strURL  = $("a")[url_pos].href.split(',')[2].substr(4);
	var strURL = _strURL.substring(0, _strURL.length - 1);
	
	$.ajax({url:'/time.php',
			data:'str='+strURL+'&sid='+song_id+'&t='+"0",
			type:'POST',
			success:function(url){
				var html = "&nbsp<a href= '" + url + "'>点击下载" + "</a>";
				$('#custom_1').attr('href', url)
				
			}
	});
}
getSongURL();