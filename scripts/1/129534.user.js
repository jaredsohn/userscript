// ==UserScript==
// @name          豆瓣电影下载插件
// @namespace     http://ratwu.com
// @description   在豆瓣电影页面显示http://torrentproject.com/的下载链接
// @version	      v1.0
// @include       http://movie.douban.com/subject/*
// ==/UserScript==

var sikemiFunction = function(){
	var douban_url = this.location.href;
	var reg = /(\d{7,8})/g;  
	var douban_id = douban_url.match(reg);
		
	var title = $('html head title').text();
	var keyword1 = title.replace( '(豆瓣)', '' ).trim();
	var keyword2 = encodeURIComponent( keyword1 );
	var url = 'http://sikemi.sinaapp.com/douban_api.php?keyword=' + keyword2;
	var html_title = '<div class="da3" style="margin-bottom:0px;padding-bottom:1px;"><h2>可下载的资源&nbsp; ·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;<span class="pl">(<a href="http://torrentproject.com/?s=' + keyword2 + '&btnG=Torrent+Search&num=20&start=0" target="_blank">全部</a>)</h2></span></div>'
	var html_body_start = '<div class="indent" id="db-doulist-section" style="padding-left:5px;border:1px #F4F4EC solid;"><ul class="bs">';
	var html_body_yes = '';
	var html_body_no = '<li>没有找到相关资源，手动去<a href="http://torrentproject.com/?s='+keyword2+'&btnG=Torrent+Search&num=20&start=0" target="_blank">搜索</a></li>';
	var html_body_end = '</ul>';
	var html_body_endmore = '<div style="text-align:right; padding:5px 10px 5px 0px;"><a href="http://ratwu.com/2012/03/douban_download_plugin/" target="_blank">反馈</a></div>';
	var html_body_endend = '</div>';
	var length = 30;
	var unitname = new Array('Y','Z','E','P','T','G','M','K');
	var unitsize = new Array(1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024 * 1024,1024 * 1024 * 1024,1024 * 1024,1024);

	$.ajax(
		{
			type : 'GET',
			dataType : 'script',
			url : url,
			success : function() {
				if( iaskSearchResult.sp.m > 0 ) {
					var title,title2, image, filesize, url, unit;
					var	regex = /([A-Z\u0391-\uffe5])/g;
					for( key in iaskSearchResult.sp.result ) {
						title = iaskSearchResult.sp.result[key].title;
						title2 = title.replace( regex, "$1*" );
						ellipsis = title2.length > length ? '..' : '' ;
						title2 = title2.substr( 0, length ).replace( /\*/g, '' ) + ellipsis;
						filesize = iaskSearchResult.sp.result[key].filesize;
						seeds    = iaskSearchResult.sp.result[key].seeds;
						if( filesize < 1024 ) filesize = filesize+'B';
						for( var i=0; i<unitname.length; i++ ){
							if( filesize > unitsize[i] || filesize==unitsize[i] ){
								filesize = Math.round( filesize / unitsize[i] * 10 ) / 10 + unitname[i];
							}
						}
						url = iaskSearchResult.sp.result[key].url;
						html_body_yes += '<li><a href="' + url + '?from=douban" title="' + title + '" target="_blank">' + title2 + '</a><span class="pl">(' + filesize + '&nbsp;种子:' + seeds + ')</span></li>';
					}
					$( '.aside' ).prepend( html_title + html_body_start + html_body_yes + html_body_end + html_body_endmore + html_body_endend );
				} else {
					$( '.aside' ).prepend( html_title + html_body_start + html_body_no + html_body_end + html_body_endend );
				}
			}
		}
	);
}
function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval( sikemiFunction );