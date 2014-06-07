// ==UserScript==
// @name           Douban Movie Download 
// @namespace      Douban Movie Download 
// @description    豆瓣电影下载
// @version        20131230
// @include        http://movie.douban.com/subject/*
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "about:blank");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}

function main() {
    try {
    	var movieTitle = jQuery('h1 span:eq(0)').text();
		var title = $('html head title').text();
	    var keyword1 = title.replace( '(豆瓣)', '' ).trim();
	    var keyword2 = encodeURIComponent( keyword1 );
		jQuery('#info').append('<div><span class="pl">下载链接:</span> <a href="http://www.baidu.com/s?wd=' + keyword1 + '+site:simplecd.me" target="_balnk">SimpleCD</a>/<a href="http://www.yyets.com/php/search/index?keyword=' + keyword1 + '" target="_balnk">人人影视</a>/<a href="http://www.baidu.com/s?wd=' + keyword1 + '+thunder" target="_balnk">Baidu</a>/<a href="http://www.bilibili.tv/search?keyword=' + keyword1 + '" target="_balnk">BiliBili</a>/<a href="http://torrentz.eu/search?f=' + movieTitle + '" target="_balnk">Torrentz</a> / <a href="http://torrentproject.com/?t=' + movieTitle + '" target="_balnk">TorrentProject</a>/<a href="https://www.google.com/search?ie=UTF-8&q=' + movieTitle + '+MiniSD" target="_balnk">Google MiniSD</a>/<a href="http://dianying.fm/search?key=' + keyword1 + '" target="_balnk">电影FM</a>/<a href="http://donkey4u.com/search/' + movieTitle + '" target="_balnk">Donkey4u</a>/<a href="http://shooter.cn/search/' + keyword1 + '" target="_balnk">射手网字幕</a><div>');
    }
    catch (e) { }
}
addJQuery(main);