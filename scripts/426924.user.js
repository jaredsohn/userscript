// ==UserScript==
// @name           Douban Movie Download Search
// @namespace      原作者：http://userscripts.org/scripts/show/151780
// @description    豆瓣电影搜索助手修改版
// @version        201400323
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
		jQuery('#info').append('<div><span class="pl"><font color=red>下载：</font></span> <br><a href="http://www.baidu.com/s?wd=' + movieTitle + '+site%3Apan.baidu.com" target="_balnk">百度网盘</a> <br>  <a href="https://www.google.com/search?ie=UTF-8&q=' + movieTitle + '+torrent" target="_balnk">Google搜索</a> <br> <a href="http://search.mtime.com/search/?' + keyword2 + '" target="_balnk">时光网</a> <br> <a href="http://www.yyets.com/php/search/index?keyword=' + keyword2 + '" target="_balnk">YYets</a> <br> <a href="http://torrentz.eu/search?f=' + movieTitle + '" target="_balnk">Torrentz</a> <br> <a href="http://simplecd.me/search/entry/?query=' + keyword1 + '" target="_balnk">SimpleCD</a> <br> <a href="http://torrentproject.com/?t=' + movieTitle + '" target="_balnk">TorrentProject</a> <br> <a href="http://btdigg.org/search?info_hash=&q=' + movieTitle + '" target="_balnk">BTDigg</a> <br> <a href="http://www.torrentkitty.com/search/' + movieTitle + '" target="_balnk">TorrentKitty</a> <br> <a href="http://banyungong.net/search/' + keyword2 + '+.html" target="_balnk">搬运工</a><br><span class="pl"><font color=red>字幕：</font></span> <a href="http://shooter.cn/search/' + movieTitle + '" target="_balnk">Shooter</a><div>');
    }
    catch (e) { }
}
addJQuery(main);