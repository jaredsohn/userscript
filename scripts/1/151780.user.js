// ==UserScript==
// @name           Douban Movie Download Search for Louis only
// @namespace      Douban Movie Download Search for Louis only
// @description    Douban Movie Download Search for Louis only
// @version        0.20140325
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
		jQuery('#info').append('<div><span class="pl">下载:</span> <a href="http://www.baidu.com/s?wd=' + movieTitle + '+BDrip" target="_balnk">在Baidu上搜索</a> /  <a href="https://www.google.com/search?ie=UTF-8&q=' + movieTitle + '+torrent" target="_balnk">在Google上搜索</a> / <a href="http://search.mtime.com/search/?q=' + keyword2 + '" target="_balnk">时光</a> / <a href="http://www.yyets.com/php/search/index?keyword=' + keyword2 + '" target="_balnk">YYets</a> / <a href="http://torrentz.eu/search?f=' + movieTitle + '" target="_balnk">Torrentz</a> / <a href="http://simplecd.me/search/entry/?query=' + keyword1 + '" target="_balnk">SimpleCD</a> / <a href="http://torrentproject.com/?t=' + movieTitle + '" target="_balnk">TorrentProject</a> / <a href="http://btdigg.org/search?info_hash=&q=' + movieTitle + '" target="_balnk">BTDigg</a> / <a href="http://www.torrentkitty.com/search/' + movieTitle + '" target="_balnk">TorrentKitty</a> / <a href="http://banyungong.net/search/' + keyword2 + '+.html" target="_balnk">搬运工</a><br><span class="pl">字幕:</span> <a href="http://shooter.cn/search/' + movieTitle + '" target="_balnk">Shooter</a> / <a href="http://www.opensubtitles.org/zh/search2/sublanguageid-chi/moviename-' + movieTitle + '" target="_balnk">OpenSubtitles</a><div>');
    }
    catch (e) { }
}
addJQuery(main);